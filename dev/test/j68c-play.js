/* ORDER THIN P4 browser test: composed j68 openings (j68c) on the real game. node dev/test/j68c-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   Registers the fixture seeds (or the given file; its `open` rows join its comps) as EV6 templates and checks, per comp: the people are living real
   people with the wanted nết (cast from the live roster; a seed whose nết / need no person has in this one test world is FORCED by giving the roster
   that nết / state, and reported as forced), every placeholder is filled, the wording joins a fitting opener, 4 options, P0 marks j68 c:<id>:<wording>,
   choosing (the real chooseM path; stance i%4) is built from exactly steps × BAL.j68c.fx and, on the real path, applies every stat the same way (the game's own price/deed rules may scale the real amount, as for every option) and moves the person's thiện cảm the same way, the object trace is kept
   (law 6c), the seed rests for the rest of the life (cooldown), and every built J68SEEDS comp registers; the 90 old decisions still count 90 / 370.
   0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'j68c-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;/* a mid-life consort, as dev/test/j68c-measure.js: her cung nữ, servants, two children, some favour */S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);S.kids=S.kids||[];while(S.kids.filter(k=>k.alive).length<2)S.kids.push(mkKid(S.kids.length?'f':'m',5));S.sung=Math.max(S.sung||0,40);S.nights=Math.max(S.nights||0,6);const old=e68Count();const cc=e68cCount();const out={old,built:Object.values(cc.seeds).reduce((a,b)=>a+b,0),builtN:(typeof J68SEEDS!=='undefined'?J68SEEDS.filter(r=>r.type==='comp').length:-1),seeds:[],forced:0};
  const OP={};for(const r of FIX)if(r.type==='open')(OP[r.fam]=OP[r.fam]||[]).push(r);
  const ALLN=[].concat(...Object.values(BAL.net.F),...Object.values(BAL.net.M));const tr0=tr6;
  const SK=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"];const snap=()=>{const o={};for(const k of SK)o[k]=k==="an"?(S.an||0):(S[k]||0);return o};
  const relV=a=>!a?0:a.k==="rv"?aff(a.o,S):a.k==="sv"||a.k==="maid"?a.o.loyal:a.k==="kid"?a.o.fond:a.k==="man"?a.o.af:a.k==="eun"||a.k==="doc"?(a.o&&a.o.af&&a.o.af.me)||0:0;
  const force=(sd)=>{const R=sd.roles||{};const n=sd.needs||{};let f=0;
   if(n.rank_min!=null&&S.rank<n.rank_min){S.rank=n.rank_min;f=1}if(n.rank_max!=null&&S.rank>n.rank_max){S.rank=n.rank_max;f=1}
   if(n.month&&n.month.length&&!n.month.includes(S.month)){S.month=n.month[0];f=1}if(n.nights_min!=null&&(S.nights||0)<n.nights_min){S.nights=n.nights_min;f=1}
   if(n.not_confined&&S.confined){S.confined=0;f=1}if(n.kids_min!=null){while((S.kids||[]).filter(k=>k.alive).length<n.kids_min){(S.kids=S.kids||[]).push(mkKid("m",6));f=1}}
   for(const r of Object.values(R)){const k=(r.kind||"rv").split(":")[0];if(k==="kid"&&!(S.kids||[]).some(x=>x.alive)){(S.kids=S.kids||[]).push(mkKid("f",7));f=1}
    if(k==="man"&&!(S.men||[]).some(m=>m.alive!==false&&m.rw===r.kind.slice(4)))f=2;
    const nd=r.need;if(!nd)continue;const L=liveRivals(true);f=1;
    if(nd==="ill")L.forEach(v=>v.ill={k:Object.keys(ILL)[0],st:1});if(nd==="preg")L.forEach(v=>{v.preg=3;v.hidden=0});if(nd==="friend")L.forEach(v=>relAdd(S,v,30));
    if(nd==="feud")L.forEach(v=>L.forEach(w=>{if(v!==w)relAdd(v,w,-40)}));if(nd==="kids")L.forEach(v=>{v.kids=v.kids||[];if(!v.kids.some(k=>k.alive))v.kids.push(mkKid("m",3))});
    if(nd==="poor")L.forEach(v=>v.bac=0);if(nd==="thIll")S.thIll={k:Object.keys(ILL)[0],st:1};if(nd==="empIll")S.emp.ill={k:Object.keys(ILL)[0],st:1,known:true};
    if(nd==="rain")S.wx={n:"mưa rào",k:"rain",f:1};if(nd==="snow")S.wx={n:"tuyết rơi",k:"snow",f:1};if(nd==="fest"){const F=Object.values(FEST)[0];S.month=F.m}}
   return f};
  let i=0;for(const sd of FIX){if(sd.type!=='comp')continue;const r={id:sd.id};out.seeds.push(r);try{
   if(!E68I["c:"+sd.id])j68cReg(sd,OP[sd.fam]||[]);const s=E68I["c:"+sd.id];r.reg=!!s;if(!s)continue;
   S.bac=Math.max(S.bac||0,9999);S.suc=100;tr6=tr0;const e=e68();delete e.cd[s.id];e.vu[s.id]=[];Q.length=0;
   let d=e68Make(s);if(!d){r.forced=force(sd);if(r.forced===2){r.skip='no man of that kind in this world';continue}delete e.cd[s.id];d=e68Make(s)}
   if(!d){tr6=v=>ALLN.slice();r.forced=1;delete e.cd[s.id];d=e68Make(s)}if(r.forced)out.forced++;
   r.made=!!d;if(!d){tr6=tr0;continue}const m=e68Push(d,s,true);const X=e68X(s,d.pp||{});
   const P=m.pp||{};const vi=e.vu[s.id].slice(-1)[0];r.vi=vi;r.mark=nrNow("j68","c:"+sd.id+":"+vi);
   const XX=e68X(s,Object.assign({},(E68I["c:"+sd.id].pp&&{}),P));const A=XX&&XX.A,B=XX&&XX.B;r.who=[A&&A.n,B&&B.n].filter(Boolean).join(' / ')||'-';
   r.alive=!A||(A.k!=="rv"||A.o.alive)&&(!B||B.k!=="rv"||B.o.alive)&&(!B||A.o!==B.o);
   const fit=(a,rr)=>!rr||!a||!["rv","sv"].includes(a.k)||(!(rr["nết"]||[]).length||rr["nết"].some(n=>tr6(a.o).includes(n)))&&(!(rr["lòng"]||[]).length||rr["lòng"].some(n=>tr6(a.o).includes(n)));
   r.net=fit(A,(sd.roles||{}).A)&&fit(B,(sd.roles||{}).B);tr6=tr0;
   const all=m.h+" "+m.opts.map(o=>o.n+" "+o.x).join(" ");r.unfilled=/\{[A-Za-z]+\}/.test(all);r.n4=m.opts.length===4;r.text=plain(m.h).slice(0,140);
   const nop=(OP[sd.fam]||[]).filter(o=>o.a==="any"||(sd.roles&&sd.roles.A&&o.a===((sd.roles.A.kind||"rv").split(":")[0]))).length;r.opener=nop?s.v.length===nop:s.v.length===1;
   const k=i++%4;const sid=Object.keys(sd.stances)[k],st=sd.stances[sid];const tier=sd.tier||"m",F=BAL.j68c.fx[tier];
   S.an=50;for(const a of [A,B])if(a&&a.o&&typeof a.o==='object'){if(a.k==='sv'||a.k==='maid')a.o.loyal=50;if(a.k==='kid')a.o.fond=50}const s0=snap(),ra=relV(A),rb=relV(B),obL=e68c().ob[e68c().ob.length-1];const rec={};const ap0=apply;apply=function(o){for(const[kk,v]of Object.entries(o||{}))if(typeof v==='number')rec[kk]=(rec[kk]||0)+v;return ap0.apply(this,arguments)};r.fxb=JSON.stringify(m.opts[k].fx);try{chooseM(k)}finally{apply=ap0}r.rec=JSON.stringify(rec);const s1=snap();rec.an=(S.an||0)-s0.an;
   const exp={};for(const[kk,n]of Object.entries(st.gain))exp[kk]=(exp[kk]||0)+n*F[kk==="rel.A"||kk==="rel.B"?"rel":kk];for(const[kk,n]of Object.entries(st.loss))exp[kk]=(exp[kk]||0)-n*F[kk==="rel.A"||kk==="rel.B"?"rel":kk];
   r.num=[];const g=j68cVal(st.gain,tier,1),l=j68cVal(st.loss,tier,-1);for(const kk of SK){const want=exp[kk]||0,got=(g.fx[kk]||0)+(l.fx[kk]||0);if(want!==got)r.num.push(`${kk} ${got}≠${want}`);const asked=rec[kk]||0;if(want&&Math.sign(asked)!==Math.sign(want))r.num.push(`${kk} applied ${asked}, wanted the way of ${want}`)}if((g.A+l.A)!==(exp['rel.A']||0)*1||(g.B+l.B)!==(exp['rel.B']||0))r.num.push('rel steps')
   const relOk=(a,kk,v0)=>{const want=exp[kk]||0;if(!a||!want)return true;const got=relV(a)-v0;return a.k==="man"?got===Math.round(want/2):(got===want||Math.sign(got)===Math.sign(want))};
   if(!relOk(A,"rel.A",ra))r.num.push(`rel.A ${relV(A)-ra}≠${exp["rel.A"]}`);if(!relOk(B,"rel.B",rb))r.num.push(`rel.B ${relV(B)-rb}≠${exp["rel.B"]}`);
   const OB=e68c().ob,ob=OB.length&&OB[OB.length-1]!==obL?[OB[OB.length-1]]:[];r.trace=ob.length?ob[0].trace:null;r.objOk=sd.object?ob.length===1&&!!ob[0].trace&&!/\{/.test(ob[0].trace+ob[0].name):ob.length===0;
   r.rest=!e68Cands([sd.fam]).some(z=>z[0]===s);Q.length=0;
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  return out},FIX);
 for(const r of R.seeds){const t=`${r.id} (${r.who||'-'})${r.forced?' [forced]':''}`;
  if(r.err){ok(false,t+' threw '+r.err);continue}if(r.skip){console.log('skip '+t+': '+r.skip);continue}
  ok(r.reg,t+' registers');ok(r.made,t+' made from the live roster');if(!r.made)continue;ok(r.alive&&r.net,t+' people alive, distinct, wanted nết');ok(!r.unfilled&&r.n4,t+' 4 options, placeholders filled: '+r.text);
  ok(r.opener,t+' wordings = fitting openers');ok(r.mark,t+' P0 marks j68 c:<id>:'+r.vi);ok(!r.num.length,t+' numbers = steps × BAL.j68c.fx '+r.num.join(', ')+(r.num.length?' fx '+r.fxb+' rec '+r.rec:''));
  ok(r.objOk,t+' object traced: '+r.trace);ok(r.rest,t+' rests for this life')}
 ok(R.old.templates===90&&R.old.variants===370,`old j68 count unchanged (${R.old.templates} / ${R.old.variants})`);
 ok(R.builtN<0||R.built>=R.builtN,`built J68SEEDS register (${R.built}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 console.log(fail?`J68C PLAY: ${fail} FAIL (${R.seeds.length} comps, ${R.forced} forced)`:`J68C PLAY: ALL PASS (${R.seeds.length} comps, ${R.forced} forced, ${R.builtN} built)`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
