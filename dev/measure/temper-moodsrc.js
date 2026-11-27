/* TEMPER-OUTBURST-FIX family scan (law 3 + LUẬT SỬA CẢ NHÓM): every reader of HER mood bar must read the bar she sees (moodBar(S) = live causes
   summed) — never the raw S.mood.v, which lags the causes until the next sync. Each reader runs on a STALE state: causes sum to a low bar b < 0
   (anger), then raw S.mood.v is set to +40 (as between two syncs). A reader is OK when its text / number / effect follows b.
   usage: node dev/measure/temper-moodsrc.js [dev/index.html] → table, exit 1 on any reader that follows the raw number */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  for(const kd of ["s-gian1","s-gian2"])mkAdd(S,{kd,k:"gian",s:60,why:"bị làm nhục"},60);S.emo={k:"gian",v:80,why:"thử",w:wk()};
  const bar=()=>moodBar(S);const stale=()=>{const b=bar();S.mood.v=40;return b};const rows=[];const sg=v=>v>0?"+"+v:String(v);
  /* each reader: b = the shown bar right before it, raw S.mood.v = +40; want(b) / ok(got,b); readers that change the state run last */
  const row=(rd,where,fn,want,ok)=>{let got,b;try{b=stale();got=fn(b)}catch(e){got="ERR "+e.message}rows.push({rd,where,bar:b,raw:40,want:want(b),got:String(got).slice(0,90),ok:ok(got,b)})};
  const O=eaOpts(S,null,"gian")||[];const o=O[0];const rg=b=>Math.max(0,Math.min(BAL.mood.rest,BAL.mood.restCap-b));
  row("eaOptX row text","jemoact eaOptX",()=>eaOptX(S,o),()=>"«giải tỏa tâm trạng»",g=>/giải tỏa tâm trạng/.test(g)&&!/lòng vui lắng xuống/.test(g));
  row("band name","jmood mbBand()",()=>mbBand().name,b=>mbBand(b).name,(g,b)=>g===mbBand(b).name);
  row("mood panel (Tâm trạng · Ta)","jmood mbSecs",b=>{const h=JSON.stringify(mbSecs());return h.includes(" "+sg(b)+"\\u003c")||h.includes(" "+sg(b)+"<")||h.includes(" "+sg(b)+'"')?"shows "+sg(b):"shows raw "+(h.includes(" +40")?"+40":"?")},b=>"shows "+sg(b),(g,b)=>g==="shows "+sg(b));
  row("mood tile","jmood mbTile",()=>{const h=mbTile();return /Vui vẻ/.test(h)?"Vui vẻ":(h.match(/Bực dọc|Phiền muộn|U uất|Bình thản|Hân hoan/)||["?"])[0]},b=>mbBand(b).name,(g,b)=>g===mbBand(b).name);
  row("rest act gain text","jmood mbRestFix (restFix)",()=>{const a=restFix({n:"Nằm nghỉ",rest:"x",x:"",t:""});return (String(a&&a.x||"").match(/tâm trạng \+\d+/)||["none"])[0]},b=>rg(b)?"tâm trạng +"+rg(b):"none",(g,b)=>g===(rg(b)?"tâm trạng +"+rg(b):"none"));
  row("kit mood value (HUD)","jmood kitMoodVal",()=>kitMoodVal(),b=>String(b),(g,b)=>+g===b);
  row("her outburst group","jemoact eaMine",()=>eaMine().g,()=>"gian",g=>g==="gian");
  row("outburst line |bar|","jemoact eaTick / feelActTick gate",()=>typeof eaMV==="function"?Math.abs(eaMV()):Math.abs(S.mood.v),b=>String(Math.abs(b)),(g,b)=>+g===Math.abs(b));
  row("bar push saturation","jmood mbAdd(−10)",()=>mbAdd(-10,"thử","t"),()=>"saturated (|d| < 10)",g=>Math.abs(+g)<10);
  row("outburst vent (eaDo)","jemoact eaDo vent",b=>{eaDo(S,Object.assign({},o,{pv:1,fxPaid:1}));return bar()-b},()=>"bar up (+)",g=>+g>0);
  row("jfeel act vent (feelDo)","jfeel feelDo vent",b=>{const A=(typeof FEEL_ACTS!=="undefined"&&FEEL_ACTS)||null;if(typeof feelDo!=="function")return "n/a";const r0=eaOpts(S,"gian",null)||[];const r=r0.find(x=>x.jf)||r0[0];feelDo(S,Object.assign({},r,{pv:1,fxPaid:1}));return bar()-b},()=>"bar up (+)",g=>g==="n/a"||+g>0);
  return rows});
 console.log('| reader | code | bar | raw | wanted | got | ok |');console.log('|---|---|---|---|---|---|---|');for(const x of r)console.log(`| ${x.rd} | ${x.where} | ${x.bar} | ${x.raw} | ${x.want} | ${x.got} | ${x.ok?"OK":"WRONG"} |`);
 const bad=r.filter(x=>!x.ok).length;console.log(`readers ${r.length} · wrong ${bad} · page errors ${errs.length}`);await b.close();process.exit(bad||errs.length?1:0)})();
