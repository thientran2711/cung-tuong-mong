// review/j51-heir-danh runtime probe: the heir texts print the BAL number the rule applies (law 4). usage: node dev/test/j51-heir-danh.js [repo root, default ../..]
const path=require('path');const R=path.resolve(process.argv[2]||path.join(__dirname,'../..'));const {chromium}=require('playwright');const {serve,BASE}=require(R+'/dev/test/coop-serve.js');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
 for(const H of [10,7]){const r=await p.evaluate(H=>{const B0=BAL.kid.heirDanh;BAL.kid.heirDanh=H;const nw=npcWhy,np=npwPick;try{
   S.danh=50;S.heir=null;for(const [k] of allKids())k.heir=false;const son=mkKid('m',9);son.alive=true;S.kids=S.kids||[];S.kids.push(son);
   npcWhy=()=>true;npwPick=c=>c.find(x=>!x.v&&x.k===son)||c[0];const d0=S.danh;const t=heirMonth()||'';const dd=S.danh-d0;
   const plain=t.replace(/<[^>]+>/g,'');S.kids.splice(S.kids.indexOf(son),1);S.heir=null;son.heir=false;const m=plain.match(/làm Thái tử[^.]*\)?\. Danh [+-]\d+\./);return{plain:m?m[0].slice(-40):plain.slice(0,200),dd,want:balSg(H)}}finally{npcWhy=nw;npwPick=np;BAL.kid.heirDanh=B0}},H);
  ok(r.plain.includes('Danh '+r.want+'.')&&r.dd===H,`j51 heirMonth (heirDanh=${H}): text prints Danh ${r.want} and the rule applies ${H}`,r)}
 for(const D of [-10,-7]){const r=await p.evaluate(D=>{const B0=BAL.eff.j8.kframeDanh;BAL.eff.j8.kframeDanh=D;try{const v=liveRivals(false).find(x=>x&&!x.coop);v.kids=v.kids||[];const k=mkKid('m',8);k.alive=true;v.kids.push(k);
   J78.cardV=v;const t=(AOUT.kframe||[])[0]||'';v.kids.splice(v.kids.indexOf(k),1);J78.cardV=null;return{t,want:'Danh nàng '+balSg(D),fond:balSg(-BAL.eff.j8.fondF)}}finally{BAL.eff.j8.kframeDanh=B0}},D);
  ok(r.t.includes(r.want)&&r.t.includes(r.fond),`j79 kframe outcome (kframeDanh=${D}) prints the BAL numbers`,r)}
 {const r=await p.evaluate(()=>{S.danh=50;S.heir=null;for(const [k] of allKids())k.heir=false;const a=mkKid('m',9),c=mkKid('m',8);a.alive=c.alive=true;S.kids.push(a,c);
   let d0=S.danh;setHeir(a,null);const dd1=S.danh-d0;d0=S.danh;setHeir(c,null);const dd2=S.danh-d0;S.kids.splice(S.kids.indexOf(a),1);S.kids.splice(S.kids.indexOf(c),1);S.heir=null;return{dd1,dd2,H:BAL.kid.heirDanh}});
  ok(r.dd1===r.H&&r.dd2===0,'j97/jend14 delta: a new heir son = +heirDanh, swapping between her own sons = 0 (nothing printed)',r)}
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();console.log(res.every(Boolean)?'PROBE PASS':'PROBE FAIL');process.exit(res.every(Boolean)?0:1)})();
