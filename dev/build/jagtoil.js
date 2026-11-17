/* ================= jagtoil: AG-ALL-2 G11 — THE NPC'S FACE OF THE DAY IS HER CHOICE (owner OD 17/11 ~14:50Z) =================
   "những NPC này cũng phải trả những cái giá và được mất giống tôi … nó lựa chọn theo tính cách của nó, hay là nó lúc nào cũng chọn lựa chọn tốt nhất?"
   CHOICE: each NPC consort, once a day (lazy, on the first need), weighs the player's own ways at the mirror (BAL.ag.toil2.opt: mặt mộc /
     Kiểu thanh nhã / Kiểu cầu kỳ / cầu kỳ phấn dày). Each way is scored by imagining a few sittings with HER hand (toilNpcSk) through the player's
     toilNpcPlay, judged by the REAL judgement of today's hosts (toilFx = jtoil + jmkt taste + jlux), plus what she expects from the consorts
     (mockery × her caution, envy × her vanity) and her nết (vanity / modesty). Weight → mindPick (BAL.mind.slip: she misjudges sometimes).
     The real sitting is the player's toilNpcPlay (seeded per person + day). Her dress stays her real clothes (j92 / jlux, under toilNpc).
     Cost: the sitting is the player's BAL.toil.khac of her day (kept on the record, rec.kh; the khắc ledger is jagent's).
   CONSEQUENCES (the same code as the player's): every buổi the agents' ledger (gmPlaces) says who stands together; a consort seen there is
     judged by Thái hậu / Hoàng thượng / Hoàng hậu present (toilJudgeNpc = toilFx + toilBack, once per host per day; a reprimand reaches the
     news) and by every other consort present (toilSeeRule = the player's toilRival rule): mockery of a Diêm dúa / Vụng về face (she answers by
     her nết with the player's three answers, toilAns), jealousy of a showy / Khuynh thành look, frugal praise / frown. NPC ↔ NPC has no ghen
     bar: jealousy lands on thiện cảm (affAdd), and "bớt ghen" eases only a hostility that exists. Two-way: if the player stands there she sees
     it in the log, otherwise it may reach her as news (newsAdd, her Tai mắt). Serving Thái hậu (SOC.serveTH) uses the same toilJudgeNpc.
   CO-OP: host only (agOn false on the guest). The record v.tl2 {wk,k,rec} lives on the NPC (synced with the world rivals at the week merge) and
     the host sends today's records with each buổi's "where" (jcoopworld sendWhere __tl2) → the guest stores them and only reads them.
   Fallback: BAL.ag.toil2.on = 0, BAL.ag.on = 0 or no record yet on the guest → jtoil toilNpc (the old hash look). Old saves: no v.tl2 → chosen
     on first need. Perf: one choice per NPC per day (est × 3 ways × hosts toilFx calls), one meeting pass per buổi (window.__tl2Ms). */
const TL2={hypo:null,stat:{pick:{},meet:0,tease:0,judge:0,ans:{}},ms:[]};
function tl2On(){try{return !!(BAL.ag&&BAL.ag.toil2&&BAL.ag.toil2.on)}catch(e){return false}}
function tl2Tr(v,f){let n=0;const T=BAL.ag.toil2.tr;for(const t of traitsOf(v)){const x=T[t];if(x&&x[f])n+=x[f]}return n}
/* the hosts whose verdict she weighs today, with weights (an NPC queen is a host for the others; the player is never weighed as a host) */
function tl2Hosts(v){const B=BAL.ag.toil2,L=[];try{if(!S.thDead)L.push(["th",B.host.thaihau]);const q=typeof qOn==="function"&&qOn()?rivals[0]:null;if(q&&q!==v&&q!==S&&!q.coop)L.push([q,B.host.hoanghau]);
  L.push(["emp",B.host.emp*(1+B.sungK*Math.max(0,(B.sungRef-(v.sung||0))/B.sungRef))])}catch(e){}return L}
/* utility of one imagined record: the real judgement (toilFx) of each host + the consorts + her nết */
function tl2Value(v,rec,o,H){const B=BAL.ag.toil2;let u=0;TL2.hypo={v,rec};
 try{for(const [h,w] of H){let t=null;try{t=toilFx(v,h,toilFOf(h),"ok")}catch(e){}if(t)u+=w*(t.aff||0)+(t.danh||0)}}finally{TL2.hypo=null}
 const mk=toilMk(rec),vain=tl2Tr(v,"v"),mod=tl2Tr(v,"m"),c=tl2Tr(v,"c");
 if(mk==="diem"||mk==="vung")u+=B.peer.tease*(1+c);if(rec.style==="showy"||mk==="tuyet")u+=B.peer.envy*vain;
 u+=vain*((B.vainMk[mk]||0)+(B.vainOpt[o]||0))+mod*(B.modOpt[o]||0);return u}
/* the face part of one sitting by way o (seed h): the player's toilNpcPlay */
function tl2Sit(v,base,o,h,sk,occ){const O=BAL.ag.toil2.opt[o];if(O.moc)return{makeup:false,score:0,look:null};const want=O.want||"";
 const L=TOIL_PRE.filter(x=>(x[2]==="diem")===(want==="diem"));const hh=wdHash(wdKey(v)+":"+toilWk());const col=Object.assign({},L[(hh>>>12)%L.length][4]);
 const R=toilNpcPlay(sk,h,col,want,base.style,occ,v.rank,O.cake?BAL.toil.play.cakeOver:undefined);
 const rec={makeup:true,score:R.score,look:R.look,col:Object.assign(col,want?{want}:{})};if(R.slip)rec.slip=R.slip;return rec}
/* HER CHOICE (host): weigh each way, pick by nết with a human slip, then sit (the same seed the old hash look used) */
function tl2Choose(v,base){const B=BAL.ag.toil2;const sk=toilNpcSk(v),occ=toilNpcOcc(),H=tl2Hosts(v),h=wdHash(wdKey(v)+":"+toilWk());let art=1;try{art=mindW(v,"art")}catch(e){}
 const O=[];for(const o in B.opt){let u=0;if(B.opt[o].moc)u=tl2Value(v,Object.assign({},base,tl2Sit(v,base,o,h,sk,occ)),o,H);
   else{for(let s=0;s<B.est;s++)u+=tl2Value(v,Object.assign({},base,tl2Sit(v,base,o,h+":e"+s,sk,occ)),o,H);u/=B.est}
  O.push([o,Math.max(B.wMin,B.base+B.k*u)*(B.opt[o].moc?1:art)])}
 const k=(typeof mindPick==="function"?mindPick(O,v):null)||O[0][0];const rec=tl2Sit(v,base,k,h,sk,occ);rec.k=k;rec.kh=BAL.toil.khac;
 TL2.stat.pick[k]=(TL2.stat.pick[k]||0)+1;v.tl2={wk:toilWk(),k,rec};return v.tl2}
/* toilNpc: the record of the day = her real clothes (base) + the face she chose */
(function(){if(typeof toilNpc!=="function")return;const n0=toilNpc;toilNpc=function(v){if(TL2.hypo&&TL2.hypo.v===v)return TL2.hypo.rec;
 const base=n0.apply(this,arguments);try{if(!tl2On()||!v||v.coop||v===S)return base;let z=v.tl2;
  if(!(z&&z.wk===toilWk()&&z.rec)){if(!agOn()||!toilOn(v))return base;z=tl2Choose(v,base)}
  const o=Object.assign({},base,{makeup:!!z.rec.makeup,score:z.rec.score|0,look:z.rec.look||null,k:z.k});delete o.slip;if(z.rec.slip)o.slip=z.rec.slip;
  if(z.rec.col)o.col=Object.assign({},z.rec.col);return o}catch(e){try{agErr("toil2",e)}catch(x){}return base}};window.toilNpc=toilNpc})();

/* ---------- consequences where they stand together (host, once per buổi) ---------- */
function tl2AnsPick(w){const A=BAL.ag.toil2.ans,O=[];for(const c in A){let n=A[c].b;for(const t of traitsOf(w))n+=A[c].tr[t]||0;O.push([c,n])}
 return (typeof mindPick==="function"?mindPick(O,w):null)||"smile"}
const TL2_ANS={sorry:"nàng cúi đầu nhận lỗi",smile:"nàng cười trừ cho qua",win:"nàng đáp lại khéo léo, người nghe gật gù",lose:"nàng đáp lại, không khí càng gượng"};
/* one consort x sees consort w (the player's rule toilSeeRule) → a line when it matters (tease), else "" */
function tl2See(x,w,L){if(toilSeen(x,w))return"";const e=toilSeeRule(x,L);toilMark(x,w);if(!e)return"";
 if(e.aff)affAdd(x,w,e.aff);if(e.g)affAdd(x,w,-e.g);
 if(e.k!=="tease")return"";TL2.stat.tease++;const ease=Math.min(e.n,Math.max(0,-aff(x,w)));if(ease)affAdd(x,w,ease);
 const c=tl2AnsPick(w,x);let a=typeof p3ToilAns==="function"?p3ToilAns(w,x,c):null;if(!a){const r=toilAns(w,{host:x,n:-BAL.toil.teaseN,v:x},c);a=c==="reply"?(r?"win":"lose"):c}TL2.stat.ans[a]=(TL2.stat.ans[a]||0)+1;
 return `${x.name} che miệng cười ${L.mk==="diem"?`lớp phấn son ${toilMkW("diem")}`:`gương mặt điểm trang ${toilMkW("vung")}`} của ${w.name}; ${TL2_ANS[a]}`}
function tl2Meet(){if(!tl2On()||!agOn()||typeof gmPlaces!=="function")return;const key=agKey();if(S.tl2m===key)return;S.tl2m=key;const t0=performance.now();
 try{const q=typeof qOn==="function"&&qOn()?rivals[0]:null;
  for(const [kh,M] of gmPlaces())for(const pl in M){const ids=M[pl];if(ids.length<2)continue;const me=ids.includes("me");
   const P=ids.filter(id=>id[0]==="v").map(id=>RV(+id.slice(1))).filter(v=>v&&v.alive!==false&&!v.out&&!v.coop);if(!P.length)continue;TL2.stat.meet++;
   for(const w of P){if(!toilOn(w))continue;let L=null;
    for(const h of [ids.includes("th")?"th":null,ids.includes("emp")?"emp":null,q&&q!==w&&P.includes(q)?q:null])if(h){const t=toilJudgeNpc(w,h);if(t){TL2.stat.judge++;
      if(me&&t.aff<0&&(t.mk==="diem"||t.mk==="vung"))log(`<span class="past">${toilWho(h)} quở trách dung nhan ${toilMkW(t.mk)} của ${w.name}.</span>`)}}
    for(const x of P){if(x===w)continue;L=L||toilLookP(w);const s=tl2See(x,w,L);if(!s)continue;
     if(me)log(`<span class="past">${s}.</span>`);else try{newsAdd(w,"toil",s,false)}catch(e){}}}}}catch(e){try{agErr("toil2meet",e)}catch(x){}}
 const ms=performance.now()-t0;window.__tl2Ms=ms;TL2.ms.push(ms);if(TL2.ms.length>60)TL2.ms.shift()}
(function(){if(typeof agTick!=="function")return;const a0=agTick;agTick=function(){const r=a0.apply(this,arguments);try{tl2Meet()}catch(e){}return r}})();

/* ---------- co-op: the host sends today's choices with the buổi's "where"; the guest only stores them ---------- */
function toil2Wire(){if(!tl2On()||!agOn())return null;const o={};let n=0;
 for(const v of liveRivals(true)){if(!v||v.coop||!toilOn(v))continue;try{toilNpc(v)}catch(e){}if(v.tl2&&v.tl2.wk===toilWk()){o[v.id]=v.tl2;n++}}return n?o:null}
function toil2Take(o){if(!o||typeof o!=="object")return 0;let n=0;for(const id in o){const v=RV(+id);const z=o[id];if(v&&!v.coop&&z&&z.rec){v.tl2=JSON.parse(JSON.stringify(z));n++}}return n}
Object.assign(window,{TL2,tl2Choose,tl2Meet,tl2See,toil2Wire,toil2Take});
