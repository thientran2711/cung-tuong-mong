/* review/gift-pick: storyboard of the gift moment (KIT §68 kitFxGiftCarry) — each phase drawn with the real kitFxObj pictures at the
   positions kitFxGiftCarry uses, one screenshot per phase (the loaded test box is too slow for a live video).
   usage: node dev/test/gift-pick-board.js <url> <outdir> [WxH] [fxdir: local copies of img/fx/*.webp to serve instead of the CDN] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,BASE,OUT,SZ,FX]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const p=await b.newPage({viewport:{width:W,height:H}});await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 if(FX)await p.route('**/img/fx/*.webp',r=>{const f=path.join(FX,path.basename(new URL(r.request().url()).pathname));fs.existsSync(f)?r.fulfill({path:f,contentType:'image/webp',headers:{'access-control-allow-origin':'*'}}):r.continue()});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitFxObj==='function');await p.waitForTimeout(1500);
 await p.waitForFunction(()=>typeof nlFigsReady!=='function'||nlFigsReady(),null,{timeout:30000}).catch(()=>{});
 await p.evaluate(()=>{try{kitRoulette=function(){}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(typeof S!=='undefined'&&S)break}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S,null,{timeout:30000});await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await p.waitForTimeout(1500);
 /* the same geometry as kitFxGiftCarry */
 const phases=['1-into-box','2-closed','3-carried','4-arrive-untie','5-open','6-refuse-setdown','7-silk'];
 for(const ph of phases){await p.evaluate(ph=>{kitFxClear();const bs=Math.min(130,innerWidth*.24),hs=Math.min(250,innerWidth*.42,innerHeight*.5),s={x:innerWidth/2,y:innerHeight-bs*.75},hy=y=>y+hs*.17;
   const t={x:innerWidth*.62,y:innerHeight*.34};const item=kipItem({k:"tramngoc"}).src;const O=(n,f,at,sz)=>{const h=kitFxObj(n,f,at,{size:sz});h.el.classList.add("on");return h};
   if(ph==='1-into-box'){O("gift",1,s,bs);const d=document.createElement('div');d.className='kfxk kfxk-o on';const z=Math.min(96,bs*.8);d.style.cssText+=`;left:0;top:0;width:${z}px;height:${z}px;background-image:url("${item}");transform:translate(${s.x-z/2}px,${s.y-z*.7-40}px) scale(.85)`;document.body.appendChild(d)}
   if(ph==='2-closed')O("gift",0,s,bs);
   if(ph==='3-carried')O("gift-hands",0,{x:(s.x+t.x)/2,y:hy((s.y+t.y)/2)},hs);
   if(ph==='4-arrive-untie'){O("gift-hands",1,{x:t.x,y:hy(t.y)},hs);const r=O("gift",3,{x:t.x+hs*.25,y:t.y},bs*.8);r.el.style.transform+=' rotate(30deg)'}
   if(ph==='5-open'){O("gift",1,t,bs);kitFxBurst("glowburst",t,1,{scale:bs/150,a0:.85});kitFxBurst("spark",t,12,{up:1})}
   if(ph==='6-refuse-setdown')O("gift-hands",1,{x:t.x,y:hy(t.y)+hs*.12},hs);
   if(ph==='7-silk')O("gift-hands",2,{x:t.x,y:hy(t.y)},hs)},ph);
  await p.waitForFunction(()=>[...document.querySelectorAll('.kfxk-o')].every(d=>{const u=(d.style.backgroundImage.match(/url\("(.*)"\)/)||[])[1];if(!u)return true;const i=new Image();i.src=u;return i.complete}),null,{timeout:60000}).catch(()=>{});
  await p.waitForTimeout(ph==='5-open'?700:300);await p.screenshot({path:`${OUT}/${W}x${H}-${ph}.jpg`,type:'jpeg',quality:70})}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
