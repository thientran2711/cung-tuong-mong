/* ================= jrankset: ĐỒ ĐẾN TAY QUA HỘP / RƯƠNG (owner 15/11, review/gift-chest) — reuses j93 kitReward (KIT "CHUYỂN ĐỘNG" #7) =================
   1. Game start: what she brings is GIVEN by someone. Her family's send-off gifts (RS_FAMILY by origin, real items of IT, from:"fam", giver named)
      arrive one brocade box ("gift") per giver after the Luân hồi / identity screen closes: "Mẫu thân tặng", "Phụ thân gửi"…
   2. Entering the palace with a rank, and every PROMOTION: Nội vụ phủ bestows the RANK OUTFIT SET of that rank — y phục + trâm (j92 WD store, the
      rank's phẩm P = rank+1, the trâm in the robe's colour when one exists) + one accessory (IT.sl wrist/waist suited to the rank) — in the
      gold-carved chest ("chest"), queued right after the j93 promotion edict. On entry the set is the starting kit jearn already dresses her in
      (worn) + the accessory. Demotion: nothing (items above her rank stay vượt phẩm by the existing rules).
      The set replaces j92's month-end "Nội vụ phủ đưa y phục theo phẩm mới" (j92 wdMonth reads window.RANKSET).
   3. NPCs: the same set on every promotion, data only (no animation).
   4. Old saves: the rank seen so far is set silently on load (no chest for the past). Servants (cnv start) get the set when risen to a rank. */
window.RANKSET=1;
const RS_FAMILY={tt:[["Mẫu thân tặng",["tramngoc"]],["Phụ thân gửi",["nghien"]]],dtq:[["Mẫu thân tặng",["tuithom"]],["Phụ thân gửi",["vongngoc"]]],
 muoi:[["Mẫu thân tặng",["sonphan","tuithom"]],["Phụ thân gửi",["luahang"]]],cn:[["Ma ma ở Càn Thanh cung tặng",["huongtram"]]],
 nc:[["Mẫu hậu Nam Chiếu tặng",["vongngoc"]],["Sứ đoàn Nam Chiếu gửi",["yensao"]]],td:[["Mẫu thân để lại",["thunha"]]],
 ch:[["Cô mẫu (Thái hậu) tặng",["tramngoc"]]],thd:[["Phụ thân gửi",["thunha","demgam"]]],cnv:[]};
function rsAcc(r){const k=r>=5?"vongvang":"vongngoc";return IT[k]?k:null}
/* the set for rank r (0..7) of person p: [y, trâm, accessory] keys */
function rsSetFor(p,r){const P=Math.min(8,r+1);let y=null,t=null;try{y=wdPickAt(P,"y",1)||wdPickAt(P,"y",0);const col=y&&WD_ITEMS[y]?WD_ITEMS[y].col:null;
  const L=WD_LIST.filter(x=>x[1]==="tram"&&x[3]===P&&x[4]!==4);const m=L.filter(x=>x[5]===col);t=(m.length?pick(m):L.length?pick(L):null);t=t?t[0]:null}catch(e){}
 return{y,t,acc:rsAcc(r)}}
function rsItem(k,royal){const w=typeof WD_ITEMS==="object"&&WD_ITEMS[k];if(w)return{n:w.n,d:IT[k]?IT[k].d:"",img:w.icon,tier:w.g|0};
 return{n:IT[k]?IT[k].n:k,d:IT[k]?IT[k].d:"",img:typeof kmItemImg==="function"?kmItemImg(k):"",tier:typeof kmTierOf==="function"?kmTierOf(k,royal):0}}
/* give the set (data); returns the item list for the chest */
function rsGive(p,r){const s=rsSetFor(p,r),out=[];const nm=typeof wdWhen==="function"?wdWhen():"";
 for(const k of [s.y,s.t])if(k){const g=typeof wdGain==="function"?wdGain(p,k,{from:"nvp",giver:"Nội vụ phủ",nvp:1}):null;if(g){out.push(k);if(p===S&&typeof KMSNAP!=="undefined"&&KMSNAP)KMSNAP.inv.push(g.e)}}
 if(s.acc&&!(p.inv||[]).some(e=>e&&e.k===s.acc)){const e={k:s.acc,from:"nvp",giver:"Nội vụ phủ",d:nm};p.inv=p.inv||[];p.inv.push(e);out.push(s.acc);if(p===S&&typeof KMSNAP!=="undefined"&&KMSNAP)KMSNAP.inv.push(e)}
 return out}
function rsChest(r,keys,entry){if(!keys.length||typeof kitReward!=="function"||!(typeof kmOn==="function"&&kmOn()))return;
 const rn=r>=7?"Hoàng hậu":RANKS[Math.min(7,r)].n;
 kitReward({kind:"chest",title:entry?"Phẩm phục nhập cung":`Phẩm phục ${rn}`,from:`Nội vụ phủ phụng chỉ đưa tới · ${rn}`,items:keys.map(k=>rsItem(k))})}
/* new game: family gifts + the entry set; shown once the Luân hồi / identity screen is gone */
/* reviewer 15/11: the new life is built by nlRun (Luân hồi card, also "Đổi thân phận" and the delayed path while figures load) or by start()
   with window.__nlInner (tests, co-op) — hook both, never the outer start() (it may return before the new S exists). */
function rsNewLife(){try{if(S&&!S.dead){const F=RS_FAMILY[S.origin&&S.origin.k]||[];const boxes=[];
   for(const [who,ks] of F){const got=[];for(const k of ks)if(IT[k]){S.inv.push({k,from:"fam",giver:who.replace(/ (tặng|gửi|để lại)$/,"")});got.push(k)}if(got.length)boxes.push([who,got])}
   try{wdOf(S)}catch(e){}S.__rsBoxes=boxes;S.__rsEntry=!(typeof isSrv==="function"&&isSrv());S.__rkSeen=typeof isSrv==="function"&&isSrv()?-1:S.rank;
   if(typeof kmMark==="function")(S.inv||[]).forEach(kmMark)}}catch(e){console.error("rankset start",e)}}
(function(){const s0=start;start=function(){const inner=!!window.__nlInner;const r=s0.apply(this,arguments);if(inner)rsNewLife();return r}})();
if(typeof nlRun==="function"){const n0=nlRun;nlRun=function(){const r=n0.apply(this,arguments);rsNewLife();return r}}
function rsEntryShow(){if(!S||S.dead||!(S.__rsBoxes||S.__rsEntry))return;if(!(typeof kmOn==="function"&&kmOn()))return;if(document.querySelector('[id^="kroul"],.kroul-ov,.kroul'))return;if(typeof Q!=="undefined"&&Q.some(m=>m&&m.nl))return;
 const B=S.__rsBoxes||[];S.__rsBoxes=null;for(const [who,ks] of B)kitReward({kind:"gift",title:"Hộp gấm",from:who,items:ks.map(k=>rsItem(k))});
 if(S.__rsEntry){S.__rsEntry=null;const keys=[];try{const w=wdOf(S);for(const sl of ["y","tram"])if(w[sl]&&WD_ITEMS[w[sl].k])keys.push(w[sl].k)}catch(e){}
  const acc=rsAcc(S.rank);if(acc&&!(S.inv||[]).some(e=>e&&e.k===acc)){const e={k:acc,from:"nvp",giver:"Nội vụ phủ"};if(typeof kmMark==="function")kmMark(e);S.inv.push(e);if(typeof KMSNAP!=="undefined"&&KMSNAP)KMSNAP.inv.push(e)}if(acc)keys.push(acc);
  rsChest(S.rank,keys,true)}}
/* promotions (any code path): after the edict, the new rank's set; NPCs silently. Old saves: remember the rank, give nothing. */
function rsCheck(){if(!S||S.dead)return;
 if(S.__rkSeen==null)S.__rkSeen=(typeof isSrv==="function"&&isSrv())?-1:S.rank;
 else if(!(typeof isSrv==="function"&&isSrv())&&!S.out){if(S.rank>S.__rkSeen){const keys=[];for(let r=S.__rkSeen+1;r<=S.rank;r++){const k=rsGive(S,r);if(r===S.rank)keys.push(...k)}
   const from=S.__rkSeen;S.__rkSeen=S.rank;if(from>=0)rsChest(S.rank,keys,false);else rsChest(S.rank,keys,true)}else if(S.rank<S.__rkSeen)S.__rkSeen=S.rank}
 for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||v.alive===false||v.out)continue;const r=rkOf(v);if(v.__rkSeen==null){v.__rkSeen=r;continue}if(r>v.__rkSeen){rsGive(v,r);v.__rkSeen=r}else if(r<v.__rkSeen)v.__rkSeen=r}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{rsCheck();rsEntryShow()}catch(e){console.error("rankset",e)}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{rsCheck()}catch(e){}return r}})();
window.rsSetFor=rsSetFor;window.rsGive=rsGive;window.RS_FAMILY=RS_FAMILY;
