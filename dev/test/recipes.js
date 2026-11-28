/* review/recipes (jrcp): sub-styles + books + tastes + repeats + allergy + teacher.
   usage: node dev/test/recipes.js <url of dev/index.html> <W>x<H>@dpr <outdir> <tag> [oldsave.json]
   Prints one JSON line: per step overflowX + clipped leaf text, checks, page errors. Screenshots <outdir>/<tag>-<step>.jpg */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 const R={};
 if(OLD){R.old=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return{e:'noload'};SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;
   Q.length=0;const k=rcpKnown();return{name:S.name,hadL:!!x.rcpL,mon:k.mon,tranh:k.tranh,inv:S.inv.length}}catch(e){return{e:e.message}}},fs.readFileSync(OLD,'utf8'))}
 else await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.buoi=0;S.used=0;S.bac=200;S.suc=90;render()});
 await p.waitForTimeout(1000);
 const settle=()=>p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000}).catch(()=>{});
 const shot=async n=>{await settle();return p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:60})};
 const meas=()=>p.evaluate(()=>{const vw=innerWidth;const cut=[...document.querySelectorAll('#panel *, #modal *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,6).map(e=>e.className+':'+e.textContent.trim().slice(0,30));
  const M=document.querySelector('#modal .dlg');const mr=M&&!document.getElementById('modal').hidden?M.getBoundingClientRect():null;
  return{ovf:document.documentElement.scrollWidth>vw+1,cut,dlgOut:mr?(mr.left<-1||mr.right>vw+1||mr.bottom>innerHeight+1):false}});
 const close=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 1. Tài nghệ › Tác phẩm: "lối đã học" chips + Khẩu vị card */
 await p.evaluate(()=>{tab="art";KTSUB.art="wk";render()});await p.waitForTimeout(1200);
 R.tab=Object.assign(await meas(),await p.evaluate(()=>{const P=document.getElementById('panel');const c=P.querySelector('[data-skill="wk-taste"]');if(c)c.scrollIntoView({block:'start'});
  return{chips:[...P.querySelectorAll('.kchip')].map(x=>x.textContent).filter(t=>/lối đã học/.test(t)).length,taste:!!c,rows:c?c.querySelectorAll('.kr').length:0,acts:c?[...c.querySelectorAll('button')].map(b=>b.innerText.split('\n')[0]):[]}}));
 await shot('tab');
 /* 2. teacher picker → tile grid with "Học lối này" */
 await p.evaluate(()=>{const v=liveRivals(true).find(v=>v.arts);if(v){v.arts.hoa=4;affAdd(v,S,60)}lessonMode("hoa","teacher")});await p.waitForTimeout(900);
 R.tch=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,opts:(Q[0]&&Q[0].opts||[]).map(o=>o.n)})));await shot('teacher');
 await p.evaluate(()=>{document.querySelector('#modal .opt[data-m="0"]').click()});await p.waitForTimeout(900);
 R.grid=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,btn:[...document.querySelectorAll('#modal .kshgo')].map(b=>b.textContent+(b.disabled?"(x)":"")).join("|"),info:(document.querySelector('#modal .kshm')||{}).textContent})));
 await shot('grid');
 /* choose a "Học lối này" tile → material → teacher session starts, sub-style learnt */
 R.learn=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kshgo')].find(b=>!b.disabled&&/Học lối/.test(b.textContent));if(!b)return{none:1};const kind=b.dataset.kwr,rid=b.dataset.kwri;b.click();
  const o=document.querySelector('#modal .opt[data-m="0"]');const bac0=S.bac;if(o)o.click();const s=rcpStOf(kind,rid);return{kind,rid,st:s[1],known:rcpKnown()[kind].includes(s[0]),mg:!!S.mg,paid:bac0-S.bac,logs:S.logs.slice(0,4).map(x=>x.replace(/<[^>]+>/g,'').slice(0,140))}});
 await p.evaluate(()=>{S.mg=null;document.querySelectorAll('#mg,.mg,#k82,.k82').forEach(e=>{if(e.id!=="modal")e.hidden=true});});await close();
 /* 3. Nội vụ phủ shop with books */
 await p.evaluate(()=>{S.shop=["nhansam"].concat(rcpShopBooks());S.shop.push("wkb_mon_s2");invAct("shop")});await p.waitForTimeout(1500);
 R.shop=Object.assign(await meas(),await p.evaluate(()=>({tiles:[...document.querySelectorAll('#modal .kshc')].map(t=>(t.querySelector('.kshn')||{}).textContent+' / '+(t.querySelector('.kshe')||{}).textContent),
  imgs:[...document.querySelectorAll('#modal .kshc img')].filter(i=>/wkbook/.test(i.src)).map(i=>i.naturalWidth)})));await shot('shop');
 await close();
 /* 4. the book in the chest: rows + Đọc → learnt */
 await p.evaluate(()=>{S.inv.push({k:"wkb_mon_s2"});tab="inv";render();const it=kinvItems().find(x=>x.g&&x.g.k==="wkb_mon_s2");kinvOpen(it)});await p.waitForTimeout(1200);
 R.book=Object.assign(await meas(),await p.evaluate(()=>({rows:(document.querySelector('#modal .kinvrows')||{}).innerText,btn:[...document.querySelectorAll('#modal [data-rcpread],#modal [data-kinvact]')].map(b=>b.innerText.split('\n')[0])})));
 await shot('book');
 R.read=await p.evaluate(()=>{const b=document.querySelector('#modal [data-rcpread]');if(b)b.click();return{q:Q.length,known:rcpKnown().mon.includes("s2"),log:S.logs[0].replace(/<[^>]+>/g,'').slice(0,160)}});
 await close();
 /* 5. gift dialog: emperor fav vs other sub-style; repeat ladder; known dislike refused */
 R.gift=await p.evaluate(()=>{S.wkE=[];const P=rcpProf("emp");const fav=P.f.mon;const st=rcpSt("mon",fav);const r1=st[2][0];const other=RCP_ST.mon.find(s=>s[0]!==fav);
  const mk=rid=>{const w=wkMake(S,"mon",1,8);w.wk.r=rid;w.wk.n=wkrOf("mon",rid).n;w.wk.p=null;return w};
  const a=wkEval(S,mk(r1).wk,"emp"),b=wkEval(S,mk(other[2][0]).wk,"emp");rcpLearn("emp","f:mon");const a2=wkEval(S,mk(r1).wk,"emp");
  /* repeats to Thái hậu */
  const out=[];for(let i=0;i<5;i++){S.inv.push(mk(r1));S.th=50;const t0=S.th;S.wkE=[];const s=wkGive(S,"th",S.inv.length-1);out.push(S.th-t0)}
  /* dislike known → refused */
  let ref=null;const Ph=rcpProf("th");const hk=Object.keys(Ph.h)[0];if(hk){rcpLearn("th","h:"+hk);const w=wkMake(S,hk,0,8);const hs=rcpSt(hk,Ph.h[hk]);w.wk.r=hs[2][0];w.wk.p=null;ref=wkEval(S,w.wk,"th")}
  return{favUnknownSung:a.fx.sung,favKnownSung:a2.fx.sung,otherSung:b.fx.sung,notesA:a.rcpN,notesB:b.rcpN,thRepeat:out,refused:ref&&!ref.ok,why:ref&&ref.why}});
 await p.evaluate(()=>{const w=wkMake(S,"mon",1,8);w.wk.r="r05";w.wk.n="Canh sườn hạt sen";w.wk.p=null;S.inv.push(w);S.wkE=[];itemAct("gift",S.inv.length-1)});await p.waitForTimeout(1500);
 R.giftDlg=Object.assign(await meas(),await p.evaluate(()=>({notes:[...document.querySelectorAll('#modal .opt[data-m]')].filter(b=>b.offsetParent).slice(0,3).map(b=>b.innerText.replace(/\s+/g,' ').slice(0,200))})));
 await shot('gift');await close();
 /* 6. allergy: a consort with an allergy gets a work holding it → accusation dialog */
 R.al=await p.evaluate(()=>{const map={hs:["mon","r02"],hat:["mon","r09"],sam:["mon","r07"],phan:["bhoa","r01"],tram:["huong","r07"],son:["the","r01"]};
  let v=null;for(const x of liveRivals(true))if(rcpProf(x).a){v=x;break}if(!v)return{none:1};const [kind,rid]=map[rcpProf(v).a];const s=rcpStOf(kind,rid);if(!rcpKnown()[kind].includes(s[0]))rcpKnown()[kind].push(s[0]);
  const w=wkMake(S,kind,0,8);w.wk.r=rid;w.wk.p=null;S.inv.push(w);const r0=roll;roll=()=>true;setTimeout(()=>{roll=r0},50);const suc0=v.suc;const t=wkGive(S,v,S.inv.length-1);showModal();
  return{v:v.name,al:rcpProf(v).a,txt:String(t).replace(/<[^>]+>/g,'').slice(0,240),suc:v.suc-suc0,q:Q[0]&&Q[0].t,opts:(Q[0]&&Q[0].opts||[]).map(o=>o.n)}});
 await p.waitForTimeout(1200);R.alDlg=await meas();await shot('allergy');
 await p.evaluate(()=>{const b=document.querySelector('#modal .opt[data-m="0"]');if(b)b.click()});await close();
 /* 7. maid ask + thái y dialogs */
 await p.evaluate(()=>{rcpAskQ("ty")});await p.waitForTimeout(800);R.ty=Object.assign(await meas(),await p.evaluate(()=>({t:Q[0]&&Q[0].t,n:(Q[0]&&Q[0].opts||[]).length})));await shot('thaiy');await close();
 /* 8. bậc 5: the "Học lối mới với thầy" button + list dialog */
 await p.evaluate(()=>{S.arts.cam=5;tab="art";KTSUB.art="cktt";render()});await p.waitForTimeout(900);
 R.mt=await p.evaluate(()=>({btn:!!document.querySelector('[data-rcpmt="cam"]'),ls:!!document.querySelector('[data-rcpls="cam"]')}));
 await p.evaluate(()=>{rcpListOpen("cam")});await p.waitForTimeout(900);R.list=await meas();await shot('list');await close();
 /* 9. art level-up grants one recipe of that art (owner 15/11 ~21:20Z): player (log "Học được: …", known sub-style first, then the basic
       recipe of the next sub-style without learning that sub-style) and an NPC (addArtP) alike */
 R.lvup=await p.evaluate(()=>{const a=WK.mon.a;S.arts[a]=0;S.artp[a]=0;S.rcpL.mon=["s1"];delete S.rcpR;delete S.rcpLv;const out=[];
  for(let i=0;i<4;i++){const n0=S.logs.length;addArt(a,S.arts[a]+2);const L=S.logs.slice(0,S.logs.length-n0).map(x=>x.replace(/<[^>]+>/g,'')).filter(x=>/Học được:/.test(x));
   const g=(S.rcpR&&S.rcpR.mon||[]).slice(-1)[0];out.push({lv:S.arts[a],got:g,st:g&&rcpStOf("mon",g)[0],open:g&&wkrOpen(S,"mon").some(r=>r.id===g),log:L[0]||""})}
  const v=liveRivals(true).find(v=>v.arts);let npc=null;if(v){v.arts[a]=0;v.artp[a]=0;delete v.rcpR;delete v.rcpLv;addArtP(v,a,2);npc={lv:v.arts[a],got:v.rcpR&&v.rcpR.mon,open:v.rcpR&&wkrOpen(v,"mon").some(r=>r.id===v.rcpR.mon[0])}}
  return{steps:out,s2Learnt:rcpKnown().mon.includes("s2"),npc,ok:out.every(x=>x.got&&x.open&&/Học được:/.test(x.log))&&!!(npc&&npc.got&&npc.open)}});
 R.errs=errs;console.log(JSON.stringify(R));await b.close()})();
