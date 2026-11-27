/* save-rewind (Foreman B, F finding 27/11 «SAVE REWIND REPEATS — every reload loses the last buổi», s18d Fold b50→b49 + b107 relaunch).
   F's own sổ (checkpoint 8ae99226 on review/flight2-s18, flight2-s18d.ckpt.json: every localStorage key of the life) is put in the page, loaded
   through the title («Tiếp tục kiếp này», Sổ 1), then the life is played like the robot: one real tap on «Sang buổi» (#next) after another,
   every card answered (first enabled option / close; helpers = save-boundary-reload.js, one copy), across a month flip.
   While it plays, the sổ is read every 200 ms: a moment where the screen is FREE (no card, scene, mini-game, held turn — what a player sees
   as «nothing open») and the sổ's date ≠ the screen's date = a reload there loses buổi (the F bug). Then, at a free moment after the month
   flip, the page is left the way a player leaves it and the life loaded again — it must show the same năm / tháng / tuần / buổi / tuổi / name:
     reload  = page.reload() (pagehide + unload fire) → title → «Tiếp tục kiếp này»
     close   = the tab is hidden (visibilitychange) and closed (page.close runBeforeUnload: pagehide), a NEW tab opens the game → «Tiếp tục»
   Writes: every slot write is counted (localStorage.setItem on hclh-save-v2-*): writes per buổi printed (no save storm).
   env SR_MUTATE=hold: every save dropped while a moved card waits in jspread SP13.L; SR_MUTATE=live: LIVE's card sort + LIVE's hold on a waiting
   code card put back in the page (= LIVE d9ca7892 jspread.js:115 + jqsave jqSaveable) → the test must FAIL.
   env SR_CKPT=<file> (default: git show origin review/flight2-s18 checkpoint), SR_TAPS (default 8).
   usage: node dev/test/save-rewind.js [page=index.html] [devices=fold,ipadAir]   exit 0 = PASS */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEVS='fold,ipadAir']=process.argv;const TAPS=+(process.env.SR_TAPS||8);const MUT=process.env.SR_MUTATE||'';
const src=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=src.slice(src.indexOf('const H=`')+9,src.indexOf('`;\nasync function play'));
function ckpt(){if(process.env.SR_CKPT)return JSON.parse(fs.readFileSync(process.env.SR_CKPT,'utf8'));
 return JSON.parse(require('child_process').execSync('git show 8ae992262d76ae965f224f67cac54a42e1c96022:dev/handover/robot/flight2-s18d-ckpt/flight2-s18d.ckpt.json',{cwd:__dirname,maxBuffer:1<<28}).toString())}
/* counts every slot write (installed before the game runs) */
const CNT=()=>{try{const f=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(/^hclh-save-v2-/.test(k))window.__srW=(window.__srW||0)+1;return f.apply(this,arguments)}}catch(e){}};
async function boot(p,url){await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function');await p.waitForTimeout(1500);await p.evaluate(H)}
async function loadSlot(p){await p.waitForFunction(()=>document.querySelector('#slots button[data-load="1"]'));
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.querySelector('#slots button[data-load="1"]').click()});await p.waitForTimeout(2500);return p.evaluate(()=>__sbr.key())}
async function one(b,dev,url,ls,how){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(CNT);
 await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());let p=await ctx.newPage();p.setDefaultTimeout(600000);const pe=[];const onp=pg=>pg.on('pageerror',e=>pe.push(e.message.slice(0,160)));onp(p);
 try{await boot(p,url);await p.evaluate(L=>{localStorage.clear();for(const k in L)localStorage.setItem(k,L[k])},ls);await p.reload({waitUntil:'domcontentloaded'});await boot(p,url);const k0=await loadSlot(p);
  const r=await p.evaluate(async([N,MUT])=>{const sl=t=>new Promise(r=>setTimeout(r,t));const dk=()=>[S.year,S.month,S.tuan,S.buoi||0].join('.');
   if(MUT&&typeof SP13!=='undefined'){/* hold: every save dropped while ANY moved card waits; live: LIVE's card sort (a card with any function = code: no empty-go / generator exemption) + LIVE's hold on a waiting code card */
    if(MUT==='live'&&typeof jqSaveable==='function'){const j0=jqSaveable;jqSaveable=m=>!m||!!m.pid||!m.opts||(!m.rk&&!m.opts.some(o=>Object.values(o).some(v=>typeof v==='function'))&&j0(m))}
    const s0=save;save=function(){if(S&&!S.dead&&!quiet&&SP13.L.some(x=>MUT==='hold'||x.code)){window.__srDrop=(window.__srDrop||0)+1;return}return s0.apply(this,arguments)};window.save=save}
   const sk=()=>{try{const raw=window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1');const d=JSON.parse(raw);return [d.S.year,d.S.month,d.S.tuan,d.buoi||0].join('.')}catch(e){return 'err'}};
   const W={on:1,free:0,bad:{},polls:0};(async()=>{while(W.on){W.polls++;const a=dk(),s=sk();if(!__sbr.busy()){W.free++;if(a!==s){const x=W.bad[a]=W.bad[a]||{n:0,s};x.n++;x.s=s}}await sl(200)}})();
   await __sbr.settle();const m0=S.month,w0=window.__srW||0;const L=[];let ok=true,flips=0,buoi=0;
   for(let t=0;t<N&&ok;t++){const k=dk();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();ok=await __sbr.after(__sbr.key());buoi++;if(S.month!==m0)flips=1;L.push(k+'→'+dk()+(dk()!==sk()?' ≠ sổ '+sk():''))}
   /* she is on the free screen after the flip: the moment she leaves */
   for(let i=0;i<10&&!__sbr.busy();i++)await sl(200);W.on=0;await sl(250);
   return{L,bad:W.bad,free:W.free,polls:W.polls,flip:flips,shown:__sbr.key(),saved:sk(),settled:ok&&!__sbr.busy(),writes:(window.__srW||0)-w0,taps:buoi,drop:window.__srDrop||0,sp:typeof SP13!=='undefined'?JSON.stringify(SP13.stat):''}},[TAPS,MUT]);
  if(how==='reload'){await p.reload({waitUntil:'domcontentloaded'})}
  else{await p.evaluate(()=>{try{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>'hidden'});Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))}catch(e){}});
   await p.close({runBeforeUnload:true});p=await ctx.newPage();p.setDefaultTimeout(600000);onp(p)}
  await boot(p,url);r.loaded=await loadSlot(p);r.k0=k0;r.pe=pe.slice(0,3);
  r.pass=r.settled&&r.flip&&!Object.keys(r.bad).length&&r.loaded===r.shown&&!pe.length;return r}finally{await ctx.close()}}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const url=srv.url+PAGE;const ck=ckpt();let fail=0,n=0;
 for(const dev of DEVS.split(','))for(const how of ['reload','close']){const r=await one(b,dev,url,ck.ls,how);n++;if(!r.pass)fail++;
  const bad=Object.entries(r.bad).map(([a,x])=>`screen ${a} / sổ ${x.s} ×${x.n}`);
  console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${how}${MUT?' MUTATE '+MUT:''} · F sổ loaded ${r.k0} · ${r.taps} taps${r.flip?' (month flip)':' (NO month flip)'} · free-screen moments sổ ≠ screen: ${bad.length?bad.join(', '):'0'} of ${r.free} · left at ${r.shown} (sổ ${r.saved}) → loaded again ${r.loaded} · slot writes ${r.writes} (${(r.writes/Math.max(1,r.taps)).toFixed(1)}/tap)${MUT?' · mutate drops '+r.drop:''} · spread ${r.sp}${r.settled?'':' · SCREEN NOT FREE'}${r.pe.length?' · pageerror '+r.pe[0]:''}`+'\n    '+r.L.join(' | '))}
 console.log(fail?`SAVE-REWIND FAIL ${fail}/${n}`:`SAVE-REWIND PASS ${n}/${n}`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
