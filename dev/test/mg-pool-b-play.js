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
 /* skin wiring (ORDER THIN P1b): no skin registered = today's art; two registered = the frame takes one of default/tx1/tx2 through mgskin:dan, fresh-first */
 const sk=await pg.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={none:[],got:[]};
  const open1=async()=>{KG82.preSkin=null;playArt({art:"Đàn",onDone(){}});await sleep(250);const d=document.getElementById("kg82");const r=d?(d.dataset.mgskin||"")+"/"+(d.dataset.mgpal||""):"no frame";try{kg82Close()}catch(e){}await sleep(80);return r};
  for(let i=0;i<3;i++)o.none.push(await open1());
  kitMgSkinAdd("dan","tx1",{name:"Thử một",pal:"ngoc"});kitMgSkinAdd("dan","tx2",{name:"Thử hai",pal:"kim"});
  for(let i=0;i<9;i++)o.got.push(await open1());delete KG82_SKINS.dan;return o});
 let fail=0;const okk=(c,m)=>{if(!c)fail++;console.log((c?'ok  ':'FAIL')+' '+m)};
 okk(sk.none.every(x=>x==="/son"),'skin: none registered = today\'s art + son buttons '+JSON.stringify(sk.none));
 okk(sk.got.every(x=>["/son","tx1/ngoc","tx2/kim"].includes(x))&&new Set(sk.got).size>=2,'skin: two registered = frame takes default/tx1/tx2 (>= 2 different in 9 opens) '+JSON.stringify(sk.got));
 for(const k in r){const x=r[k];const ok=x.runs===10&&!x.throws.length&&x.draws>=1;if(!ok)fail++;console.log((ok?'ok  ':'FAIL')+' '+k+' '+JSON.stringify(x))}
 console.log(errs.length?'FAIL page errors '+JSON.stringify(errs.slice(0,5)):'ok   no page errors');await b.close();process.exit(fail||errs.length?1:0)})();
