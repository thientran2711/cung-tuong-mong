/* owner final names (11/15) check: visits every main tab, counts on-screen "ngươi" outside “…” quotes (must be 0), checks an NPC
   quote keeps "Ngươi", and screenshots 3 screens (Phi tần person list, title with Cùng hảo hữu, a card with narration + quote).
   usage: node dev/test/naming.js <site url> <W>x<H>@dpr <outdir> <tag> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */
const [,,URL,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.VP);await p.waitForTimeout(2500);
 const shot=async n=>{for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:78});break}catch(e){await p.waitForTimeout(2000)}}};
 const R={};
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();const s=document.createElement("style");s.textContent=".kroul{display:none!important}";document.head.appendChild(s)});
 await p.waitForTimeout(800);await shot('1-title');
 R.title=await p.evaluate(()=>[...document.querySelectorAll('#title button')].map(b=>b.innerText.replace(/\s+/g,' ')).join(' | '));
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await p.waitForTimeout(400);if(!await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;try{nlNew()}catch(e){}start()}return s}))break}
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 const scan=()=>p.evaluate(()=>{const out=[];const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while((n=w.nextNode())){const e=n.parentElement;if(!e||!e.offsetParent||/SCRIPT|STYLE/.test(e.tagName))continue;const s=n.nodeValue.replace(/“[^”]*(”|$)/g,"").replace(/^[^“”]*”/,"");if(/(^|[^\p{L}])[Nn]gươi([^\p{L}]|$)/u.test(s))out.push(n.nodeValue.trim().slice(0,70))}return out});
 R.left={};
 for(const t of ["act","go","rv","rel","fac","staff","kid","inv","art","story","log","court"]){await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click();else{try{tab=t;render()}catch(e){}}},t);await p.waitForTimeout(500);R.left[t]=await scan();if(t==="rel")await shot('2-giaotinh');}
 R.tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button')].map(b=>b.textContent.trim()).join(' | '));R.next=await p.evaluate(()=>document.getElementById('next').textContent);
 await p.evaluate(()=>{Q.push({t:"Hoàng hậu triệu kiến",h:`<p>Hoàng hậu nhìn ngươi hồi lâu rồi nói: “Ngươi to gan thật.”</p><p>Con của ngươi đang ngủ trong tẩm cung của ngươi.</p>`,btn:"Đã hiểu"});showModal()});
 await p.waitForTimeout(700);R.card=await p.evaluate(()=>document.getElementById('mb').innerText);await shot('3-card');
 console.log(JSON.stringify({TAG,R,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
