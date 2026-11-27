/* list-video (OWNER-UI-C, 27/11): the owner-ui-a list take, one mp4 per device: lãnh cung (pale, image only) → dead consort (b/w incl. frame) → dead man → dead kid → dead servant → stage lãnh cung.
   usage: node dev/test/list-video.js fold|ipad <outdir>   → <outdir>/list-<dev>.mp4 + still per scene (<outdir>/scene-<dev>-N.png, looked 3× before upload). Shots never go in git. */
const path=require('path'),fs=require('fs'),cp=require('child_process');const {chromium}=require('playwright');
require('./lib/fresh-build')();
const [,,DEV,OUT]=process.argv;const [W,H]=DEV==='fold'?[755,1000]:[1180,820];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});
const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir:OUT+'/rec-'+DEV,size:{width:W,height:H}}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();for(let j=0;j<8&&!(S.staff&&S.staff.length&&(S.men||[]).length);j++){localStorage.clear();start();for(let i=0;i<60&&isSrv();i++)start()}window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
 const R=liveRivals(true).filter(x=>!x.queen).slice(0,6);R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}});R[0].out=true;R[3].alive=false;window.__R=R;
 const m=(S.men||[])[0];if(m){try{k61Meet(m,'x',3)}catch(e){}m.alive=false}
 const k=mkKid("f",9);k.bt=S.turn-9*12;k.alive=false;S.kids.push(k);
 const s=S.staff[0];if(s){s.alive=false;S.dstaff=(S.dstaff||[]).concat([s]);S.staff=S.staff.filter(x=>x!==s)}});
let n=0;const shot=async()=>{await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/scene-${DEV}-${n++}.png`});await p.waitForTimeout(1200)};
const clickFace=async(sel)=>{for(let i=0;i<40&&sel&&!(await p.evaluate(s=>[...document.querySelectorAll(".pface "+s)].some(e=>e.getBoundingClientRect().width>4),sel));i++){await p.evaluate(()=>{const b=[...document.querySelectorAll("button")].filter(x=>/^[›»>]$/.test(x.textContent.trim())&&x.getBoundingClientRect().width>0);if(b.length)b[b.length-1].click()});await p.waitForTimeout(500)}
 await p.evaluate(sel=>{const e=[...document.querySelectorAll(".pface")].find(x=>sel?x.querySelector(sel):true);if(e)e.click()},sel)};
await p.evaluate(()=>{tab="rv";PG.rv=0;render()});await p.waitForTimeout(1200);
await clickFace(".kst-lc");await shot();                         // 0 lãnh cung pale
await clickFace(".kst-dead");await shot();                        // 1 dead consort
await p.evaluate(()=>{tab="men";render()});await p.waitForTimeout(900);await clickFace(".kst-dead");await shot(); // 2 dead man
await p.evaluate(()=>{tab="kid";render()});await p.waitForTimeout(900);await clickFace(".kst-dead");await shot();  // 3 dead kid
await p.evaluate(()=>{tab="staff";render()});await p.waitForTimeout(900);await clickFace(".kst-dead");await shot(); // 4 dead servant
await p.evaluate(()=>{const R=window.__R;S.place="lc";S.visit={k:"lc",people:[R[0],R[1]].map(rp),talked:false,tk:{},msg:"x"};tab="act";render()});await shot(); // 5 stage lãnh cung
const v=p.video();await ctx.close();await v.saveAs(`${OUT}/raw-${DEV}.webm`);
const dur=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',`${OUT}/raw-${DEV}.webm`]).toString();
cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss','2.2','-i',`${OUT}/raw-${DEV}.webm`,'-an','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-preset','fast',`${OUT}/list-${DEV}.mp4`]);
console.log('scenes',n,'secs',dur.toFixed(1),'errors',JSON.stringify(errs));await b.close()})();
