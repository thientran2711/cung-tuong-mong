// Outside route (jkc) balance bot: node dev/measure/kcbot.js <livesPerOrigin> [sens|rand] [origins comma list] [diff]
// Plays the home road from the identity card to the palace entry (or an ending outside), many lives, and prints the outcome
// table against OUTSIDE_PLAN §12: enter palace / married outside / death outside / rare. Serves the built site at the repo root (GF=<file> to change).
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GAME='http://game.local/'+(process.env.GF||'index.html');/* r2: the built site (index.html); images are not loaded */
const MT={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',css:'text/css'};
const N=+process.argv[2]||10,POL=process.argv[3]||'sens',ORIG=(process.argv[4]||'tt,dtq,muoi,thd,ch,td').split(','),DIFF=process.argv[5]||'vua';
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:844}});
 await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})});
 const errs=[];
 async function mkPage(){const p=await c.newPage();p.on('pageerror',e=>{if(!/onerror/.test(e.stack||''))errs.push(String(e.stack||e.message).slice(0,400))});
 await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1200);
 await p.evaluate(`window.__kcOFF=${process.env.OFF?1:0}`);await p.evaluate(([pol,diff])=>{window.__bot=1;window.__POL=pol;window.__kcO='nha';try{localStorage.setItem('ctm-diff',diff)}catch(e){}
  try{PX.app.ticker.stop()}catch(e){}
  render=()=>{};renderStage=()=>{};renderPanel=()=>{};renderHUD=()=>{};showModal=()=>{};try{curtain=()=>{}}catch(e){}try{save=()=>{}}catch(e){}try{resultShow=()=>{}}catch(e){}
  lesson=function(k){const l=S.arts[k],cost=5+l*5;if(!can(2)||l>=5||S.bac<cost)return;apply({suc:-10,bac:-cost});spend(2);addArt(k,2+R(2))};
  window.__out=[];
  /* review spread-events r1 FAIL 1: kcWeek cards per life, D13 off (OFF=1) vs on */window.__kcw={calls:0,cards:0};if(window.__kcOFF)window.__spreadOff=1;try{const f0=kcWeek;kcWeek=function(){const n=Q.length;const r=f0.apply(this,arguments);window.__kcw.calls++;window.__kcw.cards+=Math.max(0,Q.length-n);return r}}catch(e){}
  const _over=over;over=function(h,t,f){try{window.__out.push({o:S.origin.k,end:S.kc&&!S.kc.inPal?h:"?",fate:String(f||"").replace(/<[^>]+>/g,""),turn:S.turn,inPal:!!(S.kc&&S.kc.inPal)})}catch(e){}return _over.apply(this,arguments)};
 },[POL,DIFF]);
 await p.evaluate(fs.readFileSync(path.join(__dirname,'inkc.js'),'utf8'));
 return p}
 const res=[];
 const OUTF=path.join(__dirname,`kcbot-${POL}-${DIFF}-${ORIG.join("")}.json`);
 for(const o of ORIG)for(let i=0;i<N;i++){const t1=Date.now();let p;try{p=await mkPage()}catch(e){errs.push('page '+e);continue}
  let r;try{r=await p.evaluate(o=>{try{
   window.__forceOrigin=o;Q=[];S=null;start();Q=[];if(!S.kc)kcInit();Q=[];window.__forceOrigin=undefined;try{$("modal").hidden=true;$("ov").hidden=true}catch(e){}
   const RR=window.__kcRun(window.__POL);const guard=RR.guard,ring=RR.ring;
   const K=S.kc;return{o,inPal:!!K.inPal,rank:K.inPal?K.r:null,end:K.end,dead:!!S.dead,fate:S.fate||"",turn:S.turn,early:!!(K.tt&&K.tt.early),so:K.so?K.soOk:null,sc:K.tt?K.tt.sc:null,
    sac:S.sac,tai:S.tai,danh:S.danh,duc:S.duc,bac:S.bac,arts:Math.max(...Object.values(S.arts)),le:K.le,kap:S.kap,kgt:S.kgt,ld:S.kld,intel:K.intel.length,sis:K.fam.filter(m=>m.pal).length,guard,ring:guard>=6000?ring:null,kcw:window.__kcw}
  }catch(e){return{o,err:String(e&&e.stack||e).slice(0,300)}}},o)}catch(e){r={o,err:'crash '+String(e).slice(0,200)}}
  try{await p.close()}catch(e){}r.secs=Math.round((Date.now()-t1)/1000);res.push(r);fs.writeFileSync(OUTF,JSON.stringify(res));process.stderr.write(`${o} ${i} ${r.inPal?'palace '+r.rank:r.end||r.fate||r.err} ${r.secs}s\n`)}
 const cat=r=>r.err?'err':r.inPal?'palace':(/Bỏ trốn cùng|Vợ Trạng|Vương phi|Nữ tướng|Hòa thân|Nữ thương/.test(r.end||''))?'rare':r.end==='chết'||/chết|Chết|Tự vẫn|Hồng nhan/.test(r.fate)&&!r.end?'death':r.end&&r.end!=='chết'?(r.end==='Xuất gia'||r.end==='Nữ phu tử'?'other':'married'):'death';
 const by={};for(const r of res){const k=r.o;by[k]=by[k]||{n:0};by[k].n++;const t=cat(r);by[k][t]=(by[k][t]||0)+1}
 const tot={n:res.length};for(const r of res){const t=cat(r);tot[t]=(tot[t]||0)+1}
 const pct=o=>Object.fromEntries(Object.entries(o).filter(([k])=>k!=='n').map(([k,v])=>[k,Math.round(100*v/o.n)]));
 const ranks=[0,0,0];res.filter(r=>r.inPal).forEach(r=>ranks[r.rank]++);
 const ends={};res.forEach(r=>{const k=r.inPal?'palace '+r.rank:(r.end||r.fate);ends[k]=(ends[k]||0)+1});
 const avg=k=>Math.round(res.filter(r=>r[k]!=null).reduce((a,r)=>a+r[k],0)/Math.max(1,res.filter(r=>r[k]!=null).length));
 console.log(JSON.stringify({pol:POL,diff:DIFF,n:res.length,total:pct(tot),byOrigin:Object.fromEntries(Object.entries(by).map(([k,v])=>[k,pct(v)])),entryRanks:ranks,ends,
  avg:{sc:avg('sc'),sac:avg('sac'),tai:avg('tai'),danh:avg('danh'),bac:avg('bac'),arts:avg('arts'),le:avg('le'),intel:avg('intel'),turn:avg('turn')},errs:errs.slice(0,5),rErr:res.filter(r=>r.err).slice(0,3),stuck:res.filter(r=>r.ring).map(r=>r.ring).slice(0,3)},null,1));
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
