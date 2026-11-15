/* SCAN 3 — every tappable thing that shows a picture (stage figures, faces, portraits, item/place pictures): what a tap paints.
   A tap may not paint a rectangle: -webkit-tap-highlight-color must be transparent, and focus/active must not add a
   rectangular outline / background / box-shadow over a figure (filter/drop-shadow follow the figure's shape and are fine). */
(async()=>{const res={};const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const tappable=e=>{const cs=getComputedStyle(e);return e.matches('button,a,[role=button],[tabindex],[data-pid],[data-p],[onclick]')||cs.cursor==='pointer'};
 const check=async(tag)=>{const out=[];const seen=new Set();
  for(const img of document.querySelectorAll('img, canvas, .fig, [class*=fig], [class*=face], [class*=portrait]')){if(!img.offsetParent)continue;
   let e=img;while(e&&e!==document.body&&!tappable(e))e=e.parentElement;if(!e||e===document.body||seen.has(e))continue;seen.add(e);
   const cs=getComputedStyle(e);const hl=cs.webkitTapHighlightColor;const r=e.getBoundingClientRect();if(r.width<8)continue;
   e.focus&&e.focus({preventScroll:true});await wait(0);const fs=getComputedStyle(e);const fv=e.matches(':focus-visible');const foc={o:!fv&&fs.outlineStyle!=='none'&&parseFloat(fs.outlineWidth)>0?fs.outlineStyle+' '+fs.outlineWidth:''};e.blur&&e.blur();
   const bad=[];if(!/rgba\(0, 0, 0, 0\)|transparent/.test(hl))bad.push('tap-highlight '+hl);if(foc.o)bad.push('focus outline (tap) '+foc.o);
   out.push({tag,el:(e.tagName+'.'+String(e.className).split(' ').slice(0,2).join('.')).slice(0,50),w:Math.round(r.width),h:Math.round(r.height),bad})}
  return out};
 res.stage=await check('stage');
 /* open a person card from the stage and the act tab, the map, the rv tab */
 for(const t of ['act','go','rv','inv','staff','kid','court']){try{tab=t;render();await wait(300);res[t]=await check(t)}catch(e){res[t]=String(e)}}
 const all=Object.values(res).flat().filter(x=>typeof x==='object');
 const kinds={};for(const x of all){const k=x.el;kinds[k]=kinds[k]||{n:0,bad:0,ex:x.bad[0]||''};kinds[k].n++;if(x.bad.length)kinds[k].bad++}
 return{total:all.length,bad:all.filter(x=>x.bad.length).length,kinds}})()
