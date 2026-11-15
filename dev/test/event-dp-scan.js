/* review/kit-fig2 r8 — KIT 50 / 50.1 kitEventDp, the WHOLE class (owner 11/15 13:00Z + 13:15Z; acceptance "VIỆC · Thái hậu triệu"):
   every kind of event dialog where a person appears is opened for real and measured.
   Sources: the j24 approaches (approachOne ×N: Có người đến (gossip / ally / borrow / gift / mocking / sorry), Thái hậu triệu, Hoàng thượng
   đến, Kẻ hầu xin, Một ánh mắt, Việc của kẻ hầu, Lời cảnh báo …), festival invitations (j71Fest per festival, j71FeastInvite), merit (j71Merit),
   faction invitation, + any dialog met while playing a few buổi.
   Per dialog: layout (kdper = 32.7/50), ONE person in the column, banner (event picture) in the right column, chip ABOVE the head, painted
   figure / column, dialog height vs its content (empty px under the options), plain "thiện cảm" words outside kit rows.
   usage: node dev/test/event-dp-scan.js <url> <outdir> <tag> [WxH@dpr,...] [save.json]   (images from git objects of IMGREV, default 3e212597e) */
const {chromium}=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');
const [,,URL,OUT,TAG,SIZES,SAVE]=process.argv;fs.mkdirSync(OUT,{recursive:true});const IMGREV=process.env.IMGREV||'3e212597e';
const CT={webp:'image/webp',png:'image/png',jpg:'image/jpeg',json:'application/json'};const sleep=t=>new Promise(r=>setTimeout(r,t));
const blob=(rev,f)=>execFileSync('git',['cat-file','blob',rev+':'+f],{cwd:__dirname,maxBuffer:64<<20,stdio:['ignore','pipe','ignore']});
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome'});const ALL=[];
 for(const sz of (SIZES||'1180x820@1').split(',')){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route(/^https?:\/\//,async r=>{const u=r.request().url();if(/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u))return r.continue();const m=/^https:\/\/ctm-img\.[^/]+\/(img\/[^?#]+)/.exec(u);if(!m)return r.abort();
   const f=decodeURIComponent(m[1]);for(const rev of [IMGREV,'HEAD'])try{return r.fulfill({status:200,body:blob(rev,f),contentType:CT[(f.split('.').pop()||'').toLowerCase()]||'application/octet-stream'})}catch(e){}return r.fulfill({status:404,body:''})});
  const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showTitle==='function',null,{timeout:0});await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});if(process.env.ONLY24)await p.evaluate(()=>{window.__ONLY24=1});
  if(SAVE){await p.evaluate(j=>{localStorage.setItem(SK(1),j);const kl=document.getElementById('kload');if(kl)kl.remove();showTitle()},fs.readFileSync(SAVE,'utf8'));await sleep(500);
   await p.evaluate(()=>{document.getElementById('title').hidden=false;document.querySelector('[data-load="1"]').click()});await sleep(2500)}
  else await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}});
  /* collect the dialogs */
  const n=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const d=document.getElementById('dawn');if(d){d.hidden=true;d.innerHTML='';document.body.classList.remove('kbk-open')}
   S.th=Math.max(S.th||0,40);S.sung=Math.max(S.sung,65);const seen=new Map();const add=(m,src)=>{if(!m||!m.t)return;const k=String(m.t).replace(/<[^>]+>/g,'').slice(0,50)+'|'+String(m.h||'').replace(/<[^>]+>/g,'').slice(0,18);if(!seen.has(k))seen.set(k,Object.assign(m,{__src:src}))};
   const kp=typeof kitStagePeople==='function'?kitStagePeople:()=>[1];
   for(let i=0;i<300;i++){let m=null;try{m=approachOne()}catch(e){}if(m&&kp(m).length)add(m,'j24')}if(window.__ONLY24){window.__SCAN=[...seen.values()];return window.__SCAN.length}
   const tryQ=(fn,src)=>{const n0=Q.length;try{fn()}catch(e){}for(const m of Q.slice(n0>0?0:0))if(kp(m).length)add(m,src);Q.length=0};
   try{for(const k in FV7)tryQ(()=>j71Fest(k,0),'j71 '+k)}catch(e){}
   tryQ(()=>j71FeastInvite('tai'),'j71x tai');tryQ(()=>j71FeastInvite('sac'),'j71x sac');for(let i=0;i<4;i++)tryQ(()=>j71Merit(),'j71m');
   window.__SCAN=[...seen.values()];document.getElementById('modal').hidden=true;return window.__SCAN.length});
  const rows=[];
  for(let i=0;i<n;i++){const r=await p.evaluate(async i=>{const W=t=>new Promise(r=>setTimeout(r,t));const m=window.__SCAN[i];m.must=1;Q.length=0;Q.push(m);showModal();await W(400);
    await Promise.all([...document.querySelectorAll('#modal img')].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,6000)})));await W(700);
    const M=document.getElementById('modal');if(M.hidden)return{t:m.t,shown:false};const d=M.querySelector('.dlg'),R=e=>e.getBoundingClientRect();
    const col=M.querySelector('#mb .kpsubj.kes'),ban=M.querySelector('#mb > .kdlgart'),op=M.querySelector('#mb > .opts');const C=col?R(col):null;
    const figs=col?[...col.querySelectorAll(':scope > .kesf:not(.kesno) .kesimg')]:[];const caps=col?[...col.querySelectorAll('.kpsn')].map(R):[];
    const capB=caps.length?Math.max(...caps.map(c=>c.bottom)):0;
    const fi=figs.map(im=>{const r=R(im);const fb=(window.__KITFB||{})[im.getAttribute('src')];const v=fb&&fb.v||{t:0,b:1};return{top:r.top+v.t*r.height,bot:r.top+v.b*r.height}});
    const btns=op?[...op.children].filter(x=>x.offsetParent):[];const lastB=btns.length?Math.max(...btns.map(x=>R(x).bottom)):0;const dr=R(d);
    const txt=(M.querySelector('#mb').innerText||'');const plainTC=[...M.querySelectorAll('#mb *')].filter(e=>!e.closest('.krr')&&[...e.childNodes].some(n=>n.nodeType===3&&/thiện cảm/i.test(n.textContent))).map(e=>e.textContent.trim().slice(0,50));
    const o={t:String(m.t).replace(/<[^>]+>/g,'').slice(0,48),src:m.__src,kdper:d.classList.contains('kdper'),people:figs.length,banner:ban?(C?R(ban).left>=C.right-1:false):null,
     chipAbove:fi.length?fi.every(f=>capB<=f.top+2):null,fill:fi.length&&C?+((fi[0].bot-fi[0].top)/(C.bottom-capB)).toFixed(2):null,dlgH:Math.round(dr.height),vh:innerHeight,
     emptyUnder:btns.length?Math.round(dr.bottom-lastB):null,nOpt:btns.length,plainTC};
    return o},i);rows.push(r)}
  /* one picture per kind for the eye */
  for(const [i,nm] of [[0,'first']]){}
  const pick=await p.evaluate(()=>window.__SCAN.findIndex(m=>/Thái hậu triệu/.test(m.t)));
  if(pick>=0){await p.evaluate(async i=>{window.__SCAN[i].must=1;Q.length=0;Q.push(window.__SCAN[i]);showModal();await new Promise(r=>setTimeout(r,2200))},pick);await p.screenshot({path:`${OUT}/${TAG}-thai-hau-trieu-${wh}.jpg`,type:'jpeg',quality:55})}
  ALL.push({sz,rows,errs:errs.slice(0,5)});await ctx.close()}
 for(const s of ALL){console.log(`== ${s.sz}  (${s.rows.length} dialogs)`);for(const r of s.rows)console.log(`${r.kdper?'dp ':'-- '}${String(r.t).padEnd(48)} ${String(r.src).padEnd(10)} ppl:${r.people} ban:${r.banner} chipAbove:${r.chipAbove} fill:${r.fill} h:${r.dlgH}/${r.vh} under:${r.emptyUnder} opts:${r.nOpt}${r.plainTC&&r.plainTC.length?' TC:'+r.plainTC.join('|'):''}`);if(s.errs.length)console.log('errs',s.errs)}
 fs.writeFileSync(`${OUT}/${TAG}-scan.json`,JSON.stringify(ALL,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
