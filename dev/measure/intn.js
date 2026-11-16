/* intn.js — danh-p1 P2: a sensible player who also uses the Tài nghệ tab (Tứ đức courses + arts), like a real player readying
   for the promotion exam. Load after inpage6.js + inx.js (mkinp.sh MORE="indanh intn").
   - window.__xOpts(N) adds Tài nghệ options to the sensible bot's list (inpage6 sensibleStep hook); the bot then picks the best
     option as usual (cards, Tài nghệ, pop-ups by score).
   - Which course: the exam's own plan for her NEXT rank (jexam exPlan: EX_VIR[tier] two Tứ đức courses; tier 0 Thêu / Nấu,
     tier 1 her best Cầm kỳ thi họa art; tier 2 = Đức, no art), then everything else at a low weight.
   - How: the REAL buttons of the Tài nghệ cards (ktArtSkills, with every later wrapper: jtds/jrcp texts and the minigame
     "chơi một trò nhỏ"), put in the page and clicked, so the game's own click handlers run (no direct call of a study function).
     Prefers "Học với Thái hậu" (when open), then the teacher when Bạc ≥ fee + 40, else self study when Sức ≥ 45.
   - window.__tnOff = 1 turns the Tài nghệ options off (same harness, control arm).
   Per life (x.ix.exl): exams sat / passed for HER, and per exam the score parts (play, Tứ đức, art, attitude shift), bar, total. */
(function(){
 const I=()=>window.__ix||(window.__ix={});
 const lifeX=()=>{const x=I();return x.exl=x.exl||{sat:0,pass:0,L:[],tn:{}}};
 if(typeof exDone==="function"){const d0=exDone;exDone=function(p,r){try{if(p===S&&r&&r.P){const e=lifeX();e.sat++;if(r.pass)e.pass++;
   e.L.push({to:r.P.to,tier:r.P.tier,tot:Math.round(r.total*10)/10,bar:r.P.bar,vir:r.P.vir,art:r.P.art,sh:r.P.sh,ok:r.pass?1:0,
    vl:r.P.virL,al:r.P.artL,wk:(typeof wk==="function"?wk():0)})}}catch(e){}return d0.apply(this,arguments)}}
 function want(){/* course key → weight for the next exam */
  const W={};try{const to=rkOf(S)+1,tier=exTier(to);for(const k of (EX_VIR[tier]||[]))W["v:"+k]=2.6;
   if(tier===0){W["a:theu"]=(S.arts.theu||0)>=(S.arts.nau||0)?2.4:1.0;W["a:nau"]=(S.arts.nau||0)>(S.arts.theu||0)?2.4:1.0}
   else if(tier===1){let b="cam";for(const x of EX_CKTT)if((S.arts[x[0]]||0)>(S.arts[b]||0))b=x[0];W["a:"+b]=2.4}}catch(e){}return W}
 const fee=h=>{const m=/Bạc -(\d+)/.exec(h);return m?+m[1]:0};
 window.__xOpts=function(N){const out=[];if(window.__tnOff||!S||S.dead||Q.length||S.mg||S.out||S.srv||S.confined)return out;
  if(!can(2)||S.suc<45)return out;let L=[];try{L=ktArtSkills()}catch(e){return out}const W=want();
  for(const s of L){if(!s||(s.kind!=="vir"&&s.kind!=="art")||s.level>=5)continue;const key=(s.kind==="vir"?"v:":"a:")+s.k;const w=W[key]||0.5;
   const B=(s.acts||[]).filter(h=>/<button/.test(h)&&!/\bdisabled\b/.test(h)&&/data-(vlearn|learn)=/.test(h));if(!B.length)continue;
   const th=B.find(h=>/data-mode="th"/.test(h)),te=B.find(h=>/data-mode="(teacher|master)"/.test(h)),se=B.find(h=>/data-mode="self"/.test(h));
   let h=null;if(th)h=th;else if(te&&S.bac>=fee(te)+40)h=te;else if(se)h=se;if(!h)continue;
   /* score: like inpage6 lessons (2.0) × how much this course counts for her next exam, less when she already has it high */
   const sc=(1.2+w)*(1-(s.level||0)/6)-(S.suc<55?1.0:0);
   out.push({L:"n"+key,s:sc/Math.SQRT2,f:()=>{const e=lifeX();const mk=key+":"+(/data-mode="(\w+)"/.exec(h)||[])[1];e.tn[mk]=(e.tn[mk]||0)+1;
    const d=document.createElement("div");d.style.display="none";d.innerHTML=h;document.body.appendChild(d);try{const b=d.querySelector("button");b&&b.click()}finally{d.remove()}}})}
  return out};
 /* the study's work picker ("Học …: làm gì?", kit shop grid, no opts): a player picks the first piece she can make (then the
    material dialog has opts, and the minigame is "Để trời định" as every bot study/exam round) */
 window.__xModal=function(m){if(window.__tnOff)return false;try{if(document.getElementById("modal").hidden)showModal()}catch(e){}
  const g=[...document.querySelectorAll("#modal .kshc:not(.kshno) button.kshgo")].find(b=>!b.disabled);if(!g)return false;g.click();return true};
})();
