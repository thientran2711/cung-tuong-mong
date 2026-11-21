/* review/monthly-ration (PL #5 "phấn son theo lệ", jration.js): items in IT, ration through jstip, mirror palette = owned colours only,
   cap by parts owned, lượt spent per sitting, roads (mua gấp, mượn, xin, trộm), NPC month, tribute, taint, old save.
   usage: node dev/test/monthly-ration.js <build url> <outdir> [WxH@dpr,...]   (shots: mirror; JSON on stdout; exit 1 on a FAIL) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,OUT,SIZES]=process.argv;
/* a local folder instead of a url: served in-process (like dev/tools/quickcheck.js) */
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(`${c?'PASS':'FAIL'} ${n}${x!==undefined?' '+JSON.stringify(x):''}`)};
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();let first=true;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#klife').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}
   Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  await p.evaluate(()=>{try{const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}document.querySelectorAll('[id^=kroul],.kroul-ov,.kroul').forEach(e=>e.remove());KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}});
  if(first){first=false;
   const r=await p.evaluate(()=>{const o={};const K=[];for(const part of BAL.ration.parts)for(let t=0;t<4;t++)K.push("lx"+part+t);
    o.items=K.every(k=>IT[k]&&IT[k].n&&IT[k].pr>0);o.names=new Set(K.map(k=>IT[k].n)).size===K.length;o.art=K.every(k=>{const a=itemArt(k);return a&&a.grade===+k.slice(-1)&&/item-/.test(a.src)});
    o.init=!!S.lxInit&&lxCount(S)===4;o.npcInit=consorts().filter(v=>v!==S&&v.alive!==false&&!v.out).every(v=>v.lxInit&&lxCount(v)>0);
    /* ration lines by rank: count and tier from BAL */
    o.lines=[0,3,7].map(r=>stipList(r,false,false,false).filter(([k])=>lxOf(k)).map(([k])=>k));o.linesOk=[0,3,7].every((r,i)=>o.lines[i].length===BAL.ration.n[r]&&o.lines[i].every(k=>lxOf(k).t===BAL.ration.tier[r]));
    o.cold=stipList(3,true,false,false).filter(([k])=>lxOf(k)).length===BAL.ration.coldN;o.rankTxt=/hộp/.test(stipRankTxt(3));
    /* a month's goods: boxes into the bag with colour + lượt */
    const n0=S.inv.length;stipGoods(S,null);const add=S.inv.slice(n0).filter(e=>lxOf(e.k));o.goods=add.length===BAL.ration.n[S.rank]&&add.every(e=>e.c&&e.u===BAL.ration.uses[lxOf(e.k).t]&&e.from==="noivu");
    /* skimming one tier worse / missing */
    o.down=BAL.stip.down.lxson2==="lxson1"&&BAL.stip.down.lxson0===null;
    /* sitting: spend lượt by level */
    const box=p=>S.inv.filter(e=>lxOf(e.k)&&lxOf(e.k).part===p);const tot=()=>S.inv.filter(e=>lxOf(e.k)).reduce((a,e)=>a+e.u,0);
    S.inv.filter(e=>lxOf(e.k)).forEach(e=>e.u=9);const t0=tot();const rec={wk:toilWk(),makeup:true,score:90,look:"tuyet",col:toilColFix({})};lxCapRec(S,rec);const R=lxSpend(S,rec,rec.col);o.spend=t0-tot();o.spendOk=o.spend===BAL.ration.use.tuyet*4;
    S.inv.filter(e=>lxOf(e.k)).forEach(e=>e.u=9);const t1=tot();const rb={wk:toilWk(),makeup:true,score:70,look:"dep",col:Object.assign(toilColFix({}),{want:"diem"})};lxSpend(S,rb,rb.col);o.bold=t1-tot()===(BAL.ration.use.dep+BAL.ration.bold)*4;
    /* cap: no son → best Kiều diễm; nothing → mặt mộc */
    const keep=S.inv.slice();S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="son"));const c3={makeup:true,score:95,look:"tuyet"};lxCapRec(S,c3);o.cap3=toilMk(c3);
    S.inv=S.inv.filter(e=>!lxOf(e.k));const c0={makeup:true,score:95,look:"tuyet"};lxCapRec(S,c0);o.cap0=toilMk(c0);
    /* rush buy at the mirror */
    S.bac=500;const b0=S.bac,cost=lxRushCost();lxRush();o.rush=lxCount(S)===4&&S.bac===b0-cost;S.inv=keep;
    /* NPC: same rule at the month tick */
    const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out);v.inv=v.inv.filter(e=>!lxOf(e.k));v.bac=0;const u0=JSON.stringify(v.inv.map(e=>e.k));const rv={makeup:true,score:95,look:"tuyet"};lxNpcCap(v,rv);o.npcCap=rv.makeup===false;
    v.inv.push({k:"lxson1",from:"noivu",d:S.turn});lxFix(v);const e=v.inv.find(x=>x.k==="lxson1");const u1=e.u;lxNpcSpend(v);o.npcSpend=!v.inv.includes(e)||e.u===u1-BAL.ration.npc.use;
    /* fix 5: the month spends BEFORE the issue: a box issued this month arrives full */
    v.inv=v.inv.filter(e=>!lxOf(e.k));stipGoods(v,null);const iss=v.inv.filter(e=>lxOf(e.k)&&e.from==="noivu");o.npcIssueFull=iss.length>0&&iss.every(e=>e.u===BAL.ration.uses[lxOf(e.k).t]);
    /* her steal from an NPC chest and borrow on a visit: the cards exist with odds words (no %) */
    v.inv.push({k:"lxmay2",from:"noivu",d:S.turn});lxFix(v);const own=S.inv.slice();S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="may"));
    const A=talkOpts({kind:"rival",ref:v});const bo=A.find(a=>a.n==="Mượn son phấn");o.borrowCard=!!bo&&!bo.lock&&!/%/.test(bo.x);
    const C=talkOpts({kind:"chest",ref:v});const so=C.find(a=>a.n==="Lấy trộm son phấn");o.stealCard=!!so&&!so.lock&&!/%/.test(so.x);
    const H=talkOpts({kind:"th"});const be=H.find(a=>a.n==="Xin son phấn");o.begCard=!!be&&!be.lock;
    const d0=S.danh;const oRoll=roll;roll=()=>false;so.run();roll=oRoll;o.caught=S.danh<d0&&S.cutPay>=1;
    roll=()=>true;bo.run();roll=oRoll;o.borrowGot=lxHas(S,"may");S.inv=own;
    /* tribute with a promotion */
    BAL.ration.tribute.ch.promo=100;const n1=S.inv.length;bestow(S,"promo");o.tribute=S.inv.slice(n1).some(e=>lxOf(e.k)&&lxOf(e.k).t===3&&e.from==="emp");BAL.ration.tribute.ch.promo=60;
    /* taint: bột ngứa on a cosmetic → allergy at the sitting */
    o.taint=!!TAINT.ngua&&TAINT.ngua.on.includes("lxson0")&&TAINT.chi.on.includes("lxma1");
    const tb={k:"lxson0",from:"noivu",d:S.turn,t:"ngua",by:"x"};S.inv.push(tb);lxFix(S);S.inv.filter(e=>lxOf(e.k)&&lxOf(e.k).part==="son"&&e!==tb).forEach(e=>e.h=1);S.rash=null;const lg0=document.getElementById('log')?1:0;lxSpend(S,{makeup:true,score:50,look:"vua"},{son:tb.c});o.allergy=!!S.rash&&S.rash.sev>=1&&!S.lxRash&&typeof rshOf(S).lost==="number";
    /* fix 3: pha chì → the same rash + the j8 lead hurt (taintHit) */S.rash=null;tb.u=6;tb.t="chi";const sc0=S.suc;lxSpend(S,{makeup:true,score:50,look:"vua"},{son:tb.c});o.allergyChi=!!S.rash&&S.suc<=sc0-3+0.001;S.rash=null;S.inv.forEach(e=>{if(e.h===1&&lxOf(e.k))delete e.h});
    /* old save: entries without colour / lượt, no lxInit */
    const old={k:"lxmat1",from:"noivu"};S.inv.push(old);delete S.lxInit;lxFix(S);o.oldFix=!!old.c&&old.u===BAL.ration.uses[1];
    /* fix 4: the old Son phấn Dương Châu is folded in: alias, givers, taint */
    o.alias=IT_ALIAS.sonphan==="lxson0";const op={k:"sonphan",t:"chi",by:"x"};S.inv.push(op);itClean();lxFix(S);o.oldSonphan=op.k==="lxson0"&&op.t==="chi"&&!!op.c&&op.u===BAL.ration.uses[0];S.inv.splice(S.inv.indexOf(op),1);
    o.noGiver=!SHOP_ALL.includes("sonphan")&&!Object.values(BEST).some(L=>L.includes("sonphan"))&&!TAINT.chi.on.includes("sonphan")&&!Object.values(CU_POOL).some(L=>L.includes("sonphan"))&&!Object.values(TS_THEME).some(x=>x.tags.includes("sonphan"));
    /* fix 2: law C — a box of her own rank's tier costs the same share of her bổng at every rank (±0.1) */
    const r0=S.rank;const sh=[];for(let r=0;r<8;r++){S.rank=r;sh.push(+(lxPrice(S,BAL.ration.tier[r])/BAL.pay[r]).toFixed(3))}S.rank=r0;o.lawC=Math.max(...sh)-Math.min(...sh)<=.1&&new Set(BAL.ration.uses).size===1&&new Set(BAL.ration.n).size===1;o.shares=sh;
    /* fix 1: a missing part is recorded on the look (col.no) and is in the layer key */
    const kk=S.inv.slice();S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="son"));const rn={makeup:true,score:70,look:"dep",col:toilColFix({})};lxCapRec(S,rn);o.colNo=Array.isArray(rn.col.no)&&rn.col.no.join()==="son"&&toilColFix(rn.col).no.join()==="son";S.inv=kk;
    /* fix 6: item text has no repeated bracket */o.txt=!/\(phấn mắt\)/.test(IT.lxmat0.d)&&BAL.ration.tribute.ch.sinhthan>0;
    /* off switch: full palette */
    BAL.ration.on=false;const rows=toilColRows(toilColDef());o.off=lxColRows(rows).length===rows.length;BAL.ration.on=true;
    /* VANPHONG: no % in any new text */
    o.noPct=!Object.values(IT).filter(x=>x.lx).some(x=>/%|lượt/.test(x.d+x.n));
    return o});
   for(const k of ["items","names","art","init","npcInit","linesOk","cold","rankTxt","goods","down","spendOk","bold","rush","npcCap","npcSpend","borrowCard","stealCard","begCard","caught","borrowGot","tribute","taint","allergy","allergyChi","alias","oldSonphan","noGiver","lawC","colNo","txt","npcIssueFull","oldFix","off","noPct"])ok(k,!!r[k],k==="linesOk"?r.lines:k==="lawC"?r.shares:undefined);
   ok("cap3 (no son → Kiều diễm)",r.cap3==="dep",r.cap3);ok("cap0 (nothing → mặt mộc)",r.cap0==="moc",r.cap0);}
  /* the mirror (colour step): only owned colours, the missing note, the rush button; shot */
  const m=await p.evaluate(()=>{try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}S.inv=S.inv.filter(e=>!(lxOf(e.k)&&lxOf(e.k).part==="son"));S.bac=200;S.buoi=0;delete S.toilette;Q.length=0;document.getElementById('modal').hidden=true;
   toilOpen();{const r=document.getElementById('toilrdy');if(r)r.click()}TOIL.st.dv="hopdip";toilColUI();return true});await sleep(1500);
  await p.screenshot({path:`${OUT}/mirror-${wh}.jpg`,type:'jpeg',quality:70});
  const mm=await p.evaluate(()=>{const box=kg82Box();const rows=[...box.querySelectorAll('.kswt-r')].map(r=>r.querySelector('b').textContent+":"+r.querySelectorAll('.kswt-i').length);
   const own=["may","ma","mat"].map(x=>new Set(S.inv.filter(e=>lxOf(e.k)&&lxOf(e.k).part===x&&e.u>0).map(e=>e.c)).size);
   const dbg=S.inv.filter(e=>lxOf(e.k)&&lxOf(e.k).part==="ma").map(e=>JSON.stringify(e));return{dbg,rows,own,note:/Thiếu/.test(box.textContent)&&/Son môi/.test(box.textContent),rush:!!document.getElementById('lxrush'),go:!!document.getElementById('toilgo'),
    hs:document.documentElement.scrollWidth>innerWidth,ovf:[...box.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='visible'&&e.clientWidth>0&&e.tagName!=='CANVAS').length}});
  ok(`mirror rows = owned colours ${wh}`,!mm.rows.some(r=>/^Son môi/.test(r))&&mm.rows.filter(r=>!/^Kiểu/.test(r)).length===3,mm);ok(`mirror note + rush ${wh}`,mm.note&&mm.rush&&mm.go);ok(`no h-scroll ${wh}`,!mm.hs);
  await p.evaluate(()=>{document.getElementById('lxrush').click()});await sleep(800);await p.screenshot({path:`${OUT}/mirror-rush-${wh}.jpg`,type:'jpeg',quality:70});
  const after=await p.evaluate(()=>({son:[...kg82Box().querySelectorAll('.kswt-r b')].some(b=>/Son môi/.test(b.textContent)),miss:lxMiss(S)}));ok(`rush fills son ${wh}`,after.son&&!after.miss.length,after);
  ok(`no page errors ${wh}`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`MONTHLY-RATION FAIL ${bad}`:"MONTHLY-RATION ALL PASS");process.exit(bad?1:0)})();
