/* tuanluc-sync items 6-9 shots: plays ~2 tuần of a scripted life (DIRECT mode), then shoots (1) the overnight KẾT QUẢ card "Trong cung vừa qua"
   (every row names its cause, others' news in "Tin trong cung"), (2) the Sổ ghi tab (cards kept in full between the lines), (3) Tuần lục pages
   (literary lines only, no number chips, no "Mấy việc vặt" filler). Fold 755x1000@2 + iPad 1180x820@2.  usage: node dev/test/tuanluc-shots2.js <outdir> */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const OUT=process.argv[2]||'/tmp';fs.mkdirSync(OUT,{recursive:true});
const HTML=path.resolve(__dirname,'../index.html');
(async()=>{const b=await chromium.launch();const res={};
 for(const [dev,w,h] of [['fold',755,1000],['ipad',1180,820]]){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.route(/^https?:\/\/(?!ctm-img)/,r=>r.abort());await p.goto('file://'+HTML);await p.waitForTimeout(2500);
  const skip=async()=>{for(let i=0;i<4;i++){const x=p.getByRole('button',{name:'Bỏ qua'});if(await x.count()&&await x.first().isVisible()){await x.first().click();await p.waitForTimeout(500)}}await p.evaluate(()=>{document.querySelectorAll('.kmov .kmend,.kmov').forEach(e=>{try{e.click()}catch(x){}});document.querySelectorAll('#kroulw,.kroul,.kmov').forEach(e=>e.remove());document.querySelectorAll('.kne').forEach(e=>{const h=e.parentElement;for(let i=0;i<3;i++)try{e.click();h&&h.click()}catch(x){}if(h&&h.id==='dawn')h.hidden=true;else e.remove()})});await p.waitForTimeout(300)};
  const r=await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const o={};SLOT=3;const ti=document.getElementById('title');if(ti)ti.hidden=true;start();await sl(4000);try{document.getElementById('kroulw')&&document.getElementById('kroulw').remove()}catch(e){}Q.length=0;render();
   const drain=async()=>{for(let j=0;j<16&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.floor(Math.random()*m.opts.length));else closeModal()}catch(e){Q.shift()}await sl(30)}};
   let tu=0;const e0=endTurn;endTurn=function(){tu++;return e0.apply(this,arguments)};
   for(let i=0;i<80&&tu<2&&!S.dead;i++){await drain();try{tab='acts';render();const ix=(deck||[]).map((a,i)=>[a,i]).filter(([a])=>a&&!a.done&&!a.lock);if(ix.length){act(ix[Math.floor(Math.random()*ix.length)][1]);await drain()}}catch(e){}
    try{nextBuoi()}catch(e){}await sl(40)}
   /* the overnight card: pass buổi until it shows */
   window.__lbOff=1;for(let i=0;i<40;i++){await drain();Q.length=0;try{showModal()}catch(e){}const t=document.getElementById('rtoast');if(t)t.classList.remove('on');try{nextBuoi()}catch(e){}await sl(900);await drain();
    const t2=document.getElementById('rtoast');if(t2&&t2.classList.contains('on')&&/Trong cung vừa qua/.test(t2.textContent)){o.night=t2.innerText;break}}
   clearTimeout(window.__rtT);return o});
  await skip();await p.evaluate(()=>{const t=document.getElementById('rtoast');if(t&&t.innerHTML)t.classList.add('on');clearTimeout(window.__rtT)});await p.waitForTimeout(300);await p.screenshot({path:path.join(OUT,`night-${dev}.png`)});
  const s=await p.evaluate(async()=>{Q.length=0;try{closeModal()}catch(e){}const t=document.getElementById('rtoast');if(t)t.classList.remove('on');tab='log';render();await new Promise(r=>setTimeout(r,600));
   const P=document.getElementById('panel');const sc=P&&(P.querySelector('.logs')||P);const c=P&&P.querySelector('[data-card]');if(c)c.scrollIntoView({block:'start'});
   return {cards:(S.cards||[]).length,inLog:P?P.querySelectorAll('[data-card]').length:0}});
  await skip();await p.waitForTimeout(300);await p.screenshot({path:path.join(OUT,`soghi-${dev}.png`)});
  const bk=await p.evaluate(async()=>{const o={};try{window.__wkResid=[];const d=wkBookData();const P=x=>(x.text||x).replace(/<[^>]+>/g,"");
   const all=[...d.me,...d.world,...d.persons.flatMap(x=>x.blocks[0].facts)].map(P);o.filler=all.filter(t=>/Mấy việc vặt/.test(t)).length;
   o.numbers=all.filter(t=>/(Sủng|Sức|Danh|Bạc|thiện cảm|ghen|oán ta)\s*[+\-−]\d|\d+\s*→\s*\d+/.test(t)).slice(0,5);Q.length=0;dawn()}catch(e){o.err=String(e).slice(0,200)}await new Promise(r=>setTimeout(r,900));return o});
  for(let k=1;k<=4;k++){await p.waitForTimeout(700);if(k===1)await skip();await p.screenshot({path:path.join(OUT,`book-${dev}-${k}.png`)});try{await p.click('.kbk-next',{timeout:2000})}catch(e){}}
  res[dev]={night:r.night,s,bk,errs};await ctx.close()}
 await b.close();console.log(JSON.stringify(res,null,1).slice(0,4000));
 const ok=Object.values(res).every(x=>x.night&&x.s.inLog>0&&x.bk.filler===0&&!x.bk.numbers.length&&!x.errs.length);console.log('TUANLUC-SHOTS2 '+(ok?'PASS':'FAIL'))})();
