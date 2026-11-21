/* review/hoangthuong-gold (owner 21/11, OD:L1362: «Phải là màu vàng của hoàng gia, màu vàng tươi»; rank + name one colour).
   Scan: every place that shows the Emperor / Thái hậu title or name: the person card of Hoàng thượng (Chí tôn) and of Thái hậu, a kitName() in a text line, kitNameRank, a dialog whose speaker is the Emperor,
   a person-list row. For each visible text element whose OWN text contains «Hoàng thượng» / «Thái hậu» the computed colour must be the ONE token KIT_IMP (imperial yellow, bright) — never dark ink.
   usage: node dev/test/hoangthuong-gold-scan.js <root of BUILT site> <fold|ipadAir> [shots dir]  (exit 1 on any dark / off-token element; last line = summary) */
const {boot}=require('./lib/dsprobe.js');const [,,ROOT,DEV,SH]=process.argv;
const MEAS=()=>{const out=[];const rgb=c=>{const m=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);return m?[+m[1],+m[2],+m[3]]:null};
 const lum=([r,g,b])=>(0.2126*r+0.7152*g+0.0722*b);
 const els=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed');
 for(const e of els){const own=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();if(!/^(Hoàng thượng|Thái hậu|Hoàng thái hậu)$/.test(own))continue;/* a title / name, not a sentence that mentions them */if(e.closest('script,style,.kofold')||/\bkpsub\b|\bkrl\b/.test(e.className&&e.className.toString()||''))continue;/* a sub-title / a row LABEL is not the name */
  const cs=getComputedStyle(e);let col=rgb(cs.color);if(!col)continue;/* a gradient / background-clip text paints with its own colour */ if(cs.webkitTextFillColor&&rgb(cs.webkitTextFillColor))col=rgb(cs.webkitTextFillColor)||col;
  out.push({th:/Thái hậu/.test(own),pn:!!e.closest('.pc')&&/pcname/.test(e.className.toString()),imp:e.hasAttribute&&e.hasAttribute('data-imp'),txt:own.slice(0,28),cls:(e.className&&e.className.toString()||e.tagName).slice(0,40),col:col.join(','),lum:Math.round(lum(col))})}
 return out};
(async()=>{const T=await boot(ROOT,DEV);const g=T.g,p=T.p;const rows=[];
 const add=async(view)=>{const r=await g.evaluate(MEAS);r.forEach(x=>rows.push(Object.assign({view},x)))};
 const fixed=await g.evaluate(()=>typeof KIT_IMP==='string'?KIT_IMP:'');
 /* 1. Emperor / Thái hậu person cards (the modal card and the stage pop-up card) */
 for(const [view,fn] of [['card-emp','showEmp'],['card-th','showTh']]){
  const ok=await g.evaluate(f=>{try{Q.length=0;document.getElementById('modal').hidden=true;if(f==='showTh'){Q.unshift({t:'Thái hậu',cls:'pcm',h:kitThCardHTML()});showModal()}else eval(f+'()');return true}catch(e){return String(e)}},fn);
  await p.waitForTimeout(1200);if(ok===true){await add(view);if(SH)await p.screenshot({path:`${SH}/${DEV}-${view}.png`})}else rows.push({view,txt:'(not openable: '+ok+')',cls:'-',col:'-',lum:999});
  await g.evaluate(()=>{try{Q.length=0;document.getElementById('modal').hidden=true}catch(e){}})}
 /* 2. a text line / dialog naming the Emperor through the kit */
 await g.evaluate(()=>{Q.length=0;kitModal({kind:"info",title:"Thử",sub:"Hoàng thượng",sections:[{h:"",html:`<p>${kitName(S.emp,{cap:true})} nói với ngươi; ${kitName(S.thO||{kind:"th",name:"Thái hậu"},{})} gật đầu.</p>`},{h:"",rows:[["Người",kitName(S.emp,{})],["Thái hậu",kitName({kind:"th",name:"Thái hậu"},{})]]}],btn:"Đã rõ"})});
 await p.waitForTimeout(900);await add('dialog');if(SH)await p.screenshot({path:`${SH}/${DEV}-dialog.png`});await g.evaluate(()=>{try{Q.length=0;document.getElementById('modal').hidden=true}catch(e){}});
 /* 2b. every title-only variant of the kit: kitNameRank (stage / lists), a pcard head, kitName on the person, a rank-over-name block */
 await g.evaluate(()=>{Q.length=0;kitModal({kind:"info",title:"Thử",sub:"",sections:[{h:"",html:`<div id="hgv">${kitNameRank("","Hoàng thượng","#f0d070")}${kitNameRank("Hoàng thượng","Hoàng thượng","#f0d070")}${kitNameRank("Thái hậu","Thái hậu","#c0a0d0")}${pcard({f:pEmp(),col:"#f0d070",name:"Hoàng thượng",rank:"Hoàng thượng",lines:["x"]})}${pcard({f:pEmp(),col:"#c0a0d0",name:"Thái hậu",rank:"Thái hậu",lines:["x"]})}</div>`}],btn:"Đã rõ"})});
 await p.waitForTimeout(900);await add('title-only variants');if(SH)await p.screenshot({path:`${SH}/${DEV}-variants.png`});await g.evaluate(()=>{try{Q.length=0;document.getElementById('modal').hidden=true}catch(e){}});
 /* 3. dư đồ / Chí tôn group */
 await g.evaluate(()=>{try{kitGroupOpen&&kitGroupOpen('ct')}catch(e){}try{tab="map";render()}catch(e){}});await p.waitForTimeout(900);await add('map');
 /* RULE (OD:L1362 + KIT 33.5): ONLY Hoàng thượng is the bright imperial yellow; Thái hậu keeps her own look (her CARD NAME stays ink and carries no data-imp; her kit tone elsewhere is not changed by this branch) */
const emp=rows.filter(r=>!r.th),th=rows.filter(r=>r.th);const thBad=th.filter(r=>r.pn&&(r.lum>=150||r.imp));
const bad=emp.filter(r=>r.lum<150).concat(thBad);const off=emp.filter(r=>r.lum>=150&&fixed&&r.col!==(()=>{const h=fixed.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16)).join(',')})());
 console.log('KIT_IMP',fixed);console.log('view | text | class | colour | luminance');rows.forEach(r=>console.log([r.view,r.txt,r.cls,r.col,r.lum,r.th?'(Thái hậu: must NOT be changed)':'(Emperor: must be KIT_IMP)'].join(' | ')));
 console.log(`hoangthuong-gold-scan ${DEV}: ${rows.length} elements, ${bad.length} dark, ${off.length} bright-but-not-token, page errors ${T.errs.length}`);await T.close();process.exit(bad.length||off.length||T.errs.length||!rows.length?1:0)})();
