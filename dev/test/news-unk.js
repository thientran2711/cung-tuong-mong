/* review/news-unk-fix (E-S7 bug 25/11, LAW 11 FIX THE WHOLE GROUP): a raw «???» name placeholder must NEVER print in PROSE — «Tin báo» news,
   rumours, logs, Tuần lục, notices, result lines, dialogue text. «???» is allowed ONLY as the name on a person card / stage label / name chip
   (.kname .kti .krname .kptag .ktag .kpname .kprank .kname2 .kan). An unknown person in prose reads «một vị <tước>» (the j61 k61Mask plain wording
   through kitNoUnk) — no new mask. Root cause: jnotice plain() stripped tags AFTER kitNoUnk, so the protected chip «<b class="kname">Đáp ứng ???</b>»
   became the bare words «Đáp ứng ???» (Tin báo rows, tin-bao text, kitKnow lines).
   Parts (one table, exit 1 on any hit):
     S  static: every tag-strip site in dev/build/j*.js (replace(/<[^>]+>/g…)) listed with its masked/unmasked status (info) + jnotice plain() masks.
     T  taps (HOST mode, real touch): Fold 755x1000 + iPad 1180x820, strangers in the court; notices raised through the REAL paths (knBao → tinBaoOn →
        kitNotice, kitKnow, log, pushModal, kaResultRows); the «!» box is TAPPED with the touchscreen, the «Tin báo» dialog text is read; no «???» outside a
        name chip; the name chip itself (kitName) still shows «???» (card / stage label masking unchanged).
     L  live: the bot plays MONTHS (default 6) with a stranger-heavy court on each device; EVERY step the prose surfaces are scanned:
        notice list (line / text / items), S.logs, Q modals, #panel / #modal / #kntchip / #kntbox DOM prose (text nodes outside name chips).
   usage: NODE_PATH=$(npm root -g) [MONTHS=6] [SHOTS=outdir] node dev/test/news-unk.js */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const sleep=t=>new Promise(r=>setTimeout(r,t));
const ROOT=path.resolve(__dirname,'../..');const MONTHS=+process.env.MONTHS||6;const SHOTS=process.env.SHOTS||'';if(SHOTS)fs.mkdirSync(SHOTS,{recursive:true});
let bad=0;const rows=[];const rep=(k,m)=>{rows.push([k,m]);console.log(k.padEnd(9),m);if(!/^ok|^info|^S-info/.test(k))bad++};
/* ---- S: static ---- */
const B=path.join(ROOT,'dev/build');const src={};for(const f of fs.readdirSync(B))if(/^j.*\.js$/.test(f))src[f]=fs.readFileSync(path.join(B,f),'utf8');
{const jn=src['jnotice.js'];if(!/const plain=s=>kitNoUnk\(/.test(jn))rep('S-FAIL','jnotice.js plain() does not run kitNoUnk AFTER the tag strip (protected name chip leaks «???» as prose)');else rep('ok','S jnotice plain() masks after the tag strip (ONE place for notice line / text / items / kitKnow / tin-bao text)');
 let n=0,masked=0;const un=[];for(const [f,t] of Object.entries(src))t.split('\n').forEach((ln,i)=>{if(/replace\(\/<\[\^>\]\+>\/g/.test(ln)){n++;if(/kitNoUnk|k61Scrub|k61Mask/.test(ln)||f==='jnotice.js')masked++;else un.push(f+':'+(i+1))}});
 rep('S-info',`tag-strip sites ${n}; with a mask on the line ${masked}; others ${un.length} (their text reaches the screen only through log()/showModal()/kitNotice()/render(), which all run kitNoUnk; the live scan L proves it)`)}
/* ---- shared in-page helpers ---- */
const HELP=`(function(){
 window.__nu={hits:[],seen:{}};const NAME=".kname,.kti,.krname,.kptag,.ktag,.kpname,.kprank,.kname2,.kan";
 const strip=x=>{const d=document.createElement("div");d.innerHTML=String(x==null?"":x);d.querySelectorAll(NAME).forEach(e=>e.remove());return d.textContent.replace(/\\s+/g," ").trim()};
 window.__nuAdd=(surf,txt)=>{if(String(txt).indexOf("???")<0)return;const k=surf+"|"+String(txt).slice(0,90);if(__nu.seen[k])return;__nu.seen[k]=1;__nu.hits.push({surf,txt:strip(txt).slice(0,150)})};
 window.__nuDom=(surf,root)=>{try{if(!root||!root.getClientRects().length)return;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(n.nodeValue.indexOf("???")<0)continue;const e=n.parentElement;if(!e||e.closest(NAME))continue;const cs=getComputedStyle(e);if(cs.display==="none"||cs.visibility==="hidden")continue;__nuAdd(surf,(e.closest("li,p,div,button")||e).textContent)}}catch(x){}};
 window.__nuAll=()=>{try{
  (typeof kitNoticeList==="function"?kitNoticeList():[]).forEach(x=>{__nuAdd("notice.line",strip(x.line));__nuAdd("notice.text",strip(x.text));(x.items||[]).forEach(t=>__nuAdd("notice.items",strip(t)))});
  (typeof S!=="undefined"&&S&&S.logs||[]).slice(0,12).forEach(t=>__nuAdd("S.logs",strip(t)));
  for(const [s,sel] of [["#modal","#modal"],["#panel","#panel"],["#kntchip","#kntchip"],["#kntbox","#kntbox"],["#log","#log"],["#book","#kbook,#kbk,.kbook"],["toast",".ktbt,.ktoast"]])document.querySelectorAll(sel).forEach(r=>__nuDom(s,r))}catch(x){}};
})();`;
const prep=async g=>{await g.evaluate(HELP)};
const boot=async(g,seed)=>{await g.evaluate(s=>{let a=s;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const st=document.createElement('style');st.textContent='#kroul,#kload,#klife,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(st)},seed)};
const DEVS=['fold','ipadAir'];
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();
 for(const dev of DEVS){
  /* ---- T: real taps, HOST mode ---- */
  {const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(120000);
   await p.addInitScript(()=>{window.__toastKeep=1});
   const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
   await boot(g,3596068797);await sleep(3500);await prep(g);const clr=async()=>{for(let i=0;i<5;i++){await g.evaluate(()=>{try{Q.length=0;const m=document.getElementById('modal');m.hidden=true;document.body.classList.remove('kdlg-on','kbk-open')}catch(e){}});await sleep(400)}};await clr();
   const info=await g.evaluate(()=>{const st=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&k61St(v)<1&&(S.met||{})[v.id]==null);const [a,c]=st;const s=(S.staff||[])[0]||S.maid;
    const ka=kitName(a),kc=kitName(c);const nm=h=>String(h).replace(/<[^>]+>/g,"");
    /* the three E-S7 lines, through the real paths */
    knBao(s,S,`nghe thái giám ${kitName(c)} kể: ${ka} bán bớt đồ`,palaceOf(S),false,false);
    knBao(s,S,`${ka} múa trong yến tiệc`,palaceOf(S),false,false);
    kitKnow({key:"nu1",text:`${kc} múa trong yến tiệc`,pri:1});kitKnowFlush();
    kitNotice({id:"nu-r",line:`Nghe nói ${ka} gặp kỳ ngộ với ${kc}: Danh +2; cung nữ ${kc} thiện cảm +30.`,again:true});
    try{log(`${ka} bán bớt đồ; ${kc} múa trong yến tiệc.`)}catch(e){}
    pushModal({t:"Tin cung",h:`<p>Đáp ứng ??? bán bớt đồ; nô tỳ nghe thái giám ??? kể.</p>`});showModal();window.__nuQ=document.getElementById("modal").innerText;
    return{chipA:nm(ka),chipC:nm(kc),n:kitNoticeList().length}});
   if(!/\?\?\?/.test(info.chipA)||!/\?\?\?/.test(info.chipC))rep('T-FAIL',`${dev} name chip lost its «???» (card / stage label masking must stay): «${info.chipA}»`);else rep('ok',`T ${dev} name chip keeps «???» (${info.chipA})`);
   /* the pushModal dialog text (dialogue prose) is read while it is open, then closed; then TAP the «!» box */
   await sleep(600);await g.evaluate(()=>__nuAll());const qt=await g.evaluate(()=>window.__nuQ||"");if(/\?\?\?/.test(qt))rep('T-???',`${dev} dialog text :: ${qt.replace(/\s+/g," ").slice(0,140)}`);
   const pre=await g.evaluate(()=>{const h=__nu.hits.slice();return h});
   pre.forEach(h=>rep('T-???',`${dev} ${h.surf} :: ${h.txt}`));
   await clr();await g.evaluate(()=>{try{kitNoticeSeen&&0}catch(e){}});
   const box=await g.evaluate(()=>{const e=document.getElementById('kntbox');if(!e)return null;const r=e.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,w:r.width}});
   if(!box)rep('T-FAIL',`${dev} no «!» box`);
   else{const fr=await p.evaluate(()=>{const f=document.getElementById('krotf');if(!f)return null;const r=f.getBoundingClientRect();return{l:r.left,t:r.top,w:r.width,h:r.height,iw:f.contentWindow.innerWidth}});
    /* box coords are inside the frame (host mode): map through the frame scale */
    const sc=fr?fr.w/fr.iw:1;const X=(fr?fr.l:0)+box.x*sc,Y=(fr?fr.t:0)+box.y*sc;await p.touchscreen.tap(X,Y);await sleep(1800);
    const panel=await g.evaluate(()=>{const m=document.getElementById('modal');const li=[...document.querySelectorAll('#modal .kntl li')].map(x=>x.textContent.trim());return{open:!!(m&&!m.hidden),title:(document.querySelector('#modal .kptitle,#modal h2,#modal .kpt')||{}).textContent||'',li,txt:m?m.innerText:''}});
    if(!panel.open||!panel.li.length)rep('T-FAIL',`${dev} the tap on «!» did not open the «Tin báo» dialog (${JSON.stringify(panel).slice(0,120)})`);
    else{await g.evaluate(()=>__nuAll());const hh=await g.evaluate(()=>__nu.hits.slice());hh.forEach(h=>{if(!pre.some(x=>x.surf===h.surf&&x.txt===h.txt))rep('T-???',`${dev} ${h.surf} :: ${h.txt}`)});
     const q=panel.li.filter(t=>/\?\?\?/.test(t));q.forEach(t=>rep('T-???',`${dev} Tin báo row :: ${t}`));
     rep(q.length?'T-FAIL':'ok',`T ${dev} Tin báo dialog opened by a real tap: ${panel.li.length} rows, «???» rows ${q.length}; sample «${panel.li.slice(0,3).join(' | ').slice(0,200)}»`)}
    if(SHOTS)await p.screenshot({path:path.join(SHOTS,`${dev}.png`)})}
   rep(errs.length?'T-FAIL':'ok',`T ${dev} page errors ${errs.length} ${errs.slice(0,2).join(' ')}`);await ctx.close()}
  /* ---- L: live bot, direct mode ---- */
  {const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
   await p.addInitScript(()=>{window.__toastKeep=1;let a=3596068797;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
   await D.openDirect(p,srv.url);await p.waitForFunction(()=>typeof start==='function'&&typeof kaResultRows==='function',null,{timeout:120000});await sleep(1500);
   await p.addScriptTag({content:fs.readFileSync(path.join(ROOT,'dev/measure/inpage4.js'),'utf8')});
   await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true});
   await p.evaluate(HELP);
   await p.evaluate(()=>{window.__mc=0;const l1=window.log;window.log=log=function(h){const r=l1.apply(this,arguments);try{const k=S.year+'/'+S.month+'/'+S.tuan;if(__nu.last!==k){__nu.last=k;__mc++}__nuAll()}catch(e){}return r};start()});
   await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
   let guard=0,opened=0;while(guard++<600){const n=await p.evaluate(()=>window.__mc||0);if(n>=MONTHS*4)break;
    await p.evaluate(()=>window.__bot.step('sens',200));
    /* every few steps: open the Tin báo panel for real and read it */
    if(guard%6===0){const o=await p.evaluate(()=>{try{__nuAll();if(kitNoticeList().length){kitNoticeOpen();window.__nuOp=(window.__nuOp||0)+1;const f=()=>{__nuDom("Tin báo panel",document.getElementById("modal"))};f();setTimeout(f,300);setTimeout(()=>{try{Q.length=0;document.getElementById('modal').hidden=true}catch(e){}},500)}}catch(e){}return window.__nuOp||0});opened=o}}
   await p.evaluate(()=>__nuAll());
   const L=await p.evaluate(()=>({hits:__nu.hits,months:Math.round((window.__mc||0)/4),notices:(typeof kitNoticeList==="function"?kitNoticeList().length:0),logs:(S.logs||[]).length}));
   rep('info',`L ${dev} ${L.months} months played, ${opened} Tin báo panels opened, notices ${L.notices}, log lines ${L.logs}`);
   L.hits.forEach(h=>rep('L-???',`${dev} ${h.surf} :: ${h.txt}`));if(!L.hits.length)rep('ok',`L ${dev} no «???» in any prose surface`);
   rep(errs.length?'L-FAIL':'ok',`L ${dev} page errors ${errs.length} ${errs.slice(0,2).join(' ')}`);await ctx.close()}
 }
 await b.close();srv.close();console.log(bad?'FAIL':'PASS',bad,'hits');process.exit(bad?1:0)})();
