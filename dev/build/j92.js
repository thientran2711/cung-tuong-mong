/* ================= j92: VẬT PHẨM · TRANG PHỤC · MẠNG CHE MẶT (logic + data only; UI through kit components) ================= */
/* ---- KIT_VEIL: pearl-strand face veils by rank (hủy dung, j70 scarOf(p).veil / p.scar.veil) ----
   img/veil-t1..t8.png (480x445, transparent, gpt-2-6): one per consort rank 0..7 (Đáp ứng → Hoàng hậu), richer each step:
     t1 plain silver, pearls + pale blue/lilac glass · t2 rose silk cord, clear glass + seed pearls · t3 engraved silver, pearls + pink glass · t4 pale gold, carnelian ·
     t5 gold flower band, jade + ruby · t6 gold clouds, big pearls + emerald · t7 gold filigree, peony hooks, 2 layers + ruby + gold tassels ·
     t8 gold filigree + kingfisher blue, phoenix hooks, 3 layers, rubies + large pearls.
   Consorts t1..t8 are bead strands of the same density. Cung nữ, ma ma, lãnh cung wear a thin SILK veil: img/veil-silk-ivory.png (default) or img/veil-silk-pink.png (embroidered); tierOf: ivory for cung nữ m0–m1 and lãnh cung, pink for cung nữ m2–m4 and ma ma (owner 11/14).   img/veil.png = t5 (old name kept).
   img/veil-por.png 384x506 / veil-fig.png 385x900: t5 pre-placed for the median face (fallback only).
   img/veil-fit.json: { "<por-/fig- file>": [left%, top%, width%, height%, rotateDeg] } measured on every women's image
     (por-*: % of the 384x506 portrait OPENING, j60 .kpor geometry; fig-*: % of the figure image box). The box is for t5 (band at 16.5%).
   style(file,tier) adapts the box to each tier's own band height (band[] = band centre as a fraction of the image height),
   so the band always sits on the nose bridge under the eyes and the strands end a little past the chin.
   Kit use: <img src="${KIT_VEIL.src(KIT_VEIL.tierOf(p))}" style="position:absolute;${KIT_VEIL.style(file,tier)}"> above the portrait,
   above KIT_SCAR, below the frame. */
window.KIT_VEIL={tiers:["t1","t2","t3","t4","t5","t6","t7","t8","silk-ivory","silk-pink"],silk:"silk-ivory",band:{t1:.166,t2:.171,t3:.155,t4:.18,t5:.169,t6:.144,t7:.128,t8:.11,silk:.153,"silk-ivory":.153,"silk-pink":.16},B0:.165,
 por:"img/veil-por.png",fig:"img/veil-fig.png",fitUrl:"img/veil-fit.json",fit:null,
 src:function(t){if(t==="silk")t=this.silk;t=this.band[t]!=null?t:"t5";return `img/veil-${t}.png`},
 on:function(p){try{return !!(p&&p.scar&&p.scar.veil)}catch(e){return false}},
 tierOf:function(p){try{if(!p)return "t5";const rr=typeof personRoleRank==="function"?personRoleRank(p):null;
   if(rr){if(rr.role==="cold")return "silk-ivory";if(rr.role==="mama")return "silk-pink";if(rr.role==="maid")return srkTier(rr.rank|0)>=2?"silk-pink":"silk-ivory";/* rung → tier (maid-ladder-6) */if(rr.role==="player"||rr.role==="consort")return "t"+(Math.max(0,Math.min(7,rr.rank|0))+1);if(rr.role==="thaihau")return "t8"}
   if(p.cold||p.lanh)return KIT_VEIL.silk;const r=typeof rkOf==="function"?rkOf(p):p.rank;return r!=null?"t"+(Math.max(0,Math.min(7,r|0))+1):"t5"}catch(e){return "t5"}},
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
 style:function(file){const r=this.rect(file);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg) scaleX(-1);transform-origin:${this.origin}`},
 load:function(){if(this.fit||this._ld)return;this._ld=1;try{fetch(this.fitUrl).then(r=>r.ok?r.json():null).then(j=>{if(j)KIT_SCAR.fit=j}).catch(()=>{})}catch(e){}}};
try{KIT_SCAR.load()}catch(e){}

/* =====================================================================================================================
   TRANG PHỤC: two worn slots for every woman (player, consorts, maids, ma ma, Thái hậu): TRÂM CÀI and Y PHỤC.
   Portraits never change; the slots are data shown by the kit (wdSlots). Design + numbers: dev/WARDROBE.md.
   Phẩm phục scale P: 0 = cung nhân (cung nữ, ma ma, lãnh cung), 1..8 = Đáp ứng .. Hoàng hậu (consort rank+1), Thái hậu 9.
   Each garment has a TRUE P (hidden) and a visible grade (Thường / Tinh phẩm / Trân phẩm / Tuyệt phẩm / Ngự tứ).
   Nobody knows an item's P until it is revealed (a remark, an accusation, tai mắt, a ma ma tinh ý); the player's
   knowledge is S.wdk[k], recorded in the Sổ ghi. NPCs also judge with noise (two-way, equal).
   ===================================================================================================================== */
const WD={/* KNOBS (dev/WARDROBE.md §Núm) */
 wT:.4,wY:.6,            /* outfit level L = wT*P(trâm) + wY*P(y phục); an empty trâm counts P 0 */
 over:.75,               /* L - P(self) >= over  → Vượt phẩm */
 under:-1.75,            /* L - P(self) <= under → Quá giản dị (one step lower is fine, two or more is looked down on) */
 underFest:-1.0,         /* on festival days (lễ lớn) the plain line is stricter */
 overSac:2,overSung:1,overGhen:1,   /* monthly while Vượt phẩm: Sắc (effective), Sủng chance, rivals' jealousy */
 underDanh:1,festUnderDanh:2,festOkDanh:1,  /* Danh lost per month when too plain; extra on a festival; gained when right on a festival */
 tangPunish:1,           /* red/yellow worn in quốc tang: punishment level */
 mamaReveal:30,          /* % a trusted ma ma names the P of a new item */
 autoErr:[0,0,1,-1,1,-1,2,-2],      /* Tự chọn: hidden noise drawn once per unknown item kind (in P steps) */
 groomBase:.26,groomTai:300,groomArt:.02,groomMama:.10,groomMax:.5,groomSec:10,
 sellLo:40,sellHi:60,sellRisk:12,sellDanh:3,       /* bán lén via ma ma / thái giám: % of price, % chance the need leaks, Danh lost */
 pawnPct:50,redeemPct:60,pawnWeeks:12,            /* cầm cố: get 50% now, redeem for 60% within 12 tuần, else lost */
 rewardGarment:45,ntSon:35,ntPromo:25,ntContest:15,ntStory:60,ntTH:1, /* % chances a bestowal brings a garment / a ngự tứ */
 frameMalice:60,frameHost:60,frameP:3,            /* NPC giá họa: needs malice and hostility, % per month */
 warnBase:20,                                     /* tai mắt warning before a frame-up lands */
 traceBase:35,traceMat:5,clearBase:55,clearMat:5};
const WD_GRADE=["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm","Ngự tứ","“Phẩm của {P} mà dùng được món này, e là có ai ban riêng?”","“Người ngoài nhìn vào còn tưởng {P} là cung nữ.”"];
const WD_PR=[12,20,30,45,70,100,150,220,320];
function wdPName(P){return P<=0?"cung nhân":P>=9?"Thái hậu":P>=8?"Hoàng hậu":RANKS[P-1]?RANKS[P-1].n:"?"}
/* catalogue: [key, slot, name, P, grade, colour, effect, note]; colour do/vang count as festive (forbidden in quốc tang) */
const WD_LIST=[
 ["tram_dao","tram","Trâm gỗ đào",0,0,"nau",{sac:1}],["tram_dong","tram","Trâm đồng mai hoa",0,0,"vang",{sac:1}],
 ["tramngoc","tram","Trâm ngọc bích",1,0,"xanh",{sac:2}],["tram_hoalua","tram","Trâm hoa lụa",1,0,"hong",{sac:2}],
 ["tram_ngoclan","tram","Trâm bạc ngọc lan",2,1,"trang",{sac:2}],["thoa_diep","tram","Thoa bạc song điệp",2,1,"trang",{sac:3}],
 ["tram_hong","tram","Trâm thạch anh hồng",3,1,"hong",{sac:3}],["hd_mai","hd","Hoa điền mai trắng",1,0,"trang",{}],["hd_dao","hd","Hoa điền hoa đào",2,0,"hong",{}],["hoadien_bac","hd","Hoa điền bạc khảm lưu ly",3,2,"lam",{}],
 ["hd_diep","hd","Hoa điền hồ điệp",4,2,"lam",{}],["hd_lan","hd","Hoa điền lá lan phỉ thúy",5,2,"xanh",{}],["hd_sen","hd","Hoa điền liên hoa hồng ngọc",6,2,"hong",{}],
 ["hd_maudon","hd","Hoa điền mẫu đơn điểm thúy",7,3,"do",{}],["hd_phuong","hd","Hoa điền kim phượng",8,3,"vang",{}],
 ["thoa_vang","tram","Thoa vàng hồ điệp",4,2,"vang",{sac:4,danh:1}],["tram_phithuy","tram","Trâm phỉ thúy hải đường",4,1,"xanh",{sac:4,danh:1}],
 ["boodieu","tram","Bộ diêu vàng",5,2,"vang",{sac:5,danh:2}],["dientu_thuy","tram","Điền tử điểm thúy",5,2,"lam",{sac:5,danh:2}],
 ["bd_phuong","tram","Bộ diêu kim phượng ngậm châu",6,3,"vang",{sac:6,danh:3}],["tram_maudon","tram","Trâm hồng ngọc mẫu đơn",6,2,"do",{sac:6,danh:2}],
 ["diemthuy_cuu","tram","Điểm thúy cửu điệp",7,3,"lam",{sac:7,danh:3}],["kimthoa_phuong","tram","Kim thoa song phượng",7,3,"vang",{sac:7,danh:3}],
 ["tramphuong","tram","Trâm phượng cửu vĩ",8,3,"vang",{sac:8,danh:4}],["phuongquan","tram","Phượng quan bán giá",8,3,"vang",{sac:8,danh:5}],
 ["nt_nhuy","tram","Trâm ngọc như ý ngự tứ",5,4,"xanh",{sac:5,danh:3}],["nt_haiduong","tram","Bộ diêu «Hải đường xuân thụy» ngự tứ",6,4,"hong",{sac:6,danh:4}],["nt_dongchau","tram","Trâm đông châu ngự tứ",7,4,"trang",{sac:7,danh:5}],
 ["y_cungnu","y","Áo vải xanh cung nhân",0,0,"xanh",{}],["y_luamoc","y","Áo lụa mộc hồng nhạt",0,0,"hong",{sac:1}],
 ["y_chuongsu","y","Áo gấm lam chưởng sự cô cô",0,0,"xanh",{...BAL.m92.srvY.chuongsu}],["y_nuquan","y","Áo lụa chàm nữ quan",0,1,"lam",{...BAL.m92.srvY.nuquan}],["y_mama","y","Áo gấm xanh rêu ma ma",0,1,"xanh",{...BAL.m92.srvY.mama}],
 ["y_hoanho","y","Áo lụa thêu hoa nhỏ",1,0,"hong",{sac:1}],["y_saxanh","y","Váy sa xanh ngọc",1,0,"xanh",{sac:2}],
 ["y_maimai","y","Áo gấm hoa mai",2,1,"hong",{sac:2}],["y_vanthuy","y","Áo lụa Hàng Châu vân thủy",2,1,"lam",{sac:2}],
 ["y_lan","y","Áo the thêu lan",3,1,"xanh",{sac:3}],["y_tramnep","y","Váy lụa bách điệp",3,1,"tim",{sac:3}],
 ["y_haiduong","y","Áo gấm thêu hải đường",4,2,"hong",{sac:4,danh:1}],["y_chimen","y","Áo choàng lụa thêu chim én",4,1,"lam",{sac:4}],
 ["y_maudon","y","Áo gấm Tô Châu thêu mẫu đơn",5,2,"tim",{sac:5,danh:1}],["y_hac","y","Cát phục tím thêu hạc",5,2,"tim",{sac:5,danh:2}],
 ["y_kimtuyen","y","Cát phục đỏ thêu kim tuyến",6,3,"do",{sac:6,danh:2}],["y_vancam","y","Áo gấm vân cẩm",6,2,"lam",{sac:6,danh:2}],
 ["y_trieutim","y","Triều phục tím chạm phượng",7,3,"tim",{sac:7,danh:3}],["y_bachdieu","y","Áo gấm thêu bách điểu",7,3,"do",{sac:7,danh:3}],
 ["y_minhhoang","y","Triều phục minh hoàng thêu phượng",8,3,"vang",{sac:8,danh:4}],["y_phuongbao","y","Phượng bào đỏ thắm",8,3,"do",{sac:8,danh:4}],
 ["nt_longchon","y","Áo lông chồn ngự tứ",5,4,"nau",{sac:5,danh:3}],["nt_bachhoa","y","Cát phục «Bách hoa» ngự tứ",6,4,"hong",{sac:6,danh:4}],["nt_hocuu","y","Hồ cừu trắng ngự tứ",7,4,"trang",{sac:7,danh:5}],
 ["y_tang","y","Áo tang vải trắng",0,0,"trang",{},"mặc trong quốc tang"]];
const WD_ITEMS={};
/* hoa-dien (OD 17/11 ~17:30Z/~17:45Z real): ONE item table, three kinds. sl "hd" = a hoa điền (forehead ornament): never worn through the wardrobe,
   it is PLACED during makeup (jhd). WD_SLN[sl] = [kind name, wear verb, slot name, verb lower] for every display that names a WD slot. */
const WD_SLN={tram:["Trâm cài","Cài","Cài tóc","cài"],y:["Y phục","Mặc","Y phục","mặc"],hd:["Hoa điền","Dán","Trán","dán khi điểm trang"]};
function wdSlN(sl,i){return (WD_SLN[sl]||WD_SLN.y)[i|0]}
(function(){for(const [k,sl,n,P,g,col,w,note] of WD_LIST){const it={k,sl,n,P,g,col,w,nt:g===4?1:0,pr:g===4?0:WD_PR[P],icon:`img/wd-${k.replace(/_/g,"-")}.webp`,note:note||""};WD_ITEMS[k]=it;
  const d=`${sl==="hd"?"Dán trán khi điểm trang: đặt khéo thì dung nhan thêm phần":`${sl==="tram"?"Cài tóc":"Mặc"}: ${Object.keys(w).length?plainFx(w):"giản dị"}`} · ${WD_GRADE[g]}${it.nt?" · chỉ có khi được ban, không bán, không tặng":""}${note?" · "+note:""}`;
  /* register in the chest's IT table; keep old fields of the three old hair items (tramngoc, boodieu, tramphuong) but hide their rank hint */
  IT[k]=Object.assign(IT[k]||{tg:sl==="y"?["rv"]:["hh","rv"]},{n,kd:wdSlN(sl,0),d,pr:it.pr,wsl:sl,wd:1});if(it.nt){IT[k].keep=1;IT[k].tg=[]}
  if(itm(k).sl==="hair")delete IT[k].sl}})();
function plainFx(o){return Object.entries(o||{}).filter(([k,v])=>v&&NAMES[k]).map(([k,v])=>statTxt(k,v)).join(", ")}
/* old ngự-ban things are ngự tứ too */
["ngocboi","bienngu"].forEach(k=>{if(IT[k]){IT[k].nt=1}});
function wdIsNt(e){return !!(e&&((WD_ITEMS[e.k]&&WD_ITEMS[e.k].nt)||e.nt||(IT[e.k]&&itm(e.k).nt)))}

/* ---------- who is what ---------- */
function wdPOf(p){try{if(!p)return 1;const rr=typeof personRoleRank==="function"?personRoleRank(p):null;
  if(rr){if(rr.role==="maid"||rr.role==="mama"||rr.role==="cold")return 0;if(rr.role==="thaihau")return 9;if(rr.role==="player"||rr.role==="consort")return Math.max(0,Math.min(7,rr.rank|0))+1}
  if(p.out)return 0;return (typeof rkOf==="function"&&(p===S||p.rank!=null)?rkOf(p):0)+1}catch(e){return 1}}
function wdKey(p){return p===S?"me":p&&p.id!=null?String(p.id):p&&p.name?"n:"+p.name:"?"}
function wdHash(s){let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function wdPool(sl,P,noNt){const L=WD_LIST.filter(r=>r[1]===sl&&r[3]===P&&(!noNt||r[4]!==4)&&r[0]!=="y_tang"&&!WD_SRVONLY.includes(r[0])&&!(sl==="hd"&&typeof hdDropped==="function"&&hdDropped(r[0]))).map(r=>r[0]);return !L.length&&sl==="hd"&&typeof hdKeptNear==="function"?hdKeptNear(P):L}
function wdDefault(p,sl){const P=Math.min(8,wdPOf(p));const L=wdPool(sl,P,true);return L.length?L[wdHash(wdKey(p)+sl)%L.length]:null}
/* lazily give everybody (old saves too) a default outfit at their own P: nobody starts wrong */
function wdOf(p){if(!p)return null;if(!p.wd||typeof p.wd!=="object"){p.wd={tram:null,y:null};
  if(p===S&&S.inv){const i=S.inv.findIndex(e=>e&&e.w&&IT[e.k]&&itm(e.k).wsl==="tram"&&!e.h);if(i>=0){const e=S.inv.splice(i,1)[0];delete e.w;p.wd.tram=e}}
  for(const sl of ["tram","y"])if(!p.wd[sl]){const k=wdDefault(p,sl);if(k)p.wd[sl]={k,from:"base"}}}
 if(p.inv)p.inv.forEach(e=>{if(e&&e.w&&IT[e.k]&&itm(e.k).wsl)delete e.w});return p.wd}
function wdItem(e){return e&&WD_ITEMS[e.k]||null}
function wdP(e,p){const it=wdItem(e);if(!it)return 0;if(it.nt&&e.own&&e.own===wdKey(p))return Math.min(it.P,wdPOf(p));return it.P}
function wdLevel(p){const w=wdOf(p);return WD.wT*wdP(w.tram,p)+WD.wY*wdP(w.y,p)}
function wdTang(){return !!(S&&S.wdTang&&S.wdTang>S.turn)}
function wdFest(){try{return typeof festToday==="function"&&!!festToday()}catch(e){return false}}
/* TRUE status: "ok" | "over" | "under" | "tang" */
function wdFestive(it){return !!(it&&(it.col==="do"||it.col==="vang"))}
/* status of p's outfit when each worn item is valued by pf(entry) (the truth, or someone's belief): "ok" | "over" | "under" | "tang" */
function wdStatusBy(p,pf){const w=wdOf(p);if(wdTang()){for(const sl of ["tram","y"])if(wdFestive(wdItem(w[sl])))return "tang";return "ok"}
 const L=WD.wT*(w.tram?pf(w.tram):0)+WD.wY*(w.y?pf(w.y):0),P=wdPOf(p),d=L-Math.min(8,P);if(P>=9)return d<=WD.under?"under":"ok";
 if(d>=WD.over)return "over";if(d<=(wdFest()?WD.underFest:WD.under))return "under";return "ok"}
function wdStatus(p){return wdStatusBy(p,e=>wdP(e,p))}
const WD_LABEL={ok:"Đúng phẩm",over:"Vượt phẩm",under:"Quá giản dị",tang:"Phạm tang"};
/* what the PLAYER knows: the status of p's outfit only if she knows the P of both worn items */
function wdKnowsItem(k){return !!(S&&S.wdk&&S.wdk[k])}
/* an item's P is known to the player if she learnt it, or it is a ngự tứ (everyone knows a ngự tứ is worn by right) */
function wdKnowsE(e){const it=wdItem(e);return !!it&&(wdKnowsItem(it.k)||!!(it.nt&&e.own))}
function wdKnownStatus(p){const w=wdOf(p);const es=["tram","y"].map(sl=>w[sl]).filter(Boolean);if(wdTang())return wdStatus(p);if(!es.length||!es.every(wdKnowsE))return null;return wdStatus(p)}
function wdReveal(k,how){if(!S||!k||!WD_ITEMS[k])return "";S.wdk=S.wdk||{};if(S.wdk[k])return "";S.wdk[k]=1;const it=WD_ITEMS[k];
 const t=`Biết được: ${it.n} là đồ phẩm ${wdPName(it.P)}${how?` (${how})`:""}.`;try{log(t);kitKnow({key:"wd:"+k,text:t})}catch(e){}return t}
function wdRevealOutfit(p,how){const w=wdOf(p);let r="";for(const sl of ["tram","y"])if(w[sl])r+=wdReveal(w[sl].k,how)+" ";return r.trim()}
/* the visible data of p's two slots (for the kit: K1 in dev/PROGRESS_wardrobe.md) */
function wdSlots(p){const w=wdOf(p);const lab=wdKnownStatus(p);return ["tram","y"].map(sl=>{const e=w[sl],it=wdItem(e);
  if(!it)return{slot:sl,empty:true,name:sl==="tram"?"Chưa cài":"Thường phục",label:null};
  return{slot:sl,k:it.k,name:it.n,grade:it.g,gradeName:WD_GRADE[it.g],icon:it.icon,nt:it.nt,giver:e.giver||null,date:e.d||null,
   knownP:wdKnowsE(e)?wdPName(wdP(e,p)):null,label:lab?WD_LABEL[lab]:null,labelKey:lab}})}
window.wdSlots=wdSlots;window.WD=WD;window.WD_ITEMS=WD_ITEMS;

/* ---------- putting things on: the same rules for everyone ---------- */
function wdWearEntry(p,e){const it=wdItem(e);if(!it||it.sl==="hd")return"";const w=wdOf(p);const old=w[it.sl];if(old&&old.from!=="base"){p.inv=p.inv||[];p.inv.push(old)}w[it.sl]=e;return it.n}
function wdTakeOff(p,sl){const w=wdOf(p);const e=w[sl];if(!e)return;if(e.from!=="base"){p.inv=p.inv||[];p.inv.push(e)}w[sl]=null}
function wdWear(p,ix){const e=p.inv&&p.inv[ix];if(!e||e.h||!wdItem(e)||wdItem(e).sl==="hd")return"";p.inv.splice(ix,1);delete e.w;return wdWearEntry(p,e)}
/* what someone BELIEVES an item's P is: true if known, else a fixed hidden noise per item kind (per person) */
function wdBelP(p,k){const it=WD_ITEMS[k];if(!it)return 0;if(p===S?wdKnowsItem(k):((p.wdk||{})[k]))return it.P;
 const n=WD.autoErr[wdHash(wdKey(p)+k)%WD.autoErr.length];return it.P+n}
/* all candidate pairs from the worn items + chest; score by a P function */
function wdCands(p){const w=wdOf(p);const C={tram:[null],y:[null]};
 for(const sl of ["tram","y"]){if(w[sl])C[sl].push({src:"w",e:w[sl]});(p.inv||[]).forEach((e,i)=>{if(e&&!e.h&&wdItem(e)&&wdItem(e).sl===sl)C[sl].push({src:i,e})})}
 /* the issued phẩm phục of her own rank is always at hand (Nội vụ phủ), and white mourning clothes in quốc tang */
 for(const sl of ["tram","y"]){const k=wdDefault(p,sl);if(k&&!C[sl].some(x=>x&&x.e.k===k))C[sl].push({src:"base",e:{k,from:"base"}})}
 if(wdTang()){const t=(p.inv||[]).findIndex(e=>e&&e.k==="y_tang"&&!e.h);if(t<0)C.y.push({src:"tang",e:{k:"y_tang",from:"base"}})}
 return C}
function wdBest(p,target,pf){const C=wdCands(p);let best=null,bd=1e9;
 for(const a of C.tram)for(const b of C.y){if(!b)continue;const L=WD.wT*(a?pf(a.e):0)+WD.wY*pf(b.e);
  let d=Math.abs(L-target);if(wdTang())for(const x of [a,b]){const it=x&&wdItem(x.e);if(it&&(it.col==="do"||it.col==="vang"))d+=50}
  d+=(a?0:.3);if(d<bd){bd=d;best=[a,b]}}
 return best}
function wdApply(p,pair){if(!pair)return;const w=wdOf(p);const take=x=>{if(!x)return null;if(x.src==="w")return x.e;if(x.src==="tang")return x.e;return x.e};
 const [a,b]=pair;const keep=new Set([a&&a.e,b&&b.e].filter(Boolean));
 /* take the chosen chest entries out, return the old worn ones */
 for(const sl of ["tram","y"]){const cur=w[sl];if(cur&&!keep.has(cur)){if(cur.from!=="base"){p.inv=p.inv||[];p.inv.push(cur)}w[sl]=null}}
 for(const x of [a,b]){if(!x||x.src==="w")continue;if(typeof x.src==="number"){const i=p.inv.indexOf(x.e);if(i>=0)p.inv.splice(i,1)}const it=wdItem(x.e);w[it.sl]=x.e}
 if(!a)w.tram=null}
/* Tự chọn đồ: quick, by belief (may be wrong) */
/* obs's belief of the P of entry e worn by owner (a ngự tứ worn by its owner is known to be by right) */
function wdBelPE(obs,e,owner){const it=wdItem(e);if(!it)return 0;if(it.nt&&e.own&&owner&&e.own===wdKey(owner))return Math.min(it.P,wdPOf(owner));if(obs===owner&&(e.from==="base"||e.nvp))return it.P;/* her own issued phẩm phục */return wdBelP(obs,it.k)}
function wdBelStatus(obs,t){return wdStatusBy(t,e=>wdBelPE(obs,e,t))}
function wdAutoFor(p,bias){if(p&&p.coop)return;/* E44j (law 6c + 1; coop-lost-scan-traced 9001 vanish 10000001 y_saxanh): her entry on the host is a player seat: her outfit is her own seat's choice. The j92 month / Quốc tang / jlux luxCalm / jworld tang re-dressed it by NPC roll → b4Ops «rm gone» of the garment put on + «add» of the one taken off → her seat lost it */const tgt=Math.min(8,wdPOf(p))+(bias||0);wdApply(p,wdBest(p,tgt,e=>wdBelPE(p,e,p)))}
/* NPC choice: by belief + trait (Kiêu ngạo / Tham vọng dress up, Hiền lành / Nhu mì keep modest) */
function wdNpcBias(v){const t=(typeof traitsOf==="function"?traitsOf(v):[v.trait]).join(" ");return /Kiêu ngạo|Tham vọng/.test(t)?1:/Ân cần|Khiêm nhường/.test(t)?-.5:0}

/* bonus to Sắc / Danh while worn: the ONE wearBonus is in jwdinv (WD slots count their own effect, never ×1.5: the Vượt phẩm status stays hidden) */
/* the old hair 'wear' button now puts the item into the TRÂM slot */
(function(){const w0=wear;wear=function(p,ix){const e=p&&p.inv&&p.inv[ix];if(e&&IT[e.k]&&itm(e.k).wsl){wdWear(p,ix);return}return w0.apply(this,arguments)}})();
/* old 'vượt phẩm' list (used by j8 night / j25 text) = the over-rank worn items */
vpItems=function(p){try{return wdStatus(p)==="over"?["tram","y"].map(sl=>wdOf(p)[sl]).filter(e=>e&&wdItem(e)&&wdItem(e).P>wdPOf(p)).map(e=>({k:e.k})):[]}catch(e){return[]}};

/* =====================================================================================================================
   PART 2 — the rules around the clothes (all two-way: the same functions run for her and for every consort)
   ===================================================================================================================== */
function wdWhen(){try{if(typeof kitDate==="function")return kitDate(S.month,S.year,S.tuan)}catch(e){}return `tháng ${S.month} năm ${S.year}`}
function wdNm(p){if(!p)return"";if(p===S)return"ngươi";if(p.alive!==undefined&&p.name&&typeof rkName==="function")return `${rkName(p)} ${p.name}`;return p.name||""}
function wdNmC(p){const s=wdNm(p);return s?s.charAt(0).toUpperCase()+s.slice(1):s}
function wdCur(p){const w=wdOf(p);return [w.tram?w.tram.k:"",w.y?w.y.k:""].join("|")}
function wdItemsTxt(p){const w=wdOf(p);return ["tram","y"].map(sl=>wdItem(w[sl])).filter(Boolean).map(it=>it.n).join(" và ")}
function wdFestItem(p){const w=wdOf(p);return ["tram","y"].map(sl=>wdItem(w[sl])).find(wdFestive)||null}
function wdKnowAll(obs,p){/* obs learns the true P of p's worn items */const w=wdOf(p);for(const sl of ["tram","y"]){const e=w[sl];if(!e)continue;if(obs===S)wdReveal(e.k,"");else{obs.wdk=obs.wdk||{};obs.wdk[e.k]=1}}}
/* what obs has seen or heard about p's outfit: {st, it (outfit key), w, by, sure} */
function wdSee(obs,p,st,by,sure){if(!obs||obs===p)return;obs.wdSeen=obs.wdSeen||{};obs.wdSeen[wdKey(p)]={st,it:wdCur(p),w:wk(),by:by||"",sure:!!sure};if(sure)wdKnowAll(obs,p)}
/* a CAUSE to accuse t: a recent remark or report about the outfit she still wears (it may be someone's wrong opinion) */
function wdCause(obs,t){if(!obs||!t||obs===t)return null;if(obs===S){const k=wdKnownStatus(t);if(k&&k!=="ok")return{st:k,sure:true,by:"điều ngươi đã biết"}}
 const r=obs.wdSeen&&obs.wdSeen[wdKey(t)];if(r&&r.st!=="ok"&&wk()-r.w<=12&&r.it===wdCur(t))return r;
 if(wdTang()&&wdFestItem(t)&&(obs===S?(typeof knows!=="function"||knows(t)):true))return{st:"tang",sure:true,by:"ai cũng thấy"};
 /* the rash and dim-witted go on their own guess */
 if(obs!==S&&witOf(obs)<35&&wdBelStatus(obs,t)!=="ok"&&traitsOf(obs).some(x=>/Kiêu ngạo|Nóng nảy|Đố kỵ|Ghen/.test(x)))return{st:wdBelStatus(obs,t),sure:false,by:"đoán chừng"};
 return null}
window.wdCause=wdCause;
const WD_ST_WORD={over:"vượt phẩm",under:"quá giản dị",tang:"mặc đồ đỏ vàng giữa quốc tang",ok:"đúng phẩm"};
/* her ma ma (or a maid old enough to be one) who is sharp-eyed: lanh lợi and loyal */
function wdMama(p){const L=[p.maid].concat(p.staff||[]).filter(Boolean);return L.find(s=>{let m=false;try{m=personRoleRank(s,"maid").role==="mama"||(s.age||0)>=BAL.ageBand[1]}catch(e){}return m&&(netIs(s,"sharp")||(s.loyal||0)>=BAL.loy.top)&&(s.loyal||0)>=BAL.loy.close&&!s.spyFor})||null}
/* someone to sell or pawn things quietly outside the palace: a ma ma or a eunuch of her own staff (loyal 40+) */
function wdAgent(p){const L=[p.maid].concat(p.staff||[]).filter(s=>s&&!s.spyFor&&(s.loyal||0)>=BAL.loy.low);
 return L.find(s=>s.role==="eunuch")||L.find(s=>{try{return personRoleRank(s,"maid").role==="mama"||(s.age||0)>=BAL.ageBand[1]}catch(e){return false}})||null}

/* ---------- getting things: a real item into the chest (rewards, purchases, gifts) ---------- */
function wdNtFree(){S.wdNt=S.wdNt||[];return WD_LIST.filter(r=>r[4]===4&&!S.wdNt.includes(r[0])).map(r=>r[0])}
const WD_SRVONLY=["y_chuongsu","y_nuquan","y_mama"]; /* servant-road robes: given only by jpromo (BAL.promo.srv), never random/shop */
function wdPickAt(P,sl,gMin){P=cl(Math.round(P),0,8);const hdOk=r=>!(r[1]==="hd"&&typeof hdDropped==="function"&&hdDropped(r[0]));let L=WD_LIST.filter(r=>r[4]!==4&&r[0]!=="y_tang"&&!WD_SRVONLY.includes(r[0])&&hdOk(r)&&(!sl||r[1]===sl)&&r[3]===P&&r[4]>=(gMin||0));
 if(!L.length)L=WD_LIST.filter(r=>r[4]!==4&&r[0]!=="y_tang"&&!WD_SRVONLY.includes(r[0])&&hdOk(r)&&(!sl||r[1]===sl)&&r[3]===P);if(!L.length&&sl==="hd"&&typeof hdKeptNear==="function"){const K=hdKeptNear(P);return K.length?pick(K):null}return L.length?pick(L)[0]:null}
function wdGain(p,k,src){src=src||{};const it=WD_ITEMS[k];if(!p||!it)return null;p.inv=p.inv||[];const e={k,from:src.from||"emp"};
 if(src.giver)e.giver=src.giver;e.d=wdWhen();if(it.nt){e.own=wdKey(p);S.wdNt=S.wdNt||[];if(!S.wdNt.includes(k))S.wdNt.push(k)}
 if(src.nvp){e.nvp=1;if(p===S)wdReveal(k,"y phục Nội vụ phủ đưa theo phẩm mới");else{p.wdk=p.wdk||{};p.wdk[k]=1}}
 p.inv.push(e);let r="";
 if(p===S&&!it.nt&&!src.nvp&&!wdKnowsItem(k)){const m=wdMama(S);if(m&&roll(WD.mamaReveal)){wdReveal(k,`${m.name} tinh ý nhận ra`);r=` ${m.name} tinh ý, nhận ra đây là đồ phẩm ${wdPName(it.P)}.`}}
 else if(p!==S&&!it.nt&&roll(WD.mamaReveal)){p.wdk=p.wdk||{};p.wdk[k]=1}
 return {e,txt:r}}
/* the Emperor's bestowals also bring garments or hairpins from the real store; a ngự tứ (one of a kind) on the big occasions */
const WD_NTCH={son:"ntSon",promo:"ntPromo",contest:"ntContest",story:"ntStory"};
const WD_GMIN={night:0,contest:1,son:2,promo:2,birthday:1,accuse:0,story:1,sinhthan:1,nurse:0};
(function(){if(typeof bestow!=="function")return;const b0=bestow;bestow=function(p,why){const r=b0.apply(this,arguments);try{if(!p||p.dead||(p!==S&&!p.alive))return r;
  const knob=WD_NTCH[why];const free=wdNtFree();let k=null,nt=false;
  if(knob&&free.length&&roll(WD[knob])){const P=wdPOf(p);k=free.slice().sort((a,b)=>Math.abs(WD_ITEMS[a].P-P)-Math.abs(WD_ITEMS[b].P-P))[0];nt=true}
  else if(roll(WD.rewardGarment))k=wdPickAt(wdPOf(p),roll(50)?"tram":"y",WD_GMIN[why]||0);
  if(!k)return r;const g=wdGain(p,k,{from:"emp",giver:"Hoàng thượng"});if(!g)return r;const it=WD_ITEMS[k];
  if(p===S){Q.push({t:nt?"Ngự tứ":"Thánh thượng ban thưởng",who:pEmp(),h:`<p style="text-align:center"><img class="ic" src="${it.icon}" width="56" height="56" alt="" onerror="this.remove()"></p><p>Hoàng thượng ban thêm cho ngươi <b>${it.n}</b> (${WD_GRADE[it.g]}).</p><p class="past">${IT[k]?itm(k).d:""}${nt?" · ghi: Hoàng thượng ngự tứ, "+g.e.d:""}</p>${g.txt?`<p>${g.txt}</p>`:""}`});
   log(`Được Hoàng thượng ban ${it.n}${nt?" (ngự tứ)":""}.`)}
  else if(nt)log(`${wdNmC(p)} được Hoàng thượng ngự tứ ${it.n}.`)}catch(e){console.error(e)}return r}})();
/* Mệnh truyện rewards of the court theme come from the wardrobe store: tier 0..2 = a garment of her phẩm (Thường..Trân phẩm), tier 3 = a ngự tứ */
(function(){if(typeof reward67!=="function")return;const r0=reward67;reward67=function(theme,tier){try{if(theme==="court"&&tier>=0){const t=Math.min(3,tier);let k=null;
   if(t>=3){const free=wdNtFree();const P=wdPOf(S);if(free.length)k=free.slice().sort((a,b)=>Math.abs(WD_ITEMS[a].P-P)-Math.abs(WD_ITEMS[b].P-P))[0]}
   if(!k)k=wdPickAt(wdPOf(S),roll(50)?"tram":"y",Math.min(3,t));
   if(k){const it=WD_ITEMS[k];const g=wdGain(S,k,{from:"story",giver:it.nt?"Hoàng thượng":""});
    return {k,row:["Phần thưởng",`${it.n} · <b>${WD_GRADE[it.g]}</b> · ${itm(k).d}${it.nt?` · Hoàng thượng ngự tứ, ${g.e.d}`:""} (đã vào Rương)${g.txt}`,"g"]}}}}catch(e){console.error(e)}
  return r0.apply(this,arguments)}})();
/* the peddler also carries a few garments and hairpins (their phẩm unknown to the buyer) */
(function(){if(typeof restock!=="function")return;const r0=restock;restock=function(){const r=r0.apply(this,arguments);try{const n=1+R(2);for(let i=0;i<n;i++){const k=wdPickAt(R(7),roll(50)?"tram":"y",0);if(k&&!S.shop.includes(k))S.shop.push(k)}}catch(e){}return r}})();

/* ---------- remarks: the only way anyone learns whether an outfit is right (true for her and for NPCs) ---------- */
function wdRemarker(p,st){const o=wdNpwGap(p)&&npcWhy("wdRemark",{p,st},()=>roll(BAL.ag.why.wd.meet[st]||BAL.ag.why.wd.meet.over));/* G1 #7: the one with a reason says it when she meets her this month = the old remark odds (BAL.ag.why.wd.meet, was WD.remarkBad / remarkOk / 70 at quốc tang); with no occasion roll the Thái hậu spoke on every rule break: "nhìn … của" lines 4–8x */return o?wdNpwR(p,o):null} /* npc-purpose (jagwhy1 wdRemark = npcWhy): only one with a reason remarks: Thái hậu / Hoàng hậu keep the rules, a foe sneers, a friend praises */
const WD_SAY={ok:["khen {p} ăn vận vừa vặn, đúng phẩm vị.","gật đầu khi thấy {p}: ăn vận vừa vặn, đúng lễ.","khen {p} biết chừng mực, y phục đúng phẩm.","nhìn {p} một lượt, khẽ khen là biết giữ lễ.","thấy {p} ăn vận đúng phẩm, khẽ gật đầu."],
 over:["“Đồ này e vượt phẩm vị.”","“{I} này… phẩm của {P} cài được sao?”","“Đẹp thì đẹp, chỉ e lễ chế không cho.”","“{Xung} nhớ thứ này là của bậc trên mới được dùng.”"],
 under:["“{P} ăn vận giản dị quá, chẳng ra dáng {R}.”","“Áo xống thế kia, người ngoài lại tưởng Nội vụ phủ bạc đãi {P}.”","“Giản dị là đức, nhưng sơ sài quá thì thất lễ.”","“{P} tiết kiệm quá, đến phẩm phục cũng chẳng buồn may mới.”"]};
function wdRemark(p,st){const r=wdRemarker(p,st);if(!r)return"";const view=r.sure?st:wdBelStatus(r.v||p,p);/* praise only from one who likes her (wdRemark), so it is rarer than blame */
 const item=view==="tang"?wdFestItem(p):wdItem(wdOf(p).y)||wdItem(wdOf(p).tram);const nm=item?item.n:"bộ y phục";const R0=r.name.charAt(0).toUpperCase()+r.name.slice(1);
 /* palace voice: each remark is a pool (jvoice kLine, no repeat), the speaker's self word from the one core (kSay r → p) */
 const sp=r.th?"th":r.v,RK=p===S?(isSrv&&isSrv()?"người hầu cận":rkName(S)):(p.alive!==undefined?rkName(p):"");
 const fill=x=>kSay(sp,p,x).replace(/\{P\}/g,wdNmC(p)).replace(/\{R\}/g,RK).replace(/\{I\}/g,nm);
 /* band = the listener's rank band (jvoice kBand); a remark on someone else (an NPC) is a shared world line: co-op seats show the same one (o.shared) */
 const VO={t:kToneSt(sp,r.th?"th":r.v&&r.v.name),band:kBand(p),shared:p===S?undefined:(p.id!=null?p.id:p.name)};
 const said={ok:fill(kLine("wd:ok",kTP("wd:ok")||WD_SAY.ok,VO)).replace(/^/,`${R0} `).replace(/\{p\}/g,wdNm(p)),over:`${R0} nhìn ${nm} của ${wdNm(p)} mà nói: ${fill(kLine("wd:over",kTP("wd:over")||WD_SAY.over,VO))}`,
  under:`${R0} cười khẽ: ${fill(kLine("wd:under",kTP("wd:under")||WD_SAY.under,VO))}`,
  tang:`${R0} thấy ${wdNm(p)} mặc ${nm} giữa quốc tang.`}[view];
 /* who hears it: p always; others by chance; the player also through her tai mắt */
 const hw=new Set(npcWit(whereOf(p),null,{vs:p}).map(x=>x.p));const tl=npcTell(p,{place:whereOf(p)});for(const o of consorts()){if(o===p)continue;if(hw.has(o)||(o===S&&tl))wdSee(o,p,view,r.name,r.sure)} /* who hears: people really there; she, through someone who tells her */
 if(r.v)wdSee(r.v,p,view,r.name,r.sure);
 let fx="";
 /* being looked down on only costs Danh when she really is too plain (a wrong sneer falls flat) */
 if(view==="under"&&st==="under"){ap(p,{danh:-(WD.underDanh+(wdFest()?WD.festUnderDanh:0))});fx=` Danh -${WD.underDanh+(wdFest()?WD.festUnderDanh:0)}.`}
 if(view==="ok"&&wdFest()){ap(p,{danh:WD.festOkDanh});fx=` Danh +${WD.festOkDanh}.`}
 if(view==="tang"){ap(p,{danh:BAL.eff.j92.danhWdRemark,sung:BAL.eff.j92.sungWdRemark});punish(p,"mặc đồ đỏ vàng giữa quốc tang",WD.tangPunish);fx=` Danh ${balSg(BAL.eff.j92.danhWdRemark)}, ${sgOf(p,BAL.eff.j92.sungWdRemark)}.`}
 if(p===S){if(r.sure)wdKnowAll(S,S);S.wdSelf={st:view,w:wk(),by:r.name,sure:r.sure,it:wdCur(S)};
  const how=r.sure?"":" (chỉ là lời nàng ấy nói, chưa chắc đúng)";Q.push({t:"Lời nhận xét",who:r.face,h:`<p>${said}${fx}</p><p class="past">Đã ghi vào Sổ ghi${how}.</p>`});log(said+fx+how)}
 else{const heard=S.wdSeen&&S.wdSeen[wdKey(p)]&&S.wdSeen[wdKey(p)].w===wk();if(heard){const t=`${said}${r.sure?"":" (lời của "+r.name+", chưa chắc đúng)"}`;try{noteAdd(p.id,t)}catch(e){}
  try{intelAdd(p,{k:"wd",kind:"wd",txt:t},{by:r.name,how:"nghe nhận xét về y phục"})}catch(e){}log(t+fx)}}
 return ""}
/* tai mắt: a loyal servant finds out the TRUE phẩm of one unknown item a known consort wears (Nội vụ phủ ledgers) */
function wdTaimat(){const w=watcher();if(!w)return"";
 const C=liveRivals(true).filter(v=>(typeof knows!=="function"||knows(v)));const cand=[];for(const v of C){const ww=wdOf(v);for(const sl of ["tram","y"]){const e=ww[sl];if(e&&!wdKnowsE(e))cand.push([v,e])}}
 if(!cand.length)return"";const sp=npcWhy("wdSpy",{w:w.s||S.maid,cand});if(!sp)return"";const [v,e]=sp.place;const t=wdReveal(e.k,`${w.name} dò được ở Nội vụ phủ`);const ks=wdKnownStatus(v);let more="";
 if(ks){wdSee(S,v,ks,w.name,true);more=` Vậy ${wdNm(v)} đang ăn vận ${WD_ST_WORD[ks]}.`}
 const txt=`${w.name} báo: ${WD_ITEMS[e.k].n} mà ${wdNm(v)} đang dùng là đồ phẩm ${wdPName(WD_ITEMS[e.k].P)}.${more}`;try{noteAdd(v.id,txt,1)}catch(x){}try{intelAdd(v,{k:"wd",kind:"wd",txt},{by:w.name,how:"tai mắt dò ở Nội vụ phủ"})}catch(x){}log(txt);return""}

/* ---------- HẶC ĂN MẶC SAI PHẨM (act vp): needs a cause; the truth decides; a wrong cause turns on the accuser ---------- */
function oWd(a,t){return oVP(a)}
function wdAccuse(a,t){const c=wdCause(a,t);const truth=wdStatus(t);const judge=judgeName(t);const A0=wdNmC(a),T0=wdNm(t);
 /* the inquiry makes the truth public */
 for(const o of consorts())wdSee(o,t,truth,judge,true);
 if(truth==="ok"){ap(a,{danh:-5});ap(t,{danh:2});relAdd(a,t,BAL.eff.j92.wdAccuse);
  return `${A0} hặc ${T0} ${c?WD_ST_WORD[c.st]:"ăn mặc sai phẩm"}; <span class="${a===S?"r":"g"}">tra xét ra ${T0} ăn vận đúng phẩm</span>, ${a===S?"ngươi":wdNm(a)} bị quở vì hặc bừa. Danh -5, ${T0} Danh +2. `}
 if(!aRoll(oVP(a),a)){ap(a,{danh:BAL.eff.j92.danhWdAccuse_2});relAdd(a,t,BAL.eff.j92.wdAccuse_2);return `${A0} hặc ${T0} ${WD_ST_WORD[truth]}, ${judge} bỏ qua, chỉ dặn lần sau giữ ý. ${a===S?`Danh ${balSg(BAL.eff.j92.danhWdAccuse_2)}. `:""}`}
 relAdd(a,t,BAL.eff.j92.wdAccuse_3);ap(a,{danh:BAL.eff.j92.danhWdAccuseA});const w=wdOf(t);
 if(truth==="over"){const gone=[];for(const sl of ["tram","y"]){const e=w[sl],it=wdItem(e);if(it&&wdP(e,t)>wdPOf(t)&&!(it.nt&&e.own===wdKey(t))){gone.push(it.n);w[sl]=null;const k=wdDefault(t,sl);if(k)w[sl]={k,from:"base"}}}
  ap(t,{danh:BAL.eff.j92.danhWdAccuse_3});punish(t,"ăn mặc vượt phẩm",1);return `${A0} hặc ${T0} vượt phẩm: <span class="${t===S?"r":"g"}">thành</span>. ${gone.length?gone.join(", ")+" bị tịch thu. ":""}${wdNmC(t)} Danh ${balSg(BAL.eff.j92.danhWdAccuse_3)}. `}
 if(truth==="under"){ap(t,{danh:BAL.eff.j92.danhWdAccuse_4});return `${A0} hặc ${T0} ăn vận quá giản dị, làm mất thể diện hoàng gia: <span class="${t===S?"r":"g"}">thành</span>. ${wdNmC(t)} bị quở, Danh ${balSg(BAL.eff.j92.danhWdAccuse_4)}. `}
 ap(t,{danh:BAL.eff.j92.danhWdAccuse,sung:BAL.eff.j92.sungWdAccuse});punish(t,"mặc đồ đỏ vàng giữa quốc tang",2);return `${A0} hặc ${T0} mặc đồ đỏ vàng giữa quốc tang: <span class="${t===S?"r":"g"}">thành</span>. ${wdNmC(t)} Danh ${balSg(BAL.eff.j92.danhWdAccuse)}, ${sgOf(t,BAL.eff.j92.sungWdAccuse)}. `}
A("vp","Hặc ăn mặc sai phẩm",{c:{},ok:(a,t)=>!!wdCause(a,t),o:a=>oWd(a),x:"cần nguyên cớ: đã nghe người nhận xét, hoặc tai mắt báo nàng mặc sai phẩm",f:(a,t)=>wdAccuse(a,t)});
try{AOUT.vp=["nàng bị quở (đồ vượt phẩm bị tịch thu; phạm tang thì bị phạt nặng); Danh +2",`nàng hóa ra đúng phẩm: Danh -5, thù ${balSg(BAL.eff.j92.wdAccuse)} · hoặc bị bỏ qua: Danh -2`]}catch(e){}
try{LACK.vp=t=>{if(wdCause(S,t))return"";const r=S.wdSeen&&S.wdSeen[wdKey(t)];return r&&r.st!=="ok"&&r.it!==wdCur(t)?"nàng đã thay bộ khác từ lúc bị nhận xét":"chưa có nguyên cớ: chưa ai nhận xét, tai mắt chưa báo nàng mặc sai phẩm"}}catch(e){}
try{J78VERB.vp="hặc {t} ăn mặc sai phẩm";HARMK["Hặc ăn mặc sai phẩm"]="vp"}catch(e){}

/* ---------- GIÁ HỌA: plant a valuable thing in someone's room, then cry theft (act giahoa, two-way) ---------- */
function wdFrameItem(a){const own=(a.inv||[]).filter(e=>e&&!e.h&&!e.t&&!wdIsNt(e)&&IT[e.k]&&itm(e.k).pr>=30);if(own.length)return{take:own[0],k:own[0].k};
 const k=wdPickAt(Math.min(8,wdPOf(a)+1),"tram",1);return{take:null,k}}
function wdFrame(a,t){ap(a,{bac:-40});a.schemes=(a.schemes||0)+1;if(typeof ducAdd==="function")ducAdd(a,-4,"giá họa người khác");else ap(a,{duc:-4});
 const F=wdFrameItem(a);if(!F.k)return"";const nm=itm(F.k).n;
 if(!aRoll(oPlant(a,t),a)){/*evok: giahoa act (runAct deed)*/evA(t,a,BAL.eff.j92.evWdFrame);relAdd(a,t,BAL.eff.j92.wdFrame);return `<span class="r">Người lén mang ${nm} vào phòng ${wdNm(t)} bị bắt, khai ra ${wdNm(a)}.</span> ${wdNmC(t)} nắm ${balAb(BAL.eff.j92.evWdFrame)} chứng cứ. `}
 if(F.take){const i=a.inv.indexOf(F.take);if(i>=0)a.inv.splice(i,1)}
 /* item conservation (jil): the very piece is planted (same id) */t.inv=t.inv||[];const P0={k:F.k,h:1,by:key(a),gh:key(a)};if(F.take&&F.take.iu)P0.iu=F.take.iu;t.inv.push(P0);
 if(t===S){S.wdFrame={by:key(a),k:F.k,due:wk()+1+R(2)};
  if(roll(WD.warnBase+eyes(S)*6+(watcher()?15:0))){const w=watcher();const named=roll(WD.traceBase+eyes(S)*WD.traceMat);if(named){S.wdFrame.traced=1;evA(S,a,BAL.eff.j92.evWdFrame_2)}
   Q.push({t:"Tai mắt báo tin",who:pMe(),h:`<p>${w?w.name:"Người hầu"} thấy ${named?"người của "+wdNm(a):"một kẻ lạ"} lén vào phòng ngươi lúc vắng người.</p><p class="past">Nên kiểm tra đồ trong rương.${named?` Đã ghi vào Sổ ghi (chứng cứ về ${a.name} ${balSg(BAL.eff.j92.evWdFrame_2)}).`:""}</p>`});
   log(`${w?w.name:"Người hầu"} thấy ${named?"người của "+wdNm(a):"một kẻ lạ"} lén vào phòng ngươi.`)}
  return ""}
 return wdFrameResolve(a,t)}
/* the cry of theft: the room is searched; whoever planted it may be traced; the accused can clear herself with evidence.
   Optional OWNER field (jlost, đồ thất lạc): an entry with .lo belongs to its owner (e.gh = the owner who raises it); the real culprit is
   e.by (a rival) or nobody (just misplaced / a servant's slip); case evidence (lostEv) counts like evidence against the culprit; the item goes back to its owner. */
function wdFrameIx(a,t){return (t.inv||[]).findIndex(e=>e&&e.gh===key(a)&&(e.h||e.lo))}
function wdFrameNm(k){return (k&&(IT[k]||(typeof WD_ITEMS!=="undefined"&&WD_ITEMS[k])||{}).n)||"món đồ"}
function wdFrameCulprit(a,e){if(e&&e.lo){const c=e.by?byKey(e.by):null;return c&&c!==a?c:null}return a}
function wdFrameEv(t,a,e){const c=wdFrameCulprit(a,e);return (c?evG(t,c):0)+(e&&e.lo&&typeof lostEv==="function"?lostEv(e.lo):0)}
function wdFrameTake(t,i){const e=t.inv.splice(i,1)[0];if(e&&e.lo&&typeof lostReturn==="function")lostReturn(e);
 /* item conservation (jil): a planted piece found in the room goes back to the one who "lost" it (e.gh), or to Cung Chính ti as tang vật */
 else if(e&&typeof ilGone==="function"){const o=e.gh?byKey(e.gh):null;if(o&&o!==t&&o.alive!==false&&!(o===S&&S.dead)){for(const f of ["h","by","gh","w"])delete e[f];o.inv=o.inv||[];o.inv.push(e);if(typeof ilLog==="function")ilLog(e,key(t),key(o),"soát ra, trả về")}else ilGone(t,e,"evid")}
 return e}
function wdFrameResolve(a,t){if(typeof lostUnwear==="function")lostUnwear(t,a);const i=wdFrameIx(a,t);const e=t.inv[i]||null;const nm=wdFrameNm((t===S&&S.wdFrame?S.wdFrame.k:null)||(e&&e.k));
 if(t===S)S.wdFrame=null;
 if(i<0){ap(a,{danh:BAL.eff.j92.danhWdFrameResolve_3});relAdd(a,t,BAL.eff.j92.wdFrameResolve);return `${wdNmC(a)} tố ${wdNm(t)} lấy trộm ${nm}; Cung Chính ti khám phòng ${wdNm(t)} không thấy gì. ${wdNmC(a)} bị quở vì tố bừa, Danh ${balSg(BAL.eff.j92.danhWdFrameResolve_3)}. `}
 const lo=!!e.lo,cu=wdFrameCulprit(a,e);
 if(t!==S&&npcWhy("wdSearch",{t,a},()=>roll(BAL.ag.why.wd.search))){/* G1 #7: the watchful one searches in time = the old odds (always-on made it 5→34) */if(lo){wdFrameTake(t,i);return `${wdNmC(t)} cho người soát phòng trước, thấy ${nm} của ${wdNm(a)} lẫn trong rương, sai người đem trả. `}const f=inspect(t);if(f.length)return `${wdNmC(t)} cho người soát phòng trước, tìm ra ${f.join("; ")}. Mưu giá họa của ${wdNm(a)} không thành. `}
 if(t===S){pushDil(mkP("wdframe",{a:key(a),k:e.k,lo:e.lo||0}),lo?"Đồ thất lạc":"Bị tố ăn cắp");return ""}
 const o=oddsCl(WD.clearBase+eyes(t)*WD.clearMat+wdFrameEv(t,a,e)*10);
 if(roll(o)){wdFrameTake(t,i);
  if(cu){evA(t,cu,BAL.eff.j92.evWdFrameResolve);ap(cu,{danh:BAL.eff.j92.danhWdFrameResolve});punish(cu,"giá họa vu oan",2);return `${wdNmC(a)} tố ${wdNm(t)} ${lo?"giữ":"ăn trộm"} ${nm}; ${wdNm(t)} minh oan được, tra ra ${wdNm(cu)} giá họa. ${wdNmC(cu)} Danh ${balSg(BAL.eff.j92.danhWdFrameResolve)}, bị phạt. `}
  return `${wdNmC(a)} báo ${nm} thất lạc ở chỗ ${wdNm(t)}; ${wdNm(t)} minh oan được: món đồ chỉ thất lạc, không ai lấy trộm. ${nm} về lại với ${wdNm(a)}. `}
 wdFrameTake(t,i);ap(t,{danh:BAL.eff.j92.danhWdFrameResolve_2,sung:BAL.eff.j92.sungWdFrameResolve});if(cu)t.framedBy=key(cu);punish(t,"lấy trộm đồ",1);return `<span class="r">Cung Chính ti tìm thấy ${nm} của ${wdNm(a)} trong phòng ${wdNm(t)}.</span> ${wdNmC(t)} mang tội ăn trộm: Danh ${balSg(BAL.eff.j92.danhWdFrameResolve_2)}, ${sgOf(t,BAL.eff.j92.sungWdFrameResolve)}, bị phạt. `}
/* her side of it: choices show only their cost; the result card tells the truth after */
PEND.wdframe=pp=>{const a=byKey(pp.a);if(!a)return null;const nm=wdFrameNm(pp.k);const tr=!!pp.tr;const lo=!!pp.lo;
 const cur=()=>{if(typeof lostUnwear==="function")lostUnwear(S,a);const i=wdFrameIx(a,S);return{i,e:S.inv[i]||null}};const E0=cur().e;const cu=wdFrameCulprit(a,E0);const ev=E0?wdFrameEv(S,a,E0):(a.ev||0);
 const o1=oddsCl(WD.clearBase+25+eyes(S)*WD.clearMat),o2=oddsCl(WD.clearBase+eyes(S)*WD.clearMat+(tr?15:0)+(lo?ev*10:0));
 const clear=how=>{const x=cur();if(x.i>=0)wdFrameTake(S,x.i);
  if(!cu){Q.push({t:"Minh oan",who:pMe(),h:`<p>${how} Tra ra ${nm} chỉ thất lạc, không ai lấy trộm. Món đồ về lại với ${wdNm(a)}.</p>`});log(`Ngươi minh oan được: ${nm} chỉ thất lạc, đã trả về ${wdNm(a)}.`);return}
  ap(cu,{danh:-10});relAdd(cu,S,BAL.eff.j92.clear);punish(cu,"giá họa vu oan",2);
  Q.push({t:"Minh oan",who:pMe(),h:`<p>${how} Tra ra ${wdNm(cu)} sai người lén đặt ${nm} vào phòng ngươi.</p><p class="past">${wdNmC(cu)}: Danh -10, bị phạt.</p>`});log(`Ngươi minh oan được: ${wdNm(cu)} giá họa, Danh -10, bị phạt.`)};
 const guilty=(light)=>{const x=cur();if(x.i>=0)wdFrameTake(S,x.i);if(cu)S.framedBy=key(cu);
  if(light){apply({danh:BAL.eff.j92.danhGuilty_2});log(`Ngươi nhận lỗi, xin khoan hồng: trả lại đồ, Danh ${balSg(BAL.eff.j92.danhGuilty_2)}.`);Q.push({t:"Nhận lỗi",who:pMe(),h:`<p>${nm} được trả về cho ${wdNm(a)}. Ngươi bị quở, Danh ${balSg(BAL.eff.j92.danhGuilty_2)}.</p>`});return}
  apply({danh:BAL.eff.j92.danhGuilty,sung:BAL.eff.j92.sungGuilty});punish(S,"lấy trộm đồ",1);Q.push({t:"Mang tội ăn trộm",who:pMe(),h:`<p class="r">Không minh oan được: ngươi mang tội lấy trộm ${nm} của ${wdNm(a)}. Danh ${balSg(BAL.eff.j92.danhGuilty)}, ${sgStat(BAL.eff.j92.sungGuilty)}, bị phạt.</p>`})};
 const spendEv=()=>{const x=cur();if(x.e&&x.e.lo&&typeof lostEvUse==="function"&&lostEvUse(x.e.lo))return true;if(cu&&evG(S,cu)>0){evA(S,cu,BAL.eff.j92.evSpendEv);return true}return false};
 const O=[];
 O.push({n:"Trình chứng cứ minh oan",fx:{},p:o1,j67:lo?`tốn: ${balAb(BAL.eff.jlost.evLostEvUse)} chứng cứ đã tra xét`:`tốn: ${balAb(BAL.eff.j92.evSpendEv)} chứng cứ về ${a.name}`,go:()=>{if(!spendEv()){guilty(false);return}if(roll(o1))clear(lo?"Ngươi trình chứng cứ đã tra xét.":`Ngươi trình chứng cứ về ${wdNm(a)}.`);else guilty(false)}});
 O.push({n:"Xin Cung Chính ti tra xét",fx:{},p:o2,j67:"tốn: không tốn gì",go:()=>{if(roll(o2))clear("Cung Chính ti tra hỏi người ra vào.");else guilty(false)}});
 O.push({n:"Nhận lỗi, xin khoan hồng",fx:{},j67:"tốn: không tốn gì",go:()=>guilty(true)});
 return{t:lo?`<p>${wdNmC(a)} báo Cung Chính ti: <b>${nm}</b> của nàng bị thất lạc, nay thấy ở cung ngươi. Cung Chính ti khám phòng ngươi và tìm thấy món ấy.</p>`:`<p>${wdNmC(a)} tố ngươi lấy trộm <b>${nm}</b>. Cung Chính ti khám phòng ngươi và tìm thấy món ấy trong rương.</p>`,o:ev>=1?O:O.slice(1),who:pv(a)}};
A("giahoa","Giá họa trộm đồ",{c:{bac:-BAL.actBac.giahoa},ok:(a,t)=>a.bac>=BAL.actBac.giahoa&&!(t===S&&S.wdFrame),o:(a,t)=>oPlant(a,t),x:"sai người lén đặt đồ quý vào phòng nàng rồi tố nàng ăn cắp",f:(a,t)=>wdFrame(a,t)});
try{AOUT.giahoa=["nàng mang tội ăn trộm: Danh -10, Sủng -5, bị phạt",`kẻ đặt đồ bị bắt: nàng nắm ${balAb(BAL.eff.j92.evWdFrame)} chứng cứ, thù ${balSg(BAL.eff.j92.wdFrame)} · hoặc nàng minh oan được: ngươi Danh -10, bị phạt`]}catch(e){}
try{LACK.giahoa=t=>S.bac<actBac("giahoa",S,t)?"cần Bạc "+actBac("giahoa",S,t)+" để sai người":""}catch(e){}
try{ACTDOM.giahoa="Mưu kế";J78VERB.giahoa="giá họa {t} tội ăn trộm";DIRTY.push("giahoa");
 const g=RVGRP.find(x=>x[0]==="Hại nặng");if(g&&!g[1].includes("giahoa"))g[1].push("giahoa");if(BANDS[2]&&!BANDS[2][2].includes("giahoa"))BANDS[2][2].push("giahoa")}catch(e){}
/* NPC minds: frame-ups for the malicious (weight 2, like Vu oan) */
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(O.length&&(v.malice||0)>=50){const b=bandOf(danger(v,t));const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);
  if(allow.includes("giahoa")&&ACT.giahoa.ok(v,t))O.push(["giahoa",2*persW(v,"giahoa")])}}catch(e){}return O}})();

/* ---------- selling quietly, pawning, redeeming ---------- */
function wdPrice(e){const it=wdItem(e);return it?it.pr:((IT[e.k]&&itm(e.k).pr)||0)}
function wdSellPct(p,ag){return cl(WD.sellLo+Math.round(((ag?ag.loyal:50)-40)/3),WD.sellLo,WD.sellHi)}
function wdLeak(p,ag,half){return cl(Math.round((WD.sellRisk+(nv(ag,"agentLeak"))-(ag&&(ag.loyal||0)>=BAL.loy.deep?5:0))*(half?.5:1)),2,60)}
function wdSell(p,ix){const e=p.inv[ix];if(!e||e.h||!wdItem(e))return"";if(wdIsNt(e))return"";const ag=wdAgent(p);if(!ag)return"";
 p.inv.splice(ix,1);const g=Math.max(1,Math.round(wdPrice(e)*wdSellPct(p,ag)/100));ap(p,{bac:g});let r=`${wdNmC(p)} sai ${ag.name} lén bán ${wdItem(e).n} ra ngoài cung: Bạc +${g}. `;
 if(roll(wdLeak(p,ag))){ap(p,{danh:-WD.sellDanh});r+=`<span class="r">Chuyện lộ ra: cả cung xì xào ${wdNm(p)} túng thiếu phải bán đồ.</span> Danh -${WD.sellDanh}. `;if(p!==S)try{newsAdd(p,"wd",`${wdNmC(p)} túng thiếu, lén bán đồ ra ngoài cung.`)}catch(x){}}
 return r}
function wdPawn(p,ix){const e=p.inv[ix];if(!e||e.h||!wdItem(e))return"";if(wdIsNt(e))return"";const ag=wdAgent(p);if(!ag)return"";
 p.inv.splice(ix,1);const pr=wdPrice(e),g=Math.max(1,Math.round(pr*WD.pawnPct/100)),back=Math.round(pr*WD.redeemPct/100);p.wdPawn=p.wdPawn||[];p.wdPawn.push({e,g,back,due:wk()+WD.pawnWeeks,ag:ag.name});ap(p,{bac:g});
 let r=`${wdNmC(p)} sai ${ag.name} mang ${wdItem(e).n} đi cầm: Bạc +${g}; chuộc lại ${back} bạc trong ${WD.pawnWeeks} tuần. `;
 if(roll(wdLeak(p,ag,true))){ap(p,{danh:-WD.sellDanh});r+=`<span class="r">Chuyện lộ ra: ${wdNm(p)} túng thiếu phải cầm đồ.</span> Danh -${WD.sellDanh}. `}return r}
function wdRedeem(p,i){const P=(p.wdPawn||[])[i];if(!P||p.bac<P.back)return"";ap(p,{bac:-P.back});p.wdPawn.splice(i,1);p.inv.push(P.e);return `${wdNmC(p)} chuộc lại ${wdItem(P.e).n}: Bạc -${P.back}. `}
function wdPawnMonth(p){if(!p.wdPawn||!p.wdPawn.length)return"";let r="";p.wdPawn=p.wdPawn.filter(P=>{if(wk()<=P.due)return true;if(p===S)r+=`${wdItem(P.e).n} cầm cố đã quá hạn, mất hẳn. `;return false});return r}

/* ---------- ngự tứ lost or broken = bất kính (the same risk for everyone holding one) ---------- */
function wdNtHeld(p){const L=[];const w=wdOf(p);for(const sl of ["tram","y"])if(w[sl]&&wdIsNt(w[sl]))L.push({sl,e:w[sl]});(p.inv||[]).forEach(e=>{if(e&&!e.h&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].nt)L.push({e})});return L}
function wdNtRemove(p,e,how){const w=wdOf(p);let done=false;for(const sl of ["tram","y"])if(w[sl]===e){w[sl]=null;const k=wdDefault(p,sl);if(k)w[sl]={k,from:"base"};done=true;break}if(!done){const i=(p.inv||[]).indexOf(e);if(i>=0)p.inv.splice(i,1)}
 /* item conservation (jil): never gone for good */if(typeof ilGone==="function")ilGone(p,e,how==="bị mất"?"lost":"fix",{cause:"srv"})}
function wdNtMonth(p){const H=wdNtHeld(p);if(!H.length)return"";const clumsy=[p.maid].concat(p.staff||[]).find(s=>s&&(netIs(s,"timid")||netIs(s,"greed")));
 if(p===S&&S.wdNtHide&&wk()>=S.wdNtHide.due){const h=S.wdNtHide;S.wdNtHide=null;if(roll(45)){apply({sung:BAL.eff.j92.sungWdNtMonth});punish(S,"làm mất đồ ngự tứ mà giấu, tội bất kính",2);Q.push({t:"Tội bất kính",who:pEmp(),h:`<p class="r">Chuyện ${h.n} ngự tứ ${h.how} bị lộ. Hoàng thượng giận ngươi giấu giếm. ${sgStat(BAL.eff.j92.sungWdNtMonth)}, bị phạt.</p>`})}}
 if(!roll(clumsy?2.5:.8))return"";const x=pick(H);const it=wdItem(x.e);const how=clumsy&&netIs(clumsy,"greed")?"bị mất":"bị làm vỡ";
 if(p===S){pushDil(mkP("wdnt",{k:x.e.k,how,by:clumsy?clumsy.name:""}),"Đồ ngự tứ");return""}
 wdNtRemove(p,x.e,how);const tl=npcTell(p,{from:npwIn(p),to:S.emp||S});/* npc-purpose: only one who sees inside her house knows it is gone */if(tl){ap(p,{sung:-6});punish(p,"làm mất đồ ngự tứ, tội bất kính",1);try{newsAdd(p,"wd",`${wdNmC(p)} để ${it.n} ngự tứ ${how}; ${npwNm(tl.who)} tâu lên, mang tội bất kính.`)}catch(e){}}return""}
PEND.wdnt=pp=>{const it=WD_ITEMS[pp.k];if(!it)return null;const find=()=>wdNtHeld(S).find(x=>x.e.k===pp.k);
 const o=oddsCl(50+eyes(S)*5);
 return{t:`<p><b>${it.n}</b>${/ngự tứ/.test(it.n)?"":" (ngự tứ)"} ${pp.how}${pp.by?`; ${pp.by} run rẩy quỳ xin tội`:""}.</p><p class="past">Làm mất hay làm hỏng đồ ngự tứ là tội bất kính.</p>`,who:pMe(),o:[
  {n:"Tự thú với Hoàng thượng",fx:{},j67:"tốn: không tốn gì",go:()=>{const x=find();if(x)wdNtRemove(S,x.e,pp.how);apply({sung:BAL.eff.j92.sungGo,danh:BAL.eff.j92.danhGo});Q.push({t:"Tự thú",who:pEmp(),h:`<p>Hoàng thượng phật ý nhưng niệm tình ngươi thành thật, không phạt nặng. ${sgStat(BAL.eff.j92.sungGo)}, Danh ${balSg(BAL.eff.j92.danhGo)}.</p>`})}},
  {n:pp.how==="bị mất"?"Sai người lùng tìm":"Sai thợ lén sửa",fx:{bac:BAL.eff.j92.bacFx},p:o,j67:`tốn: Bạc ${balSg(BAL.eff.j92.bacFx)}`,go:()=>{if(roll(o)){Q.push({t:"Đồ ngự tứ",who:pMe(),h:`<p>${pp.how==="bị mất"?"Tìm lại được":"Thợ sửa khéo, không ai nhận ra"} ${it.n}.</p>`});log(`${it.n} ngự tứ đã ${pp.how==="bị mất"?"tìm lại được":"sửa xong"}.`)}
    else{const x=find();if(x)wdNtRemove(S,x.e,pp.how);S.wdNtHide={n:it.n,how:pp.how,due:wk()+3+R(4)};Q.push({t:"Đồ ngự tứ",who:pMe(),h:`<p class="r">${pp.how==="bị mất"?"Lùng khắp nơi không thấy":"Thợ sửa hỏng hẳn"} ${it.n}. Chuyện này còn có thể lộ ra.</p>`})}}},
  {n:"Giấu đi, im lặng",fx:{},j67:"tốn: không tốn gì",go:()=>{const x=find();if(x)wdNtRemove(S,x.e,pp.how);S.wdNtHide={n:it.n,how:pp.how,due:wk()+2+R(5)};log(`Ngươi giấu chuyện ${it.n} ngự tứ ${pp.how}.`)}}]}};
/* ngự tứ cannot be given away or used to frame anyone */
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];if(e&&wdIsNt(e))return"";return g0.apply(this,arguments)}})();
(function(){const p0=plantItem;plantItem=function(a,t,ix){const e=a&&a.inv&&a.inv[ix];if(e&&wdIsNt(e))return"";return p0.apply(this,arguments)}})();
(function(){const s0=sellItem;sellItem=function(p,ix){const e=p&&p.inv&&p.inv[ix];if(e&&(wdIsNt(e)))return"";return s0.apply(this,arguments)}})();

/* ---------- monthly: quốc tang, NPC dressing, remarks, tai mắt, pawns, ngự tứ, promotions (all consorts alike) ---------- */
function wdNpcDress(v){if(!v.wd||!(wdTang()||npcWhy("wdDress",{v},()=>roll(npw1B("wd").dressGo)/* G1 #9 flat-roll audit: she changes her outfit by the old odds (base skipped 70 %; with no done roll NPC re-dressing rose 4390 → 8115) */)))return;wdAutoFor(v,wdNpcBias(v))}
function wdNpcInit(v){if(v.wdI||v.coop)return;/* E44j: never NPC starting pieces into her entry (each one = an «add» to her seat from nowhere) */v.wdI=1;v.inv=v.inv||[];const P=wdPOf(v);const n=1+R(2);for(let i=0;i<n;i++){const k=wdPickAt(cl(P-1+R(4),0,8),roll(50)?"tram":"y",0);if(k)v.inv.push({k,from:"base0"})}}
function wdMonth(pre){let ev="";S.wdk=S.wdk||{};
 /* quốc tang: Thái hậu or Hoàng hậu passes away → 3 months, no red or yellow */
 let why="";if(!pre.th&&S.thDead)why="Thái hậu băng hà";else if(pre.q){const q=rivals.find(v=>v.id===pre.q);if(q&&!q.alive)why=`Hoàng hậu ${q.name} băng hà`}
 if(why){S.wdTang=S.turn+3;Q.push({t:"Quốc tang",who:pEmp(),h:`<p>${why}. Cả cung để tang ba tháng: không mặc đỏ, không cài vàng, không yến tiệc.</p><p class="past">Mặc đồ đỏ hay vàng lúc này là tội. Nên thay y phục, tháo trâm (Tư trang).</p>`});log(`${why}: quốc tang ba tháng.`)
  const ob=BAL.world.tang.obey;for(const v of liveRivals(true))if(roll(traitsOf(v).includes("Kiêu ngạo")?ob[0]:ob[1]))wdAutoFor(v,0)}
 /* a new rank: Nội vụ phủ sends phẩm phục of the new rank (known). review/promo-rules (jpromo, window.PROMO_SET): the whole rank set comes
    with the decree instead (KIT §65), so this month-end issue is skipped */
 if(!window.PROMO_SET)for(const p of consorts()){const P=wdPOf(p);const p0=p===S?pre.P:p.wdP0;if(p0!=null&&P>p0){const k1=wdPickAt(P,"y",1),k2=wdPickAt(P,"tram",1);for(const k of [k1,k2])if(k)wdGain(p,k,{from:"nvp",giver:"Nội vụ phủ",nvp:1});
   if(p===S&&(k1||k2))log(`Nội vụ phủ đưa y phục theo phẩm mới: ${[k1,k2].filter(Boolean).map(k=>WD_ITEMS[k].n).join(", ")}.`)}if(p!==S)p.wdP0=P}
 for(const p of consorts()){if(p!==S){wdNpcInit(p);wdNpcDress(p)}const st=wdStatus(p);
  if(st==="over"){if(npcWhy("wdNotice",{p})){ap(p,{sung:WD.overSung});if(p===S)log(`Hoàng thượng để mắt tới y phục rực rỡ của ngươi. ${sgStat(WD.overSung)}.`)}/* rivals' jealousy: the approved luxury law (jinv luxMonth) */}
  if(!p.confined)ev+=wdRemark(p,st)} /* npc-purpose: wdRemark asks npcWhy("wdRemark") — a remark only from one with a reason */
 ev+=wdTaimat();ev+=wdPawnMonth(S);for(const p of consorts())wdNtMonth(p);
 /* NPCs short of silver sell quietly too */
 for(const o of npcWhyAll("wdPawn")){const v=o.who;const i=(v.inv||[]).findIndex(e=>e&&!e.h&&wdItem(e)&&!wdIsNt(e));if(i>=0)wdSell(v,i)}
 return ev}
(function(){const m0=monthTick;monthTick=function(){let pre=null;try{const q=queenP();pre={th:!!S.thDead,q:q&&q!==S?q.id:null,P:wdPOf(S)}}catch(e){}
 const r=m0.apply(this,arguments);let add="";try{if(pre&&S&&!S.dead)add=wdMonth(pre)}catch(e){console.error(e)}return (r||"")+add}})();
/* a frame-up against her lands 1–2 weeks after the plant */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.wdFrame&&wk()>=S.wdFrame.due){const a=byKey(S.wdFrame.by);const tr=S.wdFrame.traced;if(!a||a===S||(a.alive===false)){S.wdFrame=null}else{
  const i=S.inv.findIndex(e=>e&&e.gh===key(a)&&e.h);if(i<0){const t=wdFrameResolve(a,S);if(t)log(t)}else{S.wdFrame=null;pushDil(mkP("wdframe",{a:key(a),k:S.inv[i].k,tr:tr?1:0}),"Bị tố ăn cắp");try{showModal();render()}catch(x){}}}}}catch(e){console.error(e)}return r}})();

/* ---------- her own actions (Tư trang) ---------- */
function wdUnknownN(){let n=0;const w=wdOf(S);for(const sl of ["tram","y"])if(w[sl]&&w[sl].from!=="base"&&!wdKnowsE(w[sl]))n++;(S.inv||[]).forEach(e=>{if(e&&!e.h&&wdItem(e)&&!wdKnowsE(e)&&!e.nvp)n++});return n}
function wdAutoOdds(){const n=wdUnknownN();return n===0?91:n<=1?70:n<=3?55:40}
function wdAutoUI(){if(!S||S.dead)return;const b=wdCur(S);wdAutoFor(S,0);const t=wdItemsTxt(S);log(b===wdCur(S)?`Tự chọn đồ: ngươi giữ nguyên ${t}.`:`Tự chọn đồ: ngươi thay ${t}.`);render()}
function wdWearUI(ix){if(!can(1))return;const n=wdWear(S,ix);if(!n)return;spend(1);log(`Ngươi thay ${n}.`);render()}
function wdOffUI(sl){const w=wdOf(S);const e=w[sl];if(!e)return;const n=wdItem(e).n;wdTakeOff(S,sl);if(sl==="y"){const k=wdDefault(S,"y");if(k)w.y={k,from:"base"}}log(`Ngươi tháo ${n}.`);render()}
function wdSellUI(ix){if(!can(1))return;const r=wdSell(S,ix);if(!r)return;spend(1);log(r);render()}
function wdPawnUI(ix){if(!can(1))return;const r=wdPawn(S,ix);if(!r)return;spend(1);log(r);render()}
function wdRedeemUI(i){if(!can(1))return;const r=wdRedeem(S,i);if(!r)return;spend(1);log(r);render()}
if(typeof wrapR==="function"){wrapR("wdAutoUI",()=>"Tự chọn đồ");wrapR("wdWearUI",()=>"Thay y phục");wrapR("wdSellUI",()=>"Bán lén");wrapR("wdPawnUI",()=>"Cầm cố");wrapR("wdRedeemUI",()=>"Chuộc lại")}

/* ---------- CHẢI CHUỐT: ~10 s mini-game in the kit game frame (j82 overlay); two of the three needle marks in the green = Vừa vặn (review/mg-snap) ---------- */
function wdGroomW(p){const tai=(p.tai||0)/WD.groomTai;let art=0;try{art=WD.groomArt*Math.max(kg82Lv(p,"hoa")||0,kg82Lv(p,"theu")||0)}catch(e){}
 return Math.min(WD.groomMax,WD.groomBase+tai+art+(wdMama(p)?WD.groomMama:0))}
const KG92={last:null};window.KG92=KG92;
function kg92Groom(box,env){const C=kg82Canvas(box,.62,320),{g,W,H}=C;const w=(env.zw!=null?env.zw:wdGroomW(typeof S!=="undefined"&&S&&!S.dead?S:{}))*(mgLev(env,"chai","zone")||1);/* chai-ramp (owner 21/11 ~00:55Z «không thu nhỏ lại như những game khác», law 5): the base width (wdGroomW: Tài, khéo tay, ma ma) × the ONE board lever BAL.mgTier.lev.chai.zone at the board ease env.lv (jmgt mgLev, as Hoa đăng / Đi đứng bands): Thử tay hồi 1→5, the guided round and real play (mgSet by her rank) all narrow the same way *//* mg-env: generic kg82Play / Thử tay passes no zw → same ONE width the real round uses (wdGroomW, WD.groom* only) */const lo=.5-w/2,hi=.5+w/2;const STEPS=["Cài trâm","Chọn áo","Điểm trang"];
 let k=0,stop=false,raf=0,t0=performance.now(),T0=t0,marks=[];const pops=[];const LIM=WD.groomSec*1000;const x0=W*.08,x1=W*.92,by=H*.52;
 const pos=now=>{const sp=.0016+k*.0006;return .5+.5*Math.sin((now-t0)*sp+k*1.7)};
 function draw(now){kg82Silk(g,W,H,"#f6ead6","#ead6b4");const bw=x1-x0;
  const zone=(a,b,c)=>{g.fillStyle=c;g.fillRect(x0+a*bw,by-14,(b-a)*bw,28)};zone(0,lo,"#cdbf9f");zone(lo,hi,kg82Col("--good","#2d7a52"));zone(hi,1,kg82Col("--red","#c23b22"));
  g.strokeStyle="#6e4d0e";g.lineWidth=2;g.strokeRect(x0,by-14,bw,28);
  g.fillStyle=kg82Col("--ink","#2a1a12");g.font=`600 13px ${kg82Col("--body","sans-serif")}`;g.textAlign="center";
  /* mg-noword-b: zone marks and the step are pictures, no word in play */g.font=`700 18px ${kg82Col("--body","sans-serif")}`;g.font=`700 13px ${kg82Col("--body","sans-serif")}`;g.fillText("Giản dị",x0+lo*bw/2,by+34);g.fillText("Đúng phẩm",x0+.5*bw,by+34);g.fillText("Lộng lẫy",x0+(hi+(1-hi)/2)*bw,by+34);
  for(let q=0;q<3;q++){g.fillStyle=q<k?kg82Col("--good","#2d7a52"):q===k?kg82Col("--gold","#d99a1e"):"#cdbf9f";g.beginPath();g.arc(W/2+(q-1)*24,H*.16,q===k?9:7,0,Math.PI*2);g.fill();g.strokeStyle="#6e4d0e";g.lineWidth=1.4;g.stroke()}
  marks.forEach((m,i)=>kg82Blossom(g,x0+m*bw,by-24,7,"#e48aa4",false));
  if(k<3){const x=x0+pos(now)*bw;g.fillStyle="#8a2a1e";g.beginPath();g.moveTo(x,by-16);g.lineTo(x-9,by-34);g.lineTo(x+9,by-34);g.closePath();g.fill();g.fillRect(x-1.5,by-16,3,32)}
  if(marks.length===3){const m=marks.reduce((a,b)=>a+b,0)/3;const x=x0+m*bw;g.strokeStyle="#2a1a12";g.lineWidth=3;g.beginPath();g.moveTo(x,by-20);g.lineTo(x,by+20);g.stroke()}
  kg82DrawPops(g,pops,now)}
 const one=m=>m>=lo&&m<=hi?10-Math.abs(m-.5)/(w/2)*4:Math.max(0,5-Math.abs(m-.5)*10);/* one mark's worth (review/mg-snap); shared by the result and the board (review/mg-score-same) */
 function tap(auto){if(stop||k>=3)return;const now=performance.now();const m=auto?0:pos(now);marks.push(m);/* review/mg-snap: a mark the clock made is the plainest (she never chose), no longer a random needle spot */const z=m<lo?"Giản dị":m>hi?"Lộng lẫy":"Vừa vặn";kg82Pop(pops,x0+m*(x1-x0),by-40,z,m<lo?kg82Col("--gold","#8f5f0c"):m>hi?kg82Col("--red","#c23b22"):kg82Col("--good","#2d7a52"));
  k++;t0=performance.now()-Math.random()*900;if(k>=3){stop=true;const avg=marks.reduce((a,b)=>a+b,0)/3,inZ=marks.filter(m=>m>=lo&&m<=hi).length;/* review/mg-snap: "Vừa vặn" needs 2 of the 3 marks in the green (the average of 3 blind marks lands there most times) */const zone=inZ>=2?"ok":avg<.5?"under":"over";KG92.last={avg,zone,marks:marks.slice(),w};
   /* review/mg-snap: every mark is scored on its own (the average of 3 random marks drifts to the middle, so blind taps scored ~5–6); a mark the clock made sits at 0 = plain, scores 0 */
   const sc=marks.reduce((s,m)=>s+one(m),0)/3;env.hud({score:mgLive(env,sc)});
   draw(performance.now());setTimeout(()=>env.end(sc),700)}}/* review/mg-score-same: the float (kg82Play grades once) */
 function frame(now){if(stop)return;const left=Math.max(0,LIM-(now-T0));env.hud({score:mgLive(env,(marks.reduce((s,m)=>s+one(m),0)+10*(3-marks.length))/3),round:k<3?`${k+1}/3`:"–",time:`${Math.ceil(left/1000)} giây`});if(left<=0){while(k<3)tap(true);return}draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();tap(false)});const kd=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();tap(false)}};document.addEventListener("keydown",kd);
 KG82.peek=()=>{if(stop||k>=3)return null;return Math.abs(pos(performance.now())-.5)<w/6?C.client(W/2,by):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
try{KG82_ENG.groom=kg92Groom;KG82_KIND.chai={e:"groom",n:"Chải chuốt",t:"Điểm trang trước gương",how:"Kim đưa qua đưa lại: chạm khi kim vào dải xanh. Ba lần."}}catch(e){}
function wdGroomApply(p,zone){const tgt=Math.min(8,wdPOf(p))+(zone==="ok"?0:zone==="over"?1.5:-2.25);wdApply(p,wdBest(p,tgt,e=>wdP(e,p)))}
function wdGroomUI(){if(!S||S.dead||!can(1))return;const w=wdGroomW(S);const m=wdMama(S);
 const how=`Kim lướt qua lại trên thước. Chạm ba lần: cài trâm, chọn áo, điểm trang (trong ${WD.groomSec} giây). Hai trong ba lần dừng ở vùng giữa là đúng phẩm; lệch phải là vượt phẩm, lệch trái là quá giản dị; hết giờ mà chưa chạm là quá giản dị. Vùng giữa rộng theo Tài, khéo tay${m?`, có ${m.name} tinh ý giúp`:", ma ma tinh ý"}.`;
 const d=kg82Open({art:"Chải chuốt",title:"Điểm trang trước gương",how});if(!d){wdAutoUI();return}const box=kg82Box();
 const done=zone=>{spend(1);wdGroomApply(S,zone);const t=wdItemsTxt(S);log(`Ngươi chải chuốt, ${zone==="ok"?"ăn vận vừa vặn":zone==="over"?"ăn vận lộng lẫy":"ăn vận giản dị"}: ${t}.`);
  const html=kg82Rows([["Trâm cài",wdItem(wdOf(S).tram)?wdItem(wdOf(S).tram).n:"không cài","t"],["Y phục",wdItem(wdOf(S).y)?wdItem(wdOf(S).y).n:"thường phục","t"],["Kim dừng",zone==="ok"?"vùng giữa":zone==="over"?"lệch về phía lộng lẫy":"lệch về phía giản dị","n"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg92ok">Đã hiểu</button></div>`;
  kg82ShowRes(html,zone==="ok");$("kg92ok").onclick=()=>{kg82Close();render()}};
 KG82.phase="intro";box.innerHTML=`<div class="kg82act"><button class="${kg82Btn()}" id="kg92go">Bắt đầu</button>${kitQuick({id:"kg92skip",n:"Bỏ qua",sub:`tính như Tự chọn đồ`})}</div>`;
 KG82.back=()=>render();/* KIT §13.9: nothing spent before «Sẵn sàng» (spend(1) only at the end) → back, nothing played */
 kgReady(box,{kind:"chai",how,go:"#kg92go",tutor:(b,env)=>kg92Groom(b,Object.assign(env,{zw:w}))});/* KIT §13.7: rules + «Sẵn sàng» / «Hướng dẫn» (the guided round never dresses her) */
 $("kg92go").onclick=()=>{KG82.back=null;box.innerHTML="";box.hidden=false;KG82.phase="play";let fin=false;let lv=5;try{lv=mgSet("chai",{occ:"hoc"}).ease}catch(e){}/* chai-ramp: the board ease of her seat (rank, law 5), the same mgTier every other game reads; set here, after the guided round (which sets its own) */const env=KG82.cur={kind:"chai",zw:w,lv,hud:o=>{for(const k in o)kg82Set(k,o[k])},end:raw=>{if(fin)return;fin=true;const st=KG82.run&&KG82.run.stop;KG82.peek=()=>null;if(st)try{st()}catch(e){}KG82.run=null;KG82.phase="result";kg82Set("score","3/3");kg82Set("round","–");kg82Set("time","đã xong");done(KG92.last?KG92.last.zone:"ok")}};
  /* §13.9 given up during play = the timeout rule of this game: «hết giờ mà chưa chạm là quá giản dị» */
  KG82.quit=()=>{if(fin)return;fin=true;KG82.quit=null;try{if(stop)stop()}catch(e){}KG82.run=null;KG82.peek=()=>null;KG82.phase="result";kg82Set("time","đã xong");done("under")};
  let stop=null;try{stop=kg92Groom(box,env)}catch(e){console.error(e);env.end(5);return}KG82.run={stop:()=>{if(stop)stop()}}};
 $("kg92skip").onclick=()=>{kg82Close();wdAutoUI()}}

/* ---------- temporary hook-up with existing kit pieces until the kit owner ships K1/K2 (dev/PROGRESS_wardrobe.md) ---------- */
function wdChest(sl){return (S.inv||[]).map((e,ix)=>({e,ix})).filter(x=>x.e&&!x.e.h&&wdItem(x.e)&&(!sl||wdItem(x.e).sl===sl)).map(({e,ix})=>{const it=wdItem(e);
 return{ix,k:it.k,slot:it.sl,name:it.n,grade:it.g,gradeName:WD_GRADE[it.g],icon:it.icon,nt:it.nt,fx:plainFx(it.w)||"giản dị",giver:e.giver||null,date:e.d||null,knownP:wdKnowsE(e)?wdPName(it.P):null,price:it.pr}})}
window.wdChest=wdChest;
function wdSrcTxt(e){if(!e)return"";if(e.from==="base")return"phẩm phục được cấp";if(e.from==="nvp")return`Nội vụ phủ cấp${e.d?", "+e.d:""}`;if(e.giver)return`${e.giver}${wdIsNt(e)?" ngự tứ":" ban"}${e.d?", "+e.d:""}`;if(e.from==="story")return"phần thưởng";return"đồ trong rương"}
/* Tư trang UI: jinv bag + "Đang mang" (jwdinv); the separate "Trang phục đang mặc / Rương" block is gone */
document.addEventListener("click",ev=>{const b=ev.target.closest("[data-wd]");if(!b||b.disabled)return;ev.stopPropagation();const a=b.dataset.wd;
 if(a==="auto")wdAutoUI();else if(a==="groom")wdGroomUI();else if(a==="wear")wdWearUI(+b.dataset.ix);else if(a==="off")wdOffUI(b.dataset.sl);
 else if(a==="sell")wdSellUI(+b.dataset.ix);else if(a==="pawn")wdPawnUI(+b.dataset.ix);else if(a==="redeem")wdRedeemUI(+b.dataset.i)},true);
/* person cards: two kit chips for the worn slots (+ the status only when she knows it) */
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&o&&o.name){const nm=String(o.name).replace(/<[^>]*>/g,"");const p=nm===S.name?S:rivals.find(v=>v.name===nm);
  if(p&&(p===S||(typeof knows!=="function"||knows(p)))){const sl=wdSlots(p);const C=sl.map(x=>chip(`${x.slot==="tram"?"Trâm":"Y phục"}: ${x.name}${x.empty?"":" · "+x.gradeName}`,x.nt?"ok":""));
   if(sl[0].label)C.push(chip(sl[0].label,sl[0].labelKey==="ok"?"ok":"hot"));o=Object.assign({},o,{chips:(o.chips||[]).concat(C)})}}}catch(e){}return p0.call(this,o)}})();
window.wdAutoUI=wdAutoUI;window.wdGroomUI=wdGroomUI;window.wdSell=wdSell;window.wdPawn=wdPawn;window.wdRedeem=wdRedeem;window.wdWear=wdWear;window.wdTakeOff=wdTakeOff;
