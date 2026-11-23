/* or20-j68q (review/or20-j68q, GAP OR20): j68 life in lãnh cung, as a servant, and the Hoàng hậu's duties (dev/build/j68q.js).
   1) four lives × MONTHS (default 26) with months passing on their own (nextBuoi), every j68 card answered with a random option:
      cold = a consort kept in lãnh cung (fell from rank 5), srv = the cnv servant origin, hh = a Hoàng hậu, pal = a low-rank consort.
      Checks: cold / srv fire only their own family (and fire); hh fires duty cards; pal fires none of the three families.
   2) every q6 template built in its state: 3 options, each with a gain AND a cost (law 3), no two options alike (law 2 smoke);
      every option resolves without an error.
   3) law 1 / 6a: q6visitCold needs a consort SHE sent to lãnh cung; q6hhAccused needs a real wrong (a biased ruling / skimmed accounts)
      and the ruling «Xử cho A thắng» really writes that proof; law 5: the same roll is lower at a higher rung.
   usage: node dev/test/or20-j68q.js <url> [months]   (exit 1 on any FAIL) */
const {chromium}=require('playwright');const [,,URL,MON]=process.argv;const MONTHS=+MON||26;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log((c?'PASS ':'FAIL ')+n+(c?'':' '+JSON.stringify(x).slice(0,900)))};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=2011;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof e68Make==='function'&&typeof q6life==='function',null,{timeout:0});await p.waitForTimeout(1200);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const t=document.getElementById('title');if(t)t.hidden=true;
  const m0=e68Make;e68Make=function(s){const d=m0.apply(this,arguments);if(d&&window.__F)window.__F.push([s.id,q6life(),S.rank]);return d};
  window.__setup=(kind)=>{quiet=true;window.__forceOrigin=kind==='srv'?'cnv':'tt';start();quiet=false;Q.length=0;
   if(kind==='cold'){S.rank=5;(S.staff||[]).forEach(x=>x.loyal=Math.max(x.loyal||0,BAL.loy.trust+10));cold("Bị vu thông dâm");S.coldRank=5;const v=liveRivals(false)[0];if(v)S.framedBy=v.id;const w=liveRivals(false)[1];if(w){w.out=true}}
   if(kind==='hh'){for(const v of rivals)v.queen=false;S.rank=BAL.voice.hq}
   if(kind==='pal'){S.rank=1}};
  window.__keep=(kind)=>{if(S.dead){S.dead=false;S.suc=60}if((S.age||0)>40)S.age=40;S.suc=Math.max(S.suc,40);
   if(kind==='cold'&&!S.out){S.rank=5;cold("Lại bị đày");S.coldRank=5}
   if(kind==='srv'&&S.srv){S.srv.risen=false;S.srv.lau=0}
   if(kind==='hh'){S.rank=BAL.voice.hq;S.out=0}
   if(kind==='pal'){S.rank=1;S.out=0}};
  window.__life=(kind,months)=>{window.__setup(kind);window.__F=[];let err=null,ans=0;
   for(let mon=0;mon<months;mon++){const t=S.turn;
    for(let g=0;g<40&&S.turn===t;g++){window.__keep(kind);
     for(const m of Q.splice(0)){if(m&&m.pid&&/^e68/.test(m.pid)&&m.opts&&m.opts.length){const o=m.opts[Math.floor(Math.random()*m.opts.length)];try{if(o.go){o.go();ans++}}catch(e){err=err||('go '+m.pid+' '+e.message)}}}
     used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}
    Q.length=0}
   return {kind,F:window.__F.slice(),ans,err,out:S.out,srv:typeof isSrv==='function'&&isSrv()}}});
 const L={};for(const k of ['cold','srv','hh','pal']){L[k]=await p.evaluate(([k,m])=>window.__life(k,m),[k,MONTHS]);console.error('life',k,L[k].F.length,'cards')}
 const fam=id=>/^q6cold/.test(id)?'cold':/^q6srv/.test(id)?'srv':/^q6hh/.test(id)?'hh':/^q6visitCold/.test(id)?'visit':'other';
 const sum=k=>{const c={};for(const [id] of L[k].F)c[id]=(c[id]||0)+1;return c};
 console.log(JSON.stringify({cold:sum('cold'),srv:sum('srv'),hh:sum('hh'),pal:Object.keys(sum('pal')).length+' kinds'}));
 chk('lives ran without script errors',['cold','srv','hh','pal'].every(k=>!L[k].err),['cold','srv','hh','pal'].map(k=>L[k].err));
 const inCold=L.cold.F.filter(f=>f[1]==='cold'),inSrv=L.srv.F.filter(f=>f[1]==='srv');
 chk('lãnh cung: j68 life fires (≥3 cards, ≥3 kinds)',inCold.length>=3&&new Set(inCold.map(f=>f[0])).size>=3,sum('cold'));
 chk('lãnh cung: only lãnh cung cards there',inCold.every(f=>fam(f[0])==='cold'),inCold.filter(f=>fam(f[0])!=='cold'));
 chk('servant: j68 life fires (≥3 cards, ≥3 kinds)',inSrv.length>=3&&new Set(inSrv.map(f=>f[0])).size>=3,sum('srv'));
 chk('servant: only servant cards there',inSrv.every(f=>fam(f[0])==='srv'),inSrv.filter(f=>fam(f[0])!=='srv'));
 const hhF=L.hh.F.filter(f=>fam(f[0])==='hh');
 chk('Hoàng hậu: duty cards fire (≥3, ≥3 kinds) among her normal life',hhF.length>=3&&new Set(hhF.map(f=>f[0])).size>=3&&L.hh.F.some(f=>fam(f[0])==='other'),sum('hh'));
 chk('no cold / srv card outside those lives, no duty card below Hoàng hậu',L.hh.F.concat(L.pal.F).every(f=>!['cold','srv'].includes(fam(f[0])))&&L.pal.F.every(f=>fam(f[0])!=='hh'),L.pal.F.filter(f=>fam(f[0])!=='other'));
 /* 2) every template in its state */
 const T=await p.evaluate(()=>{const out=[];const ids=E68.filter(s=>/^q6/.test(s.id)).map(s=>s.id);
  const st={cold:()=>{window.__setup('cold')},srv:()=>{window.__setup('srv')},hh:()=>{window.__setup('hh')},pal:()=>{window.__setup('pal')}};
  for(const id of ids){const s=E68I[id];const k=s.life||'pal';st[k]();
   if(id==='q6visitCold'){const v=liveRivals(false)[0];v.out=true;v.coldBy='me'}
   if(id==='q6hhAccused'){const v=liveRivals(false)[1];q6st().bias=[v.id]}if(id==='q6hhNew'){const v=liveRivals(false)[2];v.ttY=S.year}
   if(id==='q6coldWinter')S.month=12;
   const p=s.pp();if(!p){out.push({id,err:'pp null'});continue}p.vi=0;const d=mkP('e68'+id,p);if(!d){out.push({id,err:'build null'});continue}
   const O=d.o.map(o=>{const x=String(o.x||'');const k=Object.entries(o.fx||{}).filter(([a,b])=>b<0).length;
    return {n:o.n,gain:/class="g"/.test(x),cost:k>0||/class="r"/.test(x),x:x.replace(/<[^>]+>/g,'').slice(0,160)}});
   let gerr=null;for(let i=0;i<d.o.length;i++){st[k]();if(id==='q6visitCold'){const v=liveRivals(false)[0];v.out=true;v.coldBy='me'}if(id==='q6hhAccused'){const v=liveRivals(false)[1];q6st().bias=[v.id]}if(id==='q6hhNew'){const v=liveRivals(false)[2];v.ttY=S.year}
    const p2=s.pp();if(!p2)continue;p2.vi=0;const d2=mkP('e68'+id,p2);try{apply(d2.o[i].fx||{});d2.o[i].go()}catch(e){gerr=gerr||e.message}}
   out.push({id,life:k,n:O.length,O,gerr,txt:d.t.replace(/<[^>]+>/g,'').slice(0,120)})}
  return out});
 chk('every q6 template builds in its state',T.every(t=>!t.err)&&T.length>=18,T.filter(t=>t.err));
 chk('every option has a gain AND a cost (law 3)',T.every(t=>t.O&&t.n===3&&t.O.every(o=>o.gain&&o.cost)),T.filter(t=>t.O&&!t.O.every(o=>o.gain&&o.cost)).map(t=>[t.id,t.O.filter(o=>!(o.gain&&o.cost))]));
 chk('options of one card differ (law 2 smoke)',T.every(t=>!t.O||new Set(t.O.map(o=>o.x)).size===t.O.length),0);
 chk('every option resolves without an error',T.every(t=>!t.gerr),T.filter(t=>t.gerr).map(t=>[t.id,t.gerr]));
 console.log(JSON.stringify(T.map(t=>[t.id,t.txt,(t.O||[]).map(o=>o.n+' | '+o.x)])).slice(0,4000));
 /* 3) law 1 / 6a / 5 */
 const W=await p.evaluate(()=>{const r={};window.__setup('pal');const v=liveRivals(false)[0];v.out=true;v.coldBy=null;r.visitNoMe=E68I.q6visitCold.pp()==null;v.coldBy='me';r.visitMe=E68I.q6visitCold.pp()!=null;
  window.__setup('hh');q6st().bias=[];q6st().skim=0;r.accNone=E68I.q6hhAccused.pp()==null;
  const pj=E68I.q6hhJudge.pp();const d=mkP('e68q6hhJudge',Object.assign(pj,{vi:0}));d.o[1].go();r.biasSet=q6st().bias.includes(pj.a1);r.accAfter=(E68I.q6hhAccused.pp()||{}).a0===pj.a1;
  q6st().bias=[];const pl=E68I.q6hhLedger.pp();const d2=mkP('e68q6hhLedger',Object.assign(pl,{vi:0}));d2.o[2].go();r.skimSet=q6st().skim===1;r.accSkim=(E68I.q6hhAccused.pp()||{}).why==='s';
  window.__setup('cold');S.coldRank=1;const lo=q6od(50);S.coldRank=6;const hi=q6od(50);r.rk=[lo,hi];r.harder=hi<lo;
  window.__setup('hh');S.rank=BAL.voice.hq;const a=q6od(50);S.rank=BAL.voice.hq+1;const c=q6od(50);r.rkhh=[a,c];r.harderHH=c<a;
  window.__setup('cold');const mk=S.maid;S.maid=null;r.riceNoMaid=E68I.q6coldRice.pp()==null;S.maid=mk;
  window.__setup('hh');const n0=rivals.length;rivals.filter(v=>v.alive).slice(3).forEach(v=>{v.alive=false});S.month=2;S.tuan=0;S.ttDone=null;S.year=Math.ceil(S.year/3)*3;quiet=true;tuyenTu();quiet=false;const nv=rivals.slice(n0);
  r.ttStamp=nv.length>0&&nv.every(v=>v.ttY===S.year);const pn=E68I.q6hhNew.pp();r.ttCard=!!pn&&nv.some(v=>v.id===pn.a0);if(pn){const d3=mkP('e68q6hhNew',Object.assign(pn,{vi:0}));d3.o[0].go();r.ttOnce=!q6st().met||q6st().met.includes(pn.a0)}
  window.__setup('cold');const ev0=S.coldEv||0;S.coldEv=BAL.coldEvNeed-1;q6evAdd();r.evFree=!S.out;
  return r});
 console.log(JSON.stringify(W));
 chk('law 1: she can visit (and gloat over) only a consort SHE sent to lãnh cung',W.visitNoMe&&W.visitMe,W);
 chk('law 6a: the queen is accused only on a real wrong; the biased ruling / the skim writes that proof',W.accNone&&W.biasSet&&W.accAfter&&W.skimSet&&W.accSkim,W);
 chk('law 5: the same roll is harder at a higher rung (lãnh cung, Hoàng hậu)',W.harder&&W.harderHH,W);
 chk('law 6a: chứng cứ from the gloating framer really clears her name when full',W.evFree,W);
 chk('lãnh cung rice card needs the one maid she still has (no null S.maid)',W.riceNoMaid,W);
 chk('tuyển tú: the new girls are stamped and the Hoàng hậu receives each one once (q6hhNew)',W.ttStamp&&W.ttCard&&W.ttOnce,W);
 chk('no page errors',errs.length===0,errs.slice(0,5));
 const fails=ok.filter(x=>!x[1]).length;console.log(`or20-j68q: ${ok.length-fails}/${ok.length} PASS`);await b.close();process.exit(fails?1:0)})();
