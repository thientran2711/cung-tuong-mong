/* endcard-hold (DLG-DEAD-BTN-2, MAIN 179 «nothing over an end card text», same family as RANK SCREEN FIRST): while a LIVING end card is up
   (the «Đại kết cục» card of the grand ending, #modal.kes, S.dead still false — E98 kmLifeOver does not gate it), no kit pop-up scene
   (reward box, stipend chest, person reveal, learn, gain, bloom) and no red danger pulse (kitAlarm) opens over it: the scenes WAIT in the kit
   queue (KMQ) until the card closes. Fired with the game's own functions while the card is up; sampled every 100 ms for 4 s.
   Bursts and stat labels over an open dialog are KIT §57.1b/§57.1c (KK58, in the LC31 bundle review/lc31-ui2l) — not tested here.
   Setup = R15's emo-over-text.js grand-ending road. usage: node dev/test/endcard-hold.js [root] [WxH,…]   exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');
const ROOT=process.argv[2]||path.resolve(__dirname,'../..');const SIZES=(process.argv[3]||'755x1000,1180x820').split(',').map(s=>s.split('x').map(Number));
const POPS={chest:`kitReward({kind:'chest',title:'Rương bảo vật',items:[{n:'Ngọc bội'}]})`,stipend:`stipReveal([{k:Object.keys(IT)[0]}],{kind:'chest',title:'Bổng lộc tháng chín',sub:'Nội vụ phủ phát'})`,
 person:`kitPersonReveal({who:liveRivals(true)[0],title:'Có người tới',sub:'x',line:'y'})`,learn:`kitLearn({t:'Học được lối «Thêu chỉ vàng»'})`,gain:`kitGain(Object.keys(IT)[1])`,bloom:`kitBloom({title:'Có tin vui',sub:'x'})`,alarm:`kitAlarm()`};
let bad=0;const rows=[];
(async()=>{const b=await chromium.launch();
 for(const [w,h] of SIZES){const ctx=await b.newContext({viewport:{width:w,height:h},serviceWorkers:'block',reducedMotion:'no-preference'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForFunction(()=>typeof start==='function'&&typeof geAsk==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;try{OPT.fxon=true}catch(e){}
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));Q.length=0;geAsk();showModal()});
  await p.waitForTimeout(1500);await p.evaluate(()=>chooseM(0));await p.waitForTimeout(1500);
  await p.evaluate(()=>{const r0=window.roll;window.roll=()=>true;chooseM(0);window.roll=r0});await p.waitForTimeout(700);
  await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>{});await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,.kfgain,.kmalarm').forEach(e=>e.remove())});await p.waitForTimeout(800);
  const up=await p.evaluate(()=>({kes:document.getElementById('modal').classList.contains('kes'),hid:document.getElementById('modal').hidden,t:(Q[0]||{}).t,dead:S.dead}));
  const tag=`${w}x${h}`;if(!up.kes||up.hid){bad++;rows.push([tag,'setup','FAIL — the «Đại kết cục» card is not up '+JSON.stringify(up)]);await ctx.close();continue}
  for(const [n,code] of Object.entries(POPS)){
   const r=await p.evaluate(async c=>{(0,eval)(c);const vis=e=>{const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&+cs.opacity>.05};
    const seen=new Set();for(let i=0;i<40;i++){await new Promise(r=>setTimeout(r,100));[...document.querySelectorAll('.kmov:not(.km-out),.kfgain,.kmalarm')].filter(vis).forEach(e=>seen.add(String(e.className).slice(0,40)))}
    return {seen:[...seen],kmq:KMQ.length,kes:document.getElementById('modal').classList.contains('kes')}},code);
   const ok=!r.seen.length&&r.kes;if(!ok)bad++;rows.push([tag,n,ok?`ok (waits in the queue: ${r.kmq})`:'FAIL — over the end card: '+r.seen.join(', ')]);
   await p.evaluate(()=>{try{KMQ.length=0}catch(e){}})}
  if(errs.length){bad++;rows.push([tag,'page errors','FAIL — '+errs.slice(0,3).join(' | ')])}
  await ctx.close()}
 await b.close();console.log('| size | pop-up fired under «Đại kết cục» | result |\n|---|---|---|');rows.forEach(r=>console.log('| '+r.join(' | ')+' |'));
 console.log(bad?`endcard-hold: ${bad} FAIL`:'endcard-hold: all pass');process.exit(bad?1:0)})();
