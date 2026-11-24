/* HIDDEN smoothness probe (owner OD 24/11 ~15:15Z/~15:40Z SMOOTHNESS: measured on the REAL Fold / iPad). kperf.html = the built game (HOST mode, the page the player gets) + this script (mkprobe.py injects it).
   Open  kperf.html?kperf=1  →  tap «Bắt đầu đo» (≈ 3 min, do not touch the screen). Each scenario runs after a fresh page load (state kept in sessionStorage); the game frame boots a life, the
   mock files lib/m1/m2/m3/m4/scen are injected, requestAnimationFrame deltas are recorded per segment → p50 / p95 / max ms + dropped frames. idle / live rows = the CONTROL (today's game); target p95 <= 20 ms. */
(function(){
if(!/[?&]kperf=1/.test(location.search)||!/[?&]krot=1/.test(location.search)&&window.top===window&&/[?&]khost=1/.test(location.search))return;/* runs INSIDE the game frame (the host page rewrites itself, so the probe lives in the frame the player's game runs in); direct mode (no host) also works */
const FILES=['lib.js','m1.js','m2.js','m4.js','scen.js'];const SCN=(/[?&]s=([a-z0-9,]+)/.exec(location.search)||(window.top!==window&&/[?&]s=([a-z0-9,]+)/.exec(window.top.location.search))||[0,'idle,live,m1,m2,m4'])[1].split(',');const KEY='kperfRun';
const wait=ms=>new Promise(r=>setTimeout(r,ms));const base=location.href.replace(/[?#].*$/,'').replace(/[^/]*$/,'');
const get=()=>{try{return JSON.parse(sessionStorage.getItem(KEY)||'null')}catch(e){return null}};const set=v=>{try{sessionStorage.setItem(KEY,JSON.stringify(v))}catch(e){}};
let ui;function mkui(){ui=document.createElement('div');ui.id='kperfui';ui.style.cssText='position:fixed;right:6px;top:6px;z-index:2147483000;background:#fbf4eaf2;color:#3a2618;border:1px solid #8a2a1e;border-radius:8px;padding:6px 9px;font:13px/1.35 sans-serif;max-width:92vw;max-height:94vh;overflow:auto';document.documentElement.appendChild(ui);return ui}
function say(h){if(!ui||!ui.isConnected)mkui();ui.innerHTML=h}
function row(r){const ok=r.p95<=20;return `<tr style="color:${ok?'#1c6b3a':'#a22'}"><td>${r.seg}</td><td>${r.p50}</td><td>${r.p95}</td><td>${r.max}</td><td>${r.dropped}/${r.n}</td><td><b>${ok?'ĐẠT':'GIẬT'}</b></td></tr>`}
function table(rows){return `<table border=1 cellpadding=3 style="border-collapse:collapse;font-size:12px"><tr><th>đoạn</th><th>p50 ms</th><th>p95 ms</th><th>max</th><th>rớt khung</th><th></th></tr>${rows.map(row).join('')}</table>`}
async function gameWin(){const t0=Date.now();for(;;){try{if(document.readyState==='complete'&&typeof start==='function'&&typeof kitScene!=='undefined')return window}catch(e){}
 if(Date.now()-t0>240000)throw new Error('game did not start');await wait(400)}}
async function runOne(s){console.log('kp: waiting game');const w=await gameWin();console.log('kp: game ready');await wait(1500);const EV=c=>(0,eval)(c);
 EV(`setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300);SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const dw=document.getElementById('dawn');if(dw){dw.hidden=true;dw.innerHTML='';dw.classList.remove('on')}document.body.classList.remove('kbk-open');S.bac=Math.max(S.bac||0,300);tab='act';render()`);
 await wait(2500);const st=document.createElement('style');st.textContent='#kload,#klife,#dawn,.kne,#kneov,#kroulw,.kroul{display:none!important}';document.head.appendChild(st);
 EV(`document.querySelectorAll('#kroulw,#kroul,.kroul').forEach(e=>e.remove());['curtain','buoitr'].forEach(i=>{const e=document.getElementById(i);if(e)e.classList.remove('on')});Q.length=0;try{render()}catch(e){}`);await wait(800);
 for(const f of FILES){const txt=await (await fetch(base+f+'?v='+Date.now())).text();EV(txt)}
EV(`const R=window.__res=[];let cur=null;window.__seg={seg(n){cur={n,P:MD3.probeStart()}},end(){if(!cur)return;const r=MD3.probeStop();R.push(Object.assign({seg:cur.n},r));cur=null}}`);
 console.log('kp: running '+s);await EV(`SCEN.${s}({})`);console.log('kp: ran '+s);await wait(500);return JSON.parse(JSON.stringify(window.__res))}
async function main(){const run=get();
 if(!run||run.done){const rows=run&&run.rows||[];say(`<b>Đo độ mượt</b> (p95 ≤ 20 ms = đạt)<br><button id="kpgo" style="font:inherit;padding:6px 12px">Bắt đầu đo</button>${rows.length?'<br>'+table(rows)+`<br><textarea id="kpj" style="width:100%;height:50px;font-size:10px" readonly>${JSON.stringify({info:run.info,rows})}</textarea><button id="kpcp">Chép kết quả</button>`:''}<br><small>Mở trên máy thật, để máy yên ≈ 3 phút. idle/live = mốc so sánh (game hôm nay).</small>`);
  document.getElementById('kpgo').onclick=()=>{set({i:0,rows:[],info:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio,cores:navigator.hardwareConcurrency,ua:navigator.userAgent.slice(0,100)}});(window.top||window).location.reload()};
  const cp=document.getElementById('kpcp');if(cp)cp.onclick=()=>{const t=document.getElementById('kpj');t.select();try{document.execCommand('copy')}catch(e){}};return}
 const s=SCN[run.i];say(`Đang đo <b>${s}</b> (${run.i+1}/${SCN.length}) — đừng chạm màn hình`);let r;
 try{r=await runOne(s)}catch(e){r=[{seg:s+' LỖI '+String(e.message||e).slice(0,60),p50:0,p95:999,max:0,dropped:0,n:0}]}
 run.rows=run.rows.concat(r);run.i++;if(run.i>=SCN.length)run.done=true;set(run);window.__kperf=run;
 if(run.done){main()}else{await wait(300);(window.top||window).location.reload()}}
const iv=setInterval(()=>{if(document.readyState==='complete'&&typeof start==='function'&&document.body){clearInterval(iv);setTimeout(main,300)}},200)})();
