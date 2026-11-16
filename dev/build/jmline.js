/* ================= THE ACTIVE MAID LINE (review/servant-system, owner 16/11 approved) =================
   1. THE EMPEROR'S EYE (mlEye, called from j14 servRanks in place of "srk>=2 at 1.2 %/month"): a maid of ANY rank may catch his eye.
      Chance per month = BAL.mline.eye[rank] (higher rank stands closer to him; a thô sử only by a chance meeting in Ngự hoa viên or
      serving tea elsewhere) × (1 + master's Sủng/100 × eyeSung: he visits her palace more) × seekMul while she seeks his notice;
      only ages eyeAge[0]..eyeAge[1]. The consort ceiling is kept: j14 still requires roomFor("consort") (a free consort slot).
   2. SEEKING (mlSeek): each month a maid may start to seek his notice (serve tea, stand where he passes) for seekMonths months;
      by nết (tham / lanh more, trung / nhat less). Her master notices (seeNotice): a harsh master (Hiểm độc / Kiêu ngạo / Đa nghi)
      punishes her (lòng -punLoy, slapped; sometimes sent to Tân Giả khố = leaves the household); a master losing favour (Sủng < useSung)
      USES her instead (pushes her: seekMul × useMul, lòng +useLoy) — a maid who rises loyal (lòng ≥ 60, j14) stays her master's ally.
   3. MAIDS HARM EACH OTHER (mlFeud): maids of two hostile palaces fight over duties, frame or poison each other.
   4. CONSORTS TARGET OTHER PALACES' MAIDS (mlHit): bribe (j10 bribeServ, unchanged), frame (the maid is punished by her own master),
      or beat her when they meet. Her household is a target like every other.
   She sees what touches her household, or anything when Tai mắt ≥ seeMat. Face marks use jface (slapGive / pzGive / penGive);
   on main those skip servants (no .alive), so they are given through mlFx, which works with or without review/facefx-all.
   Every number is in BAL.mline (jbal2.js). Counters for the bots: window.__mlN. Off switch: window.__mloff=1. */
window.__mlN=window.__mlN||{};
function mlOn(){return !!(S&&!window.__mloff&&typeof BAL==="object"&&BAL.mline)}
function mlC(k,n){const N=window.__mlN;N[k]=(N[k]||0)+(n==null?1:n)}
function mlB(){return BAL.mline}
function mlMine(p){return p===S}
function mlSee(...P){try{return P.some(p=>p===S)||(S.mat||0)>=mlB().seeMat}catch(e){return false}}
/* a face mark on a servant: facefx-all (KIT_FACEFX.live) when present; else the jface giver with a living servant */
function mlFx(f,s,...a){if(typeof f!=="function"||!s)return;const had=Object.prototype.hasOwnProperty.call(s,"alive");try{if(!had)s.alive=true;f(s,...a)}catch(e){}finally{if(!had)delete s.alive}}
function mlAgeOk(s){const B=mlB();const a=s.age||20;return a>=B.eyeAge[0]&&a<=B.eyeAge[1]}
/* 1. the Emperor's eye */
function mlEyeP(p,s){const B=mlB();if(!mlAgeOk(s))return 0;let c=B.eye[Math.max(0,Math.min(B.eye.length-1,srk(s)))]||0;
 c*=1+Math.max(0,p.sung||0)/100*B.eyeSung;if(s.seek&&s.seek.until>=(S.turn||0))c*=B.seekMul*(s.seek.used?B.useMul:1);return c}
function mlEye(p,s){if(!mlOn()){mlC("eyeTry");const ok=srk(s)>=2&&roll(1.2);if(ok)mlC("eyeHit");return ok}const c=mlEyeP(p,s);mlC("eyeTry");mlC("eyeP",c);const ok=roll(c);if(ok)mlC("eyeHit");return ok}
function mlRose(p,s){mlC("rose");if(s.seek)mlC("roseSeek")}
/* 2. seeking his notice */
function mlSeek(p){const B=mlB();let ev="";for(const s of (p.staff||[]).slice()){if(s.role!=="maid"||!mlAgeOk(s))continue;const T=S.turn||0;
  if(s.seek&&s.seek.until<T)s.seek=null;
  if(!s.seek){if(s.age>B.seekAge)continue;const m={tham:2,lanh:1.5,chuyen:1,trung:.3,nhat:.3}[s.tr]||1;if(!roll(B.seekStart*m))continue;s.seek={from:T,until:T+B.seekMonths,used:0};mlC("seek");
   if(mlMine(p))ev+=`${s.name} dạo này hay xin đi dâng trà, đứng chờ nơi Hoàng thượng đi qua. `;else if(mlSee(p)&&(S.mat||0)>=B.seeMat)ev+=`Tai mắt báo: ${s.name}, cung nữ của ${p.name}, tìm cách lọt vào mắt Hoàng thượng. `;continue}
  if(mlMine(p)||s.seek.seen)continue;/* she decides about her own maids herself (her acts); an NPC master reacts once */
  if(!roll(B.seeNotice))continue;s.seek.seen=1;const tr=typeof traitsOf==="function"?traitsOf(p):[p.trait];const harsh=tr.some(x=>x==="Hiểm độc"||x==="Kiêu ngạo"||x==="Đa nghi");
  if(harsh&&roll(B.punish)){s.loyal=cl((s.loyal||0)-B.punLoy,0,100);mlFx(typeof slapGive==="function"?slapGive:null,s,p,"bị chủ đánh vì dám lọt mắt Hoàng thượng");s.seek=null;mlC("punish");
   if(roll(B.punOut)){p.staff.splice(p.staff.indexOf(s),1);mlC("punOut");if(mlSee(p))ev+=`${p.name} bắt gặp ${s.name} tìm cách lọt mắt Hoàng thượng, sai đánh rồi đuổi xuống Tân Giả khố. `}
   else if(mlSee(p))ev+=`${p.name} bắt gặp ${s.name} tìm cách lọt mắt Hoàng thượng, sai vả miệng, cấm ra khỏi cung. `}
  else if((p.sung||0)<B.useSung&&roll(B.use)){s.seek.used=1;s.seek.until=T+B.seekMonths;s.loyal=cl((s.loyal||0)+B.useLoy,0,100);mlC("use");
   if(mlSee(p))ev+=`${p.name} thất sủng, sai ${s.name} trang điểm, dâng trà mỗi khi Hoàng thượng ghé qua, mong giữ chân ngài. `}}
 return ev}
/* 3. maids of hostile palaces harm each other */
function mlFeud(p){const B=mlB();let ev="";const M=(p.staff||[]).filter(s=>s.role==="maid");if(!M.length||!roll(B.feud))return"";
 const foes=others(p).filter(t=>t&&(t.staff||[]).some(x=>x.role==="maid")&&hostility(p,t)>=B.feudHost);if(!foes.length)return"";
 const t=pick(foes),a=pick(M),b=pick(t.staff.filter(x=>x.role==="maid"));if(!a||!b)return"";const see=mlSee(p,t);const k=roll(B.feudPoison)?"poison":roll(50)?"frame":"fight";mlC("feud_"+k);
 if(k==="fight"){a.loyal=cl(a.loyal+2,0,100);b.loyal=cl(b.loyal+2,0,100);mlFx(typeof slapGive==="function"?slapGive:null,b,p,"cãi nhau giành việc");
  if(see)ev+=`${a.name} (cung ${NM(p)}) và ${b.name} (cung ${NM(t)}) giành việc ở Nội vụ phủ, cào cấu nhau giữa sân. `}
 else if(k==="frame"){b.loyal=cl(b.loyal-B.frameLoy,0,100);b.trouble=wk();mlFx(typeof penGive==="function"?penGive:null,b,"quy","bị vu ăn cắp",t);
  if(roll(B.frameOut)&&t!==S){t.staff.splice(t.staff.indexOf(b),1);mlC("frameOut")}if(see)ev+=`${a.name} (cung ${NM(p)}) vu cho ${b.name} (cung ${NM(t)}) ăn cắp; ${b.name} bị phạt quỳ${t===S?" (ngươi có thể Che chở trong mục Cung nhân)":""}. `}
 else{mlFx(typeof pzGive==="function"?pzGive:null,b,1,"bị bỏ độc vào bát cơm",p);if(roll(B.poisonDie)){(t.staff||[]).splice(t.staff.indexOf(b),1);mlC("poisonDie");if(see)ev+=`${b.name} (cung ${NM(t)}) ăn bát cơm ${a.name} (cung ${NM(p)}) đưa sang, không qua khỏi. `}
  else if(see)ev+=`${b.name} (cung ${NM(t)}) trúng độc trong bát cơm, môi tím tái mấy ngày. `;if(t===S&&roll(B.feudEv))evA(S,p,1)}
 return ev}
/* 4. a consort targets another palace's maid */
function mlHit(p){const B=mlB();if(p===S||!roll(B.hit))return"";const t=pickTarget(p);if(!t||!(t.staff||[]).some(x=>x.role==="maid"))return"";const s=pick(t.staff.filter(x=>x.role==="maid"));if(!s)return"";
 const tr=typeof traitsOf==="function"?traitsOf(p):[p.trait];const cruel=tr.some(x=>x==="Hiểm độc"||x==="Kiêu ngạo");const k=(p.bac||0)>=60&&roll(40)?"bribe":cruel&&roll(55)?"beat":"frame";mlC("hit_"+k);let ev="";const see=mlSee(t);
 if(k==="bribe"){const r=bribeServ(p,s);if(t===S&&r&&s.spyFor!==key(p))ev+=r}
 else if(k==="beat"){mlFx(typeof slapGive==="function"?slapGive:null,s,p,`bị ${p.name} đánh`);s.loyal=cl(s.loyal+3,0,100);if(roll(B.hitEv))evA(t,p,1);
  if(see)ev+=`${p.name} gặp ${s.name} (cung ${NM(t)}) giữa đường, bắt quỳ, sai vả miệng${t===S?"; nàng về khóc với ngươi (lòng +3)":""}. `}
 else{s.loyal=cl(s.loyal-B.frameLoy,0,100);s.trouble=wk();mlFx(typeof penGive==="function"?penGive:null,s,"quy",`bị ${p.name} vu tội`,p);if(t!==S&&roll(B.frameOut)){t.staff.splice(t.staff.indexOf(s),1);mlC("frameOut")}
  if(see)ev+=`Người của ${p.name} vu cho ${s.name} (cung ${NM(t)}) làm vỡ đồ ngự tứ; ${s.name} bị phạt${t===S?" (ngươi có thể Che chở trong mục Cung nhân)":""}. `}
 return ev}
function mlMonth(){if(!mlOn())return"";let ev="";try{for(const p of consorts()){if(!p||!p.staff)continue;if(p!==S&&(!p.alive||p.out))continue;ev+=mlSeek(p);ev+=mlFeud(p);ev+=mlHit(p)}}catch(e){console.error("mlMonth",e)}return ev}
(function(){const m0=servMonth;servMonth=function(){const r=m0.apply(this,arguments)||"";return r+mlMonth()}})();
