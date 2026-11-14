/* ================= j92: VẬT PHẨM · TRANG PHỤC · MẠNG CHE MẶT (logic + data only; UI through kit components) ================= */
/* ---- KIT_VEIL: pearl-strand face veils by rank (hủy dung, j70 scarOf(p).veil / p.scar.veil) ----
   img/veil-t1..t8.png (480x445, transparent, gpt-2-6): one per consort rank 0..7 (Đáp ứng → Hoàng hậu), richer each step:
     t1 silk ribbon + sparse seed pearls · t2 plain silver, even pearls · t3 engraved silver, pink glass · t4 pale gold, carnelian ·
     t5 gold flower band, jade + ruby · t6 gold clouds, big pearls + emerald · t7 gold filigree, peony hooks, 2 layers + ruby + gold tassels ·
     t8 gold filigree + kingfisher blue, phoenix hooks, 3 layers, rubies + large pearls.
   img/veil-gauze.png: plain sheer gauze for cung nữ, ma ma and lãnh cung.   img/veil.png = t5 (old name kept).
   img/veil-por.png 384x506 / veil-fig.png 385x900: t5 pre-placed for the median face (fallback only).
   img/veil-fit.json: { "<por-/fig- file>": [left%, top%, width%, height%, rotateDeg] } measured on every women's image
     (por-*: % of the 384x506 portrait OPENING, j60 .kpor geometry; fig-*: % of the figure image box). The box is for t5 (band at 16.5%).
   style(file,tier) adapts the box to each tier's own band height (band[] = band centre as a fraction of the image height),
   so the band always sits on the nose bridge under the eyes and the strands end a little past the chin.
   Kit use: <img src="${KIT_VEIL.src(KIT_VEIL.tierOf(p))}" style="position:absolute;${KIT_VEIL.style(file,tier)}"> above the portrait,
   above KIT_SCAR, below the frame. */
window.KIT_VEIL={tiers:["t1","t2","t3","t4","t5","t6","t7","t8","gauze"],band:{t1:.18,t2:.139,t3:.112,t4:.124,t5:.169,t6:.144,t7:.128,t8:.11,gauze:.144},B0:.165,
 por:"img/veil-por.png",fig:"img/veil-fig.png",fitUrl:"img/veil-fit.json",fit:null,
 src:function(t){t=this.band[t]!=null?t:"t5";return `img/veil-${t}.png`},
 on:function(p){try{return !!(p&&p.scar&&p.scar.veil)}catch(e){return false}},
 tierOf:function(p){try{if(!p)return "t5";const rr=typeof personRoleRank==="function"?personRoleRank(p):null;
   if(rr){if(rr.role==="maid"||rr.role==="mama"||rr.role==="cold")return "gauze";if(rr.role==="player"||rr.role==="consort")return "t"+(Math.max(0,Math.min(7,rr.rank|0))+1);if(rr.role==="thaihau")return "t8"}
   if(p.cold||p.lanh)return "gauze";const r=typeof rkOf==="function"?rkOf(p):p.rank;return r!=null?"t"+(Math.max(0,Math.min(7,r|0))+1):"t5"}catch(e){return "t5"}},
 rect:function(file,tier){const n=String(file||"").split("/").pop();const r=this.fit&&this.fit[n];if(!r)return null;const b=this.band[tier]!=null?this.band[tier]:this.band.t5;
   const bandY=r[1]+this.B0*r[3],h=r[3]*(1-this.B0)/(1-b);return [r[0],+(bandY-b*h).toFixed(2),r[2],+h.toFixed(2),r[4],b]},
 style:function(file,tier){const r=this.rect(file,tier||"t5");if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:50% ${(r[5]*100).toFixed(1)}%`},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_VEIL.fit=j}).catch(()=>{})}catch(e){}}};
try{KIT_VEIL.load()}catch(e){}
/* ---- KIT_SCAR: hủy dung scratch marks drawn ON the face (game-style brush strokes, crimson, soft edge, semi-transparent) ----
   img/scar-1|2|3.png (320x320 transparent): 1 / 2 / 3 strokes = nhẹ / vừa / nặng (j70 SCAR70 sev 1..3).
   img/scar-fit.json: { "<por-/fig- file>": [left%, top%, width%, height%, rotateDeg] }, same boxes as veil-fit.json
   (por-*: % of the 384x506 opening; fig-*: % of the figure image), on the cheek facing the viewer, rotated with the face.
   Layer order: portrait < scar < veil (the strokes show faintly through the pearl strands) < frame.
   on(p): only when the player KNOWS (true information): herself, or j70 knows(p) (same rule as the scar chip). */
window.KIT_SCAR={src:function(sev){return `img/scar-${Math.max(1,Math.min(3,sev|0))}.png`},names:["","nhẹ","vừa","nặng"],fitUrl:"img/scar-fit.json",fit:null,origin:"50% 50%",
 on:function(p){try{if(!p||!p.scar)return false;return (typeof S!=="undefined"&&p===S)||(typeof knows==="function"&&!!knows(p))}catch(e){return false}},
 of:function(p){if(!this.on(p))return null;const sev=p.scar.sev|0;return{sev,src:this.src(sev),label:`Hủy dung (${this.names[sev]||""})`}},
 rect:function(file){const n=String(file||"").split("/").pop();return this.fit&&this.fit[n]||null},
 style:function(file){const r=this.rect(file);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:${this.origin}`},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_SCAR.fit=j}).catch(()=>{})}catch(e){}}};
try{KIT_SCAR.load()}catch(e){}
