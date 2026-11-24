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
   const a=exCanSit(v);toMonth(true);v.sung=v.danh=99;v.hh=99;v.th=60;v.confined=0;const b=exCanSit(v);return{got:`out ${a} in ${b}`,bad:a?"NPC may sit outside kỳ":!b?"NPC cannot sit in kỳ: "+JSON.stringify(exBase(v).filter(x=>!x[0]).map(x=>x[1])):""}});
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
  ck("old save (no S.pb) loads",()=>{fresh();delete S.pb;S.ex={to:S.rank+1,cd:S.turn+2};for(const v of rivals){delete v.pbs}exTick();monthTick();Q.length=0;return{got:!!S.pb,bad:!S.pb||!S.pb.ky?"no calendar":""}});
  return out});
 let n=0;for(const x of R){if(x.bad)n++;console.log(`${x.k.padEnd(44)} ${JSON.stringify(x.got===undefined?"":x.got).slice(0,100).padEnd(100)} ${x.bad?'BAD: '+x.bad:'ok'}`)}
 console.log('errors',errs.length?errs:'none');await b.close();srv.close();process.exit(n||errs.length?1:0)})();
