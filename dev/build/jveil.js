/* ================= jveil: MẠNG CHE MẶT LÀ VẬT PHẨM THẬT (owner 11/14 19:30Z, review/items-earned) =================
   Before: after hủy dung (j70) a veil appeared for free (choice "Che mạng khi ra ngoài" set p.scar.veil = 1).
   Now a veil is a real item that must be OBTAINED, the same rules for her and for every consort (two-way):
     · tự tay kết (craft): the embroidery mini-game (playArt "theu", else "hoa"); material picks the band, the score picks phẩm + grade;
     · mua (buy): Nội vụ phủ (own phẩm only, phẩm known) or sai người mua lén ngoài cung (any phẩm, cheaper, phẩm unknown, may leak);
     · được ban / tặng (gift): xin Hoàng hậu / Thái hậu ban, friends send one, Hoàng thượng may add one to a bestowal, anyone may give one (Tặng).
   Until she wears one, the scar shows with its full Sắc loss (j70 effSac) and the kit draws the scratch marks without a veil.
   Items: IT["mc<P><g>"] P 0..8 = phẩm phục scale of j92 (0 cung nhân, 1..8 Đáp ứng..Hoàng hậu), g 0..3 = Thường..Tuyệt phẩm;
          IT.mcnt = Mạng ngự tứ (grade 4, by right for its owner, art follows her rank, cannot be sold or given).
   Art = the existing veil paintings (KIT_VEIL): P0 Thường = silk-ivory, P0 Tinh phẩm+ = silk-pink, P1..P8 = veil-t1..t8.
   Worn veil: p.vl (one entry); p.scar.veil mirrors it (j70 effSac / scarOf, jk2b overlays keep working).
   Grade = how well it hides the wound: Sắc lost while veiled = scar.d × VL.cover[g] (Thường 2/3 = the old free veil).
   Vượt phẩm: a veil of a phẩm above hers makes the outfit Vượt phẩm (j92 rule: hidden until someone remarks; hặc confiscates it).
   Old saves: p.scar.veil = 1 without an item → she is given the matching Thường veil of her own phẩm (worn, phẩm known).
   Knobs: VL below. Balance notes in dev/ITEMS_EARNED.md. ================= */
const VL={base:[6,10,15,22,35,50,75,110,160],gMul:[1,1.5,2.2,3.2],cover:[2/3,.6,.53,.47,.4],
 mat:[0,6,45],               /* craft material cost: vải sa · dây bạc, trai · kim tuyến, ngọc */
 outX:.8,outRisk:12,outDanh:3, /* mua lén: price factor, % the errand leaks, Danh lost */
 askHH:15,askTH:10,askFail:2, /* xin ban: odds = base + favour/2; favour lost on refusal */
 craftSuc:10,                /* Sức spent on a crafting session (2 khắc) */
 npcBuy:45,npcCraft:30,npcAsk:15,giftP:12,empP:35}; /* NPC monthly chances; a friend sends one; a bestowal adds one */
const VL_NAME=["Mạng sa","Mạng chuỗi bạc lưu ly","Mạng dây lụa hồng kết trai","Mạng bạc chạm hoa","Mạng vàng nhạt kết mã não","Mạng kim hoa ngọc bích","Mạng kim vân trân châu","Mạng kim ty mẫu đơn","Mạng phượng điểm thúy"];
const VL_COVER=["che được ít","che khá kín","che kín","che rất kín","che kín, lại là ân điển"];
function vlKey(P,g){return g>=4?"mcnt":`mc${cl(P|0,0,8)}${cl(g|0,0,3)}`}
/* a veil is worn over a wounded (j70 scar) or rashy (jrash) face */
function vlNeed(p){return !!(p&&(p.scar||p.rash))}
function vlIsK(k){return typeof k==="string"&&/^mc(nt|\d\d)$/.test(k)}
function vlIs(e){return !!(e&&vlIsK(e.k))}
function vlP(e,p){if(!vlIs(e))return 0;if(e.k==="mcnt")return Math.min(8,wdPOf(p||S));return +e.k[2]}
function vlG(e){if(!vlIs(e))return 0;return e.k==="mcnt"?4:+e.k[3]}
function vlName(k){if(k==="mcnt")return "Mạng ngự tứ";const P=+k[2],g=+k[3];return P===0?(g?"Mạng sa hồng thêu hoa":"Mạng sa ngà"):VL_NAME[P]}
function vlPrice(P,g){return g>=4?0:Math.round(VL.base[cl(P,0,8)]*VL.gMul[cl(g,0,3)])}
/* the painting for an entry worn (or shown) by p */
function vlTier(e,p){if(!vlIs(e))return null;if(e.k==="mcnt"){try{return VL_TIER0(p)}catch(x){return "t5"}}const P=+e.k[2];return P===0?(+e.k[3]?"silk-pink":"silk-ivory"):"t"+P}
function vlSrc(k,p){const t=vlTier({k},p||S);return `img/veil-${t||"t5"}.png`}
(function(){for(let P=0;P<=8;P++)for(let g=0;g<=3;g++){const k=vlKey(P,g);IT[k]=Object.assign(IT[k]||{},{n:vlName(k),kd:"Mạng che mặt",vl:1,pr:vlPrice(P,g),tg:["rv","hh"],
  d:`Đeo khi mặt có vết thương: ${VL_COVER[g]} · ${(typeof WD_GRADE!=="undefined"?WD_GRADE:["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm"])[g]}`})}
 IT.mcnt=Object.assign(IT.mcnt||{},{n:"Mạng ngự tứ",kd:"Mạng che mặt",vl:1,pr:0,tg:[],keep:1,nt:1,d:`Đeo khi mặt có vết thương: ${VL_COVER[4]} · Ngự tứ · không bán, không tặng`})})();
/* kit item picture: the veil painting itself (kitItemSrc falls back to it) */
(function(){if(typeof kitItemSrc!=="function")return;const k0=kitItemSrc;kitItemSrc=function(k,fb){if(vlIsK(k))return vlSrc(k);return k0.apply(this,arguments)}})();

/* ---------- worn veil <-> p.scar.veil; old saves ---------- */
/* vlFix (review/newlife-reset, owner bug 17/11): p.vl is ONLY a worn veil entry. The ONE migration of the old voice memory (S.vl -> S.vmem, keyless
   chest pieces dropped) is j8 itClean (it-key-guard, kept by main s29 17/11). vlFix only adds what itClean does not: the false line 'Vết thương trên mặt
   đã lành, ngươi tháo mạng che' that bug logged leaves her log. It runs BEFORE itClean (wrapper below) while the old memory is still visible. */
function vlMemLike(e){if(!e||typeof e!=="object"||Array.isArray(e)||e.k!=null)return false;const V=Object.values(e);return V.length>0&&V.every(x=>x&&typeof x==="object"&&!Array.isArray(x))||!V.length}
function vlFix(p){if(!p||p!==S)return;try{if((p.vl!=null&&!vlIs(p.vl))||(Array.isArray(p.inv)&&p.inv.some(vlMemLike)))vlScrubLog()}catch(e){}}
/* the false healing line of that bug: gone from her log when she never owned a veil (a real healing always follows a veil she wore) */
function vlScrubLog(){try{if(!Array.isArray(S.logs)||vlIs(S.vl)||(S.inv||[]).some(vlIs))return;S.logs=S.logs.filter(l=>!/Vết thương trên mặt đã lành, ngươi tháo mạng che/.test(String(l)))}catch(e){}}
function vlMig(p){try{vlFix(p);if(!p||!p.scar)return;if(p.scar.veil&&!p.vl){const P=Math.min(8,wdPOf(p));p.vl={k:vlKey(P,0),src:"cu",d:typeof wdWhen==="function"?wdWhen():""};
  if(p===S){S.wdk=S.wdk||{};S.wdk[p.vl.k]=1}else{p.wdk=p.wdk||{};p.wdk[p.vl.k]=1}}p.scar.veil=p.vl?1:0}catch(e){}}
function vlSync(p){if(!p)return;vlFix(p);if(p.scar)vlMig(p);if(!vlNeed(p)&&vlIs(p.vl)){/* only a real veil comes off (never a foreign object in the veil slot) */p.inv=p.inv||[];p.inv.push(p.vl);p.vl=null;
  if(p===S)try{log("Vết thương trên mặt đã lành, ngươi tháo mạng che, cất vào rương.")}catch(e){}}}
function vlPeople(){const L=[S];try{for(const v of rivals)if(v&&v!==S)L.push(v)}catch(e){}return L}
/* r1 (merge with main it-key-guard): j8 itClean (inside normAll / co-op) also moves an old voice memory out of S.vl; vlFix runs FIRST so it still sees
   the memory and removes the false healing line of that bug (after itClean S.vl is already null and the signal is gone) */
(function(){if(typeof itClean!=="function")return;const c0=itClean;itClean=function(){try{for(const p of vlPeople())vlFix(p)}catch(e){}return c0.apply(this,arguments)}})();
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);try{for(const p of vlPeople())vlMig(p)}catch(e){}return r}})();
const VL_TIER0=KIT_VEIL.tierOf.bind(KIT_VEIL);
KIT_VEIL.on=function(p){try{if(!p||!vlNeed(p))return false;vlMig(p);return vlIs(p.vl)}catch(e){return false}};
KIT_VEIL.tierOf=function(p){try{if(p&&p.vl&&vlNeed(p))return vlTier(p.vl,p)||VL_TIER0(p)}catch(e){}return VL_TIER0(p)};
/* the grade decides how much of the wound the veil hides (Thường = the old 2/3) */
(function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{if(p&&p.scar&&p.scar.veil&&p.vl){const d=p.scar.d;r=cl(r+Math.round(d*2/3)-Math.round(d*VL.cover[vlG(p.vl)]),0,130)}}catch(e){}return r}})();
(function(){const s0=scarOf;scarOf=function(p){const r=s0.apply(this,arguments);try{const q=p||S;if(r&&q.vl&&q.scar&&q.scar.veil)r.sacLost=Math.round(q.scar.d*VL.cover[vlG(q.vl)])}catch(e){}return r};window.scarOf=scarOf})();

/* ---------- wear / take off (same function for everyone) ---------- */
function vlWear(p,ix){const e=p&&p.inv&&p.inv[ix];if(!vlIs(e)||e.h||!vlNeed(p))return"";p.inv.splice(ix,1);if(e.from){e.src=e.src||e.from;delete e.from}if(p.vl){p.inv.push(p.vl)}p.vl=e;if(p.scar)p.scar.veil=1;return itm(e.k).n}
function vlOff(p){if(!p||!vlIs(p.vl))return"";const n=itm(p.vl.k).n;p.inv=p.inv||[];p.inv.push(p.vl);p.vl=null;if(p.scar)p.scar.veil=0;return n}
function vlChest(p){return (p.inv||[]).map((e,ix)=>({e,ix})).filter(x=>vlIs(x.e)&&!x.e.h)}
/* useItem on a veil = wear it (never consumed) */
(function(){const u0=useItem;useItem=function(p,ix,tgt){const e=p&&p.inv&&p.inv[ix];if(vlIs(e)){const n=vlWear(p,ix);return n?`${NMc(p)} đeo ${n}. `:""}return u0.apply(this,arguments)}})();
/* ngự tứ veil: not sold, not given */
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];if(e&&e.k==="mcnt")return"";return g0.apply(this,arguments)}})();

/* ---------- knowing a veil's phẩm (j92 rule: hidden until learnt) ---------- */
function vlKnows(obs,e){if(!vlIs(e))return true;if(e.k==="mcnt")return true;const W=obs===S?(S.wdk||{}):(obs.wdk||{});return !!W[e.k]}
function vlReveal(obs,k,how){if(!vlIsK(k)||k==="mcnt")return"";if(obs===S){S.wdk=S.wdk||{};if(S.wdk[k])return"";S.wdk[k]=1;const t=`Biết được: ${itm(k).n} là đồ phẩm ${wdPName(+k[2])}${how?` (${how})`:""}.`;try{log(t);kitKnow({key:"wd:"+k,text:t})}catch(e){}return t}
 obs.wdk=obs.wdk||{};obs.wdk[k]=1;return""}
/* j92 status: a veil above her phẩm makes the outfit Vượt phẩm; truth and beliefs both go through wdP / wdBelPE */
(function(){const p0=wdP;wdP=function(e,p){if(vlIs(e))return vlP(e,p);return p0.apply(this,arguments)}})();
(function(){const b0=wdBelPE;wdBelPE=function(obs,e,owner){if(vlIs(e)){if(e.k==="mcnt")return vlP(e,owner);if(vlKnows(obs,e))return vlP(e,owner);
  const n=WD.autoErr[wdHash(wdKey(obs)+e.k)%WD.autoErr.length];return vlP(e,owner)+n}return b0.apply(this,arguments)}})();
(function(){const s0=wdStatusBy;wdStatusBy=function(p,pf){const s=s0.apply(this,arguments);try{if(s!=="tang"&&p&&p.vl&&vlNeed(p)&&p.vl.k!=="mcnt"){if(pf(p.vl)-Math.min(8,wdPOf(p))>=1)return "over"}}catch(e){}return s}})();
(function(){const k0=wdKnownStatus;wdKnownStatus=function(p){if(p&&p.vl&&vlNeed(p)&&!vlKnows(S,p.vl))return null;return k0.apply(this,arguments)}})();
(function(){const k0=wdKnowAll;wdKnowAll=function(obs,p){const r=k0.apply(this,arguments);try{if(p&&p.vl&&vlNeed(p))vlReveal(obs,p.vl.k,"")}catch(e){}return r}})();
(function(){const c0=wdCur;wdCur=function(p){const r=c0.apply(this,arguments);return p&&p.vl&&vlNeed(p)?r+"|"+p.vl.k:r}})();
/* a successful hặc vượt phẩm also takes an over-phẩm veil (not a ngự tứ) */
(function(){const a0=wdAccuse;wdAccuse=function(a,t){const pre=(()=>{try{return wdStatus(t)}catch(e){return""}})();const r=a0.apply(this,arguments);
  try{if(pre==="over"&&t&&t.vl&&vlNeed(t)&&t.vl.k!=="mcnt"&&vlP(t.vl,t)>Math.min(8,wdPOf(t))&&/vượt phẩm: <span[^>]*>thành/.test(r)){const n=itm(t.vl.k).n;t.vl=null;if(t.scar)t.scar.veil=0;return r+`${n} bị tịch thu. `}}catch(e){}return r}})();

/* ---------- getting one: the same functions for her and for every consort ---------- */
/* bought / crafted entries keep their source in .src (no .from): j93 shows a gift chest only for real gifts (.from) */
const VL_OWN={nvp:1,ngoai:1,tay:1,cu:1,mua:1};
function vlGain(p,k,src){src=src||{};p.inv=p.inv||[];const f=src.from||"mua";const e=VL_OWN[f]?{k,src:f}:{k,from:f};if(src.giver)e.giver=src.giver;try{e.d=wdWhen()}catch(x){}if(k==="mcnt")e.own=wdKey(p);
 p.inv.push(e);if(src.known)vlReveal(p,k,src.known===1?"":src.known);return e}
/* craft: material m 0..2 sets the band; q = mini-game raw 0..10 + art grade + material (+ Công) picks phẩm and grade */
const VL_CRAFT=[[[0,0],[0,1],[0,2],[0,3]],[[1,0],[2,0],[3,1],[4,1]],[[4,1],[5,2],[6,2],[7,3]]];
const VL_MATN=["vải sa, chỉ thêu","dây bạc, trai, lưu ly","kim tuyến, ngọc, trân châu"];
function vlArt(){try{return ARTS.some(a=>a.k==="theu")?"theu":"hoa"}catch(e){return "hoa"}}
function vlLv(p){const a=vlArt();try{return typeof wkLv==="function"?wkLv(p,a):((p.arts||{})[a]||0)}catch(e){return 0}}
function vlQ(p,m,raw){let c=0;try{if(typeof wkCongPh==="function")c=wkCongPh(p)}catch(e){}return raw+vlLv(p)+m+c}
function vlCraftOut(p,m,raw){const q=vlQ(p,m,raw);const i=q>=BAL.cut.veil[2]?3:q>=BAL.cut.veil[1]?2:q>=BAL.cut.veil[0]?1:0;const [P,g]=VL_CRAFT[m][i];return vlKey(P,g)}
function vlCraft(p,m,raw){const k=vlCraftOut(p,m,raw);if(VL.mat[m])ap(p,{bac:-VL.mat[m]});vlGain(p,k,{from:"tay",giver:""});return k}
/* (owner 14:50Z, paid tiers) the card shows the same concrete facts as every j83 material card: what 5 phần makes, its worth in bạc,
   the play score each better band needs, and what this material can never reach */
function vlGradeOdds(p,m){const G=WD_GRADE,k5=vlCraftOut(p,m,5),lo=vlG({k:k5});const N=[];let last=k5;
 for(let r=6;r<=10;r++){const k=vlCraftOut(p,m,r);if(k!==last){N.push(`${G[vlG({k})]} (${itm(k).pr} bạc): cần chơi ${r} phần`);last=k}}
 const top=VL_CRAFT[m][3],cap=vlG({k:vlKey(top[0],top[1])});
 return `chơi 5 phần: ${G[lo]}, đáng ${itm(k5).pr} bạc${N.length?" · "+N.join(" · "):""}${cap<3?` · cao nhất ${G[cap]}`:""}`}
/* buy at Nội vụ phủ: her own phẩm (and plain sa), phẩm known */
function vlNvpList(p){const P=Math.min(8,wdPOf(p));const L=[vlKey(P,0),vlKey(P,1),vlKey(P,2)];if(P>0)L.unshift(vlKey(0,0));return L}
function vlBuyNvp(p,k){const pr=itm(k).pr;if((p.bac||0)<pr)return"";ap(p,{bac:-pr});vlGain(p,k,{from:"nvp",giver:"Nội vụ phủ",known:"Nội vụ phủ cấp theo phẩm"});return `${NMc(p)} đặt ở Nội vụ phủ ${itm(k).n}: Bạc -${pr}. `}
/* buy outside: any phẩm near hers, cheaper, phẩm unknown, the errand may leak */
function vlOutList(p){const P=Math.min(8,wdPOf(p));const L=[];const seen={};for(const d of [-1,0,1,2])for(const g of [0,1]){const q=cl(P+d,0,8);const k=vlKey(q,g);if(!seen[k]){seen[k]=1;L.push(k)}}return L.slice(0,6)}
function vlOutPrice(k){return Math.max(1,Math.round(itm(k).pr*VL.outX))}
function vlAgent(p){try{const a=typeof wdAgent==="function"?wdAgent(p):null;if(a)return a}catch(e){}return p.maid&&(p.maid.loyal||0)>=BAL.loy.low?p.maid:null}
function vlLeak(p,ag){return cl(VL.outRisk+(nv(ag,"agentLeak"))-(ag&&(ag.loyal||0)>=BAL.loy.deep?5:0),2,60)}
function vlBuyOut(p,k){const ag=vlAgent(p);const pr=vlOutPrice(k);if(!ag||(p.bac||0)<pr)return"";ap(p,{bac:-pr});vlGain(p,k,{from:"ngoai",giver:""});
 let r=`${NMc(p)} sai ${ag.name} lén mua ${itm(k).n} ngoài cung: Bạc -${pr}. `;
 if(roll(vlLeak(p,ag))){ap(p,{danh:-VL.outDanh});r+=`<span class="r">Chuyện lộ ra: cả cung xì xào ${p===S?"ngươi":p.name} lén mua đồ ngoài cung.</span> Danh -${VL.outDanh}. `;if(p!==S)try{newsAdd(p,"wd",`${NMc(p)} sai người lén mua mạng che mặt ngoài cung.`)}catch(x){}}
 return r}
/* ask a bestowal: Hoàng hậu (when she is not the asker) or Thái hậu; odds by their favour */
function vlGivers(p){const L=[];try{const q=queenP();if(q&&q!==p&&q.alive!==false)L.push({k:"hh",n:"Hoàng hậu",o:oddsCl(Math.min(VL.askHH+(p.hh||0)/2,90))})}catch(e){}if(!S.thDead)L.push({k:"th",n:"Thái hậu",o:oddsCl(Math.min(VL.askTH+(p.th||0)/2,90))});return L}
function vlAsk(p,gk){const G=vlGivers(p).find(x=>x.k===gk);if(!G)return"";const nm=p===S?"Ngươi":`${rkName(p)} ${p.name}`;
 if(aRoll(G.o,p)){const k=vlKey(Math.min(8,wdPOf(p)),1);vlGain(p,k,{from:gk,giver:G.n,known:`${G.n} ban theo phẩm`});return `${nm} xin ${G.n} ban mạng che mặt: <span class="g">thành</span>. ${G.n} ban ${itm(k).n} (Tinh phẩm). `}
 ap(p,{[gk]:-VL.askFail});return `${nm} xin ${G.n} ban mạng che mặt; ${G.n} không ban, còn chê phiền. ${G.n} với ${p===S?"ngươi":"nàng"} -${VL.askFail}. `}

/* ---------- her side: dialogs in the kit modal ---------- */
function vlWhen(c){return whyTime(c)}
/* one option line in the kit modal: price + gain/loss + odds shown in full (these are acts, not hidden event choices) */
function vlOpt(o){const fx=String(fmt(o.fx||{})).replace(/<[^>]+>/g,"");let L=o.x||"";if(fx)L=/tốn: /.test(L)?L.replace(/tốn: /,"tốn: "+fx+", "):(L?L.replace(/^((?:[^·]*?(?:Liều|Khó|Năm ăn năm thua|Khá chắc|Chắc|Rất chắc|Nắm chắc)) · )?/,"$1tốn: "+fx+" · "):"tốn: "+fx);o.j67=L||"tốn: không tốn gì";return o}
PEND.vlget=pp=>{if(!S||S.dead)return null;const sc=S.scar?scarOf(S):null;const O=[];const ag=vlAgent(S);
 O.push(vlOpt({n:"Tự tay kết mạng",fx:{},x:`tốn: 2 khắc, Sức -${VL.craftSuc} · thành: trò thêu, chơi càng khéo mạng càng quý`,go:()=>{if(!can(2)||S.suc<VL.craftSuc+5){log("Không đủ khắc hay Sức để tự tay kết mạng.");return}pushDil(mkP("vlcraft"),"Tự tay kết mạng")}}));
 O.push(vlOpt({n:"Đặt ở Nội vụ phủ",fx:{},x:`tốn: 1 khắc · thành: mạng đúng phẩm của ngươi, giá theo phẩm`,go:()=>{if(!can(1))return;pushDil(mkP("vlnvp"),"Nội vụ phủ")}}));
 O.push(vlOpt({n:"Sai người mua lén ngoài cung",fx:{},x:ag?`tốn: 1 khắc · thành: rẻ hơn, nhiều kiểu · kèm: chưa rõ phẩm, lộ ra thì Danh -${VL.outDanh}`:"chưa có ma ma, thái giám hay cung nữ tin cẩn để sai",go:()=>{if(!ag||!can(1))return;pushDil(mkP("vlout"),"Mua lén ngoài cung")}}));
 for(const G of vlGivers(S))O.push(vlOpt({n:`Xin ${G.n} ban mạng`,fx:{},x:`${word(G.o)} · tốn: 1 khắc · thành: ${G.n} ban mạng Tinh phẩm đúng phẩm · hỏng: ${G.n} với ngươi -${VL.askFail}`,go:()=>{if(!can(1))return;const fz=G.o;/* the odds on this card (j9 fzRun) */spend(1);log(fzRun(fz,null,()=>vlAsk(S,G.k)));render()}}));
 O.push({n:"Thôi",fx:{},j67:"tốn: không tốn gì"});
 return{who:pMe(),t:`<p>${sc?`Mặt ngươi bị thương (${sc.name}): Sắc đang mất ${sc.sacLost}. `:""}${S.rash&&typeof rshOf==="function"?`Mặt ngươi nổi mẩn (${rshOf(S).name}): Sắc đang mất ${rshOf(S).lost}. `:""}Mạng che mặt phải tự làm, mua hoặc được ban.</p><p class="past">${vlGivers(S).map(G=>`Xin ${G.n} ban: ${word(G.o)}, hỏng thì ${G.n} quý ngươi -${VL.askFail}.`).join(" ")}${ag?` Mua lén qua ${ag.name}: lộ ra thì Danh -${VL.outDanh}.`:""} Mạng phẩm cao hơn phẩm của ngươi là vượt phẩm (chưa ai biết cho tới khi có người nhận xét).</p>`,o:O}};
PEND.vlcraft=pp=>{const lv=vlLv(S),a=ARTS.find(x=>x.k===vlArt());const O=[0,1,2].map(m=>vlOpt({n:`Kết bằng ${VL_MATN[m]}`,fx:VL.mat[m]?{bac:-VL.mat[m]}:{},x:`tốn: 2 khắc, Sức -${VL.craftSuc} · thành: ${vlGradeOdds(S,m)}`,go:()=>vlCraftRun(m)}));
 O.push({n:"Thôi",fx:{},j67:"tốn: không tốn gì"});
 return{who:pMe(),t:`<p>Tự tay kết mạng che mặt bằng trò thêu. Phẩm của mạng là phần chơi, cộng ${a?a.n:"Thêu thùa"} bậc ${lv}, cộng vật liệu: thường thêm 0, tốt thêm 1, quý thêm 2.</p><p class="past">Dưới ${BAL.cut.veil[0]} ra mạng Thường, từ ${BAL.cut.veil[0]} Tinh phẩm, từ ${BAL.cut.veil[1]} Trân phẩm, từ ${BAL.cut.veil[2]} Tuyệt phẩm. Vật liệu quý ra kiểu mạng phẩm cao. Chơi được 5 phần: vải sa ra ${WD_GRADE[vlG({k:vlCraftOut(S,0,5)})]}, dây bạc ra ${WD_GRADE[vlG({k:vlCraftOut(S,1,5)})]}, kim tuyến ra ${WD_GRADE[vlG({k:vlCraftOut(S,2,5)})]}.</p>`,o:O}};
function vlCraftRun(m){if(!can(2)||S.suc<VL.craftSuc){if(VL.mat[m])apply({bac:VL.mat[m]});return}
 /* KIT §13.9: 2 khắc + Sức are taken on «Sẵn sàng» / «Kết nhanh» (kgDefer); the ✕ before it = free back (the material comes back with jaudit's pending cost) */
 const pay={khac:2,suc:-VL.craftSuc},canDefer=typeof kgDefer==="function"&&typeof playArt==="function";if(!canDefer){spend(2);apply({suc:-VL.craftSuc})}
 const fin=(raw,sk)=>{if(sk&&!window.__bot){/* mg-skip-all: a quick craft makes no work (the works rule, BAL.skip); the paid material comes back */if(VL.mat[m])S.bac+=VL.mat[m];log("Kết nhanh: không ra mạng, vật liệu trả lại.");try{render()}catch(x){}return}raw=cl(Math.round(raw||0),0,10);if(VL.mat[m])S.bac+=VL.mat[m];/* chooseM already paid; vlCraft pays it once */const k=vlCraft(S,m,raw);const it=itm(k);
  const g=vlG({k});log(`<span class="g">Ngươi tự tay kết ${it.n} (${WD_GRADE[g]})</span>: phần chơi ${raw}${sk?" (để trời định)":""} + bậc ${vlLv(S)}${m?` + vật liệu +${m}`:""}. Cất vào rương.`);
  Q.push({t:"Tự tay kết mạng",who:pMe(),h:`<p style="text-align:center">${typeof kitItem==="function"?kitItem({src:vlSrc(k),name:it.n,grade:g,size:"lg"}):""}</p><p>Ngươi kết xong <b>${it.n}</b> · ${WD_GRADE[g]}.</p><p class="past">Phẩm của mạng: chưa rõ. ${S.scar?"Vào mục Tư trang để đeo.":"Cất vào rương."}</p>`,btn:"Đã hiểu"});try{showModal();render()}catch(x){}};
 if(typeof playArt==="function"){try{const go=()=>playArt({art:vlArt(),title:"Kết mạng che mặt",quick:{n:"Kết nhanh",sure:1,win:"không ra mạng, vật liệu trả lại"},onDone:(raw,o)=>fin(raw,o&&o.skipped)});if(canDefer)kgDefer(pay,go);else go();return}catch(x){console.error(x)}}if(canDefer)kgPayNow(pay);fin(5,true)}
PEND.vlnvp=pp=>{const L=vlNvpList(S);const O=L.map(k=>vlOpt({n:`${itm(k).n} · ${WD_GRADE[vlG({k})]}`,fx:{bac:-itm(k).pr},x:`tốn: 1 khắc · thành: đồ phẩm ${wdPName(+k[2])}, ${VL_COVER[vlG({k})]}`,go:()=>{spend(1);S.bac+=itm(k).pr;log(vlBuyNvp(S,k))}}));
 O.push({n:"Thôi",fx:{},j67:"tốn: không tốn gì"});return{who:pEunCourt("ped"),t:"<p>Thái giám Nội vụ phủ dâng sổ mẫu: “Mạng che theo phẩm của "+kSay({srv:"m"},S,"{goi}")+", xin người chọn.”</p>",o:O}};
PEND.vlout=pp=>{const ag=vlAgent(S);if(!ag)return null;const L=vlOutList(S);const lk=vlLeak(S,ag);
 const O=L.map(k=>vlOpt({n:`${itm(k).n} · ${WD_GRADE[vlG({k})]}`,fx:{bac:-vlOutPrice(k)},x:`${word(100-lk)} · tốn: 1 khắc · thành: ${VL_COVER[vlG({k})]} · kèm: chưa rõ phẩm; lộ ra thì Danh -${VL.outDanh}`,go:()=>{spend(1);S.bac+=vlOutPrice(k);log(vlBuyOut(S,k))}}));
 O.push({n:"Thôi",fx:{},j67:"tốn: không tốn gì"});return{who:pMe(),t:`<p>${ag.name} thưa: “Chợ ngoài cửa Thần Vũ có đủ kiểu mạng, rẻ hơn Nội vụ phủ, chỉ là không biết đồ phẩm nào.”</p>`,o:O}};
function vlWearUI(ix){const n=vlWear(S,ix);if(!n)return;window.__vlPick=null;log(`Ngươi đeo ${n}.`);render()}
function vlOffUI(){const n=vlOff(S);if(n)log(`Ngươi tháo ${n}, cất vào rương.`);render()}
function vlGetUI(){if(!S||S.dead||Q.length)return;pushDil(mkP("vlget"),"Mạng che mặt");render()}
if(typeof wrapR==="function"){wrapR("vlWearUI",()=>"Đeo mạng che mặt")}
/* the weekly scar card (j70): the free "Che mạng" toggle becomes wear / take off / find one */
(function(){const p0=PEND.j70scar;if(!p0)return;PEND.j70scar=function(pp){const d=p0.apply(this,arguments);try{if(!d||!d.o||!S.scar)return d;vlMig(S);const s=S.scar;
  const i=d.o.findIndex(o=>/mạng che mặt|Che mạng/.test(o.n));if(i<0)return d;const L=vlChest(S);let o;
  if(S.vl)o=ch70(`Tháo ${itm(S.vl.k).n}`,{wt:[G70("không còn vướng víu")],k:[R70(`Sắc mất trở lại ${s.d}`)],ok:()=>{vlOff(S);return "Ngươi tháo mạng che mặt, cất vào rương."}});
  else if(L.length){const b=L.slice().sort((x,y)=>vlG(y.e)-vlG(x.e))[0];const it=itm(b.e.k);o=ch70(`Đeo ${it.n}`,{wt:[G70(`phần Sắc mất còn ${Math.round(s.d*VL.cover[vlG(b.e)])}`)],k:vlKnows(S,b.e)?[]:[R70("chưa rõ phẩm của mạng")],ok:()=>{const j=S.inv.indexOf(b.e);return j>=0&&vlWear(S,j)?`Ngươi đeo ${it.n}.`:""}})}
  else o={n:"Tìm mạng che mặt",fx:{},x:"chưa có mạng: tự tay kết, đặt mua hay xin ban",j67:"tốn: không tốn gì · thành: tự tay kết, đặt mua hay xin ban",go:()=>pushDil(mkP("vlget"),"Mạng che mặt")};
  d.o[i]=o}catch(e){console.error(e)}return d}})();

/* ---------- Tư trang: the veil block (kit parts: kpsec, kitItem, kitFacts, act cards) ---------- */
function vlInvHTML(){if(!S||S.dead)return"";const L=vlChest(S);if(!vlNeed(S)&&!L.length&&!S.vl)return"";const sc=S.scar?scarOf(S):null;const pick=window.__vlPick;
 let h=`<div class="kwd"><div class="kpsec"><h4 class="kpst">Mạng che mặt</h4>`;
 const note=sc?(S.vl?[`Mặt bị thương (${sc.name}) · đang che, Sắc mất ${sc.sacLost}`,"n"]:[`Mặt bị thương (${sc.name}) · chưa che, Sắc mất ${sc.sacLost}`,"no"]):(S.rash&&typeof rashNote==="function"?rashNote(S):["Mặt lành, chưa cần đeo","ok"]);
 const wornT=S.vl?kitItem({src:vlSrc(S.vl.k),name:itm(S.vl.k).n,grade:vlG(S.vl),size:"md",on:true,tip:itm(S.vl.k).d}):kitItem({empty:true,name:"Chưa đeo mạng",size:"md"});
 h+=`<div class="kwdnow"><div class="kwear kwbig">${wornT}</div><div class="kwdnote">${kitChip(note[0],note[1])}${sc?`<span class="past">Còn ${sc.weeksLeft} tuần nữa mới lành.${S.vl?` ${vlKnows(S,S.vl)?"Đồ phẩm "+wdPName(vlP(S.vl,S)):"Chưa rõ phẩm của mạng."}`:""}</span>`:""}</div></div>`;
 const B0=[];if(S.vl)B0.push(pbtn(`data-vl="off"`,"Tháo mạng",`tốn: không tốn gì · thành: cất vào rương · kèm: Sắc mất trở lại ${S.scar?S.scar.d:0}`,""));
 B0.push(pbtn(`data-vl="get"`,"Tìm mạng che mặt",`thành: tự tay kết, đặt ở Nội vụ phủ, mua lén ngoài cung hay xin ban`,Q.length?"đang có việc chờ":""));
 h+=`<div class="rbtn">${B0.join("")}</div>`;
 if(L.length){h+=`<div class="kwdgrid">`+L.map(x=>kitItem({src:vlSrc(x.e.k),name:itm(x.e.k).n,grade:vlG(x.e),size:"lg",sel:x.ix===pick,label:vlKnows(S,x.e)?["đồ phẩm "+wdPName(vlP(x.e,S)),"n"]:null,data:`data-vlpick="${x.ix}" role="button" tabindex="0"`,tip:itm(x.e.k).d})).join("")+`</div>`;
  const x=L.find(y=>y.ix===pick);if(x){const e=x.e,it=itm(e.k),g=vlG(e);const B=[];
   B.push(pbtn(`data-vl="wear" data-ix="${x.ix}"`,"Đeo mạng",`tốn: không tốn gì · thành: ${S.scar?`Sắc mất còn ${Math.round(S.scar.d*VL.cover[g])}`:S.rash?"che chỗ nổi mẩn":"che vết thương"}${vlKnows(S,e)?"":" · kèm: chưa rõ phẩm, có thể vượt phẩm"}`,vlNeed(S)?"":"mặt lành, chưa cần đeo"));
   B.push(pbtn(`data-it="gift" data-ix="${x.ix}"`,"Tặng",`tốn: 2 khắc · thành: chọn người nhận`,e.k==="mcnt"?"đồ ngự tứ: không được đem tặng":whyTime(2)));
   B.push(pbtn(`data-it="sell" data-ix="${x.ix}"`,"Bán",`thành: Bạc +${Math.floor((it.pr||0)/2)}`,e.k==="mcnt"?"đồ ngự tứ: bán là bất kính":""));
   /* KIT §70: the picked veil = the shared item detail (picture, name, grade, Được, Lai lịch, Ghi chú) with its acts */
   h+=typeof kinlDetail==="function"?kinlDetail({e},{key:"veil",acts:B}):`<div class="kwdsel">${kitItem({src:vlSrc(e.k),name:it.n,grade:g,size:"md"})}<div>${kitFacts([`Mạng che mặt · ${WD_GRADE[g]} · ${VL_COVER[g]}`,typeof wdSrcTxt==="function"?vlSrcTxt(e):"",vlKnows(S,e)?`Đồ phẩm ${wdPName(vlP(e,S))}`:"Chưa rõ phẩm"].filter(Boolean))}</div></div><div class="rbtn">${B.join("")}</div>`}
  else h+=typeof kinlDetail==="function"?kinlDetail(null,{key:"veil"}):""}
 return h+`</div></div>`}
function vlSrcTxt(e0){if(!e0)return"";const e=Object.assign({},e0,{from:e0.src||e0.from});if(e.from&&!VL_OWN[e.from]&&!e.giver&&e.from!=="emp"&&e.from!=="hh"&&e.from!=="th"){const v=typeof byKey==="function"?byKey(e.from):null;if(v&&v.name)return `${v.name} tặng`}if(e.from==="tay")return`tự tay kết${e.d?", "+e.d:""}`;if(e.from==="nvp")return`đặt ở Nội vụ phủ${e.d?", "+e.d:""}`;if(e.from==="ngoai")return`mua lén ngoài cung${e.d?", "+e.d:""}`;if(e.from==="cu")return"mạng đang đeo từ trước";if(e.giver)return`${e.giver} ban${e.d?", "+e.d:""}`;
 const v=typeof byKey==="function"&&e.from?byKey(e.from):null;return v&&v.name?`${v.name} tặng`:"đồ trong rương"}
(function(){if(typeof invHTML!=="function")return;const i0=invHTML;invHTML=function(){const W=(S.inv||[]).filter(e=>vlIs(e)&&!e.h);W.forEach(e=>e.h=1);let h;try{h=i0.apply(this,arguments)}finally{W.forEach(e=>delete e.h)}
 let x="";try{x=vlInvHTML()}catch(e){console.error(e)}if(!x)return h;if(W.length)h=h.replace(/<p class="past">Rương trống\.[^<]*<\/p>/,"");
 if(vlNeed(S))return x+h;const j=h.indexOf('<div class="ph"><span>Đang mặc');return j<0?h+x:h.slice(0,j)+x+h.slice(j)}})();
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-vl],[data-vlpick]");if(!b||b.disabled)return;ev.stopPropagation();
 if(b.dataset.vlpick!=null){window.__vlPick=+b.dataset.vlpick;try{render()}catch(e){}return}
 const a=b.dataset.vl;if(a==="get")vlGetUI();else if(a==="off")vlOffUI();else if(a==="wear")vlWearUI(+b.dataset.ix)},true);

/* ---------- NPCs: the same ways, by trait and purse (monthly) ---------- */
function vlNpcBestIx(v){const L=vlChest(v);if(!L.length)return -1;const P=Math.min(8,wdPOf(v));const bold=/Kiêu ngạo|Tham vọng/.test((typeof traitsOf==="function"?traitsOf(v):[v.trait]).join(" "));
 const ok=L.filter(x=>wdBelPE(v,x.e,v)<=P+(bold?1:0));const C=(ok.length?ok:L).sort((a,b)=>vlG(b.e)-vlG(a.e));return C[0].ix}
function vlNpcMonth(v){if(!v||v===S||!v.alive||v.out||!vlNeed(v)){if(v&&v!==S)vlSync(v);return}vlMig(v);if(v.vl)return;
 let i=vlNpcBestIx(v);if(i<0){const P=Math.min(8,wdPOf(v));const k0=vlKey(P,0);
  /* npc-purpose G2: she needs one (scar / rash) and takes the way that fits her: buy when she has the bạc, make it when she knows the craft,
     ask the Thái hậu / Hoàng hậu who favours her most; the finer kind only when her purse runs to it */
  const W=BAL.ag.why.vlGet,bac=v.bac||0,G=vlGivers(v),pr0=itm(k0).pr,pr1=itm(vlKey(P,1)).pr;
  const how=npwPick(["buy","craft","ask"],h=>h==="buy"?(bac>=pr0+10?W.buy+(bac-pr0)/W.bacDiv:0):h==="craft"?(vlLv(v)>=1?W.craft+vlLv(v)*W.lv:0):(G.length?W.ask+Math.max(...G.map(g=>g.o))*W.askO:0));
  if(how==="buy"){const k=bac>=pr1+30&&npwPick([1,0],i=>i?(bac-pr1)/W.bacDiv:W.plain)===1?vlKey(P,1):k0;vlBuyNvp(v,k)}
  else if(how==="craft"){const m=bac>=VL.mat[1]+20&&npwPick([1,0],i=>i?(bac-VL.mat[1])/W.bacDiv:W.plain)===1?1:0;vlCraft(v,m,R(11))}
  else if(how==="ask"){const g=npwPick(G,g=>g.o);if(g)vlAsk(v,g.k)}
  i=vlNpcBestIx(v)}
 if(i>=0){vlWear(v,i);try{if(typeof knows!=="function"||knows(v))log(`${rkName(v)} ${v.name} đeo mạng che mặt.`)}catch(e){}}}
/* friends send one to whoever is scarred and unveiled (her too: the gift arrives as the usual gift card) */
function vlFriendGift(t){if(!t||!vlNeed(t)||t.vl||vlChest(t).length)return;const P=Math.min(8,wdPOf(t));const k=vlKey(P,0);
 const F=liveRivals(true).filter(v=>v!==t&&v.alive&&!v.out&&aff(v,t)>=50&&(v.bac||0)>=itm(k).pr+20);if(!F.length)return;
 const o=npcWhy("vlGift",{t,F},()=>roll(VL.giftP));if(!o)return;const v=o.who;/* npc-purpose G2: the friend who cares most sends it (giftP = the success) */
 ap(v,{bac:-itm(k).pr});v.inv=v.inv||[];v.inv.push({k,from:"nvp"});const r=giveTo(v,t,v.inv.length-1);if(r&&t!==S&&(typeof knows!=="function"||knows(t)))try{log(r)}catch(e){}}
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead){vlSync(S);for(const v of rivals)if(v)vlNpcMonth(v);vlFriendGift(S);for(const v of liveRivals(true))vlFriendGift(v)}}catch(e){console.error(e)}return r}})();
/* healed faces put the veil back in the chest (weekly, after j70 heal70) */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead)for(const p of vlPeople())if(p&&p.vl&&!vlNeed(p))vlSync(p)}catch(e){}return r}})();
/* the Emperor's bestowal on a scarred, unveiled consort may add a veil of her phẩm (Trân phẩm) */
(function(){if(typeof bestow!=="function")return;const b0=bestow;bestow=function(p,why){const r=b0.apply(this,arguments);try{if(p&&vlNeed(p)&&!p.vl&&!vlChest(p).length&&empGive(p,VL.empP,"veil")){const k=vlKey(Math.min(8,wdPOf(p)),2);vlGain(p,k,{from:"emp",giver:"Hoàng thượng",known:"Hoàng thượng ban theo phẩm"});
  if(p===S){Q.push({t:"Thánh thượng ban thưởng",who:pEmp(),h:`<p style="text-align:center">${kitItem({src:vlSrc(k),name:itm(k).n,grade:2,size:"lg"})}</p><p>Hoàng thượng thương ngươi bị thương trên mặt, ban thêm <b>${itm(k).n}</b> (Trân phẩm).</p>`,btn:"Tạ ơn"});log(`Được Hoàng thượng ban ${itm(k).n}.`)}}}catch(e){console.error(e)}return r}})();
window.vlWear=vlWear;window.vlOff=vlOff;window.vlFix=vlFix;window.vlCraft=vlCraft;window.vlBuyNvp=vlBuyNvp;window.vlBuyOut=vlBuyOut;window.vlAsk=vlAsk;window.VL=VL;
