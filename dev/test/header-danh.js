/* review/header-danh: top bar stat groups (owner 15/11 ~17:50Z: LEFT Sắc · Tài · Tâm cơ · Đức · Danh · Sủng | RIGHT Bạc · Sức).
   Serves a local index.html under the live origin (pictures from the live site), one browser, several sizes in turn.
   usage: node dev/test/header-danh.js <index.html> <outdir> <WxH@dpr,...> [oldsave.json]
   Per size prints JSON: group order, label/number line tops of every cell + the time block (spread must be <= 1 px), bars,
   cell tooltips, overlaps of the quẻ line / time block with every cell, seal vs quẻ line, header-fix box checks, page errors.
   Quẻ texts tried: "Quẻ Thượng thượng (Danh)" (reviewer note, 1000x755) and the longest "Quẻ Thượng thượng (Giao thiệp)". */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,IDX,OUT,SIZES,OLD]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';
const html=fs.readFileSync(IDX,'utf8');
const measure=()=>{const hd=document.querySelector('header.hud');const R=e=>e.getBoundingClientRect();const rr=q=>[Math.round(q.left),Math.round(q.top),Math.round(q.right),Math.round(q.bottom)];
 const vis=e=>e&&e.offsetParent!==null&&R(e).width>0;
 const groups=[...document.querySelectorAll('#kstrow>.kstg')].map(g=>({id:g.id,keys:[...g.querySelectorAll('.kst')].map(c=>c.dataset.k)}));
 const cells=[...document.querySelectorAll('#kstrow .kst')].filter(vis);
 const lt=cells.map(c=>R(c.querySelector('.kstl')).top),nt=cells.map(c=>R(c.querySelector('.kstv')).top);
 const tt=document.querySelector('#k3tt>.kstl'),tv=document.querySelector('#k3tt>.kstv');
 const sp=a=>a.length?+(Math.max(...a)-Math.min(...a)).toFixed(2):0;
 const one=!!(tt&&cells.length&&Math.abs(R(tt).top-lt[0])<12);
 const align={label:sp(lt),num:sp(nt),withTime:one?{label:sp(lt.concat(R(tt).top)),num:sp(nt.concat(R(tv).top))}:'two-row'};
 const bars=cells.filter(c=>{const b=c.querySelector('.kstb');return b&&!b.classList.contains('kstb0')&&getComputedStyle(b).visibility!=='hidden'}).map(c=>c.dataset.k);
 const titles=Object.fromEntries(cells.map(c=>[c.dataset.k,c.title]));
 const lot=document.querySelector('#k3tt .k3lot');const lotR=lot&&R(lot);const tc=document.getElementById('k3tc');
 const inter=(a,b)=>{const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);return w>0.5&&h>0.5?Math.round(w)+'x'+Math.round(h):''};
 const ovl=[];const ink=[...document.querySelectorAll('#k3tt .k3r, #k3tt .k3wx')].filter(vis);
 for(const e of ink)for(const c of cells){const o=inter(R(e),R(c));if(o)ovl.push((e.className.split(' ').find(x=>/^k3(lot|time|wx)/.test(x))||'k3r')+'/'+c.dataset.k+' '+o)}
 for(const w of [...document.querySelectorAll('#kstrow .kstw')].filter(vis)){const me=w.closest('.kst');for(const c of cells){if(c===me)continue;for(const part of c.querySelectorAll('.kstl img,.kstv')){const q=R(part),W=R(w);const x=Math.min(q.right,W.right+2)-Math.max(q.left,W.left-2),y=Math.min(q.bottom,W.bottom)-Math.max(q.top,W.top);if(x>0&&y>0)ovl.push('warn/'+c.dataset.k)}}}
 const seal=hd.querySelector('.kseal-hud');let sealGap=null,sealOv=[];if(seal&&vis(seal)){const S=R(seal);
  if(lotR)sealGap=+Math.max(lotR.left-S.right,S.left-lotR.right,lotR.top-S.bottom,S.top-lotR.bottom).toFixed(1);
  for(const e of [...hd.querySelectorAll('#k3tt .k3r, #kstrow .kst, #me-n, #me-d, #k3room, #menu')].filter(vis)){const o=inter(R(e),S);if(o)sealOv.push((e.id||e.dataset.k||e.className.slice(0,12))+' '+o)}}
 const K=['menu','me','k3room','k3tc','kstrow'].map(i=>[i,document.getElementById(i)||hd.querySelector(':scope>.'+i)]).filter(x=>vis(x[1]));const box=[];
 for(let a=0;a<K.length;a++)for(let b=a+1;b<K.length;b++){const o=inter(R(K[a][1]),R(K[b][1]));if(o)box.push(K[a][0]+'/'+K[b][0]+' '+o)}
 const hb=R(hd);const outB=[...hd.querySelectorAll('#kstrow .kst, #k3tt .k3r')].filter(vis).filter(e=>{const q=R(e);return q.left<hb.left-.5||q.right>hb.right+.5}).map(e=>e.dataset.k||e.className.slice(0,10));
 const lines=e=>{const rg=document.createRange();rg.selectNodeContents(e);const ys=[...rg.getClientRects()].filter(q=>q.width>1&&q.height>8).map(q=>q.top+q.height/2).sort((a,b)=>a-b);let n=0,l=-99;ys.forEach(y=>{if(y-l>8){n++;l=y}});return n};
 const wrap=['me-n','me-r','me-a','me-d'].map(i=>[i,document.getElementById(i)]).filter(x=>vis(x[1])).map(([i,e])=>i+':'+lines(e)).join(' ');
 const lotLines=lot?lines(lot):0;
 const mp=document.querySelector('#me-p>.md'),mi=document.querySelector('#me .mi');const por={box:mp&&rr(R(mp)),mi:mi&&rr(R(mi)),img:mp?[...mp.querySelectorAll('img.kpor,img.kfr')].map(i=>i.className.split(' ')[0]+':'+(i.complete&&i.naturalWidth>0?'ok':'no')).join(' '):''};
 return{por,groups,align,bars,titles,lotText:lot&&lot.textContent,lotLines,lot:lotR&&rr(lotR),ovl,sealGap,sealOv,box,outB,wrap,khd2:hd.classList.contains('khd2'),pad:hd.classList.contains('kseal-pad'),hd:rr(hb),hovf:document.documentElement.scrollWidth>innerWidth+1,
  cellsR:cells.map(c=>c.dataset.k+':'+rr(R(c)).join(','))}};
(async()=>{const b=await chromium.launch();const RES={};
 for(const SZ of SIZES.split(',')){const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href===LIVE||u.href===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg|m4a)$/,r=>r.fulfill({status:404,body:''}));
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  const clean=async()=>{await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});
   for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;render()});await p.waitForTimeout(700)};
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
  await p.waitForTimeout(5000);await clean();
  const tag=WH;const R0={};
  for(const [nm,dom] of [['danh','Danh'],['long','Giao thiệp']]){
   await p.evaluate(dom=>{S.lot={lv:0,dom};render();try{kitSealHud()}catch(e){}},dom);await p.waitForTimeout(500);
   R0[nm]=await p.evaluate(measure);
   await p.screenshot({path:`${OUT}/${tag}-${nm}.jpg`,type:'jpeg',quality:80,clip:{x:0,y:0,width:W,height:Math.min(H,R0[nm].hd[3]+6)}})}
  /* away from home with the worst-case strings (KIT 32.12): long name, Hoàng quý phi, 29 tuổi, longest place button, quẻ (Danh) */
  await p.evaluate(()=>{S.name="Hoàng Phủ Uyển Nghiêm";S.rank=6;S.age=29;S.month=11;S.year=10;S.tuan=1;S.lot={lv:0,dom:"Danh"};S.wx={n:"mai nở trong tuyết",k:"snowp",f:0};
   const pl=places().map(x=>[x.k,typeof accName==="function"?accName(x.k):x.n]).sort((a,b)=>b[1].length-a[1].length);try{S.place=pl[0][0];goTo(pl[0][0])}catch(e){}});
  await clean();await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="act"]');if(b)b.click()});await p.waitForTimeout(800);
  R0.away=await p.evaluate(measure);R0.away.room=(document=>{const r=document.getElementById('k3room');return r&&!r.hidden?r.textContent:''})||'';
  R0.away.cover=await p.evaluate(()=>{let e=document.elementFromPoint(innerWidth/2,30);const a=[];while(e&&a.length<4){a.push((e.id||e.tagName)+'.'+String(e.className).slice(0,30));e=e.parentElement}return a.join('<')});
  R0.away.room=await p.evaluate(()=>{const r=document.getElementById('k3room');return r&&!r.hidden?r.textContent+' '+JSON.stringify(r.getBoundingClientRect()):'-'});
  await p.screenshot({path:`${OUT}/${tag}-away.jpg`,type:'jpeg',quality:80,clip:{x:0,y:0,width:W,height:Math.min(H,R0.away.hd[3]+6)}});
  /* back home: the one-row bar must come back (no stuck two-row form) */
  await p.evaluate(()=>{S.name="Lý Như";S.rank=1;S.month=3;S.wx={n:"trời quang",k:"clear",f:0};S.lot={lv:0,dom:"Danh"};try{S.place="home";goTo("home")}catch(e){}});await clean();
  R0.home2=await p.evaluate(measure);
  if(process.env.DBG)R0.home2.dbg=await p.evaluate(()=>{const hd=document.querySelector('header.hud');const tc=document.getElementById('k3tc'),tt=document.getElementById('k3tt');const a=[S.place,hd.className,hd.scrollWidth,hd.clientWidth,tt.scrollWidth,tc.clientWidth];hd.classList.remove('khd2');hd.classList.add('kseal-pad');a.push(hd.scrollWidth,hd.clientWidth,tt.scrollWidth,tc.clientWidth,(document.getElementById('k3room')||{}).hidden,tt.textContent);kitHdFit();a.push(hd.className);return a});
  /* click Danh + Sủng: what opens (title of the modal or the Ân sủng card), then close */
  R0.click={};for(const k of ['danh','sung','sac','bac']){R0.click[k]=await p.evaluate(k=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const c=document.getElementById('hud-'+k);if(!c)return'nocell';c.click();
    const t=m&&!m.hidden?m.textContent.replace(/\s+/g,' ').trim().slice(0,70):'';const pop=document.querySelector('.kpop:not([hidden]), .kpopt');Q.length=0;if(m)m.hidden=true;return t||(pop?'pop:'+pop.textContent.trim().slice(0,30):'-')},k)}
  await clean();
  if(OLD){R0.oldsave=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;render();return'ok '+S.name}catch(e){return'ERR '+e.message}},fs.readFileSync(OLD,'utf8'));
   await clean();R0.old=await p.evaluate(measure);await p.screenshot({path:`${OUT}/${tag}-old.jpg`,type:'jpeg',quality:80,clip:{x:0,y:0,width:W,height:Math.min(H,R0.old.hd[3]+6)}})}
  R0.errs=errs;RES[SZ]=R0;console.log(SZ,JSON.stringify(R0));await ctx.close()}
 fs.writeFileSync(`${OUT}/result.json`,JSON.stringify(RES,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
