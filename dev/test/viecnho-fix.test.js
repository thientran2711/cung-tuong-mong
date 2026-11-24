/* review/viecnho-fix (owner 24/11 ~21:50Z real): (1) Việc nhờ «Tìm việc» sub-tab + Đang làm order, (2) person-panel scroll (kit §6.4), (3) «Vì sao» wording.
   node dev/test/viecnho-fix.test.js [outdir]   (after dev/site/build_site.sh; shots go to outdir, never git). exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'/tmp/viecnho-fix';fs.mkdirSync(OUT,{recursive:true});
let fails=0;const ok=(c,m)=>{if(!c){fails++;console.log('FAIL',m)}else console.log('ok  ',m)};
(async()=>{const b=await chromium.launch();
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
  await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}S.rank=Math.max(S.rank,3);S.sung=Math.max(S.sung,60);render()});
  await p.waitForTimeout(600);
  /* a job in progress */
  await p.evaluate(()=>{const f0=j72cFit,n0=j72cNeed,p0=q72PlOk;j72cFit=()=>true;j72cNeed=()=>true;q72PlOk=()=>true;try{const q=q72();q.cd={};q.a=[];q72Test('c:j72c-court-005',1)}finally{j72cFit=f0;j72cNeed=n0;q72PlOk=p0}});await p.waitForTimeout(600);
  await p.evaluate(()=>{const it=Q[0];if(it&&it.opts)chooseM(0);try{$("modal").hidden=true}catch(e){}Q.length=0;KTSUB.q72="now";tab="q72";render()});await p.waitForTimeout(1200);
  /* (1) sub-tabs */
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#panel [data-ktsub="q72"] [data-ktsv]')].map(e=>e.dataset.ktsv));
  ok(JSON.stringify(tabs.slice(0,2))==='["now","find"]',`${name} sub-tabs now,find first: ${tabs}`);
  const now=await p.evaluate(()=>({ask:!!document.querySelector('#panel [data-q72a="ask"]'),firstIsPerson:(()=>{const a=document.querySelector('#panel .pgwrap');const k=document.querySelector('#panel .ktacts');return !!a&&!k})(),pc:!!document.querySelector('#panel .pc')}));
  ok(!now.ask&&now.pc&&now.firstIsPerson,`${name} Đang làm: no ask act, person panel present (${JSON.stringify(now)})`);
  await p.screenshot({path:`${OUT}/${name}-1-dang-lam.png`});
  /* (2) scroll */
  const pre=await p.evaluate(()=>{const pc=document.querySelector('#panel .pc[data-k2]');if(!pc)return null;const L=pc.querySelector('.kplscr'),R=pc.querySelector(':scope>.pcr');if(!L||!R)return{noScr:true};
   const pad=document.createElement('div');pad.style.cssText='height:900px';pad.textContent='.';L.appendChild(pad.cloneNode(true));R.appendChild(pad);return{ok:1}});await p.waitForTimeout(900);
  ok(pre&&pre.ok,`${name} person panel has .kplscr + .pcr scrollers`);
  const rect=sel=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return[Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]},sel);
  const sel=['#panel .pc .pcl>.pcp','#panel .pc .pcname','#panel .pc .kpstick','#panel .pc'];
  await p.waitForTimeout(900);
  for(const [col,s] of [['left','#panel .pc .kplscr'],['right','#panel .pc>.pcr']]){
   await p.evaluate(()=>{const L=document.querySelector('#panel .pc .kplscr'),R=document.querySelector('#panel .pc>.pcr');for(const e of [L,R])if(!e.querySelector(':scope>.tpad')){const d=document.createElement('div');d.className='tpad';d.style.cssText='height:900px';e.appendChild(d)}});await p.waitForTimeout(250);
   const r0=await Promise.all(sel.map(rect));
   const st=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollTop=300;return[e.scrollTop,document.querySelector('#panel .pc .kplscr').scrollTop,document.querySelector('#panel .pc>.pcr').scrollTop]},s);
   await p.waitForTimeout(150);const r1=await Promise.all(sel.map(rect));
   ok(JSON.stringify(r0)===JSON.stringify(r1),`${name} scroll ${col}: portrait / name / info block / card rects unchanged ${JSON.stringify(r1)}`);
   ok(st[0]>0,`${name} scroll ${col}: that column scrolled (${st[0]})`);
   const other=col==='left'?st[2]:st[1];ok(other===0,`${name} scroll ${col}: the other column did not move (${other})`);
   await p.evaluate(()=>{document.querySelector('#panel .pc .kplscr').scrollTop=0;document.querySelector('#panel .pc>.pcr').scrollTop=0});
   await p.screenshot({path:`${OUT}/${name}-2-scroll-${col}.png`});}
  const pcs=await p.evaluate(()=>{const pc=document.querySelector('#panel .pc[data-k2]');return{pcScroll:pc.scrollHeight-pc.clientHeight,pcOv:getComputedStyle(pc).overflowY}});
  ok(pcs.pcScroll<=1,`${name} the card itself never scrolls (${JSON.stringify(pcs)})`);
  /* Tìm việc sub-tab */
  await p.evaluate(()=>{KTSUB.q72="find";render()});await p.waitForTimeout(500);
  ok(await p.evaluate(()=>!!document.querySelector('#panel [data-q72a="ask"]')),`${name} Tìm việc holds the ask act`);
  await p.screenshot({path:`${OUT}/${name}-1-tim-viec.png`});await p.evaluate(()=>{KTSUB.q72="now";render()});
  ok(errs.length===0,`${name} no page errors ${errs[0]||''}`);await p.close()}
 /* (3) Vì sao wording: every source of whyText, known / unknown name + nết */
 const p=await b.newPage({viewport:{width:755,height:1000}});await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;Q.length=0;try{$("modal").hidden=true}catch(e){}});
 const lines=await p.evaluate(()=>{const out=[];const V=rivals.slice(0,4);const nets=Object.keys(BAL.net.T).slice(0,3);
  for(const v of V)for(const known of [0,1])for(const st of ["aff","oan"])for(const d of [12,-6]){const sv=typeof k61Named==="function"?k61Named:null;try{if(sv)window.k61Named=()=>!!known;const F=[{k:"net",t:nets[0],s:1},{k:"trong",v:"Lễ",s:1,j:v}];out.push(whyText({who:v,stat:st,d,F},d))}finally{if(sv)window.k61Named=sv}}
  out.push(whyText({who:"th",stat:"th",d:4,F:[{k:"mood",t:"lòng ngươi đang vui",s:1}]},4));out.push(whyText({who:"emp",stat:"sung",d:5,F:[{k:"talk",t:"đêm vui"}]},5));
  out.push(...whyUniq(["A → x","A → x","B → y"]));return out});
 const bad=lines.filter(t=>/người chưa quen|theo tính nết|%|undefined|NaN/.test(t)||!/→/.test(t)||/\s{2,}/.test(t));
 ok(bad.length===0,`Vì sao: ${lines.length} lines, 0 vague/duplicate-prefix (${bad.slice(0,3).join(' | ')})`);
 ok(lines.some(t=>/chưa rõ tên/.test(t))&&lines.some(t=>/oán ta [+−]\d/.test(t)&&/thiện cảm với ta/.test(lines.join('|'))),'Vì sao: unknown name says «chưa rõ tên»; verbs «oán ta» / «thiện cảm với ta»');
 console.log(lines.slice(0,6).join('\n'));
 await b.close();console.log(fails?`FAILED ${fails}`:'ALL OK');process.exit(fails?1:0)})().catch(e=>{console.log('ERR',e.message);process.exit(1)});
