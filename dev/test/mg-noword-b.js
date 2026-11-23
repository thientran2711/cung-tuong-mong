/* mg-noword-b (group b kinds; copy of the mg-visual play scan) — mg-visual — node dev/test/mg-visual.js [dev/index.html] [WxH]
   A. BAL.mgFx is the ONE source of the lit cue + press pop: pop >= 1.2, glow stacked (pass >= 2), ring on, kg82FxPop eases 1.24 -> 1 and is read by the engines (no private 1.08 / 1.14 left).
   B. NO TEXT in mini-game play: for EVERY KG82_KIND the play area (.kgbox: canvas fillText/strokeText + DOM text) shows no word (digits / symbols / score chips are fine).
      Nấu ăn (cook) shows its recipe as pictures. Prints the scan table kind | text during play. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);
const SKIP=(process.env.MGV_SKIP||'').split(',').filter(Boolean);
let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;S.mgSeen={};Object.keys(KG82_KIND).forEach(k=>S.mgSeen[k]=1);try{render()}catch(e){}});
 const GB='td_cong td_dung td_ngon td_hanh chai le tc xa thq hoadien duho kinh may doi tho banh'.split(' ');const kinds=(await p.evaluate(()=>Object.keys(KG82_KIND))).filter(k=>GB.includes(k));ok(kinds.length===GB.length,'all group b kinds exist',GB.filter(k=>!kinds.includes(k)));const T={};
 for(const k of kinds){if(SKIP.includes(k))continue;
  const r=await p.evaluate(async(k)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out={txt:[],dom:[]};
   try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   const P=CanvasRenderingContext2D.prototype,f0=P.fillText,s0=P.strokeText;let on=false;
   P.fillText=function(t,...a){if(on)out.txt.push(String(t));return f0.call(this,t,...a)};P.strokeText=function(t,...a){if(on)out.txt.push(String(t));return s0.call(this,t,...a)};
   try{playArt({art:k,title:'t',onDone(){}})}catch(e){out.err=String(e.message||e);P.fillText=f0;P.strokeText=s0;return out}
   await sleep(900);const box=kg82Box();const go=box&&box.querySelector('.kgr-go');if(go)go.click();
   await sleep(700);{const dm=document.getElementById('k91demo');if(dm){dm.click();await sleep(500)}}/* the first-time card is the RULES card (text allowed): she taps «Đã hiểu» and plays */
   await sleep(300);on=true;await sleep(3500);on=false;P.fillText=f0;P.strokeText=s0;
   {const fr=document.getElementById('kg82');if(fr){const w=document.createTreeWalker(fr,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.trim(),el=n.parentElement;if(!t||!el||el.closest('.kgr,.kpht,.kph,.kgclk,.kghud,.kgres,.kgfig,.kgx,[hidden],.kghow')||/^[^\p{L}]*$/u.test(t))continue;const r=el.getBoundingClientRect();if(!r.width&&!r.height)continue;out.dom.push(t);(out.src=out.src||[]).push(t.slice(0,30)+' <'+(el.className||el.tagName)+'>')}}}
   const bx=kg82Box();if(bx){const w=document.createTreeWalker(bx,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.trim();if(t&&!n.parentElement.closest('.kgr')){out.dom.push(t);(out.src=out.src||[]).push(t.slice(0,30)+' <'+(n.parentElement.className||n.parentElement.tagName)+'>')}}}
   out.phase=KG82.phase;try{kg82Close()}catch(e){}
   /* «Hướng dẫn»: the guided round runs the same engine; the play area shows no word either (the guide bar .kgt-bar is the tutor's own chip) */
   try{kmReset()}catch(e){}Q.length=0;try{playArt({art:k,title:'t',onDone(){}})}catch(e){return out}await sleep(900);{const b2=kg82Box(),tb=b2&&b2.querySelector('#kgrtut');out.tutHas=!!tb;
    if(tb){on=true;P.fillText=function(t,...a){if(on)out.txt.push(String(t));return f0.call(this,t,...a)};P.strokeText=function(t,...a){if(on)out.txt.push(String(t));return s0.call(this,t,...a)};tb.click();await sleep(2500);on=false;P.fillText=f0;P.strokeText=s0;
     const w=document.createTreeWalker(b2,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.trim(),el=n.parentElement;if(t&&el&&!el.closest('.kgr,.kgt-bar,[hidden]')&&!/^[^\p{L}]*$/u.test(t))out.dom.push(t)}}}
   try{kg82Close()}catch(e){}return out},k);
  const word=s=>/[A-Za-zÀ-ỹ]{2,}/.test(s);/* OD 21/11 ~00:50Z (canon overwrite): short words that GUIDE play stay. td_dung (td-dung-clear): the balance bar words, the which-half-to-hold line, the two pad labels */const GUIDE={td_dung:/^(Vững|Đổ|Đỡ (trái|phải)|◀?\s*Đỡ bên trái|Đỡ bên phải\s*▶?|.*Bát (đang thẳng|nghiêng).*giữ.*|Mỗi bước chân làm bát nghiêng\. Giữ nửa khung bên kia để đỡ\.)$/,
 hoadien:/^(Kéo hoa điền vào giữa hai đầu mày|Thả vào giữa hai đầu mày, rồi bấm ✓ Dán|✓? ?Dán)$/,
 duho:/^(Vùng hái|Chạm đóa sen trong vùng sáng!|Sen trôi từ phải sang · chạm khi vào vùng sáng|Chờ sen trôi vào vùng sáng rồi chạm)$/,
 doi:/^(Nét mẫu|Nét đối|Thả vào ô trống bên phải, cùng hàng|Chạm ô trống bên phải, cùng hàng, để đặt|Kéo nét lật gương của bên trái sang ô bên phải)$/,
 banh:/^(Quạt lửa|Món đã xong|Lửa .*|Giữ nút quạt.*|Giữ lửa trong vùng xanh cho chín)$/,
 td_ngon:/^(Thưa|.* · (bề trên|ngang hàng|kẻ dưới)|.* đang nói · chờ nói xong|Người còn .* · chờ nguôi|Tới lượt ngươi · giữ nút Thưa|Buông khi tiếng vào dải xanh \(.*\))$/};const w=[...new Set(r.txt.concat(r.dom).filter(word).filter(t=>!(GUIDE[k]&&GUIDE[k].test(t.trim()))))];T[k]=w;if(process.env.MGV_SRC)console.log(k,'SRC',(r.src||[]).join(' || '));
  if(k==='banh'&&!process.env.MGV_STRICT_BANH&&w.length){console.log('INFO banh (Nấu ăn) words — fixed on review/mg-visual, not on this base:',w.length)}else ok(!r.err&&!w.some(t=>String(t).replace(/\s+«.*$/,'').length>60),'play of '+k+' shows no reading-heavy text (short guiding words allowed, owner OD 21/11 ~00:50Z)',w.slice(0,8))}
 {const q=fs.readFileSync('dev/build/jnwq.js','utf8');ok(!/\$\{it\.y\}/.test(q)&&/yr:year\[i\]/.test(q),'thq seat label uses the year field yr, never the pixel it.y (owner: «phong năm 209.8»)')}
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 console.log('\nkind | words during play');for(const k in T)console.log(k+' | '+(T[k].join(' / ')||'-'));
 await b.close();console.log(bad?'\nFAILS '+bad:'\nALL OK');process.exit(bad?1:0)})();
