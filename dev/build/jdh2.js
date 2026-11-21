/* ================= jdh2: HIỆU BAN + SẮC PHONG + TỊCH THU + SÁM HỐI + THẤT LẠC — TITLE SYSTEM phase 2 (review/title-sys2, Foreman C)
   Owner: OWNER_DECISIONS 16/11 13:00Z (sắc phong book + seal, confiscation, lost/stolen), 13:20Z (2)(4)(5) (hiệu by Sủng/Danh, joins the rank;
   book + seal never sold; stolen → investigation, lost for good → Danh penalty; back only through a dedicated atonement quest with a minimum wait),
   13:30Z (3) ITEM CONSERVATION (an item never vanishes; it is always somewhere and can come back), 13:40Z (one ledger). Plan: dev/PROGRESS_title-sys.md.
   ONE rule for her and every NPC consort; every number in BAL.dh.hieu / .conf / .it (jbal2.js); kit parts only (kitPanel reward / notice,
   kit rows, kitItemTag §64, PEND dialogs with act-card options).
   1. HIỆU: dhHieuOK(p) = the ONE threshold check (rank ≥ minRank, Sủng ≥ the rank's Sủng + sung, Danh ≥ the rank's Danh + danh, gapM months at the
      rank, not in lãnh cung / cấm túc, nothing confiscated, not Hoàng hậu). Monthly: eligible → BAL.dh.hieu.p chance; bestow(son/promo/contest)
      grants at once when eligible (the old 30 % roll is gone). dhHieuGrant(p) = the ONE grant (also used by the full-seat compensation, jexam).
   2. Items: sacphong (Sắc phong) + ngocan (Ngọc ấn), IT keep:1 (not sold, j-econ "kỷ vật: không bán"), nt:1; never given (giveTo / gift bag
      refuse them). Entry fields: {k, from:"emp", own:<key of the person>, hieu, dhid}. Old saves: anyone with a hiệu and no book/seal gets them
      quietly once.
   3. CONFISCATION: every punishment route (punish, fall, demote, cold, deathSentence mercy, any rank drop / lãnh cung / cấm túc) is caught by ONE
      weekly state check per person (p.dhSn = [rank, out, confined]); the reason comes from the wrapped punishers. Odds per kind BAL.dh.conf.p
      [hiệu, worn title]. Hiệu → p.dhConf.hieu (still reserved, so it comes back the same), book + seal → Nội vụ phủ store (S.il.box, the item
      ledger's own record shape: at "nvp", why "conf", rel never — only atonement returns them), worn title → p.dh[key].conf (cannot be worn).
      Danh −conf.danh, Sủng −conf.sung (her: logged, notice panel).
   4. ATONEMENT: after conf.wait months (out of lãnh cung, not under cấm túc) the quest opens: road A "Chép kinh sám hối" = conf.kinh copies of
      Chép kinh made after it opened; road B "Lập công" = Danh ≥ Danh at opening + conf.cong. Done → her: a dialog to offer the penitence;
      NPC: at once. Everything comes back (hiệu, the pieces still in the store, the title).
   5. LOSS / THEFT: monthly BAL.dh.it.lose % per piece held → a jlost case for THAT piece (loLose with the piece forced; cause from loCause:
      a rival only when her motive allows, else a servant / misplaced) → jlost's tra xét acts, hearing, recognition, higher-rank decree (item
      ledger) apply. Her: an investigation dialog at once. Case closed and the piece not back → Danh −it.lostDanh once. The piece stays where
      it is; a piece found nowhere (old jlost expiry) is put in the Nội vụ phủ store by the census below and handed back after it.backW weeks.
      jlost's random loss / "laydo" theft never pick these pieces (loOk), only this rule does.
   6. CENSUS (conservation, weekly): every person with a hiệu (held or confiscated) has exactly one book and one seal somewhere (a chest, the store,
      a case, a dialog); missing → recreated in the store ("Nội vụ phủ tìm thấy"); a duplicate copy → dropped.
   Item ledger (Foreman D, review/item-ledger, not on main yet): when jil.js is present its ilGone / ilTake / ilLog are used (same records);
   without it this file writes the same S.il.box records itself (thin adapter; no other behaviour of jil is needed here).
   Co-op: S.hieu / S.dhConf / her pieces are personal (jcoopworld: everything not world is personal); NPC rules run on the host only (npcOK). */
(function(){try{
const H=()=>BAL.dh.hieu,C=()=>BAL.dh.conf,I=()=>BAL.dh.it;
const DK=["sacphong","ngocan"];
const isDh=e=>!!(e&&typeof e==="object"&&DK.includes(e.k)&&e.dhid);
window.dhIsItem=isDh;
const npcOK=()=>!(window.coopGuest&&coopGuest());
const pk=p=>p===S?"me":String(p&&p.id);
function people(){const L=[S];try{for(const v of rivals||[])if(v&&!v.coop&&L.indexOf(v)<0)L.push(v)}catch(e){}return L}
function alive(p){return !!p&&(p===S?!S.dead:p.alive!==false)}
function byK(k){if(k==="me")return S;try{return (rivals||[]).find(v=>String(v.id)===String(k))||null}catch(e){return null}}
const nmc=p=>p===S?"Ngươi":p.name;
const rkNm=p=>{try{return rkName(p)}catch(e){return ""}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* ---------- the item ledger (jil) or its record shape ---------- */
function box(){if(!S.il||typeof S.il!=="object")S.il={};const L=S.il;L.box=L.box||[];L.log=L.log||[];return L.box}
function lgr(e,f,t,how){try{if(typeof ilLog==="function")return ilLog(e,f,t,how)}catch(x){}try{const L=S.il;L.log.push([wk(),e.dhid||0,e.k,f||"",t||"",how||""]);if(L.log.length>600)L.log.splice(0,L.log.length-600)}catch(x){}}
function toStore(p,e,why,o){o=o||{};const x={e,at:"nvp",why,own:o.own||pk(p),w:wk(),by:"",rel:1e9,dh:1};if(o.back)x.back=o.back;box().push(x);lgr(e,o.from||pk(p),"nvp",why==="conf"?"bị tịch thu":"Nội vụ phủ nhặt được");return x}
function fromStore(x,p,how){const L=box(),i=L.indexOf(x);if(i<0||!p)return false;L.splice(i,1);p.inv=p.inv||[];p.inv.push(x.e);lgr(x.e,"nvp",pk(p),how||"về");return true}
/* ---------- where a piece is ---------- */
function slots(p){const o=[];if(!p)return o;for(const e of p.inv||[])if(e&&typeof e==="object")o.push(e);return o}
function cases(){try{return (S.lost||[]).filter(c=>c&&c.st!=="done"&&c.e)}catch(e){return []}}
function findAll(own,k){const out=[];for(const p of people())for(const e of slots(p))if(isDh(e)&&e.k===k&&e.own===own)out.push({e,p});
 for(const x of box())if(isDh(x.e)&&x.e.k===k&&x.e.own===own)out.push({e:x.e,x});
 for(const c of cases())if(isDh(c.e)&&c.e.k===k&&c.e.own===own&&!out.some(y=>y.e.dhid===c.e.dhid))out.push({e:c.e,c});
 try{for(const m of Q||[]){const e=m&&m.pp&&m.pp.e;if(isDh(e)&&e.k===k&&e.own===own&&!out.some(y=>y.e.dhid===e.dhid))out.push({e,q:1})}}catch(z){}return out}
function mk(p,k,hieu){S.dhSeq=(S.dhSeq||0)+1;return{k,from:"emp",own:pk(p),hieu,dhid:pk(p)+"-"+k+"-"+S.dhSeq}}
/* ---------- 1. HIỆU: the ONE threshold check and the ONE grant ---------- */
function used(){const L=[S.hieu,S.dhConf&&S.dhConf.hieu];try{for(const v of rivals||[])if(v)L.push(v.hieu,v.dhConf&&v.dhConf.hieu)}catch(e){}return L.filter(Boolean)}
function freeHieu(){return (typeof TITLES!=="undefined"?TITLES:[]).filter(x=>!used().includes(x))}
function dhHieuNeed(p){const B=H(),r=Math.min(6,Math.max(0,typeof rkOf==="function"?rkOf(p):p.rank|0));const R0=RANKS[Math.max(B.minRank,r)]||RANKS[B.minRank];
 return{rk:RANKS[B.minRank].n,sung:R0.s+B.sung,danh:R0.d+B.danh,gap:B.gapM}}
function dhHieuOK(p){const B=H(),W=[];if(!p||!alive(p))return{ok:false,why:["không còn"]};const r=typeof rkOf==="function"?rkOf(p):p.rank|0,N=dhHieuNeed(p);
 if(p.hieu)W.push("đã có hiệu");if(p.dhConf&&p.dhConf.hieu)W.push("hiệu đang bị thu");if(r>=7)W.push("Hoàng hậu không mang hiệu");
 if(r<B.minRank)W.push(`từ ${N.rk} trở lên`);if(p.out)W.push("đang ở lãnh cung");if((p.confined||0)>0)W.push("đang bị cấm túc");
 if((p.sung||0)<N.sung)W.push(`Sủng ${p.sung|0}/${N.sung}`);if((p.danh||0)<N.danh)W.push(`Danh ${p.danh|0}/${N.danh}`);
 const lp=p.lastPromo==null?-99:p.lastPromo;if(S.turn-lp<N.gap)W.push(`giữ phẩm đủ ${N.gap} tháng`);if(!freeHieu().length)W.push("hết hiệu để ban");
 return{ok:!W.length,why:W,need:N}}
window.dhHieuOK=dhHieuOK;window.dhHieuNeed=dhHieuNeed;
function giveItems(p,hieu,quiet){p.inv=p.inv||[];const got=[];for(const k of DK){if(findAll(pk(p),k).length)continue;const e=mk(p,k,hieu);p.inv.push(e);lgr(e,"emp",pk(p),quiet?"cấp lại sổ cũ":"ban");got.push(e)}return got}
/* the ONE grant: p gets a free hiệu (or `h`), the book and the seal; Danh +hieu.danhG; returns the hiệu ("" if none left) */
function dhHieuGrant(p,why,o){o=o||{};if(!p||!alive(p)||p.hieu||(p.dhConf&&p.dhConf.hieu))return"";const f=freeHieu();if(!f.length)return"";const h=pick(f);
 p.hieu=h;const it=giveItems(p,h);const d=H().danhG;if(d)ap(p,{danh:d});
 if(o.quiet)return h;/* the caller (bestow, the full seat) reports it in its own notice */
 if(p===S)dhHieuNotice(h,it,why);else{const t=`${p.name} được Hoàng thượng ban hiệu «${h}».`;try{newsAdd(p,"hieu",t)}catch(e){}}return h}
window.dhHieuGrant=dhHieuGrant;
function itTag(e){try{if(typeof kitItemTag==="function"&&typeof kitItemInfo==="function")return kitItemTag(kitItemInfo(e)).replace('class="kiev"','class="kiev kiev-own kiev-txt"')}catch(x){}return""}
const WHYW={son:"mừng hoàng tử ra đời",promo:"nhân dịp tấn phong",contest:"vì tài nghệ hơn người",month:"vì ân sủng, thanh danh đều đủ",seat:"thay cho ghế chưa trống"};
function dhHieuNotice(h,it,why){const d=H().danhG;log(`Hoàng thượng ban hiệu ${h}: từ nay gọi là ${rkNm(S)}. Danh +${d}.`);
 if(typeof kitPanel!=="function")return;kitPanel({kind:"reward",title:"Sắc phong ban hiệu",sub:typeof VP==="object"&&VP.date?VP.date(S.month,S.year):"",subject:typeof pEmp==="function"?pEmp():null,
  sections:[{h:"",html:it.map(itTag).join("")},{h:"",rows:[["Hiệu ban",`«${esc(h)}» · gọi là ${esc(rkNm(S))}`],["Vì sao",esc(WHYW[why]||WHYW.month)],["Được",`Danh +${d} · Sắc phong và Ngọc ấn cất trong rương`],
   ["Giữ gìn","không bán, không tặng; mất là bị trách, có lỗi lớn thì bị thu"]]}],btn:"Tạ ơn"})}
/* ---------- 3. CONFISCATION ---------- */
const KIND={cold:"vào lãnh cung",giang:"bị giáng phẩm",cam:"bị cấm túc"};
function wornK(p){const w=p===S?S.titleWorn:p.titleWorn;return typeof w==="string"&&/^dh-/.test(w)?w.slice(3).split("@")[0]:null}
function dhConfiscate(p,kind,why){if(!p||!alive(p))return null;const P=(C().p||{})[kind];if(!P)return null;const out={hieu:"",title:"",items:[]};
 if(p.hieu&&npcWhy("dhConf",{p,kind,i:0},()=>roll(P[0]))){/* npc-purpose G2: the Emperor takes it back from his own anger vs his favour for her (P = the old odds, now the success) */out.hieu=p.hieu;p.hieu="";for(const k of DK)for(const y of findAll(pk(p),k))if(y.p===p){const i=p.inv.indexOf(y.e);if(i>=0){p.inv.splice(i,1);toStore(p,y.e,"conf");out.items.push(y.e)}}}
 const wk0=wornK(p);if(wk0&&p.dh&&p.dh[wk0]&&npcWhy("dhConf",{p,kind,i:1},()=>roll(P[1]))){p.dh[wk0].conf=1;if(typeof dhWear==="function")dhWear(p,null,true);out.title=wk0}
 if(!out.hieu&&!out.title)return null;
 const c=p.dhConf||(p.dhConf={});if(out.hieu)c.hieu=out.hieu;if(out.title){c.titles=c.titles||[];if(!c.titles.includes(out.title))c.titles.push(out.title)}
 c.at=S.turn;c.kind=kind;c.why=why||KIND[kind];delete c.open;delete c.kn;delete c.d0;delete c.ask;
 const fx={danh:-C().danh,sung:-C().sung};ap(p,fx);
 const tn=out.title&&window.DH_CAT&&DH_CAT[out.title]?DH_CAT[out.title].n:"";
 const what=[out.hieu?`hiệu «${out.hieu}»`:"",out.items.length?out.items.map(e=>itm(e.k).n).join(", "):"",tn?`danh hiệu «${tn}»`:""].filter(Boolean).join(", ");
 if(p===S){log(`<span class="r">Ngươi ${c.why}: bị thu ${what}. Danh -${C().danh}, ${sgStat(-C().sung)}.</span>`);
  if(typeof kitPanel==="function")kitPanel({kind:"notice",title:"Bị thu hiệu ban",subject:typeof pEunCourt==="function"?pEunCourt("ped"):null,
   sections:[{h:"",html:out.items.map(itTag).join("")},{h:"",rows:[["Vì sao",esc(c.why)],["Bị thu",esc(what)],["Mất",`Danh -${C().danh} · ${sgStat(-C().sung)}`],
    ["Lấy lại",`sau ${C().wait} tháng, khi không còn bị phạt: chép kinh sám hối hoặc lập công (Nhiệm vụ › Danh hiệu)`]]}],btn:"Đã hiểu"})}
 else{const t=`${p.name} ${c.why}, bị thu ${what}.`;try{newsAdd(p,"conf",t)}catch(e){}}
 return out}
window.dhConfiscate=dhConfiscate;
/* the reason: the punishers stamp it, the weekly state check reads it (every route caught, even inline rank drops) */
function stamp(p,why){try{if(p&&typeof p==="object")p.dhWhy=String(why||"").replace(/<[^>]+>/g,"").replace(/^(Ngươi|Bị) /,"").slice(0,80)}catch(e){}}
for(const [nm,fn] of [["punish",(p,why)=>{if(typeof p==="string")stamp(S,p);else stamp(p,why)}],["fall",(p,why)=>stamp(p,why)],["demote",(p,why)=>stamp(p,why)],
 ["cold",why=>stamp(S,why)],["deathSentence",(p,why)=>{if(typeof p==="string")stamp(S,p);else stamp(p,why)}]]){const f0=window[nm];if(typeof f0!=="function"||f0.__dh2)continue;
 const g=function(){try{fn.apply(null,arguments)}catch(e){}return f0.apply(this,arguments)};g.__dh2=1;window[nm]=g}
function snap(p){return[typeof rkOf==="function"?rkOf(p):p.rank|0,p.out?1:0,(p.confined||0)>0?1:0]}
function dhCheck(p){if(!p||!alive(p))return;const n=snap(p),o=p.dhSn;p.dhSn=n;if(!Array.isArray(o))return;
 const why=p.dhWhy;delete p.dhWhy;let kind=null;if(n[1]&&!o[1])kind="cold";else if(!n[1]&&!o[1]&&n[0]<o[0])kind="giang";else if(n[2]&&!o[2])kind="cam";
 if(kind)window.dhConfiscate(p,kind,why?`${KIND[kind]} (${why})`:KIND[kind])}
window.dhCheck=dhCheck;
/* ---------- 4. ATONEMENT ---------- */
function kinhN(p){const e=p&&p.dh&&p.dh.m_kinh;return e?(e.n|0):0}
function confOpenOK(p){const c=p&&p.dhConf;return !!c&&(c.hieu||(c.titles||[]).length)&&!p.out&&!((p.confined||0)>0)&&S.turn-(c.at|0)>=C().wait}
function confState(p){const c=p.dhConf;if(!c)return null;const B=C();if(!c.open)return{open:0,left:Math.max(0,B.wait-(S.turn-(c.at|0))),blocked:p.out?"đang ở lãnh cung":(p.confined||0)>0?"đang bị cấm túc":""};
 const kn=kinhN(p)-(c.kn|0),dn=(p.danh|0)-(c.d0|0),dN=congNeed(c.d0);return{open:1,kn:Math.max(0,kn),kNeed:B.kinh,dn:Math.max(0,dn),dNeed:dN,done:kn>=B.kinh||dn>=dN}}
/* road B never asks for more Danh than the ceiling leaves (reviewer r1: Danh at opening ≥ top − cong could never finish) */
function congNeed(d0){const B=C();return Math.max(0,Math.min(B.cong,B.top-(d0|0)))}
window.dhConfState=confState;
function confOpen(p){const c=p.dhConf;c.open=1;c.kn=kinhN(p);c.d0=p.danh|0;
 if(p===S){log(`Thái giám Nội vụ phủ ngầm báo: chép kinh sám hối hoặc lập công thì có thể xin lại hiệu ban.`);
  if(typeof kitPanel==="function")kitPanel({kind:"notice",title:"Đường sám hối",subject:typeof pEunCourt==="function"?pEunCourt("ped"):null,
   sections:[{h:"",rows:[["Chép kinh sám hối",`chép đủ ${C().kinh} quyển kinh từ nay (Tài nghệ › Chép kinh)`],["Hoặc lập công",`Danh thêm ${congNeed(c.d0)} so với hôm nay (đang ${S.danh|0})`],
    ["Xem tiến độ","Nhiệm vụ › Danh hiệu"]]}],btn:"Đã hiểu"})}}
function dhRestore(p,how){const c=p.dhConf;if(!c)return null;const got=[];
 if(c.hieu){if(!p.hieu&&!(rivals||[]).some(v=>v&&v!==p&&v.hieu===c.hieu)&&!(p!==S&&S.hieu===c.hieu))p.hieu=c.hieu;got.push(`hiệu «${c.hieu}»`)
  for(const x of box().slice())if(isDh(x.e)&&x.e.own===pk(p)&&x.why==="conf"){fromStore(x,p,"sám hối xin lại");got.push(itm(x.e.k).n)}
  if(p.hieu)giveItems(p,p.hieu,true)}
 for(const k of c.titles||[])if(p.dh&&p.dh[k]){delete p.dh[k].conf;if(window.DH_CAT&&DH_CAT[k])got.push(`danh hiệu «${DH_CAT[k].n}»`)}
 delete p.dhConf;
 if(p===S)log(`Ngươi ${how||"dâng kinh sám hối"}, Hoàng thượng nguôi giận: được trả lại ${got.join(", ")}.`);else{const t=`${p.name} sám hối, được trả lại ${got.join(", ")}.`;try{newsAdd(p,"conf",t)}catch(e){}}
 if(p!==S&&typeof window.dhAutoWear0==="function")window.dhAutoWear0(p);return got}
window.dhRestore=dhRestore;
PEND.dhatone=pp=>{const st=confState(S);if(!st||!st.open||!st.done)return null;const c=S.dhConf;const road=st.kn>=st.kNeed?"kinh":"cong";
 const what=[c.hieu?`hiệu «${c.hieu}», Sắc phong, Ngọc ấn`:"",(c.titles||[]).map(k=>window.DH_CAT&&DH_CAT[k]?`«${DH_CAT[k].n}»`:"").filter(Boolean).join(", ")].filter(Boolean).join(" · ");
 return{who:typeof pEunCourt==="function"?pEunCourt("ped"):null,t:`<p>${road==="kinh"?`Ngươi đã chép đủ ${st.kNeed} quyển kinh sám hối.`:`Thanh danh của ngươi đã khá lên (Danh thêm ${st.dn}).`} Thái giám Nội vụ phủ khuyên dâng biểu tạ tội, xin lại ${what}.</p>`,o:[
  {n:"Dâng biểu sám hối",fx:{},j67:`thành: ${what} về lại`,go:()=>{window.dhRestore(S,road==="kinh"?"dâng kinh sám hối":"dâng biểu tạ tội nhờ có công")}},
  {n:"Để sau",fx:{},j67:"kèm: còn ở Nội vụ phủ, lần sau lại xin được",go:()=>{c.ask=wk()+3}}]}};
function confTick(p){const c=p.dhConf;if(!c)return;if(!c.open){if(confOpenOK(p))confOpen(p);return}
 if(p.out||(p.confined||0)>0)return;const st=confState(p);if(!st.done)return;
 if(p===S){if((c.ask|0)>wk()||Q.length)return;c.ask=wk()+3;pushDil(mkP("dhatone"),"Dâng biểu sám hối")}else window.dhRestore(p)}
/* ---------- 5. LOSS / THEFT (jlost case for that piece) ---------- */
let FORCE=null;(window.THIN_REG=window.THIN_REG||[]).push(["FORCE",()=>FORCE,v=>{FORCE=v}]);/* per-player state for the co-op host (jcoopthin TH.reg) */
(function(){if(typeof loOk!=="function")return;const o0=loOk;loOk=function(e){if(FORCE)return e===FORCE;if(isDh(e))return false;return o0.apply(this,arguments)}})();
function dhLose(p,e,o){if(typeof loLose!=="function"||!p||!e)return null;let c=null;FORCE=e;const cd=p.loCd;
 const q0=Q.length;try{const w=o||npcWhy("dhTake",{p});/* npc-purpose G2: the taker is a person with a goal (jlost loTake rules); nobody → nothing lost */const z=w&&typeof loCauseOf==="function"?loCauseOf(p,w):null;
  if(z){const cause=Object.assign({},z);if(cause.cause==="riv"&&typeof loKeepPick==="function"&&loKeepPick(loP(cause.by),p)==="keep")cause.keep=1;c=loLose(p,cause)}}finally{FORCE=null}
 if(c){p.loCd=cd;c.dh=1;lgr(e,pk(p),"lo"+c.id,c.cause==="riv"?"bị trộm":"thất lạc");
  if(p===S){if(Q.length>q0&&Q[Q.length-1]&&Q[Q.length-1].t==="Đồ thất lạc")Q.pop();pushDil(mkP("dhlost",{id:c.id}),"Ấn tín thất lạc")}}return c}
window.dhLose=dhLose;
PEND.dhlost=pp=>{const c=typeof loGet==="function"?loGet(pp.id):null;if(!c||c.st==="done"||c.own!=="me")return null;const nm=IT[c.k]?itm(c.k).n:"món đồ";const L=LO.cost;
 const O=[];const add=(kind,n,x)=>{const C0=L[kind]||{};if((C0.k&&typeof can==="function"&&!can(C0.k))||(C0.bac&&S.bac<C0.bac))return;O.push({n,fx:{},p:kind!=="soat"&&typeof loOdds==="function"?loOdds(kind,S):undefined/* law 4: loDo rolls loOdds */,j67:`${typeof loCostTxt==="function"?loCostTxt(kind):""} · ${x}`,
  go:()=>{try{if(typeof spend==="function"&&C0.k)spend(C0.k);const r=loDo(kind,S,c);if(r){log(r);Q.push({t:"Tra xét",who:typeof pMe==="function"?pMe():null,h:`<p>${r}</p>`,btn:"Đã hiểu"})}}catch(e){console.error(e)}}})};
 add("cct","Báo Cung Chính ti tra xét","chứng cứ thật mới thành án; báo lên thì ai cũng biết");add("ask","Lặng lẽ hỏi cung nhân","kín đáo, có khi dò ra dấu vết");
 O.push({n:"Để sau",fx:{},j67:`kèm: tra xét sau ở Tư trang › Việc › Đồ thất lạc; không tìm lại được thì Danh -${I().lostDanh}`,go:()=>{}});
 return{who:typeof pMe==="function"?pMe():null,t:`<p><b>${nm}</b> ngự ban của ngươi không còn trong rương.</p><p>Mất ấn tín Hoàng thượng ban là tội không nhỏ. Tra xét ngay, hay âm thầm tìm?</p>`,o:O}};
function lostTick(){for(const p of people()){if(!alive(p))continue;if(p!==S&&!npcOK())continue;const E=slots(p).filter(e=>isDh(e)&&e.own===pk(p)&&!e.lo);if(!E.length)continue;/* one taker with a reason per owner; each piece is at risk (old: break only on a loss); cd stamped only on a real loss */
  let hit=null;const o=npcWhy("dhTake",{p},()=>{hit=E.find(()=>roll(I().lose))||null;return !!hit});if(o&&hit)window.dhLose(p,hit,o)}}
/* a case closed and the piece not back with its owner → Danh −lostDanh once (the piece still sits somewhere: conservation) */
function lostPenalty(){for(const c of S.lost||[]){if(!c||!c.dh||c.st!=="done"||c.dhPen)continue;const o=byK(c.own);c.dhPen=1;if(!o||!alive(o))continue;
 const back=slots(o).some(e=>isDh(e)&&e.dhid===c.e.dhid);if(back)continue;const d=I().lostDanh;ap(o,{danh:-d});
 if(o===S)log(`<span class="r">${itm(c.k).n} ngự ban thất lạc không tìm lại được: bị trách giữ gìn không cẩn thận. Danh -${d}.</span>`);
 else{const t=`${o.name} làm mất ${itm(c.k).n} ngự ban, bị trách.`;try{newsAdd(o,"lo",t)}catch(e){}}}}
/* ---------- 6. CENSUS: one book + one seal for every hiệu (held or confiscated), never two, never none ---------- */
function census(){/* never two: one piece per owner and kind, wherever they sit (a copied entry, an old duplicate) */
 const seen={};const drop=(q,e)=>{const i=(q.inv||[]).indexOf(e);if(i>=0)q.inv.splice(i,1)};
 for(const q of people())for(const e of slots(q).slice()){if(!isDh(e))continue;const id=e.own+"|"+e.k;if(seen[id])drop(q,e);else seen[id]=1}
 for(const x of box().slice()){if(!isDh(x.e))continue;const id=x.e.own+"|"+x.e.k;if(seen[id]){const b=box();b.splice(b.indexOf(x),1)}else seen[id]=1}
 for(const p of people()){const h=p.hieu||(p.dhConf&&p.dhConf.hieu);if(!h)continue;if(p!==S&&!npcOK())continue;const own=pk(p);
 for(const k of DK){const L=findAll(own,k);if(!L.length){const e=mk(p,k,h);/* a dead owner's piece stays in the store as di vật (never vanishes) */
   toStore(p,e,!alive(p)?"dead":p.dhConf&&p.dhConf.hieu?"conf":"net",{back:!alive(p)||(p.dhConf&&p.dhConf.hieu)?0:wk()+I().backW[0]+R(I().backW[1]-I().backW[0]+1)});continue}
  for(const y of L.slice(1)){if(y.p){const i=y.p.inv.indexOf(y.e);if(i>=0)y.p.inv.splice(i,1)}else if(y.x){const b=box(),i=b.indexOf(y.x);if(i>=0)b.splice(i,1)}}}}
 /* a piece the Nội vụ phủ found goes home after it.backW weeks (owner alive, nothing confiscated) */
 for(const x of box().slice()){if(!isDh(x.e)||x.why!=="net"||!x.back||wk()<x.back)continue;const o=byK(x.e.own);if(!o||!alive(o)||o.dhConf||o.out)continue;
  if(fromStore(x,o,"Nội vụ phủ trả về")&&o===S){Q.push({t:"Ấn tín trở về",who:typeof pEunCourt==="function"?pEunCourt("ped"):null,h:`${itTag(x.e)}<p>Nội vụ phủ tìm thấy <b>${itm(x.e.k).n}</b> của ngươi, sai người đem trả về rương.</p>`,btn:"Đã hiểu"});log(`Nội vụ phủ trả lại ${itm(x.e.k).n}.`)}}}
window.dhCensus=census;
/* ---------- old saves: a hiệu from before phase 2 gets its book + seal once; snapshots start quietly ---------- */
function seed(){for(const p of people()){if(p.hieu&&!p.dhSeed){p.dhSeed=1;giveItems(p,p.hieu,true)}if(!Array.isArray(p.dhSn))p.dhSn=snap(p)}}
/* ---------- the turn: weekly state check + census; monthly grant / atonement / loss ---------- */
function dhMonth(){for(const p of people()){if(!alive(p))continue;if(p!==S&&!npcOK())continue;
 if(dhHieuOK(p).ok&&npcWhy("dhHieu",{p},()=>roll(H().p)))/* npc-purpose G2: the Emperor bestows from his favour */window.dhHieuGrant(p,"month");confTick(p)}lostTick()}
function dhWeek(){seed();for(const p of people()){if(p!==S&&!npcOK())continue;dhCheck(p)}lostPenalty();census()}
window.dhMonth=dhMonth;window.dhWeek=dhWeek;
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const t0=S&&S.turn,w0=S&&wk();const r=e0.apply(this,arguments);
 try{if(S&&!S.dead&&wk()!==w0){const q=Q.length;dhWeek();if(S.turn!==t0)dhMonth();if(Q.length>q&&typeof showModal==="function"){showModal();render()}}}catch(e){console.error("dh2",e)}return r}})();
setTimeout(()=>{try{if(typeof S!=="undefined"&&S&&!S.dead)seed()}catch(e){}},0);
/* ---------- never given away (sale: IT keep → econNo "kỷ vật: không bán"; NPC sellItem refuses too) ---------- */
(function(){if(typeof giveTo==="function"){const g0=giveTo;giveTo=function(a,r,ix){try{if(a&&a.inv&&isDh(a.inv[ix]))return""}catch(e){}return g0.apply(this,arguments)}}
 if(typeof sellItem==="function"){const s0=sellItem;sellItem=function(p,ix){try{const e=p&&p.inv&&p.inv[ix];if(e&&IT[e.k]&&itm(e.k).keep)return""}catch(x){}return s0.apply(this,arguments)}}
 if(typeof giftBagFor==="function"){const b0=giftBagFor;giftBagFor=function(){const L=b0.apply(this,arguments);try{return (L||[]).filter(x=>!isDh(x&&x.e))}catch(e){return L}}}})();
/* ---------- NHIỆM VỤ › Danh hiệu: the hiệu section + the atonement quest (kit rows; jdh calls dh2Secs) ---------- */
window.dh2Secs=function(){if(!S)return[];const out=[],ok=dhHieuOK(S);const rows=[];
 if(S.hieu)rows.push(["Hiệu ban",`«${esc(S.hieu)}» · gọi là ${esc(rkNm(S))}`]);
 else if(!(S.dhConf&&S.dhConf.hieu)){const N=ok.need||dhHieuNeed(S);rows.push(["Hiệu ban","chưa có"],["Cách có",`từ ${N.rk} trở lên, Sủng ${N.sung}, Danh ${N.danh}, giữ phẩm ${N.gap} tháng; Hoàng thượng để ý thì ban`]);
  if(ok.why.length)rows.push(["Còn thiếu",esc(ok.why.join(" · "))])}
 const mine=DK.map(k=>findAll("me",k)[0]).filter(Boolean);
 for(const y of mine){const at=y.p===S?"trong rương":y.x?"Nội vụ phủ giữ":y.c?"thất lạc, đang tra xét":"ở nơi khác";rows.push([itm(y.e.k).n,at])}
 if(rows.length)out.push({h:"Hiệu Hoàng thượng ban",rows});
 const c=S.dhConf;if(c){const st=confState(S);const R2=[["Vì sao",esc(c.why||"")],["Bị thu",esc([c.hieu?`hiệu «${c.hieu}», Sắc phong, Ngọc ấn`:"",(c.titles||[]).map(k=>window.DH_CAT&&DH_CAT[k]?`«${DH_CAT[k].n}»`:"").filter(Boolean).join(", ")].filter(Boolean).join(" · "))]];
  if(!st.open)R2.push(["Chờ",st.blocked?`${st.blocked}: hết phạt mới tính`:st.left?`còn ${st.left} tháng mới được sám hối`:"tháng sau mở đường sám hối"]);
  else{R2.push(["Chép kinh sám hối",`đã ${Math.min(st.kn,st.kNeed)}/${st.kNeed} quyển`],["Hoặc lập công",`Danh thêm ${Math.min(st.dn,st.dNeed)}/${st.dNeed}`]);if(st.done)R2.push(["Đã đủ","chờ dịp dâng biểu sám hối"])}
  out.push({h:"Bị thu · đường sám hối",rows:R2})}
 return out};
/* NPC wear after restore: jdh's own rule (earned + highest tier) */
window.dhAutoWear0=function(p){try{if(typeof dhSync==="function")dhSync(p,true);const L=Object.keys(window.DH_CAT||{}).filter(k=>p.dh&&p.dh[k]&&p.dh[k].i>=0&&!p.dh[k].conf);if(!wornK(p)&&L.length&&typeof dhObj==="function"){const o=L.map(k=>dhObj(p,k)).filter(Boolean).sort((a,b)=>b.tier-a.tier)[0];if(o)dhWear(p,o.key,true)}}catch(e){}};
/* §64: the dialogs show the piece in the kit item frame */
setTimeout(()=>{try{if(typeof IEV_PID==="object"){IEV_PID.dhlost=pp=>{const c=typeof loGet==="function"?loGet(pp&&pp.id):null;return c&&c.e?{e:c.e,acts:[null,null,null]}:false};IEV_PID.dhatone=()=>false}}catch(e){}},0);
}catch(e){console.error("jdh2",e)}})();
