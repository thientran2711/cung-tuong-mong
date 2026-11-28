/* TMK-WARN scan (law 11, the whole bribe / spy-for-hire family). Static, node only.
   usage: node dev/test/tmk-warn-scan.js [buildDir]   (before column: git show the base files into a dir)
   Every site that sets a spyFor (a servant becomes someone's tai mắt) is classed:
     TAKE  = the servant PLAYER takes it (S.srv.spyFor = …): her card must print the jcharge road (cnvSpyX(m,noPay,v) with the buyer → mcwTakeX)
     BUY   = the player is the BUYER on a card (spyFor = "me" / tmTake(S, …) / bribe button): the card must print mcwBuyX
     NPC   = an NPC road with no card for her: covered when the two-way hook (jmcwarn mcwNpc, spyFor-generic) exists
   plus the warning beat: the evA hook (mcwHit) and the monthly servant tick (mcwMonth in j42), and the PEND «mcWarn» tier card.
   Last line: TMK-WARN SCAN: <n> gap(s) */
const fs=require('fs'),path=require('path');const B=process.argv[2]||path.join(__dirname,'..','build');
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const src={};for(const f of files)src[f]=fs.readFileSync(path.join(B,f),'utf8');
const mw=src['jmcwarn.js']||'';const hook=/mcwHit\(h,t\)/.test(mw)&&/evA=function/.test(mw),npc=/function mcwNpc/.test(mw),card=/PEND\.mcWarn=/.test(mw)&&/· nhẹ/.test(mw)&&/· vừa/.test(mw)&&/· nặng/.test(mw),month=/mcwMonth\(v\)/.test(src['j42.js']||'');
let gap=0;const rows=[];
for(const f of files){if(f==='jmcwarn.js'||f==='jcharge.js')continue;const LL=src[f].split('\n');LL.forEach((l,i)=>{
 const sites=[...l.matchAll(/([\w.]+)\.spyFor\s*=\s*(?!null|=)/g)].map(m=>m[1]).concat(/tmTake\(S,/.test(l)?['tmTake(S)']:[]).concat(/data-sv="mua"/.test(l)?['bribe-btn']:[]);
 for(const w of sites){let cls,ok,why;
  if(w==='S.srv'){cls='TAKE';const x=((l.match(/cnvSpyX\(([^)]*)\)/)||(LL[i-1]||'').match(/cnvSpyX\(([^)]*)\)/))||[])[1]||'';/* the option's x may sit on the line above its go */ok=x.split(',').length>=3;why=ok?`cnvSpyX(${x})`:x?`cnvSpyX(${x}) — no buyer, jcharge road missing`:'no take text'}
  else if(/spyFor\s*=\s*"me"/.test(l.slice(l.indexOf(w+'.spyFor')))||w==='tmTake(S)'||w==='bribe-btn'){cls='BUY';const card=/x:|pbtn\(/.test(l);ok=!card||/mcwBuyX/.test(l);why=!card?'no card on this line (engine)':ok?'mcwBuyX':'card without the mc road'}
  else{cls='NPC';ok=npc;why=npc?'two-way mcwNpc':'no NPC warning'}
  if(!ok)gap++;rows.push(`${ok?'ok ':'GAP'}  ${cls.padEnd(4)} ${(f+':'+(i+1)).padEnd(20)} ${w.padEnd(12)} ${why}`)}})}
console.log(rows.join('\n'));
const W=[['warning hook on a new mc piece (evA → mcwHit)',hook],['monthly servant tick (j42 mcwMonth)',month],['tier card PEND.mcWarn nhẹ/vừa/nặng',card],['two-way NPC servants (mcwNpc)',npc]];
for(const [n,c] of W){console.log(`${c?'ok ':'GAP'}  BEAT ${n}`);if(!c)gap++}
console.log(`\nTMK-WARN SCAN: ${gap} gap(s) · sites ${rows.length}`);process.exit(gap?1:0);
