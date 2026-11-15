/* SCAN 7 — every event dialog with options (every PEND builder): an option that costs nothing must show NO "Tốn" row (owner 17:08Z:
   "TỐN không" is noise). Counts options whose Tốn row reads "không". */
(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));S.bac=300;S.suc=80;let dialogs=0,opts=0,khong=0;const ex=[];
 for(const id of Object.keys(PEND)){let ok=false;try{Q.length=0;const d=mkP(id,{});if(d&&d.o&&d.o.length){pushDil(d,id);showModal();ok=true}}catch(e){}
  if(!ok)continue;await wait(30);dialogs++;
  document.querySelectorAll('#modal #mb .opts > button').forEach(b=>{opts++;const t=[...b.querySelectorAll('.kr-ton .krv')].map(v=>v.textContent.trim());if(t.some(x=>/^không$/i.test(x))){khong++;if(ex.length<8)ex.push(id+': '+b.innerText.replace(/\s+/g,' ').slice(0,60))}});
  Q.length=0;document.getElementById('modal').hidden=true}
 return{dialogs,opts,tonKhong:khong,ex}})()
