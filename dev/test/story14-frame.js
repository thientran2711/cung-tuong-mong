/* story14-frame (review/story14-p1): the 14-chapter frame of a new life (jst14.js).
   1) the sensible bot (dev/measure/inpage4.js) plays lives; every chapter start is recorded (n, part, content) → numbers run 1,2,3… with no
      gap or repeat, never above 14, parts 1–3 / 4–11 / 12–14 hold the right kinds; the save round trip of the bot runs too; no page errors.
   2) old saves: a save from the main build (before this branch) and a save of this build with the frame off load, keep their old frame
      (no S.st.f14) and play on.
   usage: NODE_PATH=$(npm root -g) node dev/test/story14-frame.js <url> <main url> [steps] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,MAIN,NS]=process.argv;const N=+NS||40;
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c&&x!==undefined)console.error('FAIL',n,JSON.stringify(x).slice(0,600))};
 const boot=async(url,init)=>{const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});if(init)await ctx.addInitScript(init);const p=await ctx.newPage();p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(url.slice(-14)+': '+e.message.slice(0,200)));await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 /* ---- 1) bot lives ---- */
 const p=await boot(URL,()=>{let s=4242;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__bot={pre:1}});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  window.__L=[];const rec=(kind,id)=>{try{const c=S.st.ch;const L=window.__L[window.__L.length-1];if(L&&L.uid===S.__uid14)L.ch.push({n:c.n,kind,id,part:f14Info()?f14Info().partNo:-1,t:S.turn})}catch(e){}};
  const a0=chStartArc67;chStartArc67=function(B){const r=a0.apply(this,arguments);rec('arc',B.a);return r};
  const m0=msStart67;msStart67=function(id){const r=m0.apply(this,arguments);rec('ms',id);return r};
  const s0=start;start=function(){S&&(S.__uid14=0);const r=s0.apply(this,arguments);return r};
  const i0=a67init;a67init=function(k){window.__L.push({uid:(window.__uid14=(window.__uid14||0)+1),k,ch:[]});S.__uid14=window.__uid14;const r=i0.apply(this,arguments);try{window.__L[window.__L.length-1].road=S.st.f14&&S.st.f14.road;window.__L[window.__L.length-1].plan=S.st.ch.plan.slice()}catch(e){}return r};
  start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));await p.evaluate(INP);
 await p.evaluate(()=>{const n0=nextBuoi;nextBuoi=function(){if(S&&S.mg){S.mg=null;try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}}return n0.apply(this,arguments)};for(const f of ['act','lesson','talk']){const o=window[f];if(typeof o!=='function')continue;window[f]=function(){const r=o.apply(this,arguments);if(S&&S.mg){S.mg=null;try{kg82Close(true)}catch(e){}const ov=document.getElementById('ov');if(ov)ov.hidden=true}return r}}});
 const t0=Date.now();for(let i=0;i<N;i++){await p.evaluate(()=>window.__bot.step('sens',300));if(i%10===9)console.error('step',i+1,Math.round((Date.now()-t0)/1000)+'s')}
 const R=await p.evaluate(()=>({L:window.__L,res:window.__res.map(r=>({o:r.origin,fate:r.fate,turns:r.turns,rank:r.maxRank})),x:window.__bot.extra(),now:S&&S.st&&S.st.ch?{n:S.st.ch.n,max:S.st.ch.max,info:f14Info()}:null}));
 const lives=R.L.filter(l=>l.ch.length);const kindOk=(c)=>{if(c.part===0)return c.kind==='ms'&&/^(nhap14|sung14|tap14)$/.test(c.id);if(c.part===2)return true;return true};
 const bad=[];for(const l of lives){l.ch.forEach((c,i)=>{if(c.n!==i+1)bad.push([l.k,'seq',i+1,c.n,c.id]);if(c.n>14)bad.push([l.k,'>14',c.n]);if(!kindOk(c))bad.push([l.k,'kind',c.n,c.id]);
   const want=c.n<=3?0:c.n<=11?1:2;if(c.part!==want)bad.push([l.k,'part',c.n,c.part])})}
 const reach=lives.map(l=>l.ch.length);
 console.log(JSON.stringify({lives:lives.length,origins:lives.map(l=>l.k),roads:lives.map(l=>l.road),reach,maxReach:Math.max(0,...reach),sample:lives.slice(0,2).map(l=>l.ch.map(c=>`${c.n}:${c.id}`).join(' ')),plans:lives.slice(0,2).map(l=>l.plan.join(',')),res:R.res.slice(0,8),saveFail:R.x.saveFail,badN:R.x.badN,now:R.now},null,1));
 chk('bot played a life with the frame',lives.length>=1,lives.length);chk('every new life has a road rolled',lives.every(l=>l.road),lives.map(l=>l.road));
 chk('chapters numbered 1,2,3… inside the right part, never above 14',!bad.length,bad.slice(0,10));chk('sensible bot started the frame (chapter changes: fast bot below)',Math.max(0,...reach)>=1,reach);
 chk('bot save round trip',!R.x.saveFail.length,R.x.saveFail);
 /* fast story bot: every origin, one life each, months pass, each due hồi is played with a random option, a milestone stuck 30 months is
    closed by the test (the game has no time limit on Tranh ngôi Trung cung / Mẫu nghi): the frame must walk 1..14 */
 await p.evaluate(()=>{window.__bot=null;window.__H14=[];const hk=v=>{if(v&&!window.__H14.some(h=>h.id===v.id))window.__H14.push({id:v.id,me:aff(S,v),her:aff(v,S),oan:oan(v,S)})};
  const c0=castRv67;castRv67=function(A,k){const r=c0.apply(this,arguments);try{if(A.host14&&A.host14[k]!=null)hk(RV(A.host14[k]))}catch(e){}return r};
  const n0=newThread67;newThread67=function(){const A=n0.apply(this,arguments);try{if(A&&A.host14)for(const k in A.host14)hk(RV(A.host14[k]))}catch(e){}return A};
  const md0=msDone67;window.__md0=md0;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)};
  window.__fast=(k,pick,maxCh)=>{quiet=true;try{localStorage.removeItem('ctm-arcs')}catch(e){}for(let g=0;g<4;g++){window.__forceOrigin=k;start();if(S.origin.k===k)break}quiet=false;Q.length=0;
   const seq=[],ends=[],ctx=[],host=[];let lastN=0,stuck=0,err=null,mon=0;
   for(;mon<900&&!S.st.ch.all&&S.st.ch.n<=maxCh;mon++){const c=S.st.ch;if(c.n!==lastN){seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?')+(c.n<=3?'/T':c.n<=11?'/R':'/E'));lastN=c.n;stuck=0}
    if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
    const A=S.st.M;try{if(A&&A.host14)for(const kk in A.host14){const v=RV(A.host14[kk]);if(v&&!host.some(h=>h.id===v.id))host.push({id:v.id,a:A.a,me:aff(S,v),her:aff(v,S),oan:oan(v,S)})}
     if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const b=beatDef67(A,A.cur);const O=opts67(A,b);const i=pick==='rand'?Math.floor(Math.random()*O.length):0;
      const o=O[i];if(o&&o.o!=null)ctx.push(A.a+':'+A.cur+':'+oOf67(A,o,b));res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,b):100);if(A.done)ends.push(A.a+'='+A.end)}}catch(e){err=err||('beat '+e.message)}
    if(S.st.ms&&++stuck>30)S.st.ms.force14=1;
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0}
   return {k:S.origin.k,want:k,road:S.st.f14&&S.st.f14.road,seq,ends,ctx,host,all:!!S.st.ch.all,n:S.st.ch.n,fin:S.st.ch.fin||'',months:mon,err}}});
 const FB=[];for(const k of ['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'])FB.push(await p.evaluate(k=>window.__fast(k,'rand',99),k));
 for(const r of FB)console.log(r.k,'(asked '+r.want+')',r.road,'host:'+JSON.stringify(r.host),'n='+r.n,r.all?'ALL':'',r.months+'m',r.fin,'|',r.seq.join(' '),r.err||'');
 const fbBad=FB.filter(r=>{const ns=r.seq.map(x=>+x.split(':')[0]);return r.err||!r.all||r.n!==14||ns.some((n,i)=>n!==i+1)||r.seq.slice(0,3).some(x=>!/^(\d+):(nhap14|sung14|tap14)\//.test(x))||!r.fin});
 chk('fast story bot: every origin walks chapters 1..14 in order, tutorial first, origin ending told',!fbBad.length,fbBad.map(r=>r.k+' '+r.seq.join(' ')+' '+(r.err||'')));
 chk('the rolled road opens chapter 4',FB.every(r=>r.seq[3]&&r.seq[3].split(':')[1].startsWith(r.road+'/')),FB.map(r=>r.road+' '+r.seq[3]));
 const H=await p.evaluate(()=>window.__H14);chk('OD:L1247 hostile cast people hate her for real (thiện cảm < 0 both ways, oán > 0)',H.length>0&&H.every(h=>h.her<0&&h.me<0&&h.oan>0),H.slice(0,6));
 /* OD:L1253: one fixed choice path (always the first option), many lives of one origin → outcomes spread */
 const SP=[];for(let n=0;n<14;n++)SP.push(await p.evaluate(()=>window.__fast('tt',0,8)));
 const E={},C={};SP.forEach(r=>{r.ends.forEach(x=>{const [a,e]=x.split('=');(E[a]=E[a]||[]).push(e)});r.ctx.forEach(x=>{const q=x.split(':');const key=q[0]+':'+q[1];(C[key]=C[key]||new Set()).add(q[2])})});
 const tab=Object.entries(E).filter(([a,L])=>L.length>=3).map(([a,L])=>{const cnt={};L.forEach(e=>cnt[e]=(cnt[e]||0)+1);return [a,L.length,cnt,Math.max(...Object.values(cnt))/L.length]});
 console.log('L1253 spread (arc, plays, endings, top share):',JSON.stringify(tab));const ctxVar=Object.values(C).filter(s=>s.size>1).length,ctxN=Object.keys(C).length;console.log('same option, different odds across lives:',ctxVar+'/'+ctxN);
 chk('OD:L1253 same choice path, many lives: endings spread (≥3/4 of arcs played 4+ times end in 2+ ways; every ending keeps a chance to differ by construction)',tab.length>0&&(()=>{const T=tab.filter(t=>t[1]>=4);return T.length>=4&&T.filter(t=>t[3]>=1).length<=Math.floor(T.length/4)})(),tab);chk('OD:L1253 odds of the same option differ between lives (context)',ctxVar>0,[ctxVar,ctxN]);
 await p.evaluate(()=>{msDone67=window.__md0});
 /* the chapter detail + Mệnh truyện tab show the frame */
 const ui=await p.evaluate(()=>{quiet=true;for(let g=0;g<4;g++){window.__forceOrigin='tt';start();if(S.origin.k==='tt')break}quiet=false;Q.length=0;const md=document.getElementById('modal');try{kitGoalDetail()}catch(e){return{err:e.message}}const t=(md.textContent||'').replace(/\s+/g,' ');Q.length=0;md.hidden=true;
  const tb=document.querySelector('#tabs [data-tab="story"]');if(tb)tb.click();else{tab='story';render()}const st=String(typeof ktStoryHTML==='function'?ktStoryHTML():'').replace(/<[^>]+>/g,' ');tab='act';render();return{o:S.origin.k,snip:st.slice(0,300),detail:/Đời người · 14 chương/.test(t)&&/Phần giữa/.test(t),tab:/Chương \d+\/14/.test(st),ovf:document.documentElement.scrollWidth-innerWidth}});
 chk('chapter detail shows the 14-chapter frame',ui.detail,ui);chk('Mệnh truyện tab shows Chương n/14',ui.tab,ui);chk('no horizontal overflow',ui.ovf<=0,ui);
 const foe=await p.evaluate(()=>{for(let n=0;n<6;n++){quiet=true;window.__forceOrigin='td';start();quiet=false;Q.length=0;if(S.origin.k==='td')break}const e=rivals.find(v=>v.name===S.foe);
  return{o:S.origin.k,foe:S.foe,id:S.st.f14&&S.st.f14.foe,live:!!(e&&e.alive),me:e&&aff(S,e),her:e&&aff(e,S),oan:e&&oan(e,S)}});
 chk('OD:L1247 td family enemy is a live consort who hates her for real',foe.o!=='td'||(foe.live&&foe.id!=null&&foe.me<0&&foe.her<0&&foe.oan>0),foe);
 /* the time-closed tutorial chapter gives no reward */
 const late=await p.evaluate(()=>{quiet=true;localStorage.clear();for(let g=0;g<4;g++){window.__forceOrigin='tt';start();if(S.origin.k==='tt')break}quiet=false;Q.length=0;const inv0=(S.inv||[]).length,d0=S.danh;S.st.ms.t0=S.turn-7;msCheck67();
  const c=S.st.ch;return{past:c.past.slice(-1)[0],inv:(S.inv||[]).length-inv0,danh:S.danh-d0,next:S.st.ms&&S.st.ms.id,n:c.n}});
 chk('tutorial chapter closed by time: no reward, no Danh, next chapter starts',late.past&&late.past.late&&late.inv===0&&late.danh===0&&late.next==='sung14'&&late.n===2,late);
 const real=await p.evaluate(()=>{Q.length=0;const inv0=(S.inv||[]).length;S.sung=30;msCheck67();const c=S.st.ch;return{past:c.past.slice(-1)[0],inv:(S.inv||[]).length-inv0,next:S.st.ms&&S.st.ms.id,n:c.n}});
 chk('tutorial chapter done for real: reward given, chapter 3 starts',real.past&&real.past.k===1&&real.inv>=1&&real.next==='tap14'&&real.n===3,real);
 await p.context().close();
 /* ---- 2) old saves ---- */
 const mk=async(url,pre)=>{const q=await boot(url,pre);const s=await q.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='dtq';document.getElementById('title').hidden=true;start();
   for(let i=0;i<8;i++){Q.length=0;used=0;nextBuoi()}Q.length=0;return{save:JSON.stringify(ser()),f14:!!S.st.f14,v2:S.st.v2,plan:S.st.ch&&S.st.ch.plan.join(',')}});await q.context().close();return s};
 const olds=[];if(MAIN)olds.push(['main build',await mk(MAIN)]);olds.push(['frame off',await mk(URL,()=>{window.F14_ON=false})]);
 const q=await boot(URL);
 for(const [nm,o] of olds){const r=await q.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));const plan=S.st.ch&&S.st.ch.plan.join(',');
    const n0=S.st.ch&&S.st.ch.n;for(let i=0;i<60;i++){Q.length=0;used=0;try{nextBuoi()}catch(e){return{err:e.message}}}Q.length=0;tab='story';render();const st=(document.getElementById('panel')||{}).textContent||'';tab='act';render();
    return{f14:!!S.st.f14,v2:S.st.v2,same:plan===(S.st.ch&&S.st.ch.plan.join(',')),plan,n0,n:S.st.ch&&S.st.ch.n,max:S.st.ch&&S.st.ch.max,tab14:/\/14 ·/.test(st)}},o.save);
  console.log(nm,JSON.stringify(r));chk(`old save (${nm}) loads, keeps its old frame, plays on`,!r.err&&!r.f14&&!o.f14&&!r.tab14&&r.n>=r.n0,r)}
 await q.context().close();
 console.log(JSON.stringify(ok),'errors:',errs.slice(0,10));await b.close();process.exit(ok.every(x=>x[1])&&!errs.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
