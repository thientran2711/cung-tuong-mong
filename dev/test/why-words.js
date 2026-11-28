/* why-words.js (KIT-STAGE-R7, MAIN 167, law 11): every «Vì sao» line template (jwhyn whyText: WHY_STAT words × + / −, own-stat «thêm / bớt»,
   subjects Thái hậu / Hoàng thượng / a named consort / a masked «Một vị …») run through the on-screen word fixer j84 VP.fix → never a doubled
   phrase («thiện cảm thiện cảm +3»: the j84 «với ta +N → thiện cảm» rule hit the line that already says «thiện cảm với ta»), and the stat word
   stays. usage: node dev/test/why-words.js <index.html>  exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const path=require('path');const SRC=path.resolve(process.argv[2]);
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.VP&&typeof whyText==='function'&&typeof WHY_STAT==='object',null,{timeout:240000});
 const r=await p.evaluate(()=>{const DUP=/(?<![\p{L}])(\p{L}+ \p{L}+) \1(?![\p{L}])/u;const W=["Quý phi Diêu Uyển Thanh","Phi Mã Hàm Yên","Đáp ứng Tô Tuyết Kiến"/* names that trip VP QUICK → every rule runs */,"Thái hậu","Hoàng thượng","Một vị Quý nhân","Đêm thị tẩm"];const out=[];
  for(const w of W)for(const k of Object.keys(WHY_STAT))for(const n of [3,-2]){const own=k==="sung";const s=`${w}: tính Thật thà, trọng Lễ, hợp ý → ${WHY_STAT[k]} ${own?(n>0?"thêm ":"bớt "):(n>0?"+":"−")}${Math.abs(n)}`;
   const f=VP.fix(s);out.push({s,f,dup:DUP.test(f),lost:!f.includes(WHY_STAT[k].split(" ")[0])})}
  /* the same line SPLIT in two nodes (how the card can hold it): plain text nodes, and an element then a text node */
  const box=document.createElement('div');box.className='kitem';document.body.appendChild(box);
  for(const k of ['aff','th','hh']){const L=WHY_STAT[k].split(' với ');if(L.length<2)continue;
   for(const mode of ['text','span']){const d=document.createElement('span');d.className='ef n';if(mode==='text'){d.appendChild(document.createTextNode('Phi Mã Tuyết Kiến: tính Thật thà → '+L[0]));d.appendChild(document.createTextNode(' với '+L[1]+' +3'))}else{const e=document.createElement('b');e.textContent='tính Thật thà → '+L[0];d.appendChild(e);d.appendChild(document.createTextNode(' với '+L[1]+' +3'))}
    box.appendChild(d)}}
  VP.refresh();for(const d of box.children){const f=d.textContent.replace(/\s+/g,' ');out.push({s:'(split) '+d.innerHTML.slice(0,80),f,dup:DUP.test(f),lost:!/thiện cảm/.test(f)})}
  return out});
 const bad=r.filter(x=>x.dup||x.lost);console.log('templates',r.length,'bad',bad.length);for(const x of bad.slice(0,6))console.log('  ',x.s,'→',x.f);
 await b.close();console.log(bad.length?'WHY-WORDS FAIL':'WHY-WORDS PASS');process.exit(bad.length?1:0)})();
