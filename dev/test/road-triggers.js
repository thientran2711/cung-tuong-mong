/* road-triggers (review/road-triggers, GAP OR16 + OR18):
   1) OR16 every origin, one 14-chapter life each, months pass on their own (no forced due): each hồi that opens is recorded with the months
      since the last hồi and its reason (A.rw). Checks: some hồi open on a REAL reason (kinds seen), the reason names a live cast person,
      the timer fallback still opens the rest, the card / hồi text carry «Cớ sự», BAL.arc.trig.on = 0 gives timer-only gaps (fb range).
   2) OR18 the Emperor's road (jnroade.js): after the reign struggle ends (or with no reign), S.emp.nr is one of the 3 new templates,
      its chapters play off-screen, move Biên cương / Kho lúa / the princes, never name an heir; history avoids last life's template.
   usage: NODE_PATH=$(npm root -g) node dev/test/road-triggers.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'PASS ':'FAIL ')+n+(c?'':' '+JSON.stringify(x).slice(0,700)))};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=777;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const t=document.getElementById('title');if(t)t.hidden=true;
  window.__life=(k,months,on)=>{BAL.arc.trig.on=on?1:0;quiet=true;try{localStorage.removeItem('ctm-arcs')}catch(e){}window.__forceOrigin=k;start();quiet=false;Q.length=0;
   const H=[],T=[];let last=null,err=null,cards=0,txt=0;
   for(let mon=0;mon<months;mon++){if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}if((S.age||0)>40)S.age=40;
    const A=S.st.M;try{
     if(A&&!A.done&&!A.cur&&A.nb&&S.turn>=A.due&&!isSrv67()){const L=storyActs67();if(L.length){cards++;if(A.rw&&/Cớ sự:/.test(L[0].t))txt++;fireBeat67(A)}}
     if(A&&A.cur){const why=A.rw?Object.assign({},A.rw):null;let live=null;if(why&&why.id){const v=/^v/.test(why.id)?RV(+why.id.slice(1)):null;live=!!(v&&v.alive&&!v.out)}
      const d=PEND.j67({t:thKey67(A),a:A.a,b:A.cur,o:[]});const inTxt=!!(d&&why&&/Cớ sự:/.test(d.t));
      H.push({a:A.a,gap:last==null?null:S.turn-last,why:why&&why.k,live,inTxt,r:why&&why.r});last=S.turn;
      const b=beatDef67(A,A.cur);const O=opts67(A,b);const i=Math.floor(Math.random()*O.length);const o=O[i];res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,b):100)}}catch(e){err=err||('beat '+e.message)}
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0;
    if(S.emp&&S.emp.nr)T.push([S.turn,S.emp.nr.r,S.emp.nr.n,S.emp.nr.k])}
   return {k:S.origin.k,H,T:T.slice(-1)[0]||null,emp:S.emp&&S.emp.nr?JSON.parse(JSON.stringify(S.emp.nr)):null,cards,txt,err}}});
 const O=(process.env.RT_O||'tt,muoi,td').split(',');const MO=+process.env.RT_M||36;const R=[],R0=[];
 for(const k of O){R.push(await p.evaluate(([k,m])=>window.__life(k,m,1),[k,MO]));console.error('life',k,R[R.length-1].H.length)}
 for(const k of ['tt','muoi']){R0.push(await p.evaluate(([k,m])=>window.__life(k,m,0),[k,MO]))}
 const all=R.flatMap(r=>r.H),rs=all.filter(h=>h.why),kinds=[...new Set(rs.map(h=>h.why))];
 const gaps=(L,f)=>L.filter(h=>h.gap!=null&&f(h)).map(h=>h.gap);const avg=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length*100)/100:0;
 console.log(JSON.stringify({hoi:all.length,byReason:rs.length,kinds,gapReason:avg(gaps(all,h=>h.why)),gapTimer:avg(gaps(all,h=>!h.why)),gapOff:avg(gaps(R0.flatMap(r=>r.H),()=>1)),
  sample:rs.slice(0,6).map(h=>h.a+': '+h.r),errs:R.concat(R0).map(r=>r.err).filter(Boolean),emp:R.map(r=>r.k+':'+(r.emp?r.emp.r+'@'+r.emp.n:'-'))}));
 chk('lives ran without script errors',R.concat(R0).every(r=>!r.err),R.concat(R0).map(r=>r.err));
 chk('OR16: some hồi open on a real reason',rs.length>=5,rs.length);
 /* each reason kind on a real cast person, state set by hand (a fresh 36-month life mostly shows grudges: they are the strongest) */
 const K=await p.evaluate(()=>{quiet=true;window.__forceOrigin='tt';start();quiet=false;Q.length=0;const v=liveRivals(false)[0];const out={};
  const ks=()=>rtWhyAll(v).map(r=>r.k);out.base=ks();
  try{q72DebtAdd(q72A('rv',v.id),-2)}catch(e){out.e1=e.message}out.debt=ks().includes('debt');
  v.nr=v.nr||{};v.nr.x=0;v.nr.c='me';out.goal=ks().includes('goal');
  S.roster=S.roster||{};S.roster.acts=(S.roster.acts||[]).concat([{id:'v'+v.id,t:'me',k:'test',ok:1}]);out.event=ks().includes('event');
  if(S.reign){S.reign.side='emp';v.rgS='quyen';out.faction=ks().includes('faction')}else out.faction='no reign';
  out.txt=rtWhyAll(v).map(r=>r.r);return out});
 console.log(JSON.stringify(K).slice(0,900));
 chk('OR16: every reason kind (debt, goal, event, faction) is read from real state',K.debt&&K.goal&&K.event&&K.faction===true,K);
 chk('OR16: the timer fallback still opens hồi with no reason',all.some(h=>!h.why&&h.gap!=null),0);
 chk('OR16: a reason names a LIVE cast person',rs.every(h=>h.live!==false),rs.filter(h=>h.live===false));
 chk('OR16: the hồi text says the reason (Cớ sự)',rs.every(h=>h.inTxt),rs.filter(h=>!h.inTxt).slice(0,3));
 chk('OR16: the Mệnh truyện card says the reason',R.reduce((a,r)=>a+r.txt,0)>=1,R.map(r=>r.txt));
 const off=R0.flatMap(r=>r.H);const fb=BAL=>0;
 const offR=await p.evaluate(()=>[BAL.arc.trig.fb[0],BAL.arc.trig.fb[0]+BAL.arc.trig.fb[1]+3]);
 chk('OR16 off: no reasons, gaps only from the timer',off.every(h=>!h.why)&&off.filter(h=>h.gap!=null).every(h=>h.gap>=offR[0]-1),off.filter(h=>h.why||h.gap!=null&&h.gap<offR[0]-1).slice(0,4));
 chk('OR16: a reason never opens a hồi in the same month as the last one',rs.every(h=>h.gap==null||h.gap>=1),rs.filter(h=>h.gap===0));
 /* ---- OR18 the Emperor's road ---- */
 const e=await p.evaluate(()=>{BAL.arc.trig.on=1;const out={};quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;
  out.tpl=Object.keys(NRM).filter(id=>NRM[id].k==='emp');out.on0=typeof nrEmpOn==='function'?nrEmpOn():null;
  if(S.trieu&&S.trieu.rg)S.trieu.rg.out=S.trieu.rg.out||'emp';out.on1=nrEmpOn();
  const T=trS();const b0=T.bien,k0=T.kho;const lines=[];const l0=log;log=function(x){lines.push(String(x));return l0.apply(this,arguments)};
  for(let i=0;i<120&&!(S.emp.nr&&S.emp.nr.x);i++){if(S.emp.nr)S.emp.nr.t=Math.min(S.emp.nr.t,S.turn);try{nrMenMonth(0)}catch(x){out.err=x.message;break}S.turn++}
  log=l0;out.nr=S.emp.nr?JSON.parse(JSON.stringify(S.emp.nr)):null;out.lines=lines.filter(x=>/Hoàng thượng/.test(x)).slice(0,4);out.db=T.bien-b0;out.dk=T.kho-k0;
  out.heir=lines.some(x=>/lập .{0,12}Thái tử|phong .{0,20}Thái tử/i.test(x)&&!/ý định|bàn|cân nhắc|bàn chuyện/i.test(x));
  try{localStorage.setItem('ctm-emproad',JSON.stringify([out.nr&&out.nr.r]))}catch(x){}
  const seen={};const last=out.nr&&out.nr.r;for(let j=0;j<12;j++){localStorage.setItem('ctm-emproad',JSON.stringify([last]));S.emp.nr=null;nrEmpInit();seen[S.emp.nr.r]=(seen[S.emp.nr.r]||0)+1}out.seen=seen;
  out.uiOk=(()=>{try{return typeof nrTitle==='function'&&out.tpl.every(id=>nrTitle(id))}catch(x){return false}})();return out});
 console.log(JSON.stringify(e).slice(0,1500));
 chk('OR18: 3 new Emperor templates registered',e.tpl.length===3,e.tpl);
 chk('OR18: no Emperor NPC road while the reign struggle runs',e.on0===false||e.on0===null&&false,e.on0);
 chk('OR18: the Emperor road starts once the struggle is over',e.on1===true&&e.nr&&e.tpl.includes(e.nr.r),e);
 chk('OR18: his chapters play to the end off-screen',e.nr&&e.nr.x===1&&e.nr.l.length>=8,e.nr);
 chk('OR18: palace news names him',e.lines.length>=1,e.lines);
 chk('OR18: never claims an heir',!e.heir,e.lines);
 chk('OR18: next life avoids the last template',!e.seen[e.nr&&e.nr.r],e.seen);
 chk('no page errors',!errs.length,errs.slice(0,5));
 await b.close();const f=ok.filter(x=>!x[1]);console.log(f.length?`FAIL ${f.length}/${ok.length}`:`PASS ${ok.length}/${ok.length}`);process.exit(f.length?1:0)})();
