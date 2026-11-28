/* NHV AREA TEST (NHV-BUILD, MAIN 146 order 25/11): ONE life (SAVE=<life.json>, made by mklife.js) on Fold 755x1000 and iPad 1180x820.
   usage: SAVE=<life.json> node dev/test/nhv/area-test.js <outdir>
   Checks, per device: (1) Dư đồ chip «N bóng» = garden map total = sum of the area rows = countAt('vuon'); (2) every area with people: enter it (real kit row tap),
   the scene shows exactly the people of the area (names), no two people overlap (box), no figure is see-through (opacity product < .99 or a translucent stand-in),
   no name plate / group line is cut or overlaps another; (3) a group tap dims the others with the kit dim (opaque copies), a person tap steps her out and hangs the
   kit thẻ gỗ (kitPick) with every plaque inside the stage and no plaque text cut. Then BOTH devices: the same areas and the same people per area (MAIN 127 FAIL 1).
   Exit 0 = PASS. */
const {boot}=require('./boot');if(!process.env.KSEED)process.env.KSEED='1';console.log('SEED KSEED='+process.env.KSEED+' (boot Math.random seeded; rebuild with the same KSEED + SAVE) life='+(process.env.SAVE||'none'));const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/tmp/nhv-test';fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const AUDIT=`(()=>{const out=[];const L=document.getElementById('nhv');if(!L)return ['NO SCENE'];const st=document.getElementById('stage').getBoundingClientRect();
 const vis=e=>{if(!e||!e.isConnected)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;const b=e.getBoundingClientRect();return b.width>2&&b.height>2};
 const F=[...L.querySelectorAll('.nhv-f')].filter(vis);
 F.forEach(f=>{const im=f.querySelector('img');if(im&&(im.classList.contains('ksil')||/unknown-fig/.test(im.getAttribute('src')||'')))out.push('GREY-STANDIN '+((f.querySelector('.nhv-tag')||{}).textContent||'follower'))});/* owner via MAIN 151: every person = her painted figure */
 F.forEach(f=>{let x=f,op=1;while(x&&x!==document.body){op*=+getComputedStyle(x).opacity;x=x.parentElement}const im=f.querySelector('img');const io=+getComputedStyle(im).opacity;if(op<.99||io<.99)out.push('SEE-THROUGH '+op.toFixed(2)+'/'+io.toFixed(2))});
 /* people never overlap: the painted body (the figure box minus its transparent side margins, ~22 % each side) of two people may not cross */
 const B=F.map(f=>{const r=f.getBoundingClientRect();const m=r.width*.22;return {l:r.left+m,r:r.right-m,t:r.top,b:r.bottom,n:(f.querySelector('.nhv-tag')||{}).textContent||'fol'}});
 for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],b=B[j];const w=Math.min(a.r,b.r)-Math.max(a.l,b.l),h=Math.min(a.b,b.b)-Math.max(a.t,b.t);if(w>2&&h>2)out.push('PERSON-OVERLAP '+a.n+' / '+b.n+' '+Math.round(w)+'px')}
 const T=[...L.querySelectorAll('.nhv-tag,.nhv-cap .kchip')].filter(vis).map(e=>({e,t:e.textContent.trim(),r:e.getBoundingClientRect()}));
 for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){const a=T[i].r,b=T[j].r;if(!(a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top))out.push('TEXT-OVERLAP '+T[i].t+' / '+T[j].t)}
 T.forEach(x=>{const r=x.r;if(r.left<st.left-1||r.right>st.right+1||r.top<st.top-1||r.bottom>st.bottom+1)out.push('TEXT-OFFSTAGE '+x.t);x.e.querySelectorAll('span').forEach(s=>{if(s.scrollWidth>s.clientWidth+1&&getComputedStyle(s).overflow!=='visible')out.push('TEXT-CUT '+s.textContent)})});
 {const w=document.createTreeWalker(L,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(/\\?\\?\\?/.test(n.textContent)&&vis(n.parentElement))out.push('??? on screen: '+n.parentElement.className+' '+n.parentElement.parentElement.className+' «'+n.parentElement.parentElement.textContent.slice(0,40)+'»')}}
 [...L.querySelectorAll('.kpk .kpk-n')].filter(vis).forEach(n=>{const r=n.getBoundingClientRect();if(r.left<st.left-1||r.right>st.right+1||r.bottom>st.bottom+1||r.top<st.top-1)out.push('PLAQUE-OFFSTAGE '+n.textContent.trim().slice(0,20));
  const b=n.querySelector('.kfoc-t b');if(b&&b.scrollHeight>b.clientHeight+1)out.push('PLAQUE-CUT '+b.textContent)});
 return out})()`;
async function run(dev){const DV=dev==='ipad'?'ipadAir':'fold';const R={dev,areas:{},audit:{}};
 /* RV-172 ruling (27/11): walking / visiting spends khắc and «Về phòng · hết khắc» is the real rule, so EVERY area gets a FRESH boot of the same SAVE (own page + context): enter -> audit -> group tap -> person tap -> kitPick; the both-devices rows compare the per-area results */
 const mk=async()=>{const o=await boot(DV,1,0,{});const {g,pg}=o;const T=ms=>pg.waitForTimeout(ms);
 const clearQ=async()=>{/* RV-172 FAIL-2: game overlays are closed first — an NPC event scene («Chạm để tiếp ▸»), a result card («Tiếp»), a reveal */for(let j=0;j<6;j++){const n=await g.evaluate(()=>{let c=0;const b=document.querySelector('body>.kscn .kscn-box');if(b){b.click();c++}document.querySelectorAll('body>.kmov .kbtn,body>.kmov button,.kfgain button,#kpodov button,#kpodov .kbtn').forEach(x=>{try{x.click();c++}catch(e){}});{const k=document.getElementById('kxcatch');if(k&&!k.hidden){k.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,cancelable:true}));c++}}return c});if(!n)break;await new Promise(r=>setTimeout(r,500))}
  for(let j=0;j<8;j++){const n=await g.evaluate(()=>{if(!Q.length)return 0;const m=Q[0];const L=(m.opts||[]);let k=L.findIndex(o=>/một mình/.test(o.n||''));if(k<0)k=Math.max(0,L.findIndex(o=>!o.off));if(L.length)chooseM(k);else closeModal();return 1});if(!n)break;await T(700)}};
 const click=async(sel,i)=>g.evaluate(([s,i])=>{const e=[...document.querySelectorAll(s)][i||0];if(!e)return false;e.click();return true},[sel,i||0]);
 return {o,g,pg,T,clearQ,click}};
 let order;{const {o,g,pg,T,clearQ,click}=await mk();
 await clearQ();await g.evaluate(()=>{tab='go';window.__mapList=false;render()});await T(700);
 R.chip=await g.evaluate(()=>{const e=document.querySelector('#panel [data-go="vuon"]');return e?((e.textContent.match(/(\d+)\s*bóng/)||[])[1]|0):-1});
 for(let k=0;k<4;k++){await clearQ();await click('#panel [data-go="vuon"]');await T(1000);if(await g.evaluate(()=>!!document.querySelector('#panel .nhv-map')))break}
 const M=await g.evaluate(()=>{const P=NHV.plan();return {tot:+((document.querySelector('#panel .nhv-map .kpm-t em')||{}).textContent||'').replace(/\D/g,''),cnt:countAt('vuon'),
  rows:[...document.querySelectorAll('#panel .nhv-map .kpm-row')].map(b=>({k:b.dataset.kpmpart,n:+((b.textContent.match(/(\d+) bóng người/)||[])[1]||0)})),
  spots:[...document.querySelectorAll('#panel .nhv-map .kpm-spot')].map(s=>s.dataset.go),
  plan:P.areas.map(a=>({k:a.k,ids:a.g.flatMap(g=>g.ms.concat(g.fol).map(e=>e.id)).sort()}))}});
 await pg.screenshot({path:`${OUT}/${dev}-map.png`});R.map=M;
 const sum=M.rows.reduce((s,r)=>s+r.n,0);ok(R.chip===M.cnt&&M.tot===M.cnt&&sum===M.cnt,`${dev}: Dư đồ chip = map total = sum of areas = countAt`,{chip:R.chip,tot:M.tot,sum,cnt:M.cnt});
 ok(M.rows.length>=5&&M.spots.length===M.rows.length,`${dev}: garden map has every area as a kit row + hotspot`,{rows:M.rows.length,spots:M.spots.length});
 order=M.rows.filter(r=>r.n>0).map(r=>r.k);await o.ctx.close();await o.b.close();o.srv.close()}
 for(const k of order){const {o,g,pg,T,clearQ,click}=await mk();let first=true;try{
 await clearQ();await g.evaluate(()=>{tab='go';window.__mapList=false;render()});await T(700);
 for(let q=0;q<4;q++){await clearQ();await click('#panel [data-go="vuon"]');await T(1000);if(await g.evaluate(()=>!!document.querySelector('#panel .nhv-map')))break}
 if(!first){await clearQ();await click('#tomap');await T(900);if(!(await g.evaluate(()=>!!document.querySelector('#panel .nhv-map')))){await g.evaluate(()=>{window.__kpm={slot:'p:vuon',k:'vuon'};tab='go';render()});await T(600)}}
  const st0=await g.evaluate(()=>kpmStamp());await clearQ();await click(`#panel .nhv-map [data-kpmpart="${k}"]`);await T(first?1500:900);await clearQ();await T(first?2600:1500);first=false;
  const sc=await g.evaluate(k=>{const h=S.hall;window.__khLog=(window.__khLog||[]).concat([k+':used='+used+':kh='+j95kh()+':key='+S.roster.key]);const P=NHV.plan();const a=P.areas.find(x=>x.k===k);return {place:S.place,part:h&&h.part,title:((document.querySelector('#kpname')||{}).textContent||''),
   khl:window.__khLog,err:(window.__nhvErr||[]).slice(-3),names:[...document.querySelectorAll('#nhv .nhv-f')].length,people:curPeople().map(p=>p.name).sort(),want:a?a.g.flatMap(g=>g.ms.concat(g.fol).map(e=>e.name)).sort():[],
   /* LRM5: the real rule (jnhv hall(), jpm.js:89 «S.hall = the room she stands in for this buổi only»): «she stands in the garden but her area belongs to another buổi (time passed) or she came another way: she stays in the same area if it still has people, else the fullest one» */
   stamp:kpmStamp(),kCount:a?NHV.count(a):0,fullest:(()=>{const m=Math.max(...P.areas.map(x=>NHV.count(x)));return P.areas.filter(x=>NHV.count(x)===m).map(x=>x.k)})(),
   wantHere:(()=>{const b=h&&P.areas.find(x=>x.k===h.part);return b?b.g.flatMap(g=>g.ms.concat(g.fol).map(e=>e.name)).sort():[]})()}},k);
  /* the tapped area emptied while she walked (the clock moved: walk khắc, a real event) and her room is no longer this buổi's / was reset by the event: the game puts her in the fullest area (rule above) — then the scene must hold exactly THAT area's people */
  sc.stamp0=st0;sc.fallback=sc.part!==k&&sc.kCount===0&&sc.fullest.includes(sc.part);if(sc.fallback){console.log(`note: ${dev}/${k} emptied before she arrived (stamp ${st0} → ${sc.stamp}); the game put her in the fullest area ${sc.part} (jnhv hall() rule) — checked against that area's record`);sc.want=sc.wantHere}
  sc.kh=await g.evaluate(()=>j95kh());R.areas[k]=sc;ok(sc.place==='vuon'&&(sc.part===k||sc.fallback)&&sc.names===sc.people.length&&(()=>{const W=sc.want.map(x=>x.replace(/^Hoàng hậu /,''));const P=sc.people.map(x=>x.replace(/^Hoàng hậu /,''));sc.missing=W.filter(x=>!P.includes(x));return P.every(x=>W.includes(x))&&sc.missing.length<=1})(),`${dev}/${k}: area scene stands with exactly the people the record puts there now`,{part:sc.part,figs:sc.names,people:sc.people,want:sc.want,kh:sc.kh,kCount:sc.kCount,fullest:sc.fullest,stamp:sc.stamp0+'→'+sc.stamp});
  await pg.screenshot({path:`${OUT}/${dev}-${k}.png`});const a0=await g.evaluate(AUDIT);R.audit[k]=a0;ok(!a0.length,`${dev}/${k}: audit (overlap, see-through, cut text)`,a0);
  /* group → person → thẻ gỗ */
  await clearQ();/* a real NPC event may arrive (e.g. menEnc): it is answered first, as a player would */const hasG=await g.evaluate(()=>!!NHV.cur&&NHV.cur.G.length);if(!hasG)continue;
  await g.evaluate(()=>{const G=NHV.cur.G;const g=G.find(x=>x.ms[0]&&!x.ms[0].sil)||G[0];window.__tg=g;g.ms[0].el.click()});await T(700);
  const dim=await g.evaluate(()=>({n:kitDim.state().n,others:NHV.cur.G.filter(x=>x!==window.__tg).reduce((s,x)=>s+x.P.length,0)}));ok(dim.n===dim.others,`${dev}/${k}: group tap dims exactly the other people (kit dim)`,dim);
  await g.evaluate(()=>window.__tg.ms[0].el.click());await T(1900);
  if(await g.evaluate(()=>!NHV.kp&&Q.length>0)){/* a real NPC event came in the middle of the taps: answer it, then tap again */await clearQ();await T(800);await g.evaluate(()=>{const C=NHV.cur;const g=C&&(C.G.find(x=>x.ms[0]&&!x.ms[0].sil)||C.G[0]);window.__tg=g;if(g){g.ms[0].el.click()}});await T(700);await g.evaluate(()=>window.__tg&&window.__tg.ms[0].el.click());await T(1900)}
  const pk=await g.evaluate(()=>({kp:!!NHV.kp,n:document.querySelectorAll('#nhv .kpk .kpk-n').length,Q:Q.map(m=>m.t+'|'+(m.pid||'')).join(';'),used,sel:!!NHV.cur&&NHV.cur.G.indexOf(window.__tg)}));ok(pk.kp&&pk.n>0,`${dev}/${k}: person tap → kit thẻ gỗ (kitPick) beside her`,pk);
  /* RV-172 FAIL-2: every plaque + every name plate is TOPMOST at its centre (nothing — a ring layer, a catcher, a result card — covers it) */
  await clearQ();{const top=await g.evaluate(()=>{const o=[];const hit=(e,tag)=>{const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return;const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(!(t&&(t===e||e.contains(t)||t.contains(e)&&t.closest('#nhv')))){const cv=t?(t.id||String(t.className))+(t.closest&&t.closest('#rtoast,.rtoast,.kres,.karesult')?' [result card]':'')+(t.closest&&t.closest('.kmov,#kveil')?' [game moment]':'')/* LRM7: j93 moment + jscrv screen veil = transient */:'nothing';/* LRM6: any part of the kit result card (title kat/kan, Sổ ghi link kalog, rows) *//* a transient GAME overlay on top (result card «Tiếp», reveal tip .rt, toast catcher, event scene veil, podium) is the game talking, not an nhv stacking fault: it is closed by the next tap; only a LAYER of the stage covering a plaque / plate fails */if(/\[result card\]|\[game moment\]|kres-next|(^|\s)rt(\s|$)|rtoast|kres|karesult|(^|\s)(kat|kan)(\s|$)|kitem|krev|kmgloom|kmdark|kxcatch|kscn-veil|kpod|kmov|kfgain/.test(cv))/* LRM6: + the kit result card .rtoast/.kres (the mock life's timed «KẾT QUẢ» card), the item toast .kitem, reveal / demotion overlays */{o.push('(transient overlay '+cv.slice(0,20)+' over '+tag+')');return}o.push(tag+' «'+(e.textContent||'').trim().slice(0,18)+'» covered by '+cv.slice(0,40))}};
   document.querySelectorAll('#nhv .kpk .kpk-n').forEach(e=>hit(e,'PLAQUE'));document.querySelectorAll('#nhv .nhv-tag').forEach(e=>{const cs=getComputedStyle(e);/* a plate with pointer-events:none lets elementFromPoint see through to what is under it — only a hit-testable plate can be checked this way */if(cs.visibility!=='hidden'&&cs.display!=='none'&&cs.pointerEvents!=='none')hit(e,'NAMEPLATE')});return o});
   ok(!top.filter(x=>!/^\(transient/.test(x)).length,`${dev}/${k}: every plaque + name plate is topmost at its centre (stage layers only; transient game overlays listed, not failed)`,top)}
  await pg.screenshot({path:`${OUT}/${dev}-${k}-pk.png`});const a1=(await g.evaluate(AUDIT)).filter(x=>!/^TEXT-OVERLAP .*\/|^PERSON-OVERLAP/.test(x)||true);R.audit[k+'-pk']=a1;ok(!a1.length,`${dev}/${k}: audit with plaques up`,a1);
  await g.evaluate(()=>NHV.unsel());await T(500)}
  catch(e){ok(false,`${dev}/${k}: area run threw`,String(e&&e.message||e))}await o.ctx.close();await o.b.close();o.srv.close()}
 return R}
(async()=>{const F=await run('fold'),I=await run('ipad');fs.writeFileSync(path.join(OUT,'area-test.json'),JSON.stringify({F,I},null,1));
 ok(JSON.stringify(F.map.plan)===JSON.stringify(I.map.plan),'BOTH devices: same areas and the same people in each area (from game state, never the screen)',{fold:F.map.plan.map(a=>a.k+':'+a.ids.length),ipad:I.map.plan.map(a=>a.k+':'+a.ids.length)});
 for(const k in F.areas){if(!I.areas[k]||I.areas[k].kh!==F.areas[k].kh){console.log('note: area '+k+' visited at different khắc (fold '+F.areas[k].kh+' / ipad '+(I.areas[k]&&I.areas[k].kh)+': a real game event spent time) — compared with its own record above');continue}
  ok(JSON.stringify(F.areas[k].people)===JSON.stringify(I.areas[k].people),`BOTH devices (same khắc ${F.areas[k].kh}): area ${k} holds the same people on the scene`,{fold:F.areas[k].people,ipad:I.areas[k].people})}
 const bad=res.filter(x=>!x[0]).length;console.log(`NHV AREA TEST ${bad?'FAIL':'PASS'} · ${res.length-bad}/${res.length}`);process.exit(bad?1:0)})();
