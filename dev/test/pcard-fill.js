/* (17/11 review/person-leftcol: Lòng người tab + Tâm trạng card are gone; key = left .kpkey, info panel = .pcf inside .kpstick)
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
  const go=async(nm,fn,arg)=>{await p.evaluate(fn,arg);await sleep(3500);await sleep(400);
   const m=await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].filter(e=>e.offsetParent).pop();const pf=pc&&pc.querySelector('.pcf');const pcr=pc&&pc.querySelector('.pcr');const vis=e=>{if(!e)return null;const r=e.getBoundingClientRect();return[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]};
    const tab=pc&&[...pc.querySelectorAll('.pct')].find(t=>/Lòng người/.test(t.textContent));const key=pc&&pc.querySelector(':scope > .pcl > .kpkey');const pcp=pc&&pc.querySelector(':scope > .pcl > .pcp');const stick=pc&&pc.querySelector('.kpstick');
    const kr=key?key.getBoundingClientRect():null,pr=pc?pc.getBoundingClientRect():null;
    const lc=(()=>{if(!pc)return null;const L=pc.querySelector(':scope > .pcl');if(!L)return null;const lb=L.getBoundingClientRect(),pb=pc.getBoundingClientRect();let w=0;L.querySelectorAll('*').forEach(e=>{if(!e.offsetParent||!e.getClientRects().length||e.closest('.kwear,.kpgrid,.kpfacts'))return;const b=e.getBoundingClientRect();if(b.height<2||b.height>200)return;const o=b.bottom-Math.min(lb.bottom,pb.bottom);if(o>w)w=o});return Math.round(w)})();/* pcard-facts-2: leftClip = px of the key block (portrait/name/relation/Thích-Ghét) under the card's bottom edge; must be 0 */
    return{leftClip:lc,card:!!pc,info:!!pf,infoInSticky:!!(pf&&stick&&stick.contains(pf)),sections:pf?[...pf.querySelectorAll('.kpst')].map(h=>h.textContent):[],noMood:!(pc&&pc.querySelector('.pcf-mood')),noLongNguoiTab:!tab,
     key:!!key,keyCompactRel:!!(key&&key.querySelector('.kr2-cp .kr2cl')),keyChip:!!(key&&key.querySelector('.kpk-st .chip')),keyLines:key?[...key.querySelectorAll('.kpkl > div')].map(d=>d.textContent.trim()):[],
     keyVisible:kr&&pr?kr.bottom<=pr.bottom+1&&kr.top>=pr.top:null,figW:pcp?Math.round(pcp.getBoundingClientRect().width):null,
     quick:pf?pf.querySelectorAll('.kskacts button').length:0,hscroll:document.documentElement.scrollWidth>innerWidth+1,fillOverflowX:pf&&pcr?[...pf.querySelectorAll('*')].some(e=>e.getBoundingClientRect().right>pcr.getBoundingClientRect().right+1):null}});
   res[nm]=m;await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60})};
  const openTab=([t,k,i])=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};PG[k]=i;render();try{k3Shell()}catch(e){}};
  await go('rv0',openTab,['rv','rv',0]);await go('rv1',openTab,['rv','rv',1]);
  await go('court0',openTab,['court','court',0]);await go('court1',openTab,['court','court',1]);
  const pop=done=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';render();S.visit=S.visit||{k:S.place,people:[]};
   const v=rivals.find(x=>x.alive&&!x.out&&!x.queen)||rivals[1];S.visit.people=[{kind:"rival",ref:v,name:v.name,col:RCOL[v.rank],info:""}];S.visit.talked=!!done;S.visit.tk={};popIdx=0;popMsg="";renderStage()};
  await go('pop',pop,false);await go('popdone',pop,true);
  await go('me',()=>{Q.length=0;tab='act';popIdx=null;render();try{showMe&&showMe()}catch(e){}});
  R[wh]={res,errs};await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
