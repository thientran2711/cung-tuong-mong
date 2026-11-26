/* ================= jsrvguard: ONE rule — a hand belongs to the life it was dealt for (review/srvmerit-guard r2, MAIN 151 26/11) =================
   Root: a hand of cards is only dealt again by deal() (title «Tiếp tục» does, j6), so a life swap that keeps the old hand — co-op thin guest
   new face (jcoopthinb show() → CW.fromCanon, no deal), co-op rebirth through fromCanon, a sổ loaded without deal, the kc «Ở nhà» ↔ palace
   step — leaves the cards of a life she no longer lives (r1 FAIL: consort cards paid in a cung nữ life, kc home cards paid in the palace, cung nữ
   cards throwing «reading 'mp'» in a consort life). All four directions are ONE root, so ONE rule here (outermost wrapper, after every module
   that wraps deal / render / act / runOpt; law 11):
     lifeKey()  = which life a hand is for: origin · cung nữ (isSrv) · kc at home (isKc) · her name (a new life of the same kind is another life).
     deal()     stamps every card it dealt with lifeK = lifeKey() — on the CARD, not in a variable: the co-op host swaps deck + S per seat (TH.withSeat).
     stale()    = a card of the hand carries another lifeK (an unstamped legacy hand: a cung nữ card while she is not a cung nữ, the r1 test).
     render()   checks stale() BEFORE the hand shows and deals it again for the life she lives now → no wrong-life card is ever on screen to tap.
     act / runOpt (defence, a tap before any render): a stale card is never run and never paid; the hand is dealt again and drawn again and one
     kit notice (§42.2 kitNotice) says why — never a silent swallowed tap. A card of her current life runs as before.
   Not in the key (law 16, working rules unchanged): lãnh cung (S.out) — deal() itself gives the cold hand; cấm túc.
   srvCards / srvTalk options stay marked srvOnly: their go/run/fail do nothing unless she is a serving cung nữ now (talk options are not in the hand). */
(function(){const live=()=>typeof isSrv==="function"&&isSrv();
 const kc=()=>typeof isKc==="function"&&isKc();
 function lifeKey(){try{if(!S||!S.origin)return"";return [S.origin.k,live()?"srv":"",kc()?"kc":"pal",S.name||""].join("|")}catch(e){return""}}
 const tag=A=>{try{for(const a of A||[])if(a&&typeof a==="object"&&!a.srvOnly){a.srvOnly=1;for(const k of ["go","run","fail"])if(typeof a[k]==="function"){const f=a[k];a[k]=function(){return live()?f.apply(this,arguments):""}}}}catch(e){console.error("srv guard",e)}return A};
 if(typeof srvCards==="function"){const c0=srvCards;srvCards=function(){return tag(c0.apply(this,arguments))}}
 if(typeof srvTalk==="function"){const t0=srvTalk;srvTalk=function(){return tag(t0.apply(this,arguments))}}
 /* the stamp: every card of the hand deal() made is for the life she lives now */
 if(typeof deal==="function"){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{const k=lifeKey();if(Array.isArray(deck))for(const a of deck)if(a&&typeof a==="object")a.lifeK=k}catch(e){console.error("life stamp",e)}return r}}
 const cardStale=(a,k)=>!!(a&&typeof a==="object"&&(a.lifeK!=null?a.lifeK!==k:(a.srvOnly&&!live())));
 function stale(){try{if(!S||S.dead||!Array.isArray(deck)||!deck.length)return false;const k=lifeKey();return deck.some(a=>cardStale(a,k))}catch(e){return false}}
 function redeal(){try{deck=[];deal();return true}catch(e){console.error("life deal",e);return false}}
 const inSeat=()=>!!(window.COOPW&&COOPW.ctx);/* the co-op host running the other seat (TH.withSeat): no render / notice in there */
 function tell(){if(inSeat())return;try{if(typeof kitNotice==="function")kitNotice({id:"life-redeal",line:"Thân phận đã đổi: việc trong buổi đã bày lại theo kiếp này.",again:1})}catch(e){}}
 /* the gate: before the hand shows */
 if(typeof render==="function"){const r0=render;render=function(){if(stale())redeal();return r0.apply(this,arguments)}}
 /* defence: a tap that meets a stale hand (no render since the swap) */
 if(typeof act==="function"){const a0=act;act=function(i){if(stale()){redeal();if(!inSeat()){try{render()}catch(e){}tell()}return}return a0.apply(this,arguments)}}
 if(typeof runOpt==="function"){const r0=runOpt;runOpt=function(a){if(a&&cardStale(a,lifeKey())){if(stale())redeal();tell();return null}return r0.apply(this,arguments)}}
 window.srvGuardTag=tag;window.lifeKey=lifeKey;window.lifeStale=stale})();
