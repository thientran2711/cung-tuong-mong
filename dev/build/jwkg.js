/* ================= J83 WORKS: EACH KIND PLAYS ITS OWN GAME (owner bug 11/15: "Tự học Họa: cắm hoa" opened the painting game) =================
   The lesson / practice game used to follow the ART (hoa → vẽ), so cắm hoa, thêu khăn (before the Thêu art), chép kinh and may áo all
   played another craft's game. Now the KIND chosen in "làm ra tác phẩm gì?" picks the game:
     tranh → vẽ (đồ nét bút) · theu → thêu (nhớ mẫu thêu) · bhoa → cắm hoa (thiên – nhân – địa) · tho → thơ (điền câu lục bát)
     kinh → chép kinh (NEW: đồ nét theo bản kinh mẫu) · khuc → đàn · the → cờ · mua → múa · ao → may áo (NEW: khâu theo đường may)
     mon → nấu ăn · huong → điều hương
   The two new games use the trace engine (j91 k91Trace) with their own figures, score 0..10 like every other game.
   ================= */
const WKGAME={tranh:"ve",theu:"theu",bhoa:"hoa",tho:"tho",kinh:"kinh",khuc:"dan",the:"co",mua:"mua",ao:"may",mon:"banh",huong:"huong"};
const kwkL=(x0,y0,x1,y1)=>t=>[x0+(x1-x0)*t,y0+(y1-y0)*t];
const kwkQ=(x0,y0,cx,cy,x1,y1)=>t=>{const u=1-t;return[u*u*x0+2*u*t*cx+t*t*x1,u*u*y0+2*u*t*cy+t*t*y1]};
/* a column of brush strokes copied from the model sutra: abstract strokes, not readable characters */
const KWK_KINH=[["Hàng kinh thứ nhất",[kwkL(.3,.2,.7,.22),kwkQ(.5,.3,.47,.55,.52,.78),kwkQ(.6,.8,.66,.84,.72,.9)]],
 ["Hàng kinh thứ hai",[kwkQ(.35,.18,.5,.14,.62,.24),kwkL(.42,.36,.6,.38),kwkQ(.5,.46,.46,.7,.3,.86),kwkQ(.55,.62,.65,.75,.78,.86)]],
 ["Hàng kinh thứ ba",[kwkL(.5,.12,.52,.3),kwkL(.28,.4,.74,.42),kwkQ(.38,.52,.36,.7,.42,.86),kwkQ(.6,.52,.64,.7,.58,.86)]],
 ["Hàng kinh thứ tư",[kwkQ(.3,.25,.45,.3,.55,.22),kwkQ(.62,.3,.56,.5,.4,.62),kwkL(.32,.72,.72,.74),kwkQ(.7,.18,.7,.5,.75,.85)]],
 ["Hàng kinh thứ năm",[kwkL(.45,.15,.55,.2),kwkL(.3,.32,.72,.32),kwkQ(.5,.4,.5,.62,.46,.8),kwkL(.32,.86,.7,.86)]]];
/* seams of a dance robe */
const KWK_MAY=[["Viền cổ áo",[kwkQ(.22,.3,.5,.66,.78,.3)]],
 ["Tay áo",[kwkL(.22,.25,.2,.78),kwkQ(.2,.78,.38,.92,.56,.78)]],
 ["Vạt áo",[kwkQ(.3,.15,.22,.52,.3,.86),kwkL(.3,.86,.74,.86)]],
 ["Viền thêu lượn",[t=>[.12+.76*t,.5+.1*Math.sin(t*Math.PI*4)]]],
 ["Đai lưng",[kwkL(.18,.42,.82,.42),kwkL(.82,.56,.18,.56)]]];
let kwkMode=null;
/* ORDER THIN P1c: a pooled figure (jmgpool_c kinh / may: parameters L / Q / W) → [name, strokes as curves t => [u, v]] */
function kwkFig(it){const fn=f=>f[0]==="L"?kwkL(f[1],f[2],f[3],f[4]):f[0]==="Q"?kwkQ(f[1],f[2],f[3],f[4],f[5],f[6]):(t=>[f[1]+(f[2]-f[1])*t,f[3]+f[4]*Math.sin(t*Math.PI*f[5])]);return[it.id,it.S.map(fn)]}
function kwkTrace(F,mode){return(box,env)=>{const P=mgpcMany(mode,4);/* four pooled figures per game (none twice); the old rows when no pool */const F2=P?P.map(kwkFig):F;const keep=K91_SH.splice(0,K91_SH.length,...F2);kwkMode=mode;let stop;
 try{stop=k91Trace(box,env)}finally{K91_SH.splice(0,K91_SH.length,...keep)}return()=>{kwkMode=null;if(stop)stop()}}}
try{Object.assign(KG82_ENG,{kinh:kwkTrace(KWK_KINH,"kinh"),may:kwkTrace(KWK_MAY,"may")});
 Object.assign(KG82_KIND,{kinh:{e:"kinh",n:"Chép kinh",t:"Chép kinh theo bản mẫu",how:"Đặt ngón tay ở chấm xanh rồi đưa bút theo nét mờ của bản kinh mẫu, từng nét theo số thứ tự, cho kín và đều tay. 4 hàng kinh."},
  may:{e:"may",n:"May áo",t:"Khâu theo đường may",how:"Đặt ngón tay ở chấm xanh rồi đưa kim theo đường may mờ, từng đường theo số thứ tự, cho kín và đều mũi. 4 đường may."}});
 KG82_SPR.kinh=(KG82_SPR.ve||[]).slice();KG82_SPR.may=[];
 KG82_F.kinh=KG82_F.tho;KG82_F.may=KG82_F.theu;if(KG82_F85.theu)KG82_F85.may=KG82_F85.theu}catch(e){console.error(e)}
/* the trace engine paints on the "ve" backdrop; the sewing game draws no brush or inkstone */
/* kinh / may borrow the «ve» board through the kit table KG82_BOARDOF (j82), skins included */
(function(){const s0=kg82Spr;kg82Spr=function(g,n){if(kwkMode==="may"&&/^ve-(brush|inkstone)$/.test(n))return false;return s0.apply(this,arguments)}})();
/* the kind being made: S.mg.wk while a session runs (openMG / practice), else the pick openMG just read */
let kwkPick=null,kwkG=null;
function wkGameOf(art){const m=typeof S!=="undefined"&&S&&S.mg;const w=(m&&m.wk)||kwkPick;if(!w||!WK[w.kind]||WK[w.kind].a!==art)return null;const g=WKGAME[w.kind];return KG82_KIND[g]?g:null}
(function(){const k0=kg82Kind;kg82Kind=function(){if(kwkG&&KG82_KIND[kwkG])return kwkG;return k0.apply(this,arguments)}})();
(function(){const p0=playArt;playArt=function(o){const g=o&&(o.game||wkGameOf(o.art));if(!g)return p0.apply(this,arguments);kwkG=g;try{return p0.apply(this,arguments)}finally{kwkG=null}};window.playArt=playArt})();
(function(){const o0=openMG;openMG=function(){const m=typeof S!=="undefined"&&S&&S.mg;kwkPick=(m&&(m.wk||wkPend))||wkPend||null;try{return o0.apply(this,arguments)}finally{kwkPick=null}}})();
/* close: the j83 / veil dialogs keep a plain "Thôi" option, which KIT 32.10 (j3 kitCancelIx + jk4 kitCloseSync) never draws:
   the dialog gets the kit ✕ in its header, and ✕ / tap outside / Esc run it (merge with main, reviewer r6). */
