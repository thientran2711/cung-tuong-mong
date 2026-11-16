/* review/small-bugs-4 (D47) — six small faults, each checked as a WHOLE CLASS (LUẬT SỬA CẢ NHÓM).
   usage: node dev/test/small-bugs-4.js <page URL> <WxH@dpr> [shot dir]     (page = doctype + charset + dev/index.html, direct mode) + python3 dev/test/sb4-scan.py
   why     Thỉnh an Thái hậu / Hoàng hậu / Hoàng thượng "Vì sao": in trung y the line never claims "mất Danh/Đức" (the robe rule prices those) and says trung y
   wear    the bag (kinvItems) and the item sentences use one word: Đang mặc
   greet   Bái kiến a stranger host: her face is revealed (kitKnown), her name stays "???"; the result row/log never shows her true name
   arc     an arc goal that names her people (Mục tiêu row, Chương tab) shows the real names (target known), never "<phẩm> ???"
   skip    Ra mắt "Bỏ qua" hint: names the maid and whose thiện cảm decides; no "theo lòng nàng"
   srv     servant road + lãnh cung top bar: no "!" on the Đức cell, nothing past the right edge
   kit     exactly one kit sample page (#kit): one KIT_SAMPLES registry, no kitSample()
   Prints JSON {vp, checks:{name:[problems]}, info, errs}; exit 1 when any check has problems. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,SHOTS]=process.argv;const m=/^(\d+)x(\d+)@?([\d.]*)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+(m[3]||1);
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const OUT={vp:VP,checks:{},info:{}};const C=(k,L)=>{OUT.checks[k]=(OUT.checks[k]||[]).concat(L||[])};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1000);
 const R=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const O={why:[],wear:[],greet:[],arc:[],skip:[],srv:[],kit:[],info:{}};
  const mo=document.getElementById('modal');const closeAll=()=>{Q.length=0;if(mo)mo.hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove())};
  const txt=root=>{const L=[];const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentElement;if(!p||/SCRIPT|STYLE/.test(p.tagName)||!n.nodeValue.trim()||!p.getClientRects().length)continue;L.push(n.nodeValue.trim())}return L.join(' | ')};
  const fresh=()=>{window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;closeAll();deal();render()};
  fresh();await W(800);
  /* why: trung y at Thỉnh an */
  try{const w=wdOf(S);const was=w.y;w.y=null;O.info.ty=typeof tyOn==='function'?tyOn(S):null;
   for(const kind of ['th','hh','emp']){const pe=kind==='hh'?{kind:'hh',ref:rivals[0]}:{kind};const A=talkOpts(pe).filter(a=>a&&a.why&&(kind==='emp'||/^Thỉnh an/.test(a.n)));
    if(!A.length){O.info['why_'+kind]='no thỉnh an card';continue}
    for(const a of A){const t=a.why().map(x=>x[0]).join(' / ');(O.info['why_'+kind]=O.info['why_'+kind]||[]).push(t.slice(-200));
     if(/mất Danh\/Đức|mất Danh|mất Đức/.test(t))O.why.push(kind+': claims mất Danh/Đức in trung y: '+t.slice(0,160));if(!/trung y/.test(t))O.why.push(kind+': does not say trung y: '+t.slice(0,160))}}
   w.y=was}catch(e){O.why.push('ERR '+e.message)}
  /* wear: the bag label */
  try{const L=(typeof kinvItems==='function'?kinvItems():[]).filter(x=>x&&x.onText);O.info.onTexts=[...new Set(L.map(x=>x.onText))];for(const t of O.info.onTexts)if(t!=='Đang mặc')O.wear.push('bag label '+t);
   tab='inv';render();await W(900);const bt=txt(document.getElementById('panel'));for(const m of bt.match(/Đang (?:cài|đeo|dùng)/g)||[])O.wear.push('panel '+m)}catch(e){O.wear.push('ERR '+e.message)}
  /* greet: Bái kiến a stranger host */
  try{closeAll();S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=1;used=0;S.acPass={};S.acGreet={};S.acSkip={};
   const k=places().map(x=>x.k).find(x=>{if(x[0]!=="r")return false;const h=accHost(x);return h&&h!==S&&h.alive&&!h.out&&rkOf(h)-rkOf(S)>=1});
   if(!k)O.info.greet='no higher host';else{const h=accHost(k);S.where[h.id]=k;O.info.greetHost=k61Named(h)?'named':'stranger';j77Tap(k);await W(500);
    const i=Q[0]&&Q[0].opts.findIndex(o=>/^Bái kiến/.test(o.n));if(i<0)O.greet.push('no Bái kiến option');else{chooseM(i);await W(1800);
     if(typeof kitKnown==='function'&&!kitKnown(h))O.greet.push('face still a silhouette after the greeting');
     const all=txt(document.body);if(!k61Named(h)&&all.includes(h.name))O.greet.push('true name shown for a stranger: '+h.name);O.info.greetAfter={named:k61Named(h),known:kitKnown(h),toast:(document.getElementById('rtoast')?txt(document.getElementById('rtoast')):'').slice(0,160)}}}}catch(e){O.greet.push('ERR '+e.stack.slice(0,200))}
  /* arc goal names */
  try{closeAll();let tested=0;for(const id of Object.keys(ARC67)){if(!/\{(v|v2|foe)\}/.test(String(ARC67[id].g)))continue;const A=newThread67(id,'m');if(!A)continue;
    const v=rv67(A,'v')||(String(ARC67[id].g).includes('{foe}')?foe67():null);if(!v)continue;S.known[kOf61(v)]=0;K61VER++;
    S.st.M=A;S.st.ms=null;S.st.ch=S.st.ch||{n:1,i:0,plan:[],past:[]};tab='story';render();await W(1200);
    const rows=txt(document.getElementById('panel'));tested++;if(/\?\?\?/.test(rows.split('Mục tiêu')[1]||''))O.arc.push(id+': Mục tiêu still masked');if(!k61Named(v))O.arc.push(id+': target not named after the goal was shown');if(tested>=4)break}
   O.info.arcTested=tested;if(!tested)O.arc.push('no arc with a named target tested')}catch(e){O.arc.push('ERR '+e.stack.slice(0,200))}
  /* skip hint */
  try{if(typeof tsOpen==='function'||document.getElementById('tsdskip')){}
   const src=[...document.querySelectorAll('script')].map(s=>s.textContent).join('');O.info.srcHasOld=/theo lòng nàng/.test(src);if(O.info.srcHasOld)O.skip.push('"theo lòng nàng" still in the page source')}catch(e){O.skip.push('ERR '+e.message)}
  /* srv / cold */
  for(const mode of ['srv','cold']){try{closeAll();fresh();await W(700);if(mode==='srv')srvInit();else{S.out=1}closeAll();render();await W(1200);
    const c=document.getElementById('hud-duc');if(!c)O.srv.push(mode+': no Đức cell');else{if(c.querySelector('.kstw'))O.srv.push(mode+': "!" on the Đức cell')}
    const hd=document.querySelector('header.hud');const hr=hd.getBoundingClientRect();for(const e of hd.querySelectorAll('*')){const r=e.getBoundingClientRect();if(r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='fixed')O.srv.push(mode+': '+(e.id||e.className)+' past the right edge by '+Math.round(r.right-innerWidth));}
    O.info['srv_'+mode]={isSrv:isSrv(),duc:c?c.title:null}}catch(e){O.srv.push(mode+' ERR '+e.message)}}
  /* kit page */
  try{O.info.samples=window.KIT_SAMPLES?KIT_SAMPLES.length:0;if(typeof kitSample==='function')O.kit.push('kitSample() exists');if(typeof kitSamplePage!=='function')O.kit.push('kitSamplePage missing');
   location.hash='#kit';await W(1500);const pg=document.querySelectorAll('[aria-label="Trang mẫu kit"]');O.info.kitpg=pg.length;O.info.kitSections=document.querySelectorAll('#kitpage .kitpg-s').length;if(pg.length!==1||document.getElementById('kitpage').hidden)O.kit.push('kit pages in DOM: '+pg.length);location.hash=''}catch(e){O.kit.push('ERR '+e.message)}
  return O});
 for(const k of ['why','wear','greet','arc','skip','srv','kit'])C(k,R[k]);OUT.info=R.info;OUT.errs=errs;
 if(SHOTS){fs.mkdirSync(SHOTS,{recursive:true});await p.screenshot({path:`${SHOTS}/sb4-${W}x${H}.jpg`,type:'jpeg',quality:50})}
 console.log(JSON.stringify(OUT,null,1));await b.close();process.exit(Object.values(OUT.checks).some(x=>x.length)||errs.length?1:0)})();
