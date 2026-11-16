/* review/small-bugs-2 — five small bugs, each checked as a WHOLE CLASS (LUẬT SỬA CẢ NHÓM).
   usage: node dev/test/small-bugs-2.js <page URL> <WxH@dpr> [oldPageURL] [shot dir]
   1 ROAD   on the cung nữ road and in lãnh cung, no consort-only goal/hint (lập Hoàng hậu, mẹ Thái tử, thăng bậc, thị tẩm, bổng lộc, sắc phong…)
            in any header cell title / warn badge / tap explanation (HX) / glossary popover. Prints every hit.
   2 POR    her header portrait is her real por-player-* / por-consort-* (player-dress identity) picture (loaded, visible) on every life type: 9 origins, cung nữ (rank 1 and 3),
            lãnh cung — also in the first seconds before the figure manifests arrive.
   3 MET    Hoàng thượng / Thái hậu / Hoàng hậu: the stage chip, portraits (mdH, pcPort, kitPortrait = news / Tuần lục rows), dialog figures
            (kitStageFig, kitFigOf) all agree; Hoàng thượng + Thái hậu are met from day one; Hoàng hậu is a silhouette until met, then a face.
   4 SLOTS  no stage figure (or its name chip) under a stage panel (#kshR, #kshL plaques) in lãnh cung, home, vườn with 1–3 other people.
   5 GAME   the j82 frame's progress cell: exam = "Môn", engines = their own word (Hồi / Câu), contest result = "Hạng".
   Prints JSON {checks:{name:[problems]}, errs}. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const crypto=require('crypto');
const [,,URL,VP,OLD,SHOTS]=process.argv;const m=/^(\d+)x(\d+)@?([\d.]*)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+(m[3]||1);
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,url){await p.goto(url,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1200)}
/* pictures: a local cache of the CDN (CACHE=<dir>), so repeated runs do not wait on the network */
async function cache(ctx){const CD=process.env.CACHE;if(!CD)return;fs.mkdirSync(CD,{recursive:true});
 await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/.*\.(webp|png|jpg|mp3|ogg)(\?.*)?$/,async r=>{const u=r.request().url().replace(/\?.*$/,'');const f=CD+'/'+crypto.createHash('md5').update(u).digest('hex');
  if(fs.existsSync(f))return r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':/\.webp$/.test(u)?'image/webp':'application/octet-stream','access-control-allow-origin':'*'}});
  try{const resp=await r.fetch();const b=await resp.body();if(resp.status()===200)fs.writeFileSync(f,b);return r.fulfill({response:resp,body:b})}catch(e){return r.abort()}})}
const NEW=`window.__sb2new=(o,f)=>{window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
 const m=document.getElementById('modal');if(m)m.hidden=true;if(f)f();Q.length=0;if(m)m.hidden=true;deal();render()};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000});await cache(ctx);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);const OUT={vp:VP,checks:{},info:{}};const C=(k,L)=>{OUT.checks[k]=(OUT.checks[k]||[]).concat(L)};
 const shot=async n=>{if(SHOTS){fs.mkdirSync(SHOTS,{recursive:true});await p.screenshot({path:`${SHOTS}/sb2-${W}x${H}-${n}.jpg`,type:'jpeg',quality:60})}};
 if(OLD){await boot(p,OLD);await p.evaluate(()=>{window.__forceOrigin='cnv';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;S.month=4;save()});await sleep(800)}
 await boot(p,URL);await p.evaluate(NEW);
 if(OLD){OUT.info.oldSave=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;deal();render();
   const i=document.querySelector('#me-p img.kpor');return 'ok month '+S.month+' srv '+!!S.srv+' th '+isKnown61(S.thO)+' emp '+isKnown61(S.emp)+' por '+(i?i.getAttribute('src').split('/').pop():'none')}catch(e){return 'err '+String(e.stack).slice(0,300)}});
  await sleep(1500);await shot('oldsave')}
 /* ---------- 1 ROAD ---------- */
 const BAD=/lập Hoàng hậu|Ngôi Hoàng hậu|Hoàng hậu cần|mẹ Thái tử|thăng bậc|thăng phẩm|sắc phong|tấn phong|thị tẩm|lật thẻ|bổng lộc/i;
 for(const [road,setup] of [["srv","cnv"],["cold","cold"]]){
  await p.evaluate(r=>{if(r==="cnv")__sb2new("cnv");else __sb2new("thd",()=>cold("thử"))},setup);await sleep(2500);
  const hits=await p.evaluate(async(BADs)=>{const BAD=new RegExp(BADs,'i');const H=[];const W=t=>new Promise(r=>setTimeout(r,t));
   document.querySelectorAll('header.hud [title], header.hud [aria-label], #stage [title]').forEach(e=>{for(const a of ['title','aria-label']){const v=e.getAttribute(a);if(v&&BAD.test(v))H.push(`${a} of ${e.id||e.className}: ${v.slice(0,90)}`)}});
   document.querySelectorAll('header.hud .kstw').forEach(e=>{if(e.offsetParent)H.push('warn badge on '+(e.closest('[id]')||{}).id+': '+(e.getAttribute('aria-label')||''))});
   const cells=[...document.querySelectorAll('header.hud [id^="hud-"]')].map(e=>e.id.slice(4));
   for(const k of cells){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{k3Explain(k==='sung'&&typeof isSrv==='function'&&isSrv()?'tin':k)}catch(e){}await W(60);
    const t=(document.getElementById('mb')||{}).innerText||'';if(BAD.test(t))H.push(`tap ${k}: ${t.replace(/\s+/g,' ').slice(0,120)}`);Q.length=0;if(m)m.hidden=true}
   for(const g of ['Sủng','Danh','Đức','Sắc','Tài','Tâm cơ','Bạc','Sức','Tai mắt','Ân tình']){const t=typeof kitGlossText==='function'?kitGlossText(g):KIT_GLOSS[g];if(t&&BAD.test(t))H.push(`gloss ${g}: ${t.slice(0,100)}`)}
   /* goal hints: every bottom tab she can open on this road (visible text of the panel, sub-tabs included) */
   for(const b of [...document.querySelectorAll('nav.bar [data-tab]')].filter(x=>x.offsetParent)){b.click();await W(250);
    const subs=[null,...[...document.querySelectorAll('.ktabs [data-ktab], .ksubt [data-ksub], [data-kst]')].filter(x=>x.offsetParent).slice(0,8)];
    for(const s of subs){if(s){try{s.click()}catch(e){}await W(150)}const pn=document.querySelector('main')||document.body;const t=pn.innerText||'';
     t.split('\n').filter(l=>BAD.test(l)).slice(0,4).forEach(l=>H.push(`tab ${b.dataset.tab}${s?'/'+s.textContent.trim().slice(0,12):''}: ${l.trim().slice(0,120)}`))}}
   const a=document.querySelector('nav.bar [data-tab="act"]');if(a)a.click();await W(200);
   return [...new Set(H)]},BAD.source);
  C('1 road '+road,hits);await shot('road-'+road)}
 /* ---------- 2 POR ---------- */
 const lives=[["cnv"],["cnv","rk3"],["thd","cold"],["tt"],["dtq"],["muoi"],["cn"],["nc"],["td"],["ch"],["thd"]];
 for(const [o,x] of lives){const r=await p.evaluate(async([o,x])=>{__sb2new(o,()=>{if(x==="cold")cold("thử");if(x==="rk3"&&S.srv)S.srv.rk=3});await new Promise(r=>setTimeout(r,2200));render();await new Promise(r=>setTimeout(r,800));
   const i=document.querySelector('#me-p img.kpor');const q=i&&i.getBoundingClientRect();return{s:i?(i.getAttribute('src')||'').split('/').pop():'',nw:i?i.naturalWidth:0,w:q?q.width:0,v:i?getComputedStyle(i).visibility+getComputedStyle(i).display:''}},[o,x]);
  if(!/^por-(player|consort)-/.test(r.s)||!r.nw||r.w<10||!/visible/.test(r.v))C('2 portrait',[`${o}${x?' '+x:''}: ${JSON.stringify(r)}`]);OUT.info['por '+o+(x||'')]=r.s}
 /* before the manifests: her portrait is still her own (FIGS emptied for the moment) */
 {const r=await p.evaluate(()=>{__sb2new("cnv");const f0=FIGS.slice(),g0=FIGSIG;FIGS.length=0;FIGSIG="";let s="";try{render();const i=document.querySelector('#me-p img.kpor')||document.querySelector('#me-p img');s=i?i.getAttribute('src'):'(no img) '+document.getElementById('me-p').innerText}finally{FIGS.push(...f0);FIGSIG=g0;render()}return s});
  if(!/por-(player|consort)-/.test(r))C('2 portrait',['before manifests (cnv): '+r])}
 /* ---------- 3 MET ---------- */
 for(const o of ["thd","cnv"]){const r=await p.evaluate(async(o)=>{__sb2new(o);await new Promise(r=>setTimeout(r,2000));const P=[];
   const sil=s=>/unknown-/.test(String(s||''));const src=h=>(/src="([^"]+)"/.exec(h||'')||[])[1]||'';
   const look=(k,ent,face)=>{const R={};const chip=document.querySelector(`#stage .k3c[data-kc="${k}"] img.kpor, #stage .k3c[data-kc="${k}"] img`);if(chip)R.stageChip=chip.getAttribute('src');
    R.mdH=src(mdH(face,'xs'));R.pcPort=src(pcPort(face));R.kitPortrait=typeof kitPortrait==='function'?src(kitPortrait(ent)):'';R.stageFig=src(kitStageFig(face));R.kitFigOf=kitFigOf(ent);
    if(k==='th')R.figKind=kitFigOf({kind:'th'});const v=Object.entries(R).filter(([a,b])=>b).map(([a,b])=>[a,sil(b)]);return{v,R}};
   const q=queenP();const run=(tag)=>{const out={};out.emp=look('emp',S.emp,pEmp());if(!S.thDead)out.th=look('th',S.thO,pTH());if(q&&q!==S)out.hh=look('hh',q,pv(q));return out};
   const qMis=!!(q&&S.srv&&S.srv.mid===q.id);const before=run('before');if(q&&q!==S){S.met=S.met||{};S.met[q.id]=1;if(typeof k61Know==='function')k61Know(q,'',true,2)}render();await new Promise(r=>setTimeout(r,1200));const after=run('after');
   const mis=S.srv&&typeof RV==='function'&&RV(S.srv.mid);return{before,after,qMis,mis:mis?src(mdH(pv(mis),'xs')):null}},o);
  if(r.mis&&/unknown-/.test(r.mis))C('3 met',[`${o}: her own mistress is a silhouette`]);
  const L=[];for(const ph of ['before','after'])for(const k in r[ph]){const v=r[ph][k].v;const s=new Set(v.map(x=>x[1]));if(s.size>1)L.push(`${o} ${ph} ${k}: mixed ${JSON.stringify(v)}`);
   const want=k==='hh'&&ph==='before'&&!r.qMis?true:false;/* her own mistress (cung nữ road) is met from day one */if(s.size===1&&[...s][0]!==want)L.push(`${o} ${ph} ${k}: ${want?'face shown before meeting':'silhouette'} ${JSON.stringify(r[ph][k].R).slice(0,200)}`)}
  C('3 met',L);OUT.info['met '+o]=Object.fromEntries(['before','after'].map(ph=>[ph,Object.fromEntries(Object.entries(r[ph]).map(([k,x])=>[k,x.v.map(y=>y[0]+(y[1]?':sil':':face')).join(' ')]))]))}
 /* ---------- 4 SLOTS ---------- */
 for(const [where,n] of [["srv",0],["lc",1],["lc",2],["lc",3],["home",2],["vuon",2],["vuon",3]]){const r=await p.evaluate(async([where,n])=>{
   if(where==="srv")__sb2new("cnv");else __sb2new("thd",()=>{if(where==="lc"){const rv=liveRivals(true).filter(v=>!v.queen).slice(0,n);rv.forEach(v=>{v.out=1;S.met=S.met||{};S.met[v.id]=1});cold("thử");coldVisit()}});
   if(where!=="lc"&&where!=="srv"){const Wh=S.where=S.where||{};for(const v of rivals)if(Wh[v.id]===where)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};liveRivals(true).slice(0,n).forEach(v=>{Wh[v.id]=where;S.met=S.met||{};S.met[v.id]=1});
    S.place="home";used=0;tab="act";goTo(where)}
   render();await new Promise(r=>setTimeout(r,3500));const st=document.getElementById('stage');const Rs=st.getBoundingClientRect();
   const panels=[...st.querySelectorAll('#kshR, #kshL')].filter(e=>e.offsetParent&&!e.hidden&&e.offsetHeight>4).map(e=>({id:e.id,r:e.getBoundingClientRect()}));
   const bad=[];const ov=(a,c)=>Math.min(a.right,c.right)-Math.max(a.left,c.left)>2&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>2;
   const items=[];const me=document.getElementById('mefig');if(me&&me.offsetParent&&!me.classList.contains('j59off'))items.push(['her',me]);
   st.querySelectorAll('#tokens .tok').forEach(t=>{if(t.style.display==='none'||!t.offsetParent)return;const im=t.querySelector('img.figimg');items.push(['p'+t.dataset.p,im||t]);const g=t.querySelector('.tag');if(g)items.push(['p'+t.dataset.p+' name',g])});
   for(const [w,e] of items){let r=e.getBoundingClientRect();if(e.tagName==='IMG'&&typeof kitFigBody==='function'){const bb=kitFigBody(e.getAttribute('src'));if(bb){const l=bb.cl!=null?bb.cl:bb.l,rr=bb.cr!=null?bb.cr:bb.r;r={left:r.left+r.width*l,right:r.left+r.width*rr,top:r.top+r.height*(bb.ht!=null?bb.ht:bb.t),bottom:r.top+r.height*bb.b}}}
    for(const P of panels)if(ov(r,P.r))bad.push(`${w} under ${P.id}`)}
   return{bad,n:items.length,stage:[Rs.width|0,Rs.height|0]}},[where,n]);
  if(r.bad.length)C('4 slots',[`${where} +${n} (${r.stage}): ${r.bad.join(', ')}`]);await shot(`slots-${where}-${n}`)}
 /* ---------- 5 GAME ---------- */
 {const r=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const lab=()=>{const b=document.querySelector('[data-kg="round"]');return b?(b.previousElementSibling.textContent+' '+b.textContent):'none'};const O={};
   __sb2new("thd");
   kg82Open({art:"Khảo hạch",title:"Môn 1/3 · Cầm",how:"x",round:"Môn",roundV:"1/3"});O.examOpen=lab();kg82Set("round","Hồi 2/5");O.examEngine=lab();kg82Set("round","1/3");O.examDone=lab();kg82Close();
   kg82Open({art:"Cầm",title:"x",how:"x"});O.gameOpen=lab();kg82Set("round","Hồi 2/5");O.engineHoi=lab();kg82Set("round","Câu 1/5");O.engineCau=lab();kg82Set("round","Nhì");O.contest=lab();kg82Close();
   /* the real exam flow when it can start */
   try{if(typeof exStart==="function"){window.__exAuto=false;exStart();await W(300);O.realExam=lab();kg82Close()}}catch(e){O.realExam='err '+e.message}
   return O});
  const want={examOpen:/^Môn 1\/3$/,examEngine:/^Môn 1\/3$/,examDone:/^Môn 1\/3$/,gameOpen:/^Hồi /,engineHoi:/^Hồi 2\/5$/,engineCau:/^Câu 1\/5$/,contest:/^Hạng Nhì$/,realExam:/^(Môn |none|err)/};
  C('5 game',Object.keys(want).filter(k=>!want[k].test(String(r[k]))).map(k=>`${k}: ${r[k]}`));OUT.info.game=r}
 OUT.errs=errs;console.log(JSON.stringify(OUT,null,1));await b.close()})();
