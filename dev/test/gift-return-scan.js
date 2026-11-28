/* gift-return-scan (d19-gift-npc, law 11 family scan for «NPC randomly returns the gift» + OPEN «d19 bớt oán 5 has no effect»):
   every gift road that hands ONE piece to a person (player→NPC item / work via giveTo, NPC→NPC item / work, Biếu quà làm lành piece for
   her (tsGiftPieceGo, also the co-op giver's intent) and for an NPC (tsNpcGift)) is run twice with the receiver's answer forced
   (jrcv rcvPick «gift»: «take» = Nhận, «back» = Trả lại quà, OD 18/11 ~21:15Z). Per road it measures: did the piece leave / come home
   (law 6c), the receiver's liking of the giver, the oán eased, and whether the result line promises an ease that did not happen.
   A returned piece that still buys liking or eases oán, a piece that vanishes, or a «bớt oán N» line larger than the real ease = FAIL.
   usage: node dev/test/gift-return-scan.js [root] [out.md]      (root = a built site, default this repo)   exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
(async()=>{const root=path.resolve(process.argv[2]||path.join(__dirname,'../..'));const outMd=process.argv[3]||'';
 const srv=await D.serveRoot(root);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0});await p.waitForTimeout(3000);
 const R=await g.evaluate(()=>{const out=[];try{Q.length=0;if(BAL.dis)BAL.dis.refuse=0;/* the jdis «she dislikes it» refusal is its own rule (d19-gift.js) */
  const F={};const p0=rcvPick;rcvPick=function(t,a,O,k){if(k==="gift"&&F.a){const o=(O||[]).find(x=>x&&x.id===F.a);if(o)return o}return p0.apply(this,arguments)};
  const L=rivals.filter(x=>x.alive!==false&&!x.out&&!x.queen&&!traitsOf(x).includes("Kiêu ngạo")&&!traitsOf(x).includes("Tham vọng"));
  const item=v=>Object.keys(IT).find(k=>Array.isArray(IT[k].tg)&&IT[k].tg.includes("rv")&&IT[k].pr>=20&&IT[k].pr<=80&&!IT[k].il&&!IT[k].keep&&!IT[k].nt&&(!v||tsGiftWorth({k},v,S).ok));
  const work=n=>({k:"tp",wk:{kind:"theu",a:"hoa",ti:2,q:6,n,m:1,bn:"ngươi",d:"x",lv:2}});
  const setGrudge=(v,a)=>{SP_OFF++;try{oanAdd(v,a,-200);oanAdd(v,a,30);if(a===S)v.ghen=40}finally{SP_OFF--}};
  const cnt=(who,e)=>(who.inv||[]).filter(x=>x&&(e.wk?x.wk&&x.wk.n===e.wk.n:x.k===e.k&&!x.wk)).length,has=(who,e)=>cnt(who,e)>0;/* the piece itself, not chest size (a khắc spent can pass a buổi and add other things) */
  /* one road: give(giver, receiver, entry) → the line; returns the row */
  const road=(name,giver,recv,mk,give)=>{for(const ans of ["take","back"]){F.a=ans;const e=mk();giver.inv=(giver.inv||[]).filter(x=>x.h);giver.inv.push(e);setGrudge(recv,giver);
    const a0=aff(recv,giver),o0=oan(recv,giver),gi0=cnt(giver,e),ri0=cnt(recv,e);let line="";try{line=plain(give(giver,recv,giver.inv.length-1)||"")}catch(x){line="ERR "+x}
    const said=+((/bớt oán (\d+)/.exec(line)||[])[1]||0);
    out.push({road:name,ans,left:gi0-cnt(giver,e),home:has(giver,e),got:cnt(recv,e)-ri0,aff:aff(recv,giver)-a0,oan:o0-oan(recv,giver),said,line:line.slice(0,170)})}};
  const [v1,v2,v3]=L;const vW=L.find(v=>v!==v1&&v!==v2&&v!==v3&&tsGiftWorth(work("x"),v,S).ok)||L.find(v=>v!==v1&&v!==v2&&v!==v3)||v1;
  const npcItem=(a,v)=>Object.keys(IT).find(k=>{const w=tsGiftWorth({k},v,a);return w.ok&&w.bac<=BAL.tsGift.bac});const logLine=f=>(a,r,i)=>{const n=S.logs.length;f(a,r,i);return S.logs.length>n?S.logs[0]:""};
  road("player→NPC item (giveTo: Tặng quà / gift pick / servant)",S,v1,()=>({k:item()}),(a,r,i)=>giveTo(a,r,i));
  road("player→NPC work (giveTo → wkGive)",S,v1,()=>work("Khăn thử A"),(a,r,i)=>giveTo(a,r,i));
  road("NPC→NPC item (giveTo: j8 day / cx:gift / jveil)",v2,v3,()=>({k:item()}),(a,r,i)=>giveTo(a,r,i));
  road("NPC→NPC work (giveTo → wkGive)",v2,v3,()=>work("Khăn thử B"),(a,r,i)=>giveTo(a,r,i));
  road("Biếu quà làm lành · item (tsGiftPieceGo; co-op giver = same fn)",S,v1,()=>({k:item(v1)}),logLine((a,r,i)=>tsGiftPieceGo(r,i)));
  road("Biếu quà làm lành · work (tsGiftPieceGo)",S,vW,()=>work("Khăn thử C"),logLine((a,r,i)=>tsGiftPieceGo(r,i)));
  road("NPC Biếu quà làm lành · piece (tsNpcGift, no bạc)",v2,v3,()=>({k:npcItem(v2,v3)}),(a,r)=>{a.bac=0;return tsNpcGift(a,{top:[{v:r,q:.3,b:2}],n:30,unk:0})});
  /* «bớt oán» when the grudge is already 0 (OPEN item) */
  {F.a="take";const e={k:item(v1)};S.inv.push(e);SP_OFF++;try{oanAdd(v1,S,-200);v1.ghen=40}finally{SP_OFF--}const o0=oan(v1,S);const n=S.logs.length;tsGiftPieceGo(v1,S.inv.length-1);const line=S.logs.length>n?plain(S.logs[0]):"";
   out.push({road:"Biếu quà làm lành · item, oán already 0",ans:"take",left:1,home:false,got:1,aff:0,oan:o0-oan(v1,S),said:+((/bớt oán (\d+)/.exec(line)||[])[1]||0),line:line.slice(0,170)})}
  rcvPick=p0}catch(e){out.push({err:String(e.stack||e)})}return out});
 const F=[];const rows=['| Road | Receiver | Piece left giver | Piece home | Receiver got it | Liking Δ | Oán eased (real) | «bớt oán N» in line | Verdict |','|---|---|---|---|---|---|---|---|---|'];
 for(const r of R){if(r.err){F.push(r.err);continue}const bad=[];
  if(r.ans==="back"){if(!r.home)bad.push("piece lost");if(r.got)bad.push("receiver kept it");if(r.aff>0)bad.push("liking bought");if(r.oan>0)bad.push("oán eased");if(/bớt oán|bớt ghen|Được:/.test(r.line))bad.push("line claims an ease")}
  else{if(r.left!==1||r.got!==1)bad.push("piece not moved")}
  if(r.said>0&&r.said>r.oan)bad.push(`line says bớt oán ${r.said} > real ${r.oan}`);
  if(bad.length)F.push(`${r.road} [${r.ans}]: ${bad.join(", ")}`);
  rows.push(`| ${r.road} | ${r.ans==="take"?"Nhận":"Trả lại quà"} | ${r.left} | ${r.home?"yes":"no"} | ${r.got} | ${r.aff} | ${r.oan} | ${r.said||"—"} | ${bad.length?"FAIL: "+bad.join(", "):"ok"} |`)}
 const md=rows.join('\n')+'\n';if(outMd)fs.writeFileSync(outMd,md);console.log(md);for(const r of R)if(r.line)console.log(`${r.road} [${r.ans}] → ${r.line}`);
 if(errs.length)F.push('page errors: '+errs.join(' | '));
 console.log(F.length?`GIFT-RETURN-SCAN FAIL ${F.length}:\n - `+F.join('\n - '):'GIFT-RETURN-SCAN PASS');await b.close();srv.close();process.exit(F.length?1:0)})();
