/* lcframe-scan (OWNER-UI-C, 27/11, owner ~06:15Z): a LÃNH CUNG person must wear the kit LÃNH CUNG frame (frame-cold), never her old rank frame; the DEAD wear the frame of the rank she held (+ b/w).
   Every portrait of the seeded lãnh cung woman (R[0]) and dead woman (R[3]) in every context: table «context | portraits | frame srcs | FAIL». usage: node dev/test/lcframe-scan.js [fold|ipad]; exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');
require('./lib/fresh-build')();
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});let bad=0;
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){if(process.argv[2]&&process.argv[2]!==n)continue;const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  const R=liveRivals(true).filter(x=>!x.queen).slice(0,5);R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}});R[0].out=true;R[3].alive=false;window.__R=R;window.__bn=s=>String(s||"").split("?")[0].split("/").pop();
  window.__who=()=>[[R[0],"lc"],[R[3],"dead"]].map(([v,s])=>({s,face:__bn(pv(v).src),fig:__bn(figFor(v))}))});
 const ctx=[["Hậu cung · strip + card",()=>{tab="rv";PG.rv=0;render()}],["Hậu cung · card lãnh cung",()=>{tab="rv";render();const e=[...document.querySelectorAll(".pface")].find(x=>x.querySelector(".kst-lc"));if(e)e.click()}],
  ["Hậu cung · card người khuất",()=>{tab="rv";render();const e=[...document.querySelectorAll(".pface")].find(x=>x.querySelector(".kst-dead"));if(e)e.click()}],["Giao tình · Ân oán",()=>{tab="rel";render()}],["Giao tình · Phe phái",()=>{tab="fac";render()}],["Dư đồ",()=>{tab="go";render()}],
  ["Hành sự · sân khấu lãnh cung",()=>{const R=window.__R;S.place="lc";S.visit={k:"lc",people:[R[0],R[1]].map(rp),talked:false,tk:{},msg:"x"};tab="act";render()}]];
 console.log(`\n${n} ${w}x${h}\n${"context".padEnd(32)}| who  | portraits | frames found`);
 for(const [name,fn] of ctx){await p.evaluate(fn);await p.waitForTimeout(1300);
  const r=await p.evaluate(()=>{const out=[];for(const x of __who()){const seen=new Set();document.querySelectorAll("img").forEach(im=>{const s=__bn(im.getAttribute("src")||im.currentSrc);if(!s||(s!==x.face&&s!==x.fig)||im.getBoundingClientRect().width<4)return;
    const box=im.closest(".md,.pcp,.pface,.kin,.kfigbox")||im.parentElement;const root=im.closest(".pcp,.md")||box;const fr=[...root.querySelectorAll("img,[style*=background]")].map(e=>(e.getAttribute&&e.getAttribute("src")||"")+" "+(e.getAttribute("style")||"")).map(t=>(/frame-[a-z0-9-]+|rank-[a-z-]+/.exec(t)||[])[0]).filter(Boolean);
    const cl=(root.className||"")+" "+(root.closest("[class*=rk-]")||{className:""}).className;seen.add(JSON.stringify([...new Set(fr)]))+0;});
   out.push({s:x.s,n:seen.size,fr:[...seen]})}return out});
  for(const x of r){if(!x.n)continue;const frs=x.fr.join(" ; ");const rankFrame=/rank-/.test(frs);const bad1=(x.s==="lc"&&(rankFrame||(frs&&!/frame-cold/.test(frs))));if(bad1)bad++;
   console.log(`${name.padEnd(32)}| ${x.s.padEnd(4)} | ${String(x.n).padEnd(9)} | ${frs||"(none found)"}${bad1?"  FAIL":""}`)}}
 await p.close()}
await b.close();console.log(bad?`\nlcframe-scan: ${bad} FAIL`:"\nlcframe-scan: PASS");process.exit(bad?1:0)})();
