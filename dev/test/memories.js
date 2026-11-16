/* review/memories (D26): Kỷ niệm (memories) + Ân oán chưa dứt (hook ledger), dev/build/jmem.js.
   usage: node dev/test/memories.js <build url> <outdir> [WxH@dpr,...]   → JSON (checks) + shots <outdir>/<WxH>-<case>.jpg
   checks: add (deed, cap, reinforce, two-way via runAct), fade (monthly, keep floor), recall (line, odds modifier, talk options, invoke → nợ ân),
           hooks (add / query / mirror / resolve kept+broken / due tick / secret from note / hookUse), old save (no mem/hooks → loads, save/load round trip),
           person card blocks "Kỷ niệm" + "Ân oán chưa dứt" (kitRows) at each size, no page errors, no horizontal overflow. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let fail=0;
 for(const sz of (SIZES||"755x1000@1,1180x820@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await sleep(2500);
  const logic=await p.evaluate(()=>{const C={};const ok=(k,v,info)=>{C[k]={ok:!!v,info:info===undefined?null:info}};
   SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
   const L=liveRivals(true).filter(v=>!v.queen);const v0=L[0],v1=L[1],v2=L[2];const R0=roll;
   /* old save: a life without the new fields */
   delete S.mem;delete S.hooks;ok("oldsave_empty",memList(v0,S).length===0&&hookQuery({mir:false}).length===0);
   /* ADD */
   memAdd(v0,S,"pardon");memAdd(v0,S,"gift",{x:"Trâm ngọc"});const g1=memList(v0,S).find(m=>m.d==="gift").g;memAdd(v0,S,"gift",{x:"Trâm ngọc"});const mg=memList(v0,S).find(m=>m.d==="gift");
   ok("add",memList(v0,S).length===2,memList(v0,S).map(m=>m.d+":"+m.g));ok("reinforce",mg.g>g1&&mg.n===2,[g1,mg.g,mg.n]);
   for(const d of ["care","apology","secret","humble","ally","provoke"])memAdd(v1,S,d);ok("cap",memList(v1,S).length===BAL.mem.cap,memList(v1,S).length);
   ok("bad_deed",!memAdd(v0,S,"nope"),null);
   /* two-way through the existing acts: she befriends v2 (NPC remembers her); an NPC spies on her and is caught (she remembers the NPC) */
   roll=()=>true;try{runAct(S,v2,"ally")}finally{roll=R0}ok("runAct_ally",memList(v2,S).some(m=>m.d==="ally"),memList(v2,S).map(m=>m.d));
   const sp=L[3]||v1;roll=()=>false;window.__j95off=1;/* a forced NPC act: the j95 motive gate would stop it (D note, mem-upgrade-r1) */try{runAct(sp,S,"spy")}finally{roll=R0;window.__j95off=0}ok("runAct_npc_on_me",memList(S,sp).some(m=>m.d==="spy"),memList(S,sp).map(m=>m.d));
   /* the strong memory wrote a Sổ ghi line (→ Tuần lục) */
   ok("log_line",S.logs.slice(0,12).some(h=>/ghi lòng tạc dạ|để bụng/.test(h)),S.logs.slice(0,3).map(h=>h.replace(/<[^>]*>/g,"").slice(0,90)));
   /* RECALL */
   const line=memLine(v0,S);ok("recall_line",/ngươi đã/.test(line),line);
   ok("recall_mod",memMod(v0,S)>0,memMod(v0,S));
   memAdd(v1,S,"judge");const bad=memMod(v1,S);ok("recall_mod_bad",bad<0,bad);
   const h0=hostility(v1,S);ok("npc_mind",typeof h0==="number",h0);
   const p0={kind:"rival",ref:v0,name:v0.name};const A=talkOpts(p0);const inv=A.find(a=>a.n==="Nhắc lại ân xưa");ok("invoke_option",!!inv,A.map(a=>a.n));
   const top0=memTop(v0,S,1).g;const msg=inv?inv.run():"";const q=q72();const dk=q72Key(q72A("rv",v0.id));
   ok("invoke_spends",memTop(v0,S,1).g<top0&&(q.d[dk]||0)>=1,{msg,before:top0,after:memTop(v0,S,1).g,debt:q.d[dk]});
   ok("invoke_ledger",hookQuery({k:"favour",on:v0}).length===1,hookQuery({on:v0}).map(h=>h.k));
   /* FADE */
   /* mem-upgrade: the monthly loss is fadeMo × the holder's nết multiplier (memFadeK); "judge" is a keep deed (floor), poison is lifelong now */
   const pz=memList(v1,S).find(m=>m.d==="judge");const gp=pz.g,ca=memList(v1,S).find(m=>m.d==="care");const gc=ca?ca.g:null;const exp=Math.round((gp-BAL.mem.fadeMo*memFadeK(String(v1.id),-1))*10)/10;
   S.turn++;memFade();ok("fade_month",pz.g===exp,[gp,pz.g,exp]);memFade();ok("fade_once_a_month",pz.g===exp);
   for(let i=0;i<60;i++){S.turn++;memFade()}for(let i=0;i<200;i++){S.turn++;memFade()}ok("fade_keep_floor",pz.g===Math.round(pz.g0*BAL.mem.keepFloor),[pz.g,pz.g0]);
   ok("fade_gone",!memList(v1,S).some(m=>m.d==="care"),memList(v1,S).map(m=>m.d+":"+m.g));
   /* HOOKS */
   const id1=hookAdd("promise",v2,S,{t:"xin cho muội một chỗ trong buổi yến",due:wk()+6});ok("hook_add",!!id1&&hookQuery({k:"promise",by:v2,mir:false}).length===1);
   ok("hook_resolve_kept",hookResolve(id1,"kept")&&memList(S,v2).some(m=>m.d==="kept"),memList(S,v2).map(m=>m.d));
   const id2=hookAdd("promise",S,v1,{t:"nói đỡ cho nàng trước Hoàng hậu",due:wk()-1});hookTick.call(null);S.turn++;hookTick();
   ok("hook_due_broken",!hookFind(id2)&&memList(v1,S).some(m=>m.d==="broken"),hookS_done());
   function hookS_done(){return (S.hooks.done||[]).map(h=>h.k+":"+h.res)}
   noteAdd(v2.id,`tư thông với thị vệ (tai mắt tận mắt thấy)`);const sec=hookQuery({k:"secret",on:v2})[0];ok("hook_secret_from_note",!!sec&&sec.str==="strong",sec);
   const A2=talkOpts({kind:"rival",ref:v2,name:v2.name});ok("hook_press_option",A2.some(a=>a.n==="Lấy chuyện riêng ép nàng"),A2.map(a=>a.n));
   const oan0=oan(v2,S);roll=()=>false;let u;try{u=hookUse(sec.id)}finally{roll=R0}ok("hook_use_strong",u&&oan(v2,S)>oan0&&hookFind(sec.id).uses===1,{u,oan0,oan:oan(v2,S)});
   v1.ev=2;ok("hook_mirror_proof",hookQuery({k:"proof",on:v1}).length===1);ok("hook_resolve_mirror",hookResolve("ev:"+v1.id,"used")&&!(v1.ev>0),v1.ev);
   const wk0=hookAdd("favour",S,v0,{t:"một lần đỡ lời"});ok("hook_use_weak",hookUse(wk0).used&&!hookFind(wk0));
   const pk=hookAdd("vow",v0,S,{t:"không tranh sủng"});ok("hook_pick",hookPick({k:"vow"}).id===pk);
   const dead=hookAdd("promise",L[4]||v0,S,{t:"x"});(L[4]||v0).alive=false;S.turn++;hookTick();(L[4]||v0).alive=true;ok("hook_lapsed",!hookFind(dead));
   /* SAVE / LOAD round trip */
   let rt=null;try{save();const n0=JSON.stringify(S.mem).length;loadSlot(SLOT);rt={n0,n1:JSON.stringify(S.mem||{}).length,hooks:(S.hooks&&S.hooks.L||[]).length}}catch(e){rt={err:String(e)}}
   ok("save_load",rt&&!rt.err&&rt.n0===rt.n1,rt);
   /* seed for the shots: card blocks of v0 */
   memAdd(v0,S,"accuse");hookAdd("promise",S,v0,{t:"dạy nàng một khúc đàn",due:wk()+5});hookAdd("threat",v0,S,{t:"biết ngươi lén gặp thái y",str:"strong"});
   Q.length=0;if(m)m.hidden=true;render();return{checks:C,v0:v0.id}});
  for(const [k,c] of Object.entries(logic.checks))if(!c.ok){fail++;console.error("FAIL",wh,k,JSON.stringify(c.info))}
  /* person card with the blocks */
  const cards={};
  const shot=async(nm,fn,arg)=>{await p.evaluate(()=>{try{KMQ.length=0;kmBusy=false}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove())});await p.evaluate(fn,arg);await sleep(1500);await p.evaluate(()=>{try{KMQ.length=0;kmBusy=false}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove())});await sleep(3000);await p.evaluate(()=>{const t=[...document.querySelectorAll('.pctabs .pct')].find(t=>/Lòng người/.test(t.textContent));if(t)t.click()});await sleep(500);
   const r=await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].filter(e=>e.offsetParent).pop();const secs=pc?[...pc.querySelectorAll('.kpst')].map(h=>h.textContent):[];
    const box=h=>{const s=pc&&[...pc.querySelectorAll('.kpsec')].find(x=>{const t=x.querySelector('.kpst');return t&&t.textContent===h});if(!s)return null;s.scrollIntoView({block:"center"});const r=s.getBoundingClientRect();return{rows:s.querySelectorAll('.kr').length,w:Math.round(r.width),txt:s.textContent.slice(0,200)}};
    return{secs,mem:box("Kỷ niệm"),hook:box("Ân oán chưa dứt"),hscroll:document.documentElement.scrollWidth>innerWidth+1}});
   cards[nm]=r;await sleep(300);await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60});
   await p.evaluate(()=>{const s=[...document.querySelectorAll('.kpsec')].filter(x=>x.offsetParent).find(x=>{const t=x.querySelector('.kpst');return t&&t.textContent==='Kỷ niệm'});if(s)s.scrollIntoView({block:'start'})});await sleep(300);await p.screenshot({path:`${OUT}/${wh}-${nm}-mem.jpg`,type:'jpeg',quality:60})};
  await shot('card',(id)=>{Q.length=0;document.getElementById('modal').hidden=true;tab='rv';try{K3SH.home=false}catch(e){};const i=liveRivals(true).filter(v=>!v.queen).findIndex(v=>v.id===id);PG.rv=rivals.findIndex(v=>v.id===id);render();try{k3Shell()}catch(e){}},logic.v0);
  for(const [k,c] of Object.entries(cards)){if(!c.mem||!c.hook||c.hscroll){fail++;console.error("FAIL card",wh,k,JSON.stringify(c))}}
  if(errs.length){fail++;console.error("FAIL errors",wh,errs)}
  R[wh]={checks:Object.fromEntries(Object.entries(logic.checks).map(([k,c])=>[k,c.ok?"ok":c])),cards,errs};await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(fail?`FAILED ${fail}`:"ALL OK");await b.close();process.exit(fail?1:0)})();
