const {boot}=require('./boot');
(async()=>{const o=await boot('fold',2,0,{});const {g,pg}=o;
 const r=await g.evaluate(async()=>{tab='go';render();await new Promise(r=>setTimeout(r,500));const ok=kpmOpen('kn');await new Promise(r=>setTimeout(r,1500));
  const t=document.querySelector('.kpmv .kpm-t');const b=t&&t.getBoundingClientRect();const v=document.querySelector('.kpmv');return {ok,t:b&&[b.left,b.top,b.width,b.height].map(Math.round),html:v&&v.outerHTML.slice(0,900)}});
 console.log(JSON.stringify(r,null,1));await pg.screenshot({path:'/home/user/wt/ring3-shots/kn.png'});await o.b.close();o.srv.close()})();
