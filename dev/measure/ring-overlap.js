/* RING-BUILD-4 family scan (law 11; MAIN LOOK FAIL 26/11 on 8ea545fb): a ring figure is NEVER over any tap target, on any device; its head is never cut at the top.
   Every ring / picker state × device: figure painted boxes (opaque bbox of every visible member) vs every tap target box (ring ✕ / ‹ › / tabs / title tabs, plaques + plaque tabs,
   ✓ ✕ confirm, speech bubble, result card, the game's bottom bar + top HUD buttons); overlap px² must be 0; figure top ≥ layer top.
   usage: node dev/measure/ring-overlap.js <url> [out.json]   (SIZES=755x1000,1180x820,1366x1024) */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('../test/kit-ring-boot.js');const [,,URL,OUT]=process.argv;
const MEASURE=()=>{const R=kitRing.cur;if(!R)return{err:"no ring"};const L=R.L.getBoundingClientRect();const vis=e=>{if(!e||!e.getClientRects().length)return false;for(let n=e;n&&n!==document.body;n=n.parentElement){const c=getComputedStyle(n);if(c.visibility==="hidden"||c.display==="none"||+c.opacity<.05)return false}return true};
 const figs=[];R.slots.forEach((s,i)=>{if(!vis(s))return;s.__g.members.forEach(x=>{if(!vis(x.el))return;const r=x.el.getBoundingClientRect(),o=x.f.ob;figs.push({n:(x.p.name||"?").slice(0,14),slot:i,x:r.left+o.l*r.width,y:r.top+o.t*r.height,w:(o.r-o.l)*r.width,h:(o.b-o.t)*r.height})})});
 const T=[];const add=(sel,kind,root)=>(root||document).querySelectorAll(sel).forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;T.push({k:kind,t:(e.textContent||e.getAttribute("aria-label")||"").replace(/\s+/g," ").trim().slice(0,18),x:r.left,y:r.top,w:r.width,h:r.height})});
 add(".kring-x button","x",R.L);add(".kring-ar","arrow",R.L);add(".kring-tabs .pct","tab",R.L);add(".kpk .kpk-b","plaque",R.L);add(".kpk .kpk-tabs .pct","ptab",R.L);add(".kpk .khok,.kpk .khx","confirm",R.L);add(".kring-say","say",R.L);
 add("#rtoast.on","result");add("nav.bar button","nav");add("header.hud button","hud");
 const ov=[];figs.forEach(f=>T.forEach(t=>{const w=Math.min(f.x+f.w,t.x+t.w)-Math.max(f.x,t.x),h=Math.min(f.y+f.h,t.y+t.h)-Math.max(f.y,t.y);if(w>.5&&h>.5)ov.push({fig:f.n,tgt:t.k+":"+t.t,px2:Math.round(w*h)})}));
 const headCut=figs.filter(f=>f.y<L.top-.5).map(f=>({fig:f.n,dy:Math.round(f.y-L.top)}));
 const nav=document.querySelector("nav.bar"),nr=nav&&nav.getBoundingClientRect();const layerOverNav=nr?Math.max(0,Math.round(L.bottom-nr.top)):0;
 const front=figs.length?Math.round(Math.max(...figs.map(f=>f.h))):0;
 return {sel:R.sel,figs:figs.length,targets:T.length,frontH:front,ov,ovSum:ov.reduce((a,b)=>a+b.px2,0),headCut,layerOverNav}};
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});const all={};
 for(const wh of (process.env.SIZES||"755x1000,1180x820,1366x1024").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await boot(p,{url:URL});const w=ms=>p.waitForTimeout(ms);const res={};const M=async k=>{await p.evaluate(()=>{try{S.evc=null;EVCW.length=0}catch(e){}});await w(250);res[k]=await p.evaluate(MEASURE);if(process.env.SHOTS)await p.screenshot({path:`${process.env.SHOTS}/${wh}-${k}.jpg`,type:'jpeg',quality:60})};
  const tapH=async h=>{const bb=h&&await h.boundingBox();if(!bb)return false;await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);return true};
  const plaque=re=>p.evaluate(re=>{const R=new RegExp(re);const n=[...document.querySelectorAll('.kpk .kpk-n')].find(n=>R.test(n.querySelector('.kpk-b b').textContent));if(!n)return null;const r=n.querySelector('.kpk-b').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},re);
  const pick=async(re,stay)=>{let c=await plaque(re);if(!c){for(const t of await p.$$('.kpk .kpk-tabs .pct')){if(!await tapH(t))continue;await w(450);c=await plaque(re);if(c)break}}if(!c)c=await plaque('.');if(!c)return false;await p.touchscreen.tap(c[0],c[1]);await w(600);if(stay)return true;await tapH(await p.$('.kpk .khok'));await w(900);return true};
  const say=async()=>{for(let k=0;k<12&&await p.$('.kring-say');k++){await p.touchscreen.tap(W*.5,H*.42);await w(500)}};
  const closeCard=async()=>{if(await p.$('#rtoast.on')){await tapH(await p.$('#rtoast'));await w(500)}};
  await p.evaluate(()=>{window.__ppl=S.visit&&S.visit.people.slice()});/* person ring */
  await p.evaluate(()=>kitRing.close(true));await w(300);await p.evaluate(()=>kitRing.open({mode:'person'}));await w(1400);await M('person-ring');
  for(let k=0;k<3;k++){await p.evaluate(()=>kitRing.turnBy(1));await w(500)}await M('person-ring-turned');
  await p.evaluate(()=>kitRing.focus());await w(1500);await M('person-focus');
  if(await pick('Trò chuyện')){await w(400);if(await p.$('.kring-say'))await M('person-say');await say();await w(600);await M('person-after-say');if(await p.$('.kpk .kpk-n')){await pick('Hỏi han|Khen|.',1);await M('person-plaque-up');await pick('Hỏi han|Khen|.');await w(1500)}if(await p.$('#rtoast.on'))await M('person-result');await closeCard()}
  /* group ring */
  await p.evaluate(()=>{if(S.visit&&window.__ppl&&!curPeople().length)S.visit.people=window.__ppl.slice()});await p.evaluate(()=>{kitRing.close(true);/* fixed groups (2 · 3 · 1) from the day-plan rows, as the boot fixture writes them */const P=curPeople().filter(kitRing.ringable).filter(p=>p.ref&&p.ref.id!=null).slice(0,6);const kh=j95kh();const R=S.roster=S.roster||{};R.P=R.P||{};
   const row=(v,kind,wi,why)=>{if(!v)return;const id='v'+v.ref.id;R.P[id]=R.P[id]||[];R.P[id][kh]=['vuon',kind,wi,why]};const id=k=>P[k]&&'v'+P[k].ref.id;
   row(P[0],'stroll',null,'ngắm hoa mẫu đơn bên hồ');row(P[1],'visit',id(0),'chuyện trò bên hồ sen');row(P[2],'play',null,'đánh cờ trong đình');row(P[3],'visit',id(2),'xem cờ, bàn nước đi');row(P[4],'visit',id(2),'đứng hầu bàn cờ, rót trà');row(P[5],'stroll',null,'cho cá chép ăn bên cầu')});
  await w(300);for(let t=0;t<4&&!await p.evaluate(()=>!!kitRing.cur);t++){await p.evaluate(()=>{Q.length=0;try{S.evc=null;EVCW.length=0}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;kitRing.open({mode:'group'})});await w(1400)}if(!await p.evaluate(()=>!!kitRing.cur)){console.log(wh,'NO GROUP RING',await p.evaluate(()=>JSON.stringify({place:S.place,ppl:curPeople().length,ring:curPeople().filter(kitRing.ringable).length,q:Q.length,modal:!document.getElementById('modal').hidden,buoi:S.buoi})));res.errs=errs;all[wh]=res;await ctx.close();continue}await M('group-ring');
  const gi=await p.evaluate(()=>{const R=kitRing.cur;let b=0;R.slots.forEach((s,i)=>{if(s.__g.members.length>R.slots[b].__g.members.length)b=i});return b});await p.evaluate(i=>kitRing.turnTo(i),gi);await w(1000);await M('group-ring-big');
  await p.evaluate(()=>kitRing.focus());await w(1500);await M('group-focus');
  await pick('Đứng nghe');await w(800);await M('group-listen-result');await closeCard();await w(400);
  await pick('Nói với');await w(1400);await M('group-stepout');
  const pg=await p.$('.kpk .kpk-tabs .pct:not(.on)');if(pg&&await tapH(pg)){await w(600);await M('group-stepout-tab')}
  /* back to the ring after a focus: dim state restored */
  await p.evaluate(()=>kitRing.back());await w(900);res.backDim=await p.evaluate(()=>{const R=kitRing.cur,s=R.slots[kitRing.front()];return s.__g.members.map(x=>+getComputedStyle(x.dim).opacity)});await M('group-back');
  /* picker ring (a caller's list: title + caller tabs), e.g. Ân oán / people pickers */
  await p.evaluate(()=>{kitRing.close(true);const P=curPeople().filter(kitRing.ringable).slice(0,6);kitRing.open({people:P,title:'Chọn người',sub:'thử đo',tabs:[{label:'Phi tần',on:true,fn(){}},{label:'Cung nhân',fn(){}}],acts:()=>[{id:'go',n:'Chọn',word:'',ton:''}],onPick(){}})});await w(1400);await M('picker-ring');
  await p.evaluate(()=>kitRing.focus());await w(1500);await M('picker-focus');
  /* the bottom bar grows while the ring is open (a 3-line «Sang buổi» label): the layer must refit */
  await p.evaluate(()=>{const b=document.querySelector('nav.bar button:last-child');if(b){b.__t=b.innerHTML;b.innerHTML='Xong việc<br>đang làm<br>đã'}});await w(800);await M('picker-focus-navgrow');
  await p.evaluate(()=>kitRing.back());await w(800);await M('picker-ring-navgrow');
  await p.evaluate(()=>{const b=document.querySelector('nav.bar button:last-child');if(b&&b.__t)b.innerHTML=b.__t});
  res.errs=errs;all[wh]=res;await ctx.close()}
 await b.close();
 const rows=[];for(const wh in all)for(const k in all[wh]){const r=all[wh][k];if(!r||!('ovSum' in r))continue;rows.push(`${wh.padEnd(9)} ${k.padEnd(22)} figs ${String(r.figs).padStart(2)} frontH ${String(r.frontH).padStart(4)} overlap ${String(r.ovSum).padStart(6)} px² headCut ${r.headCut.length} layerOverNav ${r.layerOverNav}`+(r.ov.length?'  '+r.ov.slice(0,4).map(o=>o.fig+'×'+o.tgt+'='+o.px2).join(', '):''))}
 console.log(rows.join('\n'));for(const wh in all)console.log(wh,'backDim',JSON.stringify(all[wh].backDim),'errs',all[wh].errs.length,all[wh].errs.slice(0,2).join(' | '));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all,null,1))})();
