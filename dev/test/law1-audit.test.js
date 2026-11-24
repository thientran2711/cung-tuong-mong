/* review/law1-audit (owner OD 24/11 ~08:35Z, law 1 two-way): the B gaps closed — an NPC holds HER card in Ban cung and in the wardrobe.
   usage: node dev/test/law1-audit.test.js [dev/index.html]
   1 Ban cung: a newly made chủ vị NPC — humble nết → asks the humble palace (bcAsk, same odds/gains); other nết → asks up when the odds word allows;
     no ask → takes the decree with Đức + BAL.banCung.ok.ducTake (her «Nhận»). Her own ceremony card is unchanged (Nhận / Xin … rows).
   2 Wardrobe: an NPC short of silver pawns (nết in BAL.net.n.wdPawn) or sells (others) through wdPawn / wdSell; she redeems when silver stays above
     BAL.ag.why.wd.poor; an unredeemed piece expires for everyone; her own «Cầm cố» / «Chuộc» unchanged.
   3 the law-1 family probe (dev/tools/role-parity-fam.js) reads no B gap left except the parked co-op ration row. */
const {chromium}=require('playwright');const path=require('path');const html=process.argv[2]||'dev/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(html),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{let sd=777;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;Q.length=0;const out={};const T=(k,c,x)=>{out[k]={ok:!!c,x}};
  const v=liveRivals(true).find(x=>!x.queen&&!x.out&&!x.coop);const B=BAL.banCung;
  /* ---- 1. Ban cung ---- */
  /* the nết read: nv(p,key) over BAL.net.n — the test pins the doer's answer for the two new keys (her real nết table is unchanged) */
  const NV={};const nv0=nv;window.nv=(p,k)=>p===v&&NV[k]!=null?NV[k]:nv0(p,k);const setNet=(p,t)=>{for(const k of ["bcHumble","wdPawn"]){const M=BAL.net.n[k];NV[k]=M[t]!=null?M[t]:M._}};
  const humbleT=Object.keys(BAL.net.n.bcHumble).find(k=>k!=="_"&&BAL.net.n.bcHumble[k]),proudT="Kiêu ngạo";
  /* find a palace pair: v granted a middle palace, a humble and an upper option free */
  for(const q of [S].concat(rivals))if(q!==v)q.pal=null;
  v.rank=5;v.sung=99;v.danh=50;v.duc=40;
  const mid=PALN.map((_,i)=>i).find(i=>bcDanh(i)===2);v.pal=mid;
  setNet(v,humbleT);const humNv=nv(v,"bcHumble");const R0=roll;
  window.roll=()=>true;let d0=v.duc;bcNpcAsk(v);const hum={pal:PALN[v.pal],st:bcDanh(v.pal),duc:v.duc-d0};
  T("bc humble nết asks the humble palace (Đức road)",humNv===1&&hum.st<=2&&hum.duc===B.ok.ducHumble&&v.pal!==mid,hum);
  v.pal=mid;setNet(v,proudT);d0=v.duc;const dn0=v.danh;bcNpcAsk(v);const up={pal:PALN[v.pal],st:bcDanh(v.pal),danh:v.danh-dn0,duc:v.duc-d0};
  T("bc other nết asks up (Danh road)",up.danh>0&&up.duc===0,up);
  /* no option reaches the odds word → takes the decree, Đức +ducTake */
  v.pal=mid;v.sung=0;v.rank=3;d0=v.duc;const pal0=v.pal;bcNpcAsk(v);T("bc no ask → accepts, Đức + ducTake",v.pal===pal0&&v.duc-d0===B.ok.ducTake,{duc:v.duc-d0,pal:PALN[v.pal]});
  window.roll=R0;
  /* her card unchanged: Nhận + Xin rows */
  S.rank=5;S.pal=mid;S.palCer=1;Q.length=0;palCeremony();const card=Q.find(q=>q.t==="Ban cung");T("bc her card: Nhận + Xin rows",card&&card.opts[0].n.startsWith("Nhận")&&card.opts.slice(1).every(o=>o.n.startsWith("Xin")),card&&card.opts.map(o=>o.n));Q.length=0;
  /* ---- 2. Wardrobe pawn ---- */
  const itK=Object.keys(WD_ITEMS).find(k=>!WD_ITEMS[k].nt&&WD_ITEMS[k].pr>0);
  const agent=()=>{v.staff=v.staff||[];if(!wdAgent(v)){v.maid=v.maid||maidMk(v);v.maid.loyal=90;v.maid.spyFor=null;v.maid.age=40}return wdAgent(v)};
  T("wd agent for the NPC",!!agent(),null);
  const pawnT=Object.keys(BAL.net.n.wdPawn).find(k=>k!=="_"&&BAL.net.n.wdPawn[k]);
  setNet(v,pawnT);v.inv=[{k:itK}];v.bac=1;v.wdPawn=[];const pr=WD_ITEMS[itK].pr;const leak0=window.roll;window.roll=()=>false;
  wdNpcPawn(v,0);T("wd pawn nết pawns (her wdPawn)",v.wdPawn.length===1&&v.inv.length===0&&v.bac===1+Math.max(1,Math.round(pr*WD.pawnPct/100)),{wdPawn:v.wdPawn.length,bac:v.bac});
  /* cannot afford → keeps it pawned; can afford above the poor line → redeems */
  const back=v.wdPawn[0].back;v.bac=back;wdNpcRedeem(v);const kept=v.wdPawn.length===1;v.bac=back+BAL.ag.why.wd.poor+5;wdNpcRedeem(v);
  T("wd redeem only above the poor line",kept&&v.wdPawn.length===0&&v.inv.length===1&&v.bac===BAL.ag.why.wd.poor+5,{kept,bac:v.bac});
  setNet(v,proudT);v.inv=[{k:itK}];v.bac=1;wdNpcPawn(v,0);T("wd other nết sells (her wdSell)",(v.wdPawn||[]).length===0&&v.inv.length===0&&v.bac>1,{bac:v.bac});
  /* expiry: one rule for everyone */
  v.inv=[{k:itK}];v.bac=1;setNet(v,pawnT);wdNpcPawn(v,0);v.wdPawn[0].due=wk()-1;const bx0=((S.il&&S.il.box)||[]).filter(x=>x.why==="pawn"&&x.e&&x.e.k===itK).length;wdPawnMonth(v);
  /* law 6c (review r1): the forfeited piece is not deleted — the item ledger (jil ilGuard wdPawnMonth → ilGone "pawn") keeps it at the market outside the palace */
  const bx1=((S.il&&S.il.box)||[]).filter(x=>x.why==="pawn"&&x.at==="mkt"&&x.e&&x.e.k===itK).length;
  T("wd expiry for an NPC (piece kept by the ledger at the market, law 6c)",v.wdPawn.length===0&&bx1===bx0+1,{bx0,bx1});
  window.roll=leak0;
  /* her own pawn still works */
  S.inv=[{k:itK}];S.staff=S.staff||[];S.maid=S.maid||maidMk(S);S.maid.loyal=90;S.maid.spyFor=null;S.maid.age=40;const sb=S.bac;const ag=wdAgent(S);const r=wdPawn(S,0);T("wd her pawn unchanged",!!r&&(S.wdPawn||[]).length>=1&&S.bac>sb,{r:String(r).slice(0,60),ag:ag&&ag.name,maid:!!S.maid,inv:S.inv.length,itK,bac:[sb,S.bac]});
  window.nv=nv0;return out});
 /* 3 maid life: «Hầu bên cạnh chủ» on her own master's card (sk "mis") when the master is away — the NPC maid's jagstaff rule (asMisHome) */
 Object.assign(R,await p.evaluate(()=>{const out={};const T=(k,c,x)=>{out[k]={ok:!!c,x}};localStorage.clear();window.__nlInner=1;for(let i=0;i<80&&!isSrv();i++)start();window.__nlInner=0;Q.length=0;
  if(!isSrv()){T("maid life reached",false,null);return out}const m=srvM();const card={sk:"mis",ref:m};
  const lab=()=>srvTalk(card).map(o=>o.n||o.t||"").filter(Boolean);
  /* where the master is: srvWhere (the one place read both sides use, asMisHome) pinned for the two cases, then put back */
  const wo=srvWhere;window.srvWhere=x=>x===m?palaceOf(m):wo(x);const atHome=lab();
  const away=places().map(x=>x.k).find(k=>k!==palaceOf(m)&&k!=="home"&&k!=="tgk");window.srvWhere=x=>x===m?away:wo(x);const atAway=lab();window.srvWhere=wo;
  T("maid: master away → «Hầu bên cạnh chủ» (as an NPC maid)",atAway.includes("Hầu bên cạnh chủ"),{away,atAway});
  T("maid: master at home → no «Hầu bên cạnh chủ» (as an NPC maid)",!atHome.includes("Hầu bên cạnh chủ"),{atHome});return out}));
 let fail=0;for(const k in R){console.log((R[k].ok?"PASS ":"FAIL ")+k+(R[k].x!=null?" "+JSON.stringify(R[k].x):""));if(!R[k].ok)fail++}
 await b.close();
 const F=await require('../tools/role-parity-fam.js').famScan(html);const bg=F.gaps.filter(g=>g.owner==="B"&&!/Co-op/.test(g.fam));
 console.log((bg.length?"FAIL":"PASS")+" family probe: B gaps left "+JSON.stringify(bg.map(g=>g.fam+"/"+g.item)));if(bg.length)fail++;
 if(errs.length){console.log("FAIL page errors "+errs.slice(0,3).join(" ; "));fail++}
 const n=Object.keys(R).length+1;console.log(`law1-audit: ${n-fail+(errs.length?1:0)}/${n+(errs.length?1:0)} ${fail?"FAIL":"PASS"}`);process.exit(fail?1:0)})();
