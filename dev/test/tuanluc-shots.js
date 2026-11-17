/* tuanluc-sync: (1) OLD SAVE: a save whose S.rt.open is 0 (the bug) or lost, with the old unlock line in its log, must NOT announce again;
   (2) shots of the BÁO notice (Lối riêng unlock) + the Tuần lục pages on Fold 755x1000 and iPad 1180x820 (DIRECT mode, logic + layout of the kit panel).
   usage: node dev/test/tuanluc-shots.js <outdir>   (shots go OUTSIDE git) */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const OUT=process.argv[2]||'/tmp';fs.mkdirSync(OUT,{recursive:true});
const HTML=path.resolve(__dirname,'../index.html');
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const res={};
 for(const [dev,w,h] of [['fold',755,1000],['ipad',1180,820]]){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.goto('file://'+HTML);await p.waitForTimeout(3000);
  const r=await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const o={};SLOT=3;const ti=document.getElementById('title');if(ti)ti.hidden=true;start();await sl(6000);try{document.getElementById('kroulw')&&document.getElementById('kroulw').remove()}catch(e){}Q.length=0;try{showModal()}catch(e){}render();
   /* old save A: T.open = 0 (bug), line in log → load → no new line */
   rtS().open=0;S.logs.unshift('<span class="ld">x</span><span class="pdl">Lòng ngươi bắt đầu nghĩ đến những lối khác ngoài con đường tranh sủng. Mục Hành sự có thêm nhóm «Lối riêng».</span>');
   const ser1=JSON.stringify(S);const cnt=()=>S.logs.filter(x=>/lối khác|ngoài con đường tranh sủng/.test(x)).length;
   const n0=cnt();for(let i=0;i<5;i++){tab='acts';render();try{rtCards()}catch(e){}}o.oldA=cnt()-n0;
   /* old save B: open lost (no key), line still in the log */
   delete S.rt.open;const n1=cnt();for(let i=0;i<5;i++){try{rtCards()}catch(e){}}o.oldB=cnt()-n1;
   /* fresh: open lost, no line → announced ONCE, then never again; shown as ONE BÁO */
   S.logs=S.logs.filter(x=>!/lối khác|ngoài con đường tranh sủng/.test(x));delete S.rt.open;delete (S.once||{}).rtOpen;S.lbAt=null;S.turn=0;
   S.tm96=S.tm96||{};try{menInit();for(const m of (S.men||[]).filter(x=>x.alive)){m.seen=1;m.tinh=20}}catch(e){}
   for(let i=0;i<6;i++){try{rtCards()}catch(e){}render()}await sl(50);o.fresh=cnt();o.q=Q.map(x=>x.t);o.bao=Q.filter(x=>/klbao/.test(x.cls||'')).length;return o});
  const skip=async()=>{for(let i=0;i<3;i++){const x=p.getByRole('button',{name:'Bỏ qua'});if(await x.count()&&await x.first().isVisible()){await x.first().click();await p.waitForTimeout(500)}}};
  await skip();await p.waitForTimeout(1500);await p.screenshot({path:path.join(OUT,`bao-${dev}.png`)});
  /* the week book */
  await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}render()});
  /* attribution: a stranger's deed + an elder's tip must not sit on HER page */
  const wb=await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const o={};try{
   const v=liveRivals(true).find(x=>!k61Named(x)&&x.rank>=4)||liveRivals(true).find(x=>!k61Named(x));const m=(S.men||[]).find(x=>x.alive&&!k61Named(x));
   if(v&&m)log(`${rkName(v)} ${v.name} báo với thị vệ rằng ${m.role||"Thị vệ"} ${m.name} lảng vảng ở Càn Ninh cung không có lệnh, bị đánh trượng, đuổi ra ngoại triều.`);
   const g=typeof elderBy==="function"&&elderBy("gt");if(g)log(`${g.call}: “Bước nhỏ, đầu cúi, tay đặt trước người. Người trên nhìn xuống, chỉ nên thấy sự nhu thuận.”`);
   o.stored=S.logs.slice(0,2).map(x=>x.replace(/<span class="ld">[^<]*<\/span>/,""));
   const d=wkBookData();const P=x=>(x.text||x).replace(/<[^>]+>/g,"");o.me=d.me.map(P);o.world=d.world.map(P);
   o.pages=d.persons.map(x=>[x.who===S?"ME":(x.who.call||x.who.name),x.blocks[0].facts.map(P)]);
   o.onMine=o.me.filter(t=>/báo thị vệ|Bước nhỏ/.test(t)).length;
   Q.length=0;dawn()}catch(e){o.err=String(e&&e.stack||e).slice(0,300)}await sl(900);return o});
  await p.waitForTimeout(500);await p.screenshot({path:path.join(OUT,`book-${dev}-1.png`)});
  for(let k=2;k<=5;k++){try{await p.click('.kbk-next',{timeout:2000})}catch(e){}await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,`book-${dev}-${k}.png`)})}
  res[dev]={...r,wb,errs};await ctx.close()}
 await b.close();console.log(JSON.stringify(Object.fromEntries(Object.entries(res).map(([k,x])=>[k,{oldA:x.oldA,oldB:x.oldB,fresh:x.fresh,bao:x.bao,onMine:x.wb&&x.wb.onMine,err:x.wb&&x.wb.err,errs:x.errs}]))));
 const ok=Object.values(res).every(x=>x.oldA===0&&x.oldB===0&&x.fresh===1&&x.bao<=1&&x.wb&&x.wb.onMine===0&&!x.wb.err&&!x.errs.length);console.log('TUANLUC-SHOTS '+(ok?'PASS':'FAIL'))})();
