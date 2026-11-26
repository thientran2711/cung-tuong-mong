/* LUẬT SỬA CẢ NHÓM (owner 15/11 14:50Z): every "pay more for a better version" choice must be worth its silver.
   Computes, with the game's own functions, each paid tier against the cheaper one and prints a markdown table + a FAIL list.
   usage: node dev/test/paid-tiers.js <url>      (a local build: CTM_IMG_BASE= bash dev/site/build_site.sh + a static server) */
const {chromium}=require('playwright');const BASE=process.argv[2];
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0});
 await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out={wk:[],lesson:[],vir:[],veil:[],shop:[],fail:[]};const F=(w,why)=>out.fail.push(`${w}: ${why}`);
  /* 1. handmade works: every kind × material, her grade 0 / 2 / 4 */
  const saveArts=Object.assign({},S.arts);
  for(const kind of Object.keys(WK)){const K=WK[kind];for(const lv of [0,2,4]){S.arts[K.a]=lv;const row={kind,lv,m:[]};
   for(let m=0;m<3;m++){const q=wkScore(S,kind,m,WAVG),ti=wkTierP(S,q,m);const e=wkMake(S,kind,m,WAVG);const sell=wkSellVal(e.wk);const ev=wkEval0(S,e.wk,"th");const g=ev.ok?wkEval(S,e.wk,"th").v:0;
    const best=[1,2,3].map(t=>wkNeedRaw(S,kind,m,t));row.m.push({cost:K.mat[m],ti,sell,gift:g,need:best,top:Math.max(...[0,1,2,3].filter(t=>t===0||best[t-1]>=0))})}
   for(let m=1;m<3;m++){const a=row.m[m-1],c=row.m[m],dc=c.cost-a.cost;
    if(c.ti<a.ti)F(`${K.n} bậc ${lv} vật liệu ${m}`,`phẩm ở 5 phần thấp hơn (${c.ti} < ${a.ti})`);
    if(c.sell-a.sell<dc)F(`${K.n} bậc ${lv} vật liệu ${m}`,`bán thêm ${c.sell-a.sell} bạc < trả thêm ${dc}`);
    if(c.gift<=a.gift&&c.ti<=a.ti)F(`${K.n} bậc ${lv} vật liệu ${m}`,`quà không hơn (${c.gift} ≤ ${a.gift})`);
    if(c.top<a.top)F(`${K.n} bậc ${lv} vật liệu ${m}`,'trần phẩm thấp hơn')}
   out.wk.push(row)}}
  Object.assign(S.arts,saveArts);
  /* 2. art lessons: progress for each mini-game result (0..3 phần) — self vs teacher (the j23 rule) */
  const tch=BAL.tchMin||1;for(let g=0;g<=3;g++){const s=typeof lesG==="function"?lesG("self",g):Math.max(1,Math.round(g*.6)),t=typeof lesG==="function"?lesG("teacher",g):Math.max(g,s+tch);/* review/balance-pace: the game's ONE rule */out.lesson.push({g,self:s,teacher:t});if(t<=s)F(`Học với thầy, chơi ${g}`,`không hơn tự học (${t} ≤ ${s})`)}
  /* 3. Tứ đức: self +1 vs ma ma +2..3 (j85) */
  out.vir.push({self:1,mama:"2..3",cost:"5+5×bậc"});
  /* 4. veil craft: material 0..2 at grade 0 / 2 / 4, made at 5 phần: worth in bạc */
  if(typeof vlCraftOut==="function"){const a=vlArt(),s0=S.arts[a];for(const lv of [0,2,4]){S.arts[a]=lv;const row={lv,m:[]};
   for(let m=0;m<3;m++){const k=vlCraftOut(S,m,5);row.m.push({cost:VL.mat[m],k,name:IT[k].n,grade:vlG({k}),worth:IT[k].pr,txt:vlGradeOdds(S,m)})}
   for(let m=1;m<3;m++){const a1=row.m[m-1],c=row.m[m];if(c.worth-a1.worth<c.cost-a1.cost)F(`Mạng che mặt bậc ${lv} vật liệu ${m}`,`đáng thêm ${c.worth-a1.worth} bạc < trả thêm ${c.cost-a1.cost}`)}
   out.veil.push(row)}S.arts[a]=s0}
  /* 5. shop goods of one kind / slot: a dearer one must give more */
  const grp={};for(const k in IT){const it=IT[k];if(!it.pr||it.vl||it.mat||it.il)continue;const key=it.sl||it.kd;(grp[key]=grp[key]||[]).push([k,it])}
  const val=(it,k)=>it.gv?it.gv*10:it.w?Object.values(it.w).reduce((a,b)=>a+b,0)*10:it.dr?it.dr*10:it.use?Object.values(it.use).reduce((a,b)=>a+b,0):(typeof luxVal==='function'?luxVal(k):0);
  for(const key in grp){const L=grp[key].sort((x,y)=>x[1].pr-y[1].pr);for(let i=1;i<L.length;i++){const a1=L[i-1],c=L[i];out.shop.push({key,a:a1[1].n,ap:a1[1].pr,av:val(a1[1],a1[0]),b:c[1].n,bp:c[1].pr,bv:val(c[1],c[0])});
    if(c[1].pr>a1[1].pr&&val(c[1],c[0])<val(a1[1],a1[0])&&!c[1].ant&&!c[1].anti&&!c[1].fert)F(`${c[1].n} (${c[1].pr} bạc)`,`kém ${a1[1].n} (${a1[1].pr} bạc)`)}}
  return out});
 const L=[];const T=["Thường","Khá","Tinh xảo","Tuyệt phẩm"];
 L.push("### 1. Đồ tự tay làm (j83): phẩm khi chơi 5 phần · bán · quà Thái hậu · phần cần cho Khá/Tinh xảo/Tuyệt phẩm","| loại | bậc | vật liệu thường | tốt | quý |","|---|---|---|---|---|");
 for(const r of R.wk)L.push(`| ${r.kind} | ${r.lv} | ${r.m.map(x=>`${x.cost} bạc → ${T[x.ti]}, bán ${x.sell}, quà ${x.gift}, cần ${x.need.map(n=>n<0?"–":n).join("/")}`).join(" | ")} |`);
 L.push("","### 2. Học tài nghệ: tiến bộ theo phần chơi","| phần chơi | tự học | học với thầy |","|---|---|---|");for(const r of R.lesson)L.push(`| ${r.g} | +${r.self} | +${r.teacher} |`);
 L.push("","### 3. Mạng che mặt tự kết (chơi 5 phần)","| bậc | vải sa (0 bạc) | dây bạc (6 bạc) | kim tuyến (45 bạc) |","|---|---|---|---|");for(const r of R.veil)L.push(`| ${r.lv} | ${r.m.map(x=>`${x.name}: đáng ${x.worth}`).join(" | ")} |`);
 L.push("","### 4. Đồ mua cùng loại (giá tăng → công dụng tăng)","| nhóm | rẻ hơn | đắt hơn |","|---|---|---|");for(const r of R.shop)L.push(`| ${r.key} | ${r.a} ${r.ap} bạc (${r.av}) | ${r.b} ${r.bp} bạc (${r.bv}) |`);
 L.push("",`FAIL: ${R.fail.length}`,...R.fail.map(x=>"- "+x),`page errors: ${errs.length}`);
 console.log(L.join("\n"));await b.close()})();
