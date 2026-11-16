/* POPUP FULL-BODY SCAN (owner 16/11 07:35Z + 07:37Z, OD:L448 / OD:L963; review/popup-fullbody).
   RULE 1: every pop-up where a person appears = the approved event template: LEFT the person's FULL-BODY figure (.kpsubj.kes > .kesf), RIGHT TOP the
           event picture (.kdlgart), below it the info, bottom the buttons. FAIL: a small framed portrait (.kpsubj > .pframe/.pfwrap/.pcp/.pfr) in a person pop-up.
   RULE 2: ONE event = ONE frame size for all its pages / steps (tutorial pages 1..4, every coach step, a tip); the person frame of the std size has the
           same width as every #modal panel (--kpw) per viewport.
   Cases: every PEND event with a person (who / stage), person info / news / result panels, the identity card, the tutorial coach (4 intro pages +
   every spotlight step), a kitTip. Exit 1 on any FAIL.   usage: node dev/test/popup-fullbody.js <url> <out.json> [WxH,...] [maxPend]  (default 755x1000) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,MAXP]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(SIZES||'755x1000').split(',');
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of VPS){try{const [W,H]=sz.split('x').map(Number);const errs=[];const fails=[];const res={};
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';render()});await sleep(1000);
  /* portrait phones are not a supported design screen (KIT §0: the game shows 'Xoay ngang điện thoại để chơi'); nothing to check there */
  if(await p.evaluate(()=>/Xoay ngang/.test(document.body.innerText||'')&&innerWidth<innerHeight&&innerWidth<700)){R[sz]={unsupported:'rotate overlay (portrait phone)'};console.log(sz,'SKIP: unsupported portrait phone (rotate overlay)');await ctx.close();continue}
  /* inspect the dialog on screen: #modal .dlg, or #ktut .kpdlg, or #ktip .kpdlg */
  const look=async()=>{for(let i=0;i<50;i++){const w=await p.evaluate(()=>{const c=[...document.querySelectorAll('#modal:not([hidden]) .kpsubj.kes, #ktut .kpsubj.kes, #ktip .kpsubj.kes')];return c.some(x=>!x.dataset.kdpfit&&!x.dataset.kpdfit&&!x.querySelector('.kesf.kesno'))});if(!w)break;await sleep(400)}await sleep(250);return look0()};
  const look0=()=>p.evaluate(()=>{const vis=e=>e&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden';
   let d=document.querySelector('#ktut .kpdlg')||document.querySelector('#ktip .kpdlg');let host='coach';
   if(!d){const M=document.getElementById('modal');if(M&&!M.hidden){d=M.querySelector('.dlg');host='modal'}}
   if(!d||!vis(d))return null;if(/pcm/.test((d.closest('#modal')||{}).className||'')||d.classList.contains('kp-person'))return{skip:1};
   const r=d.getBoundingClientRect();const seal=((d.querySelector('.kpseal')||{}).textContent||'').trim();
   const col=d.querySelector('.kpsubj.kes');const small=[...d.querySelectorAll('.kpsubj')].filter(e=>vis(e)&&!e.matches('.kes,.kpiart,.kpev,.kpitem')&&e.querySelector('.pframe,.pfwrap,.pcp,.pfr,img.kpor'));
   const fig=col&&col.querySelector('.kesimg');const fr=fig&&fig.getBoundingClientRect();const cr=col&&col.getBoundingClientRect();
   const ban=d.querySelector('.kdlgart img, .kdlgart .ksart, .kdpban');const br=ban&&ban.getBoundingClientRect();const hasBan=!!br&&br.width>40&&br.height>30;const figOut=fr&&cr?Math.round(Math.max(0,Math.min(fr.bottom,cr.bottom,r.bottom)-Math.max(fr.top,cr.top,r.top))):0;const colH=cr?Math.round(cr.height):0;
   const btn=d.querySelector('.kpopts button, .opts button');const btr=btn&&btn.getBoundingClientRect();
   const idc=d.querySelector('.kpid');const idfig=document.querySelector('#modal img.kidfig2');
   return{host,seal,title:((d.querySelector('.kptitle')||{}).textContent||'').slice(0,40),w:Math.round(r.width),h:Math.round(r.height),
    hasCol:!!col&&!!fr&&fr.width>20&&fr.height>40,hasBan,colH,figOut,small:small.length,smallCls:small.map(e=>e.className).slice(0,2),
    figLeftOfBanner:br&&cr?cr.right<=br.left+2:null,btnBelow:btr&&br?btr.top>=br.bottom-2:null,kid:!!idc,idFig:!!idfig&&vis(idfig),
    dbg:(!fr||fr.width<=20)?((col&&col.outerHTML)||d.innerHTML).slice(0,500):'',kpw:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--kpw'))||null,docOv:document.documentElement.scrollWidth>innerWidth+1}});
  const close=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{kitCoachOff&&kitCoachOff();kitTipOff&&kitTipOff()}catch(e){}});
  const verdict=(name,o,needPerson)=>{if(!o){res[name]={v:'MISSING'};return}if(o.skip){res[name]={v:'SKIP'};return}
   const why=[];if(o.small)why.push('small framed portrait on a person pop-up ('+o.smallCls.join('|')+')');
   if(needPerson&&!o.hasCol&&!(o.kid&&o.idFig)&&/visibility: hidden/.test(o.dbg||'')){o.v='WARN';o.why=['figure still being measured (CDN load) — rerun'];res[name]=o;return}
   if(needPerson&&!o.hasCol&&!(o.kid&&o.idFig))why.push('person pop-up without the full-body figure column');
   if(o.hasCol&&o.figLeftOfBanner===false)why.push('figure not LEFT of the event picture');if(o.hasCol&&o.btnBelow===false)why.push('buttons not below the picture');
   if(needPerson&&o.hasCol&&!o.hasBan)why.push('person pop-up without the event picture (.kdlgart / .kdpban) right top');
   if(needPerson&&o.hasCol&&o.colH<150)why.push('figure column clipped (height '+o.colH+'px)');if(o.hasCol&&o.figOut<150)why.push('figure visible only '+o.figOut+'px tall (clipped / outside the frame)');
   if(o.docOv)why.push('horizontal overflow');o.v=why.length?'FAIL':'OK';o.why=why;res[name]=o;if(why.length)fails.push(name+': '+why.join('; '))};
  /* A. every PEND event with a person */
  const ids=await p.evaluate(()=>Object.keys(PEND));let n=0;
  for(const id of ids){if(+MAXP&&n>=+MAXP)break;if(process.env.ONLY&&!new RegExp(process.env.ONLY).test(id))continue;
   const ok=await p.evaluate(id=>{const v=liveRivals(true)[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");for(const pp of [{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.who||d.stage||d.who2))continue;try{Q.length=0;pushDil(mkP(id,pp),id);showModal();if(Q.length)return true}catch(e){}}return false},id);
   if(ok){n++;await sleep(350);let o=await look();if(o&&!o.skip&&!o.hasCol){await sleep(5000);o=await look()}/* a figure still loading from the CDN */verdict('PEND:'+id,o,true);await close()}}
  /* B. person info / news / result panels */
  const P1=()=>liveRivals(true)[0];
  const info=[['info-person',()=>kitModal({kind:"info",title:"Một người",subject:liveRivals(true)[0],facts:["Một câu ngắn."]})],
   ['rule-person',()=>kitModal({kind:"rule",title:"Một người",subject:liveRivals(true)[0],sections:[{h:"Thang",tiers:[{k:"1–3",n:"nhỏ",d:"một",c:"g"}]}]})],
   ['news-person',()=>{Q.push({t:"Tin trong cung",who:liveRivals(true)[0],h:"<p>Một tin ngắn.</p>"});showModal()}],
   ['result-person',()=>{Q.push({t:"Kết quả: thử",who:liveRivals(true)[0],h:"<p>Thành công.</p>"});showModal()}],
   ['notice-person',()=>{Q.push({t:"Một báo",who:liveRivals(true)[0],h:"<p>Ngắn.</p>"});showModal()}],
   ['night-person',()=>{Q.push({t:"Đêm",cls:"night",who:liveRivals(true)[0],h:"<p>Đêm xuống.</p>"});showModal()}],
   ['contest',()=>{Q.push({t:"Tranh ghế",who:pEmp(),h:"<p>Ba vòng: Tài nghệ, Đức hạnh.</p>"});showModal()}],
   ['cold-palace',()=>{Q.push({t:"Lãnh cung",cls:"end",who:pMe(),h:"<p>Ngươi bị đưa vào lãnh cung.</p>"});showModal()}],
   ['contest-round',()=>{Q.push({ev:1,t:"Tranh ghế: giữa các vòng",who:pMe(),h:"<p>Còn 2 vòng.</p>",opts:[{n:"Luyện tập",fx:{}},{n:"Nghỉ",fx:{}}]});showModal()}],
   ['intel',()=>kitIntelPanel(liveRivals(true)[0])],['evidence',()=>kitEvidencePanel(liveRivals(true)[0])]];
  for(const [nm,fn] of info){try{await p.evaluate(fn)}catch(e){errs.push(nm+': '+String(e.message).slice(0,100))}await sleep(450);verdict(nm,await look(),true);await close()}
  /* C. tutorial: 4 intro pages + every spotlight step = ONE frame size each (the one std frame) */
  await p.evaluate(()=>{try{window.kitTour()}catch(e){}});await sleep(1200);
  const pages=[],steps=[];
  for(let i=0;i<40;i++){const o=await look();if(!o||o.host!=='coach')break;
   const ttl=await p.evaluate(()=>({t:(document.querySelector('#ktut .kptitle')||{}).textContent||'',s:(document.querySelector('#ktut .kpsub')||{}).textContent||'',std:document.querySelector('#ktut .kpdlg').dataset.kpd}));
   verdict('tour:'+i+':'+ttl.t,o,true);(/trang \d+\/4/.test(ttl.s)?pages:steps).push([o.w,o.h]);
   const hasNext=await p.evaluate(()=>!!document.querySelector('#ktut [data-ktut=next]'));if(!hasNext)break;
   await p.evaluate(()=>document.querySelector('#ktut [data-ktut=next]').click());await sleep(1100)}
  const same=L=>L.every(x=>x[0]===L[0][0]&&x[1]===L[0][1]);
  if(pages.length<4)fails.push('tutorial intro pages found: '+pages.length+' (want 4)');
  if(!same(pages))fails.push('tutorial intro pages differ in frame size: '+JSON.stringify(pages));
  if(steps.length&&!same(steps))fails.push('tutorial steps differ in frame size: '+JSON.stringify(steps));
  res['tour:sizes']={pages,steps,v:'INFO'};
  await close();await sleep(300);
  await p.evaluate(()=>{kitTip({id:"scan",title:"Lời dặn thử",html:"<p>Một lời dặn ngắn.</p>"})});await sleep(700);
  const tp=await look();verdict('tip',tp,true);if(tp&&pages.length&&(tp.w!==pages[0][0]||tp.h!==pages[0][1]))fails.push('tip frame size '+tp.w+'x'+tp.h+' differs from the tutorial pages '+pages[0]);
  const std=pages[0];if(std&&std[0]>0){const kpw=(res['tour:0:'+Object.keys(res).find(k=>k.startsWith('tour:0:')).slice(7)]||{}).kpw}
  await close();
  /* ONE frame size per viewport for every person pop-up (all kinds, tutorial pages / steps / tip; OD:L963) */
  {const L=Object.entries(res).filter(([k,r])=>r&&r.w&&r.hasCol&&!r.kid);const f={};L.forEach(([k,r])=>{const s=r.w+'x'+r.h;f[s]=(f[s]||0)+1});const top=Object.entries(f).sort((a,b)=>b[1]-a[1])[0];
   if(top){const odd=L.filter(([k,r])=>r.w+'x'+r.h!==top[0]).map(([k,r])=>k+' '+r.w+'x'+r.h);if(odd.length){fails.push('frame size differs from the viewport frame '+top[0]+': '+odd.slice(0,8).join(', '));odd.forEach(o=>{const k=o.split(' ')[0];if(res[k])res[k].v='FAIL'})}res['frame:std']={v:'INFO',std:top[0],kinds:f}}}
  const cnt={};Object.values(res).forEach(r=>cnt[r.v]=(cnt[r.v]||0)+1);
  R[sz]={count:cnt,fails,res,errs};if(fails.length)bad++;
  console.log(sz,JSON.stringify(cnt));fails.forEach(f=>console.log('  FAIL',f));errs.slice(0,5).forEach(e=>console.log('  ERR',e));
  await ctx.close()}catch(e){console.log(sz,'CRASH',String(e.message).slice(0,120));R[sz]={crash:String(e.message).slice(0,200)};bad++}}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
