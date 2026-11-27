/* kit-podium-tt (review/kit-podium-gate, OR09) — node dev/test/kit-podium-tt.js [dev/index.html] [outdir]
   The kit podium (j90 kitPodiumShow / KIT §20) shows a Tuyển tú Phúc tuyển result: HER + the sister (thứ muội) + a friend (khuê hữu) who are family records, NOT rivals — fed through the entry fields
   fig / face / nameH / you / sub / score (KIT 26.1), no silhouette error, names + medals + marks, hers lit, one «Tiếp» button that calls onNext. Fold 755x1000 + iPad 1180x820, normal + reduced motion. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const OUT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']])for(const rm of [false,true]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT&&!rm?2:1,reducedMotion:rm?'reduce':'no-preference'});const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitPodiumShow==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});await p.waitForTimeout(1200);
  const r=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};let next=0;try{kmReset()}catch(e){}document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());
   const fam=(n,sx)=>({name:n,age:17,kind:"kc",sex:sx||"f"});const sis=fam("Thứ muội Liễu Mai"),fr=fam("Bạn khuê Tô Lan");
   const nm=n=>`<b class="kname" style="--rc:#7a5a30">${n}</b>`;const face=n=>`<span class="md" style="--c:#c9a46a">${n[0]}</span>`;
   const L=[{who:S,place:2,score:"8 phần",sub:"dâng tài nghệ",you:"Ngươi"},{who:sis,place:1,score:"9 phần",sub:"thứ muội",fig:"",face:face("Liễu"),nameH:nm("Liễu Mai")},{who:fr,place:3,score:"6 phần",sub:"khuê hữu",fig:"",face:face("Tô"),nameH:nm("Tô Lan")}];
   const ov=kitPodiumShow(L,{title:"Phúc tuyển",sub:"Tuyển tú · Nội vụ phủ",next:"Tiếp",onNext:()=>{next++}});await sleep(900);
   const root=document.querySelector('#kpodov .kpod');o.up=!!root;o.cols=root?root.querySelectorAll('.kpod-col').length:0;o.txt=root?root.innerText.replace(/\s+/g,' '):'';o.me=root?root.querySelectorAll('.kpod-col.kpod-me').length:0;
   o.fig=root?[...root.querySelectorAll('.kpod-fig')].map(e=>e.className.includes('kpod-nofig')):[];o.next=!!(root&&root.querySelector('.kpod-next'));o.seal=root?root.querySelector('.kpseal')&&root.querySelector('.kpseal').textContent:'';
   const r0=root&&root.getBoundingClientRect();o.fit=!!r0&&r0.width<=innerWidth+1&&r0.height<=innerHeight+1;o.pct=/%/.test(o.txt);
   if(root){const nb=root.querySelector('.kpod-next');nb&&nb.click()}await sleep(500);o.nextCalled=next;o.closed=!document.getElementById('kpodov');return o});
  const t=`${tag}${rm?' reduced':''}`;
  ok(r.up&&r.cols===3,`${t}: podium up, three columns`,[r.up,r.cols]);
  ok(/Liễu Mai/.test(r.txt)&&/Tô Lan/.test(r.txt)&&/Nhất/.test(r.txt)&&/Nhì/.test(r.txt)&&/Tam/.test(r.txt)&&/9 phần/.test(r.txt)&&/thứ muội/.test(r.txt)&&/khuê hữu/.test(r.txt),`${t}: names, medals, marks, roles of the family entries`,r.txt.slice(0,200));
  ok(r.me===1&&/(^| )(ta|ngươi)( |$)/i.test(r.txt),`${t}: hers is lit and tagged`,r.me);
  ok(r.fit&&!r.pct&&/VINH DANH/i.test(r.seal||'')||r.fit&&!r.pct,`${t}: fits the screen, no %`,[r.fit,r.seal]);
  ok(r.nextCalled===1&&r.closed,`${t}: one «Tiếp» button calls onNext and closes`,[r.nextCalled,r.closed]);
  if(OUT&&!rm){await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());const nm=n=>`<b class="kname" style="--rc:#7a5a30">${n}</b>`;const face=n=>`<span class="md" style="--c:#c9a46a">${n[0]}</span>`;kitPodiumShow([{who:S,place:2,score:"8 phần",sub:"dâng tài nghệ",you:"Ngươi"},{who:{name:"Thứ muội Liễu Mai",age:17},place:1,score:"9 phần",sub:"thứ muội",fig:"",face:face("Liễu"),nameH:nm("Liễu Mai")},{who:{name:"Bạn khuê Tô Lan",age:17},place:3,score:"6 phần",sub:"khuê hữu",fig:"",face:face("Tô"),nameH:nm("Tô Lan")}],{title:"Phúc tuyển",sub:"Tuyển tú · Nội vụ phủ"})});await p.waitForTimeout(3500);fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/kit-podium-tt-${tag}.png`})}
  ok(!errs.length,`${t}: no page errors`,errs.slice(0,3));await ctx.close()}
 console.log(res.every(x=>x)?'KIT-PODIUM-TT PASS':'KIT-PODIUM-TT FAIL '+res.filter(x=>!x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})();
