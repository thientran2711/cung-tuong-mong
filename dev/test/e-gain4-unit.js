/* E-GAIN4 UNIT (laws 3 / 4 / 7 / 11): fixed SELF cases, one block per item, on the real page code (no rolls).
   (a) WRONG TAB: kitActCat of «Đổi người chạy việc» and every «Đổi người …» guard choice ≠ Trừng phạt / Buôn bán; «Hỏi người hầu: đó là ai?» ≠ Hầu hạ;
       «Cài người vào cung khác» / «Chưởng sự tra xét cung nữ» ≠ Đi lại; the «Ban thưởng» door (P13r) → Ban thưởng; a child pop-up's «Chăm sóc» → tab Chăm con.
   (b) LOCKED TIER: a tier row with no way that can run reads its lock reason (ONE.tierW / ONE.lockW, the reader both summaries use), never «—», no «%».
   (c) BẠI CARRIES NO GAIN: a consort's dress verdict that is HER gain («nàng ta chuộng giản dị: quý ta +N», «bớt ghen») goes to Được (x), never to risk (Bại).
   (d) ĐƯỢC ON EVERY RESULT: «Nhờ giúp đỡ» names Được + Mất from BAL (Bạc + BAL.ag.cx2.help.bac, Danh − BAL.rcv.help.danh); every one-tap pop-up door whose
       picked way has a gain shows that gain (doorGain of the button line non-empty, never only its price) — every rival / hh at every place, 3 draws.
   usage: node dev/test/e-gain4-unit.js <url> [WxH@dpr] → exit 1 on any failed case.  Mutants (each must exit 1): MUTANT=a|b|c|d. */
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
  if(MU==='c'&&window.TOILV)TOILV.split=0;
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
    const has=()=>AA.surfaces().filter(s=>s.place).some(sf=>{AA.restore();AA.show(sf);return curPeople().some(x=>x.kind==="rival"&&x.ref)});
    for(const n of ["cao","hh","toi","dau","con","hau","cao","hh"]){AA.scen(n);if(has())break}
    AA.restore();for(const sf of AA.surfaces().filter(s=>s.place)){AA.restore();AA.show(sf);const P=curPeople();const i=P.findIndex(x=>x.kind==="rival"&&x.ref);if(i<0)continue;
     Lr=talkOpts(P[i]).filter(Boolean);break}}finally{window.toilRival=tr0;window.toilOn=to0}
   chk(Lr.length>0,`c: a rival pop-up found (${Lr.length} options)`);
   const bad=Lr.filter(a=>/quý ta \+/.test(T(a.risk)));chk(!bad.length,`c: options with the praise on the Bại side ${bad.length} (${bad.slice(0,3).map(a=>T(a.n)).join(", ")})`);
   const good=Lr.filter(a=>/quý ta \+/.test(T(a.x)));chk(good.length>0,`c: options with the praise on the Được side ${good.length}`)}
  /* (d) */
  {let n=0,bad=[],help=null;/* same world as (c): a second AA.scen builds another world */for(const dt of [0,1,2])for(const sf of AA.surfaces().filter(s=>s.place)){AA.restore();S.turn=(S.turn||0)+dt;AA.show(sf);const P=curPeople();
    P.forEach((pp,i)=>{if(pp.kind!=="rival"&&pp.kind!=="hh")return;let A=[];try{A=talkOpts(pp)}catch(e){return}
     for(const a of A){if(!a)continue;if(a.n==="Nhờ giúp đỡ"&&!help)help=Object.assign({},a,{who:pp.kind+":"+pp.name+"@"+sf.id+" d"+dt});if(a.one!=="one"||a.lock)continue;n++;
      let full="";try{full=optLine(a)}catch(e){}const gl=T(doorGain([String(a.x||"")]));const fl=T(full);
      /* the button line must name a gain; a line whose only «thành» piece is a price («Bạc −») is the fault */
      const th=(/thành: ([^·]*)/.exec(fl)||[])[1]||"";if(!gl||(th&&/^[^,]*: ?Bạc [-−]/.test(th.trim())&&!/\+/.test(th)))bad.push(`${T(a.n)} @${sf.id} d${dt}: «${fl.slice(0,110)}»`)}})}
   chk(n>0,`d: one-tap doors read ${n}`);chk(!bad.length,`d: one-tap doors without a gain ${bad.length}${bad.length?": "+[...new Set(bad)].slice(0,4).join(" | "):""}`);
   const X=BAL.ag.cx2.help,R2=BAL.rcv.help;let ln="";try{const d=document.createElement("div");d.innerHTML=optLine(help);const g=k=>[...d.querySelectorAll(".kr-"+k+" .ef")].map(e=>T(e.textContent)).join(", ");ln={th:g("thanh")+g("duoc"),bai:g("bai")+g("mat")}}catch(e){}
   /* the kit card of the option (optLine → kit rows; magnitudes show as marks «Bạc ++»): Thành / Được names the bạc + chứng cứ she gets (the numbers are BAL.ag.cx2.help.bac / BAL.ag.ev.one in jrcv rcvHelpX), Bại / Mất the Danh she loses when told on */
   chk(help&&ln&&/Bạc \+/.test(ln.th)&&/chứng cứ \+/.test(ln.th)&&!/Danh/.test(ln.th)&&/Danh [-−]/.test(ln.bai)&&!/Bạc \+/.test(ln.bai),`d: «Nhờ giúp đỡ» card Thành «${ln&&ln.th.slice(0,120)}» Bại «${ln&&ln.bai.slice(0,90)}» (x «${help?T(help.x).slice(0,140):""}» risk «${help?T(help.risk):""}» who ${help&&help.who})`)}
  return{F,OK}},MU);
 for(const m of R.OK)console.log('  ok   '+m);for(const m of R.F)console.log('  FAIL '+m);
 console.log('E-GAIN4 unit: '+R.OK.length+' ok, '+R.F.length+' fail, page errors '+perr.length);perr.slice(0,3).forEach(e=>console.log('  PERR '+e));
 await b.close();process.exit(R.F.length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
