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
   if(rr){if(rr.role==="cold")return "silk-ivory";if(rr.role==="mama")return "silk-pink";if(rr.role==="maid")return (rr.rank|0)>=2?"silk-pink":"silk-ivory";if(rr.role==="player"||rr.role==="consort")return "t"+(Math.max(0,Math.min(7,rr.rank|0))+1);if(rr.role==="thaihau")return "t8"}
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
 style:function(file){const r=this.rect(file);if(!r)return "";return `left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%;transform:rotate(${r[4]}deg);transform-origin:${this.origin}`},
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
 remarkBad:35,remarkOk:10,          /* % per month someone remarks on her outfit (reveals the items) */
 taimat:25,              /* % per month tai mắt reveal one unknown item seen around */
 mamaReveal:30,          /* % a trusted ma ma names the P of a new item */
 autoErr:[0,0,1,-1,1,-1,2,-2],      /* Tự chọn: hidden noise drawn once per unknown item kind (in P steps) */
 groomBase:.26,groomTai:250,groomArt:.02,groomMama:.10,groomMax:.6,groomSec:10,
 sellLo:40,sellHi:60,sellRisk:12,sellDanh:3,       /* bán lén via ma ma / thái giám: % of price, % chance the need leaks, Danh lost */
 pawnPct:50,redeemPct:60,pawnWeeks:12,            /* cầm cố: get 50% now, redeem for 60% within 12 tuần, else lost */
 rewardGarment:45,ntSon:35,ntPromo:25,ntContest:15,ntStory:60,ntTH:1, /* % chances a bestowal brings a garment / a ngự tứ */
 frameMalice:60,frameHost:60,frameP:3,            /* NPC giá họa: needs malice and hostility, % per month */
 warnBase:20,                                     /* tai mắt warning before a frame-up lands */
 traceBase:35,traceMat:5,clearBase:55,clearMat:5};
const WD_GRADE=["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm","Ngự tứ"];
const WD_PR=[12,20,30,45,70,100,150,220,320];
function wdPName(P){return P<=0?"cung nhân":P>=9?"Thái hậu":P>=8?"Hoàng hậu":RANKS[P-1]?RANKS[P-1].n:"?"}
/* catalogue: [key, slot, name, P, grade, colour, effect, note]; colour do/vang count as festive (forbidden in quốc tang) */
const WD_LIST=[
 ["tram_dao","tram","Trâm gỗ đào",0,0,"nau",{sac:1}],["tram_dong","tram","Trâm đồng mai hoa",0,0,"vang",{sac:1}],
 ["tramngoc","tram","Trâm ngọc bích",1,0,"xanh",{sac:2}],["tram_hoalua","tram","Trâm hoa lụa",1,0,"hong",{sac:2}],
 ["tram_ngoclan","tram","Trâm bạc ngọc lan",2,1,"trang",{sac:2}],["thoa_diep","tram","Thoa bạc song điệp",2,1,"trang",{sac:3}],
 ["tram_hong","tram","Trâm thạch anh hồng",3,1,"hong",{sac:3}],["hoadien_bac","tram","Hoa điền bạc khảm lưu ly",3,2,"lam",{sac:3,danh:1}],
 ["thoa_vang","tram","Thoa vàng hồ điệp",4,2,"vang",{sac:4,danh:1}],["tram_phithuy","tram","Trâm phỉ thúy hải đường",4,1,"xanh",{sac:4,danh:1}],
 ["boodieu","tram","Bộ diêu vàng",5,2,"vang",{sac:5,danh:2}],["dientu_thuy","tram","Điền tử điểm thúy",5,2,"lam",{sac:5,danh:2}],
 ["bd_phuong","tram","Bộ diêu kim phượng ngậm châu",6,3,"vang",{sac:6,danh:3}],["tram_maudon","tram","Trâm hồng ngọc mẫu đơn",6,2,"do",{sac:6,danh:2}],
 ["diemthuy_cuu","tram","Điểm thúy cửu điệp",7,3,"lam",{sac:7,danh:3}],["kimthoa_phuong","tram","Kim thoa song phượng",7,3,"vang",{sac:7,danh:3}],
 ["tramphuong","tram","Trâm phượng cửu vĩ",8,3,"vang",{sac:8,danh:4}],["phuongquan","tram","Phượng quan bán giá",8,3,"vang",{sac:8,danh:5}],
 ["nt_nhuy","tram","Trâm ngọc như ý ngự tứ",5,4,"xanh",{sac:5,danh:3}],["nt_haiduong","tram","Bộ diêu «Hải đường xuân thụy» ngự tứ",6,4,"hong",{sac:6,danh:4}],["nt_dongchau","tram","Trâm đông châu ngự tứ",7,4,"trang",{sac:7,danh:5}],
 ["y_cungnu","y","Áo vải xanh cung nhân",0,0,"xanh",{}],["y_luamoc","y","Áo lụa mộc hồng nhạt",0,0,"hong",{sac:1}],
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
(function(){for(const [k,sl,n,P,g,col,w,note] of WD_LIST){const it={k,sl,n,P,g,col,w,nt:g===4?1:0,pr:g===4?0:WD_PR[P],icon:`img/wd-${k.replace(/_/g,"-")}.webp`,note:note||""};WD_ITEMS[k]=it;
  const d=`${sl==="tram"?"Cài tóc":"Mặc"}: ${Object.keys(w).length?plainFx(w):"giản dị"} · ${WD_GRADE[g]}${it.nt?" · chỉ có khi được ban, không bán, không tặng":""}${note?" · "+note:""}`;
  /* register in the chest's IT table; keep old fields of the three old hair items (tramngoc, boodieu, tramphuong) but hide their rank hint */
  IT[k]=Object.assign(IT[k]||{tg:sl==="tram"?["hh","rv"]:["rv"]},{n,kd:sl==="tram"?"Trâm cài":"Y phục",d,pr:it.pr,wsl:sl,wd:1});if(it.nt){IT[k].keep=1;IT[k].tg=[]}
  if(IT[k].sl==="hair")delete IT[k].sl}})();
function plainFx(o){return Object.entries(o||{}).filter(([k,v])=>v&&NAMES[k]).map(([k,v])=>`${NAMES[k]} ${v>0?"+":""}${v}`).join(", ")}
/* old ngự-ban things are ngự tứ too */
["ngocboi","bienngu"].forEach(k=>{if(IT[k]){IT[k].nt=1}});
function wdIsNt(e){return !!(e&&((WD_ITEMS[e.k]&&WD_ITEMS[e.k].nt)||e.nt||(IT[e.k]&&IT[e.k].nt)))}

/* ---------- who is what ---------- */
function wdPOf(p){try{if(!p)return 1;const rr=typeof personRoleRank==="function"?personRoleRank(p):null;
  if(rr){if(rr.role==="maid"||rr.role==="mama"||rr.role==="cold")return 0;if(rr.role==="thaihau")return 9;if(rr.role==="player"||rr.role==="consort")return Math.max(0,Math.min(7,rr.rank|0))+1}
  if(p.out)return 0;return (typeof rkOf==="function"&&(p===S||p.rank!=null)?rkOf(p):0)+1}catch(e){return 1}}
function wdKey(p){return p===S?"me":p&&p.id!=null?String(p.id):p&&p.name?"n:"+p.name:"?"}
function wdHash(s){let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function wdPool(sl,P,noNt){return WD_LIST.filter(r=>r[1]===sl&&r[3]===P&&(!noNt||r[4]!==4)&&r[0]!=="y_tang").map(r=>r[0])}
function wdDefault(p,sl){const P=Math.min(8,wdPOf(p));const L=wdPool(sl,P,true);return L.length?L[wdHash(wdKey(p)+sl)%L.length]:null}
/* lazily give everybody (old saves too) a default outfit at their own P: nobody starts wrong */
function wdOf(p){if(!p)return null;if(!p.wd||typeof p.wd!=="object"){p.wd={tram:null,y:null};
  if(p===S&&S.inv){const i=S.inv.findIndex(e=>e&&e.w&&IT[e.k]&&IT[e.k].wsl==="tram"&&!e.h);if(i>=0){const e=S.inv.splice(i,1)[0];delete e.w;p.wd.tram=e}}
  for(const sl of ["tram","y"])if(!p.wd[sl]){const k=wdDefault(p,sl);if(k)p.wd[sl]={k,from:"base"}}}
 if(p.inv)p.inv.forEach(e=>{if(e&&e.w&&IT[e.k]&&IT[e.k].wsl)delete e.w});return p.wd}
function wdItem(e){return e&&WD_ITEMS[e.k]||null}
function wdP(e,p){const it=wdItem(e);if(!it)return 0;if(it.nt&&e.own&&e.own===wdKey(p))return Math.min(it.P,wdPOf(p));return it.P}
function wdLevel(p){const w=wdOf(p);return WD.wT*wdP(w.tram,p)+WD.wY*wdP(w.y,p)}
function wdTang(){return !!(S&&S.wdTang&&S.wdTang>S.turn)}
function wdFest(){try{return typeof festToday==="function"&&!!festToday()}catch(e){return false}}
/* TRUE status: "ok" | "over" | "under" | "tang" */
function wdStatus(p){const w=wdOf(p);if(wdTang()){for(const sl of ["tram","y"]){const it=wdItem(w[sl]);if(it&&(it.col==="do"||it.col==="vang")&&!(it.nt&&w[sl].own===wdKey(p)&&false))return "tang"}return "ok"}
 const d=wdLevel(p)-Math.min(8,wdPOf(p));if(wdPOf(p)>=9)return d<=WD.under?"under":"ok";if(d>=WD.over)return "over";if(d<=(wdFest()?WD.underFest:WD.under))return "under";return "ok"}
const WD_LABEL={ok:"Đúng phẩm",over:"Vượt phẩm",under:"Quá giản dị",tang:"Phạm tang"};
/* what the PLAYER knows: the status of p's outfit only if she knows the P of both worn items */
function wdKnowsItem(k){return !!(S&&S.wdk&&S.wdk[k])}
function wdKnownStatus(p){const w=wdOf(p);const ks=["tram","y"].map(sl=>w[sl]&&w[sl].k).filter(Boolean);if(wdTang())return wdStatus(p);if(!ks.length||!ks.every(wdKnowsItem))return null;return wdStatus(p)}
function wdReveal(k,how){if(!S||!k||!WD_ITEMS[k])return "";S.wdk=S.wdk||{};if(S.wdk[k])return "";S.wdk[k]=1;const it=WD_ITEMS[k];
 const t=`Biết được: ${it.n} là đồ phẩm ${wdPName(it.P)}${how?` (${how})`:""}.`;try{log(t)}catch(e){}return t}
function wdRevealOutfit(p,how){const w=wdOf(p);let r="";for(const sl of ["tram","y"])if(w[sl])r+=wdReveal(w[sl].k,how)+" ";return r.trim()}
/* the visible data of p's two slots (for the kit: K1 in dev/PROGRESS_wardrobe.md) */
function wdSlots(p){const w=wdOf(p);const lab=wdKnownStatus(p);return ["tram","y"].map(sl=>{const e=w[sl],it=wdItem(e);
  if(!it)return{slot:sl,empty:true,name:sl==="tram"?"Chưa cài":"Thường phục",label:null};
  return{slot:sl,k:it.k,name:it.n,grade:it.g,gradeName:WD_GRADE[it.g],icon:it.icon,nt:it.nt,giver:e.giver||null,date:e.d||null,
   knownP:wdKnowsItem(it.k)?wdPName(it.P):null,label:lab?WD_LABEL[lab]:null,labelKey:lab}})}
window.wdSlots=wdSlots;window.WD=WD;window.WD_ITEMS=WD_ITEMS;

/* ---------- putting things on: the same rules for everyone ---------- */
function wdWearEntry(p,e){const it=wdItem(e);if(!it)return"";const w=wdOf(p);const old=w[it.sl];if(old&&old.from!=="base"){p.inv=p.inv||[];p.inv.push(old)}w[it.sl]=e;return it.n}
function wdTakeOff(p,sl){const w=wdOf(p);const e=w[sl];if(!e)return;if(e.from!=="base"){p.inv=p.inv||[];p.inv.push(e)}w[sl]=null}
function wdWear(p,ix){const e=p.inv&&p.inv[ix];if(!e||e.h||!wdItem(e))return"";p.inv.splice(ix,1);delete e.w;return wdWearEntry(p,e)}
/* what someone BELIEVES an item's P is: true if known, else a fixed hidden noise per item kind (per person) */
function wdBelP(p,k){const it=WD_ITEMS[k];if(!it)return 0;if(p===S?wdKnowsItem(k):((p.wdk||{})[k]))return it.P;
 const n=WD.autoErr[wdHash(wdKey(p)+k)%WD.autoErr.length];return it.P+n}
/* all candidate pairs from the worn items + chest; score by a P function */
function wdCands(p){const w=wdOf(p);const C={tram:[null],y:[null]};
 for(const sl of ["tram","y"]){if(w[sl])C[sl].push({src:"w",e:w[sl]});(p.inv||[]).forEach((e,i)=>{if(e&&!e.h&&wdItem(e)&&wdItem(e).sl===sl)C[sl].push({src:i,e})})}
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
function wdAutoFor(p,bias){const tgt=Math.min(8,wdPOf(p))+(bias||0);wdApply(p,wdBest(p,tgt,e=>wdBelP(p,e.k)))}
/* NPC choice: by belief + trait (Kiêu ngạo / Tham vọng dress up, Hiền lành / Nhu mì keep modest) */
function wdNpcBias(v){const t=(typeof traitsOf==="function"?traitsOf(v):[v.trait]).join(" ");return /Kiêu ngạo|Tham vọng/.test(t)?1:/Hiền lành|Nhu mì/.test(t)?-.5:0}

/* ---------- bonus to Sắc / Danh while worn (adds to the existing wearBonus; Vượt phẩm items count 1.5x as before) ---------- */
(function(){const w0=wearBonus;wearBonus=function(p){const b=w0.apply(this,arguments);try{if(!p)return b;const w=wdOf(p);const over=wdStatus(p)==="over";
  for(const sl of ["tram","y"]){const it=wdItem(w[sl]);if(!it)continue;for(const s in it.w){b[s]=(b[s]||0)+Math.round(it.w[s]*(over?1.5:1))}}}catch(e){}return b}})();
/* the old hair 'wear' button now puts the item into the TRÂM slot */
(function(){const w0=wear;wear=function(p,ix){const e=p&&p.inv&&p.inv[ix];if(e&&IT[e.k]&&IT[e.k].wsl){wdWear(p,ix);return}return w0.apply(this,arguments)}})();
/* old 'vượt phẩm' list (used by j8 night / j25 text) = the over-rank worn items */
vpItems=function(p){try{return wdStatus(p)==="over"?["tram","y"].map(sl=>wdOf(p)[sl]).filter(e=>e&&wdItem(e)&&wdItem(e).P>wdPOf(p)).map(e=>({k:e.k})):[]}catch(e){return[]}};
