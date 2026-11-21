/* compose ui-tour-states PDF: TOC first, then one page per frame (Fold left, iPad right), same style as ui-tour.
   usage: node compose.js <shotsdir> <out.pdf> [maxPagesPerPart]   (shotsdir has fold/ and ipad/ with manifest*.json + jpgs)
   Images are recompressed (PIL, q55) into <shotsdir>/c/ first by compose.py. */
const fs=require('fs');const path=require('path');const {chromium}=require('playwright');
const [,,DIR,OUT,MAXP]=process.argv;
const man=d=>{let L=[];for(const f of fs.readdirSync(`${DIR}/${d}`).filter(f=>/^manifest.*\.json$/.test(f)).sort())L=L.concat(JSON.parse(fs.readFileSync(`${DIR}/${d}/${f}`,'utf8')));return L};
const ORDER=['tabs','queen','fac','q72','hon','night','dress','detail','mg','tut','cnv'];
const F=man('fold'),I=man('ipad');const key=x=>x.sec+'|'+(x.sec==='cnv'?x.title:x.title.replace(/«[^»]*»/g,'«»').replace(/\d+/g,'#'));
const tidy=t=>t.replace(/«([^»]*)»/g,(m,x)=>'«'+x.replace(/(Đang thỉnh tranh…)/g,'').replace(/(Nắm chắc|Rất chắc|Khá chắc|Chắc|Năm ăn năm thua|Khó|Liều|Tốn|TỐN|ⓘ).*$/,'').replace(/^(.+?)\1/,'$1').trim()+'»');
const pages=[];const seen={};const add=(x,dev)=>{const k=key(x);seen[k]=(seen[k]||0);let pg=pages.find(p=>p.k===k&&!p[dev]);if(!pg){pg={k,sec:x.sec,group:x.group,title:tidy(x.title)};pages.push(pg)}pg[dev]=x.id};
F.forEach(x=>add(x,'fold'));I.forEach(x=>add(x,'ipad'));
pages.sort((a,b)=>ORDER.indexOf(a.sec)-ORDER.indexOf(b.sec));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const img=(dev,id)=>id?`<img src="file://${path.resolve(DIR,'c',dev,id+'.jpg')}">`:`<div class="miss">không chụp được ở lượt này</div>`;
const CSS=`@page{size:1600px 1000px;margin:0}body{margin:0;font-family:'Noto Serif','DejaVu Serif',serif;background:#fbf6ec;color:#3a2a1a}
.pg{width:1600px;height:1000px;page-break-after:always;box-sizing:border-box;padding:18px 24px;display:flex;flex-direction:column}
.hd{display:flex;justify-content:space-between;align-items:baseline;font-size:20px;margin-bottom:10px}.hd b{font-size:24px}.hd i{color:#8a6a4a;font-size:16px}
.row{flex:1;display:flex;gap:16px;overflow:hidden;align-items:flex-start;justify-content:center;min-height:0}.cell{display:flex;flex-direction:column;align-items:center;min-height:0}
.cell span{font-size:15px;color:#7a5a3a;margin-bottom:4px}.f img{height:850px;width:auto;border:1px solid #c9b48f}.i img{width:860px;height:auto;border:1px solid #c9b48f}
.miss{width:600px;height:400px;display:flex;align-items:center;justify-content:center;border:1px dashed #b09070;color:#a08060;font-size:20px}
.toc{columns:2;column-gap:40px;font-size:14px;line-height:1.35}.toc h3{font-size:17px;margin:8px 0 2px;break-after:avoid}.toc div{break-inside:avoid}
h1{font-size:30px;margin:0 0 6px}p.s{margin:0 0 12px;font-size:16px;color:#6a4a2a}`;
(async()=>{const per=+(MAXP||9999);const parts=[];for(let i=0;i<pages.length;i+=per)parts.push(pages.slice(i,i+per));
 const b=await chromium.launch();
 for(let pi=0;pi<parts.length;pi++){const P=parts[pi];const base=pi*per;
  /* TOC pages: ~70 lines per page */
  const lines=[];let g='';P.forEach((p,i)=>{if(p.group!==g){g=p.group;lines.push(`<h3>${esc(g)}</h3>`)}lines.push(`<div>${base+i+1}. ${esc(p.title.replace(/^.*? · /,''))}</div>`)});
  const tocPer=110;const tocs=[];for(let i=0;i<lines.length;i+=tocPer)tocs.push(lines.slice(i,i+tocPer));
  let h=`<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>`;
  tocs.forEach((t,ti)=>{h+=`<div class="pg"><h1>Cung Tường Mộng — khung đầy đủ trạng thái${parts.length>1?` (phần ${pi+1}/${parts.length})`:''}</h1><p class="s">Mục lục ${ti+1}/${tocs.length} · ${P.length} trang · trái: Samsung Fold dọc 755×1000 · phải: iPad ngang 1180×820 · đời chơi được dựng sẵn (có phe, có con, phẩm cao…), không đổi mã game</p><div class="toc">${t.join('')}</div></div>`});
  P.forEach((p,i)=>{h+=`<div class="pg"><div class="hd"><b>${base+i+1}. ${esc(p.title.replace(/^.*? · /,''))}</b><i>${esc(p.group)}</i></div><div class="row"><div class="cell f"><span>Fold 755×1000</span>${img('fold',p.fold)}</div><div class="cell i"><span>iPad 1180×820</span>${img('ipad',p.ipad)}</div></div></div>`});
  h+='</body></html>';const hf=path.resolve(DIR,`compose-${pi+1}.html`);fs.writeFileSync(hf,h);
  const pg=await b.newPage();await pg.goto('file://'+hf,{waitUntil:'load'});const out=parts.length>1?OUT.replace(/\.pdf$/,`-part${pi+1}.pdf`):OUT;
  await pg.pdf({path:out,width:'1600px',height:'1000px',scale:1.5,printBackground:true});await pg.close();console.log(out,P.length,(fs.statSync(out).size/1e6).toFixed(1)+'MB')}
 fs.writeFileSync(path.resolve(DIR,'pages.json'),JSON.stringify(pages,null,0));await b.close()})();
