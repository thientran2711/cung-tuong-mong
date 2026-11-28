/* family-gift (D-FAMILY-GIFT, OD 26/11 (c)): gifts / silver to HER OWN family (jfamg) — law 1 (NPC same act), law 2 (Nhẹ · Vừa · Nặng, a bạc road has a
   matching other road), law 3 (every option gains), law 4 (BAL.gift.fam), law 6b (real receiver), law 6c (the piece really leaves and is traceable), law 7.
   Part A = LAW-11 ROAD SCAN: every family-gift road in the built game, which way it goes and whether it is two-way.
   usage: node dev/test/family-gift.js [root]   (root = a BUILT site, default the repo root)   exit 1 on any FAIL */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const D=require('./lib/device');
const ROOT=path.resolve(process.argv[2]||process.env.CTM_ROOT||path.join(__dirname,'../..'));
const F=[];const ck=(ok,m)=>{console.log((ok?'PASS ':'FAIL ')+m);if(!ok)F.push(m)};
/* ---- A. law-11 road scan (static) ---- */
{const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
 const roads=[["family → her: letters / home gifts (Khuê các)","function palRecvFromKc"],["family → her: home money","function econHome"],["family asks her (favours)",'k==="fam"'],
  ["her → court houses (j55)","function tdGiftGo"],["her → HER OWN family (jfamg)","function fgGo"],["family answers her gift","function fgReply"],["NPC consort → her own family","function fgNpcMonth"],
  ["ledger box «nha»",'how==="home"?"nha"']];
 console.log('\nROAD | present');for(const [n,re] of roads){const ok=h.includes(re);console.log(`${n} | ${ok?'yes':'NO'}`);ck(ok,`A road present: ${n}`)}
 ck(/h\.dadOf==="me"\)return""/.test(h),'A j55 tdGiftGo still refuses her own father (the own-family road is jfamg, not a second copy)')}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;{const k=document.getElementById('kload');if(k)k.hidden=true;const m=document.getElementById('modal');if(m)m.hidden=true}try{render()}catch(e){}});
 try{await g.waitForSelector('#kroul',{timeout:20000});await p.waitForTimeout(1500);await g.evaluate(()=>{const b=[...document.querySelectorAll('#kroul button')].find(x=>/Bỏ qua/.test(x.textContent));b&&b.click()});await g.waitForSelector('#kroul',{state:'detached',timeout:20000})}catch(e){}
 await p.waitForTimeout(1500);await g.evaluate(()=>{document.querySelectorAll('.krbox,#kroul').forEach(x=>{const o=x.id==='kroul'?x:x.parentElement;o&&o.remove()});const c=document.getElementById('curtain');if(c)c.hidden=true;Q.length=0;try{NLP=null}catch(e){}const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});
 const R=await g.evaluate(()=>{const o={};try{const F=BAL.gift.fam;o.F=JSON.parse(JSON.stringify(F));const r0=roll;const box=e=>{const x=S.il.box.find(z=>z.e===e);return x?x.at+":"+x.own:"none"};
  delete S.kc;S.origin=ORIGINS.find(x=>x.k==="tt");S.fgh=null;S.fgT=null;S.fgq=null;S.fgLog=null;used=0;
  const m=fgHome(S);o.home=m?{t:m.t,name:m.name,af:m.af}:null;
  o.tdNone=(()=>{const k=S.origin;S.origin=ORIGINS.find(x=>x.k==="td");const s=S.fgh;S.fgh=null;const r=fgHome(S);S.origin=k;S.fgh=s;return r===null})();
  o.tab=fgHTML().replace(/<[^>]+>/g," ").replace(/\s+/g," ");
  const d=PEND.fgSend();o.opts=d.o.map(c=>({n:c.n,x:String(c.x||"").replace(/<[^>]+>/g,""),off:!!c.off}));
  /* Nhẹ */const af0=m.af,suc0=S.suc;S.suc=Math.max(S.suc,50);const s1=S.suc;const r1=fgGo(S,"nhe");const nE=S.il.box.filter(x=>x.at==="nha"&&x.own==="me");
  o.nhe={ok:r1&&r1.ok,suc:s1-S.suc,af:m.af-af0,nha:nE.length,k:nE.length?nE[nE.length-1].e.k:""};
  /* Vừa item, gate passes */const k=Object.keys(IT).find(k=>IT[k].pr>=F.vua.v[0]&&IT[k].pr<=F.vua.v[1]&&IT[k].kd&&!IT[k].wd);const fit=z=>z&&fgPiece({inv:[z]},"vua")===z;S.inv=S.inv.filter(z=>!fit(z));const e={k,from:"mkt"};invAdd(S,e);S.bac=500;
  roll=()=>true;const b0=S.bac;const r2=fgGo(S,"vua","item");o.vuaI={k,ok:r2&&r2.ok,inInv:S.inv.includes(e),at:box(e),bac:b0-S.bac,pick:fgPieceN(e)};
  /* Vừa item, stopped at the gate */const e2={k,from:"mkt"};invAdd(S,e2);roll=()=>false;const dn=S.danh;const r3=fgGo(S,"vua","item");o.vuaStop={ok:r3&&r3.ok,inInv:S.inv.includes(e2),at:box(e2),danh:S.danh-dn,txt:r3&&r3.txt};
  /* imperial bestowal never picked */const e3={k,from:"emp"};S.inv=S.inv.filter(x=>x.k!==k);invAdd(S,e3);o.empPicked=fgPiece(S,"vua")===e3;S.inv=S.inv.filter(x=>x!==e3);
  /* Nặng bạc */roll=()=>true;const b1=S.bac;S.fgq=null;const r4=fgGo(S,"nang","bac");o.nangB={ok:r4&&r4.ok,bac:b1-S.bac,q:S.fgq&&S.fgq.t};
  /* family answer */const inv0=S.inv.length;Q.length=0;S.turn=S.fgq.w;fgReply();const last=S.inv[S.inv.length-1];o.reply={card:Q.some(z=>z.t==="Thư nhà"),got:S.inv.length-inv0,from:last&&last.from,up:S.fgUp&&S.fgUp.n};
  const lg=S.il.log.slice(-6).map(x=>x.slice(2).join(">"));o.ledger=lg;
  S.homeCut=0;S.out=0;S.month=1+BAL.homeEvery;const hm=econHome(S);o.homeMoney={got:hm,base:BAL.home.tt};
  /* NPC (law 1): same act */const v=liveRivals(true).find(x=>!x.queen&&x.alive);v.bac=400;v.dad=40;const vb=v.bac,vd0=v.duc||0,vn0=v.danh||0;SP_OFF=(typeof SP_OFF==="number"?SP_OFF:0)+1;const r5=fgGo(v,"nang","bac");SP_OFF--;o.npcB={ok:r5&&r5.ok,bac:vb-v.bac,dad:v.dad-40,duc:(v.duc||0)-vd0,danh:(v.danh||0)-vn0};
  v.inv=(v.inv||[]).filter(z=>!fit(z));const ve={k,from:"mkt"};invAdd(v,ve);const r6=fgGo(v,"vua","item");o.npcI={ok:r6&&r6.ok,inInv:v.inv.includes(ve),at:box(ve),own:String(v.id)};
  roll=()=>false;const ve2={k,from:"mkt"};invAdd(v,ve2);const vd=v.danh||0;const r7=fgGo(v,"vua","item");o.npcStop={ok:r7&&r7.ok,at:box(ve2),danh:(v.danh||0)-vd};
  roll=()=>true;let nN=0;const p0=BAL.gift.fam.npc.p;BAL.gift.fam.npc.p=100;for(const x of liveRivals(true))x.bac=500;const lb=liveRivals(true).map(x=>x.bac);fgNpcMonth();nN=liveRivals(true).filter((x,i)=>x.bac<lb[i]).length;BAL.gift.fam.npc.p=p0;o.npcMonth=nN;
  roll=r0;
  /* the dialog renders through the kit (Fold) */Q.length=0;S.fgT=null;S.fgq=null;used=0;pushDil(mkP("fgSend",{}),"Gửi quà về nhà");showModal();o.modal=(document.getElementById('modal').innerText||"").slice(0,1500);
 }catch(e){o.err=String(e.stack||e).slice(0,400)}return o});
 console.log(JSON.stringify(R,null,1).slice(0,4000));
 ck(!R.err,'B no error '+(R.err||''));
 ck(R.home&&R.home.name&&R.home.name!=="Mẫu thân",'B law 6b: a real named mother at home (origin tt)');
 ck(R.tdNone,'B origin td (family executed): no road');
 ck(/Gửi quà về nhà/.test(R.tab||""),'B Tư trang › Thư nhà shows «Gửi quà về nhà»');
 const O=R.opts||[];ck(O.length===6,'B dialog: 5 rows + Thôi');
 ck(['Nhẹ','Vừa','Nặng'].every(t=>O.some(c=>c.n.startsWith(t+':'))),'B law 2: tiers Nhẹ · Vừa · Nặng');
 ck(O.filter(c=>/^Vừa|^Nặng/.test(c.n)).every(c=>/tốn:/.test(c.x)&&/thành:/.test(c.x)&&/hỏng:/.test(c.x)),'B law 3: Vừa/Nặng rows show tốn / thành / hỏng');
 ck(O.every(c=>!/%/.test(c.n+c.x)),'B law 7: no % in the rows');
 ck(R.nhe&&R.nhe.ok&&R.nhe.suc===8&&R.nhe.af===3&&R.nhe.k==="khantay",'B Nhẹ: Sức paid, liking up, the handkerchief is at home (box nha)');
 ck(R.vuaI&&R.vuaI.ok&&!R.vuaI.inInv&&/^nha:me/.test(R.vuaI.at),'B law 6c Vừa: the piece left her chest and sits in box «nha»');
 ck(R.vuaStop&&!R.vuaStop.ok&&!R.vuaStop.inInv&&/^nvp:me/.test(R.vuaStop.at)&&R.vuaStop.danh<0,'B gate stop: the piece goes to the Nội vụ phủ store, Danh down');
 ck(R.empPicked===false,'B an imperial bestowal is never picked to go home');
 ck(R.nangB&&R.nangB.ok&&R.nangB.bac===R.F.fee+R.F.nang.bac,'B Nặng bạc: fee + nang.bac (BAL)');
 ck(R.reply&&R.reply.card&&R.reply.got===1&&R.reply.from==="nha"&&R.reply.up===R.F.nang.up,'B the family answers: letter card, a real home gift, more home money');
 ck(R.homeMoney&&R.homeMoney.got===R.homeMoney.base+R.F.nang.up,'B Nặng: home money larger');
 ck(R.npcB&&R.npcB.ok&&R.npcB.bac===R.F.fee+R.F.nang.bac&&R.npcB.dad===R.F.npc.dad[2]&&R.npcB.duc===R.F.nang.duc&&R.npcB.danh===R.F.nang.danh,'B law 1 NPC Nặng bạc: same cost, same Đức / Danh, her house standing up');
 ck(R.npcI&&R.npcI.ok&&!R.npcI.inInv&&R.npcI.at==="nha:"+R.npcI.own,'B law 1 NPC Vừa item: the piece in box «nha» under her owner key');
 ck(R.npcStop&&!R.npcStop.ok&&/^nvp:/.test(R.npcStop.at)&&R.npcStop.danh<0,'B law 1 NPC stopped at the gate: same store, same loss');
 {/* law 2: at the base gate odds Nặng's expected result beats Vừa's (liking, Đức, Danh) while it costs more */const F=R.F||{},ev=(T,k,l)=>T.o/100*(T[k]||0)-(1-T.o/100)*(T[l]||0);
  const rowsEv=[['liking',ev(F.vua,'af',''),ev(F.nang,'af','')],['Đức',ev(F.vua,'duc','lostDuc'),ev(F.nang,'duc','lostDuc')],['Danh',ev(F.vua,'danh','lostDanh'),ev(F.nang,'danh','lostDanh')]];
  console.log('\nLAW 2 EXPECTED | Vừa | Nặng');for(const r of rowsEv)console.log(`${r[0]} | ${r[1].toFixed(2)} | ${r[2].toFixed(2)}`);
  ck(rowsEv.every(r=>r[2]>r[1])&&F.nang.bac>F.vua.bac&&F.nang.v[0]>F.vua.v[1],'B law 2: Nặng costs more AND its expected Được beats Vừa (liking, Đức, Danh)')}
 ck(R.npcMonth>0,'B NPC monthly sending runs');
 ck(/Nhẹ/.test(R.modal||"")&&/Thôi|✕/.test(R.modal||""),'B dialog renders');
 ck(!errs.length,'B no page error '+errs.join(' | '));
 await b.close();srv.close();console.log(`\nfamily-gift: ${F.length?'FAIL '+F.length:'PASS'}`);process.exit(F.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
