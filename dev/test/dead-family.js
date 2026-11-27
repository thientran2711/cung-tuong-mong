/* dead-family (OWNER-UI-C, 27/11, RV-172 / MAIN 178): EVERY portrait surface of a DEAD person (consort, man, kid, servant) × Fold + iPad: strip face (visible), open card portrait, record rows in «Thông tin» (.kdrec), the word «Đã khuất» (never «Đã mất») in the panel.
   Table «surface | found | state | record | word | FAIL». usage: node dev/test/dead-family.js ; exit 1 on any FAIL */
const path=require('path');const {chromium}=require('playwright');
require('./lib/fresh-build')();
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});let bad=0;
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();for(let j=0;j<8&&!(S.staff&&S.staff.length&&(S.men||[]).length);j++){localStorage.clear();start();for(let i=0;i<60&&isSrv();i++)start()}window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const R=liveRivals(true).filter(x=>!x.queen).slice(0,6);R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}});R[3].alive=false;
  const m=(S.men||[])[0];if(m){try{k61Meet(m,'x',3)}catch(e){}m.alive=false}
  const k=mkKid("f",9);k.bt=S.turn-9*12;k.alive=false;S.kids.push(k);
  const s=S.staff[0];if(s){s.alive=false;S.dstaff=(S.dstaff||[]).concat([s]);S.staff=S.staff.filter(x=>x!==s)}});
 console.log(`\n${n} ${w}x${h}\n${"surface".padEnd(26)}| strip face | card portrait | record in Thông tin | word`);
 for(const [name,tb] of [["Phi tần (consort)","rv"],["Nam nhân (man)","men"],["Hoàng tự (kid)","kid"],["Cung nhân (servant)","staff"]]){
  await p.evaluate(t=>{tab=t;PG[t]=0;render()},tb);await p.waitForTimeout(600);
  for(let i=0;i<40&&!(await p.evaluate(()=>[...document.querySelectorAll(".pface .kst-dead")].some(e=>e.getBoundingClientRect().width>4)));i++){await p.evaluate(()=>{const b=[...document.querySelectorAll("button")].filter(x=>/^[›»>]$/.test(x.textContent.trim())&&x.getBoundingClientRect().width>0);if(b.length)b[b.length-1].click()});await p.waitForTimeout(250)}
  const r=await p.evaluate(async()=>{const face=[...document.querySelectorAll(".pface .kst-dead")].find(e=>e.getBoundingClientRect().width>4);const stripOk=!!face&&/grayscale/.test(getComputedStyle(face).filter+getComputedStyle(face.querySelector("img")||face).filter);
   if(!face)return{strip:null};face.closest(".pface").click();await new Promise(r=>setTimeout(r,900));const pc=document.querySelector(".pc");const pcp=pc&&pc.querySelector(".pcp.kst-dead");const rec=pc&&pc.querySelector(".kdrec");
   const vis=e=>!!e&&e.getBoundingClientRect().width>4&&e.getBoundingClientRect().height>4;const txt=(document.getElementById("panel")||document.body).innerText;
   return{strip:stripOk,card:!!pcp&&/grayscale/.test(getComputedStyle(pcp).filter),rec:vis(rec)&&/(Hưởng dương|Hưởng thọ)/.test(rec.textContent)&&/Nguyên do/.test(rec.textContent),mat:/Đã mất|đã mất\b(?! lòng)/.test(txt.replace(/Con đã mất\./g,"")),khuat:/Đã khuất|đã khuất/.test(txt)}});
  const ok=r.strip&&r.card&&r.rec&&!r.mat&&r.khuat;if(!ok)bad++;console.log(`${name.padEnd(26)}| ${String(r.strip).padEnd(10)} | ${String(r.card).padEnd(13)} | ${String(r.rec).padEnd(19)} | ${r.mat?"«mất» FOUND":(r.khuat?"khuất":"-")}${ok?"":"  FAIL"}`)}
 if(errs.length){bad++;console.log("page errors",errs.slice(0,3))}await p.close()}
await b.close();console.log(bad?`\ndead-family: ${bad} FAIL`:"\ndead-family: PASS");process.exit(bad?1:0)})();
