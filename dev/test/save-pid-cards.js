/* save-pid-cards (review/save-pid-cards, LAW 6c + LAW 11): every pid choice card («Việc khó xử» and every other PEND kind) that waits in the queue
   comes back IDENTICAL after a TRUE page reload (title → «Tiếp tục kiếp này»), and a card answered before the reload never comes back.
   Family = every key of PEND (j3 mkP builders: j7 ev(), j68 EV6, and every PEND[...] in dev/build/j*.js). For each kind: pp from its own maker
   (j7 EVI[id].pp, else {}), mkP(id,pp); a kind that builds no card in this life (needs a person / a state she has not) is listed as SKIP.
   (1) each kind ALONE: clear buổi, the maker builds it, pushDil queues it, showModal shows it (the j68 pacing gate runs there, as in play), the game
       saves; TRUE reload (page.reload → title → «Tiếp tục kiếp này»: deser → showModal → render); then «look» (showModal/render/save, any tap) and a
       second true reload. The card must be there each time, at the same place (the one on screen stays on screen), same title t / body h / option names.
   (2) MULTI: up to 5 «Việc khó xử» kinds at once (one shown, the rest held by the pacing for later buổi, EVHOLD → sổ evh): each comes back where it was.
   (3) ANSWERED: a card answered (chooseM) before the reload never comes back.
   (4) DECO: every 8th kind dressed after mkP (caller title, chips, flag) — all of it comes back. (5) PROD: the real dressing makers (q72o, tsbCard).
   usage: node dev/test/save-pid-cards.js [index.html] [devices=fold,ipadAir] ; env SPC_ROOT=<dir> (serve another built root, e.g. the base build) ; env SPC_ONLY=id1,id2 ; SPC_V=1 (print PASS rows too)
   exit 0 = every built kind PASS on every device. */
const {chromium}=require('playwright');const D=require('./lib/device');
const [,,NEW='index.html',DEVS='fold,ipadAir']=process.argv;const ONLY=(process.env.SPC_ONLY||'').split(',').filter(Boolean);
const seedInit=seed=>{let s=(seed*2654435761>>>0)%2147483646+1;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
 try{const c=crypto,g=c.getRandomValues.bind(c);let t=seed>>>0||1;c.getRandomValues=a=>{if(a instanceof Uint32Array&&a.length===1){t=(Math.imul(t,1103515245)+12345)>>>0;a[0]=t||1;return a}return g(a)}}catch(e){}};
const H=`window.__spc={
 tx(x){return String(x==null?'':x).replace(/<[^>]+>/g,'').replace(/\\s+/g,' ').trim()},
 sig(m){return JSON.stringify({t:this.tx(m.t),h:this.tx(m.h),o:(m.opts||[]).map(o=>this.tx(o.n))})},
 newLife(){localStorage.removeItem('hclh-save-v2-1');SLOT=1;document.getElementById('title').hidden=true;if(typeof nlFigsReady==='function')nlFigsReady=()=>true;
  if(typeof kc2SelOn==='function'&&!window.__sbrSelx)kc2SelOn=()=>false;
  start();try{if(typeof nlAccept==='function')nlAccept(false)}catch(e){}quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  ['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return S.name},
 /* every PEND kind: its pp from its own maker (j7 EVI[id].pp may need a lucky draw: tried 40 times) */
 kinds(only){const out=[];for(const id of Object.keys(PEND)){if(only.length&&!only.includes(id))continue;let pp={},err='',syn=0;
   if(typeof EVI!=='undefined'&&EVI[id]&&EVI[id].pp){pp=null;for(let i=0;i<40&&!pp;i++){try{pp=EVI[id].pp()}catch(e){err=String(e.message).slice(0,40)}}if(!pp){/* the maker found no reason this life (npc agency rvWhy): the same shape of pp from the world's own people */const L=(typeof liveRivals==='function'?liveRivals(false):[]).filter(Boolean);
     if(L.length>=2){pp={v:L[0].id,a:L[0].id,b:L[1].id,f:L[0].id,y:'',o:50};try{let d0=this.mk(id,pp,1);if(!d0||!d0.o){pp=null}}catch(e){pp=null}}
     if(!pp){out.push({id,skip:err?'pp:'+err:'pp:null'});continue}syn=1}}
   if(typeof e68Fits==='function'&&!e68Fits({pid:id})){out.push({id,skip:'season (e68Fits: not drawn this month; dropped on load by design)'});continue}
   let d=null;try{d=this.mk(id,pp,syn)}catch(e){out.push({id,skip:'mk:'+String(e.message).slice(0,40)});continue}if(!d||!d.o||!d.o.length){out.push({id,skip:'nocard'});continue}out.push({id,syn,pp:JSON.parse(JSON.stringify(d.pp||{}))})}return out},
 /* TEST SETUP ONLY: a synthetic pp (syn) is built past the j95b actor gate the way a LOAD builds it (J95C.loading: «they passed the gate when made») */
 mk(id,pp,syn){if(!syn||typeof J95C==='undefined')return mkP(id,pp);const l=J95C.loading;J95C.loading=1;try{return mkP(id,pp)}finally{J95C.loading=l}},
 /* a fresh buổi with nothing open: no card, nothing held, the event pacing (j68) as at the start of a quiet buổi */
 clear(){Q.length=0;try{EVHOLD=[];EVLAST=null}catch(e){}try{const e=e68();e.sch=null}catch(e){}const M=document.getElementById('modal');if(M)M.hidden=true;S.buoi=1},
 /* the game's own path: the maker builds the card, pushDil queues it, showModal shows it (j68 evGate runs there) */
 push(L){const r=[];for(const k of L){const d=this.mk(k.id,k.pp,k.syn);if(!d){r.push({id:k.id,miss:1});continue}const n0=Q.length;pushDil(d,undefined);if(Q.length===n0){r.push({id:k.id,nopush:1});continue}r.push({id:k.id})}
  try{showModal()}catch(e){}try{render()}catch(e){}try{save()}catch(e){}return r},
 answerFirst(){const m=Q[0];if(!m||!m.pid)return null;const s=this.sig(m),id=m.pid;const j=m.opts.findIndex(o=>!o.off&&!o.dis&&!o.lk);try{chooseM(j<0?0:j)}catch(e){}try{render()}catch(e){}try{save()}catch(e){}return {id,s}},
 /* where every pid card is: in the queue (q: index) or held for a later buổi (hold) */
 where(){const o=[];Q.forEach((m,i)=>{if(m&&m.pid)o.push({id:m.pid,at:'q'+i,sig:this.sig(m)})});try{EVHOLD.forEach(h=>{if(h.m&&h.m.pid)o.push({id:h.m.pid,at:'hold',sig:this.sig(h.m)})})}catch(e){}return o},
 saved(){try{const raw=window.slotGet?slotGet('hclh-save-v2-1'):localStorage.getItem('hclh-save-v2-1');const d=JSON.parse(raw);return (d.P||[]).filter(e=>e&&e.pid).map(e=>e.pid).concat((d.evh||[]).map(h=>h.e&&h.e.pid))}catch(e){return ['err:'+e.message]}}
};`;
async function run(b,dev,url){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,1);
 await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(180000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
 const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function');await p.waitForTimeout(800);await p.evaluate(H)};
 /* a TRUE reload: page.reload → title → «Tiếp tục kiếp này» (Sổ 1), the game's own load (deser → showModal → render) */
 const reload=async()=>{await p.reload({waitUntil:'domcontentloaded'});await open();await p.waitForFunction(()=>document.querySelector('#slots button[data-load="1"]'));
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.querySelector('#slots button[data-load="1"]').click()});await p.waitForTimeout(1500)};
 /* «settle»: she looks again (showModal / render / save, as any tap does), then a second true reload */
 const settle=async()=>{await p.evaluate(()=>{try{showModal()}catch(e){}try{render()}catch(e){}try{save()}catch(e){}})};
 const res=[];const cmp=(id,w,A,n)=>{const c=A.find(c=>c.id===id&&(w.at==='hold'||c.at!=='hold'));if(!c)return n+':lost('+w.at+')';if(c.sig!==w.sig)return n+':changed '+c.sig.slice(0,200)+' ≠ '+w.sig.slice(0,200);if(w.at==='q0'&&c.at!=='q0')return n+':moved '+w.at+'→'+c.at;return ''};
 const round=async()=>{const before=await p.evaluate(()=>__spc.where());const sv=await p.evaluate(()=>__spc.saved());await reload();const a1=await p.evaluate(()=>__spc.where());await settle();const a2=await p.evaluate(()=>__spc.where());await reload();await settle();const a3=await p.evaluate(()=>__spc.where());return {before,sv,a1,a2,a3}};
 try{await open();await p.evaluate(()=>__spc.newLife());const K=await p.evaluate(o=>__spc.kinds(o),ONLY);
  for(const k of K.filter(k=>k.skip))res.push({id:k.id,v:'SKIP',why:k.skip});const built=K.filter(k=>!k.skip);
  /* (1) ONE card of each kind, shown, then a true reload: the card she was looking at is the card she sees again */
  for(const k of built){await p.evaluate(()=>__spc.clear());const pu=await p.evaluate(L=>__spc.push(L),[k]);if(pu[0].miss||pu[0].nopush){res.push({id:k.id,v:'SKIP',why:pu[0].miss?'nocard2':'nopush'});continue}
   const R=await round();const w=R.before.find(c=>c.id===k.id);if(!w){res.push({id:k.id,v:'SKIP',why:'not open after push'});continue}
   const bad=[cmp(k.id,w,R.a1,'load'),cmp(k.id,w,R.a2,'look'),cmp(k.id,w,R.a3,'reload2')].filter(Boolean);
   res.push({id:k.id,v:bad.length?'FAIL':'PASS',why:bad.join(' | ')+(R.sv.includes(k.id)?'':' [not in sổ]')});if(bad.length)console.log('  live FAIL',dev,k.id,bad.join(' | ').slice(0,200));if(res.length%50===0)console.log('… '+res.length)}
  /* (4) DECORATED: what a maker / wrapper puts on the card after mkP (a caller's title, chips qtags, a flag) comes back too — every 8th kind */
  for(const k of built.filter((k,i)=>i%8===0)){await p.evaluate(()=>__spc.clear());const ok=await p.evaluate(k=>{const d=__spc.mk(k.id,k.pp,k.syn);if(!d)return false;pushDil(d,'Thử tiêu đề '+k.id);const m=Q[Q.length-1];m.qtags=['Tra xét','Hạn 4 tuần'];m.ev=1;try{showModal()}catch(e){}try{render()}catch(e){}try{save()}catch(e){}return true},k);if(!ok)continue;
   const R=await round();const w=R.before.find(c=>c.id===k.id);if(!w)continue;const ex=await p.evaluate(id=>{const m=Q.find(m=>m.pid===id)||((typeof EVHOLD!=='undefined'?EVHOLD:[]).map(h=>h.m).find(m=>m&&m.pid===id));return m?JSON.stringify([m.qtags,m.ev]):'none'},k.id);
   const bad=[cmp(k.id,w,R.a1,'load'),cmp(k.id,w,R.a3,'reload2'),ex===JSON.stringify([['Tra xét','Hạn 4 tuần'],1])?'':'extras '+ex].filter(Boolean);res.push({id:'DECO '+k.id,v:bad.length?'FAIL':'PASS',why:bad.join(' | ')})}
  /* (5) REAL PRODUCERS that dress the card after mkP: q72o (j72 q72Offer: «Việc nhờ» + chips, jstory relabels «Phụ tuyến · …» at show), tsbCard (jtsb: its caller's title, e.g. «Bị dọa nạt» ≠ the maker's own d.title) */
  for(const [nm,fn] of [['q72o',()=>{for(const T of T72){if(q72Test(T.id,true))return true}return false}],['tsbBul',()=>{const v=liveRivals(false)[0];const l=J95C.loading;J95C.loading=1;try{return v&&tsbCard('tsbBul',{a:v.id,k:'doa',ix:-1,n:''},'Bị dọa nạt')}finally{J95C.loading=l}}],['tsbOmen',()=>{const v=liveRivals(false)[0];const l=J95C.loading;J95C.loading=1;try{return v&&tsbCard('tsbOmen',{a:v.id,k:'x'},'Điềm lạ quanh cung')}finally{J95C.loading=l}}]]){
   await p.evaluate(()=>__spc.clear());const ok=await p.evaluate(f=>{try{const r=eval('('+f+')')();try{showModal()}catch(e){}try{render()}catch(e){}try{save()}catch(e){}return !!r}catch(e){return 'err '+e.message}},String(fn));
   if(ok!==true){res.push({id:'PROD '+nm,v:'SKIP',why:String(ok)});continue}const R=await round();const w=R.before.find(c=>c.id===nm);if(!w){res.push({id:'PROD '+nm,v:'SKIP',why:'not open'});continue}
   const tg=await p.evaluate(id=>{const m=Q.find(m=>m.pid===id);return m?JSON.stringify(m.qtags||null):'none'},nm);
   const bad=[cmp(nm,w,R.a1,'load'),cmp(nm,w,R.a2,'look'),cmp(nm,w,R.a3,'reload2'),nm==='q72o'&&tg!=='["'+'Tra xét'+'","Hạn 4 tuần"]'&&!/^\["[^"]+","Hạn \d+ tuần"\]$/.test(tg)?'chips '+tg:''].filter(Boolean);res.push({id:'PROD '+nm,v:bad.length?'FAIL':'PASS',why:bad.join(' | ')+' '+w.sig.slice(0,90)})}
  /* (2) several waiting at once (the reviewer's case): one shown, the rest held for later buổi by the pacing; all of them come back where they were */
  const multi=built.filter(k=>/^(rvbribe|rvmusk|doll|eunuch|maidhostage|condemnedmaid|rcpMama|vase|embezzle|ghost)$/.test(k.id)).slice(0,5);
  if(multi.length>1){await p.evaluate(()=>__spc.clear());await p.evaluate(L=>__spc.push(L),multi);const R=await round();const bad=[];
   for(const w of R.before){const e=[cmp(w.id,w,R.a1,'load'),cmp(w.id,w,R.a2,'look'),cmp(w.id,w,R.a3,'reload2')].filter(Boolean);if(e.length)bad.push(w.id+' '+e.join(' | '))}
   res.push({id:'MULTI['+R.before.map(w=>w.id+'@'+w.at).join(',')+']',v:bad.length?'FAIL':'PASS',why:bad.join(' ;; ')});
  /* (3) answered before the reload: it never comes back */
   await p.evaluate(()=>__spc.clear());await p.evaluate(L=>__spc.push(L),multi.slice(0,1));const ans=await p.evaluate(()=>__spc.answerFirst());const R3=await round();
   const back=ans&&R3.a1.concat(R3.a2,R3.a3).some(c=>c.id===ans.id&&c.sig===ans.s);res.push({id:'ANSWERED '+(ans&&ans.id),v:!ans||back?'FAIL':'PASS',why:!ans?'no card':back?'came back':''})}
 }finally{await ctx.close()}return {res,pe}}
(async()=>{const srv=await D.serveRoot(process.env.SPC_ROOT||undefined);const b=await chromium.launch();let fail=0;
 for(const dev of DEVS.split(',')){const {res,pe}=await run(b,dev,srv.url+'/'+NEW);const n={PASS:0,FAIL:0,SKIP:0};for(const r of res){n[r.v]++;if(r.v!=='PASS'||process.env.SPC_V)console.log(dev,r.v,r.id,r.why)}
  console.log(`${dev}: PASS ${n.PASS} FAIL ${n.FAIL} SKIP ${n.SKIP}`+(pe.length?' pageerrors '+pe.length+' '+pe[0]:''));fail+=n.FAIL}
 await b.close();srv.close();console.log(fail?'RESULT FAIL':'RESULT PASS');process.exit(fail?1:0)})();
