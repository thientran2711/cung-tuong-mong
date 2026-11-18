/* road-hp-bal (QUESTLINE Q3, review/questline-q3): month-loop lives in the real build (npc-roads-bal.js pattern: monthTick() directly,
   sensible care, the other dialogs cleared). Her own road is PLAYED: every j67 hồi card is answered by a plain player who takes the option
   with the best odds (a «Nhờ» option is taken like any other). Styles: off = helpers switched off (window.__hpoff = 1, today's roll) · on.
   Styles ask / askoff: the same player, but she ALWAYS takes a «Nhờ» option when the hồi has one (engine on / off) — the upper bound of the change.
   Reads: (1) the helper answers drawn (full / half / no / sab / lk) by helper type and by nết × liking group, and the expected shares of every
   tagged option SHOWN (rdHpW of the real helper at that moment, a larger sample); (2) her road chapters won / middle / lost (on vs off).
   usage: node dev/measure/road-hp-bal.js <url> <lives per style> <years> [styles=off,on] [json out] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,NL,NY,STY,OUT]=process.argv;const LIVES=+NL||10,YEARS=+NY||12,STYLES=(STY||'off,on').split(',');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const errs=[];const all={};
 for(const style of STYLES){all[style]=[];const CH=5;
  for(let done=0;done<LIVES;done+=CH){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});const page=await ctx.newPage();
   await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());page.on('pageerror',e=>errs.push(style+': '+e.message.slice(0,200)));
   await page.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await page.waitForFunction(()=>typeof start==='function'&&typeof rdHpWho==='function',null,{timeout:0});await page.waitForTimeout(1500);
   const part=await page.evaluate(([style,N,Y])=>{const out=[];try{document.getElementById('title').hidden=true}catch(e){}
    window.__hpoff=/off$/.test(style)?1:0;const ASK=/^ask/.test(style);window.__hpLog=1;
    for(let l=0;l<N;l++){let ok=false;for(let t=0;t<3&&!ok;t++){quiet=true;start();quiet=false;Q.length=0;ok=!!(S&&S.origin)}if(!ok){out.push({err:'boot'});continue}
     window.__hpS=[];const exp=[],cen=[];let errs=0,cards=0,picks=0,hpPick=0;
     const play=()=>{let g=0;/* she plays the «Mệnh truyện» card whenever it is offered (the only way a chapter moves on) */try{const M=S.st.M;if(storyActs67().length&&M){Q.length=0;fireBeat67(M)}}catch(e){errs++}
      while(Q.length&&g++<40){const d=Q[0];if(d&&d.pid==='j67'&&d.pp&&Array.isArray(d.opts)&&d.opts.length){cards++;
        try{const A=th67(d.pp.t),bb=A&&beatDef67(A,d.pp.b);if(A&&bb&&!window.__hpoff){opts67(A,bb).forEach(o=>{const tg=rdHpTag(A,d.pp.b,o);if(tg){const P=rdHpWho(A,tg.hp),w=rdHpW(A,P);exp.push({type:P.type,role:P.role,net:rdHpTones?P.net:P.net,aff:P.aff,w,word:rdHpWord(P,w)})}})}}catch(e){errs++}
        const O=d.pp.o||[];let bi=0;O.forEach((x,i)=>{if((x==null?100:x)>(O[bi]==null?100:O[bi]))bi=i});
        /* ask / askoff: she always asks when a hồi offers a «Nhờ» option (the tag table is read in both, the engine only in ask) */
        if(ASK)try{const A=th67(d.pp.t),bb=beatDef67(A,d.pp.b),L=opts67(A,bb);const j=L.findIndex(o=>RDHP[A.a+':'+d.pp.b+':'+bb.o.indexOf(o)]);if(j>=0)bi=j}catch(e){}Q.shift();picks++;try{d.opts[bi].go()}catch(e){errs++}}
       else Q.shift()}};
     for(let m=0;m<Y*12&&!S.dead;m++){
      if(illOf(S)&&S.bac>=40){S.bac-=40;treat(S,'ty')}S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,2);S.bac=Math.max(S.bac,80);
      /* census (on, once a year): every live NPC consort as the helper {v} of a road hồi — the engine's weights for her real nết, liking, Tâm cơ, road; 10 draws each */
      if(style==='on'&&m%12===11)try{for(const v of rivals){if(!v.alive||v.out||v.coop)continue;const P=rdHpWho({act:{v:v.id},f:{}},'v');if(P.p!==v)continue;const w=rdHpW(null,P);
        exp.push({type:'rv (census)',role:'v',net:P.net.slice(),aff:P.aff,w,word:rdHpWord(P,w)});for(let t=0;t<10;t++){const T=w[0]+w[1]+w[2]+w[3];let r=Math.random()*T,k=0;for(;k<3;k++){r-=w[k];if(r<0)break}cen.push({type:'rv (census)',net:P.net.slice(),aff:P.aff,k:k===3&&P.net.includes('Nhiều chuyện')?4:k})}}}catch(e){errs++}
      try{monthTick()}catch(e){errs++}Q.length=0;for(let r=0;r<3;r++){try{play()}catch(e){errs++}}}
     let won=0,mid=0,lost=0;try{const c=S.st.ch,rd=S.st.f14&&S.st.f14.rd;for(const p of (c&&c.past)||[]){const a=ARC67[p.a];if(!a||!(p.a===rd||a.road===rd||a.o==='rd'))continue;if(p.k>0)won++;else if(p.k<0)lost++;else mid++}}catch(e){errs++}
     out.push({style,origin:S.origin&&S.origin.k,road:S.st&&S.st.f14&&S.st.f14.rd,dead:!!S.dead,won,mid,lost,cards,picks,draws:window.__hpS.slice(),cen,exp,errs})}
    return out},[style,Math.min(CH,LIVES-done),YEARS]);all[style].push(...part);await ctx.close()}}
 const sum=(L,f)=>L.reduce((a,x)=>a+f(x),0),pc=(a,b)=>b?(100*a/b).toFixed(0):'-';
 console.log(`road-hp-bal: ${LIVES} lives × ${YEARS} years per style`);
 console.log('style | lives | road chapters won / mid / lost | won share | j67 cards | page-errors');
 for(const s of STYLES){const L=all[s].filter(x=>!x.err);const W=sum(L,x=>x.won),M=sum(L,x=>x.mid),Lo=sum(L,x=>x.lost);
  console.log(`${s} | ${L.length} | ${W} / ${M} / ${Lo} | ${pc(W,W+M+Lo)}% | ${sum(L,x=>x.cards)} | ${sum(L,x=>x.errs)}`)}
 const on=(all.on||all.ask||[]).filter(x=>!x.err).concat(all.on&&all.ask?all.ask.filter(x=>!x.err):[]);const D=on.flatMap(x=>x.draws),C=on.flatMap(x=>x.cen||[]),E=on.flatMap(x=>x.exp);
 const K=['hết lòng','qua loa','từ chối','phá ngầm','mách lẻo'];
 const tab=(rows,key,isDraw)=>{const g={};for(const r of rows){const k=key(r);if(k==null)continue;const G=g[k]=g[k]||{n:0,v:[0,0,0,0,0]};G.n++;
   if(isDraw)G.v[r.k]++;else{const T=r.w[0]+r.w[1]+r.w[2]+r.w[3]||1;const lk=r.net.includes('Nhiều chuyện');for(let i=0;i<4;i++){const x=r.w[i]/T;if(i===3&&lk)G.v[4]+=x;else G.v[i]+=x}}}
  for(const [k,G] of Object.entries(g).sort((a,b)=>b[1].n-a[1].n))console.log(`  ${k} | ${G.n} | ${G.v.map(x=>pc(x,G.n)).join(' / ')}`)};
 const grp=r=>{const n=r.net||[];const warm=r.aff>=15,cold=r.aff<=-15;if(n.includes('Kiêu ngạo')&&cold)return 'cold Kiêu ngạo';if(n.includes('Ân cần')&&warm)return 'warm Ân cần';
  if(n.includes('Kiêu ngạo'))return 'Kiêu ngạo (any liking)';if(n.includes('Ân cần'))return 'Ân cần (any liking)';return null};
 console.log(`\nanswers DRAWN (on): ${D.length} — share % ${K.join(' / ')}`);console.log('  by helper type | n | shares');tab(D,r=>r.type,1);console.log('  by nết × liking | n | shares');tab(D,grp,1);
 console.log(`\nCENSUS draws (on): every live NPC consort as helper {v}, 10 draws a year: ${C.length} — share % ${K.join(' / ')}`);console.log('  by nết × liking | n | shares');tab(C,grp,1);tab(C,r=>r.aff>=15?'liking ≥ 15':r.aff<=-15?'liking ≤ −15':'liking −14…14',1);
 console.log(`\nEXPECTED shares of every tagged option SHOWN (on): ${E.length} — share % ${K.join(' / ')}`);console.log('  by helper type | n | shares');tab(E,r=>r.type,0);console.log('  by nết × liking | n | shares');tab(E,grp,0);
 const wc={};for(const r of E)wc[r.word]=(wc[r.word]||0)+1;console.log('  words shown:',JSON.stringify(wc));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all));console.log('page errors:',errs.length,errs.slice(0,5).join(' | '));await b.close()})();
