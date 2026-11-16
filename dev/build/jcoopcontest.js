/* jcoopcontest: CO-OP SHARED CONTESTS (review/coop-contest, owner 16/11: "những cái sự kiện chung như thi thố ... khi mà chơi hai người là
   cả hai đều được báo dự thi hay như thế nào?"). Facts: dev/handover/reports/coop-contest-check.md. Rules: dev/coop/PROTOCOL.md §11.
   Single-player never runs any of this (every hook checks COOPW.on).
   ONE contest for the room, host-authoritative:
   - The host rolls ONE festival plan (variant, NPC entrants, seed) in its endTurn and publishes it in the shared world (S.cfp, a W key).
     The guest rolls none (fPlan7 muted); after the week merge she gets the SAME invitation (same text, same entrants, same seed) plus
     the line that her friend is invited too. Each answers Enter / Skip; the answer is relayed to the other (act k "ctm-cc", mode "ans").
   - Contest day: the host scores the NPC entrants once (one formula, one luck roll) into a board (S.cfb, W key). Each player who entered
     plays her own mini-game against those same NPC rows and sends her score to the host (mode "sc"). The host ranks everyone (both
     players + NPCs) and publishes ONE result list (mode "res" + S.cfb[...].res). Each client applies the result once: her own place
     effects; NPC prizes only on the host; the friend's prize only on the friend's own client (COOPW.pay). Nobody is simulated: a player
     who entered but never played by the host's next week end gets the formula score ("Để tài nghệ quyết định" rule, same as NPCs).
   - Same pipeline for the feast contests (Yến tiệc đầu xuân / Thi tài Thất tịch, FX7; was muted on the guest) and the gift contest
     (Dâng lễ, P variant: one "best gift" for the whole room).
   - Tranh ghế (S.contest): host only (contestOpen / contestWeek / fillSeats muted on the guest). The host mirrors its contest into
     S.ctc (W key); a guest candidate plays her own rounds and between-round choices on the mirror and sends them before her night
     "Sẵn sàng" (mode "tg"); the host's rounds use them instead of the NPC-style auto score. One winner, crowned by the host
     (S.ctcRes); a crowned guest takes rank 7 from it. */
(function(){try{
if(typeof COOPW!=="object"||typeof FV7==="undefined")return;
const CW=COOPW,CK="ctm-cc";
const on=()=>!!(CW.on&&typeof S!=="undefined"&&S&&!S.dead);
const host=()=>CW.isHost();
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[c]);
let seq=0;const seen=new Set();
function say(o){try{COOP.send(Object.assign({t:"act",k:CK,id:CW.pidMe()+":"+Date.now().toString(36)+":"+(seq++),week:CW.wk()},o))}catch(e){}}
function sw(m){if(typeof $==="function"&&$("modal")&&$("modal").hidden)try{showModal()}catch(e){}if(m)try{render()}catch(e){}}
function fName(){const f=CW.fEntry();return (f&&f.name)||"Hảo hữu"}
/* a row's person on this client: me, the friend entry, an NPC, or a stand-in when that NPC is gone */
function who(r){const id=+r.id;if(id===CW.pidMe())return S;if(id===CW.pidF())return CW.fEntry()||{id,name:r.nm||"Hảo hữu",alive:true,coop:true};return RV(id)||{id,name:r.nm||"",alive:false}}
function fPresent(){const f=CW.fEntry();return !!(f&&present7(f))}
function boards(){S.cfb=S.cfb||{};return S.cfb}
function pruneB(){const B=boards();for(const id in B){const b=B[id];if((b.y||0)<S.year-1||(b.res&&(CW.wk()-(b.w||0))>8))delete B[id]}
 const A=S.cfa||{};for(const id in A)if((A[id].y||0)<S.year-1)delete A[id]}
function rowOf(x,kind){return{id:x.p===S?CW.pidMe():x.p.id,nm:x.p===S?S.name:x.p.name,kind:x.kind||kind,t:x.t,pr:x.pr||0,lk:x.lk||0,s:x.s,mg:x.mg?1:0}}

/* ---------- answers (both ways; the host keeps the friend's in S.cfa) ---------- */
function ans(id,y,o){if(!on())return;say(Object.assign({mode:"ans",b:id,y},o))}
function onAns(m){if(host()){S.cfa=S.cfa||{};S.cfa[m.b]={y:m.y,me:m.me||0,a:m.a||null,pr:m.pr||0}}
 const yes=m.me>0||!!m.a;try{log(`Hảo hữu ${yes?"đã ghi tên dự":"không ghi tên dự"} ${esc(m.n||"hội thi")}.`)}catch(e){}}

/* ---------- invitations: one plan for the room ---------- */
(function(){const p0=fPlan7;fPlan7=function(){if(!on())return p0.apply(this,arguments);if(!host())return null;/* the guest gets the host's plan after the merge */
 const r=p0.apply(this,arguments);try{const j=j7s();S.cfp=S.cfp||{};for(const k in (j.plans||{})){const P=j.plans[k];if(P.y>=S.year&&P.pp)S.cfp[k]={y:P.y,pp:J(P.pp)}}
  for(const k in S.cfp)if(S.cfp[k].y<S.year)delete S.cfp[k]}catch(e){console.error(e)}return r}})();
(function(){const i0=fInv7;fInv7=function(k,pp,view){const m=i0.apply(this,arguments);if(!m||!on())return m;
 const line=`<p class="past">Hảo hữu của ngươi cũng nhận được lời mời này; hai người thi chung một bảng với các phi tần, Hoàng thượng chấm một lần.</p>`;
 if(view)m.h=(m.h||"")+line;else m.t=(m.t||"")+line;
 const L=view?m.opts:m.o;const c=SC7[FV7[k][pp.vi][1]];
 (L||[]).forEach(o=>{const g=o.go;o.go=function(){const r=g&&g.apply(this,arguments);try{const P=(j7s().plans||{})[k];ans("f:"+k,pp.y||S.year,{me:P?P.me:0,n:`thi ${c?c.n:""}`})}catch(e){}return r}});
 return m}})();
/* feast invitations (FX7): each client gets them from the shared calendar; the answer goes to the host */
(function(){const x0=PEND.j71x;PEND.j71x=pp=>{const d=x0(pp);if(!d||!on())return d;const F=FX7[pp.kk];
 d.t+=`<p class="past">Hảo hữu của ngươi cũng được mời; hai người thi chung một bảng, Hoàng thượng chấm một lần.</p>`;
 d.o.forEach(o=>{const g=o.go;o.go=function(){const r=g&&g.apply(this,arguments);try{const e=(j7s().fx||{})[F.f]||{};ans("x:"+F.f,pp.y,{a:e.a||null,pr:e.pr||0,n:F.n})}catch(e){}return r}});return d}})();

/* ---------- boards (host) ---------- */
function gEnt(id,y){const a=(S.cfa||{})[id];return a&&a.y===y?a:null}
function mkBoard(o){const B=boards();o.sc={};o.res=null;o.w=CW.wk();B[o.id]=o;pruneB();return o}
function hostScore(id,pid,row){const B=boards()[id];if(!B||B.res)return;B.sc[pid]=row||0;tryFin(B,false)}
function need(B){return Object.keys(B.ent).filter(p=>B.ent[p])}
function tryFin(B,force){if(!host()||B.res)return;const N=need(B);
 if(!force&&N.some(p=>B.sc[p]===undefined))return;
 for(const p of N)if(B.sc[p]===undefined){/* entered but never played: the formula score, same rule as an NPC */
  const pr=+p===CW.pidMe()?S:CW.fEntry();if(!pr||!present7(pr)){B.sc[p]=0;continue}
  if(B.ty==="p"){const g=(pr.tai||0)*.3+aw7(pr,"hoa")*8+help7(pr)*.8;B.sc[p]={id:+p,nm:pr.name,kind:"gift",t:Math.round(g),pr:0,lk:0,s:Math.round(15+Math.random()*25),gi:2};continue}
  const kind=B.ty==="x"?(B.ent[p].a||fxBest7(pr,FX7[B.kk].arts)):B.kind;const x=cScore7([pr],()=>kind,[],0)[0];if(x)B.sc[p]=rowOf(x,kind)}
 const L=B.rows.concat(N.map(p=>B.sc[p]).filter(Boolean)).sort((a,b)=>b.s-a.s);
 B.res=L;say({mode:"res",b:B.id,B:J(B)});applyRes(B)}
/* host's next week end: nobody waits forever */
(function(){const e0=endTurn;endTurn=function(){try{if(on()&&host()){const B=boards();for(const id in B)if(!B[id].res&&(B[id].w||0)<CW.wk())tryFin(B[id],true)}}catch(e){console.error(e)}return e0.apply(this,arguments)}})();

/* ---------- the day ---------- */
function headArt(m,k){if(m&&!m.headArt){m.headArt={src:`img/ev-fest-${k}-b.webp`,label:fName7(k)};m.evId=m.evId||("fest:"+k)}return m}
(function(){const d0=fDay7;fDay7=function(k){if(!on())return d0.apply(this,arguments);
 const j=j7s();const P=j.plans&&j.plans[k];const V=P&&P.y===S.year&&FV7[k][P.pp.vi];
 if(!V||(V[0]!=="C"&&V[0]!=="P"))return d0.apply(this,arguments);
 P.y=-1;if(!host())return null;/* the guest plays this day from the host's board after the merge */
 const pp=P.pp,y=S.year;
 if(V[0]==="C"){const kind=V[1];const E=ents7(pp).filter(v=>!CW.isF(v));const rows=cScore7(E,()=>kind,pp.pr||[],0).map(x=>rowOf(x,kind));
  const g=gEnt("f:"+k,y);const ent={};ent[CW.pidMe()]=P.me>0&&present7(S)?P.me:0;ent[CW.pidF()]=g&&g.me>0&&fPresent()?g.me:0;
  const B=mkBoard({id:`f:${k}:${y}`,ty:"f",k,vi:pp.vi,y,kind,title:fName7(k),big:FBIG7.includes(k),rows,ent});
  if(ent[CW.pidMe()])return headArt(playMsg(B),k);
  tryFin(B,false);if(!B.res)log(`${fName7(k)}: ngươi không ghi tên; hội thi chờ hảo hữu thi xong mới định thứ.`);return null}
 /* P: every NPC gift is weighed once, here */
 const R2=ents7(pp).filter(v=>!CW.isF(v));const rows=R2.map(v=>{const g=(v.bac||0)>=100?55:Math.max(15,(v.tai||0)*.3+aw7(v,"hoa")*8+help7(v)*.8);return{id:v.id,nm:v.name,kind:"gift",t:Math.round(g),pr:0,lk:0,s:Math.round(g+Math.random()*25)}});
 R2.forEach(v=>{if((v.bac||0)>=100)ap(v,{bac:-60})});
 const ent={};ent[CW.pidMe()]=present7(S)?1:0;ent[CW.pidF()]=fPresent()?1:0;
 mkBoard({id:`p:${k}:${y}`,ty:"p",k,vi:pp.vi,y,kind:"gift",title:fName7(k),sub:V[1],rows,ent,pp:J(pp)});
 if(!ent[CW.pidMe()])return null;
 const d=mkP("j71f",Object.assign(J(pp),{y}));if(!d)return null;return headArt({t:fShort7(k)+" · Dâng lễ",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1},k)}})();
/* the gift modal in co-op: her gift is weighed on her client, the host ranks the room once */
(function(){const f0=PEND.j71f;PEND.j71f=pp=>{const d=f0(pp);if(!d||!on())return d;const V=(FV7[pp.k]||[])[pp.vi];if(!V||V[0]!=="P")return d;
 const id=`p:${pp.k}:${pp.y||S.year}`;if(!boards()[id])return d;const th=V[1]==="th"&&!S.thDead;const miss=th?{th:-2}:{sung:-2};
 const mine=[55,Math.round((S.tai||0)*.3+aw7(S,"hoa")*8+help7(S)*.8),15];
 d.t+=`<p class="past">Hảo hữu của ngươi cũng dâng lễ; ${th?"Thái hậu":"Hoàng thượng"} chọn một lễ hay nhất cho cả hậu cung.</p>`;
 d.o.forEach((o,i)=>{o.go=i<3?()=>{submit(boards()[id],{t:mine[i],pr:0,lk:0,s:Math.round(mine[i]+Math.random()*25),gi:i,kind:"gift"})}:()=>{apply(miss);submit(boards()[id],null);log(`${fName7(pp.k)}: ngươi không dâng lễ.`)}});return d}})();
/* the feast contest day (FX7): host builds the board; the guest's festival() is muted and she plays from the board */
(function(){const f0=festival;festival=function(title,kk){if(!on()||!host()||!FX7[kk]||!j7On()||window.__j71off)return f0.apply(this,arguments);
 try{const F=FX7[kk],j=j7s(),y=S.year;const e=j.fx&&j.fx[F.f]&&j.fx[F.f].y===y&&j.fx[F.f].a&&present7(S)?j.fx[F.f]:null;if(e)e.done=1;
  const g=gEnt("x:"+F.f,y);const E=liveRivals(true).filter(present7).filter(v=>!CW.isF(v));const ent={};ent[CW.pidMe()]=e?{a:e.a}:0;ent[CW.pidF()]=g&&g.a&&fPresent()?{a:g.a}:0;
  if(E.length+(ent[CW.pidMe()]?1:0)+(ent[CW.pidF()]?1:0)<2)return "";
  const rows=cScore7(E,p=>fxBest7(p,F.arts),[],0).map(x=>rowOf(x));
  const B=mkBoard({id:`x:${F.f}:${y}`,ty:"x",k:F.f,kk,y,title,big:true,rows,ent});
  if(e){Q.push(playMsg(B));sw()}else tryFin(B,false)}catch(e){console.error(e)}return ""}})();

/* ---------- playing (both clients) ---------- */
function myEnt(B){const j=j7s();if(B.ty==="f"){const P=(j.plans||{})[B.k];return P&&P.me>0?{kind:B.kind,meB:(P.me===2?J71.prep:0)+(P.pb||0)}:null}
 if(B.ty==="x"){const e=(j.fx||{})[B.k];return e&&e.a&&e.y===B.y?{kind:e.a,meB:(e.pr?J71.prep:0)+(e.pb||0)}:null}return null}
function playMsg(B){const d=mkP("ccplay",{b:B.id});return d?{t:B.ty==="x"?B.title:`${fShort7(B.k)} · ${fTitle7(B.k,B.vi)}`,h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1}:null}
PEND.ccplay=pp=>{if(!S)return null;const B=boards()[pp.b];if(!B||B.res)return null;const me=myEnt(B);if(!me)return null;const kind=me.kind;
 const other=B.ent[CW.pidF()];const txt=B.ty==="f"?FV7[B.k][B.vi][2]:`Ngày ${B.title}.`;
 const h=`<p>${txt}</p><p>Ngươi đã ghi tên${B.ty==="x"?` dâng ${SC7[kind].n}`:""}. Phần của ngươi = phần tự chơi, cộng thêm theo tài nghệ (${det7(kind,S)}) và chuẩn bị +${me.meB}.</p><p class="past">${other?"Hảo hữu của ngươi cũng dự thi; ":""}cả bảng chấm một lần, xong thì báo kết quả.</p>`;
 const win=B.ty==="x"?"đứng đầu, Sủng +8, Danh +3":`đoạt giải, ${pz7(prize7(B.k))}`;
 const play=()=>{if(mgOn7()){const R0=B.rows.map(x=>{const p=RV(x.id);return{id:x.id,name:x.nm,face:p?pv(p):null,score:x.s,talent:x.t,prep:x.pr,luck:x.lk}});
   const fr=B.sc&&B.sc[CW.pidF()];if(fr)R0.push({id:fr.id,name:fName(),face:CW.fEntry()?pv(CW.fEntry()):null,score:fr.s,talent:fr.t,prep:fr.pr,luck:fr.lk});
   const wait=other&&!fr;
   try{startContest({art:kind,artName:SC7[kind].n,title:B.title,rivals:R0,prep:me.meB,talent:Math.round(SC7[kind].f(S)),talentBy:det7(kind,S),luck:J71.luck,big:B.big,fk:B.k,hold:true,
    holdNote:wait?"Hảo hữu chưa thi xong; bảng định thứ chung và thưởng phạt sẽ báo khi mọi người dự thi xong.":"Bảng định thứ chung và thưởng phạt báo ở bảng kế tiếp.",
    onDone:res=>{const sc=res&&typeof res.score==="number"?Math.round(res.score):null;const r=sc!=null?{t:sc,pr:0,lk:0,s:sc,mg:1}:rowOf(cScore7([S],()=>kind,[],me.meB)[0],kind);submit(B,Object.assign(r,{kind}));sw(1)}})}
   catch(e){console.error(e);submit(B,Object.assign(rowOf(cScore7([S],()=>kind,[],me.meB)[0],kind),{kind}))}}
  else submit(B,Object.assign(rowOf(cScore7([S],()=>kind,[],me.meB)[0],kind),{kind}))};
 return{who:pEmp(),t:h,o:[{n:"Vào thi (tự chơi phần thi)",fx:{suc:-6},x:`${win}, kèm vật quý và bạc theo hạng · hạng nhì hoặc ba: Danh +1 và quà nhỏ · hỏng: đứng chót thì Danh -1 · kèm: thắng thì các phi tần ghen +${B.ty==="x"?8:4}`,go:play},
  {n:"Bỏ thi",fx:{},x:"không được không mất",go:()=>{submit(B,null);log(`${B.title}: ngươi bỏ thi.`)}}]}};
function submit(B,row){if(!B)return;const j=j7s();const r=row?Object.assign({id:CW.pidMe(),nm:S.name},row,{id:CW.pidMe(),nm:S.name}):null;
 j.cpl=j.cpl||{};j.cpl[B.id]={row:r,w:CW.wk()};if(r&&B.ty!=="p")log(`${B.title}: phần thi của ngươi ${r.s} phần, đã nộp; đợi định thứ.`);
 if(host())hostScore(B.id,CW.pidMe(),r);else say({mode:"sc",b:B.id,row:r})}

/* ---------- results (both clients, once each) ---------- */
function applyRes(B){if(!on()||!B||!B.res)return;const j=j7s();j.cdone=j.cdone||{};if(j.cdone[B.id])return;j.cdone[B.id]=1;
 const L=B.res.map(r=>({p:who(r),kind:r.kind||B.kind,t:r.t,pr:r.pr||0,lk:r.lk||0,s:r.s,mg:r.mg&&+r.id===CW.pidMe()?1:0,gi:r.gi}));if(!L.length)return;
 const w=L[0].p,mi=L.findIndex(x=>x.p===S),pay=p=>CW.pay(p);
 let cup="";const cu0=()=>{if(B.ty==="p"||!mgOn7()||typeof cuAward!=="function")return false;try{const r=cuAward({title:B.title,big:B.big},L.map(x=>({p:x.p,score:x.s})),mi+1,L.length,L[0].kind);cup=(r&&r.mine&&r.html)||"";}catch(e){console.error(e)}if(window.CU)CU.did=false;return true};
 if(B.ty==="f"){const kind=B.kind,pz=prize7(B.k);if(pay(w))ap(w,pz);const cu=cu0();if(!cu&&w!==S&&pay(w)&&roll(30))try{bestow(w,"contest")}catch(e){}
  j.fn++;if(w===S){j.win++;ghenAll(4);try{if(!cu&&roll(30))bestow(S,"contest")}catch(e){}}
  let me="";if(mi>0){if(mi<=2){apply({danh:1});me=` Ngươi hạng ${mi+1}: Danh +1.`}else me=` Ngươi hạng ${mi+1}/${L.length}.`;if(mi===L.length-1&&L.length>2){apply({danh:-1});me+=" Đứng chót: Danh -1."}}
  log(`${fName7(B.k)}: ${w===S?G7(`Ngươi đoạt giải ${SC7[kind].n}: ${pz7(pz)}.`):`${mi>=0?R7("Không thành:")+" ":""}${w.name} đoạt giải ${SC7[kind].n} (${pz7(pz)}).`}${me}`);
  Q.push(headArt({t:`${fShort7(B.k)} · Hội thi ${SC7[kind].n}: kết quả`,h:`${mi<0?"<p>Ngươi không dự, chỉ đứng xem.</p>":""}${rowsH7(L,`${fName7(B.k)} · bảng phần thi (cả hậu cung, chấm một lần)`)}${cup}`,who:pEmp(),must:1},B.k))}
 else if(B.ty==="x"){if(pay(w))ap(w,{sung:8,danh:3});const cu=cu0();if(!cu&&pay(w)&&roll(50))try{bestow(w,"contest")}catch(e){}
  if(w===S){ghenAll(8);log(`<span class="g">${B.title}: ${SC7[L[0].kind].n} của ngươi đứng đầu, Hoàng thượng ban thưởng.</span> Sủng +8 · Danh +3.`)}
  else{let r=`${mi>=0?R7("Không thành:")+" ":""}${B.title}: ${w.name} dâng ${SC7[L[0].kind].n} đứng đầu (Sủng +8, Danh +3).${mi>=0?` Ngươi hạng ${mi+1}/${L.length}.`:""}`;if(mi>=1&&mi<=2&&cu)apply({danh:1});if(mi>=0&&mi===L.length-1&&L.length>2){apply({danh:-1});r+=" Ngươi đứng chót: Danh -1."}log(r)}
  if(mi>=0)Q.push({t:`${B.title}: kết quả`,h:rowsH7(L,`${B.title}: bảng phần thi (cả hậu cung, chấm một lần)`)+cup,who:pEmp(),must:1})}
 else if(B.ty==="p"){const th=B.sub==="th"&&!S.thDead,tg=th?"Thái hậu":"Hoàng thượng";const praise=th?{th:4,danh:1}:{sung:3,danh:1},small=th?{th:1}:{sung:1};const fn=fName7(B.k);
  if(w===S){apply(praise);ghenAll(3);log(`${fn}: ${tg} khen lễ của ngươi nhất: ${pz7(praise)}.`)}
  else{if(pay(w))ap(w,praise);const mine=mi>=0?L[mi]:null;const sm=mine&&mine.gi!=null&&mine.gi<2;if(sm)apply(small);
   if(mine)log(`${R7("Không thành:")} ${fn}: ${tg} khen lễ của ${w.name} nhất (${pz7(praise)}).${sm?` Lễ của ngươi cũng được nhận: ${pz7(small)}.`:""}`);else log(`${fn}: ${tg} khen lễ của ${w.name} nhất.`)}
  if(mi>=0)Q.push(headArt({t:`${fShort7(B.k)} · Dâng lễ: kết quả`,h:`<p>${tg} xem lễ của cả hậu cung một lượt, khen lễ của ${w===S?"ngươi":esc(w.name)} nhất.</p>`+kitRows(L.map((x,i)=>[`${i+1}. ${x.p===S?"Ngươi":esc(x.p.name)}`,`${x.s} phần`,"t"])),who:th?pTH():pEmp(),must:1},B.k))}
 sw(1)}

/* ---------- after every week merge (both): plans → invitations, boards → play / results ---------- */
function built(){if(!on())return;const j=j7s();
 if(!host()&&S.cfp){j.plans=j.plans||{};for(const k in S.cfp){const c=S.cfp[k];if(!c||c.y<S.year||!FV7[k]||!FV7[k][c.pp.vi])continue;const P=j.plans[k];if(P&&P.pp&&P.pp.sd===c.pp.sd)continue;
  j.plans[k]={y:c.y,pp:J(c.pp),me:0,co:1};try{fMark7(k,c.pp.vi)}catch(e){}
  if(FV7[k][c.pp.vi][0]==="C"&&!S.confined&&j7On()){const m=fInv7(k,j.plans[k].pp,true);if(m)Q.push(m)}}}
 const B=boards();j.cpl=j.cpl||{};
 for(const id in B){const b=B[id];if(b.res){applyRes(b);continue}if(host())continue;
  if(j.cpl[id]){if(j.cpl[id].row!==undefined&&j.cpl[id].w!==undefined&&!j.cpl[id].q)say({mode:"sc",b:id,row:j.cpl[id].row});continue}
  if(b.ty==="p"){if(present7(S)&&b.pp){const d=mkP("j71f",Object.assign(J(b.pp),{y:b.y}));if(d){Q.push(headArt({t:fShort7(b.k)+" · Dâng lễ",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,must:1},b.k));j.cpl[id]={q:1}}}continue}
  if(myEnt(b)&&present7(S)){const m=playMsg(b);if(m){Q.push(b.ty==="f"?headArt(m,b.k):m);j.cpl[id]={q:1}}}}
 try{tgBuilt()}catch(e){console.error(e)}}
(CW.onBuilt=CW.onBuilt||[]).push(built);
/* reconnect: the guest re-sends a score the host may have missed */
COOP.on("room",()=>setTimeout(()=>{try{if(!on()||host())return;const j=j7s(),B=boards();for(const id in (j.cpl||{})){const c=j.cpl[id];if(B[id]&&!B[id].res&&c&&!c.q)say({mode:"sc",b:id,row:c.row})}tgSend()}catch(e){}},600));

/* ---------- the relay ---------- */
COOP.on("act",m=>{if(!m||m.k!==CK||!CW.on||m.from===CW.seat||!S||seen.has(m.id))return;seen.add(m.id);
 try{if(m.mode==="ans")onAns(m);
  else if(m.mode==="sc"&&host())hostScore(m.b,CW.pidF(),m.row);
  else if(m.mode==="res"&&!host()&&m.B){boards()[m.b]=m.B;applyRes(m.B)}
  else if(m.mode==="tg"&&host())tgHost(m);
  render()}catch(e){console.error(e)}});

/* ================= TRANH GHẾ: one contest, host-run ================= */
const ckey=(x,mp)=>x==="me"?String(mp):String(x);
function rnK(o,f){const r={};for(const k in (o||{}))r[f(k)]=J(o[k]);return r}
function toC(c){const mp=CW.pidMe(),f=x=>ckey(x,mp);return{id:c.r+":"+c.t0,r:c.r,c:c.c.map(f),t0:c.t0,len:c.len,round:c.round,sc:rnK(c.sc,f),bk:rnK(c.bk,f),pr:rnK(c.pr,f),sab:rnK(c.sab,f),dq:(c.dq||[]).map(f)}}
function toL(cc){const mp=String(CW.pidMe()),f=x=>String(x)===mp?"me":(isNaN(+x)?x:+x),g=x=>String(x)===mp?"me":String(x);
 return{co:1,id:cc.id,r:cc.r,c:cc.c.map(f),t0:cc.t0,len:cc.len,round:cc.round,sc:rnK(cc.sc,g),bk:rnK(cc.bk,g),pr:rnK(cc.pr,g),sab:rnK(cc.sab,g),dq:(cc.dq||[]).map(f),hint:0}}
/* host: publish the mirror; the friend never acts by AI in a contest (she plays her own part) */
(CW.preCanon=CW.preCanon||[]).push(()=>{if(!CW.on||!host()||!S)return;S.ctc=S.contest?toC(S.contest):null});
(function(){const n0=npcContestAct;npcContestAct=function(p){if(CW.on&&CW.isF(p))return;return n0.apply(this,arguments)}})();
(function(){const e0=contestEnd;contestEnd=function(){if(!on()||!host()||!S.contest)return e0.apply(this,arguments);
 const c=S.contest,cc=toC(c);const before=c.c.map(k=>{const p=byKey(k);return[k,p,p?rkOf(p):-1,!!(p&&p.queen)]});
 const r=e0.apply(this,arguments);let win=null;for(const [k,p,rk,q] of before){if(!p)continue;if(rkOf(p)>rk||(!q&&p.queen)||(p===S&&S.rank===7&&rk<7)){win=ckey(k,CW.pidMe());break}}
 S.ctcRes={id:cc.id,r:c.r,win,c:cc.c,tbl:cc,txt:String(r||"").replace(/<[^>]+>/g,"")};return r}})();
function tgHost(m){const c=S.contest;if(!c||(c.r+":"+c.t0)!==m.cid)return;const fk=CW.pidF(),sk=String(fk);
 c.sc[sk]=c.sc[sk]||[];for(const i in (m.sc||{})){const v=m.sc[i];if(v!=null&&+i<c.round)c.sc[sk][i]=v}
 c.pr[sk]=Math.max(c.pr[sk]||0,m.pr||0);if(Array.isArray(m.bk))c.bk[sk]=m.bk.slice(0,6);
 for(const t in (m.sab||{})){const lk=t===String(CW.pidMe())?"me":t;c.sab[lk]=(c.sab[lk]||0)+(+m.sab[t]||0)}
 if(m.dq&&!c.dq.includes(fk))c.dq.push(fk)}
/* host: the week's rounds run inside endTurn, where the friend entry is pulled out: put her back so she is scored and can win */
(function(){const w0=contestWeek;contestWeek=function(){if(on()&&host()&&S.contest)return CW.withFriend(()=>w0.apply(this,arguments));return w0.apply(this,arguments)}})();
/* guest: no contest of her own (the host's is the room's) */
["contestOpen","contestWeek","fillSeats"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(on()&&!host())return "";return f.apply(this,arguments)}});
function tgBuilt(){if(host())return;const cc=S.ctc;
 if(!cc){if(S.contest&&S.contest.co)S.contest=null}
 else{const old=S.contest&&S.contest.co&&S.contest.id===cc.id?S.contest:null;const c=toL(cc);c.hint=old?old.hint:0;
  const mine=S.ctcMine&&S.ctcMine.id===cc.id?S.ctcMine:null;if(mine){c.sc.me=c.sc.me||[];for(const i in (mine.sc||{}))if(mine.sc[i]!=null)c.sc.me[i]=mine.sc[i];if(mine.pr)c.pr.me=Math.max(c.pr.me||0,mine.pr);if(mine.bk)c.bk.me=mine.bk.slice()}
  S.contest=c;S.ctcBase=J(c);
  const cand=c.c.includes("me")&&!c.dq.includes("me");const sn=S.ctcSeen&&S.ctcSeen.id===cc.id?S.ctcSeen:{id:cc.id,round:0,open:0};
  if(cand&&!sn.open){sn.open=1;Q.push({t:"Tranh ghế",who:pEmp(),h:`<p>Khuyết ghế ${c.r>=7?"Hoàng hậu":RANKS[c.r].n}; ngươi có tên trong danh sách ứng viên. Ba vòng: <b>Tài nghệ</b> trước Hoàng thượng, <b>Đức hạnh</b> trước Thái hậu, <b>Thế lực</b> (ai đứng sau ngươi).</p>${scoreTable()}<p class="past">Cả hậu cung một cuộc tranh ghế; hảo hữu và các phi tần chấm cùng một luật, chỉ một người được ghế.</p>`})}
  if(cand)for(let i=sn.round;i<c.round;i++){if(i<2)myRound(i)}
  if(cand&&c.round>sn.round&&c.round<3)myBetween();
  sn.round=c.round;S.ctcSeen=sn}
 const R2=S.ctcRes;if(R2&&S.ctcResSeen!==R2.id){S.ctcResSeen=R2.id;const mp=String(CW.pidMe());
  if(R2.win===mp&&R2.r===7&&S.rank<7){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10)}
  if((R2.c||[]).includes(mp)){const keep=S.contest;S.contest=toL(R2.tbl);const tbl=scoreTable();S.contest=keep&&keep.co&&keep.id!==R2.id?keep:null;
   const wn=R2.win===mp?"Ngươi":R2.win?(who({id:R2.win}).name||""):"";
   Q.push({t:"Kết quả tranh ghế",who:R2.win===mp?pMe():pEmp(),h:`<p>${esc(R2.txt||"Tranh ghế xong.")}</p>${tbl}<p class="past">${wn?`${wn===`Ngươi`?"Ngươi":esc(wn)} được ghế; `:""}người thua thêm Oán với người thắng (+10).</p>`})}
  if(S.contest&&S.contest.co&&S.contest.id===R2.id)S.contest=null}}
function tgSend(){if(!on()||host())return;const c=S.contest;if(!c||!c.co)return;const b=S.ctcBase||{};const mp=String(CW.pidF());
 const sab={};for(const k in (c.sab||{})){const d=(c.sab[k]||0)-((b.sab||{})[k]||0);if(d>0)sab[k==="me"?String(CW.pidMe()):k]=d}
 const dq=c.dq.includes("me")&&!(b.dq||[]).includes("me");
 S.ctcMine={id:c.id,sc:J(c.sc.me||[]),pr:c.pr.me||0,bk:J(c.bk.me||[])};
 say({mode:"tg",cid:c.id,sc:J(c.sc.me||[]),pr:c.pr.me||0,bk:J(c.bk.me||[]),sab,dq});S.ctcBase=J(c);void mp}
(CW.beforeReady=CW.beforeReady||[]).push(tgSend);

window.CCO={boards,tryFin,applyRes,built,toC,toL};
}catch(e){console.error(e)}})();
