/* AG-ALL-2d — MINIGAME HAND CEILING (owner OD 17/11 ~16:00Z L1640). node dev/test/ag-mgh.js [dev/index.html]
   1 every NPC has a hidden hand per minigame kind, drawn once (p.mgH[kind]), inside the kind's band (jmgt mgBand: lo .. hi); hands differ between people and kinds
     (some good, some bad), stable on every call; an old save (no p.mgH) rolls the very same hand again (hashed on person + kind)
   2 a play = a roll UNDER the ceiling (hand + art / rank lift, mgHandEff) on a matching board (never above it; most plays below it: never a perfect player)
   3 THEN the board ease, exactly the player's: the same person on an easier board (gap d −2) scores higher, on a harder one (d +2) lower,
     by the skilled-bot shift mgMedD(d) − mgMedD(0)
   4 good hands beat bad hands on the same board (mean of 400 plays); her own odds (p = S) never get a hand (her real hands play)
   5 slap: a weaker "tat" hand lands the heavy blow less often (the table = the middle hand)
   6 switch off (BAL.ag.mg2.hand.on = 0) = part 2b's one curve */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const H=BAL.ag.mg2.hand,o={on:mg2On(),H:Object.assign({},H)};const L=liveRivals(true).filter(v=>v.alive);const K=["dan","ve","co","theu","hat","tat"];
  const hands=[];for(const v of L)for(const k of K)hands.push(mgHand(k,v));o.n=hands.length;o.min=Math.min(...hands);o.max=Math.max(...hands);o.inRange=L.every(v=>K.every(k=>{const Bd=mgBand(k),h=mgHand(k,v);return h>=Bd.lo-1e-9&&h<=Bd.hi+1e-9}));o.bw=mgBand("co").hi-mgBand("co").lo;
  o.distinct=new Set(hands.map(h=>h.toFixed(1))).size;const v=L[0];o.saved=!!(v.mgH&&v.mgH.dan!=null);const h1=mgHand("dan",v);o.stable=[0,1,2].every(()=>mgHand("dan",v)===h1);
  const keep=v.mgH;delete v.mgH;o.oldSave=mgHand("dan",v)===h1;v.mgH=keep;
  /* 2 under the ceiling at a matching board — a person equal to her in art and rank (no art / rank lift, fair spread OD 20/11) whose "co" hand sits mid-band */
  const eq=[];for(let i=0;i<60;i++)eq.push({name:"Eq"+i,id:64000+i,rank:S.rank,arts:Object.assign({},S.arts),alive:true});const w=eq.map(x=>[x,Math.abs(mgHandEff("co",x)-8.5)]).sort((a,b)=>a[1]-b[1])[0][0];
  const hE=mgHandEff("co",w);o.hE=hE;let over=0,at=0;const N=400;for(let i=0;i<N;i++){const x=mgNpcRaw("co",w,{d:0});if(x>Math.round(hE))over++;if(x>=Math.round(hE))at++}o.over=over;o.atCeil=at/N;
  /* 3 board ease */
  const mean=(pp,d,kind)=>{let s=0;for(let i=0;i<N;i++)s+=mgNpcRaw(kind||"dan",pp,{d});return s/N};o.mE=mean(w,-2,"co");o.m0=mean(w,0,"co");o.mH=mean(w,2,"co");o.shiftE=mgMedD(-2)-mgMedD(0);o.shiftH=mgMedD(2)-mgMedD(0);
  /* 4 good vs bad hands */
  const pairs=L.map(x=>[x,mgHandEff("ve",x)]).sort((a,b)=>a[1]-b[1]);const lo=pairs[0],hi=pairs[pairs.length-1];o.lo=[lo[1],mean(lo[0],0,"ve")];o.hi=[hi[1],mean(hi[0],0,"ve")];
  o.meNoHand=(()=>{const had=S.mgH;mgNpcRaw("dan",S,{d:0});return !S.mgH&&!had})();
  /* 5 slap */
  const heavy=(a)=>{let n=0;for(let i=0;i<600;i++)if(slapNpcDraw(a)===3)n++;return n/600};const sl=L.map(x=>[x,mgHandEff("tat",x)]).sort((a,b)=>a[1]-b[1]);
  o.slap={lo:[sl[0][1],heavy(sl[0][0])],hi:[sl[sl.length-1][1],heavy(sl[sl.length-1][0])]};
  /* 7 owner OD 20/11 ~01:10Z fair spread: an untested kind (co) is centred on the skilled human median (7.5 at the matching board), symmetric */
  {const C=[];for(let i=0;i<1000;i++)C.push(mgHand("co",{name:"T"+i,id:9000+i}));C.sort((a,b)=>a-b);o.medHand=C[500];o.medPlay=C[500]-H.w/2;o.skilled=mgMedD(0);o.above=C.filter(c=>c-H.w/2>=o.skilled).length/1000}
  /* 6 off */
  H.on=0;o.off=mean(v,0);H.on=1;o.offMed=mgMedD(0);return o});
 console.log(JSON.stringify(r));
 ok(r.on&&r.inRange&&r.distinct>=Math.min(10,r.n/3)&&r.max-r.min>=r.bw*.5,'1 every NPC has a hidden hand per kind between lo and hi; hands spread good ↔ bad',{n:r.n,min:r.min,max:r.max,distinct:r.distinct});
 ok(r.saved&&r.stable&&r.oldSave,'1 drawn once, saved on the person, stable; an old save rolls the same hand',{saved:r.saved,stable:r.stable,old:r.oldSave});
 ok(r.over===0&&r.atCeil<.5,'2 a play on a matching board is a roll UNDER her ceiling (never above; most plays below)',{over:r.over,atCeil:r.atCeil});
 ok(Math.abs((r.mE-r.m0)-r.shiftE)<.6&&Math.abs((r.mH-r.m0)-r.shiftH)<.6&&r.mE>r.m0&&r.m0>r.mH,'3 then the board ease as for her: easier board higher, harder lower, by the measured shift',{mE:r.mE,m0:r.m0,mH:r.mH,shiftE:r.shiftE,shiftH:r.shiftH});
 ok(r.hi[1]>r.lo[1]+1,'4 good hands beat bad hands on the same board',{lo:r.lo,hi:r.hi});
 ok(r.meNoHand,'4 her own odds (p = S) never get a hand',r.meNoHand);
 ok(r.slap.hi[1]>r.slap.lo[1],'5 slap: a weaker hand lands the heavy blow less often',r.slap);
 ok(Math.abs(r.off-r.offMed)<.6,'6 switch off → part 2b one curve (median at the matching board)',{off:r.off,med:r.offMed});
 ok(Math.abs(r.medPlay-r.skilled)<=.3&&r.above>=.42&&r.above<=.58,'7 fair spread: an untested kind centres on the skilled human median, about half the hands at or above it',{medHand:r.medHand,medPlay:r.medPlay,skilled:r.skilled,above:r.above});
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
