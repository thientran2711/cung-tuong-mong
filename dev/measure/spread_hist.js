/* D13 spread events across buổi — measure (owner 15/11 23:20Z: "popups per buổi histogram before/after with bots").
   Real bot play (dev/measure harness inpage6 + inbal, all 9 origins). Counts every card (popup) SHOWN, by the buổi it is shown in.
   A card = one entry of Q reaching the front of the queue (what the player sees). Kinds:
     ev  = world cards that appeared while the game moved to a new buổi / tuần (nextBuoi / endTurn): events, news, stipend, edicts…
     act = cards opened by her own act (results, visits on arrival, minigame results).
   Also checks the D13 rules: no card lost (every card that entered Q, or the spread queue, is shown or still waiting when the life ends;
   anti-repeat drops of OPTIONAL j68 cards are counted apart), no card waits more than BAL.spread.maxWait buổi, no card shown before its buổi.
   usage: node dev/measure/spread_hist.js <sens|rand> <lives> <out.json> [shard] [weeksPerLife=36]   (GAME=path to dev/index.html)
   OFF=1 sets window.__spreadOff=1 (the "before" histogram on the same build). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const mode=process.argv[2]||'sens',LIVES=+process.argv[3]||5,OUT=process.argv[4]||'/dev/stdout',SH=+process.argv[5]||0,WEEKS=+process.argv[6]||36;
const M=__dirname,GAME=process.env.GAME||path.join(__dirname,'..','index.html');
const PRE=`(function(){${process.env.OFF?'window.__spreadOff=1;':''}${process.env.CW?'BAL.spread.codeWait='+(+process.env.CW)+';':''}const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];window.__hOi=${SH};const s0=start;start=function(){window.__forceOrigin=O[(window.__hOi++)%O.length];return s0.apply(this,arguments)}})();`;
const HOOK=`(function(){
 const H=window.__H={lives:0,weeks:0,slot:[[],[],[],[]],slotEv:[[],[],[],[]],max:0,maxAt:"",lost:0,lostEx:[],optDrop:0,early:0,late:0,lateEx:[],wait:[],carried:0,
   tt:{},dropWhy:{},per:{},cur:null,lifeWk0:0,shown:0,pushed:0,errs:[]};
 const bk=()=>wk()*B4N+(S.buoi||0);
 /* the real modal state: jspread r2 lets game code read the modal as open during a buổi change (SP13.vo) while nothing is on screen */
 const HD=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"hidden");const realHid=()=>HD.get.call($("modal"));
 function flush(){/* close the life: count every buổi from its first tuần to now (zeros included) */const c=H.cur;if(!c)return;
  for(let k=c.k0;k<=c.k1;k++){const a=c.n[k]||0,e=c.e[k]||0,s=((k%B4N)+B4N)%B4N;if(e>=3&&(H.heavy=H.heavy||[]).length<40)H.heavy.push(s+": "+(c.L[k]||[]).join(" | "));H.slot[s].push(a);H.slotEv[s].push(e);if(a>H.max){H.max=a;H.maxAt=(c.o||"")+" b"+k}}
  H.weeks+=Math.floor((c.k1-c.k0+1)/B4N);
  /* lost = entered the queue, never shown, not waiting now */
  for(const m of c.all){if(m.__h13s)continue;if(Q.includes(m))continue;if(typeof SP13!=="undefined"&&SP13.waiting(m))continue;try{if(EVHOLD.some(h=>h.m===m))continue}catch(e){}if(m.__h13opt){H.optDrop++;continue}if(m.__h13purge){H.purge=(H.purge||0)+1;continue}H.lost++;if(H.lostEx.length<15)H.lostEx.push((c.o||"")+" "+String(m.t||"").slice(0,40)+" "+JSON.stringify({sp:m.__sp13,rel:m.__sp13c,r:m.__sp13r,inL:SP13.L.length,c95:m.__c95,b95:m.__b95,pid:m.pid,k:H.cur.k1}))}
  H.lives++;H.cur=null}
 function sp13c(m){try{return typeof jqSaveable==="function"&&!jqSaveable(m)?"C":""}catch(e){return""}}
 function begin(){H.cur={L:{},k0:bk(),k1:bk(),n:{},e:{},all:new Set(),o:S.origin&&S.origin.k}}
 function stampAll(src){for(const m of Q){if(!m||typeof m!=="object")continue;if(!m.__h13){m.__h13=src;m.__h13b=bk();H.pushed++}if(H.cur)H.cur.all.add(m)}}
 const sm0=showModal;showModal=function(){try{if(S&&!S.dead&&H.cur)stampAll(H.inNB?"ev":"act")}catch(e){}/* stamp before too: cards j68 drops inside this call are counted */const r=sm0.apply(this,arguments);try{try{for(const h of EVHOLD)if(h&&h.m)h.m.__h13j68=1}catch(e){}if(S&&!S.dead&&H.cur){stampAll(H.inNB?"ev":"act");const m=Q[0];if(m&&!m.__h13s&&!realHid()){m.__h13s=1;H.shown++;const k=bk();H.cur.k1=Math.max(H.cur.k1,k);
    H.cur.n[k]=(H.cur.n[k]||0)+1;if(m.__h13==="ev"){H.cur.e[k]=(H.cur.e[k]||0)+1;(H.cur.L[k]=H.cur.L[k]||[]).push(String(m.t||"").slice(0,26)+(m.__sp13?(m.__sp13.due!=null?"*":"p"):"")+(m.must?"M":"")+(sp13c(m)))}{const t=String(m.t||m.title||"").replace(/<[^>]+>/g,"").replace(/[0-9]+/g,"#").slice(0,34)+"|"+m.__h13+"|"+(m.pid?"P:"+m.pid:"")+(m.opts?"o":"")+(typeof jqSaveable==="function"&&!jqSaveable(m)?"C":"")+(m.must?"M":"")+(m.kind?"k:"+m.kind:"")+(m.cls?"c:"+m.cls:"");const T=H.tt[t]=H.tt[t]||[0,0,0,0];T[k%B4N]++}
    if(m.__sp13&&m.__sp13.due>k){H.early++}
    const w=k-(m.__h13b==null?k:m.__h13b);H.wait.push(w);if(w>0)H.carried++;const mx=(typeof BAL!=="undefined"&&BAL.spread&&BAL.spread.maxWait)||8;if(w>mx&&m.__h13j68){H.j68late=(H.j68late||0)+1}else if(w>mx){H.late++;if(H.lateEx.length<10)H.lateEx.push(String(m.t||"").slice(0,40)+" w"+w)}}}}catch(e){H.errs.push(String(e).slice(0,120))}return r};
 const nb0=nextBuoi;nextBuoi=function(){H.inNB=(H.inNB||0)+1;let r;try{r=nb0.apply(this,arguments)}finally{H.inNB--}try{if(S&&!S.dead&&H.cur){H.cur.k1=Math.max(H.cur.k1,bk());stampAll("ev")}}catch(e){}return r};
 /* optional j68 cards dropped by the anti-repeat rule (by design, logged as a line) */
 /* false warnings dropped by the D29 motive gate (j95b, by design) */
 if(typeof j95bPurgeWarn==="function"){const p0=j95bPurgeWarn;j95bPurgeWarn=function(){const b=Q.slice();const r=p0.apply(this,arguments);try{for(const m of b)if(!Q.includes(m)&&m&&typeof m==="object")m.__h13purge=1}catch(e){}return r}}
 /* j70 merges several warnings into one card (by design) */
 if(typeof thrify70==="function"){const t0=thrify70;thrify70=function(){const b=Q.slice();const r=t0.apply(this,arguments);try{for(const m of b)if(!Q.includes(m)&&m&&typeof m==="object")m.__h13purge=1}catch(e){}return r}}
 if(typeof evDropInfo==="function"){const d0=evDropInfo;evDropInfo=function(m){try{if(m){m.__h13opt=1;const st=String(new Error().stack).split("\\n")[2]||"";const f=(st.match(/at (\\S+)/)||[])[1]||"?";let why=f;
   if(f==="evGate"){try{const sc=evS(),K=evKeys(m),now=wk(),tl=sc.tpl[K.tpl],kl=sc.key[K.key];why+=((tl!=null&&now-tl<E68S.tpl)||(kl!=null&&now-kl<E68S.key))?":cooldown":(EVHOLD.length>=E68S.hold?":holdfull":":dayfull")}catch(e){}}
   H.dropWhy[why]=(H.dropWhy[why]||0)+1}}catch(e){}return d0.apply(this,arguments)}}
 /* review r1 FAIL 1: cards created per generator that gates on the queue length inside a buổi change (OFF vs ON per 100 tuần) */
 H.gen={};H.gq={};const G=(k,n)=>{if(n>0&&H.cur)H.gen[k]=(H.gen[k]||0)+n};
 const wrapQ=(name,key)=>{try{const f0=eval(name);if(typeof f0!=="function")return;const w=function(){const n=Q.length;try{if(H.cur){const h=H.gq[key]=H.gq[key]||[0,0,0,0,0,0];h[Math.min(5,n)]++;if(${process.env.GQX?1:0}&&(H.gqx=H.gqx||[]).length<60&&key==="j70 show70")H.gqx.push((S.buoi||0)+":"+Q.map(m=>String(m.t||"").slice(0,18)+(m.pid?"/"+m.pid:"")).join("|"))}}catch(e){}const r=f0.apply(this,arguments);try{G(key,Q.length-n)}catch(e){}return r};eval(name+"=w")}catch(e){}};
 const wrapR=(name,key)=>{try{const f0=eval(name);if(typeof f0!=="function")return;const w=function(){const r=f0.apply(this,arguments);try{if(r)G(key,1)}catch(e){}return r};eval(name+"=w")}catch(e){}};
 /* the reviewer's count: show70 called with a pending "seen"/"warn" plot card (she learns a plot targets her) and stopped by its Q gate */
 try{const s7=show70;show70=function(){try{const z=j70();if(z&&H.cur){const L=z.pl.filter(p=>p.pend&&!inQ70(p));if(L.some(p=>p.pend==="seen"||p.pend==="warn")){H.s70p=(H.s70p||0)+1;
   if(Q.length>2&&!L.some(p=>p.pend==="aft"||p.forced))H.s70g=(H.s70g||0)+1}}}catch(e){}return s7.apply(this,arguments)}}catch(e){}
 wrapQ("show70","j70 show70");wrapQ("e68Tick","j68 e68Tick");wrapQ("q72Tick","j72 q72Tick");wrapQ("petMonth","jpet petMonth");wrapQ("kcWeek","jkc kcWeek");
 wrapR("mFire7","j71 merit");wrapR("rgLNext","jreign rgLNext");wrapR("makeDil","j3 dilemma");
 try{const p0=push70;push70=function(p){const st=p&&p.pend;const r=p0.apply(this,arguments);try{if(r)G("j70 push:"+st,1)}catch(e){}return r}}catch(e){}
 if(${process.env.GQX?1:0}){const sm2=showModal;showModal=function(){const b=Q.slice();const r=sm2.apply(this,arguments);try{if(H.inNB&&H.cur){H.rmv=H.rmv||{};for(const m of b)if(!Q.includes(m)){const k=String(m.t||"").slice(0,22)+(m.pid?"/"+m.pid:"");H.rmv[k]=(H.rmv[k]||0)+1}H.smn=(H.smn||0)+1}}catch(e){}return r}}
 try{const sm1=showModal;showModal=function(){try{for(const m of Q)if(m&&typeof m==="object"&&!m.__h13g){m.__h13g=1;if(m.t==="Thỉnh bình an mạch")G("jthaiy routine",1)}}catch(e){}return sm1.apply(this,arguments)}}catch(e){}
 const st0=start;start=function(){flush();const r=st0.apply(this,arguments);try{begin()}catch(e){}return r};
 const ov0=over;over=function(){try{if(H.cur)H.cur.k1=Math.max(H.cur.k1,bk())}catch(e){}flush();return ov0.apply(this,arguments)};
 window.__H13end=function(){/* life cap: close at WEEKS tuần */if(S&&!S.dead&&H.cur&&wk()-Math.floor(H.cur.k0/B4N)>=${WEEKS}){H.cur.k1=bk()-1;flush();Q=[];try{if(typeof SP13!=="undefined")SP13.reset()}catch(e){}start()}};
})();`;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
 const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(PRE);await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null;window.__fairO=null;window.__q72O=null;window.__xO=null;window.__q72off=${process.env.Q72?0:1}`);
 for(const f of [process.env.BOT||'inpage6.js','inbal.js'])await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 await page.evaluate(HOOK);if(process.env.DBGF)await page.evaluate(fs.readFileSync(process.env.DBGF,'utf8'));await page.evaluate(()=>start());
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>{for(let i=0;i<10;i++){window.__bot.step(m,20);window.__H13end()}return window.__H.lives},[mode]);if(n>=LIVES)break;if(Date.now()-t0>(+process.env.CAP||2400)*1e3){console.log('time cap');break}}
 const out=await page.evaluate(()=>{const H=window.__H;const st=a=>{const n=a.length||1,s=a.reduce((x,y)=>x+y,0);const h=[0,0,0,0,0,0];a.forEach(v=>h[Math.min(5,v)]++);return{n:a.length,mean:+(s/n).toFixed(3),hist:h,p95:a.slice().sort((x,y)=>x-y)[Math.floor(a.length*.95)]||0}};
  return{lives:H.lives,weeks:H.weeks,slot:H.slot.map(st),slotEv:H.slotEv.map(st),max:H.max,maxAt:H.maxAt,shown:H.shown,pushed:H.pushed,lost:H.lost,lostEx:H.lostEx,optDrop:H.optDrop,dropWhy:H.dropWhy,j68late:H.j68late||0,heavy:H.heavy||[],purge:H.purge||0,early:H.early,late:H.late,lateEx:H.lateEx,
   carried:H.carried,titles:Object.entries(H.tt).sort((a,b)=>b[1].reduce((x,y)=>x+y)-a[1].reduce((x,y)=>x+y)).slice(0,80),waitMax:Math.max(0,...H.wait),gen:H.gen,s70p:H.s70p||0,s70g:H.s70g||0,dbg:window.__dbg||[],gq:H.gq,rmv:H.rmv||{},smn:H.smn||0,gqx:H.gqx||[],errs:H.errs.slice(0,10),sp:typeof SP13!=="undefined"?SP13.stat:null,off:!!window.__spreadOff,
   ends:window.__res.slice(-60).map(r=>(r.origin||"")+":"+(r.title||"").slice(0,20)),stuck:window.__res.filter(r=>r.title==="TIMEOUT").slice(-6).map(r=>({stuck:r.stuck,turns:r.turns,st:String(r.state||"").slice(0,300)}))}});
 out.pageErrors=errs.slice(0,20);out.pageErrorN=errs.length;out.mode=mode;
 fs.writeFileSync(OUT,JSON.stringify(out,null,1));
 console.log(mode,'off',out.off,'lives',out.lives,'weeks',out.weeks,'mean/slot',out.slot.map(s=>s.mean).join(' '),'ev/slot',out.slotEv.map(s=>s.mean).join(' '),'max',out.max,'lost',out.lost,'late',out.late,'early',out.early,'pageErr',errs.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
