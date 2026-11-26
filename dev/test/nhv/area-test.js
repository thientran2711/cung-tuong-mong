/* NHV AREA TEST (NHV-BUILD, MAIN 146 order 25/11): ONE life (SAVE=<life.json>, made by mklife.js) on Fold 755x1000 and iPad 1180x820.
   usage: SAVE=<life.json> node dev/test/nhv/area-test.js <outdir>
   Checks, per device: (1) Dư đồ chip «N bóng» = garden map total = sum of the area rows = countAt('vuon'); (2) every area with people: enter it (real kit row tap),
   the scene shows exactly the people of the area (names), no two people overlap (box), no figure is see-through (opacity product < .99 or a translucent stand-in),
   no name plate / group line is cut or overlaps another; (3) a group tap dims the others with the kit dim (opaque copies), a person tap steps her out and hangs the
   kit thẻ gỗ (kitPick) with every plaque inside the stage and no plaque text cut. Then BOTH devices: the same areas and the same people per area (MAIN 127 FAIL 1).
   Exit 0 = PASS. */
const {boot}=require('./boot');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/tmp/nhv-test';fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
const AUDIT=`(()=>{const out=[];const L=document.getElementById('nhv');if(!L)return ['NO SCENE'];const st=document.getElementById('stage').getBoundingClientRect();
 const vis=e=>{if(!e||!e.isConnected)return false;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden')return false;const b=e.getBoundingClientRect();return b.width>2&&b.height>2};
 const F=[...L.querySelectorAll('.nhv-f')].filter(vis);
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
async function run(dev){const o=await boot(dev==='ipad'?'ipadAir':'fold',1,0,{});const {g,pg}=o;const T=ms=>pg.waitForTimeout(ms);const R={dev,areas:{},audit:{}};
 const clearQ=async()=>{for(let j=0;j<8;j++){const n=await g.evaluate(()=>{if(!Q.length)return 0;const m=Q[0];const L=(m.opts||[]);let k=L.findIndex(o=>/một mình/.test(o.n||''));if(k<0)k=Math.max(0,L.findIndex(o=>!o.off));if(L.length)chooseM(k);else closeModal();return 1});if(!n)break;await T(700)}};
 const click=async(sel,i)=>g.evaluate(([s,i])=>{const e=[...document.querySelectorAll(s)][i||0];if(!e)return false;e.click();return true},[sel,i||0]);
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
 const order=M.rows.filter(r=>r.n>0).map(r=>r.k);let first=true;
 for(const k of order){if(!first){await clearQ();await click('#tomap');await T(900);if(!(await g.evaluate(()=>!!document.querySelector('#panel .nhv-map')))){await g.evaluate(()=>{window.__kpm={slot:'p:vuon',k:'vuon'};tab='go';render()});await T(600)}}
  await clearQ();await click(`#panel .nhv-map [data-kpmpart="${k}"]`);await T(first?1500:900);await clearQ();await T(first?2600:1500);first=false;
  const sc=await g.evaluate(k=>{const h=S.hall;window.__khLog=(window.__khLog||[]).concat([k+':used='+used+':kh='+j95kh()+':key='+S.roster.key]);const P=NHV.plan();const a=P.areas.find(x=>x.k===k);return {place:S.place,part:h&&h.part,title:((document.querySelector('#kpname')||{}).textContent||''),
   khl:window.__khLog,err:(window.__nhvErr||[]).slice(-3),names:[...document.querySelectorAll('#nhv .nhv-f')].length,people:curPeople().map(p=>p.name).sort(),want:a?a.g.flatMap(g=>g.ms.concat(g.fol).map(e=>e.name)).sort():[]}},k);
  sc.kh=await g.evaluate(()=>j95kh());R.areas[k]=sc;ok(sc.place==='vuon'&&sc.part===k&&sc.names===sc.people.length&&(()=>{const W=sc.want.map(x=>x.replace(/^Hoàng hậu /,''));const P=sc.people.map(x=>x.replace(/^Hoàng hậu /,''));sc.missing=W.filter(x=>!P.includes(x));return P.every(x=>W.includes(x))&&sc.missing.length<=1})(),`${dev}/${k}: area scene stands with exactly the people the record puts there now`,{part:sc.part,figs:sc.names,people:sc.people,want:sc.want,kh:sc.kh});
  await pg.screenshot({path:`${OUT}/${dev}-${k}.png`});const a0=await g.evaluate(AUDIT);R.audit[k]=a0;ok(!a0.length,`${dev}/${k}: audit (overlap, see-through, cut text)`,a0);
  /* group → person → thẻ gỗ */
  await clearQ();/* a real NPC event may arrive (e.g. menEnc): it is answered first, as a player would */const hasG=await g.evaluate(()=>!!NHV.cur&&NHV.cur.G.length);if(!hasG)continue;
  await g.evaluate(()=>{const G=NHV.cur.G;const g=G.find(x=>x.ms[0]&&!x.ms[0].sil)||G[0];window.__tg=g;g.ms[0].el.click()});await T(700);
  const dim=await g.evaluate(()=>({n:kitDim.state().n,others:NHV.cur.G.filter(x=>x!==window.__tg).reduce((s,x)=>s+x.P.length,0)}));ok(dim.n===dim.others,`${dev}/${k}: group tap dims exactly the other people (kit dim)`,dim);
  await g.evaluate(()=>window.__tg.ms[0].el.click());await T(1900);
  if(await g.evaluate(()=>!NHV.kp&&Q.length>0)){/* a real NPC event came in the middle of the taps: answer it, then tap again */await clearQ();await T(800);await g.evaluate(()=>{const C=NHV.cur;const g=C&&(C.G.find(x=>x.ms[0]&&!x.ms[0].sil)||C.G[0]);window.__tg=g;if(g){g.ms[0].el.click()}});await T(700);await g.evaluate(()=>window.__tg&&window.__tg.ms[0].el.click());await T(1900)}
  const pk=await g.evaluate(()=>({kp:!!NHV.kp,n:document.querySelectorAll('#nhv .kpk .kpk-n').length,Q:Q.map(m=>m.t+'|'+(m.pid||'')).join(';'),used,sel:!!NHV.cur&&NHV.cur.G.indexOf(window.__tg)}));ok(pk.kp&&pk.n>0,`${dev}/${k}: person tap → kit thẻ gỗ (kitPick) beside her`,pk);
  await pg.screenshot({path:`${OUT}/${dev}-${k}-pk.png`});const a1=(await g.evaluate(AUDIT)).filter(x=>!/^TEXT-OVERLAP .*\/|^PERSON-OVERLAP/.test(x)||true);R.audit[k+'-pk']=a1;ok(!a1.length,`${dev}/${k}: audit with plaques up`,a1);
  await g.evaluate(()=>NHV.unsel());await T(500)}
 await o.ctx.close();await o.b.close();o.srv.close();return R}
(async()=>{const F=await run('fold'),I=await run('ipad');fs.writeFileSync(path.join(OUT,'area-test.json'),JSON.stringify({F,I},null,1));
 ok(JSON.stringify(F.map.plan)===JSON.stringify(I.map.plan),'BOTH devices: same areas and the same people in each area (from game state, never the screen)',{fold:F.map.plan.map(a=>a.k+':'+a.ids.length),ipad:I.map.plan.map(a=>a.k+':'+a.ids.length)});
 for(const k in F.areas){if(!I.areas[k]||I.areas[k].kh!==F.areas[k].kh){console.log('note: area '+k+' visited at different khắc (fold '+F.areas[k].kh+' / ipad '+(I.areas[k]&&I.areas[k].kh)+': a real game event spent time) — compared with its own record above');continue}
  ok(JSON.stringify(F.areas[k].people)===JSON.stringify(I.areas[k].people),`BOTH devices (same khắc ${F.areas[k].kh}): area ${k} holds the same people on the scene`,{fold:F.areas[k].people,ipad:I.areas[k].people})}
 const bad=res.filter(x=>!x[0]).length;console.log(`NHV AREA TEST ${bad?'FAIL':'PASS'} · ${res.length-bad}/${res.length}`);process.exit(bad?1:0)})();
