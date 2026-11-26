/* C8-RANKROOM: rank rooms on the stage. usage: node dev/test/rankroom-stage.js <device: fold|ipadAir> <outdir>   (needs `bash dev/site/build_site.sh` first
   and the rooms staged: python3 dev/art/place-rank/rank_rooms_wire.py --all-rooms --stage; stage pictures are served from ./img, no CDN upload)
   Prints the resolution table (palace x rank x part x night -> picture key) and shots <outdir>/<device>-<pal>-<rank>-<day|night>.jpg */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const [,,DEV='fold',OUT='/tmp/rankroom-shots']=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const px=process.env.HTTPS_PROXY;
 const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'localhost,127.0.0.1'}}:{}));
 const ctx=await D.newDeviceContext(b,DEV);
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 await ctx.route(/workers\.dev\/img\/[a-z-]+-ha-sang\.webp/,r=>{const f=path.join(process.cwd(),'img',r.request().url().split('/img/')[1]);fs.existsSync(f)?r.fulfill({path:f,contentType:'image/webp'}):r.continue()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const game=await D.openHost(p,srv.url);
 for(let i=0;i<200;i++){const s=await game.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s==='ok')break;await sleep(1500)}
 await game.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
 const table=await game.evaluate(()=>{const out=[];const names=["Tần","Phi","Quý phi","Hoàng quý phi"];
  for(let pal=0;pal<RES_SLUG.length;pal++)for(const rn of names){const r=RANKS.findIndex(x=>x.n===rn);const head={rank:r,queen:false};
   for(const night of [false,true])for(const part of ["chinh","dong","tay"]){const base=resBase(pal,part,head,night);out.push([RES_SLUG[pal],rn,part,night?"night":"day",resPick(base)])}}return out});
 fs.writeFileSync(OUT+'/'+DEV+'-table.json',JSON.stringify(table));
 const wired=await game.evaluate(()=>Object.keys(RANK_ROOM).length);console.log('wired bases:',wired,'| table rows:',table.length,'| falling back to the old picture:',table.filter(r=>!/-ha-sang$/.test(r[4])||!r[4]).length);
 for(const [pal,rn,nm] of [[1,3,'tan'],[1,4,'phi'],[1,5,'quyphi'],[2,4,'phi'],[5,5,'quyphi'],[4,3,'tan']])for(const night of [0,3]){
  await game.evaluate(([pal,r,night])=>{quiet=true;S.rank=r;S.prSeen={r,s:null};S.pal=pal;S.out=false;S.buoi=night;tab="act";goTo("home");render();quiet=false;render()},[pal,rn,night]);
  await game.evaluate(()=>{const hide=e=>{while(e&&e!==document.body){const cs=getComputedStyle(e);if(cs.position==='fixed'||cs.position==='absolute'&&e.id==='modal'){e.style.display='none';return}e=e.parentElement}};
   for(const e of document.querySelectorAll('*')){if(e.children.length===0&&/Chạm để mở|Vào cung ngay/.test(e.textContent||''))hide(e)}
   for(const id of ['kload','modal','pop'])document.querySelectorAll('#'+id+',.'+id).forEach(x=>x.style.display='none')});
  await sleep(2500);const key=await game.evaluate(()=>resScene(residenceOf(S)));
  await p.screenshot({path:`${OUT}/${DEV}-${RES_SLUG_NAME(pal)}-${nm}-${night?"night":"day"}.jpg`,type:'jpeg',quality:70}).catch(()=>{});console.log(DEV,pal,nm,night?'night':'day','->',key)}
 console.log('page errors:',errs.length,errs.slice(0,3));await b.close();srv.close()})();
function RES_SLUG_NAME(i){return['canh-phuc','khai-tuong','chung-tu','ham-an','thua-minh','dien-huy','vinh-hoa','truong-xuan'][i]}
