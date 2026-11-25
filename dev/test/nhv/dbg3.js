const {boot}=require('./boot');
(async()=>{const o=await boot(process.argv[2]||'fold',1,0,{});const {g,pg}=o;
 await g.evaluate(async()=>{Q.length=0;tab='go';window.__mapList=false;render();await new Promise(r=>setTimeout(r,500));const e=document.querySelector('#panel [data-go^="r"]');e&&e.click();await new Promise(r=>setTimeout(r,1500))});
 await pg.screenshot({path:process.argv[3]});console.log(await g.evaluate(()=>document.documentElement.className));await o.b.close();o.srv.close()})();
