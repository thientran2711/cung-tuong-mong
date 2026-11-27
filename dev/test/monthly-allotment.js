/* review/monthly-allotment (PL #5 "lệ tháng cho mọi người", jallot.js): hair oil + candles in IT and the rank goods, skim down map, law C price,
   Kiểu cầu kỳ needs oil (cap, spend, mirror presets + note), candlelight study (her deck + NPC agent), servants' lệ tháng (player maid + NPC staff,
   skimmed with the mistress), old save / first sight, off switch, no % in new text.
   usage: node dev/test/monthly-allotment.js <build url or worktree> <outdir> [WxH@dpr,...]   (shots: mirror; exit 1 on a FAIL) */
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
   const r=await p.evaluate(()=>{const o={};const K=[];for(const k of ["dau","nen"])for(let t=0;t<3;t++)K.push("al"+k+t);
    o.items=K.every(k=>IT[k]&&IT[k].n&&IT[k].pr>0);o.names=new Set(K.map(k=>IT[k].n)).size===K.length;o.art=K.every(k=>{const a=itemArt(k);return a&&a.grade===+k.slice(-1)&&/item-/.test(a.src)});
    o.init=!!S.alInit&&alHasOil(S)&&S.inv.some(e=>alOf(e.k)&&alOf(e.k).kind==="nen");o.npcInit=consorts().filter(v=>v!==S&&v.alive!==false&&!v.out).every(v=>v.alInit);
    /* the rank lines (law C: counts flat, grade by rank) */
    const al=r=>stipList(r,false,false,false).filter(([k])=>alOf(k));o.lines=[0,3,7].map(r=>al(r).map(x=>x.join("×")));
    o.linesOk=[0,1,2,3,4,5,6,7].every(r=>{const L=al(r);const d=L.find(([k])=>alOf(k).kind==="dau"),n=L.find(([k])=>alOf(k).kind==="nen");return d&&n&&alOf(d[0]).t===BAL.allot.oil.tier[r]&&d[1]===BAL.allot.oil.n[r]&&alOf(n[0]).t===BAL.allot.light.tier[r]&&n[1]===BAL.allot.light.n[r]})&&new Set(BAL.allot.oil.n).size===1&&new Set(BAL.allot.light.n).size===1;
    o.cold=stipList(3,true,false,false).filter(([k])=>alOf(k)).length===1;o.rankTxt=/lọ/.test(stipRankTxt(3))&&/cây/.test(stipRankTxt(3));
    o.down=BAL.stip.down.aldau2==="aldau1"&&BAL.stip.down.aldau0===null&&BAL.stip.down.alnen1==="alnen0";
    const r0=S.rank;const sh=[];for(let r=0;r<8;r++){S.rank=r;sh.push(+(alPrice(S,"dau",BAL.allot.oil.tier[r])/BAL.pay[r]).toFixed(3))}S.rank=r0;o.sh=sh;o.lawC=Math.max(...sh)-Math.min(...sh)<=.03;
    /* a month's goods: oil bottle with lượt + candles into the bag */
    /* allot-season: the chest ceiling (BAL.stip.keep) — empty her oil/candle stock first so the month really issues them */S.inv=S.inv.filter(e=>!alOf(e.k));const n0=S.inv.length;stipGoods(S,null);const add=S.inv.slice(n0).filter(e=>alOf(e.k));o.goods=add.filter(e=>alOf(e.k).kind==="dau").every(e=>e.u===BAL.allot.oil.uses)&&add.filter(e=>alOf(e.k).kind==="nen").length===BAL.allot.light.n[S.rank];
    /* hair oil: Kiểu cầu kỳ spends it; without oil it falls back (cap) */
    S.inv.filter(e=>lxOf(e.k)).forEach(e=>e.u=9);const oilU=()=>alOil(S).reduce((a,e)=>a+e.u,0);const u0=oilU();
    const rb={wk:toilWk(),makeup:true,score:70,look:"dep",col:Object.assign(toilColFix({}),{want:"diem"})};lxSit(S,rb);o.oilSpend=u0-oilU()===BAL.allot.oil.use&&rb.col.want==="diem";
    const u1=oilU();const rp={wk:toilWk(),makeup:true,score:70,look:"dep",col:toilColFix({})};lxSit(S,rp);o.oilPlain=oilU()===u1;
    const keep=S.inv.slice();S.inv=S.inv.filter(e=>!(alOf(e.k)&&alOf(e.k).kind==="dau"));S.inv.filter(e=>lxOf(e.k)).forEach(e=>e.u=9);
    const rn={wk:toilWk(),makeup:true,score:70,look:"dep",col:Object.assign(toilColFix({}),{want:"diem"})};lxSit(S,rn);o.noOil=!rn.col.want&&rn.noOil===1;
    const pk=lxColPick(Object.assign(toilColFix({}),{want:"diem"}));o.pickFall=!pk.want;o.noteNoOil=/Kiểu cầu kỳ/.test(lxMirrorNote());
    const rows=toilPreRows(toilColDef());/* makeup-set (owner OD 25/11 ~23:20Z, canon overwrite of the old «hidden» rule): without oil the Kiểu cầu kỳ sets stay on the mirror GREYED with why + roads, never hidden */
    {const DI=i=>{const x=TOIL_PRE.find(y=>y[0]===i.k);return x&&x[2]==="diem"};const R=lxColRows(rows).filter(r=>/^pre-/.test(r.k)&&(r.items||[]).some(DI));o.presetsGreyed=R.length>0&&R.every(r=>r.items.filter(DI).every(i=>i.off&&/thiếu/.test(i.why||"")))}S.inv=keep;
    /* NPC face: no oil → no Kiểu cầu kỳ; NPC month spends oil before the issue */
    const v=consorts().find(x=>x!==S&&x.alive!==false&&!x.out);v.inv=v.inv.filter(e=>!alOf(e.k));const rv={makeup:true,score:70,look:"dep",col:{want:"diem"}};lxNpcCap(v,rv);o.npcNoOil=!rv.col.want;
    v.inv.push({k:"aldau1",from:"noivu",d:S.turn});alFix(v);const e=v.inv.find(x=>x.k==="aldau1");const eu=e.u;stipGoods(v,null);o.npcSpend=e.u===eu-BAL.allot.oil.npcUse&&(v.inv.filter(x=>alOf(x.k)&&alOf(x.k).kind==="dau").length>=2||/* allot-season: a bottle with lần left = at the ceiling → paid as bạc */!!(v.stip&&v.stip.qbM&&v.stip.qbM.turn===S.turn));
    /* candles: evening study burns one for +add; morning does nothing; NPC agent the same rule */
    const nC=p=>p.inv.filter(e=>alOf(e.k)&&alOf(e.k).kind==="nen").length;S.inv.push({k:"alnen0",from:"noivu",d:S.turn});
    const card={n:"Luyện cầm kỳ thi họa",c:{},o:100,w:{tai:2},cx:"arts"};S.buoi=0;const t0=S.tai,c0=nC(S);runOpt(card);o.morning=nC(S)===c0;
    /* PACE-SPEED (RV-163E, sếp FINAL 26/11 ~23:24Z): Tài rises × max(min, 1 − (now/100)^pow) through the one funnel, so the raw «+2 +add» no longer holds:
       compare the same evening card from the same Tài / carry WITHOUT and WITH a candle — the candle burns one and adds a real rise on top */
    S.buoi=B4L;const tb=40,cand=S.inv.filter(e=>alOf(e.k)&&alOf(e.k).kind==="nen");S.inv=S.inv.filter(e=>!cand.includes(e));S.tai=tb;S.spc=Object.assign(S.spc||{},{tai:0});runOpt(card);const g0=S.tai-tb;
    S.inv.push(...cand);S.tai=tb;S.spc.tai=0;const c1=nC(S);runOpt(card);const g1=S.tai-tb;o.evDbg={g0,g1,c1,c2:nC(S)};o.evening=nC(S)===c1-1&&g0>0&&g1>g0;o.cardNote=/nến/.test(alLightNote("arts"))&&!alLightNote("rest");
    v.inv.push({k:"alnen2",from:"noivu",d:S.turn});const vt=v.tai,vc=nC(v);const R=alLight(v,"book");o.npcLight=!!R&&nC(v)===vc-1&&v.tamco!=null;S.buoi=0;
    o.deckTag=(()=>{try{return typeof alLightNote==="function"}catch(e){return false}})();
    /* servants: NPC staff get their lệ (skimmed one step when the mistress is) */
    const w=consorts().find(x=>x!==S&&x.alive!==false&&!x.out&&(x.staff||[]).some(s=>s.sid!=null));o.staffHas=!!w;
    if(w){const s=w.staff.find(s=>s.sid!=null);s.inv=[];alStaffGive(w,false);o.staffGot=s.inv.length>0&&s.inv.length<=BAL.allot.srv.keep;const full=s.inv.map(e=>e.k).join();s.inv=[];alStaffGive(w,true);o.staffSkim=s.inv.map(e=>e.k).join()!==full||!full;}
    o.srvList=[0,3,5].map(rk=>alSrvList(rk,false).map(x=>x.join("×")));o.srvLau=alSrvList(3,true).length===BAL.allot.srv.lau.length;
    const sk=alSrvSkim([["luahang",1],["aldau1",1],["tragoi",1]]);o.srvSkim=!!sk.cut&&sk.cut.k0==="luahang";
    /* off switch */
    BAL.allot.on=false;o.off=!stipList(3,false,false,false).some(([k])=>alOf(k));const rf={makeup:true,score:70,look:"dep",col:{want:"diem"}};S.inv=S.inv.filter(e=>!alOf(e.k));lxCapRec(S,rf);o.offGate=rf.col.want==="diem";BAL.allot.on=true;S.inv=keep;
    /* VANPHONG: no % / lượt in any new text */
    o.noPct=!K.some(k=>/%|lượt/.test(IT[k].d+IT[k].n))&&!/%/.test(alLightNote("arts")+lxMirrorNote());
    return o});
   for(const k of ["items","names","art","init","npcInit","linesOk","cold","rankTxt","down","lawC","goods","oilSpend","oilPlain","noOil","pickFall","noteNoOil","presetsGreyed","npcNoOil","npcSpend","morning","evening","cardNote","npcLight","srvLau","srvSkim","off","offGate","noPct"])ok(k,!!r[k],k==="lawC"?r.sh:k==="linesOk"?r.lines:k==="evening"?r.evDbg:undefined);
   ok("staff lệ",!r.staffHas||(r.staffGot&&r.staffSkim),[r.staffHas,r.staffGot,r.staffSkim]);console.log("srv lists",JSON.stringify(r.srvList));
   /* old save: a life with no alInit gets one first-sight issue on render */
   const old=await p.evaluate(()=>{delete S.alInit;S.inv=S.inv.filter(e=>!alOf(e.k));render();return !!S.alInit&&alHasOil(S)});ok("old save first sight",old);
   /* the player maid: lệ tháng after her wage, chest, skimmed with her mistress */
   const mr=await p.evaluate(()=>{const o={};try{const S0=JSON.parse(JSON.stringify(S));const mm=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1);if(!mm)return{skip:1};S.srv={mid:mm.id,rk:3,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};
     Q.length=0;S.srv.lau=0;S.srv.rk=3;const cl0=BAL.allot.srv.cloth;BAL.allot.srv.cloth=[1,2,3,4,5,6,7,8,9,10,11,12];const n0=S.inv.length;srvMonth();BAL.allot.srv.cloth=cl0;o.seasonal=alSrvList(3,false).some(([k])=>k==="vaibong")===cl0.includes(S.month);const add=S.inv.slice(n0);o.got=add.some(e=>e.k==="tragoi")&&add.some(e=>e.k==="aldau0");o.cloth=add.some(e=>e.k==="vaibong");
     o.help=/lệ tháng/.test(HX.wage);const m=srvM();m.stip=m.stip||{};const n1=S.inv.length;S.month=1;S.dead=false;
     const tm=S.turn;const ms=srvMonth;/* mark the mistress skimmed for the coming month */const t0=S.turn+1;m.stip.skT=t0;const keepS=window.stipSkim;window.stipSkim=function(){return null};
     srvMonth();window.stipSkim=keepS;const add2=S.inv.slice(n1);o.skim=add2.some(e=>e.k==="vaitho"||e.k==="tramoc")&&!add2.some(e=>e.k==="vaibong"&&false);o.dbg=add2.map(e=>e.k)}catch(e){o.err=String(e)}return o});
   ok("maid lệ tháng",!mr.skip&&mr.got&&mr.cloth&&!mr.err,mr);ok("maid help line",mr.help);ok("maid cloth only at season start",mr.seasonal);ok("maid skimmed with mistress",mr.skim,mr.dbg);
   await p.evaluate(()=>{for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800)}
  /* the mirror without hair oil: the note, no Kiểu cầu kỳ presets; shot */
  const m=await p.evaluate(()=>{try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}lxInitAll();alInitAll();S.inv=S.inv.filter(e=>!(alOf(e.k)&&alOf(e.k).kind==="dau"));
   for(const part of BAL.ration.parts)if(!lxHas(S,part))S.inv.push({k:lxKey(part,lxTierOf(S)),from:"noivu",d:S.turn});lxFix(S);S.bac=200;S.buoi=0;delete S.toilette;Q.length=0;document.getElementById('modal').hidden=true;
   toilOpen();TOIL.st.dv="hopdip";toilColUI();return true});await sleep(1500);
  await p.screenshot({path:`${OUT}/mirror-nooil-${wh}.jpg`,type:'jpeg',quality:70});
  const mm=await p.evaluate(()=>{const box=kg82Box();return{note:/Dầu chải tóc/.test(box.textContent)&&/Kiểu cầu kỳ/.test(box.textContent),hs:document.documentElement.scrollWidth>innerWidth}});
  ok(`mirror note no oil ${wh}`,mm.note,mm);ok(`no h-scroll ${wh}`,!mm.hs);
  /* with oil: the bottle line */
  await p.evaluate(()=>{S.inv.push({k:alKey("dau",BAL.allot.oil.tier[Math.min(7,S.rank)]),from:"noivu",d:S.turn});alFix(S);toilColUI()});await sleep(900);await p.evaluate(()=>{try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}});await sleep(300);
  await p.screenshot({path:`${OUT}/mirror-oil-${wh}.jpg`,type:'jpeg',quality:70});
  const mo=await p.evaluate(()=>/còn \d+ lần dùng/.test(kg82Box().textContent));ok(`mirror oil line ${wh}`,mo);
  ok(`no page errors ${wh}`,!errs.length,errs.slice(0,3));await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`MONTHLY-ALLOTMENT FAIL ${bad}`:"MONTHLY-ALLOTMENT ALL PASS");process.exit(bad?1:0)})();
