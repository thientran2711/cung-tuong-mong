/* robot10-coop stuckcap proof (U16 «Đêm êm đềm», U19 «Đêm lạnh nhạt», U20 «Đêm mặn nồng»: a night picture with NO button over an open dialog,
   room stuck 240 s). jne kitNightEnd = j93 manual scene (no timer close); its close button «Tiếp tục»/«Nhận» [data-km-close] shows only after the
   reveal (later(NE.list) or one tap on the picture, jne.js:101). Here the reveal timer is forced off (BAL.nightEnd.list huge) = the stuck screens.
   The shared co-op tap step (dev/test/lib/coop-clear.js TAP, or CLEAR=<old file>) is run every 500 ms for 20 s: it must close the scene.
   usage: node dev/test/r10c-nightcard-tap.js <save.json> [fold|ipad] [night|dawn]   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const CL=require(process.env.CLEAR?path.resolve(process.env.CLEAR):'./lib/coop-clear.js');
const VP=process.argv[3]==='ipad'?{width:1180,height:820}:{width:755,height:1000};const KIND=process.argv[4]||'night';/* night = kitNightEnd (.kmov.kne-ov), dawn = kitNewDay (#dawn.kne-day «Đêm không được triệu», U-run smoke rooms 1–2) */
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:VP});await serve(ctx);
 const p=await ctx.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof kitNightEnd==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(800);
 const sv=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
 await p.evaluate(([d,k])=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];deser(d);try{closeModal()}catch(e){}render();
  BAL.nightEnd.list=1e9;BAL.nightEnd.lonelyMs=1e9;/* the reveal / beat timers never fire = the stuck shots */
  if(k==='dawn'){let h=document.getElementById('dawn');if(!h){h=document.createElement('div');h.id='dawn';h.hidden=true;document.body.appendChild(h)}kitNewDay({host:h,night:{k:'lonely',line:'thử'},day:{k:'xuan',src:'img/ne-dawn-xuan-land.webp',t:'Sáng',sub:'thử'},then:()=>{h.hidden=true;h.innerHTML=''}})}else kitNightEnd({tier:"normal"})},[sv,KIND]);
 let up=false,taps=0,closed=false,t=0;
 for(;t<40;t++){await p.waitForTimeout(500);const s=await p.evaluate(k=>{const e=k==='dawn'?document.querySelector('#dawn.kne-day:not([hidden])'):document.querySelector('.kmov.kne-ov');return e?'up':'gone'},KIND);if(s==='up')up=true;if(up&&s==='gone'){closed=true;break}
  const r=await p.evaluate(CL.TAP).catch(()=>'');if(r==='x')taps++}
 await b.close();console.log(JSON.stringify({kind:KIND,dev:process.argv[3]||'fold',sceneUp:up,taps,closed,afterMs:t*500}));
 const ok=up&&closed;console.log(ok?'ok   the co-op tap step closes a night card whose reveal did not come':'FAIL the night card stays up (no button shown, the bot never taps the picture)');process.exit(ok?0:1)})();
