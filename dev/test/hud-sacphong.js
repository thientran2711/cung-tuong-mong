/* review/hud-sacphong: node dev/test/hud-sacphong.js — hudSacphongInfo() agrees with BAL.promoR + the stored kỳ calendar across a festival boundary, a kỳ month, quốc tang and "none scheduled".
   Independent recompute here (weeks = months × (BAL.cut.tuanDays.length+1) + S.tuan); no typed gap. Direct mode (the page is the game). */
const {chromium}=require('playwright');const D=require('./lib/device');let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok  ',m)};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,'ipadAir',{});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(1500);
 const R=await g.evaluate(()=>{KLIFE.off=1;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const out=[];const W=BAL.cut.tuanDays.length+1;
  const snap=tag=>{pbKyUpdate();const i=hudSacphongInfo(),t=hudSacphongText(i),A=pbA(),n=pbNextKy(A);const K=S.pb.ky;let prev=null;for(const a in K.at)if(+a<(n?n.A:0)&&(prev==null||+a>prev))prev=+a;if(prev==null&&n)prev=(K.last!=null&&K.last<n.A)?K.last:n.A-BAL.promoR.ky.gapMin;
   out.push({tag,A,tuan:S.tuan,i,t:t&&t.s,exp:n?{done:(A-prev)*W+S.tuan,total:(n.A-prev)*W,name:n.n}:null,mt:S.pb.mt==null?null:S.pb.mt})};
  /* walk months forward (state only, as endTurn does) until a kỳ month has passed */
  snap('start');let seenKy=false,guard=0;while(guard++<60&&out.length<8){S.month++;if(S.month>12){S.month=1;S.year++}S.turn+=1;S.tuan=0;S.emp=S.emp||{};try{pbKyUpdate()}catch(e){}const A=pbA();const k=pbKyAt(A);if(k&&!seenKy){snap('kyMonth');S.tuan=2;snap('kyMonth-t2');seenKy=true}else if(seenKy&&!k){snap('after');break}}
  S.pb.mt=pbA()+3;snap('tang');S.pb.mt=null;
  return out});
 ok(!errs.length,'no page errors '+errs.join('|'));
 for(const r of R){if(r.tag==='tang'){ok(r.i&&r.i.kind==='hoan'&&r.t==='Sắc phong: tạm hoãn','quốc tang → tạm hoãn ('+r.t+')');continue}
  if(!r.exp){ok(r.i&&r.i.kind==='hoan','none scheduled → tạm hoãn ('+r.t+')');continue}
  ok(r.i&&r.i.kind==='ky'&&r.i.done===Math.min(r.exp.done,r.exp.total)&&r.i.total===r.exp.total,`${r.tag}: ${r.t} == BAL gap ${Math.min(r.exp.done,r.exp.total)}/${r.exp.total}`);
  ok(r.i&&r.i.done<=r.i.total&&r.i.done>=0,`${r.tag}: 0 ≤ done ≤ total`)}
 await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
