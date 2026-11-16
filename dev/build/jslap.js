/* ================= jslap: TÁT AS A SHORT GAME (owner 16/11, review/slap-mg) — KIT §76 =================
   Her slap (jface act "tat") = a power bar of about 3 s on the shared j82 mini-game frame (kg82Open / kg82Play / kg82Canvas / tsRows / .kbtn): a needle swings, one tap.
   Tap in the red zone = nặng, in the amber = vừa, anywhere else (or too late) = nhẹ. "Tát luôn" skips the game and gives nhẹ (see BAL.slap.def: a lazy slap is a light one,
   so a harder slap is something she CHOOSES to risk for its cost; a random tier would make skipping a free gamble and the game pointless).
   An NPC's slap on her: the tier is rolled (BAL.slap.npc by rank gap); she gets a card "Né đòn" -> a quick dodge game (the same needle engine, a green zone to hit)
   that lowers the tier by one (a nhẹ slap misses altogether); "Chịu đòn" / closing = no dodge. Numbers: BAL.slap (jbal2). Effects: jface (slapGive, act tat, marks).
   Co-op: an act on the friend goes through the existing runAct path (jcoopworld sends the number deltas); the mark tier rides on the same "res" message. */
const SLAPG={busy:0};window.SLAPG=SLAPG;
KG82_KIND.tat={e:"slapbar",n:"Tát",t:"Giáng tay",how:"Kim chạy qua lại trên thước. Chạm khi kim vào vùng đỏ: tay càng trúng giữa, đòn càng nặng. Chỉ một lần chạm, chừng ba giây."};
KG82_KIND.ne={e:"slapbar",n:"Né",t:"Né đòn",how:"Kim chạy qua lại trên thước. Chạm khi kim vào vùng xanh để né kịp. Chỉ một lần chạm, chừng ba giây."};
KG82_SPR.tat=[];KG82_SPR.ne=[];
(function(){const p0=kg82Preload;kg82Preload=function(kind){return kind==="tat"||kind==="ne"?Promise.resolve():p0.apply(this,arguments)}})();
function slapTierOf(raw){return raw>=9?3:raw>=5?2:1}
/* the engine: ONE needle, ONE tap. tat: raw 10 red / 6 amber / 2 else / 0 too late; ne: raw 10 inside the green zone, else 0 */
function kg82SlapBar(box,env){const dodge=env.kind==="ne",B=BAL.slap,D=dodge?B.dodge:B.bar;const C=kg82Canvas(box,(innerHeight||800)<520?.3:.46,250),{g,W,H}=C;
 const A=W*.42,cx=W/2,by=H*.52,bh=Math.max(26,H*.16);const t0=performance.now(),ph=Math.random()*6.283;const zx=dodge?cx+A*(Math.random()*1.1-.55):cx;
 let stop=false,raf=0,lock=false,hitX=0;const pops=[];const pos=now=>cx+A*Math.sin(ph+(now-t0)*D.w);
 const red=kg82Col("--red","#c23b22"),gold=kg82Col("--gold","#b8872a"),good=kg82Col("--good","#2d7a52");
 const zoneOf=x=>dodge?(Math.abs(x-zx)<=A*D.safe?10:0):(Math.abs(x-cx)/A<=B.bar.red?10:Math.abs(x-cx)/A<=B.bar.amber?6:2);
 function draw(now){kg82Silk(g,W,H,"#f6ead6","#ead6b4");
  g.fillStyle="rgba(120,86,40,.18)";g.fillRect(cx-A,by-bh/2,A*2,bh);
  if(dodge){g.fillStyle=good;g.globalAlpha=.55;g.fillRect(zx-A*D.safe,by-bh/2,A*D.safe*2,bh);g.globalAlpha=1}
  else{g.fillStyle=gold;g.globalAlpha=.5;g.fillRect(cx-A*B.bar.amber,by-bh/2,A*B.bar.amber*2,bh);g.fillStyle=red;g.globalAlpha=.75;g.fillRect(cx-A*B.bar.red,by-bh/2,A*B.bar.red*2,bh);g.globalAlpha=1}
  g.strokeStyle="#8a6a30";g.lineWidth=2;g.strokeRect(cx-A,by-bh/2,A*2,bh);
  const x=lock?hitX:pos(now);g.fillStyle="#3a2412";g.beginPath();g.moveTo(x,by-bh/2-2);g.lineTo(x-9,by-bh/2-18);g.lineTo(x+9,by-bh/2-18);g.closePath();g.fill();g.fillRect(x-1.5,by-bh/2-2,3,bh+4);
  g.font=`700 13px ${kg82Col("--display","serif")}`;g.textAlign="center";g.fillStyle="#5a3a14";kg82Lbl(g,dodge?"Chạm khi kim vào vùng xanh":"Chạm khi kim vào vùng đỏ",W/2,H*.2);kg82DrawPops(g,pops,now)}
 function end(raw,txt,col){if(stop)return;lock=true;draw(performance.now());kg82Pop(pops,W/2,H*.82,txt,col);draw(performance.now());stop=true;setTimeout(()=>env.end(raw),750)}
 function tap(){if(lock||stop)return;const now=performance.now();hitX=pos(now);const raw=zoneOf(hitX);lock=true;
  if(dodge)end(raw,raw?"Né kịp!":"Không kịp",raw?good:red);else end(raw,raw>=9?"Nặng tay!":raw>=5?"Vừa tay":"Nhẹ tay",raw>=9?red:raw>=5?gold:"#5a3a14")}
 function frame(now){if(stop)return;if(lock){draw(now);raf=requestAnimationFrame(frame);return}const tt=now-t0;
  if(tt>D.ms){lock=true;hitX=pos(now);end(0,dodge?"Không kịp":"Chậm quá, tay nhẹ",red);return}
  env.hud({score:"–/10",round:"Hồi 1/1",time:`${Math.max(0,Math.ceil((D.ms-tt)/1000))} giây`});draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();tap()});const kd=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();tap()}};document.addEventListener("keydown",kd);
 KG82.peek=()=>{if(lock||stop)return null;const x=pos(performance.now());return zoneOf(x)===10?C.client(x,by):null};
 window.__slapTap=tap;raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd);if(window.__slapTap===tap)window.__slapTap=null}}
KG82_ENG.slapbar=kg82SlapBar;
/* slapGame({dodge, rows, go, skip, skipSub, onDone({raw, skipped})}) — intro card with two buttons, the game, then straight on (no result card: the act's own card follows) */
function slapGame(o){const kind=o.dodge?"ne":"tat",skipRes={raw:0,skipped:true};
 if(typeof window.__bot!=="undefined"||typeof kg82Open!=="function"){setTimeout(()=>o.onDone(skipRes),0);return}
 KG82.ctx="hoc";KG82.lv=0;const K=KG82_KIND[kind];const d=kg82Open({art:o.dodge?"Né":"Tát",title:o.title,how:K.how});if(!d){o.onDone(skipRes);return}const box=kg82Box();
 KG82.phase="intro";box.innerHTML=tsRows(o.rows)+`<div class="kg82act"><button class="kbtn" id="kg82go">${o.go}</button><button class="kbtn alt" id="kg82skip">${o.skip}<small>${o.skipSub}</small></button></div>`;
 $("kg82go").onclick=()=>kg82Play(kind,raw=>{kg82Close();try{o.onDone({raw,skipped:false})}catch(e){console.error(e)}});
 $("kg82skip").onclick=()=>{kg82Close();try{o.onDone(skipRes)}catch(e){console.error(e)}}}
window.slapGame=slapGame;
/* ---------- her slap: the game decides the tier ---------- */
(function(){const d0=doAct;doAct=function(i,k){
 if(k!=="tat"||SLAPG.busy||typeof window.__bot!=="undefined"||typeof kg82Open!=="function")return d0.apply(this,arguments);
 const v=rivals[i],a=ACT.tat,self=this,args=arguments;if(!v||!a||!can(2)||S.dead||Q.length||!v.alive||v.out||!a.ok(S,v))return d0.apply(this,arguments);
 const B=BAL.slap;SLAPG.busy=1;
 slapGame({title:"Giáng tay",go:"Giơ tay",skip:"Tát luôn",skipSub:"không chơi: tay nhẹ",rows:[
  ["Vùng đỏ",`tay nặng: Đức ${B.duc[3]}, oán sâu, dấu tay đậm sưng đỏ ${B.wk[3]} tuần, dễ bị tố giác, Thái hậu có thể quở`,"r"],
  ["Vùng vàng",`tay vừa: Đức ${B.duc[2]}, dấu tay đậm ${B.wk[2]} tuần`,"t"],
  ["Ngoài vùng",`tay nhẹ: Đức ${B.duc[1]}, dấu tay mờ ${B.wk[1]} tuần`,"g"]],
  onDone:res=>{SLAPG.busy=0;SLAP.next=res.skipped?B.def:slapTierOf(res.raw);try{d0.apply(self,args)}finally{SLAP.next=0}}})}})();
/* ---------- an NPC slaps her: tier rolled, she may dodge ---------- */
function slapNpcTier(a){const gap=Math.max(1,(typeof rkOf==="function"?rkOf(a)-rkOf(S):1)),w=BAL.slap.npc[Math.min(gap,3)-1];let r=Math.random()*(w[1]+w[2]+w[3]);for(let i=1;i<=3;i++){if(r<w[i])return i;r-=w[i]}return 1}
window.slapNpcTier=slapNpcTier;
(function(){const r0=runAct;runAct=function(a,t,k,extra){
 if(k!=="tat"||t!==S||!a||a===S||SLAPG.npcDone)return r0.apply(this,arguments);
 const sev=slapNpcTier(a),self=this,B=BAL.slap;
 const bot=typeof window.__bot!=="undefined"||typeof kg82Open!=="function"||typeof pushModal!=="function"||typeof tsRows!=="function";
 const fin=(s)=>{let r="";SLAPG.npcDone=1;try{if(s<=0){if(typeof ducAdd==="function")ducAdd(a,B.duc[1],"tát hụt");r=`<span class="g">${NMc(a)} giơ tay tát ngươi nhưng ngươi né kịp, cái tát hụt.</span> `;relAdd(S,a,-5)}
   else{SLAP.next=s;try{r=r0.call(self,a,t,k,extra)}finally{SLAP.next=0}}}finally{SLAPG.npcDone=0}return r};
 if(bot)return fin(sev);
 const show=r=>{if(r){log(r);pushModal({t:"Bị tát",h:`<p>${r}</p>`});showModal();render()}};
 const nm=a.name||"Nàng";
 pushModal({t:"Bị tát",who:typeof pv==="function"?pv(a):undefined,h:`<p>${nm} bước tới, giơ cao bàn tay. Ngươi có kịp né không?</p>`,opts:[
  Object.assign(tsOpt({n:"Né đòn",odds:50,later:1,duoc:["cái tát nhẹ đi một bậc","tát nhẹ thì hụt hẳn"],mat:["chịu trọn cái tát"],kem:["một ván ngắn chừng ba giây"],go:()=>{
    slapGame({dodge:true,title:"Né đòn",go:"Né",skip:"Chịu đòn",skipSub:"không né",rows:[["Né kịp","cái tát nhẹ đi một bậc; tát nhẹ thì hụt hẳn","g"],["Không né","nhận trọn cái tát","r"]],
     onDone:res=>show(fin(res.skipped||res.raw<9?sev:sev-1))})}}),{}),
  tsOpt({n:"Chịu đòn",odds:null,kem:["không né, nhận trọn cái tát"],go:()=>{const r=fin(sev);if(r){log(r);pushModal({t:"Bị tát",h:`<p>${r}</p>`})}}})]});
 return""}})();
/* ---------- co-op: the tier of a slap on the friend rides on the existing "res" message ---------- */
(function(){try{if(typeof COOP==="undefined"||!COOP.send||!COOP.on)return;const s0=COOP.send;
 COOP.send=function(m){try{if(m&&m.t==="res"&&m.k==="tat"&&window.__slapLast)m.slap=window.__slapLast}catch(e){}return s0.apply(this,arguments)};
 COOP.on("res",m=>{try{const W=window.COOPW;if(!W||!W.on||m.from===W.seat||m.k!=="tat"||!m.slap||!S||S.dead)return;slapGive(S,null,"",m.slap)}catch(e){console.error(e)}})}catch(e){}})();
(function(){const f=ACT.tat.f;ACT.tat.f=function(a,t){const r=f.apply(this,arguments);try{window.__slapLast=t&&t.slap?t.slap.sev:null}catch(e){}return r}})();
