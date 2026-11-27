/* odds-offladder-scan (E-F4FAC, law 7 + law 4): every «khả năng: <word>» a player reads (event text, news, purge death text) must name the ONE
   ladder (KIT_ODDS, BAL.odds.cut) through word(o): «cơ may: Mong manh … Rất vững». Source scan of dev/build/j*.js (0 «khả năng:» templates)
   + the purge death text played (j3 emperorDies, heir's mother = a consort, roll forced to fail).
   The side-chance scale Rất thấp…Rất cao (chanceW, OD:L221/L228: status cells, Được/Mất/Kèm side chances) is NOT touched here; it is listed.
   usage: node dev/test/odds-offladder-scan.js [dev/index.html]  → exit 1 on a «khả năng:» template or an off-ladder purge text */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const HTML=process.argv[2]||'dev/index.html';
const dir=path.join(__dirname,'../build');let bad=0;const hits=[];let side=0;
for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f))){fs.readFileSync(path.join(dir,f),'utf8').split('\n').forEach((l,i)=>{if(/khả năng:/.test(l)&&!/^\s*(\/\*|\/\/)/.test(l)){hits.push(f+':'+(i+1));bad++}side+=(l.match(/chanceW\(|chanceLo\(/g)||[]).length})}
console.log('«khả năng:» templates in source:',hits.length,hits.join(' '));console.log('side-chance scale calls (chanceW/chanceLo, OD:L221, kept):',side);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;
  const out=[];const v=liveRivals(true).find(x=>x!==S&&!x.out);S.rank=3;S.heir={k:{name:"Hoàng tử thử",alive:true,sex:"m",age:12},v};v.alive=true;v.out=false;
  const D=window.die,O=window.over;let txt="";window.die=function(t){txt=t;throw new Error("DIED")};window.over=function(a,t){txt="OVER "+t;throw new Error("OVER")};
  const R0=Math.random;Math.random=()=>0.999;try{emperorDies("")}catch(e){}Math.random=R0;window.die=D;window.over=O;return txt});
 const ladder=/cơ may: (Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/;const ok=ladder.test(R)&&!/khả năng/.test(R);if(!ok)bad++;
 console.log('purge text:',R.slice(0,200),'=>',ok?'ladder word':'OFF-LADDER');console.log('page errors',errs.length);await b.close();process.exit(bad||errs.length?1:0)})();
