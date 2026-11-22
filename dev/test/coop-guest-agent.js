/* review/coop-guest-agent: a co-op GUEST's own servants live the agent month (jagstaff asMonth) EXACTLY ONCE across the room, like solo.
   One page, seeded dice, three seats of the same life (each from the same seed):
   SOLO   agOn() true: 12 months → her staff paid / Sức once a month, aged once a year, ban gả + the age choice reached.
   GUEST  agGuest() true (her phone ≤ 12; the host in her context at 13): before the fix asMonth returned "" (0 wages, nobody married off / left by age);
          now her OWN household runs once a month (same counts as SOLO), NPC households are never touched by her seat (the host runs them).
   HOST   the host's copy of her: buildFriend gives her stand-in staff:[] (so the host never runs her people), and a friend who plays a MAID
          (s.coop stand-in in an NPC's staff) is skipped by asMonth / asStaff (her own phone lives her month).
   Also: j42 maidLoveMonth's old Ban gả dice never grant one of her own maids on the guest while her agent month runs (never twice).
   usage: python3 dev/build/assemble.py && node dev/test/coop-guest-agent.js [dev/index.html]   → exit 1 on FAIL or page error */
/* coop-real: n/a — ONE page, no room and no second seat (the guest/host modes only stub agGuest()); there is no friend entry or host copy to make real (review/coop-real-port) */
const {chromium}=require('playwright');const path=require('path');
const HTML=path.resolve(process.argv[2]||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
async function life(b,mode){const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+HTML,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof asMonth==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate(mode=>{let sd=20261120;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=true;
  const g0=window.agGuest,m0=window.mlGuest;if(mode==="guest"){window.agGuest=()=>true;window.mlGuest=()=>true}
  /* her household: 3 maids + 1 eunuch, one maid near the age question, one granted-ready (loyal, bậc ≥ 1) */
  S.rank=Math.max(S.rank||0,5);S.staff=S.staff||[];fillStaff(S,true);/* her rank's cap (capTrim keeps her household inside it every month) */
  const M=S.staff.filter(s=>s.role==="maid");M[0].age=BAL.srvAge.ask;M[0].ageDone=0;M[0].loyal=10;M[1].loyal=100;M[1].rk=Math.max(1,M[1].rk||1);M[1].age=20;
  const GD=Object.getOwnPropertyDescriptor(BAL.srvGrant,"base");Object.defineProperty(BAL.srvGrant,"base",{value:40,configurable:true,writable:true});/* the grant reachable inside 12 months on every seat (same number on every seat) */
  /* host only: a friend who plays a maid sits in an NPC's staff as an s.coop stand-in */
  let fm=null;if(mode==="host"){const v=liveRivals(false).find(x=>x&&x.alive&&!x.out);if(v){v.staff=v.staff||[];fm={sid:950,coop:true,name:"Hảo Hữu",role:"maid",age:BAL.srvAge.out+1,loyal:100,rk:2,af:{},bac:0};v.staff.push(fm)}}
  const mine=new Set(S.staff.map(s=>s.sid));const npc=[];for(const v of liveRivals(true))if(v!==S)for(const s of v.staff||[])if(s.sid!=null&&!s.coop)npc.push(s);
  const P3={mine:0,npc:0},FADE={n:0,bad:0};const p30=window.p3Cnv;if(p30)window.p3Cnv=function(x){const o=ownerOf(x);if(o===S)P3.mine++;else P3.npc++;return p30.apply(this,arguments)};
  const C={};const c0=window.asC;window.asC=function(s,k){if(s&&mine.has(s.sid)&&/^grant|^age_/.test(k))C[k]=(C[k]||0)+1;return c0.apply(this,arguments)};
  const fmLost=[];const W={},A={};let Mo={},Mk={};const a0=window.asAp;window.asAp=function(s,fx){if(fx&&fx.suc===BAL.ag.staff.monthSuc&&fx.bac&&!window.__cgaPost){const k=s.coop?"coop":(mine.has(s.sid)||ownerOf(s)===S)?"mine":"npc";/* a maid she hires later is hers too */W[k]=(W[k]||0)+1;A[s.sid]=(A[s.sid]||0)+1;Mo[s.sid]=(Mo[s.sid]||0)+1;if(k==="mine")Mk[s.sid]=1}return a0.apply(this,arguments)};
  const age0={};for(const s of S.staff)age0[s.sid]=s.age||0;const out={},lov={grant:0};
  const ml0=window.maidLoveMonth;/* count the old dice grant of HER maids (line «được chủ ban gả cho») */const L0=window.log;window.log=function(t){try{if(/được chủ ban gả cho/.test(t)&&[...mine].some(id=>{const s=servById(id);return s&&t.indexOf(s.name)===0}))lov.grant++}catch(e){}return L0.apply(this,arguments)};
  const runs={as:0,mine:0};const am0=window.asMonth;
  let err="";const months=[];
  try{for(let m=0;m<12;m++){Mo={};Mk={};S.tuan=2;if(M[1]&&!M[1].out)M[1].loyal=100;S.ill=null;S.suc=Math.max(S.suc||0,60);S.preg=0;/* keep her alive: the probe is about her staff */const rg=(S.staff||[]).filter(x=>x.role==="maid"&&!x.out);for(const x of rg)x.sung=20;monthTick();for(const x of rg)if(!x.out&&(S.staff||[]).includes(x)){FADE.m=(FADE.m||0)+1;if(x.sung===20-amD().decay)FADE.n++;else if(x.sung!==20)FADE.bad++}const paid=Object.keys(Mk).length;const twice=Object.keys(Mo).filter(id=>Mo[id]>1).length;/* twice: ANY staff (hers, an NPC's, the friend's stand-in) paid more than once in one month */
    months.push([paid,twice]);if(fm&&!fmLost.length&&!liveRivals(false).some(v=>(v.staff||[]).includes(fm)))fmLost.push(m,fm.out||0,(()=>{const v=liveRivals(true).concat(rivals).find(x=>x&&(x.staff||[]).includes(fm));return v?v.name:"none"})(),(window.__fmWhy||""));if(S.dead)break}}catch(e){err=e.message+" "+String(e.stack).slice(0,300)}
  /* review r1: a fresh young maid after the 12 months, one more servMonth: his regard of her fades exactly once on every seat (the in-loop count is empty when the seed sends her maids away in month 1) */
  if(!S.dead)try{FADE.p3=0;const x=mkServ("maid");x.age=18;x.sung=20;x.loyal=60;S.staff.push(x);const mo=S.month;window.__cgaPost=1;try{S.month=2;servMonth();FADE.post=(S.staff||[]).includes(x)?(x.sung===20-amD().decay?1:"sung "+x.sung):"gone";/* a fest month: the p3 cards of the same fresh maid */S.month=1;const p0=P3.mine;servMonth();FADE.p3=P3.mine-p0}finally{window.__cgaPost=0;S.month=mo}}catch(e){FADE.post="err "+e.message}
  for(const id of mine){const s=servById(id);const all=[...(S.staff||[])];const here=all.find(x=>x.sid===id);if(!here){const x=Object.values(window).length&&null;out[id]=1}}
  const gone=[...mine].filter(id=>!(S.staff||[]).some(x=>x.sid===id));
  const outWhy={};for(const id of gone){let w="?";try{for(const s of (window.__cgaSeen||[]))if(s.sid===id)w=s.out}catch(e){}outWhy[id]=w}
  const aged=S.staff.filter(s=>age0[s.sid]!=null).map(s=>(s.age||0)-age0[s.sid]);
  /* DAY: 2 days × 4 buổi; her staff's acts (asC per sid) on this seat; host = the host stepping her buổi in her context (COOPW.ctx "b") */
  const DAY={mine:0,npc:0,again:0,ticks:0};const c1=window.asC;window.asC=function(x,k){if(x&&x.sid!=null){if(ownerOf(x)===S)DAY.mine++;else DAY.npc++}return c1.apply(this,arguments)};
  const cw=window.COOPW,cs={on:cw.on,seat:cw.seat,ctx:cw.ctx};
  try{for(let d=0;d<2;d++)for(let bu=0;bu<4;bu++){S.buoi=bu;if(mode==="host"){cw.on=true;cw.seat="a";cw.ctx="b"}const m0=ASN.mine||0;
    if(mode==="solo"){ASN.key="";asTick()}else{asTick();const m1=ASN.mine||0;asTick();if((ASN.mine||0)!==m1)DAY.again++;DAY.ticks+=m1-m0}
    if(mode==="host"){cw.on=cs.on;cw.seat=cs.seat;cw.ctx=cs.ctx}S.agS&&(S.agS.d=S.agS.d);if(bu===3)S.turn=(S.turn||0)+1}}catch(e){err+=" day: "+e.message}finally{cw.on=cs.on;cw.seat=cs.seat;cw.ctx=cs.ctx;window.asC=c1}
  if(p30)window.p3Cnv=p30;
  const flags={asOn:asOn(),self:asSelfOn(S)};const ageAsked=M[0].ageDone===1;const granted=(C.grantWed||0)+(C.grantStay||0)>0;const npcPaid=W.npc||0;Object.defineProperty(BAL.srvGrant,"base",GD);window.agGuest=g0;window.mlGuest=m0;window.asAp=a0;window.log=L0;window.asC=c0;
  return{mode,err,months,W,gone:gone.length,aged,lov,fmOut:fm?{paid:A[950]||0,out:fm.out||0,inStaff:liveRivals(false).some(v=>(v.staff||[]).includes(fm))}:null,
   npcN:npc.length,ageAsked,granted,C,fmLost,P3,FADE,DAY,dead:!!S.dead,asOn:flags.asOn,self:flags.self,staffN:[...mine].length,ASN:{out:ASN.out||0,grant:(ASN.maid.grantWed||0)+(ASN.maid.grantStay||0),age:Object.keys(ASN.maid).filter(k=>/^age_/.test(k)).reduce((a,k)=>a+ASN.maid[k],0)},
   friendStaff:(()=>{try{const P={pid:902,name:"X",S:Object.assign(JSON.parse(JSON.stringify(ser().S)),{kc:null,dead:false,staff:[{sid:1,role:"maid",name:"a"}]}),life:0};const v=COOPW.X.buildFriend(P,S);return v?(v.staff||[]).length:-1}catch(e){return"err "+e.message}})()}},mode);
 await p.close();return{r,errs}}
(async()=>{const b=await chromium.launch();const R={};
 for(const m of ["solo","guest","host"]){let x=await life(b,m);for(let t=0;t<2&&x.r&&(x.r.dead||x.r.FADE&&x.r.FADE.post==="gone");t++){console.log(m,"retry: probe life died / fresh maid left (harness, not the subject)");x=await life(b,m)}R[m]=x.r;console.log(m,JSON.stringify(x.r));ok(!x.r.err,`${m}: 12 months ran`,x.r.err||undefined);ok(!x.errs.length,`${m}: no page error`,x.errs.slice(0,3))}
 const S=R.solo,G=R.guest,H=R.host;
 const once=r=>r.months.every(([p,t])=>t===0);
 ok(S.months.every(([p])=>p>0)&&once(S),'SOLO: her staff paid exactly once every month',S.months);
 ok(G.months.every(([p])=>p>0)&&once(G),'GUEST: her OWN staff paid exactly once every month (was 0: asMonth off on the guest)',G.months);
 ok(G.months.every(([p,t])=>t===0)&&G.W.mine===G.months.reduce((a,x)=>a+x[0],0),'GUEST: every wage of her staff is counted in a month where each was paid once (never twice)',{W:G.W.mine});
 ok((G.W.npc||0)===0,'GUEST never runs an NPC household month (the host does)',G.W);
 ok((S.W.npc||0)>0&&(H.W.npc||0)>0,'SOLO / HOST still run every NPC household',{s:S.W.npc,h:H.W.npc});
 ok(G.ageAsked&&S.ageAsked,'GUEST: the age choice (Xuất cung / ma ma / ở lại) asked of her maid at BAL.srvAge.ask, as SOLO',{g:G.ageAsked,s:S.ageAsked});
 ok(G.granted&&S.granted,'GUEST: Ban gả offered to her loyal maid (agent choice: xuất giá, or ở lại with Chủ tin −stayLoy), as SOLO',{g:G.granted,s:S.granted});
 ok(G.lov.grant===0,'GUEST: the old j42 dice never also grant one of her maids (never twice)',G.lov);
 ok(G.aged.length&&G.aged.every(a=>a===1)&&S.aged.every(a=>a===1),'GUEST: every staff still with her aged exactly one year in 12 months, as SOLO',{g:G.aged,s:S.aged});
 ok(G.asOn===false&&G.self===true,'GUEST: agOn stays false (the world stays the host\'s), agSelf(S) true',{asOn:G.asOn,self:G.self});
 ok(H.friendStaff===0&&S.friendStaff===0,'HOST: her stand-in (buildFriend) carries no staff → the host never runs her people',{h:H.friendStaff});
 ok(H.fmOut&&H.fmOut.paid===0&&!H.fmOut.out,'HOST: a friend playing a maid (s.coop stand-in) is never paid / married off / aged out by the host',H.fmOut);
 /* r2: the rest of her people's life (Foreman B: same family) */
 ok(G.DAY.mine>0&&G.DAY.npc===0&&G.DAY.ticks===8&&G.DAY.again===0,'GUEST: her staff act every buổi (day acts), once per buổi key, no NPC staff acts on her seat',G.DAY);
 ok(H.DAY.mine>0&&H.DAY.npc===0&&H.DAY.ticks===8&&H.DAY.again===0,'HOST in her context (her buổi step, level ≥ 5): her staff act once per buổi, no NPC staff',H.DAY);
 ok(S.DAY.ticks===0,'SOLO: staff day acts stay on the jagday day plan (asTick unchanged: planned → no extra tick)',S.DAY);
 ok(G.FADE.n>0&&G.FADE.bad===0,'GUEST: his regard of her maids fades once a month (amD decay), never twice',G.FADE);
 ok((S.FADE.n>0||!S.FADE.m)&&S.FADE.post===1,'SOLO: fade runs (unchanged path; a maid his night touched that month may differ; + a fresh maid after the 12 months fades once)',S.FADE);
 ok(G.FADE.post===1&&H.FADE.post===1,'GUEST / HOST: a fresh maid after the 12 months fades exactly once',{g:G.FADE.post,h:H.FADE.post});
 ok((G.P3.mine>0||G.FADE.p3>0)&&G.P3.npc===0,'GUEST: her maids get their monthly p3 cards (fest months; + the fresh maid in a fest month), no NPC maid on her seat',{P3:G.P3,post:G.FADE.p3});
 ok(S.P3.mine+S.P3.npc>0,'SOLO / HOST: p3 cards still run for every household',{s:S.P3,h:H.P3});
 const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`ALL OK ${res.length}`);await b.close();process.exit(f?1:0)})();
