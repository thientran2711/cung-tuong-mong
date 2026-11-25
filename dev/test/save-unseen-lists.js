/* save-unseen-lists (review/save-unseen-lists, LAW 11): what the player has not seen yet survives a TRUE page reload, and a new life is in the slot at once.
   Orders (FOREMAN_B_STATUS, MAIN 140 25/11): ~13:10Z robot M2 «unread Tin báo are LOST on true reload: before NT.list total 20 unread 5 → after
   reload+continue total 0 unread 0» + ~13:35Z robot M4 «0 s true reload right after a NEW LIFE starts → NO «Tiếp tục kiếp này»; 4 s reload → Danh/Sủng/Bạc drift».
   Cases (each: real page.reload() → title → «Tiếp tục kiếp này» of Sổ 1, as a player):
     tinbao     a seeded life plays 2 buổi, the «Tin báo» list is filled to 20 through the game's one entry point (kitNotice: real errand / Tai mắt /
                place notices with their buttons), 15 read → total 20 / unread 5 → reload → the same 20 ids in the same order, the same 5 unread, the
                box badge «5», the buttons back (go), a notice's panel opens.
     held       a held optional card (j68 EVHOLD, she has not seen it) waits → reload → still waiting, and shown at a later buổi as before.
     nl-0s      title «Bắt đầu kiếp mới» → «Thân phận kiếp này» → «Nhận thân phận» → reload at 0 ms → «Tiếp tục kiếp này» with her name, no identity card
                again, Danh / Sủng / Bạc (every top-bar number) exactly as on screen at the tap.
     nl-card    reload while the identity card is open → «Tiếp tục kiếp này» → the SAME card again (same name, same roll) → «Nhận thân phận» works.
     nl-death   a life dies → «Chuyển kiếp» → the new life's card → «Nhận thân phận» → reload at 0 ms → «Tiếp tục kiếp này» (the dead life's slot was empty).
     nl-4s      after «Nhận thân phận» she answers what comes for 4 s → reload → every top-bar number + date exactly as on screen.
     drift      a seeded life, taps over the new year with one act after each: after every moment the sổ equals the screen (Danh, Sủng, Bạc, Đức, Tài, Sắc,
                Tâm cơ, Sức, Thái hậu, date); reload 0 s and 4 s after the last tap → the same numbers.
   env SUL_ONLY=tinbao,nl-0s · SUL_MUTATE=nt (the sổ loses the notice list) | evh (loses the held cards) | nl (the life-start write is delayed: no
   at-once write at «Nhận thân phận») — a MUTATE run must FAIL.
   usage: node dev/test/save-unseen-lists.js [page=index.html] [devices=fold,ipadAir] [seed=1]   (serves the repo root = the BUILT site)
   exit 0 = every case PASS. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEVS='fold,ipadAir',SEED='1']=process.argv;
const ONLY=(process.env.SUL_ONLY||'').split(',').filter(Boolean);const want=n=>!ONLY.length||ONLY.includes(n);const MUT=process.env.SUL_MUTATE||'';
/* the player helpers of dev/test/save-boundary-reload.js (settle = answer every card / close scenes like a player; newLife; after) — one copy, read from that file */
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');
const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
const KEYS=['danh','sung','bac','duc','tai','sac','tamco','suc','th','age','rank','year','month','tuan','buoi','name'];
const VEC=`(o=>${JSON.stringify(KEYS)}.map(k=>k+'='+(typeof o[k]==='number'?Math.round(o[k]*100)/100:o[k])).join(' '))`;
const HUD=`(()=>[...document.querySelectorAll('#kstrow .kst')].map(e=>e.dataset.k+':'+e.textContent.replace(/\\s+/g,'')).join(' '))`;
/* page-side mutations (applied after every page load) */
const MUTJS={nt:`(()=>{const s0=ser;ser=function(){const d=s0.apply(this,arguments);if(d)delete d.nt;return d}})()`,
 evh:`(()=>{const s0=ser;ser=function(){const d=s0.apply(this,arguments);if(d)delete d.evh;return d}})()`,
 nl:`(()=>{window.jqSaveNow=function(){}})()`};
async function play(b,dev,url,seed,fn){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.addInitScript(seedInit,seed);
 await ctx.route(/\.(webp|png|jpg|jpeg|mp3|ogg|m4a|mp4|webm)(\?|$)/,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
 const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1500);await p.evaluate(H);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}});if(MUT&&MUTJS[MUT])await p.evaluate(MUTJS[MUT])};
 try{return await fn(p,open,pe)}finally{await ctx.close()}}
/* a TRUE reload, then the title: what Sổ 1 offers, and (when it offers it) «Tiếp tục kiếp này» */
async function reloadTitle(p,open){await p.reload({waitUntil:'domcontentloaded'});await open();
 return p.evaluate(()=>{const s=document.getElementById('slots');const b=s.querySelector('button[data-load="1"]');return{cont:!!(b&&/Tiếp tục kiếp này/.test(b.textContent)),slot:(s.querySelector('.slot')||{}).innerText||''}})}
async function cont(p){await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(2500)}
const titleNew=async p=>{await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());
 await p.waitForFunction(()=>typeof NLP!=='undefined'&&NLP&&Q.some(m=>m.nl),null,{timeout:90000});await p.waitForTimeout(400)};
const acceptTap=p=>p.evaluate(()=>{const b=document.querySelector('button[data-nl="ok"]');if(b&&b.offsetParent)b.click();else nlAccept(false)});
const snap=p=>p.evaluate(([v,h])=>({v:eval(v)(S),hud:eval(h)(),nl:!!(typeof NLP!=='undefined'&&NLP),card:Q.some(m=>m.nl)}),[VEC,HUD]);

/* ---------- tinbao ---------- */
async function tinbao(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();for(let i=0;i<2;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k)}
  const real=NT.list.length;/* top up through the ONE entry point with the real notice kinds (errand land, Tai mắt news, a place line) */
  for(let i=0;NT.list.length<BAL.noticeMax&&i<60;i++){const k=i%3;if(k===0&&typeof errNotify==='function')errNotify('t'+i,`Cung nữ ${i} đã về: có tin báo.`);
   else if(k===1)kitNotice({id:'tb:t'+i,kind:'tin',line:`Tai mắt báo: Ngự hoa viên có chuyện ${i}`,text:`Tai mắt báo: chuyện thứ ${i}`,go:()=>{},goLabel:'Để ta xem'});else kitNotice({line:`Tin trong cung số ${i}`})}
  const L=NT.list;L.forEach((x,i)=>{if(i>=5)x.seen=true});kitNoticeBox();render();await new Promise(r=>setTimeout(r,600));
  const sz=JSON.stringify(ser()).length,szNt=JSON.stringify(ser().nt||[]).length;
  return{real,total:L.length,unread:L.filter(x=>!x.seen).length,ids:L.map(x=>x.id),go:L.filter(x=>typeof x.go==='function').map(x=>x.id),sz,szNt,badge:(document.getElementById('kntbox')||{dataset:{}}).dataset.n||''}});
 const t=await reloadTitle(p,open);if(t.cont)await cont(p);
 const a=await p.evaluate(()=>{const L=(window.NT||{list:[]}).list;const box=document.getElementById('kntbox');
  const o={total:L.length,unread:L.filter(x=>!x.seen).length,ids:L.map(x=>x.id),go:L.filter(x=>typeof x.go==='function').map(x=>x.id),badge:box?box.dataset.n:'',opened:false};
  try{o.opened=!!kitNoticeOpen(L[0]&&L[0].id);closeModal()}catch(e){}/* the panel of one notice opens (after the counts: opening marks it read) */return o});
 const pass=t.cont&&r.total===20&&r.unread===5&&a.total===r.total&&a.unread===r.unread&&a.ids.join()===r.ids.join()&&a.go.join()===r.go.join()&&a.badge==='5'&&a.opened&&!pe.length;
 return{pass,line:`before total ${r.total} unread ${r.unread} (game-made ${r.real}, badge ${r.badge}, buttons ${r.go.length}) · after reload total ${a.total} unread ${a.unread} badge «${a.badge}» buttons ${a.go.length} order ${a.ids.join()===r.ids.join()?'same':'DIFFERENT'} panel ${a.opened?'opens':'NO'} · sổ ${r.sz} chars (Tin báo ${r.szNt})${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- held ---------- */
async function held(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async()=>{__sbr.newLife('thd');await __sbr.settle();
  const m={t:'Chuyện lạ trong cung',h:'<p>Có người kể chuyện lạ ở Ngự hoa viên (thẻ thử, chưa xem).</p>',opt:1};EVHOLD.length=0;/* alone in the hold (the scheduler releases the oldest first) */EVHOLD.push({m,at:wk(),K:evKeys(m)});render();await new Promise(r=>setTimeout(r,400));
  return{n:EVHOLD.length,t:EVHOLD.map(h=>h.m.t)}});
 const t=await reloadTitle(p,open);if(t.cont)await cont(p);
 const a=await p.evaluate(async()=>{const n=typeof EVHOLD!=='undefined'?EVHOLD.length:-1,t=n>0?EVHOLD.map(h=>h.m.t):[];const seen=[];const sm=showModal;showModal=window.showModal=function(){try{if(Q[0])seen.push(String(Q[0].t||''))}catch(e){}return sm.apply(this,arguments)};
  /* the scheduler releases a held card right after a step when nothing else is up (j68 evRelease, at random): a player steps on; after each step the
     screen is cleared and the same release is asked again (as the next step would) */
  for(let i=0;i<12&&!seen.includes('Chuyện lạ trong cung');i++){const k=__sbr.key();used=BAL.time.khac;const nx=document.getElementById('next');nx.disabled=false;nx.click();await __sbr.after(k);
   for(let j=0;j<6&&!seen.includes('Chuyện lạ trong cung')&&!Q.length;j++){try{evRelease()}catch(e){}await __sbr.settle()}}
  return{n,t,shown:seen.includes('Chuyện lạ trong cung')}});
 const pass=t.cont&&r.n===1&&a.n===1&&a.t[0]===r.t[0]&&a.shown&&!pe.length;
 return{pass,line:`held before reload ${r.n} «${r.t[0]}» · after reload ${a.n} ${a.t[0]?'«'+a.t[0]+'»':''} · shown at a later buổi: ${a.shown?'yes':'NO'}${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- new life ---------- */
async function nl0(b,dev,url,seed,death){return play(b,dev,url,seed,async(p,open,pe)=>{await open();let old='';
 if(death){await titleNew(p);await acceptTap(p);await p.evaluate(async()=>{await __sbr.settle()});old=await p.evaluate(()=>{const n=S.name;die('Bệnh nặng không qua khỏi');return n});
  for(let i=0;i<80;i++){const st=await p.evaluate(()=>{if(typeof NLP!=='undefined'&&NLP&&Q.some(m=>m.nl))return 'card';if(Q.length){const m=Q[0];const o=m.opts||[];const j=o.findIndex(x=>/kiếp mới|luân hồi|đầu thai|chuyển kiếp/i.test(String(x.n||'')));try{if(o.length)chooseM(j<0?0:j);else closeModal()}catch(e){Q.shift()}return 'q'}
   const bt=[...document.querySelectorAll('#modal button,#title button')].find(x=>x.offsetParent&&/kiếp mới|luân hồi|bắt đầu|chuyển kiếp/i.test(x.textContent));if(bt){bt.click();return 'b'}return 'none'});if(st==='card')break;await p.waitForTimeout(300)}}
 else await titleNew(p);
 const slotAtCard=await p.evaluate(()=>!!localStorage.getItem('hclh-save-v2-1'));
 await acceptTap(p);const s=await snap(p);/* 0 ms: reload at once */
 const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 const pass=t.cont&&a&&!a.card&&!a.nl&&a.v===s.v&&a.hud===s.hud&&!pe.length;
 return{pass,line:`${death?'old life '+old+' died · ':''}slot at the card: ${slotAtCard?'yes':'empty'} · at the tap ${s.v} · reload 0 ms → title ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục» ('+t.slot.replace(/\s+/g,' ').slice(0,60)+')'}${a?` → ${a.card?'IDENTITY CARD AGAIN · ':''}${a.v===s.v?'same numbers':'DRIFT '+a.v}${a.hud===s.hud?'':' · HUD '+a.hud}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}
async function nlCardCase(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();await titleNew(p);
 const s=await p.evaluate(()=>({name:S.name,seed:NLP.seed}));const t=await reloadTitle(p,open);let a=null;
 if(t.cont){await cont(p);a=await p.evaluate(()=>({name:S.name,nl:!!NLP,seed:NLP&&NLP.seed,card:Q.some(m=>m.nl),shown:!document.getElementById('modal').hidden&&!!document.querySelector('#modal button[data-nl="ok"]')}));
  await acceptTap(p);await p.waitForTimeout(500);a.after=await p.evaluate(()=>({nl:!!NLP,card:Q.some(m=>m.nl)}))}
 const pass=t.cont&&a&&a.name===s.name&&a.nl&&a.seed===s.seed&&a.card&&a.shown&&!a.after.nl&&!a.after.card&&!pe.length;
 return{pass,line:`card open: ${s.name} · reload → title ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục»'}${a?` → ${a.card&&a.shown?'the same card':'NO CARD'} (${a.name}${a.seed===s.seed?', same roll':', OTHER ROLL'}) → Nhận thân phận ${!a.after.nl&&!a.after.card?'ok':'STUCK'}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}
async function nl4(b,dev,url,seed){return play(b,dev,url,seed,async(p,open,pe)=>{await open();await titleNew(p);await acceptTap(p);
 await p.evaluate(async()=>{const t0=Date.now();while(Date.now()-t0<4000){await __sbr.settle1();await new Promise(r=>setTimeout(r,200))}});const s=await snap(p);
 const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 const pass=t.cont&&a&&!a.card&&a.v===s.v&&a.hud===s.hud&&!pe.length;
 return{pass,line:`4 s after «Nhận thân phận»: ${s.v} · reload → ${t.cont?'«Tiếp tục kiếp này»':'NO «Tiếp tục»'}${a?` → ${a.v===s.v?'same numbers':'DRIFT '+a.v}${a.hud===s.hud?'':' · HUD '+a.hud+' (was '+s.hud+')'}`:''}${pe.length?' · pageerror '+pe[0]:''}`}})}

/* ---------- drift ---------- */
async function drift(b,dev,url,seed){const one=wait=>play(b,dev,url,seed,async(p,open,pe)=>{await open();
 const r=await p.evaluate(async([v])=>{const V=eval(v);__sbr.newLife('thd');await __sbr.settle();S.month=12;S.tuan=2;S.buoi=B4L-1;used=0;render();await __sbr.settle();
  const sv=()=>{try{return V(JSON.parse(localStorage.getItem('hclh-save-v2-1')).S)}catch(e){return 'none'}};let mis=0;const L=[];
  const act1=async()=>{const u0=used;for(let i=0;i<(deck||[]).length&&used===u0;i++){const a=deck[i];if(!a||a.done)continue;try{act(i)}catch(e){}if(used!==u0||Q.length){await __sbr.settle();return String(a.n||'').slice(0,20)}}return ''};
  for(let t=0;t<5;t++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k);let a=V(S),s=sv();if(a!==s){mis++;L.push('tap ≠ '+a+' | sổ '+s)}
   const an=await act1();a=V(S);s=sv();if(a!==s){mis++;L.push('act «'+an+'» ≠ '+a+' | sổ '+s)}}
  return{mis,L}},[VEC]);
 if(wait)await p.waitForTimeout(wait);const s=await snap(p);const t=await reloadTitle(p,open);let a=null;if(t.cont){await cont(p);a=await snap(p)}
 return{mis:r.mis,L:r.L,pass:!r.mis&&t.cont&&a&&a.v===s.v&&a.hud===s.hud&&!pe.length,s,a,pe}});
 const z=await one(0),f=await one(4000);
 return{pass:z.pass&&f.pass,line:`moments sổ ≠ screen: ${z.mis+f.mis} · reload 0 s ${z.a&&z.a.v===z.s.v&&z.a.hud===z.s.hud?'same':'DRIFT '+(z.a&&z.a.v)} · reload 4 s ${f.a&&f.a.v===f.s.v&&f.a.hud===f.s.hud?'same':'DRIFT '+(f.a&&f.a.v)} (${f.s.v})`+(z.L.concat(f.L).length?'\n    '+z.L.concat(f.L).slice(0,6).join('\n    '):'')+(z.pe.concat(f.pe).length?' · pageerror '+z.pe.concat(f.pe)[0]:'')}}

(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const url=srv.url+PAGE;let fail=0,n=0;const seed=+SEED;
 const C=[['tinbao',tinbao],['held',held],['nl-0s',(b,d,u,s)=>nl0(b,d,u,s,false)],['nl-card',nlCardCase],['nl-death',(b,d,u,s)=>nl0(b,d,u,s,true)],['nl-4s',nl4],['drift',drift]];
 for(const dev of DEVS.split(','))for(const [name,fn] of C){if(!want(name))continue;let r;try{r=await fn(b,dev,url,seed)}catch(e){r={pass:false,line:'ERROR '+String(e&&e.message||e).slice(0,200)}}
  n++;if(!r.pass)fail++;console.log(`${r.pass?'PASS':'FAIL'} ${dev} ${name} · ${r.line}`)}
 console.log(`${fail?'SAVE-UNSEEN FAIL '+fail+'/'+n:'SAVE-UNSEEN PASS '+n+'/'+n}${MUT?' (MUTATE '+MUT+')':''} · page ${PAGE}`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
