/* ================= jhaohuu: «Hảo hữu» — THE partner sheet in co-op
   Owner 21/11 ~06:05Z (mark #2): "Làm khung Hảo hữu đi ..." + CANON OVERWRITE ~06:30Z (OD verbatim): the entry is NOT on the room stage — it is
   the «Hảo hữu» ICON in the fixed TOP BAR (= the friend chip, KIT §69.2 kitCoopFriend in jcooptimer: grey offline, full colour online, ✓ / «…»
   badge), and "khi mà cần thông tin của người đó thì mình bấm vô người đó thì nó ra thông tin": tapping it opens THIS sheet. Co-op only, both
   seats (each seat runs it on its own screen); solo: no icon, no sheet.
   PANEL = the kit info panel (kitPanel, §8): her FULL-BODY figure (kit stage), sections of kitRows + kitPersonStats (§49 knowledge: unknown
   stats read «chưa rõ») only. It also carries what the old status-only chip panel had (her status, «Ngươi», the «Tạm dừng» option): ONE panel.
   DATA (law 6b real data, law 4 numbers from game state): her entry in the shared world (COOPW.friend(): rivals, or a consort's staff on the
   servant road), her place (S.where, the same source as the stage), the live status of the chip (COOPW.frInfo, jcooptimer — ONE source).
   STRANGER RULE (OD:L165 / OD:L1061): unmet = «Hảo hữu của ta», the kit stranger figure, rank / name / stats / health / household / place «chưa rõ»;
   only what anyone sees (her status in this buổi) shows. Reborn friend = unknown again (jcoopworld forgetFriend). ================= */
(function(){try{
const CW=window.COOPW||{};
const UNK="chưa rõ";
const on=()=>!!CW.on&&typeof S!=="undefined"&&!!S&&!S.dead;
const es=t=>typeof esc==="function"?esc(String(t==null?"":t)):String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* her entry: rivals (consort roads) or a consort's staff (servant road) */
function ent(){try{const f=typeof CW.friend==="function"?CW.friend():null;if(f)return f;return typeof k61CoopEnt==="function"?k61CoopEnt():null}catch(e){return null}}
/* her raw seat blob (only to tell the home road / death apart when she has no entry) */
function blob(){try{const P=CW.base&&CW.base.P;if(!P)return null;const k=Object.keys(P).find(x=>x!==CW.seat);return k?P[k]:null}catch(e){return null}}
const met=e=>{try{return typeof isKnown61==="function"?isKnown61(e):true}catch(x){return true}};
const named=e=>{try{return typeof k61Named==="function"?k61Named(e):true}catch(x){return true}};
const isRival=e=>typeof rivals!=="undefined"&&rivals.includes(e);
const mistress=e=>{try{return (rivals||[]).find(v=>(v.staff||[]).includes(e))||null}catch(x){return null}};
function rankWord(e){try{if(e.out)return"Phế phi";if(e.queen)return RANKS[7].n;return RANKS[Math.max(0,Math.min(7,e.rank||0))].n}catch(x){return""}}
function palWord(e){try{if(e.out)return"Lãnh cung";const k=typeof palaceOf==="function"?palaceOf(e):null;return k&&typeof palName==="function"?palName(k):""}catch(x){return""}}
function placeWord(e){try{const k=(S.where||{})[e.id];if(!k)return"";if(typeof palaceOf==="function"&&k===palaceOf(e))return"ở cung của nàng";if(k==="home")return"ở cung của ngươi";return typeof placeName==="function"?placeName(k):""}catch(x){return""}}
function kidsWord(e){const L=(e.kids||[]).filter(k=>k&&k.alive!==false);if(!L.length)return"chưa có";const m=L.filter(k=>k.sex==="m").length,f=L.length-m;
 return [m?`${m} hoàng tử`:"",f?`${f} công chúa`:""].filter(Boolean).join(" · ")}
function healthRows(e){const R=[];let known=true;try{known=typeof kitStatKnown0==="function"?kitStatKnown0(e,"suc"):true}catch(x){}
 R.push(["Sức khỏe",known&&e.suc!=null?String(Math.round(e.suc)):UNK,known?"":"t"]);
 if(known){let il="";try{il=typeof illName==="function"?illName(e):""}catch(x){}R.push(["Bệnh",il||"không",il?"r":"g"])}
 if(known&&e.preg&&!e.fake)R.push(["Thai","đang mang thai","g"]);return R}
/* the live status of this buổi = the header chip's own data (anyone sees it: the chip shows it to strangers too) */
function nowRows(e){const R=[];let o=null;try{o=typeof CW.frInfo==="function"?CW.frInfo():null}catch(x){}
 if(o){R.push(["Hảo hữu",`${o.glyph} ${es(o.word)}`,o.tone]);R.push(["Ngươi",o.meRd?"đã sẵn sàng":`còn ${o.myKh||0} khắc`,o.meRd?"g":"n"])}
 if(e&&met(e)){const w=placeWord(e);if(w)R.push(["Đang ở",es(w),"n"])}else if(e)R.push(["Đang ở",UNK,"t"]);return R}
/* the one line of what to do meanwhile (the old chip panel's note, same words) */
function nowNote(){let o=null;try{o=typeof CW.frInfo==="function"?CW.frInfo():null}catch(x){}if(!o)return"";
 return o.meRd&&o.st!=="ready"?"Trong lúc đợi: xem các tab, Tư trang, Sổ ghi. Hảo hữu xong là sang buổi ngay.":
  o.st==="ready"?"Hảo hữu chờ ngươi. Xong việc thì bấm Sẵn sàng (hay hết khắc) là sang buổi cho cả hai.":
  "Cứ làm việc của ngươi. Hết khắc hay bấm Sẵn sàng là xong buổi; cả hai xong thì sang buổi ngay, hết giờ thì tự sang."}
function nowSec(e){const n=nowNote();return {h:"Lúc này",rows:nowRows(e),html:n?`<p class="kpnote">${n}</p>`:""}}
/* the figure on the panel: met = her own entry (full body, kit stage); unmet = the kit stranger figure as a stage pseudo person ({__fig,__cap}, the kitShop seller form, jinv),
   never her entry: the stage would resolve her real art and name from it */
function who(e,known,title){return known?{subject:e}:{stage:[{__fig:"img/kit/unknown-fig-f.webp",__cap:title,__role:"",age:e&&e.age||18}]}}
function spec(){const e=ent(),P=blob();const rows=typeof kitRows==="function"?kitRows:(()=>"");const sec=[];
 const known=!!e&&met(e),nm=!!e&&named(e);
 /* rv r2 A: her name comes from HER entity through the kit name path (kitName = rank + name in the rank colours, owner 15/11 "phẩm và tên
    người lúc nào cũng phải đi chung"; the same on both seats), never as a bare string the j61 DOM name mask re-reads (on a guest the same
    words could map to another, unmet record → «Hàn lâm học sĩ ???»): wrapped in data-k61skip. Unmet = «Hảo hữu của ta» (already the mask). */
 const nmK=x=>`<span data-k61skip="1">${typeof kitName==="function"?kitName(x,{cap:true}):`${es(rankWord(x))} ${es(x.name)}`}</span>`;
 const title=nm&&e.name?nmK(e):(typeof K61FR==="string"?K61FR:"Hảo hữu của ta");
 if(!e){/* no entry: she lives at her father's house (tiểu thư road, before the tuyển tú) or her life has ended */
  const home=!!(P&&P.S&&P.S.kc&&!P.S.kc.inPal&&!P.dead),dead=!!(P&&(P.dead||(P.S&&P.S.dead)));
  sec.push({h:"Thân phận",rows:[["Nơi ở",home?"ở phủ nhà, chờ kỳ tuyển tú":dead?"đã khuất":UNK,dead?"r":"n"]]});
  sec.push(nowSec(null));
  return {kind:"info",title,sub:"Hảo hữu cùng chơi",sections:sec}}
 if(!isRival(e)){/* servant road: a cung nữ in a consort's palace */
  const m=mistress(e);
  sec.push({h:"Thân phận",rows:[["Danh vị",known?"Cung nữ":UNK,known?"n":"t"],["Hầu hạ",known&&m?(typeof kitName==="function"?kitName(m,{cap:true}):es(m.name)):UNK,known?"n":"t"],["Cung",known&&m?es(palWord(m)):UNK,known?"n":"t"]]});
  sec.push(nowSec(e));
  if(!known)sec.push({h:"Chưa quen biết",html:`<p class="kpnote">Ngươi chưa gặp nàng. Gặp mặt rồi mới biết thêm về nàng.</p>`});
  return Object.assign({kind:"info",title,sub:"Hảo hữu cùng chơi",sections:sec},who(e,known,title))}
 /* consort road: rank + name (kit rank unit), her palace, stats, health, household, what she does now */
 sec.push({h:"Thân phận",rows:[["Danh vị",nm?nmK(e):UNK,nm?"n":"t"],["Cung",known?es(palWord(e))||UNK:UNK,known?"n":"t"]]});
 sec.push({h:"Chỉ số",html:typeof kitPersonStats==="function"?kitPersonStats(e):""});
 sec.push({h:"Sức khỏe",rows:healthRows(e)});
 const mai=known&&e.maid&&e.maid.name?`<span data-k61skip="1">${es(e.maid.name)}</span>`/* rv coop-guest-names r1: her maid's copy now holds its own j61 key (g… / h…, one key = one person), unmet on this seat → the DOM mask read «cung nữ ???» over the row the sheet shows once SHE is met (before, the copy shared this seat's own maid key x1 and passed by accident) */:UNK;
 sec.push({h:"Trong cung của nàng",rows:[["Con cái",known?kidsWord(e):UNK,known?"n":"t"],/* OD:L165: unmet = «chưa rõ» (rv hao-huu item 5) */["Cung nữ thân cận",mai,mai===UNK?"t":"n"]]});
 sec.push(nowSec(e));
 if(!known)sec.push({h:"Chưa quen biết",html:`<p class="kpnote">Ngươi chưa gặp nàng. Gặp mặt rồi mới biết thêm về nàng.</p>`});
 return Object.assign({kind:"info",title,sub:"Hảo hữu cùng chơi",sections:sec},who(e,known,title))}
function open(){try{if(!on()||typeof kitPanel!=="function")return;const sp=spec();let o=null;try{o=CW.frInfo()}catch(x){}
 sp.opts=(o&&o.canHold&&typeof CW.frHold==="function"?[{n:"Tạm dừng",x:"Hậu cung dừng lại cho cả hai đến khi ngươi trở lại",fx:{},go:()=>CW.frHold(true)}]:[]).concat([{n:"Đóng",fx:{},go:()=>{}}]);/* "Đóng" = the close option → kit ✕ + tap outside + Esc (32.10) */
 window.__hhOpen=1;kitPanel(sp,true);if(typeof showModal==="function")showModal()}catch(e){console.error("haohuu",e)}}
window.kitHaoHuuOpen=open;window.kitHaoHuuSpec=spec;
}catch(e){console.error(e)}})();
