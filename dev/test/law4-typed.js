/* law4-typed static test (law 4 ONE CORE, OD:L1267): the numbers a card/rule prints and the numbers its rule applies come from BAL — no typed digit.
   Sites (Foreman D #16 order 21/11): jaudit aaDeathTxt · j8 deathSentence mercy · j34 contest (myBetween opts, round-1 card, trait weights, tScore/fScore/crW,
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
 return rows}
module.exports={law4Typed};
if(require.main===module){const rows=law4Typed(process.argv[2]);rows.forEach(r=>console.log('TYPED',r.at,'«'+r.t+'»'));console.log(`law4-typed: ${rows.length} typed`);process.exit(rows.length?1:0)}
