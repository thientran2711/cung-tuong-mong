/* button-crawl-fix-6 gate (F #12 25/11 12:53Z; BIG REVIEWER #4 bc-stack-review.md @3b8ed32e; robot s4d no-clock loops, handover 37cfc029):
   «never a greyed «Sang buổi» with nothing on screen» — the two members fix-5 did not cover, real taps (dev/test/realtap.js), Fold 755x1000 + iPad 1180x820:
   A) a visitor scene («Có người đến», jdfv encounter) parked by a tab change: the greyed button says «Có người đang đợi · về phòng», ONE tap on it brings her
      back to her room with the scene; after the visit «Sang buổi» turns. Needs the robot save: NEXT_SAVE=<flight2-s4d-loop3/loop-3-save.json> (skipped without it).
   B) a stale S.mg (no mini-game on screen): healed within BAL.dayq.wake (unknown kind → cleared; a real lesson → its screen comes back, as on load); then «Sang buổi» turns.
   The title → save path is played with real taps («Vào cung ngay», «Chơi một mình», «Tiếp tục kiếp này»).
   usage: [NEXT_SAVE=save.json] node dev/test/next-dead.js [index.html|URL] [fold,ipad] */
/* probe helpers (ROLE B #5): serve a build, load a robot save, real taps only via dev/test/realtap.js */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const RT=require('./realtap.js');
const DEVS={fold:[755,1000],ipad:[1180,820]};
function serve(file){const root=path.dirname(path.resolve(file)),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
async function open(game,dev,ls,{noimg=false}={}){const URL=/^https?:/.test(game)?game:await serve(game);const b=await chromium.launch();const [w,h]=DEVS[dev];
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:dev==='fold',serviceWorkers:'block'});
 if(ls)await ctx.addInitScript(ls=>{if(sessionStorage.getItem('p5ls'))return;sessionStorage.setItem('p5ls','1');localStorage.clear();for(const k in ls)localStorage.setItem(k,ls[k])},ls);
 const p=await ctx.newPage();await p.route(noimg?/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm|wav)(\?|$)/i:/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/i,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500);
 const rt=RT.make(p,{dev,log:x=>{if(x.k!=='tap')console.log('  realtap',JSON.stringify(x).slice(0,300))}});
 const vis=()=>p.evaluate(()=>[...document.querySelectorAll('button,[role=button],.kbtn,.tok')].filter(e=>{const r=e.getBoundingClientRect();if(r.width<3||r.height<3)return false;const cs=getComputedStyle(e);return cs.visibility!=='hidden'&&cs.display!=='none'&&r.bottom>0&&r.top<innerHeight}).map(e=>{const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const t=document.elementFromPoint(x,y);return (e.textContent||e.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,40)+(t&&(t===e||e.contains(t))?'':' [COV '+(t?t.tagName+'#'+t.id+'.'+String(t.className).slice(0,30):'-')+']')}));
 const byText=(re,root='body')=>p.evaluateHandle(([re,root])=>{const R=new RegExp(re);return [...document.querySelectorAll(root+' button,'+root+' [role=button],'+root+' .kbtn')].filter(e=>{const r=e.getBoundingClientRect();return r.width>3&&R.test((e.textContent||e.getAttribute('aria-label')||'').trim())}).pop()||null},[re,root]);
 const tapT=async(re,root)=>{const ok=await rt.tap(await byText(re,root),{label:re,screen:'probe'});console.log('tap',re,ok);await p.waitForTimeout(1500);return ok};
 const st=()=>p.evaluate(()=>({q:Q.length,qt:Q.map(m=>m.t).slice(0,6),modal:!document.getElementById('modal').hidden,mt:(document.querySelector('#modal:not([hidden]) h2,#modal:not([hidden]) .kit-title')||{}).textContent,dawn:!!document.getElementById('dawn'),dawnc:(document.getElementById('dawn')||{}).className,next:(document.getElementById('next')||{}).disabled,nextT:(document.getElementById('next')||{}).textContent,buoi:typeof S!=='undefined'&&S&&(S.buoi||S.t||S.day),mg:typeof S!=='undefined'&&S&&!!S.mg}));
 let n=0;const shot=async(nm)=>{const f=`${process.env.OUT||require('os').tmpdir()}/${dev}-${String(++n).padStart(2,'0')}-${nm}.png`;await p.screenshot({path:f});console.log('shot',f)};
 return {b,p,rt,vis,byText,tapT,st,shot,errs};}

/* title → the saved life, real taps; the first-visit #kload card («Vào cung ngay») may come up at any time */
async function enter(X){const {p}=X;for(let i=0;i<25;i++){const s=await p.evaluate(()=>{const k=document.getElementById('kload');const t=document.getElementById('title');const kv=k&&!k.hidden&&getComputedStyle(k).display!=='none'&&k.getBoundingClientRect().height>10;return{k:!!kv,kb:kv?[...k.querySelectorAll('button')].map(b=>b.textContent.trim()).join('|'):'',t:!!(t&&!t.hidden)}});
 if(s.k&&/Vào cung ngay/.test(s.kb)){await X.tapT('^Vào cung ngay','#kload');continue}
 if(s.t&&!s.k){const tk=await p.evaluate(()=>[...document.querySelectorAll('#modal button')].some(b=>/^Tiếp tục kiếp này/.test(b.textContent.trim())));if(tk){await X.tapT('^Tiếp tục kiếp này','#modal');await p.waitForTimeout(4000);continue}const solo=await p.evaluate(()=>[...document.querySelectorAll('#modal button')].some(b=>/^Chơi một mình/.test(b.textContent.trim())));if(solo){await X.tapT('^Chơi một mình','#modal');await p.waitForTimeout(2500);continue}}
 if(!s.t&&!s.k)return true;await p.waitForTimeout(1000)}return false}

/* (body) fix-6 proof, real taps: (A) s4d loop-3 save: visitor «Có người đến» parked by a tab change → cue + one tap on the greyed button brings her back → the visit
   goes on («Tiếp ▸» real taps) → «Sang buổi» turns the buổi. (B) stale S.mg (no mini-game on screen) → healed within BAL.dayq.wake; «Sang buổi» turns. */

let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
(async()=>{const game=process.argv[2]||require('path').join(__dirname,'../../index.html');for(const dev of (process.argv[3]||'fold,ipad').split(',')){
 {const SV=process.env.NEXT_SAVE;if(!SV){console.log('SKIP A (no NEXT_SAVE)')}else{const raw=fs.readFileSync(SV,'utf8');const d={ls:{'hclh-save-v2-1':raw,'hclh-slot':'1'}};const X=await open(game,dev,d.ls);const {p,rt}=X;await enter(X);await p.waitForTimeout(4000);
  const st=()=>p.evaluate(()=>({q:Q.length,q0:Q[0]&&Q[0].t,tab,next:$('next').disabled,nt:$('next').textContent.trim(),turn:S.turn,buoi:S.buoi,foc:[...document.querySelectorAll('.kfoc')].filter(e=>!e.hidden).length}));
  let s=await st();ok(s.q0==='Có người đến'&&s.foc===1,`${dev} A0 save loaded, visitor scene in her room (${JSON.stringify(s)})`);
  await X.tapT('^Dư đồ$');await p.waitForTimeout(1500);s=await st();
  ok(s.tab==='go'&&s.next&&/Có người đang đợi/.test(s.nt),`${dev} A1 on Dư đồ the greyed button says where («${s.nt}»)`);await X.shot('A1');
  await rt.tap(await p.evaluateHandle(()=>{const n=$('next');n.disabled=n.disabled;return n}),{label:'cue',screen:'Dư đồ'}).catch(()=>{});
  /* realtap refuses [disabled]: a person's finger still lands on it — tap its centre */
  const r=await p.evaluate(()=>{const b=$('next').getBoundingClientRect();const t=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2);return{x:b.left+b.width/2,y:b.top+b.height/2,hit:!!t&&!!t.closest('#next')}});
  if(dev==='fold')await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);await p.waitForTimeout(1500);s=await st();
  ok(r.hit&&s.tab==='act'&&s.foc===1,`${dev} A2 one tap on it → back in her room, the visitor scene on screen (${JSON.stringify(s)})`);await X.shot('A2');
  const t0=s.turn*10+s.buoi;
  for(let i=0;i<25;i++){s=await st();if(!s.next&&s.q===0)break;const h=await p.evaluateHandle(()=>{const V=e=>{const r=e.getBoundingClientRect();if(r.width<3)return false;const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return t&&(t===e||e.contains(t))&&!e.disabled};
   const B=[...document.querySelectorAll('.kfoc button,#modal button,.kmov button')].filter(V);return B.find(b=>/^(Tiếp|Đã rõ|Nhận|Lui|Để sau)/.test(b.textContent.trim()))||B.find(b=>/kit-x|kfoc-x/.test(b.className))||B[B.length-1]||null});
   if(!(await h.evaluate(e=>!!e))){await p.waitForTimeout(1500);continue}await rt.tap(h,{label:'go on',screen:'visit'});await p.waitForTimeout(1300)}
  s=await st();console.log('  before Sang',await p.evaluate(()=>JSON.stringify({M:$('modal').hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),cls:Q[0]&&Q[0].cls,kind:Q[0]&&Q[0].kind,dis:$('next').disabled,attr:$('next').getAttribute('disabled'),aria:$('next').getAttribute('aria-disabled'),cue:$('next').dataset.dqCue})));await X.shot('A3pre');let s2;for(let k=0;k<4;k++){await rt.tap('#next',{label:'Sang',screen:'room'});await p.waitForTimeout(3000);s2=await st();if(s2.turn*10+s2.buoi!==t0)break;
   /* a card that came up at that moment (e.g. «Điều mới trong cung», jnotes calm-time notice): close it with a real tap, then try again */
   const c=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(b=>b.getBoundingClientRect().width>3&&(/kit-x/.test(b.className)||/^(Đã hiểu|Đã rõ|Lui)$/.test(b.textContent.trim())))||null);if(await c.evaluate(e=>!!e)){await rt.tap(c,{label:'close',screen:'card'});await p.waitForTimeout(1200)}}
  ok(s2.turn*10+s2.buoi!==t0,`${dev} A3 after the visit «Sang buổi» turns the buổi (${JSON.stringify(s)} → ${JSON.stringify(s2)})`);
  console.log('errs',X.errs.slice(0,3));await X.b.close()}}
 {const X=await open(game,dev,null);const {p,rt}=X;
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render()});
  for(let i=0;i<5;i++){await p.waitForTimeout(700);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
  const st=()=>p.evaluate(()=>({mg:!!S.mg,ov:!$('ov').hidden,next:$('next').disabled,buoi:S.buoi,turn:S.turn}));
  /* setup: a stale record (unknown kind) and a real lesson record left without its screen (as after a lost screen) */
  for(const k of ['stale','real']){for(let i=0;i<4;i++){await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,[id^=kroul],#dawn').forEach(e=>e.remove())})}await p.evaluate(k=>{if(k==='stale')S.mg={k:'zz',l:1};else{const a=ARTS[0];S.mg={k:a.k,l:1}}render()},k);
   const W=await p.evaluate(()=>BAL.dayq.wake);await p.waitForTimeout(W+2200);let s=await st();
   ok(k==='stale'?(!s.mg&&!s.next):(s.ov||(!s.mg&&!s.next)),`${dev} B ${k} S.mg with no mini-game on screen → healed within ${W}+ ms (${JSON.stringify(s)})`);
   if(s.ov){await p.evaluate(()=>{});await X.shot('B-'+k);/* the lesson game is back on screen: leave it with its ✕ (real tap) */const x=await p.evaluateHandle(()=>[...document.querySelectorAll('#ov button')].find(b=>/^Bỏ qua/.test(b.textContent.trim())&&b.getBoundingClientRect().width>3)||null);
    await rt.tap(x,{label:'✕',screen:'mg'});await p.waitForTimeout(1500);for(let i=0;i<6;i++){const y=await p.evaluateHandle(()=>[...document.querySelectorAll('#ov button,#modal button')].find(b=>b.getBoundingClientRect().width>3&&(/^(Bỏ|Thôi|Đã rõ|Nhận|Xong|Lui|Tiếp)/.test(b.textContent.trim())||/kit-x/.test(b.className)))||null);if(!(await y.evaluate(e=>!!e)))break;await rt.tap(y,{label:'close',screen:'mg'});await p.waitForTimeout(1200)}
    await X.shot('B-closed');s=await st();console.log('  after closing the game',JSON.stringify(s))}
   const b0=s.turn*10+s.buoi;if(!s.next){await rt.tap('#next',{label:'Sang',screen:'home'});await p.waitForTimeout(2500)}const s2=await st();
   ok(s2.turn*10+s2.buoi!==b0,`${dev} B ${k} then «Sang buổi» turns (${JSON.stringify(s2)})`);await p.evaluate(()=>{Q.length=0;$('modal').hidden=true;document.querySelectorAll('#dawn,.kmov').forEach(e=>e.remove());render()});await p.waitForTimeout(800)}
  console.log('errs',X.errs.slice(0,3));await X.b.close()}}
 console.log(fails?`FIX-6 FAIL ${fails}`:'FIX-6 PASS');process.exit(fails?1:0)})();
