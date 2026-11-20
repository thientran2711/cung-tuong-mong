/* CAL-P2C bot table (owner OD 20/11 ~07:35Z / ~07:55Z / ~08:00Z; jmgid). node dev/measure/cal-p2c.js [index.html] [--n 3000] [--sd 1.2]
   A per kind (her counted first tries, BAL.ag.mg2.cal.k): her seeded b on the owner device, offset sở trường / bình thường / sở đoản at the seed and after 10 plays
     at her real hand (b → her hand); B per class: her place vs a field of 5 NPCs on a matching board (d 0): each NPC = a random identity (origin × road of
     BAL.orig.art), the real jmgt mgNpcRaw (bell hand + upbringing lift + the same identity class shift); her play = her hand + N(0, sd) graded, + her offset.
   C the rolling b of a weak hand (5) played as sở trường: b and her mean result after 0 / 1 / 3 / 5 / 10 / 20 plays. Player words never show these (law 7). */
const {chromium}=require('playwright');const path=require('path');const A=process.argv.slice(2);const opt=(k,d)=>{const i=A.indexOf('--'+k);return i<0?d:+A[i+1]};
const URL='file://'+path.resolve(A.find(a=>!a.startsWith('--')&&isNaN(+a))||'index.html');const N=opt('n',3000),SD=opt('sd',1.2);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const out=await p.evaluate(([N,SD])=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  localStorage.setItem('ctm-owner-cal','1');const I=BAL.orig.id,K=BAL.ag.mg2.cal.k,T=I.tgt;for(const a in S.arts)S.arts[a]=0;for(const a in (S.vir||{}))S.vir[a]=0;
  let z=1;const rnd=()=>{z=(z*16807)%2147483647;return z/2147483647};const gauss=()=>Math.sqrt(-2*Math.log(Math.max(1e-9,rnd())))*Math.cos(2*Math.PI*rnd());
  const roads=[];for(const o in BAL.orig.art)for(const r in BAL.orig.art[o])if(r)roads.push([o,r]);
  const kinds=Object.keys(K).filter(k=>KG82_KIND[k]);const r1=x=>Math.round(x*10)/10;const tab=[];
  for(const k of kinds){const h=+K[k].b;delete S.mgB;const bs=mgIdB(k,S);
   const E=()=>{S.mgB=S.mgB||{};return S.mgB[k]};KG82.tier={kind:k,d:0};for(let i=0;i<10;i++){const g=cl(Math.round(h+SD*gauss()),0,10);mgIdRes(k,g)}const b10=mgIdB(k,S);
   const row={k,h,noSeed:I.noSeed.includes(k),bSeed:r1(bs),off0:{tr:r1(T.tr-bs),bt:r1(T[""]-bs),dn:r1(T.doan-bs)},b10:r1(b10),off10:{tr:r1(T.tr-b10),bt:r1(T[""]-b10),dn:r1(T.doan-b10)},cls:{}};
   for(const [c,tg] of [['tr',T.tr],['bt',T[""]],['dn',T.doan]]){let w=0,t3=0,mean=0;
    for(let n=0;n<N;n++){const me=cl(Math.round(cl(Math.round(h+SD*gauss()),0,10)+tg-b10),0,10);mean+=me;let better=0,tie=0;
     for(let j=0;j<5;j++){const [o,r]=roads[Math.floor(rnd()*roads.length)];const v={name:'N'+n+'_'+j,id:50000+n*5+j,nr:{o,r},arts:{},vir:{}};const x=mgNpcRaw(k,v,{d:0,rnd});if(x>me)better++;else if(x===me)tie++}
     const place=1+better+tie*rnd();if(place<1.5||(better===0&&tie===0))w++;if(better+tie<3||(better<3&&place<=3))t3++}
    row.cls[c]={p1:Math.round(100*w/N),p3:Math.round(100*t3/N),mean:r1(mean/N)}}
   tab.push(row)}
  /* C */
  const C=[];delete S.mgB;const kk='tat';const hW=5;KG82.tier={kind:kk,d:0};const at=[0,1,3,5,10,20];let n=0;
  for(const m of at){while(n<m){mgIdRes(kk,cl(Math.round(hW+SD*gauss()),0,10));n++}const bb=mgIdB(kk,S);C.push({plays:m,b:r1(bb),meanTr:r1(cl(hW+T.tr-bb,0,10))})}
  localStorage.removeItem('ctm-owner-cal');return{tab,C}},[N,SD]);
 const L=[];L.push(`| kind | her hand | b seed | off tr/bt/dn @seed | b@10 | off tr/bt/dn @10 | sở trường P1st/Ptop3/mean | bình thường | sở đoản |`);L.push('|---|---|---|---|---|---|---|---|---|');
 for(const r of out.tab)L.push(`| ${r.k}${r.noSeed?' *':''} | ${r.h} | ${r.bSeed} | ${r.off0.tr}/${r.off0.bt}/${r.off0.dn} | ${r.b10} | ${r.off10.tr}/${r.off10.bt}/${r.off10.dn} | ${r.cls.tr.p1}/${r.cls.tr.p3}/${r.cls.tr.mean} | ${r.cls.bt.p1}/${r.cls.bt.p3}/${r.cls.bt.mean} | ${r.cls.dn.p1}/${r.cls.dn.p3}/${r.cls.dn.mean} |`);
 console.log(L.join('\n'));console.log('\n* = noSeed (first try on a broken board: b starts at the prior 7.5)\n');
 console.log('| plays | b (weak hand 5, tat) | mean result as sở trường |\n|---|---|---|\n'+out.C.map(c=>`| ${c.plays} | ${c.b} | ${c.meanTr} |`).join('\n'));
 await b.close()})();
