/* tinbao-words SCAN (owner OD 25/11 ~23:36Z «Cái gì mà tùm lum chữ lặp tới lặp lui, lũng ca lũng cũng không hiểu nổi»; law 11 whole group).
   (1) STATIC: every string builder in dev/build/j*.js that feeds a news line — kitNotice({line,text,items}), kitKnow({text}), noteAdd(id,`…`), ptNote, the
       errand report heads (ptReg … t:), spyNews / spyListen, the closing alert line(), agWhy — is read as a template literal and checked against
       patterns.js (with ${…} as «X»). Reports file:line + pattern. FAIL on a hit in the families fixed here (FIXED list) or any «=» / « · thành» glue.
   (2) kitSayLine (jnotice, THE net at the one entry) on the owner's exact lines → must come out clean.
   (3) the known producers: jstagehere line(), jptime ptRepText, jwhy spyNews, jagent agWhy, j78 trait fact, jopic free card → the new wording is in place.
   usage: node dev/test/tinbao-words/scan.js [--md]   exit 1 on FAIL */
const fs=require('fs'),path=require('path');const D=path.resolve(__dirname,'../../build');const B=require('./patterns.js');
const MD=process.argv.includes('--md');let fail=0;const rows=[];const bad=(m)=>{fail++;console.error('FAIL',m)};
/* ---- (1) static builders ---- */
const CALLS=['kitNotice','kitKnow','noteAdd','ptNote','kitLine','kitLineToast','tinBaoOn','knBao','log','newsAdd','kitKnowMany'];
function lits(src,i){/* template / string literals inside the call starting at i (balanced parens) */const out=[];let d=0,q=null,cur='',st=i;
 for(;i<src.length&&i<st+3000;i++){const c=src[i];if(q){if(c==='\\'){cur+=c+src[++i];continue}if(q==='`'&&c==='$'&&src[i+1]==='{'){let e=i+2,dd=1;while(e<src.length&&dd){if(src[e]==='{')dd++;else if(src[e]==='}')dd--;e++}cur+='X';i=e-1;continue}if(c===q){out.push(cur);cur='';q=null;continue}cur+=c;continue}
  if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c==='(')d++;else if(c===')'){d--;if(d<=0)break}}return out}
const FAMILY=/nghe ngóng|dò la|nghe lén|báo|trở về|đã về|Sổ ghi|lẻn vào|đóng cửa|tin|nết/;
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)).sort()){const t=fs.readFileSync(path.join(D,f),'utf8');
 for(const fn of CALLS){const re=new RegExp('(^|[^\\w.])'+fn+'\\(','g');let m;while((m=re.exec(t))){const i=m.index+m[0].length-1;if(/function\s*$/.test(t.slice(Math.max(0,i-30),i-fn.length)))continue;
  const L=lits(t,i).filter(s=>s.length>8&&/\p{L}/u.test(s)&&!/^[\w-]+$/.test(s)&&!/^(?:pt:|n:|news:|know:|kitpg)/.test(s));const line=t.slice(0,i).split('\n').length;
  for(const s of L){const hit=B.check(s).filter(x=>x!=='name3x');if(!hit.length)continue;rows.push([`${f}:${line}`,fn,s.slice(0,110),hit.join(',')]);
   if(hit.some(h=>['eq','dotOk','eqStay','rawNet','paren2'].includes(h)))bad(`${f}:${line} ${fn} «${s.slice(0,80)}» ${hit}`)}}}}
/* ---- (2) kitSayLine on the owner's lines ---- */
const J=fs.readFileSync(path.join(D,'jnotice.js'),'utf8');const a=J.indexOf('function kitSayLine(');if(a<0)bad('kitSayLine missing in jnotice.js');else{
 const kitSayLine=new Function(J.slice(a,J.indexOf('window.kitSayLine=kitSayLine;'))+';return kitSayLine')();
 const OWNER=['Cung nữ thân tín tam đẳng Xạ Nguyệt nghe ngóng trở về · thành. Cung nữ thân tín tam đẳng Xạ Nguyệt nghe ngóng trở về: Cung nữ thân tín tam đẳng Xạ Nguyệt nghe ngóng được về Phi ở một thiên điện (chưa quen) (nàng ta đang được sủng, ai cũng bàn): Một vị Phi có nết Nhiều chuyện.',
  'Đức Thọ cung đã đóng cửa (Thái hậu chỉ tiếp lúc sáng thỉnh an), ta vẫn ở lại. Ở lại = như lẻn vào: Khó lường.',
  'Sổ ghi thêm về Hoàng hậu Tiêu Tuyết Kiến: nghe lén: nàng ta rủ người cùng chơi — muốn có thêm người thân cận · con gái thầy đồ nghèo',
  'Xạ Nguyệt dò la Lệ tần Mai Hoa trở về · hỏng. Xạ Nguyệt dò la Lệ tần Mai Hoa trở về: chẳng thấy gì.'];
 for(const o of OWNER){const r=kitSayLine(o);const h=B.check(r).filter(x=>x!=='titleTwice');rows.push(['kitSayLine',o.slice(0,60)+'…',r.slice(0,110),h.join(',')||'clean']);if(h.length)bad(`kitSayLine left ${h} in «${r}»`)}
 if(kitSayLine('Tháng ba · thượng tuần')!=='Tháng ba · thượng tuần')bad('kitSayLine broke a date');}
/* ---- (3) producers in place ---- */
const has=(f,s,why)=>{const t=fs.readFileSync(path.join(D,f),'utf8');if(!t.includes(s))bad(`${f}: ${why} (missing «${s.slice(0,50)}»)`)};
const no=(f,s,why)=>{const t=fs.readFileSync(path.join(D,f),'utf8');if(t.includes(s))bad(`${f}: ${why} (still «${s.slice(0,50)}»)`)};
no('jstagehere.js','Ở lại = như lẻn vào','closing alert «=»');has('jstagehere.js','${stayPrice()}; may rủi:','closing alert sentence (review/home-way: the light price, never «như lẻn vào»)');no('jstagehere.js','chẳng khác gì lẻn vào','closing alert: overstay is NHẸ (review/home-way)');
no('jptime.js','" · thành":','errand report glue');has('jptime.js','function ptRepFacts(','errand report one sentence (E90 composer)');has('jptime.js','function ptRepRows(','E90r rows composer');
no('jwhy.js','(chưa quen)`','spyWho stacked paren');no('jwhy.js','nghe ngóng được về ${spyWho(v)} (${why})','spyNews chain');
no('j78.js','có nết ${T[0]}','raw trait label');no('jagent.js','`${w} · ${o}`','agWhy dot glue');no('jagent.js','nghe lén: nàng ${p.act} — ${p.why}','nghe lén note chain');no('jagent.js','vì ${p.why}','«vì <filler>» reason');has('jagent.js','function agWhySay(','reason clause helper');
has('jopic.js','if(free){ton.remove();gain.remove()','free choice card without «không» rows');has('jaudit.js','ONE title per person per block','one title per block');
/* (4) 2nd owner case (OD ~23:54Z): a dialog that shows the speaker (who: X / subject) never names X in its body; errand panels speak in her voice */
has('jptime.js','function ptVoice(','servant voice helper');has('jerr.js','ptRepFx(r,t.nm,p,!!p&&p===subj)','errPanel speaker voice');has('jptime.js','ptRepRows(r,a.nm,pp,','ptPanel speaker voice');has('jptime.js','if(shown&&p)T=ptVoice(T,p)','rows composer speaker voice');
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const t=fs.readFileSync(path.join(D,f),'utf8');const re=/pushModal\(\{/g;let m;
 while((m=re.exec(t))){const c=t.slice(m.index,m.index+900);const w=/who:\s*(?:pv\()?([A-Za-z_$][\w$.]*)/.exec(c);if(!w)continue;const v=w[1].replace(/\.$/,'');
  if(c.includes('${'+v+'.name}')){rows.push([f+':'+t.slice(0,m.index).split('\n').length,'pushModal who','body names the shown speaker '+v,'speakerName']);bad(`${f}: dialog shows ${v} (who) and names ${v}.name in its body`)}}}
/* (5) MAIN 149 look: «Sổ ghi thêm về X:» head and verbless «Ở <nơi> ngày hội.» */
no('j21.js','Sổ ghi thêm${','Sổ ghi thêm về X: label-colon');has('j21.js','function noteSay(','Sổ notice as one sentence');has('jagknow.js','const KN_WHAT=','happening as a clause');has('jnotice.js','is ONE row','same news told twice = one row');
if(MD){console.log('| where | builder | text (X = a value) | pattern |\n|---|---|---|---|');for(const r of rows)console.log(`| ${r[0]} | ${r[1]} | ${r[2].replace(/\|/g,'/')} | ${r[3]} |`)}
console.log(`tinbao-words scan: ${rows.length} rows · ${fail?fail+' FAIL':'PASS'}`);process.exit(fail?1:0);
