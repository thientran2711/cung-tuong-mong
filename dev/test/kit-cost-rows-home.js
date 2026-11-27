/* kit-cost-rows-home (review/kit-cost-rows-home; E25 «KR home-stat rows» + E22t «quý nhau») — node dev/test/kit-cost-rows-home.js [dev/index.html]
   The home-road stats (Gia thanh kgt, Áp lực hôn sự kap, Hồi môn khm, Lời đồn kld) and «quý nhau» in the act/option card rows (kaRows, plain + html path) and in the word mode
   (kitHint: hidden outcome, Tâm cơ levels 0–2): never dropped, never «không được mất gì», pressure / rumour read as «less is better», a dowry spent is a Tốn.
   Then the real home cards (kcInit + kcCards for every origin in KC.ok): every card whose own stat line names a home stat gets a non-empty hint that names it. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kcCards==='function'&&typeof start==='function'&&typeof kitHint==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}});await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{const o={};const rw=t=>{const R=kaRows(kaModelStr(t));return Object.fromEntries(["ton","duoc","mat","kem","note"].map(k=>[k,R[k].map(x=>kaPlain(x.h))]))};
  o.names=fmt({kld:7,kap:-3,khm:-40,kgt:2}).replace(/<[^>]+>/g,"");
  o.r1=rw("Khá chắc · tốn: Hồi môn -40 · thành: Gia thanh +2 · hỏng: Áp lực hôn sự +8");
  o.r2=rw("Chắc · thành: Áp lực hôn sự -8, Gia thanh +3 · hỏng: Gia thanh -2");
  o.r3=rw("Liều · thành: Lời đồn -4 · hỏng: Lời đồn +5");
  o.r4=rw("Khá chắc · tốn: 1 khắc · thành: quý nhau +3 · hỏng: quý nhau -2");
  const H=x=>{const a=[0,1,2].map(l=>kitHint({x},null,l).hint);return a};
  o.h={gt:H("Khá chắc · thành: Gia thanh +2 · hỏng: Gia thanh -3"),kap:H("Khá chắc · thành: Áp lực hôn sự -8 · hỏng: Áp lực hôn sự +8"),khm:H("Khá chắc · tốn: Bạc -5 · thành: Hồi môn +30 · hỏng: Hồi môn -20"),kld:H("Khá chắc · thành: Lời đồn -4 · hỏng: Lời đồn +5"),
   qn:H("được: ngươi giữ lễ · mất: hai bên quý nhau -5"),qn2:H("Khá chắc · thành: quý nhau +3")};
  o.sg={kap:[kitHintSign("Áp lực hôn sự +8","thành"),kitHintSign("Áp lực hôn sự -8","thành")],kld:[kitHintSign("Lời đồn +5","thành"),kitHintSign("Lời đồn -4","hỏng")],qn:[kitHintSign("quý nhau -2","hỏng"),kitHintSign("quý nhau +3","thành")]};
  const cards=[];const seen=new Set();for(const k of KC.ok){try{S.origin={k};S.kc=null;kcInit();for(const c of kcCards()){const L=[];for(const part of ["c","w","l"])for(const x in (c[part]||{}))if(/^k(gt|ap|hm|ld)$/.test(x)&&c[part][x])L.push(part+":"+x);if(!L.length)continue;const id=(c.n||"")+"|"+L.join();if(seen.has(id))continue;seen.add(id);
    const wcard=Object.assign({},c,{c:Object.assign({},c.c),w:Object.assign({},c.w),l:Object.assign({},c.l)});/* plain line from the parts, like optLine, so the check does not depend on the kit html override */
    const txt=["Khá chắc",c.c&&fmt(c.c)?"tốn: "+fmt(c.c):"",fmt(c.w||{})?"thành: "+fmt(c.w):"",fmt(c.l||{})?"hỏng: "+fmt(c.l):""].filter(Boolean).join(" · ");
    const h=kitHint({x:txt},null,1).hint;cards.push({o:k,n:(c.n||"").slice(0,30),parts:L.join(","),txt:kaPlain(txt).slice(0,120),h})}}catch(e){cards.push({o:k,err:e.message})}}
  o.cards=cards;return o});
 ok(/Lời đồn/.test(r.names)&&/Hồi môn/.test(r.names)&&/Gia thanh/.test(r.names)&&/Áp lực hôn sự/.test(r.names),'fmt names all four home stats (kld added)',r.names);
 ok(r.r1.ton.join()==="Hồi môn -40"&&r.r1.duoc.join()==="Gia thanh +2"&&r.r1.mat.join()==="Áp lực hôn sự +8",'rows: dowry in Tốn, Gia thanh in Được, pressure +8 a loss',r.r1);
 ok(r.r2.duoc.join()==="Áp lực hôn sự -8,Gia thanh +3"&&r.r2.mat.join()==="Gia thanh -2",'rows: Gia thanh ±, pressure -8 a gain',r.r2);
 ok(r.r3.mat.join()==="Lời đồn +5"&&r.r3.duoc.join()==="Lời đồn -4",'rows: rumour — less is better',r.r3);
 ok(r.r4.duoc.join()==="quý nhau +3"&&r.r4.mat.join()==="quý nhau -2",'rows: quý nhau gain / loss',r.r4);
 ok(r.sg.kap.join()==="-1,1"&&r.sg.kld.join()==="-1,1"&&r.sg.qn.join()==="-1,1",'hint signs: pressure / rumour inverse, quý nhau normal',r.sg);
 for(const [k,re] of [["gt",/Gia thanh [+−]/],["kap",/Áp lực hôn sự [+−]/],["khm",/Hồi môn [+−]/],["kld",/Lời đồn [+−]/],["qn",/thiện cảm hai bên [+−]/],["qn2",/thiện cảm hai bên [+−]/]]/* WORDING-GAIN (OD 26/11 ~18:50Z (7)): the hint names the stat + marks, no vague word */){
  ok(r.h[k].every(t=>t&&!/^không được mất gì$/.test(t))&&r.h[k].some(t=>re.test(t)),`word mode ${k}: stat named, not «không được mất gì»`,r.h[k])}
 const named=r.cards.filter(c=>!c.err);const bad=named.filter(c=>!c.h||/^không được mất gì$/.test(c.h)||/^chẳng được gì$/.test(c.h));
 ok(named.length>=8,`real home cards with a home stat: ${named.length} (all origins)`);ok(bad.length===0,'every such card: word-mode hint is not empty / «không được mất gì»',bad.slice(0,4).map(c=>c.n+' | '+c.txt+' → '+c.h));
 ok(errs.length===0,'no page errors',errs.slice(0,2));await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
