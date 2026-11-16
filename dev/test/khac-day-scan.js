/* khac-day scan (owner 15/11 "Khắc check must use the whole DAY's khắc"): every khắc requirement the player can see,
   in every buổi × khắc left 0–4, across Hành sự, Tài nghệ, Kẻ hầu, Hậu cung/Giao tình person acts, Hoàng tự, Dư đồ (map tiles +
   place cards: walk, Bái kiến, Lẻn vào), servant/event options (tsbNeedKhac). Each item is classed:
   fit  ✓ fits this buổi · spill ✓ runs on into the next buổi · plain ✓ (bound to another buổi; its Buổi chip says why)
   percount ✗ "N khắc (còn M)" / "đi N khắc, còn M" (the old per-buổi wording) · wrongred = a red khắc item although the day has
   the khắc and the act is not bound to this buổi · reason ✗ any other red khắc item (bound / day short / 0 left), in words.
   usage: node dev/test/khac-day-scan.js <page url> <label>  → prints JSON {label, table, samples, errs} */
const {chromium}=require('playwright');
const [,,URL,LABEL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();
 p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}
  S.kids=S.kids||[];try{S.kids.push(mkKid("m",8),mkKid("f",17))}catch(e){}S.suc=80;S.bac=500;save=()=>{};render()});
 const R=await p.evaluate(()=>{const T={},SAMP={};const isKh=t=>/khắc|không kịp xong/.test(t);
  const B4=typeof B4L==="number"?B4L:3;
  const cls=(t,ok,cost)=>{t=t.replace(/^[✓✗]\s*/,"").trim();if(ok)return /\(còn \d+\)/.test(t)?"fit":/sang buổi|đến nơi đã sang|kéo sang/.test(t)?"spill":"plain";
   if(/^\d+ khắc \(còn \d+\)$|^đi \d+ khắc, còn \d+$|cần \d+ khắc, còn \d+/.test(t))return "percount";return "reason"};
  const dayLeft=()=>(4-used)+4*(B4-(S.buoi||0));
  const add=(fam,st,c,t,extra)=>{const k=fam;T[k]=T[k]||{};T[k][st]=T[k][st]||{fit:0,spill:0,plain:0,percount:0,reason:0,wrongred:0};const x=T[k][st];x[c]++;
   if(extra)x.wrongred++;const sk=fam+"|"+c;SAMP[sk]=SAMP[sk]||[];if(SAMP[sk].length<4&&!SAMP[sk].some(y=>y.t===t))SAMP[sk].push({st,t:t.slice(0,90)})};
  const panel=(fam,tb,st)=>{tab=tb;try{render()}catch(e){}const P=document.getElementById("panel");
   P.querySelectorAll("button").forEach(btn=>{const nm=(btn.querySelector(".kan,h4")||btn).textContent.slice(0,40);
    btn.querySelectorAll(".kwhy").forEach(w=>{const t=w.textContent;if(!isKh(t))return;const ok=w.classList.contains("kok");const c=cls(t,ok);
     const m=t.match(/(\d+) khắc/);const cost=m?+m[1]:0;const wrong=!ok&&c==="percount"&&cost<=dayLeft()&&(S.buoi||0)<B4;add(fam,st,c,nm+": "+t,wrong)});
    const s=btn.querySelector("small");if(s&&!btn.querySelector(".kr-why")){/* pbtn notes */const n=[...btn.querySelectorAll(".ef.n")].map(e=>e.textContent).find(x=>/kéo sang|đến nơi đã sang/.test(x));if(n)add(fam,st,"spill",nm+": "+n)}})};
  for(let bu=0;bu<=B4;bu++)for(let left=0;left<=4;left++){const st=`b${bu}k${left}`;S.buoi=bu;used=4-left;S.j76carry=0;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;Q.length=0;
   try{deal()}catch(e){}used=4-left;
   [["Hành sự","act"],["Tài nghệ","art"],["Kẻ hầu","staff"],["Hậu cung/Giao tình","rv"],["Hoàng tự","kid"]].forEach(([f,t])=>panel(f,t,st));
   /* servant / event options */
   for(const c of [1,2])if(typeof tsbNeedKhac==="function"){const n=tsbNeedKhac(c);add("Sự vụ (tsb)",st,cls(n.t,n.ok),n.t,!n.ok&&cls(n.t,n.ok)==="percount"&&c<=dayLeft()&&bu<B4)}
   /* Dư đồ: map tiles and place cards */
   tab="go";try{render()}catch(e){}const P=document.getElementById("panel");
   P.querySelectorAll(".mspot[title], .mtile[title]").forEach(w=>(w.title||"").split(" · ").slice(1).forEach(t=>{t=t.trim();if(!isKh(t)||/^(đi )?\d+ khắc$/.test(t))return;const c=/đến nơi đã sang buổi [^:]*$/.test(t)?"spill":cls(t,false);add("Dư đồ (bản đồ)",st,c,t,c==="percount"&&(+((t.match(/(\d+) khắc/)||[])[1]||0))<=dayLeft()&&bu<B4)}));
   P.querySelectorAll(".kwhy, .mband, .acb i").forEach(w=>{const t=w.textContent.trim();if(!isKh(t)||/^\d+ khắc$/.test(t))return;const c=cls(t,!/còn|hết|không kịp/.test(t));add("Dư đồ (bản đồ)",st,c,t,c==="percount"&&(+((t.match(/(\d+) khắc/)||[])[1]||0))<=dayLeft()&&bu<B4)});
   const keys=[...new Set([].concat(...MAPL).filter(Boolean).concat(liveRivals(false).map(v=>"r"+v.id)))].filter(k=>k!=="home");
   for(const k of keys){let st2;try{st2=accState(k)}catch(e){continue}
    if(!st2.why&&!st2.here){const tc=st2.tc||0;add("Dư đồ (nơi)",st,tc>4-used?"spill":"fit",`${k}: đi ${tc}`);continue}
    if(st2.here)continue;Q.length=0;try{j77Card(k)}catch(e){continue}const M=document.getElementById("modal");const txt=M&&!M.hidden?M.innerText.replace(/\s+/g," "):"";
    (txt.match(/[^.]*khắc[^.]*\./g)||[]).forEach(line=>{line=line.trim();const c=/đến nơi vào|đến nơi .*buổi/.test(line)?"spill":cls(line,false);
     const m=line.match(/(\d+) khắc/);add("Dư đồ (nơi)",st,c,k+": "+line,c==="percount"&&m&&+m[1]<=dayLeft()&&bu<B4&&!/Bái kiến|yết kiến|Lẻn vào/.test(line)?1:0)});
    [...(M?M.querySelectorAll("button"):[])].forEach(x=>{if(/đến nơi vào buổi sau/.test(x.innerText))add("Dư đồ (nơi)",st,"spill",k+": Đi (đến nơi vào buổi sau)")});
    Q.length=0;try{M.hidden=true}catch(e){}}
  }
  return{T,SAMP}});
 /* table: rows = family, cols = sum over states */
 const tot={};for(const [f,st] of Object.entries(R.T)){tot[f]={fit:0,spill:0,plain:0,percount:0,reason:0,wrongred:0};for(const x of Object.values(st))for(const k in x)tot[f][k]+=x[k]}
 console.log(JSON.stringify({label:LABEL,totals:tot,perState:R.T,samples:R.SAMP,errs:[...new Set(errs)].slice(0,8)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
