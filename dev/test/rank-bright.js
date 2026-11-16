/* review/rank-bright (owner 11/16 13:00Z "màu phẩm nhạt nhòa → tươi hơn"): shots of every kind of rank-colour place at Fold 755x1000, for ONE before/after sheet.
   usage: node dev/test/rank-bright.js <page URL> <outdir> <tag>   → <outdir>/<tag>-stage.png (stage tags on a LOADED room background), <tag>-list.png (Ân oán person cards),
          <tag>-dp.png (person pop-up caption), <tag>-kit.png (#kit §1.3 palette); prints the computed rank colours + page errors */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const PX=process.env.HTTPS_PROXY;const b=await chromium.launch(PX?{proxy:{server:PX,bypass:'127.0.0.1,localhost'}}:{});const R={tag:TAG,errs:[]};
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:!!PX});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);await p.addInitScript(()=>{let a=0x2f6e2b1;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});/* same seed = same people in the before and the after shot */p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove()});
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}#kroul{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;deal();render()});await sleep(800);
 const clip=async(sel,name,o)=>{try{const bs=await p.evaluate(({sel,first})=>{const E=[...document.querySelectorAll(sel)].filter(e=>e.offsetParent&&e.getBoundingClientRect().width>2);const L=E.slice(0,first||E.length).map(e=>e.getBoundingClientRect());if(!L.length)return null;const x0=Math.min(...L.map(r=>r.left)),y0=Math.min(...L.map(r=>r.top)),x1=Math.max(...L.map(r=>r.right)),y1=Math.max(...L.map(r=>r.bottom));return{x:x0,y:y0,w:x1-x0,h:y1-y0}},{sel,first:o.first});if(bs)await p.screenshot({path:`${OUT}/${TAG}-${name}.png`,clip:{x:Math.max(0,bs.x-o.px),y:Math.max(0,bs.y-o.py),width:Math.min(755-Math.max(0,bs.x-o.px),bs.w+2*o.px),height:bs.h+2*o.py}})}catch(e){R.errs.push('clip '+name+' '+String(e).slice(0,100))}};
 const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;for(const id of['modal','dawn']){const e=document.getElementById(id);if(e){e.hidden=true;if(id==='dawn')e.innerHTML=''}}});
 /* stage: her + 2 consorts + a man on a daytime room, with the room background fully loaded */
 await clean();await p.evaluate(()=>{S.dead=false;S.confined=0;S.buoi=0;S.wx={n:"trời quang",k:"dust",f:0};const k='vuon';S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
  const L=liveRivals(true).filter(v=>!v.queen);L.slice(0,3).forEach(v=>{Wh[v.id]=k;S.met=S.met||{};S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}});(S.men||[]).filter(m=>m.alive).slice(0,1).forEach(m=>S.menW[m.id]=k);
  S.place="home";used=0;tab="act";goTo(k);Q.length=0});
 await sleep(2500);await clean();
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,20000)}))));
 R.bgLoaded=await p.evaluate(()=>{const st=document.getElementById('stage');const cs=getComputedStyle(st);const m=/url\("?([^")]+)"?\)/.exec(cs.backgroundImage||'')||[];const im=[...st.querySelectorAll('img')].filter(i=>i.naturalWidth>800);return{bg:(m[1]||'').slice(-60),bigImgs:im.map(i=>(i.currentSrc||i.src).slice(-50)+' '+i.naturalWidth)}});
 await sleep(1500);
 R.stage=await p.evaluate(()=>[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(e=>e.offsetParent).map(g=>{const t=g.querySelector('.j59t');return{txt:g.innerText.replace(/\n/g,' / '),tCol:t&&getComputedStyle(t).color}}));
 await p.screenshot({path:`${OUT}/${TAG}-stage.png`});await clip('#tokens .tok .tag, #j59metag .tag','stage-zoom',{px:26,py:14});
 /* list: Ân oán person cards (rank colour on the card) */
 await clean();await p.evaluate(()=>{tab='rv';render();window.scrollTo(0,0)});await sleep(2500);
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));
 R.list=await p.evaluate(()=>[...document.querySelectorAll('#panel .pc')].slice(0,8).map(c=>({c:c.style.getPropertyValue('--c'),rk:(c.querySelector('.pcrk')||{}).innerText||''})));
 await p.screenshot({path:`${OUT}/${TAG}-list.png`});await clip('#panel .pcrk, #panel .pcname','list-zoom',{px:20,py:28,first:2});
 /* pop-up: person event dialog with rank title + a picker-style row inside */
 await clean();await p.evaluate(()=>{S.menW={};Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;const L=liveRivals(true).filter(x=>!x.queen);const v=L[0];S.met=S.met||{};S.met[v.id]=1;
  Q.push({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} cùng ${(L[1]||v).name} ghé thăm, Hoàng thượng cũng sai người đưa quà.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ",go:()=>{}},{n:"Đáp trả",fx:{danh:1},x:"nàng oán +10",go:()=>{}}]});showModal()});
 await p.waitForFunction(()=>{const m=document.getElementById('modal');return m&&!m.hidden&&m.querySelector('.kpsn')},null,{timeout:30000}).catch(()=>{R.dpMissing=1});await sleep(2500);await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,15000)}))));await sleep(1500);
 await p.screenshot({path:`${OUT}/${TAG}-dp.png`});await clip('#modal .kdpcap, #modal .kesf>.kpsn','dp-zoom',{px:30,py:14});await clip('#modal p','dp-text',{px:20,py:10});
 /* kit page palette sample */
 await p.goto(URL+'#kit',{waitUntil:'domcontentloaded'});await sleep(6000);
 R.kit=await p.evaluate(()=>{const e=document.querySelector('[data-kit="§1.3"]')||document.querySelector('[data-kit="§48.1"]');if(!e)return'no sample';e.scrollIntoView({block:'start'});return e.getAttribute('data-kit')});await sleep(800);
 await p.screenshot({path:`${OUT}/${TAG}-kit.png`});await clip('[data-kit="§48.1"] .kitpg-row','kit-paper',{px:6,py:6,first:1});
 console.log(JSON.stringify(R,null,1));await b.close()})();
