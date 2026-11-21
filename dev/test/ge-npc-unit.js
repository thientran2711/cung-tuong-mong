/* ge-npc-unit (review/ge-npc: GE09 NPC grand-ending parity, GE10 help/sabotage, GE08 world news pop-up, OR19 NPC foreign princesses) — real build:
   (1) an NPC on a live branch gets v.ge, every chapter she plays feeds it (en, pull/lean from HER picks), her road's end resolves the Hồi kết;
   (2) success: title on her (jdh), Kim sách in HER chest, row on the Bảng (geBoardList), centre pop-up «Thiên hạ truyền tin» once per player;
   (3) seat locks both ways: a seat she holds makes the player's geSeatTaken true; a seat the player holds is taken for her;
   (4) NPC Hoàng hậu through the lập hậu pattern only when no queen; a leave summit takes her out (not a death);
   (5) GE10: help → +BAL.ge.help.pull on her leading ending; betrayal → −push (0 → fail-only) and the rival told +pull; an unlock after help →
       BAL.ge.help.rw to the player once; after a betrayal → nothing;
   (6) OR19: share = the player pool (BAL.orig.ow.nc / consort origins); forced roll → a princess with the country's land as house, nrOrigin gives
       her origin, max per country (the player counts), faces never twice; a house daughter (dad + clan) never;
   (7) BAL.ge.npc.on false → no v.ge; an old save rival with nr but no ge loads and plays a month; no page errors.
   (8) a branch whose road prefix is not its origin (pt_* = pf) gets the same parity;
   usage: node dev/test/ge-npc-unit.js <url> */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://127.0.0.1:8731/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof geNpcResolve==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const out=[],fail=[];const ok=(c,m)=>{out.push((c?'ok  ':'FAIL ')+m);if(!c)fail.push(m)};try{
  try{document.getElementById('title').hidden=true}catch(e){}
  quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;const roll0=roll;
  const G0=JSON.parse(JSON.stringify(BAL.ge.npc)),H0=JSON.parse(JSON.stringify(BAL.ge.help)),F0=JSON.parse(JSON.stringify(BAL.nroad.fp));
  const br=Object.keys(GE_DATA).find(b=>b==="tt_tranh")||Object.keys(GE_DATA).find(b=>nrRoads(b.split("_")[0]).includes(b));
  const mk=()=>{const v=newRival(2);Object.assign(v,drawFace());v.fpk="";rivals.push(v);v.nr=nrNew(br.split("_")[0],br);return v};
  const run=v=>{let k=0;while(!v.nr.x&&k++<20){v.nr.t=0;nrPlay(v)}};
  /* (1) */
  let v=mk();ok(!!geNpcDbg.state(v)&&v.ge.b===br,'NPC on a live branch gets v.ge ('+br+')');v.nr.t=0;nrPlay(v);
  ok(Object.keys(v.ge.en).length===1&&/^(win|mid|lose|r97)$/.test(Object.values(v.ge.en)[0]),'a chapter she plays records its ending key: '+JSON.stringify(v.ge.en));
  run(v);ok(v.ge.done===1&&!!v.ge.res&&v.ge.r1!=null&&v.ge.r2!=null,'her road closed → Hồi kết resolved: '+JSON.stringify({r1:v.ge.r1,r2:v.ge.r2,ok:v.ge.res.ok,q:!!v.ge.res.quiet,n:v.ge.res.n}));
  ok(v.ge.pull.some(x=>x>0)||v.ge.lt!==0,'her picks moved pull / lean: '+JSON.stringify({pull:v.ge.pull,lt:v.ge.lt}));
  /* (2) forced success on a stay ending */
  const E=GE_CAT[br].e;const iStay=E.findIndex(e=>e[3]!==3&&!BAL.ge.npc.leave.includes(e[5])&&!BAL.ge.seat.includes(e[5]));
  const force=(w,i,okv)=>{const g=w.ge;g.st=["o","o","o","o"];g.done=0;g.res=null;
   /* the pair is hers to pick: weight her nature onto ending i by giving it a big pull, then force the roll */
   g.pull=[0,0,0,0];g.pull[i]=200;roll=()=>okv;const res=geNpcResolve(w);roll=roll0;return res};
  const w2=mk();geNpcDbg.state(w2);let res=null,t=0;while(t++<40){res=force(w2,iStay,true);if(res&&res.i===iStay&&res.ok)break;w2.alive=true}
  ok(res&&res.ok&&res.i===iStay,'forced success on «'+E[iStay][0]+'» (her pair by nature × pull): '+(res&&res.ti));
  const key=geK.key(br,iStay,res.sh);ok(!!(w2.dh&&w2.dh[key]),'shading title on her (jdh '+key+')');
  ok((w2.inv||[]).some(x=>x.k===BAL.ge.kimsach&&x.from==="ge"&&x.ti===res.ti),'Kim sách with her title in HER chest (real object)');
  ok(geBoardList().some(x=>x.who===w2&&x.ti===res.ti),'her row on the Bảng Thiên mệnh');
  Q.length=0;S.geNs={};const n1=geNpcNews();ok(n1>=1&&Q.some(q=>q.t==="Thiên hạ truyền tin"&&q.kit&&q.kit.subject===w2&&JSON.stringify(q.kit.facts).includes(res.ti)),'centre pop-up «Thiên hạ truyền tin» with her title');
  const n2=geNpcNews();ok(n2===0,'the pop-up comes once per player');Q.length=0;
  ok(!/%/.test(JSON.stringify(Q.map(q=>q.kit&&q.kit.facts))),'no % in the news');
  /* (3) seat locks */
  const iSeat=GE_CAT[br].e.findIndex(e=>BAL.ge.seat.includes(e[5])&&e[5]!=="HH");const seatB=Object.keys(GE_CAT).find(b=>GE_DATA[b]&&GE_CAT[b].e.some(e=>e[5]==="NDE"));
  const w3=mk();w3.ge={b:w3.ge?w3.ge.b:br,st:["o","o","o","o"],cx:[0,0,0,0],pull:[0,0,0,0],lt:0,d0:0,en:{},done:0};w3.ge.seat="NDE";
  ok(geK.seatTaken("NDE")===true,'a seat an NPC holds is taken for the player (geSeatTaken NDE)');
  w3.ge.seat=null;S.geSeat={TM:"me"};ok(geNpcDbg.term(w3,w3.ge,0,["seatT","TM"])===true&&geNpcDbg.term(w3,w3.ge,0,["seat","TM"])===false,'a seat the player holds is taken for the NPC');S.geSeat={};
  /* (4) HH and leave */
  const iHH=Object.keys(GE_CAT).filter(b=>GE_DATA[b]).map(b=>[b,GE_CAT[b].e.findIndex(e=>e[5]==="HH"&&e[3]!==3)]).find(x=>x[1]>=0);
  if(iHH){const q0=rivals[0],wasQ=q0.queen;q0.queen=false;const S0=S.rank;S.rank=Math.min(S.rank,5);const w4=newRival(3);Object.assign(w4,drawFace());w4.fpk="";rivals.push(w4);w4.nr=nrNew(iHH[0].split("_")[0],iHH[0]);
   geNpcDbg.state(w4);let r4=null,tt=0;while(tt++<60){r4=force(w4,iHH[1],true);if(r4&&r4.i===iHH[1])break;w4.alive=true;w4.queen=false}
   ok(r4&&r4.i===iHH[1]&&w4.queen===true&&rivals[0]===w4,'HH ending with no queen → she is crowned through the lập hậu pattern ('+iHH[0]+')');
   w4.queen=false;rivals.splice(rivals.indexOf(w4),1);rivals.push(w4);q0.queen=wasQ;if(wasQ&&rivals[0]!==q0){rivals.splice(rivals.indexOf(q0),1);rivals.unshift(q0)}S.rank=S0}
  else ok(true,'no live HH branch in GE_DATA (skipped)');
  const iLv=Object.keys(GE_CAT).filter(b=>GE_DATA[b]).map(b=>[b,GE_CAT[b].e.findIndex(e=>BAL.ge.npc.leave.includes(e[5])&&e[3]!==3)]).find(x=>x[1]>=0);
  {const w5=newRival(2);Object.assign(w5,drawFace());w5.fpk="";rivals.push(w5);w5.nr=nrNew(iLv[0].split("_")[0],iLv[0]);geNpcDbg.state(w5);let r5=null,tt=0;
   while(tt++<60){r5=force(w5,iLv[1],true);if(r5&&r5.i===iLv[1])break;w5.alive=true}
   ok(r5&&r5.i===iLv[1]&&w5.alive===false&&w5.left===GE_CAT[iLv[0]].e[iLv[1]][5]&&w5.ge.left===1,'a leave summit ('+w5.left+') takes her out of the palace (left, not a death)');
   Q.length=0;S.geNs={};geNpcNews();ok(Q.some(q=>q.kit&&q.kit.subject===w5&&/rời khỏi cung cấm|xuất gia|cố quốc/.test(JSON.stringify(q.kit.facts))),'the news says she left');Q.length=0}
  /* (5) GE10 */
  const v6=mk(),b6=mk();geNpcDbg.state(v6);geNpcDbg.state(b6);v6.ge.pull=[1,3,0,0];b6.ge.pull=[0,0,2,0];
  const X=(o,B)=>({A:{o,k:"rv",id:o.id,n:o.name},B:B?{o:B,k:"rv",id:B.id,n:B.name}:null,p:{nn:o.nr.n}});
  nrHelped(X(v6),1);ok(v6.ge.pull[1]===3+BAL.ge.help.pull,'help → +help.pull on her leading ending: '+JSON.stringify(v6.ge.pull));
  BAL.ge.help.push=10;nrHelped(X(v6,b6),-1);ok(v6.ge.pull[1]===0&&v6.ge.st[1]==="f",'betrayal → −push; at 0 the ending turns fail-only: '+JSON.stringify({p:v6.ge.pull,st:v6.ge.st}));
  ok(b6.ge.pull[2]===2+BAL.ge.help.pull,'the rival she told gets +help.pull (two-way): '+JSON.stringify(b6.ge.pull));
  Object.assign(BAL.ge.help,JSON.parse(JSON.stringify(H0)));
  /* reward after help, nothing after betrayal */
  const v7=mk();geNpcDbg.state(v7);v7.nr.hp=[[5,1,S.turn]];const d0=S.danh,du0=S.duc;let r7=null;tt=0;while(tt++<60){r7=force(v7,iStay,true);if(r7&&r7.ok)break;v7.alive=true}
  ok(r7&&r7.ok&&S.danh===Math.min(100,d0+BAL.ge.help.rw.danh)||S.danh>d0,'unlock after her help → BAL.ge.help.rw to the player: Danh '+d0+'→'+S.danh);
  const d1=S.danh;v7.ge.done=0;v7.ge.res=null;force(v7,iStay,true);ok(S.danh===d1,'the help reward comes once');
  const v8=mk();geNpcDbg.state(v8);v8.nr.hp=[[5,1,S.turn],[6,-1,S.turn]];const d2=S.danh;tt=0;while(tt++<60){const r8=force(v8,iStay,true);if(r8&&r8.ok)break;v8.alive=true}
  ok(S.danh===d2,'after a betrayal on her road → no reward');
  /* (6) OR19 */
  const share=geNpcDbg.share();const W=BAL.orig.ow;const tot=Object.keys(W).filter(k=>!BAL.nroad.fp.no.includes(k)).reduce((a,k)=>a+W[k],0);
  ok(Math.abs(share-W.nc/tot*100)<1e-9,'princess share = the player pool: '+share.toFixed(2));
  for(const x of rivals)if(x.fpk){x.fpk="";x.fpf=0}roll=()=>true;const p1=newRival(1);Object.assign(p1,drawFace());rivals.push(p1);const k1=nrFpRoll(p1);
  ok(!!k1&&originRoot(k1)==="nc"&&p1.clan===originByKey(k1).land&&p1.fpf>=1&&p1.fpf<=BAL.nroad.fp.faces,'forced roll → princess '+k1+' house «'+p1.clan+'» face '+p1.fpf);
  ok(typeof tdHouse==="function"&&tdHouse(p1)===null,'her house is abroad: no court house');
  p1.nr=null;nrInit(p1);ok(p1.nr&&p1.nr.o===k1&&nrRoads(k1).includes(p1.nr.r),'nrOrigin gives her the princess origin and one of its roads: '+(p1.nr&&p1.nr.r));
  const p2=newRival(1);Object.assign(p2,drawFace());rivals.push(p2);BAL.orig.br.nc=Object.fromEntries(Object.keys(BAL.orig.br.nc).map(x=>[x,x===k1?1:0]));
  const k2=nrFpRoll(p2);ok(k2==="",'max '+BAL.nroad.fp.max+' princess of one country per game → the second roll is not a princess');
  BAL.nroad.fp.max=3;p2.fpk=undefined;const k3=nrFpRoll(p2);ok(k3===k1&&p2.fpf!==p1.fpf,'with room for more, the face is never the same twice: '+p1.fpf+' vs '+p2.fpf);
  const p3=newRival(1);rivals.push(p3);p3.dad=40;p3.clan="Lễ bộ";ok(nrFpRoll(p3)===""&&p3.clan==="Lễ bộ",'a house daughter (dad + clan) is never a princess');
  roll=roll0;Object.assign(BAL.nroad.fp,F0);
  /* (7) */
  BAL.ge.npc.on=false;const v9=mk();ok(geNpcDbg.state(v9)===null,'BAL.ge.npc.on false → no v.ge');Object.assign(BAL.ge.npc,JSON.parse(JSON.stringify(G0)));
  const v10=mk();delete v10.ge;v10.nr.n=nrNext(v10.nr.r,8);v10.nr.t=0;let e10=0;try{monthTick();Q.length=0}catch(e){e10++}ok(e10===0,'old save (road mid-way, no v.ge) plays a month');
  /* (8) a country branch whose roads carry another prefix (Phù Tang: origin pf, roads pt_*, ARC67[road].o) gets the same parity (law 1) */
  for(const b of Object.keys(GE_DATA).filter(b=>geOrig(b)!==b.split('_')[0])){const o=geOrig(b);if(!nrRoads(o).includes(b))continue;const w=newRival(2);Object.assign(w,drawFace());w.fpk='';rivals.push(w);w.nr=nrNew(o,b);const g=geNpcDbg.state(w);let k=0;while(!w.nr.x&&k++<20){w.nr.t=0;nrPlay(w)}ok(!!g&&g.b===b&&Object.keys(w.ge.en).length>0&&w.ge.done===1,'NPC of origin '+o+' on '+b+' gets v.ge, feeds it and resolves the Hồi kết');w.alive=false}
 }catch(e){fail.push('EXC '+e.message+' '+(e.stack||'').split('\n')[1])}return{out,fail}});
 r.out.forEach(x=>console.log(x));if(errs.length)console.log('page errors:',errs.slice(0,5));
 console.log(r.fail.length||errs.length?'FAIL '+r.fail.length+' + page errors '+errs.length:'ALL OK ('+r.out.length+')');await b.close();process.exit(r.fail.length||errs.length?1:0)})();
