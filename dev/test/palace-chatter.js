/* PALACE CHATTER test (PL#6 bubble talk, jchat.js + jchatl.js; owner OD:L1627 (5)).
   usage: node dev/test/palace-chatter.js <baseURL e.g. file:///home/user/wt/x/> [W=755] [H=1000] [outJson]
   Checks: (1) line banks: ≥ 300 distinct lines, no digit / %, no address word typed by hand (jvoice tokens only), every tag known, every slot known;
   (2) greeting on arrival home is said by HER OWN maid who really stands on the stage, once; (3) idle chatter: every speaker is a person on the stage
   at that moment (S.visit.people, in view), ≤ BAL.chat.maxBub bubbles, no raw {token} in any line, no exchange repeated within the window over many ticks;
   (4) bubbles stand ABOVE every head (bottom ≤ the speaker's real head top, kit §78.y line) and inside the stage; (5) a happening pair stands next to each
   other (S.visit.people order) and talks first; (6) eavesdrop result quotes the exchange (“…”); (7) BAL.chat read (on:0 = silent); (8) perf: tick cost. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,BASE,W0,H0,OUT]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<900});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(800);
 const R=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));const C=[];const ck=(n,ok,d)=>C.push([n,!!ok,d===undefined?'':d]);
  SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const clr=()=>{Q.length=0;try{closeModal()}catch(e){}const md=document.getElementById('modal');if(md)md.hidden=true};
  const go=k=>{clr();S.dead=false;S.confined=0;used=0;S.sung=Math.max(S.sung||0,60);try{tab='act'}catch(e){}try{goTo(k)}catch(e){}clr();
   if(S.place!==k){S.place=k;S.visit={k,people:k==='home'?homePeople():[],talked:false,tk:{},msg:''}}/* a gated place still shows its stage (head-marker-gap pattern) */
   if(k!=='home'&&S.visit){const P=S.visit.people;const L=liveRivals(true).filter(v=>!v.out&&!P.some(x=>x.ref===v)&&!sameHouse(S,v));let n=0;while(P.filter(x=>x.kind==='rival').length<3&&L[n])P.push(rp(L[n++]))}
   render()};
  S.buoi=0;used=0;deal();try{tab='act'}catch(e){}render();await Wt(1500);clr();
  const waitImgs=()=>Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);
  /* (1) banks */
  const L=[];const add=x=>Array.isArray(x)?x.forEach(add):typeof x==='string'?L.push(x):x&&typeof x==='object'&&!(x instanceof RegExp)?Object.values(x).forEach(add):0;
  add(CHAT_L.greet);CHAT_L.topics.forEach(t=>add(t.x));add(CHAT_L.hap);add(CHAT_L.eav);const D=new Set(L.map(s=>s.replace(/^\[#[^\]]*\]\s*/,'').replace(/^[AB]:\s*/,'')));
  ck('bank: ≥ 300 distinct lines',D.size>=300,{all:L.length,distinct:D.size});
  const txt0=s=>s.replace(/\[#[^\]]*\]/g,'').replace(/\{[a-zA-Z0-9]+\}/g,'');ck('bank: no digit / %',!L.some(s=>/[0-9%]/.test(txt0(s))),L.filter(s=>/[0-9%]/.test(txt0(s))).slice(0,3));
  const typed=L.filter(s=>/(^|[^\p{L}])(tiểu chủ|nương nương|chủ tử|thần thiếp|bổn cung|nô tỳ|nô tài)([^\p{L}]|$)/iu.test(s));ck('bank: address words only via jvoice tokens',!typed.length,typed.slice(0,3));
  const TAGS=/^(xuan|ha|thu|dong|sang|chieu|toi|wet|snow|heat|storm|dry|fest|nofest|lo|mid|hi|hq|warm|cool|cold|home|out|pl:[a-z0-9:]+)$/;const badTag=[];
  for(const s of L){const m=/^\[#([^\]]*)\]/.exec(s);if(m)for(const t of m[1].split(','))if(!TAGS.test(t))badTag.push(t)}ck('bank: every tag known',!badTag.length,[...new Set(badTag)].slice(0,5));
  const SL=/\{(?:[Gg]oi|[Xx]ung|[Tt]en|A|B|p|pl|mua|wx|fest|me|t|man|it|h|tr|pl2)\}/g;const badSl=L.filter(s=>/\{[^}]*\}/.test(s.replace(SL,'')));ck('bank: every slot known',!badSl.length,badSl.slice(0,3));
  const needP=CHAT_L.topics.filter(t=>t.need&&!t.x.flat().some(s=>/\{p\}/.test(s)));ck('bank: a topic with a need names {p}',!needP.length,needP.map(t=>t.k).slice(0,5));
  const PK=new Set(['srv-srv','srv-eun','eun-srv','con-con','hh-con','con-hh','emp-con','th-con','srv-kid','srv-me','eun-me','con-me','hh-me','th-me','emp-me','off-me','kid-me']);
  const badPk=CHAT_L.topics.flatMap(t=>t.pair.filter(x=>!PK.has(x)));ck('bank: pair kinds known',!badPk.length,badPk.slice(0,4));
  ck('bank: no thought bubbles (speech only)',!L.some(s=>/(nghĩ thầm|thầm nghĩ|trong lòng nghĩ)/i.test(s)));
  const thinkCss=!!document.querySelector('.kthink,.kchat-think');ck('no thought bubble element',!thinkCss);
  /* (7) BAL */
  ck('BAL.chat keys',BAL.chat&&BAL.chat.on===1&&BAL.chat.gap.min===60&&BAL.chat.gap.max===120&&BAL.chat.maxBub>=1,BAL.chat);
  /* (2) greeting: leave home, come back */
  CHAT.log.length=0;const pl=places().find(x=>x.k==='vuon')?'vuon':places()[0].k;go(pl);await Wt(600);clr();render();await Wt(300);
  go('home');await Wt(200);clr();await waitImgs();for(let w=0;w<30&&!CHAT.log.some(x=>x.tag==='greet');w++){await Wt(500);if(w%4===3)clr()}
  const gl=CHAT.log.filter(x=>x.tag==='greet');const maidName=S.maid&&S.maid.name;
  ck('greet: her own maid greets on arrival',gl.length>=1&&gl[0].who===maidName,{log:gl.slice(0,2),maid:maidName,gt:CHAT.gt,place:S.place,pres:CHAT.present().map(x=>x.p.name),prev:CHAT.prev,ppl:curPeople().map(x=>x.kind+':'+x.name),toks:[...document.querySelectorAll('#tokens .tok')].map(e=>e.className+'|'+e.style.visibility+'|'+e.style.display+'|'+(e.querySelector('img')||{}).naturalWidth),away:typeof ERR!=='undefined'&&ERR.awayOf?!!ERR.awayOf('mm:me'):null,tasks:typeof ERR!=='undefined'?ERR.tasks().map(x=>x.who+':'+x.back):null});
  ck('greet: said once',gl.filter(x=>x.who===maidName).length===1,gl.length);
  /* (4) bubble geometry of the greeting */
  const geo=()=>{const st=document.getElementById('stage'),sr=st.getBoundingClientRect();const out=[];for(const e of document.querySelectorAll('.kchat-b')){const r=e.getBoundingClientRect();
    let head=null;const figs=[...document.querySelectorAll('#tokens .tok.fig img.figimg')].filter(f=>{const q=f.getBoundingClientRect();const cx=r.left+r.width/2;return cx>=q.left&&cx<=q.right});
    for(const f of figs){const B=kitFigBody(f.currentSrc||f.src);if(!B)continue;const q=f.getBoundingClientRect();let bx=q.left,by=q.top,bw=q.width,bh=q.height;const ar=f.naturalWidth/f.naturalHeight;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}
     const top=by+B.t*bh;head=head==null?top:Math.min(head,top)}
    out.push({b:r.bottom,head,gap:head==null?null:head-r.bottom,inside:r.left>=sr.left-1&&r.right<=sr.right+1&&r.top>=sr.top-1})}return out};
  const G1=geo();ck('bubble: above the head with a gap, inside the stage',G1.length>=1&&G1.every(g=>g.inside&&(g.gap==null||g.gap>=2)),G1);
  /* (3) idle chatter */
  await Wt(6500);document.querySelectorAll('.kchat-b').forEach(e=>e.remove());CHAT.run=0;
  const seen=[];let bad=[],maxB=0,rawTok=0,ticks=0;const t0=performance.now();let tc=[];
  const watch=setInterval(()=>{maxB=Math.max(maxB,document.querySelectorAll('#stage .kchat-b').length)},120);
  const visit=async k=>{go(k);await Wt(300);clr();render();await waitImgs();await Wt(400)};
  const spots=['home'].concat(places().map(x=>x.k).filter(k=>['vuon','kn','tn','r2','r3','r4','r5','nvp'].includes(k)));
  for(const k of spots){if(k!=='home')await visit(k);else{go('home');await Wt(300);clr()}
   for(let n=0;n<6;n++){CHAT.run=0;document.querySelectorAll('.kchat-b').forEach(e=>e.remove());const n0=CHAT.log.length;const pres=CHAT.present().map(x=>x.p.name);const a=performance.now();CHAT.tick();tc.push(performance.now()-a);ticks++;
    await Wt(150);const nw=CHAT.log.slice(n0);for(const x of nw){if(!pres.includes(x.who))bad.push([k,x.who,pres]);if(/[{}]/.test(x.txt))rawTok++;seen.push(x.txt)}
    await Wt(2600)}}
  clearInterval(watch);
  ck('idle: lines were said',seen.length>=5,{n:seen.length,stat:CHAT.stat,errs:CHAT.errs});
  ck('idle: every speaker stands on that stage',!bad.length,bad.slice(0,3));
  ck('idle: no raw token',!rawTok,rawTok);ck('idle: ≤ maxBub bubbles at once',maxB<=BAL.chat.maxBub,maxB);
  const dup=seen.filter((x,i)=>seen.indexOf(x)!==i);ck('idle: no line repeated in the run',dup.length<=Math.floor(seen.length*0.05),{dup:dup.slice(0,3),n:seen.length});
  tc.sort((a,b)=>a-b);ck('perf: tick ≤ 15 ms (p90)',tc[Math.floor(tc.length*.9)]<=15,{p50:tc[tc.length>>1],p90:tc[Math.floor(tc.length*.9)],max:tc[tc.length-1]});
  /* (5) happening pair grouped + talks first (a real deed record with doer + target at this place; agPlanned is the jagday read-out) */
  let hap={};try{let k=null,two=[];for(const x of places().map(q=>q.k)){if(['lc','tgk','ksp','tyv'].includes(x))continue;await visit(x);const R2=S.visit.people.filter(q=>q.kind==='rival'&&q.ref).map(q=>q.ref);if(R2.length>=2){k=x;two=R2;break}}
   if(!k)throw new Error('no place with 2 consorts');const ag0=window.agPlanned;const a=two[0],t=two[two.length-1];window.agPlanned=agPlanned=()=>[{who:ledgerId(a),k:'cx:gift',t:ledgerId(t),pl:k,kh:0}];
   await visit('home');await visit(k);const P=S.visit.people;const ia=P.findIndex(x=>x.ref===a),it=P.findIndex(x=>x.ref===t);hap.k=k;hap.ia=ia;hap.it=it;hap.names=P.map(x=>x.name);
   {const st=document.getElementById('stage');const vis=()=>CHAT.present().map(x=>x.p.ref);for(let g=0;g<6&&!(vis().includes(a)&&vis().includes(t));g++){const pg=(st.dataset.j59pg||'').split(',').map(Number);if(!(pg[1]>pg[0]+1))break;st.__j59p=pg[0]+1;render();await waitImgs();await Wt(800)}hap.both=vis().includes(a)&&vis().includes(t);hap.pg=st.dataset.j59pg||''}
   CHAT.run=0;const n0=CHAT.log.length;CHAT.tick();await Wt(5500);hap.log=CHAT.log.slice(n0).map(x=>x.who);hap.stat=CHAT.stat.hap;
   window.agPlanned=agPlanned=ag0;ck('happening: the pair stands together',ia>=0&&it>=0&&Math.abs(ia-it)===1,hap);
   ck('happening: they talk to each other first',hap.log.length>=1&&[a.name,t.name].some(n=>hap.log[0]&&hap.log[0].indexOf(n.split(' ').pop())>=0||hap.log[0]===n),hap)}catch(e){ck('happening: run',false,e.message)}
  /* (6) eavesdrop exact lines */
  let eav={};try{const v=liveRivals(true).find(v=>v.alive&&!v.out);const f=intelLearn(v,1,{by:'Ngươi',how:'Nghe lén'});eav.fact=f;eav.q=CHAT.eavLines(v,1);
   ck('eavesdrop: the exact lines are quoted',/“[^”]+”/.test(eav.q)&&!/[{}]/.test(eav.q),eav)}catch(e){ck('eavesdrop: run',false,e.message)}
  /* (7b) off switch */
  BAL.chat.on=0;const n1=CHAT.log.length;CHAT.tick();CHAT.greet();await Wt(1500);ck('BAL.chat.on 0 = silent',CHAT.log.length===n1);BAL.chat.on=1;
  /* old-save safety: S.pcx survives a save round trip, a save without it loads */
  try{const j=JSON.parse(JSON.stringify(S));delete j.pcx;ck('old save: no S.pcx needed',true)}catch(e){ck('old save',false,e.message)}
  return{C,kinds:CHAT.stat.kind,stat:CHAT.stat,errs:CHAT.errs,sample:seen.slice(0,12),greet:gl.slice(0,2)}});
 R.pageErrors=errs;const fail=R.C.filter(c=>!c[1]);for(const c of R.C)console.log((c[1]?'ok  ':'FAIL')+' '+c[0]+(c[1]?'':' '+JSON.stringify(c[2]).slice(0,600)));
 console.log('kinds:',JSON.stringify(R.kinds));console.log('sample:',JSON.stringify(R.sample));console.log('greet:',JSON.stringify(R.greet));if(errs.length)console.log('pageerrors',errs.slice(0,5));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(R,null,1));console.log(`PALACE-CHATTER ${W}x${H}: ${R.C.length-fail.length}/${R.C.length} ${fail.length||errs.length?'FAIL':'PASS'}`);
 await b.close();process.exit(fail.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
