/* button-crawl-fix-2 gate (owner OD 25/11 ~05:10Z: every button works and does the RIGHT thing; flight2 co-op save BGMQ held 1998 copies of an
   EMPTY «Tâm trạng · Cung nữ tam đẳng Tố Nguyệt» card): Fold 755x1000 + iPad 1180x820, real taps (dev/test/realtap.js) for every press.
   1) real tap on her mood seal opens «Tâm trạng · Ngươi»; the same look-up opened again (20×) and «Đã biết về X» twice → ONE card per title
   2) ONE real tap on its ✕ closes it and nothing of it is left in the queue
   3) a look-up panel is never saved (serQ); a kit notice (body in m.kit) comes back from the save WITH its body
   4) the real poisoned save shape (BGMQ: 1998× empty Tâm trạng + Kỳ ngộ + empty «Xong việc») loads as Kỳ ngộ only; repeats dropped
   usage: node dev/test/look-dedupe.js [index.html | http URL] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const RT=require('./realtap.js');
const GAME=process.argv[2]||path.join(__dirname,'../../index.html');const DEVS={fold:[755,1000],ipad:[1180,820]};
function serve(file){const root=path.dirname(path.resolve(file)),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);if(!f.startsWith(root)){r.writeHead(403);return r.end()}fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})});sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
const POISON=[];for(let i=0;i<1998;i++)POISON.push({t:'Tâm trạng · Cung nữ tam đẳng Tố Nguyệt',h:'',btn:'Đã rõ'});
POISON.splice(7,0,{t:'Kỳ ngộ',h:'<p>Danh +2; Tố Nguyệt thiện cảm +34</p>'},{t:'Xong việc: Đi một nơi trong cung',h:'',btn:'Đã hiểu'},{t:'Kỳ ngộ',h:'<p>Danh +2; Tố Nguyệt thiện cảm +34</p>'});
let fails=0;const ok=(c,msg)=>{console.log((c?'PASS ':'FAIL ')+msg);if(!c)fails++};
(async()=>{const URL=/^https?:/.test(GAME)?GAME:await serve(GAME);const b=await chromium.launch();
 for(const dev of ['fold','ipad']){const [w,h]=DEVS[dev];const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:dev==='fold',serviceWorkers:'block'});
  const p=await ctx.newPage();await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof showTitle==='function',null,{timeout:180000});await p.waitForTimeout(1500);
  /* harness setup only (not a press): a fresh solo life on its home screen */
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
   for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}/* save-unseen-lists r3: «Nhận thân phận» as a player (as save-boundary-reload newLife) — the identity card is unseen and comes back from the sổ while NLP is open */try{if(typeof nlAccept==='function')nlAccept(false)}catch(e){}try{S.tutTour=1;coachOff&&coachOff()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()});
  for(let i=0;i<8;i++){await p.waitForTimeout(800);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());if(Q.length||!document.getElementById('modal').hidden){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
  const seal=await p.evaluateHandle(()=>[...document.querySelectorAll('img.kemo[data-emo="me"],[data-emo-open="me"]')].find(e=>{const r=e.getBoundingClientRect();return r.width>3&&!e.closest('[hidden]')})||null);
  const rt=RT.make(p,{dev,log:x=>{if(x.k!=='tap')console.log('  realtap',JSON.stringify(x))}});const hit=await rt.tap(seal,{label:'mood seal',screen:'home'});await p.waitForTimeout(800);
  let st=await p.evaluate(()=>({q:Q.length,t:Q[0]&&Q[0].t,body:(document.querySelector('#modal .dlg')||{}).innerText||''}));
  ok(hit&&st.q===1&&/^Tâm trạng · /.test(st.t||'')&&st.body.replace(/\s+/g,'').length>40,`${dev}: real tap on the mood seal opens «${st.t}» with a body (${st.body.length} chars)`);
  st=await p.evaluate(()=>{for(let i=0;i<20;i++)emoBox('me');const v=rivals.find(x=>x.alive);let k=0;if(v&&typeof kitIntelPanel==='function'){try{kitIntelPanel(v);kitIntelPanel(v);k=1}catch(e){}}
   const by={};for(const m of Q)by[m.t]=(by[m.t]||0)+1;return{q:Q.length,by,k}});
  ok(Object.values(st.by).every(n=>n===1),`${dev}: 20× the same look-up (+ «Đã biết về» ×2: ${st.k?'run':'n/a'}) → one card per title ${JSON.stringify(st.by)}`);
  await p.evaluate(()=>{Q=Q.filter(m=>/^Tâm trạng · /.test(m.t));showModal()});await p.waitForTimeout(400);
  const P=await p.evaluate(()=>serQ().map(e=>e.t));ok(P.length===0,`${dev}: look-up panels are not saved (serQ ${JSON.stringify(P)})`);
  const close=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button.kit-x,#modal #mclose')].find(b=>b.getBoundingClientRect().width>3)||null);
  const ch=await rt.tap(close,{label:'✕',screen:'Tâm trạng'});await p.waitForTimeout(600);
  st=await p.evaluate(()=>({q:Q.length,t:JSON.stringify(Q.map(m=>m.t)),hid:document.getElementById('modal').hidden}));ok(ch&&st.q===0&&st.hid,`${dev}: ONE real tap on its ✕ closes it (tap ${ch}, Q ${st.q} ${st.t}, modal hidden ${st.hid})`);
  /* 3) a kit notice comes back whole */
  st=await p.evaluate(()=>{kitModal({kind:'info',title:'Thử sổ',sub:'phụ',subject:S,sections:[{h:'Mục',rows:[['Điều','giá trị thử 123']]}],btn:'Đã rõ'});const L=serQ();const e=L.find(x=>x.t==='Thử sổ');
   Q.length=0;Q=deserQ(JSON.parse(JSON.stringify(L)));showModal();return{e:!!(e&&e.kit),q:Q.length,body:(document.querySelector('#modal .dlg')||{}).innerText||''}});
  ok(st.e&&st.q===1&&/giá trị thử 123/.test(st.body),`${dev}: a kit notice is saved with its kit spec and comes back with its body`);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
  /* 4) the real poisoned save shape */
  st=await p.evaluate(L=>{const out=deserQ(L);return out.map(m=>m.t)},POISON);
  ok(st.length===1&&st[0]==='Kỳ ngộ',`${dev}: poisoned save (2001 entries) loads as ${JSON.stringify(st)}`);
  /* full save → load round trip with the look-up open */
  st=await p.evaluate(()=>{emoBox('me');const d=ser();const n=(d.P||[]).length;Q.length=0;deser(JSON.parse(JSON.stringify(d)));return{n,q:Q.length}});
  ok(st.n===0&&st.q===0,`${dev}: save + load with «Tâm trạng» open → nothing comes back (P ${st.n}, Q ${st.q})`);
  ok(errs.length===0,`${dev}: no page errors ${JSON.stringify(errs.slice(0,3))}`);await ctx.close()}
 await b.close();console.log(fails?`LOOK-DEDUPE FAIL ${fails}`:'LOOK-DEDUPE PASS');process.exit(fails?1:0)})();
