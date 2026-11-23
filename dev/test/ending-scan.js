/* ending-scan (law 11 FIX THE WHOLE GROUP; review/ending-screens, KIT §91): every place that ENDS a life / a game / a branch → which ending screen it now gets.
   Static scan of dev/build/*.js: every over( caller (the life end card) with its literal title / fate / alive, classified by THE classifier of jend.js (kesLife, loaded from
   the file itself), plus the non-over endings (Hồi kết nhánh result, Bảng Thiên mệnh, rare ending result / exit). Before = the small dialog it was on main.
   Prints a markdown table; exit 1 when an ending caller is found that the classifier cannot type, or an ending wiring hook is missing.
   usage: node dev/test/ending-scan.js [--md] */
const fs=require('fs'),path=require('path');const D=path.resolve(__dirname,'../build');
const J=fs.readFileSync(path.join(D,'jend.js'),'utf8');
const src=J.slice(J.indexOf('function kesLife('),J.indexOf('window.kesLife'));const kesLife=new Function(src+';return kesLife')();
const TONE={death:'mourn',exile:'mourn',fail:'mourn',leave:'fest',throne:'fest',grand:'fest',fate:'fest',rare:'fest'};
const alive=(fate,a)=>{if(a==='true')return true;if(a==='false')return false;const f=String(fate||'');return /thoái vị|xuất cung|ra khỏi cung|xuất gia|về quê|ẩn cư|an hưởng|còn sống|trốn khỏi cung|tự do|nhường ngôi/i.test(f)&&!/chết|qua đời|tự vẫn|băng hà|ban chết|xử tử/i.test(f)};
const lit=s=>{s=s.trim();const m=s.match(/^(["'`])([\s\S]*)\1$/);return m?m[2].replace(/\$\{[^}]*\}/g,'…'):null};
/* split the top-level arguments of a call starting at i (just after "over(") */
function args(t,i){const out=[];let d=0,q=null,cur='';for(;i<t.length;i++){const c=t[i];if(q){cur+=c;if(c==='\\'){cur+=t[++i];continue}if(c===q)q=null;else if(q==='`'&&c==='$'&&t[i+1]==='{'){/* template expr */}continue}
  if(c==='"'||c==="'"||c==='`'){q=c;cur+=c;continue}if('([{'.includes(c)){d++;cur+=c;continue}if(')]}'.includes(c)){if(d===0){out.push(cur);return out}d--;cur+=c;continue}if(c===','&&d===0){out.push(cur);cur='';continue}cur+=c}return out}
const rows=[];let bad=0;
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='jend.js').sort()){const t=fs.readFileSync(path.join(D,f),'utf8');const L=t.split('\n');
 const re=/(^|[^\w.])over\(/g;let m;while((m=re.exec(t))){const i=m.index+m[0].length;const pre=t.slice(Math.max(0,i-30),i);if(/function over\($|W\("over"/.test(pre))continue;
  const line=t.slice(0,i).split('\n').length;const ln=L[line-1];if(/^\s*(\/\*|\*|\/\/)/.test(ln.trim())||/\/\*[^*]*over\(/.test(ln.slice(0,ln.indexOf('over(')+5))&&!/[;{]\s*over\(/.test(ln))continue;
  const A=args(t,i);if(!A.length||!A[0].trim()||/^…$/.test(A[0].trim()))continue;/* a doc comment «over(…, alive)» */
  const h=lit(A[0]),fate=A[2]!==undefined?lit(A[2]):null,al=A[3]!==undefined?A[3].trim():'';
  let type,how;if(f==='jge.js'){type='grand';how='kitEndNext("grand")'}else if(f==='j97.js'){type='rare';how='kitEndNext("rare")'}
  else if(h===null||(A[2]!==undefined&&fate===null)){type='(runtime)';how='kesLife(h, fate, alive) at the call'}
  else{const live=alive(fate,al);type=kesLife(h,fate,live);how=`kesLife · ${live?'alive':'died'}`}
  if(!type)bad++;rows.push({where:`${f}:${line}`,what:(h||A[0].trim()).slice(0,40),fate:(fate===null?(A[2]||'').trim():fate).slice(0,40),before:'small «Kiếp này» end card',type,how})}}
/* the endings that are not over() */
const has=(f,s)=>fs.readFileSync(path.join(D,f),'utf8').includes(s);
const extra=[
 ['jge.js PEND.geR','Hồi kết nhánh → Đại kết cục','','small VIỆC dialog','grand','kitEndType: pid geR + S.ge.res.ok',has('jend.js','m.pid==="geR"')],
 ['jge.js PEND.geR','Hồi kết nhánh → Kết cục (thất bại)','','small VIỆC dialog','fail','kitEndType: pid geR + !ok',has('jend.js','m.pid==="geR"')],
 ['jge.js geBoardPanel','Bảng Thiên mệnh','','small ĐIỀU panel','fate','cls kes-t-fate',has('jge.js','cls:"kes-t-fate"')],
 ['j97.js r97Take','Kỳ ngộ (kết hiếm) result card','','small KẾT QUẢ panel','rare','r97Take wrapper → kesMark',has('jend.js','r97Take=function')],
 ['j97.js PEND.j97x','Kỳ ngộ exit (rời cung, e.g. Nữ vương Cao Ly)','','small «Kiếp này» end card','rare','kitEndNext("rare")',has('j97.js','kitEndNext("rare")')],
 ['j3.js die()','every death (die → over "Hồng nhan bạc mệnh")','dynamic','small «Kiếp này» end card','death','kesLife · died',true]];
for(const [w,what,fate,before,type,how,okk] of extra){if(!okk)bad++;rows.push({where:w,what,fate,before,type:okk?type:'MISSING HOOK',how})}
const md=['| where | ending | fate line | BEFORE (main 56ff0db0) | AFTER: ending screen type (tone) | how |','|---|---|---|---|---|---|']
 .concat(rows.map(r=>`| ${r.where} | ${r.what.replace(/\|/g,'/')} | ${String(r.fate).replace(/\|/g,'/')} | ${r.before} | ${r.type}${TONE[r.type]?` (${TONE[r.type]})`:''} | ${r.how} |`));
console.log(md.join('\n'));const n={};rows.forEach(r=>n[r.type]=(n[r.type]||0)+1);
console.log(`\nending-scan: ${rows.length} ending callers · ${Object.entries(n).map(([k,v])=>`${k} ${v}`).join(' · ')} · untyped/missing ${bad}`);process.exit(bad?1:0);
