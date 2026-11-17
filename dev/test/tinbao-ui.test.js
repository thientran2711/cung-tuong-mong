/* tinbao-ui test (KIT §87; dev/build/jtinbao.js): the TIN BÁO badge / toast / card on top of the AG-ALL-2c API (jagknow).
   1 badge: data-n = tinBaoNew().length, blinks (.on) while unseen > 0, calm when all seen, absent with nothing to show; seen clears it
   2 toast: once per item (same id twice = one line, one sound), via the real tinBaoOn callback (knBao), never a modal; a dialog open → no toast (badge only)
   3 card: opens the kit TIN panel (kind news), lists unseen first, marks all seen; "Để ta xem" opens the Dư đồ tab
   4 old save (no S.tb) loads and renders; the API missing / S null (co-op thin guest) never throws
   5 geometry at 5 viewports: the badge sits inside the top bar, covers no text of it, no horizontal overflow, toast inside the screen
   usage: node dev/test/tinbao-ui.test.js [dev/index.html] → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const VP=[[755,1000],[1180,820],[1366,1024],[412,1058],[390,844]];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.kitReward=function(){};window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}Q.length=0;render()});
 await p.waitForTimeout(800);
 const plant=()=>p.evaluate(()=>{const T=knTb();T.K={};T.R=[];const sv=(S.staff||[])[0];const t=(i,pl,by,seen,line)=>T.K["t"+i]={id:"t"+i,k:"gossip",place:pl,b:S.buoi||0,k0:0,k1:99,who:[],line,by,seen};
  t(1,"vuon",sv?"s"+sv.sid:"mat",0,"Bẩm chủ tử, Ngự hoa viên đang có chuyện. Chủ tử có muốn qua xem không?");t(2,"tyv","mat",0,"Tai mắt báo: ở Thái y viện có người đang bàn tán.");t(3,"lc","mat",1,"Tai mắt báo: ở Lãnh cung có động tĩnh lạ.");
  Q.length=0;try{closeModal()}catch(x){}TB.toasted={};TB.queue.length=0;TB.shown.length=0;TB.sounds=0;const e=document.getElementById("ktbtoast");if(e)e.remove();clearTimeout(TB.t);TB.t=0;render();kitTinBaoBadge();return {n:tinBaoNew(),len:tinBaoList().length}});
 /* 1 badge */
 let r=await plant();let bd=await p.evaluate(()=>{const e=document.getElementById("ktbbadge");return e?{n:e.dataset.n,on:e.classList.contains("on"),vis:e.getClientRects().length>0}:null});
 ok(r.n>=2&&bd&&+bd.n===r.n&&bd.on&&bd.vis,'badge: data-n = tinBaoNew(), blinking while unseen > 0',{r,bd});
 await p.evaluate(()=>{tinBaoSeen();kitTinBaoBadge()});bd=await p.evaluate(()=>{const e=document.getElementById("ktbbadge");return e?{n:e.dataset.n,on:e.classList.contains("on")}:null});
 ok(bd&&bd.n==="0"&&!bd.on,'badge: seen clears the count and the blink (calm badge stays)',bd);
 await p.evaluate(()=>{const T=knTb();T.K={};T.R=[];window.__ag0=BAL.ag.on;BAL.ag.on=0;kitTinBaoBadge()});bd=await p.evaluate(()=>!!document.getElementById("ktbbadge"));
 ok(!bd,'badge: nothing to show → no badge');await p.evaluate(()=>{BAL.ag.on=window.__ag0});
 /* 2 toast: the real callback chain (tinBaoOn → toast), once per item, one sound per toast, no modal */
 await plant();
 const t2=await p.evaluate(()=>{const sv=(S.staff||[])[0];TB.toasted={};TB.shown.length=0;TB.sounds=0;TB.queue.length=0;let line="";
  if(sv){knBao(sv,S,"mấy vị phi tần xúm lại bàn tán","vuon");}else{kitTinBaoToast({id:"zz1",place:"vuon",by:"mat",seen:0})}
  const first=TB.shown.length;const el=document.getElementById("ktbtoast");const txt=el?el.textContent:"";
  const id=TB.shown[0];kitTinBaoToast({id:id,place:"vuon",by:"mat",seen:0});kitTinBaoToast({id:id,place:"vuon",by:"mat",seen:0});
  return {first,again:TB.shown.length,sounds:TB.sounds,txt,modal:!document.getElementById("modal").hidden,q:Q.length}});
 ok(t2.first===1&&t2.again===1&&t2.sounds===1&&!t2.modal,'toast: once per item (same id again = no second line, one sound), no modal',t2);
 ok(/^TIN/.test(t2.txt)&&!/%/.test(t2.txt),'toast: kit line (seal TIN + one sentence), no %',t2.txt);
 const t2b=await p.evaluate(()=>{const e=document.getElementById("ktbtoast");const r=e&&e.getBoundingClientRect();return r?{top:r.top,l:r.left,rt:r.right,w:innerWidth}:null});
 ok(t2b&&t2b.l>=0&&t2b.rt<=t2b.w,'toast: inside the screen',t2b);
 await p.waitForTimeout(3900);ok(await p.evaluate(()=>!document.getElementById("ktbtoast")),'toast: gone after ~3 s');
 const t2c=await p.evaluate(()=>{Q.length=0;kitModal({kind:"notice",title:"Thử",facts:["Một dòng."],btn:"Đã rõ"});TB.shown.length=0;kitTinBaoToast({id:"mm1",place:"vuon",by:"mat",seen:0});const r={shown:TB.shown.length,q:!!document.getElementById("ktbtoast")};closeModal();Q.length=0;return r});
 ok(t2c.shown===0&&!t2c.q,'toast: a dialog is open → no toast (badge only)',t2c);
 /* 3 card */
 await plant();await p.evaluate(()=>{const e=document.getElementById("ktbtoast");if(e)e.remove();clearTimeout(TB.t);TB.t=0});
 await p.click("#ktbbadge");await p.waitForTimeout(1500);
 const c3=await p.evaluate(()=>{const d=document.querySelector("#modal .dlg.kpanel");return {kind:d&&d.dataset.kind,seal:(d&&d.querySelector(".kpseal")||{}).textContent,title:(d&&d.querySelector(".kptitle")||{}).textContent,facts:d?d.querySelectorAll(".kfact").length:0,opts:d?d.querySelectorAll(".opts button").length:0,txt:d?d.querySelector("#mb").textContent:"",n:tinBaoNew()}});
 ok(c3.kind==="news"&&c3.seal==="TIN"&&c3.title==="Tai mắt báo"&&c3.facts>=3,'card: kit TIN panel "Tai mắt báo" lists every item',c3);
 ok(c3.txt.indexOf("Ngự hoa viên")>=0&&c3.txt.indexOf("Thái y viện")>=0&&c3.txt.indexOf("đã xem")>=0&&c3.txt.indexOf("Ngự hoa viên")<c3.txt.indexOf("Lãnh cung")&&!/%/.test(c3.txt),'card: unseen first, the seen one marked "đã xem", no %');
 ok(c3.n===0,'card: opening it marks everything seen');
 await p.click("#modal .opts button");await p.waitForTimeout(800);
 const c3b=await p.evaluate(()=>({tab,modal:!document.getElementById("modal").hidden}));ok(c3b.tab==="go"&&!c3b.modal,'card: "Để ta xem" closes the card and opens the Dư đồ tab',c3b);

 /* 3b Tai mắt list + per-row informer kind (owner OD ~16:25Z; data stub behind ONE adapter) */
 await plant();await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const v=liveRivals(true).find(x=>(x.staff||[]).length);if(v){v.staff[0].spyFor='me';window.__tm0=v.staff[0]}try{KN.m=null}catch(e){}S.mat=1;render()});await p.waitForTimeout(500);
 const hasBtn=await p.evaluate(()=>!!document.querySelector('[data-kas="mat"]'));
 if(hasBtn)await p.click('[data-kas="mat"]');else await p.evaluate(()=>kitTaiMatCard());await p.waitForTimeout(1500);
 const tm=await p.evaluate(()=>{const d=document.querySelector("#modal .dlg.kpanel");return{title:(d&&d.querySelector(".kptitle")||{}).textContent,sub:(d&&d.querySelector(".kpsub")||{}).textContent,rows:d?d.querySelectorAll(".kfact").length:0,txt:d?d.querySelector("#mb").textContent:"",n:tbTaiMat().length,tapped:null}});
 ok(tm.title==="Tai mắt của ta"&&tm.n>=1&&/người của/.test(tm.txt)&&tm.rows>=1&&/đặt ở/.test(tm.txt)&&!/%/.test(tm.txt),'Tai mắt N tappable → kit list of WHO (name, role, where placed, lòng)',{hasBtn,title:tm.title,n:tm.n,rows:tm.rows});
 await p.evaluate(()=>{Q.length=0;closeModal()});
 const kd=await p.evaluate(()=>{const sv=(S.staff||[])[0],v=liveRivals(true)[0],tm=window.__tm0;const k=x=>tbInformerKind(x).kind;try{KN.m=null}catch(e){}return{mat:tm?k({by:"mat",inf:"s"+tm.sid}):"mat",hau:sv?k({by:"s"+sv.sid,inf:"s"+sv.sid}):"hau",ban:v?k({by:"v"+v.id,inf:"v"+v.id}):"ban",qua:k({by:"le"})}});
 ok(kd.mat==="mat"&&kd.hau==="hau"&&kd.ban==="ban"&&kd.qua==="qua",'informer kind per row: Tai mắt / own servant / friend / passer-by',kd);
 await plant();await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}kitTinBaoCard()});await p.waitForTimeout(1500);
 const rowk=await p.evaluate(()=>document.querySelector("#modal #mb").textContent);
 ok(/tai mắt của ta|người hầu của ta|bạn trong cung|người qua đường|ta tận mắt thấy/i.test(rowk),'every TIN BÁO row names what the informer is to her',rowk.slice(0,120));
 await p.evaluate(()=>{Q.length=0;closeModal()});
 /* 4 old save + missing API */
 const o4=await p.evaluate(()=>{const o={};try{delete S.tb;render();o.a=true;kitTinBaoBadge();o.b=true}catch(e){o.err=String(e)}
  const f=window.tinBaoList,nb=window.tinBaoNew;try{window.tinBaoList=undefined;kitTinBaoBadge();kitTinBaoCard();o.c=true}catch(e){o.err2=String(e)}finally{window.tinBaoList=f;window.tinBaoNew=nb}
  const S0=S;try{S=null;kitTinBaoBadge();kitTinBaoToast({id:"q",place:"vuon",by:"mat",seen:0});o.d=true}catch(e){o.err3=String(e)}finally{S=S0}
  try{Q.length=0;closeModal()}catch(e){}return o});
 ok(o4.a&&o4.b&&o4.c&&o4.d&&!o4.err&&!o4.err2&&!o4.err3,'old save (no S.tb) renders; API missing / S null (co-op thin guest) never throws',o4);
 /* 5 geometry */
 for(const [W,H] of VP){await p.setViewportSize({width:W,height:H});await p.waitForTimeout(500);await plant();await p.waitForTimeout(700);
  const g=await p.evaluate(()=>{const bd=document.getElementById("ktbbadge"),h=document.querySelector("header.hud");if(!bd||!h)return{none:1};const a=bd.getBoundingClientRect(),hr=h.getBoundingClientRect();
   const leaves=[...h.querySelectorAll("*")].filter(e=>!e.children.length&&e.getClientRects().length&&!e.matches(".kseal")&&e.textContent.trim()).map(e=>e.getBoundingClientRect()).filter(r=>{const s=h.querySelector('.kseal-hud');const q=s&&s.getBoundingClientRect();return !(q&&r.left+r.width/2>q.left&&r.left+r.width/2<q.right&&r.top+r.height/2>q.top&&r.top+r.height/2<q.bottom)});/* text the seal already hides (narrow bar) is not new damage */
   const hit=leaves.filter(r=>a.left<r.right&&a.right>r.left&&a.top<r.bottom&&a.bottom>r.top).length;
   return{inside:a.left>=hr.left-1&&a.right<=hr.right+1&&a.top>=hr.top-1&&a.bottom<=hr.bottom+1,hit,ovf:document.documentElement.scrollWidth>innerWidth+1,w:Math.round(a.width)}});
  ok(!g.none&&g.inside&&g.hit===0&&!g.ovf,`geometry ${W}x${H}: badge inside the top bar, covers no text, no horizontal overflow`,g)}
 ok(errs.length===0,'no page errors',errs);
 await b.close();process.exit(res.every(Boolean)?0:1)})()
