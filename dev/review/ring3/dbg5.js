const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;const CR=JSON.parse(fs.readFileSync(__dirname+'/crowd.json','utf8'));
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));await g.evaluate(fs.readFileSync(__dirname+'/area.js','utf8'));
 const r=await g.evaluate(async CR=>{S.place='vuon';tab='act';render();j77Tap('vuon');await new Promise(r=>setTimeout(r,600));const i=KAR.init({groups:CR.groups,areas:BAL.area.vuon,fh:CR.fh,bg:'https://ctm-img.victoria-tntt.workers.dev/img/ngu-hoa-vien-xuan-trua.webp'});await KAR.showMap();await new Promise(r=>setTimeout(r,1200));
  const R=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return [b.left,b.top,b.width,b.height].map(Math.round).join(',')+' '+e.className+' style='+e.getAttribute('style')};
  return {D:i.D,v:R('.kar-map'),sc:R('.kar-map .mapsc')+' sl='+document.querySelector('.kar-map .mapsc').scrollLeft,w:R('.kar-map .mapw'),im:R('.kar-map .mapimg')}},CR);
 console.log(JSON.stringify(r,null,1));await o.b.close();o.srv.close()})();
