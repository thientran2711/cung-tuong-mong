/* ================= jsrvguard: ONE gate for every cung nữ act (review/srvmerit-guard, MAIN 148 26/11) =================
   Root: a hand of cung nữ cards (srvCards) or cung nữ talk options (srvTalk) can outlive the cung nữ life that built them — the hand is only
   dealt again by deal() (title «Tiếp tục» does, j6), so a life swap that keeps the old hand (co-op rebirth through fromCanon, a reload of
   another sổ by a test harness, the kc «Ở nhà» start before its deal) leaves cards whose go/run read S.srv (srvMerit «reading 'mp'», intel,
   watch, lvCd, af, sec…). Family scan: 27 of the 38 cung nữ acts threw with S.srv gone (dev/test/srvmerit-guard.js).
   ONE rule here (outermost wrapper, after every module that adds a cung nữ act): every option srvCards / srvTalk return is marked srvOnly and
   its go / run / fail do nothing unless she is a serving cung nữ now (isSrv); act / runOpt meet a stale hand → it is dealt again for the life she lives now
   (nothing paid, nothing run). */
(function(){const live=()=>typeof isSrv==="function"&&isSrv();
 const tag=A=>{try{for(const a of A||[])if(a&&typeof a==="object"&&!a.srvOnly){a.srvOnly=1;for(const k of ["go","run","fail"])if(typeof a[k]==="function"){const f=a[k];a[k]=function(){return live()?f.apply(this,arguments):""}}}}catch(e){console.error("srv guard",e)}return A};
 if(typeof srvCards==="function"){const c0=srvCards;srvCards=function(){return tag(c0.apply(this,arguments))}}
 if(typeof srvTalk==="function"){const t0=srvTalk;srvTalk=function(){return tag(t0.apply(this,arguments))}}
 /* a stale hand (cards of a cung nữ life she no longer lives) is dealt again for the life she lives now, before anything is paid (act spends first, j2) */
 const stale=()=>!live()&&Array.isArray(deck)&&deck.some(x=>x&&x.srvOnly);
 const redeal=()=>{try{deck=[];deal()}catch(e){console.error("srv guard deal",e)}};
 if(typeof act==="function"){const a0=act;act=function(i){if(stale()){redeal();try{render()}catch(e){}return}return a0.apply(this,arguments)}}
 if(typeof runOpt==="function"){const r0=runOpt;runOpt=function(a){if(a&&a.srvOnly&&!live()){if(stale())redeal();return null}return r0.apply(this,arguments)}}
 window.srvGuardTag=tag})();
