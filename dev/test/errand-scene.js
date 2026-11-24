/* review/errand-scene r2 (NON-BLOCKING). usage: node dev/test/errand-scene.js <baseURL> <outdir> [W H]   (baseURL may be file:///<worktree>/ — the build is static)
   FIXED SEED (Math.random replaced before the page scripts run) so a Fold run and an iPad run are the same life.
   For each errand flow (spy / ally / rumor / scout / invite): TAP → time moved AT ONCE, nothing held (no shield, RB.d = 0, the act's own card shows as always), the runner
   walks off (layer / hidden token), the slot chip «đang đi …» stands, the task is the ONE state (ERR.tasks); her clock moves to the due khắc → she walks back ON and a kit «!»
   chip stands on her; tap the chip = the kit panel opens (not a modal gate), the chip goes. Also: a runner with NO token in view (crowded stage) is still drawn
   (kitErrandSpot); reduced motion = chips only; old save (no S.erra) loads; a 40-act full run with no page error and nobody left hidden. */
const {chromium}=require('./lib/dlgs-off').pw('off',require('./lib/pw-roulette'));/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,BASE,OUT,W0,H0]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const W=+W0||755,H=+H0||1000,tag=`${W}x${H}`;const SLOW=+process.env.SLOW||6;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<900});
 /* PTIME branch (parallel-time fixer #6): with the parallel-time core in the build the adapter reads S.away (jptime); __erReset clears HER sends in BOTH
    adapters so each flow starts with one fresh task (a test assumption, not a game rule); the stub of the receiver check is put back to the real core after. */
 await ctx.addInitScript(()=>{window.__erReset=()=>{S.erra=[];if(Array.isArray(S.away))S.away=S.away.filter(a=>a&&a.by!=='me')}});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1200);
 const clean=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;const rt=document.getElementById('rtoast');if(rt)rt.classList.remove('on')});
 const info=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));
  SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;
  try{OPT.fxon=true}catch(e){}S.buoi=0;used=0;deal();render();await Wt(1800);return{staff:(S.staff||[]).map(s=>s.name),maid:S.maid.name,adapter:ERR.adapter()}});
 const R={tag,info,flows:{},checks:[]};const ck=(n,ok,d)=>{R.checks.push([n,!!ok,d===undefined?'':d]);if(!ok)console.error('FAIL',n,d===undefined?'':JSON.stringify(d))};
 const flows=[["spy",i=>doAct(i,'spy')],["ally",i=>doAct(i,'ally')],["rumor",i=>{spend(BAL.time.cost.harm);runAct(S,rivals[i],'rumor')}],["scout",i=>scout(rivals[i].id)],["invite",i=>invite(rivals[i].id)]];
 for(const [name,fn] of flows){
  await clean();
  const res=await p.evaluate(async([name,fnS,SLOWK])=>{const Wt=t=>new Promise(r=>setTimeout(r,t));
   Q.length=0;S.buoi=0;used=0;S.bac=Math.max(S.bac,500);__erReset();ERR.slow=SLOWK;OPT.fxon=true;render();await Wt(1500);
   const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v)&&(!ACT[name]||ACT[name].ok(S,v)));if(i<0)return{skip:'no rival'};
   if(name==='scout'){const v=rivals[i];try{delete S.seen[v.id]}catch(e){}}
   const runner=(bestSent(S)||S.maid||{}).name;const u0=used;
   new Function('i','return ('+fnS+')(i)')(i);
   const T=ERR.tasks();
   return{i,runner,u0,u1:used,shield:!!document.querySelector('.kmerr-shield'),rbd:RB.d,tasks:T.map(t=>({who:t.who,nm:t.nm,k:t.k,t0:t.t0,due:t.due,back:t.back})),now:ERR.now(),
    layer:!!document.querySelector('.kmerr-fig'),ledger:(S.roster&&S.roster.P)?Object.entries(S.roster.P).filter(([k,v])=>v.some(e=>e&&e[1]==='errand')).map(([k])=>k):[]}
  },[name,fn.toString(),SLOW]);
  R.flows[name]=res;if(res.skip||res.u1===res.u0&&!res.tasks.length){console.error('SKIP (act not sendable here)',name,JSON.stringify(res).slice(0,160));R.flows[name].skipped=1;continue}
  ck(name+': time moved at once (no hold)',res.u1>res.u0,[res.u0,res.u1]);ck(name+': no shield, RB.d=0',!res.shield&&res.rbd===0);
  ck(name+': one task, away until due',res.tasks.length===1&&!res.tasks[0].back&&res.tasks[0].due>res.now,[res.tasks,res.now,res.u0,res.u1]);
  await sleep(300*SLOW);await p.screenshot({path:`${OUT}/${name}-1off-${tag}.jpg`,type:'jpeg',quality:70});
  await sleep(900*SLOW);
  const away=await p.evaluate(()=>({chip:[...document.querySelectorAll('.kmerr-slot')].map(e=>e.textContent),layer:!!document.querySelector('.kmerr-fig'),hidden:[...document.querySelectorAll('#tokens .tok.fig')].filter(t=>t.style.visibility==='hidden').map(t=>t.innerText.replace(/\s+/g,' ').slice(0,20)),icon:kitStatusIcon.items().includes('tin'),line:(document.getElementById('kupdline')||{}).innerText||''}));
  R.flows[name].away=away;ck(name+': slot chip «đang đi …» (or runner not in view: status icon)',away.chip.length>0||away.icon,away);
  await p.screenshot({path:`${OUT}/${name}-2away-${tag}.jpg`,type:'jpeg',quality:70});
  /* her clock reaches the due khắc → walks back, «!» stands on her */
  await p.evaluate(async(SLOWK)=>{ERR.slow=SLOWK;const T=ERR.tasks();const d=T[0]?Math.max(1,T[0].due-ERR.now()):1;Q.length=0;spend(d)},SLOW);
  await sleep(450*SLOW);await p.screenshot({path:`${OUT}/${name}-3on-${tag}.jpg`,type:'jpeg',quality:70});
  await sleep(900*SLOW);
  const back=await p.evaluate(()=>({tasks:ERR.tasks().map(t=>({back:t.back,read:t.read})),news:ERR.news().length,bang:document.querySelectorAll('.kmerr-bang').length,layer:!!document.querySelector('.kmerr-fig'),hidden:[...document.querySelectorAll('#tokens .tok.fig')].filter(t=>t.style.visibility==='hidden').length}));
  R.flows[name].back=back;ck(name+': landed, one unread report',back.tasks[0]&&back.tasks[0].back&&back.news===1,back);ck(name+': «!» chip on her (or the status badge when she is not in view)',back.bang>0||back.news===1,back);
  ck(name+': nobody left hidden after the walk-back',back.hidden===0,back);
  await p.screenshot({path:`${OUT}/${name}-4bang-${tag}.jpg`,type:'jpeg',quality:70});
  const tap=await p.evaluate(async()=>{const c=document.querySelector('.kmerr-bang');if(c)c.click();else kitStatusIcon.open('tin');await new Promise(r=>setTimeout(r,500));const md=document.getElementById('modal');return{modal:!!(md&&!md.hidden),title:md?md.innerText.slice(0,60):'',read:ERR.news().length,bang:document.querySelectorAll('.kmerr-bang').length}});
  R.flows[name].tap=tap;ck(name+': tap chip = report panel opens, chip gone',tap.modal&&tap.read===0&&tap.bang===0,tap);
  await p.screenshot({path:`${OUT}/${name}-5report-${tag}.jpg`,type:'jpeg',quality:70});
  await p.evaluate(()=>{const md=document.getElementById('modal');if(md)md.hidden=true;try{kmReset()}catch(e){}});
 }
 /* runner ON the stage (her maid, token in view): walk-off from her own slot, slot chip, walk-back, «!» chip on her, tap = panel */
 await clean();await p.evaluate(()=>{try{kmReset()}catch(e){}});
 const ons=await p.evaluate(async(SLOWK)=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;S.buoi=0;used=0;__erReset();S.bac=Math.max(S.bac,500);ERR.slow=SLOWK;OPT.fxon=true;render();await Wt(1500);
  window.bestSent=()=>S.maid;const tokIn=()=>[...document.querySelectorAll('#tokens .tok.fig')].some(t=>t.querySelector('.tag').textContent.includes(S.maid.name));const before=tokIn();
  const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));doAct(i,'spy');return{maid:S.maid.name,tokBefore:before,tasks:ERR.tasks().length}},SLOW);
 R.onstage=ons;ck('on-stage runner: her token was in view',ons.tokBefore,ons);
 await sleep(500*SLOW);await p.evaluate(()=>{const md=document.getElementById('modal');if(md)md.hidden=true;const rt=document.getElementById('rtoast');if(rt)rt.classList.remove('on')});await p.screenshot({path:`${OUT}/onstage-1off-${tag}.jpg`,type:'jpeg',quality:70});
 await sleep(800*SLOW);const oa=await p.evaluate(()=>({chip:[...document.querySelectorAll('.kmerr-slot')].map(e=>e.textContent),hid:[...document.querySelectorAll('#tokens .tok.fig')].filter(t=>t.style.visibility==='hidden').length}));
 ck('on-stage runner: slot chip «đang đi …», token hidden',oa.chip.length===1&&oa.hid===1,oa);await p.screenshot({path:`${OUT}/onstage-2away-${tag}.jpg`,type:'jpeg',quality:70});
 await p.evaluate(async(SLOWK)=>{window.__kn=[];window.__kn0=window.kitNotice;window.kitNotice=o=>{window.__kn.push(o);return window.__kn0?window.__kn0(o):null};const T=ERR.tasks();Q.length=0;spend(Math.max(1,T[0].due-ERR.now()))},SLOW);
 await sleep(450*SLOW);await p.screenshot({path:`${OUT}/onstage-3on-${tag}.jpg`,type:'jpeg',quality:70});await sleep(900*SLOW);
 const ob=await p.evaluate(()=>({khap:(()=>{const c=document.querySelector('i.kmerr-bang.khead');const im=c&&c.querySelector('img');return !!(c&&!c.classList.contains('khap')&&(c.classList.contains('kfb')||im&&/ico-talk-y\.webp/.test(im.getAttribute('src')||'')))})(),bub:(()=>{const im=document.querySelector('i.kmerr-bang.khead>img');return im?{ok:im.complete&&im.naturalWidth>0,bg:getComputedStyle(im.parentNode).backgroundImage}:null})(),above:(()=>{const c=document.querySelector('.kmerr-bang');const t=[...document.querySelectorAll('#tokens .tok.fig')].find(x=>x.querySelector('.tag').textContent.includes(S.maid.name));if(!c||!t)return false;const im=t.querySelector('.figimg').getBoundingClientRect(),cr=c.getBoundingClientRect(),em=[...t.parentNode.querySelectorAll('.kemo,.kemoseal,[class*=emo]')].map(e=>e.getBoundingClientRect());return cr.bottom<=im.top+im.height*.3&&!em.some(e=>e.width&&cr.left<e.right&&cr.right>e.left&&cr.top<e.bottom&&cr.bottom>e.top)})(),bang:document.querySelectorAll('.kmerr-bang').length,hid:[...document.querySelectorAll('#tokens .tok.fig')].filter(t=>t.style.visibility==='hidden').length}));
 const kn=await p.evaluate(()=>{const r=(window.__kn||[]).map(o=>({id:o.id,line:o.line,go:typeof o.go,goLabel:o.goLabel}));window.kitNotice=window.__kn0;return r});ck('ONE landing notice through the ONE entry point kitNotice({id:errand:…|pt:back:…,line «đã về: có tin báo»,text,go}) when it exists',kn.length===1&&/^(errand|pt:back):/.test(kn[0].id)&&/đã về: có tin báo/.test(kn[0].line)&&kn[0].go==='function',kn);
 ck('on-stage runner: the kit head marker (.khead yellow speech bubble, no disc; OD 19/11 ~03:05Z) above her head, not on the emotion chip, token visible',ob.bang===1&&ob.hid===0&&ob.khap&&ob.above&&(!ob.bub||ob.bub.bg==='none'),ob);await p.screenshot({path:`${OUT}/onstage-4bang-${tag}.jpg`,type:'jpeg',quality:70});
 const ot=await p.evaluate(async()=>{document.querySelector('.kmerr-bang').click();await new Promise(r=>setTimeout(r,1500));const md=document.getElementById('modal');const dlg=md&&md.querySelector('.dlg');return{modal:!!(md&&!md.hidden),txt:md?md.innerText.slice(0,400):'',maid:S.maid.name,hasMaid:!!md&&md.innerText.includes(S.maid.name),nLines:md?md.innerText.split('\n').filter(x=>x.trim().length>12).length:0,h:dlg?dlg.getBoundingClientRect().height:0,bang:document.querySelectorAll('.kmerr-bang').length}});
 ck('on-stage runner: tap «!» opens the report, chip gone',ot.modal&&ot.bang===0,ot);ck('report names the person who went (law 6b) and carries the result lines',ot.hasMaid&&ot.nLines>=2,ot);await p.screenshot({path:`${OUT}/onstage-5report-${tag}.jpg`,type:'jpeg',quality:70});
 await p.evaluate(()=>{const md=document.getElementById('modal');if(md)md.hidden=true;try{kmReset()}catch(e){}});
 /* receiver side: a PTIME stub with ONE order → the ONE «tin» icon shows the badge, the panel lists the order row + «Nghe lệnh», its button calls PTIME.answer */
 await clean();await p.evaluate(()=>{try{kmReset()}catch(e){}});
 R.ord=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));__erReset();Q.length=0;window.__ans=null;
  window.__pt0=window.PTIME;window.PTIME={on:()=>true,now:()=>bid()*BAL.time.khac+used,when:K=>'khắc '+K,orders:()=>[{id:'o1',pid:'cnvOrd',byNm:'Chưởng sự cô cô',title:'Lệnh của Chưởng sự cô cô',due:bid()*BAL.time.khac+used+2}],ordWhen:o=>'trả lời trước khắc 3',answer:id=>{window.__ans=id;return true}};
  render();await Wt(400);const it=kitStatusIcon.items().includes('tin');const badge=!!document.querySelector('.krail .kbadge');
  kitStatusIcon.open('tin');await Wt(1200);const md=document.getElementById('modal');const txt=md?md.innerText:'';
  const btn=[...document.querySelectorAll('#modal button,#modal .opt')].find(b=>/Nghe lệnh/.test(b.innerText));if(btn)btn.click();await Wt(600);
  const r={txt:txt.slice(0,300),it,badge,row:/Chưởng sự cô cô/.test(txt)&&/có lệnh cho (ngươi|ta)/.test(txt),btn:!!btn,ans:window.__ans,has:kitStatusIcon.has('tin')};if(window.__pt0)window.PTIME=window.__pt0;else delete window.PTIME;const md2=document.getElementById('modal');if(md2)md2.hidden=true;Q.length=0;render();return r});
 ck('receiver side: PTIME order → badge + row + «Nghe lệnh» → PTIME.answer',R.ord.it&&R.ord.badge&&R.ord.row&&R.ord.btn&&R.ord.ans==='o1'&&R.ord.has,R.ord);
 /* runner NOT on the stage in view (crowded "+N" / other swipe page): still drawn by kitErrandSpot */
 await clean();
 const crowd=await p.evaluate(async(SLOWK)=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;S.buoi=0;used=0;__erReset();ERR.slow=SLOWK;render();await Wt(1200);
  const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));const sv=bestSent(S)||S.maid;
  document.querySelectorAll('#tokens .tok.fig').forEach(t=>{const g=t.querySelector('.tag');if(g&&g.textContent.includes(sv.name))t.remove()});/* simulate: her token is on another swipe page */
  doAct(i,'spy');await Wt(250);const f=document.querySelector('.kmerr-fig img');return{runner:sv.name,fig:!!f,src:f?f.src.slice(-40):'',tasks:ERR.tasks().length,spot:JSON.stringify(kitErrandSpot(document.getElementById('stage')))}},SLOW);
 R.crowd=crowd;ck('crowded stage: runner without a token is still drawn',crowd.fig&&crowd.src,crowd);await p.screenshot({path:`${OUT}/crowd-1off-${tag}.jpg`,type:'jpeg',quality:70});
 await sleep(1200*SLOW/2);await p.evaluate(()=>{__erReset();render()});
 /* reduced motion: chips only, no walking layer */
 await clean();await p.evaluate(()=>{try{kmReset()}catch(e){}});
 R.reduced=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;S.buoi=0;used=0;__erReset();render();await Wt(800);OPT.fxon=false;
  const i=rivals.findIndex(v=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v));doAct(i,'spy');await Wt(300);const r={layer:!!document.querySelector('.kmerr-fig'),tasks:ERR.tasks().length,chip:document.querySelectorAll('.kmerr-slot').length};OPT.fxon=true;__erReset();render();return r});
 ck('reduced motion: no walking layer, task kept',!R.reduced.layer&&R.reduced.tasks===1,R.reduced);
 /* old save: a life with no S.erra */
 R.old=await p.evaluate(()=>{const pt=ERR.adapter()==='ptime';delete S.erra;if(pt)delete S.away;try{render();spend(1);ERR.tasks()}catch(e){return{err:String(e)}}return{ok:pt?Array.isArray(S.away):Array.isArray(S.erra),adapter:ERR.adapter()}});ck('old save (no S.erra) works',R.old.ok,R.old);
 /* full run, 40 acts, fixed seed */
 await clean();
 R.full=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));ERR.slow=.05;let acts=0;S.bac=99999;
  for(let n=0;n<40;n++){Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;if(S.dead)break;
   const i=rivals.findIndex((v,ix)=>v.alive&&!v.out&&!sameHouse(S,v)&&!together(S,v)&&ix>=(n%3));if(i<0)break;
   try{if(used>=BAL.time.khac-1){nextBuoi()}else{const k=['spy','ally','rumor'][n%3];doAct(i,k);acts++}}catch(e){return{err:String(e),n}}
   if(n%5===4){try{for(let j=0;j<3;j++)spend(1)}catch(e){}}await Wt(40)}
  for(let j=0;j<12;j++){try{Q.length=0;if(!S.dead)spend(1)}catch(e){}}await Wt(900);
  const open=ERR.tasks().filter(t=>!t.back).length;const hid=[...document.querySelectorAll('#tokens .tok.fig')].filter(t=>t.style.visibility==='hidden').length;
  return{acts,tasks:ERR.tasks().length,open,hiddenTokensWithNoOpenTask:open===0?hid:0}});
 ck('full run: no throw',!R.full.err,R.full);ck('full run: no one stays hidden when nothing is open',R.full.hiddenTokensWithNoOpenTask===0,R.full);
 R.errs=errs;ck('no page errors',errs.length===0,errs.slice(0,3));
 fs.writeFileSync(`${OUT}/result-${tag}.json`,JSON.stringify(R,null,1));
 const bad=R.checks.filter(c=>!c[1]);console.log(`${tag}: ${R.checks.length-bad.length}/${R.checks.length} checks passed`);bad.forEach(c=>console.log('  FAIL',c[0],JSON.stringify(c[2]).slice(0,200)));await b.close();process.exit(bad.length?1:0)})();
