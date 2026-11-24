/* review/know-notice (owner OD 23/11 ~23:08Z: every time she LEARNS something — a name, a face, a rank, a nature, a liking, a rumour, a Sổ line — the game tells
   her clearly at that moment). Every path that writes her knowledge → exactly ONE kit notice (kitKnow → kitNotice kind "know"), batched per act, and none when
   nothing new was learned. usage (HOST mode, built root): DEV=fold|ipadAir [SHOTS=outdir] node dev/test/know-notice.js → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold';const out=process.env.SHOTS||'';if(out)fs.mkdirSync(out,{recursive:true});
 const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=+(new URLSearchParams(location.search).get('seed')||123456789);Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const s=document.createElement('style');s.textContent='#kroul,#kload,#klife,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s)});
 await sleep(1500);
 const rows=await g.evaluate(()=>{
  const R=[];const strangers=()=>rivals.filter(v=>v.alive&&!v.out&&!v.queen&&k61St(v)<1&&(S.met||{})[v.id]==null);
  const reset=v=>{if(v){delete S.known[kOf61(v)];if(S.met)delete S.met[v.id]}};
  /* run(fn): clears the batch, runs one act, flushes → the notices raised by that single act */
  const run=(label,fn,want,rx)=>{kitKnowFlush();const n0=NT.log.length;let err="";try{fn()}catch(e){err=String(e)}kitKnowFlush();const L=NT.log.slice(n0);
   R.push({path:label,want,got:L.length,line:L[0]||"",ok:L.length===want&&(!rx||new RegExp(rx).test(L.join("|")))&&!err,err});};
  const S0=strangers();const a=S0[0],b=S0[1],c=S0[2],d=S0[3];
  run("j61 k61Know face (stage 1)",()=>{reset(a);k61Know(a,"",true,1)},1,"thấy mặt");
  run("j61 k61Know name (stage 2)",()=>{reset(b);k61Know(b,"",true,2)},1,"biết tên");
  run("j61 k61Know quen biết (stage 3)",()=>{reset(c);S.known[kOf61(c)]=2;k61Know(c,"",true,3)},1,"quen biết");
  run("j61 k61Know several at once = ONE batched notice",()=>{reset(a);reset(b);reset(c);k61Know([a,b,c],"",true,2)},1,"biết thêm 3 điều");
  run("j61 k61Know nothing new = no notice",()=>{k61Know([a,b,c],"",true,2)},0);
  run("j61 k61Meet (face to face) = one notice",()=>{reset(d);k61Meet(d,"gặp",2)},1,"biết tên|gặp mặt|thấy mặt");
  run("j61 k61MetSet first sight (no stage change) = one notice",()=>{S.known[kOf61(a)]=3;delete S.met[a.id];k61MetSet(a)},1,"gặp mặt");
  run("j61 k61MetSet again = no notice",()=>{k61MetSet(a)},0);
  run("jgreet grFace / grLearn (greeting reveal)",()=>{reset(b);grFace(S,b);grLearn(S,b)},1,"biết tên|thấy mặt|gặp mặt");
  run("j28 learnTrait + its Sổ line = ONE notice",()=>{S.trK=S.trK||{};S.notes=S.notes||{};delete S.trK[c.id];S.known[kOf61(c)]=3;learnTrait(c,"Chuyện trò")},1,"nết");
  run("j28 newsAdd (a rumour reaches her)",()=>{newsAdd(c,"ky","Nghe nói "+c.name+" gặp kỳ ngộ.",true)},1,"Nghe nói");
  run("j1/jdis discover (Hoàng thượng thích / không ưa …)",()=>{S.emp.known={};S.disK={};let r=false;for(let i=0;i<20&&!r;i++){S.emp.known={};r=discover()}},1,"Hoàng thượng|biết thêm");
  run("jdis learn (Hoàng thượng không ưa …)",()=>{S.disK={};disLearn("emp")},1,"không ưa");
  run("jbalcore eaTell (tháng này Hoàng thượng chuộng …)",()=>{S.eaK=null;if(!empArt())empArtMonth();S.eaK=-1;eaTell(S,"tai mắt báo")},1,"chuộng");
  const K1=rivals.find(v=>v.alive&&!v.out&&!v.queen&&v!==a&&v!==b&&v!==c&&v!==d&&v.rank<5);S.known[kOf61(K1)]=3;S.met=S.met||{};S.met[K1.id]=wk();S.rkSeen={};k61RankSync();kitKnowFlush();
  run("rank of a KNOWN person rises = one notice",()=>{K1.rank++;k61RankSync()},1,"tấn phong");
  run("rank unchanged = no notice",()=>{k61RankSync()},0);
  run("rank falls = one notice",()=>{K1.rank--;k61RankSync()},1,"giáng xuống");
  const U1=rivals.find(v=>v.alive&&!v.out&&!v.queen&&k61St(v)<1&&(S.met||{})[v.id]==null&&v.rank<5);
  if(U1)run("rank of a STRANGER changes = no notice (she does not know her)",()=>{U1.rank++;k61RankSync()},0);
  run("kitKnowMany (SELSCENE sắc phong list) = ONE notice",()=>{kitKnowMany([{key:"s1",text:"A nay là Tần."},{key:"s2",text:"B nay là Phi."}])},1,"biết thêm 2 điều");
  run("noteAdd shown=1 (act's own card tells it) = no second notice",()=>{noteAdd(c.id,"Sổ nguyệt sự: tháng này không báo",1)},0);
  run("j78 intelLearn (card shows the facts) = no notice from its Sổ line",()=>{S.intel={};intelLearn(c,1,{by:"Ngươi",how:"test"})},0);
  run("j95b j95bHear (Q card «Nghe đồn») = no second notice",()=>{const y=rivals.find(v=>v.alive&&!v.out&&v!==c);Q.length=0;j95bHear({y:y.id,x:null,txt:"đã làm điều sai",u:1,w:wk()});Q.length=0;document.getElementById('modal').hidden=true},0);
  run("j29 servLearn (a servant's nết) = one notice",()=>{const sv=(S.staff||[])[0]||S.maid;sv.kn=0;servLearn(sv,"Qua việc làm")},1,"biết");
  run("j92 wdReveal (an item's true phẩm) = one notice",()=>{S.wdk={};wdReveal(Object.keys(WD_ITEMS)[0],"test")},1,"Biết được");
  run("jtrong trongLearn Hoàng thượng (was log only) = one notice",()=>{S.tgK={};const tg={};trongOf(S.emp).forEach(v=>tg[v]=1);for(let i=0;i<80&&!S.tgK.emp;i++)trongLearn(S.emp,tg,"Qua lời qua lại")},1,"trọng|Biết|biết");
  run("j21 noteAdd (Sổ line)",()=>{noteAdd(c.id,"Dò được: nàng thích hoa lan")},1,"Sổ ghi thêm");
  run("kitKnow same key twice in one act = one fact",()=>{kitKnow({key:"x",text:"Ngươi biết A."});kitKnow({key:"x",text:"Ngươi biết A, rõ hơn.",pri:1})},1,"rõ hơn");
  const note=NT.list.find(x=>x.kind==="know");R.push({path:"notice is a kitNotice kind know in the top-bar box",want:1,got:note?1:0,ok:!!note,line:note?note.line:""});
  R.push({path:"no % / digits-percent in know lines",want:0,got:NT.log.filter(x=>/%/.test(x)).length,ok:!NT.log.some(x=>/%/.test(x))});
  return R});
 if(out){await g.evaluate(()=>{kitNotice({id:"kn-shot",kind:"know",line:"Ngươi biết thêm 3 điều",text:"Ngươi biết tên: đó là Lệ tần Mai thị. · Ngươi đã thấy mặt một phi tần áo bậc Tần; chưa biết tên. · Sổ ghi thêm: nàng thích hoa lan.",again:true})});await sleep(700);await p.screenshot({path:path.join(out,`know-chip-${dev}.png`)});
  await g.evaluate(()=>kitNoticeOpen('kn-shot'));await sleep(900);await p.screenshot({path:path.join(out,`know-panel-${dev}.png`)})}
 const bad=rows.filter(r=>!r.ok);console.log(JSON.stringify({dev,rows,errs,bad:bad.length},null,1));await b.close();srv.close&&srv.close();process.exit(bad.length||errs.length?1:0)})();
