/* podium-wire (review/podium-wire, GAP OR09, KIT §20.1) — node dev/test/podium-wire.js [dev/index.html] [outdir]
   The tiểu thư Phúc tuyển (jentry kcPhucPlay `fin`) puts HER + the thứ muội + the two khuê hữu on the kit podium. Their marks are their OWN
   (jkc kcPhucMark, BAL.entry.phuc), drawn once and kept on the record; kcEnter (Điện tuyển) reads the SAME marks (S.kc.tt.pod).
   Cases (forced marks): she wins · she loses · tie (higher Sắc wins) · law 1 two-way (a grudging thứ muội "ngáng chân" her, the mirror of
   her own card) · kcEnter uses the stored marks (no re-roll) · old record without marks gets them once · «Tiếp» opens Điện tuyển.
   Fold 755x1000 + iPad 1180x820 (reduced motion). Exit 1 on any fail. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kcPhucPlay==='function'&&typeof start==='function');await sleep(2500);
  /* a tiểu thư at home (origin tt), at the Phúc tuyển */
  const setup=async()=>p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<60;i++){start();if(!S.srv&&KC.ok.includes(S.origin.k))break}window.__nlInner=0;S.origin=ORIGINS.find(x=>x.k==='tt');
   S.kcPick="nha";kcInit();if(!S.kc.inPal)S.kc.inPal=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   try{kitPodiumClose(true)}catch(e){}document.querySelectorAll('#kmrew,.kmov,#kpodov,#klife,#kload,#kroul').forEach(e=>e.remove());try{kmReset()}catch(e){}return{kc:isKc(),fam:S.kc.fam.map(m=>m.r)}});
  const s0=await setup();ok(s0.kc&&s0.fam.includes('muoi')&&s0.fam.filter(r=>/^ban/.test(r)).length===2,`${tag}: a tiểu thư at home with a thứ muội + 2 khuê hữu`,s0);
  /* run one Phúc tuyển with forced marks; returns what the podium shows */
  const run=(marks,opt)=>p.evaluate(async([marks,opt])=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kitPodiumClose(true)}catch(e){}Q.length=0;
   const R=kcRivalsTT();R.forEach((m,i)=>{m.praw=marks.them[i];m.sac=marks.sac?marks.sac[i+1]:50;m.oan=opt&&opt.oan||0;delete m.pduc;delete m.ppow});S.sac=marks.sac?marks.sac[0]:50;
   S.kc.tt={raw:5};const sac0=S.sac,danh0=S.danh;const r0=Math.random;if(opt&&opt.foul)Math.random=()=>0;let k;try{k=kcBestArt()}catch(e){k='cam'}
   window.__bot=0;const pe=kg82Open;kg82Open=undefined;/* no mini-game: the skip path gives entSkipRaw(); overwrite it below by a forced raw */
   const sk=window.entSkipRaw;window.entSkipRaw=()=>marks.me;try{kcPhucPlay(k,true)}finally{kg82Open=pe;window.entSkipRaw=sk;Math.random=r0}
   await sleep(700);for(let i=0;i<40&&[...document.querySelectorAll('#kpodov img')].some(im=>!im.complete);i++)await sleep(150);await sleep(500);const root=document.querySelector('#kpodov .kpod');const o={up:!!root};if(!root)return o;
   o.txt=root.innerText.replace(/\s+/g,' ');o.cols=root.querySelectorAll('.kpod-col').length;o.me=[...root.querySelectorAll('.kpod-col')].findIndex(c=>c.classList.contains('kpod-me'));
   o.meCls=(root.querySelector('.kpod-col.kpod-me')||{}).className||'';o.mine=(root.querySelector('.kpod-mine')||{}).textContent||'';
   o.pod=S.kc.tt.pod.map(x=>[x.id,x.raw,x.place]);o.place=S.kc.tt.place;o.foul=S.kc.tt.foul;o.dSac=S.sac-sac0;o.dDanh=S.danh-danh0;
   o.faces=root.querySelectorAll('.kpod-fb .pcp, .kpod-fb .pfwrap').length;o.nofig=root.querySelectorAll('.kpod-nofig').length;
   const r0b=root.getBoundingClientRect();o.fit=r0b.width<=innerWidth+1&&r0b.height<=innerHeight+1&&[...root.querySelectorAll('.kpod-col')].every(c=>{const q=c.getBoundingClientRect();return q.left>=-1&&q.right<=innerWidth+1});o.pct=/%|undefined|NaN|\?\?\?/.test(o.txt);
   o.dienQ=Q.some(m=>m.pp&&m.pp.e==='dien');return o},[marks,opt]);
  const next=()=>p.evaluate(async()=>{const nb=document.querySelector('#kpodov .kpod-next');if(nb)nb.click();await new Promise(r=>setTimeout(r,500));
   const m=document.getElementById('modal');return{closed:!document.getElementById('kpodov'),modal:!!(m&&!m.hidden),t:(document.querySelector('#modal')||{}).innerText||''}});
  /* 1. she wins */
  let r=await run({me:9,them:[6,5,4]});
  ok(r.up&&r.cols===3,`${tag} win: podium up, three on the dais`,[r.up,r.cols]);
  ok(r.place===1&&/kpod-p1/.test(r.meCls),`${tag} win: she is Nhất`,[r.place,r.meCls]);
  ok(/thứ muội/i.test(r.txt)&&/khuê hữu/i.test(r.txt)&&/9 phần/.test(r.txt)&&/6 phần/.test(r.txt),`${tag} win: roles + marks on the plaques`,r.txt.slice(0,220));
  ok(r.fit&&!r.pct,`${tag} win: fits, no %/undefined`,[r.fit,r.pct]);
  ok(r.dienQ,`${tag} win: Điện tuyển queued`,r.dienQ);
  if(OUT)await p.screenshot({path:`${OUT}/${tag}-win.jpg`,type:'jpeg',quality:70});
  const n1=await next();ok(n1.closed&&n1.modal&&/Điện tuyển/.test(n1.t),`${tag} win: «Tiếp» closes the podium and opens Điện tuyển`,[n1.closed,n1.modal,n1.t.slice(0,60)]);
  /* 2. she loses: the thứ muội beats her for real, she stands outside the top three */
  r=await run({me:3,them:[9,7,6]});
  ok(r.place===4&&/(Ngươi|Ta) đứng thứ 4/.test(r.mine),`${tag} lose: she is 4th, named under the dais`,[r.place,r.mine]);
  ok(r.pod[0][1]===9&&/^f/.test(r.pod[0][0]),`${tag} lose: the thứ muội is Nhất`,r.pod[0]);
  if(OUT)await p.screenshot({path:`${OUT}/${tag}-lose.jpg`,type:'jpeg',quality:70});
  await next();
  /* 3. tie: same mark, the higher Sắc stands higher; equal Sắc → her */
  r=await run({me:7,them:[7,4,3],sac:[60,80,50,50]});ok(r.place===2&&r.pod[0][0]!=='me',`${tag} tie: the girl with more Sắc wins the tie`,r.pod);await next();
  r=await run({me:7,them:[7,4,3],sac:[60,60,50,50]});ok(r.place===1,`${tag} tie: equal Sắc → she stands first`,r.pod);await next();
  /* 4. law 1 two-way: a grudging thứ muội does to her what she can do (Ngáng chân), same sizes from BAL */
  r=await run({me:8,them:[5,4,3]},{oan:60,foul:1});const F=await p.evaluate(()=>BAL.entry.phuc.foul);
  ok(r.foul===1&&r.dSac===-F.sac&&r.dDanh<=0&&/ngáng chân/.test(r.txt),`${tag} two-way: grudging thứ muội ngáng chân her (Sắc -${F.sac})`,[r.foul,r.dSac,r.dDanh]);await next();
  r=await run({me:8,them:[5,4,3]},{oan:0,foul:1});ok(r.foul===0&&r.dSac===0,`${tag} two-way: no grudge → nothing`,[r.foul,r.dSac]);await next();
  /* 5. kcEnter (Điện tuyển) reads the SAME stored marks: no re-roll */
  const e=await p.evaluate(()=>{Q.length=0;const R=kcRivalsTT();const want=R.map(m=>m.praw);const seen=[];const k0=kcScore;kcScore=function(st){seen.push(st.raw);return k0.apply(this,arguments)};
   try{kcEnter(1)}catch(e){return{err:e.message}}finally{kcScore=k0}return{want,seen,inPal:!!S.kc.inPal}});
  ok(!e.err&&JSON.stringify(e.want)===JSON.stringify(e.seen),`${tag} Điện tuyển: kcEnter reads the podium marks`,e);
  /* 6. old record without marks: drawn once from her own stats, inside 0..max, then kept */
  const o=await p.evaluate(()=>{const m={r:'ban0',tai:70,sac:60,danh:5,alive:1};const a=kcPhucMark(m),b2=kcPhucMark(m);return{a,b2,ok:a===b2&&a>=0&&a<=BAL.entry.phuc.max&&m.pduc!=null&&m.ppow!=null}});
  ok(o.ok,`${tag} old record: mark drawn once and kept`,o);
  /* 7. bots never see the overlay */
  const bt=await p.evaluate(()=>{try{kitPodiumClose(true)}catch(e){}Q.length=0;S.kc.inPal=0;S.kc.tt={raw:5};window.__bot=1;try{kcPhucPlay('cam',false)}finally{window.__bot=0}return{ov:!!document.getElementById('kpodov'),pod:!!S.kc.tt.pod,dien:Q.some(m=>m.pp&&m.pp.e==='dien')}});
  ok(!bt.ov&&bt.pod&&bt.dien,`${tag} bots: result stored, no overlay, Điện tuyển queued`,bt);
  ok(!errs.length,`${tag}: no page errors`,errs.slice(0,3));await ctx.close()}
 console.log(res.every(x=>x)?'PODIUM-WIRE PASS':'PODIUM-WIRE FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
