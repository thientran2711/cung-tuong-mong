/* review/odds-no-unknown (law 4 + law 7): every ROLLED event option card shows the odds of the roll it uses; «Khó lường» is retired.
   Opens the families fixed here with forced setups (vu oan, giá họa đồ, đồ ngự tứ, quà ăn có độc + quà sạch, Dung nhan replies, sáng hôm
   sau «Đáp lại», cài đồ, tặng đồ đã tẩm, đồ ngự ban thất lạc) + every PEND event dialog + approachOne visits (N draws).
   Prints every card of the fixed families as name=meter word (° = no p: certain, or no roll of its own). Checks each card: no «Khó lường» text; no meter without a lit step; an option with p → meter step = word(oddsCl(p)) (the same p its roll
   uses); meter step = the odds word of the option's own line (kitOptModel). No page error.
   usage: node dev/test/odds-no-unknown.js <index.html url> <out.json> [WxH,WxH…]  (default 755x1000,1180x820) — exit 1 on a FAIL */
const {chromium}=require('playwright');const fs=require('fs');
const [,,PAGE,OUT,SZS]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ALL={};let bad=0;
 for(const sz of (SZS||"755x1000,1180x820").split(",")){const [W,H]=sz.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitHint==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name);await sleep(1500);
  const R=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());
   const md=document.getElementById('modal');const close=()=>{Q.length=0;md.hidden=true};close();S.bac=300;S.suc=80;S.th=Math.max(S.th||0,40);render();
   const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
   const res={dialogs:0,options:0,withP:0,khoLuong:[],unlit:[],pBad:[],mismatch:[],steps:[0,0,0,0,0,0,0],fam:{},errs:[]};
   const audit=(where,m)=>{if(!m||!m.opts)return;res.dialogs++;/* 23/11: «Khó lường» is the 3rd ladder word now — the text check is off; the unlit / p≠ / mismatch checks below carry the law */
    m.opts.forEach((o,i)=>{const bt=md.querySelector(`#mb .opt[data-m="${i}"]`);if(!bt)return;res.options++;
     const km=bt.querySelector('.kat > .kodds .kodm, .kodds .kodm');if(!km)return;const lv=+km.dataset.kodds;if(lv<0){res.unlit.push([where,T(o.n).slice(0,40)]);if(res.fam[where])res.fam[where].push(`${T(o.n).slice(0,26)}=(unlit) ${T(km.textContent)}`);return}res.steps[lv]++;
     if(typeof o.p==="number"){res.withP++;const want=KIT_ODDS.indexOf(word(oddsCl(Math.round(o.p))));if(lv!==want)res.pBad.push([where,T(o.n).slice(0,40),lv,want])}
     if(res.fam[where])res.fam[where].push(`${T(o.n).slice(0,26)}=${KIT_ODDS[lv]}${typeof o.p==="number"?"":"°"}`)
     let want=6;try{const od=kitOptModel(o).odds;want=od?KIT_ODDS.indexOf(od):6}catch(e){}if(want>=0&&lv!==want)res.mismatch.push([where,T(o.n).slice(0,40),lv,want])})};
   const show=async(where,d,title)=>{close();if(!d||!d.o||!d.o.length){res.errs.push(where+": no dialog");return}res.fam[where]=[];pushDil(d,title||where);showModal();await Wt(150);audit(where,Q[0])};
   const fam=async(where,fn)=>{try{await fn()}catch(e){res.errs.push(where+": "+e.message.slice(0,90))}};
   const rv=liveRivals(false).filter(v=>v&&v.alive&&!v.out);const a=rv[0],a2=rv[1]||rv[0];
   S.maid=S.maid||((S.staff||[]).find(s=>s.role==="maid"))||S.maid;if(S.maid)S.maid.loyal=90;S.doctor=S.doctor||1;
   /* the fixed families */
   await fam("vuoan",()=>show("vuoan",PEND.vuoan({a:key(a)})));
   await fam("wdframe",()=>{const k=Object.keys(WD_ITEMS).find(k=>!WD_ITEMS[k].nt);return show("wdframe",PEND.wdframe({a:key(a),k}))});
   await fam("wdnt",()=>{const k=Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].nt);return show("wdnt",PEND.wdnt({k,how:"bị mất"}))});
   const food=PGX_FOOD[0];
   await fam("pgin-poison",()=>show("pgin-poison",PEND.pgin({f:key(a),dn:"Yến sào",pk:Object.keys(PGX)[0],o:40,e:{k:food}})));
   await fam("pgin-clean",()=>show("pgin-clean",PEND.pgin({f:key(a),dn:"Yến sào",pk:null,o:0,e:{k:food}})));
   await fam("plantpick",()=>{S.inv.push({k:food});return show("plantpick",PEND.plantpick({v:a.id}))});
   
   await fam("toil-peer",async()=>{close();TOIL_POP.length=0;toilReact({k:Object.keys(TOIL_EV).find(k=>/tease|mock|envy|ghen/.test(k))||Object.keys(TOIL_EV)[0],host:a,n:-3,name:a.name,v:a,line:"chê dung nhan",say:"…",who:pv(a)});
     await Wt(60);toilFlush();const m=Q.find(q=>q&&q.toilEv);if(!m){res.errs.push("toil-peer: no dialog");return}Q.length=0;Q.push(m);res.fam["toil-peer"]=[];showModal();await Wt(150);audit("toil-peer",Q[0])});
   await fam("toil-scold",async()=>{close();TOIL_POP.length=0;toilReact({k:"th-scold",host:"th",n:-3,name:"Thái hậu",line:"chê",say:"…"});await Wt(60);toilFlush();const m=Q.find(q=>q&&q.toilEv);if(!m){res.errs.push("toil-scold: no dialog");return}Q.length=0;Q.push(m);res.fam["toil-scold"]=[];showModal();await Wt(150);audit("toil-scold",Q[0])});
   await fam("ne-cold",async()=>{close();S.neMorn={tier:"cold",d:wk()-1};kneMorningAfter();const m=Q.find(q=>q&&q.opts&&q.opts.some(o=>o.n==="Đáp lại"));if(!m){res.errs.push("ne-cold: no dialog");return}Q.length=0;Q.push(m);res.fam["ne-cold"]=[];showModal();await Wt(150);audit("ne-cold",Q[0])});
   await fam("dhlost",async()=>{close();const e={k:"sacphong",dhid:"t"+Date.now(),own:"me"};S.inv.push(e);const c=dhLose(S,e);if(!c){res.errs.push("dhlost: no case");return}
     const m=Q.find(q=>q&&q.pid==="dhlost");if(!m){res.errs.push("dhlost: no dialog");return}Q.length=0;Q.push(m);res.fam.dhlost=[];showModal();await Wt(150);audit("dhlost",Q[0])});
   /* every PEND event dialog + visits */
   const ids=Object.keys(PEND).filter(k=>!KIT_ACT_PIDS.has(k));const PP={night2:{s:5},night1:{q:3,vp:0},tt3:{o:40},ch2:{o:40},thd1:{o1:40,o2:50}};
   for(const id of ids){try{close();const d=mkP(id,PP[id]||{});if(!d||!d.o||!d.o.length)continue;pushDil(d,id);showModal();await Wt(100);const m=Q[0];if(m&&kitIsEventChoice(m))audit("PEND:"+id,m)}catch(e){res.errs.push(id+": "+e.message.slice(0,80))}}
   const seen=new Set();for(let i=0;i<300;i++){try{close();const m=approachOne();if(!m||!m.opts)continue;const k=T(m.t).slice(0,30)+" / "+T((m.opts[0]||{}).n).slice(0,24);if(seen.has(k))continue;seen.add(k);Q.push(m);m.must=1;showModal();await Wt(100);audit("AP:"+k,m)}catch(e){res.errs.push("AP: "+e.message.slice(0,80))}}
   close();return res});
  R.pageErrors=errs;ALL[sz]=R;const fail=R.khoLuong.length||R.unlit.length||R.pBad.length||R.mismatch.length||errs.length;if(fail)bad++;
  console.log(`${sz}: dialogs ${R.dialogs} · options ${R.options} · with p ${R.withP} · «Khó lường» ${R.khoLuong.length} · unlit meter ${R.unlit.length} · meter≠word(p) ${R.pBad.length} · meter≠line ${R.mismatch.length} · steps ${R.steps.join("/")} · page errors ${errs.length} → ${fail?"FAIL":"PASS"}`);
  for(const [k,v] of Object.entries(R.fam))console.log(`  ${k}: ${v.join(" · ")||"(none)"}`);
  for(const x of [].concat(R.khoLuong.map(w=>["Khó lường",w]),R.unlit.map(x=>["unlit",...x]),R.pBad.map(x=>["p≠",...x]),R.mismatch.map(x=>["line≠",...x])).slice(0,30))console.log("  BAD",x.join(" | "));
  for(const e of R.errs.slice(0,12))console.log("  setup:",e);for(const e of errs.slice(0,5))console.log("  pageerror:",e);
  await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(ALL,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
