/* review/reign-road-fix: before/after table for the "list of people" family. On one mid-game state it prints, for each place that joins several
   consort names in one line, the OLD join (every name) and the NEW kitNameList line. usage: node dev/test/unmet-list-family.js <url|file> */
const {chromium}=require('playwright');const path=require('path');const U=process.argv[2];const URL=/^https?:/.test(U)?U:'file://'+path.resolve(U);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL);await p.waitForFunction(()=>typeof rgMonth==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){start();if(S.ps&&S.origin.k!=='tt')break}Q.length=0;
  const L=liveRivals(true),o=[];const old=(A,f)=>A.map(f||(v=>v.name)).join(", ");const mk=(site,A,f)=>o.push({site,old:old(A,f),new:kitNameList(A,f)});
  rgW().ch=3;S.reign.side='emp';
  mk('j61/jreign Triều cục: Phe Hoàng thượng',rgMembers('emp'),v=>`${rkName(v)} ${v.name}`);mk('Triều cục: Phe quyền thần',rgMembers('quyen'),v=>`${rkName(v)} ${v.name}`);
  mk('j2/j10 Sổ thị tẩm',L,x=>`${x.name} ${x.nights} lần`);mk('j27 thiên điện (palace line)',L.slice(0,3));mk('j34 Ứng viên ghế phi',L.slice(0,4));
  mk('jgift dạo ngự hoa viên: thấy cả',L.slice(0,3));mk('jht kèm: cũng nhắm mối',L.slice(0,2));mk('jts Biếu quà làm lành',L.slice(0,2));mk('j42 Biết tư tình của',L.slice(0,2));
  return{o,unmet:L.filter(v=>!kitKnownName(v)).length,n:L.length}});
 console.log('consorts',R.n,'unmet by name',R.unmet);for(const x of R.o)console.log('\n'+x.site+'\n  BEFORE:',x.old.slice(0,170)+'\n  AFTER :',x.new.slice(0,170));console.log('\npage errors',errs.length);await b.close()})();
