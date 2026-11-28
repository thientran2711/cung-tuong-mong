/* giftin-like-scan (D-GIFTIN-LIKE, law 1 mirror of d19 jrcv + law 3 + law 11): a gift an NPC sends TO HER (PEND.giftin / pgin) moves the
   giver's liking / oán / hh ONLY by her answer — never when it is sent. Her answers, the same numbers as an NPC receiver (jrcv rcvGiftIn):
     Nhận → the giver's keep gain (giftRel / the work's wkEval rel, + hh) · Trả lại quà → BAL.eff.j8.go_2 only · Thái y, nothing found → go_3 + the keep gain.
   Parts:
     A. STATIC: every pusher of a «giftin» / «pgin» card in the built index.html — no relation write (keepGain / relAdd / affAdd / oanAdd /
        giftKeepGo) on its line before the push.
     B. RUNTIME (Fold): j8 giveTo (item) · j83 wkGive (a handmade work) · jpoison (a food item → pgin card) — delta at SEND = 0, then each answer
        pays exactly its own number; an OLD saved card (no pp.kg) pays nothing more on «Nhận» (its liking was added when sent: no double count).
   usage: node dev/test/giftin-like-scan.js [root]   (root = a BUILT site, default the repo root; CTM_ROOT works too)   exit 1 on any FAIL */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const D=require('./lib/device');
const ROOT=path.resolve(process.argv[2]||process.env.CTM_ROOT||path.join(__dirname,'../..'));
const F=[];const ck=(ok,m)=>{console.log((ok?'PASS ':'FAIL ')+m);if(!ok)F.push(m)};
/* ---- A. static ---- */
{const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');const re=/mkP\("(giftin|pgin)"/g;let m;const rows=[];
 while((m=re.exec(html))){const ls=html.lastIndexOf('\n',m.index)+1;const seg=html.slice(ls,m.index);const ln=html.slice(0,m.index).split('\n').length;
  /* the code that runs before the push in the same function: from the function start, at most 6 lines back (LIVE had relAdd on the line
     above the push); arrow definitions (keepGain=()=>giftKeepGo(…)) are not calls and are cut out */
  let st=ls;for(let i=0;i<6&&st>0;i++)st=html.lastIndexOf('\n',st-2)+1;const fs0=html.lastIndexOf('function ',m.index);if(fs0>st)st=fs0;
  const s=html.slice(st,m.index).replace(/=\(\)=>[^;]*;?/g,";");
  const bad=/(keepGain\(\)|relAdd\(|affAdd\(|oanAdd\(|giftKeepGo\(|ap\(a,\{hh)/.exec(s);rows.push({ln,kind:m[1],bad:bad?bad[0]:null,ctx:s.slice(-90)})}
 for(const r of rows)ck(!r.bad,`A static L${r.ln} ${r.kind} pusher: no relation write before the push${r.bad?' (has '+r.bad+': …'+r.ctx+')':''}`);
 ck(rows.length>=6,`A static: found ${rows.length} pushers (j8, j83, jcoopthin, jcoopworld, jrcp, jptime, jpoison)`)}
/* ---- B. runtime ---- */
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;{const k=document.getElementById('kload');if(k)k.hidden=true;const m=document.getElementById('modal');if(m)m.hidden=true}try{render()}catch(e){}});
 try{await g.waitForSelector('#kroul',{timeout:20000});await p.waitForTimeout(1500);await g.evaluate(()=>{const b=[...document.querySelectorAll('#kroul button')].find(x=>/Bỏ qua/.test(x.textContent));b&&b.click()});await g.waitForSelector('#kroul',{state:'detached',timeout:20000})}catch(e){}
 await p.waitForTimeout(1500);await g.evaluate(()=>{document.querySelectorAll('.krbox,#kroul').forEach(x=>{const o=x.id==='kroul'?x:x.parentElement;o&&o.remove()});const c=document.getElementById('curtain');if(c)c.hidden=true;Q.length=0;try{NLP=null}catch(e){}const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});
 const R=await g.evaluate(()=>{try{
  const out={rows:[]};SP_OFF++;const pt0=typeof ptOn==="function"?ptOn:null;
  /* the card is caught at the outermost pushDil (not shown); parallel time off so it is not carried by a servant (jptime adds no relation either: part A) */
  const cap=[];const pd0=pushDil;pushDil=function(d,t){if(d&&/^(giftin|pgin)$/.test(d.pid)){cap.push(d);return""}return pd0.apply(this,arguments)};window.pushDil=pushDil;
  if(pt0)ptOn=()=>false;
  const L=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!x.coop);
  const snap=f=>({a:aff(f,S),b:aff(S,f),o1:oan(f,S),o2:oan(S,f),hh:f.hh||0});
  const dif=(x,y)=>({a:y.a-x.a,b:y.b-x.b,o1:y.o1-x.o1,o2:y.o2-x.o2,hh:y.hh-x.hh});
  const zero=d=>!d.a&&!d.b&&!d.o1&&!d.o2&&!d.hh;
  const prep=f=>{f.rel=0;S.rl=S.rl||{};S.ro=S.ro||{};S.rl[f.id]=0;f.oan=20;S.ro[f.id]=20;/* joanpace (oán / ghét pace, LIVE aecbc267): one pair's fall per day is capped (holder.opa / opz) — clear that store so the want pre-run does not spend the answer's budget */for(const x of [f,S]){delete x.opa;delete x.opz}};
  const plain=h=>String(h||"").replace(/<[^>]+>/g,"");
  const nonFood=Object.keys(IT).filter(k=>Array.isArray(IT[k].tg)&&IT[k].pr>=20&&IT[k].pr<=120&&!IT[k].il&&!IT[k].keep&&!IT[k].nt&&!pgFood({k}));
  const food=Object.keys(IT).find(k=>pgFood({k})&&IT[k].pr);
  const ans=(d,re)=>{const card=PEND[d.pid](d.pp);const o=card.o.find(x=>re.test(plain(x.n)));return{card,o}};
  /* the answer's number goes through the ONE relAdd (stat-pace / trust multipliers apply to her → you): the want row = relAdd(giver, her, n) on the same state */
  /* want = [[n, dir]…]: dir "keep" = relAdd(giver, her, n) (the giver's gain), "her" = relAdd(her, giver, n) (her refusal / doubt: she is the doer, as in j8 / jrcv) */
  const relOf=(f,W)=>{prep(f);const s0=snap(f);for(const [n,dir] of W){if(dir==="her")relAdd(S,f,n);else relAdd(f,S,n)}const d=dif(s0,snap(f));prep(f);return d};
  const run=(name,f,give,want,pick)=>{const wd=relOf(f,want);prep(f);const s0=snap(f);cap.length=0;give();const d=cap[0];const s1=snap(f);const row={name,giver:f.name,send:dif(s0,s1),card:d?d.pid:null};
   if(!d){row.err="no card";out.rows.push(row);return}
   const {card,o}=ans(d,pick.re);row.opt=o?plain(o.n):null;row.x=o?plain(o.x||""):"";if(o){if(o.fx&&Object.keys(o.fx).length)apply(o.fx);o.go()}
   const s2=snap(f);row.answer=dif(s1,s2);row.want=want;row.wd=wd;row.ans=pick.id;out.rows.push(row)};
  const G=BAL.eff.j8;const hiOf=f=>rkOf(f)>S.rank;
  /* 1. j8 giveTo — an item, each answer */
  const f1=L[0],k1=nonFood[0];const it1=Object.assign({k:k1},itm(k1));const gr1=giftRel(it1,S);
  for(const [id,re,w] of [["take",/^Nhận/,()=>[[gr1,"keep"]]],["back",/^Trả lại/,()=>[[hiOf(f1)?G.go_2[0]:G.go_2[1],"her"]]],["check",/Thái y/,()=>[[G.go_3,"her"],[gr1,"keep"]]]]){
   f1.inv=(f1.inv||[]).filter(e=>e.h);f1.inv.push({k:k1});S.bac=Math.max(S.bac||0,500);run("j8 giveTo item",f1,()=>giveTo(f1,S,f1.inv.length-1),w(),{id,re})}
  /* 2. j83 wkGive — a handmade work */
  const wp0=typeof wkProud==="function"?wkProud:null;if(wp0)wkProud=()=>false;/* a random «Kiêu ngạo» on her would refuse every handmade work (wkEval0): not this test */
  const f2=L[1];const W={kind:"theu",a:"hoa",ti:2,q:6,n:"Khăn thêu thử quà",m:1,bn:f2.name,d:"x",lv:2};
  for(const [id,re] of [["take",/^Nhận/],["back",/^Trả lại/]]){f2.inv=(f2.inv||[]).filter(e=>e.h);f2.inv.push({k:"tp",wk:Object.assign({},W)});const ev=wkEval(f2,W,S);out.ev=ev;
   run("j83 wkGive work",f2,()=>wkGive(f2,S,f2.inv.length-1),id==="take"?[[ev.rel,"keep"]]:[[hiOf(f2)?G.go_2[0]:G.go_2[1],"her"]],{id,re})}
  if(wp0)wkProud=wp0;
  /* 3. jpoison — a food item (the pgin card): «Nhận ngay» keeps a clean dish */
  if(food){const f3=L[2];const it3=Object.assign({k:food},itm(food));const gr3=giftRel(it3,S);f3.inv=(f3.inv||[]).filter(e=>e.h);f3.inv.push({k:food});
   run("j8 giveTo food → pgin",f3,()=>giveTo(f3,S,f3.inv.length-1),[[gr3,"keep"]],{id:"take",re:/^Nhận/});
   f3.inv.push({k:food});run("j8 giveTo food → pgin",f3,()=>giveTo(f3,S,f3.inv.length-1),[[BAL.eff.jpoison.go_2,"her"]],{id:"back",re:/^Trả lại/})}
  /* 4. an OLD saved card (no pp.kg): «Nhận» pays nothing more */
  {const f4=L[3]||L[0];prep(f4);const s0=snap(f4);const card=PEND.giftin({f:key(f4),e:{k:k1,from:key(f4)}});const o=card.o.find(x=>/^Nhận/.test(plain(x.n)));o.go();out.old={d:dif(s0,snap(f4))}}
  pushDil=pd0;window.pushDil=pd0;if(pt0)ptOn=pt0;SP_OFF--;return out}catch(e){return{err:String(e.stack||e)}}});
 if(R.err){ck(false,'runtime: '+R.err)}else{
  console.log('\n| road | answer | giver | at SEND (aff/back/oán/oán back/hh) | at ANSWER aff | want |');console.log('|---|---|---|---|---|---|');
  for(const r of R.rows){const s=r.send||{};console.log(`| ${r.name} | ${r.ans} (${r.opt}) | ${r.giver} | ${[s.a,s.b,s.o1,s.o2,s.hh].join(' / ')} | ${r.answer?r.answer.a:'-'} | ${r.wd?r.wd.a:'-'} (${JSON.stringify(r.want)}) |`)}
  for(const r of R.rows){if(r.err){ck(false,`${r.name}: ${r.err}`);continue}
   const s=r.send;ck(!s.a&&!s.b&&!s.o1&&!s.o2&&!s.hh,`B ${r.name} · ${r.ans}: nothing moves when it is SENT ${JSON.stringify(s)}`);
   /* the giver → her side (a) carries the trust multiplier (jaudit aaMulRange, a range shown as «+lo đến +hi»): within the range of the same relAdd; the rest exact */
   const tol=Math.max(2,Math.round(r.want.reduce((t,[n])=>t+Math.abs(n),0)/2));
   ck(Math.abs(r.answer.a-r.wd.a)<=tol&&Math.sign(r.answer.a)===Math.sign(r.wd.a)&&r.answer.b===r.wd.b&&r.answer.o2===r.wd.o2&&Math.abs(r.answer.o1-r.wd.o1)<=tol,`B ${r.name} · «${r.opt}»: the giver's liking moves by its own number only = ${JSON.stringify(r.want)} (got ${JSON.stringify(r.answer)}, want ${JSON.stringify(r.wd)})`);
   if(r.ans==="back")ck(r.answer.o1>=0&&r.answer.o2>=0,`B ${r.name} · «${r.opt}»: a returned gift eases no oán ${JSON.stringify(r.answer)}`);
   if(r.ans==="take"&&!/pgin/.test(r.name))/* the pgin dish card never prints it: a clean and a poisoned dish must read the same (no tell) */ck(/được: .*quý ngươi \+\d+/.test(r.x),`B ${r.name} · «${r.opt}» card names its gain (law 3): «${r.x}»`)}
  const o=R.old.d;ck(!o.a&&!o.b&&!o.o1&&!o.o2,`B old saved card (no kg): «Nhận» adds nothing more (no double count) ${JSON.stringify(o)}`)}
 ck(!errs.length,'no page errors '+errs.slice(0,3).join(' | '));
 await b.close();srv.close();console.log(`\ngiftin-like-scan: ${F.length?'FAIL '+F.length:'PASS'}`);process.exit(F.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
