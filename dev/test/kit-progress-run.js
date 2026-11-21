/* kit-progress-run (review/kit-progress-run; owner 21/11 «cái khung này nó cứ đứng ở một chỗ, một cam nhỏ nhỏ đầu rồi nó chớp tại chỗ, mà nó không phải là chạy tới») — node dev/test/kit-progress-run.js [dev/index.html]
   kitProgress (KIT §35), ALL THREE callers: the life cover (lPaint, 120 ms loop), the first-load cover (paint) and the sổ panel (dlPanel). Checks: the fill element is BUILT ONCE and updated in place (same node across ticks),
   the shown value only moves forward even when the total grows, the words follow the shown value (dlPart, never %), the sheen runs while waiting, the HTML form animates from the previous value (--v0), no page errors.
   Fold 755x1000 + iPad 1180x820, motion on and reduced. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag,rm] of [[755,1000,'fold',false],[1180,820,'ipad',false],[755,1000,'fold-reduced',true]]){
  const ctx=await b.newContext({viewport:{width:W,height:H},reducedMotion:rm?'reduce':'no-preference'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.KLIFE&&KLIFE.paint&&window.KLOAD&&KLOAD.paintHook&&typeof kitProgress==='function',null,{timeout:60000});await p.waitForTimeout(1500);
  await p.addStyleTag({content:'#kroul,.kmov{display:none!important}'});
  const R=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};const U=root=>root.querySelector('.kprog-t>u'),V=u=>parseFloat(u.style.getPropertyValue('--v'));
   /* 1. life cover — the 120 ms caller */
   const lel=KLIFE.cover();const lb=lel.querySelector('.klb');KLIFE.paint(1,10,false);const u0=U(lb);o.life={u0:!!u0,v:[V(u0)]};
   const seq=[[2,10],[2,25],[3,25],[5,25],[5,40],[30,40]];/* the total GROWS (10 → 25 → 40): have / total falls at step 2 and 5 */
   for(const [h,t] of seq){KLIFE.paint(h,t,false);await sleep(60);o.life.v.push(V(U(lb)))}
   o.life.same=U(lb)===u0;o.life.mono=o.life.v.every((x,i,a)=>i===0||x>=a[i-1]);o.life.words=lb.querySelector('.kprog-n').textContent;o.life.pct=/%/.test(lb.textContent);o.life.noteOnce=lb.querySelectorAll('.kpnote').length;
   o.life.after=getComputedStyle(U(lb),'::after').animationName;o.life.tr=getComputedStyle(U(lb)).transitionProperty;
   /* 2. first-load cover */
   KLOAD.core.have=1;KLOAD.core.total=10;KLOAD.phase="download";KLOAD.paintHook();const cb=document.querySelector('#kload .klb');const c0=U(cb);o.core={built:!!c0,v:[V(c0)]};
   for(const [h,t] of [[3,10],[3,20],[8,20],[20,20]]){KLOAD.core.have=h;KLOAD.core.total=t;KLOAD.paintHook();await sleep(40);o.core.v.push(V(U(cb)))}
   o.core.same=U(cb)===c0;o.core.mono=o.core.v.every((x,i,a)=>i===0||x>=a[i-1]);o.core.words=cb.querySelector('.kprog-n').textContent;o.core.notes=cb.querySelectorAll('.kpnote').length;
   /* a NEW load on the first-load cover (the bar is rebuilt) starts again from its own value, not the old max */
   cb.querySelectorAll('.kprog').forEach(e=>e.remove());KLOAD.core.have=0;KLOAD.core.total=20;KLOAD.paintHook();await sleep(40);o.core.again=V(U(cb));
   /* 3. HTML form (sổ panel): animates from the previous value, never backwards */
   const h1=kitProgress({key:"figT",have:6,total:10,sub:"x"}),h2=kitProgress({key:"figT",have:1,total:10,sub:"x"});const v=h=>[+/--v:([\d.]+)%/.exec(h)[1],+/--v0:([\d.]+)%/.exec(h)[1]];o.html={first:v(h1),second:v(h2)};
   /* rv FAIL fix: forward-only is per RUN — a snapshot (fresh) never inherits an old max: 10/10 then 0/20 on the SAME key reads 0 %, 5/20 reads 25 %; the running cover (no fresh) still keeps its max */
   const w=h=>/class="kprog-n">([^<]+)</.exec(h)[1];const s1=kitProgress({key:"figS",fresh:true,have:10,total:10}),s2=kitProgress({key:"figS",fresh:true,have:0,total:20}),s3=kitProgress({key:"figS",fresh:true,have:5,total:20});
   o.snap={a:v(s1),b:v(s2),c:v(s3),wa:w(s1),wb:w(s2),wc:w(s3)};const r1=kitProgress({key:"runK",have:10,total:10}),r2=kitProgress({key:"runK",have:0,total:20});o.run={b:v(r2),wb:w(r2)};
   /* the real sổ panel caller passes fresh: dlPanel's source line */
   o.kf=!!([...document.styleSheets].some(s=>{try{return [...s.cssRules].some(r=>r.name==='kprogGrow'||r.name==='kprogSheen')}catch(e){return false}}));return o});
  ok(R.life.u0&&R.life.same,`${tag} life cover: the fill element is built once and kept (same node across ticks)`,R.life.same);
  ok(R.life.mono&&R.life.v[R.life.v.length-1]>R.life.v[0],`${tag} life cover: the shown value only moves forward although the total grows`,R.life.v);
  ok(!R.life.pct&&R.life.noteOnce===1&&/[a-zà-ỹ]/i.test(R.life.words),`${tag} life cover: words (no %), the note is not duplicated`,[R.life.words,R.life.noteOnce]);
  ok(R.core.built&&R.core.same&&R.core.mono&&R.core.v[R.core.v.length-1]>R.core.v[0],`${tag} first-load cover: built once, in place, forward only`,[R.core.same,R.core.v]);
  ok(R.core.again===0,`${tag} first-load cover: a new load (bar rebuilt) starts again from its own value, not the old max`,R.core.again);
  ok(R.core.notes>=1&&R.core.notes<=3&&/đủ|gần|quá|phần|chút/.test(R.core.words),`${tag} first-load cover: notes not duplicated, words follow the value`,[R.core.notes,R.core.words]);
  ok(R.html.second[0]>=R.html.first[0]&&R.html.second[1]===R.html.first[0],`${tag} sổ panel (HTML form): never backwards (6/10 → 1/10 still ${R.html.first[0]}), animates from the previous value`,R.html);
  ok(R.snap.a[0]===100&&R.snap.b[0]===0&&R.snap.c[0]===25&&R.snap.wa==='đủ cả'&&R.snap.wb==='mới chút ít',`${tag} snapshot (fresh): 10/10 then 0/20 on the same key reads 0 %-wide «mới chút ít», 5/20 reads a quarter — never the old max`,R.snap);
  ok(R.run.b[0]===100&&R.run.wb==='đủ cả',`${tag} a running bar (no fresh) still never goes backwards`,R.run);
  ok(R.kf,`${tag} CSS: grow + sheen keyframes present`);
  if(!rm)ok(/kprogSheen/.test(R.life.after)&&/width/.test(R.life.tr),`${tag} sheen runs over the fill and width transitions`,[R.life.after,R.life.tr]);else ok(R.life.after==='none','reduced motion: no sheen',R.life.after);
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2));await ctx.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
