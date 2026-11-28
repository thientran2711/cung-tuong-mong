/* nroadhp-vp (QUESTLINE Q2): VANPHONG scan of every player-visible string jnroadhp.js can print — the 9 chapter-end lines (help/mách tin/betray ×
   win/draw/loss), the finale reward line (every rank tier), the strike-back line (every carrier), the Mệnh truyện «Phụ tuyến» pane and gloss:
   no %, no machine marks (T3/1, {token}, =>, undefined, NaN), no foreign or modern words (VANPHONG §3), no "…" cut text.
   usage: node dev/test/nroadhp-vp.js <url> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL=process.argv[2]||'http://127.0.0.1:8731/index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof nhHp==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{quiet=true;start();quiet=false;Q.length=0;const T=[];const v=liveRivals(false).find(x=>!x.queen),w=liveRivals(false).find(x=>x!==v&&!x.queen);
  for(const s of[1,2,-1])for(const k of[1,0,-1])for(const he of['nàng','hắn'])for(const t of['','Thầy giáo trong cung'])T.push(nhRes(s,k,he,t));
  v.nr=null;nrInit(v);const N=v.nr;N.hpk='rv:'+v.id;N.hpa=['rv',v.id];N.hp=[[N.n,1,S.turn]];
  for(const rk of[0,2,4,6]){S.rank=rk;T.push(nhFin(N,v.name).join(' '))}
  {w.nr=null;nrInit(w);if(w.nr){w.nr.x=0;T.push(nhTip(q72A('rv',w.id),v));w.nr.x=1;T.push(nhTip(q72A('rv',w.id),v))}N.hp.push([N.n,2,S.turn])}
  const NHQ0=[];const sav=S.logs.length;for(const by of[['eye',''],['srv','Tiểu Thúy'],['sell','Tiểu Lan'],['riv',w.name]]){N.sb={t:0,n:N.n,m:0,k:0,b:['rv',w.id],bn:w.name};nhStrike(v,v.name,N,N.sb,by)}
  nhFlush();T.push(...S.logs.slice(0,8).map(String));
  N.fin=1;nhSnap(N,v,v.name);KTSUB.story='pt';T.push(ktStoryHTML());T.push(KIT_GLOSS['Phụ tuyến']);
  const txt=T.map(x=>String(x).replace(/<[^>]+>/g,' ').replace(/\s+/g,' '));
  const BAN=[/%/,/\bT\d+\/\d+\b/,/[{}]|=>|\$\{|undefined|NaN|null/,/\b(OK|buff|stat|level|combo|random|bot|test|game|click|tab|slot)\b/i,/điểm|chỉ số|cơ hội|kiểm tra|dữ liệu|hệ thống|phiên bản/i,/…|\.\.\./,/Tuyến truyện/];
  const bad=[];for(const s of txt)for(const re of BAN)if(re.test(s.replace(/T\d+\/\d+ (thượng|trung|hạ) tuần/g,'')))bad.push(re+' :: '+s.slice(0,200));
  return{n:txt.length,bad,ex:txt.slice(0,3).concat(txt.slice(24,30))}});
 console.log('strings',r.n);r.ex.forEach(x=>console.log('  ',x.slice(0,220)));r.bad.forEach(x=>console.log('BAD',x));console.log('page errors:',errs.length,errs.slice(0,3).join(' | '));
 const F=r.bad.length+errs.length;console.log(F?`NROADHP-VP FAIL (${F})`:`NROADHP-VP PASS (${r.n} strings)`);await b.close();process.exit(F?1:0)})();
