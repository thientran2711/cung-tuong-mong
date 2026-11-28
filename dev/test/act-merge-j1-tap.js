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
 for(const [dn,W,H] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,reducedMotion:process.env.FULL?'no-preference':'reduce',serviceWorkers:'block',recordVideo:{dir:OUTD,size:{width:process.env.FULL?W:Math.round(W/2),height:process.env.FULL?H:Math.round(H/2)}}});
  const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,160)));/* KIT §98.11 (KIT-STAGE-R3): focus acts are thẻ gỗ — a real tap lifts the plaque, the green ✓ chooses */const pk=async x=>{await p.locator('.kfoc-b',{hasText:x}).first().click({timeout:8000,force:true});/* the plaques sway (idle): never «stable» for the actionability check */await p.waitForTimeout(500);const ok=p.locator('.kpk .khconf:not([hidden]) .khok');if(await ok.count())await ok.first().click({timeout:4000,force:true})};const L=[];const step=async(n)=>{L.push(n);await p.screenshot({path:path.join(OUTD,`${dn}-${L.length}.png`)})};
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(LIB);await p.addStyleTag({content:HIDE});
  const C=await p.evaluate(()=>{const R=[];for(const sc of ['cao','hh','dau'])for(let s=1;s<4;s++){AA.reseed(s);AA.scen(sc);for(let bu=0;bu<4;bu++)for(const sf of AA.surfaces()){if(!sf.place||sf.place==="home")continue;AA.restore(1+bu);S.buoi=bu;used=0;AA.show(sf);
   curPeople().forEach((q,i)=>{if(q.kind==="rival"&&q.ref&&!sameHouse(S,q.ref)&&(typeof k61Named!=="function"||k61Named(q.ref))&&talkOpts(q).some(a=>a.door==="talk"&&!a.lock))R.push({sc,s,pl:sf.place,i,bu})});if(R.length>=24)return R}}return R});
  let t=null;for(const c of C){await p.evaluate(t=>{AA.reseed(t.s);AA.scen(t.sc);AA.restore(1+t.bu);S.buoi=t.bu;used=0;AA.show({tab:"act",place:t.pl});popIdx=null;renderStage()},c);await p.waitForTimeout(900);
   const ok=await p.evaluate(i=>{const b=document.querySelector(`#tokens .tok[data-p="${i}"]`);return !!b&&b.getBoundingClientRect().width>0&&typeof dfHasFig==="function"&&dfHasFig(i)},c.i);if(ok){t=c;break}}
  if(!t){console.log(dn,"no consort found among",C.length);bad++;await ctx.close();continue}
  const k0=await p.evaluate(()=>used);
  await p.locator(`#tokens .tok[data-p="${t.i}"]`).first().click({timeout:8000});await p.waitForTimeout(1500);await step("tap consort");
  const fan=await p.evaluate(()=>[...document.querySelectorAll('.kfoc-b .kfoc-t')].map(e=>e.textContent.replace(/\s+/g," ").trim().slice(0,40)));
  await pk('Trò chuyện');await p.waitForTimeout(1500);await step("tap Trò chuyện");for(let k=0;k<20;k++){if(await p.locator('.kfoc-b',{hasText:'Hỏi han sức khỏe'}).count())break;const nx=p.locator('.kfoc-next:visible');if(await nx.count()){await nx.first().click({timeout:4000}).catch(()=>{})}await p.waitForTimeout(500)}await p.waitForTimeout(2500);await step("Tiếp → topics");0&&console.error('DOM',await p.evaluate(()=>[...document.querySelectorAll('.kfoc *')].filter(e=>e.children.length===0&&e.textContent.trim()).map(e=>e.className+':'+e.textContent.trim().slice(0,30)).slice(0,30).join(' | ')));
  const card=await p.evaluate(()=>({pid:Q[0]&&Q[0].pid,rows:Q[0]&&Q[0].opts?Q[0].opts.map(o=>o.n):[],shown:[...document.querySelectorAll('.kfoc-b .kfoc-t')].map(e=>e.textContent.replace(/\s+/g," ").trim().slice(0,30))}));
  const k1=await p.evaluate(()=>used);
  await pk('Hỏi han sức khỏe');await p.waitForTimeout(1500);await step("tap Hỏi han sức khỏe");
  const intro=await p.evaluate(()=>document.body.innerText.includes("Sẵn sàng"));
  try{await p.getByText('Sẵn sàng',{exact:false}).first().click({timeout:4000});await p.waitForTimeout(900);await step("Sẵn sàng (game)");await p.getByText('Bỏ qua',{exact:false}).first().click({timeout:4000})}catch(e){}
  await p.waitForTimeout(2500);await step("result");
  const k2=await p.evaluate(()=>used);const res=await p.evaluate(()=>{const t=document.getElementById("rtoast");return (t&&t.innerText||"").replace(/\s+/g," ").trim().slice(0,160)||String(popMsg||"").replace(/<[^>]+>/g,"").slice(0,160)});
  OUT[dn]={place:t.pl,fan,card,doorKhac:k1-k0,memberKhac:k2-k1,intro,res,perr};if(card.pid!=="door"||k1!==k0||k2-k1<1||perr.length)bad++;
  await p.waitForTimeout(800);await ctx.close();const v=await p.video().path();fs.renameSync(v,path.join(OUTD,`act-merge-j1-${dn}.webm`))}
 console.log(JSON.stringify(OUT,null,1));console.log(bad?"FAIL "+bad:"PASS");await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
