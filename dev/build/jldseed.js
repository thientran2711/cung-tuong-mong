/* ================= jldseed: a load never re-rolls (robot10 nc-fix-3, save drift family; laws 4 + 6) =================
   Loading a save runs the load-time repairs and the first draw of the screen (deser → normAll / migrations / face, name and lifespan fills,
   deal → the act hand, render → lazily drawn faces). Any dice thrown there made the SAME file load as a different game each time (save 009:
   other faces, other Kính sự phòng / Thái y names, other tai mắt, other lifespans), and a reload re-rolled them.
   Every die thrown DURING a load is now taken from a PRNG seeded by the save itself: the same file always loads as the same game; another
   save (or the same life later) seeds differently. The game's own dice (Math.random) are put back the moment the load is done.
   Paths: the title «Tiếp tục kiếp này» click (deser + deal + showModal + render, one task) and every direct deser (co-op, tests). */
(function(){const MR=Math.random;let on=0;
 const h32=s=>{let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
 const prng=a=>()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
 /* the seed: the save's own clock and counters (cheap; a whole-file hash would cost a large save tens of ms on every load) */
 const seedOf=d=>{try{const s=d&&d.S||{};return h32([s.name,s.year,s.month,s.tuan,s.turn,d.buoi,s.age,s.logSeq,s.il&&s.il.seq,(d.R||[]).length,s.bac,s.sung].join("|"))}catch(e){return 1}};
 const run=(seed,fn)=>{if(on)return fn();on=1;Math.random=prng(seed);try{return fn()}finally{Math.random=MR;on=0}};
 window.ldSeeded=run;
 if(typeof deser==="function"){const d0=deser;deser=function(d){return run(seedOf(d),()=>d0.apply(this,arguments))}}
 /* the title load runs deser, deal() and the first render in ONE click task: seed the whole task, give the dice back right after it */
 document.addEventListener("click",e=>{const b=e.target&&e.target.closest&&e.target.closest("#slots button[data-load]");if(!b||on)return;
  let d=null;try{d=typeof loadSlot==="function"?loadSlot(+b.dataset.load):null}catch(x){}if(!d)return;
  on=1;Math.random=prng(seedOf(d));setTimeout(()=>{Math.random=MR;on=0},0)},true);
})();
