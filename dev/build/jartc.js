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
  const P=k.pW;if(P){if(P.chinh)P.chinh.age=(+P.chinh.age||BAL.ageMin)+1;(P.trac||[]).forEach(t=>{if(t)t.age=(+t.age||BAL.ageMin)+1})}})}catch(e){console.error("jartc spouse age",e)}
 return r}})();
(function(){if(typeof figRoles!=="function")return;const r0=figRoles;figRoles=function(who){const R=r0.apply(this,arguments);
 try{if(who&&S&&who!==S.maid&&who.role==="maid"&&R[0]==="mama")return["maid","mama"]}catch(e){}return R}})();
