/* ================= jrolefig: HER DRESS FOLLOWS HER ROLE (owner 11/14, identity card Fold) =================
   While she serves as a palace maid (cnv start, isSrv()) she wears the maid outfit tier of her servant rank: "m" + S.srv.rk
   (0 Cung nữ thô sử · 1 Cung nữ · 2 Đại cung nữ · 3 Chưởng sự cô cô · 4 Nữ quan), from her identity's maid tiers
   (consort identities tm0..tm4; maid identities: plain maid art / m0..m4). j88 used to give her the lowest tier (m0) whatever her rank.
   Her standing figure, portrait and the face-picker thumbnails all go through f88Best, so they all follow. Everyone else is unchanged:
   a consort (every other origin) wears her consort tier (j88: consort tiers only, never a maid tier). */
function rfSrvRk(){try{return (typeof isSrv==="function"&&isSrv()&&S.srv)?Math.max(0,Math.min(4,S.srv.rk==null?1:S.srv.rk)):null}catch(e){return null}}
if(typeof f88Best==="function"&&typeof f88Pick==="function")(function(){const b0=f88Best;f88Best=function(L,who,kind){try{const r=who===S?rfSrvRk():null;
  if(r!=null&&L&&L.length){const Lp=kind==="por"?L.filter(f=>f.por):L;const f=f88Pick(Lp.length?Lp:L,figTierOf(S),figAgeOf(S),true,r);if(f)return f}}catch(e){}
 return b0.apply(this,arguments)}})();
