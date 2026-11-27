/* review/servant-mline-r2: co-op guest guard for the servant month (servRanks j14 + jaudit đề bạt, servMonth j10, mlMonth jmline).
   On the co-op guest the NPC half of these rolls on the host only; what touches her own household still rolls on the guest.
   The page plays the same N months twice from the same start: once as a single player (host-like) and once with COOPW faking the
   guest seat (on:true, seat:"b"). Prints a table of NPC-side changes; exit 1 when the guest run changes NPC-only state.
   usage: node dev/test/mline-guest.js <url> [months] */
const {chromium}=require('playwright');const [,,URL,MON='36']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(800);
 const out=await p.evaluate((MON)=>{const res={};
  for(const mode of ["host","guest"]){window.__forceOrigin='thd';SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;const r0=render;render=()=>{};
   for(let i=0;i<3;i++){const s=mkServ('maid');s.age=17+i*2;S.staff.push(s)}tmPlace(S,3);
   const C=window.COOPW;const save={on:C&&C.on,seat:C&&C.seat};if(mode==="guest"&&C){C.on=true;C.seat="b"}
   const R={npcMerit:0,npcRise:0,npcRefill:0,npcWage:0,npcLoyDecay:0,npcSold:0,npcStaffChanged:0,herMaidsHit:0,herLines:0,errs:[]};
   const fs0=fillStaff;fillStaff=function(q){if(q!==S)R.npcRefill++;return fs0.apply(this,arguments)};
   const sm0=servMerit;servMerit=function(s){if(ownerOf(s)!==S)R.npcMerit++;return sm0.apply(this,arguments)};
   const ro0=mlRose;mlRose=function(q){if(q!==S)R.npcRise++;return ro0.apply(this,arguments)};
   const fx0=mlFx;mlFx=function(f,s){if((S.staff||[]).includes(s))R.herMaidsHit++;return fx0.apply(this,arguments)};
   try{for(let m=0;m<MON;m++){S.turn++;const snap=new Map();for(const v of rivals)for(const s of (v.staff||[]))snap.set(s,s.loyal);const bac0=rivals.map(v=>v.bac||0);
     let ev="";ev+=servRanks()||"";ev+=servMonth()||"";R.herLines+=ev?ev.split(/\.\s+/).filter(x=>x.trim()).length:0;
     for(const [s,l] of snap){const o=ownerOf(s);if(o&&o!==S&&s.loyal<l&&s.tr!=="trung")R.npcLoyDecay++}
     rivals.forEach((v,i)=>{if((v.bac||0)<bac0[i])R.npcWage++})}}catch(e){R.errs.push(String(e).slice(0,160))}
   fillStaff=fs0;servMerit=sm0;mlRose=ro0;mlFx=fx0;if(C){C.on=save.on;C.seat=save.seat}render=r0;res[mode]=R}
  return res},+MON);
 const g=out.guest;const bad=g.npcMerit||g.npcRise||g.npcRefill||g.npcLoyDecay;
 console.log(JSON.stringify({out,pageErrors:errs.slice(0,6),ok:!bad&&!errs.length}));await b.close();process.exit(bad||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
