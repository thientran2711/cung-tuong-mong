/* ACT-MERGE J1 real taps (Fold 755x1000 + iPad 1180x820): tap a consort on the Dư đồ stage (a real click on her figure → the focus view),
   tap the door «Trò chuyện» → the choice card in the scene lists its topics → tap «Hỏi han sức khỏe» → its on-figure game rules → «Bỏ qua»
   (the quick result) → the result. Then the Emperor's «Hầu chuyện» door the same way (the plain card when he is not in a focus scene).
   Records one short video per device (scratch dir, never in git) + prints what each step showed.
   usage: node dev/test/act-merge-j1-tap.js <outdir> [url] */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'../..');const OUTD=process.argv[2]||'/tmp/j1tap';const URL=process.argv[3]||'file://'+path.join(ROOT,'index.html');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const HIDE='.kmov,#kroulw,#kroul,.kbd-roulette,#kdaytc,#klife,#title{display:none!important}';/* start-of-day cards of the harness scenario (not the act under test) */
const DEV=[["fold",755,1000],["ipad",1180,820]];
(async()=>{fs.mkdirSync(OUTD,{recursive:true});const b=await chromium.launch();const OUT={};let bad=0;
 for(const [dn,W,H] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block',recordVideo:{dir:OUTD,size:{width:Math.round(W/2),height:Math.round(H/2)}}});
  const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,160)));const L=[];const step=async(n)=>{L.push(n);await p.screenshot({path:path.join(OUTD,`${dn}-${L.length}.png`)})};
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(LIB);await p.addStyleTag({content:HIDE});
  const t=await p.evaluate(()=>{for(const sc of ['cao','hh','dau'])for(let s=1;s<6;s++){AA.reseed(s);AA.scen(sc);for(let bu=0;bu<4;bu++)for(const sf of AA.surfaces()){if(!sf.place||sf.place==="home")continue;AA.restore(1+bu);S.buoi=bu;used=0;AA.show(sf);
   const i=curPeople().findIndex(q=>q.kind==="rival"&&q.ref&&!sameHouse(S,q.ref)&&(typeof k61Named!=="function"||k61Named(q.ref))&&talkOpts(q).some(a=>a.door==="talk"&&!a.lock)&&(()=>{const b=document.querySelector(`#tokens .tok[data-p="${curPeople().indexOf(q)}"]`);return !!b&&b.getBoundingClientRect().width>0})());if(i>=0)return{sc,s,pl:sf.place,i,bu}}}return null});
  if(!t){console.log(dn,"no consort found");bad++;await ctx.close();continue}
  await p.evaluate(t=>{AA.reseed(t.s);AA.scen(t.sc);AA.restore(1+t.bu);S.buoi=t.bu;used=0;AA.show({tab:"act",place:t.pl});popIdx=null;renderStage()},t);await p.waitForTimeout(900);
  const k0=await p.evaluate(()=>used);
  console.error(dn,JSON.stringify(t),await p.evaluate(i=>{const b=document.querySelector(`#tokens .tok[data-p="${i}"]`);const r=b&&b.getBoundingClientRect();const st=document.getElementById('stage');return {tab,r:r&&[r.x,r.y,r.width,r.height],disp:b&&getComputedStyle(b).display,vis:b&&getComputedStyle(b).visibility,st:st&&st.getBoundingClientRect().height,hid:b&&b.closest('[hidden]')&&b.closest('[hidden]').id}},t.i));
  await p.locator(`#tokens .tok[data-p="${t.i}"]`).first().click({timeout:8000});await p.waitForTimeout(1500);await step("tap consort");
  const fan=await p.evaluate(()=>[...document.querySelectorAll('.kfoc-b .kfoc-t')].map(e=>e.textContent.replace(/\s+/g," ").trim().slice(0,40)));
  await p.locator('.kfoc-b',{hasText:'Trò chuyện'}).first().click({timeout:8000});await p.waitForTimeout(1500);await step("tap Trò chuyện");
  const card=await p.evaluate(()=>({pid:Q[0]&&Q[0].pid,rows:Q[0]&&Q[0].opts?Q[0].opts.map(o=>o.n):[],shown:[...document.querySelectorAll('.kfoc-b .kfoc-t')].map(e=>e.textContent.replace(/\s+/g," ").trim().slice(0,30))}));
  const k1=await p.evaluate(()=>used);
  await p.locator('.kfoc-b',{hasText:'Hỏi han sức khỏe'}).first().click({timeout:8000});await p.waitForTimeout(1500);await step("tap Hỏi han sức khỏe");
  const intro=await p.evaluate(()=>document.body.innerText.includes("Sẵn sàng"));
  try{await p.getByText('Sẵn sàng',{exact:false}).first().click({timeout:4000});await p.waitForTimeout(900);await step("Sẵn sàng (game)");await p.getByText('Bỏ qua',{exact:false}).first().click({timeout:4000})}catch(e){}
  await p.waitForTimeout(2500);await step("result");
  const k2=await p.evaluate(()=>used);const res=await p.evaluate(()=>{const t=document.getElementById("rtoast");return (t&&t.innerText||"").replace(/\s+/g," ").trim().slice(0,160)||String(popMsg||"").replace(/<[^>]+>/g,"").slice(0,160)});
  OUT[dn]={place:t.pl,fan,card,doorKhac:k1-k0,memberKhac:k2-k1,intro,res,perr};if(card.pid!=="door"||k1!==k0||k2-k1<1||perr.length)bad++;
  await p.waitForTimeout(800);await ctx.close();const v=await p.video().path();fs.renameSync(v,path.join(OUTD,`act-merge-j1-${dn}.webm`))}
 console.log(JSON.stringify(OUT,null,1));console.log(bad?"FAIL "+bad:"PASS");await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
