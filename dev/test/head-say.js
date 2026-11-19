/* K-HEAD-SAY scan (KIT §78.z "say" + §78.y; review/kit-head-say). Every stage (home + every place) × device: two bubbles of one exchange (kitSay) over the figures in view,
   once with SHORT lines and once with LONG lines, plus a cross-sex pair when the stage has a woman and a man. Checks per bubble:
     S1 line   : bottom (= tail tip) ON the speaker's sex line (|Δ| ≤ 1.5 px) unless dataset.raised (last resort, counted)
     S2 alpha  : 0 opaque pixels of ANY figure under the bubble box (never over a head / hair / crown / body)
     S3 overlap: no two bubbles overlap; S4 inside the stage; S5 tail x inside the bubble; S6 no truncation (text scrollHeight fits), ≤ 2 lines or one line
   usage: node dev/test/head-say.js <baseURL> [W H] [jsonOut] · env PLACES=k1,k2 · SHOTS=dir (shots per place) · DPR · REDUCED=1 · HH=1 crowned Hoàng hậu · COOP=1 (COOPW seat b, no errSync) */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,W0,H0,JOUT]=process.argv;const W=+W0||755,H=+H0||1000;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+process.env.DPR||1,hasTouch:true,isMobile:W<900,reducedMotion:process.env.REDUCED?'reduce':'no-preference'});
 if(process.env.HH)await ctx.addInitScript(()=>{window.__HH=1});
 await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1200);
 await p.evaluate(async()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
  document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{OPT.fxon=false}catch(e){}S.buoi=0;used=0;deal();render();
  if(window.__HH){S.pid='consort:c09';S.rank=7;S.age=26;S.out=false;S.srv=null;const o=figTierOf;figTierOf=function(w){return w===S?8:o(w)};try{render()}catch(e){}}
  const st=document.createElement('style');st.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}';document.head.appendChild(st);await new Promise(r=>setTimeout(r,2000))});
 if(process.env.COOP)await p.evaluate(()=>{window.COOPW={on:true,seat:'b'};try{window.errSync=function(){}}catch(e){}});
 const keys=process.env.PLACES?process.env.PLACES.split(','):['home',...await p.evaluate(()=>places().map(x=>x.k))];
 const ALL=[];
 for(const k of keys){
  const R=await p.evaluate(async k=>{const Wt=t=>new Promise(r=>setTimeout(r,t));Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   S.dead=false;S.confined=0;S.place='home';used=0;S.buoi=0;S.sung=60;S.suc=100;try{tab='act'}catch(e){}
   try{goTo(k)}catch(e){}Q.length=0;if(md)md.hidden=true;if(S.place!==k&&k!=='home'){S.place=k;S.visit={k,people:[],talked:false,tk:{},msg:''}}
   try{S.met=S.met||{};for(const v of rivals){S.met[v.id]=0}}catch(e){}
   if(S.visit&&k!=='home'){const P=S.visit.people;if(!P.some(x=>x.kind==='emp'))P.unshift({kind:'emp',name:'Hoàng thượng',ini:'Đế',col:'#f0d070',info:''});
    const q=liveRivals(true).find(v=>v.queen);if(q&&!P.some(x=>x.ref===q))P.splice(1,0,{...rp(q),kind:'hh',name:'Hoàng hậu '+q.name,ini:'Phượng'});
    const L=liveRivals(true).filter(v=>!P.some(x=>x.ref===v)&&!sameHouse(S,v));let i=0;while(P.filter(x=>x.kind!=='chest').length<4&&L[i])P.push(rp(L[i++]))}
   render();await Wt(1500);
   await Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);await Wt(1500);try{kitFigSealAll()}catch(e){}await Wt(400);
   const st=document.getElementById('stage');if(!st)return{k,err:'no stage'};const SR=st.getBoundingClientRect();
   const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
   const box=f=>{const r=f.getBoundingClientRect();let bx=r.left,by=r.top,bw=r.width,bh=r.height;const nw=f.naturalWidth,nh=f.naturalHeight;if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}};
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth&&f.getBoundingClientRect().right>SR.left+4&&f.getBoundingClientRect().left<SR.right-4);
   const ALPHA=[];for(const f of figs){const src=f.currentSrc||f.getAttribute('src');const B=box(f);const im=new Image();im.crossOrigin='anonymous';await new Promise(r=>{im.onload=im.onerror=r;im.src=src});
    let d=null,w=Math.max(1,Math.round(B.bw)),h=Math.max(1,Math.round(B.bh));try{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0,w,h);d=g.getImageData(0,0,w,h).data}catch(e){}ALPHA.push({f,B,w,h,d})}
   const opaqueIn=q=>{let n=0;for(const A of ALPHA){if(!A.d)continue;const x0=Math.max(0,Math.floor(q.left-A.B.bx)),x1=Math.min(A.w-1,Math.ceil(q.right-A.B.bx)),y0=Math.max(0,Math.floor(q.top-A.B.by)),y1=Math.min(A.h-1,Math.ceil(q.bottom-A.B.by));
     for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(A.d[(y*A.w+x)*4+3]>40)n++}return n};
   const cxOf=f=>{const src=f.currentSrc||f.getAttribute('src');const bb=kitFigBody(src)||{l:0,r:1};const B=box(f);const c=bb.cl!=null&&bb.cr>bb.cl?(bb.cl+bb.cr)/2:(bb.l+bb.r)/2;return B.bx+B.bw*c};
   const sorted=figs.slice().sort((a,b)=>cxOf(a)-cxOf(b));const sexOf=f=>kitBadgeSex(f);
   const SHORT=['Chủ tử về rồi!','Nương nương an khang.'],LONG=['Gió thu hiu hắt, nương nương nhớ thêm áo ấm kẻo cảm lạnh, nô tì dọn trà gừng.','Nghe nói đêm qua Hoàng thượng lại ngự cung Quý phi, trong cung bàn tán không dứt.'];
   const pairs=[];if(sorted.length>=2){pairs.push(['adjacent',sorted[0],sorted[1]]);const mid=Math.floor(sorted.length/2);if(sorted.length>=3)pairs.push(['middle',sorted[mid-1],sorted[mid]]);
    const w=sorted.find(f=>sexOf(f)==='f'),m=sorted.find(f=>sexOf(f)==='m');if(w&&m)pairs.push(['cross-sex',w,m]);if(sorted.length>=2)pairs.push(['ends',sorted[0],sorted[sorted.length-1]])}
   const res=[];
   for(const [pn,A,B2] of pairs)for(const [tn,T] of [['short',SHORT],['long',LONG]]){
    kitSayClear(st);const fresh=()=>{const s2=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth).sort((a,b)=>cxOf(a)-cxOf(b));return s2};const F=fresh();const ia=sorted.indexOf(A),ib=sorted.indexOf(B2);const A1=F[ia]||A,B1=F[ib]||B2;const h1=kitSay(st,A1,T[0]);const h2=kitSay(st,B1,T[1]);await Wt(600);try{kitSayAll()}catch(e){}await Wt(300);
    const hs=[h1,h2];const rows=[];
    hs.forEach((h,i)=>{const sp=i?B2:A;if(!h||!h.el.isConnected){rows.push({i,pair:pn,len:tn,dropped:true,why:window.__kitSayWhy});return}const q=h.el.getBoundingClientRect(),L=kitMarkLine(st,sexOf(sp)),t=h.el.firstChild,tr=t.getBoundingClientRect();
     const tx=parseFloat(h.el.style.getPropertyValue('--ksay-tx'));const lh=parseFloat(getComputedStyle(t).lineHeight)||0;
     rows.push({i,pair:pn,len:tn,dropped:false,left:+q.left.toFixed(1),right:+q.right.toFixed(1),top:+q.top.toFixed(1),bottom:+q.bottom.toFixed(1),w:+q.width.toFixed(1),dLine:+(q.bottom-L.bottom).toFixed(2),raised:h.el.dataset.raised==='1',
      alpha:opaqueIn(q),inside:q.left>=SR.left-.5&&q.right<=SR.right+.5&&q.top>=SR.top-.5&&q.bottom<=SR.bottom+.5,tailIn:tx>=0&&tx<=q.width,trunc:t.scrollHeight>t.clientHeight+1||t.scrollWidth>t.clientWidth+1,
      lines:Math.round((tr.height-2*.37*parseFloat(getComputedStyle(t).fontSize))/(lh||1)),fs:getComputedStyle(t).fontSize,nm:i?'B':'A',why:q.width===0?JSON.stringify(window.__kitSayWhy):undefined})});
    if(!hs[0]||!hs[1]){}else{const a=hs[0].el.getBoundingClientRect(),b2=hs[1].el.getBoundingClientRect();const ov=!(a.right<=b2.left||b2.right<=a.left||a.bottom<=b2.top||b2.bottom<=a.top);rows.forEach(r=>r.overlap=ov)}
    if(window.__shotKey!==undefined){}
    res.push({pair:pn,len:tn,rows});
    window.__lastSay=(window.__lastSay||{});window.__lastSay[pn+'/'+tn]=1;
    if(window.__wantShot&&window.__wantShot===pn+'/'+tn)window.__shotReady=1}
   return{k,n:figs.length,res,SR:{w:Math.round(SR.width),h:Math.round(SR.height)}}},k);
  ALL.push(R);
  if(process.env.SHOTS&&R.res){fs.mkdirSync(process.env.SHOTS,{recursive:true});
   for(const [pn,tn] of [['adjacent','long'],['cross-sex','short'],['middle','long']]){const ok=await p.evaluate(([pn,tn])=>{const st=document.getElementById('stage');if(!st)return false;kitSayClear(st);return true},[pn,tn]);if(!ok)continue;
    await p.evaluate(async([pn,tn])=>{const Wt=t=>new Promise(r=>setTimeout(r,t));const st=document.getElementById('stage');const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
     const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis);const cx=f=>f.getBoundingClientRect().left+f.getBoundingClientRect().width/2;const s=figs.slice().sort((a,b)=>cx(a)-cx(b));if(s.length<2)return;
     const SHORT=['Chủ tử về rồi!','Nương nương an khang.'],LONG=['Gió thu hiu hắt, nương nương nhớ thêm áo ấm kẻo cảm lạnh, nô tì dọn trà gừng.','Nghe nói đêm qua Hoàng thượng lại ngự cung Quý phi, trong cung bàn tán không dứt.'];
     const T=tn==='short'?SHORT:LONG;let A=s[0],B=s[1];if(pn==='middle'&&s.length>=3){const m=Math.floor(s.length/2);A=s[m-1];B=s[m]}if(pn==='cross-sex'){const w=s.find(f=>kitBadgeSex(f)==='f'),m=s.find(f=>kitBadgeSex(f)==='m');if(w&&m){A=w;B=m}}
     kitSay(st,A,T[0]);kitSay(st,B,T[1]);await Wt(700)},[pn,tn]);
    await sleep(300);await p.screenshot({path:`${process.env.SHOTS}/say-${W}x${H}-${k}-${pn}-${tn}.png`})}}
 }
 let bad=0,tot=0,dropped=0,raised=0;const fails=[];
 for(const R of ALL){if(!R.res)continue;for(const g of R.res)for(const r of g.rows){tot++;if(r.dropped){dropped++;continue}if(r.raised)raised++;const f=[];if(!r.raised&&Math.abs(r.dLine)>1.5)f.push('S1 line '+r.dLine);if(r.alpha)f.push('S2 alpha '+r.alpha);if(r.overlap)f.push('S3 overlap');if(!r.inside)f.push('S4 outside');if(!r.tailIn)f.push('S5 tail');if(r.trunc)f.push('S6 trunc');if(r.lines>2&&r.lines!==1&&r.lines>2)f.push('S6 lines '+r.lines);
   if(f.length){bad++;fails.push(`${R.k} ${g.pair}/${g.len}/${r.nm}: ${f.join(', ')}`)}}}
 console.log(`${W}x${H}: stages ${ALL.length} · bubbles ${tot} · dropped(no room) ${dropped} · raised(last resort) ${raised} · FAIL ${bad} · page errors ${errs.length}`);fails.slice(0,40).forEach(x=>console.log('  FAIL '+x));errs.slice(0,5).forEach(e=>console.log('  ERR '+e));
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify({ALL,errs}));
 console.log(bad||errs.length?'FAIL':'PASS');await b.close();process.exit(bad||errs.length?1:0)})();
