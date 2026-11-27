/* co-ngu-titles scan (owner 25/11 ~07:40Z «Một kiếp phù sinh»; law 11 whole group): every life ending → the poetic name the end card shows.
   Static: every over( caller with a literal heading and every die( caller with a literal cause in dev/build/*.js, named by THE table (jend.js KIT_END.names / endName,
   loaded from the file itself). Fails (exit 1) when: a death cause falls to the default name while a listed cause word is in it, a plain heading has no
   poetic name (not in KEEP = headings that are already names), or an old plain wording is still in the code.
   usage: node dev/test/co-ngu-titles/scan.js [--md] */
const fs=require('fs'),path=require('path');const D=path.resolve(__dirname,'../../build');
const J=fs.readFileSync(path.join(D,'jend.js'),'utf8');
const window={KIT_END:{}};new Function('window',J.slice(J.indexOf('window.KIT_END.names='),J.indexOf('(function(){const KE=window.KIT_END;')))(window);
const endName=window.endName;
const KEEP=new Set(['Hồng nhan bạc mệnh','Thiên cổ nhất đế','Nữ đế','Nhị thánh lâm triều','Thái hậu chấp chính','Mưu nghịch bất thành','Nữ vương Cao Ly']);
const OLD=[['j32.js','Chết là hết.'],['j32.js','"Sống trong cung"'],['j32.js','"Chết vì"'],['j32.js','Kiếp này khép lại.'],['jk2b.js','Các thân phận trong vòng luân hồi'],
 ['j97.js','tag:"Mẹ còn sống"'],['j97.js','tag:"Chủ cũ dâng trà"'],['j97.js','tag:"Người phi tần năm xưa còn sống"'],['j52.js','Chết là hết']];
const lit=s=>{s=(s||'').trim();const m=s.match(/^(["'`])([\s\S]*)\1$/);return m?m[2].replace(/\$\{[^}]*\}/g,'…'):null};
function args(t,i){const out=[];let d=0,q=null,cur='';for(;i<t.length;i++){const c=t[i];if(q){cur+=c;if(c==='\\'){cur+=t[++i];continue}if(c===q)q=null;continue}
 if(c==='"'||c==="'"||c==='`'){q=c;cur+=c;continue}if('([{'.includes(c)){d++;cur+=c;continue}if(')]}'.includes(c)){if(d===0){out.push(cur);return out}d--;cur+=c;continue}if(c===','&&d===0){out.push(cur);cur='';continue}cur+=c}return out}
const rows=[];let bad=0;const MD=process.argv.includes('--md');
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)).sort()){const t=fs.readFileSync(path.join(D,f),'utf8');
 for(const fn of ['over','die','kcEndDo','kc2End']){const re=new RegExp('(^|[^\\w.])'+fn+'\\(','g');let m;while((m=re.exec(t))){const i=m.index+m[0].length;const pre=t.slice(Math.max(0,i-30),i);if(/function \w+\($|W\("over"/.test(pre))continue;
  const A=args(t,i);const a0=lit(A[0]);if(a0==null||!a0.trim()||a0==='…'||a0.length>160||/[{};\n]/.test(a0))continue;const line=t.slice(0,i).split('\n').length;
  if(fn==='die'){const n=endName('Hồng nhan bạc mệnh',a0,a0,false);rows.push([`${f}:${line}`,'chết: '+a0,n]);
   if(n===window.KIT_END.names.deathDef&&/sinh|độc|giếng|trượng|đòn|bệnh|lụa|quỳ|lãnh cung|tru di|diệt khẩu/i.test(a0)){bad++;console.error('FAIL default name for a known cause:',f,line,a0)}continue}
  const fate=fn==='over'?lit(A[2]):null;const al=fn==='over'?(A[3]||'').trim()!=='false':true;const n=endName(a0,lit(A[1])||'',fate,al);rows.push([`${f}:${line}`,a0+(fate&&fate!==a0?` (${fate})`:''),n]);
  if(n===a0&&!KEEP.has(a0)&&!/^Đại kết cục/.test(a0)&&a0!=='h'){bad++;console.error('FAIL plain heading without a poetic name:',f,line,a0)}}}}
for(const [f,s] of OLD){if(fs.readFileSync(path.join(D,f),'utf8').includes(s)){bad++;console.error('FAIL old wording left:',f,s)}}
if(MD){console.log('| where | ending (heading / cause) | name on the card |\n|---|---|---|');for(const r of rows)console.log(`| ${r[0]} | ${r[1].replace(/\|/g,'/')} | **${r[2]}** |`)}
console.log(`co-ngu-titles scan: ${rows.length} ending callers · ${new Set(rows.map(r=>r[2])).size} names · ${bad?bad+' FAIL':'PASS'}`);process.exit(bad?1:0);
