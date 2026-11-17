/* ================= jslap: TÁT AS A SHORT GAME (owner 16/11, review/slap-mg) — KIT §79 =================
   Her slap (jface act "tat") = a power bar of about 3 s on the shared j82 mini-game frame (kg82Open / kg82Play / kg82Canvas / tsRows / .kbtn): a needle swings, one tap.
   Tap in the red zone = nặng, in the amber = vừa, anywhere else (or too late) = nhẹ. "Tát luôn" skips the game and gives nhẹ (see BAL.slap.def: a lazy slap is a light one,
   so a harder slap is something she CHOOSES to risk for its cost; a random tier would make skipping a free gamble and the game pointless).
   An NPC's slap on her: the tier is rolled (BAL.slap.npc by rank gap); she gets a card "Né đòn" -> a quick dodge game (the same needle engine, a green zone to hit)
   that lowers the tier by one (a nhẹ slap misses altogether); "Chịu đòn" / closing = no dodge. Numbers: BAL.slap (jbal2). Effects: jface (slapGive, act tat, marks).
   Co-op: an act on the friend goes through the existing runAct path (jcoopworld sends the number deltas); the mark tier rides on the same "res" message. */
const SLAPG={busy:0};window.SLAPG=SLAPG;
/* r3 (reviewer, ONE CORE OD:L1267): the game length in the words is printed from BAL.slap.bar.ms / dodge.ms (kitNumVi), never typed */
const slapSec=ms=>(typeof kitNumVi==="function"?kitNumVi(Math.round(ms/1000)):Math.round(ms/1000))+" giây";
KG82_KIND.tat={e:"slapbar",n:"Tát",t:"Giáng tay",how:`Kim chạy qua lại trên thước. Chạm đúng lúc kim lướt qua giữa vùng đỏ: càng trúng giữa, tay càng nặng. Chỉ một lần chạm, chừng ${slapSec(BAL.slap.bar.ms)}.`};
KG82_KIND.ne={e:"slapbar",n:"Né",t:"Né đòn",how:`Kim chạy qua lại trên thước. Chạm khi kim vào vùng xanh để né kịp. Chỉ một lần chạm, chừng ${slapSec(BAL.slap.dodge.ms)}.`};
/* skill + stakes (r2, owner OD:L1255 / L1266, ONE tier system = jmgt mgTier of review/mg-balance): the art that steadies a hand is Vũ (like Bắn cung, j82 "ban");
   occasion keys "tat" (her slap: stakes rise with HER rank, more eyes on her) and "ne" (a dodge: stakes = the ATTACKER's rank), numbers in BAL.mgTier.occ (jbal2). */
KG82_F.tat=[["suc",.4],["vu",4]];KG82_F.ne=[["suc",.4],["vu",4]];
try{if(typeof MGT_OCCN!=="undefined"){MGT_OCCN.tat="giáng tay";MGT_OCCN.ne="né đòn"}}catch(e){}
/* painted parts (r2): board/left picture img/kit/mg-tat-bg.webp · mg-ne-bg.webp (kg82Pic), sprites below. Until they are painted the board falls back to the kit silk
   (kg82Bg) and the ruler / zones / hand to plain shapes; every missing one is listed once in CTM_MISSING_PICS (kind "mg") — ART NEEDED in dev/PROGRESS_review-slap-mg-r2.md. */
KG82_SPR.tat=["tat-ruler","tat-hand","tat-zone-red","tat-zone-amber"];KG82_SPR.ne=["tat-ruler","tat-hand","ne-zone-green"];
function slapE(arr,e){const i=cl(+e||0,0,arr.length-1),a=Math.floor(i),b=Math.min(arr.length-1,a+1);return arr[a]+(arr[b]-arr[a])*(i-a)}   /* BAL.slap.* tables by ease 0..5 */
function slapTierOf(raw){const R=BAL.slap.raw;return raw>=R[3]-1?3:raw>=R[2]-1?2:1}
/* the tier of the next slap game: mgTier when mg-balance is in, else the matching level (Vừa) */
function slapMg(dodge,a){const kind=dodge?"ne":"tat";const o={occ:kind};if(dodge&&a&&typeof rkOf==="function")o.rank=rkOf(a);
 if(typeof mgTier==="function")return mgTier(kind,o);const m=BAL.mgTier?BAL.mgTier.mid:2;return{occ:kind,occName:kind==="ne"?"né đòn":"giáng tay",tier:1,word:"Vừa",ease:m,lv:0,d:0}}
window.slapMg=slapMg;
/* the engine: ONE needle, ONE tap. env.lv = the ease (mgSet). tat: raw BAL.slap.raw[3] red / [2] amber / [1] else / [0] too late; ne: raw[3] inside the green zone, else 0.
   Zones are TIME windows round the moment the needle crosses their centre (BAL.slap.bar.redMs / amberMs, dodge.safeMs, by ease), turned into widths at that speed,
   so the measured rates do not depend on the screen size. First play of each kind: the one-screen demo card (j91 k91DemoCard, S.mgSeen); the clock starts after it.
   Idle hint: no tap for BAL.slap.hint[tier] ms → the zone glows and the line says where to tap. Gọn / reduced motion (kfStill): no pops, the zone glow is still. */
function kg82SlapBar(box,env){KG82.slapHint=false;KG82.slapEnd=null;KG82.slapDemo=false;const dodge=env.kind==="ne",B=BAL.slap,D=dodge?B.dodge:B.bar,R=B.raw,ease=env.lv||0;
 const tier=KG82.tier&&KG82.tier.tier!=null?KG82.tier.tier:1,still=typeof kfStill==="function"?kfStill():!!(typeof OPT!=="undefined"&&OPT.fxon===false);
 const C=kg82Canvas(box,(innerHeight||800)<520?.3:.46,250),{g,W,H}=C;const w=slapE(D.w,ease);
 const A=W*.42,cx=W/2,by=H*.52,bh=Math.max(26,H*.16);let t0=performance.now();const ph=Math.random()*6.283;
 /* dodge: the green zone sits off-centre; its width is the time window at the needle's speed there */
 const zs=dodge?(Math.random()*2-1)*D.off:0,zx=cx+A*zs,cosz=Math.sqrt(Math.max(.05,1-zs*zs));
 const half=ms=>Math.min(.95,Math.sin(Math.min(1.5,w*ms))*(dodge?cosz:1));
 const zr=dodge?half(slapE(D.safeMs,ease)):half(slapE(D.redMs,ease)),za=dodge?0:half(slapE(D.amberMs,ease));
 let stop=false,raf=0,lock=false,hitX=0,tAct=t0,resT=null;const pops=[];const pos=now=>cx+A*Math.sin(ph+(now-t0)*w);
 const red=kg82Col("--red","#c23b22"),gold=kg82Col("--gold","#b8872a"),good=kg82Col("--good","#2d7a52"),ink="#5a3a14";
 const zoneOf=x=>{const u=Math.abs(x-(dodge?zx:cx))/A;return dodge?(u<=zr?R[3]:0):(u<=zr?R[3]:u<=za?R[2]:R[1])};
 const dm=typeof k91DemoCard==="function"?k91DemoCard(box,env.kind,{title:dodge?"CÁCH CHƠI: NÉ ĐÒN":"CÁCH CHƠI: GIÁNG TAY",done:()=>{t0=tAct=performance.now()},
  lines:dodge?["Kim chạy qua lại trên thước. Có một vùng xanh.","Chạm một lần khi kim vào vùng xanh là né kịp.","Chần chừ lâu, vùng xanh sẽ sáng lên chỉ chỗ."]
   :["Kim chạy qua lại trên thước. Giữa thước là vùng đỏ, hai bên vùng vàng.","Chạm một lần đúng lúc kim lướt qua giữa: đỏ là tay nặng, vàng là tay vừa, ngoài là tay nhẹ.","Không chạm thì tay nhẹ. Chần chừ lâu, vùng đỏ sẽ sáng lên chỉ chỗ."],
  art:(g2,W2,H2,now)=>{const a=W2*.3,x0=W2/2,y0=58,h0=16;g2.fillStyle="rgba(120,86,40,.18)";g2.fillRect(x0-a,y0-h0/2,a*2,h0);
   if(dodge){g2.fillStyle=good;g2.globalAlpha=.6;g2.fillRect(x0+a*.3-a*.15,y0-h0/2,a*.3,h0)}else{g2.fillStyle=gold;g2.globalAlpha=.55;g2.fillRect(x0-a*.3,y0-h0/2,a*.6,h0);g2.fillStyle=red;g2.globalAlpha=.8;g2.fillRect(x0-a*.1,y0-h0/2,a*.2,h0)}
   g2.globalAlpha=1;KG82.slapDemo=true;const nx=x0+a*Math.sin(still?.35:now/520);g2.fillStyle="#3a2412";g2.fillRect(nx-1.5,y0-h0/2-4,3,h0+8);return y0+h0+26}}):null;
 const ruler=(x,y,ww,hh)=>{if(!kg82Spr(g,"tat-ruler",x+ww/2,y+hh/2,ww*1.08,hh*1.9)){g.fillStyle="rgba(120,86,40,.18)";g.fillRect(x,y,ww,hh);g.strokeStyle="#8a6a30";g.lineWidth=2;g.strokeRect(x,y,ww,hh)}};
 const zone=(n,col,al,x,hw)=>{if(!kg82Spr(g,n,x,by,hw*2,bh,{alpha:.9})){g.fillStyle=col;g.globalAlpha=al;g.fillRect(x-hw,by-bh/2,hw*2,bh);g.globalAlpha=1}};
 function draw(now){kg82Bg(g,W,H,env.kind,.35);
  ruler(cx-A,by-bh/2,A*2,bh);
  if(dodge)zone("ne-zone-green",good,.55,zx,A*zr);else{zone("tat-zone-amber",gold,.5,cx,A*za);zone("tat-zone-red",red,.78,cx,A*zr)}
  const idle=!lock&&!(dm&&dm.on)&&now-tAct>B.hint[tier];if(idle)KG82.slapHint=true;
  if(idle){const hw=A*(dodge?zr:za),x=(dodge?zx:cx);if(still){g.save();g.strokeStyle="#e0a526";g.lineWidth=3.5;g.strokeRect(x-hw-3,by-bh/2-3,hw*2+6,bh+6);g.restore()}else if(typeof k91Glow==="function")k91Glow(g,x-hw,by-bh/2,hw*2,bh,now)}
  const x=lock?hitX:pos(now);
  if(!kg82Spr(g,"tat-hand",x,by-bh/2-4,null,bh*1.25,{ay:1})){g.fillStyle="#3a2412";g.beginPath();g.moveTo(x,by-bh/2-2);g.lineTo(x-9,by-bh/2-18);g.lineTo(x+9,by-bh/2-18);g.closePath();g.fill()}
  g.fillStyle="#3a2412";g.fillRect(x-1.5,by-bh/2-2,3,bh+4);
  g.font=`700 13px ${kg82Col("--display","serif")}`;g.textAlign="center";g.fillStyle=ink;
  kg82Lbl(g,idle?(dodge?"Vùng xanh đang sáng: chạm khi kim vào đó":"Giữa thước đang sáng: chạm khi kim lướt qua vùng đỏ"):(dodge?"Chạm khi kim vào vùng xanh":"Chạm khi kim lướt qua giữa vùng đỏ"),W/2,H*.2,W-24);
  if(resT){g.font=`700 16px ${kg82Col("--display","serif")}`;g.fillStyle=resT[1];kg82Lbl(g,resT[0],W/2,H*.82)}else kg82DrawPops(g,pops,now);
  if(dm&&dm.on)dm.draw(g,W,H,now)}
 function end(raw,txt,col){if(stop)return;lock=true;KG82.slapEnd={still,txt};if(still)resT=[txt,col];else kg82Pop(pops,W/2,H*.82,txt,col);draw(performance.now());stop=true;setTimeout(()=>env.end(raw),B.endMs)}
 function tap(){if(lock||stop||(dm&&dm.on))return;const now=performance.now();hitX=pos(now);const raw=zoneOf(hitX);lock=true;
  if(dodge)end(raw,raw?"Né kịp!":"Không kịp",raw?good:red);else{const s=slapTierOf(raw);end(raw,["","Nhẹ tay","Vừa tay","Nặng tay!"][s],[ink,ink,gold,red][s])}}
 function frame(now){if(stop)return;if(lock||(dm&&dm.on)){draw(now);raf=requestAnimationFrame(frame);return}const tt=now-t0;
  if(tt>D.ms){lock=true;hitX=pos(now);end(dodge?0:R[0],dodge?"Không kịp":"Chậm quá, tay nhẹ",red);return}
  env.hud({score:"–/10",round:"Hồi 1/1",time:`${Math.max(0,Math.ceil((D.ms-tt)/1000))} giây`});draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();tap()});const kd=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();tap()}};document.addEventListener("keydown",kd);
 /* test/measure oracle: {x,y} = the zone centre on screen, at = ms until the needle next crosses it (≥ BAL.slap.see ms ahead: a person sees it coming) */
 KG82.peek=()=>{if(lock||stop||(dm&&dm.on))return null;const now=performance.now(),th=ph+(now-t0)*w,P=2*Math.PI,s0=Math.asin(cl(zs,-1,1));let best=1e9;
  for(const s of [s0,Math.PI-s0])for(let k=-1;k<4;k++){const tg=s+k*P;const dt=(tg-th)/w;if(dt>=B.see&&dt<best)best=dt}
  const c=C.client(dodge?zx:cx,by);return{x:c.x,y:c.y,at:best}};
 window.__slapTap=tap;raf=requestAnimationFrame(frame);
 return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd);if(window.__slapTap===tap)window.__slapTap=null}}
KG82_ENG.slapbar=kg82SlapBar;
/* slapGame({dodge, by, rows, go, skip, skipSub, onDone({raw, skipped})}) — intro card (kit rows + the tier row "Độ khó" + two .kbtn) with the painted picture LEFT
   (kg82Pic, OD:L999), the game, then straight on (no result card: the act's own card follows). by = the attacker (dodge stakes). */
function slapGame(o){const kind=o.dodge?"ne":"tat",skipRes={raw:0,skipped:true};
 if(typeof window.__bot!=="undefined"||typeof kg82Open!=="function"){setTimeout(()=>o.onDone(skipRes),0);return}
 KG82.ctx="hoc";const t=slapMg(o.dodge,o.by);KG82.tier=t;KG82.lv=t.ease;KG82.occ=t.occ;const K=KG82_KIND[kind];
 const d=kg82Open({art:o.dodge?"Né":"Tát",title:o.title,how:K.how,pic:typeof kg82Pic==="function"?kg82Pic(kind):""});if(!d){o.onDone(skipRes);return}const box=kg82Box();
 kg82Preload(kind).then(()=>{try{if(typeof kitPhNote==="function")[kg82BgName(kind)].concat(KG82_SPR[kind]).forEach(n=>{if(!kg82Ok(n))kitPhNote("mg",n,"light",K.t)})}catch(e){}});
 const diff=typeof mgDiffTxt==="function"?mgDiffTxt(t):`${t.word} · ${t.occName}`;
 KG82.phase="intro";box.innerHTML=tsRows([["Độ khó",diff,""]].concat(o.rows))+`<div class="kg82act"><button class="kbtn" id="kg82go">${o.go}</button><button class="kbtn alt" id="kg82skip">${o.skip}<small>${o.skipSub}</small></button></div>`;
 /* r3 (reviewer, owner OD:L1261 "every scene ends with ONE button"; same as every j82 game, playArt "Đã hiểu"): the game no longer closes by itself —
    the result row stays with ONE button; only it closes the game and the act's own card follows */
 $("kg82go").onclick=()=>kg82Play(kind,raw=>{KG82.phase="result";const R3=BAL.slap.raw,s=slapTierOf(raw);
  const row=o.dodge?(raw>=R3[3]?["Kết quả","Né kịp: cái tát nhẹ đi một bậc","g"]:["Kết quả","Không kịp: nhận trọn cái tát","r"]):["Kết quả",`Tay ${BAL.slap.nm[s]}`,"r"];
  kg82ShowRes(kg82Rows([row])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`);kg82Set("time","đã hết");
  $("kg82ok").onclick=()=>{kg82Close();try{o.onDone({raw,skipped:false})}catch(e){console.error(e)}}});
 $("kg82skip").onclick=()=>{kg82Close();try{o.onDone(skipRes)}catch(e){console.error(e)}}}
window.slapGame=slapGame;
/* ---------- her slap: the game decides the tier ---------- */
(function(){const d0=doAct;doAct=function(i,k){
 if(k!=="tat"||SLAPG.busy||typeof window.__bot!=="undefined"||typeof kg82Open!=="function")return d0.apply(this,arguments);
 const v=rivals[i],a=ACT.tat,self=this,args=arguments;if(!v||!a||!can(BAL.actK)||S.dead||Q.length||!v.alive||v.out||!a.ok(S,v))return d0.apply(this,arguments);
 const B=BAL.slap;SLAPG.busy=1;
 slapGame({title:"Giáng tay",by:S,go:"Giơ tay",skip:"Tát luôn",skipSub:"không chơi: tay nhẹ",rows:[
  ["Vùng đỏ",`tay nặng: Đức ${B.duc[3]}, oán sâu, dấu tay đậm sưng đỏ ${B.wk[3]} tuần, dễ bị tố giác, Thái hậu có thể quở`,"r"],
  ["Vùng vàng",`tay vừa: Đức ${B.duc[2]}, dấu tay đậm ${B.wk[2]} tuần`,"r"],
  ["Ngoài vùng",`tay nhẹ: Đức ${B.duc[1]}, dấu tay mờ ${B.wk[1]} tuần`,"r"]],
  onDone:res=>{SLAPG.busy=0;SLAP.next=res.skipped?B.def:slapTierOf(res.raw);try{d0.apply(self,args)}finally{SLAP.next=0}}})}})();
/* ---------- an NPC slaps her: tier rolled, she may dodge ---------- */
function slapNpcTier(a){if(typeof mg2On==="function"&&mg2On())return slapNpcDraw(a);/* AG-ALL-2b mg2: her game, one draw */const gap=Math.max(1,(typeof rkOf==="function"?rkOf(a)-rkOf(S):1)),w=BAL.slap.npc[Math.min(gap,3)-1];let r=Math.random()*(w[1]+w[2]+w[3]);for(let i=1;i<=3;i++){if(r<w[i])return i;r-=w[i]}return 1}
window.slapNpcTier=slapNpcTier;
(function(){const r0=runAct;runAct=function(a,t,k,extra){
 if(k!=="tat"||t!==S||!a||a===S||SLAPG.npcDone)return r0.apply(this,arguments);
 const sev=slapNpcTier(a),self=this,B=BAL.slap;
 const bot=typeof window.__bot!=="undefined"||typeof kg82Open!=="function"||typeof pushModal!=="function"||typeof tsRows!=="function";
 const fin=(s)=>{let r="";SLAPG.npcDone=1;try{if(s<=0){if(typeof ducAdd==="function")ducAdd(a,B.duc[1],"tát hụt");r=`<span class="g">${NMc(a)} giơ tay tát ngươi nhưng ngươi né kịp, cái tát hụt.</span> `;relAdd(S,a,B.missRel)}
   else{SLAP.next=s;try{r=r0.call(self,a,t,k,extra)}finally{SLAP.next=0}}}finally{SLAPG.npcDone=0}return r};
 if(bot)return fin(sev);
 const who=typeof pv==="function"?pv(a):undefined;const show=r=>{if(r){log(r);pushModal({t:"Bị tát",who,h:`<p>${r}</p>`});showModal();render()}};
 const nm=a.name||"Nàng";
 pushModal({t:"Bị tát",who:typeof pv==="function"?pv(a):undefined,h:`<p>${nm} bước tới, giơ cao bàn tay. Ngươi có kịp né không?</p>`,opts:[
  Object.assign(tsOpt({n:"Né đòn",odds:B.dodgeOdds[slapMg(true,a).tier],later:1,duoc:["cái tát nhẹ đi một bậc","tát nhẹ thì hụt hẳn"],mat:["chịu trọn cái tát"],kem:[`một ván ngắn chừng ${slapSec(B.dodge.ms)}`],go:()=>{
    slapGame({dodge:true,by:a,title:"Né đòn",go:"Né",skip:"Chịu đòn",skipSub:"không né",rows:[["Né kịp","cái tát nhẹ đi một bậc; tát nhẹ thì hụt hẳn","g"],["Không né","nhận trọn cái tát","r"]],
     onDone:res=>show(fin(res.skipped||res.raw<B.raw[3]?sev:sev-1))})}}),{}),
  tsOpt({n:"Chịu đòn",odds:null,kem:["không né, nhận trọn cái tát"],go:()=>{const r=fin(sev);if(r){log(r);pushModal({t:"Bị tát",who,h:`<p>${r}</p>`})}}})]});
 return""}})();
/* ---------- co-op: the tier of a slap on the friend rides on the existing "res" message ---------- */
(function(){try{if(typeof COOP==="undefined"||!COOP.send||!COOP.on)return;const s0=COOP.send;
 COOP.send=function(m){try{if(m&&m.t==="res"&&m.k==="tat"&&window.__slapLast)m.slap=window.__slapLast}catch(e){}return s0.apply(this,arguments)};
 COOP.on("res",m=>{try{const W=window.COOPW;if(!W||!W.on||m.from===W.seat||m.k!=="tat"||!m.slap||!S||S.dead)return;slapGive(S,null,"",m.slap)}catch(e){console.error(e)}})}catch(e){}})();
(function(){const f=ACT.tat.f;ACT.tat.f=function(a,t){const r=f.apply(this,arguments);try{window.__slapLast=t&&t.slap?t.slap.sev:null}catch(e){}return r}})();
/* ---------- AG-ALL-2b mg2 (owner OD 17/11 ~15:25Z (3) "lúc nào tôi có thì NPC cũng phải có … đổ xí ngầu cho nó … công bằng với tôi") ----------
   An NPC's slap = ONE draw from her power-bar game as measured (BAL.ag.mg2.tat: [nhẹ, vừa, nặng] % of the skilled bot by board ease), on the board she would
   get in that seat (mgTier "tat": the slapper's rank and Vũ / Sức — slapMg for her). Whoever is slapped by her or by an NPC dodges as she can: one roll
   of BAL.slap.dodgeOdds[tier of the "ne" board: the target's Vũ, the slapper's rank] (her own card odds); a dodge lowers the tier by one, a dodged nhẹ misses.
   Off (agOn false) = the old BAL.slap.npc weights, NPC targets never dodge, an NPC's slap on an NPC is nhẹ (B.def). */
function slapNpcDraw(a){const T=BAL.ag.mg2.tat,E=T.e,e=cl(mgTier("tat",{occ:"tat",p:a}).ease,E[0],E[E.length-1]);let i=0;while(i<E.length-2&&e>E[i+1])i++;
 const f=(e-E[i])/(E[i+1]-E[i]),w=T.w[i].map((x,j)=>x+(T.w[i+1][j]-x)*f);let r=Math.random()*(w[0]+w[1]+w[2]);for(let j=0;j<3;j++){if(r<w[j])return j+1;r-=w[j]}return 1}
function slapNeOdds(t,a){const D=BAL.slap.dodgeOdds;return D[mgTier("ne",{occ:"ne",p:t,rank:typeof rkOf==="function"?rkOf(a):0}).tier]}
window.slapNpcDraw=slapNpcDraw;window.slapNeOdds=slapNeOdds;
(function(){const r0=runAct;runAct=function(a,t,k,extra){
 if(k!=="tat"||!a||!t||t===S||t.coop||a.coop||SLAPG.npcDone||!(typeof mg2On==="function"&&mg2On()))return r0.apply(this,arguments);
 const B=BAL.slap;let sev=a===S?cl(SLAP.next|0||B.def,1,3):slapNpcTier(a);
 if(roll(slapNeOdds(t,a))){sev--;if(sev<=0){if(typeof ducAdd==="function")ducAdd(a,B.duc[1],"tát hụt");relAdd(t,a,B.missRel);SLAP.next=0;
  const m=`${NMc(a)} giơ tay tát ${NM(t)} nhưng ${NM(t)} né kịp, cái tát hụt.`;return a===S?`<span class="r">${m}</span> `:m+" "}}
 SLAP.next=sev;try{return r0.apply(this,arguments)}finally{SLAP.next=0}}})();
