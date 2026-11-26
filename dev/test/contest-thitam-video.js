/* contest-thitam-video (FOREMAN D job D3): FULL real-tap video of one day with a contest she wins, Fold 755x1000 + iPad 1180x820, HOST mode
   (built root index.html through rot.js, the player's screen). Run on LIVE and on the branch:
     node dev/test/contest-thitam-video.js <built repo root> <outdir> <tag>
   Set-up (evaluate, before the first tap): a palace consort, the j71 festival contest invitation «Hội thi» (PEND.j71f, the real card), her
   talent for that contest pinned top (SC7[kind].f) so she places first by the contest's own formula. Then ONLY real taps (Playwright click
   on the element the player sees): «Dự thi …» → the result → every dialog / scene of the day → «Sang buổi» … → the end of tối → the night.
   Prints what the day gave: her night record, the Kính sự phòng card, the flip choice (nfch) seen. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const [,,ROOT,OUT,TAG]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const sum={};
 for(const dev of (process.env.DEVS||"fold,ipadAir").split(",")){const vp=D.DEVICES[dev];const W=vp.viewport?vp.viewport.width:vp.w,H=vp.viewport?vp.viewport.height:vp.h;
  const ctx=await D.newDeviceContext(b,dev,{recordVideo:{dir:OUT,size:{width:W||755,height:H||1000}},reducedMotion:'no-preference'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof PEND==='object'&&PEND.j71f&&typeof nfOn==='function',null,{timeout:180000});await sleep(2500);
  const s0=await g.evaluate(()=>{for(const id of ['kload','kroul'])try{const x=document.getElementById(id);if(x)x.remove()}catch(e){}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;try{kmReset()}catch(e){}$("modal").hidden=true;S.preg=0;S.pregUnk=0;S.cyc=null;S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"});
   S.sung=Math.max(S.sung||0,30);BAL.visit.cap=0;
   const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined).slice(0,3);const vi=FV7.trungthu.findIndex(v=>v[0]==="C");const sub=FV7.trungthu[vi][1];
   const f0=SC7[sub].f;SC7[sub].f=x=>x===S?999:Math.min(40,f0(x));
   const pp={k:"trungthu",vi,e:L.map(v=>v.id),pr:[],sd:11};const d=mkP("j71f",pp);Q.unshift({t:`${fShort7("trungthu")} · ${fTitle7("trungthu",vi)}`,h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1});render();showModal();
   return{d:wk(),nights:S.nights||0,name:S.name,rank:S.rank,sub}});
  await sleep(1500);try{await g.waitForFunction(()=>!$('modal').hidden&&!document.getElementById('kload'),null,{timeout:20000})}catch(e){}try{await p.waitForFunction(()=>![...document.querySelectorAll('body > *')].some(x=>/Sửa soạn nhập cung/.test(x.textContent||'')&&x.offsetParent!==null),null,{timeout:30000})}catch(e){}await sleep(2500);await p.screenshot({path:`${OUT}/${TAG}-${dev}-0-invite.png`});
  const seen=[];let shots=0;
  /* one real tap: mark what a player would tap next, click it through the host frame */
  const tapOne=async(first)=>{const k=await g.evaluate(first=>{for(const x of document.querySelectorAll('[data-ctntap]'))x.removeAttribute('data-ctntap');const vis=x=>x&&x.offsetParent!==null&&!x.disabled;
    const mark=(x,why)=>{x.setAttribute('data-ctntap','1');return why};
    let x=[...document.querySelectorAll('.kmov .kmend,#kpodov .kpod-next,[data-km-close],.krevok,.kfoc-next')].find(vis);if(x)return mark(x,'scene:'+(x.textContent||'').trim().slice(0,30));
    x=[...document.querySelectorAll('#kneov .kne-take')].find(vis)||document.getElementById('kneov');if(x&&x.offsetParent!==null)return mark(x,'night-end:'+(x.textContent||'').trim().slice(0,20));
    x=[...document.querySelectorAll('.kmov .kmrew:not(.km-done)')].find(vis)||[...document.querySelectorAll('.kmov:not(.km-out)')].find(vis);if(x)return mark(x,'scene-tap');
    const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const e=dw.querySelector(':scope > .kmend');if(vis(e))return mark(e,'dawn');return mark(dw,'dawn')}
    const m=document.getElementById('modal');if(m&&!m.hidden){const all=[...m.querySelectorAll('button')].filter(vis);const t=(document.getElementById('mt')||{}).textContent||'';
     const want=first?all.find(b=>new RegExp(first).test(b.textContent)):null;
     const o=want||all.find(b=>b.classList.contains('opt')&&!/Cáo bệnh|Tiến cử|Thôi|Không dự|Bỏ thi/.test(b.textContent))||all.find(b=>/Thôi/.test(b.textContent))||all.find(b=>!/✕/.test(b.textContent))||all[0];
     if(o)return mark(o,'modal['+t.slice(0,40)+']:'+o.textContent.trim().slice(0,40))}
    const n=document.getElementById('next');if(vis(n))return mark(n,'next:'+n.textContent.trim().slice(0,20));return ''},first||null);
   if(!k)return '';try{await g.locator('[data-ctntap]').first().click({timeout:5000})}catch(e){try{await g.evaluate(()=>{const x=document.querySelector('[data-ctntap]');if(x)x.click()})}catch(z){}}return k};
  let k=await tapOne('^Dự thi');seen.push(k);await sleep(1800);await p.screenshot({path:`${OUT}/${TAG}-${dev}-1-result.png`});
  const t0=Date.now();let done=false;
  while(Date.now()-t0<240000){const st=await g.evaluate(d0=>({w:wk(),d0,Q:Q.length,modal:!$("modal").hidden,mt:(document.getElementById('mt')||{}).textContent||'',nights:S.nights||0}),s0.d).catch(()=>null);
   if(st&&st.w>s0.d&&!st.modal&&!st.Q){done=true;break}
   k=await tapOne(null);if(k){seen.push(k);if(/Kính sự phòng|Chuẩn bị thị tẩm|Đêm|thị tẩm|nfch/i.test(k)&&shots<6){shots++;await sleep(700);await p.screenshot({path:`${OUT}/${TAG}-${dev}-2-${shots}.png`})}}
   await sleep(k&&/^next/.test(k)?1600:900)}
  await sleep(1500);await p.screenshot({path:`${OUT}/${TAG}-${dev}-3-morning.png`});
  const e=await g.evaluate(s0=>({nights:(S.nights||0)-s0.nights,nightLog:(S.nightLog||[]).slice(-2),d0:s0.d,w:wk(),why:S.nightWhy||null,logs:(S.logs||[]).filter(x=>/thị tẩm|đứng đầu|đoạt giải/.test(x)).slice(0,6).map(x=>String(x).replace(/<[^>]+>/g,'').slice(0,160))}),s0);
  sum[dev]={s0,e,done,taps:seen.length,ksp:seen.filter(x=>/Kính sự phòng báo tin/.test(x)).length,flipChoice:seen.filter(x=>/Kính sự phòng\]:(Giữ chân|Tranh sủng|Chặn ngự giá|Thôi)/.test(x)).length,prep:seen.filter(x=>/thị tẩm/i.test(x)).length,seen:seen.slice(0,60),errs:errs.slice(0,5)};
  /* rv ask: the jts Hội phối đồ entry card «Tự tay phối đồ» on screen too (its real card, tsDressHold; only the dressing-room stub skipped) */
  if(process.env.JTS!=='0'){try{await g.evaluate(()=>{Q.length=0;try{kmReset()}catch(e){}$("modal").hidden=true;for(const id of ['kneov','dawn']){const x=document.getElementById(id);if(x){x.classList.remove('on');x.hidden=true}}const th=Object.keys(TS_THEME)[0];tsS().dress={m:S.month,y:S.year,th};const ms=tsMkSit;tsMkSit=(th,m,f)=>f();
    try{tsDressHold()}finally{tsMkSit=ms}const m=Q.find(x=>x&&x.opts&&x.opts.some(o=>/^Tự tay phối đồ/.test(o.n||"")));if(m){Q.splice(Q.indexOf(m),1);Q.unshift(m)}render();showModal()});
   await sleep(4000);await p.screenshot({path:`${OUT}/${TAG}-${dev}-4-jts.png`});sum[dev].jts=await g.evaluate(()=>((document.getElementById('modal')||{}).innerText||'').replace(/\s+/g,' ').slice(0,600))}catch(e){sum[dev].jtsErr=e.message.slice(0,160)}}
  const v=p.video();await ctx.close();if(v){const f=await v.path();fs.renameSync(f,path.join(OUT,`${TAG}-${dev}.webm`))}}
 console.log(JSON.stringify(sum,null,1));fs.writeFileSync(path.join(OUT,`${TAG}.json`),JSON.stringify(sum,null,1));await b.close();srv.close()})();
