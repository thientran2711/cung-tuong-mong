/* fig-wiring-shots.js — review/art-wiring-1119: the real stage with the new pictures, for the review montage.
   usage: node dev/test/fig-wiring-shots.js <url> <WxH@dpr> <outdir> <tag>
   Looks: th51 / th65 = Đức Thọ cung, the Thái hậu on a pool face (her own Thái hậu robe a51 / a65);
          her65 = her at home as Hoàng hậu aged 70 (t8 a65); herV1 = her as Hoàng hậu aged 26 in colour v1; herTH = her as Thái hậu (road a).
   Prints JSON per look {src of the figure shown}. Pictures via the session proxy (CDN). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
 await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0&&Object.keys(FIGXT||{}).length>0,null,{timeout:120000});
 await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 const settle=async()=>{await sleep(1200);for(let w=0;w<90;w++){const ok=await p.evaluate(()=>{const im=[...document.querySelectorAll('#mefig, #tokens img.figimg, #stage img')];return im.length>0&&im.every(i=>i.complete&&i.naturalWidth>0)});if(ok)break;await sleep(1000)}
  for(let w=0;w<60&&await p.evaluate(()=>!!document.getElementById('klife'));w++)await sleep(1000);await p.evaluate(()=>{const k=document.getElementById('klife');if(k)k.remove();
   /* review shots show the stage: close the intro box and any queued card */try{Q.length=0}catch(e){}const md=document.getElementById('modal');if(md)md.hidden=true;
   document.querySelectorAll('.kmrew').forEach(e=>{let x=e;while(x.parentElement&&x.parentElement!==document.body)x=x.parentElement;x.remove()})});await sleep(800)};
 const out={};
 const look=async(name,fn)=>{const r=await p.evaluate(fn);await settle();const imgs=await p.evaluate(()=>[...document.querySelectorAll('#mefig, #tokens img.figimg')].map(i=>(i.currentSrc||i.src).replace(/^.*\//,'')));
  out[name]=Object.assign(r||{},{shown:imgs});await p.screenshot({path:`${OUT}/${TAG}-${name}.jpg`,type:'jpeg',quality:80})};
 const TH='consort:c07';
 await look('th51',()=>{quiet=true;const U=figUsed();S.thO=S.thO||{};if(S.thO.fid)S.fidUsed=U.filter(x=>x!==S.thO.fid);S.thO.fid='consort:c07';figUsed().push('consort:c07');S.thAge=55;S.thO.age=55;S.thDead=false;S.buoi=0;used=0;tab="act";S.confined=0;S.out=false;for(let i=0;i<4&&S.place!=="tn";i++){Q.length=0;used=0;goTo("tn")}Q.length=0;if(S.place!=="tn"){/* the entry ask (j95s) or a walk stops goTo: stand her there the way j2 goTo builds a visit */S.place="tn";S.visit={k:"tn",people:[{kind:"th",name:"Thái hậu",ini:"Từ",col:"#c9a0e0",info:"Thái hậu"}],talked:false,tk:{}}}render();quiet=false;render();return{fid:S.thO.fid,src:figFor({kind:'th'},'fig'),place:S.place,q:Q.length,dead:S.dead,out:S.out,conf:S.confined,walk:typeof walkOk==='function'?walkOk(travel('home','tn')):null}});
 await look('th65',()=>{quiet=true;S.thAge=70;S.thO.age=70;render();quiet=false;render();return{src:figFor({kind:'th'},'fig')}});
 await look('her65',()=>{quiet=true;const k='consort:c01';const h=rivals.find(v=>v.fid===k);if(h)h.fid=null;S.pid=k;S.fid=k;S.rank=7;S.age=70;S.out=false;S.figV=0;Q.length=0;goTo("home");if(S.place!=="home")S.place="home";render();quiet=false;render();return{src:figFor(S,'fig')}});
 await look('herV1',()=>{quiet=true;S.age=26;S.figV=1;render();quiet=false;render();return{src:figFor(S,'fig')}});
 await look('herTH',()=>{quiet=true;S.figV=0;S.age=58;S.succ={p:'a',on:0};render();quiet=false;render();const r={src:figFor(S,'fig')};return r});
 console.log(JSON.stringify({vp:VP,out,errs:errs.slice(0,5)}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
