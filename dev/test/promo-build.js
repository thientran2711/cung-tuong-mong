/* promo-build probe (Foreman D promo-build; jpromob.js + jexam/j8/jpal hooks; numbers BAL.promoR):
   kỳ sắc phong timing (irregular, only festival months, gaps within BAL.promoR.ky), the ordinary road gated by the kỳ, a fail waits for the next kỳ,
   every special route opens / is used up / respects its caps (birth, favour per Emperor nết, Thái hậu, Hoàng hậu + renewal), the block rows still apply,
   NPC parity (the same pbTry), phanCungEdict({list,then}) re-houses + then() once, the host rule (Hoàng hậu's liking → kind host), kitPromoHook read-only.
   usage: node dev/test/promo-build.js [root] [W]x[H]   → table, exit 1 on any failure */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const root=process.argv[2]||require('path').resolve(__dirname,'../..');const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
 const srv=await D.serveRoot(root);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(srv.url+'/index.html?khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof window.phanCungEdict==='function',null,{timeout:90000});await p.waitForTimeout(1200);
 const R=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;const tt=document.getElementById('title');if(tt)tt.hidden=true;
  const out=[];const ck=(k,fn)=>{let bad="",got;try{const r=fn();got=r&&r.got;bad=r&&r.bad||""}catch(e){bad="throw "+e.message}out.push({k,got,bad})};
  const fresh=()=>{for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;window.__exAuto=1};
  const K=BAL.promoR.ky,SP=BAL.promoR.sp;
  /* go to the first month A (from now) whose kỳ state is want */
  const toMonth=want=>{for(let i=0;i<40;i++){pbKyUpdate();const k=pbKyAt(pbA());if(!!k===want)return k;monthTick();Q.length=0;if(S.dead)return null}return null};
  const elig=()=>{S.lastPromo=S.turn-99;S.sung=S.danh=99;S.hh=60;S.th=60;S.confined=0};
  fresh();
  ck("kỳ timing 10 years",()=>{const A0=pbA(),L=[];for(let a=A0;a<A0+120;a++){const k=pbKyAt(a);if(k)L.push([a,k])}
   const gaps=L.slice(1).map((x,i)=>x[0]-L[i][0]);const fm=new Set(Object.keys(K.p).map(k=>+FEST[k].m));const offM=L.filter(x=>!fm.has(x[0]%12+1));
   const bad=L.length<8||L.length>30?"count "+L.length:gaps.some(g=>g<K.gapMin)?"gap < min "+gaps:new Set(gaps).size<2?"regular gaps "+gaps:offM.length?"kỳ in a non-festival month":gaps.some(g=>g>K.gapMax+4)?"gap way over max "+gaps:"";
   return{got:{n:L.length,gaps:gaps.join(",")},bad}});
  ck("calendar stable (stored past)",()=>{const A=pbA();const a=[];for(let i=0;i<14;i++){a.push(pbKyAt(A+i)||"-")}const b=[];for(let i=0;i<14;i++){b.push(pbKyAt(A+i)||"-")}return{got:a.join(" "),bad:a.join()!==b.join()?"differs":""}});
  ck("no kỳ month → ordinary exam closed",()=>{fresh();toMonth(false);elig();delete S.ex;const e1=exElig(S);const row=promoReqP(S).find(x=>/^Kỳ sắc phong/.test(x[1]));return{got:row&&row[1],bad:e1?"exElig true outside kỳ":!row||row[0]?"no false kỳ row":""}});
  ck("kỳ month → ordinary exam opens",()=>{const k=toMonth(true);elig();delete S.ex;exTick();const e=S.ex;return{got:k+" w1="+(e&&e.w1),bad:!k?"no kỳ found":!exElig(S)?"exElig false in kỳ: "+JSON.stringify(promoReqP(S).filter(x=>!x[0]).map(x=>x[1])):e.w1==null?"window not open":e.kyw==null?"kyw not set":""}});
  ck("window runs on into next month",()=>{const e=S.ex;monthTick();Q.length=0;elig();const still=pbKyAt(pbA());exTick();return{got:"w1="+e.w1+" wk="+wk(),bad:wk()<=e.w1&&S.ex.w1==null&&!still?"window closed early":""}});
  ck("fail → wait next kỳ",()=>{const k=toMonth(true);elig();delete S.ex;const e=exS(S);exDone(S,{pass:false,total:1,P:{bar:9}});const n=pbNextKy(pbA()+1);return{got:`cd ${e.cd-S.turn} next ${n&&n.A-pbA()}`,bad:!n?"no next":e.cd-S.turn!==n.A-pbA()?"cd != months to next kỳ":""}});
  ck("daughter birth = special, conditions waived",()=>{fresh();toMonth(false);S.sung=0;S.danh=0;S.lastPromo=S.turn;S.hh=60;S.th=60;delete S.ex;delete S.pbs;const t=promoReward(S,"dau");const e=exS(S);
   return{got:t.slice(0,60),bad:e.grace!==e.to||e.gw!=="f"?"no grace":!exElig(S)?"exElig false: "+JSON.stringify(exBase(S).filter(x=>!x[0]).map(x=>x[1])):""}});
  ck("special keeps the Hoàng hậu block",()=>{const q=queenP();if(!q||q===S)return{got:"no queen",bad:""};S.hh=BAL.qBlockHh-10;S.th=0;S.rank=Math.max(S.rank,1);delete S.ex;delete S.pbs;promoReward(S,"dau");const e=exS(S);
   const blk=exBase(S).find(x=>/Hoàng hậu không chặn/.test(x[1]));return{got:blk&&blk[1],bad:!blk?"no block row (rank "+S.rank+")":exElig(S)?"block ignored":""}});
  ck("first son stays direct",()=>{S.hh=60;delete S.ex;const r=S.rank;S.lastPromo=S.turn;const t=promoReward(S,"son1");return{got:t.slice(0,50),bad:S.rank!==r+1&&seatFree(r+1)?"not direct":""}});
  ck("failed special uses up the chance",()=>{fresh();toMonth(false);S.hh=60;S.th=60;delete S.ex;delete S.pbs;promoReward(S,"dau");exDone(S,{pass:false,total:1,P:{bar:9}});const e=exS(S);return{got:"grace "+e.grace,bad:e.grace===e.to?"grace kept after fail":""}});
  ck("lapse of a special window uses it up",()=>{delete S.ex;delete S.pbs;S.sung=0;promoReward(S,"dau");exTick();const e=S.ex;if(e.w1==null)return{got:"no window",bad:"special window did not open"};S.tuan=0;S.turn+=2;exTick();return{got:"grace "+S.ex.grace,bad:S.ex.grace===S.ex.to?"grace kept after lapse":""}});
  ck("birth while a special is open → queued",()=>{delete S.ex;delete S.pbs;promoReward(S,"dau");const t=promoReward(S,"son");const q=(S.pbs||{}).q||[];return{got:q.join(),bad:q.length!==1?"not queued":""}});
  ck("favour: cut per Emperor nết + caps",()=>{fresh();toMonth(false);delete S.ex;delete S.pbs;S.hh=BAL.qBlockHh+1;S.th=0;S.danh=0;S.lastPromo=S.turn;const cut=pbSungCut(S);const tr=S.emp.traits.slice();
   S.sung=cut-1;const t0=pbTry(S);S.sung=cut;const t1=pbTry(S);const g1=exS(S).gw;exDone(S,{pass:false,total:1,P:{bar:9}});S.turn+=12;const t2=pbTry(S);S.turn+=SP.sung.every;const t3=pbTry(S);exDone(S,{pass:false,total:1,P:{bar:9}});S.turn+=SP.sung.every*2;const t4=pbTry(S);
   S.emp.traits=["lanhlung"];const c2=pbSungCut(S);S.emp.traits=["datinh"];const c3=pbSungCut(S);S.emp.traits=tr;
   return{got:`cut ${cut} lanhlung ${c2} datinh ${c3} n=${S.pbs.sung.n}`,bad:t0?"granted below cut":!t1||g1!=="sung"?"not granted at cut":t2?"granted within "+SP.sung.every+" months":!t3?"second not granted":t4?"third granted (life "+SP.sung.life+")":c2<=c3?"nết does not move the cut":""}});
  ck("Thái hậu ân điển once + renewal",()=>{fresh();toMonth(false);delete S.ex;delete S.pbs;S.sung=0;S.danh=0;S.lastPromo=S.turn;S.hh=BAL.qBlockHh+1;const ct=pbThCut();S.th=ct;const t1=pbTry(S);const ok1=exS(S).gw==="th";exDone(S,{pass:false,total:1,P:{bar:9}});
   const t2=pbTry(S);delete S.thO.pbK;S.thO.arch=S.thO.arch;const t3=pbTry(S);return{got:`cut ${ct} (${S.thO.arch})`,bad:!ok1?"not granted":t2?"granted twice":!t3?"new Thái hậu did not renew":""}});
  ck("Hoàng hậu đề cử once + maxTo + new queen",()=>{fresh();toMonth(false);const q=queenP();if(!q||q===S)return{got:"no queen",bad:"no NPC queen"};delete S.ex;delete S.pbs;S.sung=0;S.danh=0;S.th=0;S.lastPromo=S.turn;S.rank=1;const ch=pbHhCut(q);for(let g=0;g<8&&pbHhOf(S)!==ch;g++)S.hh=S.hh+(ch-pbHhOf(S));/* the Empress's regard moves through affAdd (nết-weighted): step to the cut */
   const t1=pbTry(S);const ok1=exS(S).gw==="hh";exDone(S,{pass:false,total:1,P:{bar:9}});const t2=pbTry(S);S.rank=SP.hh.maxTo;delete S.ex;const pbs=S.pbs;S.pbs={};const t3=pbTry(S);S.pbs=pbs;S.rank=1;delete S.ex;
   const old=q.id;q.id=old+1000;const t4=pbTry(S);q.id=old;return{got:`cut ${ch} (${q.trait})`,bad:!ok1?"not granted":t2?"granted twice":t3?"granted above maxTo":!t4?"new Hoàng hậu did not renew":""}});
  ck("NPC parity (favour)",()=>{const v=liveRivals(false).find(x=>x.rank<4&&!x.confined);if(!v)return{got:"no npc",bad:"no npc"};delete v.ex;delete v.pbs;v.danh=0;v.lastPromo=S.turn;v.hh=99;v.th=60;v.sung=pbSungCut(v);
   const t=pbTry(v);return{got:t.slice(0,60),bad:exS(v).gw!=="sung"?"NPC not granted: "+JSON.stringify(exBase(v).filter(x=>!x[0]).map(x=>x[1])):""}});
  ck("NPC ordinary exam only in kỳ",()=>{fresh();toMonth(false);const v=liveRivals(false).find(x=>x.rank<3&&!x.confined);if(!v)return{got:"",bad:"no npc"};delete v.ex;v.sung=v.danh=99;v.lastPromo=S.turn-99;v.hh=99;v.th=60;
   const a=exCanSit(v);toMonth(true);v.sung=v.danh=99;v.hh=99;v.th=60;v.confined=0;v.lastPromo=S.turn-99;delete v.ex;/* rv: the months run to the kỳ may have raised her by a favour exam (Sủng 99) */const b=exCanSit(v);return{got:`out ${a} in ${b}`,bad:a?"NPC may sit outside kỳ":!b?"NPC cannot sit in kỳ: "+JSON.stringify(exBase(v).filter(x=>!x[0]).map(x=>x[1])):""}});
  ck("phanCungEdict re-houses + then() once",()=>{fresh();S.rank=1;const g=liveRivals(false).filter(x=>x.rank<3).slice(0,2);const n0=Q.length;let calls=0;
   window.phanCungEdict({list:[{p:S,fav:{E:5,T:0,H:0}}].concat(g.map(v=>({p:v,fav:{}}))),then:()=>calls++});const m=Q[0];const ok=m&&m.t==="Phân cung"&&/Nơi ở/.test(m.h);const c0=calls;closeModal();
   return{got:`panel ${!!ok} calls ${c0}→${calls} house ${houseName(S)}`,bad:!ok?"no panel":c0!==0?"then before close":calls!==1?"then calls "+calls:""}});
  ck("phanCungEdict empty list → then()",()=>{let c=0;window.phanCungEdict({list:[],then:()=>c++});return{got:c,bad:c!==1?"then not called":""}});
  ck("host rule: Hoàng hậu liking → kind host",()=>{const kind=BAL.promoR.pc.kind;const hs=[S].concat(rivals).filter(x=>x!==S&&x.alive&&!x.out&&!x.queen&&rkOf(x)>=3&&rkOf(x)<=5&&x.pal!=null);
   if(hs.length<2)return{got:hs.length,bad:""};const t0=hs.map(h=>h.trait);hs[0].trait="Ân cần";hs[1].trait="Kiêu ngạo";hs.forEach(h=>{h.th=0});const cnt=()=>0;const sv=S.sung;S.sung=BAL.promoR.pc.mid.sung;
   S.hh=99;const a=pcHostPick(S,hs.slice(0,2),cnt);S.hh=-99;const c=pcHostPick(S,hs.slice(0,2),cnt);const got=`liked→${a&&a.trait} disliked→${c&&c.trait}`;hs.forEach((h,i)=>h.trait=t0[i]);S.sung=sv;S.hh=0;
   return{got,bad:a!==hs[0]?"liked not to kind host":c!==hs[1]?"disliked not to harsh host":""}});
  ck("kitPromoHook read-only + next kỳ",()=>{fresh();toMonth(false);S.sung=S.danh=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;delete S.ex;const pre=JSON.stringify(S);const g=window.kitPromoHook();const post=JSON.stringify(S);const n=pbNextKy(pbA());
   return{got:g,bad:pre!==post?"hook wrote to S":!g?"null":g.ready?"ready outside kỳ":g.months!==n.A-pbA()?"months "+g.months+" want "+(n.A-pbA()):!g.ky?"no ky name":""}});
  ck("kitPromoHook ready in kỳ",()=>{toMonth(true);S.sung=S.danh=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;const g=window.kitPromoHook();return{got:g,bad:!g||!g.ready||g.months!==0?"not ready in kỳ":""}});
  ck("rule text from BAL",()=>{const t=promoRuleTxt();return{got:t.slice(0,70),bad:!t.includes(String(K.gapMin))||!t.includes("kỳ sắc phong")?"text not from BAL":/\d+ ?%/.test(t)?"% in text":""}});
  ck("đại lễ: full conditions → direct, no exam",()=>{fresh();S.rank=1;S.sung=S.danh=99;S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;pbKyUpdate();const D=S.pb.dl||(S.pb.dl={last:null,seen:{}});
   D.seen.era="x-old";D.last=null;S.month=+FEST.newyear.m;S.pb.m=null;const r0=S.rank;const t=pbDl();return{got:t.replace(/<[^>]+>/g,"").slice(0,90),bad:!/Đại lễ tân đế/.test(t)?"no đại lễ":S.rank!==r0+1?"not promoted":""}});
  ck("đại lễ: not eligible → waits for the kỳ",()=>{fresh();S.rank=1;S.sung=0;S.danh=0;delete S.ex;pbKyUpdate();const D=S.pb.dl||(S.pb.dl={last:null,seen:{}});D.seen.era="x-old";D.last=null;S.month=+FEST.newyear.m;const r0=S.rank;const t=pbDl();
   return{got:t.replace(/<[^>]+>/g,"").slice(-90),bad:S.rank!==r0?"promoted without conditions":!/chờ kỳ sắc phong/.test(t)?"no wait line":""}});
  ck("đại lễ: Đức row from BAL",()=>{S.rank=1;S.sung=S.danh=99;S.duc=0;S.lastPromo=S.turn-99;const d=BAL.promoR.dl.duc[2];const row=pbDlRows(S).find(x=>/^Đức/.test(x[1]));return{got:row&&row[1],bad:d&&(!row||row[0])?"Đức not required":""}});
  ck("đại lễ: two within minGap → ordinary kỳ",()=>{fresh();pbKyUpdate();const D=S.pb.dl||(S.pb.dl={last:null,seen:{}});D.seen.era="x-old";D.last=pbA()-1;S.month=+FEST.newyear.m;const t=pbDl();return{got:t.replace(/<[^>]+>/g,"").slice(0,90),bad:!/chỉ mở kỳ sắc phong/.test(t)?"not downgraded":!pbKyAt(pbA())?"no kỳ this month":""}});
  ck("rv: no đại lễ during quốc tang",()=>{fresh();S.rank=1;S.sung=S.danh=99;S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;pbKyUpdate();const D=S.pb.dl||(S.pb.dl={last:null,seen:{}});
   D.seen.era="x-old";D.last=null;S.month=+FEST.newyear.m;S.pb.m=null;S.pb.mt=pbA()+5;const r0=S.rank;const t=pbDl();S.pb.mt=null;return{got:t.replace(/<[^>]+>/g,"").slice(0,90),bad:S.rank!==r0?"promoted in mourning":!/quốc tang/.test(t)?"no mourning line":""}});
  ck("rv: road met + no kỳ this month → favour exam outside the kỳ",()=>{fresh();toMonth(false);delete S.ex;delete S.pbs;S.hh=BAL.qBlockHh+1;S.th=0;S.danh=99;S.duc=99;S.lastPromo=S.turn-99;S.sung=Math.max(pbSungCut(S),99);
   const road=pbRoadDone(S);const t=pbTry(S);const g=exS(S).gw;return{got:(road?"road done; ":"road NOT done; ")+(g||"none"),bad:!road?"setup: road not met":g!=="sung"?"no favour exam outside the kỳ":""}});
  ck("đại lễ: seats short → seat contest (NPC parity)",()=>{fresh();S.rank=0;const r=4;const free=SEATCAP[r]-holders(r).length;const L=liveRivals(false).filter(v=>v.rank===r-1).slice(0,free+1);if(L.length<free+1){for(const v of liveRivals(false).filter(v=>v.rank<r-1).slice(0,free+1-L.length)){v.rank=r-1;L.push(v)}}
   for(const v of L){v.sung=v.danh=v.duc=99;v.lastPromo=S.turn-99;v.hh=99;v.th=60;v.confined=0;delete v.ex}pbKyUpdate();const D=S.pb.dl||(S.pb.dl={last:null,seen:{}});D.seen.era="x-old";D.last=null;S.month=+FEST.newyear.m;const t=pbDl();
   return{got:`free ${free} cand ${L.length}`,bad:!/tranh ghế/.test(t)?"no seat contest: "+t.replace(/<[^>]+>/g,"").slice(0,120):L.some(v=>v.rank===r)?"promoted past the seat":!L.every(v=>exS(v).pass)?"not all hold a pass":""}});
  /* ---------- promo-build-2 ---------- */
  const simAs=pass=>{const f0=exSimC;exSimC=function(p){const r=f0(p);r.pass=pass;return r};return()=>{exSimC=f0}};
  const queenMe=()=>{fresh();toMonth(false);const q0=queenP();if(q0&&q0!==S){q0.queen=false;q0.rank=6}S.rank=7;S.lastPromo=S.turn;S.trait=S.trait||"Điềm tĩnh";
   const v=liveRivals(false).filter(x=>x.rank<3&&!x.confined&&!x.coop).slice(0,3);const ch=pbHhCut(S);v.forEach((x,i)=>{delete x.ex;delete x.pbs;x.hh=ch+5+i;x.th=60;x.sung=0;x.danh=0;x.lastPromo=S.turn;x.confined=0});return v};
  ck("pb2: she is Hoàng hậu → nominee list + act card",()=>{const v=queenMe();const L=pbHhMeList();deal();const c=deck.find(a=>a&&a.pbhh);
   return{got:`list ${L.length} card ${!!c}`,bad:!v.length?"no npc":!L.length?"no candidate: "+JSON.stringify(exBase(v[0]).filter(x=>!x[0]).map(x=>x[1])):!c?"no act card":L.some(x=>x===S)?"she in list":""}});
  ck("pb2: nominate sheet = equal options (same gain + loss)",()=>{const L=pbHhMeList();Q.length=0;pbHhMeOpen();const m=Q[0];if(!m||!m.opts)return{got:"",bad:"no sheet"};
   const os=m.opts.filter(o=>o.go);const shape=os.map(o=>String(o.x).replace(/^được: .*? nợ ngươi/,"được: N nợ ngươi"));
   const eq=shape.every(x=>x===shape[0]);return{got:shape[0],bad:os.length!==L.length?"options "+os.length+" vs "+L.length:!eq?"options not equal: "+shape.join(" | "):!/được:/.test(shape[0])?"no gain":L.length>1&&!/mất:/.test(shape[0])?"no loss":!m.opts.some(o=>o.n==="Thôi")?"no Thôi":""}});
  ck("pb2: nominate → special exam + owe + passed-over oán; once per patron",()=>{const L=pbHhMeList();const m=Q[0];const v=L[0],o=L[1];const oan0=o?(o.oan||0):0;const k=q72Key(q72A("rv",v.id));const d0=(q72().d[k]||0);
   chooseM(0);/* options follow the list order */Q.length=0;const e=exS(v);const L2=pbHhMeList();
   return{got:`gw ${e.gw} owe ${(q72().d[k]||0)-d0} oán ${o?(o.oan||0)-oan0:"-"}`,bad:e.gw!=="hh"?"nominee has no hh exam":(q72().d[k]||0)-d0!==BAL.promoR.sp.cost.hhOwe?"no ân owed":o&&(o.oan||0)-oan0<=0?"passed-over did not oán":L2.includes(v)?"listed twice":""}});
  ck("pb2: NPC queen route unchanged when she is queen",()=>{const v=liveRivals(false).find(x=>x.rank<3&&!x.confined&&!pbOpen(x));if(!v)return{got:"",bad:""};delete v.ex;delete v.pbs;v.hh=99;v.sung=0;v.danh=0;v.th=0;pbTry(v);return{got:exS(v).gw||"none",bad:exS(v).gw==="hh"?"NPC queen route fired with her as queen":""}});
  ck("pb2: deathbed — full conditions → exam on record → decree + panel",()=>{fresh();toMonth(false);S.rank=1;S.sung=S.danh=S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;delete S.pbs;S.ill={k:"lao",st:3,known:true};
   const r0=S.rank;const un=simAs(true);Q.length=0;const t=pbDeath(S);un();const m=Q[0];const t2=pbDeath(S);
   return{got:t.replace(/<[^>]+>/g,"").slice(0,80),bad:S.rank!==r0+1&&seatFree(r0+1)?"no decree":!m||m.t!=="Xét tấn phong bên giường bệnh"||!m.btn?"no panel with button":(S.pbs||{}).dth!==1?"not counted":t2?"twice in a life":""}});
  ck("pb2: deathbed — conditions short → no exam, says why",()=>{fresh();toMonth(false);S.rank=1;S.sung=0;S.danh=0;delete S.ex;delete S.pbs;S.ill={k:"lao",st:3,known:true};const r0=S.rank;Q.length=0;const t=pbDeath(S);
   return{got:t.slice(0,90),bad:S.rank!==r0?"promoted without conditions":Q.length?"panel without exam":!/chưa đủ điều kiện/.test(t)?"no why line":(S.pbs.dth||0)?"chance used":""}});
  ck("pb2: deathbed — fail uses the life chance",()=>{fresh();toMonth(false);S.rank=1;S.sung=S.danh=S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;delete S.ex;delete S.pbs;S.ill={k:"lao",st:3,known:true};const un=simAs(false);Q.length=0;const r0=S.rank;pbDeath(S);un();
   return{got:Q[0]&&Q[0].btn,bad:S.rank!==r0?"promoted on fail":S.pbs.dth!==1?"not counted":""}});
  ck("pb2: deathbed — NPC parity",()=>{const v=liveRivals(false).find(x=>x.rank<3&&!x.confined);if(!v)return{got:"",bad:"no npc"};delete v.ex;delete v.pbs;v.sung=v.danh=v.duc=99;v.lastPromo=S.turn-99;v.hh=99;v.th=60;v.ill={k:"lao",st:3,known:true};
   const r0=v.rank;const un=simAs(true);pbDeath(v);un();v.ill=null;return{got:`rank ${r0}→${v.rank}`,bad:(v.pbs||{}).dth!==1?"NPC deathbed not examined: "+JSON.stringify(pbFullRows(v).filter(x=>!x[0]).map(x=>x[1])):v.rank!==r0+1&&seatFree(r0+1)?"NPC not promoted":""}});
  ck("pb2: truy phong — her death → title in Kiếp này",()=>{fresh();S.rank=1;S.sung=S.danh=S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex;const un=simAs(true);Q.length=0;die("Lao phổi nguy kịch, không qua khỏi");un();
   const m=Q.find(x=>x&&/(^|\s)end(\s|$)/.test(x.cls||""));const ok=m&&/Truy phong/.test(m.h)&&/truy tặng ngươi làm/.test(m.h);const r={got:(m&&(m.h.match(/truy tặng[^<]*/)||[""])[0]),bad:!m?"no end panel":!ok?"no truy phong row":""};Q.length=0;return r});
  ck("pb2: truy phong — NPC death → news, never past Hoàng quý phi",()=>{fresh();pbTpNpc();const v=liveRivals(false).find(x=>x.rank<3);v.sung=v.danh=v.duc=99;v.lastPromo=S.turn-99;v.hh=99;v.th=60;v.alive=false;dieMk(v,"ill");const un=simAs(true);const t=pbTpNpc();un();
   const w=liveRivals(false).find(x=>x.rank===6);let hi="";if(w){w.alive=false;dieMk(w,"ill");delete w.pbTp;pbTpNpc();hi=w.pbTp?"past HQP":""}
   return{got:t.slice(0,80),bad:!v.pbTp?"no title":!/Truy phong/.test(t)?"no news line":hi}});
  /* fix r1 (review FAIL 1): the death mark p.dieK — crime / disgrace / unmarked deaths get no truy phong, her and NPCs alike */
  const tpElig=()=>{S.rank=1;S.sung=S.danh=S.duc=99;S.lastPromo=S.turn-99;S.hh=60;S.th=60;S.confined=0;delete S.ex};
  const endTp=()=>{const m=Q.find(x=>x&&/(^|\s)end(\s|$)/.test(x.cls||""));const h=m?m.h:"";Q.length=0;const i=h.indexOf("kend-tp");return{m:!!m,tp:/truy tặng ngươi/.test(h),why:(i<0?"":h.slice(i,i+600)).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}};
  ck("fix: her executed (deathSentence) → no truy phong",()=>{fresh();tpElig();S.turn=Math.max(S.turn,BAL.eff.j8.mercyTurn+1);S.mercy=1;const tr=S.traits;const h0=has;has=k=>k==="nhantu"?false:h0(k);const un=simAs(true);Q.length=0;
   try{deathSentence("Bị ban chết vì tư thông với thị vệ")}finally{un();has=h0}const e=endTp();return{got:`dieK ${S.dieK} · ${e.why.slice(0,70)}`,bad:!S.dead?"not dead":!e.m?"no end panel":e.tp?"truy phong given to the executed":S.dieK!=="crime"?"no crime mark":!/mang tội/.test(e.why)?"no why line":""}});
  ck("fix: her ban chết by over() fate (j30 path) → no truy phong",()=>{fresh();tpElig();const un=simAs(true);Q.length=0;over("Tư thông bị phát giác","Chuyện tư tình bị phơi bày trước Hoàng thượng. Ngươi bị ban chết.","Ban chết: tư thông bại lộ");un();
   const e=endTp();return{got:`dieK ${S.dieK}`,bad:e.tp?"truy phong after ban chết":S.dieK!=="crime"?"fate not read as crime":""}});
  ck("fix: her disgrace (phá thai) → no truy phong; illness → yes",()=>{fresh();tpElig();let un=simAs(true);Q.length=0;die("Uống thuốc phá thai, băng huyết mà chết");un();const e1=endTp();const k1=S.dieK;
   fresh();tpElig();un=simAs(true);Q.length=0;die("Lao phổi nguy kịch, không qua khỏi");un();const e2=endTp();
   return{got:`${k1} / ${S.dieK}`,bad:e1.tp?"truy phong after a disgrace":k1!=="disgrace"?"phá thai not disgrace":!e2.tp?"illness death lost its truy phong":S.dieK!=="ill"?"illness not ill":""}});
  ck("fix: NPC executed / murdered / unmarked → news only for the murdered",()=>{fresh();pbTpNpc();const L=liveRivals(false).filter(x=>x.rank<3&&!x.queen).slice(0,3);if(L.length<3)return{got:L.length,bad:"no npcs"};
   for(const v of L){v.sung=v.danh=v.duc=99;v.lastPromo=S.turn-99;v.hh=99;v.th=60;v.confined=0;delete v.ex}
   const [a,b2,c]=L;S.turn=Math.max(S.turn,BAL.eff.j8.mercyTurn+1);a.mercy=1;const h0=has;has=k=>k==="nhantu"?false:h0(k);try{deathSentence(a,"đầu độc hoàng tử")}finally{has=h0}
   b2.suc=0;dieIf(b2,"chết sau một bát canh");c.alive=false;/* unmarked (no record) */
   const un=simAs(true);const t=pbTpNpc();un();
   return{got:`${a.dieK}/${b2.dieK}/${c.dieK} · ${t.slice(0,60)}`,bad:a.alive!==false?"a not executed":a.pbTp?"executed NPC got truy phong":new RegExp(a.name).test(t)?"news for the executed":b2.dieK!=="murder"?"poisoned not murder":!b2.pbTp?"murdered NPC lost truy phong":c.pbTp?"unmarked death got truy phong":""}});
  ck("fix: dieKOf on every her death line",()=>{const T=[["Ban chết: tư thông bại lộ","crime"],["Bị ban chết vì tư thông","crime"],["Mưu phản cùng cha, cả họ bị tru di","crime"],["Tráo con bị bắt quả tang, tội khi quân","crime"],
    ["Bị Thái y tra ra bỏ độc người hầu cung khác, giải sang Thận hình ti","crime"],["Chết dưới đòn tra khảo ở Thận Hình ti","crime"],["Tân Thái hậu xét lại chuyện cũ, ban lụa trắng, ép ngươi tuẫn táng theo tiên đế","crime"],["Bị ban rượu độc vì mưu hại X","crime"],
    ["Uống thuốc phá thai, băng huyết mà chết","disgrace"],["Uống thuốc giả chết quá liều, không tỉnh lại nữa","disgrace"],["Chết rét, chết đói trong lãnh cung","disgrace"],
    ["Khó sinh, băng huyết mà chết","birth"],["“Giữ con.” Ngươi gắng sinh hạ hài nhi rồi nhắm mắt","birth"],["Trúng độc, không qua khỏi","murder"],["Bị Lý phi hại","murder"],["Trước ngày sắc phong, X sai người đẩy ngươi xuống giếng","murder"],
    ["Lao phổi nguy kịch, không qua khỏi","ill"],["Bệnh nặng, không qua khỏi","ill"],["Tuổi trời đã tận, lão bệnh không qua khỏi, thọ 70 tuổi","ill"],["","age"]];
   const bad=T.filter(([t,k])=>dieKOf(t)!==k).map(([t,k])=>`${t.slice(0,30)}→${dieKOf(t)}≠${k}`);return{got:`${T.length-bad.length}/${T.length}`,bad:bad.join("; ")}});
  ck("pb2: quốc tang when the Emperor changes → no kỳ, no đại lễ",()=>{fresh();pbKyUpdate();const P=S.pb;const A=pbA();S.emp.era="Tân"+S.turn;pbKyUpdate();let k=0;for(let a=A;a<A+BAL.promoR.mourn-1;a++)if(pbKyAt(a))k++;
   S.month=+FEST.newyear.m;const D=P.dl||(P.dl={last:null,seen:{}});D.last=null;const t=pbDl();return{got:`mt +${P.mt-A} kỳ ${k}`,bad:P.mt==null||P.mt-A<BAL.promoR.mourn-1?"no mourning":k?"kỳ during mourning":/ban ân chiếu/.test(t)?"đại lễ during mourning":""}});
  ck("pb2: unknown girl's Sủng hidden in Phân cung why",()=>{fresh();const v=liveRivals(false).find(x=>!pbKnown(x));if(!v)return{got:"all known",bad:""};v.sung=90;const L=pcWhy(v).join(" ");const g=pbGrant;return{got:L.slice(0,80),bad:/Sủng \d/.test(L)?"Sủng shown for a stranger":""}});
  ck("old save (no S.pb) loads",()=>{fresh();delete S.pb;S.ex={to:S.rank+1,cd:S.turn+2};for(const v of rivals){delete v.pbs}exTick();monthTick();Q.length=0;return{got:!!S.pb,bad:!S.pb||!S.pb.ky?"no calendar":""}});
  return out});
 let n=0;for(const x of R){if(x.bad)n++;console.log(`${x.k.padEnd(44)} ${JSON.stringify(x.got===undefined?"":x.got).slice(0,100).padEnd(100)} ${x.bad?'BAD: '+x.bad:'ok'}`)}
 console.log('errors',errs.length?errs:'none');await b.close();srv.close();process.exit(n||errs.length?1:0)})();
