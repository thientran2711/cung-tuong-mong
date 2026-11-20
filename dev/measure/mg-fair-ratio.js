/* mg-fair-ratio measure (owner OD 20/11 ~06:20Z: "chỉnh cái tỷ lệ của những người giỏi hơn tôi, những người bằng tôi và những người dở hơn tôi … cho nó
   giống với đời thật"; MAIN ROOT-74 split per skill group, BAL.ag.mg2.hand split / grp). node dev/measure/mg-fair-ratio.js [dev/index.html] [contests]
   (BELL CURVE, owner OD 20/11 ~06:40Z, OK ~07:15Z: NPC average play ~ Normal(ctr, sd) per kind, BAL.ag.mg2.hand ctr / sd / eqZ / grp.)
   D  HER PLACE per calibrated kind: z of her b on the curve + better / about equal / worse shares (jmgcal mgCalShare).
   A  CONTEST (occ hoi, her rank 3, 6 entrants = her + 5 NPCs): her P(1st) / P(top 3) / mean place per kind at her art level L = −1 / 0 / +1 / +2
      (L −1 = one level under the matching board: a sở đoản). Her play = her calibrated base b
      (BAL.ag.mg2.cal.k) + her board shift (mgMedD(d0 − L) − mgMedD(0)) + the same roll the NPC play has (w·(u − .5), u = mean of 3), rounded 0..10.
      The 5 NPCs: own art 0, rank 3, upbringing = an identity drawn by the roulette weights BAL.orig.ow (nc: half Bắc Địch) and a random road of it
      (BAL.orig.art bậc → the NPC's lift and board, mgOrgLv), play = mgNpcRaw(kind, npc, {occ:"hoi"}). Ties: random order inside the tie.
   B  IDENTITY ±2 ON THE RESULT (cal-p2, OD 20/11 08:30Z method): at L 0, her play + δ (δ = −2 sở đoản / 0 / +2 sở trường), clamped 0..10.
   C  NPC PROMOTION-EXAM PASS RATE (the reviewer's flag 3–9 % → 87–94 %): mean exChance over every live consort (rank < 7) of N fresh courts, same courts
      for every scenario (here: the bell curve; her b no longer moves NPC hands). Run this file on a main build too (only C prints there: "C main"). */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const NC=+(process.argv[3]||3000);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const T=await p.evaluate((NC)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,C=BAL.ag.mg2.cal,out={main:typeof mgCalShare!=="function"};
  const R=(x,d)=>Math.round(x*Math.pow(10,d||0))/Math.pow(10,d||0);
  /* C first (works on main builds too) */
  {const N=8,sc=out.main?{main:[]}:{bell:[]};
   for(let g=0;g<N;g++){window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const L=liveRivals(true).filter(v=>v&&v.alive&&v!==S&&rkOf(v)<7);
    const run=key=>{const a=L.map(v=>{try{return exChance(v)}catch(e){return null}}).filter(x=>x!=null);sc[key].push(...a)};
    run(out.main?"main":"bell")}
   out.C={};for(const k in sc){const a=sc[k];a.sort((x,y)=>x-y);out.C[k]={n:a.length,mean:R(a.reduce((s,x)=>s+x,0)/Math.max(1,a.length),1),min:a[0],p10:a[Math.floor(a.length*.1)],median:a[a.length>>1]}}}
  if(out.main)return out;
  /* A / B */
  window.__nlInner=1;start();window.__nlInner=0;Q.length=0;S.rank=3;S.origin=originByKey("thd");
  const OW=BAL.orig.ow,ORGS=Object.keys(OW),TOT=ORGS.reduce((s,k)=>s+OW[k],0);
  const pickOrg=u=>{let x=u*TOT;for(const k of ORGS){x-=OW[k];if(x<0)return k}return ORGS[0]};
  const POOL=[];for(let i=0;i<2500;i++){let o=pickOrg(Math.random());if(o==="nc"&&Math.random()<.5&&BAL.orig.art.bd)o="bd";const rs=Object.keys(BAL.orig.art[o]||{}).filter(r=>r);const r=rs[Math.floor(Math.random()*rs.length)];
   POOL.push({name:"P"+i,id:80000+i,rank:3,arts:{},vir:{},alive:true,ag:{o},nr:{o,r}})}
  const KINDS={c:["co","ve","tho","kim"],a:["dan","hoa","mua","huong"],r:["ban","tat","ne","dauho"]};
  const contest=(kind,L,delta,n)=>{const e=C.k[kind],base=e?e.b:mgMedD(0);const stats=kg82FormulaOf(kind).map(x=>x[0]).filter(s=>s!=="help"&&!KG82_STAT[s]);const keepA=Object.assign({},S.arts);
   stats.forEach(s=>S.arts[s]=Math.max(0,L));const d0=mgTier(kind,{occ:"hoi",rank:3,lv:0}).d,sh=mgMedD(d0-L)-mgMedD(0);let p1=0,p3=0,pl=0;
   for(let t=0;t<n;t++){const u=(Math.random()+Math.random()+Math.random())/3,me=cl(Math.round(base+sh+H.w*(u-.5))+delta,0,10);let above=0,tie=0;
    for(let j=0;j<5;j++){const q=POOL[Math.floor(Math.random()*POOL.length)],x=mgNpcRaw(kind,q,{occ:"hoi"});if(x>me)above++;else if(x===me)tie++}
    const place=1+above+Math.floor(Math.random()*(tie+1));if(place===1)p1++;if(place<=3)p3++;pl+=place}
   S.arts=keepA;return{p1:R(100*p1/n),p3:R(100*p3/n),pl:R(pl/n,1)}};
  out.A={};out.B={};for(const g in KINDS)for(const kind of KINDS[g]){const e=C.k[kind];out.A[kind]={g,b:e?e.b:null,new:[]};
   for(const L of [-1,0,1,2])out.A[kind].new.push(contest(kind,L,0,NC));
   out.B[kind]={g,b:e?e.b:null,r:[-2,0,2].map(dl=>contest(kind,0,dl,NC))}}
  out.D=Object.keys(C.k).map(k=>Object.assign({k,g:mgCalGrp(k)},mgCalShare(k)));
  return out},NC);
 const f=c=>`${c.p1}/${c.p3}/${c.pl}`;
 if(T.C){console.log('C exam pass (exChance %, every live consort rank<7, 8 fresh courts):');for(const k in T.C)console.log(`  ${k}: ${JSON.stringify(T.C[k])}`)}
 if(T.main){await b.close();return}
 console.log('\nD her place on the curve (better / about equal / worse, % of NPCs before art / upbringing lifts)');console.log('| kind | group | her b | z | better | equal | worse |');console.log('|---|---|---|---|---|---|---|');
 for(const d of T.D.sort((x,y)=>(x.g+x.k).localeCompare(y.g+y.k)))console.log(`| ${d.k} | ${d.g} | ${d.b} | ${d.z} | ${Math.round(d.better*100)} | ${Math.round(d.equal*100)} | ${Math.round(d.worse*100)} |`);
 console.log('\nA contest P1st/Ptop3/mean place at her level -1 | 0 | +1 | +2');
 console.log('| kind (group, b) | L−1 | L0 | L+1 | L+2 |');console.log('|---|---|---|---|---|');
 const gm={};for(const k in T.A){const a=T.A[k];console.log(`| ${k} (${a.g}, ${a.b}) | ${a.new.map(f).join(' | ')} |`);(gm[a.g]=gm[a.g]||[]).push(a)}
 for(const g in gm){const m=(i,key)=>Math.round(gm[g].reduce((x,a)=>x+a.new[i][key],0)/gm[g].length*10)/10;console.log(`| **${g} mean** | ${[0,1,2,3].map(i=>`${m(i,'p1')}/${m(i,'p3')}/${m(i,'pl')}`).join(' | ')} |`)}
 console.log('\nB identity on the RESULT at L0: sở đoản −2 | none | sở trường +2');
 console.log('| kind (group, b) | −2 | 0 | +2 |');console.log('|---|---|---|---|');
 for(const k in T.B){const a=T.B[k];console.log(`| ${k} (${a.g}, ${a.b}) | ${a.r.map(f).join(' | ')} |`)}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
