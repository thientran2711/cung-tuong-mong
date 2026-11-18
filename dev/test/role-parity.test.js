/* ROLE PARITY test (owner OD 18/11 ~21:30Z): re-runs dev/tools/role-parity-scan.js on the built page and FAILS on any new gap —
   a role × act cell where only the player or only the NPCs of that role hold the act (P-ONLY / N-ONLY at group level, P-RANK / N-RANK for a
   shared-gate deed), or a promoted maid whose act set differs from her clone born as Đáp ứng (PROMO-*). Documented exemptions live in
   dev/tools/role-parity-exempt.json (each with its reason); known open gaps being closed live in dev/tools/role-parity-open.json and must SHRINK
   (a gap not in that list = FAIL; an entry no longer seen = reported so the list is trimmed).
   Also: ONE promotion rule — riseCore gives the same Sủng / Danh / Bạc / old-master numbers to the player (srvRise) and an NPC maid (amRise).
   usage: node dev/test/role-parity.test.js [dev/index.html]   → exit 1 on FAIL or page error */
const path=require('path');const fs=require('fs');const {scan}=require('../tools/role-parity-scan.js');
const HTML=process.argv[2]||'dev/index.html';const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 const R=await scan(HTML);
 const OPEN=JSON.parse(fs.readFileSync(path.join(__dirname,'../tools/role-parity-open.json'),'utf8'));const okOpen=new Set(OPEN.map(g=>g.role+"|"+g.key));
 const fresh=R.gaps.filter(g=>!okOpen.has(g.role+"|"+g.key));const seen=new Set(R.gaps.map(g=>g.role+"|"+g.key));const gone=OPEN.filter(g=>!seen.has(g.role+"|"+g.key));
 ok(fresh.length===0,'no NEW role-parity gap (every role × act cell is held by both sides, exempt, or a listed open gap)',fresh.slice(0,25).map(g=>g.role+":"+g.side+":"+g.key));
 if(gone.length)console.log('note: open-list entries now closed (trim role-parity-open.json): '+gone.map(g=>g.role+":"+g.key).join(", "));
 ok(R.promo.npc.ok&&R.promo.npc.grp==="consort"&&R.promo.npc.rank===0,'NPC maid promoted (amRise) becomes a consort of rank Đáp ứng',R.promo.npc);
 ok(R.promo.me.ok,'player maid promoted (srvRise) becomes a consort of rank Đáp ứng',R.promo.me);
 ok(R.promo.npc.onlyRisen.length===0&&R.promo.npc.onlyBorn.length===0,'NPC: the promoted maid holds EXACTLY the act set of her clone born as Đáp ứng',{risen:R.promo.npc.onlyRisen,born:R.promo.npc.onlyBorn});
 ok(R.promo.me.onlyRisen.length===0&&R.promo.me.onlyBorn.length===0,'player: after srvRise she holds EXACTLY the act set of the same life born as Đáp ứng',{risen:R.promo.me.onlyRisen,born:R.promo.me.onlyBorn});
 ok(!R.pageErr.length,'no page errors during the scan',R.pageErr.slice(0,3));
 /* ONE promotion rule: same regard → same numbers for her and an NPC maid */
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&!isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const D=BAL.ag.maid.rise;const reg=40;
  /* the NPC maid of an NPC master */const o=liveRivals(true).find(x=>!x.out&&x!==S);if(!(o.staff||[]).some(s=>s&&s.role==="maid"))fillStaff(o,true);const m=o.staff.find(s=>s&&s.role==="maid");m.sung=reg;m.loyal=80;
  const g0=o.ghen||0;const L0=rivals.length;amRise(m,o,"send");const n=rivals[rivals.length-1];const npc={sung:n.sung,danhUp:n.danh-(8+0*8),ghen:(o.ghen||0)-g0,made:rivals.length>L0};
  /* the player maid: same regard, loyal */const mis=srvM();S.age=Math.max(S.age||0,18);S.sung=reg;S.tin=80;const d0=S.danh,b0=S.bac,h0=mis?(mis.ghen||0):0;srvRise("role-parity test");
  const me={sung:S.sung,danh:S.danh-d0,bac:S.bac-b0,ghen:mis?(mis.ghen||0)-h0:null,rank:S.rank,srv:isSrv()};
  return{npc,me,want:{sung:D.b+Math.round(reg/D.d),danh:D.danh,bac:D.bac,ghen:D.ghen[0]}}});
 ok(r.npc.made&&r.npc.sung===r.want.sung&&r.me.sung===r.want.sung,'riseCore: Sủng = BAL.ag.maid.rise b + regard / d for her and the NPC maid',r);
 ok(r.me.danh===r.want.danh&&r.me.bac>=r.want.bac&&r.npc.ghen===r.want.ghen&&(r.me.ghen===null||r.me.ghen===r.want.ghen),'riseCore: same Danh / Bạc gain and the same old-master jealousy (BAL.ag.maid.rise)',r);
 ok(!errs.length,'no page errors (promotion check)',errs.slice(0,3));await b.close();
 const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:'ALL PASS');process.exit(f?1:0)})();
