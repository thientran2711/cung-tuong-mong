/* D42 places: Dư đồ shows cnh/tgk/ttp/acs/dc; princes' rooms show children by age; count on map = people on arrival.
   usage: node dev/test/places-d42.js <url> <W>x<H>@dpr <outdir> <tag> */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80,animations:'disabled'})};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 const setup=await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  S.rank=4;S.kids=S.kids||[];const a=mkKid('m',8),b=mkKid('f',7),c=mkKid('m',2);S.kids.push(a,b,c);
  const v=rivals.find(x=>x.alive&&!x.out&&!x.queen);v.kids=v.kids||[];const d=mkKid('m',10),e=mkKid('m',17);v.kids.push(d,e);
  setHeir(a,null);S.buoi=1;used=0;S.place='home';placeWhere();tab='go';window.__mapZ=1;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);
  return{mine:[a.name,b.name,c.name],rival:[d.name,e.name,v.name],heir:S.heir&&S.heir.k.name}});
 const R={setup,errs};
 /* map: five spots, labels, counts */
 await shot('1-map');
 R.spots=await p.evaluate(()=>['cnh','tgk','ttp','acs','dc'].map(k=>{const el=document.querySelector(`#panel .mspot[data-go="${k}"]`);return{k,found:!!el,label:el&&el.textContent.trim().slice(0,60),count:countAt(k),walk:travel('home',k),acc:accessOf(S,k).ok}}));
 /* each place, buổi 1 (trưa): arrive, compare the stage people with the map count */
 const placeLog=[];
 for(const k of ['acs','dc','ttp','cnh','tgk']){
  const r=await p.evaluate(k=>{Q.length=0;S.buoi=1;used=0;S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};placeWhere();const cnt=countAt(k);accGrant&&accGrant(S,k);goTo(k);
   return{k,place:S.place,cnt,ppl:(S.visit&&S.visit.people||[]).map(x=>x.kind+':'+x.name),msg:S.visit&&S.visit.msg,sc:placeOf(k).sc,img:(document.getElementById('scimg')||{style:{}}).style.backgroundImage.slice(0,90)}},k);
  await p.waitForTimeout(1500);if(k==='acs'||k==='dc')await shot('2-'+k);placeLog.push(r)}
 R.places=placeLog;
 /* buổi sáng: boys are at the study; at home the children who moved out are gone */
 R.morning=await p.evaluate(()=>{Q.length=0;S.buoi=0;used=0;S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};const o={home:homePeople().filter(x=>x.kind==='kid').map(x=>x.name),acs:plxPeople('acs').length,dc:plxPeople('dc').length,ttp:plxPeople('ttp').map(x=>x.kind+':'+x.name),homeCount:countAt('home')};
  S.buoi=1;o.noon={home:homePeople().filter(x=>x.kind==='kid').map(x=>x.name),acs:plxPeople('acs').map(x=>x.name),dc:plxPeople('dc').map(x=>x.name),ttp:plxPeople('ttp').length};
  S.buoi=3;o.night={acsOpen:accessOf(S,'acs').ok,cnhOpen:accessOf(S,'cnh').ok};return o});
 /* an old save: delete none; round-trip */
 R.save=await p.evaluate(()=>{try{save();const s=JSON.stringify(S);return{len:s.length,hasPlx:/plx/.test(s)}}catch(e){return{err:String(e)}}});
 R.ox=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 console.log(JSON.stringify(R,null,1));await b.close()})();
