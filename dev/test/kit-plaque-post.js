/* kit-plaque-post.js (KK47, KIT §98.1 + §98.1b; owner OD 26/11 ~21:41Z «mấy cái thẻ … không có chung một vị trí … sự lựa chọn nào nó cũng tới từ một cái cột thôi» + 21:45Z no paging + 22:43Z «không bắt buộc max 7 lá»):
   real stage (start(), Fold 755x1000 + iPad 1180x820): kitPick boards of 1..7 plaques, each opened beside a person at x .2 / .5 / .8 with side l / r / auto:
   (1) the POST is at ONE place — same left + top (±1 px) on every board; right side of the stage; (2) 1–4 plaques = 1 column, 5–7 = 2 columns, 8+ = 3 columns, each new column LEFT of the last,
   the band's right edge never moves; (3) every plaque inside the stage, one plaque size; (4) 8+ acts = 3 columns, every act a plaque (no cut), NO paging tabs; (5) the kit result card shown while a board is open
   never overlaps a plaque (yield), and is back in place after the board closes.
   usage: node dev/test/kit-plaque-post.js <index.html> [WxH,...] [shotdir]   exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);const SIZES=(process.argv[3]||'755x1000,1180x820').split(',');const SHOT=process.argv[4]||'';
(async()=>{const b=await chromium.launch();let fails=0;const chk=(n,ok,v)=>{console.log((ok?'ok  ':'FAIL')+' '+n+' '+JSON.stringify(v));if(!ok)fails++};
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitPick,null,{timeout:240000});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{quiet=true;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;await new Promise(r=>setTimeout(r,2500));Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on');
   KIT_PLAQUE.motion=null;document.documentElement.classList.add('kf-still');const sl=ms=>new Promise(r=>setTimeout(r,ms));const st=document.getElementById('stage'),S=st.getBoundingClientRect();
   const names=['Trò chuyện','Giao hảo','Khiêu khích','Cùng chơi / Thách đấu','Tặng quà','Hỏi han chuyện nhà','Nhờ dò la tin tức','Mời uống trà','Xin chữ','Cùng ngắm hoa','Bàn chuyện cung vụ','Hỏi thăm sức khỏe'];
   const acts=n=>names.slice(0,n).map((x,i)=>({id:'a'+i,n:x,pic:'',word:'Vững',ton:'1 khắc',off:false,why:''}));const out=[];
   for(const n of [1,2,3,4,5,6,7,8,10,12])for(const ax of [.2,.5,.8])for(const side of ['l','r','auto']){kitPick.destroy();const P=kitPick.open({host:st,anchor:{x:Math.round(S.width*ax)-60,y:Math.round(S.height*.25),w:120,h:Math.round(S.height*.7)},side,acts:acts(n)});await sl(30);const Sx=st.getBoundingClientRect();/* live: the stage may shift under the HUD between boards; the post rule is host-relative */
    const pr=P.el.querySelector('.kpk-post').getBoundingClientRect();const R=[...P.el.querySelectorAll('.kpk-n .kpk-b')].map(e=>e.getBoundingClientRect());
    out.push({n,ax,side,post:[Math.round(pr.left-Sx.left),Math.round(pr.top-Sx.top)],cols:P.G.cols,np:R.length,sizes:[...new Set(R.map(r=>Math.round(r.width)+'x'+Math.round(r.height)))].length,
     right:Math.round(Math.max(...R.map(r=>r.right))-Sx.left),out:R.filter(r=>r.left<Sx.left-1||r.right>Sx.right+1||r.top<Sx.top-1||r.bottom>Sx.bottom+1).length,tabs:P.el.querySelectorAll('.kpk-tabs .pct').length,
     colX:[...new Set(R.map(r=>Math.round(r.left-Sx.left)))].sort((a,b)=>a-b),postRight:Math.round(pr.left-Sx.left)>Sx.width*.6})}
   /* result card yield */kitPick.destroy();const P=kitPick.open({host:st,anchor:{x:Math.round(S.width*.3),y:Math.round(S.height*.25),w:120,h:Math.round(S.height*.7)},acts:acts(7)});await sl(50);
   kitResultCard({title:'Thử thẻ kết quả khi bảng thẻ gỗ đang mở',ok:true,rows:[{k:'duoc',label:'Được',items:['Danh +1','Đức +2','Thái hậu: có thiện cảm với ta hơn']},{k:'mat',label:'Mất',items:['Khắc −1']}]});await sl(400);
   const t=document.getElementById('rtoast'),tr=t.getBoundingClientRect(),R=[...P.el.querySelectorAll('.kpk-n .kpk-b,.kpk-post,.kpk-rail')].map(e=>e.getBoundingClientRect());
   const ov=R.reduce((a,q)=>a+Math.max(0,Math.min(tr.right,q.right)-Math.max(tr.left,q.left))*Math.max(0,Math.min(tr.bottom,q.bottom)-Math.max(tr.top,q.top)),0);
   const hv=()=>{const e=document.getElementById('kshR');return e?getComputedStyle(e).visibility:'none'};const card={hudOpen:hv(),ov:Math.round(ov),cardIn:tr.left>=-1&&tr.right<=innerWidth+1,w:Math.round(tr.width)};window.__shot=1;
   return {out,card,hud:{open:card.hudOpen!=='visible',after:null}}});
  if(SHOT){await p.evaluate(()=>{for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&/Chạm để mở/.test(e.textContent)&&!e.contains(document.getElementById('stage')))e.style.display='none'}});await p.waitForTimeout(200)}
  if(SHOT)await p.screenshot({path:`${SHOT}/post-${wh}.png`});
  const card2=await p.evaluate(async()=>{kitPick.destroy();await new Promise(r=>setTimeout(r,200));const t=document.getElementById('rtoast'),h=document.getElementById('kshR');return {ky:t.classList.contains('kres-y'),x:getComputedStyle(t).translate,hud:h?getComputedStyle(h).visibility:'none'}});r.hud.after=card2.hud!=='visible'&&card2.hud!=='none';
  const posts=new Set(r.out.map(o=>o.post.join(',')));const px=r.out.map(o=>o.post[0]),py=r.out.map(o=>o.post[1]);
  chk(wh+' ONE post place (all 72 boards)',Math.max(...px)-Math.min(...px)<=1&&Math.max(...py)-Math.min(...py)<=1,[...posts].slice(0,4));
  chk(wh+' post on the right side',r.out.every(o=>o.postRight),r.out[0].post);
  const C=n=>n>=8?3:n>=5?2:1;chk(wh+' 1–4 = 1 col, 5–7 = 2 cols, 8+ = 3 cols (OD 22:43Z)',r.out.every(o=>o.cols===C(o.n)),r.out.filter(o=>o.cols!==C(o.n)).slice(0,3));
  const rights=new Set(r.out.map(o=>o.right));chk(wh+' band right edge never moves',Math.max(...rights)-Math.min(...rights)<=1,[...rights]);
  chk(wh+' 2nd / 3rd column grows LEFT (cols x-positions, right one = 1-col x)',r.out.every(o=>o.colX.length===o.cols),r.out.filter(o=>o.n===8).map(o=>o.colX)[0]);
  chk(wh+' every plaque inside the stage',r.out.every(o=>!o.out),r.out.filter(o=>o.out).slice(0,3));
  chk(wh+' one plaque size per board',r.out.every(o=>o.sizes===1),r.out.filter(o=>o.sizes!==1).slice(0,2));
  chk(wh+' every act a plaque (8/10/12 → 8/10/12, no cut, OD 22:43Z), no paging tabs',r.out.every(o=>o.np===o.n&&o.tabs===0),r.out.filter(o=>o.np!==o.n||o.tabs)[0]);
  chk(wh+' result card never over the board',r.card.ov===0&&r.card.cardIn,r.card);
  chk(wh+' card restored after close',!card2.ky,card2);
  chk(wh+' stage HUD yields while open, back after',r.hud.open&&!r.hud.after,r.hud);
  chk(wh+' no page errors',errs.length===0,errs.slice(0,3));await p.close()}
 await b.close();console.log(fails?'FAIL '+fails:'PASS');process.exit(fails?1:0)})();
