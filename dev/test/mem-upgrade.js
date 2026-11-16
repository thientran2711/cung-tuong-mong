/* review/mem-upgrade: per-person fade, LIFELONG memories, memory-driven behaviour, CAUSE ledger (dev/build/jmem.js, BAL.mem / BAL.hook).
   usage: node dev/test/mem-upgrade.js <build url> <outdir> [WxH@dpr,...]   → JSON checks + card shot per size; exit 1 on a failed check.
   Serve dev/ with a UTF-8 charset header (see dev/PROGRESS_memories.md). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let fail=0;
 for(const sz of (SIZES||"755x1000@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await sleep(2500);
  const logic=await p.evaluate(()=>{const C={};const ok=(k,v,info)=>{C[k]={ok:!!v,info:info===undefined?null:info}};
   SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;kn();for(const v of rivals){S.met[v.id]=1}try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   const L=liveRivals(true).filter(v=>!v.queen);const [v0,v1,v2,v3]=L;const R0=roll;const fresh=v=>{v.mem={};v.cz={};v.oan=0;v.rel=0;v.ghen=0;v.slightAt=null;v.blamed={};for(const k in v.ro)v.ro[k]=0;for(const k in v.rl)v.rl[k]=0};
   [v0,v1,v2,v3].forEach(fresh);
   /* STORE: NPC memories live on the NPC (world state), hers in S.mem */
   memAdd(v0,S,"gift",{x:"Trâm ngọc"});memAdd(S,v0,"care");
   ok("store_npc_on_object",Array.isArray(v0.mem&&v0.mem.me)&&!S.mem[v0.id+"|me"],Object.keys(v0.mem||{}));ok("store_me_in_S",Array.isArray(S.mem["me|"+v0.id]));
   /* old save migration: an old S.mem pair of an NPC holder moves onto the NPC */
   v1.mem={};S.mem[v1.id+"|me"]=[{d:"rumor",s:-1,g:25,g0:25,k:0,n:1,w:wk(),dt:""}];delete S.mem._v;
   ok("migrate_old_save",memList(v1,S).length===1&&!S.mem[v1.id+"|me"]&&v1.mem.me.length===1);
   /* PER-PERSON FADE */
   const sv=(v,t)=>{v.trait=t[0];v.trait2=t[1]||null};const k=(v,s)=>memFadeK(String(v.id),s);
   sv(v2,["Hiền lành"]);sv(v3,["Hiểm độc","Thù dai"]);ok("fade_by_personality_bad",k(v3,-1)<k(v2,-1),[k(v3,-1),k(v2,-1)]);
   sv(v2,["Tham vọng"]);sv(v3,["Nhu mì","Trọng nghĩa"]);ok("fade_by_personality_good",k(v3,1)<k(v2,1),[k(v3,1),k(v2,1)]);
   const NM4=[v0,v1,v2,v3];const tr0=NM4.map(v=>[v.trait,v.trait2]);NM4.forEach(v=>sv(v,["Nhu mì"]));const ks=NM4.map(v=>k(v,-1));NM4.forEach((v,i)=>{v.trait=tr0[i][0];v.trait2=tr0[i][1]});ok("fade_spread_same_traits",new Set(ks).size>=2,ks);
   sv(v2,["Hiền lành"]);sv(v3,["Hiểm độc","Thù dai"]);[v2,v3].forEach(v=>{v.mem={};memAdd(v,S,"rumor")});
   for(let i=0;i<6;i++){S.turn++;memFade()}const g2=(memTop(v2,S)||{g:0}).g,g3=(memTop(v3,S)||{g:0}).g;ok("fade_6mo_grudge_kept_longer",g3>g2,{hienlanh:g2,thudai:g3});
   /* LIFELONG */
   v0.mem={};memAdd(v0,S,"poison");for(const d of ["care","apology","secret","humble","ally","provoke","vent"])memAdd(v0,S,d);memAdd(v0,S,"musk");
   const pz=memList(v0,S).find(m=>m.d==="poison");ok("life_flag",pz&&pz.L===1);
   for(let i=0;i<120;i++){S.turn++;memFade()}ok("life_never_fades",pz.g===pz.g0&&memList(v0,S).some(m=>m.d==="musk"),{g:pz.g,g0:pz.g0,list:memList(v0,S).map(m=>m.d+":"+m.g)});
   ok("life_word",memFadeWord(pz)==="khắc cốt ghi tâm");ok("life_line",/suốt đời/.test(memLine(v0,S,pz)),memLine(v0,S,pz));
   v1.mem={};memAdd(v1,S,"good",{g:65,x:"Cứu giá"});ok("life_by_weight",memTop(v1,S).L===1);
   /* BEHAVIOUR (2) danger: a lifelong wrong keeps the will to harm alive after Oán is gone */
   [v0,v1,v2,v3].forEach(fresh);sv(v2,["Kiêu ngạo"]);const d0=danger(v2,S);memAdd(v2,S,"poison");const d1=danger(v2,S);
   ok("behav_danger_from_memory",bandOf(d1)>=2&&bandOf(d0)===0,{before:d0,after:d1});
   for(let i=0;i<24;i++){S.turn++;memFade();oanMonth()}ok("behav_danger_lifelong",bandOf(danger(v2,S))>=2,danger(v2,S));
   /* goodGate: a big kindness → no harm even with Oán */
   fresh(v3);sv(v3,["Kiêu ngạo"]);v3.oan=70;const d3=danger(v3,S);memAdd(v3,S,"pardon");ok("behav_good_gate",bandOf(d3)>=2&&bandOf(danger(v3,S))===0,{before:d3,after:danger(v3,S)});
   /* (3) revenge in kind */
   fresh(v1);sv(v1,["Kiêu ngạo"]);v1.oan=65;const w=k=>{const O=mindMenu(v1,S);const x=O.find(o=>o[0]===k);const t=O.reduce((a,b)=>a+b[1],0);return x&&t?x[1]/t:0};
   const r0=w("rumor");memAdd(v1,S,"rumor");const r1=w("rumor");ok("behav_mirror",r1>r0,{before:r0,after:r1});
   /* (4) everyday dealings: who to turn to and what to do */
   fresh(v0);sv(v0,["Hiền lành"]);const cnt=()=>{let n=0,tot=0;const R0s={};for(const k in SOC){R0s[k]=SOC[k].run;SOC[k].run=(v,t)=>{if(k==="help"){tot++;if(t===S)n++}return""}}
     try{for(let i=0;i<1500;i++){v0.rel=30;npcSocial(v0)}}finally{for(const k in R0s)SOC[k].run=R0s[k]}return{n,tot}};
   v0.rel=30;const a0=cnt();memAdd(v0,S,"pardon");memAdd(v0,S,"helped");const a1=cnt();ok("behav_social_kind",a1.n>a0.n*1.3,{before:a0,after:a1});
   /* (5) servants: a servant who remembers being shielded is harder to buy */
   const sv0=S.staff[0];let srv=null;if(sv0){const L2=liveRivals(true);const by=L2.find(v=>v.bac>=40)||L2[0];by.bac=200;sv0.loyal=40;sv0.mem={};
    let seen=[];const oA=odA;odA=(a,o)=>{seen.push(sv0.loyal);return 0};try{bribeServ(by,sv0);const n1=seen.length;memAdd(sv0,S,"srvshield");bribeServ(by,sv0);seen=[seen[0],seen[n1]]}finally{odA=oA}ok("behav_servant_loyal",seen[1]>seen[0],{loyalUsed:seen,after:sv0.loyal})}
   else ok("behav_servant_loyal",true,"no staff");
   /* CAUSE LEDGER */
   [v0,v1,v2,v3].forEach(fresh);S.hooks={};v2.ghen=70;sv(v2,["Kiêu ngạo"]);roll=()=>false;let r;try{r=runAct(v2,S,"rumor")}finally{roll=R0}
   const c1=causeQuery({by:v2,to:S})[0];ok("cause_npc_act",c1&&c1.a==="rumor"&&c1.y&&c1.y.k==="ghen"&&v2.cz&&v2.cz[c1.id],c1);
   ok("cause_line",c1&&/vì ghen ngươi được sủng/.test(causeLine(c1)),c1&&causeLine(c1));
   /* retaliation chain: she rumours v3; v3 sees it (caught) → v3's memory points to that record → v3's later act on her = "tra" */
   roll=()=>false;try{runAct(S,v3,"rumor")}finally{roll=R0}const mine=causeQuery({by:S,to:v3})[0];const mm=memTop(v3,S,-1);
   ok("cause_mem_link",mine&&mm&&mm.c===mine.id,{mine:mine&&mine.id,mem:mm});
   roll=()=>false;try{runAct(v3,S,"spy")}finally{roll=R0}const back=causeQuery({by:v3,to:S})[0];
   ok("cause_retaliation",back&&back.y.k==="tra"&&back.y.c===(mine&&mine.id),{y:back&&back.y,line:back&&causeLine(back)});
   ok("cause_her_choice",mine&&mine.y.k==="chon",mine&&mine.y);
   /* families: everyday act, punishment, servant */
   SOC.help.run(v0,S);const ch=causeQuery({by:v0,to:S,a:"help"})[0];ok("cause_soc_help",ch&&memList(S,v0).some(m=>m.d==="help"&&m.c===ch.id),ch);
   punish(v1,"phạm thượng",1);const cp=causeQuery({by:"emp",to:v1})[0];ok("cause_punish",cp&&cp.y.k==="toi"&&memList(v1,"emp").length>0,cp&&causeLine(cp));
   if(sv0){const n0=causeQuery({to:sv0}).length;servAct("phat",sv0.sid);ok("cause_servant",causeQuery({to:sv0}).length===n0+1&&memList(sv0,S).some(m=>m.d==="srvpunish"),causeQuery({to:sv0}).map(causeLine))}
   const g0n=causeQuery({}).length;ok("cause_log_api",causeLog({limit:3}).length>0&&g0n>=5,causeLog({limit:5}));
   for(let i=0;i<40;i++)causeAdd(v0,v1,"x",{s:-1});ok("cause_cap",Object.keys(v1.cz).length<=BAL.hook.czMax,Object.keys(v1.cz).length);
   /* SAVE / LOAD round trip keeps NPC memories + causes */
   let rt=null;try{save();const a=JSON.stringify([v2.mem,v3.mem,v2.cz]).length;const id2=v2.id,id3=v3.id;loadSlot(SLOT);const V2=RV(id2),V3=RV(id3);rt={a,b:JSON.stringify([V2.mem,V3.mem,V2.cz]).length}}catch(e){rt={err:String(e)}}
   ok("save_load",rt&&!rt.err&&rt.a===rt.b,rt);
   /* card shot seed */
   const V=liveRivals(true).filter(v=>!v.queen)[0];V.mem={};memAdd(V,S,"pardon");memAdd(V,S,"gift",{x:"Trâm ngọc"});memAdd(S,V,"rumor");window.__V=V.id;
   return C});
  let card=null;try{await p.evaluate((id)=>{Q.length=0;document.getElementById('modal').hidden=true;try{KMQ.length=0;kmBusy=false}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());
    tab='rv';try{K3SH.home=false}catch(e){};PG.rv=rivals.findIndex(v=>v.id===id);render();try{k3Shell()}catch(e){}},await p.evaluate(()=>window.__V));await sleep(7000);
   await p.evaluate(()=>{try{KMQ.length=0;kmBusy=false}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());const t=[...document.querySelectorAll('.pctabs .pct')].find(t=>/Lòng người/.test(t.textContent));if(t)t.click()});await sleep(600);
   card=await p.evaluate(()=>{const s=[...document.querySelectorAll('.kpsec')].filter(x=>x.offsetParent).find(x=>{const t=x.querySelector('.kpst');return t&&t.textContent==='Kỷ niệm'});if(s)s.scrollIntoView({block:'start'});
    return{kn:!!s,life:!!s&&/khắc cốt ghi tâm/.test(s.textContent),txt:s?s.textContent.slice(0,300):"",ovf:document.documentElement.scrollWidth>innerWidth+1}});await sleep(300);
   await p.screenshot({path:`${OUT}/${wh}-card.jpg`,quality:60,type:'jpeg'})}catch(e){card={err:String(e).slice(0,200)}}
  if(!card||!card.kn||!card.life||card.ovf){fail++;console.error("FAIL card",wh,JSON.stringify(card))}
  for(const k in logic)if(!logic[k].ok){fail++;console.error('FAIL',wh,k,JSON.stringify(logic[k].info))}if(errs.length)fail++;R[sz]={logic,card,errs};await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(fail?`FAIL ${fail}`:"ALL OK");await b.close();process.exit(fail?1:0)})();
