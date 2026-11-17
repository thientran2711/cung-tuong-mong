/* review/npc-mind: (1) an OLD save made by the main build loads in the new build and every person gets all five (nết, trọng, sở trường,
   sở thích, sở ghét); (2) gifts: liked / disliked to a servant, Thái hậu; NPC gift to her moves her mood; (3) person cards (consort, Emperor,
   Thái hậu, her own, close maid, Thái y, child) at the test viewports: no page error, no horizontal overflow, "Sở trường" row/chip present.
   usage: node dev/test/npcmind-check.js <old build index.html> <new build index.html> [shot dir] */
const {chromium}=require('playwright');const [,,OLDB,NEWB,SHOT]=process.argv;
const VPS=[[755,1000],[1180,820],[1000,755],[1366,1024],[844,390],[412,1058]];
(async()=>{const b=await chromium.launch();const errs=[];
 let p=await b.newPage();p.on('pageerror',e=>errs.push('old:'+e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+OLDB,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(1500);
 const old=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;S.kids=S.kids||[];save();return JSON.stringify(ser())});await p.close();
 p=await b.newPage();p.on('pageerror',e=>errs.push('new:'+e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+NEWB,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof loadSlot==='function');await p.waitForTimeout(1500);
 const r=await p.evaluate(d=>{localStorage.setItem(SK(2),d);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;
  const L=[["me",S],["th","th"],["emp",S.emp]].concat(rivals.map(v=>[v.queen?"hh":"rv",v]),allServ().map(s=>[s.role,s]),[["maid",S.maid]],Object.keys(S.court||{}).map(k=>["court:"+k,S.court[k]]),(S.men||[]).map(m=>["man",m]),allKids().map(([k])=>["kid",k]));
  const miss=[];let n=0;for(const [c,q] of L){if(!q)continue;n++;const m=mindOf(q);const g=[];if(!m.net.length)g.push("net");if(m.trong.length!==2)g.push("trong");if(!m.str)g.push("str");if(!m.like.length)g.push("like");if(!m.dis.length)g.push("dis");
   if(m.like.some(k=>m.dis.includes(k)))g.push("like=dis");if(g.length)miss.push(c+":"+(q.name||q)+":"+g.join(","))}
  /* stable across reload */
  const before=JSON.stringify(L.filter(z=>z[1]).map(([c,q])=>mindOf(q)));const s2=JSON.stringify(ser());deser(JSON.parse(s2));
  const L2=[["me",S],["th","th"],["emp",S.emp]].concat(rivals.map(v=>[v.queen?"hh":"rv",v]),allServ().map(s=>[s.role,s]),[["maid",S.maid]],Object.keys(S.court||{}).map(k=>["court:"+k,S.court[k]]),(S.men||[]).map(m=>["man",m]),allKids().map(([k])=>["kid",k]));
  const after=JSON.stringify(L2.filter(z=>z[1]).map(([c,q])=>mindOf(q)));
  /* gifts */
  const g={};S.thO.dis=["kd:Hương liệu"];S.thO.mlike="art:cam";S.mlike="kd:Trang sức";S.dis=["kd:Vải vóc"];/* her close maid only takes handmade works (jgift), tested through the card rows */const thd=mindDis("th").find(k=>k.startsWith("kd:"));const it2=thd&&Object.keys(IT).find(k=>IT[k].kd&&("kd:"+IT[k].kd)===thd&&!(IT[k].tg||[]).includes("th"));
  if(it2){S.inv.push({k:it2});const t0=S.th;const out=giveTo(S,"th",S.inv.length-1);g.thDis={key:thd,dTh:S.th-t0,out:String(out).replace(/<[^>]*>/g,"").slice(0,160)}}
  const md=mindLike(S)[0],it3=Object.keys(IT).find(k=>IT[k].kd&&("kd:"+IT[k].kd)===md);const v=liveRivals(true)[1];
  if(it3&&v){v.inv.push({k:it3});giveTo(v,S,v.inv.length-1);g.herMood={key:md,emo:(emoGet(S)||{}).k}}else g.herMood="her like is "+md;
  return {people:n,miss,stable:before===after,g,sample:{me:mindOf(S),th:mindOf("th"),maid:mindOf(S.maid)}}},old);
 console.log(JSON.stringify(r,null,1));
 const ov=[];
 for(const [w,h] of VPS){await p.setViewportSize({width:w,height:h});
  for(const who of ["rv","emp","th","self","maid","ty","kid"]){const res=await p.evaluate(who=>{closeModal&&closeModal();Q.length=0;const v=liveRivals(true)[1];S.thO=S.thO||{};
    try{k61Know([S.thO,v,S.maid],"t",true,3)}catch(e){}for(const q of [S.court.ty,(allKids()[0]||[])[0]])try{k61Know([q],"t",true,3)}catch(e){}S.thO.archK=1;
    if(who==="kid"&&!allKids().length)return {skip:1};
    if(who==="self")showSelf();else{const kd=allKids()[0];const P=who==="th"?{kind:"th",name:"Thái hậu",col:"#c9a227"}:who==="emp"?{kind:"emp",name:"Hoàng thượng"}:who==="maid"?{kind:"maid",name:S.maid.name,info:"Cung nữ thân cận"}:
      who==="ty"?{kind:"ty",name:S.court.ty.name,info:"Thái y"}:who==="kid"?{kind:"kid",ref:kd[0],name:kd[0].name,info:"Con"}:{kind:"rival",ref:v,name:v.name};Q.unshift({t:P.name,cls:"pcm",h:popCard(P,0)});showModal()}
    return new Promise(r=>setTimeout(()=>{const m=document.getElementById('modal');const txt=m.textContent;const stranger=/Người lạ/.test(m.innerText);
     r({dbg:who==='ty'||who==='kid'?String(kitIsKnown(who==='ty'?S.court.ty:allKids()[0][0]))+'/'+String(!!mindWho({name:who==='ty'?S.court.ty.name:allKids()[0][0].name}))+'/'+(who==='ty'?S.court.ty.name:''):'',stranger,ov:document.documentElement.scrollWidth>innerWidth+1||m.scrollWidth>m.clientWidth+1,str:/Sở trường/.test(txt),like:/Thích|thích/.test(txt),dis:/[Gg]hét/.test(txt),cut:[...m.querySelectorAll('.kst-chip,.krow')].some(c=>c.scrollWidth>c.clientWidth+2)})},450))},who);
   ov.push([w+"x"+h,who,res.skip?"skip":(res.stranger?"(stranger) ":"")+(res.ov?"OVERFLOW":"ok")+(res.cut?" CUT":""),res.str?"str":"NO-STR",res.like?"like":"no-like",res.dis?"dis":"no-dis",res.dbg||""]);
   if(SHOT&&(w===755||w===1180)&&["rv","self","maid"].includes(who))await p.screenshot({path:`${SHOT}/mind-${who}-${w}.png`})}}
 console.log(ov.map(x=>x.join("  ")).join("\n"));console.log("ERRS",JSON.stringify(errs));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
