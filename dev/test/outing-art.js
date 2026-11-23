/* review/outing-art (KP23): the outing backdrops img/outing-{chua-ho-quoc,ngu-uyen-ngoai}-{port,land}.webp are read by the dialog picture (jevban kitOutingKey/Src).
   Checks: (1) key table — every dialog title/body that is an outing → its place, every mention that is NOT (chat, message, task, festival banner) → none;
   (2) port on kv1 (phone), land on kv2 (iPad), (3) real dialogs open with that picture, other dialogs unchanged, (4) the old fallback when the picture is not in the CDN index,
   (5) no page error.   usage: node dev/test/outing-art.js [shotsDir]   (serves dev/ itself; needs the dev/index.html build)  */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path'),fs=require('fs');
const SH=process.argv[2];if(SH)fs.mkdirSync(SH,{recursive:true});
const px=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
let fail=0;const ck=(n,ok,i)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(i!=null?' · '+JSON.stringify(i).slice(0,300):''))};
const CASES=[ /* [title, body, expected key] — titles/bodies copied from the game sources */
 ["Chùa Hộ Quốc cầu an","Thái hậu muốn có người thay bà lên chùa Hộ Quốc cầu an bảy ngày.","chua-ho-quoc"],
 ["Gặp ở chùa Hộ Quốc","Ngươi xin lên chùa Hộ Quốc cầu an cho Thái hậu.","chua-ho-quoc"],
 ["Gặp nhau ở chùa Hộ Quốc","Ngày rằm, các nhà mang thù gặp nhau ở chùa Hộ Quốc, qua người của ngươi.","chua-ho-quoc"],
 ["Gặp lại người xưa","Ngươi gặp lại Lục Tử Minh ở chùa Hộ Quốc. Chàng lặng lẽ trao cho ngươi một vật.","chua-ho-quoc"],
 ["Tiết Trùng cửu","Tiết Trùng cửu, Hoàng thượng lên Cảnh Sơn ngắm cúc, uống rượu thù du.","ngu-uyen-ngoai"],
 ["Thái hậu sửa chùa","Thái hậu muốn trùng tu chùa Hộ Quốc, Hộ bộ than thiếu bạc.",""],
 ["Một lời nhắn của Lâm Khải","Lâm Khải nhắn: hắn đang ở chùa Hộ Quốc với bản sao cuối.",""],
 ["Bà nghe tin từ người khác","Thái hậu đã nghe chuyện ngươi lên chùa Hộ Quốc, nhưng không phải từ ngươi.",""],
 ["Chép thêm bộ kinh cho chùa Hộ Quốc","Bộ kinh lần trước ai gia cho đặt trên bàn thờ.",""],
 ["Chỗ giấu người","Muốn giữ con dao sống phải có chỗ giấu: trang trại ngoại thành, hay chùa Hộ Quốc.",""],
 ["Tiết Thanh minh","Tiết Thanh minh, các cung tảo mộ, cúng tổ tiên.",""],
 ["Thị tẩm","Đêm nay Hoàng thượng lật thẻ bài.",""]];
(async()=>{const srv=await D.serveRoot(path.join(__dirname,'..'));const b=await chromium.launch(px);
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
  await D.openDirect(p,srv.url+'index.html');await p.waitForTimeout(2500);
  await p.waitForFunction(()=>typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE&&KIT_CDNHAVE.size>0,null,{timeout:60000}).catch(()=>{});
  const ori=await p.evaluate(()=>kitFullOri());ck(dev+' orientation '+ori,ori===(dev==='fold'?'port':'land'));
  const r=await p.evaluate(C=>{const out=C.map(([t,h,e])=>({t,e,k:kitOutingKey({t,h})}));
   const src=["chua-ho-quoc","ngu-uyen-ngoai"].map(k=>kitOutingSrc(k));
   const own=[{t:"Chùa Hộ Quốc cầu an",h:"x",art:"img/a.webp"},{t:"Chùa Hộ Quốc cầu an",h:"x",headArt:{src:"a"}},{t:"Gặp ở chùa Hộ Quốc",h:"x",placeK:"vuon"}].map(m=>kitOutingKey(m));
   const live=KIT_CDNHAVE&&KIT_CDNHAVE.has("img/outing-chua-ho-quoc-"+kitFullOri()+".webp");
   /* not in the CDN index → no outing picture, the old chain answers (never throws) */
   const h=KIT_CDNHAVE;KIT_CDNHAVE=new Set();const off=kitOutingSrc("chua-ho-quoc");const a0=kitEvArt({t:"Gặp ở chùa Hộ Quốc",h:"x"});KIT_CDNHAVE=h;
   return{out,src,own,live,off,offArt:a0&&a0.src||null}},CASES);
  ck(dev+' CDN index lists the outing pictures',r.live);
  r.out.forEach(o=>ck(dev+' key "'+o.t+'" → '+(o.e||'none'),o.k===o.e,o.k));
  ck(dev+' src port/land by device',r.src.every((s,i)=>s.endsWith(`img/outing-${["chua-ho-quoc","ngu-uyen-ngoai"][i]}-${ori}.webp`)),r.src);
  ck(dev+' own picture / headArt / place card untouched',r.own.every(k=>k===""),r.own);
  ck(dev+' not in the CDN index → fallback, no outing picture',r.off===""&&!/outing-/.test(r.offArt||''),[r.off,r.offArt]);
  /* real dialogs on a started game */
  const started=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}{const t=document.getElementById("title");t.hidden=true;t.style.display="none"}for(let i=0;i<8;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
   try{const m=document.getElementById("modal");if(m)m.hidden=true;Q.length=0;S.buoi=0;render()}catch(e){}return !!(typeof S==='object'&&S&&S.name&&!isSrv())});
  await p.addStyleTag({content:'#kroul,#kload,#klife,#title{display:none!important}'});
  if(started){
   const shots=[["chua","Gặp ở chùa Hộ Quốc","<p>Ngươi xin lên chùa Hộ Quốc cầu an cho Thái hậu. Ngày rằm, khách quyền quý chen nhau trước bậc đá.</p>"],
                ["ngoai",null,null],["plain","Thị tẩm","<p>Đêm nay Hoàng thượng lật thẻ bài của ngươi.</p>"]];
   for(const [nm,t,h] of shots){
    const got=await p.evaluate(async([nm,t,h])=>{Q.length=0;{const M=document.getElementById("modal");kitBackdrop(M,null);delete M.dataset.kreborn;M.querySelectorAll(".kroul,#kroul").forEach(e=>e.remove())}
     if(nm==="ngoai"){S.month=9;S.seen={};try{const d=mkEv("trungcuu");pushDil(d,"Tiết Trùng cửu")}catch(e){return{err:e.message}}}
     else pushModal({t,h,who:pEmp(),opts:[{n:"Tiếp",fx:{}}]});
     {const M=document.getElementById('modal');M.hidden=false;M.style.removeProperty('display')}showModal&&showModal();await new Promise(r=>setTimeout(r,4000));
     const img=[...document.querySelectorAll("#mb img")].find(i=>/img\/outing-/.test(i.src));const r=img&&img.getBoundingClientRect();
     return{src:img&&(img.currentSrc||img.src)||"",cls:(document.querySelector('#mb')||{}).className,kinds:[...document.querySelectorAll('#mb img')].map(i=>i.src.slice(-40)).join('|'),w:r&&Math.round(r.width),h:r&&Math.round(r.height),text:(document.querySelector("#mb")||{}).innerText?.slice(0,60)}},[nm,t,h]);
    const want=nm==="plain"?null:new RegExp(`outing-${nm==="chua"?"chua-ho-quoc":"ngu-uyen-ngoai"}-${ori}\\.webp`);
    ck(dev+' dialog '+nm+' picture '+(want?'= outing '+ori:'is not an outing'),want?want.test(got.src):!/outing-/.test(got.src),got);
    if(process.env.DBG)console.log(await p.evaluate(()=>{const o=[];let e=document.elementFromPoint(innerWidth/2,innerHeight/2);while(e&&o.length<8){o.push(e.tagName+'#'+e.id+'.'+String(e.className).slice(0,40)+' hid='+e.hidden+' d='+getComputedStyle(e).display);e=e.parentElement}return o}));
    if(SH)await p.screenshot({path:path.join(SH,`${dev}-${nm}.png`)});
    await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
   }
  }else ck(dev+' game started',false);
  ck(dev+' no page errors',perr.length===0,perr);await ctx.close()}
 await b.close();srv.close();console.log(fail?'FAIL '+fail:'ALL OK');process.exit(fail?1:0)})();
