/* road-triggers (review/road-triggers, GAP OR16 + OR18):
   1) OR16 every origin, one 14-chapter life each, months pass on their own (no forced due): each hồi that opens is recorded with the months
      since the last hồi and its reason (A.rw). Checks: some hồi open on a REAL reason (kinds seen), the reason names a live cast person,
      the timer fallback still opens the rest, the card / hồi text carry «Cớ sự», BAL.arc.trig.on = 0 gives timer-only gaps (fb range).
   2) OR18 the Emperor's road (jnroade.js): after the reign struggle ends (or with no reign), S.emp.nr is one of the 3 new templates,
      its chapters play off-screen, move Biên cương / Kho lúa / the princes, never name an heir; history avoids last life's template.
   usage: NODE_PATH=$(npm root -g) node dev/test/road-triggers.js <url> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,URL]=process.argv;
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
  S.roster=S.roster||{};S.roster.acts=(S.roster.acts||[]).concat([{id:'v'+v.id,t:'me',k:'rumor',ok:1}]);out.event=ks().includes('event');
  if(S.reign){S.reign.side='emp';v.rgS='quyen';out.faction=ks().includes('faction')}else out.faction='no reign';
  out.txt=rtWhyAll(v).map(r=>r.r);return out});
 console.log(JSON.stringify(K).slice(0,900));
 chk('OR16: every reason kind (debt, goal, event, faction) is read from real state',K.debt&&K.goal&&K.event&&K.faction===true,K);
 /* ---- r2 (FAIL 72a9b918): fix 1 law 6 (the line says the kind of deed), fix 2 law 1 (HER deeds really give the reverse line), N1, N3 ---- */
 const K2=await p.evaluate(()=>{window.__life('tt',6,1);/* a life some months in, then on until a chapter (S.st.M) with a next hồi runs */for(let m=0;m<36&&!(S.st.M&&S.st.M.nb&&!S.st.M.done);m++){const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}try{nextBuoi()}catch(e){break}}}Q.length=0;const v=liveRivals(false)[0];const nm=v.name;const out={nm,rows:{}};
  const ev=()=>{const r=rtWhyAll(v).find(x=>x.k==='event');return r?r.r:null};
  const put=(x)=>{S.roster=S.roster||{};S.roster.acts=[x]};
  for(const k of ['gift','visit','ally','tieuhuy','present','chosen','misbelief','warn','cleared','ag:visit','ag:provoke','rumor','expose','giahoa','plot','provoke'])
   {put({id:'v'+v.id,t:'me',k,ok:1});out.rows[k]=ev()}
  /* her deed through the real path (runAct, j9): tries until one goes through (her odds are real); the ledger row must be hers */
  const tryAct=(k,n)=>{for(let i=0;i<n;i++){S.roster.acts=[];let r='';try{r=runAct(S,v,k)}catch(e){return {err:e.message}}const row=(S.roster.acts||[]).find(x=>x.id==='me'&&x.t==='v'+v.id);if(row)return {k,row,line:ev(),txt:String(r).slice(0,80)}}return {k,none:1}};
  out.hostile=tryAct('rumor',40);
  const fk=Object.keys(ACT).filter(k=>F95.has(k));out.fk=fk;out.friendly=fk.length?tryAct(fk.find(k=>k!=='gift')||fk[0],40):null;
  /* the reverse reason really OPENS a hồi (rtTry on the chapter, cast = that person) */
  const A=S.st.M;/* the hồi's {v} = v when the chapter has no cast slot filled yet (state by hand, as above) */try{if(A&&A.nb&&!rtCast(A).length){A.act=A.act||{};A.act.v=v.id}}catch(e){}out.open={why:'no chapter / next hồi / cast',A:!!A,nb:A&&A.nb,done:A&&A.done,cast:A&&A.nb?rtCast(A).map(c=>c.name):null};try{if(A&&A.nb){const cast=rtCast(A);const w=cast[0];if(w){A.cur=null;A.done=0;A.lt=S.turn-3;A.due=S.turn+5;A.rw=null;S.roster.acts=[{id:'me',t:'v'+w.id,k:'rumor',ok:1}];
    for(const c of cast)if(c!==w){try{c.__keep=1}catch(e){}}const ow=hostility;const oo=oan;hostility=()=>0;oan=()=>0;const sv=S.reign;S.reign=null;let r=null;try{const q=typeof q72==='function'?q72():null;const d0=q&&JSON.stringify(q.d);if(q)q.d={};const nr0=cast.map(c=>c.nr);cast.forEach(c=>{c.nr=null});S.out=0;S.dead=false;try{if(S.npw)delete S.npw[npwCk('hoi67',w)]}catch(e){}/* w has not moved a hồi lately (state by hand) */r=rtTry(A);cast.forEach((c,i)=>{c.nr=nr0[i]});if(q)q.d=JSON.parse(d0)}finally{hostility=ow;oan=oo;S.reign=sv}
    out.open={who:w.name,r:r&&r.r,k:r&&r.k,due:A.due===S.turn,on:rtOn(),npw:typeof npwOn==='function'&&npwOn(),out:S.out,why:rtWhyAll(w).map(x=>x.k+':'+x.s)}}}}catch(e){out.open={err:e.message}}
  /* N1 faction words, N3 both debt books */
  if(S.reign){S.reign.side='emp';v.rgS='quyen';out.fac=rtWhyAll(v).filter(r=>r.k==='faction').map(r=>r.r)}
  try{const q=q72();q.d={};v.queen=1;q72DebtAdd(q72A('rv',v.id),-2);out.debtRv=rtDebt(v);q72DebtAdd(q72A('hh',v.id),-1);out.debtBoth=rtDebt(v);v.queen=0;q.d={}}catch(e){out.debtErr=e.message}
  return out});
 console.log(JSON.stringify(K2).slice(0,2500));
 const HOST=/vừa ra tay/;const R2=K2.rows;
 chk('r2 fix 1: a GIFT entry never prints the hostile line (gửi lễ vật instead)',R2.gift&&!HOST.test(R2.gift)&&/gửi lễ vật/.test(R2.gift),R2.gift);
 chk('r2 fix 1: friendly kinds (visit / ally / tieuhuy) give their own true line, never «ra tay»',['visit','ally','tieuhuy'].every(k=>R2[k]&&!HOST.test(R2[k])),R2);
 chk('r2 fix 1: no reason from present / chosen / misbelief / warn / agent plans',['present','chosen','misbelief','warn','ag:visit','ag:provoke'].every(k=>R2[k]===null),R2);
 chk('r2 fix 1: «cleared» says the misunderstanding is over',/hết hiểu lầm/.test(R2.cleared||''),R2.cleared);
 chk('r2 fix 1: hostile kinds (rumor / expose / giahoa / plot / provoke) give «vừa ra tay với ngươi»',['rumor','expose','giahoa','plot','provoke'].every(k=>/vừa ra tay với ngươi/.test(R2[k]||'')),R2);
 chk('r2 fix 2: HER rumour (runAct) lands in the people ledger and gives «ngươi vừa ra tay với X»',K2.hostile&&K2.hostile.row&&/^ngươi vừa ra tay với /.test(K2.hostile.line||''),K2.hostile);
 chk('r2 fix 2: HER friendly deed gives its own reverse line (no «ra tay»)',!K2.friendly||K2.friendly.none||(K2.friendly.row&&K2.friendly.line&&/^ngươi vừa/.test(K2.friendly.line)&&!HOST.test(K2.friendly.line)),K2.friendly);
 chk('r2 fix 2: the reverse reason really opens the hồi (rtTry, A.due = now)',K2.open&&K2.open.due&&K2.open.k==='event'&&/^ngươi vừa ra tay với /.test(K2.open.r||''),K2.open);
 chk('r2 N1: faction worded as the standing state',!K2.fac||K2.fac.every(t=>!/lấn tới|cần ngươi/.test(t)),K2.fac);
 chk('r2 N3: a Hoàng hậu\'s debt in both books counts (rv + hh)',K2.debtRv===-2&&K2.debtBoth===-3,K2);
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
 /* ---- r2 fix 3: his help hồi has his own asks (NRASK em_*), voice trẫm, never kind emp, «do» / {B} only on em_cai with a real rival ---- */
 const E3=await p.evaluate(()=>{const out={ids:{},pick:{},offer:[]};for(const r of ['em_bien','em_cai','em_ke'])for(let n=5;n<=10;n++){const L=nrAskL(r,n);out.ids[r+'_'+n]=L.map(a=>a.k).join('+')}
  for(const r of ['em_bien','em_cai','em_ke']){const ks=new Set();for(let i=0;i<30;i++){const K=nrAskPick({r,n:7},nrCh(r,7),'emp',r==='em_cai');ks.add(K.av>=0?K.hk:'stock:'+K.hk)}out.pick[r]=[...ks]}
  /* the real offer: the Emperor's road at its help chapter → a j72 nr_* quest with HIS ask (p.av ≥ 0), text in trẫm voice */
  quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;if(S.trieu&&S.trieu.rg)S.trieu.rg.out=S.trieu.rg.out||'emp';S.sung=100;try{S.st.ch.n=Math.max(S.st.ch.n,BAL.st14.parts[1][0])}catch(x){}/* past her learning chapters (nrLearn) */
  for(const r of ['em_bien','em_cai','em_ke']){try{const q=q72();q.ch=q.ch.filter(c=>!/^nr_/.test(c.tid));q.a=q.a.filter(c=>!/^nr_/.test(c.tid));S.emp.nr=nrNew('emp',r);const N=S.emp.nr;N.n=N.h||6;N.hs=0;N.t=S.turn;
    const e=nrMenL().find(x=>x.g==='emp');const ok=e&&nrMenAsk(e)&&nrMenOffer(e);const c=q.ch[q.ch.length-1];const X=c&&q72X(c);
    let txt='';try{const T=X&&X.T;const st=T&&T.s&&T.s[0];txt=X?[typeof T.h==='function'?T.h(X):T.h,st&&(typeof st.n==='function'?st.n(X):st.n),...(st&&st.ch||[]).slice(0,2).map(o=>typeof o.n==='function'?o.n(X):o.n)].join(' | '):''}catch(x){txt='ERR '+x.message}
    out.offer.push({r,ok:!!ok,tid:c&&c.tid,av:c&&c.p&&c.p.av,bk:c&&c.bk,txt:String(txt).slice(0,400)})}catch(x){out.offer.push({r,err:x.message})}}
  return out});
 console.log(JSON.stringify(E3).slice(0,3000));
 chk('r2 fix 3: 36 Emperor asks, 2 per help chapter, never kind emp',Object.values(E3.ids).length===18&&Object.values(E3.ids).every(s=>s.split('+').length===2&&!/(^|\+)emp(\+|$)/.test(s)),E3.ids);
 chk('r2 fix 3: «do» only on em_cai',!/do/.test(Object.entries(E3.ids).filter(([k])=>!/^em_cai/.test(k)).map(x=>x[1]).join(' '))&&E3.pick.em_bien.every(k=>k!=='do')&&E3.pick.em_ke.every(k=>k!=='do'),E3);
 chk('r2 fix 3: his help hồi draws HIS ask (not the stock card)',['em_bien','em_cai','em_ke'].every(r=>E3.pick[r].every(k=>!/^stock/.test(k))),E3.pick);
 chk('r2 fix 3: the real offer carries his ask (p.av ≥ 0) in trẫm voice, {B} filled on em_cai only',E3.offer.every(o=>o.ok&&o.av>=0&&/[Tt]rẫm/.test(o.txt)&&!/[{}]/.test(o.txt)&&(o.r==='em_cai'?true:!o.bk)),E3.offer);
 chk('no page errors',!errs.length,errs.slice(0,5));
 await b.close();const f=ok.filter(x=>!x[1]);console.log(f.length?`FAIL ${f.length}/${ok.length}`:`PASS ${ok.length}/${ok.length}`);process.exit(f.length?1:0)})();
