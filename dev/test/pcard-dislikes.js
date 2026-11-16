/* review/pcard-dislikes: per-person dislikes (jdis). usage: node dev/test/pcard-dislikes.js <build url> <outdir> [WxH@dpr,...]
   checks: every consort + Emperor has 1-2 dislikes; never overlap their likes; deterministic; old save loads and gets dislikes; spying / talking / "Hỏi sở thích"
   reveal them; unknown ones stay hidden; wrong gift fires (refuse or penalty); person card shows the row; no page errors / overflow; shots per size */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let fail=0;const ok=(c,m,o)=>{if(!c){fail++;o.push("FAIL "+m)}};
 for(const sz of (SIZES||"755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@1,390x844@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const out=[],errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:60000});await sleep(2500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()});
  await sleep(1200);
  /* 1. data */
  const d=await p.evaluate(()=>{const all=[["emp",S.emp]].concat(rivals.map(v=>[v.name,v]));const r=[];
   for(const [n,o] of all){const who=n==="emp"?"emp":o;const D=disOf(who),L=disLikeKeys(who);r.push({n,len:D.length,ov:D.filter(k=>L.includes(k)),known:disKnown(who).length})}
   const a=JSON.stringify(rivals.map(v=>v.dis)),e=JSON.stringify(S.emp.dis);
   /* determinism: wipe + redraw gives the same */
   rivals.forEach(v=>delete v.dis);delete S.emp.dis;disInit();return{r,same:a===JSON.stringify(rivals.map(v=>v.dis))&&e===JSON.stringify(S.emp.dis),a,e}});
  ok(d.r.length>=2,"people",out);ok(d.r.every(x=>x.len>=1&&x.len<=2),"1-2 dislikes each "+JSON.stringify(d.r.map(x=>x.len)),out);ok(d.r.every(x=>!x.ov.length),"no overlap with likes",out);ok(d.r.every(x=>x.known===0),"unknown at start",out);ok(d.same,"deterministic per life",out);
  /* 2. old save: strip data, serialize, deserialize */
  const o=await p.evaluate(()=>{const raw=JSON.parse(JSON.stringify(ser()));raw.R.forEach(v=>delete v.dis);delete raw.S.emp.dis;delete raw.S.disK;deser(raw);
   return{emp:Array.isArray(S.emp.dis)&&S.emp.dis.length>0,riv:rivals.every(v=>Array.isArray(v.dis)&&v.dis.length>0),k:!!S.disK}});
  ok(o.emp&&o.riv&&o.k,"old save loads + gets dislikes "+JSON.stringify(o),out);
  /* 3. learning */
  const l=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&!x.queen)||rivals[0];const res={};
   res.hiddenBefore=disRow(v)[1]==="chưa rõ"&&/chưa rõ/.test(disRow("emp")[1]);
   const t=disOf(v)[0];res.spy=false;for(let i=0;i<40&&disKnown(v).length<1;i++){try{intelLearn(v,3,{by:"Tai mắt của ngươi",how:"dò la"})}catch(e){}}res.spy=disKnown(v).length>=1;
   res.row=disRow(v);res.intel=intelOf(v).some(x=>/không ưa/.test(x.fact));
   const w=rivals.find(x=>x!==v&&x.alive&&!x.out);S.chat[w.id]=1;for(let i=0;i<80&&!disKnown(w).length;i++)chatMark(w);res.talk=disKnown(w).length>=1;
   let n=0;while(disUnk("emp")&&n++<60)discover();res.emp=disKnown("emp").length===disOf("emp").length;res.empRow=disRow("emp");
   res.empOpt=talkOpts?true:false;return res});
  ok(l.hiddenBefore,"unknown hidden",out);ok(l.spy&&l.intel,"spy reveals + intel line "+JSON.stringify(l.row),out);ok(l.talk,"talk reveals",out);ok(l.emp,"Hỏi sở thích reveals emperor dislikes",out);
  /* 4. wrong gift */
  const g=await p.evaluate(()=>{const res={};const cand=rivals.filter(x=>x.alive&&!x.out&&!x.queen);let v=cand[0],k=null;
   /* a proud (Kiêu ngạo) consort takes no handmade work at all (game rule) -> pick one who takes the work, or an item-kind dislike */
   for(const c of cand){const kk=disOf(c).find(x=>x.startsWith("kd:")||(x.startsWith("art:")&&wkEval(S,{kind:"tranh",a:x.slice(4),n:"t",s:"Mai",q:5,ti:1,raw:5,lv:1,m:0,by:"me",bn:"ngươi",d:"x",p:null,from:"me"},c).ok));if(kk){v=c;k=kk;break}}
   res.key=k;
   S.disK[String(v.id)]=[];S.inv=[];
   const mk=()=>k.startsWith("kd:")?(()=>{const it=Object.keys(IT).find(i=>IT[i].kd===k.slice(3)&&IT[i].tg&&!IT[i].tg.includes("rv")&&!IT[i].il&&!IT[i].mat&&IT[i].pr>0);return it?{k:it}:null})():{k:"tp",wk:{kind:"tranh",a:k.slice(4),n:"Bức tranh thử",s:"Mai",q:5,ti:1,raw:5,lv:1,m:0,by:"me",bn:"ngươi",d:"x",p:null,from:"me"}};
   const e=mk();res.item=!!e;if(!e)return res;
   let ref=0,pen=0,before;const A0=v.rel;
   for(let i=0;i<60;i++){S.inv.push(Object.assign({},e,e.wk?{wk:Object.assign({},e.wk)}:{}));v.rel=0;const ix=S.inv.length-1;const out=giveTo(S,v,ix);
    if(/không nhận/.test(out)){ref++;if(S.inv.length!==1)res.badRefuse=true;S.inv.length=0}else{if(/không ưa/.test(out))pen++;S.inv.length=0}
    S.disK[String(v.id)]=[]}
   res.ref=ref;res.pen=pen;
   /* known dislike shows in dialog text */
   S.disK[String(v.id)]=[k];S.inv.push(Object.assign({},e,e.wk?{wk:Object.assign({},e.wk)}:{}));const ev=giftEval(S.inv[S.inv.length-1],v);res.hint=/không ưa/.test(ev.x||"");S.inv.length=0;
   /* a liked item is never penalised */
   const likedIt=Object.keys(IT).find(i=>(IT[i].tg||[]).includes("rv")&&!IT[i].il&&!IT[i].t);S.disK[String(v.id)]=[];v.dis=["kd:"+IT[likedIt].kd];S.inv.push({k:likedIt});const o2=giveTo(S,v,0);res.liked=!/không ưa|không nhận/.test(o2);
   /* emperor */
   const E=S.emp;E.dis=["kd:Trang sức"];S.disK.emp=[];const tk=Object.keys(IT).find(i=>IT[i].kd==="Trang sức"&&IT[i].tg&&!IT[i].tg.includes("emp")&&!IT[i].il&&!IT[i].t);
   if(tk){let s0=S.sung,en=0;for(let i=0;i<40;i++){S.inv=[{k:tk}];S.sung=50;const o3=giveTo(S,"emp",0);if(/không nhận/.test(o3)){en++}}res.empRef=en}
   return res});
  ok(g.item,"gift item for test",out);ok(g.ref>0&&g.pen>0,"wrong gift: refused "+g.ref+" / penalised "+g.pen+" of 60",out);ok(!g.badRefuse,"refused gift stays in chest",out);ok(g.hint,"known dislike shown in gift dialog",out);ok(g.liked,"liked item never penalised",out);ok(g.empRef===undefined||g.empRef>0,"emperor refuses sometimes "+g.empRef,out);
  /* 5. person card shows the row; screenshots */
  const view=async(nm,tabn,pg)=>{await p.evaluate(([t,k,i])=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};PG[k]=i;render();try{k3Shell()}catch(e){}},[tabn,tabn,pg]);await sleep(2500);
   await p.evaluate(()=>{const t=[...document.querySelectorAll('.pctabs .pct')].find(t=>/Lòng người/.test(t.textContent));if(t)t.click()});await sleep(900);
   const m=await p.evaluate(()=>{const pc=[...document.querySelectorAll('.pc')].filter(e=>e.offsetParent).pop();const t=pc?pc.innerText:"";const rows=[...(pc?pc.querySelectorAll('.pcf .kpst'):[])].map(h=>h.textContent);
    return{card:!!pc,ghet:/(nàng|ngài)( ta)? ghét/i.test(t),rows,hscroll:document.documentElement.scrollWidth>innerWidth+1,over:pc?[...pc.querySelectorAll('.pcf *')].some(e=>e.getBoundingClientRect().right>innerWidth+1):false}});
   await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60});return m};
  const s1=await view("rv1","rv",1),s2=await view("court0","court",0);
  /* make rival 1 and emperor have a known dislike for the view */
  ok(s1.card&&s1.ghet,"consort card shows 'Nàng ghét' "+JSON.stringify(s1),out);ok(s2.card&&s2.ghet,"Emperor card shows 'Ngài ghét' "+JSON.stringify(s2),out);
  ok(!s1.hscroll&&!s2.hscroll&&!s1.over&&!s2.over,"no overflow",out);ok(!errs.length,"no page errors "+errs.join("|"),out);
  R[wh]={out,errs,l:l.row,g:{ref:g.ref,pen:g.pen,empRef:g.empRef}};await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(fail?"FAILS: "+fail:"ALL PASS");await b.close()})();
