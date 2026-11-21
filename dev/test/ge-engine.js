/* ge-engine (review/grand-endings-engine): unit test of jge.js (design GRAND_ENDINGS.md r3 §2) on the built game.
   For each pilot branch a new life with that road forced, then direct engine calls:
   - S.ge made at the start of the life: 4 open, pull 0; an OLD SAVE without S.ge gets it made open on first read (geS);
   - a Chuỗi option adds BAL.ge.pull.step, a Khóa option closes for good (chapter kept), lean tags move the tally;
   - Hồi kết nhánh: once the frame ends (BAL.ge.when "ch14": S.st.ch.all) the kit dialog ge1 is queued (4 options, «Theo người ấy đi» greyed with no bond), ge1 → ge2 (3);
   - resolve: open pair + success → Đại kết cục in the shading of the lean (≥ cut thiện, ≤ −cut ác, between = natural), reward applied (BAL.ge.rw), Kim sách in the Rương,
     jdh title «Thiên mệnh» earned (tier BAL.ge.title.tier), Bảng row, ctm-ge record; open pair + failure / closed pair → its fail outcome WITH loss (BAL.ge.fail);
     pair owned by no ending → quiet form (no loss, D8) on the most-pulled ending; seat lock: a sitting Hoàng hậu makes the HH ending fail-only;
   - Sổ luân hồi: life line «Đại kết cục: …», ctm-ge.last; the next life may wear it (D5 "prev"), dhObj not null; the life after a life with no grand title carries nothing;
   - switches: D3 when "r11", D4 after "close"/"stay", D7 showOdds (ladder word on ge2), D8 quietLoss; geMap + Bảng panel + Sổ luân hồi rows render; 0 page errors.
   usage: node dev/test/ge-engine.js [url|-] [roads comma list | all]; no 2nd arg → env GE_ROADS (same forms) → the pilots; "all" = every live branch of GE_DATA */
const path=require('path');const {chromium}=require('playwright');
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../index.html');
const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,900))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.getElementById('title').hidden=true;localStorage.removeItem('ctm-ge');
  window.__life=async road=>{const k=typeof geOrig==='function'?geOrig(road):road.split('_')[0];quiet=true;/* the branch's origin = its road's own ARC67 o (pt_* → pf) */const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;start();quiet=false;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14&&S.st.f14.rd===road)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;return S.st.f14.rd}});
 const RA=process.argv[3]||process.env.GE_ROADS||'tt_co,cnv_mat,nc_tuc';/* E11: one switch for every wave — CLI arg first, env GE_ROADS as fallback */
 const ROADS=RA==='all'?await p.evaluate(()=>Object.keys(GE_DATA)):RA.split(',');
 for(const road of ROADS){
  const rd=await p.evaluate(r=>window.__life(r),road);chk(`${road}: the life runs the road`,rd===road,rd);
  const R=await p.evaluate(road=>{const o={};let s=geS();o.init=s&&JSON.stringify([s.b,s.st,s.pull]);
   /* old save: S.ge missing */delete S.ge;const s2=geS();o.old=s2&&s2.b===road&&s2.st.join('')==='oooo';
   const D=GE_DATA[road],C=GE_CAT[road];
   /* a Chuỗi of ge1 that is no Khóa of anything */const c1=D.e[0].pull.find(n=>n[0]!=='@'&&!D.e.some(e=>(e.close||[]).includes(n)));const p0=s2.pull[0];geNote(c1);o.pull=s2.pull[0]-p0===BAL.ge.pull.step;
   /* a Khóa of ge3 */S.st.ch.n=7;const k3=D.e[2].close[0];geNote(k3);o.close=s2.st[2]==='x'&&s2.cx[2]===7;
   /* lean tags */const lt0=s2.lt;geNote(D.lean.p[0]);geNote(D.lean.p[1]);geNote(D.lean.m[0]);o.lean=s2.lt-lt0===1;
   /* Hồi kết nhánh */Q.length=0;S.st.ch.all=1;geAsk();const q=Q.find(m=>m.pid==='ge1');o.ask=!!q&&q.opts.length===4;S.men=[];o.bondOff=(()=>{const d=mkP('ge1',{});return !!(d.o[3].off)})();
   geAsk();o.once=Q.filter(m=>m.pid==='ge1').length===1;
   q.opts[1].go();o.ge2=Q.some(m=>m.pid==='ge2'&&m.opts.length===3);Q.length=0;
   /* success on an open pair: shading = thiện with a high lean */
   const i0=0,e0=C.e[i0];s2.st[i0]='o';s2.lt=50;const dan0=S.danh,inv0=(S.inv||[]).length;const r=geAnswer(e0[3],e0[4],true);
   o.win=r&&r.ok===1&&r.i===i0&&r.sh==='t'&&r.ti===e0[6];o.rw=(BAL.ge.rw[road+'_1'].danh?S.danh>dan0||S.danh===100:true);
   o.kim=(S.inv||[]).length===inv0+1&&S.inv[S.inv.length-1].k===BAL.ge.kimsach&&S.inv[S.inv.length-1].ti===r.ti;
   const key=`ge_${road}_1t`;const ob=dhObj(S,key);o.title=!!ob&&ob.tier===BAL.ge.title.tier&&ob.name===e0[6];
   o.board=(S.geBoard||[]).length===1&&S.geBoard[0].ti===r.ti;o.book=!!(geStore().t[key]);o.evt=Q.some(m=>m.pid==='geR'&&/Đại kết cục/.test(m.h));
   o.exit=(()=>{const d=mkP('geR',{});return d&&d.o[0].n==='Tạ ơn'})();o.done=s2.done===1;o.twice=geAnswer(0,0,true)===null;
   /* shading rules on fresh states */const shade=(lt,i)=>{S.ge=null;const s=geS();s.lt=lt;s.d0=S.duc;s.r1=C.e[i][3];return geAnswer(C.e[i][3],C.e[i][4],true)};
   const iA=C.e.findIndex(e=>e[2]==='A'),iT=(()=>{S.ge=null;const s0=geS();geLive(s0);return C.e.findIndex((e,i)=>e[2]!=='A'&&s0.st[i]==='o')})();/* W3: skip a thiện ending whose fail-only rule holds in this test life (e.g. cnv_chu_2 needs {mis}, not cast yet) */
   const Qs=rivals.map(v=>v.queen);rivals.forEach(v=>v.queen=false);/* seats free for the shading check (seat lock has its own test) */
   const rA=shade(0,iA),rT=shade(0,iT),rX=shade(-50,iT),rY=shade(50,iA);rivals.forEach((v,i)=>v.queen=Qs[i]);
   o.shade=rA.sh==='a'&&rT.sh==='t'&&rX.sh==='a'&&rY.sh==='t'&&rX.ti===C.e[iT][7]&&rY.ti===C.e[iA][6];
   /* fail on an open pair (forced miss) → loss; closed pair → loss */
   S.ge=null;s=geS();const f0=JSON.stringify(BAL.ge.fail[road+'_2']);const rf=geAnswer(C.e[1][3],C.e[1][4],false);o.fail=rf.ok===0&&rf.fail===D.e[1].fail&&Object.keys(rf.fx).length>0;
   S.ge=null;s=geS();s.st[3]='x';const rc=geAnswer(C.e[3][3],C.e[3][4]);o.closedFail=rc.ok===0&&rc.st==='x'&&rc.fail===D.e[3].fail&&(Object.keys(rc.fx).length>0||!!BAL.ge.fail[road+'_4'].mis);
   /* quiet form: a pair no ending owns → the most-pulled ending's fail, no loss */
   const used=new Set(C.e.map(e=>e[3]+','+e[4]));let qp=null;for(let a=0;a<4&&!qp;a++)for(let c=0;c<3&&!qp;c++)if(!used.has(a+','+c))qp=[a,c];
   S.ge=null;s=geS();s.pull=[0,0,3,1];const rq=geAnswer(qp[0],qp[1]);o.quiet=rq.quiet===1&&rq.i===2&&!Object.keys(rq.fx).length&&Q.some(m=>m.pid==='geR'&&/Cuộc đời ngươi vẫn tiếp tục như thế/.test(m.h));
   BAL.ge.quietLoss=true;S.ge=null;s=geS();s.pull=[0,0,3,1];const rq2=geAnswer(qp[0],qp[1]);o.quietLoss=Object.keys(rq2.fx).length>0;BAL.ge.quietLoss=false;
   /* D7 showOdds */BAL.ge.showOdds=true;S.ge=null;s=geS();s.r1=C.e[0][3];const d2=mkP('ge2',{});o.odds=KIT_ODDS.includes(d2.o[C.e[0][4]].x);BAL.ge.showOdds=false;const d3=mkP('ge2',{});o.noOdds=d3.o.every(x=>!x.x);
   /* D3 r11 */BAL.ge.when='r11';S.ge=null;s=geS();S.st.ch.all=0;S.st.f14.ends=S.st.f14.ends||{};delete S.st.f14.ends[11];Q.length=0;geAsk();const a1=Q.some(m=>m.pid==='ge1');S.st.f14.ends[11]='win';geAsk();o.r11=!a1&&Q.some(m=>m.pid==='ge1');BAL.ge.when='ch14';Q.length=0;
   /* odds: more pull → higher, condition unmet → capped */S.ge=null;s=geS();const g0=geOdds(s,0);s.pull[0]=20;const g1=geOdds(s,0);o.oddsUp=g1>=g0&&g1<=BAL.ge.odds.max;
   /* law 5 (brief E35): one rank step lowers the odds by BAL.ge.odds.rank (inside the clamp), the same key on every branch */
   {const sv=typeof isSrv==='function'&&isSrv(),r0=sv?S.srv.rk:S.rank,O=BAL.ge.odds,nc=O.noCond;O.noCond=O.max;/* condition cap lifted so the rank term shows on every ending; a servant life (cnv) steps on the maid ladder S.srv.rk */s.pull[0]=3;const put=r=>{if(sv)S.srv.rk=r;else S.rank=r};const at=r=>{put(r);return geOdds(s,0)};const L=[0,1,2,3,4,5,6,7].map(at);put(r0);O.noCond=nc;
    const want=[0,1,2,3,4,5,6,7].map(r=>Math.round(Math.max(O.min,Math.min(O.max,O.base+3*O.per-r*O.rank))));
    o.rank=O.rank>0&&JSON.stringify(L)===JSON.stringify(want)&&L[7]<L[0]||JSON.stringify([L,want])}
   /* map + panels */const M=geMap(road);o.map=!!M&&M.spine.length>=12&&M.ends.length===4&&/Đại kết cục \d\/4/.test(M.count.txt);
   try{geBoardPanel();o.panel=Q.length>0;Q.length=0}catch(e){o.panel='err '+e.message}
   o.past=/Thiên mệnh/.test(pastHTML());return o},road);
  console.log(road,JSON.stringify(R));
  for(const k of ['old','pull','close','lean','ask','bondOff','once','ge2','win','rw','kim','title','board','book','evt','exit','done','twice','shade','fail','closedFail','quiet','quietLoss','odds','noOdds','r11','oddsUp','rank','map','panel','past'])chk(`${road}: ${k}`,R[k]===true,R[k]);
  chk(`${road}: S.ge made open at the start`,R.init===JSON.stringify([road,['o','o','o','o'],[0,0,0,0]]),R.init)}
 /* seat lock (HH) on cnv_mat ge2 + D4 switches + carry across lives */
 await p.evaluate(r=>window.__life(r),'cnv_mat');
 const L=await p.evaluate(()=>{const o={};const s=geS();rivals[0].queen=true;rivals[0].alive=true;rivals[0].out=false;S.rank=Math.min(S.rank,3);
  geAsk;const st0=s.st[1];S.st.ch.all=1;Q.length=0;geAsk();o.seat=st0==='o'&&s.st[1]==='f';Q.length=0;
  const C=GE_CAT.cnv_mat;s.st[1]='f';const r=geAnswer(C.e[1][3],C.e[1][4],true);o.seatFail=r.ok===0&&r.st==='f';
  /* D4: FREE (leave) closes under rec; stay continues; "close" closes all */
  const exitOf=(i,after)=>{BAL.ge.after=after;S.ge=null;const s=geS();const r=geAnswer(C.e[i][3],C.e[i][4],true);const d=mkP('geR',{});return d.o[0].x==='kết thúc kiếp này'};
  const iF=C.e.findIndex(e=>e[5]==='FREE'),iS=C.e.findIndex(e=>e[5]==='TK');
  o.d4=exitOf(iF,'rec')&&!exitOf(iS,'rec')&&exitOf(iS,'close')&&!exitOf(iF,'stay');BAL.ge.after='rec';
  /* the last success decides what carries: a TK title */S.ge=null;const s3=geS();s3.lt=0;const rr=geAnswer(C.e[iS][3],C.e[iS][4],true);o.ti=rr.ti;
  Q.length=0;S.dead=false;lifeSave('Thử');o.line=(lifeLog()[0].f||'').includes('Đại kết cục: '+rr.ti);o.last=geStore().last===`ge_cnv_mat_${iS+1}${rr.sh}`;o.key=geStore().last;return o});
 console.log('seat/D4/carry',JSON.stringify(L));
 for(const k of ['seat','seatFail','d4','line','last'])chk(`cnv_mat: ${k}`,L[k]===true,L);
 const N=await p.evaluate(async key=>{await window.__life('tt_co');const o={carry:!!(S.dh&&S.dh[key]&&dhObj(S,key))};
  /* this life ends without a grand title → the next carries nothing */S.ge=null;geS();lifeSave('Thử');await window.__life('tt_co');o.none=!(S.dh&&S.dh[key]);return o},L.key);
 chk('next life may wear the previous life\'s grand title (D5 prev)',N.carry,N);chk('a life with no grand title carries nothing',N.none,N);
 chk('no page errors',!errs.length,errs.slice(0,5));
 await b.close();const nb=ok.filter(x=>!x[1]).length;console.log(`ge-engine: ${ok.length-nb}/${ok.length} pass`);process.exit(nb?1:0)})();
