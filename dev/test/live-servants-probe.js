/* live-servants-probe (brief live-servants, owner OD L1901 points 2 + 3): one seeded bot life, N buổi × every khắc (spend(1)); prints
   (a) ONE maid's day (a consort's close maid + one of HER OWN servants): place / act / target / reason per khắc, (b) the record's reasons:
   empty / filler counts by kind, (c) servants: share of khắc away from their palace, retinue sizes by mistress rank, page errors.
   usage: python3 dev/build/assemble.py && [ROAD=maid] node dev/test/live-servants-probe.js <index.html> [N buổi=12] [seed=1] [--json] */
const {chromium}=require('playwright');const A=process.argv.filter(x=>x!=='--json');const [,,F,N0,SD]=A;const N=+N0||12,SEED=+SD||1,JS=process.argv.includes('--json');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
await p.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}},SEED);
await p.goto('file://'+require('path').resolve(F),{waitUntil:'domcontentloaded'});if(process.env.ROAD)await p.evaluate(r=>{window.__road=r},process.env.ROAD);await p.waitForTimeout(2500);
const r=await p.evaluate(n=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;const MAID=window.__road==='maid';do{start();g++}while((MAID?!isSrv():isSrv())&&g<60);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}
 window.render=render=function(){};window.showModal=showModal=function(){};
 const FILL=new Set(["","phận sự trong cung","phận sự"]);const kindOf=id=>id==="emp"?"emp":id==="th"?"th":id==="me"?"me":id.indexOf("mm:")===0?"mm":/^v\d/.test(id)?"rv":/^s\d/.test(id)?"s":id.indexOf("k:")===0?"kid":id.indexOf("c:")===0?"court":id.indexOf("q:")===0?"min":/^m\d/.test(id)?"man":"?";
 const fill={},tot={},away={n:0,a:0},why={},ret={};let day=[],pick=null,mine=null;const ACT=typeof ACT95!=="undefined"?ACT95:{};
 for(let i=0;i<n&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==='function')agFlush()}catch(e){}
  for(let k=0;k<4&&!S.dead;k++){try{j95sync(false,true)}catch(e){}const R=S.roster;if(!R)break;const kh=j95kh();
   if(!pick){const q=liveRivals(true).filter(v=>v.alive&&!v.out&&v.maid&&v.rank>=3).sort((a,b)=>b.rank-a.rank)[0]||liveRivals(true).find(v=>v.maid);pick=q?"mm:"+q.id:null;mine=(S.staff||[])[0]?"s"+S.staff[0].sid:q&&(q.staff||[])[0]?"s"+q.staff[0].sid:null}
   for(const id in R.P){const e=R.P[id][kh];if(!e)continue;const kd=kindOf(id);tot[kd]=(tot[kd]||0)+1;if(FILL.has(String(e[3]||"").trim())&&e[0]!=="ngoai")fill[kd]=(fill[kd]||0)+1;
    if(kd==="s"||kd==="mm"){away.n++;const w=(R.who[id]||[])[1]||"";let home=null;try{const pp=j95ppl(R).find(x=>x.id===id);home=pp&&pp.home}catch(e){}if(home&&e[0]!==home)away.a++;const key=(ACT[e[1]]||e[1])+" | "+String(e[3]||"").slice(0,70);why[key]=(why[key]||0)+1}}
   /* retinue sizes: people following each mistress now */
   const F={};for(const id in R.P){const e=R.P[id][kh];if(e&&e[1]==="follow"&&e[2])F[e[2]]=(F[e[2]]||0)+1}for(const m in F){let rk="?";try{rk=m==="me"?S.rank:m==="th"?"th":(RV(+m.slice(1)).queen?7:RV(+m.slice(1)).rank)}catch(e){}(ret[rk]=ret[rk]||[]).push(F[m])}
   for(const id of [pick,mine,"mm:me"]){if(!id||!R.P[id])continue;const e=R.P[id][kh];day.push({id,name:(R.who[id]||[id])[0],role:(R.who[id]||["",""])[1],wk:R.wk,b:R.b,kh,place:j95pn(e[0]),act:ACT[e[1]]||e[1],tgt:e[2]?((R.who[e[2]]||[e[2]])[0]):"",why:e[3]||"",mis:(()=>{const o=id==="mm:me"?"me":id.indexOf("mm:")===0?"v"+id.slice(3):(()=>{const sv=servById(+id.slice(1));const m=sv&&ownerOf(sv);return m===S||!m?"me":"v"+m.id})();const x=R.P[o]&&R.P[o][kh];return x?j95pn(x[0]):""})()})}
   try{spend(1)}catch(e){}if(j95kh()===kh)break}
  try{nextBuoi()}catch(e){}Q.length=0}
 const RS={};for(const k in ret){const L=ret[k];RS[k]={n:L.length,max:Math.max(...L),mean:+(L.reduce((a,b)=>a+b,0)/L.length).toFixed(2)}}
 const top=Object.entries(why).sort((a,b)=>b[1]-a[1]).slice(0,25);
 return{fill,tot,away:+(away.a/Math.max(1,away.n)).toFixed(3),ret:RS,top,day,stat:window.__j95s?window.__j95s():null,save:(()=>{try{save()}catch(e){}return ((window.slotGet?slotGet("hclh-save-v2-4"):localStorage.getItem("hclh-save-v2-4"))||"").length})()}},N);
if(JS){console.log(JSON.stringify(Object.assign(r,{errs})));await b.close();return}
console.log("FILLER reasons by kind (filler / rows):");for(const k in r.tot)console.log(`  ${k}: ${r.fill[k]||0} / ${r.tot[k]}`);
console.log(`servants away from their palace: ${r.away}`);console.log("retinue by mistress rank:",JSON.stringify(r.ret));
console.log("top servant act | reason:");for(const [k,v] of r.top)console.log(`  ${v}  ${k}`);
console.log("ONE MAID'S DAY:");for(const d of r.day)console.log(`  ${d.id} ${d.name} · wk${d.wk} b${d.b} k${d.kh+1} · ${d.place} · ${d.act} · ${d.tgt} · ${d.why}  [mistress at ${d.mis}]`);
console.log("stat:",JSON.stringify(r.stat),"save bytes:",r.save);console.log("errs:",JSON.stringify(errs.slice(0,5)));await b.close()})();
