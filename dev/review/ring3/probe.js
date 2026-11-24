const {boot}=require('./boot');
(async()=>{for(const dev of ['fold','ipadAir']){const o=await boot(dev,1,0,{reducedMotion:'no-preference'});const {g,pg}=o;
 const r=await g.evaluate(async()=>{tab='go';window.__mapList=false;render();await new Promise(r=>setTimeout(r,1800));const v=document.querySelector('#panel .mapv');const b=v&&v.getBoundingClientRect();
  return {name:S.name,rank:S.rank,origin:S.origin&&S.origin.k,mapv:b&&[b.left,b.top,b.width,b.height].map(Math.round),spots:[...document.querySelectorAll('.mspot')].slice(0,40).map(s=>s.dataset.go||s.dataset.ak).join(',')}});
 console.log(dev,JSON.stringify(r));await pg.screenshot({path:'/home/user/wt/ring3-shots/probe-'+dev+'.png'});await o.b.close();o.srv.close()}})();
