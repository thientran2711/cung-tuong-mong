const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g,pg}=o;const CR=JSON.parse(fs.readFileSync(__dirname+'/crowd.json','utf8'));
 await g.evaluate(fs.readFileSync(__dirname+'/scen3.js','utf8'));await g.evaluate(fs.readFileSync(__dirname+'/area.js','utf8'));
 const r=await g.evaluate(async CR=>{S.buoi=CR.best.b;S.place='vuon';S.j95seed=CR.best.seed;used=CR.best.kh;const R=j95plan();j95sync(false,false);
  const ids=Object.keys(R.P).filter(id=>R.P[id][used]&&R.P[id][used][0]==='vuon').map(id=>id+':'+(R.who[id]||[''])[0]+':'+R.P[id][used][1]);
  tab='go';render();await new Promise(r=>setTimeout(r,800));KAR.init({groups:CR.groups,areas:BAL.area.vuon,fh:CR.fh,bg:''});await KAR.showMap();await new Promise(r=>setTimeout(r,1200));
  const c=document.querySelector('.kar-map');const b=c.getBoundingClientRect();const stack=document.elementsFromPoint(b.left+b.width/2,b.top+b.height/3).slice(0,6).map(e=>e.tagName+'.'+e.className+'#'+e.id+' op='+getComputedStyle(e).opacity+' bg='+getComputedStyle(e).backgroundColor);
  let anc=[];let e=c;while(e){const cs=getComputedStyle(e);if(+cs.opacity<1||cs.filter!=='none')anc.push(e.tagName+'.'+e.className+' op='+cs.opacity+' f='+cs.filter);e=e.parentElement}
  return {ids,stack,anc,Q:Q.length,cls:document.querySelector('.game').className}},CR);
 console.log(JSON.stringify(r,null,1));await o.b.close();o.srv.close()})();
