/* story-voice on-screen test (owner 21/11 #61): (1) j84 keeps «nàng» inside quoted speech (the Emperor asks HER), narration still names
   another woman «nàng ta»; (2) every Tân quân lập uy hồi × side reads with the right address and ends by framing her choice;
   (3) a Chính tuyến hồi (j67) without its own question gets the engine closing line; (4) both co-op seats read their own address word
   (kAddr per seat: Sủng of the seat). usage: node dev/test/story-voice/screen.js [url] [WxH] [shotdir] */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');const ROOT=path.join(__dirname,'../..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.writeHead(200,{'Content-Type':/\.html$/.test(f)?'text/html':/\.js$/.test(f)?'text/javascript':'application/octet-stream'});a.end(d)})}).listen(0,()=>r(s))})}
(async()=>{const srv=await serve();const url=process.argv[2]||'file://'+path.join(ROOT,'index.html');const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);const SD=process.argv[4];
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function'&&typeof rgFire==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&S.reign&&!(typeof isSrv==='function'&&isSrv())&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true});
 await p.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 const fails=[];const ok=(c,m)=>{if(!c)fails.push(m)};
 /* 1. VP.fix */
 const v=await p.evaluate(()=>[VP.fix("Ngài quay sang ngươi: “Nàng thấy trẫm nên làm thế nào?”"),VP.fix("Nàng cười nhẹ."),VP.fix("“Trẫm tin nàng.” Nàng cúi đầu.")]);
 console.log('fix',JSON.stringify(v));ok(/“Nàng thấy trẫm/.test(v[0])&&/^Ngài quay sang ta/.test(v[0]),'quote keeps Nàng: '+v[0]);ok(v[1]==="Nàng ta cười nhẹ.",'narration nàng ta: '+v[1]);ok(v[2]==="“Trẫm tin nàng.” Nàng ta cúi đầu.",'mixed: '+v[2]);
 /* 2. every reign beat × side, shown in the real dialog */
 const r=await p.evaluate(async()=>{const out=[];const W=rgW();const ids=Object.keys(RGBT).concat(['emp:e1','emp:e2','emp:e3','th:e1','th:e2','th:e3','quyen:e1','quyen:e2','quyen:e3']);
  for(const side of [null,'emp','th','quyen'])for(const id of ids){S.reign.side=side;W.out=side||'emp';Q.length=0;let f=false;try{f=rgFire(id)}catch(e){out.push({id,side,err:e.message});continue}if(!f||!Q.length)continue;
   showModal();await new Promise(z=>setTimeout(z,120));const tx=(document.querySelector('#modal .mh, #modal .body, #modal')||{}).innerText||'';const h=document.querySelector('#modal').innerText;
   out.push({id,side,t:Q[0].t,h:Q[0].h.replace(/<[^>]*>/g,''),seen:h.slice(0,900)});$("modal").hidden=true;Q.length=0}S.reign.side=null;W.out='';return out});
 let n=0;for(const x of r){if(x.err){fails.push(`${x.id}/${x.side}: ${x.err}`);continue}n++;
  ok(!/“[^”]*[Nn]àng ta[^”]*”/.test(x.seen),`${x.id}/${x.side}: «nàng ta» in speech`);ok(!/[{}]/.test(x.h),`${x.id}/${x.side}: token left`);
  const after=x.h.slice(x.h.lastIndexOf('”')+1);ok(/\?/.test(after)||/\?\s*$/.test(x.h),`${x.id}/${x.side}: no choice frame: …${x.h.slice(-70)}`);
  ok(!/chưa ra khỏi (cửa )?điện/.test(x.h),`${x.id}: obscure line`)}
 const c1=r.find(x=>x.id==='c1a');console.log('c1a seen:',c1&&c1.seen.replace(/\n+/g,' | ').slice(0,600));
 ok(c1&&/(Nàng|Ái phi) thấy trẫm nên làm thế nào\?/.test(c1.seen)&&/Ta nên đáp ra sao\?/.test(c1.seen),'c1a reads right');
 if(SD){fs.mkdirSync(SD,{recursive:true});for(const id of ['c1a','c2a','c4b']){await p.evaluate(id=>{S.reign.side=id==='c4b'?'emp':null;Q.length=0;rgFire(id);showModal()},id);await p.waitForTimeout(500);await p.screenshot({path:`${SD}/rg-${id}-${W}x${H}.png`});await p.evaluate(()=>{$("modal").hidden=true;Q.length=0})}}
 /* 3. engine frame on a j67 hồi */
 const j=await p.evaluate(()=>{const a=svFrame("Thư nhà thưa dần. Cha không hỏi ý ngươi nữa."),b=svFrame("Hắn nói: “Xin tiểu chủ giúp cho.”"),c=svFrame("Ngài hỏi: “Nàng nghĩ sao?”"),d=svFrame("Ngài hỏi: “Nàng nghĩ sao?” Ngươi nên đáp thế nào?");
  let real=null;try{Q.length=0;const k=Object.keys(ARC67).find(id=>ARC67[id].o&&ARC67[id].o!=="rd");if(typeof startArc67==="function"){}}catch(e){}return{a,b,c,d}});
 console.log('frame',JSON.stringify(j));ok(/\?$/.test(j.a)&&/\?$/.test(j.b)&&/\?$/.test(j.c),'engine frame');ok(j.d==="Ngài hỏi: “Nàng nghĩ sao?” Ngươi nên đáp thế nào?",'framed text kept');
 /* 4. two seats: the Emperor's word follows each seat's own Sủng (kAddr, one core) */
 const s=await p.evaluate(()=>{const s0=S.sung;S.sung=BAL.voice.aiPhi+5;const hi=kSay("emp",S,"“{Goi} nghĩ sao?”");S.sung=BAL.voice.aiPhi-5;const lo=kSay("emp",S,"“{Goi} nghĩ sao?”");S.sung=s0;return{hi:VP.fix(hi),lo:VP.fix(lo)}});
 console.log('seats',JSON.stringify(s));ok(s.hi==="“Ái phi nghĩ sao?”"&&s.lo==="“Nàng nghĩ sao?”",'seat address');
 console.log(`beats shown ${n}; errors ${errs.length}`);if(errs.length)fails.push('page errors: '+errs.slice(0,3).join(' | '));
 console.log(fails.length?'FAIL\n'+fails.slice(0,30).join('\n'):'PASS');await b.close();srv.close();process.exit(fails.length?1:0)})();
