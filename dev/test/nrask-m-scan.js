/* Q1c scan (jnrask_m.js, engine shape of Q1a: NRASK["<template>_<n>"]=[ask, ask], ask={k,c,h,o:[[label,loss],[label,loss]]}; ≥2 asks of different kinds per chapter, «do» names {B}): coverage of the men help
   chapters (princes excluded: they never ask), each option matches its stock cost (Sức / bạc, builder order), variety (no shared sentence
   inside the file nor with the 8 stock cards of jnroad.js), VANPHONG (no %, no digits, no consort/maid pronoun typed for a man), slots.
   Run: node dev/test/nrask-m-scan.js */
const fs=require('fs'),path=require('path');const B=path.join(__dirname,'../build/');
global.window=global;global.NRM={};
const bal=fs.readFileSync(B+'jbal2.js','utf8');const [h0,h1]=JSON.parse((bal.match(/helpN:(\[[^\]]*\])/)||[])[1]);
global.BAL={road:{first:5,last:11},arc:{tier:{win:1,mid:0,lose:-1}}};
const jm=fs.readFileSync(B+'jnroadm.js','utf8');const s0=jm.indexOf('(function(){const MID');eval(jm.slice(s0,jm.indexOf('})();',s0)+5));
const src=fs.readFileSync(B+'jnrask_m.js','utf8');eval(src);
let bad=[];const KINDS=["emp","th","hh","thu","do","y","che"];
const ORD={emp:["suc","bac"],th:["suc","bac"],hh:["suc","bac"],che:["suc","bac"],thu:["bac","suc"],do:["bac","suc"],y:["bac","suc"]};
/* cost words: a Sức option (công sức, no money) must not say it pays (the stock bạc options, e.g. «Sai người dò la», may leave the
   payment to the cost chip of the option card) */
const PAY=/(lót tay|thuê|trả công|biếu|thưởng|góp bạc|bỏ bạc|cúng|mua)/i;
const fill=(t,v)=>t.replace(/\{Me\}/g,v.me[0].toUpperCase()+v.me.slice(1)).replace(/\{me\}/g,v.me).replace(/\{Call\}/g,v.call[0].toUpperCase()+v.call.slice(1)).replace(/\{call\}/g,v.call).replace(/\{he\}/g,"hắn").replace(/\{B\}/g,v.B);
const voices=[{me:"nô tài",call:"nương nương",B:"kẻ kia"},{me:"thần",call:"tiểu chủ",B:"Lý Thống"},{me:"bản vương",call:"nương nương",B:"kẻ kia"}];
const nosay=/(\d|%|chắc chắn|thần thiếp|bổn cung|muội muội|tỷ tỷ|nô tỳ|\bok\b)/i;
const sents=new Map();const addS=(t,where)=>{for(const x of t.split(/(?<=[.;:?!])\s+/).map(z=>z.trim().replace(/[.;:?!]+$/,'')).filter(z=>z.length>12)){if(sents.has(x)&&sents.get(x)!==where)bad.push(`shared sentence: «${x}» ${sents.get(x)} / ${where}`);sents.set(x,where)}};
const jr=fs.readFileSync(B+'jnroad.js','utf8');for(const m of jr.matchAll(/O\("([^"]+)"/g))addS(m[1],'stock');for(const m of jr.matchAll(/lx:"([^"]+)"/g))addS(m[1],'stock');
/* the costs as written in the rows (the builder already ordered them; re-read the rows to check the label fits its cost) */
const rowsCost=new Map();for(const m of src.matchAll(/\["([^"]+)","(suc|bac)","([^"]+)"\]/g))rowsCost.set(m[1],m[2]);
const labels=new Map();let n=0,roads=0;
for(const id in NRM){const R=NRM[id];
 if(R.k==="hz"){for(let c=h0;c<=h1;c++)if(NRASK[id+"_"+c])bad.push(`${id}_${c}: prince roads never ask (e.a=null)`);continue}roads++;
 for(let c=h0;c<=h1;c++){const k0=id+"_"+c,L=NRASK[k0];if(!R.c[c])continue;if(!L){bad.push(`missing ${k0}`);continue}
  if(!Array.isArray(L)||L.length<2){bad.push(`${k0}: needs a list of ≥ 2 asks`);continue}
  if(new Set(L.map(a=>a.k)).size<L.length)bad.push(`${k0}: two asks of one kind (want a different kind / shape)`);
  L.forEach((E,ai)=>{const k=k0+"["+ai+"]";n++;
  if(E.k==="do"&&!/\{B\}/.test(E.h))bad.push(`${k}: a «do» ask must name {B}`);
  if(!KINDS.includes(E.k))bad.push(`${k}: kind ${E.k} not an allowed help kind (bạc off)`);
  if(!/\{[Mm]e\}/.test(E.h))bad.push(`${k}: ask has no {me} voice slot`);if(!E.c)bad.push(`${k}: no step title`);
  addS(E.h,k);if(!(E.o&&E.o.length===2))bad.push(`${k}: need 2 options`);
  E.o.forEach((o,i)=>{const [L,lx]=o;if(!L||!lx)bad.push(`${k}: option ${i} needs label + loss line`);
   const want=ORD[E.k][i];if(rowsCost.get(L)!==want)bad.push(`${k}: option ${i} «${L}» is ${rowsCost.get(L)}, stock wants ${want}`);
   if(want==="suc"&&PAY.test(L))bad.push(`${k}: Sức option «${L}» says it pays`);
   if(labels.has(L))bad.push(`dup label «${L}» ${labels.get(L)} / ${k}`);labels.set(L,k);addS(L,k+'/x');addS(lx,k+'/lx')});
  for(const v of voices){for(const t of [E.c,E.h].concat(...E.o)){const f=fill(t,v);if(/[{}]/.test(f))bad.push(`${k}: unknown slot in «${t}»`);if(nosay.test(f))bad.push(`${k}: VANPHONG «${f.match(nosay)[0]}» in «${f}»`)}}})
 }}
console.log(`roads ${roads} (hz excluded), asks ${n}, labels ${labels.size}, sentences ${sents.size}`);
if(bad.length){console.log(bad.join('\n'));process.exit(1)}console.log('PASS nrask-m-scan');
