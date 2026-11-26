/* contest-thitam-year (rv contest-thitam advisory): her nights in ONE in-game year, LIVE vs branch — the net effect of «first place ⇒ thị tẩm»
   (she gains her contest nights; NPC first places take those days' tối from everyone else). Robot = night-final helpers (T.drain takes the
   first road of every card: she enters every contest she is invited to), the live 10-night ledger ON, his visit as live.
   usage: node dev/test/contest-thitam-year.js <url> [lives=4] [tuần=36] → JSON {lives:[{nights, ctnMe, ctnNpc, wins}], mean} */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [,,URL,NL='4',NT='36']=process.argv;
const NF=fs.readFileSync(path.join(__dirname,'night-final.js'),'utf8');
const H=NF.slice(NF.indexOf('await p.evaluate(()=>{window.T=')+'await p.evaluate('.length,NF.indexOf('\n const R={};')).replace(/\);\s*$/,'');
(async()=>{const b=await chromium.launch();const lives=[];
 for(let i=0;i<+NL;i++){const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(1500);
  await p.evaluate(`(${H})()`);await p.evaluate(()=>{BAL.nt.on=true;BAL.visit.cap=T.vcap;BAL.ag.emp.custom=T.cu;
   /* the robot cannot play a contest mini-game: the mini-game is queued and ended right after the dialog that opened it, she is scored by the
      contest's own formula (mgRun7 fin(null) = the «not played» score); same on LIVE and branch */
   window.__mgq=[];startContest=o=>{__mgq.push(o)};const d0=T.drain;T.drain=m=>{let r=d0(m);for(let g=0;g<6&&__mgq.length;g++){while(__mgq.length){const o=__mgq.shift();try{o.onDone(null)}catch(e){console.error(e)}}S.mg=null;r=r.concat(d0(m))}return r};
   /* first places counted on BOTH builds (LIVE has no S.ctn): every j71 finish (cFin7) */
   window.__fp={me:0,npc:0,n:0};const c0=cFin7;cFin7=function(k,kind,L){try{if(L&&L[0]){__fp.n++;L[0].p===S?__fp.me++:__fp.npc++}}catch(e){}return c0.apply(this,arguments)};
   T.fresh();window.__yr={ctnMe:0,ctnNpc:0,seen:{}}});
  for(let d=0;d<+NT;d++){const dead=await p.evaluate(d=>{if(S.dead)return true;T.ch=["Thôi","Giữ chân Hoàng thượng","Tranh sủng"][d%3];T.toEvening();const c=S.ctn;
    if(c&&c.w===wk()&&!__yr.seen[c.w]){__yr.seen[c.w]=1;c.who==="me"?__yr.ctnMe++:__yr.ctnNpc++}T.endDay();return !!S.dead},d);if(dead)break}
  lives.push(await p.evaluate(()=>({nights:S.nights||0,ctnMe:__yr.ctnMe,ctnNpc:__yr.ctnNpc,wins:(S.j71&&S.j71.win)||0,contests:(S.j71&&S.j71.fn)||0,fpMe:__fp.me,fpNpc:__fp.npc,fpN:__fp.n,rank:S.rank,dead:!!S.dead})));
  console.error('life',i,JSON.stringify(lives[lives.length-1]));await ctx.close()}
 const m=k=>Math.round(lives.reduce((a,x)=>a+x[k],0)/lives.length*10)/10;
 const out={url:URL,tuan:+NT,lives,mean:{nights:m('nights'),ctnMe:m('ctnMe'),ctnNpc:m('ctnNpc'),wins:m('wins'),contests:m('contests'),fpMe:m('fpMe'),fpNpc:m('fpNpc')}};console.log(JSON.stringify(out));await b.close()})();
