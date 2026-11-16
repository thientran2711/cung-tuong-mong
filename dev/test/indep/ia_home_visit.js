/* Guest in her palace disappears from the stage after save + reload (record still has her). usage: node ia_home_visit.js <url> */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();await p.route(/\.(mp3|ogg)$/,r=>r.abort());
const U=process.argv[2]||'http://127.0.0.1:8971/t.html';const out=[];
for(let t=0;t<10&&out.length<4;t++){await p.goto(U);await p.waitForTimeout(1300);
 const a=await p.evaluate(()=>{localStorage.clear();SLOT=2;document.getElementById('title').hidden=true;start();if(NLP)nlAccept(true);Q.length=0;try{closeModal()}catch(e){}
  const clr=()=>{let n=0;while(Q.length&&n++<30){try{if(Q[0].opts&&Q[0].opts.length)chooseM(Q[0].opts.length-1);else closeModal()}catch(e){Q.shift()}}};
  for(let i=0;i<40;i++){if(S.place!=="home"){goTo("home");clr()}const kh=j95kh();const v=liveRivals(true).find(v=>S.roster.P["v"+v.id]&&S.roster.P["v"+v.id][kh][0]==="home"&&!sameHouse(S,v));if(v){tab="act";render();const toks=[...document.querySelectorAll('#tokens .tok')].map(t=>{const n=t.querySelector('.j59n');const pp=S.visit&&S.visit.people?S.visit.people[+t.dataset.p]:null;const x=n?n.textContent.trim():'';return (!x||x==='???')&&pp?pp.name:x});return{v:v.name,row:S.roster.P["v"+v.id][kh],drawn:toks.some(x=>x.includes(v.name)),people:S.visit.people.map(x=>x.name)}}
   nextBuoi();clr()}return null});
 if(!a)continue;await p.evaluate(()=>save());await p.reload();await p.waitForTimeout(1300);await p.evaluate(()=>document.querySelector('#slots button[data-load="2"]').click());await p.waitForTimeout(800);
 const c=await p.evaluate(n=>{tab="act";render();const v=rivals.find(x=>x.name===n);const kh=j95kh();const toks=[...document.querySelectorAll('#tokens .tok')].map(t=>{const n=t.querySelector('.j59n');const pp=S.visit&&S.visit.people?S.visit.people[+t.dataset.p]:null;const x=n?n.textContent.trim():'';return (!x||x==='???')&&pp?pp.name:x});return{row:S.roster.P["v"+v.id][kh],drawn:toks.some(x=>x.includes(n)),visitPeople:S.visit.people.map(x=>x.name),place:S.place}},a.v);
 out.push({before:a,afterReload:c})}
console.log(JSON.stringify(out,null,1));await b.close()})();
