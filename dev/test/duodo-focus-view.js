/* duodo-focus CONTROLLER test (jdfv) against a MOCK kitFocus (the kit part K-FOCUS-1 is the keeper's; this checks the glue only):
   (1) a tap on a stage person opens the focus view (not the pop-up): groups = dfActs, the hidden pop-up host stays (popIdx = that person, #popw hidden);
   (2) an act: the on-figure game plays in F.play(), «Làm luôn» (skip) runs the act with plain odds, the result reaches F.react, groups refresh; a class D act opens its own flow;
   (3) ✕: popIdx cleared, #popw shown again;  (4) BAL.df.on = 0 → the old pop-up opens (rollback);
   (5) NPC-initiated: a card whose speaker stands here plays in the scene (no centre modal), SAY lines → choices → chooseM; a dodge inside it is played on the figure
       and its mark reaches slapGame's own onDone (struck = dodged: «né kịp»).
   usage: node dev/test/duodo-focus-view.js → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');
let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
 await g.evaluate(()=>{window.kitNotice=undefined;window.ptOn=()=>false;
  /* the REAL kit part kitFocus (review/kit-focus, K-FOCUS-1); calls recorded by wrapping its open */
  window.__K={calls:[]};KIT_FOC.motion=false;const o0=kitFocus.open;kitFocus.open=function(o){__K.calls.push('open');const F=o0.apply(this,arguments);__K.F=F;
   for(const m of ['play','endPlay','react','say','choices','setGroup','setGroups','destroy'])if(typeof F[m]==='function'){const f=F[m];F[m]=function(){__K.calls.push(m);return f.apply(this,arguments)}}
   F.ch=null;const c0=F.choices;F.choices=function(L,cb){F.ch=L;return c0.apply(this,arguments)};return F};
  const go=k=>{Q.length=0;used=0;S.out=0;S.confined=0;S.buoi=0;S.place="home";goTo(k);if(Q[0]&&Q[0].pid==="entpick"){const o=Q[0].opts.find(x=>x.n==="Đi một mình");Q.length=0;o.go()}Q.length=0;S.visit.tk={};S.visit.talked=false;tab="act";window.__fromMap=1;render()};
  window.__go=go});
 const r=await g.evaluate(async()=>{const out={};const sl=ms=>new Promise(r=>setTimeout(r,ms));
  /* a place with a consort she can talk to */let i=-1;for(const k of ["vuon","tn","kn","thu"]){__go(k);i=curPeople().findIndex(pp=>pp.kind==="rival"&&(dfActs(curPeople().indexOf(pp))||[]).some(g=>g.acts.some(a=>!a.off&&a.cls!=="D")));if(i>=0)break}
  out.place=S.place;out.i=i;if(i<0)return out;
  /* (1c) a focus already up for her (an NPC encounter opened it): the tap re-opens; the old one's close must not orphan the new one */
  {const tk0={};DF.tk=tk0;DF.p=curPeople()[i];DF.i=i;popIdx=i;DF.F=kitFocus.open({p:curPeople()[i],fig:dfFig(i),groups:[],onClose:()=>dfClosed(tk0)});await sl(30)}
  const tok=document.querySelector(`#tokens .tok[data-p="${i}"]`);tok.click();await sl(50);
  out.open={called:__K.calls.includes('open'),fans:document.querySelectorAll('.kfoc-b').length,groups:(__K.F&&__K.F.groups||[]).map(g=>g.n+" "+g.can+"/"+g.tot),popIdx,DFi:DF.i,popwHidden:document.getElementById('popw').hidden,plate:(document.querySelector('.kfoc-plate')||{}).textContent,stageTag:(()=>{const d=document.createElement("div");d.innerHTML=j59tagHTML(curPeople()[i],curPeople()[i].name);return d.textContent})()};
  /* (1d) the list shifts while the focus is up (co-op refreshHere unshifts the Emperor): the focus still means HER — acts, groups and popIdx follow her, not the old index */
  {const me=curPeople()[i];const emp={kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:""};S.visit.people.unshift(emp);/* no renderStage: it rebuilds the list; this is the moment between a refresh and the next tap */
   const k=dfHere();out.shift={k,want:curPeople().indexOf(me),popIdx,DFi:DF.i,sameGroups:JSON.stringify(dfData(k).map(g=>g.n))===JSON.stringify(out.open.groups.map(x=>x.replace(/ \d+\/\d+$/,""))),open:!!DF.F};
   S.visit.people.splice(S.visit.people.indexOf(emp),1);out.shift.back={k:dfHere(),i,popIdx}}
  /* (2) an act, skipped */const F=__K.F;const a=F.groups.flatMap(g=>g.acts).find(a=>!a.off&&(dfFind(i,a.id)||{}).cls!=="D");const n0=S.logSeq||0;const run0=window.talk;let talked=0;window.talk=function(){talked++;return run0.apply(this,arguments)};
  __K.calls.length=0;Q.length=0;F.o.onAct(a.id);out.intro=(document.querySelector('.dfintro')||{}).innerText||'';out.skipTxt=(document.querySelector('.kfoc-skipw button')||{}).innerText||'';out.beforeGo=!DFG.cur;document.querySelector('.dfgo').click();await sl(30);out.played=!!DFG.cur&&__K.calls.includes('play');out.skipBtn=!!document.querySelector('.kfoc-skipw:not([hidden]) button');document.querySelector('.kfoc-skipw button').click();await sl(60);window.talk=run0;
  out.act={n:a.n,calls:__K.calls.slice(),talked,cur:!!DFG.cur,skipGone:!document.querySelector('.kfoc-skipw:not([hidden]) button')};
  /* back «◂» during a game = cancel: no act */{S.visit.tk={};Q.length=0;used=0;const b=(dfActs(i)||[]).flatMap(g=>g.acts).find(a=>!a.off&&a.cls!=="D");let t2=0;out.bAct=b&&[b.n,b.cls,DF.play?'busy':'',Q.length];const r1=window.talk;window.talk=function(){t2++;return r1.apply(this,arguments)};
   F.o.onAct(b.id);const inGame=!!document.querySelector('.dfintro');document.querySelector('.kfoc-x').click();await sl(60);window.talk=r1;out.back={b:out.bAct,inGame,talked:t2,cur:!!DFG.cur,open:!!document.querySelector('.kfoc-veil')}}
  /* (3b) she leaves while the focus is up → the focus closes (no act goes to whoever took her index) */
  {const keep=S.visit.people.slice();const me=curPeople()[i];/* reopen on her */dfOpen(i);await sl(30);S.visit.people.splice(S.visit.people.indexOf(me),1);/* a tap on an act now: must not act on whoever took her index */const t0=window.talk;let tk=0;window.talk=function(){tk++};const a0=(__K.F.groups||[]).flatMap(g=>g.acts).find(a=>!a.off);__K.F.o.onAct(a0.id);window.talk=t0;await sl(900);
   out.gone={open:!!DF.F,DFi:DF.i,p:!!DF.p,talked:tk,cur:!!DFG.cur};S.visit.people.length=0;keep.forEach(x=>S.visit.people.push(x));renderStage();await sl(30);dfOpen(i);await sl(30)}
  /* (3) close */__K.F.close();await sl(900);out.close={popIdx,DFi:DF.i,popwHidden:document.getElementById('popw').hidden};
  /* (4) rollback */BAL.df.on=0;Q.length=0;S.visit.tk={};__K.calls.length=0;document.querySelector(`#tokens .tok[data-p="${i}"]`).click();await sl(30);out.rollback={open:__K.calls.includes('open'),popIdx,pop:!!document.querySelector('#popw .pcpop')};BAL.df.on=1;popIdx=null;renderStage();
  /* (5) NPC-initiated: an NPC slaps her (jslap card «Bị tát» with Né đòn) */
  const v=curPeople()[i].ref;Q.length=0;__K.calls.length=0;v.rank=Math.max(v.rank,(S.rank||0)+2);/* the same card jslap pushes for an NPC slap (who = pv(a), «Né đòn» opens slapGame {dodge}); the full NPC road (day plan → runAct) is covered by jslap's own tests */
  window.__dodge=null;pushModal({t:"Bị tát",who:pv(v),h:`<p>${v.name} bước tới, giơ cao bàn tay. Ngươi có kịp né không?</p>`,opts:[{n:"Né đòn",fx:{},go:()=>slapGame({dodge:true,by:v,title:"Né đòn",go:"Né",skip:"Chịu đòn",skipSub:"",rows:[],onDone:res=>{window.__dodge=res}})},{n:"Chịu đòn",fx:{},go:()=>{window.__dodge={took:1}}}]});showModal();await sl(30);
  await sl(1500);showModal();render();await sl(50);/* a repeated showModal / render while the card plays in the scene must not raise the centre modal */out.enc={calls:__K.calls.slice(),modalHidden:document.getElementById('modal').hidden,lines:[...document.querySelectorAll('.kfoc-say p')].map(x=>x.textContent),q:Q.length};
  const nx=document.querySelector('.kfoc-say:not([hidden]) .kfoc-next');if(nx){nx.click();await sl(200);out.enc.choices=(__K.F.ch||[]).map(c=>c.n);const btn=[...document.querySelectorAll('.kfoc-b')].find(b=>/Né/.test(b.textContent));
   if(btn){btn.click();await sl(120);out.enc.dodgeGame=!!DFG.cur&&DFG.cur.c.o.dodge;
    /* strike the incoming hand */const h=DFG.cur;if(h){const q=h.peek();const cv=h.canvas,rc=cv.getBoundingClientRect();const f=(t,x,y)=>cv.dispatchEvent(new PointerEvent(t,{clientX:rc.left+x,clientY:rc.top+y,bubbles:true,pointerId:1}));
     f('pointerdown',q.x,q.y-80);f('pointermove',q.x,q.y);f('pointerup',q.x,q.y+80)}await sl(80);
    out.enc.after={dodge:window.__dodge,raw3:BAL.slap.raw[3],cur:!!DFG.cur,log:(S.logs||[]).slice(0,2).map(x=>String(x).replace(/<[^>]+>/g,"").slice(0,90)),slap:S.slap&&S.slap.sev||0,q:Q.length,qt:Q[0]&&Q[0].t}}}
  /* (5d) an NPC card whose speaker has NO stage figure (the «+N» overflow): the centre card, never an empty focus frame */
  {Q.length=0;try{if(DF.F)DF.F.destroy()}catch(e){}DF.F=null;DF.p=null;DF.i=null;DF.tk=null;await sl(50);document.getElementById('modal').hidden=true;
   const P=curPeople();const j=P.findIndex(x=>x.kind==="rival"&&x.ref);const t=document.querySelector(`#tokens .tok[data-p="${j}"]`);if(t)t.remove();const v=P[j].ref;__K.calls.length=0;
   pushModal({t:"Thử",who:pv(v),h:`<p>${v.name} bước tới.</p>`,opts:[{n:"Ừ",fx:{},go:()=>{}}]});showModal();await sl(200);
   out.nofig={opened:__K.calls.includes('open'),modal:!document.getElementById('modal').hidden,focus:!!document.querySelector('.kfoc-veil')};Q.length=0;document.getElementById('modal').hidden=true;renderStage()}
  /* (6) mood bubble picker: a known, non-calm person gets a line of her feeling group */
  {const pp=curPeople().find(x=>x.ref&&x.kind==="rival");if(pp){emoSet(pp.ref,"gian",80,"thử");const kn=window.emoKnown;window.emoKnown=()=>true;const groups=Object.keys(DF_MOOD);let x=null;for(let k=0;k<20&&!(x&&x.i===curPeople().indexOf(pp));k++)x=dfMoodPick();window.emoKnown=kn;
   out.mood={x:x&&{text:x.text,i:x.i},want:DF_MOOD[typeof feelGrp==="function"?feelGrp("gian"):"gian"]||null,groups}}}
  return out});
 console.log(JSON.stringify(r).slice(0,1500));
 ok(r.mood&&r.mood.x&&r.mood.want&&r.mood.want.includes(r.mood.x.text),'(6) mood bubble: a line of her feeling (gian), cổ trang, no emoji',r.mood);
 ok(r.i>=0,'found a consort to act on at '+r.place);
 ok(r.shift&&r.shift.k===r.shift.want&&r.shift.k===r.i+1&&r.shift.popIdx===r.shift.k&&r.shift.DFi===r.shift.k&&r.shift.sameGroups&&r.shift.open&&r.shift.back.k===r.i,'(1d) list shifts under the focus: index, popIdx and groups follow HER',r.shift);
 ok(r.gone&&!r.gone.open&&r.gone.DFi==null&&!r.gone.p&&r.gone.talked===0&&!r.gone.cur,'(3b) she leaves while the focus is up → the focus closes',r.gone);
 ok(r.open&&r.open.plate===r.open.stageTag,'(1b) focus plate = the stage name tag of that person (same known / stranger rule)',[r.open&&r.open.plate,r.open&&r.open.stageTag]);
 ok(r.open&&r.open.called&&r.open.groups.length>0&&r.open.popIdx===r.i&&r.open.DFi===r.i&&r.open.popwHidden,'(1) stage tap opens the focus view, pop-up host hidden',r.open);
 ok(/luật chơi/i.test(r.intro)&&/sẵn sàng/i.test(r.intro)&&r.beforeGo&&/bỏ qua/i.test(r.skipTxt)&&/kết quả thường/i.test(r.skipTxt),'(2a) every on-figure game first shows its kit «Luật chơi» + «Sẵn sàng»; nothing runs before it; skip says what happens',{i:r.intro,s:r.skipTxt});
 ok(r.played&&r.act.calls.includes('endPlay')&&r.act.talked===1&&r.act.calls.includes('react')&&(r.act.calls.includes('setGroups')||r.act.calls.includes('setGroup'))&&r.act.skipGone&&!r.act.cur,`(2) act «${r.act&&r.act.n}»: game in F.play, skip = the act runs once, reaction + groups refresh`,r.act);
 ok(r.back&&r.back.inGame&&r.back.talked===0&&!r.back.cur&&r.back.open,'(2b) back «◂» in a game = cancel: no act, focus stays',r.back);
 ok(r.close&&r.close.popIdx==null&&r.close.DFi==null&&!r.close.popwHidden,'(3) ✕ clears popIdx and shows the pop-up host again',r.close);
 ok(r.rollback&&!r.rollback.open&&r.rollback.popIdx===r.i&&r.rollback.pop,'(4) BAL.df.on = 0 → old pop-up',r.rollback);
 ok(r.enc&&r.enc.calls.includes('open')&&r.enc.calls.includes('say')&&r.enc.modalHidden&&r.enc.lines.length>0,'(5a) NPC slap card plays in the scene: no centre modal, say lines',r.enc);
 ok(r.enc&&r.enc.choices&&r.enc.choices.some(c=>/Né/.test(c)),'(5b) the card options fan out as choices',r.enc&&r.enc.choices);
 ok(r.enc&&r.enc.dodgeGame&&r.enc.after&&!r.enc.after.cur&&r.enc.after.dodge&&!r.enc.after.dodge.skipped&&r.enc.after.dodge.raw>=r.enc.after.raw3,'(5c) the dodge plays on the figure; struck = dodged',r.enc&&r.enc.after);
 ok(r.nofig&&!r.nofig.opened&&r.nofig.modal&&!r.nofig.focus,'(5d) speaker without a stage figure → centre card, no empty focus',r.nofig);
 ok(errs.length===0,'no page error',errs.slice(0,3));await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
