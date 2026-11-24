/* B-answers art: Lý / Quản sự Tân Giả khố / Thầy dạy Thượng thư phòng figures in their real places, 'Sáng hôm sau' banner, podium variants.
   usage: NODE_PATH=$(npm root -g) node dev/test/b-answers-art.js <url> <outdir> */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const res={};
for(const [w,h] of [[755,1000],[1180,820]]){
 const ctx=await b.newContext({viewport:{width:w,height:h},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof goTo==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0});
 await p.waitForTimeout(1500);for(let i=0;i<6;i++){const bt=p.locator('button:has-text("Bỏ qua"), button:has-text("Tiếp")').first();if(await bt.count()&&await bt.isVisible().catch(()=>false)){await bt.click().catch(()=>{});await p.waitForTimeout(800)}}
 await p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{let n=e;while(n.parentElement&&n.parentElement!==document.body)n=n.parentElement;n.remove()});Q.length=0;try{render()}catch(e){}});
 await p.waitForFunction(()=>typeof FIGIX!=='undefined'&&FIGIX.fallen&&FIGIX.steward&&FIGIX.tutor,null,{timeout:120000}).catch(()=>{});
 for(const k of ['lc','tgk','ttp']){
  const r=await p.evaluate(k=>{try{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.out=0;S.confined=0;S.dead=0;S.buoi=1;S.suc=100;S.place='home';goTo(k);return {n:(S.visit&&S.visit.people||[]).length}}catch(e){return {e:String(e).slice(0,150)}}},k);
  await p.waitForTimeout(2500);
  const info=await p.evaluate(()=>{const ppl=curPeople();return ppl.map(pp=>{let f='',po='';try{f=figFor(pp)}catch(e){}try{po=figFor(pp,'por')}catch(e){}return {kind:pp.kind,name:pp.name,fig:f.split('/').pop(),por:po.split('/').pop()}})});
  res[`${w}-${k}`]={r,info};await p.screenshot({path:`${OUT}/${w}x${h}-${k}.jpg`,type:'jpeg',quality:80});}
 await p.evaluate(()=>{[...document.body.children].forEach(e=>{if(getComputedStyle(e).position==='fixed'&&/Luân hồi/.test(e.textContent)&&e.id!=='modal')e.remove()});Q.length=0;kitModal({kind:"info",look:1,title:"Sáng hôm sau",subject:pEmp(),headArt:{src:"img/ev-morning-after-b.webp",label:"Sáng hôm sau"},body:"<p>Trời vừa sáng, Hoàng thượng mới rời cung ngươi lên triều.</p><p>Sủng +4 · Danh +2</p>",btn:"Đã hiểu"})});
 await p.waitForTimeout(2000);await p.screenshot({path:`${OUT}/${w}x${h}-banner.jpg`,type:'jpeg',quality:80});
 for(const v of ['spring','autumn','base']){
  await p.evaluate(v=>{[...document.body.children].forEach(e=>{if(getComputedStyle(e).position==='fixed'&&/Luân hồi/.test(e.textContent)&&e.id!=='modal')e.remove()});try{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}
   let st=document.getElementById('podtest');if(st)st.remove();
   if(v!=='base'){const u=IMG_BASE+`img/kit/podium-bg2-${v}.webp`;st=document.createElement('style');st.id='podtest';st.textContent=`html body #kpodov .kpod.kpod{background:linear-gradient(#fffaf000,#f5ecdc22 60%,#f5ecdcb0),url(${u}) center bottom/cover no-repeat!important}`;document.head.appendChild(st)}
   const L=[S].concat(rivals.slice(0,5)).map((x,i)=>({who:x,place:i+1,score:90-i*7}));kitPodiumShow(L,{title:'Hội thi cắm hoa',sub:'Môn Cắm hoa',next:'Tiếp'})},v);
  await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${w}x${h}-podium-${v}.jpg`,type:'jpeg',quality:80});await p.evaluate(()=>kitPodiumClose(true))}
 res[`${w}-errors`]=[...new Set(errs)].slice(0,6);await ctx.close()}
console.log(JSON.stringify(res,null,1));await b.close()})();
