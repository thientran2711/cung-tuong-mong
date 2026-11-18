/* nroadhp-bal (QUESTLINE Q2, jnroadhp.js): the npc-roads-bal.js month loop (bond player: gifts, loyal household, men fond of her) in 3 styles:
     off    — Q2 switched off (window.__nrhpoff = 1), the bond player helps (option 0) — the baseline;
     help   — Q2 on, the bond player helps (option 0) every help hồi;
     betray — Q2 on, the bond player betrays (option 2, «Đem chuyện mách») every help hồi that has someone to tell.
   Reads per life (audit Measures line): help hồi asked per NPC road per life (≈ unchanged), the NPC Hoàng hậu seat share (Q2 does not
   inflate the harem), her death %, her Danh; Q2: hp records, finale rewards, betrayals found out (by carrier) and the oán they added.
   usage: node dev/measure/nroadhp-bal.js <url> <lives per style> <years> [styles=off,help,betray] [json out] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,NL,NY,STY,OUT]=process.argv;const LIVES=+NL||10,YEARS=+NY||15,STYLES=(STY||'off,help,betray').split(',');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const errs=[];const all={};
 for(const style of STYLES){all[style]=[];const CH=5;
  for(let done=0;done<LIVES;done+=CH){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});const page=await ctx.newPage();
   await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());page.on('pageerror',e=>errs.push(style+': '+e.message.slice(0,200)));
   await page.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await page.waitForFunction(()=>typeof start==='function'&&typeof nrMonth==='function',null,{timeout:0});await page.waitForTimeout(1500);
   const part=await page.evaluate(([style,N,Y])=>{const out=[];const clr=()=>{try{Q.length=0}catch(e){}};try{document.getElementById('title').hidden=true}catch(e){}
    window.__nroff=0;window.__nrhpoff=style==='off'?1:0;const OI=style==='betray'?2:0;
    for(let l=0;l<N;l++){let ok=false;for(let t=0;t<3&&!ok;t++){quiet=true;start();quiet=false;clr();ok=!!(S&&S.origin)}if(!ok){out.push({err:'boot'});continue}
     const asked=new Map(),played={rv:0,sv:0,men:0},shown={rv:0,sv:0,men:0},helped={rv:0,sv:0,men:0};let dead=null,errs=0;const lens=new Map();
     const kid0=new Set();
     for(let m=0;m<Y*12&&!S.dead;m++){
      if(illOf(S)&&S.bac>=40){S.bac-=40;treat(S,'ty')}S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,2);S.bac=Math.max(S.bac,80);
      if(true){const L=liveRivals(true);for(let i=0;i<3&&L.length;i++){const v=pick(L);relAdd(S,v,5)}if(S.maid)S.maid.loyal=Math.max(S.maid.loyal,85);(S.staff||[]).forEach(s=>{s.loyal=Math.max(s.loyal,70)});
       (S.men||[]).forEach(x=>{x.tinh=Math.min(100,(x.tinh||0)+4)});const C=S.court||{};for(const k in C){const c=C[k];if(c){c.af=c.af||{};c.af.me=Math.min(100,(c.af.me||0)+2)}}
       try{const T=trS();for(const c in T.H){const h=T.H[c];h.af=h.af||{};h.af.me=Math.min(100,(h.af.me||0)+2)}}catch(e){}}
      try{monthTick()}catch(e){errs++}clr();
      try{const q=q72();for(const c of q.ch.slice())if(/^nr_/.test(c.tid)){const g=c.rk==='rv'||c.rk==='hh'?'rv':c.rk==='sv'||c.rk==='rsv'||c.rk==='maid'?'sv':'men';asked.set(c.rk+':'+c.ri+':'+(c.p&&c.p.nr),g);q.ch.splice(q.ch.indexOf(c),1);
        /* fix: the bond player is SHOWN the request (the j72 offer card) and helps with the first option — the help hồi reaches her and
           the chapter waits for it (nrHold); others leave it unshown (withdrawn when the chapter falls due) */
        if(true){try{const T=T72I[c.tid],AA=q72A(c.rk,c.ri);const x=AA&&q72Make(T,AA);if(x){if(c.p)x.p=Object.assign({},c.p,x.p);if(c.bk&&x.bk==null){x.bk=c.bk;x.bi=c.bi}const d=PEND.q72o({x,how:'fu'});
          if(d&&!/chuyện lần trước/.test(d.t||'')){shown[g]++;q.a.push(x);let t=0;while(q.a.includes(x)&&t++<12){used=0;S.suc=Math.max(S.suc,60);q72Do(x.u,(OI===2&&!x.bk)?0:OI)}if(!q.a.includes(x))helped[g]++}}}catch(e){errs++}}}}catch(e){}
      const tally=(p,g)=>{if(p&&p.nr){const n=p.nr.l.length,o=lens.get(p)||0;if(n>o){played[g]+=n-o;lens.set(p,n)}}};
      rivals.forEach(v=>tally(v,'rv'));try{nrMaidL().concat(nrServL('eunuch')).forEach(s=>tally(s,'sv'));nrMenL().forEach(e=>tally(e.p,'men'))}catch(e){}}
     const A={rv:0,sv:0,men:0};for(const g of asked.values())A[g]++;
     const kidsAll=allKids();const avgL=(L,f)=>L.length?L.reduce((a,x)=>a+f(x),0)/L.length:0;
     const Q2={hp:0,hpP:0,hpN:0,fin:0,sb:0,sbK:0,by:{},roads:0};const ppl=[];rivals.forEach(v=>v.nr&&ppl.push(v.nr));try{nrMaidL().concat(nrServL('eunuch')).forEach(s=>s.nr&&ppl.push(s.nr));nrMenL().forEach(e=>e.p.nr&&ppl.push(e.p.nr))}catch(e){}
     for(const N of ppl){Q2.roads++;const H=N.hp||[];Q2.hp+=H.length;Q2.hpP+=H.filter(z=>z[1]>0).length;Q2.hpN+=H.filter(z=>z[1]<0).length;if(N.fin)Q2.fin++;if(N.sb){Q2.sb++;if(N.sb.k){Q2.sbK++;Q2.by[N.sb.by]=(Q2.by[N.sb.by]||0)+1}}}
     const oanMe=avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.oan||0);
     out.push({Q2,oanMe,style,dead:!!S.dead,years:S.year,danh:S.danh,sung:S.sung,pow:S.dad||0,npcDead:rivals.filter(v=>!v.alive).length,npcOut:rivals.filter(v=>v.alive&&v.out).length,
      npcN:rivals.length,npcDanh:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.danh||0),npcSung:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.sung||0),npcRank:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.rank||0),hh:rivals.some(v=>v.alive&&!v.out&&v.queen)?1:0,kidDead:kidsAll.filter(([k])=>!k.alive).length,kidN:kidsAll.length,played,asked:A,shown,helped,errs})}
    return out},[style,Math.min(CH,LIVES-done),YEARS]);all[style].push(...part);await ctx.close()}}
 const avg=(L,f)=>L.length?(L.reduce((a,x)=>a+f(x),0)/L.length):0;const f1=x=>x.toFixed(1);
 console.log(`nroadhp-bal: ${LIVES} lives × ${YEARS} years per style`);
 console.log('style | her death % | Danh | HH seat held % | NPC oán→her | help asked rv/sv/men | helped rv/sv/men | hp +/− | finale rewards | betrayals found out / betrayals (by carrier) | errors');
 for(const s of STYLES){const L=all[s].filter(x=>!x.err);const by={};L.forEach(x=>{for(const k in x.Q2.by)by[k]=(by[k]||0)+x.Q2.by[k]});
  console.log(`${s} | ${f1(avg(L,x=>x.dead?100:0))} | ${f1(avg(L,x=>x.danh))} | ${f1(avg(L,x=>x.hh*100))} | ${f1(avg(L,x=>x.oanMe))} | ${['rv','sv','men'].map(g=>f1(avg(L,x=>x.asked[g]))).join('/')} | ${['rv','sv','men'].map(g=>f1(avg(L,x=>x.helped[g]))).join('/')} | ${f1(avg(L,x=>x.Q2.hpP))}/${f1(avg(L,x=>x.Q2.hpN))} | ${f1(avg(L,x=>x.Q2.fin))} | ${f1(avg(L,x=>x.Q2.sbK))}/${f1(avg(L,x=>x.Q2.sb))} ${JSON.stringify(by)} | ${L.reduce((a,x)=>a+x.errs,0)}`)}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all));console.log('page errors:',errs.length,errs.slice(0,5).join(' | '));await b.close()})();
