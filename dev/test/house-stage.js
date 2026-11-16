/* review/servant-system (owner 16/11): her WHOLE household stands on her room stage (KIT 33.7 slots, pages "+N"/"‹", her once)
   and each servant's card has the maid's acts + the Cung nhân acts. usage: node dev/test/house-stage.js <url> <WxH@dpr> <outdir> <tag>
   Prints JSON {pages, ck[]}; shots <outdir>/<tag>-<WxH>-p<n>.jpg and -card.jpg (SHOTS=0: none). Pictures via the session proxy. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 const hh=await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
  quiet=true;S.rank=5;S.prSeen={r:5,s:null};S.bac=300;fillStaff(S,true);S.buoi=0;used=0;tab="act";goTo("home");render();quiet=false;render();
  return{maid:S.maid.name,staff:S.staff.map(s=>s.name+' ('+s.role+')'),kids:S.kids.filter(k=>k.alive).length}});
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 const ck=[];const pages=[];
 for(let pg=0;pg<12;pg++){await sleep(1500);/* the slot layout waits for every figure picture (j59lay): wait for them */
  for(let w=0;w<120;w++){const ok=await p.evaluate(()=>{const im=[...document.querySelectorAll('#mefig, #tokens img.figimg')];return im.length>0&&im.every(i=>i.complete&&i.naturalWidth>0)&&!!document.getElementById('stage').dataset.j59free});if(ok)break;await sleep(1000)}await sleep(800);
  const r=await p.evaluate(()=>{const st=document.getElementById('stage');const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>2;
   const ppl=curPeople();const L=[];const me=document.getElementById('mefig');if(vis(me))L.push('me');
   document.querySelectorAll('#tokens .tok').forEach(t=>{if(vis(t)){const q=ppl[+t.dataset.p];L.push(q?q.kind+':'+q.name+(t.querySelector('img.figimg')?'':' [no fig]'):'?')}});
   const T=[...document.querySelectorAll('#tokens .tok .tag, #j59metag .tag')].filter(vis).map(g=>g.getBoundingClientRect()).map(q=>[q.left,q.right,q.top]);
   const chips=[...st.querySelectorAll('.j59more')].filter(vis).map(c=>c.textContent);
   return{L,chips,T,people:ppl.length,here:typeof kitHereCount==='function'?kitHereCount():null,title:(document.getElementById('sc-t')||{}).innerText||''}});
  r.page=pg;pages.push(r);
  for(let i=1;i<r.T.length;i++){const a=r.T.slice().sort((x,y)=>x[0]-y[0]);if(a[i]&&a[i][0]<a[i-1][1]-1&&Math.abs(a[i][2]-a[i-1][2])<20)ck.push(`p${pg+1} name chips overlap`)}
  if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-p${pg+1}.jpg`,type:'jpeg',quality:60});
  if(!r.chips.some(c=>c!=='‹'))break;await p.evaluate(()=>{const c=document.querySelector('#stage .j59more.j59mr');if(c)c.click()})}
 const all=pages.flatMap(x=>x.L);if(all.filter(x=>x==='me').length!==1)ck.push('her shown '+all.filter(x=>x==='me').length+'x');
 const want=[`maid:${hh.maid}`].concat(hh.staff.map(s=>'serv:'+s.replace(/ \((maid|eunuch)\)$/,'')));for(const w of want)if(all.filter(x=>x.replace(/ \[no fig\]$/,'')===w).length!==1)ck.push('household member not shown once: '+w);
 if(all.some(x=>/\[no fig\]/.test(x)))ck.push('a person without figure');
 /* tap a eunuch: the kit person card with his acts */
 await p.evaluate(()=>{const st=document.getElementById('stage');st.__j59p=0;j59lay()});await sleep(800);
 const card=await p.evaluate(async()=>{const P=curPeople();const i=P.findIndex(q=>q.kind==='serv'&&q.ref.role==='eunuch');if(i<0)return{none:1};
  const pages=+((document.getElementById('stage').dataset.j59pg||'0,1').split(',')[1]);
  for(let k=0;k<12;k++){const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);if(t&&t.offsetParent!==null){t.click();break}const c=document.querySelector('#stage .j59more.j59mr');if(c)c.click();await new Promise(r=>setTimeout(r,700))}
  await new Promise(r=>setTimeout(r,900));const pc=document.querySelector('#pop .pc, .pc');
  return{name:P[i].name,popIdx:typeof popIdx==='number'?popIdx:null,acts:talkOpts(P[i]).map(a=>a.n),btns:[...document.querySelectorAll('#pop button.opt, .pc button.opt')].map(b=>b.textContent.trim().slice(0,30)),card:!!pc}});
 if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-card.jpg`,type:'jpeg',quality:60});
 for(const n of ['Tâm sự','Sai đi dò la','Nghe ngóng chung','Hỏi chuyện','Giao việc phòng bị','Tiến cử','Đổi người'])if(!(card.acts||[]).includes(n))ck.push('eunuch act missing: '+n);
 if(!(card.acts||[]).some(a=>/^Thưởng/.test(a)))ck.push('eunuch act missing: Thưởng');if(card.popIdx==null)ck.push('tap did not open his card');
 /* one act end to end: Tâm sự raises his loyalty by 6 and takes 1 khắc */
 const act=await p.evaluate(()=>{const P=curPeople();const i=P.findIndex(q=>q.kind==='serv'&&q.ref.role==='eunuch');const s=P[i].ref;popIdx=i;const l0=s.loyal,u0=used;const j=talkOpts(P[i]).findIndex(a=>a.n==='Tâm sự');talk(j);return{dl:s.loyal-l0,du:used-u0,msg:String(popMsg||'').slice(0,80)}});
 if(act.dl!==6&&act.dl!==Math.min(6,100))ck.push('Tâm sự loyalty change '+act.dl);if(act.du!==1)ck.push('Tâm sự khắc '+act.du);
 console.log(JSON.stringify({vp:VP,hh,pages:pages.map(x=>({L:x.L,chips:x.chips,here:x.here,people:x.people})),card,act,ck,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
