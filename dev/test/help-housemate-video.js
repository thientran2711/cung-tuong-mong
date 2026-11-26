/* help-housemate real-tap video (law 12: Fold 755x1000@2 + iPad 1180x820@2): (a) at home, tap a HOUSEMATE → her «Cùng cung» talk list shows
   «Nhờ giúp đỡ» → tap it → the result line (helpAsk: the housemate's own answer); (b) an NPC asks HER (cx2:help → «Lời nhờ» notice) → tap «Trả lời» → tap an answer.
   usage: node dev/test/help-housemate-video.js <index.html> <outdir> <WxH>  → <outdir>/*.webm + step shots */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,HTML,OUT,SZ]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* a real finger tap at the element's centre (the kit cards bob, so Playwright's «stable» wait never ends) */
/* tapTxt: the visible element of css whose text / aria-label holds re → a finger tap at its centre */
const tapTxt=async(p,css,re)=>{const r=await p.evaluate(([css,src])=>{const R=new RegExp(src);const b=[...document.querySelectorAll(css)].find(b=>b.offsetParent&&b.getBoundingClientRect().width>0&&R.test(((b.getAttribute('aria-label')||'')+' '+b.textContent).normalize('NFC')));if(!b)return null;const q=b.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2}},[css,re]);if(r)await p.touchscreen.tap(r.x,r.y);return !!r};
const tapAt=async(p,loc)=>{const bx=await loc.boundingBox({timeout:8000}).catch(()=>null);if(!bx)return false;await p.touchscreen.tap(bx.x+bx.width/2,bx.y+bx.height/2);return true};
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',recordVideo:{dir:OUT,size:{width:W,height:H}}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});await sleep(2500);
 const hm=await p.evaluate(()=>{try{kitRoulette=function(){};kitReward=window.kitReward=function(){}}catch(e){}/* the opening reward reveals (chest, gift box) are not what this video shows */try{(window.KLIFE||LIFE).off=true}catch(e){}localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;
  document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#klife').forEach(e=>e.remove());document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove());
  if(S.selx2&&S.selx2.days)S.selx2.days=null;/* past the selection days: she is a consort in her palace */
  const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop&&!x.queen);const h=consorts().find(x=>x&&x!==S&&!x.out&&palHostOK(x));let m=V.find(x=>x!==h&&rkOf(x)<PAL_HEAD);
  if(rkOf(S)>=PAL_HEAD)S.rank=PAL_HEAD-1;S.resHead=key(h);m.resHead=key(h);S.met=S.met||{};S.met[m.id]=0;const K=k61S();if(K)K[kOf61(m)]=3;m.rel=netTh(m,"than")+15;m.bac=500;
  S.where=S.where||{};window.__walkFree=1;goTo("home");{const c0=curPeople;const mp=rp(m);curPeople=window.curPeople=function(){const L=c0.apply(this,arguments);if(!Array.isArray(L)||S.place!=="home")return L;return [L.find(x=>x&&x.ref===m)||mp]}}/* the housemate alone on the stage (no crowd chip) *//* staged: her housemate stands in the shared palace now (where-schedule set aside) */tab="act";render();return {m:m.name,same:sameHouse(S,m),here:curPeople().map(x=>x.name),vis:(S.visit.people||[]).map(x=>x.name),k:S.visit.k,pl:S.place,isSrv:isSrv(),sx:!!(S.selx2&&S.selx2.days)}});
 console.log(JSON.stringify(hm));await sleep(1500);await p.evaluate(()=>document.querySelectorAll('#kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:OUT+'/1-home.png'});
 const tok0=p.locator('#tokens .tok',{hasText:hm.m}).first();
 for(let i=0;i<40&&!(await tok0.isVisible().catch(()=>false));i++){if(!(await p.getByText(/Chạm để mở|Rương đồ khuê các/).first().isVisible().catch(()=>false))&&!(await p.locator('#modal:visible').count())&&await p.locator('#tokens').isVisible().catch(()=>false))break;/* real taps through the opening overlays (chest, notices) */
  const bt=p.locator('button:visible',{hasText:/^\s*(✕|Nhận|Tiếp|Đóng|Bỏ qua|Vào cung|Xong|Thôi|Đã hiểu|Lui)/}).last();if(await bt.count()){await bt.tap().catch(()=>bt.click().catch(()=>{}));await sleep(1200);continue}
  const t=p.getByText(/Chạm để mở|Rương đồ khuê các/).first();if(await t.isVisible().catch(()=>false)){await p.mouse.click(W/2,H*0.45);await sleep(1500);continue}
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab="act";render()});await sleep(800)}
 await p.screenshot({path:OUT+'/1b-stage.png'});
 
 await tapTxt(p,'#tokens .tok.fig',hm.m);await sleep(1200);if(!(await p.evaluate(()=>[...document.querySelectorAll('button')].some(b=>b.offsetParent&&/Nhờ giúp đỡ/.test(((b.getAttribute('aria-label')||'')+b.textContent).normalize('NFC'))))))await tapTxt(p,'#tokens .tok.fig',hm.m);await sleep(1500);await p.screenshot({path:OUT+'/2-talk.png'});
 const opt=p.locator('button.kfoc-b[aria-label^="Nhờ giúp đỡ"]:visible').first();await opt.scrollIntoViewIfNeeded().catch(()=>{});await sleep(600);await p.screenshot({path:OUT+'/3-card.png'});
 const ok1=await tapTxt(p,'button','Nhờ giúp đỡ');await sleep(2500);console.log(JSON.stringify({tapped:ok1,bac:await p.evaluate(()=>S.bac)}));await p.screenshot({path:OUT+'/4-result.png'});
 await tapTxt(p,'button','✕');await sleep(1000);/* close the talk with a tap */
 for(let i=0;i<6&&await tapTxt(p,'button','^\\s*Tiếp');i++)await sleep(900);/* a chat line that follows (jchat) is tapped through */
 /* (b) an NPC asks HER */
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#rtoast').forEach(e=>e.remove());const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const a=V[V.length-1];AGRUN["cx2:help"](a,S);render()});
 await sleep(1800);await p.screenshot({path:OUT+'/5-notice.png'});
 const go=p.getByText('Trả lời',{exact:true}).first();const ln=p.getByText(/Lời nhờ/).first();if(await go.count()&&await tapAt(p,go)){}else if(await ln.count()&&await tapAt(p,ln)){await sleep(1500);await p.screenshot({path:OUT+'/5b-panel.png'});await tapTxt(p,'button','Xem lời nhờ|Trả lời')}else{await p.evaluate(()=>{try{showModal()}catch(e){}})}
 await sleep(1800);await p.screenshot({path:OUT+'/6-loinho.png'});
 await tapTxt(p,'button','Giúp hết lòng');await sleep(2500);await p.screenshot({path:OUT+'/7-answered.png'});
 console.log(JSON.stringify({errs,log:await p.evaluate(()=>(S.log||[]).slice(-4).map(x=>typeof x==="string"?x:x.t||JSON.stringify(x)).map(s=>String(s).slice(0,160)))}));await ctx.close();await b.close()})().catch(e=>{console.error(e);process.exit(2)});
