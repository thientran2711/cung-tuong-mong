/* ================= THE ACTIVE MAID LINE (review/servant-system, owner 16/11 approved) =================
   1. THE EMPEROR'S EYE (mlEye, called from j14 servRanks in place of "srk>=2 at 1.2 %/month"): a maid of ANY rank may catch his eye.
      Chance per month = BAL.mline.eye[rank] (higher rank stands closer to him; a thô sử only by a chance meeting in Ngự hoa viên or
      serving tea elsewhere) × (1 + master's Sủng/100 × eyeSung: he visits her palace more) × seekMul while she seeks his notice;
      only ages eyeAge[0]..eyeAge[1]. The consort ceiling is kept: j14 still requires roomFor("consort") (a free consort slot).
   2. SEEKING (mlSeek): each month a maid may start to seek his notice (serve tea, stand where he passes) for seekMonths months;
      by nết (tham / lanh more, trung / nhat less). Her master notices (seeNotice): a harsh master (Xảo quyệt / Kiêu ngạo / Đa nghi)
      punishes her (lòng -punLoy, slapped; sometimes sent to Tân Giả khố = leaves the household); a master losing favour (Sủng useGap under the harem median, r2)
      USES her instead (pushes her: seekMul × useMul, lòng +useLoy) — a maid who rises loyal (lòng ≥ 60, j14) stays her master's ally.
   3. MAIDS HARM EACH OTHER (mlFeud): maids of two hostile palaces fight over duties, frame or poison each other.
   4. CONSORTS TARGET OTHER PALACES' MAIDS (mlHit): bribe (j10 bribeServ, unchanged), frame (the maid is punished by her own master),
      or beat her when they meet. Her household is a target like every other.
   She sees what touches her household, or anything when Tai mắt ≥ seeMat. Face marks use jface (slapGive / pzGive / penGive);
   on main those skip servants (no .alive), so they are given through mlFx, which works with or without review/facefx-all.
   Every number is in BAL.mline (jbal2.js). Counters for the bots: window.__mlN. Off switch: window.__mloff=1. */
window.__mlN=window.__mlN||{};
function mlOn(){return !!(S&&!window.__mloff&&typeof BAL==="object"&&BAL.mline)}
/* co-op (review/servant-mline-r1): NPC maid events are world state, rolled once on the host (like rivalsTurn/rivalsMonth in jcoopworld);
   the guest rolls only for her own household */
function mlGuest(){try{return !!(window.COOPW&&COOPW.on&&COOPW.seat!=="a")}catch(e){return false}}
function mlC(k,n){const N=window.__mlN;N[k]=(N[k]||0)+(n==null?1:n)}
function mlB(){return BAL.mline}
function mlMine(p){return p===S}
function mlSee(...P){try{return P.some(p=>p===S)||(S.mat||0)>=mlB().seeMat}catch(e){return false}}
/* a face mark on a servant: facefx-all (KIT_FACEFX.live) when present; else the jface giver with a living servant */
function mlFx(f,s,...a){if(typeof f!=="function"||!s)return;const had=Object.prototype.hasOwnProperty.call(s,"alive");try{if(!had)s.alive=true;f(s,...a)}catch(e){}finally{if(!had)delete s.alive}}
function mlAgeOk(s){const B=mlB();const a=s.age||B.ageDef;return a>=B.eyeAge[0]&&a<=B.eyeAge[1]}
/* 1. the Emperor's eye */
function mlEyeP(p,s){const B=mlB();if(!mlAgeOk(s))return 0;let c=B.eye[Math.max(0,Math.min(B.eye.length-1,srk(s)))]||0;
 c*=1+Math.max(0,p.sung||0)/100*B.eyeSung;if(s.seek&&s.seek.until>=(S.turn||0))c*=B.seekMul*(s.seek.used?B.useMul:1);return c}
function mlEye(p,s){/* co-op guest (review/coop-guest-maid): her maid rolls the eye like solo; the new consort reaches the world through the guest→host request (jcoopask, PROTOCOL §4.1) */if(!mlOn()){const O=BAL.mline;mlC("eyeTry");const ok=srk(s)>=O.offRank&&roll(O.offEye);if(ok)mlC("eyeHit");return ok}const c=mlEyeP(p,s);mlC("eyeTry");mlC("eyeP",c);const ok=roll(c);if(ok)mlC("eyeHit");return ok}
function mlRose(p,s){mlC("rose");if(s.seek)mlC("roseSeek");if(s.seek&&s.seek.used&&roll(mlB().useTurn)){s.loyal=Math.min(s.loyal||0,mlB().riseLoy-1);mlC("useTurn")}}
/* 2. seeking his notice */
function mlSeek(p){const B=mlB();let ev="";for(const s of (p.staff||[]).slice()){if(s.role!=="maid"||!mlAgeOk(s))continue;const T=S.turn||0;
  if(s.seek&&s.seek.until<T){s.seek=null;s.seekCd=T+B.seekCd}/* review/servant-mline-r2: a cooldown before the same maid seeks again */
  if(!s.seek){if((typeof asOn==="function"&&asOn()))continue;/* AG-ALL B: she seeks by choosing "Quỳ dâng trà" */if(s.age>B.seekAge||(s.seekCd||0)>T)continue;const m=qv(B.seekTr,s,1);if(!roll(B.seekStart*m))continue;s.seek={from:T,until:T+B.seekMonths,used:0};mlC("seek");
   if(mlMine(p))ev+=`${s.name} dạo này hay xin đi dâng trà, đứng chờ nơi Hoàng thượng đi qua. `;else if(mlSee(p)&&(S.mat||0)>=B.seeMat)ev+=`Tai mắt báo: ${s.name}, người hầu của ${p.name}, tìm cách lọt vào mắt Hoàng thượng. `;continue}
  if(mlMine(p)||s.seek.seen)continue;/* she decides about her own maids herself (her acts); an NPC master reacts once */
  if(!roll(B.seeNotice))continue;s.seek.seen=1;const tr=typeof traitsOf==="function"?traitsOf(p):[p.trait];const harsh=tr.some(x=>x==="Xảo quyệt"||x==="Kiêu ngạo"||x==="Kín đáo");
  const AC=(typeof asOn==="function"&&asOn())?asSeekReact(p,s,harsh):null;/* AG-ALL B: the master's choice */
  if(AC?AC==="punish"||AC==="punOut":harsh&&roll(B.punish)){s.loyal=cl((s.loyal||0)-B.punLoy,0,100);mlFx(typeof slapGive==="function"?slapGive:null,s,p,"bị chủ đánh vì dám lọt mắt Hoàng thượng");s.seek=null;s.seekCd=T+B.seekCd;mlC("punish");
   if(AC?AC==="punOut":roll(B.punOut)){p.staff.splice(p.staff.indexOf(s),1);mlC("punOut");if(mlSee(p))ev+=`${p.name} bắt gặp ${s.name} tìm cách lọt mắt Hoàng thượng, sai đánh rồi đuổi xuống Tân Giả khố. `}
   else if(mlSee(p))ev+=`${p.name} bắt gặp ${s.name} tìm cách lọt mắt Hoàng thượng, sai vả miệng, cấm ra khỏi cung. `}
  /* "use" (review/servant-mline-r2, gain and loss): the master pays useBac bạc for the maid's dress and rouge, and a used maid who
     rises may turn her back (useTurn %, mlRose) */
  else if(AC?AC==="use":mlLosing(p)&&(p.bac||0)>=B.useBac&&roll(B.use)){s.seek.used=1;s.seek.until=T+B.seekMonths;s.loyal=cl((s.loyal||0)+B.useLoy,0,100);ap(p,{bac:-B.useBac});mlC("use");mlC("useBac",B.useBac);
   if(mlSee(p))ev+=`${p.name} thất sủng, bỏ ${B.useBac} lượng bạc may áo, mua phấn cho ${s.name}, sai nàng dâng trà mỗi khi Hoàng thượng ghé qua, mong giữ chân ngài. `}}
 return ev}
/* a master "losing favour" (r2): her Sủng sits useGap or more under the harem's median (the old fixed Sủng < 30 almost never met a
   master who still had maids: 9 of 1737 maid-months in a 20-year run, so "use" never happened) */
function mlLosing(p){try{const L=liveRivals(true).map(v=>v.sung||0).sort((a,b)=>a-b);if(!L.length)return false;const m=L[Math.floor(L.length/2)];return (p.sung||0)<=m-mlB().useGap}catch(e){return false}}
/* CAUGHT (review/servant-mline-r2, gain and loss): every harmful act has ONE BAL key, its caught chance (frameCatch, poisonCatch,
   hitCatch; a beating is seen by all). Caught: the victim's mistress learns who is behind it: a true deed is written on the master
   (jtruth deedAdd; she did order it), the victim's mistress gets evidence (evA, any mistress, not only the player) and oán, the master
   loses Đức / Danh (exposed framer, OD 16/11 evidence-truth). When the player's own maid did it (she gave no order), no deed and no
   evidence on her: she loses Danh for her household and the victim's mistress still resents her. */
function mlCaught(p,t,k,w,x){const B=mlB();mlC("caught_"+k);if(p===S){apply({danh:-B.caughtDanh});oanAdd(t,S,B.caughtOan*w);return 0}
 deedAdd(p,"ml"+k,t,w,x);ap(p,{duc:-B.caughtDuc*w,danh:-B.caughtDanh});oanAdd(t,p,B.caughtOan*w);const d=evA(t,p,B.evN*w);mlC("ev",d);if(t===S)mlC("evMe",d);return d}
/* 3. maids of hostile palaces harm each other */
function mlFeud(p){const B=mlB();let ev="";const G=mlGuest();if(G&&p===S)return"";/* co-op guest: her maid's harm to an NPC maid is world state (host) */
 if((typeof asOn==="function"&&asOn()))return"";/* AG-ALL B: a maid harms a colleague only by her chosen "Tố lỗi với chủ" (jagstaff) */const M=(p.staff||[]).filter(s=>s.role==="maid");if(!M.length||!roll(B.feud))return"";
 const foes=others(p).filter(t=>t&&(!G||t===S)&&(t.staff||[]).some(x=>x.role==="maid")&&hostility(p,t)>=B.feudHost);if(!foes.length)return"";
 const t=pick(foes),a=pick(M),b=pick(t.staff.filter(x=>x.role==="maid"));if(!a||!b)return"";{const g=typeof cmGuard==="function"?cmGuard(t,p):"";if(g)return g}/* jcmaid: a martial close maid (dtq) stands in the way */const see=mlSee(p,t);const k=roll(B.feudPoison)?"poison":roll(B.feudFrame)?"frame":"fight";mlC("feud_"+k);
 if(k==="fight"){a.loyal=cl(a.loyal+B.fightLoy,0,100);b.loyal=cl(b.loyal+B.fightLoy,0,100);const l=roll(B.fightLose)?a:b;/* the loser of the scuffle is slapped: either side */mlFx(typeof slapGive==="function"?slapGive:null,l,l===a?t:p,"cãi nhau giành việc");
  if(see)ev+=`${a.name} (cung ${NM(p)}) và ${b.name} (cung ${NM(t)}) giành việc ở Nội vụ phủ, cào cấu nhau giữa sân; ${l.name} bị tát. `}
 else if(k==="frame"){if(roll(B.frameCatch)){/* caught: b is cleared, a is punished by her own master to save face */
   a.loyal=cl(a.loyal-B.frameLoy,0,100);mlFx(typeof penGive==="function"?penGive:null,a,"quy","bị bắt quả tang vu oan người khác",p);
   const d=mlCaught(p,t,"frame",1,`sai người hầu vu oan cung nữ cung ${t===S?"ta":t.name}`);
   if(see)ev+=`${a.name} (cung ${NM(p)}) vu cho ${b.name} (cung ${NM(t)}) ăn cắp, bị ${t===S?"ngươi":t.name} tra ra; ${a.name} bị phạt quỳ${p===S?`; Danh −${B.caughtDanh}`:t===S&&d?`; chứng cứ về ${p.name} +${d}`:""}. `}
  else{b.loyal=cl(b.loyal-B.frameLoy,0,100);b.trouble=wk();mlFx(typeof penGive==="function"?penGive:null,b,"quy","bị vu ăn cắp",t);
   if(roll(B.frameOut)&&t!==S){t.staff.splice(t.staff.indexOf(b),1);mlC("frameOut")}if(see)ev+=`${a.name} (cung ${NM(p)}) vu cho ${b.name} (cung ${NM(t)}) ăn cắp; ${b.name} bị phạt quỳ${t===S?" (ngươi có thể Che chở ở Hậu cung › Cung nhân)":""}. `}}
 else{mlFx(typeof pzGive==="function"?pzGive:null,b,B.poisonLv,"bị bỏ độc vào bát cơm",p);let died=false;if(roll(B.poisonDie)){(t.staff||[]).splice(t.staff.indexOf(b),1);died=true;mlC("poisonDie");if(see)ev+=`${b.name} (cung ${NM(t)}) ăn bát cơm ${a.name} (cung ${NM(p)}) đưa sang, không qua khỏi. `}
  else if(see)ev+=`${b.name} (cung ${NM(t)}) trúng độc trong bát cơm, môi tím tái mấy ngày. `;
  if(roll(B.poisonCatch)){/* caught: the poisoner is taken to Thận hình ti (leaves her master) */const i=p.staff.indexOf(a);if(i>=0)p.staff.splice(i,1);mlC("poisonOut");
   const d=mlCaught(p,t,"poison",B.poisonW,`sai người hầu bỏ độc cung nữ cung ${t===S?"ta":t.name}`);
   if(see)ev+=`Thái y tra ra độc trong bát cơm ${a.name} (cung ${NM(p)}) đưa sang; ${a.name} bị giải sang Thận hình ti${p===S?`; Danh −${B.caughtDanh}`:t===S&&d?`; chứng cứ về ${p.name} +${d}`:""}. `}}
 return ev}
/* 4. a consort targets another palace's maid (co-op guest: pickTarget (jcoopworld) returns only her, so an NPC's act aimed at her
   household lands on her side, NPC vs NPC rolls on the host) */
function mlHit(p){const B=mlB();const HP=(typeof asOn==="function"&&asOn())?(p===S?null:asHitPick(p)):undefined;/* AG-ALL B: the consort's choice */if(HP===null)return"";if(HP===undefined&&(p===S||!roll(B.hit)))return"";const t=HP?HP.t:pickTarget(p);if(!t||!(t.staff||[]).some(x=>x.role==="maid"))return"";const s=pick(t.staff.filter(x=>x.role==="maid"));if(!s)return"";{const g=typeof cmGuard==="function"?cmGuard(t,p):"";if(g)return g}
 const tr=typeof traitsOf==="function"?traitsOf(p):[p.trait];const cruel=tr.some(x=>x==="Xảo quyệt"||x==="Kiêu ngạo");const k=HP?HP.k:(p.bac||0)>=B.hitBribeBac&&roll(B.hitBribe)?"bribe":cruel&&roll(B.hitBeat)?"beat":"frame";mlC("hit_"+k);let ev="";const see=mlSee(t);
 if(k==="bribe"){const r=bribeServ(p,s);if(t===S&&r&&s.spyFor!==key(p))ev+=r}
 else if(k==="beat"){mlFx(typeof slapGive==="function"?slapGive:null,s,p,`bị ${p.name} đánh`);s.loyal=cl(s.loyal+B.beatLoy,0,100);
  /* a beating is done in the open: always a true deed; the victim's mistress resents it, and holds proof of it at hitEv % */
  deedAdd(p,"mlbeat",t,1,`đánh người hầu cung ${t===S?"ta":t.name} giữa đường`);oanAdd(t,p,B.caughtOan);const d=roll(B.hitEv)?evA(t,p,B.evN):0;mlC("ev",d);if(t===S)mlC("evMe",d);
  if(see)ev+=`${p.name} gặp ${s.name} (cung ${NM(t)}) giữa đường, bắt quỳ, sai vả miệng${t===S?`; nàng về khóc với ngươi (thiện cảm +${B.beatLoy})${d?`; chứng cứ về ${p.name} +${d}`:""}`:""}. `}
 else if(roll(B.hitCatch)){/* caught: the maid is cleared, the consort behind it is exposed */const d=mlCaught(p,t,"hframe",1,`vu oan người hầu cung ${t===S?"ta":t.name}`);
  if(see)ev+=`Người của ${p.name} vu cho ${s.name} (cung ${NM(t)}) làm vỡ đồ ngự tứ, bị tra ra; ${p.name} mất mặt${t===S&&d?`; chứng cứ về ${p.name} +${d}`:""}. `}
 else{s.loyal=cl(s.loyal-B.frameLoy,0,100);s.trouble=wk();mlFx(typeof penGive==="function"?penGive:null,s,"quy",`bị ${p.name} vu tội`,p);if(t!==S&&roll(B.frameOut)){t.staff.splice(t.staff.indexOf(s),1);mlC("frameOut")}
  if(see)ev+=`Người của ${p.name} vu cho ${s.name} (cung ${NM(t)}) làm vỡ đồ ngự tứ; ${s.name} bị phạt${t===S?" (ngươi có thể Che chở ở Hậu cung › Cung nhân)":""}. `}
 return ev}
/* co-op guest (review/servant-mline-r2): NPC masters' own maids (seek, feud among NPCs) roll on the host; on the guest only what touches
   her household rolls: her maids' seeking, NPC maids feuding with hers, NPC consorts hitting her maids */
function mlMonth(){if(!mlOn())return"";let ev="";const G=mlGuest();try{for(const p of consorts()){if(!p||!p.staff)continue;if(p!==S&&(!p.alive||p.out))continue;
  if(!G||p===S)ev+=mlSeek(p);ev+=mlFeud(p);ev+=mlHit(p)}}catch(e){console.error("mlMonth",e)}return ev}
(function(){const m0=servMonth;servMonth=function(){const r=m0.apply(this,arguments)||"";return r+mlMonth()}})();
