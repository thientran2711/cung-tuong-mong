/* DELEGATE-NOMG test (owner OD 25/11 ~04:12Z: «Khi nào mà tôi là người tự làm thì mới có thể làm mini game cho tôi. Còn cái này là người ta làm mà tại sao
   lại là mini game của tôi?»). An act she ORDERS someone else to do never opens a mini-game; the doer's ability + BAL odds decide it.
   (1) SCAN (static): every ptSend kind in the code is a BAL.ptime send kind, and every pk-marked / ACT_REMOTE / «Sai …» talk option of her maid and of
       every servant classifies as delegated (jdf dfCls "E") or its own flow ("D") — never a game class.
   (2) RUNTIME SCAN: every mini-game opener (kg82Open, playArt, startContest, sgPlay, dfGame, slapGame, kitFocus intro/play) is spied; each delegated
       act is run through the focus view (dfTap) and through the old pop-up (talk) and through the scheme choice «Giao cho người làm» → 0 opener calls.
   (3) REAL TAP of «Nghe ngóng chung» on her maid in the focus view at Fold 755x1000 and iPad 1180x820: no «LUẬT CHƠI» card, no game layer, the order
       is given (her maid goes; parallel time) and the card's odds word comes from the doer (spyO(S,null,maid)); shots to $SHOTS (default scratch).
   (4) the doer's odds: the shown option odds = spyO(S,null,doer), a more loyal doer has better odds (law 4: BAL.spy* only).
   usage: node dev/test/delegate-nomg.js [shotDir] → exit 1 on FAIL */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)bad++};
const SH=process.argv[2]||path.join(__dirname,'../../../dnm-shots');try{fs.mkdirSync(SH,{recursive:true})}catch(e){}
/* (1) static scan */
{const B=path.join(__dirname,'../build');const kinds=new Set();const src=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)).map(f=>[f,fs.readFileSync(path.join(B,f),'utf8')]);
 const bal=src.find(x=>x[0]==='jbal2.js')[1];const m=bal.match(/ptime:\{on:\d,kinds:\{([\s\S]*?)\n \},/);const K=new Set(m?[...m[1].matchAll(/^\s*([a-z]+):\{o:/gm)].map(x=>x[1]):[]);
 for(const [f,s] of src)for(const x of s.matchAll(/ptSend\(\{[^}]*?kind:"([a-z]+)"/g))kinds.add(x[1]);
 const miss=[...kinds].filter(k=>!K.has(k));ok(K.size>5&&!miss.length,'scan: every ptSend kind is a BAL.ptime send kind',{kinds:[...kinds].sort(),miss});
 const jdf=src.find(x=>x[0]==='jdf.js')[1];ok(/function dfCls\(a\)\{[^\n]*if\(dfDlg\(a\)\)return"E"/.test(jdf),'scan: jdf dfCls returns E for a delegated act');
 const jdfv=src.find(x=>x[0]==='jdfv.js')[1];ok(/if\(a\.cls==="D"\|\|a\.cls==="E"\)\{run\(\);return\}/.test(jdfv),'scan: jdfv dfTap runs E (delegated) with no game');
 const nm=[];for(const [f,s] of src)for(const x of s.matchAll(/spyNews\(/g))nm.push(f);ok(nm.every(f=>f==='jwhy.js'),'scan: «Nghe ngóng chung» runs only through spyListen (the doer roll), never spyNews directly',nm)}
(async()=>{const b=await chromium.launch();
 for(const dev of [['fold',755,1000],['ipad',1180,820]]){
  /* direct mode on the built dev/index.html at the device size (visitor-scene pattern: the stage + focus view as the player taps it) */
  const ctx=await b.newContext({viewport:{width:dev[1],height:dev[2]},deviceScaleFactor:1,hasTouch:true});const p=await ctx.newPage();const g=p;
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(mp3|ogg|mp4|webm)$/,r=>r.abort());
  await p.goto('file://'+path.resolve(__dirname,'../index.html'),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;window.__forceOrigin='cn';for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
  await p.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);
  /* the «Sửa soạn nhập cung» loader (visitor-scene pattern) */
  for(let k=0;k<30;k++){const gone=await g.evaluate(()=>{const r=document.getElementById('kmrew');if(r)r.remove();const bt=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent||'')&&x.offsetParent);if(bt)bt.click();return !/Sửa soạn nhập cung/.test(document.body.innerText||'')});if(gone&&k>2)break;await p.waitForTimeout(1500)}
  /* spies on every mini-game opener */
  await g.evaluate(()=>{window.__MG=[];const W=(o,k)=>{if(o&&typeof o[k]==='function'){const f=o[k];o[k]=function(){__MG.push(k);return f.apply(this,arguments)}}};
   for(const k of ['kg82Open','playArt','startContest','sgPlay','dfGame','slapGame'])if(typeof window[k]==='function'){const f=window[k];window[k]=function(){__MG.push(k);return f.apply(this,arguments)};try{eval(k+'=window.'+k)}catch(e){}}
   window.__RE=[];const o0=kitFocus.open;kitFocus.open=function(){const F=o0.apply(this,arguments);W(F,'intro');W(F,'play');const r0=F.react;F.react=function(x){__RE.push(x&&x.line);return r0.apply(this,arguments)};return F};
   window.__home=()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}used=0;S.out=0;S.confined=0;S.place="home";try{goTo("home")}catch(e){}Q.length=0;if(S.visit){S.visit.tk={};S.visit.talked=false}tab="act";window.__fromMap=1;render()}});
  /* (3) real tap: her maid on the home stage */
  let i=-1;for(let t=0;t<6&&i<0;t++){i=await g.evaluate(()=>{__home();const P=curPeople();return P.findIndex(x=>x.kind==="maid")});if(i<0)await g.evaluate(()=>{S.buoi=(S.buoi+1)%4;used=0})}
  if(i<0){i=await g.evaluate(()=>{/* the maid is out this buổi: put her at home the way the stage lists her (j2 people row) */const P=curPeople();const m=S.maid;P.push({kind:"maid",name:m.name,ref:m,col:"#c9a",ini:m.name[0],info:""});renderStage();return curPeople().findIndex(x=>x.kind==="maid")})}
  ok(i>=0,dev[0]+': her maid stands on the home stage',i);
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;renderStage()});await p.waitForTimeout(600);
  const tok=await g.$(`#tokens .tok[data-p="${i}"]`);ok(!!tok,dev[0]+': her maid has a stage figure');if(tok){const bb=await tok.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)}await p.waitForTimeout(900);
  const open=await g.evaluate(()=>!!DF.F);ok(open,dev[0]+': tap on her maid opens the focus view');
  /* find the act in the fan (switch group tabs if needed) */
  const A=await g.evaluate(()=>{const G=dfData(DF.i)||[];for(const gr of G){const a=gr.acts.find(a=>/^Nghe ngóng chung/.test(a.n));if(a){try{DF.F.setGroup(gr.k)}catch(e){}const f=dfFind(DF.i,a.id)||a;return{id:a.id,cls:f.cls,word:a.word,g:gr.n}}}return null});
  ok(A&&A.cls==="E",dev[0]+': «Nghe ngóng chung» is a delegated act (class E)',A);await p.waitForTimeout(400);
  const odds=await g.evaluate(()=>{const o=talkOpts({kind:"maid"}).find(x=>x.n==="Nghe ngóng chung");return{o:oddsOf(o),want:spyO(S,null,whyMaidInit(S.maid)),word:KIT_ODDS[oddsLv(oddsOf(o))]}});
  ok(odds.o===odds.want&&odds.o<100,dev[0]+': the card odds are the doer\'s (spyO of her maid), shown as a ladder word',odds);
  await p.screenshot({path:path.join(SH,dev[0]+'-1-fan.png')});
  const s0=await g.evaluate(()=>{__MG.length=0;return{log:S.logSeq||0,pt:(S.pt||S.ptime||[]).length}});
  const btn=await g.$$('.kfoc-b');let hit=null;for(const x of btn){const t=(await x.innerText()).replace(/\s+/g,' ');if(/Nghe ngóng chung/.test(t)){hit=x;break}}
  ok(!!hit,dev[0]+': the fan shows «Nghe ngóng chung»');if(hit){const bb=await hit.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)}await p.waitForTimeout(350);await p.screenshot({path:path.join(SH,dev[0]+'-2-after-tap.png')});await p.waitForTimeout(850);
  const r=await g.evaluate(()=>({mg:__MG.slice(),intro:!!document.querySelector('.kfoc-intro:not([hidden])'),rules:/LUẬT CHƠI/i.test(document.body.innerText),cur:!!(window.DFG&&DFG.cur),play:!!DF.play,react:__RE.slice(),pm:String(popMsg).slice(0,120),dl:dfLast(),bub:[...document.querySelectorAll('[class*=kfoc] p,[class*=kfoc-re],[class*=react]')].filter(x=>x.offsetParent).map(x=>x.className+':'+x.textContent.slice(0,80)),
   last:(S.logs||[]).slice(0,2).map(x=>String(x).replace(/<[^>]+>/g,'').slice(0,120)),busy:typeof ptLockWhy==="function"?ptLockWhy(ptPid(S.maid)):""}));
  ok(!r.mg.length&&!r.intro&&!r.cur&&!r.play,dev[0]+': tapping it opens NO mini-game (no rules card, no game layer, no opener call)',r);
  ok(r.last.some(x=>/Nghe ngóng chung|nghe ngóng/.test(x))||!!r.busy,dev[0]+': the order is given (her maid goes / the result is logged)',r.last);
  /* the result when she comes back: let the khắc pass and land the send */
  const land=await g.evaluate(async()=>{try{if(typeof ptTick==="function"){for(let k=0;k<4;k++){used++;ptTick()}}}catch(e){}await new Promise(r=>setTimeout(r,600));return{mg:__MG.slice(),last:(S.logs||[]).slice(0,3).map(x=>String(x).replace(/<[^>]+>/g,'').slice(0,140))}});
  ok(!land.mg.length,dev[0]+': her maid comes back, still no mini-game',land);
  await p.screenshot({path:path.join(SH,dev[0]+'-3-back.png')});
  /* (2) runtime scan of the whole delegated family: focus dfTap + pop-up talk() + scheme «Giao cho người làm» */
  if(dev[0]==='fold'){const z=await g.evaluate(async()=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const out=[];try{if(DF.F)DF.F.destroy()}catch(e){}DF.F=null;DF.p=null;DF.i=null;DF.tk=null;
    window.ptOn=()=>false;/* run each act at once (no parallel-time wait), the same option objects */
    const kinds=[{kind:"maid"}].concat((S.staff||[]).slice(0,3).map(x=>({kind:"serv",ref:x,name:x.name})));
    for(const pp of kinds){const T=talkOpts(pp)||[];T.forEach((o,oi)=>{if(!o||!dfDlg(o)||o.lock)return;__MG.length=0;Q.length=0;used=0;
      const cls=dfCls(o);if(o.run){try{o.run()}catch(e){}}out.push({kind:pp.kind,n:o.n,cls,mg:__MG.slice()})})}
    /* the focus tap path for every delegated act of every person on every stage */
    for(const k of ["home"].concat((places()||[]).map(x=>x.k))){Q.length=0;used=0;S.place="home";try{if(k!=="home")goTo(k)}catch(e){continue}if(Q[0]&&Q[0].pid==="entpick"){const o=Q[0].opts.find(x=>x.n==="Đi một mình");Q.length=0;if(o)o.go()}Q.length=0;if(S.visit){S.visit.tk={};S.visit.talked=false}tab="act";try{render()}catch(e){}
     const P=curPeople();for(let i=0;i<P.length;i++){const G=dfActs(i)||[];for(const gr of G)for(const a of gr.acts){if(a.cls!=="E"||a.off)continue;if(!dfOpen(i))continue;__MG.length=0;Q.length=0;S.visit.tk={};used=0;dfTap(a.id);await sl(60);
       out.push({kind:P[i].kind,n:a.n,cls:a.cls,via:"focus",mg:__MG.slice(),intro:!!document.querySelector('.kfoc-intro:not([hidden])')});Q.length=0;try{if(DF.F)DF.F.destroy()}catch(e){}DF.F=null;DF.p=null;DF.i=null;DF.tk=null}}}
    /* the scheme choice «Giao cho người làm» (jsgame sgpick) on a consort: the delegation road of Dò la / Tung tin đồn / Thời cơ */
    const v=rivals.find(x=>x&&x.alive&&!x.out);if(v){for(const k of ["spy","rumor","frame"]){if(!SG.K[k])continue;Q.length=0;used=0;__MG.length=0;S.bac=Math.max(S.bac||0,999);
      const d=mkP("sgpick",{j:"act",v:v.id,k});const o=d&&d.o&&d.o.find(x=>x.n==="Giao cho người làm");if(o){try{o.go()}catch(e){}await sl(80);out.push({kind:"rival",n:"Giao cho người làm: "+ACT[k].n,cls:"choice",mg:__MG.slice()})}Q.length=0}}
    return out});
   const bads=z.filter(x=>x.mg.length||x.intro);ok(z.length>=4&&!bads.length,'runtime scan: '+z.length+' delegated runs, 0 mini-game openers',bads.length?bads:z.map(x=>x.kind+":"+x.n+":"+(x.via||x.cls)));
   /* (4) doer ability moves the odds (one core: spyFactors of the doer) */
   const dz=await g.evaluate(()=>{const m=whyMaidInit(S.maid),l0=m.loyal;m.loyal=20;const lo=spyO(S,null,m);m.loyal=95;const hi=spyO(S,null,m);m.loyal=l0;return{lo,hi}});
   ok(dz.hi>dz.lo,'doer ability: a more loyal maid has better «Nghe ngóng chung» odds',dz)
   /* (5) scheme «Giao cho người làm» = the DOER's odds (MAIN 133 ruling on OD 25/11 ~04:12Z): the act runs as a SENT act (j9 ACTSEND → actCtx sendPen of the one sent) */
   const gz=await g.evaluate(()=>{const out=[];const v=rivals.find(x=>x&&x.alive&&!x.out);if(!v)return out;const sv=sgDoer();if(!sv)return[{err:"no doer"}];const l0=sv.loyal;
    for(const k of ["spy","rumor","frame"]){if(!SG.K[k])continue;const J=sgJob({j:"act",v:v.id,k});if(!J)continue;
     const self=J.p0();sv.loyal=10;const lo=sgDlgO(J);sv.loyal=95;const hi=sgDlgO(J);sv.loyal=l0;const now=sgDlgO(J);const want=oddsCl(Math.round((()=>{ACTSEND=1;try{return actOdds(S,v,k)}finally{ACTSEND=0}})()));
     const d=mkP("sgpick",{j:"act",v:v.id,k});const opt=d&&d.o.find(x=>x.n==="Giao cho người làm");
     /* the run: runAct sees a sent act (its ctx pen = the doer's sendPen) */let pen=null;const c0=actCtx;actCtx=function(a,t,kk){const r=c0.apply(this,arguments);if(a===S&&kk===k)pen=r.pen;return r};
     Q.length=0;used=0;S.bac=Math.max(S.bac||0,999);try{if(opt)opt.go()}catch(e){}actCtx=c0;Q.length=0;
     out.push({k,self,lo,hi,now,want,x:opt&&String(opt.x).replace(/<[^>]+>/g,"").slice(0,90),pen,sendPen:sendPen(sv,k)})}
    return out});
   ok(gz.length>=2&&gz.every(r=>r.now===r.want&&r.hi>=r.lo&&r.pen===r.sendPen&&/giao cho/.test(r.x||"")),'scheme «Giao cho người làm» rolls the doer\'s odds (sent act, sendPen of the one sent; loyal doer ≥ disloyal), card names the doer',gz)}
  ok(!errs.length,dev[0]+': no page errors',errs.slice(0,3));await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
