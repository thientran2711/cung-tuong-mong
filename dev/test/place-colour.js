/* place-colour.js — LUẬT SỬA CẢ NHÓM scan for scene colour (owner 15/11: "why only her room?").
   Opens EVERY place (her room, Hoàng thượng's halls, Đức Thọ, Càn Ninh, every consort palace tier rp0–rp3, Ngự hoa viên, Thái y viện,
   Kính sự phòng, Lãnh cung, Tân Giả khố) × 4 seasons × 4 buổi × each season's 4 weathers, plus the Dư đồ map (4 × 4 + festival days).
   Per state it records the computed CSS filter + overlay layers on the scene picture and on the figures, and saves
     <OUT>/s/<place>-<se>-<bu>-<wi>.jpg   the stage as the player sees it (text + people hidden)
     <OUT>/r/<place>-<se>-<bu>-<wi>.jpg   the same crop with every scene filter/overlay switched off (= the painting as painted)
     <OUT>/states.json                    one row per state (filters, overlays, figure probe colour)
   A grey probe figure (flat RGB 128) is put among the people: its rendered colour shows any tint on characters (owner 06:00Z: characters
   keep their own colours). Measure + sheets: python3 dev/test/place-colour.py <OUT>.
   usage: node dev/test/place-colour.js <dev/index.html> <OUT> [WxH] [shard/nshards] [places,comma] [nopx]
   (nopx = reduced motion, no Pixi: fast; without it Pixi draws the backdrop (WebGL devices) — slow in headless, pick states with
   PCSTATES=<se>-<buổi 0..3>-<weather 0..3>,…)
   Pictures come from the CDN through Playwright (cached in .ahcache/img). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';
const [,,HTML0,OUT,SZ='1180x820',SH='0/1',ONLY='',NOPX='']=process.argv;const HTML=path.resolve(HTML0);
const [W,H]=SZ.split('x').map(Number);const [si,sn]=SH.split('/').map(Number);
const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=WT+'.ahcache/img/';
for(const d of ['s','r','f'])fs.mkdirSync(`${OUT}/${d}`,{recursive:true});fs.mkdirSync(CACHE,{recursive:true});
const GREY='data:image/png;base64,'+(()=>{/* 60x150 flat grey PNG, built by hand */const zlib=require('zlib');
 const w=60,h=150,raw=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++){raw[y*(w*4+1)]=0;for(let x=0;x<w;x++){const o=y*(w*4+1)+1+x*4;raw[o]=raw[o+1]=raw[o+2]=128;raw[o+3]=255}}
 const crc=b=>{let c,t=[];for(let n=0;n<256;n++){c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0}let r=0xffffffff;for(const x of b)r=t[(r^x)&255]^(r>>>8);return (r^0xffffffff)>>>0};
 const ch=(ty,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(ty),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c])};
 const ih=Buffer.alloc(13);ih.writeUInt32BE(w,0);ih.writeUInt32BE(h,4);ih[8]=8;ih[9]=6;
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),ch('IHDR',ih),ch('IDAT',zlib.deflateSync(raw)),ch('IEND',Buffer.alloc(0))]).toString('base64')})();
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined,
  args:NOPX?[]:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true,reducedMotion:NOPX?'reduce':'no-preference'});
 await ctx.route('**/*',async r=>{const u=r.request().url();
  if(u.startsWith('http://ctm.test/')){const p=decodeURIComponent(new URL(u).pathname).slice(1);
   if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(HTML),contentType:'text/html; charset=utf-8'});
   const f=WT+p;if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({status:200,body:fs.readFileSync(f)});return r.fulfill({status:404,body:''})}
  if(u.startsWith(CDN)){const p=new URL(u).pathname.slice(1),c=CACHE+p.replace(/\//g,'__'),ct=p.endsWith('.json')?'application/json':p.endsWith('.webp')?'image/webp':p.endsWith('.png')?'image/png':'application/octet-stream';
   if(!p.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!p.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}
   return r.abort()}
  if(/fonts\.(googleapis|gstatic)/.test(u))return r.continue();return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(5000);
 await p.evaluate(()=>{SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
 const clean=()=>p.evaluate(()=>{Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}
  const k=document.getElementById('kroul');if(k)k.remove();const m=document.getElementById('modal');if(m){m.classList.remove('on');m.hidden=true}const d=document.getElementById('dawn');if(d)d.hidden=true});
 await clean();
 /* scan-only CSS: html.zpcs #stage hides text + people (scene pixels), .zpcr also switches off every scene filter/overlay (painting as painted) */
 await p.addStyleTag({content:`html.zpcs #stage .stop,html.zpcs #stage .tokens,html.zpcs #stage .tok,html.zpcs #stage .kmemark,html.zpcs #stage .ksh,html.zpcs #stage .j59sz,html.zpcs #stage #popw{visibility:hidden!important}
  html.zpcr #stage.stage .scimg,html.zpcr #stage.stage>.pxc{filter:none!important}html.zpcr #stage.stage>.light{display:none!important}html.zpcr #stage.stage::after,html.zpcr #stage.stage::before{display:none!important}html.zpcr #stage.stage{box-shadow:none!important;filter:none!important}
  #pcprobe{position:absolute!important;left:44%!important;bottom:3%!important;top:auto!important;right:auto!important;transform:none!important;z-index:3;background:none;border:0;padding:0;width:60px;height:150px}#pcprobe .figimg{width:60px;height:150px;display:block}`});
 await p.evaluate(G=>{const pr=document.createElement('button');pr.id='pcprobe';pr.className='tok fig';pr.innerHTML=`<img class="figimg" src="${G}">`;window.__pcpr=pr;document.body.appendChild(pr)},GREY);await p.waitForTimeout(300);
 /* places: one per scene + one consort palace per tier (rp0..rp3) + Tân Giả khố */
 const PL=await p.evaluate(()=>{const L=[['home','home']];for(const x of places())if(x.k[0]!=='r')L.push([x.k,x.k]);
  const rv=places().filter(x=>x.k[0]==='r');const tier=v=>v.rank>=5?3:v.rank>=3?2:v.rank>=1?1:0;const seen={};
  for(const x of rv){const v=RV(+x.k.slice(1));if(!v)continue;const t=tier(v);if(!seen[t]){seen[t]=x.k;L.push(['rp'+t,x.k])}}
  /* tiers missing in this game: borrow a living consort and set her rank for the visit */
  for(let t=0;t<4;t++)if(!seen[t]&&rv.length)L.push(['rp'+t,rv[0].k,[0,1,3,5][t]]);
  L.push(['tgk','tgk']);return L});
 const only=ONLY?ONLY.split(','):null;const PICK=process.env.PCSTATES?process.env.PCSTATES.split(','):null;/* e.g. PCSTATES=xuan-2-1,ha-3-2 */const SE=[['xuan',2],['ha',5],['thu',8],['dong',11]];
 const rows=[];let n=0;const t0=Date.now();
 const setState=(k,mo,bu,wi,rk)=>p.evaluate(([k,mo,bu,wi,rk])=>{S.month=mo;S.buoi=bu;const w=WX[SEASON[mo-1]][wi];S.wx={n:w[0],k:w[1],f:w[2]};
   if(rk!=null){const v=RV(+k.slice(1));if(v){v.__rk0=v.__rk0==null?v.rank:v.__rk0;v.rank=rk}}
   S.place=k;S.visit={k,people:[],talked:false,tk:{}};Q.length=0;window.__mapList=0;tab='';try{render()}catch(e){}try{lightTick()}catch(e){}try{kitSceneTag&&kitSceneTag()}catch(e){}
   if(rk!=null){const v=RV(+k.slice(1));if(v&&v.__rk0!=null){v.rank=v.__rk0;delete v.__rk0}}return w[0]},[k,mo,bu,wi,rk]);
 for(const [name,k,rk] of PL){if(only&&!only.includes(name))continue;
  for(const [se,mo] of SE)for(let bu=0;bu<4;bu++)for(let wi=0;wi<4;wi++){if(PICK&&!PICK.includes(`${se}-${bu}-${wi}`))continue;if((n++)%sn!==si)continue;
   if(process.env.DBG)console.log('state',name,se,bu,wi,Math.round((Date.now()-t0)/1000));const wn=await setState(k,mo,bu,wi,rk);await clean();
   /* let the picture + Pixi copy settle, then freeze Pixi so the screenshot is quick and stable */
   await p.waitForFunction(()=>{const im=document.getElementById('scimg');const m=/url\(["']?([^"')]+)/.exec(im.style.backgroundImage||'');if(!m)return true;
     const i=window.__pcimg=window.__pcimg||{};if(!i[m[1]]){const x=new Image();x.src=m[1];i[m[1]]=x}return i[m[1]].complete},null,{timeout:60000}).catch(()=>{});
   await p.waitForTimeout(NOPX?150:700);
   const info=await p.evaluate(G=>{const st=document.getElementById('stage'),cs=e=>e?getComputedStyle(e):null,im=document.getElementById('scimg'),L=st.querySelector(':scope>.light'),pc=st.querySelector(':scope>.pxc');
     try{if(typeof PX==='object'&&PX.app){PX.app.ticker.stop();PX.app.render()}}catch(e){}
     const tk=document.getElementById('tokens');let pr=window.__pcpr;if(tk&&pr.parentNode!==tk)tk.appendChild(pr);
     const me=document.getElementById('mefig');const fig=document.querySelector('#tokens .tok.fig:not(#pcprobe) .figimg');
     const af=cs(st)&&getComputedStyle(st,'::after'),bf=getComputedStyle(st,'::before');
     const bg=(im.style.backgroundImage.match(/img\/([^.]+)\.webp/)||[])[1]||'';
     return {cls:st.className,bg,scf:cs(im).filter,scop:cs(im).opacity,pxf:pc?cs(pc).filter:null,px:typeof PX==='object'?{app:!!PX.app,bgv:!!(PX.bg&&PX.bg.visible)}:null,
      light:L?{bg:cs(L).backgroundImage+' '+cs(L).backgroundColor,op:cs(L).opacity,z:cs(L).zIndex,mix:cs(L).mixBlendMode}:null,
      after:af?{bg:af.backgroundImage+' '+af.backgroundColor,op:af.opacity,c:af.content}:null,before:{bg:bf.backgroundImage+' '+bf.backgroundColor,c:bf.content},
      stf:cs(st).filter,shadow:cs(st).boxShadow,klf:getComputedStyle(document.documentElement).getPropertyValue('--klf').trim(),
      mef:me?cs(me).filter:null,figf:fig?cs(fig).filter:null,prf:cs(pr.querySelector('img')).filter,
      prR:(r=>({x:r.x-st.getBoundingClientRect().x,y:r.y-st.getBoundingClientRect().y,w:r.width,h:r.height}))(pr.querySelector('img').getBoundingClientRect())}},GREY);
   const id=`${name}-${se}-${bu}-${wi}`,el=await p.$('#stage');
   await el.screenshot({path:`${OUT}/f/${id}.jpg`,type:'jpeg',quality:88,animations:'disabled'}).catch(()=>{});
   await p.evaluate(()=>document.documentElement.classList.add('zpcs'));
   await el.screenshot({path:`${OUT}/s/${id}.jpg`,type:'jpeg',quality:82,animations:'disabled'});
   await p.evaluate(()=>{document.documentElement.classList.add('zpcr');try{if(PX.app)PX.app.render()}catch(e){}});
   await el.screenshot({path:`${OUT}/r/${id}.jpg`,type:'jpeg',quality:82,animations:'disabled'});
   await p.evaluate(()=>{document.documentElement.classList.remove('zpcs','zpcr');const pr=document.getElementById('pcprobe');if(pr)pr.remove();try{if(PX.app)PX.app.ticker.start()}catch(e){}});
   rows.push({id,place:name,k,se,bu,wi,wx:wn,...info});
   if(rows.length%40===0)console.log(rows.length,'states',Math.round((Date.now()-t0)/1000)+'s')}}
 /* Dư đồ map: 4 seasons × 4 buổi + every festival day (tab "go") */
 if(!only||only.includes('map')){
  const fests=await p.evaluate(()=>Object.entries(FEST).map(([k,f])=>[k,f.m,f.t[0]]));
  const MS=[];for(const [se,mo] of SE)MS.push(['map',se,mo,null]);for(const [k,m,t] of fests)MS.push(['fest-'+k,k,m,t]);
  for(const [name,se,mo,tu] of MS)for(let bu=0;bu<4;bu++){if((n++)%sn!==si)continue;
   await p.evaluate(([mo,bu,tu])=>{S.month=mo;S.buoi=bu;if(tu!=null)S.tuan=tu;else S.tuan=3;S.wx={n:'trời quang',k:'dust',f:0};Q.length=0;window.__mapList=0;tab='go';try{render()}catch(e){}},[mo,bu,tu]);
   await clean();await p.waitForTimeout(400);
   await p.waitForFunction(()=>{const i=document.querySelector('.mapimg');return !i||i.complete},null,{timeout:60000}).catch(()=>{});
   const info=await p.evaluate(()=>{const i=document.querySelector('.mapimg');if(!i)return {none:1};const w=i.closest('.mapw')||i.parentNode;
     const lay=[...w.querySelectorAll('*')].filter(e=>e!==i).map(e=>({c:e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className,bg:getComputedStyle(e).backgroundColor,bi:getComputedStyle(e).backgroundImage.slice(0,80),f:getComputedStyle(e).filter,mix:getComputedStyle(e).mixBlendMode})).filter(x=>x.f!=='none'||(x.bg!=='rgba(0, 0, 0, 0)')||x.mix!=='normal').slice(0,8);
     return {src:(i.currentSrc||i.src).split('/').pop(),f:getComputedStyle(i).filter,wf:getComputedStyle(w).filter,lay}});
   const id=`${name}-${se}-${bu}`;const el=await p.$('.mapsc');if(el)await el.screenshot({path:`${OUT}/s/${id}.jpg`,type:'jpeg',quality:80,animations:'disabled'}).catch(()=>{});
   rows.push({id,place:name,se,bu,map:1,...info})}}
 fs.writeFileSync(`${OUT}/states${sn>1?'-'+si:''}.json`,JSON.stringify(rows));fs.writeFileSync(`${OUT}/errs${sn>1?'-'+si:''}.json`,JSON.stringify(errs.slice(0,40)));
 console.log('done',rows.length,'states, page errors',errs.length,Math.round((Date.now()-t0)/1000)+'s');await b.close()})();
