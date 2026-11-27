/* kit-rows-b (review/kit-rows-b) — node dev/test/kit-rows-b.js [dev/index.html] [outdir]
   KP12 kaSent class precedence · KP15 reward shelf cap · KP17 kitEvArt never tags a picker · KP19 kitSteps · KP21 act-card parser (label strip, split)
   · K-PM-1 kitGameVs panes not stretched + setMood in flow. Fold 755x1000 + iPad 1180x820. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1});const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitStepList==='function'&&typeof kaRows==='function'&&typeof kitGameVs==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};
   /* KP12 */ o.k12=[kaSent('<b>Son phần giáng</b>',"n"),kaSent('<span class="g">Bạc -5</span>',"g"),kaSent('Sủng -2',"n")];
   /* KP19 */ const sh=document.createElement("div");sh.innerHTML=kitStepList([["done","Một"],["now","Hai","đợi 2 tuần"],["next","Ba"]]);o.k19=[...sh.querySelectorAll(".kchm")].map(e=>e.textContent);o.k19n=sh.querySelectorAll(".ksp-now,.ksp-done,.ksp-next").length;
   /* KP21 */ const row=h=>{const R=kaRows(kaModel(h));return Object.fromEntries(Object.entries(R).filter(([k,v])=>Array.isArray(v)).map(([k,v])=>[k,v.map(x=>kaPlain(x.h))]))};
   o.k21a=row('<span class="oc">Khá chắc</span><span class="kl">thành</span><span class="ef g">kèm: <span class="g">Chủ tin với Lan +3</span></span>');
   o.k21b=row('<span class="oc">Khá chắc</span><span class="kl">thành</span><span class="ef">Sủng +2, Chủ tin với Lan +3, Danh -1</span><span class="kl">hỏng</span><span class="ef r">Bạc -10, Đức -2</span>');
   /* KP13 */ {const R=kaRows(kaModelStr('Khá chắc · thành: Bạc -50, Sủng +2 · hỏng: không mất bạc'));o.k13=[R.mat.map(x=>kaPlain(x.h)+'|'+x.b),R.ton.length]}
   /* KP17 */ const pk={pid:"giftpick",t:"Chọn quà",opts:[{n:"A"},{n:"B"}]};try{kitEvArt(pk)}catch(e){}o.k17=pk.evId||"";
   /* KP15 */ try{kmReset()}catch(e){}document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());
   const items=Array.from({length:22},(_,i)=>({n:"Món số "+(i+1),tier:i%4,img:"img/kit/mo-ingot-silver.webp"}));kitReward({kind:"chest",title:"Phẩm phục Tần",from:"Nội vụ phủ",items});await sleep(700);
   const rv=document.querySelector("#kmrew .kmrew");if(rv){rv.querySelector(".kmbox")&&rv.querySelector(".kmbox").click();document.querySelector("#kmrew").click();await sleep(300);document.querySelector("#kmrew").click();await sleep(900)}
   const sf=document.querySelector("#kmrew .kmshelf");o.k15={tiles:sf?sf.querySelectorAll(".kmsh:not(.kmsh-more)").length:-1,more:sf&&sf.querySelector(".kmsh-more")?sf.querySelector(".kmsh-more").textContent:"",rows:document.querySelectorAll("#kmrew .kmrow").length,btn:(()=>{const t=document.querySelector("#kmrew .kmtake");if(!t)return null;const q=t.getBoundingClientRect();return q.bottom<=innerHeight+1&&q.top>=0})()};
   document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());try{kmReset()}catch(e){}
   /* K-PM-1 */ const box=document.createElement("div");box.className="kgbox";box.style.cssText="position:fixed;left:8px;right:8px;top:8px;z-index:9999;background:#fff";document.body.appendChild(box);
   const vs=kitGameVs({box,me:{name:"Ngươi",face:'<span class="md sm">Ta</span>'},opp:{name:"Lâm Tuyết Vi",face:'<span class="md sm">Vi</span>'},round:"Ván 2/3"});vs.me.innerHTML='<div style="height:260px">Bảng</div>';vs.setMood("opp","Nàng ấy đang cười");await sleep(200);
   const ph=s=>box.querySelector(".kgvs-"+s).getBoundingClientRect().height;o.vs={opp:Math.round(ph("opp")),me:Math.round(ph("me")),mood:box.querySelector(".kgvs-opp .kgvs-mood").hidden===false,moodIn:box.querySelector(".kgvs-opp").contains(box.querySelector(".kgvs-opp .kgvs-mood")),side:getComputedStyle(box.querySelector(".kgvs")).gridTemplateColumns.split(" ").length};
   if(location.search===""){}vs.destroy();box.remove();return o});
  ok(r.k12[0]!=="r"&&r.k12[1]==="g"&&r.k12[2]==="r",`${tag} KP12 class beats meaning, name never colours`,r.k12);
  ok(r.k19.join("")==="✓▸·"&&r.k19n===3,`${tag} KP19 kitStepList three states`,r.k19);
  ok(r.k21a.duoc&&r.k21a.duoc.join("|")==="Chủ tin với Lan +3"&&!JSON.stringify(r.k21a).includes("kèm:"),`${tag} KP21 label stripped`,r.k21a);
  ok(JSON.stringify(r.k21b.duoc)===JSON.stringify(["Sủng +2","Chủ tin với Lan +3"])&&r.k21b.mat.length===3,`${tag} KP21 split + routed`,r.k21b);
  ok(JSON.stringify(r.k13)===JSON.stringify([['Bạc -50|t','không mất bạc|b'],0]),`${tag} KP13 pay-on-success: Bạc under THÀNH, «không mất bạc» under BẠI`,r.k13);
  ok(r.k17==="","${tag} KP17 act picker not tagged".replace("${tag}",tag),r.k17);
  ok(r.k15.tiles<=8&&r.k15.rows>=22&&r.k15.btn!==false,`${tag} KP15 shelf capped, every item still listed, Nhận in view`,r.k15);
  ok(r.vs.mood&&r.vs.moodIn&&(r.vs.opp<r.vs.me||r.vs.side===1),`${tag} K-PM-1 pane not stretched, mood in flow`,r.vs);
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2));
  await ctx.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
