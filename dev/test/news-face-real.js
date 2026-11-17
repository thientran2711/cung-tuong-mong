/* review/kit-fig2 — owner 11/15 17:04Z: "Tin trong cung" / Sổ tuần (Tuần lục) row avatars must be the REAL person (her own included).
   Real-save check, no synthetic reference:
   1. page A: a simple driver plays (first choice in dialogs, visits a rival's palace each week) until week >= MINW with 3+ rank levels -> ser().
   2. page B (clean, no bot): the JSON goes into save slot 1 and is loaded with the title-screen "Tiếp tục kiếp này" button.
   3. reference = the DOM of the Hậu cung Phi tần strip (+ card portrait) and the Ân oán strip (Ta tile): per person img file + rank colour.
   4. page B plays on with nextBuoi() (real news from rivalsBuoi, real dawn() Sổ tuần) for WEEKS weeks; every "Tin trong cung" dialog and
      every Sổ tuần book is read from the DOM: per .kfact row, the person named FIRST in the row text (rival full name / her name / ngươi)
      and the row's avatar file + colour; compared with that person's strip tile.
   usage: node dev/test/news-face-real.js <url of index.html> [outdir] [minWeek=30] [weeks=6]
   env: SAVE=<save json> skips step 1 (a save written by an earlier run: <outdir>/save.json); IMGREV=<commit with img/ in git> for pictures.
   Note: the driver only visits palaces, so S.met stays empty and every consort is a stranger; to test real faces, add S.met entries to the
   save (e.g. 2 of every 3 consorts) — the others stay strangers and must be the grey silhouette in the strip AND in the rows. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const path=require('path');
const [,,URL,OUT,MW,WK]=process.argv;const MINW=+MW||30,WEEKS=+WK||6;if(OUT)fs.mkdirSync(OUT,{recursive:true});
/* one game tick, the way a player would: a game on screen -> its VISIBLE skip ("Để …"), then its result button / ✕; open dialog -> first
   visible choice it can pay for; Sổ tuần -> "Vào ngày mới"; else next buổi. r8 (11/15): NO workarounds any more — the driver used to
   force-hide #ov + drop S.mg after 5 ticks and drop / close a dialog that came back 5–9 times; now a stuck screen is REPORTED
   (window.__stuck = {kind, what}) and the run stops, so a game bug can no longer hide behind the driver. */
const DRIVE=`window.__tick=async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const ov=document.getElementById('ov');
 if(ov&&!ov.hidden){window.__ovn=(window.__ovn||0)+1;const V=[...ov.querySelectorAll('button')].filter(x=>x.offsetParent);
  if(window.__ovn>12){window.__stuck={kind:'overlay',what:V.map(x=>x.id||x.className).join(','),mg:JSON.stringify(S.mg)};return 'stuck'}
  const sk=V.find(x=>/^(Để|Học nhanh)/.test((x.textContent||'').trim())),ok=V.find(x=>/ok$/.test(x.id))||V.find(x=>x.classList.contains('kit-x'));const t=sk||ok||V[V.length-1];if(t)t.click();await W(60);return 'mg'}
 window.__ovn=0;
 const dawn=document.getElementById('dawn');if(dawn&&!dawn.hidden&&dawn.innerHTML){const go=dawn.querySelector('#dawn-go');try{go&&go.click()}catch(e){}await W(30);dawn.hidden=true;dawn.innerHTML='';document.body.classList.remove('kbk-open');return 'dawn'}
 if(Q.length){const m=Q[0];if(window.__lq===m){window.__lqn=(window.__lqn||0)+1}else{window.__lq=m;window.__lqn=0}
  if(window.__lqn>8){window.__stuck={kind:'dialog',what:String(m.t||'').slice(0,60),opts:(m.opts||[]).map(o=>o.n).slice(0,4)};return 'stuck'}
  if(m.opts&&m.opts.length){const i=m.opts.findIndex(c=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));if(i<0)closeModal();else{const t=m.t;chooseM(i);
    /* the same dialog back in the queue right after its answer = the re-queue bug: reported, never skipped */
    if(Q.some(x=>x===m||(x.pid&&x.pid===m.pid&&JSON.stringify(x.pp||null)===JSON.stringify(m.pp||null)&&x.t===t))){window.__stuck={kind:'requeue',what:String(t).slice(0,60),opt:m.opts[i].n};return 'stuck'}}}else closeModal();return 'q'}
 try{nextBuoi()}catch(e){}return 'buoi'};`;
/* pictures: the CDN (jcdn IMG_BASE) is answered from git objects of IMGREV (default 3e212597e, the last commit with img/ in git) — fast, no disk;
   a file not there goes to the network; any other outside host is blocked */
const {execFileSync}=require('child_process');const IMGREV=process.env.IMGREV||'3e212597e';const CT={webp:'image/webp',png:'image/png',jpg:'image/jpeg',json:'application/json',mp3:'audio/mpeg'};
async function routeImg(ctx){await ctx.route(/^https?:\/\//,async r=>{const u=r.request().url();if(/^https?:\/\/(127\.0\.0\.1|localhost)/.test(u))return r.continue();
 const m=/^https:\/\/ctm-img\.[^/]+\/(img\/[^?#]+)/.exec(u);if(!m)return r.abort();
 try{const b=execFileSync('git',['cat-file','blob',IMGREV+':'+decodeURIComponent(m[1])],{cwd:__dirname,maxBuffer:64<<20,stdio:['ignore','pipe','ignore']});return r.fulfill({status:200,body:b,contentType:CT[(m[1].split('.').pop()||'').toLowerCase()]||'application/octet-stream'})}
 catch(e){return r.continue()}})}
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome'});
 /* ---- 1. world (SAVE=<file> reuses a save made before) ---- */
 let json=null,info=null;if(process.env.SAVE){json=fs.readFileSync(process.env.SAVE,'utf8');info={from:process.env.SAVE}}else{
 const ca=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await routeImg(ca);const pa=await ca.newPage();pa.setDefaultTimeout(0);
 await pa.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await pa.waitForFunction(()=>typeof start==='function'&&typeof ser==='function',null,{timeout:0});await sleep(1500);
 await pa.addInitScript(()=>{});await pa.evaluate(DRIVE);
 const W0=await pa.evaluate(async([mw])=>{try{localStorage.clear()}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;
  const fresh=()=>{for(let i=0;i<400;i++){start();if(!isSrv()&&!S.out)break}};fresh();let last=-1,lives=1;
  for(let g=0;g<40000;g++){if(S.dead||isSrv()){fresh();lives++;continue}
   if(wk()!==last){last=wk();if(wk()>=mw&&!S.out){const rk=liveRivals(true).map(v=>v.rank);if(new Set(rk).size>=3)return{w:wk(),rank:S.rank,met:Object.keys(S.met||{}).length,lives,json:JSON.stringify(ser())}}
    /* meet people the real way: go to a rival's palace once a week (the ones not met first) */
    try{if(!Q.length&&!S.mg){const L=liveRivals(true).filter(v=>v.alive&&!v.out);const v=L.find(x=>!S.met[x.id])||L[wk()%Math.max(1,L.length)];if(v)goTo(palaceOf(v))}}catch(e){}}
   if(await window.__tick()==='stuck')return{err:'stuck',stuck:window.__stuck,w:wk()}}return{err:'no world',w:wk(),lives,dead:S.dead,srv:isSrv(),out:S.out,q:Q.length,qt:Q[0]&&Q[0].t,b:S.buoi}},[MINW]);
 json=W0.json||null;info=W0.json?{week:W0.w,rank:W0.rank,met:W0.met,lives:W0.lives}:W0;
 await ca.close();if(!json){console.log(JSON.stringify({err:'no world',info}));await b.close();return}
 if(OUT&&json)fs.writeFileSync(`${OUT}/save.json`,json)}
 /* ---- 2. load it like the owner ---- */
 const cb=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 await routeImg(cb);const p=await cb.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showTitle==='function',null,{timeout:0});await sleep(2500);
 await p.evaluate(j=>{localStorage.setItem(SK(1),j);const kl=document.getElementById('kload');if(kl)kl.remove();showTitle()},json);await sleep(500);
 await p.evaluate(()=>{const T=document.getElementById('title');T.hidden=false;const b=document.querySelector('[data-load="1"]');b.click()});await sleep(2500);
 const res=await p.evaluate(async([WEEKS])=>{const W=t=>new Promise(r=>setTimeout(r,t));const file=s=>String(s||'').replace(/^.*\//,'').replace(/\?.*$/,'');
  const out={name:S.name,rank:S.rank,week:wk(),ref:{},card:{},news:[],book:[],dlgs:{},texts:[]};
  const closeAll=()=>{document.getElementById('modal').hidden=true;Q.length=0};
  /* reference: live Hậu cung strip (+ card) */
  const __tab0=tab;closeAll();window.__rb=false;tab='rv';render();await W(300);
  /* tiles are keyed by their own label (the strip groups people, so its order is not rivals[]) */
  const lab=t=>((t.querySelector(':scope>span:not(.md)')||{}).textContent||'').trim();const tsrc=t=>{const im=t.querySelector('img');return file(im&&im.getAttribute('src'))};
  const tcol=t=>{const md=t.querySelector('.md');return md?md.style.getPropertyValue('--c').trim():''};
  const byLab=l=>rivals.find(v=>shortN(v.name)===l||v.name===l);
  {const P=document.getElementById('panel');const T=[...P.querySelectorAll('.pstrip .pface')];
   for(let i=0;i<T.length;i++){const v=byLab(lab(T[i]));if(!v)continue;out.ref[v.name]={src:tsrc(T[i]),col:tcol(T[i]),rank:v.rank,met:typeof isKnown61==='function'?isKnown61(v):null}}
   /* the card portrait of each one (tap her tile) */
   for(let i=0;i<T.length;i++){const P2=document.getElementById('panel');const t=P2.querySelectorAll('.pstrip .pface')[i];const v=t&&byLab(lab(t));if(!v)continue;t.click();await W(80);
    const c=document.getElementById('panel').querySelector('.pcp img');out.card[v.name]=file(c&&c.getAttribute('src'))}}
  /* Ta: the "Ta" tile of the Ân oán strip */
  tab='rel';relSel=null;PG.rel=null;render();await W(300);{const P=document.getElementById('panel');const t=[...P.querySelectorAll('.pstrip .pface')].find(x=>/^(Ta|Ngươi)$/.test(lab(x)));
   out.ref.__ME={src:t?tsrc(t):'',col:t?tcol(t):'',tile:t?lab(t):'(no Ta tile)',pMe:file(pMe().src)}}
  /* name+title builders, every person: "<title or its first words> <name> sang." through kitFacts must not repeat the title */
  try{const P=(typeof k61All==='function'?k61All():[]).concat(rivals,[S.emp]).filter(Boolean);const seen=new Set();const bad=[];let n=0;
   for(const p of P){if(seen.has(p)||!p.name||p===S)continue;seen.add(p);const t=kitTitle(p);if(!t)continue;const w=t.split(' ');
    for(const k of [...new Set([w.length,w.length>=3?2:w.length])]){const pre=w.slice(0,k).join(' ');const h=kitFacts([`${pre} ${p.name} sang.`],{group:false});const d=document.createElement('div');d.innerHTML=h;
     const txt=((d.querySelector('.kft')||d).textContent).replace(/\s+/g,' ').trim();n++;const i=txt.indexOf(p.name);const before=txt.slice(0,i);
     if((before.match(new RegExp(w[0],'g'))||[]).length>1)bad.push(txt.slice(0,90))}}
   out.titleUnit={n,bad:bad.length,ex:bad.slice(0,8)}}catch(e){out.titleUnit={err:e.message}}
  tab=__tab0;render();
  /* who is named first in a row */
  const names=rivals.map(v=>[v.name,v]).sort((a,b)=>b[0].length-a[0].length);
  const firstOf=txt=>{let best=null,bi=1e9;for(const [n,v] of names){const i=txt.indexOf(n);if(i>=0&&i<bi){bi=i;best=n}}
   const mi=Math.min(...[txt.indexOf(S.name),txt.search(/(^|\s)(ngươi|Ngươi|Ta)(\s|[.,!?:]|$)/)].filter(i=>i>=0).concat([1e9]));if(mi<bi){best='__ME'}return best};
  const readRows=root=>[...root.querySelectorAll('.kfact')].map(r=>{const txt=(r.querySelector('.kft')||r).textContent.replace(/\s+/g,' ').trim();
   const md=r.querySelector('.md');const img=md&&md.querySelector('img');
   const who=firstOf(txt);const ref=who?out.ref[who]:null;const src=file(img&&img.getAttribute('src'));const col=md?md.style.getPropertyValue('--c').trim():'';
   return{html:md?'':r.outerHTML.slice(0,700),txt:txt.slice(0,90),who,src,col,ref:ref&&ref.src,rcol:ref&&ref.col,face:!!md,ok:!who||!md?null:(!!ref&&src===ref.src&&col===ref.col)}});
  /* play */
  const t0=wk();let guard=0;
  while(wk()<t0+WEEKS&&guard++<600&&!S.dead){
   const dawn=document.getElementById('dawn');if(dawn&&!dawn.hidden&&dawn.innerHTML){out.texts.push(dawn.innerText);out.book.push(...readRows(dawn).map(r=>Object.assign(r,{wk:wk()})));
    const go=dawn.querySelector('#dawn-go');try{if(go)go.click();else{dawn.hidden=true;dawn.innerHTML='';document.body.classList.remove('kbk-open')}}catch(e){}await W(400);dawn.hidden=true;dawn.innerHTML='';document.body.classList.remove('kbk-open');continue}
   const m=document.getElementById('modal');if(!m.hidden){out.texts.push(m.innerText);const t=(m.querySelector('h2,h3,.dt,.mt')||{}).textContent||'';out.dlgs[t.slice(0,30)]=(out.dlgs[t.slice(0,30)]||0)+1;
    if(/Tin trong cung/.test(m.textContent.slice(0,200))){out.news.push(...readRows(m).map(r=>Object.assign(r,{wk:wk(),raw:m.querySelectorAll('.kfact').length})));if(!m.querySelector('.kfact'))out.news.push({noRows:1,html:m.innerHTML.slice(0,300)})}
    const bt=[...m.querySelectorAll('button')].filter(x=>x.offsetParent&&!/kit-x/.test(x.className));try{(bt[0]||{click(){closeAll()}}).click()}catch(e){closeAll()}await W(150);if(!m.hidden&&Q.length===0)m.hidden=true;continue}
   try{nextBuoi()}catch(e){out.err=e.message;break}await W(120)}
  try{out.texts.push((S.logs||[]).map(x=>typeof plain==='function'?plain(String(x&&x.t||x)):String(x)).join('\n'))}catch(e){}
  out.weeks=wk()-t0;return out},[WEEKS]);
 if(OUT)await p.screenshot({path:`${OUT}/news-face-real.jpg`,type:'jpeg',quality:60});
 const all=[...res.news.map(r=>Object.assign({at:'news'},r)),...res.book.map(r=>Object.assign({at:'book'},r))].filter(r=>!r.noRows);
 const judged=all.filter(r=>r.ok!==null);const bad=judged.filter(r=>!r.ok);
 const sum={world:info,player:{name:res.name,rank:res.rank,week:res.week},weeksPlayed:res.weeks,ref:res.ref,cardN:Object.keys(res.card).filter(k=>res.card[k]).length,cardVsStrip:Object.keys(res.card).filter(k=>res.card[k]&&res.ref[k]&&res.card[k]!==res.ref[k].src).map(k=>[k,res.card[k],res.ref[k].src]),
  rows:{news:res.news.length,book:res.book.length,judged:judged.length,ok:judged.length-bad.length,bad:bad.length,noFace:all.filter(r=>r.who&&!r.face).length,stranger:judged.filter(r=>/unknown-/.test(r.src)).length},bad:bad.slice(0,30),sample:judged.slice(0,12),dlgs:res.dlgs,err:res.err,errs:errs.slice(0,8)};
 /* doubled titles anywhere in the dialogs / books / Sổ ghi text: the same title twice in a row, or two titles before one name */
 const TT='Thái tử|Hoàng tử|Công chúa|Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Thái hậu|Hoàng thượng|Phế phi|Thái y|Thị vệ|Ma ma|Cô cô|Cung nữ thân tín|Cung nữ|Thái giám|Tổng quản|Nữ quan|Nhũ mẫu|Nhạc sư|Họa sư|Tể tướng|Thượng thư|Tú nữ';
 const DBL=new RegExp('(?:^|[^\\p{L}])((?:'+TT+') (?:'+TT+') \\p{Lu})','giu');const dbl={};
 for(const t of res.texts)for(const line of String(t).split('\n')){let m;DBL.lastIndex=0;while((m=DBL.exec(line))){const L=m[1].slice(-1);if(L!==L.toUpperCase()||L===L.toLowerCase())continue;const k=m[1].slice(0,-2);if(/ Tần$/.test(k))continue;/* Tần = also a surname */if(/^(Hoàng thượng|Thái hậu) /.test(k)&&!/^(\S+ \S+) \1$/.test(k))continue;(dbl[k]=dbl[k]||[]).push(line.slice(0,140))}}
 sum.doubleTitles=Object.fromEntries(Object.entries(dbl).map(([k,v])=>[k,{n:v.length,ex:[...new Set(v)].slice(0,3)}]));sum.textsN=res.texts.length;sum.titleUnit=res.titleUnit;
 if(OUT)fs.writeFileSync(`${OUT}/news-face-real.json`,JSON.stringify({sum,all},null,1));
 console.log(JSON.stringify(sum,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
