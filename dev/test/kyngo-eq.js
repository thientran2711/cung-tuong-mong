/* kyngo-eq: law 2 (equal-value choices) + law 3 (gain-and-loss) check of every kỳ ngộ encounter, from BAL.kyngo alone (jbalky.js).
   usage: node dev/test/kyngo-eq.js   → table per encounter × band; exit 1 on any FAIL.
   Value of an option = Σ gains × vw + special value sv[s] − Σ costs × vw, × V[band] (the same formula the NPCs pick by: jky optVal).
   FAIL: (a) max/min option value of one encounter > eqTol; (b) an option of a choice with no gain or no real cost (MAIN 19/11 09:00Z (d):
   a loss of only "no X" is not a cost); (c) a «plain» encounter carrying a cost. */
const fs=require('fs'),path=require('path');const BAL={};
new Function('BAL',fs.readFileSync(path.join(__dirname,'../build/jbalky.js'),'utf8'))(BAL);const B=BAL.kyngo;
function val(O,b){let v=0;for(const k in O.g||{})v+=O.g[k]*(k==='sucR'?B.sucRest:1)*(B.vw[k]||0);if(O.s)v+=B.sv[O.s]||0;for(const k in O.c||{})v-=O.c[k]*(B.vw[k]||0);return +(v*(B.V[b]||1)).toFixed(1)}
const cost=O=>Object.keys(O.c||{}).some(k=>O.c[k]>0&&(B.vw[k]||0)>0);
const gain=O=>Object.keys(O.g||{}).some(k=>O.g[k]>0)||(O.s&&(B.sv[O.s]||0)>0)||O.buy;
let bad=0;const rows=[];
for(const id in B.E){const E=B.E[id];
 if(E.plain){const ok=!E.plain.c&&gain(E.plain);if(!ok)bad++;rows.push([id,'plain',E.b,val(E.plain,+E.b[0]),'',ok?'ok':'FAIL plain']);continue}
 for(const b of String(E.b).split('').map(Number)){const V=E.o.map(O=>val(O,b));const mx=Math.max(...V),mn=Math.min(...V);const r=mn>0?mx/mn:99;
  const why=[];if(r>B.eqTol)why.push('unequal '+r.toFixed(2));E.o.forEach((O,i)=>{if(!gain(O))why.push(`opt${i+1} no gain`);if(!cost(O)&&!O.buy)why.push(`opt${i+1} no real cost`)});
  if(why.length)bad++;rows.push([id,'band '+b,'',V.join(' / '),r.toFixed(2),why.length?'FAIL '+why.join(', '):'ok'])}}
console.log('id | band | bands | values | max/min | verdict');for(const r of rows)console.log(r.join(' | '));
console.log(bad?`FAIL ${bad}`:'PASS (eqTol '+B.eqTol+')');process.exit(bad?1:0);
