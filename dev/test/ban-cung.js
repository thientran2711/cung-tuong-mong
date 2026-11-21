/* ban-cung (owner mark #53, 21/11): «Ban cung» palace asks — real odds, locks, refusal cost, one rule for player and NPC.
   (a) locks: a palace of standing 3 cannot be asked below BAL.banCung.need[3]; the card is greyed with the cổ trang reason;
   (b) odds: ladder word on every allowed «Xin» card = word(bcOdds); higher standing / nearer the Emperor / more rivals = lower odds,
       more Sủng / higher rank = higher; BAL change moves the odds (one core); never «Nắm chắc» for an ask above her palace;
   (c) refusal: Sủng/Danh drop by BAL.banCung.fail, the first rival's relation drops; success moves her and gives Danh;
   (d) the decree: bcGrantIx never grants a locked palace (player and NPC);
   (e) NPC parity: an NPC with the same rank/Sủng/palace as her gets the same odds; bcAsk on an NPC applies the same costs;
   (f) co-op parity: bcOdds uses no dice (same inputs → same number, 50 calls).
   usage: node dev/test/ban-cung.js [url]   (default file:// index.html of this worktree) */
const {chromium}=require('playwright');const path=require('path');
const URL=process.argv[2]||'file://'+path.resolve(__dirname,'../../index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof bcOdds==='function',null,{timeout:120000});await p.waitForTimeout(1000);
 const r=await p.evaluate(()=>{const out=[],fail=[];const ok=(c,m)=>{out.push((c?'ok  ':'FAIL ')+m);if(!c)fail.push(m)};
  quiet=true;start();quiet=false;Q.length=0;const B=BAL.banCung,B0=JSON.parse(JSON.stringify(B));
  const idx=n=>PALN.indexOf(n);const VT=idx("Vĩnh Thọ cung"),HA=idx("Hàm An cung"),CT=idx("Chung Tú cung"),TM=idx("Thừa Minh cung");
  ok(VT>=0&&HA>=0&&CT>=0&&TM>=0,'palaces on the plan');
  /* empty every palace so the test controls who lives where */
  for(const v of rivals)v.pal=null;
  S.rank=3;S.sung=50;S.pal=HA;
  /* (a) locks */
  ok(bcLocked(S,VT)&&bcLocked(S,TM)&&!bcLocked(S,CT),'Tần: standing-3 and -2 palaces locked, standing-1 open');
  S.rank=5;ok(!bcLocked(S,VT),'Quý phi may ask for Vĩnh Thọ');S.rank=3;
  /* ceremony cards */
  S.palCer=1;Q.length=0;palCeremony();const d=Q[Q.length-1];ok(d&&d.t==="Ban cung",'ceremony dialog');
  const xs=d.opts.filter(o=>/^Xin /.test(o.n));ok(xs.length>=1&&xs.length<=B.opts,'ask options within BAL.banCung.opts: '+xs.length);
  const lk=xs.filter(o=>o.off);ok(lk.length>=1,'at least one locked ask shown');
  ok(lk.every(o=>/vượt phận/.test(o.off.why)&&new RegExp(RANKS[B.need[3]].n+"|"+RANKS[B.need[2]].n).test(o.off.why)),'lock reason in cổ trang words with the rank name: '+(lk[0]&&lk[0].off.why));
  ok(!/%/.test(JSON.stringify(d.opts.map(o=>[o.n,o.x]))),'no % on the cards');
  const al=xs.filter(o=>!o.off);ok(al.length>=1,'allowed asks shown');
  for(const o of al){const i=idx(o.n.replace(/^Xin /,""));ok(o.x.startsWith(word(bcOdds(S,i,HA))+" ·"),`${o.n}: word = ${word(bcOdds(S,i,HA))}`);
   ok(/hỏng: Sủng -\d+, Danh -\d+/.test(o.x),`${o.n}: refusal price shown`)}
  /* law 2/3 + law 11 scan: EVERY (granted from, allowed i) pair, every rank 3..6: the card has a non-empty gain and shows exactly what bcAsk applies */
  {let pairs=0,bad=[];const keep={rank:S.rank,pal:S.pal,sung:S.sung,danh:S.danh,duc:S.duc};const roll1=roll;const Bf=BAL.banCung.fail;
   for(let rk=3;rk<=6;rk++)for(let f=0;f<PALN.length;f++){if(bcLocked({rank:rk,queen:false},f))continue;for(let i=0;i<PALN.length;i++){if(i===f||bcLocked({rank:rk,queen:false},i))continue;pairs++;
    S.rank=rk;const g=bcGain(i,f);const txt=bcGainTxt(g);if(!Object.keys(g).length||!txt){bad.push([rk,PALN[f],PALN[i],'no gain']);continue}
    S.pal=f;S.sung=50;S.danh=50;S.duc=50;roll=()=>true;bcAsk(S,i,f);roll=roll1;const got={danh:S.danh-50,duc:S.duc-50};
    for(const k in got)if((g[k]||0)!==got[k])bad.push([rk,PALN[f],PALN[i],'shown '+txt+' applied '+JSON.stringify(got)])}}
   Object.assign(S,keep);ok(pairs>40&&!bad.length,`every ask has a gain, shown = applied (${pairs} pairs)`+(bad.length?' '+JSON.stringify(bad.slice(0,4)):''))}
  ok(al.every(o=>{const i=idx(o.n.replace(/^Xin /,""));return o.x.includes('thành: dời sang '+PALN[i]+', '+bcGainTxt(bcGain(i,HA)))}),'card «thành» prints bcGain');
  const take=d.opts[0];ok(/^Nhận /.test(take.n)&&take.fx.duc===B.ok.ducTake,'«Nhận» = sure, Đức + (gain-only)');
  /* (b) odds monotonic + one core */
  const o1=bcOdds(S,CT,HA);S.sung=80;const o2=bcOdds(S,CT,HA);S.sung=50;ok(o2>o1,`more Sủng → better odds (${o1}→${o2})`);
  S.rank=4;const o3=bcOdds(S,CT,HA);S.rank=3;ok(o3>o1,`higher rank → better odds (${o1}→${o3})`);
  ok(bcOdds(S,CT,HA)<bcOdds(S,HA,CT),'asking up is harder than asking down');
  const near=PALN.map((_,i)=>i).filter(i=>bcDanh(i)===1).sort((a,b)=>bcNear(b)-bcNear(a));ok(bcOdds(S,near[0],HA)<=bcOdds(S,near[near.length-1],HA),'nearer the Emperor → not easier');
  const v=rivals.find(x=>x.alive&&!x.out&&!x.queen);const vr=v.rank,vp=v.pal;v.rank=3;v.pal=null;const w1=bcOdds(S,CT,HA);v.rank=vr;v.pal=vp;
  const w0=(()=>{const keep=rivals.map(x=>[x,x.rank,x.pal]);for(const x of rivals){x.rank=Math.min(x.rank,2)}const o=bcOdds(S,CT,HA);for(const [x,r,pp] of keep){x.rank=r;x.pal=pp}return o})();
  ok(w1<=w0,`a rival who wants it → lower odds (${w0}→${w1})`);
  B.base+=20;ok(bcOdds(S,CT,HA)>o1,'BAL.banCung.base moves the odds (one core)');Object.assign(B,JSON.parse(JSON.stringify(B0)));
  ok(PALN.every((_,i)=>bcDanh(i)<=1||bcOdds(S,i,HA)<BAL.odds.hi||bcLocked(S,i)),'no ask above her palace is capped sure');
  /* (f) no dice in the odds */
  const r0=Math.random;let seen=new Set();for(let k=0;k<50;k++){Math.random=()=>k/50;seen.add(bcOdds(S,CT,HA))}Math.random=r0;ok(seen.size===1,'odds use no dice (co-op: same number on both seats)');
  /* (c) refusal + success */
  const roll0=roll;const st0={sung:S.sung,danh:S.danh};roll=()=>false;bcAsk(S,CT,HA);
  const up=bcDanh(CT)-bcDanh(HA);ok(S.pal===HA,'refused: stays');ok(S.sung===Math.max(0,st0.sung+sg(-(B.fail.sung+B.fail.sungStep*up)))&&S.danh===Math.max(0,st0.danh-(B.fail.danh+B.fail.danhStep*up)),`refused: Sủng ${st0.sung}→${S.sung}, Danh ${st0.danh}→${S.danh}`);
  const d1=S.danh;roll=()=>true;bcAsk(S,CT,HA);ok(S.pal===CT&&S.danh===Math.min(100,d1+B.ok.danhStep*up),'granted: moves, Danh +');roll=roll0;
  /* (d) decree never grants a locked palace */
  const occ={};let bad=0;for(let s=0;s<100;s+=7){S.sung=s;const g=bcGrantIx(S,occ);if(g<0||bcLocked(S,g))bad++}S.sung=50;ok(!bad,'decree (player): never a locked palace');
  const n=rivals.find(x=>x.alive&&!x.out&&!x.queen);const nr=n.rank;n.rank=3;let badN=0;for(let s=0;s<100;s+=7){n.sung=s;const g=bcGrantIx(n,occ);if(g<0||bcLocked(n,g))badN++}ok(!badN,'decree (NPC): never a locked palace');
  /* (e) NPC parity */
  S.pal=HA;n.sung=S.sung;n.pal=null;ok(bcOdds(n,CT,HA)===bcOdds(S,CT,HA)||bcWanters(n,CT).length!==bcWanters(S,CT).length,'NPC with her rank/Sủng: same odds (rivals aside)');
  n.pal=HA;S.pal=null;const ns={sung:n.sung,danh:n.danh||0};roll=()=>false;bcAsk(n,CT,HA);roll=roll0;
  ok(n.pal===HA&&n.sung===Math.max(0,ns.sung-(B.fail.sung+B.fail.sungStep*up)),'NPC refused: same Sủng price');n.rank=nr;
  return {out,fail}});
 console.log(r.out.join('\n'));if(errs.length)console.log('page errors:',errs.slice(0,5));
 const pass=!r.fail.length&&!errs.length;console.log(pass?'BAN-CUNG PASS '+r.out.length:'BAN-CUNG FAIL '+r.fail.length);await b.close();process.exit(pass?0:1)})();
