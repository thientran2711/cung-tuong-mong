/* ================= jkidlife — CHILDREN LIVING RULES (KP03; owner OD:L87 14/11 21:50Z + dev/PLACES_PLAN.md §5 "Móc lối chơi" on review/places;
   follow-up named in dev/PROGRESS_places-port.md:25) =================
   Where the children live is jplx (plxKidPlace) + j95 (the people ledger); this file adds the RULES around it, the same for her and every consort (law 1):
   · Mẫu tử for every child = k.hM (the bar the princesses already have in j54; first value BAL.kid.hm0, as h54Init).
   · A child who lives AWAY from the mother (a prince 6–17 at A ca sở / Đông cung; any child while the mother is in lãnh cung) and was not seen this month
     loses BAL.kid.estr Mẫu tử at the month's end ("xa cách"). Seen = she walked to the place where the child is (A ca sở, Đông cung, Thượng thư phòng in
     the morning: Mẫu tử +visit) or she used «Cho gọi con về» (callK khắc: the child spends this buổi at her palace, Mẫu tử +call, the child misses a lesson:
     Tài −callTal). An NPC mother sees her son with BAL.kid.npcSee (npcWhy "kidSee"); one in lãnh cung cannot.
   · Thái tử prestige (setHeir, j1): the mother of the new Thái tử gets Danh +heirDanh (her AND an NPC mother; the old typed +10 only for her), the others'
     envy of her rises (ghenAll heirGhen, her only: ghen is the rivals' feeling toward her); the mother whose son is put aside loses that Danh again.
   · Orphans (OD:L87 "orphans to Thái hậu/Hoàng hậu"): a child whose mother died or is in lãnh cung is raised by the Hoàng hậu — her, when she holds the
     seat (two-way: an NPC Hoàng hậu raised them, she now does too), else the NPC Hoàng hậu — and by the Thái hậu when there is no Hoàng hậu. The child lives
     at the foster mother's palace (j95 reads kidWardHome). The foster mother gets Danh +ward.danh the first time; her wards show in her children tab
     («Con nuôi», kit pcard + Mẫu tử bar k.fM).
   · Succession (j99succ): when her son takes the throne, his Mẫu tử moves the "mẹ con" score (S.succ.hoa) by ±1 (succHoa hi / lo).
   Numbers: BAL.kid (jbal2.js). Kit only: pbtn act cards in the card's «Thăm con» group (with j15's «Về tẩm cung thăm con»), sbar, pcard. Co-op: NPC children are world state (host only,
   worldOn()); her own children travel in her S. Old saves: every field is read with a default; nothing to migrate. ================= */
function kmB(){return BAL.kid}
function kmHM(k){if(k&&k.hM==null){const b=kmB().hm0;k.hM=b[0]+R(b[1])}return k}
function kmMom(mo){return mo||S}
function kmMomOk(m){return !!m&&(m===S?!S.dead&&!S.out:m.alive&&!m.out)}
function kmBuoiId(){return [S.turn|0,S.tuan|0,S.ngay|0,S.buoi|0].join(":")}
/* the Hoàng hậu who takes in an orphan: her (rank 7), else the NPC Hoàng hậu, else null (→ Thái hậu) */
function kmQueen(){try{if(S&&!S.dead&&!S.out&&(S.rank|0)>=7)return S;if(typeof qOn==="function"&&qOn())return rivals[0]}catch(e){}return null}
function kmFoster(k,mo){const m=kmMom(mo);if(!k||!k.alive||kmMomOk(m))return null;const q=kmQueen();return q&&q!==m?q:"th"}
/* j95 (the people ledger) asks where an orphan lives: the foster mother's palace, or Từ Ninh (Thái hậu) */
function kidWardHome(k,mo){const f=kmFoster(k,mo);if(!f)return null;if(f==="th")return "tn";try{return palaceOf(f)}catch(e){return null}}
function kmWards(p){const L=[];try{for(const [k,mo] of allKids())if(k.alive&&kmFoster(k,mo)===p)L.push([k,mo])}catch(e){}return L}
/* where the child sleeps away from the mother: A ca sở / Đông cung (prince 6–17), or with the foster mother */
function kmAway(k,mo){if(!k||!k.alive)return false;if(!kmMomOk(kmMom(mo)))return true;
 const a=k.age|0;return k.sex==="m"&&a>=(typeof PLX_AGE==="number"?PLX_AGE:6)&&a<(typeof PLX_ADULT==="number"?PLX_ADULT:18)}
function kmSee(k,how){if(!k||k.kmS===(S.turn|0))return false;k.kmS=S.turn|0;kmHM(k);k.hM=cl(k.hM+how,0,100);return true}
/* she walks to the place where her child is now (jplx: A ca sở / Đông cung, Thượng thư phòng in the morning) */
function kmVisitAt(place){if(!S||S.dead||!place)return"";const B=kmB(),N=[];
 for(const k of S.kids||[])if(k.alive&&kmAway(k,null)&&typeof plxKidPlace==="function"&&plxKidPlace(k)===place&&kmSee(k,B.visit))N.push(k.name);
 if(N.length)log(`Ngươi gặp ${N.join(", ")}: Mẫu tử ${balSg(B.visit)}.`);return N.join(", ")}
/* «Cho gọi con về»: the child comes to her palace for this buổi */
function kmCallWhy(k){const B=kmB();if(!k||!k.alive)return"con đã mất";if(!kmAway(k,null))return"con đang ở cùng ngươi";if(S.out)return"đang ở lãnh cung: không gọi con về được";
 if(k.kmS===(S.turn|0))return"tháng này đã gặp con";return whyTime(B.callK)||""}
function kmCall(k){const B=kmB();if(kmCallWhy(k))return;spend(B.callK);k.kmCb=kmBuoiId();kmSee(k,B.call);k.tal=cl((k.tal||0)-B.callTal,0,100);
 log(`Ngươi cho gọi ${k.name} về cung một buổi: Mẫu tử ${balSg(B.call)}; con bỏ một buổi học, Tài con ${balSg(-B.callTal)}.`);
 try{if(S.place==="home"&&S.visit&&typeof plxHomeKid==="function"&&!S.visit.people.some(p=>p.ref===k))S.visit.people.push(plxHomeKid(k))}catch(e){}}
function kmBtns(k){const B=kmB(),out=[];if(!k||!k.alive||!kmAway(k,null)||S.out)return out;
 const pl=k.heir?"dc":"acs",pn=pl==="dc"?"Đông cung":"A ca sở";
 out.push(pbtn(`data-kl="call" data-kn="${k.name}"`,"Cho gọi con về",`tốn: ${B.callK} khắc · thành: con về cung ngươi một buổi, Mẫu tử ${balSg(B.call)} · kèm: con bỏ một buổi học, Tài con ${balSg(-B.callTal)}`,kmCallWhy(k)));
 out.push(pbtn(`data-go="${pl}"`,`Sang ${pn} thăm con`,`tốn: đi đường · thành: gặp con, Mẫu tử ${balSg(B.visit)} (mỗi tháng một lần)`,S.place===pl?"đang ở đó":S.confined?"đang cấm túc":k.kmS===(S.turn|0)?"tháng này đã gặp con":""));
 return out}
/* an NPC mother goes to see her son who lives away: npc-purpose (her reason = how close they are, Mẫu tử), her try = BAL.kid.npcSee */
function kmNpcSees(m,k){const B=kmB();if(typeof npcWhy==="function"&&typeof npwOn==="function"&&npwOn()&&NPW.reg.kidSee)return !!npcWhy("kidSee",{p:m,k},()=>roll(B.npcSee));return roll(B.npcSee)}
try{if(typeof npwReg==="function")npwReg("kidSee",{grp:"KP03",who:c=>c.p?[c.p]:[],why:(m,c)=>({s:Math.max(npwB().min,(c.k&&c.k.hM)||kmB().hm0[0]),t:c.k,r:"nhớ con, muốn sang thăm"})})}catch(e){console.error("kidSee reg",e)}
/* month's end: estrangement for the children who live away and were not seen (her children; NPC children on the host only) */
function kidLifeMonth(){if(!S||S.dead)return"";const B=kmB(),far=[];let ev="";
 /* review r1: monthTick runs S.turn++ BEFORE kidsMonth, so the month that just ended is S.turn-1 (the turn kmSee stamped while she played it) */
 const T=(S.turn|0)-1,L=allKids().filter(([k,mo])=>k.alive&&(!mo||(typeof worldOn!=="function"||worldOn())));
 for(const [k,mo] of L){const m=kmMom(mo);kmHM(k);if(!kmAway(k,mo)){k.kmS=T;continue}
  if(m!==S&&kmMomOk(m)&&k.kmS!==T&&kmNpcSees(m,k)){k.kmS=T;k.hM=cl(k.hM+B.visit,0,100)}
  if(k.kmS!==T&&(m===S||m.alive)){k.hM=cl(k.hM+B.estr,0,100);if(m===S)far.push(k.name)}}
 /* wards: the foster mother's bond (k.fM) grows while the child lives with her; the Danh of the foster mother on the first month */
 for(const [k,mo] of L){const f=kmFoster(k,mo);if(!f||f==="th"){k.kmF=null;continue}const fk=f===S?"me":"v"+f.id;
  if(k.kmF!==fk){k.kmF=fk;k.fM=k.fM==null?kmB().hm0[0]:k.fM;ap(f,{danh:B.ward.danh});if(f===S)ev+=`<span class="g">${k.name} mất chỗ dựa nơi mẹ ruột, được giao về cung ngươi nuôi dạy.</span> Danh ${balSg(B.ward.danh)}. `}
  else k.fM=cl((k.fM||0)+B.visit,0,100)}
 if(far.length)ev+=`Lâu không gặp, ${far.join(", ")} với ngươi xa cách: Mẫu tử ${balSg(B.estr)}. `;return ev}
/* the children tab: her wards («Con nuôi») */
function kmWardCard(k,mo){return pcard({tabKey:"kidward",f:kidFace(k),name:k.name,rank:`${ic("con",16)}${k.sex==="m"?"Hoàng tử":"Công chúa"} · con nuôi`,
 lines:[tuoi(k.age),`Mẹ ruột: <b>${mo?mo.name:"—"}</b>${mo&&mo.alive?" (ở lãnh cung)":" (đã mất)"}`,`Sức khỏe <b>${k.hp}</b>`,`Tài <b>${k.tal}</b>`,sbar("Mẫu tử",k.fM==null?kmB().hm0[0]:k.fM,"h54m")],
 chips:[k.heir?chip("Thái tử","ok"):"",chip("Ở cung ngươi","ok")]})}
(function(){try{
 /* her sons get the same Mẫu tử bar as the princesses (j54 h54Lines draws it for daughters) */
 const kc=kidCard;kidCard=function(k){let h=kc.apply(this,arguments);try{if(k&&k.alive&&k.sex==="m"){kmHM(k);const i=h.indexOf('<div class="pcinfo">');if(i>=0){const j=h.indexOf("</div>",i);if(j>0)h=h.slice(0,j)+`<span>${sbar("Mẫu tử",k.hM,"h54m")}</span>`+h.slice(j)}}
   /* «Cho gọi con về» / «Sang A ca sở thăm con» join the card's «Thăm con» group (j56 names the bare group holding the data-go="home" act) */
   const B=k&&k.alive?kmBtns(k).join(""):"";if(B){const g=h.indexOf('data-go="home"'),i=g>0?h.lastIndexOf('<div class="pcb',g):-1,e=i>=0?h.indexOf(">",i):-1;if(e>0)h=h.slice(0,e+1)+B+h.slice(e+1)}}catch(e){console.error("kidlife card",e)}return h};
 const kt=kidTabHTML;kidTabHTML=function(hl){let h=kt.apply(this,arguments);try{const W=kmWards(S);if(W.length)h=h.replace(/<\/div>$/,`<div class="ph"><span>Con nuôi</span><span>${W.length}</span></div>${W.map(([k,mo])=>kmWardCard(k,mo)).join("")}</div>`)}catch(e){console.error("kidlife tab",e)}return h};
 const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(S&&S.place===k&&k!=="home")kmVisitAt(k)}catch(e){console.error("kidlife visit",e)}return r};
 /* a called child is at her palace this buổi (jplx where-the-children-are) */
 if(typeof plxKidPlace==="function"){const p0=plxKidPlace;plxKidPlace=function(k){if(k&&k.kmCb&&k.kmCb===kmBuoiId())return null;return p0.apply(this,arguments)}}
 const m0=kidsMonth;kidsMonth=function(){let r=m0.apply(this,arguments)||"";try{r+=kidLifeMonth()}catch(e){console.error("kidlife month",e)}return r};
 /* Thái tử prestige (two-way) */
 const sh=setHeir;setHeir=function(k,v){const B=kmB(),old=S.heir;const r=sh.apply(this,arguments);try{
   const om=old&&old.k&&old.k!==k?(old.v||S):null,nm=v||S;if(om&&om!==nm&&(om===S||om.alive))ap(om,{danh:-B.heirDanh});
   if(!(old&&old.k===k)&&om!==nm){ap(nm,{danh:B.heirDanh});if(nm===S&&typeof ghenAll==="function")ghenAll(B.heirGhen,"con ngươi được lập Thái tử")}}catch(e){console.error("kidlife heir",e)}return r};
 /* succession: her son's Mẫu tử moves the "mẹ con" score */
 if(typeof succOpen==="function"){const so=succOpen;succOpen=function(h){const r=so.apply(this,arguments);try{const k=h&&h.k,E=S.succ,H=kmB().succHoa;if(k&&E&&!h.v){kmHM(k);if(k.hM>=H.hi)E.hoa=(E.hoa||0)+1;else if(k.hM<H.lo)E.hoa=(E.hoa||0)-1}}catch(e){console.error("kidlife succ",e)}return r}}
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kl]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();
  const k=S&&(S.kids||[]).find(x=>x.name===b.dataset.kn&&x.alive);if(!k||Q.length)return;if(b.dataset.kl==="call"){kmCall(k);render()}},true);
}catch(e){console.error("jkidlife",e)}})();
window.kidWardHome=kidWardHome;window.kidLifeMonth=kidLifeMonth;window.kmCall=kmCall;
