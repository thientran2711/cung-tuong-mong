const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g,pg}=o;
 const r=await g.evaluate(async()=>{Q.length=0;S.buoi=1;S.roster=null;j95sync(false,true);tab='go';window.__mapList=false;render();await new Promise(r=>setTimeout(r,800));
  const out={Q0:Q.length,dead:S.dead};const e=document.querySelector('#panel [data-go="vuon"]');let called=0;const t0=j77Tap;j77Tap=function(){called++;out.args=[...arguments].map(String);return t0.apply(this,arguments)};
  e.click();await new Promise(r=>setTimeout(r,600));out.called=called;out.kpm=JSON.stringify(window.__kpm);out.Q=Q.map(m=>m.t);out.modal=(document.getElementById('modal')||{}).hidden;
  const card=document.querySelector('.kplc,.mapcard,#mapcard,.kmcard');out.card=card&&card.textContent.slice(0,200);out.panel=document.querySelector('#panel').textContent.slice(0,300);return out});
 console.log(JSON.stringify(r,null,1));await o.b.close();o.srv.close()})();
