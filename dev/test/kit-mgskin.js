/* kit-mgskin (KIT §MG-SKIN, review/kit-mgskin; owner OD 23/11 ~23:05Z real: mini-game visual skins) — node dev/test/kit-mgskin.js [dev/index.html] [outdir]
   The «skin» slot of the shared mini-game frame (kg82Open / kg82Canvas, j82) = {id, name, pal}: board + piece pictures (one resolver kg82SkinSrc) + the button palette (data-mgpal, j79 CSS).
   Checks on Fold 755x1000 + iPad 1180x820:
   (a) default = today: no skin → data-mgpal "son", KG82.skin.id "", the frame's main button has the SAME colours as a .kbtn outside the frame, pictures resolve to img/kit/mg-<n>.webp;
   (b) every palette of KG82_PAL (≥4 besides son) on the real rules screen (playArt, picked through KG82.preSkin and through kg82Open({skin})): data-mgpal set, main button ground
       = the palette (differs from son), text contrast ≥ 4.5:1 on BOTH gradient stops, board-button rim ≥ 3:1 on the kit card, every button inside the viewport and its text not cut;
   (c) palette colours are kit tokens only: each --mgp-a equals a §1.1 theme token / the .kbtn lacquer (resolved rgb);
   (d) pictures: kitMgSkinAdd + kg82SkinSrc — bg <kind>-bg / -bg-hoc → img/mg/<kind>-<id>.webp, sprite → img/mg/<name>-<id>.webp; a file missing from the CDN index → default art;
       kg82Img of an unpainted skin falls back to the default picture on load error (naturalWidth > 0); kitBoardBg follows the skin only when the index lists the file;
   (e) kg82Close resets the skin (the next frame opened without a skin is default); kitMgPal() returns the open palette.
   Shots: <outdir>/mgskin-<dev>.png = the 5 palettes side by side (rules screen of «Đàn»). */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kg82Open==='function'&&typeof playArt==='function'&&typeof start==='function'&&typeof kitMgSkinAdd==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
   /* the opening reward overlay (#kmrew, «Rương đồ khuê các») would cover the frame in the shots */setInterval(()=>{const k=document.getElementById('kmrew');if(k)k.remove()},100);
   /* colour helpers in page: resolve a CSS colour expression inside #kg82 to [r,g,b] */
   window.__rgb=(expr,host)=>{const h=host||document.getElementById('kg82')||document.body;const e=document.createElement('i');e.style.cssText='position:absolute;width:1px;height:1px;background-color:'+expr;h.appendChild(e);const c=getComputedStyle(e).backgroundColor;e.remove();
    let m=c.match(/rgba?\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/);if(m)return[+m[1],+m[2],+m[3]];m=c.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)/);if(m)return[+m[1]*255,+m[2]*255,+m[3]*255];return null};
   window.__lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
   window.__cr=(a,c)=>{const x=__lum(a),y=__lum(c);return Math.round((Math.max(x,y)+.05)/(Math.min(x,y)+.05)*100)/100};
   window.__btns=()=>{const d=document.getElementById('kg82');return[...d.querySelectorAll('button.kbtn,button.kgbtn,button.kquick,.kgbox .btn')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0})}});
  /* (a) default */
  const A=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kg82Close()}catch(e){}playArt({art:'Đàn',onDone:()=>{}});await sleep(700);const d=document.getElementById('kg82');
   const ref=document.createElement('button');ref.className='kbtn';ref.textContent='x';document.body.appendChild(ref);const rs=getComputedStyle(ref),rb=rs.backgroundImage,rc=rs.color;ref.remove();
   const main=__btns().find(e=>e.classList.contains('kbtn')&&!e.classList.contains('alt'));const ms=main?getComputedStyle(main):null;
   return{pal:d&&d.dataset.mgpal,id:KG82.skin.id,same:!!ms&&ms.backgroundImage===rb&&ms.color===rc,src:kg82SkinSrc('dan-bg').replace(/^.*?(?=img\/)/,''),spr:kg82SkinSrc('dan-blossom').replace(/^.*?(?=img\/)/,''),main:!!main}});
  ok(A.pal==='son'&&A.id==='',`${tag} (a) default skin = son, no id`,A);ok(A.main&&A.same,`${tag} (a) default main button = today's .kbtn look`);
  ok(A.src==='img/kit/mg-dan-bg.webp'&&A.spr==='img/kit/mg-dan-blossom.webp',`${tag} (a) default pictures = img/kit/mg-<n>.webp`,[A.src,A.spr]);
  /* (b) + (c) every palette */
  const P=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out=[];
   const tok=['--bg','--panel','--panel2','--ink','--dim','--gold','--line','--good','--bad','--red','--jade','--peony','--k-seal','--k-card','--k-card2','--k-hair','--k-lab'].map(k=>__rgb('var('+k+')',document.body)).concat([[176,64,44]]).map(c=>c.map(Math.round).join(','));
   for(const [i,pal] of KG82_PAL.entries()){try{kg82Close()}catch(e){}
    if(i%2){KG82.preSkin=pal;playArt({art:'Đàn',onDone:()=>{}})}else{kg82Open({art:'Đàn',title:'Thử',how:'Chạm đúng dây.',kind:'dan',skin:pal});const box=kg82Box();box.innerHTML='<div class="kg82act"><button class="kbtn">Sẵn sàng</button><button class="kbtn alt">Lui</button></div><div class="kg82act"><button class="kgbtn">Cung</button><button class="kgbtn">Thương</button><button class="kgbtn">Giốc</button></div>'}
    await sleep(600);const d=document.getElementById('kg82');const a=__rgb('var(--mgp-a)'),bb=__rgb('var(--mgp-b)'),ink=__rgb('var(--mgp-ink)'),rim=__rgb('var(--mgp-rim)'),card=__rgb('var(--k-card)');
    const bs=__btns(),main=bs.find(e=>e.classList.contains('kbtn')&&!e.classList.contains('alt')),alt=bs.find(e=>e.classList.contains('kgbtn')||e.classList.contains('alt'));
    const vw=innerWidth,vh=innerHeight;const off=bs.filter(e=>{const r=e.getBoundingClientRect();return r.left<-1||r.right>vw+1||r.top<-1||(r.bottom>vh+1&&!d.scrollHeight)}).length;
    const cut=bs.filter(e=>e.scrollWidth>e.clientWidth+2).map(e=>e.textContent.trim());
    out.push({pal,set:d.dataset.mgpal,mainBg:main?getComputedStyle(main).backgroundImage:'',mainCol:main?__rgb(getComputedStyle(main).color):null,altRim:alt?__rgb(getComputedStyle(alt).borderTopColor):null,
     crA:__cr(ink,a),crB:__cr(ink,bb),crRim:__cr(rim,card),aTok:tok.includes(a.map(Math.round).join(',')),n:bs.length,off,cut,via:i%2?'preSkin':'open'})}
   return out});
  ok(P.length>=5,`${tag} (b) ≥ 4 palettes besides son`,P.map(x=>x.pal));
  const son=P.find(x=>x.pal==='son');
  for(const x of P){ok(x.set===x.pal,`${tag} (b) ${x.pal} data-mgpal set (${x.via})`);
   if(x.pal!=='son')ok(x.mainBg&&x.mainBg!==son.mainBg,`${tag} (b) ${x.pal} main button ground differs from son`);
   ok(x.crA>=4.5&&x.crB>=4.5,`${tag} (b) ${x.pal} text contrast ≥ 4.5 on both stops`,[x.crA,x.crB]);ok(x.crRim>=3,`${tag} (b) ${x.pal} board-button rim ≥ 3:1 on the card`,x.crRim);
   ok(x.n>0&&x.off===0&&!x.cut.length,`${tag} (b) ${x.pal} ${x.n} buttons inside the screen, no text cut`,{off:x.off,cut:x.cut});ok(x.aTok,`${tag} (c) ${x.pal} ground = a kit token`)}
  /* (d) pictures */
  const D=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};kitMgSkinAdd('dan','xuan',{name:'Xuân viên',pal:'ngoc'});o.list=kitMgSkinList('dan').map(s=>s.id+':'+s.pal);
   const keep=typeof KIT_CDNHAVE!=='undefined'?KIT_CDNHAVE:undefined;
   KIT_CDNHAVE=new Set(['img/mg/dan-xuan.webp','img/mg/dan-blossom-xuan.webp']);const rel=s=>s.replace(/^.*?(?=img\/)/,'');o.bg=rel(kg82SkinSrc('dan-bg','xuan'));o.hoc=rel(kg82SkinSrc('dan-bg-hoc','xuan'));o.spr=rel(kg82SkinSrc('dan-blossom','xuan'));o.miss=rel(kg82SkinSrc('dan-bridge','xuan'));
   o.byId=kitMgSkin('dan','xuan');o.byPal=kitMgSkin('dan','kim');o.bad=kitMgSkin('dan','<x>');
   /* DOM backdrop follows the skin only when listed */
   try{kg82Close()}catch(e){}KG82.skin={id:'xuan',pal:'ngoc'};KIT_CDNHAVE=new Set(['img/kit/mg-tuoi-bg.webp','img/mg/tuoi-xuan.webp']);o.dom=kitBoardBg('tuoi');KIT_CDNHAVE=new Set(['img/kit/mg-tuoi-bg.webp']);o.dom2=kitBoardBg('tuoi');KIT_CDNHAVE=null;o.dom3=kitBoardBg('tuoi');
   /* an unpainted skin: kg82Img falls back to the default picture */
   KIT_CDNHAVE=null;KG82.skin={id:'zz_none',pal:'son'};const im=kg82Img('dan-bg');for(let t=0;t<40&&!(im.complete&&im.naturalWidth);t++)await sleep(250);o.fb=im.naturalWidth>0&&/img\/kit\/mg-dan-bg\.webp/.test(im.src);
   KIT_CDNHAVE=keep===undefined?null:keep;try{kg82Close()}catch(e){}return o});
  ok(D.list.join()===':son,xuan:ngoc',`${tag} (d) skin list = default + added`,D.list);
  ok(D.bg==='img/mg/dan-xuan.webp'&&D.hoc==='img/mg/dan-xuan.webp'&&D.spr==='img/mg/dan-blossom-xuan.webp',`${tag} (d) skinned keys img/mg/<kind>-<id> / <name>-<id>`,[D.bg,D.hoc,D.spr]);
  ok(D.miss==='img/kit/mg-dan-bridge.webp',`${tag} (d) unpainted piece → default art`,D.miss);
  ok(D.byId.id==='xuan'&&D.byId.pal==='ngoc'&&D.byPal.id===''&&D.byPal.pal==='kim'&&D.bad.id===''&&D.bad.pal==='son',`${tag} (d) kitMgSkin resolves id / palette word / junk`);
  ok(/img\/mg\/tuoi-xuan\.webp/.test(D.dom)&&/img\/kit\/mg-tuoi-bg\.webp/.test(D.dom2)&&/img\/kit\/mg-tuoi-bg\.webp/.test(D.dom3),`${tag} (d) kitBoardBg follows the skin only when the index lists it`,[D.dom,D.dom2,D.dom3]);
  ok(D.fb,`${tag} (d) kg82Img of an unpainted skin loads the default picture`);
  /* (e) close resets; kitMgPal */
  const E=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));KG82.preSkin='dao';playArt({art:'Đàn',onDone:()=>{}});await sleep(500);const pal=kitMgPal();kg82Close();const after=KG82.skin.id+'|'+KG82.skin.pal;
   playArt({art:'Đàn',onDone:()=>{}});await sleep(500);const again=document.getElementById('kg82').dataset.mgpal;kg82Close();return{pal,after,again}});
  ok(E.pal.pal==='dao'&&E.pal.ink&&E.pal.a,`${tag} (e) kitMgPal() = the open palette`,E.pal);ok(E.after==='|son'&&E.again==='son',`${tag} (e) close resets to default`,E);
  /* shot: 5 palettes side by side (rules screen of Đàn) */
  if(OUT){const shots=[];for(const pal of await p.evaluate(()=>KG82_PAL)){await p.evaluate(async pal=>{try{kg82Close()}catch(e){}KG82.preSkin=pal;playArt({art:'Đàn',onDone:()=>{}});await new Promise(r=>setTimeout(r,900))},pal);
    const f=path.join(OUT,`mgskin-${tag}-${pal}.png`);await p.locator('#kg82').screenshot({path:f});shots.push(f)}console.log('shots',shots.join(' '))}
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));await p.close()}
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL PASS');process.exit(n?1:0)})();
