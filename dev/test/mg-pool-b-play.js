/* ORDER THIN P1b browser test: every pooled engine of lane P1b (dan co dauho theu mua doi doden tc xa thq) opens from the built page, draws composed items through jnorep, no page error. node dev/test/mg-pool-play.js [index.html] */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:755,height:1000},deviceScaleFactor:1});const errs=[];pg.on('pageerror',e=>errs.push(String(e)));pg.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|file:\/\/|not supported/.test(m.text()))errs.push(m.text())});
 await pg.goto(URL);await pg.waitForFunction(()=>typeof KG82_ENG!=="undefined"&&typeof mgpOne==="function",null,{timeout:60000});
 const r=await pg.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const KINDS=["dan","co","dauho","theu","mua","doi","doden","tc","xa","thq"],o={};
  try{if(!S)S={}}catch(e){}
  for(const k of KINDS){o[k]={runs:0,throws:[],draws:0};for(let i=0;i<10;i++){const box=document.createElement("div");box.className="kgbox";box.style.width="640px";document.body.appendChild(box);
   const env={kind:k,lv:mgSet(k,{occ:"hoc",lv:i%5,d:0}).ease,hud:()=>{},end:x=>{}};let stop=null;try{stop=KG82_ENG[KG82_KIND[k].e](box,env);await sleep(120);o[k].runs++;if(!box.querySelector("canvas"))o[k].throws.push("no canvas")}catch(e){o[k].throws.push(e.message)}
   try{if(stop)stop()}catch(e){o[k].throws.push("stop "+e.message)}box.remove()}
   const H=JSON.parse(localStorage.getItem("ctm-nr")||"{}");o[k].draws=((H.L||[[]])[0]||[]).filter(x=>x.indexOf("mg:"+k+":")===0).length}
  return o});
 let fail=0;for(const k in r){const x=r[k];const ok=x.runs===10&&!x.throws.length&&x.draws>=1;if(!ok)fail++;console.log((ok?'ok  ':'FAIL')+' '+k+' '+JSON.stringify(x))}
 console.log(errs.length?'FAIL page errors '+JSON.stringify(errs.slice(0,5)):'ok   no page errors');await b.close();process.exit(fail||errs.length?1:0)})();
