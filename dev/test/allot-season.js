/* review/allot-season (OD 27/11 ~05:10Z, plan reports/allot-season-plan.md): cloth by season, tea one a month, the chest ceiling «phát bù đủ lệ,
   dư thì quy bạc» (her + NPC, no NPC trim), stale tea → Trà mốc, the season fit bonus (gain only), Ban cho kẻ hầu, rank text, no % / no typed
   numbers in the new lines, old-save load, shots of the Bổng lộc panel + the month frame.
   usage: node dev/test/allot-season.js <build url or worktree> <outdir> [WxH@dpr,...]   (exit 1 on a FAIL) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,OUT,SIZES]=process.argv;
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
  const calm=()=>p.evaluate(()=>{try{const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}});await calm();
  if(first){first=false;
   const r=await p.evaluate(()=>{for(let i=0;i<400&&isSrv();i++)start();Q.length=0;const o={srv:isSrv()};const B=BAL.stip;const fam=k=>ssFam(k);
    /* 1. cloth by season, tea one a month, grade by rank */
    o.noMonthCloth=[0,1,2,3,4,5,6,7].every(r=>!stipList(r,false,false,false,false).some(([k])=>fam(k)==="vai"));
    o.seasonCloth=[0,3,7].every(r=>{const L=stipList(r,false,false,false,true).filter(([k])=>fam(k)==="vai");return L.length===1&&L[0][0]===B.cloth.k[r]&&L[0][1]===B.cloth.n});
    o.coldCloth=stipList(3,true,false,false,true).some(([k])=>k===B.cloth.cold)&&!stipList(3,true,false,false,false).some(([k])=>fam(k)==="vai");
    o.tea1=[0,1,2,3,4,5,6,7].every(r=>stipList(r,false,false,false,false).filter(([k])=>fam(k)==="tra").reduce((a,x)=>a+x[1],0)===1);
    const t=stipRankTxt(3);o.rankTxt=/đầu mùa \(tháng [^,)]+, tháng [^,)]+, tháng [^,)]+, tháng [^,)]+\)/.test(t)&&!/tháng \d/.test(t)&&t.includes(IT[B.cloth.k[3]].n);o.rankTxtS=t;
    o.blCard=!/2 súc lụa|4 súc gấm/.test(blCard())&&blCard().includes("đầu mùa");
    S.rank=3;S.sung=80;const goods=m=>{S.month=m;S.turn++;S.stip=S.stip||{};S.stip.tip=S.turn;return stipGoods(S,null)};
    S.inv=S.inv.filter(e=>!fam(e.k));
    const G1=goods(1);o.issueSeason=G1.some(g=>fam(g.k)==="vai"&&g.E.length===1);const G2=goods(2);o.noIssueMid=!G2.some(g=>fam(g.k)==="vai");
    /* 2. the ceiling: stock at keep → no new piece, silver instead */
    const st=f=>S.inv.filter(e=>fam(e.k)===f&&!e.h&&!e.w&&(e.u==null||e.u>0)).length;
    for(let m=3;m<=12;m++)goods(m);o.teaCap=st("tra")<=B.keep.tra;o.vaiCap=st("vai")<=B.keep.vai;o.nenCap=st("nen")<=B.keep.nen;o.dauCap=st("dau")<=B.keep.dau;
    o.lxCap=["may","son","ma","mat"].every(x=>st("lx:"+x)<=B.keep.lx);
    const b0=S.bac,q0=S.stip.qb||0;const G=goods(1);o.qb=G.qb>0&&S.bac-b0===G.qb&&S.stip.qb-q0===G.qb;o.qbTxt=stipGoodsTxt(G);o.qbTxtOk=/quy ra \d+ lượng bạc/.test(o.qbTxt)&&!/%/.test(o.qbTxt)&&!/(^|· )0 /.test(o.qbTxt);
    o.noVanish=G.every(g=>g.lost||g.E.every(e=>S.inv.includes(e)));
    /* skimmed month: the silver part loses cutSmall */
    const b1=S.bac;const Gs=stipGoods(S,{items:0,bac:0});o.qbSkim=Gs.qb===0||S.bac-b1===Gs.qb;
    /* NPC: the same ceiling, no silent trim */
    const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&!x.queen);v.rank=3;v.sung=80;v.inv=(v.inv||[]).filter(e=>!fam(e.k));v.stip={};
    for(let m=1;m<=12;m++){S.month=m;S.turn++;v.stip.tip=S.turn;stipGoods(v,null)}
    const sv=f=>v.inv.filter(e=>fam(e.k)===f&&!e.h&&!e.w&&(e.u==null||e.u>0)).length;o.npcCap=sv("tra")<=B.keep.tra&&sv("vai")<=B.keep.vai&&sv("nen")<=B.keep.nen;o.npcQb=(v.stip.qb||0)>0;
    const gift={k:"huongtram",from:"noivu",d:S.turn};v.inv.push(gift);stipGoods(v,null);o.npcNoTrim=v.inv.includes(gift);
    /* RV-187 (law 6c): an NPC candle the issue takes out of the Nội vụ phủ COUNTED stock (jstip ilStockTake) and the ceiling refuses goes back to that stock */
    {const I=ilS();I.stock=I.stock||{};const ck=(stipList(rkOf(v),false,false,false,false).find(([k])=>alOf(k)&&alOf(k).kind==="nen")||[])[0];/* the candle grade her rank is issued */
     I.stock[ck]=(I.stock[ck]||0)+6;v.inv=v.inv.filter(e=>fam(e.k)!=="nen");for(let i=0;i<B.keep.nen;i++)v.inv.push({k:ck,from:"noivu",d:S.turn});
     const st0=v.staff;v.staff=[];/* her servants' surplus also returns to the stock: kept out so the count is the ceiling's alone */const s0=I.stock[ck];S.month=5;S.turn++;v.stip.tip=S.turn;const Gk=stipGoods(v,null);v.staff=st0;const gl=Gk.find(g=>fam(g.k)==="nen"&&g.qbN>0);o.npcStockBackS={s0,s1:I.stock[ck]||0,qbN:gl&&gl.qbN};
     o.npcStockBack=!!ck&&!!gl&&(I.stock[ck]||0)===s0}
    /* 3. stale tea */
    const tea={k:"trahop",from:"noivu",d:S.turn-B.teaAge};S.inv=S.inv.filter(e=>fam(e.k)!=="tra");S.inv.push(tea);const Gt=goods(5);o.stale=tea.k==="tramoc"&&Gt.stale===1&&/trà để lâu đã mốc/.test(stipGoodsTxt(Gt));
    const fresh={k:"tragoi",from:"noivu",d:S.turn};S.inv.push(fresh);goods(6);o.freshKept=fresh.k==="tragoi";
    /* 4. fit bonus: sewn in Hạ, worn in Hạ → +fit; in Đông → 0 (no penalty) */
    S.month=5;const e=wdSew(S,"luahang");o.sea=e&&e.sea==="Hạ";const f1=ssFit(S);S.month=11;const f2=ssFit(S);S.month=5;o.fit=f1===B.cloth.fit&&f2===0;
    const w0=(()=>{S.month=11;return wearBonus(S).sac})(),w1=(()=>{S.month=5;return wearBonus(S).sac})();o.fitWear=w1-w0===B.cloth.fit;
    o.sewTxt=ssSewTxt("luahang");o.sewTxtOk=/áo mùa hạ/.test(o.sewTxt)&&/Sắc \+1/.test(o.sewTxt);
    /* 5. Ban cho kẻ hầu: piece to her maid, thiện cảm up, nothing vanishes */
    S.inv.push({k:"tragoi",from:"noivu",d:S.turn});const ix=S.inv.length-1,pc=S.inv[ix];const l0=S.maid.loyal;S.maid.loyal=Math.min(S.maid.loyal,90);const l1=S.maid.loyal;
    const rt=ssBan(S,ix);o.ban=!S.inv.includes(pc)&&(S.maid.inv||[]).some(x=>x.k==="tragoi"&&x.from==="ban")&&S.maid.loyal-l1===B.ban.maid&&/Thiện cảm của cung nữ \+2/.test(rt);
    o.banNotMoc=!ssBanOk("tramoc")&&!ssBanOk("vaitho")&&ssBanOk("luahang")&&!ssBanOk("tramngoc");
    /* one core: the new BAL keys exist */
    o.bal=B.cloth&&B.keep&&B.teaAge>0&&B.ban&&B.keep.on===true;
    return o});
   ok("consort life (not the servant road)",r.srv===false);for(const k of ["noMonthCloth","seasonCloth","coldCloth","tea1","rankTxt","blCard","issueSeason","noIssueMid","teaCap","vaiCap","nenCap","dauCap","lxCap","qb","qbTxtOk","noVanish","qbSkim","npcCap","npcStockBack","npcQb","npcNoTrim","stale","freshKept","sea","fit","fitWear","sewTxtOk","ban","banNotMoc","bal"])ok(k,!!r[k],k==="rankTxt"?r.rankTxtS:k==="qbTxtOk"?r.qbTxt:k==="sewTxtOk"?r.sewTxt:undefined);
   /* old save (a save written before this branch: monthly cloth heaps, no e.d on tea) loads and plays a month */
   const os=await p.evaluate(()=>{try{S.inv=S.inv.filter(e=>ssFam(e.k)!=="vai"&&ssFam(e.k)!=="tra");for(let i=0;i<9;i++)S.inv.push({k:"luahang",from:"noivu"},{k:"trahop",from:"noivu"});
     const raw=JSON.stringify(S);S=JSON.parse(raw);S.month=2;S.turn++;const G=stipGoods(S,null);const n=S.inv.filter(e=>e.k==="luahang").length;return{ok:n===9&&S.inv.filter(e=>e.k==="trahop"&&e.d!=null).length>=9&&!G.some(g=>g.k==="trahop"&&g.E.length),n}}catch(e){return{ok:false,err:String(e)}}});
   ok("oldSaveKeepsHeap(no piece taken, no new tea)",os.ok,os);
  }
  /* shots: the Bổng lộc panel (rank table) and this month's frame with a quy bạc line */
  await p.evaluate(()=>{try{closeModal()}catch(e){}for(let i=0;i<400&&isSrv();i++)start();Q.length=0;S.month=4;S.turn++;S.sung=80;/* her tea at the ceiling → this month's tea is paid as bạc */for(let i=0;i<BAL.stip.keep.tra;i++)S.inv.push({k:"tragoi",from:"noivu",d:S.turn});S.stip=S.stip||{};S.stip.tip=S.turn;econStipend(S);showModal()});await sleep(900);await calm();
  await p.waitForFunction(()=>{const m=document.getElementById('modal');if(m&&!m.hidden&&/Bổng lộc tháng/.test(m.innerText))return true;try{if(Q.length&&(!m||m.hidden))showModal()}catch(e){}return false},null,{timeout:20000,polling:500}).catch(()=>{});await calm();
  const ft=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText:""});ok(`month frame says quy bạc ${W}x${H}`,/quy ra \d+ lượng bạc/.test(ft)&&!/%/.test(ft),ft.slice(0,400));
  await p.screenshot({path:`${OUT}/bongloc-month-${W}x${H}.jpg`,quality:70,type:'jpeg'});
  /* the rank panel (Bổng lộc help): opened while the modal system is live (after the month frame) */
  await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0;Q.unshift({t:"Bổng lộc",h:blCard()});showModal()});await sleep(1200);await calm();
  const pt=await p.evaluate(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText:""});ok(`rank panel shown, says đầu mùa ${W}x${H}`,/Bổng lộc phát ngày đầu/.test(pt)&&/đầu mùa/.test(pt)&&!/%/.test(pt));
  await p.screenshot({path:`${OUT}/bongloc-panel-${W}x${H}.jpg`,quality:70,type:'jpeg'});
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(`no h-scroll panel ${W}x${H}`,!ov);
  ok(`no page errors ${W}x${H}`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`${bad} FAIL`:"ALL PASS");process.exit(bad?1:0)})();
