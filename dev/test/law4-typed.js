/* law4-typed static test (law 4 ONE CORE, OD:L1267): the numbers a card/rule prints and the numbers its rule applies come from BAL — no typed digit.
   Sites (Foreman D #16 order 21/11; + jemo-bal D #17 21/11: jemo.js · jemoact.js outside BAL.ea · jevb ctx/emotion code · j8 A frame/catswap/kpoison/kframe/pond · j17 AOUT kframe · j34 tScore/dScore/fScore): jaudit aaDeathTxt · j8 deathSentence mercy · j34 contest (myBetween opts, round-1 card, trait weights, tScore/fScore/crW,
   sabotage lines, NPC practice) · j17 AOUT spy/ksab/pond + their j8 A rules (cost, win, caught).
   usage: node dev/test/law4-typed.js [buildDir]     prints one row per typed number, exit 1 when any is left (want 0).
   Also run from dev/test/sg-card-scan.js (static pass). */
const fs=require('fs'),path=require('path');
function law4Typed(dir){const D=dir||path.join(__dirname,'../build');const rd=f=>fs.readFileSync(path.join(D,f),'utf8');const rows=[];
 const STAT=/(?:Danh|Sủng|Tài|Tâm cơ|Thế lực|Đức|Sức)(?: nàng)? ?[+\-−]\d|×\d|[+\-]\d+,\d|\b\d+ tháng|mất \d+ phần|vòng sau(?: nàng)? -\d/;
 const APPLY=/\{\s*(?:danh|sung|tamco|duc|suc)\s*:\s*-?\d|\b(?:danh|sung|tamco|duc)\(\)\{return -?\d/;
 const hit=(file,name,txt,re)=>{const m=txt.match(new RegExp(re.source,'g'));if(m)m.forEach(x=>rows.push({at:`${file} ${name}`,t:x}))};
 const fnBody=(src,head)=>{const i=src.indexOf(head);if(i<0)return null;let d=0,j=src.indexOf('{',i);for(let k=j;k<src.length;k++){if(src[k]==='{')d++;else if(src[k]==='}'){d--;if(!d)return src.slice(i,k+1)}}return null};
 const lineOf=(src,head)=>{const i=src.indexOf(head);if(i<0)return null;return src.slice(i,src.indexOf('\n',i))};
 // jaudit aaDeathTxt
 const ja=rd('jaudit.js');const ad=fnBody(ja,'function aaDeathTxt(');if(!ad)rows.push({at:'jaudit aaDeathTxt',t:'MISSING'});else{hit('jaudit','aaDeathTxt',ad,STAT);if(/S\.turn<\d/.test(ad))rows.push({at:'jaudit aaDeathTxt',t:'S.turn<N'})}
 // j8 deathSentence mercy + A spy/ksab/pond
 const j8=rd('j8.js');const ds=fnBody(j8,'function deathSentence(');if(ds){hit('j8','deathSentence',ds,STAT);hit('j8','deathSentence',ds,APPLY);if(/S\.turn<\d|confined\|\|0,\d/.test(ds))rows.push({at:'j8 deathSentence',t:'mercy turn/confine typed'})}
 for(const k of ['spy','ksab','pond']){const L=lineOf(j8,`A("${k}",`);if(!L){rows.push({at:`j8 A ${k}`,t:'MISSING'});continue}
  let s=L;if(k!=='spy'){const i=j8.indexOf(L);s=j8.slice(i,j8.indexOf('}});',i)+4)}hit('j8',`A ${k}`,s,APPLY);hit('j8',`A ${k}`,s.replace(/\$\{[^}]*\}/g,''),STAT)}
 // j17 AOUT spy/ksab/pond (text with ${…} dropped: what is left is typed)
 const j17=rd('j17.js');const ai=j17.indexOf('const AOUT={');const ao=j17.slice(ai,j17.indexOf('\nconst ACAUGHT',ai));
 for(const k of ['spy','ksab','pond']){const i=ao.search(new RegExp(`[{,\\s]${k}:`));if(i<0){rows.push({at:`j17 AOUT ${k}`,t:'MISSING'});continue}
  const s=ao.slice(i+1).split(/,\s*(?:[a-z]+):(?:aoLz\(|\[)/)[0];hit('j17',`AOUT ${k}`,s.replace(/\$\{[^}]*\}/g,''),STAT)}
 // j34 contest
 const j34=rd('j34.js');
 for(const h of ['function crW(','function tScore(','function fScore(','function sabotage(','function myBetween(']){const b=fnBody(j34,h);if(!b){rows.push({at:`j34 ${h}`,t:'MISSING'});continue}
  const nm=h.slice(9,-1);hit('j34',nm,b.replace(/\$\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g,''),STAT);
  if(nm==='crW'&&/\?\s*[\d.]+\s*:/.test(b))rows.push({at:'j34 crW',t:'typed weight'});
  if(nm==='tScore'&&/\]\|\|0\)\*[\d.]+\)/.test(b))rows.push({at:'j34 tScore',t:'typed practice/sabotage weight'});
  if(nm==='fScore'&&/\):\d+;/.test(b))rows.push({at:'j34 fScore',t:'typed backer point'})}
 const ttl=lineOf(j34,'Tranh ghế",who:pEmp()');if(ttl)hit('j34','contest intro',ttl.replace(/\$\{balDec\([^)]*\)\}/g,''),STAT);
 const r1=lineOf(j34,'t:"Vòng 1: Tài nghệ"');if(r1&&/luyện tập \$\{c\.pr\.me\}/.test(r1))rows.push({at:'j34 round 1 card',t:'luyện tập = count, not points'});
 if(/c\.pr\[k\]=\(c\.pr\[k\]\|\|0\)\+\d/.test(j34))rows.push({at:'j34 NPC practice',t:'typed +N'});

 // jemo-bal (law 4): the jemo family — every rule number of jemo.js / jemoact.js (outside its BAL.ea block) / jevb.js emotion + context code reads BAL.
 // Code only (comments, strings and template text dropped). Allowed: 0, 1, −1, 100 (scale / clamp) and the structural sites listed in JEMO_OK (each with why).
 for(const r of jemoTyped(rd))rows.push(r);
 // j8 frame / catswap / kpoison / kframe / pond rule lines + j34 score functions: no typed number left
 for(const k of ['frame','catswap','kpoison','kframe','pond']){const i=j8.indexOf(`A("${k}",`);if(i<0){rows.push({at:`j8 A ${k}`,t:'MISSING'});continue}const L=j8.slice(i,j8.indexOf('}});',i)+4);
  for(const m of codeNums(L))if(!/^(0|1|100|-1)$/.test(m.v))rows.push({at:`j8 A ${k}`,t:m.ctx})}
 {const i=j17.indexOf('kframe:');const L=j17.slice(i,j17.indexOf('),',i)+2);if(!/kframeDanh/.test(L))rows.push({at:'j17 AOUT kframe',t:'mother Danh not printed'})}
 for(const h of ['function tScore(','function dScore(','function fScore(']){const b=fnBody(j34,h);if(!b)continue;for(const m of codeNums(b))if(!/^(0|1)$/.test(m.v))rows.push({at:`j34 ${h.slice(9,-1)}`,t:m.ctx})}
 return rows}
/* code numbers: drop comments, strings, template text (keep ${…} code) and regex literals; return [{v, ctx}] */
function codeOnly(src){let o='',i=0;const n=src.length;const st=[];
 while(i<n){const c=src[i],d=src[i+1];
  if(c==='/'&&d==='*'){const e=src.indexOf('*/',i+2);i=e<0?n:e+2;o+=' ';continue}
  if(c==='/'&&d==='/'&&!/[\w)\]]\s*$/.test(o.slice(-3))){const e=src.indexOf('\n',i);i=e<0?n:e;continue}
  if(c==='"'||c==="'"){let j=i+1;while(j<n&&src[j]!==c){if(src[j]==='\\')j++;j++}o+='""';i=j+1;continue}
  if(c==='`'){i++;o+='`';while(i<n&&src[i]!=='`'){if(src[i]==='\\'){i+=2;continue}if(src[i]==='$'&&src[i+1]==='{'){let dep=1,j=i+2;const a=j;while(j<n&&dep){if(src[j]==='{')dep++;else if(src[j]==='}')dep--;else if(src[j]==='`'){j++;while(j<n&&src[j]!=='`')j++}j++}o+='${'+codeOnly(src.slice(a,j-1))+'}';i=j;continue}i++}o+='`';i++;continue}
  if(c==='/'&&/[(,=:!&|?;{}\[]\s*$/.test(o.slice(-2))&&d!=='/'&&d!=='*'){let j=i+1,cls=0;while(j<n){const x=src[j];if(x==='\\'){j+=2;continue}if(x==='[')cls=1;else if(x===']')cls=0;else if(x==='/'&&!cls)break;j++}o+='/r/';i=j+1;while(/[a-z]/.test(src[i]||''))i++;continue}
  o+=c;i++}return o}
function codeNums(src){const c=codeOnly(src),out=[];const re=/(?<![\w.$])(-?\d+(?:\.\d+)?|\.\d+)(?![\w])/g;let m;while((m=re.exec(c))){out.push({v:m[1],ctx:c.slice(Math.max(0,m.index-40),m.index+m[0].length+15).replace(/\s+/g,' ')})}return out}
/* structural numbers of the jemo family (not rule values): [file, context regex, why] */
const JEMO_OK=[
 ['jemo.js',/EMOX\.size>600/,'seal key cache size'],['jemo.js',/g===""\?0:g===""\?3:|feelBad\(k\)\?2:1|includes\(g\)\?2:1/,'legacy 4-step bar codes (0 vui · 1 bình · 2 phiền · 3 giận)'],
 ['jemo.js',/em>=3\)/,'legacy bar code 3 = giận'],['jemo.js',/age\|\|0\)>=45/,'seal art set (mature man picture), not a rule'],
 ['jemoact.js',/w\.length>=3\?w\.slice\(-2\)/,'short name (last 2 words)'],['jemoact.js',/bv=-999/,'sentinel'],['jemoact.js',/W\(\)\*10\+/,'buổi stamp encoding'],
 ['jemoact.js',/L\[2\]\?3:sum>=L\[1\]\?2|L\[1\]\?2:sum>=L\[0\]/,'level index into BAL.feel.lv'],['jemoact.js',/E\.mood\|\|0,2\)/,'legacy bar code 2 = phiền'],
 ['jemoact.js',/M\.i\)>=2|M\.i<=-2|M\.i>=1/,'mood band index (BAL.mood.band)'],['jemoact.js',/T\[[0-3]\]/,'array index'],
 ['jevb.js',/2147483646|2166136261|16777619/,'hash / seed constants'],['jevb.js',/slice\(0,40\)|slice\(0,90\)/,'text length'],
]
function jemoTyped(rd){const rows=[];
 const one=(file,src,name)=>{for(const m of codeNums(src)){if(/^(0|1|-1|100|-100)$/.test(m.v))continue;if(JEMO_OK.some(([f,re])=>f===file&&re.test(m.ctx)))continue;rows.push({at:`${file.replace('.js','')} ${name}`,t:m.ctx})}};
 const je=rd('jemo.js');one('jemo.js',je.slice(0,je.indexOf('(function(){const st=document.createElement("style");st.id="kemo-css"')),'');
 const ea=rd('jemoact.js');const b0=ea.indexOf('Object.assign(BAL,{ea:{'),b1=ea.indexOf('\n}});',b0)+5;one('jemoact.js',ea.slice(b1),'');
 const ev=rd('jevb.js');for(const h of ['function ctxTaste(','function ctxMood(','function evbMood0('])one('jevb.js',(function(){const i=ev.indexOf(h);let d=0,j=ev.indexOf('{',i);for(let k=j;k<ev.length;k++){if(ev[k]==='{')d++;else if(ev[k]==='}'){d--;if(!d)return ev.slice(i,k+1)}}return''})(),h.slice(9,-1));
 for(const re of [/Math\.round\(v\*\(1\+t\/[^)]*\)\)/,/BAL\.ctxTaste\*[^)]*\)/,/\(A\.sc\|\|0\)\*[^:]*:/,/q\.emoH=H\.slice\(0,[^)]*\)/,/e\.why&&e\.v>=[^&]*&&/])one('jevb.js',(ev.match(re)||[''])[0],'ctx/cause');
 return rows}
module.exports={law4Typed,jemoTyped,codeNums};
if(require.main===module){const rows=law4Typed(process.argv[2]);rows.forEach(r=>console.log('TYPED',r.at,'«'+r.t+'»'));console.log(`law4-typed: ${rows.length} typed`);process.exit(rows.length?1:0)}
