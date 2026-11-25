/* E92 (MAIN 117 05:47Z, KIT §94b DAY TITLE CARD; OD 24/11 ~07:45Z): window.kitChapterTitle() → {n,name} of HER current main-road chapter, whole game.
   usage: node dev/test/chapter-title-hook.js <page URL>
   H1 the hook is the real one (not the j79 null stub), whatever the load order (jdh3 sets it over the stub; j79 keeps an existing hook)
   H2 every origin (ORIGINS incl. jorigins branches): a NEW life opens with «Chương N — name» (non-empty, no {…}/tags) = chapterTitle(S) = the goal-line chapter
   H3 every ARC67 chapter (every road .4–.11 from rdDef, side arcs) as the open chapter → {n,name} non-empty, n = M.chap; every MS67 milestone chapter too
   H4 null where no road: no S.st, old v1 story, v2 with no chapter, unknown arc / milestone; never throws; read-only (S.st JSON unchanged)
   H5 rebirth / new life: the hook follows the NEW S (second origin after the first); H6 co-op seat (COOPW on, seat b): her own seat still reads her chapter
   H7 with the kit (kitDayTitle present): line 2 .kdt2 = «Chương N — name» from the hook; hidden when the hook gives null. Exit 1 on any failure. */
const {chromium}=require('playwright');const [,,URL]=process.argv;
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={errs:[],fail:[],ok:[]};
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>R.errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(1500);
 const fresh=o=>p.evaluate(o=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  try{const c=document.getElementById('kdaytc');if(c)c.remove()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;return S.origin},o);
 const ck=(c,m)=>{(c?R.ok:R.fail).push(m)};
 /* H1 */
 const h1=await p.evaluate(()=>({f:typeof window.kitChapterTitle,e:window.kitChapterTitle&&window.kitChapterTitle.e92===1,ci:typeof window.chapterInfo}));
 ck(h1.f==='function'&&h1.e&&h1.ci==='function','H1 kitChapterTitle = the E92 hook (not the null stub) '+JSON.stringify(h1));
 /* H2 every origin, H5 rebirth */
 const origins=await p.evaluate(()=>ORIGINS.map(o=>o.k).concat(typeof ORIGIN_BR==='object'?Object.keys(ORIGIN_BR):[]).filter((k,i,a)=>a.indexOf(k)===i));
 const rows=[];
 for(const o of origins){let got;try{got=await fresh(o)}catch(e){R.fail.push('H2 start '+o+' threw '+String(e).slice(0,120));continue}await sleep(150);
  const r=await p.evaluate(()=>{const before=JSON.stringify(S.st);const c=window.kitChapterTitle();const t=chapterTitle(S);return {c,t,same:JSON.stringify(S.st)===before,org:(S.origin&&S.origin.k)||S.origin}});
  rows.push(`${o}→${r.org}: ${r.c?`Chương ${r.c.n} — ${r.c.name}`:'null'}`);
  ck(r.c&&r.c.n>=1&&r.c.name&&!/[{}<>]/.test(r.c.name)&&r.t===`Chương ${r.c.n} — ${r.c.name}`&&r.same,`H2 new life ${o}: ${r.t||'(none)'}`);}
 /* H5: after the last life, a rebirth with the first origin gives the first origin's line again */
 if(origins.length>1){const oa=origins.includes('cnv')?'cnv':origins[1],ob=origins[0];await fresh(oa);const a=await p.evaluate(()=>window.kitChapterTitle());await fresh(ob);const b2=await p.evaluate(()=>window.kitChapterTitle());
  const b2t=await p.evaluate(()=>chapterTitle(S));ck(a&&b2&&`Chương ${b2.n} — ${b2.name}`===b2t&&(oa!=='cnv'||a.name!==b2.name),`H5 rebirth ${oa}→${ob} follows the new S (${a&&a.name} → ${b2t})`)}
 /* H3 every ARC67 chapter + every milestone; H4 null cases; H6 co-op seat */
 await fresh(origins[0]||'tt');
 const out=await p.evaluate(()=>{const F=[],OK=[],ck=(c,m)=>{if(c)OK.push(m);else F.push(m)};const st=S.st,k0=JSON.stringify(st);const keep={ms:st.ms,M:st.M,ch:st.ch};
  let nA=0,bad=[];for(const a in ARC67){if(!ARC67[a]||!ARC67[a].t)continue;const ch=1+(nA%9);st.ms=null;st.M={a,chap:ch,act:{}};st.ch=st.ch||{n:1};const c=window.kitChapterTitle();nA++;
   if(!(c&&c.n===ch&&c.name&&!/[{}<>]/.test(c.name)&&chapterTitle(S)===`Chương ${ch} — ${c.name}`))bad.push(a)}
  ck(nA>100&&!bad.length,`H3 every ARC67 chapter (${nA}) → {n,name}; bad: ${bad.slice(0,8).join(',')}`);
  const roads=Object.keys(ARC67).filter(a=>/_(4|5|6|7|8|9|10|11)$/.test(a));ck(roads.length>=50,`H3 road chapters counted ${roads.length}`);
  let nM=0,badM=[];if(typeof MS67==='object')for(const id in MS67){st.M=null;st.ms={id};st.ch={n:2};let c;try{c=window.kitChapterTitle()}catch(e){c='throw'}nM++;if(!(c&&c.n===2&&c.name&&!/[{}<>]/.test(c.name)))badM.push(id)}
  ck(!badM.length,`H3 every MS67 milestone (${nM}) → {n,name}; bad: ${badM.slice(0,8).join(',')}`);
  /* H4 */
  const nul=[];const T=(f,m)=>{let r;try{f();r=window.kitChapterTitle()}catch(e){r='throw'}if(r!==null)nul.push(m+':'+JSON.stringify(r))};
  T(()=>{st.ms=null;st.M={a:'__none__',chap:2}},'unknown arc');T(()=>{st.M=null;st.ms={id:'__none__'}},'unknown milestone');T(()=>{st.ms=null;st.M=null},'no open chapter');
  T(()=>{st.ch=null},'v2 no ch');const v2=st.v2;T(()=>{st.v2=0;st.ch={n:1};st.M=keep.M},'old v1 story');st.v2=v2;
  const sst=S.st;T(()=>{S.st=undefined},'no S.st');S.st=sst;
  ck(!nul.length,'H4 null where no road: '+(nul.join(' | ')||'all null'));
  ck(chapterInfo({})===null&&chapterTitle({})==='','H4 an object that is not her S → null / ""');
  Object.assign(st,keep);ck(JSON.stringify(S.st)===k0,'H4 read-only: S.st unchanged after the sweep restore');
  /* H6 co-op seat */
  const cw=window.COOPW;window.COOPW={on:true,seat:'b'};const c6=window.kitChapterTitle();window.COOPW=cw;ck(c6&&c6.name&&chapterTitle(S)===`Chương ${c6.n} — ${c6.name}`,'H6 co-op seat b reads her own chapter: '+chapterTitle(S));
  /* H7 kit line 2 */
  if(typeof kitDayTitle==='function'){const h=kitDayTitle({n:5});const d=document.createElement('div');d.innerHTML=h;const l2=d.querySelector('.kdt2');ck(l2&&l2.textContent===chapterTitle(S),'H7 kit day card line 2 = hook: «'+(l2&&l2.textContent)+'»');
   const M=st.M,ms=st.ms;st.M=null;st.ms=null;const h0=kitDayTitle({n:5});st.M=M;st.ms=ms;ck(!/kdt2/.test(h0),'H7 no chapter → line 2 hidden')}else OK.push('H7 skipped (kit-daytitle not on this build)');
  return {F,OK}});
 R.fail.push(...out.F);R.ok.push(...out.OK);
 if(R.errs.length)R.fail.push('page errors: '+R.errs.slice(0,3).join(' | '));
 console.log(rows.join('\n'));for(const x of R.ok.filter(Boolean))console.log('  ok  '+x);for(const x of R.fail)console.log('  FAIL '+x);
 console.log(`chapter-title-hook: ${R.fail.length?'FAIL':'PASS'} (${R.ok.filter(Boolean).length} ok, ${R.fail.length} fail)`);
 await b.close();process.exit(R.fail.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
