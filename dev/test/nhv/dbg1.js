const {boot}=require('./boot');
(async()=>{const o=await boot('fold',1,0,{});const {g,pg}=o;
 const r=await g.evaluate(async()=>{Q.length=0;S.buoi=1;S.roster=null;j95sync(false,true);tab='go';render();await new Promise(r=>setTimeout(r,500));
  const out={};out.slot=kpmSlotOf('vuon');out.multi=kpmMulti('p:vuon','vuon');out.art=JSON.stringify(kpmArt('p:vuon'));out.parts=JSON.stringify(kpmParts('p:vuon','vuon'));
  const e=document.querySelector('#panel [data-go="vuon"]');out.tag=e&&e.outerHTML.slice(0,200);
  try{j77Tap('vuon','')}catch(x){out.err=String(x)}out.kpm=JSON.stringify(window.__kpm);out.Q=Q.length&&Q[0].t;out.place=S.place;
  await new Promise(r=>setTimeout(r,500));out.map=!!document.querySelector('#panel .nhv-map');out.rows=[...document.querySelectorAll('#panel .kpm-row')].map(b=>b.textContent.trim());return out});
 console.log(JSON.stringify(r,null,1));await o.b.close();o.srv.close()})();
