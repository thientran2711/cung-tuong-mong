/* review/odds-meter-back (MAIN ROOT-61/62, law 3 + law 11): a CERTAIN loss of an option ("mất: …", or "hỏng: …" on an option with no roll)
   must stand in the card's Tốn row (and a worded GAIN in Được) (KIT 6.2 kitOptFinal) — never «Tốn: không» with the loss folded behind «!».
   Scans every PEND dialog as the game shows it (events: cost mode, the loss comes from the hint's «nhưng …»; act pickers: full
   act-card rows) — plus approachOne visits and a fixed set of worded lines (the j95s picker «Đi một mình» form).
   usage: node dev/test/opt-loss-ton.js <index.html url> [WxH,…]   (default 755x1000,1180x820) — exit 1 when a card with a certain loss shows «Tốn: không» */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,PAGE,SZS]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SZS||"755x1000,1180x820").split(",")){const [W,H]=sz.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitHint==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name);await sleep(1500);
  const R=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());
   const md=document.getElementById('modal');const close=()=>{Q.length=0;md.hidden=true};close();S.bac=300;S.suc=80;render();
   const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();const res={cards:0,sureLoss:0,tonKhong:[],ok:0,gain:0,duocKhong:[]};
   /* a certain loss in the option's own line: a "mất:" item, or "hỏng:" with no odds word; in cost mode: the hint's «nhưng …» */
   const sureLoss=o=>{try{const M=kitOptModel(o);if(M.items.some(it=>it.l==="hỏng"&&!M.odds&&kitHintSign(it.p,it.l)<0))return true;const raw=String(o.j67||dilLineRaw(o)||"");if(/(^|·\s*)mất\s*:/i.test(kaPlain(raw))&&!/mất\s*:\s*không\b/i.test(kaPlain(raw)))return true}catch(e){}return false};
   const audit=(where,m,full)=>{if(!m||!m.opts)return;m.opts.forEach((o,i)=>{const bt=md.querySelector(`#mb .opt[data-m="${i}"]`);if(!bt||!bt.querySelector('.kr-ton'))return;res.cards++;
     const hidden=bt.classList.contains("khideout");
     /* the same for a GAIN: a worded gain (hint part before «nhưng», or a good item of the line) never reads «Được: không» */
     {let g=false;if(hidden){const h=T((bt.querySelector('.kr-hint .krv')||{}).textContent).split(/\s*;\s*nhưng\s+|\s+nhưng\s+/)[0].trim();g=!!h&&!/^(chẳng được gì|không được mất gì|không|chưa rõ)\.?$/i.test(h)}
      else{try{const M=kitOptModel(o);g=M.items.some(it=>(it.l==="thành"||it.l==="ngay")&&!/^(chọn rồi xem kết quả ở bước sau|không được mất gì|không ra manh mối)$/i.test(it.p)&&kitHintSign(it.p,it.l)>0)}catch(e){}}
      if(g){res.gain++;const dv=T((bt.querySelector('.kr-duoc .krv, .kr-thanh .krv')||{}).textContent);if(!dv||/^không$/.test(dv))res.duocKhong.push([where+(full?" (full)":""),T(o.n).slice(0,36),dv||"(empty)"])}}let sl=false;if(hidden){const h=T((bt.querySelector('.kr-hint .krv')||{}).textContent);sl=/(^|;\s*)nhưng\s/.test(h)}else sl=sureLoss(o);if(!sl)return;res.sureLoss++;
     const ton=T((bt.querySelector('.kr-ton .krv')||{}).textContent);if(/^không$/.test(ton)||!ton)res.tonKhong.push([where+(full?" (full)":""),T(o.n).slice(0,36),ton||"(empty)",[...bt.querySelectorAll(".kb > .kr")].map(r=>r.className.replace(/^kr /,"")+"="+T(r.textContent).slice(0,50)).join(" / ")]);else res.ok++})};
   const show=async(m,full)=>{close();if(full)m.showOut=true;Q.push(m);m.must=1;showModal();await Wt(150)};
   const ids=Object.keys(PEND);const PP={night2:{s:5},night1:{q:3,vp:0},tt3:{o:40},ch2:{o:40},thd1:{o1:40,o2:50}};
   for(const full of [false])/* as the GAME shows each dialog (events in cost mode, act pickers in full mode); a forced full mode of an event is not a real display */for(const id of ids){try{const d=mkP(id,PP[id]||{});if(!d||!d.o||!d.o.length)continue;close();pushDil(d,id);const m=Q[0];Q.length=0;await show(m,full);audit("PEND:"+id,Q[0],full)}catch(e){}}
   const seen=new Set();for(let i=0;i<300;i++){try{close();const m=approachOne();if(!m||!m.opts)continue;const k=T(m.t).slice(0,30)+"/"+T((m.opts[0]||{}).n).slice(0,20);if(seen.has(k))continue;seen.add(k);await show(m,false);audit("AP:"+k,Q[0],false)}catch(e){}}
   const X=["thành: việc ngươi làm bên ngoài được giữ kín · mất: không ai thấy giùm ngươi","mất: họ biết việc ngươi làm","tốn: Bạc -5 · mất: Danh -1","thành: Danh +2 · mất: Sủng -1"];
   await show({t:"Thử",act:1,opts:X.map((x,i)=>({n:"Dòng "+i,fx:{},x,go:()=>{}}))},false);audit("LINES",Q[0],false);close();return res});
  const fail=R.tonKhong.length>0||R.duocKhong.length>0||errs.length>0;if(fail)bad++;
  console.log(`${sz}: option cards ${R.cards} · with a certain loss ${R.sureLoss} · loss in Tốn ${R.ok} · «Tốn: không» with a certain loss ${R.tonKhong.length} · with a worded gain ${R.gain} · «Được: không» with a gain ${R.duocKhong.length} · page errors ${errs.length} → ${fail?"FAIL":"PASS"}`);
  for(const x of R.tonKhong.slice(0,25))console.log("  Tốn: không:",x.join(" | "));for(const x of R.duocKhong.slice(0,25))console.log("  Được: không:",x.join(" | "));await ctx.close()}
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
