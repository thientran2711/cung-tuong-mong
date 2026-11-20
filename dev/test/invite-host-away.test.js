/* HOST-ABSENT RULE (owner OD L1976, 19/11 ~22:00Z) — bot scenarios.
   node dev/test/invite-host-away.test.js [dev/index.html]
   A invite at khắc 1 → she walks to Ngự hoa viên (khắc 2→3) → the guest arrives khắc 3 at HER palace and WAITS (not gone in the arrival khắc)
   B she walks home (khắc 4); guest's khắc-4 decision forced STAY → she meets the guest at home
   C same, decision forced LEAVE → nobody at home, relation loss = BAL.invite.wait.loss, one notice «… sang chơi không gặp, đã ra về», roster row "back"
   D host back in time (she is home at the arrival khắc) → no wait, visit as before
   E TWO-WAY: an NPC host invites HER, the host is away when she arrives → she waits; walking off = leaving (loss); host there = visit
   F NPC ↔ NPC: host away → guest waits, decides per khắc, leaves with loss and walks back
   G same draw on a second run (hash, no Math.random: co-op seats agree); odds read BAL (one core); stayO shown only as ladder word
   H no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}
  window.__bot=1;Q.length=0;S.mg=0;BAL.invite.hate=-999;
  const toB0=()=>{for(let i=0;i<12&&(i<1||!((S.buoi||0)===0&&used===0));i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}if(S.place!=="home")goTo("home");Q.length=0};
  /* the guest always says yes (her answer is not under test here) */
  const rA=rcvAsk;rcvAsk=function(k,h,g){if(k==="invite"&&g!==S){rcvInvAt(h,g);g.__invC=1;return""}return rA.apply(this,arguments)};
  /* her walk out of her palace asks who follows (j95s entourage card): she goes with the first answer */
  const walk=k=>{Q.length=0;S.mg=0;goTo(k);for(let n=0;n<4&&Q.length;n++){const q=Q.pop();const O=(q.opts||[]).filter(z=>z&&z.go&&z.n!=="Thôi");const x=O.find(z=>/một mình|Vào thẳng/i.test(z.n||""))||O[0];(window.__wl=window.__wl||[]).push([q.t,x&&x.n,used,S.place]);if(x)x.go()}Q.length=0};/* the cards on the way (who follows · bow to the palace head) take their first answer */
  const LOSS=[];const rl0=relAdd;relAdd=function(x,y,n){if(n===BAL.invite.wait.loss)LOSS.push([x===S?"me":x&&x.id,y===S?"me":y&&y.id]);return rl0.apply(this,arguments)};
  const W=PTIME_IW;const free=()=>liveRivals(true).filter(x=>x.alive&&!x.out&&!x.confined&&!sameHouse(S,x));
  const relOf=v=>aff(v,S);
  const run=(force)=>{toB0();S.invW=[];PT.stat.iwLast=null;LOSS.length=0;const v=free()[0];const R0={};const a0=relOf(v);
   const dr=W.draw;if(force!=null)PTIME_IW.__f=force;
   invite(v.id);const t1=used;/* khắc 1 → 2 */
   walk("vuon");const t2=used;Q.length=0;/* arrives Ngự hoa viên */
   const ia=ptZ().find(a=>a.kind==="invite"&&a.a&&a.a.v===v.id);
   const wz=S.invW.map(w=>Object.assign({},w));const gk=S.roster&&S.roster.P["v"+v.id]?S.roster.P["v"+v.id][j95kh()]:null;
   const r={v:v.id,t1,t2,landed:!!(ia&&ia.back),wait:wz.length,whereAtArr:S.where[v.id],gk};
   /* the walk is 2 khắc: the guest lands at the due khắc 3 while she walks, khắc 4 (her arrival at the garden) is the first decision; the walk home is free (j2 goTo) */
   r.last=PT.stat.iwLast?Object.assign({},PT.stat.iwLast):null;goTo("home");Q.length=0;
   r.t3=used;r.left=S.invW.length===0;r.whereHome=S.where[v.id];r.atHome=curPeople().some(p=>p.ref===v);r.dRel=relOf(v)-a0;r.loss=LOSS.slice();
   const e=S.roster&&S.roster.P["v"+v.id];r.row=e?e[Math.min(e.length-1,j95kh())]:null;r.note=(S.logs||[]).slice(0,4).map(x=>String(x).replace(/<[^>]*>/g,"")).join(" | ");return r};
  /* force the khắc-4 draw: 0 → stay, 99 → leave */
  const d0=iwDraw;
  iwDraw=()=>0;BAL.invite.wait.o=100;o.B=run();
  iwDraw=()=>99;BAL.invite.wait.o=-100;o.C=run();iwDraw=d0;BAL.invite.wait.o=55;
  /* D host home at arrival */
  toB0();S.invW=[];{const v=free()[1]||free()[0];invite(v.id);spend(BAL.ptime.kinds.invite.n-BAL.ptime.kinds.invite.o);o.D={wait:S.invW.length,where:S.where[v.id]}}
  /* E NPC host invites her; host away by roster */
  toB0();S.invW=[];{const h=free().find(x=>!x.queen&&palaceOf(x)!=="home");const k=palaceOf(h);const e=S.roster&&S.roster.P["v"+h.id];const kh=j95kh();if(e)for(let i=kh;i<e.length;i++)e[i]=["vuon","stay",null,"dạo vườn"];
   const a0=aff(h,S);rcvInvAt(h,S);o.E={reg:S.invW.length,k};walk(k);o.E.there=S.place===k;o.E.wait=S.invW.length;o.E.t=S.invW[0]&&S.invW[0].t;
   goTo("home");Q.length=0;o.E.left=S.invW.length===0;o.E.dRel=aff(h,S)-a0;
   /* host there → visit */
   toB0();S.invW=[];LOSS.length=0;const m0=PT.stat.iwMet||0;rcvInvAt(h,S);const e2=S.roster&&S.roster.P["v"+h.id];if(e2)for(let i=j95kh();i<e2.length;i++)e2[i]=[k,"stay",null,"ở cung"];/* unit step: she stands at the host's palace while the host is there (the walk itself is covered above) */const pl0=S.place;S.place=k;iwTick();o.E.meet=S.invW.length===0&&(PT.stat.iwMet||0)===m0+1&&!LOSS.length;S.place=pl0;}
  /* F NPC ↔ NPC */
  toB0();S.invW=[];{const L=free();const h=L[0],g=L[1];const e=S.roster&&S.roster.P["v"+h.id];const kh=j95kh();if(e)for(let i=kh;i<e.length;i++)e[i]=["vuon","stay",null,"dạo vườn"];
   const a0=aff(g,h);rcvInvAt(h,g);o.F={wait:S.invW.length,row:(S.roster.P["v"+g.id]||[])[kh]};const now0=ptNow();iwDraw=()=>99;spend(1);iwDraw=d0;
   o.F.left=S.invW.length===0;o.F.dRel=aff(g,h)-a0;o.F.row2=(S.roster.P["v"+g.id]||[])[j95kh()];o.F.now=[now0,ptNow()]}
  /* G determinism + one core */
  {const w={id:"iwX"};o.G={d1:W.draw(w,7),d2:W.draw(w,7)};const v=free()[0];o.G.o=W.stayO(v,S);o.G.word=word(o.G.o);o.G.loss=BAL.invite.wait.loss}
  o.err=PT.stat.errs.slice();return o});
 const L=r=>JSON.stringify(r);const loss=r.G.loss;
 ok(r.B.landed&&r.B.t2>=3&&r.B.wait===1&&r.B.whereAtArr==="home","A guest arrives at her palace while she is away and WAITS (arrival khắc)",r.B);
 ok(r.B.t3===r.B.t2&&r.B.left&&r.B.whereHome==="home"&&r.B.atHome,"B she comes home at the next khắc, the guest stayed → they meet",{t3:r.B.t3,where:r.B.whereHome,atHome:r.B.atHome});
 ok(r.C.left&&r.C.last&&r.C.last.t===r.C.last.K-1&&r.C.whereHome!=="home"&&!r.C.atHome&&r.C.loss.length===1&&r.C.row&&r.C.row[1]==="back"&&/sang chơi không gặp, đã ra về/.test(r.C.note),"C guest decided LEAVE at khắc 4 → nobody home, loss, notice, walk back row",r.C);
 ok(r.D.wait===0&&r.D.where==="home","D host home at the arrival khắc → no wait, visit as before",r.D);
 ok(r.E.reg===1&&r.E.there&&r.E.wait===1&&r.E.t!=null&&r.E.left&&r.E.dRel===loss&&r.E.meet,"E two-way: NPC host away when she comes → she waits; walking off = leaving with loss; host there = visit",r.E);
 ok(r.F.wait===1&&r.F.row&&r.F.row[1]==="visit"&&r.F.left&&r.F.dRel===loss&&r.F.row2&&r.F.row2[1]==="back","F NPC ↔ NPC: guest waits, leaves at the next khắc, loss, walks back",r.F);
 ok(r.G.d1===r.G.d2&&typeof r.G.o==="number"&&!/%/.test(r.G.word),"G hash draw same on every seat, odds from BAL, ladder word",r.G);
 ok(!errs.length&&!r.err.length,"H no page errors",{errs:errs.slice(0,3),pt:r.err});
 await b.close();const n=res.filter(x=>x).length;console.log(`INVITE-HOST-AWAY ${n}/${res.length} ${n===res.length?'PASS':'FAIL'}`);process.exit(n===res.length?0:1)})();
