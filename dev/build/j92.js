/* ================= j92: VẬT PHẨM · TRANG PHỤC · MẠNG CHE MẶT (logic + data only; UI through kit components) ================= */
/* ---- KIT_VEIL: the pearl-strand face veil (hủy dung, j70 scarOf(p).veil) ----
   img/veil.png       base cutout (480x445, transparent). Band centre (on the nose bridge) at 50% / 16.5% of the image.
   img/veil-por.png   384x506 overlay for the 3:4 portrait OPENING, placed for the median face (fallback).
   img/veil-fig.png   385x900 overlay for a full-body figure centred in a 385x900 box, median face (fallback).
   img/veil-fit.json  per-image fit, measured on every women's por-/fig- image (face detector):
                      { "<file name>": [left%, top%, width%, height%, rotateDeg] }
                      por-*: % of the 384x506 portrait OPENING (j60 .kpor geometry: por cover-fitted 384x466, 42.5 px below the opening top)
                      fig-*: % of the figure image's own box.
   Kit use: <img src="img/veil.png"> absolutely positioned with style = KIT_VEIL.style(file) inside the same box; rotate about 50% 16.5%. */
window.KIT_VEIL={src:"img/veil.png",por:"img/veil-por.png",fig:"img/veil-fig.png",fitUrl:"img/veil-fit.json",origin:"50% 16.5%",fit:null,
 on:function(p){try{return !!(p&&p.scar&&p.scar.veil)}catch(e){return false}},
 rect:function(file){const n=String(file||"").split("/").pop();return this.fit&&this.fit[n]||null},
 style:function(file){const r=this.rect(file);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:${this.origin}`},
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
