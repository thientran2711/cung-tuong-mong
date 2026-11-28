/* ACT-MERGE J5c whole-group scan (khuê các): on EVERY kc origin (đại tiểu thư roads, dân nữ, ngoại quốc), over every place, which card names each kc door rule catches.
   Checks: (1) every TWIN pair (card.tw) gets ONE door key (folds together); (2) no kc rule catches a card that has no partner on the road (a lone single act such as
   «Hầu <thầy>», «Hầu cha ở thư phòng», «Hầu phụ vương nghe chính sự» stays its own button). Usage: node dev/test/act-merge-j5-kcscan.js [url] */
const fs=require("fs"),path=require("path");const ROOT=path.resolve(__dirname,"../..");const URL=process.argv[2]||"file://"+path.join(ROOT,"index.html");
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function skip(p){for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const r=document.getElementById('kroul');if(r&&r.isConnected){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 1}}return 0});if(!n)break;await sleep(700)}}
/* settle: close story / notice dialogs and the life roulette so the game screen is free */
async function settle(p,max=25){for(let i=0;i<max;i++){const n=await p.evaluate(()=>{const vis=e=>e&&e.isConnected&&!e.hidden&&getComputedStyle(e).display!=='none';
  const k=document.getElementById('kload');if(k){k.remove();return 'kload'}const r=document.getElementById('kroul');if(vis(r)){const x=[...r.querySelectorAll('button')].find(y=>/Bỏ qua/.test(y.textContent));if(x){x.click();return 'kroul'}}
  const L=document.getElementById('klife');if(vis(L)){const x=[...L.querySelectorAll('button')].find(y=>/Tiếp/.test(y.textContent));if(x){x.click();return 'klife'}}
  const m=document.getElementById('modal');if(vis(m)){const B=[...m.querySelectorAll('button')].filter(b=>!b.disabled&&b.offsetParent);const x=B.find(b=>/^(Tiếp|Đáp ứng|Đã rõ|Được|Vâng|Bắt đầu|Đóng|Xong)/.test(b.textContent.trim()))||B.find(b=>b.matches('.opts button, .opt, button.kpk-b'/* K-OPTS-READER: + kitPick plaques */))||B[B.length-1];if(x){__koptGo(x);return 'modal:'+x.textContent.trim().slice(0,30)}}
  return 0});if(!n)return;await sleep(900)}}
async function kcStart(p,og){for(let tr=0;tr<4;tr++){
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});
  await p.evaluate(()=>{const t=document.querySelector('#slots button[data-new="1"]');if(t)t.click()});await sleep(2000);await skip(p);
  await p.evaluate(og=>{for(let i=0;i<500&&S.origin.k!==og;i++){try{store.set(NL_KEY,null)}catch(e){}start()}},og);await sleep(600);await skip(p);
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(700);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1500);
  if(await p.evaluate(()=>{try{return isKc()}catch(e){return false}})){await settle(p);return true}}return false}
(async()=>{const {chromium}=require("playwright");const b=await chromium.launch();const p=await(await b.newContext({viewport:{width:755,height:1000},serviceWorkers:"block"})).newPage();await require("./lib/kopts").install(p);
const perr=[];p.on("pageerror",e=>perr.push(e.message.slice(0,200)));
await p.goto(URL,{waitUntil:"load",timeout:0});await p.waitForFunction(()=>typeof start==="function",null,{timeout:0});await sleep(2500);
const OG=await p.evaluate(()=>[...new Set(["dtq","cnv","ch","thd","td",...Object.keys(typeof KC2K==="object"?KC2K:{})])]);let fails=0;
for(const og of OG){if(!await kcStart(p,og)){console.log("skip",og,"(no kc start)");continue}
 const o=await p.evaluate(()=>{const PL=[null,...Object.keys(KCPL)];const C={};
  for(const pl of PL){S.buoi=0;used=0;S.suc=90;S.bac=500;if(pl){S.place=pl;S.kc.fam.forEach(m=>{S.kc.at[m.id]=pl});S.kc.at.ftm=pl}deal();deck.forEach(a=>{if(a&&a.n)C[a.n]={n:a.n,tw:a.tw}})}
  const L=Object.values(C);const R=DOOR.D.filter(r=>r.roads.includes("kc"));const key=a=>{for(const r of R){const k=r.key?r.key(a,L):(r.re.test(a.n)?r.n:null);if(k)return k}return null};
  const K={};L.forEach(a=>{const k=key(a);if(k)(K[k]=K[k]||[]).push(a.n)});
  const twin=L.filter(a=>a.tw&&C[a.tw]).map(a=>({a:a.n,b:a.tw,ka:key(a),kb:key(C[a.tw])}));
  return{K,twin,lone:Object.entries(K).filter(([k,v])=>v.length<2)}});
 for(const t of o.twin){if(!t.ka||t.ka!==t.kb){fails++;console.log("FAIL",og,"twin not one door:",JSON.stringify(t))}}
 for(const [k,v] of o.lone){fails++;console.log("FAIL",og,"rule catches a lone card:",k,"←",v.join(" | "))}
 console.log("ok  ",og,Object.entries(o.K).map(([k,v])=>k+" ("+v.length+")").join(", "))}
if(perr.length){fails++;console.log("FAIL page errors",perr.slice(0,3))}
await b.close();console.log(fails?"FAILED "+fails:"ALL OK");process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(1)});
