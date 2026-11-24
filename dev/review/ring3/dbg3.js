const {boot}=require('./boot');const fs=require('fs');
(async()=>{const o=await boot('fold',1,0,{});const {g}=o;
 const r=await g.evaluate(async()=>{const W=ms=>new Promise(r=>setTimeout(r,ms));const st=()=>({cls:document.querySelector('.game').className,away:window.kplAway&&kplAway(),place:S.place,tab});
  const a=[];S.place='vuon';tab='act';render();j77Tap('vuon');await W(800);a.push(st());tab='go';render();await W(800);a.push(st());tab='act';render();j77Tap('vuon');await W(800);a.push(st());return a});
 console.log(JSON.stringify(r,null,0));await o.b.close();o.srv.close()})();
