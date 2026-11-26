/* contest-thitam-year (rv contest-thitam advisory): her nights in ONE in-game year, LIVE vs branch — the net effect of «first place ⇒ thị tẩm»
   (she gains her contest nights; NPC first places take those days' tối from everyone else). Robot = night-final helpers (T.drain takes the
   first road of every card: she enters every contest she is invited to), the live 10-night ledger ON, his visit as live.
   usage: node dev/test/contest-thitam-year.js <url> [lives=4] [tuần=36] → JSON {lives:[{nights, ctnMe, ctnNpc, wins}], mean} */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,NL='4',NT='36']=process.argv;
const NF=fs.readFileSync(path.join(__dirname,'night-final.js'),'utf8');
const H=NF.slice(NF.indexOf('await p.evaluate(()=>{window.T=')+'await p.evaluate('.length,NF.indexOf('\n const R={};')).replace(/\);\s*$/,'');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(`(${H})()`);await p.evaluate(()=>{BAL.nt.on=true;BAL.visit.cap=T.vcap;BAL.ag.emp.custom=T.cu});
 const lives=[];for(let i=0;i<+NL;i++){lives.push(await p.evaluate(n=>{T.fresh();let ctnMe=0,ctnNpc=0;const seen=new Set();
   for(let d=0;d<n&&!S.dead;d++){T.ch=["Thôi","Giữ chân Hoàng thượng","Tranh sủng"][d%3];T.toEvening();const c=S.ctn;if(c&&c.w===wk()&&!seen.has(c.w)){seen.add(c.w);c.who==="me"?ctnMe++:ctnNpc++}T.endDay()}
   return{nights:S.nights||0,ctnMe,ctnNpc,wins:(S.j71&&S.j71.win)||0,contests:(S.j71&&S.j71.fn)||0,rank:S.rank,dead:!!S.dead}},+NT))}
 const m=k=>Math.round(lives.reduce((a,x)=>a+x[k],0)/lives.length*10)/10;
 const out={url:URL,tuan:+NT,lives,mean:{nights:m('nights'),ctnMe:m('ctnMe'),ctnNpc:m('ctnNpc'),wins:m('wins'),contests:m('contests')}};console.log(JSON.stringify(out));await b.close()})();
