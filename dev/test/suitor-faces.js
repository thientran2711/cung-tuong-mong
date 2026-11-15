/* suitor faces (coordinator 15/11): with the suitor pool filled far past the old 10 faces, every suitor and the Bắc Địch prince must get a
   real portrait (no initials), no face shared by two live suitors, and the Bắc Địch prince always bacdich-1.
   usage: NODE_PATH=$(npm root -g) node dev/test/suitor-faces.js <url> */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(process.argv[2]);await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2000);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 await p.waitForTimeout(6000);
 const r=await p.evaluate(()=>{const P=h54Pool();while(P.length<18)h54NewSon();P.forEach(s=>{s.kn=1});
  const rows=P.map(s=>{const f=h54Face(s);return{n:s.name,cf:s.cf||'',src:(f.src||'').split('/').pop(),known:!!s.kn}});
  const bd={name:"Thế tử Bắc Địch",house:"Bắc Địch",off:"Khả hãn Bắc Địch",tier:0,age:20,fid:"",kn:1};const fb=h54Face(bd);
  const cf=rows.map(x=>x.cf).filter(Boolean);return{n:rows.length,noSrc:rows.filter(x=>!x.src).length,unknown:rows.filter(x=>x.known===false).length,dupFaces:cf.length-new Set(cf).size,bacdichInPool:cf.includes('bacdich-1'),prince:{cf:bd.cf,src:(fb.src||'').split('/').pop()},sample:rows.slice(0,4)}});
 console.log(JSON.stringify({...r,errs:[...new Set(errs)]},null,1));await b.close()})();
