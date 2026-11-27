/* E90 news-runner-lines: ONE sentence per runner news item.
   node dev/test/news-runner-lines.js [dev/index.html]
   Drives every errand runner kind that can land (listen / scout / invite / spy, each ok / fail / target gone), reads the notice text + the «tin» panel facts
   and asserts: no repeated «<name> <verb>», no «· thành»/«· hỏng» inside a sentence, no doubled «trở về», the result is its own sentence. Also the
   composer (PTIME.repFacts) over every rep.t template of the ptReg runners. */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
function bad(s,nm){const o=[];const t=String(s);
 if(/· (thành|hỏng)/.test(t))o.push("tag glued");
 if(/trở về[^.]*trở về/.test(t))o.push("doubled trở về");
 /* a sentence never carries the same «name + verb» twice, and no sentence is told twice (two different reports by the same person, «X báo: …» «X báo: …», are fine) */
 const ss=t.split(/(?<=[.!?)]) /).map(x=>x.trim());const seen={};for(const x of ss){if(seen[x])o.push("sentence twice: "+x);seen[x]=1;
  if(nm){const re=new RegExp(nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+" ([^ ,:.]+ ){0,2}","g");const m=x.match(re)||[];const q={};for(const y of m){const k=y.trim();if(q[k])o.push("repeat in sentence: "+k);q[k]=1}}}
 return o}
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
 const R=await p.evaluate(()=>{const o={rows:[]};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}
  window.__bot=1;Q.length=0;S.mg=0;o.nm=S.maid.name;
  const v=liveRivals(true).find(x=>x&&x.alive&&!x.out&&!x.confined);o.v=v.name;
  const land=(kind,a,lbl)=>{const t=ptSend({who:"mm:me",nm:S.maid.name,kind,lbl,a:Object.assign({sid:null},a),place:"cnh"});t.due=ptNow();ptTick();return t};
  const grab=(id,t)=>{const n=kitNoticeList().find(x=>x.id==="pt:back:"+t.id);const pn=ptPanel?null:null;return n?String(n.text||n.line):""};
  const cases=[["listen","ok",{},"đi nghe ngóng",()=>{spyListen.ok=true}],["listen","ok2",{},"đi nghe ngóng"],["scout","ok",{v:v.id,o:100},"đi dò nơi ở"],["scout","fail",{v:v.id,o:0},"đi dò nơi ở"],
   ["invite","ok",{v:v.id,o:100},"đi đưa lời mời"],["invite","fail",{v:v.id,o:0},"đi đưa lời mời"],["spy","ok",{v:v.id},"đi dò la"]];
  for(const [k,tag,a,lbl] of cases){try{const t=land(k,a,lbl);o.rows.push({k,tag,text:grab(0,t),rep:t.rep})}catch(e){o.rows.push({k,tag,err:String(e)})}}
  /* target gone */
  for(const k of ["scout","invite","spy"]){const w=liveRivals(true).find(x=>x&&x.alive&&x!==v);if(!w)continue;const id=w.id;w.alive=false;try{const t=land(k,{v:id,o:100},"đi");o.rows.push({k,tag:"gone",text:grab(0,t),rep:t.rep})}catch(e){o.rows.push({k,tag:"gone",err:String(e)})}w.alive=true}
  /* the composer over every rep.t template of the ptReg runners (source scan: «X … trở về» heads), with a body that repeats the subject */
  const nm="Tịch Nguyệt";o.comp=[];
  const heads=[`${nm} nghe ngóng trở về`,`${nm} dò la Hoàn Y trở về`,`${nm} dò nơi ở Hoàn Y trở về`,`${nm} mời Hoàn Y trở về`,`${nm} sang cung Hoàn Y trở về`,`${nm} mang quà sang cung Hoàn Y trở về`,`${nm} lén mua đồ trở về`];
  for(const h of heads)for(const okv of [true,false,null])for(const L of [[`${nm} nghe ngóng trở về: ${nm} nghe ngóng được về Hoàn Y (hay gây chuyện): nàng ta mới nhận lễ.`],[`${nm} báo: Hoàn Y đang ở Ngự hoa viên.`],[`Hoàn Y từ chối lời mời.`],[]])
   o.comp.push({h,ok:okv,L,out:PTIME.repText({t:h,ok:okv,L},nm),f:PTIME.repFacts({t:h,ok:okv,L},nm)});
  return o});
 const nm=R.nm;
 ok(R.rows.length>=7,"every kind drove",R.rows.map(r=>r.k+":"+r.tag));
 for(const r of R.rows){ok(!r.err,`${r.k}/${r.tag} no error`,r.err);const t=r.text||"";const B=bad(t,nm);ok(!B.length,`${r.k}/${r.tag} one sentence`,{t,B})}
 for(const c of R.comp){const B=bad(c.out,nm);const n=(c.out.match(/\. |\.$/g)||[]).length;ok(!B.length&&c.f.k===(c.ok===true?"Việc thành.":c.ok===false?"Việc hỏng.":""),`composer ${c.h.slice(0,28)} ok=${c.ok}`,B.length?{out:c.out,B}:undefined)}
 /* the ONE example of the owner */
 const ex=R.comp.find(c=>/nghe ngóng trở về$/.test(c.h)&&c.ok===true&&/trở về: /.test(c.L[0]||""));ok(ex&&ex.out==="Tịch Nguyệt nghe ngóng được về Hoàn Y (hay gây chuyện): nàng ta mới nhận lễ. Việc thành.","owner example reads once",ex&&ex.out);
 ok(errs.length===0,"no page errors",errs.slice(0,3));
 await b.close();process.exit(res.every(x=>x)?0:1)})();
