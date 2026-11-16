// two-way-acts: Fold 755x1000@2 + iPad 1180x820@2 shots of the rival talk card with the new player options (Thăm lúc ốm mệt, Hạ nhục).
// usage: node dev/test/two-way-shots.js <game.html> <outdir>
const {chromium}=require('playwright');const [,,GAME,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const res=[];
 for(const [nm,w,h] of [["fold",755,1000],["ipad",1180,820]]){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+GAME);await sleep(800);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(800);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(1500);
  for(let k=0;k<40;k++){await sleep(400);const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^(Bỏ qua|Đóng|Vào cung|Bắt đầu)$/.test(b.textContent.trim()));if(b){b.click();return 1}return document.querySelector('[class^="kroul"],[id^="kroul"]')?1:0});if(!c&&k>3)break}
  const info=await p.evaluate(()=>{Q.length=0;try{const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
   const v=liveRivals(true).filter(x=>!x.queen)[0];S.rank=Math.max(S.rank,rkOf(v));v.suc=40;S.sung=50;used=0;
   let k=whereOf(v);try{goTo(k)}catch(e){}S.place=k;render();const L=curPeople();let i=L.findIndex(p=>p.ref===v);
   if(i<0){/* put her where the player is */S.where=S.where||{};S.where[v.id]=S.place;render();i=curPeople().findIndex(p=>p.ref===v)}
   popIdx=i;render();const pw=document.getElementById('popw');
   const txt=pw?pw.innerText:"";return {i,place:S.place,has:["Thăm lúc ốm mệt","Hạ nhục"].map(n=>txt.includes(n)),ovf:document.documentElement.scrollWidth>innerWidth}});
  await sleep(500);
  // scroll the option list so the new options are in view
  await p.evaluate(()=>{const el=[...document.querySelectorAll('#popw *')].find(e=>e.children.length===0&&/Thăm lúc ốm mệt/.test(e.textContent));if(el){let q=el.parentElement;while(q&&q!==document.body){if(q.scrollHeight>q.clientHeight+4&&getComputedStyle(q).overflowY!=='visible'){q.scrollTop=el.getBoundingClientRect().top-q.getBoundingClientRect().top+q.scrollTop-q.clientHeight/3;break}q=q.parentElement}}});await sleep(300);
  await p.screenshot({path:`${OUT}/talk-${nm}.jpg`,type:'jpeg',quality:70});res.push({nm,info,errs:errs.slice(0,3)});await ctx.close()}
 console.log(JSON.stringify(res));await b.close()})();
