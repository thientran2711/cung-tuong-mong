/* ORDER THIN P6a browser test: composed WORLD reactions (jworldc) on the real game. node dev/test/wc-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   For each seed: opens a REAL window of its kind (worldStart, the seed's own real cause tag), with only that seed in the kind's pool, and checks:
   the seed is drawn (w.x.wc) and marked in P0 (wc:<k>), its people are living real people inside the scope with the wanted nết (a seed whose
   nết / scope no person has in this one test world is FORCED by giving the roster that nết / place / rank / child, reported as forced), the NPC
   round records only the 4 stance ids for people of the scope (≤ BAL.wc.npcMax) and moves their stats the way of the stance, her card comes
   after the kind's card with 4 options, every placeholder filled, choosing (the real chooseM path, stance i%4) is built from exactly
   steps × BAL.wc.fx and moves every stat the right way, the object trace is kept (law 6c), the end text says who chose what, the seed is not drawn
   again in the same life, and every built JWSEEDS seed registers. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'wc-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse).filter(r=>r.type==='wc');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);
  S.kids=S.kids||[];while(S.kids.filter(k=>k.alive).length<2)S.kids.push(mkKid(S.kids.length?'f':'m',5));
  const out={seeds:[],forced:0,built:0,builtN:-1};try{out.builtN=(typeof JWSEEDS!=='undefined'?JWSEEDS:[]).length;out.built=Object.keys(WC_SEEDS).filter(id=>JWSEEDS.some(s=>s.id===id)).length}catch(e){}
  const __ss=o=>JSON.stringify(o,(k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.keys(v).sort().reduce((a,x)=>(a[x]=v[x],a),{}):v);out.shadow=FIX.filter(r=>{const s=(typeof JWSEEDS!=="undefined"?JWSEEDS:[]).find(x=>x.id===r.id);return s&&__ss(s)!==__ss(r)}).map(r=>r.id);
  const X_=WC_X,E=WORLD_EVD;const plain=t=>String(t||'').replace(/<[^>]+>/g,' ');
  const ALLN=[].concat(...Object.values(BAL.net.F),...Object.values(BAL.net.M));const tr0=tr6;
  const SK=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"];const snap=()=>{const o={};for(const k of SK)o[k]=k==="an"?(S.an||0):(S[k]||0);return o};
  const relV=a=>!a?0:a.k==="rv"?aff(a.o,S):a.k==="sv"||a.k==="maid"?a.o.loyal:a.k==="kid"?a.o.fond:a.k==="man"?a.o.af:a.k==="eun"||a.k==="doc"?(a.o&&a.o.af&&a.o.af.me)||0:0;
  const L=()=>liveRivals(true).filter(v=>!v.confined&&!v.out);
  const CAUSE={hoa:{storm:"Sét đánh trúng mái cung trong cơn giông, lửa bốc lên",lamp:"Cung bén lửa (đèn nến), gió hanh thổi lửa lan"},
   cam:{vuco:"Án vu cổ khép lại, cung cấm giới nghiêm",ngoai:"Trừ phe ngoại thích nhà Lý, cung cấm giới nghiêm",giac:"Giặc tràn qua biên ải, kinh thành giới nghiêm"}};
  const setup=(sd,sub)=>{const k=sd.k,v=L()[0],x={};let cause="Thử nghiệm: nguyên do thật của "+k;
   if(k==="tang")x.why=sub||"th";if(k==="away"||k==="dis"||k==="hau")x.sub=sub||({away:"te",dis:"lut",hau:"lap"})[k];if(k==="tho")x.who=sub||"emp";
   if(k==="hoa"){x.who=v.id;cause=CAUSE.hoa[sub||"lamp"]}if(k==="cam")cause=CAUSE.cam[sub||"vuco"];if(k==="phat"&&sub==="big")x.big=1;
   if(k==="day"){x.who=v.id;x.sex=sub==="f"?"f":"m";x.kid="Thử Nhi"}if(k==="lap"||k==="hon"){x.who=v.id;x.kid="Thử Nhi"}
   if(k==="hau"){x.to=v.id;x.from=null}if(k==="ngoai")x.c="Lý";return{cause,x}};
  const open1=(sd,sub)=>{S.wwin={L:[],last:{},n:{},seq:(S.wwin&&S.wwin.seq)||0};const {cause,x}=setup(sd,sub);WW.inTick=1;let w=null;try{w=worldStart(sd.k,cause,{force:1,len:3,x})}finally{WW.inTick=0}return w};
  const force=(sd)=>{let f=1;tr6=v=>ALLN.slice();const Lv=L();const sc=sd.scope;
   if(sc==="near"){let pl=null;try{pl=E[sd.k].place({k:sd.k,x:{},cause:""})}catch(e){}if(pl){const ids=new Set(Lv.map(v=>v.id));const wo=whereOf;window.__wo=wo;whereOf=function(q){return q&&ids.has(q.id)?pl:wo.apply(this,arguments)}}}
   if(sc==="kids")Lv.forEach(v=>{v.kids=v.kids||[];if(!v.kids.some(k=>k.alive))v.kids.push(mkKid("m",3))});
   if(sc==="hi")Lv.slice(0,3).forEach(v=>v.rank=Math.max(v.rank,BAL.wc.rankHi));if(sc==="lo")Lv.slice(0,3).forEach(v=>v.rank=Math.min(v.rank,BAL.wc.rankHi-1));
   if(sc==="house"){const v=Lv[0];try{const pal=palaceOf(v);}catch(e){}}
   for(const r of Object.values(sd.roles||{})){const k=(r.kind||"rv").split(":")[0];if(k==="man"&&!(S.men||[]).some(m=>m.alive!==false&&m.rw===r.kind.slice(4)))f=2;if(k==="th"&&S.thDead)f=2}
   return f};
  let i=0;for(const sd of FIX){const r={id:sd.id,k:sd.k};out.seeds.push(r);try{
   X_.wcReg(sd);const keep=X_.WC[sd.k];X_.WC[sd.k]=[sd];r.reg=!!WC_SEEDS[sd.id];S.bac=Math.max(S.bac||0,9999);S.suc=100;tr6=tr0;S.wc={};
   const sub=(sd.sub||[])[i%((sd.sub||[]).length||1)];
   try{nrStore&&0}catch(e){}
   let w=open1(sd,sub);r.open=!!w;if(!w){X_.WC[sd.k]=keep;continue}
   if(!w.x.wc){r.forced=force(sd);if(r.forced===2){r.skip='no such person in this world';X_.WC[sd.k]=keep;tr6=tr0;continue}w=open1(sd,sub)}
   if(r.forced)out.forced++;r.drawn=!!(w&&w.x.wc&&w.x.wc.id===sd.id);if(!r.drawn){try{r.dbg=JSON.stringify({w:!!w,sl:w&&(X_.wcScope(sd,w)||[]).length,cast:w&&X_.wcCast(sd,w),fresh:nrNow('wc:'+sd.k,sd.id)})}catch(e){r.dbg=String(e)}X_.WC[sd.k]=keep;tr6=tr0;continue}
   const c=w.x.wc;r.mark=nrNow("wc:"+sd.k,sd.id);
   const XX=X_.wcActors(sd,w,c);const A=XX&&XX.A,B=XX&&XX.B;r.who=[A&&A.n,B&&B.n].filter(Boolean).join(' / ')||'-';
   const SL=X_.wcScope(sd,w)||[];
   r.alive=(!A||A.k!=="rv"||A.o.alive)&&(!B||B.k!=="rv"||B.o.alive)&&(!B||!A||A.o!==B.o);
   r.inScope=!A||A.k!=="rv"||sd.scope==="all"||sd.scope==="srv"||SL.includes(A.o);
   const fit=(a,rr)=>!rr||!a||!["rv","sv"].includes(a.k)||(!(rr["nết"]||[]).length||rr["nết"].some(n=>tr6(a.o).includes(n)))&&(!(rr["lòng"]||[]).length||rr["lòng"].some(n=>tr6(a.o).includes(n)));
   r.net=fit(A,(sd.roles||{}).A)&&fit(B,(sd.roles||{}).B);
   const RR=c.r||{};const ids=Object.keys(sd.stances);let nN=0;r.roundOk=Object.keys(RR).every(k=>ids.includes(k));for(const k in RR)nN+=RR[k].length;r.nN=nN;r.roundOk=r.roundOk&&nN<=BAL.wc.npcMax;
   if(sd.scope!=="srv")r.roundOk=r.roundOk&&Object.values(RR).every(Lp=>Lp.every(id=>{const v=liveRivals(true).find(x=>x.id===id);return v&&SL.includes(v)}));
   r.roundAny=SL.filter(v=>(!A||v!==A.o)&&(!B||v!==B.o)).length===0||nN>0;
   /* her card: the kind's card first, then the composed one */
   Q.length=0;S.wwSeen={};let m0=null;try{m0=E[sd.k].card(w)}catch(e){}const m=(()=>{X_.flush();return Q.find(q=>q&&q.opts&&q.opts.length&&q.wwin&&/<p>/.test(q.h||"")&&q.opts.length===4&&Object.values(sd.stances).every((st,j)=>q.opts[j]))})();
   r.card=!!m;if(!m){X_.WC[sd.k]=keep;tr6=tr0;continue}
   const all=m.h+" "+m.opts.map(o=>o.n+" "+o.x).join(" ");r.unfilled=/\{[A-Za-z]+\}/.test(all);r.text=plain(m.h).replace(/\s+/g,' ').trim().slice(0,150);
   const k=i++%4;const sid=ids[k],st=sd.stances[sid];const tier=sd.tier||"m",F=BAL.wc.fx[tier];
   S.an=50;for(const a of [A,B])if(a&&a.o&&typeof a.o==='object'){if(a.k==='sv'||a.k==='maid')a.o.loyal=50;if(a.k==='kid')a.o.fond=50}
   const s0=snap(),ra=relV(A),rb=relV(B);const rec={};const ap0=apply;apply=function(o){for(const[kk,v]of Object.entries(o||{}))if(typeof v==='number')rec[kk]=(rec[kk]||0)+v;return ap0.apply(this,arguments)};
   const obN=(S.wc.ob||[]).length;const RL=[];const ra0=relAdd;relAdd=function(x,y,n){for(const a of [A,B])if(a&&a.o&&(x===a.o||y===a.o))RL.push([a,n]);return ra0.apply(this,arguments)};Q.length=0;Q.push(m);showModal();try{chooseM(k)}finally{apply=ap0;relAdd=ra0}
   const exp={};for(const[kk,n]of Object.entries(st.gain))exp[kk]=(exp[kk]||0)+n*F[kk==="rel.A"||kk==="rel.B"?"rel":kk];for(const[kk,n]of Object.entries(st.loss))exp[kk]=(exp[kk]||0)-n*F[kk==="rel.A"||kk==="rel.B"?"rel":kk];
   r.num=[];const gv=X_.val(st.gain,tier,1),lv=X_.val(st.loss,tier,-1);for(const kk of SK){const want=exp[kk]||0,got=(gv.fx[kk]||0)+(lv.fx[kk]||0);if(want!==got)r.num.push(`${kk} ${got}≠${want}`);const asked=kk==="an"?(S.an||0)-s0.an:(rec[kk]||0);if(want&&Math.sign(asked)!==Math.sign(want))r.num.push(`${kk} applied ${asked}, wanted the way of ${want}`)}
   const relOk=(a,kk,v0)=>{const want=exp[kk]||0;if(!a||!want)return true;if(a.k==='rv'){/* the engine's call (the person's own rules then size it): sign of what was asked */const s=RL.filter(x=>x[0]===a).reduce((q,x)=>q+x[1],0);return Math.sign(s)===Math.sign(want)}const got=relV(a)-v0;return Math.sign(got)===Math.sign(want)||got===0&&Math.abs(relV(a))>=100};
   if(!relOk(A,"rel.A",ra))r.num.push(`rel.A ${relV(A)-ra}≠${exp["rel.A"]}`);if(!relOk(B,"rel.B",rb))r.num.push(`rel.B ${relV(B)-rb}≠${exp["rel.B"]}`);
   const OB=S.wc.ob||[];r.trace=OB.length>obN?OB[OB.length-1].trace:null;r.objOk=sd.object?OB.length===obN+1&&!!r.trace&&!/\{/.test(r.trace+OB[OB.length-1].name):OB.length===obN;
   r.endTxt=X_.wcEnd(w);r.endOk=nN===0||/Trong cung khi ấy/.test(r.endTxt);
   /* the same seed is not drawn again in this life */
   const w2=open1(sd,sub);r.rest=w2?!(w2.x.wc&&w2.x.wc.id===sd.id):nrNow("wc:"+sd.k,sd.id);/* a kind that cannot reopen at once: the memory says it rests */
   if(window.__wo){whereOf=window.__wo;window.__wo=null}X_.WC[sd.k]=keep;tr6=tr0;S.wwin={L:[],last:{},n:{},seq:(S.wwin&&S.wwin.seq)||0};Q.length=0;
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300);tr6=tr0}}
  out.count=wcCount();return out},FIX);
 for(const r of R.seeds){const t=`${r.id} (${r.who||'-'})${r.forced?' [forced]':''}`;
  if(r.err){ok(false,t+' threw '+r.err);continue}if(r.skip){console.log('skip '+t+': '+r.skip);continue}
  ok(r.reg,t+' registers');ok(r.open,t+' a real '+r.k+' window opens');if(!r.open)continue;ok(r.drawn,t+' drawn for the window (cast inside the scope)'+(r.dbg?' '+r.dbg:''));if(!r.drawn)continue;
  ok(r.mark,t+' P0 marks wc:'+r.k);ok(r.alive&&r.net&&r.inScope,t+' people alive, distinct, wanted nết, inside the scope');
  ok(r.roundOk&&r.roundAny,t+` NPC round: ${r.nN} people of the scope chose one of the 4 stances`);ok(r.card,t+' her card after the kind card');if(!r.card)continue;
  ok(!r.unfilled,t+' 4 options, placeholders filled: '+r.text);ok(!r.num.length,t+' numbers = steps × BAL.wc.fx '+r.num.join(', '));
  ok(r.objOk,t+' object traced: '+r.trace);ok(r.endOk,t+' end text says who chose what:'+r.endTxt);ok(r.rest,t+' not drawn again this life')}
 ok(!(R.shadow||[]).length,`fixture rows not shadowed by a different built seed of the same id (law 11 / thin-p6 r2): ${(R.shadow||[]).join(", ")||"none"}`);
 ok(R.builtN<0||R.built>=R.builtN,`built JWSEEDS register (${R.built}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 console.log(fail?`WC PLAY: ${fail} FAIL (${R.seeds.length} seeds, ${R.forced} forced)`:`WC PLAY: ALL PASS (${R.seeds.length} seeds, ${R.forced} forced, ${R.builtN} built; count ${JSON.stringify(R.count)})`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
