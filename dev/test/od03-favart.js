/* OD03 fav-art checks (review/od03-favart): the Emperor's month art, two-way. usage: node dev/test/od03-favart.js <index.html> → PASS/FAIL, exit 1 on FAIL
   1 Emperor card rows «Tháng này chuộng / không ưa» = chưa rõ until she knows, the art names after (kit pcard group rows)
   2 her Kính sự phòng ask stays open while the month art is unknown (all likes known), closed once known
   3 NPC cx2:likes: open again while the month art is unknown; eaAsk names it at BAL.steal.ea.disc (the same rule as her discover)
   4 NPC flip-mode weights = the odds SHE sees (stealShown: month art only when known); the roll stays the true oSteal
   5 old save without S.emp.ea / eaK loads, a week plays, a month art is drawn */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([c?"PASS":"FAIL",n,c?"":JSON.stringify(x)]);
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;start();Q.length=0;try{deal()}catch(e){}render();
  S.emp.ea=null;empArtMonth();const ea=empArt();const nm=k=>ARTS.find(a=>a.k===k).n;
  S.eaK=-1;let h=empCardHTML();ok("1 card: unknown → chưa rõ",/Tháng này chuộng/.test(h)&&/Tháng này không ưa/.test(h)&&eaRows(S)[0][1]==="chưa rõ"&&eaRows(S)[1][1]==="chưa rõ",eaRows(S));
  S.eaK=S.turn;h=empCardHTML();ok("1 card: known → art names",eaRows(S)[0][1]===nm(ea.f)&&eaRows(S)[1][1]===nm(ea.d)&&h.includes(nm(ea.f)),eaRows(S));
  for(const k in LIKES)S.emp.known[k]=true;const du0=window.disUnk;window.disUnk=()=>false;const ask=()=>(talkOpts({kind:"ksp"})||[]).some(a=>a.n==="Hỏi sở thích Hoàng thượng");
  S.eaK=-1;const a1=ask();S.eaK=S.turn;const a2=ask();window.disUnk=du0;ok("2 her ask open while unknown, closed when known (all likes known)",a1&&!a2,[a1,a2]);
  const v=liveRivals(true)[0];v.eK={flower:1};v.eaK=-1;  const d0=BAL.steal.ea.disc;BAL.steal.ea.disc=0;let n0=0;for(let i=0;i<50;i++){v.eaK=-1;if(eaAsk(v))n0++}
  BAL.steal.ea.disc=100;let n1=0;for(let i=0;i<50;i++){v.eaK=-1;if(eaAsk(v))n1++}BAL.steal.ea.disc=d0;
  ok("3 NPC ask names the month art by BAL.steal.ea.disc (0 → never, 100 → near always)",n0===0&&n1>=40,[n0,n1]);
  v.eaK=S.turn;ok("3 known → eaOpen false",!eaOpen(v)&&eaOpen(liveRivals(true)[1]||{})!==undefined,eaOpen(v));
  for(const k of ARTS.map(a=>a.k)){v.arts[k]=0;v.artp[k]=0}v.arts[ea.f]=4;v.suc=100;v.duc=100;
  v.eaK=-1;const tr=oSteal(v,"road"),sh=stealShown(v,"road");v.eaK=S.turn;const sh2=stealShown(v,"road");
  ok("4 unknown → she sees less than the truth; known → the truth",sh<tr&&sh2===tr,[tr,sh,sh2]);
  /* 6 (review) one ask rule for her and an NPC: a won ask names the month art at BAL.steal.ea.disc, else a like (never both); sure when nothing else is left (shown odds = true chance) */
  {const du=window.disUnk;window.disUnk=()=>false;for(const k in LIKES)S.emp.known[k]=true;let g=0;for(let i=0;i<60;i++){S.eaK=-1;if(discover()&&S.eaK===S.turn)g++}
   let hb=0;for(let i=0;i<200;i++){S.eaK=-1;for(const k in LIKES)S.emp.known[k]=false;discover();if(S.eaK===S.turn&&Object.keys(LIKES).some(k=>S.emp.known[k]))hb++}window.disUnk=du;
   const w=liveRivals(true)[0],T0=window.agTry;window.agTry=()=>true;let nb=0,ne=0,nl=0,ns=0;
   for(let i=0;i<200;i++){w.eK={};w.eaK=-1;w.bac=9999;AGRUN["cx2:likes"](w);const l=Object.keys(w.eK).length>0,e=w.eaK===S.turn;if(l&&e)nb++;if(e)ne++;if(l)nl++}
   for(let i=0;i<60;i++){w.eK={};for(const k in LIKES)w.eK[k]=1;w.eaK=-1;w.bac=9999;AGRUN["cx2:likes"](w);if(w.eaK===S.turn)ns++}window.agTry=T0;
   ok("6 her ask, only the month art left: a won ask always names it",g===60,g);ok("6 her ask with likes left: month art OR a like, never both",hb===0,hb);
   ok("6 NPC ask with likes left: month art OR a like, never both (her rule)",nb===0&&ne>0&&nl>0&&ne+nl===200,[nb,ne,nl]);ok("6 NPC ask, only the month art left: always names it",ns===60,ns)}
  /* 5 old save */
  const d=ser();delete d.S.emp.ea;delete d.S.eaK;(d.R||[]).forEach(r=>{delete r.eaK});let lo=true;try{deser(d);ok("5a old save draws the month art on load",!!empArt(),S.emp.ea);for(let i=0;i<3;i++){Q.length=0;endTurn()}}catch(e){lo=String(e)}
  ok("5 old save (no month art) loads, plays, draws one",lo===true&&!!empArt(),[lo,S.emp&&S.emp.ea,S.turn,S.dead,Q.length,typeof endTurn]);
  return out});
 /* 4 static: jsteal's mode weights read stSeen (= stealShown), the roll stays oSteal in stealNight */
 {const fs=require('fs'),src=fs.readFileSync(path.join(__dirname,'..','build','jsteal.js'),'utf8');const m=src.match(/function stModes[^\n]*\n[^\n]*/)[0];
  R.push([/stSeen\(v,"feign"\)/.test(m)&&/stSeen\(v,"road"\)/.test(m)&&!/oSteal/.test(m)?"PASS":"FAIL","4 NPC mode weights use the seen odds (jsteal stModes → stSeen)",""])}
 let bad=0;for(const r of R){console.log(r.join(" · "));if(r[0]!=="PASS")bad++}if(errs.length){console.log("page errors",errs.slice(0,5));bad++}
 console.log(bad?"FAIL":"PASS");await b.close();process.exit(bad?1:0)})();
