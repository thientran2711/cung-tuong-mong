/* E22h (round C r2): fix 4 = ONE value for the quick option «Để tài nghệ quyết định» on every pm board (jpma pmSk / pmQuick = jmgt mgSkipRaw(mgTier(kind,{occ:"pm",rank:R}))),
   playArt scores quick.raw and the sub text prints the same number, no typed fallback; fix 3 = the 7×7 Cờ board is a KG82 kind (co7) that Thử tay lists and plays to its own BAL.pm.ky mark.
   usage: node dev/test/pm-quick-co7.test.js [dev/index.html] → exit 1 on FAIL */
const path=require('path'),fs=require('fs');const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const HTML=process.argv[2]||'dev/index.html';
(async()=>{
 const src=fs.readFileSync(path.join(__dirname,'../build/jpma.js'),'utf8');
 const typed=(src.match(/SK=5\b|tính 5\/10|return 5\b|raw:5\b|catch\(e\)\{return 5\}/g)||[]);
 ok(!typed.length,'4 jpma: no typed quick value / fallback 5 left (SK=5, «tính 5/10», return 5, raw:5)',typed);
 const sites=(src.match(/quick:(pmQuick\(|QK\b)/g)||[]).length;ok(sites>=4,'4 every pm quick option reads pmQuick (Cùng chơi, NPC Cờ, live Cờ, live timed)',{sites});
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;window.kitNotice=undefined;window.ptOn=()=>false});
 const r=await p.evaluate(()=>{const o={bad:[],byR:{}};const kinds=["co","dan","ve","tho","hoa"].filter(k=>KG82_KIND[k]);
  for(const k of kinds){o.byR[k]=[];for(let R=0;R<=8;R++){const q=pmQuick(k,R),v=mgSkipRaw(mgTier(k,{occ:"pm",rank:R}));o.byR[k].push(q.raw);if(q.raw!==v||!q.sub.includes(`(${v}/10)`))o.bad.push([k,R,q,v])}}return o});
 ok(!r.bad.length,'4 pmQuick(kind,R).raw = mgSkipRaw(mgTier(kind,{occ:"pm",rank:R})) and the sub text prints it, every kind × rank',r.bad.slice(0,3));
 const varies=Object.values(r.byR).some(a=>new Set(a).size>1),mono=Object.values(r.byR).every(a=>a.every((x,i)=>!i||x<=a[i-1]));
 ok(varies&&mono,'5 the quick value is not flat: lower (never higher) as the rank R climbs',r.byR);
 const sk=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out=[];
  for(const [k,R] of [["dan",0],["dan",6],["co",3]]){let got=null;const q=pmQuick(k,R);playArt({art:k,title:"thử",occ:"pm",rank:R,quick:q,onDone:raw=>{got=raw}});await sleep(300);
   const s=document.getElementById('kg82skip');if(s)s.click();await sleep(300);const t=(document.getElementById('kg82box-res')||{}).textContent||'';const okb=document.getElementById('kg82ok');if(okb)okb.click();await sleep(200);
   out.push({k,R,q:q.raw,got,shown:t.includes(`${q.raw}/10`)});try{kg82Close(true)}catch(e){}}return out});
 ok(sk.every(x=>x.got===x.q&&x.shown),'4 playArt quick option scores quick.raw (result card + onDone = the number the sub printed)',sk);
 const c7=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};o.listed=mgCalKinds().includes("co7");o.eng=KG82_KIND.co7&&KG82_KIND.co7.e;
  BAL.pm.ky.ai.think=60;mgCalRun("co7");await sleep(400);const go=document.getElementById('kg82go');o.go=!!go;if(go)go.click();await sleep(600);o.board=!!document.querySelector('#kg82 .goban');
  o.guard=KG82_KIND.co7.guard===BAL.pm.ky.guard;
  for(let n=0;n<160&&!document.getElementById('mgcal-nx');n++){const q=KG82.peek&&KG82.peek();const el=q&&q.sel&&document.querySelector(q.sel);if(el&&!el.disabled)el.click();await sleep(250)}
  const t=(document.getElementById('kg82box-res')||{}).textContent||'';const m=/Hồi 1\s*(\d+)\/10/.exec(t.replace(/\s+/g,' '));o.raw=m?+m[1]:null;const K=BAL.pm.ky;
  o.legal=o.raw!=null&&(o.raw===K.win||o.raw===K.draw||K.lose.includes(o.raw));try{kg82Close(true)}catch(e){}return o});
 ok(c7.listed&&c7.eng==='gomoku'&&c7.go&&c7.board&&c7.guard,'3 Thử tay lists «Cờ năm quân» (co7, engine gomoku) and opens the 7×7 board',c7);
 ok(c7.legal,'3 a Thử tay round on the 7×7 board ends on its own BAL.pm.ky mark (win / hòa / loss table, not re-graded)',c7);
 ok(!errs.length,'no page error',errs.slice(0,5));
 await b.close();const pass=res.every(Boolean);console.log((pass?'PASS':'FAIL')+' '+res.filter(Boolean).length+'/'+res.length);process.exit(pass?0:1)})().catch(e=>{console.error(e);process.exit(1)});
