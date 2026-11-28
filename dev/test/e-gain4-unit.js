/* E-GAIN4 UNIT (laws 3 / 4 / 7 / 11): fixed SELF cases, one block per item, on the real page code (no rolls).
   (a) WRONG TAB: kitActCat of «Đổi người chạy việc» and every «Đổi người …» guard choice ≠ Trừng phạt / Buôn bán; «Hỏi người hầu: đó là ai?» ≠ Hầu hạ;
       «Cài người vào cung khác» / «Chưởng sự tra xét cung nữ» ≠ Đi lại; the «Ban thưởng» door (P13r) → Ban thưởng; a child pop-up's «Chăm sóc» → tab Chăm con.
   (b) LOCKED TIER: a tier row with no way that can run reads its lock reason (ONE.tierW / ONE.lockW, the reader both summaries use), never «—», no «%».
   (c) BẠI CARRIES NO GAIN: a consort's dress verdict that is HER gain («nàng ta chuộng giản dị: quý ta +N», «bớt ghen») goes to Được (x), never to risk (Bại).
   (d) ĐƯỢC ON EVERY RESULT: «Nhờ giúp đỡ» names Được + Mất from BAL (Bạc + BAL.ag.cx2.help.bac, Danh − BAL.rcv.help.danh); every one-tap pop-up door whose
       picked way has a gain shows that gain (doorGain of the button line non-empty, never only its price) — every rival / hh at every place, 3 draws.
   E-GAIN4B adds (review/e-gain4 FIX LIST): (b2) the PRINTED tier summaries in real locked states, (f) the willingness word never in Được / Thành,
       (g) the dress-verdict gain in Được / Thành on every card kind (plain / door / tier / one-tap), (d2) the «Dò la» one-tap pin — each proven by a SOURCE
       mutant (dev/build reverted + rebuilt; see dev/handover/reports/e-gain4.md, E-GAIN4B section).
   usage: node dev/test/e-gain4-unit.js <url> [WxH@dpr] → exit 1 on any failed case.  Env mutants (each must exit 1): MUTANT=a|b|d; (c) / (g) / (d2) / (b2) / (f) by SOURCE mutant (E-GAIN4C: c = jtoil kem → risk, the pre-ACT-MOVE-6 line). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);const MU=process.env.MUTANT||'';
 const R=await p.evaluate(async(MU)=>{const F=[],OK=[];const T=h=>String(h==null?"":h).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const chk=(c,m)=>(c?OK:F).push(m);
  if(MU==='a')KIT_ACT_CATS.unshift(["trung-phat",/đổi người/i],["di-lai",/vào |ra /i],["hau-ha",/người hầu/i]);
  if(MU==='b'&&window.ONE)ONE.lockW=()=>"—";
  if(MU==='d'){if(typeof rcvHelpX==="function")window.rcvHelpX=()=>({x:"nàng có thể giúp hết lòng, làm qua loa, từ chối, hoặc đem chuyện đi mách",risk:""})}
  /* (a) */
  const CN=c=>(KIT_CAT[c]||[c])[0];
  for(const n of ["Đổi người chạy việc","Đổi người nếm món","Đổi người nấu, giăng bẫy","Đổi người đưa thư"]){const c=kitActCat(n);chk(c!=="trung-phat"&&c!=="buon-ban",`a: «${n}» tab ${CN(c)}`)}
  {const c=kitActCat("Hỏi người hầu: đó là ai?");chk(c!=="hau-ha",`a: «Hỏi người hầu: đó là ai?» tab ${CN(c)}`)}
  for(const n of ["Cài người vào cung khác","Chưởng sự tra xét cung nữ"]){const c=kitActCat(n);chk(c!=="di-lai",`a: «${n}» tab ${CN(c)}`)}
  {const r=DOOR.byK("P13r");chk(r&&r.cat==="ban-thuong",`a: door Ban thưởng cat ${r&&r.cat}`)}
  await new Promise(r=>setTimeout(r,0));
  /* (b) */
  {const r={k:"hs-nghi",n:"Nghỉ ngơi"};const L=[{id:"d:a",n:"Nghỉ ngơi một lát",x:"",off:false},{id:"d:b",n:"Nghỉ ngơi dưỡng sức",x:"",off:true,why:"Chỉ buổi tối — chờ đến tối"}];
   let Rw=[];try{Rw=ONE.tierRows(r,L,"me")}catch(e){}const v=Rw.find(x=>x.t==="vừa");const w=v&&typeof ONE.tierW==="function"?ONE.tierW(v,m=>T(m.n)):"—";
   chk(v&&w&&w!=="—"&&!/%/.test(w)&&/buổi tối/.test(w),`b: locked tier «vừa» reads «${w}»`);
   const w2=typeof ONE.lockW==="function"?ONE.lockW(""):"—";chk(w2&&w2!=="—",`b: lock reason without text reads «${w2}»`)}
  /* (c) */
  {const tr0=window.toilRival,to0=window.toilOn;let Lr=[];try{window.toilOn=()=>true;window.toilRival=(v,d)=>d?null:{txt:"nàng ta chuộng giản dị: quý ta +"+BAL.toil.praisePlain,aff:BAL.toil.praisePlain,g:0};
    /* a world with a consort met at some place (AA.scen worlds are drawn: try states in turn) */
    const has=()=>AA.surfaces().filter(s=>s.place).some(sf=>{AA.restore();AA.show(sf);return curPeople().some(x=>x.kind==="rival"&&x.ref&&talkOpts(x).some(a=>a&&a.one==="one"&&!a.lock))});/* (d) needs a one-tap door too */
    for(const n of ["cao","hh","toi","dau","con","hau","cao","hh"]){AA.scen(n);if(has())break}
    AA.restore();for(const sf of AA.surfaces().filter(s=>s.place)){AA.restore();AA.show(sf);const P=curPeople();const i=P.findIndex(x=>x.kind==="rival"&&x.ref);if(i<0)continue;
     Lr=talkOpts(P[i]).filter(Boolean);break}}finally{window.toilRival=tr0;window.toilOn=to0}
   chk(Lr.length>0,`c: a rival pop-up found (${Lr.length} options)`);
   const bad=Lr.filter(a=>/quý ta \+/.test(T(a.risk)));chk(!bad.length,`c: options with the praise on the Bại side ${bad.length} (${bad.slice(0,3).map(a=>T(a.n)).join(", ")})`);
   /* E-GAIN4C: the kept design = LIVE ACT-MOVE-6 — jtoil writes the verdict on «kem» (it comes either way), j25 optLine appends «kèm: …», the kit puts a green piece in Được.
      Read the PRINTED card (optLine → kit rows), not the raw x. */
   const PR=a=>{const d=document.createElement("div");try{d.innerHTML=optLine(a)}catch(e){}const G=q=>[...d.querySelectorAll(q)].map(e=>T(e.textContent)).join(" | ");return{du:G(".kr-thanh .ef, .kr-duoc .ef"),bad:G(".kr-bai .ef, .kr-mat .ef, .kr-note .ef")}};
   const good=Lr.filter(a=>/quý ta \+/.test(PR(a).du));chk(good.length>0,`c: options with the praise on the Được side ${good.length}`);
   const lossP=Lr.filter(a=>/quý ta \+/.test(PR(a).bad));chk(!lossP.length,`c: options with the praise printed in Bại / Mất / Ghi chú ${lossP.length} (${lossP.slice(0,3).map(a=>T(a.n)).join(", ")})`);
   const dup=Lr.filter(a=>(PR(a).du.match(/chuộng giản dị: quý ta \+/g)||[]).length>1);chk(!dup.length,`c: options with the praise twice ${dup.length} (${dup.slice(0,3).map(a=>T(a.n)).join(", ")})`);
   /* E-GAIN4C: a LOSS verdict («nàng ta ghen +N») is printed in Kèm — never in Được / Thành, never in Bại (it comes either way) */
   {let Lg=[];try{window.toilOn=()=>true;window.toilRival=(v,d)=>d?null:{txt:"dung nhan ta tuyệt sắc: nàng ta ghen +"+BAL.toil.ghenTuyet,aff:0,g:BAL.toil.ghenTuyet};AA.restore();
     for(const sf of AA.surfaces().filter(s=>s.place)){AA.restore();AA.show(sf);const P=curPeople();const i=P.findIndex(x=>x.kind==="rival"&&x.ref);if(i<0)continue;Lg=talkOpts(P[i]).filter(Boolean);break}}finally{window.toilRival=tr0;window.toilOn=to0}
    const rowG=a=>{const d=document.createElement("div");try{d.innerHTML=optLine(a)}catch(e){}const G=q=>[...d.querySelectorAll(q)].map(e=>T(e.textContent)).join(" | ");return{kem:G(".kr-kem .ef"),wrong:G(".kr-thanh .ef, .kr-duoc .ef, .kr-bai .ef, .kr-mat .ef")}};
    const inK=Lg.filter(a=>/nàng ta ghen \+/.test(rowG(a).kem)),wr=Lg.filter(a=>/nàng ta ghen \+/.test(rowG(a).wrong));
    chk(Lg.length>0&&inK.length>0&&!wr.length,`c: jealousy verdict in Kèm on ${inK.length} of ${Lg.length} options, in Được / Bại on ${wr.length} (${wr.slice(0,3).map(a=>T(a.n)).join(", ")})`)}}
  /* (d) */
  {let n=0,bad=[],help=null;/* same world as (c): a second AA.scen builds another world */for(const dt of [0,1,2])for(const sf of AA.surfaces().filter(s=>s.place)){AA.restore();S.turn=(S.turn||0)+dt;AA.show(sf);const P=curPeople();
    P.forEach((pp,i)=>{if(pp.kind!=="rival"&&pp.kind!=="hh")return;let A=[];try{A=talkOpts(pp)}catch(e){return}
     for(const a of A){if(!a)continue;if(a.n==="Nhờ giúp đỡ"&&!help)help=Object.assign({},a,{who:pp.kind+":"+pp.name+"@"+sf.id+" d"+dt});if(a.one!=="one"||a.lock)continue;n++;
      let full="";try{full=optLine(a)}catch(e){}const fl=T(full);
      /* E-GAIN4C: the PRINTED card (optLine → kit rows) must name a gain in Thành / Được, never only a price («Bạc −») — LIVE ACT-MOVE-6 copies k / tgt so an act member
         prints its AOUT result line (the raw x may be only the price; what she sees is the kit card) */
      const dv=document.createElement("div");dv.innerHTML=full;const th=[...dv.querySelectorAll(".kr-thanh .ef, .kr-duoc .ef")].map(e=>T(e.textContent)).filter(Boolean);
      if(!th.length||th.every(t=>/^([^:]*: ?)?Bạc [-−]/.test(t)))bad.push(`${T(a.n)} @${sf.id} d${dt}: «${fl.slice(0,110)}»`)}})}
   chk(n>0,`d: one-tap doors read ${n}`);chk(!bad.length,`d: one-tap doors without a gain ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,4).join(" | "):""}`);
   const X=BAL.ag.cx2.help,R2=BAL.rcv.help;let ln="";try{const d=document.createElement("div");d.innerHTML=optLine(help);const g=k=>[...d.querySelectorAll(".kr-"+k+" .ef")].map(e=>T(e.textContent)).join(", ");ln={th:g("thanh")+g("duoc"),bai:g("bai")+g("mat")}}catch(e){}
   /* the kit card of the option (optLine → kit rows; magnitudes show as marks «Bạc ++»): Thành / Được names the bạc + chứng cứ she gets (the numbers are BAL.ag.cx2.help.bac / BAL.ag.ev.one in jrcv rcvHelpX), Bại / Mất the Danh she loses when told on */
   chk(help&&ln&&/Bạc \+/.test(ln.th)&&/chứng cứ \+/.test(ln.th)&&!/Danh/.test(ln.th)&&/Danh [-−]/.test(ln.bai)&&!/Bạc \+/.test(ln.bai),`d: «Nhờ giúp đỡ» card Thành «${ln&&ln.th.slice(0,120)}» Bại «${ln&&ln.bai.slice(0,90)}» (x «${help?T(help.x).slice(0,140):""}» risk «${help?T(help.risk):""}» who ${help&&help.who})`)}
  /* ---- E-GAIN4B (review/e-gain4 FIX LIST: each case below FAILs on the source mutant of its fix — dev/build reverted, rebuilt; no env mutant) ---- */
  const sl=ms=>new Promise(r=>setTimeout(r,ms));const DASH=/(?:^|·\s*)(nhẹ|vừa|nặng):?\s*(—|-)\s*(·|$)/;
  /* (b2) fix item 1 — the PRINTED tier summaries in REAL locked states: every Hành sự deck tier card (its .klead / p line, jone deckPaint) and every pop-up
     tier door (its d.x, jone doorFold, and the pop-up button's printed text), states dau / cao / toi × khắc spent 0 / 3: a tier with no way that can run
     says why — never «—». Counted only where ONE.tierRows says a tier is locked; ≥ 1 locked deck tier and ≥ 1 locked pop-up tier must be read. */
  {let nD=0,nP=0;const bad=[];
   /* the world is drawn: a pop-up tier is not always locked by itself, so the second pass empties her purse (a bạc way locks «không đủ bạc») */
   for(const sc of ["dau","cao","toi","hh"])for(const z of [0,1]){if(nD&&nP&&z)continue;AA.scen(sc);const Z=()=>{if(z)S.bac=0};
    for(const u of [0,3]){AA.restore();Z();used=u;tab="act";AA.hide();render();await sl(120);
     for(const b of document.querySelectorAll("#panel button[data-ddoor]")){let lk=0;try{const r=ONE.deckRow(b);if(r&&ONE.mode(r.k)==="tier")lk=ONE.tierRows(Object.assign({},r,{n:b.dataset.ddoor}),ONE.deckM(b),"me").filter(x=>x.off||!x.m).length}catch(e){}
      if(!lk)continue;nD++;const t=T((b.querySelector(".klead")||b.querySelector("p")||{}).textContent);if(!t||DASH.test(t))bad.push(`deck ${sc} k${u} «${b.dataset.ddoor}»: «${t}»`)}
     for(const sf of AA.surfaces().filter(x=>x.place)){AA.restore();Z();used=u;AA.show(sf);const P=curPeople();
      for(let i=0;i<P.length;i++){const pp=P[i];let A=[];try{A=talkOpts(pp)}catch(e){}for(const a of A){if(!a||a.one!=="tier")continue;let lk=0;try{const r=DOOR.byK(a.door);const {L}=ONE.members(doorPP(pp,i,r.k),r);lk=ONE.tierRows(r,L,"x").filter(x=>x.off).length}catch(e){}
        if(!lk)continue;nP++;const t=T(a.x);if(DASH.test(t))bad.push(`pop ${sc} k${u} ${sf.id} ${pp.kind} «${T(a.n)}» d.x «${t.slice(0,90)}»`)}
       if(nP&&nP<40&&A.some(a=>a&&a.one==="tier")){AA.show(Object.assign({},sf,{pop:i}));await sl(10);for(const b of document.querySelectorAll("#popw button")){const t=T(b.textContent);if(DASH.test(t))bad.push(`pop-btn ${sc} k${u} ${sf.id} «${t.slice(0,90)}»`)}AA.show(sf)}}}}}
   chk(nD>0&&nP>0,`b2: locked tiers read in printed summaries — deck ${nD}, pop-up ${nP}`);chk(!bad.length,`b2: printed tier summaries with «—» ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,4).join(" | "):""}`)}
  /* (f) fix item 2 — the receiver's willingness word (rcvWord, BAL.road.hp.word) is never a piece of Được / Thành; it shows as the Ghi chú note.
     «Nhờ giúp đỡ» (j9) of every consort at every place, and «Lập phe cùng» / «Mời» (j10 faction panel), read as the kit draws them. */
  {const WD=Object.values(BAL.road.hp.word);const isW=t=>WD.some(w=>new RegExp('(^|[,·:] ?)'+w+'($|[,·)])').test(t));const rowsOf=h=>{const d=document.createElement("div");d.innerHTML=h;const g=k=>[...d.querySelectorAll(".kr-"+k+" .ef")].map(e=>T(e.textContent));return{th:[...g("thanh"),...g("duoc")],note:[...g("note"),...[...d.querySelectorAll("[data-kfx]")].map(e=>e.dataset.kfx)]}};
   let nH=0,nN=0,nF=0;const bad=[];/* the world is drawn: try states in turn until both card kinds were read */
   for(const sc of ["hh","cao","toi","hau","con"]){if(nH&&nF)break;AA.scen(sc);
   for(const sf of AA.surfaces().filter(x=>x.place)){AA.restore();AA.show(sf);for(const pp of curPeople()){if(pp.kind!=="rival"&&pp.kind!=="hh")continue;let A=[];try{A=talkOpts(pp)}catch(e){}
     for(const a of A){if(!a||a.n!=="Nhờ giúp đỡ")continue;nH++;const R=rowsOf(optLine(a));const w=R.th.filter(isW);if(w.length)bad.push(`«Nhờ giúp đỡ» ${pp.name}@${sf.id} Thành «${w.join(", ")}»`);if(R.note.some(t=>WD.some(x=>t.includes(x))))nN++}}}
   AA.restore();/* a consort close enough to found a faction with (j10 facFrOk: she likes her ≥ netTh «than») so the «Lập phe cùng» card is drawn */{if(nH&&!nF)S.facs=[];/* a drawn world can leave every consort in a faction: none then (the panel draws «Lập phe cùng») */const v=liveRivals(true).find(x=>!facOf(x)&&!sameHouse(S,x));for(let k=0;v&&k<6&&!facFrOk(S,v);k++)affAdd(v,S,netTh(v,"than")+5-aff(v,S))}tab="fac";AA.hide();render();await sl(250);/* the kit rows of the panel buttons are drawn after render (kitFix / kaNorm) */
   for(const b of document.querySelectorAll('#panel button[data-fa="lap"], #panel button[data-fa="moi"]')){nF++;const R={th:[...b.querySelectorAll(".kr-thanh .ef, .kr-duoc .ef")].map(e=>T(e.textContent)),note:[...b.querySelectorAll(".kr-note .ef")].map(e=>T(e.textContent))};const w=R.th.filter(isW);
    if(w.length)bad.push(`«${T((b.querySelector(".kan")||b).textContent).slice(0,30)}» Được «${w.join(", ")}»`);if(!R.th.length)bad.push(`«${T((b.querySelector(".kan")||b).textContent).slice(0,30)}» no Được`);if(R.note.some(t=>WD.some(x=>t.includes(x))))nN++}}
   /* «Mượn son phấn» (jration lxBorrowCard): her asking card names the lender's word — built for a live consort, read as the kit draws it */
   let nB=0;try{for(const v of liveRivals(true).slice(0,3)){const c=lxBorrowCard(S,v);if(!c)continue;nB++;const R=rowsOf(optLine(c));const w=R.th.filter(isW);if(w.length)bad.push(`«Mượn son phấn» ${v.name} Thành «${w.join(", ")}»`);if(R.note.some(t=>WD.some(x=>t.includes(x))))nN++}}catch(e){bad.push("Mượn son phấn: "+e.message)}
   chk(nB>0,`f: «Mượn son phấn» cards read ${nB}`);
   chk(nH>0&&nF>0,`f: cards read — «Nhờ giúp đỡ» ${nH}, faction «Lập phe cùng / Mời» ${nF}; the word shown as Ghi chú on ${nN}`);chk(!bad.length&&nN>0,`f: willingness word in Được / Thành ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,4).join(" | "):""}`)}
  /* (g) fix item 3 — the dress-verdict GAIN on every pop-up card KIND that carries it: a plain talk card, a door card («chọn một trong N việc (…)» + its gains),
     a tier door, a one-tap door: in Thành / Được, never in Ghi chú (row or «!») nor Bại / Mất / Kèm. Verdict stubbed on (as in (c)), every consort, state hh. */
  {const tr0=window.toilRival,to0=window.toilOn;const K={plain:0,door:0,tier:0,one:0};const bad=[];
   try{window.toilOn=()=>true;window.toilRival=(v,d)=>d?null:{txt:"nàng ta chuộng giản dị: quý ta +"+BAL.toil.praisePlain,aff:BAL.toil.praisePlain,g:0};
    for(const sc of ["hh","cao","toi","hau","con"]){if(K.plain&&K.door&&K.tier&&K.one)break;AA.scen(sc);
    for(const sf of AA.surfaces().filter(x=>x.place)){AA.restore();AA.show(sf);const P=curPeople();for(let i=0;i<P.length;i++){const pp=P[i];if(pp.kind!=="rival"||!pp.ref)continue;let A=[];try{A=talkOpts(pp)}catch(e){}
      for(const a of A){if(!a)continue;const XK=o=>T(o.x)+" "+T(o.kem)+" "+T(o.kemG)/* E-GAIN4C: the verdict rides on the side fields «kemG» (gain) / «kem» (loss), LIVE ACT-MOVE-6 carrier */;let carry=/quý ta \+/.test(XK(a));if(!carry&&a.door)try{const r=DOOR.byK(a.door);const {L}=ONE.members(doorPP(pp,i,r.k),r);carry=L.some(m=>m&&m.a&&/quý ta \+/.test(XK(m.a)))}catch(e){}if(!carry)continue;
       const kd=a.one==="tier"?"tier":a.one==="one"?"one":a.door?"door":"plain";K[kd]++;const d=document.createElement("div");d.innerHTML=optLine(a);const G=s2=>[...d.querySelectorAll(s2)].map(e=>T(e.textContent)).join(" | ");
       const ok=/quý ta \+/.test(G(".kr-thanh .ef, .kr-duoc .ef")),wrong=/quý ta \+/.test(G(".kr-note .ef, .kr-bai .ef, .kr-mat .ef, .kr-kem .ef"))||[...d.querySelectorAll("[data-kfx]")].some(e=>/quý ta \+/.test(e.dataset.kfx||""));
       if(!ok||wrong)bad.push(`${kd} «${T(a.n)}» ${pp.name}@${sf.id}: Được «${G(".kr-thanh .ef, .kr-duoc .ef").slice(0,70)}» Ghi chú «${G(".kr-note .ef").slice(0,70)}»`)}}}}}finally{window.toilRival=tr0;window.toilOn=to0}
   chk(K.plain>0&&K.door>0&&K.tier>0&&K.one>0,`g: card kinds carrying the verdict read — plain ${K.plain}, door ${K.door}, tier ${K.tier}, one-tap ${K.one}`);chk(!bad.length,`g: verdict not in Được / Thành (or also in Ghi chú / a loss row) ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,4).join(" | "):""}`)}
  /* (d2) the reviewer's pin — a «Dò la» one-tap door on a consort (state cao, 3 draws): its printed Thành names its gain (chứng cứ +), never only its price (Bạc −) */
  {let n=0;const bad=[];for(const sc of ["cao","hh","toi"]){if(n)break;AA.scen(sc);for(const dt of [0,1,2])for(const sf of AA.surfaces().filter(x=>x.place)){AA.restore();S.turn=(S.turn||0)+dt;AA.show(sf);for(const pp of curPeople()){if(pp.kind!=="rival"&&pp.kind!=="hh")continue;let A=[];try{A=talkOpts(pp)}catch(e){}
    for(const a of A){if(!a||a.one!=="one"||a.lock||!/^Dò la/.test(T(a.n)))continue;n++;const d=document.createElement("div");d.innerHTML=optLine(a);const th=[...d.querySelectorAll(".kr-thanh .ef, .kr-duoc .ef")].map(e=>T(e.textContent)).join(", ");
     if(!/chứng cứ \+/.test(th)||/Bạc [-−]/.test(th))bad.push(`«${T(a.n)}» ${pp.name}@${sf.id} d${dt}: Thành «${th.slice(0,80)}»`)}}}}
   chk(n>0,`d2: «Dò la» one-tap doors read ${n}`);chk(!bad.length,`d2: «Dò la» one-tap Thành without its gain ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,3).join(" | "):""}`)}
  return{F,OK}},MU);
 for(const m of R.OK)console.log('  ok   '+m);for(const m of R.F)console.log('  FAIL '+m);
 console.log('E-GAIN4 unit: '+R.OK.length+' ok, '+R.F.length+' fail, page errors '+perr.length);perr.slice(0,3).forEach(e=>console.log('  PERR '+e));
 await b.close();process.exit(R.F.length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
