/* picker-dom (MAIN 164 PLAY-STOPPER 26/11, Foreman F s14 iPad b1570 tab crash: one screen 20,108 DOM nodes = the item pick grid).
   usage: python3 dev/build/assemble.py && node dev/test/picker-dom.js [--root <worktree>] [--save s7.json] [--vp 755x1000,1180x820] [--max 2000]
   Save: F's robot save s7 (year 18, S.inv 1,437 entries): --save, else $CTM_S7, else <handover ref>:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz.
   Opens EVERY item picker of the family (KIT 28.13i, options with `ik`, jgpick) + the Tư trang bag on that save and counts DOM nodes:
   giftpick (Hậu cung «Tặng quà»), giftto («Dâng quà»), plantpick («Cài đồ vào rương»), tsgiftpick it / wk / both («Biếu quà làm lành»),
   wkgive, the bag (kitInvGrid). Per picker: #modal nodes, tiles drawn, hidden option cards, entries offered, can-choose count.
   FAIL when a picker is over --max nodes, or (paged build) when a «Xem thêm» page turn loses or repeats an entry. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),zlib=require('zlib'),cp=require('child_process'),path=require('path');
const A=process.argv.slice(2);const arg=(k,d)=>{const i=A.indexOf(k);return i>=0?A[i+1]:d};
const ROOT=path.resolve(arg('--root',path.resolve(__dirname,'../..')));const MAX=+arg('--max',2000);
const VPS=arg('--vp','755x1000,1180x820').split(',').map(s=>s.split('x').map(Number));
function save(){const f=arg('--save',process.env.CTM_S7);if(f&&fs.existsSync(f))return JSON.parse(fs.readFileSync(f,'utf8'));
 for(const ref of ['origin/handover','origin/claude/cung-tuong-mong-handover-hj0h8w']){try{const b=cp.execSync(`git show ${ref}:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz`,{cwd:ROOT,maxBuffer:1<<28,stdio:['ignore','pipe','ignore']});
  return JSON.parse(zlib.gunzipSync(b).toString('utf8'))}catch(e){}}throw new Error('no s7 save')}
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const D=save();const b=await chromium.launch();const rows=[];
 for(const [vw,vh] of VPS){const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx,ROOT);
  await ctx.addInitScript(d=>{if(!sessionStorage.getItem('pdm')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('pdm','1')}},D);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const T0=Date.now();const lg=m=>console.log(`  [${vw}x${vh} ${((Date.now()-T0)/1000).toFixed(1)}s] ${m}`);p.on('console',m=>{if(/^PD /.test(m.text()))lg(m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof deser==='function'&&typeof loadSlot==='function'&&window.COOPW,null,{timeout:120000});lg('loaded');
  await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){console.error(e)}});lg('save in');
  const R=await p.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const out=[];
   const v=liveRivals(true).filter(x=>x.alive!==false&&!x.out)[0];
   const cnt=(name,pid)=>{const M=document.getElementById('modal');const m=Q[0]||{};const o=(m.opts||[]);
    const tiles=M.querySelectorAll('.kipc').length,hid=M.querySelectorAll('.opts.kiphas>.opt').length,ent=o.filter(c=>c&&c.ik!=null).length;
    const can=o.filter(c=>c&&c.ik!=null&&!c.lock&&!c.tsDis&&!(c.need||[]).some(n=>n&&n.ok===false)).length;
    out.push({name,pid,nodes:M.querySelectorAll('*').length,page:document.querySelectorAll('*').length,tiles,hid,ent,can,more:!!M.querySelector('[data-kipmore]')})};
   const open=async(name,pid,pp)=>{console.log('PD open '+name);while(Q.length)Q.shift();try{closeModal()}catch(e){}try{const it=mkP(pid,pp);if(!it){out.push({name,pid,none:1});return}pushDil(it,name);showModal()}catch(e){out.push({name,pid,err:String(e)});return}
    const t0=performance.now();await w(500);cnt(name,pid);out[out.length-1].ms=Math.round(performance.now()-t0)};
   out.push({name:'S.inv entries',inv:S.inv.length});
   await open('Tặng quà (Hậu cung)','giftpick',{v:v.id});
   await open('Dâng quà (Hoàng thượng)','giftto',{t:'emp'});
   await open('Cài đồ vào rương','plantpick',{v:v.id});
   await open('Biếu quà làm lành · đồ','tsgiftpick',{v:v.id,k:'it'});
   await open('Biếu quà làm lành · tác phẩm','tsgiftpick',{v:v.id,k:'wk'});
   await open('Biếu quà làm lành · cả hai (save cũ)','tsgiftpick',{v:v.id});
   /* paged build only: page turns reach every entry once; an on-demand card = the render-time card; confirm really gives the piece */
   const deep=async(name,pid,pp)=>{const r={name:name+' · trang',pid,deep:1};while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),name);showModal();await w(300);
    const M=document.getElementById('modal');const m=Q[0];if(!M.querySelector('[data-kippg]')){r.paged=false;out.push(r);return}r.paged=true;
    const all=kipList(m).map(x=>x[1]);/* one tile per entry, or per stack of twins once jstack (inv-stack) is in */const seen=[];let guard=0;
    const nx=()=>M.querySelector('.kipw .kpkpg[data-kippg="1"]');
    for(;;){seen.push(...[...M.querySelectorAll('.kipc')].map(t=>+t.dataset.kip));const b=nx();if(!b||b.disabled||b.hidden||++guard>500)break;b.click();await w(20)}
    r.pages=guard+1;r.all=all.length;r.seen=seen.length;r.uniq=new Set(seen).size;r.miss=all.filter(i=>!seen.includes(i)).length;r.maxTiles=+(Math.min(all.length,BAL.kip.page));
    /* on-demand card on the last page vs the same option drawn by the dialog itself */
    const t=[...M.querySelectorAll('.kipc')].pop();if(t){const i=+t.dataset.kip;t.click();await w(200);const a=M.querySelector('.kipd .kipcard');r.ondemand=!!a&&!!M.querySelector(`.opts>.opt[data-m="${i}"]`);
     const ha=a?a.innerHTML:'';const ga=M.querySelector('.kipgo');r.goDis=ga?ga.disabled:null;r.cards=M.querySelectorAll('.opts>.opt[data-m]').length;
     while(Q.length)Q.shift();try{closeModal()}catch(e){}const it=mkP(pid,pp);pushDil(it,name);KIP_SEL.set(Q[0],i);showModal();await w(300);const b2=document.querySelector('#modal .kipd .kipcard');
     const norm=h=>h.replace(/ data-[\w-]+="[^"]*"/g,'').replace(/\s+/g,' ');r.same=!!b2&&norm(b2.innerHTML)===norm(ha);if(!r.same)r.diff=[norm(ha).slice(0,300),b2?norm(b2.innerHTML).slice(0,300):''];}
    /* confirm: the first doable tile goes, her pieces of that kind −1 */
    while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),name);showModal();await w(300);const g=document.querySelector('#modal .kipgo');
    const tot=()=>{let n=0;for(const e of S.inv)n+=(e&&e.n>1?e.n:1);return n};const n0=tot();if(g&&!g.disabled){used=0;g.click();await w(400);r.gave=n0-tot()}else r.gave='no doable';
    out.push(r)};
   await deep('Dâng quà (Hoàng thượng)','giftto',{t:'emp'});
   await deep('Biếu quà làm lành · đồ','tsgiftpick',{v:v.id,k:'it'});
   while(Q.length)Q.shift();try{closeModal()}catch(e){}
   try{KINV_SUB='tui'}catch(e){}tab='inv';render();await w(500);out.push({name:'Tư trang (túi)',pid:'bag',nodes:document.querySelectorAll('#panel *').length,page:document.querySelectorAll('*').length,tiles:document.querySelectorAll('#panel .kitem').length});
   tab='act';render();return out});
  for(const r of R)rows.push(Object.assign({vp:`${vw}x${vh}`},r));
  for(const r of R)if(r.deep&&r.paged){ok(r.miss===0&&r.uniq===r.seen&&r.seen===r.all,`${vw}x${vh} ${r.name}: ${r.pages} pages reach all ${r.all} entries once`,{seen:r.seen,uniq:r.uniq,miss:r.miss});
   ok(r.ondemand,`${vw}x${vh} ${r.name}: a tile on the last page builds its own card on demand (cards in the dialog: ${r.cards})`);ok(r.same,`${vw}x${vh} ${r.name}: on-demand card = the card the dialog draws`,r.diff);
   ok(r.gave===1||r.gave==='no doable',`${vw}x${vh} ${r.name}: confirm gives exactly one piece`,{gave:r.gave})}
  for(const r of R)if(r.nodes!=null)ok(r.nodes<MAX,`${vw}x${vh} ${r.name}: ${r.nodes} nodes in the dialog (page ${r.page}); tiles ${r.tiles}, hidden cards ${r.hid??'-'}, entries ${r.ent??'-'}, can choose ${r.can??'-'}${r.ms!=null?', '+r.ms+' ms':''}`);
  ok(!errs.length,`${vw}x${vh} no page errors`,errs.slice(0,3));await ctx.close()}
 await b.close();fs.writeFileSync(arg('--json','/dev/null'),JSON.stringify(rows,null,1));
 const fail=res.filter(x=>!x).length;console.log(fail?`picker-dom FAIL ${fail}/${res.length}`:`picker-dom PASS ${res.length}/${res.length}`);process.exit(fail?1:0)})();
