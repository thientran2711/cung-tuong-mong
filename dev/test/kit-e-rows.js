/* kit-e-rows (review/kit-e-rows) — node dev/test/kit-e-rows.js [dev/index.html]
   (1) kitColDot / kitColDots (KIT §60.1, E30 dresscode): read-only dot + family name, colour from DATA (table BAL.dc.fam or a ready object), roles, sizes, never a button, fits Fold 755x1000 + iPad 1180x820.
   (2) «thế lực nhà ±n» (HER own house only; rv-kit-e-rows: other houses never read as hers) (E25b «KR thế lực nhà», E28 «Cha bị hặc tội»): the word-mode hint (kitHint, Tâm cơ 0–2) names the clan power, rows keep it (jtd tdPowAdd family). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitColDot==='function'&&typeof kitHint==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});await p.waitForTimeout(1000);
  const r=await p.evaluate(()=>{const o={};const D={hong:{hex:"#e8a0a8",n:"Hồng"},do:{hex:"#c0392b",n:"Đỏ"}};
   const h=document.createElement("div");h.style.cssText="position:fixed;left:8px;top:8px;width:300px;z-index:99999;background:#fff";document.body.appendChild(h);
   h.innerHTML=kitColDot(D.do,{role:"main"})+kitColDot(D.hong,{role:"sec",size:"md"})+kitColDots([[D.do,"main"],[D.hong,"sec"]])+kitColDot("khongco");
   const d=[...h.querySelectorAll(".kcdot")];o.n=d.length;o.names=d.map(e=>e.querySelector("b").textContent);o.sizes=d.slice(0,2).map(e=>Math.round(e.querySelector("i").getBoundingClientRect().width));
   o.col=getComputedStyle(d[0].querySelector("i")).backgroundColor.length>0&&d[0].style.getPropertyValue("--cd");o.btn=h.querySelectorAll("button,a,[onclick]").length;o.roles=d.slice(0,2).map(e=>(e.querySelector("small")||{}).textContent);
   o.sep=h.querySelectorAll(".ksep").length;const old=BAL.dc;BAL.dc={fam:{vang:{hex:"#d4a017",n:"Vàng"}}};o.tbl=kitColDot("vang");BAL.dc=old;o.unknown=h.lastChild.querySelector("b").textContent;
   o.fit=h.scrollWidth<=h.clientWidth+1&&h.getBoundingClientRect().right<=innerWidth;h.remove();
   const H=x=>[0,1,2].map(l=>kitHint({x},null,l).hint);
   o.h={up:H("Khá chắc · thành: thế lực nhà +4 · hỏng: thế lực nhà -6"),dn:H("Chắc · thành: Danh +1 · hỏng: thế lực nhà -8")};
   /* law 6a: ANOTHER house (j55 wording: the house name comes BEFORE «thế lực») must never read as hers */
   o.neg=["nhà Hộ bộ thế lực +6","nhà nàng thế lực -6","nhà Lễ bộ thế lực +3","nhà Đại tướng quân thế lực +6"].map(t=>[0,1,2].map(l=>kitHint({x:"Khá chắc · thành: "+t},null,l).hint).join(" | "));
   o.own=kitHint({x:"Khá chắc · thành: Danh +1 · hỏng: thế lực nhà -10"},null,1).hint;
   const R=kaRows(kaModelStr("Khá chắc · thành: thế lực nhà +4 · hỏng: thế lực nhà -6"));o.rows={duoc:R.duoc.map(x=>kaPlain(x.h)),mat:R.mat.map(x=>kaPlain(x.h))};return o});
  ok(r.n===5&&r.names.join()==="Đỏ,Hồng,Đỏ,Hồng,khongco",`${tag} kitColDot(s): five dots, names shown (unknown key → its key as name)`,r.names);
  ok(r.sizes[0]===12&&r.sizes[1]===16,`${tag} sizes sm 12 / md 16`,r.sizes);ok(r.roles.join()==="chính,phụ",`${tag} roles chính / phụ`,r.roles);ok(r.btn===0,`${tag} read-only: no button / link`,r.btn);
  ok(/vàng/i.test(r.tbl)&&/d4a017/i.test(r.tbl)&&/Vàng/.test(r.tbl),`${tag} colour read from the BAL.dc.fam table`);ok(r.sep===1,`${tag} kitColDots: one separator between two dots`,r.sep);ok(r.fit,`${tag} fits the row / screen`);
  ok(r.h.up.every(t=>/Thế lực nhà \+/.test(t)),`${tag} word mode: «thế lực nhà» named at every level`,r.h.up);ok(r.h.dn.slice(1).every(t=>/Thế lực nhà −/.test(t)),`${tag} word mode: a fail «thế lực nhà −8» is named (levels 1–2; level 0 never says «hỏng thì», by design)`,r.h.dn);
  ok(r.neg.every(t=>!/nhà ngươi|thế lực nhà ngươi|vững|sút/.test(t)&&/quyền thần/.test(t)),`${tag} negative: another house («nhà Hộ bộ / nàng / Lễ bộ / Đại tướng quân thế lực ±n») never reads as HER house (neutral «thế các nhà quyền thần đổi thay»)`,r.neg);
  ok(/Thế lực nhà −/.test(r.own),`${tag} positive: E28 wording «thế lực nhà −10» still reads as hers`,r.own);
  ok(r.rows.duoc.join()==="thế lực nhà +4"&&r.rows.mat.join()==="thế lực nhà -6",`${tag} rows keep it (Được / Mất)`,r.rows);ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2))}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
