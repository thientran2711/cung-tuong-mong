/* E92 (MAIN 117 05:47Z, KIT §94b DAY TITLE CARD; OD 24/11 ~07:45Z): window.kitChapterTitle() → {n,name} of HER current chapter, whole game.
   E92f (REVIEW r1 fix 4): every check compares the hook with the GOAL PANEL kitGoalNow() (jgoal, independent of chapterTitle = the hook's twin):
   GP = hook null ⇔ kitGoalNow null; «Chương n» = G.kicker; name = G.title (tags stripped) when it has no {token}, else non-empty without {…}/tags.
   usage: node dev/test/chapter-title-hook.js <page URL>
   H1 the hook is the real one (not the j79 null stub), whatever the load order (jdh3 sets it over the stub; j79 keeps an existing hook)
   H2 every origin (ORIGINS incl. jorigins branches): a NEW life in the palace → card = goal panel, = chapterTitle(S); read-only (S.st JSON unchanged)
   H3 every ARC67 chapter (every road .4–.11 from rdDef, side arcs) as the open chapter → GP + n = M.chap; every MS67 milestone chapter → GP + n = ch.n
   H4 the edge states (unknown arc / milestone, no open chapter, v2 without ch, old v1 story, no S.st, dead) → GP; not her S → null; never throws; read-only
   H5 rebirth / new life: the hook follows the NEW S; H6 co-op seat (COOPW on, seat b): her own seat still = goal panel
   H7 with the kit (kitDayTitle present): line 2 .kdt2 = hook text (palace + home life); hidden when the goal panel has no chapter
   H8 every home road before the tuyển tú (kcPick «nha» → kcInit, KC.ok + KC2K = Khuê các / Cố quốc / Thôn quê, kc2 + kc3) → GP, never «Sơ nhập cung môn»
   H9 old save: ARC67 chapter without M.chap, S.st.ch.n=3 → «Chương 3» = pos67 = lab67 = goal panel
   H10 story complete (ch.all) → «Chương N — Mệnh truyện trọn vẹn» = goal panel (one rule: line 2 follows the goal panel). Exit 1 on any failure. */
const {chromium}=require('playwright');const [,,URL]=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
/* E-T2FLAKE: no fixed sleeps — every wait is on the real condition, bounded, with a clear TIMEOUT message. stable(p) = the #modal (hidden flag + text) and the day-title card stay unchanged for 3 polls (150 ms): the panel finished opening/closing/re-rendering. */
const until=(p,fn,what,ms=20000)=>p.waitForFunction(fn,null,{timeout:ms,polling:50}).catch(e=>{throw new Error('TIMEOUT waiting for '+what+' ('+ms+' ms): '+String(e.message).split('\n')[0])});
const settle=p=>p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
const SIG=()=>{const m=document.getElementById('modal');return (m?(m.hidden?'H':'V')+m.innerText:'')+'|'+!!document.getElementById('kdaytc')};
const sigOf=p=>p.evaluate(SIG);
/* stable(p,prev): with prev (the sigOf() taken BEFORE the action) first wait until the modal really CHANGED from it (a click handler may act a tick later), then until it stays unchanged for 3 polls */
const stable=(p,prev,ms=8000)=>p.evaluate(([prev,ms,src])=>new Promise((res,rej)=>{const sig=eval('('+src+')');const t0=Date.now();let last=null,n=0,moved=prev==null;const tick=()=>{const s=sig();if(!moved&&s!==prev)moved=true;if(moved){if(s===last)n++;else{n=0;last=s}if(n>=3)return res(1)}if(Date.now()-t0>ms)return rej(new Error('TIMEOUT waiting for the modal to '+(moved?'settle':'change after the action')+' ('+ms+' ms)'));setTimeout(tick,50)};requestAnimationFrame(tick)}),[prev==null?null:prev,ms,SIG.toString()]);
(async()=>{const b=await chromium.launch();const R={errs:[],fail:[],ok:[]};
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.__gp=function(){let c;try{c=window.kitChapterTitle()}catch(e){return{ok:false,why:'hook threw'}}let G=null;try{G=window.kitGoalNow()}catch(e){G='throw'}
  const strip=x=>String(x==null?'':x).replace(/<[^>]+>/g,'').trim();const ct=c?`Chương ${c.n} — ${c.name}`:null;
  if(G==='throw')return{ok:false,why:'kitGoalNow threw',c:ct};if(!G||!G.C)return{ok:c===null,c:ct,g:null};
  const g=`${G.kicker} — ${strip(G.title)}`;const ok=!!c&&`Chương ${c.n}`===G.kicker&&!!c.name&&!/[{}<>]/.test(c.name)&&(/[{]/.test(G.title)||c.name===strip(G.title));
  return{ok,c:ct,g,home:!!G.C.home,kind:G.C.kind,n:G.C.n}}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&document.readyState==='complete');await settle(p);
 const fresh=(o,home)=>p.evaluate(([o,home])=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;
  let kc=false;if(home){S.kcPick='nha';try{if(!S.kc)kcInit()}catch(e){}kc=typeof isKc==='function'&&isKc()}Q.length=0;
  try{const c=document.getElementById('kdaytc');if(c)c.remove()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;return {k:(S.origin&&S.origin.k)||S.origin,kc}},[o,!!home])
  /* card-aware (kit-daytitle): the start card #kdaytc comes at +600 ms; wait it out and close it so nothing is held */
  .then(r=>p.evaluate(()=>typeof kitDayTitleShow==='function').then(k=>k?p.waitForFunction(()=>document.getElementById('kdaytc'),null,{timeout:3000,polling:25}).catch(()=>null).then(()=>p.evaluate(()=>{const c=document.getElementById('kdaytc');if(c)c.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true})).then(()=>r):r));
 const ck=(c,m)=>{(c?R.ok:R.fail).push(m)};
 /* H1 */
 const h1=await p.evaluate(()=>({f:typeof window.kitChapterTitle,e:window.kitChapterTitle&&window.kitChapterTitle.e92===1,ci:typeof window.chapterInfo,gc:typeof window.kitGoalChapter}));
 ck(h1.f==='function'&&h1.e&&h1.ci==='function'&&h1.gc==='function','H1 kitChapterTitle = the E92 hook (not the null stub), kitGoalChapter shared '+JSON.stringify(h1));
 /* H2 every origin in the palace, H5 rebirth */
 const origins=await p.evaluate(()=>ORIGINS.map(o=>o.k).concat(typeof ORIGIN_BR==='object'?Object.keys(ORIGIN_BR):[]).filter((k,i,a)=>a.indexOf(k)===i));
 const rows=[];
 for(const o of origins){try{await fresh(o)}catch(e){R.fail.push('H2 start '+o+' threw '+String(e).slice(0,120));continue}await settle(p);
  const r=await p.evaluate(()=>{const before=JSON.stringify(S.st);const g=__gp();const t=chapterTitle(S);return {g,t,same:JSON.stringify(S.st)===before}});
  rows.push(`palace ${o}: card ${r.g.c} | goal ${r.g.g}`);
  ck(r.g.ok&&r.g.c&&r.t===r.g.c&&r.same,`H2 new life ${o}: card «${r.g.c}» = goal «${r.g.g}»`)}
 if(origins.length>1){const oa=origins.includes('cnv')?'cnv':origins[1],ob=origins[0];await fresh(oa);const a=await p.evaluate(()=>__gp());await fresh(ob);const b2=await p.evaluate(()=>__gp());
  ck(a.ok&&b2.ok&&(oa!=='cnv'||a.c!==b2.c),`H5 rebirth ${oa}→${ob} follows the new S (${a.c} → ${b2.c})`)}
 /* H8 every home road before the tuyển tú */
 const homes=await p.evaluate(()=>(typeof KC==='object'?KC.ok:[]).concat(typeof KC2K==='object'?Object.keys(KC2K):[]).filter((k,i,a)=>a.indexOf(k)===i));
 let nh=0;for(const o of homes){let f;try{f=await fresh(o,1)}catch(e){R.fail.push('H8 start '+o+' threw '+String(e).slice(0,120));continue}await settle(p);
  if(!f.kc){R.fail.push(`H8 ${o}: kcInit did not open the home road`);continue}nh++;
  const r=await p.evaluate(()=>{const before=JSON.stringify(S.kc)+JSON.stringify(S.st);const g=__gp();let l2=null;
   if(typeof kitDayTitle==='function'){const d=document.createElement('div');d.innerHTML=kitDayTitle({n:3});const e=d.querySelector('.kdt2');l2=e?e.textContent:''}
   return {g,l2,kc3:typeof kc3On==='function'&&kc3On(),kd:S.kc&&S.kc.kd,same:JSON.stringify(S.kc)+JSON.stringify(S.st)===before}});
  rows.push(`home ${o}${r.kd?' kc2:'+r.kd:''}${r.kc3?' kc3':''}: card ${r.g.c} | goal ${r.g.g}${r.l2!=null?` | kit line 2 «${r.l2}»`:''}`);
  ck(r.g.ok&&r.g.home&&r.g.c&&!/Sơ nhập cung môn|Phận tỳ nữ buổi đầu/.test(r.g.c)&&r.same&&(r.l2==null||r.l2===r.g.c),`H8 home road ${o}${r.kd?' (kc2 '+r.kd+')':''}${r.kc3?' (kc3)':''}: card «${r.g.c}» = goal «${r.g.g}»`)}
 ck(nh>=8,`H8 home roads opened: ${nh}/${homes.length}`);
 /* H3 / H4 / H6 / H7 / H9 / H10 on a palace life */
 await fresh(origins[0]||'tt');
 const out=await p.evaluate(()=>{const F=[],OK=[],ck=(c,m)=>{if(c)OK.push(m);else F.push(m)};const st=S.st,k0=JSON.stringify(st);const keep={ms:st.ms,M:st.M,ch:st.ch};
  let nA=0,bad=[];for(const a in ARC67){if(!ARC67[a]||!ARC67[a].t)continue;const ch=1+(nA%9);st.ms=null;st.M={a,chap:ch,act:{},seq:[],i:0};st.ch={n:1};nA++;const g=__gp();
   if(!(g.ok&&g.n===ch&&g.kind==='arc'&&chapterTitle(S)===g.c))bad.push(a+':'+g.c+'/'+g.g)}
  ck(nA>100&&!bad.length,`H3 every ARC67 chapter (${nA}) → card = goal panel, n = M.chap; bad: ${bad.slice(0,6).join(',')}`);
  const roads=Object.keys(ARC67).filter(a=>/_(4|5|6|7|8|9|10|11)$/.test(a));ck(roads.length>=50,`H3 road chapters counted ${roads.length}`);
  let nM=0,badM=[];if(typeof MS67==='object')for(const id in MS67){st.M=null;st.ms={id};st.ch={n:2};nM++;const g=__gp();if(!(g.ok&&g.n===2&&g.kind==='ms'))badM.push(id+':'+g.c+'/'+g.g)}
  ck(nM>0&&!badM.length,`H3 every MS67 milestone (${nM}) → card = goal panel; bad: ${badM.slice(0,6).join(',')}`);
  /* H9 old save: no M.chap, ch.n=3 */
  const a9=Object.keys(ARC67).find(a=>ARC67[a]&&typeof ARC67[a].t==='string'&&!/[{<]/.test(ARC67[a].t));st.ms=null;st.M={a:a9,act:{},seq:[1,2,3],i:0};st.ch={n:3};
  {const g=__gp();const P=pos67(st.M);ck(g.ok&&g.n===3&&P&&P.c===3&&/^Chương 3/.test(lab67(st.M))&&g.c===`Chương 3 — ${ARC67[a9].t.trim()}`,`H9 old save (no M.chap, ch.n 3): card «${g.c}» = goal «${g.g}» = lab67 «${lab67(st.M)}»`)}
  /* H10 story complete */
  st.ms=null;st.M=null;st.ch={n:12,max:12,all:1};{const g=__gp();ck(g.ok&&g.c==='Chương 12 — Mệnh truyện trọn vẹn',`H10 ch.all: card «${g.c}» = goal «${g.g}»`)}
  /* H4 edge states: card always = goal panel */
  const T=(f,m)=>{let g;try{f();g=__gp()}catch(e){g={ok:false,c:'throw'}}(g.ok?OK:F).push(`H4 ${m}: card ${g.c} = goal ${g.g}`)};
  T(()=>{st.ch={n:2};st.ms=null;st.M={a:'__none__',chap:2}},'unknown arc');T(()=>{st.M=null;st.ms={id:'__none__'}},'unknown milestone');T(()=>{st.ms=null;st.M=null},'no open chapter');
  T(()=>{st.ch=null},'v2 no ch');const v2=st.v2;T(()=>{st.v2=0;st.ch={n:1};st.M=keep.M},'old v1 story');st.v2=v2;
  const sst=S.st;T(()=>{S.st=undefined},'no S.st');S.st=sst;
  {const d=S.dead;S.dead=1;let c;try{c=window.kitChapterTitle()}catch(e){c='throw'}S.dead=d;ck(c===null,'H4 dead → null (goal panel none)')}
  ck(chapterInfo({})===null&&chapterTitle({})==='','H4 an object that is not her S → null / ""');
  Object.assign(st,keep);ck(JSON.stringify(S.st)===k0,'H4 read-only: S.st unchanged after the sweep restore');
  /* H6 co-op seat */
  const cw=window.COOPW;window.COOPW={on:true,seat:'b'};const g6=__gp();window.COOPW=cw;ck(g6.ok&&g6.c,'H6 co-op seat b: card = goal panel: '+g6.c);
  /* H7 kit line 2 */
  if(typeof kitDayTitle==='function'){const h=kitDayTitle({n:5});const d=document.createElement('div');d.innerHTML=h;const l2=d.querySelector('.kdt2');ck(l2&&l2.textContent===__gp().c,'H7 kit day card line 2 = hook = goal panel: «'+(l2&&l2.textContent)+'»');
   const s0=S.st;S.st=undefined;const g0=__gp();const h0=kitDayTitle({n:5});S.st=s0;ck(g0.ok&&g0.c===null&&!/kdt2/.test(h0),'H7 goal panel has no chapter → line 2 hidden')}else OK.push('H7 skipped (kit-daytitle not on this build)');
  return {F,OK}});
 R.fail.push(...out.F);R.ok.push(...out.OK);
 if(R.errs.length)R.fail.push('page errors: '+R.errs.slice(0,3).join(' | '));
 console.log(rows.join('\n'));for(const x of R.ok.filter(Boolean))console.log('  ok  '+x);for(const x of R.fail)console.log('  FAIL '+x);
 console.log(`chapter-title-hook: ${R.fail.length?'FAIL':'PASS'} (${R.ok.filter(Boolean).length} ok, ${R.fail.length} fail)`);
 await b.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
