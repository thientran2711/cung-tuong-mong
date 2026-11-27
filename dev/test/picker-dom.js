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
   /* paged build: every page = whole rows with no inner scroll; page turns reach every tile once; for a LOCKED and an OPEN tile of every
      picker, the card the paged dialog draws (reached by page turns) = the card the full draw makes (kip grid off = LIVE's path: every
      showModal decorator — jgift giftto lock/.kgiftno + chip, jk2b hideOut, jemoact eaLockWhy …); confirm gives exactly one piece */
   const card=i=>{const b=document.querySelector(`#modal .opts>.opt[data-m="${i}"]`);if(!b)return null;const t=b.cloneNode(true);t.querySelectorAll('.kaart,.kitem img').forEach(x=>x.removeAttribute('src'));
    return{cls:[...b.classList].filter(c=>!/^(kfit|kopt-|kv)/.test(c)).sort().join(' '),dis:b.disabled,txt:b.textContent.replace(/\s+/g,' ').trim(),chip:!!b.querySelector(':scope>.kitem'),data:[...b.attributes].filter(a=>/^data-/.test(a.name)&&a.name!=='data-kapic')/* data-kapic = jk4/jopic picture-FIT mark, set only on a VISIBLE card (the reference card is visible, the picker's own card sits hidden behind the grid as on LIVE): layout state, not a decoration */.map(a=>a.name+'='+a.value).sort().join('|')}};
   /* the grid settles its columns a frame or two after a draw (jgpick ResizeObserver): wait for frames, then until no redraw is pending */
   const fr=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const settle=async()=>{for(let k=0;k<4;k++)await fr();await w(30)};
   const deep=async(name,pid,pp)=>{console.log('PD deep '+name);const r={name:name+' · trang',pid,deep:1};while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),name);showModal();await w(400);await settle();
    const M=document.getElementById('modal');const m=Q[0];r.paged=!!M.querySelector('[data-kippg]');
    if(r.paged){const all=kipList(m).map(x=>x[1]);const seen=[];let guard=0;r.rows=[];r.scroll=[];
     const nx=()=>M.querySelector('.kipw .kpkpg[data-kippg="1"]');
     for(;;){const T=[...M.querySelectorAll('.kipc')];seen.push(...T.map(t=>+t.dataset.kip));const g=M.querySelector('.kipg');
      const cols=getComputedStyle(g).gridTemplateColumns.split(' ').filter(x=>/^[\d.]+px$/.test(x)).length;r.cols=Math.max(r.cols||0,cols);const cs=getComputedStyle(g),gap=parseFloat(cs.columnGap)||0,tile=parseFloat(cs.getPropertyValue('--kshsz'))||96;const fit=Math.max(1,Math.floor((g.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)+gap)/(tile+gap)));if(cols!==fit)(r.fit=r.fit||[]).push(cols+'≠'+fit+'@'+g.clientWidth+'px/'+tile);r.tile=tile;r.gw=g.clientWidth;const last=!nx()||nx().disabled||nx().hidden;
      if(!last&&T.length%cols)r.rows.push(T.length+'/'+cols);if(g.scrollHeight>g.clientHeight+1)r.scroll.push(g.scrollHeight+'>'+g.clientHeight);
      if(last||++guard>800)break;nx().click();await settle()}
     r.pages=guard+1;r.all=all.length;r.seen=seen.length;r.uniq=new Set(seen).size;r.miss=all.filter(i=>!seen.includes(i)).length;r.per=BAL.kip.rows*r.cols;
     /* a locked and an open tile, each on a page past the first when there is one */
     const L=kipList(m);const pick=f=>{const c=L.filter(x=>f(x[0]));return c.length?c[c.length-1][1]:null};
     r.cmp=[];for(const [lab,i] of [['locked',pick(c=>kipLocked(c))],['open',pick(c=>!kipLocked(c))]]){if(i==null){r.cmp.push({lab,none:1});continue}
      while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),name);showModal();await w(200);
      let g2=0;while(!document.querySelector(`#modal .kipc[data-kip="${i}"]`)&&g2++<800){const b=document.querySelector('#modal .kipw .kpkpg[data-kippg="1"]');if(!b||b.disabled)break;b.click();await w(20)}
      const tl=document.querySelector(`#modal .kipc[data-kip="${i}"] .kshpic`);if(tl){tl.click();await w(150)}const A=card(i);
      const go=document.querySelector('#modal .kipgo');const goDis=go?go.disabled:null;
      while(Q.length)Q.shift();try{closeModal()}catch(e){}const k0=kipOn,o0=kipOnlySet;kipOn=()=>false;kipOnlySet=(mm,v)=>o0(mm,new Set([i]));/* LIVE's draw path (no grid, every decorator), only card i drawn: same dialog, same options */try{pushDil(mkP(pid,pp),name);showModal();await w(200);var B=card(i)}finally{kipOn=k0;kipOnlySet=o0}
      r.cmp.push({lab,i,same:!!A&&!!B&&A.cls===B.cls&&A.dis===B.dis&&A.txt===B.txt&&A.chip===B.chip&&A.data===B.data,goDis,A,B})}}
    /* confirm: the first doable tile goes, her pieces of that kind −1 */
    while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),name);showModal();await w(300);const g=document.querySelector('#modal .kipgo');
    const tot=()=>{if(typeof invTotals==='function')return Object.values(invTotals(S)).reduce((a,b)=>a+b,0);return S.inv.length};/* stack-aware (jstack S.invS) */
    const n0=tot();if(g&&!g.disabled){used=0;g.click();await w(400);r.gave=n0-tot();r.log=String(S.logs[0]||'').replace(/<[^>]+>/g,'').slice(0,160)}else r.gave='no doable';
    out.push(r)};
   await deep('Tặng quà (Hậu cung)','giftpick',{v:v.id});
   await deep('Dâng quà (Hoàng thượng)','giftto',{t:'emp'});
   await deep('Cài đồ vào rương','plantpick',{v:v.id});
   await deep('Biếu quà làm lành · đồ','tsgiftpick',{v:v.id,k:'it'});
   /* rv round 3: the dialog FRAME (layout classes the kit fit passes give it: kszlive / kdper / kdscroll / kesdlg / kdpbanner / kdpall …) of a paged
      picker = the frame of LIVE's path (every card drawn: kipOnly never set), for small chests around the pick-list line KIT_SIZE.v3.live.maxOpts
      (5 / 6 / 7 items) and a chest that pages (30), on its first page and after a page turn */
   if(typeof kipOnlySet==='function'){const inv0=S.inv.slice();const fcls=()=>{const d=document.querySelector('#modal .dlg');return d?[...d.classList].filter(c=>!/^(kfit|kv\d|kpanel|kipdlg)$/.test(c)).sort().join(' '):''};const fst=async pid=>{let a=null,b=fcls(),k=0;while(k++<20&&(a!==b||!Q[0]||Q[0].pid!==pid)){await w(300);a=b;b=fcls()}return (Q[0]&&Q[0].pid===pid?'':'(not '+pid+') ')+b};/* read the frame once it has stopped changing (two equal reads 300 ms apart) and the dialog in view is this picker */
    try{for(const N of [5,6,7,30]){S.inv=inv0.slice(0,N);for(const [lab,pid,pp] of [['Tặng quà','giftpick',{v:v.id}],['Dâng quà','giftto',{t:'emp'}],['Cài đồ','plantpick',{v:v.id}],['Biếu quà · đồ','tsgiftpick',{v:v.id,k:'it'}]]){
     console.log('PD frame '+lab+' chest '+N);while(Q.length)Q.shift();try{closeModal()}catch(e){}pushDil(mkP(pid,pp),lab);showModal();await w(600);const A=await fst(pid);let A2=null;
     const nb=document.querySelector('#modal .kipw .kpkpg[data-kippg="1"]');if(nb&&!nb.disabled){nb.click();await w(600);A2=await fst(pid)}const ent=(Q[0].opts||[]).filter(c=>c&&c.ik!=null).length;
     while(Q.length)Q.shift();try{closeModal()}catch(e){}const o0=kipOnlySet;kipOnlySet=(mm,v)=>v;try{pushDil(mkP(pid,pp),lab);showModal();await w(600);var B=await fst(pid)}finally{kipOnlySet=o0}
     out.push({frame:1,name:lab,N,ent,A,A2,B})}}}finally{S.inv=inv0}}
   while(Q.length)Q.shift();try{closeModal()}catch(e){}
   try{KINV_SUB='tui'}catch(e){}tab='inv';render();await w(500);out.push({name:'Tư trang (túi)',pid:'bag',nodes:document.querySelectorAll('#panel *').length,page:document.querySelectorAll('*').length,tiles:document.querySelectorAll('#panel .kitem').length});
   tab='act';render();return out});
  for(const r of R)rows.push(Object.assign({vp:`${vw}x${vh}`},r));
  for(const r of R)if(r.deep&&!r.paged)ok(r.gave===1||r.gave==='no doable'||/không thành|chưa dịu|trả lại|uổng công/.test(r.log||''),`${vw}x${vh} ${r.name}: (no pager) confirm gives exactly one piece`,{gave:r.gave,log:r.log});
  for(const r of R)if(r.deep&&r.paged){ok(r.miss===0&&r.uniq===r.all&&r.seen-r.uniq<=2*r.per,`${vw}x${vh} ${r.name}: ${r.pages} pages reach all ${r.all} tiles, none lost (${r.seen-r.uniq} seen twice across a column settle)`,{seen:r.seen,uniq:r.uniq,miss:r.miss});
   ok(!r.rows.length&&!r.scroll.length,`${vw}x${vh} ${r.name}: every page = whole rows (${r.cols} cols × BAL.kip.rows = ${r.per}), no inner scroll`,{halfRows:r.rows.slice(0,3),scroll:r.scroll.slice(0,3)});
   ok(!(r.fit||[]).length,`${vw}x${vh} ${r.name}: the page uses every column the kit tile (${r.tile} px) allows in the ${r.gw} px box (no stretched / squeezed columns)`,(r.fit||[]).slice(0,3));
   for(const c of r.cmp)ok(c.none||c.same,`${vw}x${vh} ${r.name}: ${c.lab} tile${c.none?' (none on this save)':''} — paged card = full-draw card (classes, disabled, data-*, text, chip)`,c.same||c.none?undefined:{A:c.A,B:c.B});
   ok(r.gave===1||r.gave==='no doable'||/không thành|chưa dịu|trả lại|uổng công/.test(r.log||''),`${vw}x${vh} ${r.name}: confirm gives exactly one piece (or she refuses it / the roll fails: nothing lost)`,{gave:r.gave,log:r.log})}
  for(const r of R)if(r.frame)ok(r.A===r.B&&(r.A2==null||r.A2===r.B),`${vw}x${vh} ${r.name} (chest ${r.N}, ${r.ent} entries): dialog frame = LIVE's (all cards drawn)${r.A2!=null?' on page 1 and page 2':''} — ${r.B}`,r.A===r.B&&(r.A2==null||r.A2===r.B)?undefined:{paged:r.A,page2:r.A2,live:r.B});
  for(const r of R)if(r.nodes!=null)ok(r.nodes<MAX,`${vw}x${vh} ${r.name}: ${r.nodes} nodes in the dialog (page ${r.page}); tiles ${r.tiles}, hidden cards ${r.hid??'-'}, entries ${r.ent??'-'}, can choose ${r.can??'-'}${r.ms!=null?', '+r.ms+' ms':''}`);
  ok(!errs.length,`${vw}x${vh} no page errors`,errs.slice(0,3));await ctx.close()}
 await b.close();fs.writeFileSync(arg('--json','/dev/null'),JSON.stringify(rows,null,1));
 const fail=res.filter(x=>!x).length;{const by={};for(const r of rows)if(r.deep&&r.paged)(by[r.name]=by[r.name]||[]).push(`${r.vp}: ${r.cols} cols (box ${r.gw} px, tile ${r.tile} px)`);for(const k in by)console.log('cols  '+k+' — '+by[k].join(' · '))}
 console.log(fail?`picker-dom FAIL ${fail}/${res.length}`:`picker-dom PASS ${res.length}/${res.length}`);process.exit(fail?1:0)})();
