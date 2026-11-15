/* the owner's case (16:40Z): chiều, 1 khắc left, walk 1 khắc to a palace whose chủ vị outranks her → the gate offers only "Vào thẳng"
   (Bái kiến needs 2) → she walks in, the buổi turns to tối AT that palace with 4 khắc → tap that palace on Dư đồ: the card must offer
   "Bái kiến". Returns each step; the page is left showing the tối card for the screenshot. */
(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));const steps={};
 Q.length=0;document.getElementById('modal').hidden=true;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=2;used=3;S.acPass={};S.acGreet={};S.acSkip={};
 const k=places().map(x=>x.k).find(x=>{if(x[0]!=="r")return false;const h=accHost(x);if(!h||h===S||!h.alive||h.out||rkOf(h)-rkOf(S)<1)return false;S.where[h.id]=x;return travel("home",x)===1&&accessOf(S,x).ok});
 if(!k)return{err:"no 1-khắc palace with a higher chủ vị"};const h=accHost(k);steps.place=k;steps.host=accRkName(h)+" "+h.name;
 j77Tap(k);await wait(300);steps.gate=[...document.querySelectorAll('#modal #mb .opts > button')].map(b=>b.innerText.replace(/\s+/g,' ').slice(0,50));
 const i=Q[0]&&Q[0].opts.findIndex(o=>/^Vào thẳng/.test(o.n));if(i<0)return Object.assign(steps,{err:"no Vào thẳng"});chooseM(i);
 for(let t=0;t<30&&!(S.buoi===3&&!Q.length);t++){await wait(300);if(Q.length&&S.buoi===3){Q.length=0;document.getElementById('modal').hidden=true}}
 Q.length=0;document.getElementById('modal').hidden=true;S.where[h.id]=k;tab="go";render();await wait(300);
 steps.night={buoi:BUOI[S.buoi],place:S.place,left:4-used,msg:S.visit&&S.visit.msg};
 j77Tap(k);await wait(500);steps.card=[...document.querySelectorAll('#modal #mb .opts > button')].map(b=>b.innerText.replace(/\s+/g,' ').slice(0,60));
 steps.title=document.getElementById('mt').textContent;return steps})()
