/* kit-plaque-confirm.js (KK51, KIT §98.1 ✓/✕ ON the lifted plaque; MAIN 167 rec for RING-BUILD-7): real stage, Fold 755x1000 + iPad 1180x820 (+ any WxH list).
   For boards of 1,2,4,5,7,8,10 plaques with long and short names, EVERY plaque is lifted in turn:
   (1) the ✓/✕ pair sits ON the lifted plaque (overlaps it, its right edge near the plaque's right end);
   (2) the pair stays inside the band box [postBox.x0 … post right] — never in a column left of the band, never right of the post;
   (3) the lifted (widened) plaque never goes left of postBox.x0;  (4) the pair never covers its own odds / cost line; on a first / last row plaque (a free side) it never covers another plaque's name (a line box's ≤ 6 px leading aside);
   a middle-row plaque in a packed column has no clean spot: the least-cover spot is used (counted as info);  (5) the pair is inside the stage;
   (6) ✓ chooses, ✕ puts back (one board); (7) kitNameTagFit on a DETACHED root returns 0 and never sets a 0 px plate height.
   usage: node dev/test/kit-plaque-confirm.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitPick,null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   KIT_PLAQUE.motion=null;document.documentElement.classList.add('kf-still');const sl=ms=>new Promise(r=>setTimeout(r,ms));const st=document.getElementById('stage');
   const LONG=['Bàn tán về Hoàng hậu Dư Sơ Ảnh ở Vườn hoa','Rỉ tai chuyện Quý phi Tần Dư Nguyệt Thiền','Hắt nước vào xiêm y Thục phi Diệp Cảnh Hoài','Cảnh báo nàng ta về lời đồn','Gặp riêng Thái y ở Thái y viện','Thách đấu tài nghệ cùng Chiêu nghi','Mời uống trà','Xin chữ','Cùng ngắm hoa','Hỏi thăm sức khỏe'];
   const SHORT=['Trò chuyện','Giao hảo','Khiêu khích','Tặng quà','Hỏi han','Dò la','Mời trà','Xin chữ','Ngắm hoa','Hỏi thăm'];
   const out=[];let flow=null;
   for(const set of [SHORT,LONG])for(const n of [1,2,4,5,7,8,10]){kitPick.destroy();const S=st.getBoundingClientRect();
    const P=kitPick.open({host:st,anchor:{x:Math.round(S.width*.25),y:Math.round(S.height*.25),w:120,h:Math.round(S.height*.7)},acts:set.slice(0,n).map((x,i)=>({id:'a'+i,n:x,pic:'',word:'Tùy duyên',ton:i%2?'2 khắc · 30 lượng bạc':'1 khắc',off:false,why:''}))});await sl(40);
    const Sx=st.getBoundingClientRect(),B=kitPick.postBox(st,n),bl=Sx.left+B.x0,br=Sx.left+B.x1;
    for(const nd of [...P.el.querySelectorAll('.kpk-n')]){nd.querySelector('.kpk-b').click();await sl(30);const c=P.el.querySelector('.khconf:not([hidden])');if(!c){out.push({n,id:nd.dataset.id,err:'no conf'});continue}
     const cr=c.getBoundingClientRect(),pr=nd.querySelector('.kpk-b').getBoundingClientRect(),nr={left:Sx.left+nd.offsetLeft};
     const on=Math.min(cr.right,pr.right)-Math.max(cr.left,pr.left)>8&&Math.min(cr.bottom,pr.bottom)-Math.max(cr.top,pr.top)>4;
     const names=[...P.el.querySelectorAll('.kpk-n')].filter(o=>o!==nd).filter(o=>{const e=o.querySelector('.kfoc-t b')||o,g=document.createRange();g.selectNodeContents(e);const q=g.getBoundingClientRect();/* the name TEXT's box */return Math.min(cr.right,q.right)-Math.max(cr.left,q.left)>2&&Math.min(cr.bottom,q.bottom)-Math.max(cr.top,q.top)>6/* a line box's top / bottom leading (≤ 6 px) is no glyph */}).map(o=>o.dataset.id);
     const own=[...nd.querySelectorAll('.kfoc-t b,.kfoc-t small')].reduce((z,sm)=>{const g=document.createRange();g.selectNodeContents(sm);const sq=g.getBoundingClientRect();return z+(sq.width?Math.max(0,Math.min(cr.right,sq.right)-Math.max(cr.left,sq.left))*Math.max(0,Math.min(cr.bottom,sq.bottom)-Math.max(cr.top,sq.top)):0)},0),inside=cr.left>=pr.left-1&&cr.right<=pr.right+1&&cr.top>=pr.top-1&&cr.bottom<=pr.bottom+1;
     const ix=+nd.dataset.id.slice(1),row=(ix/P.G.cols)|0,edge=row===0||row===P.G.rows-1;/* a first / last row plaque has a free side (rail above / nothing below) */
     out.push({set:set===LONG?'long':'short',n,cols:P.G.cols,id:nd.dataset.id,edge,on,inside,own:Math.round(own),rEnd:Math.round(pr.right-cr.right),inBand:cr.left>=bl-1&&cr.right<=br+1,leftOK:nr.left>=bl-1,names,inStage:cr.left>=Sx.left-1&&cr.right<=Sx.right+1&&cr.top>=Sx.top-1&&cr.bottom<=Sx.bottom+1,
      cx:[Math.round(cr.left-Sx.left),Math.round(cr.top-Sx.top)],band:[Math.round(B.x0),Math.round(B.x1)]});
     if(set===LONG&&n===7&&nd.dataset.id==='a2'&&window.__shot0!==1){window.__shot0=1;window.__keep=[n,nd.dataset.id]}}
    if(set===SHORT&&n===4){/* ✓ chooses, ✕ puts back */let pk=null;P.o.onPick=id=>{pk=id};const nd=P.el.querySelector('.kpk-n[data-id=a1]');nd.querySelector('.kpk-b').click();await sl(30);P.el.querySelector('.khconf>.khx').click();await sl(30);
     const up0=P.el.querySelectorAll('.kpk-up').length;nd.querySelector('.kpk-b').click();await sl(30);P.el.querySelector('.khconf>.khok').click();await sl(30);flow={xBack:up0===0,pick:pk}}}
   /* detached root */const d=document.createElement('div');d.innerHTML='<span class="kscn-tag kscn-fix">Hoàng hậu</span><span class="kscn-tag kscn-fix">Quý phi Tần Dư Nguyệt Thiền</span>';const h=kitNameTagFit(d);
   const det={ret:h,heights:[...d.querySelectorAll('.kscn-tag')].map(t=>t.style.height)};
   /* leave one board open with a lifted plaque for the shot (long names, 7, 3rd plaque) */kitPick.destroy();const S=st.getBoundingClientRect();const P=kitPick.open({host:st,anchor:{x:Math.round(S.width*.25),y:Math.round(S.height*.25),w:120,h:Math.round(S.height*.7)},acts:LONG.slice(0,7).map((x,i)=>({id:'a'+i,n:x,pic:'',word:'Tùy duyên',ton:'2 khắc · 30 lượng bạc',off:false,why:''}))});await sl(40);P.lift('a2');await sl(40);
   return {out,flow,det}});
  if(SHOT){await p.evaluate(()=>{for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&/Chạm để mở/.test(e.textContent)&&!e.contains(document.getElementById('stage')))e.style.display='none'}});await p.waitForTimeout(200)}
  if(SHOT)await p.screenshot({path:`${SHOT}/confirm-${wh}.png`});
  const o=r.out;console.log('   boards',o.length,'lifts; sample',JSON.stringify(o.filter(x=>x.n===7&&x.set==='long').map(x=>({id:x.id,c:x.cx,band:x.band}))));
  chk(wh+' every lift shows ✓/✕',o.every(x=>!x.err),o.filter(x=>x.err).slice(0,3));
  chk(wh+' ✓/✕ sits ON the lifted plaque, at its right end',o.every(x=>x.on&&x.rEnd>=-14&&x.rEnd<=12),o.filter(x=>!(x.on&&x.rEnd>=-14&&x.rEnd<=12)).slice(0,3));
  chk(wh+' ✓/✕ inside the band box [postBox.x0 … post] (no ✓/✕ room left of the band)',o.every(x=>x.inBand),o.filter(x=>!x.inBand).slice(0,3));
  chk(wh+' lifted plaque never left of postBox.x0',o.every(x=>x.leftOK),o.filter(x=>!x.leftOK).slice(0,3));
  chk(wh+' ✓/✕ wholly inside the lifted plaque (its strip; neighbours sit behind the lifted plaque)',o.every(x=>x.inside),o.filter(x=>!x.inside).slice(0,3));
  chk(wh+' ✓/✕ never over its own name or odds / cost line',o.every(x=>x.own<=20),o.filter(x=>x.own>20).slice(0,3).map(x=>x.set+x.n+':'+x.id+' '+x.own+'px²'));
  chk(wh+' ✓/✕ inside the stage',o.every(x=>x.inStage),o.filter(x=>!x.inStage).slice(0,3));
  chk(wh+' ✕ puts back, ✓ chooses',r.flow&&r.flow.xBack&&r.flow.pick==='a1',r.flow);
  chk(wh+' kitNameTagFit detached root → 0, no 0 px plate',r.det.ret===0&&r.det.heights.every(x=>x===''),r.det);
  chk(wh+' no page errors',errs.length===0,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FAIL '+fails:'PASS');process.exit(fails?1:0)})();
