/* KIT §32.1s kitHudSlot check (KK50): node dev/test/kit-hud-slot.js <outdir> [device…]  (default fold ipadAir)
   Mock hook with the three wordings; per device: slot at the RIGHT END of the mood row (#hud-mood), ONE width for all three, one line (no wrap),
   inside the header, hit box ≥ 44 px tall, tap → hook tap (mood box NOT opened), tap on the mood bar → mood box still opens, no §77c stage chip. Shots per wording. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const OUT=process.argv[2]||'/home/user/wt/khs-shots';const DEV=process.argv.slice(3);const devices=DEV.length?DEV:['fold','ipadAir'];fs.mkdirSync(OUT,{recursive:true});
const W=[["Sắc phong","5/32 tuần"],["Đại lễ","32/32 tuần"],["Sắc phong","tạm hoãn"]];
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const res=[];let fail=0;
 for(const d of devices){const ctx=await D.newDeviceContext(b,d,{});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(1500);
  await g.evaluate(()=>{KLIFE.off=1;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;window.kitPromoHook=()=>({months:3,rank:"Tần"});render()});
  await p.waitForTimeout(6000);await g.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('.kload,.krbox,.krskip,.klife,.kroul,.curtain,.kdaytc,.kbd').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});await p.waitForTimeout(1500);
  const widths=[];
  for(let i=0;i<W.length;i++){const m=await g.evaluate(([l,v])=>{window.__tapped=0;window.kitHudSlotHook=()=>({l,v,s:l+" "+v,tap:()=>{window.__tapped++}});const md=document.getElementById('modal');md.hidden=true;Q.length=0;render();
    const row=document.getElementById('hud-mood'),s=row&&row.querySelector('.khslot'),h=document.querySelector('header.hud').getBoundingClientRect();if(!s)return{none:1};
    const r=s.getBoundingClientRect(),rr=row.getBoundingClientRect(),hit=getComputedStyle(s,'::after');const v1=s.querySelector('.kstv').getBoundingClientRect(),l1=s.querySelector('.kstl').getBoundingClientRect();
    return{w:Math.round(r.width),h:Math.round(r.height),rightGap:Math.round(rr.right-r.right),inHdr:r.bottom<=h.bottom+0.5&&r.right<=h.right,oneLine:Math.abs(v1.bottom-l1.bottom)<4&&Math.abs(v1.top-l1.top)<4&&l1.left>=r.left+1&&v1.right<=r.right-1,
     hitH:Math.round(r.height+parseFloat(hit.top)*-1+parseFloat(hit.bottom)*-1),last:row.lastElementChild===s,stageChip:!!document.querySelector('#stage>.kpromo'),txt:s.innerText.replace(/\s+/g,' '),
     cx:r.left+r.width/2,cy:r.top+r.height/2,ovf:document.documentElement.scrollWidth>innerWidth}},W[i]);
   widths.push(m.w);await p.screenshot({path:`${OUT}/${d}-slot${i}.png`});
   /* real tap on the slot (page coordinates of the host frame) */
   await g.locator('#hud-mood .khslot').click();await p.waitForTimeout(500);m.tapHook=await g.evaluate(()=>window.__tapped);m.moodBoxOnSlotTap=await g.evaluate(()=>{const md=document.getElementById('modal');const o=!md.hidden&&/tâm trạng/i.test(md.innerText);md.hidden=true;Q.length=0;return o});
   res.push({d,i,...m});if(m.none||!m.last||m.rightGap>6||!m.inHdr||!m.oneLine||m.hitH<44||m.stageChip||m.tapHook!==1||m.moodBoxOnSlotTap||m.ovf)fail++}
  const same=new Set(widths).size===1;if(!same)fail++;
  await g.locator('#hud-mood .kmd-l').click();await p.waitForTimeout(800);const mood=await g.evaluate(()=>{const md=document.getElementById('modal');return !md.hidden&&/tâm trạng/i.test(md.innerText)});if(!mood)fail++;
  await g.evaluate(()=>{const md=document.getElementById('modal');md.hidden=true;Q.length=0;window.kitHudSlotHook=null;render()});await p.waitForTimeout(500);
  const off=await g.evaluate(()=>({slot:!!document.querySelector('#hud-mood .khslot'),stageChip:!!document.querySelector('#stage>.kpromo')}));if(off.slot||!off.stageChip)fail++;
  res.push({d,sameWidth:same,widths,moodTapStillOpensMoodBox:mood,hookNull:off,errs});if(errs.length)fail++;await ctx.close()}
 console.log(JSON.stringify(res,null,0).replace(/\},\{/g,'},\n{'));console.log(fail?`FAIL ${fail}`:'ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(1)});
