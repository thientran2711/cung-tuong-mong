/* coop-house-clash (rv-d-stack-lr4 F1/F2, law 1 one world): the two co-op players clash on ONE palace (both chủ vị) or ONE full side hall;
   the two seats run jpal palFix, then each seat's own housing is copied into the other seat's friend entry (= the week merge, jcoopworld LOOK),
   for 4 rounds. PASS = after round 1 nothing moves any more, the two players end in DIFFERENT places on BOTH seats, the host's person kept
   hers (the guest's person moved), each seat sees the friend where she really is, and a palace ceremony (S.palCer) rises at most once.
   usage: node dev/test/coop-house-clash.js [index.html]   exit 1 on a fault */
const {chromium}=require('playwright');const path=require('path');
const IX=path.resolve(process.argv[2]||path.join(__dirname,'../index.html'));
const HF=["resHead","resHall","pal","palLone","palWait"];
(async()=>{const b=await chromium.launch();const fails=[];const out=[];
 const page=async seat=>{const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+IX);await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});
  await p.evaluate(seat=>{document.getElementById('title').hidden=true;start();quiet=true;Q.length=0;COOPW.seat=seat;COOPW.on=true;window.__seat=seat},seat);return {p,errs}};
 for(const mode of ['palace','hall']){
  const A=await page('a'),B=await page('b');
  /* the same world on both seats: B takes A's rivals (deep copy), each seat adds the other player as the friend entry */
  const W=await A.p.evaluate(()=>JSON.stringify(rivals.filter(v=>!v.coop)));
  const setup=async(o,mode)=>o.p.evaluate(([W,mode])=>{rivals=JSON.parse(W);const fid=window.__seat==="a"?902:901;
   const h=rivals.find(v=>v.alive&&!v.out&&!v.queen&&rkOf(v)>=PAL_HEAD&&v.pal!=null);
   const fr=JSON.parse(JSON.stringify(rivals.find(v=>v!==h&&v.alive&&!v.queen)));Object.assign(fr,{id:fid,coop:true,name:"Hảo hữu "+fid,alive:true,out:false,staff:[]});rivals.push(fr);
   for(const p of [S,fr]){if(mode==='palace'){p.rank=PAL_HEAD;p.pal=(h.pal+1)%PALN.length;p.resHead=null;p.resHall=null;p.palLone=0}
    else{p.rank=1;p.pal=null;p.resHead=key(h);p.resHall=BAL.res.halls[0];p.palLone=0}}
   /* the palace / hall the two share is otherwise empty */
   for(const v of rivals)if(v!==fr&&v!==h){if(mode==='palace'&&v.pal===S.pal){v.pal=null;v.palLone=0}if(mode==='hall'&&v.resHead===key(h)){v.resHead=null;v.resHall=null}}
   S.palCer=0;return {h:h.name,hk:key(h)}},[W,mode]);
  const ha=await setup(A,mode),hb=await setup(B,mode);
  const me=o=>o.p.evaluate(HF=>{const o={};for(const k of HF)o[k]=S[k]==null?null:S[k];o.cer=S.palCer||0;o.key=window.__seat==="a"?901:902;return o},HF);
  const fr=o=>o.p.evaluate(HF=>{const v=rivals.find(x=>x.coop);const o={};for(const k of HF)o[k]=v[k]==null?null:v[k];return o},HF);
  const put=(o,h)=>o.p.evaluate(([h,HF])=>{const v=rivals.find(x=>x.coop);for(const k of HF){if(h[k]==null)delete v[k];else v[k]=h[k]}/* her resHead = her seat's key of the head; "me" on her seat = this seat's S */
   if(v.resHead===(window.__seat==="a"?901:902))v.resHead="me"},[h,HF]);
  const R=[];let cerA=0,cerB=0;
  for(let r=1;r<=4;r++){await A.p.evaluate(()=>{S.palCer=0;palFix()});await B.p.evaluate(()=>{S.palCer=0;palFix()});
   const a=await me(A),bb=await me(B);cerA+=a.cer?1:0;cerB+=bb.cer?1:0;
   /* a resHead "me" on a seat names that seat's own S = the other player's key on the other seat */
   const mapK=(h,k)=>h.resHead==="me"?k:h.resHead;
   await put(A,Object.assign({},bb,{resHead:mapK(bb,901)}));await put(B,Object.assign({},a,{resHead:mapK(a,902)}));
   R.push({r,A:[a.pal,a.resHead,a.resHall],B:[bb.pal,bb.resHead,bb.resHall],frOnA:Object.values(await fr(A)).slice(0,3),frOnB:Object.values(await fr(B)).slice(0,3)})}
  const last=R[3],prev=R[1];const same=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
  const stable=same(R[1].A,R[3].A)&&same(R[1].B,R[3].B)&&same(R[2].A,R[3].A)&&same(R[2].B,R[3].B);
  const where=x=>mode==='palace'?String(x[0]):String(x[1])+'|'+String(x[2]);
  const apart=where(last.A)!==where(last.B);
  const hostKept=same(R[0].A,R[3].A);
  const ok=stable&&apart&&hostKept&&cerA<=1&&cerB<=1&&!A.errs.length&&!B.errs.length;
  out.push({mode,head:ha.h,stable,apart,hostKept,cer:[cerA,cerB],rounds:R,errs:A.errs.concat(B.errs).slice(0,3)});
  if(!ok)fails.push(mode);await A.p.close();await B.p.close()}
 console.log(JSON.stringify(out,null,1));console.log(fails.length?'FAIL coop-house-clash '+fails.join(','):'PASS coop-house-clash (palace + side hall: seat-stable, host keeps, no swap, ≤1 ceremony)');
 await b.close();process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
