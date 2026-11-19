/* K-HEAD-SAY HOST-MODE shots (real device profiles, built index.html through rot.js; KIT §78.z "say"). LIFE=consort|servant (servant = S.srv via srvInit: the servant-road life, errSync idle) ·
   usage: node dev/test/head-say-host.js <outDir> <device:W×H list e.g. fold,ipadAir,ipadPro,pixel:412x1058,iphone14> ; prints per-bubble facts (line Δ, overlap, inside, alpha-free check is head-say.js) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const out=process.argv[2]||'/tmp/hs-host';fs.mkdirSync(out,{recursive:true});
const devs=(process.argv[3]||'fold,ipadAir,ipadPro,pixel:412x1058,iphone14').split(',');const LIFE=process.env.LIFE||'consort';const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 for(const d of devs){const [nm,vp]=d.split(':');const extra={};if(vp){const [w,h]=vp.split('x');extra.viewport={width:+w,height:+h}}
  const ctx=await D.newDeviceContext(b,nm,extra);await ctx.addInitScript(()=>{let a=0x2f6e2b1;Math.random=function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}});
  const p=await ctx.newPage();p.setDefaultTimeout(200000);const errs=[];p.on('pageerror',e=>errs.push(e.message));const g=await D.openHost(p,srv.url);
  for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')break;await sleep(250)}
  await sleep(1200);
  const R=await g.evaluate(async life=>{const Wt=t=>new Promise(r=>setTimeout(r,t));SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;
   document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());try{OPT.fxon=false}catch(e){}S.buoi=0;used=0;deal();render();
   const st0=document.createElement('style');st0.textContent='#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn{display:none!important}';document.head.appendChild(st0);await Wt(1500);
   if(life==='servant'){S.srv=null;srvInit();S.dead=false;render();await Wt(1200)}
   const place=life==='servant'?'home':'vuon';try{goTo(place)}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   if(life!=='servant'&&S.visit){const P=S.visit.people;if(!P.some(x=>x.kind==='emp'))P.unshift({kind:'emp',name:'Hoàng thượng',ini:'Đế',col:'#f0d070',info:''});const L=liveRivals(true).filter(v=>!P.some(x=>x.ref===v)&&!sameHouse(S,v));let i=0;while(P.filter(x=>x.kind!=='chest').length<4&&L[i])P.push(rp(L[i++]))}
   render();await Wt(1500);await Promise.race([Promise.all([...document.querySelectorAll('#stage img')].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r}))),Wt(9000)]);await Wt(1500);try{kitFigSealAll()}catch(e){}await Wt(500);
   const st=document.getElementById('stage');const vis=e=>e&&e.offsetParent!==null&&e.getClientRects().length&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.j59off');
   const figs=[...document.querySelectorAll('#mefig,#tokens .tok.fig img.figimg')].filter(vis).filter(f=>f.naturalWidth);const cx=f=>f.getBoundingClientRect().left;const s=figs.sort((a,b)=>cx(a)-cx(b));
   const info={life,place:S.place,srv:!!S.srv,adSrv:typeof adSrv==='function'&&adSrv(),errSyncRan:!!document.querySelector('.kmerr-lay'),figs:s.length,hosts:[]};
   if(s.length<2)return info;
   const T=['Chủ tử về rồi, chào mừng chủ tử hồi cung!','Gió thu hiu hắt, nương nương nhớ thêm áo ấm kẻo cảm lạnh.'];const h1=kitSay(st,s[0],T[0]),h2=kitSay(st,s[1],T[1]);await Wt(800);
   info.bubbles=[h1,h2].map(h=>{if(!h||!h.el.isConnected)return null;const q=h.el.getBoundingClientRect(),SR=st.getBoundingClientRect(),sp=h===h1?s[0]:s[1],L=kitMarkLine(st,kitBadgeSex(sp));return{l:+q.left.toFixed(0),r:+q.right.toFixed(0),t:+q.top.toFixed(0),b:+q.bottom.toFixed(0),dLine:+(q.bottom-L.bottom).toFixed(1),inside:q.left>=SR.left-.5&&q.right<=SR.right+.5&&q.top>=SR.top-.5,raised:h.el.dataset.raised==='1',fs:getComputedStyle(h.el.firstChild).fontSize}});
   const [a,c]=[h1,h2].map(h=>h&&h.el.isConnected&&h.el.getBoundingClientRect());info.overlap=!!(a&&c&&!(a.right<=c.left||c.right<=a.left||a.bottom<=c.top||c.bottom<=a.top));info.layer=!!st.querySelector(':scope>.ksay-lay');info.seals=[...st.querySelectorAll('img.kfseal,#kshR,#kshL')].map(e=>{const r=e.getBoundingClientRect();return[e.id||e.className.slice(0,12),+r.left.toFixed(0),+r.right.toFixed(0),+r.top.toFixed(0),+r.bottom.toFixed(0),e.offsetHeight,getComputedStyle(e).visibility]});return info},LIFE);
  console.log(nm+(vp?':'+vp:''),JSON.stringify(R),'errs',errs.length,errs.slice(0,2).join(' | '));
  await sleep(300);await p.screenshot({path:`${out}/say-host-${LIFE}-${nm}${vp?'-'+vp:''}.png`});await ctx.close()}
 await b.close();srv.close()})();
