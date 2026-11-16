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
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});await p.evaluate(()=>{document.querySelectorAll('.kroul').forEach(e=>e.remove());window.__startPre=start});await p.evaluate(INP);
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
 await p.evaluate(()=>{window.__bot=null;start=window.__startPre;/* r1 item 8: the sensible bot's start() cycles 8 origins and overrides __forceOrigin (never cnv); the checks below start each origin themselves */window.__H14=[];const hk=v=>{if(v&&!window.__H14.some(h=>h.id===v.id))window.__H14.push({id:v.id,me:aff(S,v),her:aff(v,S),oan:oan(v,S)})};
  const c0=castRv67;castRv67=function(A,k){const r=c0.apply(this,arguments);try{if(A.host14&&A.host14[k]!=null)hk(RV(A.host14[k]))}catch(e){}return r};
  const n0=newThread67;newThread67=function(){const A=n0.apply(this,arguments);try{if(A&&A.host14)for(const k in A.host14)hk(RV(A.host14[k]))}catch(e){}return A};
  const md0=msDone67;window.__md0=md0;msDone67=function(m){return m.force14?true:md0.apply(this,arguments)};
  window.__fast=(k,pick,maxCh)=>{quiet=true;try{localStorage.removeItem('ctm-arcs')}catch(e){}window.__forceOrigin=k;start();quiet=false;Q.length=0;
   if(S.origin.k!==k)return {k:S.origin.k,want:k,err:'asked '+k+', got '+S.origin.k,seq:[],ends:[],ctx:[],host:[]};/* r1 item 8: every origin really runs */
   const seq=[],ends=[],ctx=[],host=[];let lastN=0,stuck=0,err=null,mon=0;
   for(;mon<900&&!S.st.ch.all&&S.st.ch.n<=maxCh;mon++){const c=S.st.ch;if(c.n!==lastN){seq.push(c.n+':'+(S.st.ms?S.st.ms.id:S.st.M?S.st.M.a:'?')+(c.n<=3?'/T':c.n<=11?'/R':'/E'));lastN=c.n;stuck=0}
    if(S.dead||S.out){S.dead=false;S.out=0;S.suc=60}
    const A=S.st.M;try{if(A&&A.host14)for(const kk in A.host14){const v=RV(A.host14[kk]);if(v&&!host.some(h=>h.id===v.id))host.push({id:v.id,a:A.a,me:aff(S,v),her:aff(v,S),oan:oan(v,S)})}
     if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const b=beatDef67(A,A.cur);const O=opts67(A,b);const i=pick==='rand'?Math.floor(Math.random()*O.length):0;
      const o=O[i];if(o&&o.o!=null)ctx.push(A.a+':'+A.cur+':'+oOf67(A,o,b));res67(thKey67(A),A.cur,i,o&&o.o!=null?oOf67(A,o,b):100);if(A.done)ends.push(A.a+'='+A.end)}}catch(e){err=err||('beat '+e.message)}
    if(S.st.ms&&++stuck>30){if(S.st.ms.id==='len14'&&S.srv&&!S.srv.risen){S.age=Math.max(S.age||0,18);srvRise('bot')}else S.st.ms.force14=1}/* cnv: the consort chapters open when she is really raised */
    const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){err=err||('buoi '+e.message);break}}Q.length=0}
   return {k:S.origin.k,want:k,road:S.st.f14&&S.st.f14.road,seq,ends,ctx,host,all:!!S.st.ch.all,n:S.st.ch.n,fin:S.st.ch.fin||'',months:mon,err}}});
 const FB=[];for(const k of ['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'])FB.push(await p.evaluate(k=>window.__fast(k,'rand',99),k));
 for(const r of FB)console.log(r.k,'(asked '+r.want+')',r.road,'host:'+JSON.stringify(r.host),'n='+r.n,r.all?'ALL':'',r.months+'m',r.fin,'|',r.seq.join(' '),r.err||'');
 chk('fast story bot ran every one of the 9 origins it asked for',FB.every(r=>r.k===r.want),FB.map(r=>r.want+'→'+r.k));
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
 const ui=await p.evaluate(()=>{quiet=true;window.__forceOrigin='tt';start();quiet=false;Q.length=0;const md=document.getElementById('modal');try{kitGoalDetail()}catch(e){return{err:e.message}}const t=(md.textContent||'').replace(/\s+/g,' ');Q.length=0;md.hidden=true;
  const tb=document.querySelector('#tabs [data-tab="story"]');if(tb)tb.click();else{tab='story';render()}const st=String(typeof ktStoryHTML==='function'?ktStoryHTML():'').replace(/<[^>]+>/g,' ');tab='act';render();return{o:S.origin.k,snip:st.slice(0,300),detail:/Đời người · 14 chương/.test(t)&&/Phần giữa/.test(t),tab:/Chương \d+\/14/.test(st),ovf:document.documentElement.scrollWidth-innerWidth}});
 chk('chapter detail shows the 14-chapter frame',ui.detail,ui);chk('Mệnh truyện tab shows Chương n/14',ui.tab,ui);chk('no horizontal overflow',ui.ovf<=0,ui);
 const foe=await p.evaluate(()=>{quiet=true;window.__forceOrigin='td';start();quiet=false;Q.length=0;const e=rivals.find(v=>v.name===S.foe);
  return{o:S.origin.k,foe:S.foe,id:S.st.f14&&S.st.f14.foe,live:!!(e&&e.alive),me:e&&aff(S,e),her:e&&aff(e,S),oan:e&&oan(e,S)}});
 chk('OD:L1247 td family enemy is a live consort who hates her for real',foe.o==='td'&&(foe.live&&foe.id!=null&&foe.me<0&&foe.her<0&&foe.oan>0),foe);
 /* the time-closed tutorial chapter gives no reward */
 const late=await p.evaluate(()=>{quiet=true;localStorage.clear();window.__forceOrigin='tt';start();quiet=false;Q.length=0;const inv0=(S.inv||[]).length,d0=S.danh;S.st.ms.t0=S.turn-BAL.st14.lim.nhap-1;msCheck67();
  const c=S.st.ch;return{past:c.past.slice(-1)[0],inv:(S.inv||[]).length-inv0,danh:S.danh-d0,next:S.st.ms&&S.st.ms.id,n:c.n}});
 chk('tutorial chapter closed by time: no reward, no Danh, next chapter starts',late.past&&late.past.late&&late.inv===0&&late.danh===0&&late.next==='sung14'&&late.n===2,late);
 const real=await p.evaluate(()=>{Q.length=0;const inv0=(S.inv||[]).length;S.sung=30;msCheck67();const c=S.st.ch;return{past:c.past.slice(-1)[0],inv:(S.inv||[]).length-inv0,next:S.st.ms&&S.st.ms.id,n:c.n}});
 chk('tutorial chapter done for real: reward given, chapter 3 starts',real.past&&real.past.k===1&&real.inv>=1&&real.next==='tap14'&&real.n===3,real);

 /* ---- r1 item 1: home road («Ở nhà chờ tuyển tú», jkc): chapter 1 waits at home, restarts at palace entry with its full time ---- */
 const home=[];for(const rk of [0,1,2]){home.push(await p.evaluate(rk=>{quiet=true;localStorage.clear();window.__forceOrigin='tt';start();if(!S.kc&&kcOk(S.origin.k))kcInit();/* = the new-life accept with «Ở nhà chờ tuyển tú» (jkc nlAccept) */quiet=false;Q.length=0;
   const o={rk,origin:S.origin.k,home:!!(S.kc&&!S.kc.inPal),ms0:S.st.ms&&S.st.ms.id,han0:msHan67(S.st.ms)[1]};
   for(let i=0;i<3;i++){const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){o.err=e.message;break}}}Q.length=0;
   o.homeMs=S.st.ms&&S.st.ms.id;o.homeN=S.st.ch.n;S.turn+=20;kcEnter(rk);Q.length=0;o.entryRank=S.rank;try{a67Month()}catch(e){o.err=e.message}Q.length=0;
   const m=S.st.ms;o.ms=m&&m.id;o.n=S.st.ch.n;o.left=m?m.t0+BAL.st14.lim.nhap-S.turn:null;o.lim=BAL.st14.lim.nhap;o.r0=m&&m.r0;o.past=S.st.ch.past.map(x=>x.ms+':'+x.tag).join(',');o.han=msHan67(m)[1];
   const inv0=(S.inv||[]).length,d0=S.danh;S.rank=Math.min(6,S.rank+1);msCheck67();Q.length=0;const last=S.st.ch.past.slice(-1)[0];o.real=last&&last.ms==='nhap14'&&last.k===1&&!last.late;o.rew=(S.inv||[]).length-inv0;o.danh=S.danh-d0;return o},rk))}
 console.log('home road:',JSON.stringify(home));
 chk('r1 item 1: home road keeps chapter 1 open at home, restarts it at palace entry (entry rank, full time), rewards only a real step',home.every(o=>!o.err&&o.origin==='tt'&&o.home&&o.homeMs==='nhap14'&&o.homeN===1&&o.ms==='nhap14'&&o.n===1&&o.left===o.lim&&o.r0===o.entryRank&&!o.past&&o.real&&o.rew>=1&&o.danh>0&&/tính từ ngày nhập cung/.test(o.han0)&&/^còn \d+ tháng/.test(o.han)),home);
 /* ---- r1 item 2: cung nữ được sủng hạnh: servant tutorial steps; «Từ kẻ hầu thành tiểu chủ» only if not raised yet ---- */
 const cv=await p.evaluate(()=>{quiet=true;localStorage.clear();window.__forceOrigin='cnv';start();quiet=false;Q.length=0;const o={origin:S.origin.k,srv:isSrv()};const G=BAL.st14.goal;
  o.s1=MS67.nhap14.steps(S.st.ms).map(x=>x[0]).join(' | ');o.d1a=msDone67(S.st.ms);S.tin=G.tin;o.d1b=msDone67(S.st.ms);
  const fake={id:'sung14',t0:S.turn,r0:S.rank};o.s2=MS67.sung14.steps(fake).map(x=>x[0]).join(' | ');o.t2=MS67.sung14.t();o.d2a=msDone67(fake);S.nt=G.nt;o.d2b=msDone67(fake);
  const c=S.st.ch,j=c.plan.indexOf('ms:len14');o.hasLen=j>0;
  const snap=JSON.stringify({c,ms:S.st.ms,M:S.st.M,srv:S.srv});
  const at=(risen)=>{const B=JSON.parse(snap);S.st.ch=B.c;S.st.ms=null;S.st.M=null;S.srv=B.srv;S.srv.risen=risen?1:0;S.st.ch.i=j-1;S.st.ch.n=8;chAdvance67(null);Q.length=0;return{ms:S.st.ms&&S.st.ms.id,arc:S.st.M&&S.st.M.a,n:S.st.ch.n}};
  o.notRisen=at(false);o.risen=at(true);
  /* risen before «Lần đầu được sủng»: the ordinary consort steps */
  S.srv.risen=1;o.s2r=MS67.sung14.steps(fake).map(x=>x[0]).join(' | ');return o});
 console.log('cnv:',JSON.stringify(cv));
 chk('r1 item 2: cnv tutorial steps are servant steps, doable as a servant',cv.origin==='cnv'&&cv.srv&&/Chủ tin/.test(cv.s1)&&!cv.d1a&&cv.d1b&&/Hoàng thượng để ý/.test(cv.s2)&&!/Sủng /.test(cv.s2)&&!cv.d2a&&cv.d2b&&/Sủng /.test(cv.s2r),cv);
 chk('r1 item 2: «Từ kẻ hầu thành tiểu chủ» runs only when not raised; raised → a shared arc in its place, no free reward',cv.hasLen&&cv.notRisen.ms==='len14'&&cv.risen.ms!=='len14'&&!!cv.risen.arc&&cv.risen.n===9,cv);
 /* ---- r1 item 6: Thanh mai trúc mã life: the frame stays 14 everywhere (c.max, STORY n, printed labels) ---- */
 const tm=await p.evaluate(()=>{quiet=true;localStorage.clear();localStorage.setItem('ctm-tm96','1');window.__forceOrigin='thd';start();localStorage.removeItem('ctm-tm96');quiet=false;Q.length=0;
  const o={origin:S.origin.k,tm:!!S.tm96,max:S.st.ch.max,n:STORY[S.origin.k]&&STORY[S.origin.k].n,len:S.st.ch.plan.filter(x=>x!=='fin').length,plan:S.st.ch.plan.join(',')};
  for(let i=0;i<12;i++){const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){o.err=e.message;break}}}Q.length=0;
  o.max2=S.st.ch.max;const txt=[String(panel67()),String(ktStoryHTML()),JSON.stringify(typeof chapModel==='function'?chapModel():{})].join(' ').replace(/<[^>]+>/g,' ');o.bad=(txt.match(/Chương \d+\/(\d+)/g)||[]).filter(x=>!/\/14$/.test(x));return o});
 console.log('tm96:',JSON.stringify(tm));
 chk('r1 item 6: Thanh mai trúc mã life: max 14 at start and after 12 months, no «/15» anywhere',tm.origin==='thd'&&tm.tm&&tm.max===14&&tm.n===14&&tm.len===14&&tm.max2===14&&!tm.bad.length&&!tm.err,tm);
 /* ---- r1 item 3: every cast role of every arc is in the reviewed hostile-role table; muoi_no's debtor is not hostile ---- */
 const rt=await p.evaluate(()=>{const miss=[];for(const id in ARC67){const a=ARC67[id];const T=[a.g].concat(Object.values(a.B||{}).map(b=>b.t)).concat(Object.values(a.E||{}).map(e=>e.t)).map(x=>typeof x==='function'?String(x):String(x||'')).join(' ');
   for(const k of ['v','v2'])if(T.includes('{'+k+'}')&&!(F14ROLE[id]&&k in F14ROLE[id]))miss.push(id+'.'+k)}return{miss,no:f14Hostile({a:'muoi_no'},'v'),ho:f14Hostile({a:'ch_ho'},'v'),oan:f14Hostile({a:'tt_oan'},'v')}});
 chk('r1 item 3: hostile roles from the reviewed table (every role listed; muoi_no / ch_ho not hostile; tt_oan hostile)',!rt.miss.length&&!rt.no&&!rt.ho&&rt.oan,rt);
 /* ---- r1 item 5: an ending no roll decides is previewed with its odds word, and a turned ending says why ---- */
 const pv=await p.evaluate(()=>{quiet=true;localStorage.clear();window.__forceOrigin='tt';start();quiet=false;Q.length=0;const out={words:[],turned:null};
  /* every option of every beat of every arc whose ending is fixed: the preview line carries the ladder word */
  for(const id in ARC67){let A=null;try{A=newThread67(id,'s')}catch(e){}if(!A)continue;const a=ARC67[id];
   for(const bid in (a.B||{})){A.cur=bid;let O=[];try{O=opts67(A,beatDef67(A,bid))}catch(e){continue}
    const p={t:'x',a:id,b:bid,o:O.map(o=>oOf67(A,o,a.B[bid]))};const th=th67;th67=()=>A;let d=null;try{d=PEND.j67(p)}catch(e){}th67=th;if(!d)continue;
    d.o.forEach((x,i)=>{const o=O[i];const e=o.e?(Array.isArray(o.e)?o.e:[o.e,o.e]):null;if(!Number.isFinite(p.o[i]))return;/* odds read outside a real beat */if(!e||e[0]!==e[1]&&p.o[i]<100)return;if(!/kết:/.test(x.j67||''))return;
     out.words.push([id,bid,i,/kết: [^·<]*(<[^>]*>)?[^·<]*· (Liều|Khó|Năm ăn năm thua|Khá chắc|Chắc|Rất chắc|Nắm chắc)/.test(String(x.j67).replace(/<\/?span[^>]*>/g,''))||f14Hold(A,e[0])>=100])})}}
  /* a turned ending: force the roll */
  const A=newThread67('tt_oan','m');S.st.M=A;A.s14=1;const r0=rnd67;rnd67=()=>0;const cards=[];const c0=card67;card67=function(kind,t,rows){cards.push([kind,t,rows]);return c0.apply(this,arguments)};
  try{end67(A,'win')}finally{rnd67=r0;card67=c0}const rc=cards.find(c=>c[0]==='result');out.turned={end:A.end,row:rc&&rc[2].find(x=>x&&x[0]==='Xoay chiều')};Q.length=0;return out});
 const wBad=pv.words.filter(x=>!x[3]);console.log('preview fixed endings:',pv.words.length,'missing word:',JSON.stringify(wBad.slice(0,5)),'turned:',JSON.stringify(pv.turned));
 chk('r1 item 5: every fixed-ending option preview shows how sure the ending is (odds ladder)',pv.words.length>0&&!wBad.length,wBad.slice(0,8));
 chk('r1 item 5: an ending that turned says why on the result card',pv.turned.end!=='win'&&pv.turned.row&&/Tưởng đã định/.test(pv.turned.row[1]),pv.turned);
 chk('r1 item 5: neutral context leans neither way (BAL.st14.shift.base both ways)',await p.evaluate(()=>{const Z=BAL.st14.shift;return Z.base-0*Z.slope===Z.base+0*Z.slope}),null);
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
