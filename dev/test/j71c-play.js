/* ORDER THIN P7 browser test: composed festivals (j71c) on the real game. node dev/test/j71c-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   STAGES: each registers as one more FV7[fest] entry AFTER the old ones (old indices unchanged; j71cCount().old = the hand-written count), C stages
   get their FT7 title, the j71 runtime builds its card (fPP7 params; non-C: fMake7 card with {A} = a real consort; C: the invitation names the
   prize when the festival has prizes). PRIZES: the winner takes the real object (she: trace_me + the IT item through goodsGive; an NPC: trace_npc
   names the real winner), recorded once (law 6c). COMPLICATIONS: drawn for a stage of a fitting kind with a real rival B (contest: one of the
   entrants) by nết (forced when no one in this world has it), 4 options, placeholders filled, choosing (the real chooseM path) is built from
   exactly steps × BAL.j71c.fx and moves every stat the right way, object trace kept, P0 mark j71c:c, never drawn twice in a life.
   A whole festival day (plan → fDay7) queues the complication after the day's own card. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'j71c-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse).filter(r=>['stage','comp','prize'].includes(r.type));
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);
  const X_=J71C_X;const plain=t=>String(t||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();const out={st:[],pz:[],co:[],day:null,forced:0,built:0,builtN:-1};
  try{out.builtN=(typeof J71SEEDS!=='undefined'?J71SEEDS:[]).length;const C=J71C_SEEDS;out.built=J71SEEDS.filter(s=>C.SI[s.id]||C.CI[s.id]||C.PI[s.id]).length}catch(e){}
  const __ss=o=>JSON.stringify(o,(k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.keys(v).sort().reduce((a,x)=>(a[x]=v[x],a),{}):v);out.shadow=FIX.filter(r=>{const s=(typeof J71SEEDS!=="undefined"?J71SEEDS:[]).find(x=>x.id===r.id);return s&&__ss(s)!==__ss(r)}).map(r=>r.id);
  const old0=Object.assign({},X_.OLDN);
  for(const sd of FIX)j71cReg(sd);
  const L=()=>liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined);L().forEach(v=>v.bac=Math.max(v.bac||0,200));
  const ALLN=[].concat(...Object.values(BAL.net.F),...Object.values(BAL.net.M));const tr0=tr6;
  const SK=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"];const snap=()=>{const o={};for(const k of SK)o[k]=k==="an"?(S.an||0):(S[k]||0);return o};
  /* STAGES */
  for(const sd of FIX.filter(r=>r.type==='stage')){const r={id:sd.id};out.st.push(r);try{const e=J71C_SEEDS.SI[sd.id];r.reg=!!e;if(!e)continue;const k=sd.fest,i=e.i;
   r.after=i>=old0[k];r.title=sd.kind!=="C"||FT7[k+":"+i]===sd.title;const V=FV7[k][i];r.same=V[0]===sd.kind&&V[2]===sd.text;
   const pp=fPP7(k,i);r.pp=!!pp||sd.kind==="G";if(!pp){if(sd.kind==="G")r.skip="no consort chose to gamble today (npcWhy f7Gamble)";continue}
   if(sd.kind==="C"){const m=fInv7(k,pp,true);const hasP=(J71C_SEEDS.PI&&Object.values(J71C_SEEDS.PI).some(z=>z.fest===k));r.card=!!m&&(!hasP||/Giải:/.test(m.h));r.text=plain(m&&m.h).slice(0,120)}
   else{const m=fMake7(k,i,false,pp);const d=m&&(m.opts||m.o)?m:(m&&m.pid&&PEND[m.pid]?PEND[m.pid](m.pp||pp):m);const h=d?(d.h||d.t||""):"";r.card=!!d&&!/\{A\}/.test(h);r.text=plain(h).slice(0,120)}
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  /* PRIZES */
  const gg=window.goodsGive;let given=[];window.goodsGive=goodsGive=function(p,k){given.push(k);return gg?gg.apply(this,arguments):""};
  for(const sd of FIX.filter(r=>r.type==='prize')){const r={id:sd.id};out.pz.push(r);try{const k=sd.fest;const j=S.j71c=S.j71c||{ob:[],cur:{}};j.cur=j.cur||{};j.ob=j.ob||[];
   given=[];j.cur[k]={cz:sd.id,done:0};const a=X_.award(k,[{p:S}]);r.me=a.indexOf(sd.trace_me)>=0&&(!sd.it||given.includes(sd.it));
   const once=X_.award(k,[{p:S}])==="";const v=L()[0];j.cur[k]={cz:sd.id,done:0};const b2=X_.award(k,[{p:v}]);r.npc=b2.indexOf(sd.trace_npc.replace(/\{W\}/g,v.name))>=0;r.once=once;
   r.ob=j.ob.slice(-2).every(o=>o.sid===sd.id&&o.trace&&!/\{/.test(o.trace));r.txt=(a+" |"+b2).slice(0,200)}catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  window.goodsGive=goodsGive=gg;
  /* COMPLICATIONS */
  let n=0;for(const sd of FIX.filter(r=>r.type==='comp')){const r={id:sd.id};out.co.push(r);try{const C=J71C_SEEDS.CI[sd.id];r.reg=!!C;if(!C)continue;
   const fest=sd.fest==="*"?"newyear":sd.fest;const kind=sd.kinds[0];S.bac=Math.max(S.bac||0,9999);S.suc=100;tr6=tr0;
   try{const C0=nrStore();if(C0.sets[0])C0.sets[0].delete(nrK('j71c:c',sd.id))}catch(e){}/* the game's own festival days may have drawn it already this life */const own=Object.values(J71C_SEEDS.CI).filter(c=>c.id!==sd.id);own.forEach(c=>{c.__k=c.kinds;c.kinds=[]});/* only this comp can be drawn */
   let c=X_.drawComp(fest,kind,L());if(!c){tr6=v=>ALLN.slice();r.forced=1;out.forced++;c=X_.drawComp(fest,kind,L())}
   own.forEach(c=>{c.kinds=c.__k;delete c.__k});r.drawn=!!c&&c.id===sd.id;if(!r.drawn)r.dbg=JSON.stringify({c,now:nrNow('j71c:c',sd.id),on:BAL.j71c.on,cf:Object.keys(J71C_SEEDS.CI)});if(!r.drawn){tr6=tr0;continue}
   r.mark=nrNow("j71c:c",sd.id);const card=X_.compCard(fest,c);r.card=!!card&&card.opts.length===4;if(!card){tr6=tr0;continue}
   const B=c.b!=null?A6("rv",c.b):null;r.who=B?B.n:'-';r.fit=!sd.roles||!sd.roles.B||(B&&B.o.alive&&(!(sd.roles.B["nết"]||[]).length||sd.roles.B["nết"].some(x=>tr6(B.o).includes(x))));tr6=tr0;
   const all=card.h+" "+card.opts.map(o=>o.n+" "+o.x).join(" ");r.unfilled=/\{[A-Za-z]+\}/.test(all);r.text=plain(card.h).slice(0,140);
   const k=n++%4;const sid=Object.keys(sd.stances)[k],st=sd.stances[sid];const tier=sd.tier||"m",F=BAL.j71c.fx[tier];S.an=50;
   const s0=snap(),rb=B?aff(B.o,S):0;const rec={};const ap0=apply;apply=function(o){for(const[kk,v]of Object.entries(o||{}))if(typeof v==='number')rec[kk]=(rec[kk]||0)+v;return ap0.apply(this,arguments)};
   const obL=(S.j71c.ob||[]).slice(-1)[0];const RL=[];const ra0=relAdd;relAdd=function(x,y,n){if(B&&(x===B.o||y===B.o))RL.push(n);return ra0.apply(this,arguments)};Q.length=0;Q.push(card);showModal();try{chooseM(k)}finally{apply=ap0;relAdd=ra0}
   const exp={};for(const[kk,v]of Object.entries(st.gain))exp[kk]=(exp[kk]||0)+v*F[kk==="rel.B"?"rel":kk];for(const[kk,v]of Object.entries(st.loss))exp[kk]=(exp[kk]||0)-v*F[kk==="rel.B"?"rel":kk];
   r.num=[];const gv=X_.val(st.gain,tier,1),lv=X_.val(st.loss,tier,-1);for(const kk of SK){const want=exp[kk]||0,got=(gv.fx[kk]||0)+(lv.fx[kk]||0);if(want!==got)r.num.push(`${kk} ${got}≠${want}`);const asked=kk==="an"?(S.an||0)-s0.an:(rec[kk]||0);if(want&&Math.sign(asked)!==Math.sign(want))r.num.push(`${kk} applied ${asked}, wanted the way of ${want}`)}
   if(B&&exp["rel.B"]){/* the engine's call; the person's own rules size it */const d=RL.reduce((a,x)=>a+x,0);if(Math.sign(d)!==Math.sign(exp["rel.B"]))r.num.push(`rel.B asked ${d}≠${exp["rel.B"]}`)}
   const OB=S.j71c.ob||[];const last=OB.slice(-1)[0];/* the list is capped (BAL.j71c.obKeep): compare the newest entry */r.objOk=sd.object?last!==obL&&last.sid===sd.id&&!/\{/.test(last.trace+last.name):last===obL;
   {const z=X_.drawComp(fest,kind,L());r.rest=!z||z.id!==sd.id}Q.length=0;
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300);tr6=tr0}}
  /* a whole festival day: plan a composed C stage, she enters, the day plays, the complication queues after the day's card */
  try{const st=FIX.find(r=>r.type==='stage'&&r.kind==='C');if(st){const k=st.fest,i=J71C_SEEDS.SI[st.id].i;S.j71c.cur={};
    const pp=fPP7(k,i);const j=j7s();j.plans=j.plans||{};j.plans[k]={y:S.year,pp,me:1};X_.PEND7.length=0;Q.length=0;tr6=v=>ALLN.slice();
    const m=fDay7(k);tr6=tr0;out.day={card:!!m,pend:X_.PEND7.length,prize:!!pp.cz,t:plain(m&&(m.h||m.t)).slice(0,160)};
    if(m&&m.opts){const i2=m.opts.findIndex(o=>/Bỏ thi/.test(o.n));if(i2>=0){Q.length=0;Q.push(m);showModal();chooseM(i2)}}
    out.day.ob=(S.j71c.ob||[]).some(o=>o.sid===pp.cz);X_.flush();out.day.q=Q.some(q=>/Chuyện bên lề hội/.test(q.t||""))||out.day.pend===0}}catch(e){out.day={err:String(e&&e.stack||e).slice(0,300)}}
  out.count=j71cCount();return out},FIX);
 for(const r of R.st){const t=`${r.id}`;if(r.err){ok(false,t+' threw '+r.err);continue}ok(r.reg&&r.after&&r.same,t+' appended after the old variants');ok(r.title,t+' FT7 title');ok(r.pp,t+' fPP7 params from the real roster');if(r.skip)console.log('skip '+t+': '+r.skip);if(r.card!==undefined)ok(r.card,t+' card built by the j71 runtime: '+r.text)}
 for(const r of R.pz){const t=`${r.id}`;if(r.err){ok(false,t+' threw '+r.err);continue}ok(r.me,t+' she wins: trace_me (+ IT item)');ok(r.once,t+' given once per contest');ok(r.npc,t+' NPC wins: trace_npc names the real winner');ok(r.ob,t+' object recorded (law 6c): '+r.txt)}
 for(const r of R.co){const t=`${r.id} (${r.who||'-'})${r.forced?' [forced]':''}`;if(r.err){ok(false,t+' threw '+r.err);continue}
  ok(r.reg,t+' registers');ok(r.drawn,t+' drawn for a fitting stage kind'+(r.dbg?' '+r.dbg:''));if(!r.drawn)continue;ok(r.mark,t+' P0 marks j71c:c');ok(r.card&&r.fit,t+' 4 options, real rival with the wanted nết');
  ok(!r.unfilled,t+' placeholders filled: '+r.text);ok(!r.num.length,t+' numbers = steps × BAL.j71c.fx '+r.num.join(', '));ok(r.objOk,t+' object trace');ok(r.rest,t+' not drawn again this life')}
 if(R.day){if(R.day.err)ok(false,'festival day threw '+R.day.err);else{ok(R.day.card,'festival day card: '+R.day.t);ok(R.day.q,`complication queued after the day's card (${R.day.pend})`);if(R.day.prize)ok(R.day.ob,'the day\'s prize went to the real winner')}}
 ok(!(R.shadow||[]).length,`fixture rows not shadowed by a different built seed of the same id (law 11 / thin-p6 r2): ${(R.shadow||[]).join(", ")||"none"}`);
 ok(R.builtN<0||R.built>=R.builtN,`built J71SEEDS register (${R.built}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 console.log(fail?`J71C PLAY: ${fail} FAIL`:`J71C PLAY: ALL PASS (${R.st.length} stages, ${R.co.length} comps, ${R.pz.length} prizes, ${R.forced} forced; count ${JSON.stringify(R.count.stages)} ${JSON.stringify(R.count.comps)})`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
