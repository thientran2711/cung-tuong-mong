/* pckey-scan (OWNER-UI-C, 27/11): person-card family (Phi tần · Nam nhân · Cung nhân · Hoàng tự, living + lãnh cung + dead): are the relation rows (.kpkey) fully above the card's bottom fade WITHOUT scroll?
   usage: node dev/test/pckey-scan.js [fold|ipad] [inject.js]  ; table «card | portrait w | key bottom | card bottom | visible» ; exit 1 on any hidden. */
const path=require('path'),fs=require('fs');const {chromium}=require('playwright');
const INJ=process.argv[3]?fs.readFileSync(process.argv[3],'utf8'):'';
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});let bad=0;
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){if(process.argv[2]&&process.argv[2]!==n&&process.argv[2]!=='all')continue;const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const R=liveRivals(true).filter(x=>!x.queen).slice(0,6);R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}});R[0].out=true;R[3].alive=false;tab="rv";PG.rv=0;render()});
 console.log(`\n${n} ${w}x${h}\n${"card".padEnd(30)}| portrait w | key bottom | card bottom | rows visible`);
 const sets=[["Phi tần",()=>{tab="rv";PG.rv=0;render()}],["Nam nhân",()=>{tab="rv";render();const t=[...document.querySelectorAll("button,.tab,.sub")].find(e=>/^Nam nhân/.test((e.textContent||"").trim()));if(t)t.click()}],["Cung nhân",()=>{tab="rv";render();const t=[...document.querySelectorAll("button,.tab,.sub")].find(e=>/^Cung nhân/.test((e.textContent||"").trim()));if(t)t.click()}],["Hoàng tự",()=>{tab="kid";render()}]];
 for(const [nm,fn] of sets){await p.evaluate(fn);await p.waitForTimeout(700);
  const N=await p.evaluate(()=>document.querySelectorAll(".pface").length);
  for(let i=0;i<Math.min(N,12);i++){await p.evaluate(i=>document.querySelectorAll(".pface")[i].click(),i);await p.waitForTimeout(450);if(INJ){await p.evaluate(INJ);await p.waitForTimeout(250)}
   const r=await p.evaluate(()=>{const pc=document.querySelector(".pc.kpwide");if(!pc)return null;const k=pc.querySelector(":scope > .pcl > .kpkey");if(!k||/Người lạ/.test(pc.textContent.slice(0,80))&&!k.textContent.trim())return{skip:1};
    const pb=pc.getBoundingClientRect().bottom,kb=k.getBoundingClientRect().bottom;const nm=(pc.querySelector(".pcname")||{}).textContent||"";const cls=pc.querySelector(".kst-dead")?"dead":pc.querySelector(".kst-lc")?"lc":"live";
    return{nm:nm.trim().slice(0,14),cls,w:Math.round(pc.querySelector(".pcp").getBoundingClientRect().width),kb:Math.round(kb),pb:Math.round(pb),ok:kb<=pb-8}});
   if(!r||r.skip)continue;if(!r.ok)bad++;console.log(`${(nm+" · "+r.cls+" · "+r.nm).padEnd(30)}| ${String(r.w).padEnd(10)} | ${String(r.kb).padEnd(10)} | ${String(r.pb).padEnd(11)} | ${r.ok?"yes":"NO"}`)}}
 await p.close()}
await b.close();console.log(bad?`\npckey-scan: ${bad} hidden`:"\npckey-scan: PASS");process.exit(bad?1:0)})();
