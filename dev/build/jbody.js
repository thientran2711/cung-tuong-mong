/* ================= jbody: BODY-FIT BOX · KIT_BODY (KP09, GAP v4 J7; KIT REQUEST looks-2 17/11, KIT_REQUESTS.md "BODY-FIT BOX per figure picture") — KIT §28.8e =================
   ONE kit part that says WHERE a body part sits on any person picture, so a painted overlay (hair look, clothes look, any later robe / hair decal) lands
   on the right place of EVERY figure and portrait, the way img/veil-fit.json does it for the lower face. Only the kit keeper changes this part (OD:L1103).
   ZONES (KIT_BODY.zones): hair · head · chest · waist · sleeveL · sleeveR (viewer's left / right) · skirt · hem.
   A zone row = [left%, top%, width%, height%, rotateDeg] in % of the picture box — the SAME unit as a veil-fit row (fig-*: % of the figure image box;
   por-*: % of the portrait picture), so it drops into the one face-fx box (.kfxf over a stage figure / podium / mirror, KIT_AV over an avatar).
   WHERE THE NUMBERS COME FROM (first hit wins):
   1. img/body-fit.json { "<por-/fig- file>": { "<zone>": [l,t,w,h,deg], … } } — per-figure measures (Foreman C fills / corrects; rows are OVERRIDES merged on top of the measured rows: a partial row overrides only its zones, the measure fills the rest; rows() waits (null) for the merge).
   2. MEASURED from the picture itself (BAL.body.auto = 1): fig-* = kitFigBody (jkit: alpha bbox, head top from img/fig-ht.json, head x, torso core column,
      width profile) + the veil-fit face box when the picture has one; por-* = the veil-fit face box only (a portrait has no feet). Ratios: BAL.body.
      A picture with neither (no fit row, no measure yet) gets NOTHING (never a guessed place). The measure is async: a layer asked before it lands is emitted
      hidden (img.kbody-wait) and is placed the moment the measure arrives (no re-render).
   API: KIT_BODY.rect(file, zone) → row | null · KIT_BODY.style(file, zone) → "left:..%;top:..%;width:..%;height:..%;transform:rotate(..deg)" | "" ·
        KIT_BODY.img(cls, src, file, zone, extraCss) → the layer <img> for a .kfxf / KIT_AV box (vars form, §28.8b CSS) ·
        KIT_BODY.rows(file) → {zone: row} · KIT_BODY.want(file, cb) → starts the measure, cb when rows are known · KIT_BODY.debugHtml(file) (kit sample §28.8e).
   USERS (whole group, law 11): every place that shows a person picture already runs the ONE kitFxLayers stack (stage tokens + her figure kitFigFx, event stage
   kitStageFig .kesfx, podium kitFxPut, mirror zoom, every avatar through KIT_AV), so a KIT_FACEFX entry that emits KIT_BODY.img reaches all of them.
   Wired here: looks-2 HAIR slots (lkhair: Tóc rối / Tóc ẩm / Hoa lá vương tóc → zone hair, file fx-hair-<id>-<lv>.png) and the CLOTHES slots the jcloth
   bake does not paint (khoi, moc on figures; every clothes look on portraits → zone per BAL.body.cloth, file fx-cloth-<id>-<lv>.png). A slot draws only when
   its file is in LOOKS_ART (Foreman C art; none yet → same as before: chip + Sắc). jcloth's tea / wet / mud / crease bake keeps its own cloth mask (owner-approved). ================= */
Object.assign(BAL,{body:{auto:1,
 /* ratios on the FIGURE body H = feet − head top (fractions of H, from the head top down); x from the measured torso core column (cl..cr) or bbox (l..r) */
 fig:{chin:.135/* head top → chin when no face box (≈ 1 / 7.4 body) */,headW:.4/* head half-width / head height */,hairUp:.035/* hair above the skull top (buns, pins) */,
  hairW:1.45/* hair box width / face width */,chestW:2.6/* chest half-width / head half-width */,waistW:2/* waist half-width / head half-width */,chestH:.17,waistY:.34,waistH:.08,sleeveY:.04/* below the chin */,sleeveB:.6,sleeveMin:.06/* min sleeve width, share of picture */,skirtY:.42,skirtB:.06,hemH:.1},
 /* veil-fit face box → face: band (nose bridge) at KIT_VEIL.B0 of the box; chin at chinK of the box height; face width = box width */
 face:{chinK:.86,eyeUp:.12/* eye line above the band, share of box height */,headK:1.5/* skull top above the eye line, × (chin − eye) */},
 /* portrait (por-*): only head / hair / chest from the face box */
 por:{chestH:1.1/* × face box height below the chin */,chestW:2.2/* × face width */},
 /* clothes look → zone (looks-2 LK_CLOTH) */
 cloth:{uot:"hem",tra:"chest",bun:"hem",xoc:"waist",khoi:"chest",moc:"hem"}}});
window.KIT_BODY={zones:["hair","head","chest","waist","sleeveL","sleeveR","skirt","hem"],fitUrl:"img/body-fit.json",fit:null,A:{},AF:{},P:{},W:{},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{KIT_BODY.fit=j||{};KIT_BODY.flush()}).catch(()=>{KIT_BODY.fit={};KIT_BODY.flush()})}catch(e){this.fit={}}},
 name:f=>String(f||"").split("?")[0].split("/").pop(),
 /* measured rows from a kitFigBody result v (fractions) + the veil-fit face box f (% or null) */
 calc:function(file,v,f){const B=BAL.body,R={},q=x=>+(x*100).toFixed(2),box=(l,t,r,b)=>[q(l),q(t),q(Math.max(0,r-l)),q(Math.max(0,b-t)),0],cl=(x,a,z)=>Math.max(a,Math.min(z,x));
  const por=/^por-/.test(file);let fx=null;/* face: cx, eye y, chin y, half-width (fractions) */
  if(f){const F=B.face,t=f[1]/100,h=f[3]/100,band=t+((window.KIT_VEIL&&KIT_VEIL.B0)||.165)*h;fx={cx:(f[0]+f[2]/2)/100,eye:band-F.eyeUp*h,chin:t+F.chinK*h,hw:f[2]/200,rot:f[4]||0,h};fx.top=fx.eye-F.headK*(fx.chin-fx.eye)}
  if(por){if(!fx)return null;const P=B.por,G=B.fig;const ht=Math.max(0,fx.top);
   R.head=box(fx.cx-fx.hw*1.15,ht,fx.cx+fx.hw*1.15,fx.chin);R.hair=box(fx.cx-fx.hw*G.hairW,Math.max(0,ht-G.hairUp),fx.cx+fx.hw*G.hairW,fx.eye);
   R.chest=box(cl(fx.cx-fx.hw*P.chestW,0,1),fx.chin,cl(fx.cx+fx.hw*P.chestW,0,1),Math.min(1,fx.chin+P.chestH*fx.h));
   for(const z of["head","hair"])R[z][4]=fx.rot;return R}
  if(!v||!(v.b>v.t))return null;const G=B.fig,top=v.ht!=null&&v.ht>v.t?v.ht:v.t,H=v.b-top;if(H<=.05)return null;
  const ccl=v.cl!=null?v.cl:v.l,ccr=v.cr!=null?v.cr:v.r,hx=fx?fx.cx:(v.hx!=null?v.hx:(ccl+ccr)/2);
  const chin=fx?Math.max(fx.chin,top+.06*H):top+G.chin*H,hhw=fx?fx.hw*1.15:G.headW*(chin-top)/(v.ar||.4),headT=fx?Math.max(v.t,Math.min(top,fx.top)):top;
  const fhw=fx?fx.hw:hhw/1.15;
  R.hair=box(hx-fhw*G.hairW,Math.max(v.t,headT-G.hairUp*H),hx+fhw*G.hairW,fx?fx.eye:headT+(chin-headT)*.45);
  R.head=box(hx-hhw,headT,hx+hhw,chin);
  const xs=k=>[Math.max(ccl,hx-hhw*k),Math.min(ccr,hx+hhw*k)],cx=xs(G.chestW),wx=xs(G.waistW);/* the torso core, never wider than the shoulders / waist of THIS head */
  R.chest=box(cx[0],chin,cx[1],chin+G.chestH*H);
  R.waist=box(wx[0],top+(G.waistY-G.waistH/2)*H,wx[1],top+(G.waistY+G.waistH/2)*H);
  const sy=chin+G.sleeveY*H,sb=top+G.sleeveB*H,mw=G.sleeveMin;
  R.sleeveL=box(v.l,sy,Math.min(v.r,Math.max(cx[0],v.l+mw)),sb);R.sleeveR=box(Math.max(v.l,Math.min(cx[1],v.r-mw)),sy,v.r,sb);/* outer paint edge → the chest side, inside the body */
  R.skirt=box(ccl,top+G.skirtY*H,ccr,v.b-G.skirtB*H);
  const wl=v.wl&&v.wl.length?v.wl[v.wl.length-1]:v.l,wr=v.wr&&v.wr.length?v.wr[v.wr.length-1]:v.r;R.hem=box(Math.min(wl,ccl),v.b-G.hemH*H,Math.max(wr,ccr),v.b);
  if(fx)for(const z of["head","hair"])R[z][4]=fx.rot;
  for(const z in R){const r=R[z];r[0]=cl(r[0],0,100);r[1]=cl(r[1],0,100);r[2]=Math.min(r[2],100-r[0]);r[3]=Math.min(r[3],100-r[1])}return R},
 faceRow:function(file){try{return window.KIT_VEIL&&KIT_VEIL.fit&&KIT_VEIL.fit[file]||null}catch(e){return null}},
 /* rows known now (sync); null = not yet (start the measure with want) */
 rows:function(file){file=this.name(file);if(!file||!/^(por|fig)-/.test(file)||/unknown/.test(file))return null;this.load();if(this.fit===null)return null;/* the override table is still loading: nobody places a layer on measured-only rows that the json then moves */
  const J=this.fit&&this.fit[file];let A=this.A[file];if(A!==undefined&&!this.AF[file]&&this.faceRow(file)){A=undefined;delete this.A[file]}/* the face table landed after the measure */
  if(A===undefined&&BAL.body.auto){if(/^por-/.test(file)){const f=this.faceRow(file);if(f){A=this.A[file]=this.calc(file,null,f);this.AF[file]=1}else if(window.KIT_VEIL&&KIT_VEIL.fit)A=this.A[file]=null}
   else if(typeof kitFigBody==="function"){const src=typeof IMG_U==="function"?IMG_U("img/"+file):"img/"+file;const v=kitFigBody(src,this.P[file]?null:()=>KIT_BODY.landed(file,src));this.P[file]=1;if(v){const f=this.faceRow(file);A=this.A[file]=this.calc(file,v,f);this.AF[file]=f?1:0}}}
  /* json rows are OVERRIDES on top of the measured rows (json zone wins, measured zones fill the rest). While the measure is pending and the json row does not
     cover every standard zone, answer null so want() waits for the merge (never half a body: waist box only). Measure never lands (A === null) → json alone. */
  const need=/^por-/.test(file)?["hair","head","chest"]:this.zones,full=!!J&&need.every(z=>J[z]);
  if(!full&&A===undefined&&BAL.body.auto)return null;
  if(!J&&!A)return null;return Object.assign({},A||{},J||{})},
 landed:function(file,src){try{const v=window.__KITFB&&__KITFB[src]&&__KITFB[src].v;const f=this.faceRow(file);this.A[file]=v?this.calc(file,v,f):null;this.AF[file]=f?1:0;this.flush(file)}catch(e){}},
 want:function(file,cb){file=this.name(file);const r=this.rows(file);if(r){cb&&cb(r);return r}(this.W[file]||(this.W[file]=[])).push(cb);return null},
 rect:function(file,zone){const r=this.rows(file);return r&&r[zone]||null},
 style:function(file,zone){const r=this.rect(file,zone);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]||0}deg);transform-origin:50% 50%`},
 vars:function(file,zone){const s=this.style(file,zone);return s&&typeof kitFxVars==="function"?kitFxVars(s):s},
 img:function(cls,src,file,zone,extra){file=this.name(file);const st=this.vars(file,zone);
  if(!st&&!(BAL.body.auto&&/^fig-/.test(file)||this.fit===null))return "";/* nothing to wait for: no row, no measure */
  return `<img class="kbody ${cls}${st?"":" kbody-wait"}" data-kbz="${zone}" data-kbf="${file}"${extra?` data-kbx="${extra}"`:""} src="${src}" alt="" aria-hidden="true" style="${st}${extra||""}" onerror="this.remove()">`},
 /* place the waiting layers of one file (or all) once rows are known; wake the want() callers */
 flush:function(file){try{const L=file?[file]:Object.keys(this.W).concat([...document.querySelectorAll("img.kbody-wait")].map(i=>i.dataset.kbf));
  for(const f of new Set(L)){const r=this.rows(f);if(!r)continue;const w=this.W[f];if(w){delete this.W[f];w.forEach(c=>{try{c&&c(r)}catch(e){}})}
   document.querySelectorAll(`img.kbody-wait[data-kbf="${f}"]`).forEach(im=>{const st=this.vars(f,im.dataset.kbz);if(!st){im.remove();return}im.setAttribute("style",st+(im.dataset.kbx||""));im.classList.remove("kbody-wait")})}}catch(e){}},
 /* kit sample / tests: the picture with every zone outlined */
 debugHtml:function(file,w){file=this.name(file);const src=typeof IMG_U==="function"?IMG_U("img/"+file):"img/"+file,col={hair:"#e0a030",head:"#f06070",chest:"#40a0f0",waist:"#a060e0",sleeveL:"#30c090",sleeveR:"#30c090",skirt:"#7080a0",hem:"#e07030"};
  return `<div class="kbody-dbg" data-kbf="${file}" style="position:relative;display:inline-block;width:${w||180}px"><img src="${src}" alt="" style="display:block;width:100%;height:auto">${this.zones.map(z=>`<i class="kbody-z" data-kbz="${z}" title="${z}" style="position:absolute;box-sizing:border-box;border:2px solid ${col[z]};background:${col[z]}22;${this.style(file,z)||"display:none"}"></i>`).join("")}</div>`},
 debugFill:function(root){try{(root||document).querySelectorAll(".kbody-dbg").forEach(d=>{const f=d.dataset.kbf;KIT_BODY.want(f,()=>d.querySelectorAll(".kbody-z").forEach(i=>{const s=KIT_BODY.style(f,i.dataset.kbz);if(s)i.setAttribute("style",i.getAttribute("style").replace(/display:none|left:.*$/,"")+s)}))})}catch(e){}}};
try{KIT_BODY.load()}catch(e){}
(function(){const st=document.createElement("style");st.id="kbody-css";st.textContent=`.kfxf>img.kbody-wait,.kfx>img.kbody-wait{visibility:hidden!important}`;document.head.appendChild(st)})();
/* ---- looks-2 slots (jlooks lkhair / lkcloth): painted overlays per zone, only for files Foreman C delivered (LOOKS_ART) ---- */
(function(){if(!window.KIT_FACEFX||typeof KIT_FACEFX.get!=="function")return;const art=f=>!!(window.LOOKS_ART&&LOOKS_ART[f]);
 const hair=KIT_FACEFX.get("lkhair");if(hair)hair.html=(p,file,z)=>z.L.map(([id,x])=>{const f=`fx-hair-${id}-${x.lv}.png`;return art(f)?KIT_BODY.img("klk klk-"+id,"img/"+f,file,"hair"):""}).join("");
 const clo=KIT_FACEFX.get("lkcloth");if(clo){const h0=clo.html;clo.html=(p,file,z)=>{const fn=KIT_BODY.name(file),fig=/^fig-/.test(fn);let h=h0(p,file,z)||"";const baked=fig&&/kclo/.test(h);
  for(const [id,x] of z.L){if(baked&&/^(xoc|tra|uot|bun)$/.test(id)&&BAL.looks&&(id==="xoc"?BAL.looks.xoc&&BAL.looks.xoc.on:BAL.looks.stain&&BAL.looks.stain.on&&BAL.looks.stain.on[id]))continue;/* jcloth painted it */
   const f=`fx-cloth-${id}-${x.lv}.png`;if(art(f))h+=KIT_BODY.img("klk klk-"+id,"img/"+f,fn,BAL.body.cloth[id]||"chest")}return h}}})();
