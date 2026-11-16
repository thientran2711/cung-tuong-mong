/* ================= jcui: contest UI + real prizes (review/contest-ui, C34; owner 15/11 s8) =================
   1. Picture LEFT / info RIGHT on every game frame (.kgame: contests, exams, works, lessons) incl. the result panel; phones: a short picture band on
      top while reading, hidden while the game runs. The contest intro keeps the PHẦN / HỒI / CÒN counters out until the game runs; the ĐỐI THỦ
      list is its own fixed-height box that scrolls by itself (.kgrv), the buttons stay in view.
   2. Real prizes by place (BAL.cp, bạc-equivalence rule): Nhất = themed item + bạc + chest reveal (kitReward) + contest title in her record
      (S.honors) + the Emperor's own gift when he attends (big festivals, the two feasts); Nhì and Tam = a smaller token item and/or bạc.
      NPC winners are paid the same (their inv / bạc). Pool value per place = months of stipend (BL) at the winner's rank x share.
   3. Everyone who competes with her becomes KNOWN (k61Meet: face + name, "đã gặp").
   API: cuAward(o, ord, place, of, kind) -> {mine, html} (called by j82 finish), cuMeet(list), cuChest(), CU.last = {places:[{prize:[...]}], mine} */
const CU={did:false,last:null};window.CU=CU;
/* BALANCE: the whole prize of a place is worth (stipend of the winner's rank x months) x share, in bạc; the item is part of it at its shop price
   (it, share of the pool as an item), the rest is paid in bạc. A bigger festival (Emperor attends) is worth more months. */
BAL.cp={months:{small:1,big:2},share:[1,.5,.25],item:[.6,.4,.6],minBac:5};
const CU_POOL={dan:["dancoc","tuithom"],hat:["dancoc","vongngoc","tuithom"],co:["nghien","tranhco","demgam"],dauho:["nhansam","yensao","demgam"],ban:["nhansam","yensao","agiao"],
 tho:["nghien","tranhco"],doi:["nghien","tranhco"],doden:["nghien","tuithom","demgam"],ve:["tranhco","nghien"],hoa:["tramngoc","vongngoc","boodieu","tuithom"],
 theu:["luahang","gamto","demgam","tuithom"],kim:["luahang","gamto","tuithom","vongngoc"],mua:["tramngoc","vongngoc","vongvang","boodieu"],banh:["yensao","nhansam","agiao"],huong:["huongtram","tuithom","sonphan"]};
const CU_KHOI={dan:"Cầm khôi",hat:"Ca khôi",co:"Kỳ khôi",dauho:"Đầu hồ khôi",ban:"Xạ khôi",tho:"Thi khôi",doi:"Đối khôi",doden:"Đăng khôi",ve:"Họa khôi",hoa:"Hoa khôi",theu:"Thêu khôi",kim:"Xảo khôi",mua:"Vũ khôi",banh:"Bếp khôi",huong:"Hương khôi"};
const CU_PLACE=["Quán quân","Á quân","Giải ba"];
/* one prize table per contest: the pool follows HER rank (what bạc is worth to her), so Nhất > Nhì > Tam whoever stands where */
function cuBudget(p,i,big){const r=Math.max(0,Math.min(7,rkOf(S)|0));return Math.round((BL[r]||30)*(big?BAL.cp.months.big:BAL.cp.months.small)*BAL.cp.share[i])}
function cuItem(kind,p,i,P){const pool=(CU_POOL[kind]||["tuithom"]).filter(k=>IT[k]&&(!IT[k].rk||IT[k].rk<=rkOf(p)));if(!pool.length)return null;const cap=P*BAL.cp.item[i];
 const fit=pool.filter(k=>IT[k].pr<=cap).sort((a,b)=>IT[b].pr-IT[a].pr);if(fit.length)return fit[0];
 const cheap=pool.slice().sort((a,b)=>IT[a].pr-IT[b].pr)[0];return IT[cheap].pr<=cap*1.35?cheap:null}
function cuPrize(kind,i,p,big){const P=cuBudget(p,i,big);const k=cuItem(kind,p,i,P);const ip=k?IT[k].pr:0;const bac=Math.max(BAL.cp.minBac,Math.round((P-ip)/5)*5);return{k,bac,pool:P}}
function cuMeet(list){try{if(typeof k61Meet!=="function")return;(list||[]).forEach(p=>{if(p&&p!==S&&typeof p==="object"&&(rivals||[]).includes(p)&&!p.out)k61Meet(p,"Cùng dự hội thi",2)})}catch(e){console.error(e)}}
function cuItemChip(k){return kitChip(IT[k].n,"g")}
function cuAward(o,ord,place,of,kind){o=o||{};const big=!!o.big,res={mine:null,html:"",places:[]};CU.did=true;CU.last=res;
 const title=o.title||"Hội thi";
 ord.slice(0,3).forEach((x,i)=>{const p=x.p||null;if(!p||typeof p!=="object"){res.places.push({prize:[]});return}
  const z=cuPrize(kind,i,p,big);const chips=[];
  if(z.k){p.inv=p.inv||[];p.inv.push({k:z.k,from:"thi"});chips.push(cuItemChip(z.k))}
  if(z.bac){if(p===S)apply({bac:z.bac});else ap(p,{bac:z.bac});chips.push(["Bạc",z.bac])}
  const ent={prize:chips,k:z.k,bac:z.bac,place:i+1};
  if(i===0){/* the Emperor's own gift: guaranteed at the big festivals and the feasts he attends */
   if(big&&typeof bestow==="function"){ent.emp=true;try{bestow(p,"contest")}catch(e){console.error(e)}}else if(p!==S&&roll(30))try{bestow(p,"contest")}catch(e){}else if(p===S&&roll(30)){ent.emp=true;try{bestow(S,"contest")}catch(e){}}}
  if(p===S){S.honors=S.honors||[];const hn=(i===0&&CU_KHOI[kind]?CU_KHOI[kind]+" · ":CU_PLACE[i]+" · ")+title;S.honors.unshift({d:`T${S.month}/${S.year}`,t:hn,p:i+1});if(S.honors.length>40)S.honors.length=40;ent.title=hn;res.mine=ent}
  res.places.push(ent)});
 const m=res.mine;if(m){const rows=[];const ch=[];if(m.k)ch.push(cuItemChip(m.k));if(m.bac)ch.push(kitChip("Bạc",m.bac,"g"));rows.push(["Phần thưởng",ch,"t"]);
  rows.push(["Danh hiệu",`<span class="ef t">${m.title}</span>`,"t"]);if(m.emp)rows.push(["Ngự tứ",`<span class="ef g">Hoàng thượng ban riêng một món</span>`,"t"]);
  res.html=`<h4 class="kpst">Ban thưởng hội thi</h4>`+kitRows(rows)}
 return res}
/* CU.did ("this contest was already paid by cuAward") must not outlive its contest: a new contest starts clean, and it is cleared right after the
   contest's own onDone (cFin7/fxFin7 read it inside onDone); otherwise a contest that ends with no cFin7/fxFin7 leaves it set and the next contest she skips loses its Emperor roll */
(function(){if(typeof startContest!=="function")return;const s0=startContest;startContest=function(o){CU.did=false;if(o&&typeof o.onDone==="function"){const d0=o.onDone;o=Object.assign({},o,{onDone:function(){try{return d0.apply(this,arguments)}finally{CU.did=false}}})}
 const r=s0.call(this,o);return r};window.startContest=startContest})();
/* the chest reveal for HER prize (kit §65 kitReward), after the podium */
function cuChest(){try{const c=CU.last;if(!c||!c.mine||c.chest)return;c.chest=1;const m=c.mine;const it=[];
  if(m.k){const I=typeof kitItemInfo==="function"?kitItemInfo(m.k):{};it.push({n:IT[m.k].n,d:IT[m.k].d,img:kmItemImg(m.k),tier:kmTierOf(m.k),gn:I.gname||"",k:m.k})}
  if(typeof kitReward==="function")kitReward({kind:m.place===1?"chest":"tray",title:"Ban thưởng hội thi",from:m.title,items:it,bac:m.bac})}catch(e){console.error(e)}}
/* origin line of a prize item in the bag */
(function(){if(typeof kinvFrom!=="function")return;const f0=kinvFrom;kinvFrom=function(f){return f==="thi"?"Thưởng hội thi":f0.apply(this,arguments)}})();
/* owner 16/11 (Q15): her contest titles show as ONE kit row list in three places: Sổ ân thưởng (all 40), her profile card (selfCardHTML, newest 5) and the Mệnh truyện tab (panel67, newest 5). Rows = [date, title, tone] */
window.kcuHonorRows=function(n){const H=(typeof S!=="undefined"&&S&&S.honors)||[];return(n?H.slice(0,n):H).map(x=>[x.d,x.t,"t"])};
(function(){if(typeof panel67!=="function")return;const p0=panel67;panel67=function(){let h=p0.apply(this,arguments);try{if(kcuHonorRows(1).length)h+=`<h3>Danh hiệu thi tài</h3>`+rows67(kcuHonorRows(5))}catch(e){}return h}})();
/* her contest titles live in the Sổ ân thưởng page */
(function(){if(typeof awCard!=="function")return;const a0=awCard;awCard=function(){let h=a0.apply(this,arguments);try{const H=(S&&S.honors)||[];
  h+=`<h3>Danh hiệu thi tài</h3>${H.length?kitRows(H.map(x=>[x.d,[`<span class="ef t">${x.t}</span>`],"t"])):`<p class="past">Chưa đoạt danh hiệu nào.</p>`}`}catch(e){}return h}})();
/* ---------- layout: picture LEFT, info RIGHT (kit game frame) ---------- */
(function(){const st=document.createElement("style");st.id="kcu-css";st.textContent=`
#ov .mg.kg82{max-width:min(940px,100%);display:flex;flex-direction:column;max-height:calc(100dvh - 16px);overflow:hidden}
.kgame .kgbody{display:block;min-height:0;flex:1 1 auto}
.kgame .kgbody.kgpic-on{display:grid;grid-template-columns:minmax(150px,36%) minmax(0,1fr);grid-template-rows:minmax(0,1fr);gap:0;overflow:hidden}
.kgpic{position:relative;margin:10px 0 10px 14px;border:1px solid var(--line);border-radius:var(--k-rad);overflow:hidden;background:#f1e6d2;min-height:220px;box-shadow:0 0 0 2px #fffaf0 inset}
.kgpic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block}
.kginfo{min-width:0;min-height:0;display:flex;flex-direction:column;overflow-y:auto;overscroll-behavior:contain;max-height:calc(100dvh - 128px)}
.kginfo .kgbox{flex:0 1 auto}
.kg82.kg-idle .kghud{display:none}
.kgrv{max-height:clamp(120px,30dvh,260px);overflow-y:auto;overscroll-behavior:contain;margin:0 0 4px;border:1px solid var(--k-hair);border-radius:var(--k-rad);background:#fffdf8;padding:0 6px}
.kgrv .kfacts{margin:0}
.kg82 .kg82act{position:sticky;bottom:0;background:linear-gradient(#fffaf000,var(--k-card) 22%);padding-top:10px;margin-bottom:0;z-index:2}
/* kv3:.kv1 */:where(.kv1) .kgame .kgbody.kgpic-on{display:block;overflow:visible}:where(.kv1) .kgpic{margin:8px 10px 0;min-height:0;height:104px}:where(.kv1) .kgpic img{object-position:50% 55%}
 :where(.kv1) .kg82:not(.kg-idle) .kgpic{display:none}:where(.kv1) .kginfo{max-height:none;overflow:visible}:where(.kv1) #ov .mg.kg82{overflow-y:auto}:where(.kv1) .kgrv{max-height:clamp(110px,26dvh,220px)}

/* podium in short landscape (844x390): compact header + plaque so figures keep their scale and nothing runs under the header */

`;document.head.appendChild(st)})();
