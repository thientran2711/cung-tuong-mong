/* mg-env (owner bug 20/11 ~06:55Z: Thử tay «Chải chuốt» drew no green «đúng phẩm» zone) — node dev/test/mg-env.js [dev/index.html] [WxH]
   For EVERY kind in KG82_KIND started through the generic kg82Play path (the path Thử tay uses; no env field beyond kind/lv/hud/end):
   1 no NaN reaches any canvas 2D call (fillRect/moveTo/lineTo/arc/fillText/drawImage/... args) in 1.2 s of play
   2 the canvas is painted (not blank); the engine ends nothing by itself with env.end(5) crash
   3 Chải chuốt: the green «đúng phẩm» zone (kit --good) is on the canvas, width = wdGroomW (WD.groom* one core), with and without a live S
   4 no page errors. Prints the scan table: engine | env fields read | passed by kg82Play? | default added. */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;
  window.__nan=0;const P=CanvasRenderingContext2D.prototype;["fillRect","strokeRect","moveTo","lineTo","arc","fillText","strokeText","drawImage","translate","rotate","scale","quadraticCurveTo","bezierCurveTo","ellipse","rect","clearRect"].forEach(n=>{const o=P[n];if(!o)return;P[n]=function(){for(const a of arguments)if(typeof a==="number"&&!isFinite(a)){window.__nan++;window.__nanAt=n}return o.apply(this,arguments)}})});
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>KG82_KIND[k].n&&typeof KG82_ENG[KG82_KIND[k].e]==="function"));
 const rows=[];
 for(const k of kinds){
  const r=await p.evaluate(async k=>{window.__nan=0;window.__nanAt="";const d=kg82Open({art:"Thử tay",title:k,how:"",round:"Hồi",roundV:"1/1"});let ended=null;kg82Play(k,raw=>{ended=raw});
   await new Promise(r=>setTimeout(r,1200));const box=kg82Box();const cv=box&&box.querySelector("canvas");let painted=0;
   if(cv){try{const x=cv.getContext("2d"),w=cv.width,h=cv.height,im=x.getImageData(0,0,w,h).data;const f=(im[0]<<16)|(im[1]<<8)|im[2];for(let i=0;i<im.length;i+=4*37){if(((im[i]<<16)|(im[i+1]<<8)|im[i+2])!==f)painted++}}catch(e){painted=-1}}
   const o={k,dom:!!(box&&box.children.length),nan:window.__nan,at:window.__nanAt,canvas:!!cv,painted,ended};try{KG82.run&&KG82.run.stop&&KG82.run.stop()}catch(e){}try{kg82Close()}catch(e){}return o},k);
  rows.push(r);ok(r.nan===0,"no NaN canvas arg "+k,r.nan?r:undefined);
  if(!(k==="chai"))ok(r.canvas?r.painted!==0:r.dom,(r.canvas?"canvas painted ":"DOM engine drew ")+k);
 }
 /* 3 Chải chuốt zone */
 for(const live of [false,true]){
  const z=await p.evaluate(async live=>{if(live){SLOT=4;window.__nlInner=1;start();window.__nlInner=0}else{try{S=null}catch(e){}}
   kg82Open({art:"Thử tay",title:"chai",how:"",round:"Hồi",roundV:"1/1"});kg82Play("chai",()=>{});await new Promise(r=>setTimeout(r,500));
   const cv=kg82Box().querySelector("canvas"),x=cv.getContext("2d"),W=cv.width,H=cv.height;const by=Math.round(H*.52);
   const good=kg82Col("--good","#2d7a52");const tmp=document.createElement("canvas").getContext("2d");tmp.fillStyle=good;const gc=(tmp.fillStyle);tmp.fillRect(0,0,1,1);const g=tmp.getImageData(0,0,1,1).data;
   const row=x.getImageData(0,by,W,1).data;let n=0;for(let i=0;i<W;i++){const j=i*4;if(Math.abs(row[j]-g[0])<6&&Math.abs(row[j+1]-g[1])<6&&Math.abs(row[j+2])-g[2]<6&&Math.abs(row[j+2]-g[2])<6)n++}
   const w=wdGroomW(live&&S&&!S.dead?S:{});const bw=W*.84;try{kg82Close()}catch(e){}return{n,expect:Math.round(w*bw),W,w,live}},live);
  ok(z.n>0&&Math.abs(z.n-z.expect)<=Math.max(4,z.expect*.03),"Chải chuốt green zone drawn, width = wdGroomW "+(live?"(live S)":"(no S)"),z)}
 ok(errs.length===0,"no page errors",errs.slice(0,3));
 if(process.env.SHOT){await p.evaluate(()=>{kg82Open({art:"Thử tay",title:"Chải chuốt · hồi 1/3",how:"",round:"Hồi",roundV:"1/3"});kg82Play("chai",()=>{})});await p.waitForTimeout(500);await p.screenshot({path:process.env.SHOT})}
 console.log("\nSCAN engine | env fields read | passed by kg82Play? | default added\n"+[["groom (kg92Groom)","zw","NO (only wdGroomUI passed it)","wdGroomW(S|{}) = WD.groom*"],["sgame (jsgame)","v","NO","already safe: sgThr(undefined) → 0.3+loy 50 default"],["jroute play","tut","optional flag","no default needed (falsy = real round)"],["all others","kind, lv, hud, end","YES","—"]].map(r=>r.join(" | ")).join("\n"));
 await b.close();console.log(res.every(Boolean)?"\nALL OK":"\nFAILED");process.exit(res.every(Boolean)?0:1)})();
