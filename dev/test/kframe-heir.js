// review/fix-kframe-heir runtime probe: j8 kframe puts a Thái tử aside through the ONE j1 deposeHeir road: his mother (her AND an NPC, law 1)
// loses BAL.kid.heirDanh (law 4, probe values 10 / 7), S.heir cleared only when it is that son; kidDie the same; texts print what is applied.
// usage: node dev/test/kframe-heir.js [repo root, default ../..]
const path=require('path');const R=path.resolve(process.argv[2]||path.join(__dirname,'../..'));const {chromium}=require('playwright');const {serve,BASE}=require(R+'/dev/test/coop-serve.js');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  /* the probe harness: the act always lands, nobody is caught, no punishment noise (the Danh measured is kframeDanh + the deposition only) */
  window.__kf=(a,t,son,heir)=>{const c0=caught,r0=aRoll,p0=punish,e0=econPayWin;caught=()=>null;aRoll=()=>true;punish=()=>"";econPayWin=()=>0;
   try{for(const [k] of allKids())k.heir=false;S.heir=null;const m=t===S?null:t;if(heir===true)setHeir(son,m);
    const d0=t.danh;const txt=ACT.kframe.f(a,t).replace(/<[^>]+>/g,'');return{dd:t.danh-d0,txt,heirNull:S.heir===null,flag:son.heir}}
   finally{caught=c0;aRoll=r0;punish=p0;econPayWin=e0}}});
 for(const H of [10,7]){const r=await p.evaluate(H=>{const B0=BAL.kid.heirDanh;BAL.kid.heirDanh=H;const out={};try{
   const KD=BAL.eff.j8.kframeDanh,v=liveRivals(false).find(x=>x&&!x.coop&&x.alive),w=liveRivals(false).find(x=>x&&!x.coop&&x.alive&&x!==v);
   const mk=(m)=>{const k=mkKid('m',BAL.eff.j8.kframeAge+3);k.alive=true;m.kids=m.kids||[];m.kids.unshift(k);return k},rm=(m,k)=>m.kids.splice(m.kids.indexOf(k),1);
   S.danh=50;v.danh=50;w.danh=50;
   /* 1 NPC frames HER Thái tử */{const k=mk(S);const r=__kf(v,S,k,true);rm(S,k);out.herHeir={...r,want:KD-H}}
   /* 2 NPC frames her son who is NOT Thái tử */{const k=mk(S);const r=__kf(v,S,k,false);rm(S,k);out.herPlain={...r,want:KD}}
   /* 3 SHE frames an NPC's Thái tử (two-way) */{const k=mk(v);const r=__kf(S,v,k,true);rm(v,k);out.npcHeir={...r,want:KD-H,nm:v.name}}
   /* 4 an NPC frames another NPC's Thái tử */{const k=mk(v);const r=__kf(w,v,k,true);rm(v,k);out.npcNpc={...r,want:KD-H}}
   /* 5 stale flag: w's son flagged heir but S.heir is v's son → S.heir kept */{const kv=mk(v),kw=mk(w);for(const [k] of allKids())k.heir=false;setHeir(kv,v);kw.heir=true;
     const d0=w.danh;deposeHeir(kw,w);out.stale={kept:!!(S.heir&&S.heir.k===kv),dd:w.danh-d0,want:-H,flag:kw.heir};S.heir=null;kv.heir=false;rm(v,kv);rm(w,kw)}
   /* 6 kidDie: the heir dies → S.heir null; a stale-flag son dies → S.heir kept (no Danh: a death is not a deposition) */{const kv=mk(v),kw=mk(w);for(const [k] of allKids())k.heir=false;setHeir(kv,v);kw.heir=true;
     const d0=w.danh;kidDie(kw,"probe",false);const kept=!!(S.heir&&S.heir.k===kv);kidDie(kv,"probe",false);out.die={kept,cleared:S.heir===null,ddW:w.danh-d0};rm(v,kv);rm(w,kw)}
   /* 7 texts: j79 card (heir son) and j17 base print BAL.kid.heirDanh */{const k=mk(v);for(const [x] of allKids())x.heir=false;setHeir(k,v);J78.cardV=v;out.j79=(AOUT.kframe||[])[0]||'';J78.cardV=null;S.heir=null;k.heir=false;rm(v,k);
     const L=(()=>{const c=J78.cardV;J78.cardV=null;const t=(AOUT.kframe||[])[0]||'';J78.cardV=c;return t})();out.j17=L;out.sg=balSg(-H)}
  }finally{BAL.kid.heirDanh=B0}return out},H);
  ok(r.herHeir.dd===r.herHeir.want&&r.herHeir.heirNull&&!r.herHeir.flag&&r.herHeir.txt.includes('Danh ngươi '+(r.sg)),`heirDanh=${H} NPC frames her Thái tử: her Danh ${r.herHeir.dd} (= kframeDanh − heirDanh), S.heir cleared, text prints it`,r.herHeir);
  ok(r.herPlain.dd===r.herPlain.want&&!r.herPlain.txt.includes('phế'),`heirDanh=${H} her son not heir: only kframeDanh, no phế`,r.herPlain);
  ok(r.npcHeir.dd===r.npcHeir.want&&r.npcHeir.heirNull&&r.npcHeir.txt.includes('Danh '+r.npcHeir.nm+' '+r.sg),`heirDanh=${H} SHE frames an NPC's Thái tử: NPC mother Danh ${r.npcHeir.dd}, text prints it (law 1)`,r.npcHeir);
  ok(r.npcNpc.dd===r.npcNpc.want&&r.npcNpc.heirNull,`heirDanh=${H} NPC frames NPC Thái tử: mother Danh ${r.npcNpc.dd}`,r.npcNpc);
  ok(r.stale.kept&&!r.stale.flag,`heirDanh=${H} deposeHeir on a son who is not S.heir: S.heir kept`,r.stale);
  ok(r.die.kept&&r.die.cleared&&r.die.ddW===0,`heirDanh=${H} kidDie clears S.heir only when it is that son, no Danh`,r.die);
  ok(r.j79.includes('Danh nàng thêm '+r.sg)&&r.j17.includes('nàng Danh thêm '+r.sg),`heirDanh=${H} j79 card + j17 preview print −heirDanh`,{j79:r.j79,j17:r.j17})}
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();console.log(res.every(Boolean)?'PROBE PASS':'PROBE FAIL');process.exit(res.every(Boolean)?0:1)})();
