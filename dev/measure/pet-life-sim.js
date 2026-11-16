/* Pet lifespan unit + sim (jpetlife CORE in node). usage: node dev/measure/pet-life-sim.js [N]
   Per species: mean / min / max lifespan (years) without and with good care, % alive after one kiếp (BAL.pet.life.kiepY? no: KIEP years below,
   taken from the human dice mean − entry age), care years never above careMax (hard ceiling). Every number is read from BAL.pet.life. */
const fs=require('fs'),path=require('path');const src=fs.readFileSync(path.join(__dirname,'../build/jpetlife.js'),'utf8');
global.BAL={pet:{}};global.window=global;
eval(src.slice(src.indexOf('Object.assign(BAL.pet'),src.indexOf('/*CORE{*/')));eval(src.slice(src.indexOf('/*CORE{*/'),src.indexOf('/*}CORE*/'))+';global.plRoll=plRoll;global.plCareYear=plCareYear;global.plDice=plDice');
const L=BAL.pet.life,N=+process.argv[2]||4000,KIEP=30;let fail=0;const out=[];
function life(k,care){const P={care:care?85:55,aff:care?80:40,lifeX:0};let life=plRoll(k,0);for(let y=1;y<=life;y++){const x0=P.lifeX,x=plCareYear(P,k);life+=x-x0;P.lifeX=x;if(P.lifeX>plDice(k).careMax){fail++;console.log('CEILING BROKEN',k)}}return{life,x:P.lifeX}}
for(const k of Object.keys(L.grp)){const c=plDice(k);const R={};for(const care of [0,1]){let s=0,mn=1e9,mx=0,alive=0,old=0,xs=0;
  for(let i=0;i<N;i++){const r=life(k,care);s+=r.life;mn=Math.min(mn,r.life);mx=Math.max(mx,r.life);if(r.life>KIEP)alive++;if(r.life>=c.old)old++;xs+=r.x}
  R[care]={mean:(s/N).toFixed(1),mn,mx,alive:Math.round(alive/N*100),old:Math.round(old/N*100),x:(xs/N).toFixed(2)};
  if(mn<c.lo||mx>c.hi+c.careMax){fail++;console.log('RANGE',k,mn,mx)}}
 if(c.mean>=50&&R[0].mean<40){fail++}
 out.push(`| ${k} | ${L.grp[k]} | ${c.old} | ${R[0].mean} (${R[0].mn}–${R[0].mx}) | ${R[1].mean} (${R[1].mn}–${R[1].mx}) | +${R[1].x} (max ${c.careMax}) | ${R[0].old}% / ${R[1].old}% | ${R[0].alive}% / ${R[1].alive}% |`)}
/* conditioned roll: never below the present age */
for(let i=0;i<2000;i++){const a=Math.random()*20;if(plRoll('meomuop',a)<a){fail++;break}}
console.log(`| species | group (BAL.pet.life.grp) | Già at (dice.old) | life, ordinary care: mean (min–max) | life, good care | care years gained (dice.careMax) | reach Già no/good care | alive after ${KIEP} yrs no/good care |`);
console.log('|---|---|---|---|---|---|---|---|');console.log(out.join('\n'));console.log(fail?`FAIL ${fail}`:'PASS: ranges within dice lo..hi+careMax, care ceiling held, conditioned roll ok');process.exit(fail?1:0)
