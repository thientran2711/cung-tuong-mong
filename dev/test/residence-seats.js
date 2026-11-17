/* review/residence-seats (owner 17/11 04:08Z / 04:20Z / 04:30Z / 04:32Z): residence + seats + harem cap, checked in the real build.
   usage: node dev/test/residence-seats.js <url-of-index.html> [games=6]
   Per new game (different origins) and then on forced situations:
   R1 every chủ vị (Tần/Phi/Quý phi incl. the player) has ≤ resCap() co-residents, at most BAL.res.side per hall, nobody shares a room
   R2 the player below Tần is housed in a chủ vị's Đông/Tây phối điện when a place is free (no more "she keeps Ngọc Thanh các")
   R3 spread: no chủ vị with 0 co-residents while another is full
   R4 an old save with 3 under one head is trimmed to the cap; nobody lost (everyone housed or palLone / Ngọc Thanh các)
   R5 promotion to Tần → her own palace (resHead cleared); demotion → housed again; lãnh cung → 'lc'
   R6 seats: SEATCAP = BAL.seat = {7:1,6:1,5:1,4:2,3:3}; an old save with 4 Phi keeps all 4 (nobody demoted), a new Phi is refused (seatHas false)
   R7 harem: roomFor('consort') false at BAL.harem.cap living consorts (her counted); a new game starts with BAL.ps.harem (+ her)
   R8 Dư đồ: no separate Ngọc Thanh các spot while she is housed; her host palace spot carries her face; home name = her hall's name;
      the stage at home paints her hall (SCIMG.home = <palace>-cung-dong-phoi|tay-phoi-*)
   exit 1 on any fail or page error. */
const {chromium}=require('playwright');const [,,URL,GAMES='6']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:755,height:1000}});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const res=await p.evaluate((G)=>{const F=[];const ok=(c,m)=>{if(!c)F.push(m)};const ORIG=['tt','dtq','th','muoi','nc','td','thd','cn','cnv'];
  const live=x=>x===S?!S.out&&!S.dead:x.alive&&!x.out;
  const hosts=()=>[S].concat(rivals).filter(palHostOK);
  const mates=h=>[S].concat(rivals).filter(y=>y!==h&&live(y)&&!y.queen&&y.resHead===key(h)&&!(rkOf(y)>=3&&y.pal!=null));
  const R1=tag=>{for(const h of hosts()){const M=mates(h);ok(M.length<=resCap(),`${tag} R1 ${h.name} has ${M.length}`);const n={};for(const y of M){const part=residenceOf(y).part;n[part]=(n[part]||0)+1}
    for(const k in n)ok(n[k]<=BAL.res.side&&BAL.res.halls.includes(k),`${tag} R1 ${h.name} hall ${k}=${n[k]}`)}};
  const R3=tag=>{const C=hosts().map(h=>mates(h).length);if(C.length>1)ok(!(Math.min(...C)===0&&Math.max(...C)>=resCap()),`${tag} R3 spread ${C.join(',')}`)};
  const R2=tag=>{if(rkOf(S)>=3||S.out||(typeof isSrv==="function"&&isSrv()))return;const free=hosts().some(h=>h!==S&&mates(h).length<resCap()||h!==S&&mates(h).includes(S));
    const r=residenceOf(S);if(free)ok((r.part==="dong"||r.part==="tay")&&r.pal!=null,`${tag} R2 she is in ${r.part} though a place is free`)};
  const out={games:[]};
  for(let g=0;g<G;g++){window.__forceOrigin=ORIG[g%ORIG.length];SLOT=3;quiet=true;window.__nlInner=1;try{start()}catch(e){F.push('start '+e.message);continue}window.__nlInner=0;quiet=true;const r0=render;render=()=>{};
   Q.length=0;palFix();const tag='g'+g+'/'+window.__forceOrigin;
   ok(liveRivals(true).length===BAL.ps.harem.length,`${tag} R7 start harem ${liveRivals(true).length} != ${BAL.ps.harem.length}`);
   R1(tag);R2(tag);R3(tag);
   const row={orig:window.__forceOrigin,her:resRoomName(residenceOf(S)),hosts:hosts().map(h=>`${RANKS[rkOf(h)].n}:${mates(h).length}`).join(' ')};
   /* 24 months of play: the rules hold every month */
   for(let m=0;m<24;m++){Q.length=0;S.mg=null;if(S.dead){S.dead=false}if(S.suc<20)S.suc=60;try{endTurn()}catch(e){F.push(tag+' turn '+e.message);break}palFix();R1(tag+'m'+m);R3(tag+'m'+m);R2(tag+'m'+m)}
   row.after24=resRoomName(residenceOf(S));row.harem=liveRivals(true).length+1;out.games.push(row);render=r0}
  /* forced situations on the last game */
  quiet=true;const r0=render;render=()=>{};
  S.out=false;S.dead=false;S.rank=1;S.pal=null;palFix();
  /* R4: an old save puts three under one head */
  {const h=hosts().find(x=>x!==S);const low=[S].concat(rivals).filter(y=>live(y)&&!y.queen&&rkOf(y)<3);
   if(h&&low.length>=3){for(const y of low.slice(0,3)){y.resHead=key(h);y.resHall=null;if(y!==S&&y.palLone){y.pal=null;y.palLone=0}}palFix();R1('R4');ok(mates(h).length<=resCap(),'R4 trim '+mates(h).length);
    for(const y of low){const r=residenceOf(y);ok(!!r.part,'R4 lost '+y.name)}}else F.push('R4 setup: no head or <3 lower')}
  /* R5 */
  S.rank=3;palFix();ok(S.pal!=null||!PALN.some((_,i)=>![S].concat(rivals).some(p=>p.pal===i&&live(p))),'R5 Tần without palace');ok(!S.resHead,'R5 resHead kept at Tần');
  S.rank=2;palFix();R2('R5 demote');ok(S.pal==null,'R5 demoted keeps palace');
  S.out=true;palFix();ok(residenceOf(S).part==='lc','R5 lc');S.out=false;palFix();R2('R5 back');
  /* R8 Dư đồ + stage */
  {const r=residenceOf(S);if(r.part==='dong'||r.part==='tay'){const sp=mapSpots();ok(!sp.some(x=>x.k==='home'),'R8 Ngọc Thanh các spot shown while housed');
    const hs=sp.find(x=>x.k===palaceOf(r.head));ok(hs&&(hs.res||[]).includes(S),'R8 host spot lacks her');ok(palName('home')===resRoomName(r),'R8 home name '+palName('home'));
    S.place='home';try{resApply()}catch(e){}ok(String(SCIMG.home).indexOf(r.part==='dong'?'-dong-phoi':'-tay-phoi')>0,'R8 stage '+SCIMG.home);out.her=resRoomName(r);out.stage=SCIMG.home}else F.push('R8 setup: not housed ('+r.part+')')}
  /* R6 seats */
  ok(JSON.stringify(SEATCAP)===JSON.stringify(BAL.seat)&&BAL.seat[5]===1&&BAL.seat[4]===2&&BAL.seat[3]===3,'R6 SEATCAP '+JSON.stringify(SEATCAP));
  {const L=rivals.filter(v=>live(v)&&!v.queen&&rkOf(v)<4).slice(0,4);for(const v of L)v.rank=4;delete S.seatV;delete S.seatKeep;normAll();
   ok(rivals.filter(v=>live(v)&&!v.queen&&rkOf(v)===4).length>=4,'R6 old Phi demoted: '+rivals.filter(v=>live(v)&&rkOf(v)===4).length);
   const nx=rivals.find(v=>live(v)&&!v.queen&&rkOf(v)===3);if(nx)ok(!seatHas(nx,4),'R6 promotion into a full rank allowed');
   Q.length=0;try{endTurn()}catch(e){F.push('R6 turn '+e.message)}ok(rivals.filter(v=>live(v)&&!v.queen&&rkOf(v)===4).length>=4,'R6 demoted after a turn');R1('R6');out.phi=rivals.filter(v=>live(v)&&rkOf(v)===4).length}
  /* R7 harem cap */
  {let n=0;while(roomFor('consort')&&n++<40){const v=newRival(0);Object.assign(v,drawFace());rivals.push(v)}ok(liveRivals(true).length+1===BAL.harem.cap,'R7 cap '+(liveRivals(true).length+1));palFix();R1('R7');R3('R7');
   /* R9 (successor #2, whole family): adds that check the room when queued but add later. A newgirl event (j7) chosen after the harem
      filled up, and every option of it, keeps the harem at the cap; bạc of the paid option comes back. j55 sớ tuyển tú re-checks roomFor. */
   {const E=EVI.newgirl&&EVI.newgirl.b&&EVI.newgirl.b();if(!E)ok(false,'R9 no newgirl event');else for(const o of E.o){const b0=S.bac;try{o.go()}catch(e){ok(false,'R9 go '+e.message)}ok(liveRivals(true).length+1<=BAL.harem.cap,'R9 newgirl "'+o.n+'" -> '+(liveRivals(true).length+1));if(o.fx&&o.fx.bac)ok(S.bac>=b0,'R9 bạc not refunded')}
    /* R9b back from lãnh cung while the harem is full: pardon (empAct), coldvisit 'Xin Hoàng thượng ân xá' (locked, and no return if forced) */
    {const v=liveRivals(false).find(x=>x.rank<3);if(v){v.out=true;const w=newRival(0);Object.assign(w,drawFace());rivals.push(w);palFix();
      ok(liveRivals(true).length+1===BAL.harem.cap,'R9b refill '+(liveRivals(true).length+1));const i=rivals.indexOf(v);const r7=S.rank;S.rank=7;Q.length=0;try{used=0}catch(e){}
      try{empAct(i,'pardon')}catch(e){ok(false,'R9b pardon '+e.message)}ok(v.out&&liveRivals(true).length+1<=BAL.harem.cap,'R9b pardon brought her back over the cap');S.rank=r7;
      const C=EVI.coldvisit&&EVI.coldvisit.b&&EVI.coldvisit.b({f:v.id,o:100});const o=C&&C.o.find(x=>/ân xá/.test(x.n));if(!o)ok(false,'R9b no coldvisit ân xá option');else{ok(!!o.off,'R9b ân xá option not locked');try{o.go()}catch(e){}ok(v.out&&liveRivals(true).length+1<=BAL.harem.cap,'R9b coldvisit brought her back over the cap')}v.out=false;w.alive=false;palFix()}}
    ok(/roomFor\("consort"\)\){const n=newRival\(roll\(70\)/.test(String(typeof tdTurn==='function'?'':'')+[...document.scripts].map(x=>x.text).join('')),'R9 j55 sớ tuyển tú re-checks roomFor')}
   out.capAt=liveRivals(true).length+1;const C={};for(const p of [S].concat(rivals))if(live(p)&&!p.queen){const r=residenceOf(p);C[r.part]=(C[r.part]||0)+1}out.full=C}
  render=r0;quiet=false;return {F,out}},+GAMES);
 console.log(JSON.stringify(res.out,null,0));for(const f of res.F)console.log('FAIL',f);if(errs.length)console.log('PAGE ERRORS',errs.slice(0,6));
 console.log(res.F.length||errs.length?`RESIDENCE-SEATS FAIL ${res.F.length} fails, ${errs.length} page errors`:'RESIDENCE-SEATS PASS');
 await b.close();process.exit(res.F.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
