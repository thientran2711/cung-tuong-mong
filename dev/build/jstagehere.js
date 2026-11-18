/* ================= jstagehere: STAGE = WHERE SHE IS + CLOSING ALERT (owner OD 18/11 ~19:45Z (5), review/stage-here) =================
   (1) The stage on Hành sự and every tab shows S.place (renderStage already paints placeOf(S.place)); the two-page screen no longer swaps
       to the one-page Hành sự cards while away (jk3 k3Full: the full-screen painting is only the place page itself). Her room comes back
       only at a new day (j3 day turn S.place="home") or when she walks home on Dư đồ (goTo("home")).
   (2) CLOSING ALERT: when the place she stands in closes at the NEXT khắc (the last khắc of this buổi and accessOf() says no for the next
       buổi), or it is already closed and she stayed on, the stage rail (KIT §77 kitStageRail) carries ONE alert item: glyph "!" + the rail's
       busy motion (kbusy) + the seal-red dot (kbadge). The first time it appears in a buổi / khắc the place-entry chip (KIT §87 tin báo toast,
       kitLineToast, the "tai mắt" chip) says it for BAL.entryToastMs; tapping the icon shows the chip again. It stays until she leaves or the
       place opens again. Hours come from the ONE access rule (j41 accessOf + ACC_DAY + B4L) and BAL.time.khac: no number of its own.
       Painted icon: KIT_REQUESTS K-ICO-ALERT (img/kit/ico-alert.webp); until it exists the rail's text glyph is used (§77.1 glyph mode).
   Staying past closing: no new penalty here (the existing j41 stay rule applies). Old saves: S.closeSeen is optional. */
(function(){try{
const nm=k=>{try{return typeof accName==="function"?accName(k):placeOf(k).n}catch(e){return k}};
/* {k, now:bool closed now, next:bool closes at the next khắc, why} or null */
function stClose(){try{if(typeof S==="undefined"||!S||S.dead||S.out)return null;if(typeof isSrv==="function"&&isSrv())return null;
 const k=S.place;if(!k||k==="home"||typeof accessOf!=="function")return null;
 if(typeof accOwn==="function"&&accOwn(S,k))return null;
 const a=accessOf(S,k);if(!a.ok)return{k,now:true,next:false,why:a.why||""};
 const b=S.buoi||0,last=typeof B4L==="number"?B4L:3;if(b>=last)return null;/* the day turn sends her home anyway */
 const left=BAL.time.khac-(typeof used==="number"?used:0);if(left>1)return null;
 const b0=S.buoi;let n;try{S.buoi=b+1;n=accessOf(S,k)}finally{S.buoi=b0}
 return n&&!n.ok?{k,now:false,next:true,why:n.why||""}:null}catch(e){return null}}
window.stClose=stClose;
function line(c){const p=nm(c.k),w=c.why?` (${c.why})`:"";return c.now?`${p} đã đóng cửa${w}, ngươi vẫn ở lại.`:`${p} sắp đóng cửa sau khắc này${w}.`}
function key(c){try{return [typeof bkey==="function"?bkey():"",c.k,c.now?1:0].join("|")}catch(e){return ""}}
function chip(c){try{return typeof kitLineToast==="function"?kitLineToast(line(c)):null}catch(e){return null}}
function tick(){try{const c=stClose();if(!c)return;const kk=key(c);if(S.closeSeen===kk)return;
 const md=document.getElementById("modal");if(md&&!md.hidden)return;/* the chip waits for the modal to close (next render) */
 if(chip(c))S.closeSeen=kk}catch(e){}}
if(window.kitStageRail)kitStageRail.add({id:"closing",order:2,glyph:"!",title:"Sắp đóng cửa",when:()=>!!stClose(),busy:()=>true,badge:()=>true,
 onTap:()=>{const c=stClose();if(c)chip(c)}});
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{tick()}catch(e){}return r}}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77.2",title:"Báo sắp đóng cửa · nút ! trên cột trái sân khấu + chip tin báo",
 html:()=>`<div class="kitpg-row" style="position:relative;height:60px"><nav class="krail" style="position:static"><button type="button" data-g="!" class="krailb kglyph kbusy kbadge" title="Sắp đóng cửa"><span class="krailg" aria-hidden="true">!</span></button></nav></div>`})}catch(e){}
}catch(e){console.error("jstagehere",e)}})();
