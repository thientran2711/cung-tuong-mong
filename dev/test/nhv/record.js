/* NHV VIDEO (owner 25/11 ~22:05Z «video đầy đủ»): SAVE=<life.json> node dev/test/nhv/record.js <fold|ipad> <outdir>
   ONE life, real kit taps: Dư đồ → tap Ngự hoa viên → garden map (5 areas + head-counts) → each area with people (vòng nhóm on the scene)
   → in the first two areas: tap a group (others dim) → tap a person (she steps out, thẻ gỗ hang) → tap a plaque (lifts + its line) → choose it
   (the game's own act flow) → back to the garden map → next area. Writes <outdir>/<dev>.webm (+ marks.json = time of every step). */
const {boot}=require('./boot');const fs=require('fs');const path=require('path');
const dev=process.argv[2]||'fold',OUT=process.argv[3]||'/tmp/nhv-vid';fs.mkdirSync(OUT+'/tmp-'+dev,{recursive:true});
(async()=>{const D=require('../lib/device');const dd=D.DEVICES[dev==='ipad'?'ipadAir':'fold'];
 const o=await boot(dev==='ipad'?'ipadAir':'fold',1,0,{reducedMotion:'no-preference',recordVideo:{dir:OUT+'/tmp-'+dev,size:{width:dd.w,height:dd.h}}});const {g,pg}=o;
 const T=ms=>pg.waitForTimeout(ms);const t0=Date.now();const marks=[];const mark=n=>{marks.push([((Date.now()-t0)/1000).toFixed(1),n]);console.log('MARK',marks[marks.length-1].join(' '))};
 const clearQ=async()=>{for(let j=0;j<8;j++){const n=await g.evaluate(()=>{if(!Q.length)return 0;const m=Q[0];const L=(m.opts||[]);let k=L.findIndex(o=>/một mình/.test(o.n||''));if(k<0)k=Math.max(0,L.findIndex(o=>!o.off));if(L.length&&!L.every(o=>o.off))chooseM(k);else closeModal();return 1});if(!n)break;await T(900)}};
 const click=async(sel,i)=>g.evaluate(([s,i])=>{const e=[...document.querySelectorAll(s)][i||0];if(!e)return false;e.click();return true},[sel,i||0]);
 await g.evaluate(()=>{document.documentElement.classList.remove('kf-still');try{BAL.df.idle={every:[1e9,1e9],first:1e9}}catch(e){}const t=document.getElementById('rtoast');if(t)t.classList.remove('on')});
 await clearQ();await g.evaluate(()=>{tab='go';window.__mapList=false;render()});await T(400);mark('Dư đồ');await T(2200);
 for(let k=0;k<4;k++){await clearQ();await click('#panel [data-go="vuon"]');await T(900);if(await g.evaluate(()=>!!document.querySelector('#panel .nhv-map')))break}
 mark('garden map');await T(3600);
 const order=await g.evaluate(()=>[...document.querySelectorAll('#panel .nhv-map .kpm-row')].filter(b=>/\d+ bóng người/.test(b.textContent)).map(b=>b.dataset.kpmpart));
 let first=true,deep=0;
 for(const k of order){if(!first){await clearQ();await click('#tomap');await T(400);mark('back to garden map');await T(1800)}
  await click(`#panel .nhv-map [data-kpmpart="${k}"]`);await T(first?1300:500);if(first){mark('walk: who goes with her');await T(1200)}await clearQ();mark('area '+k);await T(first?3200:2600);first=false;
  if(deep<2){deep++;
   const ok=await g.evaluate(()=>{const C=NHV.cur;if(!C||!C.G.length)return false;const RX=/Chào hỏi|Hỏi han/;let pick=null,pick0=null;for(const g of C.G){if(g.emp)continue;const m=g.ms[0];if(!m||m.sil)continue;let a=null;try{a=dfData(m.i).flatMap(x=>x.acts).find(x=>RX.test(x.n)&&!x.off)}catch(e){}if(a){pick={g,a};break}if(!pick0)pick0={g,a:{id:null}}}pick=pick||pick0;if(!pick)return false;window.__tg=pick.g;window.__ta=pick.a.id;pick.g.ms[0].el.click();return true});if(!ok)continue;
   mark('group lit, others dim');await T(1800);await g.evaluate(()=>window.__tg.ms[0].el.click());mark('person steps out, thẻ gỗ');await T(2600);
   const pid=await g.evaluate(()=>{const L=[...document.querySelectorAll('#nhv .kpk .kpk-n')];const n=L.find(x=>x.dataset.id===window.__ta)||L[0];if(!n)return null;n.querySelector('.kpk-b').click();return n.dataset.id});
   mark('plaque lifts: '+pid);await T(2200);
   if(pid&&deep===1&&await g.evaluate(()=>!!window.__ta)){await g.evaluate(id=>{const n=document.querySelector(`#nhv .kpk .kpk-n[data-id="${CSS.escape(id)}"] .kpk-b`);if(n)n.click()},pid);mark('chosen → the act');await T(2500);
    /* the act's own flow: rules card «Sẵn sàng» or the quick result («Bỏ qua»), then the plaques hang again */
    for(let j=0;j<8;j++){const s=await g.evaluate(()=>{const tp=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^Tiếp/.test(b.textContent.trim()));if(tp){tp.click();return 'tiep'}const sk=[...document.querySelectorAll('.kfoc button,.kfoc-skip,.kqk,button')].find(b=>b.offsetParent&&/Bỏ qua/.test(b.textContent));if(sk){sk.click();return 'skip'}const go=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/Sẵn sàng/.test(b.textContent));if(go){go.click();return 'go'}return ''});if(s)mark('act: '+s);await T(1600)}
    await clearQ();await T(2500);mark('after the act');await g.evaluate(()=>{try{const F=kitFocus.current();if(F&&F.open)F.close()}catch(e){}});await T(800)}
   await g.evaluate(()=>NHV.unsel());await T(1200)}}
 await click('#tomap');await T(400);mark('garden map (end)');await T(2500);
 fs.writeFileSync(path.join(OUT,dev+'-marks.json'),JSON.stringify({off:(t0-global.__T0)/1000,marks}));
 const v=pg.video();await o.ctx.close();const p=await v.path();fs.renameSync(p,path.join(OUT,dev+'.webm'));await o.b.close();o.srv.close();console.log('VIDEO',path.join(OUT,dev+'.webm'))})();
