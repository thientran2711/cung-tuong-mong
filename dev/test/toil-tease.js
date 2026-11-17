/* owner 17/11 06:30Z (toil-looks2): the rival-tease dialog = ONE reaction line, no numbers in the story text, replies that fit being mocked.
   usage: node dev/test/toil-tease.js <url> <WxH@dpr>   (exit 1 on a failed check) */
const {chromium}=require('playwright');const [,,URL,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const fails=[];const chk=(c,msg)=>{if(!c)fails.push(msg)};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&qOn()&&S.rank<7&&rivals.some(v=>!v.queen&&!v.out)))break}
 await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{const out=[];const v=rivals.find(v=>!v.queen&&!v.out);for(const mk of['vung','diem']){for(let i=0;i<12;i++){Q.length=0;TOIL_POP.length=0;/* makeup-lux: "diem" = the whole look's verdict (dress), on a Khuynh thành face */
   toilReact({k:'rival-tease',who:pv(v),host:v,v,n:-1,name:v.name,line:mk==='diem'?`thấy ta ăn vận ${TOIL_DV.diem}, nàng ta bớt ghen (Ghen -2)`:`thấy ta điểm trang ${toilMkW(mk)}, nàng ta bớt ghen (Ghen -2)`,ctx:mk==='diem'?{mk:'tuyet',dress:'diem'}:{mk,dress:'chinh'}});toilFlush();
   const q=Q[0];out.push({mk,h:q?q.h:'',opts:q?q.opts.map(o=>o.n):[]})}}
  Q.length=0;toilReact({k:'th-scold',who:pTH(),host:'th',n:-2,name:'Thái hậu',line:'x',ctx:{mk:'vung',dress:'chinh'}});toilFlush();out.push({mk:'th',h:Q[0]?Q[0].h:'',opts:Q[0]?Q[0].opts.map(o=>o.n):[]});return out});
 for(const r of R){if(r.mk==='th'){chk(r.opts.includes('Xin lỗi'),'a scolding from Thái hậu keeps Xin lỗi');continue}
  chk(!r.opts.includes('Xin lỗi'),'tease: no Xin lỗi');for(const n of['Cười cho qua','Đáp lại khéo','Đáp trả gay gắt','Im lặng lui đi'])chk(r.opts.includes(n),'tease has '+n);
  const ps=[...r.h.matchAll(/<p[^>]*>(.*?)<\/p>/g)].map(x=>x[1]);const story=ps[0]||'',why=ps[1]||'';
  chk(!/\d/.test(story),'no number in the story line: '+story);chk(!/bớt ghen \d|khúc khích.*cười khẩy|cười khẩy.*khúc khích/.test(why+story),'one reaction line only');
  chk(!/che miệng cười[^.]*của ta: bớt/.test(why),'no mechanic phrase in the story');
  const gest=(why.match(/ — /g)||[]).length;chk(gest===0||!/[”"]\s*[A-ZÀ-Ỹ][^”"]*[.!…]\s*$/.test(story),'second gesture on a line that has its own: '+why)}
 chk(!errs.length,'page errors '+errs.join('|'));console.log(JSON.stringify({n:R.length,fails,errs}));await b.close();process.exit(fails.length?1:0)})();
