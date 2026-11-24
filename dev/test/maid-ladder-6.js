/* review/maid-ladder-6 (owner OD 19/11 ~01:26Z «Cung nữ chia là thô sử, tam đẳng, nhị đẳng, nhất đẳng, nhất đẳng là đại cung nữ như giờ»):
   six-rung SRK.maid + «Ma ma» stay-on tier on the Thân phận ladder (kitTiers), named rungs BAL.srvRk, old-save migration (rk ≥ 2 → +1, once),
   exam index (ma ma = BAL.srvRk.mama), the same ladder for NPC maids (srkMax / NPC exam / ma ma choice), art tier (tam + nhị share «Cung nữ»).
   OLD SAVE: a maid life saved by the LIVE build (oldURL) loads in the new build with the mapped ranks and plays a month.
   usage: node dev/test/maid-ladder-6.js <newURL> <oldURL|-> <outdir> [WxH@dpr ...]   (shots go to <outdir>, never into git) */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');
const [,,URL,OLD0,OUT,...SZ]=process.argv;const OLD=OLD0&&OLD0!=='-'?OLD0:null;const SIZES=SZ.length?SZ:['755x1000@1','1180x820@1'];
if(OUT)fs.mkdirSync(OUT,{recursive:true});
const boot=async(p,u)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200})};
(async()=>{const b=await chromium.launch();const T=[];const errs=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':JSON.stringify(x).slice(0,260)]);
 /* OLD SAVE from the live build */
 let oldSave=null;
 if(OLD){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push('old '+e.message.slice(0,200)));await boot(p,OLD);
  oldSave=await p.evaluate(()=>{S.srv.rk=2;S.srv.rk0=3;const m=srvM();const L=(m&&m.staff)||[];const mk=(r,role)=>{const s=mkServ(role);s.rk=r;s.tag6=role+r;L.push(s);return s};mk(0,"maid");mk(1,"maid");mk(2,"maid");mk(3,"maid");mk(4,"maid");mk(2,"eunuch");
   if(SRK.maid[5]||S.lad6)return null;return JSON.stringify(ser())});
  ok(!!oldSave,'old build: maid life saved (SRK.maid 5 rungs, no lad6)');await ctx.close()}
 for(const [si,SZs] of SIZES.entries()){const [wh,d]=SZs.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d||1,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,#klife,.krbox,#ktut,.ktip{display:none!important}';document.head.appendChild(s)})});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(SZs+' '+e.message.slice(0,200)));p.setDefaultTimeout(60000);await boot(p,URL);
  if(si===0){
   /* 1. ladder + named rungs */
   const c=await p.evaluate(()=>({n:SRK.maid.slice(),K:BAL.srvRk,lad:S.lad6,bar:BAL.ex.srvBar.length,cd:BAL.ex.srvCd.length,wage:BAL.srvWage.length,ixm:exSrvIx("mama"),ix9:exSrvIx(9),eye:BAL.mline.eye.length,db:BAL.dbCost.length,pr:BAL.promo.srv.length}));
   ok(c.n.join("|")==="Cung nữ thô sử|Cung nữ tam đẳng|Cung nữ nhị đẳng|Cung nữ nhất đẳng|Chưởng sự cô cô|Nữ quan",'SRK.maid = 6 rungs (owner order)',c.n);
   ok(c.lad===1,'new life is born on the six-rung ladder (S.lad6=1)',c.lad);
   ok(c.bar===7&&c.cd===7&&c.wage===6&&c.ixm===6&&c.ix9===5&&c.eye===6&&c.db===6&&c.pr===7,'every rung table has one entry per rung (+ ma ma)',c);
   /* 2. promotion through the new rung: tam → nhị đẳng by the month rule (exam off for this probe) */
   const pr=await p.evaluate(()=>{const ex=window.exOn;window.exOn=()=>false;S.srv.rk=1;S.srv.lau=0;S.tin=60;S.srv.mp=999;S.tuan=2;let err="";try{srvMonth()}catch(e){err=e.message}window.exOn=ex;return{rk:S.srv.rk,t:srvTitle(),err}});
   ok(pr.rk===2&&/Cung nữ nhị đẳng/.test(pr.t)&&!pr.err,'month promotion tam đẳng → nhị đẳng',pr);
   /* 3. gates by name: Đại cung nữ (nhất đẳng) and Chưởng sự (ma ma choice) */
   const g=await p.evaluate(()=>{const r={};const cnv=rk=>{S.srv.rk=rk;const d=PEND.cnvAge({});return (d&&d.o||[]).map(o=>o.n)};r.a3=cnv(3);r.a4=cnv(4);r.a5=cnv(5);
    r.max7=(()=>{const v=rivals.find(x=>!x.out&&!x.queen);const r0=v.rank;v.rank=7;const m=srkMax(v,{role:"maid"});v.rank=0;const m0=srkMax(v,{role:"maid"});v.rank=r0;return[m,m0]})();
    r.dec=[0,1,2,3,4,5].map(i=>{const f=kitDecor({__kr:{role:"maid",rank:i,origin:null,sex:"f",kid:false}});return f.frame||f.fr||JSON.stringify(Object.keys(f)).slice(0,40)});
    r.tier=[0,1,2,3,4,5].map(i=>srkTier(i));return r});
   ok(!g.a3.includes("Ở lại làm ma ma")&&g.a4.includes("Ở lại làm ma ma")&&g.a5.includes("Ở lại làm ma ma"),'ma ma choice from Chưởng sự cô cô (4) and Nữ quan (5) only',g);
   ok(g.max7[0]===5&&g.max7[1]===3,'NPC/household cap: Hoàng hậu → Nữ quan (5), lowest → nhất đẳng (3)',g.max7);
   ok(g.tier.join()==="0,1,1,2,3,4",'art tier: tam + nhị đẳng share «Cung nữ»',g.tier);
   /* 4. NPC maid exam on the new rung table */
   const ne=await p.evaluate(()=>{const B=BAL.ex,b0=B.srvBar.slice();B.srvBar=[0,0,0,0,0,0,0];let a=0;const s={sid:4243,role:'maid',rk:4,loyal:60,exCd:0};try{a=exSrvNpc(s)?1:0}catch(e){a=e.message}B.srvBar=b0;return a});
   ok(ne===1,'NPC exam to Nữ quan reads srvBar[5]',ne);
   /* 5. migration on a 5-rung state (same build): rk 0..4 → 0,1,3,4,5; eunuch kept; second load does not shift again */
   const mg=await p.evaluate(()=>{const d=JSON.parse(JSON.stringify(ser()));delete d.S.lad6;d.S.srv.rk=2;d.S.srv.rk0=3;d.S.srv.mama=0;d.S.srv.lau=0;d.S.prSeen={r:null,s:2};/* r1: the old build saw her rung → no second chest */
    const m=d.R.find(v=>v.id===S.srv.mid)||d.R[0];m.staff=[0,1,2,3,4].map(r=>({sid:9000+r,role:"maid",rk:r,name:"T"+r,loyal:50,age:20})).concat([{sid:9100,role:"eunuch",rk:2,name:"E",loyal:50,age:20}]);
    deser(d);const st=(rivals.find(v=>v.id===S.srv.mid)||rivals[0]).staff;const one={rk:S.srv.rk,rk0:S.srv.rk0,m:st.filter(s=>s.sid>=9000&&s.sid<9100).map(s=>s.rk),e:st.find(s=>s.sid===9100).rk,lad:S.lad6,seen:S.prSeen&&S.prSeen.s};Q.length=0;const n0=window.__prN||0;render();Q.length=0;one.chest=(window.__prN||0)-n0;
    const d2=JSON.parse(JSON.stringify(ser()));deser(d2);return Object.assign(one,{again:S.srv.rk})});
   ok(mg.rk===3&&mg.rk0===4&&mg.m.join()==="0,1,3,4,5"&&mg.e===2&&mg.lad===1&&mg.again===3&&mg.seen===3&&mg.chest===0,'old-save migration 0→0 1→1 2→3 3→4 4→5, eunuch kept, once, promo chest tracker moved (no second chest)',mg);
   /* 6. OLD SAVE from the live build */
   if(oldSave){const o=await p.evaluate(raw=>{localStorage.setItem(SK(3),raw);const d=loadSlot(3);/* loadSlot = the title-screen path (JSON from the live build) */if(!d)return{err:"loadSlot null"};deser(d);const m=srvM();const L=((m&&m.staff)||[]).filter(s=>s.tag6);
     const r={rk:S.srv.rk,rk0:S.srv.rk0,t:srvTitle(),tags:L.map(s=>s.tag6+">"+s.rk),lad:S.lad6};try{Q.length=0;S.tuan=2;srvMonth();render();r.month=1}catch(e){r.err=e.message}return r},oldSave);
    ok(!o.err&&o.rk===3&&o.rk0===4&&o.lad===1&&o.tags.join()==="maid0>0,maid1>1,maid2>3,maid3>4,maid4>5,eunuch2>2"&&/nhất đẳng/.test(o.t),'LIVE-build maid save loads: Đại cung nữ → nhất đẳng, staff mapped, a month plays',o)}
  }
  /* 7. the Thân phận ladder on the kit tiers (every size): 6 rungs + Ma ma, «đang ở» on hers */
  const L=await p.evaluate(()=>{S.srv.rk=3;S.srv.mama=0;S.srv.lau=0;S.prSeen=Object.assign({},S.prSeen||{},{s:3});/* test only: no reward chest for the jumped rank */Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab="story";render();
   const el=document.querySelector('#panel .ktiers');if(!el)return{none:1};el.scrollIntoView({block:"start"});const R=[...el.querySelectorAll('.ktier')].map(x=>x.querySelector('.ktb b').textContent+(x.classList.contains('on')?'*':''));
   const pr=document.getElementById('panel').getBoundingClientRect();const over=[...el.querySelectorAll('*')].some(x=>{const r=x.getBoundingClientRect();return r.right>pr.right+1||x.scrollWidth>x.clientWidth+1&&getComputedStyle(x).overflow!=='visible'});
   return{R,over,sx:document.documentElement.scrollWidth>innerWidth}});
  ok(!L.none&&L.R.length===7&&L.R[3]==="Cung nữ nhất đẳng*"&&L.R[6]==="Ma ma"&&!L.over&&!L.sx,`${SZs} Thân phận ladder: 6 rungs + Ma ma, hers marked, no overflow`,L);
  if(OUT)await p.screenshot({path:`${OUT}/ladder-${wh}.png`});
  await ctx.close()}
 await b.close();
 if(errs.length)ok(false,'page errors',errs);
 for(const r of T)console.log(r.join(' | '));const f=T.filter(r=>r[0]==='FAIL').length;console.log(f?`FAIL ${f}/${T.length}`:`PASS ${T.length}/${T.length}`);process.exit(f?1:0)})();
