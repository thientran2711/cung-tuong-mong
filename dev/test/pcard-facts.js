/* pcard-facts test: usage node dev/test/pcard-facts.js <url> <outdir> [WxH@dpr] ; taps the first .kfx fact in the open person card and checks the kit pop-up (when/how/who), no "…" clamp, no date prefix in facts.
   (17/11 review/person-leftcol: Lòng người tab + Tâm trạng card are gone; key = left .kpkey, info panel = .pcf inside .kpstick)
   review/pcard-fill (owner 15/11 "khung bên phải nó đang bị trống"): every person card's right side carries the kit info blocks (jpcf).
   usage: node dev/test/pcard-fill.js <build url> <outdir> [WxH@dpr,...]   → JSON per size + shots <outdir>/<WxH>-<case>.jpg
   cases: rv0 (Hoàng hậu card: left key block + right info panel in the sticky), rv1 (phi tần), court0 (Hoàng thượng), court1 (Thái hậu), pop (stage pop-up, acts + blocks stacked),
          popdone (pop-up after the visit's one talk: Việc nhanh act cards), stranger (Người lạ: no fill), me (her own card: no fill) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};
 for(const sz of (SIZES||"755x1000@1,1000x755@1,1180x820@1,1366x1024@1,844x390@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await sleep(2500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};
   const e0=S.emp;try{emoSet(rivals[0],"lo",60,"Khương Lạc Anh được tấn phong")}catch(e){}
   S.logs.unshift(`<span class="ld">T${S.month}/${S.year} ${TUAN[S.tuan]}</span>Ngươi dâng quà cho ${rivals[0].name}.`);
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()});
  await sleep(1500);
  const go=async(nm)=>{const pre=await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].filter(e=>e.offsetParent).pop();if(!pc)return {card:false};const rows=[...pc.querySelectorAll('.pcf .krv')].map(x=>x.textContent.trim());const cl=[...pc.querySelectorAll('.pcf .krv')].some(x=>getComputedStyle(x).webkitLineClamp!=='none');return {card:true,rows,clamp:cl,prefix:rows.some(t=>/^T\d+\/\d+|tuần:|Dò được:/.test(t)),kfx:pc.querySelectorAll('.kfx').length}});
   const el=await p.$('.pc .pcf .kfx');let pop=null;if(el){await el.evaluate(x=>x.click());await sleep(400);pop=await p.evaluate(()=>{const k=document.getElementById('kpop');return k&&!k.hidden?k.textContent:null})}
   await p.screenshot({path:OUT+'/'+W+'x'+H+'-'+nm+'.jpg',type:'jpeg',quality:80});res[nm]=Object.assign(pre,{pop})};
  await p.evaluate(()=>{const v=rivals[1];S.met[v.id]=1;try{noteAdd(v.id,"Dò được: nàng thích Cầm")}catch(e){}try{disLikeLearn(v,null,"Dò được")}catch(e){}try{const k=disUnk(v)[0];if(k)disLearn(v,k,"Chuyện trò")}catch(e){}
   Q.length=0;document.getElementById('modal').hidden=true;tab='rv';try{K3SH.home=false}catch(e){};PG.rv=1;render();try{k3Shell()}catch(e){}});await sleep(3500);
  await go('card');R[sz]={res,errs};await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
