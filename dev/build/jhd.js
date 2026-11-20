/* ================= jhd: HOA ĐIỀN — an owned item + the placing step of makeup (review/hoa-dien) =================
   Owner (OD 17/11 ~17:30Z real, verbatim key words): "hoa điền là cái thứ mà tôi có thể dán vào trên trán của từng người ... thứ nhất tôi có thể mua
   được nè, người khác tặng nè, kiếm được nè ... mỗi lần được thăng phẩm là được một cái ... khi tôi trang điểm á, thì tôi có thể tự dán lên".
   OD 17/11 ~17:45Z real: "thêm cho tôi cái mini game ... một bước là dán hoa điền ... cho nó méo qua méo lại ... điều chỉnh được cái vị trí ... đặt
   khớp đúng cái vị trí mà bạn đặt á, thì được cao điểm ... đặt không khớp thì nó vẫn được tính ... Hoa điền cũng cộng vào tổng xa xỉ luôn."
   - ITEMS: ONE table (j92 WD_LIST, slot "hd", 8 tiers P1..P8, motifs flowers / leaves / butterfly / phoenix only, OD:L1104). Never worn through the
     wardrobe (wdWear refuses "hd"); placed during makeup only. Sources: shop restock, NPC gifts (NPCs hold some; j8 gift rule, tg "rv"),
     found (monthly), +1 per promotion (her and NPCs).
   - STEP: after the lips (jtoil toilMakeup phase 3 → hdStep): pick one of hers (or none) → drag it (relative drag) + tilt it (two kit buttons)
     → "Dán". q = hdQ(distance to the forehead anchor / eye distance, tilt error vs the eye line). No clock: nothing rewards speed.
     q is one more makeup part (BAL.toil.w.hd) in toilRaw → the score → the look (Vụng về ↔ Khuynh thành); a miss still counts (q > 0 near).
   - NPCs (and her auto bot) place by the SAME q from their hand (hdNpc: hashed per person per day, the ag-all-2 mgHand when it is in, cap
     BAL.hd.npcCap), so both co-op seats agree.
   - XA XỈ: the placed hoa điền adds wdLux(k) into toilMkLux → luxOf → luxTotal (ONE total; luxParts.hd = its share of mk).
   - THỬ TAY: KG82_KIND.hoadien + KG82_ENG.hoadien (same board, same hdQ, reads env.lv via BAL.mgTier.lev.hoadien) → listed by jmgcal mgCalKinds.
   - FOREHEAD ANCHOR: from the face mesh (img/mk-fit: brows' inner ends, raised BAL.hd.up × eye distance, perpendicular to the eye line); a
     per-face table from Foreman C (window.HD_ANCHOR[file] = [x,y] in 1/4000 of the picture) wins when it exists. Painted hoa điền on the
     portraits stay until C ships clean foreheads (brief: hide only if C says it is a separate layer).
   ============================================================================================================== */
Object.assign(BAL,{hd:{
 ink:{hd_mai:.67,hd_dao:.64,hoadien_bac:.63,hd_diep:.56,hd_lan:.59,hd_sen:.54,hd_maudon:.55,hd_phuong:.43},/* r3 (owner ~23:40Z "cùng 13.5 mà có cái to cái nhỏ"): share of each sprite's box that is INK (alpha > 40, measured once offline on the 8 sprites; the sprites are already trimmed to their mark, so the box = the visible bbox) */
 tone:{on:1,sat:.85,metal:{h0:28,h1:62,s:.35,v:.55}},/* r3 (owner 01:18Z "hạ cái saturate là được, pha màu vô còn chi"): tone = SATURATION ONLY, baked once into the layer canvas: each non-metal pixel keeps its luminance and its hue, its distance from that grey is scaled by sat (no darken, no lift to white, opacity untouched). Gold / metal pixels (hue h0..h1 deg, s, v) are left alone. on:0 = off */
 sizeByRank:[.115,.115,.115,.125,.125,.135,.135,.135],/* r3 (owner ~23:55Z): size = share of face width BY THE WEARER'S RANK, indexed like RANKS (Đáp ứng, Thường tại, Quý nhân = 11.5 % · Tần, Phi = 12.5 % · Quý phi, Hoàng quý phi, Hoàng hậu = 13.5 %); BAL.hd.size is the fallback. The equal-visible-area rule (inkK) then sizes every design inside that share */
 inkK:.6,inkDef:.6,    /* every design gets the same visible INK AREA = inkK × (size × face width)² (a design with less ink per box is drawn bigger) */
 boxW:1.5,boxH:1.5,    /* … still capped: width ≤ boxW × size × face width, height ≤ boxH × size × face width (forehead cap for tall designs). */
           /* r3 (owner 17/11 ~23:00Z): a hoa điền is sized to FIT a box, width ≤ size × face width AND height ≤ boxH × that width (scaled by the LIMITING side), so wide (mẫu đơn), round and tall (kim phượng) designs read the same visual size */
 size:.135,            /* sticker width / face width (owner's pick 0.085, Foreman C huadian-size) */
 up:.38,           /* anchor: above the brows' inner-end midpoint, × eye distance, perpendicular to the eye line */
 tolD:.24,tolA:30,     /* q of a part falls to 0 at this distance (× eye distance) / this tilt (degrees). r1: .45 → .24 = careful-bot top grade
                          70 % → ~25 % at Vừa (ease 2) while the painted hoa điền still marks the spot; RE-MEASURE when clean foreheads land */
 wD:.7,wA:.3,          /* share of distance vs tilt in q */
 skTol:.5,             /* her makeup skill (toilSkill .sk 0..1) widens both tolerances by up to +50 % */
 mkLv:2,               /* board ease of the makeup step (0..5 like env.lv); r1: 3 → 2 = BAL.mgTier.mid (Vừa at matching level) */
 a0:[12,24],           /* the hoa điền comes off the tray tilted this many degrees (hashed per day; she straightens it) */
 rot:3,                /* degrees per tilt tap */
 npc:{q0:.5,qSk:.3,spread:.4},npcCap:.95,
 drop:["hd_mai","hoadien_bac"],/* TEMPORARY until Foreman C's repaint lands (owner 02:37Z: dropped designs are REPAINTED under the SAME keys: hd_mai = real white plum, hoadien_bac = silver + lưu ly with gradient); when the new sprites land, empty this list and the keys come back (no save mapping needed then). r3 (owner 00:56Z: a design that is ONE flat colour is dropped; the rule is how it LOOKS): hoa điền designs no longer given out (shop, gifts, finds, promotion, NPC holdings). The items stay in the table so old saves still show them; hdMap sends an owned / recorded one to the nearest KEPT design by phẩm (tie: the lower). Dropping another design later = one more key in this list. */
 shop:35,              /* % a restock brings a hoa điền */
 npcHave:60,           /* % a consort holds one (once) */
 find:4,               /* % per month her people find one */
 pop:[.8],             /* q ≥ [0] "ngay ngắn"; below BAL.toil.fail = "dán vụng" (the same cut that makes any makeup part vụng); between: "hơi lệch" */
 vungA:9,              /* r2 (owner OD 17/11 ~21:03Z): the SHOWN hoa điền always sits at the forehead anchor; a vụng one (q < BAL.toil.fail) shows this fixed tilt */
 edFw:.42,
 npcShow:0}});         /* r3 (MAIN s38 22:15Z): NPCs' hoa điền layer OFF until Foreman C's per-face HD_ANCHOR lands (stale meshes put it off the forehead on some figures); her own (and the co-op friend's) stays ON */          /* eye distance / face width (fallback when a picture has no face-width row) */
/* board ease → tolerance (mgLev reads BAL.mgTier.lev[kind][name]: ease 0 → [0], ease 5 → [1]) */
try{BAL.mgTier.lev=BAL.mgTier.lev||{};BAL.mgTier.lev.hoadien={tol:[.7,1.2]}}catch(e){}

/* ---------- items ---------- */
function hdDropped(k){return !!(BAL.hd.drop&&BAL.hd.drop.includes(k))}
function hdKeptNear(P){const K=WD_LIST.filter(r=>r[1]==="hd"&&!hdDropped(r[0]));if(!K.length)return[];let best=1e9;K.forEach(r=>{best=Math.min(best,Math.abs(r[3]-P))});const c=K.filter(r=>Math.abs(r[3]-P)===best);const lo=Math.min(...c.map(r=>r[3]));return c.filter(r=>r[3]===lo).map(r=>r[0])}
function hdMap(k){if(!hdDropped(k))return k;const w=WD_ITEMS[k];const L=hdKeptNear(w?w.P:1);return L.length?L[0]:k}
function hdIsK(k){const w=typeof WD_ITEMS==="object"?WD_ITEMS[k]:null;return !!(w&&w.sl==="hd")}
function hdOwned(p){const L=[];const seen={};for(const e of ((p&&p.inv)||[])){if(e&&!e.h&&hdIsK(e.k)&&hdDropped(e.k))e.k=hdMap(e.k);if(e&&!e.h&&hdIsK(e.k)&&!seen[e.k]){seen[e.k]=1;L.push(e)}}return L.sort((a,b)=>WD_ITEMS[b.k].P-WD_ITEMS[a.k].P)}
function hdLux(rec){return rec&&rec.k&&hdIsK(rec.k)?wdLux(rec.k):0}
function hdPick(P){try{return wdPickAt(P,"hd",0)}catch(e){return null}}
/* the sprite placed on the face: img/hd-<key>.webp (transparent, Foreman C ART REQUEST) — until it exists, the item's own picture */
const HD_IMG={};function hdImg(k){let i=HD_IMG[k];if(i)return i;const w=WD_ITEMS[k];i=new Image();i.decoding="async";const U=s=>typeof IMG_U==="function"?IMG_U(s):s;
 /* r1: 7 of the 8 have no painting yet (neither hd-<key> nor wd-hd-*): the board must never show an invisible sticker → last fallback = the one
    painted hoa điền that exists (wd-hoadien-bac), until Foreman C ships the sprites */
 const fb=[w&&w.icon,WD_ITEMS.hoadien_bac&&WD_ITEMS.hoadien_bac.icon].filter((s,j,a)=>s&&a.indexOf(s)===j);
 i.onerror=()=>{const n=i.__fb|0;if(n<fb.length){i.__fb=n+1;i.src=U(fb[n])}};i.src=U(`img/hd-${k.replace(/_/g,"-")}.webp`);return HD_IMG[k]=i}

/* ---------- vụng = below the ONE makeup fail cut (BAL.toil.fail), for her, NPCs and every view ---------- */
function hdVung(q){return typeof q==="number"&&q<BAL.toil.fail}
/* ---------- the score: ONE formula for her, NPCs, the bot and Thử tay ---------- */
function hdQ(d,a,sk,lvF){const B=BAL.hd;const tf=(1+B.skTol*Math.max(0,Math.min(1,sk||0)))*(lvF||1);
 const qd=Math.max(0,Math.min(1,1-d/(B.tolD*tf))),qa=Math.max(0,Math.min(1,1-Math.abs(a)/(B.tolA*tf)));return B.wD*qd+B.wA*qa}
function hdLvF(lv){try{const v=mgLev({lv},"hoadien","tol");if(v!=null)return v}catch(e){}return 1}
/* NPC / bot: her best hoa điền for her phẩm (Kiêu ngạo / Tham vọng reach one above), q from her hand (hashed per day: no Math.random) */
function hdNpc(v,h,sk){try{const L=hdOwned(v);if(!L.length)return null;let cap=Math.min(8,wdPOf(v));try{if(v!==S&&wdNpcBias(v)>0)cap++}catch(e){}
  const e=L.find(x=>WD_ITEMS[x.k].P<=cap)||L[L.length-1];const B=BAL.hd;
  let c=B.npc.q0+B.npc.qSk*(sk||0);try{const H=BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.hand;if(v!==S&&H&&H.on&&typeof mgHandEff==="function")c=(mgHandEff("hoadien",v)-H.w/2)/10}/* fair spread (OD 20/11): her average play (hand + art / upbringing lift − w/2) */catch(x){}
  const r=i=>(wdHash(String(h)+":hd"+i)%1000)/1000;const q=Math.max(0,Math.min(B.npcCap,c+(r(1)+r(2)-1)*B.npc.spread));return{k:e.k,q:+q.toFixed(3)}}catch(x){return null}}

/* ---------- forehead anchor (canvas coords) of a face drawn at img {x,y,w,h} ---------- */
function hdTone(g,S){const T=BAL.hd.tone;if(!T||!T.on||T.sat>=1)return;try{const im=g.getImageData(0,0,S,S),d=im.data,M=T.metal;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;let r=d[i],gg=d[i+1],b=d[i+2];const mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),sat=mx?(mx-mn)/mx:0,v=mx/255;let h=0;if(mx!==mn){const dl=mx-mn;h=mx===r?((gg-b)/dl)%6:mx===gg?(b-r)/dl+2:(r-gg)/dl+4;h=(h*60+360)%360}
 if(h>=M.h0&&h<=M.h1&&sat>=M.s&&v>=M.v)continue;const L=.299*r+.587*gg+.114*b;d[i]=Math.max(0,Math.min(255,L+(r-L)*T.sat));d[i+1]=Math.max(0,Math.min(255,L+(gg-L)*T.sat));d[i+2]=Math.max(0,Math.min(255,L+(b-L)*T.sat))}g.putImageData(im,0,0)}catch(x){}}
function hdSizeOf(p){try{let r=(typeof wdPOf==="function"?wdPOf(p):1)-1;r=Math.max(0,Math.min(7,r|0));const z=BAL.hd.sizeByRank&&BAL.hd.sizeByRank[r];return z||BAL.hd.size}catch(e){return BAL.hd.size}}
function hdFit(key,nw,nh,fw,size){const B=BAL.hd,wm=(size||B.size)*fw,ink=(B.ink&&B.ink[key])||B.inkDef;const ka=Math.sqrt(B.inkK*wm*wm/(ink*nw*nh)),k=Math.min(ka,wm*B.boxW/nw,wm*B.boxH/nh);return{w:nw*k,h:nh*k,k}}
function hdAnchor(file,img,fws,G){const B=BAL.hd;let m=null;try{m=MK_FIT.get(file)}catch(e){}
 const P=i=>[img.x+m[2*i]/4000*img.w,img.y+m[2*i+1]/4000*img.h];
 if(m&&m.length>=120){const eye=s=>{let x=0,y=0;for(let i=0;i<10;i++){const p=P(s+i);x+=p[0]/10;y+=p[1]/10}return[x,y]};const E=[eye(20),eye(30)].sort((a,b)=>a[0]-b[0]);
  const ed=Math.hypot(E[1][0]-E[0][0],E[1][1]-E[0][1])||fws*BAL.hd.edFw,ang=Math.atan2(E[1][1]-E[0][1],E[1][0]-E[0][0]),mx=(E[0][0]+E[1][0])/2;
  let at=null;try{const o=window.HD_ANCHOR&&window.HD_ANCHOR[file];if(o)at=[img.x+o[0]/4000*img.w,img.y+o[1]/4000*img.h]}catch(e){}
  if(!at){/* r2: the brow's inner END on its centre line = mean of the 2 contour points nearest the face midline (upper + lower edge) */const inner=s=>{const L=[];for(let i=0;i<10;i++)L.push(P(s+i));L.sort((a,b)=>Math.abs(a[0]-mx)-Math.abs(b[0]-mx));return[(L[0][0]+L[1][0])/2,(L[0][1]+L[1][1])/2]};const a=inner(40),b=inner(50);
   const mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];at=[mid[0]+Math.sin(ang)*B.up*ed,mid[1]-Math.cos(ang)*B.up*ed]}
  return{x:at[0],y:at[1],ed,ang:ang*180/Math.PI,mesh:true}}
 /* no face points: the face box of toil-fit (top-centre of the face), so the board still plays */
 if(G&&G.T){const p=G.T(.5,.06);return{x:p[0],y:p[1],ed:fws*BAL.hd.edFw,ang:0,mesh:false}}return null}

/* ---------- the board: drag + tilt + Dán. o = {C, G, file, box, k, sk, lvF, paint(g,now), label, seed, onEnd(q,info)} ---------- */
function hdBoard(o){const B=BAL.hd,{C,G}=o,{g,W,H}=C;let stop=false,raf=0;const pops=[];
 const A=hdAnchor(o.file,G.img,G.fws,G);const img=hdImg(o.k);
 const sgn=(o.seed%2)?1:-1;let ang=(A?A.ang:0)+sgn*(B.a0[0]+(o.seed%1000)/1000*(B.a0[1]-B.a0[0]));
 let pos=[G.mx+G.rx*.42,G.my+G.ry*.62];let drag=null;
 const Wd=()=>B.size*G.fws;
 function sticker(){if(!img.complete||!img.naturalWidth)return;const F=hdFit(o.k,img.naturalWidth,img.naturalHeight,G.fws,hdSizeOf(S)),w=F.w,h=F.h;g.save();g.translate(pos[0],pos[1]);g.rotate(ang*Math.PI/180);g.drawImage(img,-w/2,-h/2,w,h);g.restore()}
 function frame(now){if(stop)return;o.paint(g,now);sticker();kg82DrawPops(g,pops,now);raf=requestAnimationFrame(frame)}
 function down(e){if(stop)return;e.preventDefault();drag=C.at(e);try{C.cv.setPointerCapture(e.pointerId)}catch(x){}}
 function move(e){if(stop||!drag)return;const p=C.at(e);pos=[Math.max(0,Math.min(W,pos[0]+p[0]-drag[0])),Math.max(0,Math.min(H,pos[1]+p[1]-drag[1]))];drag=p}
 function up(){drag=null}
 C.cv.addEventListener("pointerdown",down);C.cv.addEventListener("pointermove",move);C.cv.addEventListener("pointerup",up);C.cv.addEventListener("pointercancel",up);
 function result(){const d=A?Math.hypot(pos[0]-A.x,pos[1]-A.y)/A.ed:9;let a=((ang-(A?A.ang:0))%360+540)%360-180;const q=hdQ(d,a,o.sk,o.lvF);
  return{q,info:{k:o.k,dx:A?+((pos[0]-A.x)/A.ed).toFixed(3):0,dy:A?+((pos[1]-A.y)/A.ed).toFixed(3):0,a:+a.toFixed(1)}}}
 function commit(){if(stop)return;const R=result();const vung=hdVung(R.q);const t=R.q>=B.pop[0]?"Hoa điền ngay ngắn giữa trán!":vung?"Dán vụng mất rồi":"Hơi lệch một chút";
  kg82Pop(pops,A?A.x:W/2,(A?A.y:H*.3)-G.fws*.12,t,vung?kg82Col("--red","#c23b22"):kg82Col("--good","#2d7a52"));
  /* r2 (owner OD 17/11 ~21:03Z "tôi gắn sao kệ tôi, nhưng mà kết quả cuối cùng thì nó vẫn sẽ là theo cái vị trí mà tôi muốn"): the result snaps to the
     forehead anchor; straight when good, the fixed vụng tilt when low — the same look every view then draws (hdFaceLayer) */
  if(A){pos=[A.x,A.y];ang=A.ang+(vung?B.vungA:0)}
  const a=o.box.querySelector(".kg82act");if(a)a.remove();setTimeout(()=>{stop=true;cancelAnimationFrame(raf);o.onEnd(R.q,R.info)},900)}
 const act=`<div class="kg82act"><button class="${kg82Btn(true)}" id="hdl">Nghiêng trái</button><button class="${kg82Btn(true)}" id="hdr">Nghiêng phải</button><button class="${kg82Btn()}" id="hdok">Dán</button></div>`;
 const old=o.box.querySelector(".kg82act");if(old)old.remove();o.box.insertAdjacentHTML("beforeend",act);
 $("hdl").onclick=()=>{ang-=B.rot};$("hdr").onclick=()=>{ang+=B.rot};$("hdok").onclick=commit;
 raf=requestAnimationFrame(frame);
 /* test oracle (like KG82.peek): where the anchor and the sticker are, in client px */
 HD.peek=()=>A?{anchor:C.client(A.x,A.y),at:C.client(pos[0],pos[1]),ang,ideal:A.ang,ed:A.ed*(C.cv.getBoundingClientRect().width/W),mesh:A.mesh}:null;
 return{stop:()=>{stop=true;cancelAnimationFrame(raf)},result}}
const HD={peek:()=>null};window.HD=HD;

/* ---------- the makeup step (called by jtoil toilMakeup after the lips; return true = it took over) ---------- */
function hdStep(ctx){try{if(!S||!TOIL.st)return false;const L=hdOwned(S);if(!L.length)return false;const st=TOIL.st;
 TOIL.hdLbl="Chọn một hoa điền để dán";/* keep the glass painted while she chooses (pictures may still be arriving) */let pk=true;const loop=()=>{if(!pk)return;ctx.draw();requestAnimationFrame(loop)};loop();KG82.run={stop:()=>{pk=false}};
 const btn=e=>{const w=WD_ITEMS[e.k];return `<button class="${kg82Btn(true)}" data-hdk="${e.k}">${w.n}<small>${KIT_GRADE[w.g|0].n} · xa xỉ ${wdLux(w.k)}</small></button>`};
 const old=ctx.box.querySelector(".kg82act");if(old)old.remove();
 ctx.box.insertAdjacentHTML("beforeend",`<div class="kg82act">${L.map(btn).join("")}<button class="${kg82Btn(true)}" data-hdk="">Không dán<small>để trán trơn</small></button></div>`);
 try{toilHUD({round:"Hoa điền",time:"thong thả"})}catch(e){}
 ctx.box.querySelectorAll("[data-hdk]").forEach(b=>b.onclick=()=>{pk=false;const k=b.dataset.hdk;try{sfx("tap")}catch(e){}
  if(!k){const a=ctx.box.querySelector(".kg82act");if(a)a.remove();TOIL.hdLbl="";ctx.done();return}
  TOIL.hdLbl="Kéo hoa điền vào giữa trán, nghiêng cho cân";
  const run=hdBoard({C:ctx.C,G:ctx.G,file:ctx.file,box:ctx.box,k,sk:(st.sk&&st.sk.sk)||0,lvF:hdLvF(BAL.hd.mkLv),seed:wdHash(k+":"+toilWk()),paint:()=>ctx.draw(),
   onEnd:(q,info)=>{st.parts.hd=q;st.hd=info;TOIL.hdLbl="";ctx.done()}});
  KG82.run={stop:run.stop}});
 return true}catch(e){console.error("hdStep",e);return false}}

/* ---------- r2 (owner OD 17/11 ~21:03Z): the SHOWN hoa điền on every picture of a person (portrait, figure on the stage, avatar, mirror reveal,
   NPCs, co-op friend) — one layer through kitFxLayers, like the makeup colour layer. ALWAYS at that picture's forehead anchor (face mesh /
   HD_ANCHOR), never where she dragged it; straight when q ≥ BAL.toil.fail, the fixed tilt BAL.hd.vungA when vụng. Size BAL.hd.size × face width.
   Painted once per (picture, hoa điền, vụng) into a transparent canvas the size of the picture; a picture without face points shows none (never guessed). */
const HD_FL={},HD_FLQ=[];
function hdShown(p){try{const r=typeof toilMkRec==="function"?toilMkRec(p):null;if(!r||!r.makeup||!r.hd||!hdIsK(r.hd.k))return null;return{k:hdMap(r.hd.k),vung:hdVung(r.hd.q),sz:hdSizeOf(p)}}catch(e){return null}}
function hdFaceLayer(p,file){if(!BAL.hd.npcShow&&p&&p!==S&&!p.coop)return"";const sh=hdShown(p);if(!sh||!file)return"";let v=null;try{v=MK_FIT.get(file)}catch(e){}if(!v)return"";
 const key=[file,sh.k,sh.vung?1:0,sh.sz].join("|");let e=HD_FL[key];if(!e){e=HD_FL[key]={src:"",box:null};HD_FLQ.push(key);if(HD_FLQ.length>80)delete HD_FL[HD_FLQ.shift()];hdFlPaint(file,sh,e,key)}
 return `<img class="kmkl" data-hdl="${key}" src="${e.src||TOIL_BLANK}" alt="" aria-hidden="true" style="${hdBoxCss(e.box)}">`}
function hdBoxCss(b){b=b||[0,0,100,100];return `--fleft:${b[0]}%;--ftop:${b[1]}%;--fwidth:${b[2]}%;--fheight:${b[3]}%`}
/* r3 (owner OD 17/11 ~22:40Z "cái hình hoa điền vẽ nét lắm mà sao đưa tao hình mà câm"): ROOT CAUSE of the soft look = the layer was a
   picture-sized canvas (≤1024 px wide) and the sprite (192 px native) was drawn into it at ~30 canvas px, then the whole canvas was scaled again
   to the display size × dpr (two resamplings, the first one down to a few pixels). Now the layer is a TIGHT canvas holding the sprite at its
   NATIVE resolution (rotated inside its own bounding square) and the <img> is placed over the picture with the --f* box (percent of the picture),
   so the browser resamples the full-res sprite ONCE, to display size × dpr, in every view (stage, portrait, mirror, NPC, co-op friend). */
function hdFlPaint(file,sh,e,key){const U=s=>typeof IMG_U==="function"?IMG_U(s):s;const face=new Image();face.decoding="async";const spr=new Image();spr.crossOrigin="anonymous";spr.decoding="async";
 let n=0;const go=()=>{if(++n<2)return;try{if(!face.naturalWidth||!spr.naturalWidth){e.src=TOIL_BLANK;return}
   const B=BAL.hd,K=Math.min(1,1024/face.naturalWidth),W=Math.round(face.naturalWidth*K),H=Math.round(face.naturalHeight*K);
   let fw=0;try{const r=toilRow(file);if(r&&r[6])fw=r[6]/100*W}catch(x){}
   const A=hdAnchor(file,{x:0,y:0,w:W,h:H},fw||W*.3,null);if(!A){e.src=TOIL_BLANK;return}if(!fw)fw=A.ed/B.edFw;
   const nw=spr.naturalWidth,nh=spr.naturalHeight,S=Math.ceil(Math.hypot(nw,nh))+2,sc=hdFit(sh.k,nw,nh,fw,sh.sz).k,bs=S*sc;/* bs = side of the tight box in picture canvas px */
   const c=document.createElement("canvas");c.width=S;c.height=S;const g=c.getContext("2d");g.imageSmoothingEnabled=true;g.imageSmoothingQuality="high";
   const ang=A.ang+(sh.vung?B.vungA:0);g.translate(S/2,S/2);g.rotate(ang*Math.PI/180);g.drawImage(spr,-nw/2,-nh/2,nw,nh);hdTone(g,S);
   e.box=[(A.x-bs/2)/W*100,(A.y-bs/2)/H*100,bs/W*100,bs/H*100];e.src=c.toDataURL("image/png");e.at=[A.x/W,A.y/H,ang]}catch(x){e.src=TOIL_BLANK}
  document.querySelectorAll("img[data-hdl]").forEach(x=>{if(x.dataset.hdl===key){x.src=e.src;x.style.cssText=hdBoxCss(e.box)}})};
 face.onload=go;face.onerror=go;spr.onload=go;spr.onerror=()=>{const w=WD_ITEMS[sh.k];if(!spr.__fb&&w&&w.icon){spr.__fb=1;spr.src=U(w.icon)}else go()};
 face.src=U("img/"+file);spr.src=U(`img/hd-${sh.k.replace(/_/g,"-")}.webp`)}
if(typeof kitFxLayers==="function"){const fx0=kitFxLayers;kitFxLayers=function(p,file){const h=fx0.apply(this,arguments);let m="";try{m=hdFaceLayer(p,file)}catch(e){}return h+m}}
window.hdFaceLayer=hdFaceLayer;window.HD_FL=HD_FL;window.hdVung=hdVung;

/* ---------- Thử tay / mini-game kind: the same board on her own face ---------- */
function kgHoaDien(box,env){const C=kg82Canvas(box,.86,620),{g,W,H}=C;C.cv.style.touchAction="none";let por={src:""};try{por=toilPor()}catch(e){}
 const file=String(por.src||"").split("?")[0].split("/").pop();const G=toilGeom(W,H,por.src);const face=new Image();face.decoding="async";face.src=typeof IMG_U==="function"?IMG_U(por.src):por.src;
 const k="hoadien_bac";let run=null,stop=false,raf=0;const t0=performance.now();
 function paint(gg){gg.fillStyle="#efe0c6";gg.fillRect(0,0,W,H);const bg=kg82Img("chai-bg");if(bg.complete&&bg.naturalWidth)gg.drawImage(bg,G.bg.x,G.bg.y,G.bg.s,G.bg.s);
  gg.save();gg.beginPath();gg.ellipse(G.mx,G.my,G.rx,G.ry,0,0,Math.PI*2);gg.clip();gg.fillStyle="#d9c7a3";gg.fillRect(G.mx-G.rx,G.my-G.ry,G.rx*2,G.ry*2);
  if(face.complete&&face.naturalWidth)gg.drawImage(face,G.img.x,G.img.y,G.img.w,G.img.h);gg.restore();
  gg.font=`700 15px ${kg82Col("--display","serif")}`;gg.textAlign="center";gg.fillStyle=kg82Col("--ink","#2a1a12");kg82Lbl(gg,run?"Kéo hoa điền vào giữa trán, nghiêng cho cân":"Đang soi gương…",W/2,22,W-20)}
 /* wait for THIS face's points (like the makeup board), then the board; no points after BAL.toil.meshWait → the face-box anchor */
 function wait(now){if(stop)return;let m=null;try{m=MK_FIT.get(file)}catch(e){}if(m||now-t0>BAL.toil.meshWait){let sk=0;try{sk=toilSkill().sk}catch(e){}
   run=hdBoard({C,G,file,box,k,sk,lvF:hdLvF(env.lv),seed:wdHash(k+":"+Date.now()),paint,onEnd:q=>{if(!stop){stop=true;env.end(Math.round(q*100)/10)}}});return}
  paint(g);raf=requestAnimationFrame(wait)}
 raf=requestAnimationFrame(wait);
 return()=>{stop=true;cancelAnimationFrame(raf);if(run)run.stop()}}
try{KG82_ENG.hoadien=kgHoaDien;KG82_KIND.hoadien={e:"hoadien",n:"Dán hoa điền",t:"Điểm trang trước gương",how:"Kéo hoa điền vào giữa trán, nghiêng cho cân với đôi mắt rồi bấm Dán. Không tính giờ: đặt càng khớp càng được phần."};
 KG82_SPR.hoadien=["chai-bg"]}catch(e){console.error("hd kind",e)}

/* ---------- getting one: shop, NPC hands (→ their gifts), found, +1 per promotion ---------- */
(function(){if(typeof restock!=="function")return;const r0=restock;restock=function(){const r=r0.apply(this,arguments);try{if(roll(BAL.hd.shop)){const k=hdPick(Math.max(1,Math.min(8,wdPOf(S)-1+R(3))));if(k&&!S.shop.includes(k))S.shop.push(k)}}catch(e){}return r}})();
(function(){if(typeof wdNpcInit!=="function")return;const n0=wdNpcInit;wdNpcInit=function(v){const r=n0.apply(this,arguments);try{if(v&&!v.hdI){v.hdI=1;if(roll(BAL.hd.npcHave)){const k=hdPick(Math.max(1,Math.min(8,wdPOf(v)-1+R(2))));if(k){v.inv=v.inv||[];v.inv.push({k,from:"base0"})}}}}catch(e){}return r}})();
function hdGive(p,why){const P=Math.max(1,Math.min(8,wdPOf(p)));const k=hdPick(P);if(!k)return"";const g=wdGain(p,k,{from:why==="promo"?"nvp":"find",nvp:why==="promo"});if(!g)return"";const n=WD_ITEMS[k].n;
 if(p!==S)return"";return why==="promo"?` Nội vụ phủ đưa sang một <b>${n}</b> mừng tấn phong (đã vào Rương).`:`Cung nữ dọn rương cũ, tìm được một ${n}.${g.txt||""}`}
(function(){if(typeof promoteP!=="function")return;const p0=promoteP;promoteP=function(p){const r0=rkOf(p),al=p===S||p.alive;const r=p0.apply(this,arguments);
 try{if(al&&rkOf(p)>r0){const t=hdGive(p,"promo");if(t&&typeof r==="string")return r+t}}catch(e){console.error("hd promo",e)}return r}})();
(function(){if(typeof wdMonth!=="function")return;const m0=wdMonth;wdMonth=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead&&!S.out&&roll(BAL.hd.find)){const t=hdGive(S,"find");if(t)try{log(t)}catch(e){}}}catch(e){}return r}})();

/* ---------- old saves: a hoa điền worn in the Cài tóc slot (it was a "tram" until hoa-dien) goes back to the chest ---------- */
(function(){const o0=wdOf;wdOf=function(p){const w=o0.apply(this,arguments);try{if(w&&w.tram&&hdIsK(w.tram.k)){const e=w.tram;w.tram=null;if(e.from!=="base"){p.inv=p.inv||[];p.inv.push(e)}const k=wdDefault(p,"tram");if(k)w.tram={k,from:"base"}}}catch(e){}return w};window.wdOf=wdOf})();
window.hdQ=hdQ;window.hdNpc=hdNpc;window.hdOwned=hdOwned;window.hdAnchor=hdAnchor;window.hdLux=hdLux;window.hdStep=hdStep;
