/* ROBOT-LIFE-M4 driver: REAL taps only (page.mouse at element centre after elementFromPoint hit-check). Control server on :8200 */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs'),http=require('http');
const REPO='/home/user/cung-tuong-mong',OUT='/home/user/wt/m4/out';fs.mkdirSync(OUT+'/shots',{recursive:true});
const SEED=+process.env.SEED||104;
const LOG=OUT+'/log.txt';const log=(...a)=>{const s=new Date().toISOString().slice(11,19)+' '+a.join(' ');fs.appendFileSync(LOG,s+'\n');console.log(s)};
const BUG=OUT+'/bugs.txt';const bug=(t,...a)=>{log('BUG',t,...a);fs.appendFileSync(BUG,new Date().toISOString()+' '+t+' '+a.join(' ')+'\n')};
let page,ctx,browser,nShot=0;
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css','.webmanifest':'application/manifest+json'};
async function serve(){const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(REPO,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});await new Promise(r=>sv.listen(8123,'127.0.0.1',r))}
let LOADN=-1;const SEEDJS=()=>`(function(){let s=${SEED+LOADN*7919}>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
async function open(keepLS){
 if(ctx){try{await ctx.close()}catch(e){}}
 LOADN++;
 ctx=await chromium.launchPersistentContext(OUT+'/profile',{viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,reducedMotion:'reduce'});
 await ctx.addInitScript(SEEDJS());
 page=await ctx.newPage();page.__errs=[];
 page.on('pageerror',e=>{const m=e.message+' '+(e.stack||'').split('\n').slice(1,2).join('').trim();bug('JS-ERROR',m)});
 page.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR_/.test(m.text()))bug('console.error',m.text().slice(0,300))});
 await page.goto('http://127.0.0.1:8123/index.html',{waitUntil:'domcontentloaded',timeout:120000});
 await page.waitForFunction(()=>typeof start==='function'&&typeof showTitle==='function'&&typeof kg82Play==='function',null,{timeout:120000});
 await page.evaluate(()=>{const k0=window.kg82Play;window.kg82Play=function(kind){window.__mgKind=kind;return k0.apply(this,arguments)}});
}

/* ---- mini-game player: skilled-bot logic of dev/measure/mg-bots.js (oracle KG82.peek + human error model), REAL input (touchscreen tap / mouse drag+hold) ---- */
const BOT={rt:70,px:.018,think:450,slip:.06,thinkD:900,slipD:.12,aim:40,timing:'dan,ban,duho,hat,den,dauho,banh,td_dung,td_ngon'.split(','),seek:[600,350]};
const G=()=>{let s=0;for(let i=0;i<6;i++)s+=Math.random();return (s-3)/Math.sqrt(.5)};
const rnd=Math.random;
async function touchTap(x,y){const ok=await page.evaluate(([x,y])=>!!document.elementFromPoint(x,y),[x,y]);if(!ok)return false;await page.touchscreen.tap(Math.round(x),Math.round(y));return true}
const PK=()=>{const b=document.getElementById('kg82box');const r=b?b.getBoundingClientRect():{left:0,top:0,width:700,height:700};const box=[r.left,r.top,r.width,r.height];try{const p=KG82.peek();if(!p)return {ph:KG82.phase,pk:null,box};return {ph:KG82.phase,pk:JSON.parse(JSON.stringify(p)),box}}catch(e){return {ph:KG82.phase,err:String(e),box}}};
async function playMG(){
 const t0=Date.now();let moves=0,hold=null,nx=0,lastErr='',nNull=0,nPk=0,sample='';
 const kind=await page.evaluate(()=>{try{return window.__mgKind||''}catch(e){return ''}});
 log('MG start kind=',kind);
 const sleep=ms=>page.waitForTimeout(Math.max(1,ms));
 while(Date.now()-t0<240000){
  const st=await page.evaluate(PK).catch(()=>({ph:''}));
  if(st.ph!=='play'){if(hold){await page.mouse.up();hold=null}if(st.ph===''||st.ph===undefined||t0+4000<Date.now()){break}await sleep(100);continue}
  if(st.err)lastErr=st.err;const pk=st.pk;const sc=Math.min(st.box[2],st.box[3]);const s=sc*BOT.px;
  if(!pk){nNull++;await sleep(25);continue}
  nPk++;if(!sample)sample=JSON.stringify(pk).slice(0,160);
  if(pk.at!=null){await sleep(Math.max(0,pk.at+G()*BOT.aim));const q=(await page.evaluate(PK)).pk||pk;await touchTap(q.x,q.y);moves++;await sleep(120);continue}
  if('hold' in pk){const want=pk.hold?(pk.hsel||'x'+Math.round((pk.x||0)/60)):'';
    if(hold&&hold.k!==want){await page.mouse.up();hold=null}
    if(want&&!hold){await sleep(Math.abs(G())*BOT.rt);let x=pk.x,y=pk.y;if(pk.hsel){const r=await page.evaluate(sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},pk.hsel);if(r){x=r[0];y=r[1]}}
      if(x!=null){await page.mouse.move(x,y);await page.mouse.down();hold={k:want}}}
    if(!pk.drag&&!pk.sel){await sleep(30);continue}}
  if(Date.now()<nx){await sleep(30);continue}
  const timing=BOT.timing.includes(kind);const slip=rnd()<(timing?BOT.slip:BOT.slipD);
  const th=pk.think>0?pk.think:1;let thinkMs=pk.thinkMs;if(pk.cands>0&&!(thinkMs>0))thinkMs=BOT.seek[0]+BOT.seek[1]*pk.cands*(.3+.7*rnd());
  await sleep(thinkMs>0?thinkMs*(.6+.8*rnd()):((pk.drag||pk.sel)?BOT.think*(.3+.4*rnd()):timing?Math.abs(G())*BOT.rt:BOT.thinkD*(.5+rnd()))*(timing?1:th));
  const q=(await page.evaluate(PK)).pk||pk;if((await page.evaluate(()=>KG82.phase))!=='play')break;
  if(slip){const x=st.box[0]+rnd()*st.box[2],y=st.box[1]+rnd()*st.box[3];await touchTap(x,y)}
  else if(q.drag){const sa=q.aim!=null?q.aim:1;const D=q.drag.map(([x,y],i)=>[x+(i?G()*s*.8:G()*s*.4)*sa,y+(i?G()*s*.8:G()*s*.4)*sa]);
    await page.mouse.move(D[0][0],D[0][1]);await page.mouse.down();for(let i=1;i<D.length;i++){const n=Math.max(2,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let k=1;k<=n;k++){await page.mouse.move(D[i-1][0]+(D[i][0]-D[i-1][0])*k/n,D[i-1][1]+(D[i][1]-D[i-1][1])*k/n);await sleep(8)}}await page.mouse.up()}
  else if(q.sel){const r=await page.evaluate(sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},q.sel);if(r)await touchTap(r[0],r[1])}
  else if(q.x!=null){await touchTap(q.x+G()*s,q.y+G()*s)}
  moves++;nx=Date.now()+BOT.think*(.6+.8*rnd())}
 const res=await page.evaluate(()=>({ph:KG82.phase,score:window.__hudS||null})).catch(()=>({}));
 const resTxt=await page.evaluate(()=>{const r=document.getElementById('kg82box-res');return r?r.innerText.replace(/\s+/g,' ').slice(0,200):''}).catch(()=>'');
 log('MG RESULT kind='+kind+' «'+resTxt+'»');
 log('MG end kind=',kind,'moves=',moves,'peekNull=',nNull,'peekOk=',nPk,'sample=',sample,'ms=',Date.now()-t0,JSON.stringify(res),lastErr?'peekErr='+lastErr:'');
 if(Date.now()-t0>=240000)bug('MG-STUCK','mini-game still in play after 240 s',kind);
}

/* candidates = visible clickables whose centre passes elementFromPoint */
const CANDS=()=>{const W=innerWidth,H=innerHeight;const out=[];const seen=new Set();
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return false;for(let x=e;x&&x!==document.documentElement;x=x.parentElement){const s=getComputedStyle(x);if(s.display==='none'||s.visibility==='hidden'||+s.opacity<.05||x.hidden)return false}return true};
 const all=[...document.querySelectorAll('button,[role=button],a[href],[onclick],input,select,.kbtn,[data-act],[class*=btn]')];
 for(const e of all){if(seen.has(e)||!vis(e)||e.disabled)continue;seen.add(e);const r=e.getBoundingClientRect();
  const cx=Math.round(r.left+r.width/2),cy=Math.round(r.top+Math.min(r.height/2,r.height-2));if(cx<0||cx>=W||cy<0||cy>=H)continue;
  const t=document.elementFromPoint(cx,cy);const hit=!!t&&(e===t||e.contains(t)||t.contains(e));
  const txt=(e.innerText||e.value||e.getAttribute('aria-label')||'').replace(/\s+/g,' ').trim().slice(0,110);
  out.push({id:e.id||'',cls:(typeof e.className==='string'?e.className:'').slice(0,40),txt,cx,cy,w:Math.round(r.width),h:Math.round(r.height),hit,cover:hit?'':((t&&((t.id?'#'+t.id:'')+'.'+(typeof t.className==='string'?t.className.split(' ')[0]:'')+' '+(t.innerText||'').slice(0,30)))||'?')})}
 return out};
async function cands(){return (await page.evaluate(CANDS)).filter(c=>c.hit)}
async function realTap(c){/* c has cx,cy; re-hit-check right before the tap */
 const ok=await page.evaluate(([x,y,id,txt])=>{const t=document.elementFromPoint(x,y);return !!t},[c.cx,c.cy,c.id,c.txt]);
 await page.mouse.move(c.cx,c.cy);await page.mouse.down();await page.waitForTimeout(40);await page.mouse.up();return ok}
async function shot(tag){const f=OUT+'/shots/'+String(++nShot).padStart(5,'0')+'-'+tag+'.png';await page.screenshot({path:f});return f}
async function text(){return page.evaluate(()=>{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);return document.body.innerText.replace(/\s+/g,' ').slice(0,1500)})}

const EXIT=/xuất gia|xin xuất cung|xuất cung|tự phế|bỏ cuộc|tự vẫn|tự tận|thoái vị|rời cung|từ bỏ|kiếp mới/i;
let STEP='',LASTIT=Date.now(),UNK=0,EMPTY=0,AUTO=false,stepN=0,lastSig='',same=0;
async function decide(cs){const f=require.resolve('./policy.js');delete require.cache[f];return require('./policy.js')(cs,{EXIT,page,log})}
const hudOf=()=>page.evaluate(()=>{const t=s=>((document.querySelector(s)||{}).innerText||'').replace(/\s+/g,' ').trim();return {me:t('.me'),when:t('.k3time'),stat:t('.kstg-tc')+' | '+t('.kstg-res'),mood:t('.hud-mood')}}).catch(()=>({}));
const sigOf=()=>page.evaluate(()=>document.body.innerText.replace(/\s+/g,' ').length+':'+document.body.innerText.slice(0,200)).catch(()=>'');
let lastProg=Date.now(),lastYear='',reloads=0,nbuoi=0,lastBuoiKey='',noeff={};
async function trueReload(){
 let dly=4000;try{dly=+fs.readFileSync('/home/user/wt/m4/reload_delay.txt','utf8')}catch(e){}if(!(dly>=0))dly=4000;if(dly)await page.waitForTimeout(dly);log('RELOAD delay ms='+dly);const before=await hudOf();log('TRUE RELOAD #'+(++reloads)+' before',JSON.stringify(before));
 await open(true);await page.waitForTimeout(25000);
 for(const t of ['Chơi một mình','Tiếp tục kiếp này']){const cs=await cands();const c=cs.find(c=>c.txt.startsWith(t));if(!c){bug('RELOAD','title button «'+t+'» not found after reload',JSON.stringify(cs.map(x=>x.txt)));await shot('reload-fail');return}await realTap(c);await page.waitForTimeout(3000)}
 await page.waitForTimeout(4000);const after=await hudOf();
 const same=before.me===after.me&&before.stat===after.stat;log('RELOAD after (delay '+dly+' ms)',JSON.stringify(after),same?'SAME':'DRIFT');try{fs.appendFileSync(OUT+'/../m4-reload-results.txt',new Date().toISOString()+' reload#'+reloads+' delay='+dly+'ms '+(same?'SAME':'DRIFT')+' before='+JSON.stringify(before)+' after='+JSON.stringify(after)+'\n');if(dly===0)fs.writeFileSync('/home/user/wt/m4/reload_delay.txt','4000')}catch(e){}
 if(!same)bug('RELOAD-DRIFT','HUD differs after true reload',JSON.stringify({before,after}))}
async function autoloop(maxSteps){AUTO=true;let k=0;
 while(AUTO&&k++<maxSteps){STEP='top';LASTIT=Date.now();const tE=Date.now();const cs=await cands();const dE=Date.now()-tE;if(dE>4000){bug('PAGE-FREEZE','page.evaluate (cands) took '+Math.round(dE/1000)+' s',JSON.stringify(cs.map(x=>x.txt.slice(0,30))));await shot('freeze')}
  if(!cs.length){if(++EMPTY>=3){EMPTY=0;await realTap({cx:378,cy:500,txt:'blind-centre'});log('BLIND TAP centre (no candidates)')}else await page.waitForTimeout(700);continue}EMPTY=0;
  const tH=Date.now();const h=await hudOf();if(Date.now()-tH>4000)bug('PAGE-FREEZE','hudOf took '+Math.round((Date.now()-tH)/1000)+' s','');const yr=(h.me.match(/năm thứ (\S+)/)||[])[1]||'';const bk=h.when+'|'+h.me.slice(-40);
  if(bk!==lastBuoiKey){lastBuoiKey=bk;nbuoi++;lastProg=Date.now();if(nbuoi%24===0){try{const v=await page.evaluate(()=>JSON.stringify(Object.fromEntries(Object.keys(localStorage).filter(k=>/hclh/i.test(k)).map(k=>[k,localStorage.getItem(k)]))));fs.writeFileSync(OUT+'/localStorage-saves.json',v);log('SAVE EXPORT buoi#'+nbuoi)}catch(e){}}if(nbuoi%1===0)log('STATUS buổi#'+nbuoi,h.when,'|',h.me,'|',h.stat,'|',h.mood)}
  if(yr&&yr!==lastYear&&lastYear!==''){lastYear=yr;await trueReload();continue}if(yr&&!lastYear)lastYear=yr;
  if(Date.now()-lastProg>15*60e3){bug('STUCK','no buổi progress for 15 min',JSON.stringify(h)+' cands='+JSON.stringify(cs.map(x=>x.txt.slice(0,40))));await shot('stuck');lastProg=Date.now();
    await page.keyboard.press('Escape');await realTap({cx:378,cy:500,txt:'unstick-centre'});continue}
  STEP='decide';const c=await decide(cs);STEP='after-decide';
  if(c&&c.wait){await page.waitForTimeout(c.wait);continue}
  if(c&&c.scroll){await page.mouse.move(494,600);await page.mouse.wheel(0,c.scroll);await page.waitForTimeout(300);continue}
  if(!c&&++UNK<4){await page.waitForTimeout(1200);continue}
  if(c)UNK=0;
  if(!c){UNK=0;log('UNKNOWN SCREEN',JSON.stringify(cs.map(x=>x.txt.slice(0,60)+'@'+x.cx+','+x.cy)));await shot('unknown');AUTO=false;break}
  STEP='sig0 '+(c.txt||'').slice(0,40);const s0=await sigOf();STEP='tap';if(/^Sẵn sàng/.test(c.txt||'')){await touchTap(c.cx,c.cy);log('AUTO touch-tap',c.txt.slice(0,30));await page.waitForTimeout(1500);for(let w=0;w<20&&(await page.evaluate(()=>KG82.phase))!=='play';w++)await page.waitForTimeout(500);if((await page.evaluate(()=>KG82.phase))==='play'){try{await playMG()}catch(e){bug('MG-HARNESS',String(e).slice(0,200))}}else log('MG: phase never reached play after Sẵn sàng');continue}await realTap(c);log('AUTO tap',JSON.stringify((c.txt||'').slice(0,70)));await page.waitForTimeout(800);
  const s1=await sigOf();if(s0===s1&&c.txt&&!/blind/.test(c.txt)){const key=c.txt.slice(0,40);noeff[key]=(noeff[key]||0)+1;if(noeff[key]===5){bug('NO-EFFECT','tap changed nothing 3x: «'+c.txt.slice(0,80)+'» ('+c.cx+','+c.cy+')',JSON.stringify(h));await shot('noeffect')}}}
 AUTO=false}
(async()=>{await serve();await open(false);log('opened');
 const srv=http.createServer(async(q,r)=>{try{const u=new URL(q.url,'http://x');const p=u.pathname;let res;
  if(p==='/c'){res=await cands()}
  else if(p==='/tap'){const cs=await cands();const i=+u.searchParams.get('i');const c=cs[i];if(!c)res='no cand';else{const ok=await realTap(c);log('TAP',i,JSON.stringify(c.txt),c.hit?'':'[NOT-HIT cover='+c.cover+']');res={tapped:c,hit:c.hit}}}
  else if(p==='/auto'){autoloop(+u.searchParams.get('n')||50);res='started'}
  else if(p==='/stop'){AUTO=false;res='stopped'}
  else if(p==='/tapt'){const t=u.searchParams.get('t');const cs=await cands();const c=cs.find(c=>c.txt.includes(t));if(!c)res='none';else{await realTap(c);log('TAP',JSON.stringify(c.txt));res='ok'}}
  else if(p==='/xy'){const c={cx:+u.searchParams.get('x'),cy:+u.searchParams.get('y'),txt:'xy'};await realTap(c);res='ok'}
  else if(p==='/shot'){res=await shot(u.searchParams.get('t')||'x')}
  else if(p==='/text'){res=await text()}
  else if(p==='/eval'){res=await page.evaluate(u.searchParams.get('js'))}
  else if(p==='/restore'){const d=JSON.parse(fs.readFileSync(u.searchParams.get('f'),'utf8'));await page.evaluate(d=>{for(const k in d)localStorage.setItem(k,typeof d[k]==='string'?d[k]:JSON.stringify(d[k]))},d);res='restored '+Object.keys(d).length}
  else if(p==='/reopen'){await open(true);res='ok'}
  else res='?';
  r.writeHead(200,{'content-type':'application/json'});r.end(JSON.stringify(res===undefined?null:res))}catch(e){r.writeHead(500);r.end(String(e))}});
 srv.listen(8200,'127.0.0.1');log('control :8200')})();

process.on('uncaughtException',e=>{try{log('UNCAUGHT',String(e).slice(0,300))}catch(x){}});process.on('unhandledRejection',e=>{try{log('UNHANDLED',String(e).slice(0,300))}catch(x){}});

setInterval(()=>{if(AUTO&&Date.now()-LASTIT>60000){try{log('WATCHDOG loop iteration running '+Math.round((Date.now()-LASTIT)/1000)+' s in step «'+STEP+'»')}catch(e){}}},30000);
