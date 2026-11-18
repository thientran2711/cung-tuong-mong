/* review/stage-here (owner OD 18/11 ~19:55Z + ~20:00Z): EVERY Hành sự deck act → its place, does tapping it really move her there
   (S.place + stage), does she stay after, is it charged ONCE (khắc spent = the card's own cost, no extra walk khắc).
   usage (HOST mode, built root): [DEV=ipadAir] node dev/test/act-place-audit.js [rootDir] → JSON rows + summary (exit 1 when a bound act fails) */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const root=process.argv[2]||path.resolve(__dirname,'../..');const srv=await D.serveRoot(root);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{let a=987654321;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=3;S.buoi=0;used=0;S.bac=9999;S.suc=100;render();
  const s=document.createElement('style');s.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s)});
 await sleep(800);
 const names=await g.evaluate(()=>{try{deal()}catch(e){}return deck.map(a=>a.n)});
 const rows=[];
 for(const n of names){
  const r=await g.evaluate(async ([n,__START])=>{Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.confined=0;S.out=0;S.buoi=0;used=0;S.suc=100;S.bac=9999;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.acPass={};S.adDoor={};
   /* r2: start AWAY (Ngự hoa viên) so home-bound acts must really bring her home */const st0=__START;if(st0!=="home"){accGrant(S,st0);const uu=used;try{goTo(st0)}catch(e){}used=uu;if(S.place!==st0){S.place=st0;S.visit={k:st0,people:[],talked:false,tk:{}}}Q.length=0;document.getElementById("modal").hidden=true}
   try{deal()}catch(e){}const i=deck.findIndex(a=>a.n===n);if(i<0)return{n,skip:'not dealt'};const a=deck[i];a.done=0;a.lock=false;
   const want=typeof actPlace==="function"?actPlace(a):null;const cost=typeof cardCost==="function"?cardCost(a):(a.k||1);const u0=used;
   try{act(i)}catch(e){return{n,err:String(e).slice(0,120)}}
   await new Promise(r=>setTimeout(r,250));for(let t=0;t<3&&Q.length;t++){Q.length=0;document.getElementById('modal').hidden=true;try{render()}catch(e){}}/* closing the cards = a render (the trip waits for them) */await new Promise(r=>setTimeout(r,150));for(let t=0;t<3&&Q.length;t++){Q.length=0;document.getElementById('modal').hidden=true}
   const done=!!deck[i]&&!!deck[i].done;const placeAfter=S.place;const spent=used-u0;
   /* stays: render once more (a later render must not send her back) */try{render()}catch(e){}const stays=S.place===placeAfter;
   const im=(document.getElementById('scimg').style.backgroundImage||'');const stageOk=im.indexOf(SCIMG[placeOf(S.place).sc]||'@@')>=0;
   return{n,start:__START,place:want||'-',remote:!!(window.ACT_REMOTE&&ACT_REMOTE[n]),ran:done,moved:want?placeAfter===want:placeAfter!==__START,stays,stageOk,cost,spent,once:!done||spent===cost}},[n,process.env.START||'vuon']);
  rows.push(r)}
 const bound=rows.filter(r=>r.place&&r.place!=='-');const bad=bound.filter(r=>r.ran&&(!r.moved||!r.stays||!r.stageOk||!r.once)).concat(rows.filter(r=>r.place==='-'&&r.moved));
 console.log(JSON.stringify({sum:{acts:rows.length,bound:bound.length,ran:bound.filter(r=>r.ran).length,bad:bad.length,errs:errs.slice(0,3)},rows},null,0));
 await b.close();srv.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
