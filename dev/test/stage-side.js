/* review/stage-side (owner 16/11): (a) the stage side info (#kshR) is ONE narrow vertical column at the stage's right edge on every viewport —
   never 2 columns, never over a figure / name, never cut text, scrolls inside itself when too tall; (b) fixed slots in the free width
   (stage minus that column): 1 → centre, 2 → 1/3·2/3, 3 → 1/4·2/4·3/4, more → pages; name tags never overlap; (c) the top bar layout
   (one-row / two-row) is fixed per viewport: a dialog opening/closing or longer header text never flips it.
   usage: node dev/test/stage-side.js <url> <tag> <outdir>   (prints one line per viewport×case, PASS/FAIL; shots of the stage) */
const {chromium}=require('playwright');const [,,URL,TAG,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=(process.env.VPS||'1180x820,1366x1024,1000x755,844x390,755x1000').split(',').map(s=>s.split('x').map(Number));
const CASES=(process.env.CASES||'n1:0,n2:1,n3:2,n5:4').split(',').map(s=>s.split(':'));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,hasTouch:true});
 await ctx.addInitScript(()=>{window.__bot=1});/* no first-run download screen */
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(300000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:300000});
 for(let i=0;i<300&&!(await p.evaluate(()=>typeof start==='function'&&typeof j59lay==='function').catch(()=>false));i++)await sleep(500);
 await p.evaluate(()=>{delete window.__bot;window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()});
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 await sleep(2000);let bad=0;
 for(const [W,H] of VPS){await p.setViewportSize({width:W,height:H});await sleep(1500);
  for(const [name,nr] of CASES){
   await p.evaluate(async(nr)=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.dead=false;S.confined=0;const k='vuon';
    S.where=S.where||{};const Wh=S.where;for(const v of rivals)if(Wh[v.id]===k)Wh[v.id]="r"+v.id;Wh.emp="tn";S.menW={};S.minW={};
    liveRivals(true).slice(0,+nr).forEach(v=>Wh[v.id]=k);S.place="home";used=0;tab="act";goTo(k);await new Promise(r=>setTimeout(r,2500));
    for(let i=0;i<60&&[...document.querySelectorAll('#mefig,#tokens img.figimg')].some(im=>!im.complete||!im.naturalWidth);i++)await new Promise(r=>setTimeout(r,500));try{j59lay()}catch(e){}await new Promise(r=>setTimeout(r,500));
    const R=document.getElementById('kshR');if(R)R.dataset.full='';k3Stage();await new Promise(r=>setTimeout(r,1200))},nr);
   const r=await p.evaluate(()=>{const st=document.getElementById('stage'),S0=st.getBoundingClientRect(),R=document.getElementById('kshR');const q=R&&!R.hidden?R.getBoundingClientRect():null;
    const vis=e=>e&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>2;
    const o={stageW:Math.round(S0.width),stageH:Math.round(S0.height)};
    if(q){const items=[...R.querySelectorAll('.k3c,.k3p')].filter(vis);o.colW=Math.round(q.width);o.cols=new Set(items.map(e=>Math.round(e.getBoundingClientRect().left/4))).size;
     o.cut=[...R.querySelectorAll('.k3l,.k3r>b,.k3ct>b,.k3ct>span,.k3v')].filter(e=>vis(e)&&(e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>q.right+.5||e.getBoundingClientRect().left<q.left-.5)).map(e=>e.textContent.trim());
     o.inStage=q.right<=S0.right+1&&q.bottom<=S0.bottom+1;o.scroll=R.scrollHeight>R.clientHeight+1}
    const hit=(f,g)=>Math.min(f.right,g.right)-Math.max(f.left,g.left)>1&&Math.min(f.bottom,g.bottom)-Math.max(f.top,g.top)>1;
    const figs=[...document.querySelectorAll('#mefig,#tokens .tok img.figimg')].filter(vis).map(im=>{const bb=kitFigBody(im.getAttribute('src'))||{l:0,r:1};const z=im.getBoundingClientRect();const l=bb.cl!=null?bb.cl:bb.l,rr=bb.cr!=null?bb.cr:bb.r;return{left:z.left+z.width*l,right:z.left+z.width*rr,top:z.top+z.height*(bb.t||0),bottom:z.top+z.height*(bb.b||1),cx:z.left+z.width*(l+rr)/2-S0.left}});
    const tags=[...document.querySelectorAll('#tokens .tok .tag,#j59metag .tag')].filter(vis).map(e=>e.getBoundingClientRect()).sort((a,b)=>a.left-b.left);
    o.figHit=q?figs.filter(f=>hit(f,q)).length:0;o.tagHit=q?tags.filter(t=>hit(t,q)).length:0;
    o.tagOv=0;for(let i=1;i<tags.length;i++)if(tags[i].left<tags[i-1].right+2&&Math.abs(tags[i].top-tags[i-1].top)<20)o.tagOv++;
    o.n=figs.length;if(st.dataset.j59dbg)o.dbg=st.dataset.j59dbg;o.cx=figs.map(f=>Math.round(f.cx)).sort((a,b)=>a-b);o.pg=st.dataset.j59pg||'';
    const fr=(st.dataset.j59free||'').split(',').map(Number);if(fr.length===2){o.free=fr.map(Math.round);const k=figs.length;o.want=[...Array(k)].map((_,i)=>Math.round(fr[0]+fr[1]*(i+1)/(k+1)));o.slotErr=Math.max(0,...o.cx.map((c,i)=>Math.abs(c-o.want[i])))}
    const hd=document.querySelector('header.hud');o.hd2=hd.classList.contains('khd2');o.hdH=Math.round(hd.getBoundingClientRect().height);return o});
   /* the header must not flip: open a dialog, re-render with longer header text, close */
   const flip=await p.evaluate(async()=>{const hd=document.querySelector('header.hud');const a=hd.classList.contains('khd2');const seen=new Set([a]);
    Q.push({t:'Thử',h:'<p>Thử</p>'});showModal();await new Promise(r=>setTimeout(r,400));render();seen.add(hd.classList.contains('khd2'));
    const tt=document.getElementById('k3tt');if(tt){tt.insertAdjacentHTML('beforeend','<span class="k3r xlong">Y phục hợp phẩm · trang điểm vừa · Y phục hợp phẩm</span>');await new Promise(r=>setTimeout(r,300));seen.add(hd.classList.contains('khd2'));tt.querySelector('.xlong').remove()}
    Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();await new Promise(r=>setTimeout(r,300));seen.add(hd.classList.contains('khd2'));return seen.size>1});
   r.hdFlip=flip;
   const ok=r.cols===1&&!(r.cut||[]).length&&!r.figHit&&!r.tagHit&&!r.tagOv&&r.inStage!==false&&!flip&&(r.slotErr==null||r.slotErr<=3);if(!ok)bad++;
   const sb=await p.evaluate(()=>{const s=document.getElementById('stage').getBoundingClientRect();return{x:s.x,y:s.y,width:s.width,height:s.height}});
   if(process.env.SHOTS!=='0'&&(name==='n2'||process.env.SHOTS==='all'))await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}-${name}.jpg`,type:'jpeg',quality:55,clip:{x:0,y:0,width:W,height:Math.min(H,sb.y+sb.height)}});
   console.log(ok?'PASS':'FAIL',TAG,W+'x'+H,name,JSON.stringify(r))}}
 console.log('errs',JSON.stringify(errs.slice(0,5)),'bad',bad);await b.close()})();
