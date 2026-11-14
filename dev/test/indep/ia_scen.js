/* Independent scenario checks on the real page (no bot). usage: node ia_scen.js <url> <out.json>
   Each scenario drives the game through its own functions, then runs __IA.check (ia_hook.js) and a few direct asserts. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL='http://127.0.0.1:8971/t.html',OUT='scen.json']=process.argv;const HOOK=fs.readFileSync(path.join(__dirname,'ia_hook.js'),'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const res={};
 const fresh=async(o)=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(o=>{localStorage.clear();if(o)window.__forceOrigin=o;SLOT=2;document.getElementById("title").hidden=true;start();if(NLP)nlAccept(true);Q.length=0;try{closeModal()}catch(e){}render()},o||'');await p.evaluate(HOOK);};
 const reload=async()=>{await p.evaluate(()=>save());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);const ok=await p.evaluate(()=>{const b=document.querySelector('#slots button[data-load="2"]');if(!b)return document.getElementById('slots').innerText.slice(0,200)+' | ls:'+Object.keys(localStorage).join(',');b.click();return 'ok'});if(ok!=='ok')throw new Error('no save to load: '+ok);await p.waitForTimeout(700);await p.evaluate(HOOK)};
 const ia=async(tag)=>p.evaluate(t=>{const IA=window.__IA;IA.err={};IA.ex={};IA.check(t);return{err:IA.err,ex:IA.ex}},tag);
 /* 1. a consort dies mid-buổi (the record before any further action, then after the next act) */
 await fresh('dtq');res.death=await p.evaluate(()=>{nextBuoi();Q.length=0;const v=liveRivals(true).find(x=>!x.queen&&x.staff&&x.staff.length);v.mercy=1;const id="v"+v.id;const sid=(v.staff[0]||{}).sid;
  deathSentence(v,"thử");const right=!!S.roster.P[id];spend(1);return{name:v.name,inRecordRightAfter:right,inRecordAfterAct:!!S.roster.P[id],staffAfter:sid!=null&&!!S.roster.P["s"+sid],maidAfter:!!S.roster.P["mm:"+v.id]}});
 res.deathIA=await ia("death");
 /* 2. a palace head falls to the cold palace mid-buổi: her residents' rows */
 await fresh('cn');res.fallHead=await p.evaluate(()=>{nextBuoi();Q.length=0;const live=liveRivals(true);const head=live.find(h=>!h.queen&&live.some(x=>x!==h&&houseOf(x)===key(h)));if(!head)return{skip:"no head with residents"};
  const resi=live.filter(x=>x!==head&&houseOf(x)===key(head));const code=palaceOf(head);head.rank=5;fall(head,"thử");spend(1);const kh=j95kh();
  return{head:head.name,out:head.out,headRow:S.roster.P["v"+head.id][kh],residents:resi.map(x=>({n:x.name,newHome:palaceOf(x),row:S.roster.P["v"+x.id][kh]})),code}});
 res.fallHeadIA=await ia("fallHead");
 /* 3. a servant leaves (fired) mid-buổi */
 await fresh('td');res.fire=await p.evaluate(()=>{Q.length=0;S.bac=500;const s=S.staff[0];if(!s)return{skip:"no staff"};const id="s"+s.sid;const r=fireServ(S,s);spend(1);return{fired:s.name,txt:String(r).slice(0,80),still:!!S.roster.P[id]}});
 /* 4. the player is sent to the cold palace, then save + reload */
 await fresh('nc');res.coldMe=await p.evaluate(()=>{Q.length=0;cold("thử");Q.length=0;try{closeModal()}catch(e){}const kh=j95kh();return{place:S.place,out:S.out,me:S.roster.P.me[kh],maid:S.roster.P["mm:me"]&&S.roster.P["mm:me"][kh],staff:(S.staff||[]).map(s=>S.roster.P["s"+s.sid]&&S.roster.P["s"+s.sid][kh])}});
 await reload();res.coldMeAfterReload=await p.evaluate(()=>{const kh=j95kh();return{place:S.place,out:S.out,visit:S.visit&&S.visit.k,me:S.roster.P.me[kh],stage:(S.visit.people||[]).map(x=>x.name)}});
 res.coldMeIA=await ia("coldMe");
 /* 5. lãnh cung stage when nobody has fallen: who is drawn vs the record */
 await fresh('muoi');res.lcStage=await p.evaluate(()=>{Q.length=0;S.place="home";const L=rivals.filter(v=>v.alive&&v.out).length;goTo("lc");const kh=j95kh();return{fallenAlive:L,stage:S.visit.people.map(x=>x.kind+":"+x.name),recordAtLc:Object.keys(S.roster.P).filter(id=>S.roster.P[id][kh][0]==="lc").map(id=>S.roster.who[id][0])}});
 /* 6. a consort becomes Hoàng hậu mid-buổi (palFix): who sits in Càn Ninh, whose rows go stale */
 await fresh('ch');res.newQueen=await p.evaluate(()=>{nextBuoi();Q.length=0;const q0=rivals.find(v=>v.queen&&v.alive);if(q0){q0.queen=false;q0.rank=6}const v=liveRivals(true).filter(x=>!x.queen).sort((a,b)=>b.rank-a.rank)[0];const was=palaceOf(v);const resi=liveRivals(true).filter(x=>x!==v&&houseOf(x)===key(v));
  v.queen=true;v.rank=7;try{palFix()}catch(e){}spend(1);const kh=j95kh();return{queen:v.name,was,row:S.roster.P["v"+v.id][kh],residents:resi.map(x=>({n:x.name,home:palaceOf(x),row:S.roster.P["v"+x.id][kh]})),atKn:Object.keys(S.roster.P).filter(id=>id[0]==="v"&&S.roster.P[id][kh][0]==="kn").map(id=>S.roster.who[id][0]+" ("+S.roster.P[id][kh][1]+")")}});
 res.newQueenIA=await ia("newQueen");
 /* 7. new life: housing at the plan vs housing after the first save/reload (palFix on load) */
 await fresh('tt');res.reloadHousing=await p.evaluate(()=>({h:Object.fromEntries(liveRivals(true).map(v=>[v.name,houseOf(v)]))}));
 await reload();res.reloadHousing.after=await p.evaluate(()=>Object.fromEntries(liveRivals(true).map(v=>[v.name,houseOf(v)])));
 res.reloadHousing.changed=Object.keys(res.reloadHousing.h).filter(k=>res.reloadHousing.h[k]!==res.reloadHousing.after[k]);res.reloadIA=await ia("reloadHousing");
 /* 8. mid-minigame save + reload */
 await fresh('dtq');res.mg=await p.evaluate(()=>{Q.length=0;S.bac=200;S.suc=100;used=0;lesson("cam");return{mg:!!S.mg,P:JSON.stringify(S.roster.P),key:S.roster.key,kh:j95kh()}});
 await reload();res.mgAfter=await p.evaluate(()=>({mg:!!S.mg,ov:!document.getElementById('ov').hidden,P:JSON.stringify(S.roster.P),key:S.roster.key,kh:j95kh()}));
 res.mgSame=res.mg.P===res.mgAfter.P&&res.mg.key===res.mgAfter.key&&res.mg.kh===res.mgAfter.kh;delete res.mg.P;delete res.mgAfter.P;
 /* 9. mid-event save + reload (a pending card with params) */
 await fresh('cn');res.ev=await p.evaluate(()=>{nextBuoi();let n=0;while(!Q.some(m=>m.pid)&&n++<40){Q.length=0;try{closeModal()}catch(e){}endTurn();while(Q.length&&!Q[0].pid){try{if(Q[0].opts&&Q[0].opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}if(S.dead)return{dead:1}}
  return{q:Q.map(m=>m.pid||m.t),P:JSON.stringify(S.roster.P),key:S.roster.key,kh:j95kh(),place:S.place}});
 await reload();res.evAfter=await p.evaluate(()=>({q:Q.map(m=>m.pid||m.t),P:JSON.stringify(S.roster.P),key:S.roster.key,kh:j95kh(),place:S.place}));
 res.evSame=res.ev.P===res.evAfter.P;delete res.ev.P;delete res.evAfter.P;
 /* 10. ungated frame-up: a consort who likes her (affection 80, no grudge) runs giahoa */
 await fresh('td');res.giahoa=await p.evaluate(()=>{Q.length=0;const v=liveRivals(true).find(x=>!x.queen);v.rel=80;v.oan=0;v.ghen=0;v.bac=500;v.malice=10;const n0=(S.roster.acts||[]).length;const g=motiveOK(v,S,"giahoa");const r=runAct(v,S,"giahoa");
  const n1=(S.roster.acts||[]).length;const g2=motiveOK(v,S,"frame");return{actor:v.name,aff:aff(v,S),gateSays:g,gateForFrame:g2,ran:!!r,txt:String(r).slice(0,140),recordLines:n1-n0,wdFrame:!!S.wdFrame}});
 res.pageErrors=errs;fs.writeFileSync(OUT,JSON.stringify(res,null,1));console.log(JSON.stringify(res,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
