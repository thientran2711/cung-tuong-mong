/* ================= jartc: ART COMPLETENESS pickers (owner 15/11 19:50Z: every character 4 age bands x every rank they can hold) =================
   dev/art/ART_COMPLETENESS.md lists the audit (dev/figwork/artcomplete/audit.py).
   1. Married spouses keep aging: the phò mã copy (k.hW.s) and the chính / trắc phi copies (k.pW.chinh, k.pW.trac[]) stored the age at the
      wedding and never aged (only the unmarried pools age in h54Month / htMonth). They now age once a year with everyone else (ageYear), so
      their faces reach the a36 / a51 art (công tử congtu-N, quý nữ khuê các kc). Old saves: they start aging from the next new year.
   2. Older maids (staff role "maid", first face at 36+) take a free MAID identity, which has every maid rank (m0..m4) x 4 ages, instead of
      a mama face (one dress, no rank). The mama pool stays the fallback when no maid face is free, and her own mama (S.maid) is unchanged.
      Faces already given (who.fid) never change. */
(function(){if(typeof ageYear!=="function")return;const a0=ageYear;ageYear=function(){const r=a0.apply(this,arguments);
 try{(typeof allKids==="function"?allKids():[]).forEach(([k])=>{if(!k)return;const W=k.hW;if(W&&W.s)W.s.age=(+W.s.age||20)+1;
  const P=k.pW;if(P){if(P.chinh)P.chinh.age=(+P.chinh.age||18)+1;(P.trac||[]).forEach(t=>{if(t)t.age=(+t.age||18)+1})}})}catch(e){console.error("jartc spouse age",e)}
 return r}})();
(function(){if(typeof figRoles!=="function")return;const r0=figRoles;figRoles=function(who){const R=r0.apply(this,arguments);
 try{if(who&&S&&who!==S.maid&&who.role==="maid"&&R[0]==="mama")return["maid","mama"]}catch(e){}return R}})();
/* 3. Staff eunuchs wear their rank (group b): SRK.eunuch r0 Tiểu thái giám · r1 Thái giám · r2 Thủ lĩnh thái giám · r3 Tổng quản.
      The old eunuch art (tier null) is the r1 dress; rank art has tier "r0" / "r2" / "r3" (img/FIGURES-servants.json). f88Pick's base mode
      takes the nearest rank (the same road as maid ranks m0..m4), so a rank with no art yet falls back to the nearest one drawn. */
(function(){if(typeof f88Best!=="function"||typeof f88Pick!=="function")return;const b0=f88Best;
 f88Best=function(L,who,kind){try{if(who&&S&&who!==S&&(who.role==="eunuch"||who.role==="eun")){
  const Lp=kind==="por"?L.filter(f=>f.por):L;const rk=who.rk==null?1:Math.max(0,Math.min(3,who.rk|0));
  return f88Pick(Lp.length?Lp:L,null,figAgeOf(who),true,rk)}}catch(e){console.error("jartc eunuch rank",e)}
  return b0.apply(this,arguments)}})();
