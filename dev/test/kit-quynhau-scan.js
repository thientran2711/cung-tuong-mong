/* E22h fix 2 family scan (law 11): every option text that names a liking change as «quý nhau ±N» / «quý … ±N» through the kit word mode (jk2b kitHint).
   Today jk2b's relation word list has «thân | thiện cảm | quý ngươi | quý ta», not «quý nhau» → the segment is dropped (a decline row reads «Tốn: không»).
   «after» = the same text with «quý nhau» read as a known relation word (simulated with «thiện cảm»): what the card shows once the KIT REQUEST
   (dev/kit/KIT_REQUESTS.md 20/11 E22t, MAIN kit keeper) is READY. KIT READY = review/kit-cost-rows-home 3332c63b (merged on -c by E22i): the NOW column names «quý nhau». Prints a before/after table; exit 0 always (a scan, not a gate).
   usage: node dev/test/kit-quynhau-scan.js [dev/index.html] */
const path=require('path'),fs=require('fs');const HTML=process.argv[2]||'dev/index.html';
(async()=>{
 const B=path.join(__dirname,'../build');const st=[];for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){fs.readFileSync(path.join(B,f),'utf8').split('\n').forEach((l,i)=>{if(/quý nhau/.test(l))st.push(`${f}:${i+1}`)})}
 console.log('static «quý nhau» lines: '+st.join(' ')+'  (j21:56 inviteBtn = pbtn/kitParse sub line, j55:68 / jpma:88 = result / log text: not the kit word mode)');
 const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const rows=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const rk=p=>p===S?S.rank:(p.queen?7:(p.rank||0));const V=liveRivals(true).filter(x=>x!==S&&!x.out&&!x.coop);const hi=V.find(v=>rk(v)>rk(S)),lo=V.find(v=>rk(v)<=rk(S))||null;const out=[];
  const H=(src,o)=>{const x=o.x||"",y=x.replace(/quý nhau/g,"thiện cảm");let h0="",h1="";try{h0=kitHint(o,null).hint;h1=kitHint(Object.assign({},o,{x:y}),null).hint}catch(e){h0="ERR "+e.message}
   out.push({src,x,before:h0,after:h1,lost:/quý nhau [+-]\d/.test(x)&&(!h0||/không được mất gì/.test(h0)||(/mất:[^·]*quý nhau -/.test(x)&&!/nhưng/.test(h0)))})};/* lost = the «quý nhau ±N» segment left no trace in the hint NOW (empty / «không được mất gì» / a decline loss without its «nhưng …» part). E22i: since KIT READY 3332c63b the kit has its own phrase triple for «quý nhau» (e.g. «hai bên thêm thân thiết», «hai bên sinh xa cách»), so NOW ≠ the simulated «thiện cảm» line is no loss */
  try{H("jrcv rcvNoO (receiver-choice decline, LIVE)",rcvNoO(hi||V[0],S,{g:"giữ thì giờ"}))}catch(e){out.push({src:"jrcv rcvNoO",x:"ERR "+e.message})}
  for(const [tag,a] of [["asker not bề trên",lo],["asker bề trên",hi]]){if(!a)continue;
   try{for(const o of pmPlayOpts(a,S,pmX(a,S,"play")))if(/quý nhau/.test(o.x||""))H(`jpma pmPlayOpts ${o.id||o.n} (${tag})`,o)}catch(e){out.push({src:"pmPlayOpts",x:"ERR "+e.message})}
   try{for(const o of pmDuelOpts(a,S,pmX(a,S,"duel",{s:"bac"})))if(/quý nhau/.test(o.x||""))H(`jpma pmDuelOpts ${o.id||o.n} (${tag})`,o)}catch(e){out.push({src:"pmDuelOpts",x:"ERR "+e.message})}}
  try{for(const o of talkOpts({kind:"rival",ref:hi||V[0]}).filter(o=>/quý nhau/.test(o.x||"")))H(`talkOpts ${o.n}`,o)}catch(e){out.push({src:"talkOpts",x:"ERR "+e.message})}
  return{out,lo:!!lo,hi:!!hi}});
 console.log(`askers: not bề trên ${rows.lo?'found':'NONE'}, bề trên ${rows.hi?'found':'NONE'}`);
 console.log('| option (source) | text | kit hint NOW | kit hint after KIT READY | segment lost now |\n|---|---|---|---|---|');
 for(const z of rows.out)console.log(`| ${z.src} | ${z.x} | ${z.before} | ${z.after} | ${z.lost?'YES':'no'} |`);
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
