/* ================= jrash: NỔI MẨN (dị ứng) — a timed face condition for everyone (owner 11/14, review/items-earned) =================
   p.rash = {sev 1..3, until (tuần), how, by, at, tr}. Same rules for her and for every consort (two-way).
   Causes: spring pollen (the j68f springAllergy event and a small monthly spring roll), son phấn không hợp / tainted
   (Son phấn Dương Châu), bad luck (ăn phải món lạ), and the hostile act "Bỏ phấn lạ" (band Hại nhỏ, motive-gated like
   the other schemes, same odds and evidence trail for everyone).
   Effects: Sắc − RASH.d[sev] while it lasts (effSac, so nights, contests, jealousy follow as with hủy dung); heals in 1–4 tuần,
   one tuần sooner each tuần under Thái y medicine (bạc) or with Y thuật bậc 2+.
   A veil (jveil) works for a rash too: Sắc lost while veiled = d × VL.cover[grade]; same Vượt phẩm rule.
   Picture: KIT_RASH overlay (img/rash-1..3.png, gpt-2-6), placed from the veil fit boxes (nose bridge = band line);
   layer order portrait < rash < scar < veil < frame. Shown only when the player knows (herself, or knows(p)).
   KIT_RASH.ready=true: owner approved the overlays (15/11; nấc 1 redrawn, nấc 2–3 as drawn). ================= */
const RASH={d:[0,5,10,16],wk:[0,1,2,3],spring:4,luck:1,cos:5,actBac:15,actDuc:-4,sevW:[.5,.35,.15],medBac:15,npcMed:30,cd:3};
const RASH_N=["","nhẹ","vừa","nặng"];
function rashPick(W){const x=Math.random();return x<W[0]?1:x<W[0]+W[1]?2:3}
function rashName(p){return p===S?"ngươi":(p&&p.name)||""}
function rashGive(p,sev,how,by){if(!p||(p!==S&&(!p.alive||p.out)))return"";sev=cl(sev|0,1,3);const w=RASH.wk[sev]+(sev===3&&roll(50)?1:0);
 if(p.rash){if(p.rash.sev>=sev){p.rash.until=Math.max(p.rash.until,wk()+w);return""}}
 p.rash={sev,until:wk()+w,how:how||"",by:by?key(by):null,at:wk(),tr:0};
 const t=`${p===S?"Ngươi":p.name} nổi mẩn trên mặt (${RASH_N[sev]}${how?", vì "+how:""}): Sắc -${RASH.d[sev]} khi chưa khỏi.`;
 if(p===S){try{log(t)}catch(e){}}else if(typeof knows!=="function"||knows(p)){try{log(t)}catch(e){}}return t}
function rashOf(p){p=p||S;const r=p&&p.rash;if(!r)return null;const left=Math.max(1,r.until-wk());const vg=p.vl&&typeof vlG==="function"?vlG(p.vl):-1;
 const lost=Math.round(RASH.d[r.sev]*(vg>=0?VL.cover[vg]:1));return{sev:r.sev,name:RASH_N[r.sev],lost,weeksLeft:left,veiled:vg>=0,chip:`Nổi mẩn (${RASH_N[r.sev]}) · còn ${left} tuần`}}
window.rashOf=rashOf;
function rashNote(p){const r=rashOf(p);return r?[`Mặt nổi mẩn (${r.name}) · ${r.veiled?"đang che":"chưa che"}, Sắc mất ${r.lost}`,r.veiled?"n":"no"]:["Mặt lành, chưa cần đeo","ok"]}
(function(){const e0=effSac;effSac=function(p){let r=e0.apply(this,arguments);try{const x=p&&p.rash?rashOf(p):null;if(x)r=cl(r-x.lost,0,130)}catch(e){}return r}})();
/* weekly healing, the same rule for everyone */
function rashHeal(p){const r=p&&p.rash;if(!r)return;const me=p===S;let fast=false;
 if(r.tr>0){r.tr--;fast=true}else if(me?(S.arts&&S.arts.y>=2):((p.arts&&p.arts.y>=2)||roll(RASH.npcMed)))fast=true;
 if(fast)r.until--;if(wk()>=r.until){p.rash=null;if(me)log("Mẩn đỏ trên mặt ngươi đã lặn hết.");else if(typeof knows!=="function"||knows(p))log(`${p.name} đã khỏi nổi mẩn.`)}}
(function(){const e0=endTurn;endTurn=function(){const w0=S&&!S.dead?wk():null;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&w0!=null&&wk()!==w0){rashHeal(S);for(const v of rivals)if(v&&v.rash)rashHeal(v);
  if(S.rash&&!Q.some(m=>m.pid==="rashcard")&&(typeof evCooldown!=="function"||evCooldown("rashcard",RASH.cd))){const d=mkP("rashcard",{});if(d){Q.push({t:"Nổi mẩn",h:d.t,opts:d.o,who:pMe(),pid:d.pid,pp:d.pp});if($("modal").hidden)showModal()}}}}catch(x){console.error(x)}return r}})();
/* her card: medicine, herbs, the veil, or wait */
PEND.rashcard=pp=>{const r=S&&S.rash;if(!r)return null;const x=rashOf(S);const o=[];const y=(S.arts&&S.arts.y)||0;
 o.push(ch70("Mời thái y kê thuốc",{c:{bac:-RASH.medBac},wt:[G70("hai tuần tới mỗi tuần lặn nhanh thêm")],ok:()=>{r.tr=2;return "Thái y kê thuốc bôi, thuốc uống."}}));
 o.push(ch70("Tự sắc thuốc thảo mộc",{p:cl(35+y*15,5,95),c:{suc:-3},wt:[G70("hai tuần tới mỗi tuần lặn nhanh thêm")],lt:[R70("uống sai vị, mẩn lâu thêm một tuần")],ok:()=>{r.tr=2;return "Ngươi tự sắc thuốc kim ngân, cúc hoa."},no:()=>{r.until++;return "Thuốc không hợp, mẩn lâu thêm."}}));
 if(typeof vlChest==="function"){const L=vlChest(S);
  if(S.vl)o.push(ch70(`Tháo ${IT[S.vl.k].n}`,{wt:[G70("không còn vướng víu")],k:[R70(`Sắc mất trở lại ${RASH.d[r.sev]}`)],ok:()=>{vlOff(S);return "Ngươi tháo mạng che mặt."}}));
  else if(L.length){const b=L.slice().sort((a,c)=>vlG(c.e)-vlG(a.e))[0];const it=IT[b.e.k];o.push(ch70(`Đeo ${it.n}`,{wt:[G70(`Sắc mất còn ${Math.round(RASH.d[r.sev]*VL.cover[vlG(b.e)])}`)],ok:()=>{const j=S.inv.indexOf(b.e);return j>=0&&vlWear(S,j)?`Ngươi đeo ${it.n}.`:""}}))}
  else o.push({n:"Tìm mạng che mặt",fx:{},x:"chưa có mạng: tự tay kết, đặt mua hay xin ban",j67:"tốn: không tốn gì · thành: tự tay kết, đặt mua hay xin ban",go:()=>pushDil(mkP("vlget"),"Mạng che mặt")})}
 o.push(ch70("Để tự khỏi",{wt:[G70("không tốn gì")],k:[R70(`còn ${x.weeksLeft} tuần`)],ok:()=>"Ngươi để mẩn tự lặn."}));
 return{who:pMe(),t:`<p>Mặt ngươi nổi mẩn đỏ (${x.name}${r.how?", vì "+r.how:""}): Sắc đang mất ${x.lost}; còn chừng ${x.weeksLeft} tuần mới lặn.</p>`,o}};
/* chip on person cards (kit chip), only when she knows */
(function(){const p0=pcard;pcard=function(o){try{if(S&&o&&o.name){const nm=String(o.name).replace(/<[^>]*>/g,"");const p=nm===S.name?S:rivals.find(v=>v.name===nm);const x=p&&rashOf(p);
  if(x&&(p===S||typeof knows!=="function"||knows(p)))o=Object.assign({},o,{chips:(o.chips||[]).concat([chip(x.chip,"hot")])})}}catch(e){}return p0.call(this,o)}})();

/* ---------- causes ---------- */
/* spring pollen event (j68f): each choice keeps its text; afterwards the face may break out (less with the physician) */
(function(){try{const E=E68I.springAllergy;if(!E)return;const o0=E.o;E.o=function(X){const O=o0.apply(this,arguments);const P=[15,30,55];
  O.forEach((op,i)=>{const g0=op.go;op.go=function(){const r=g0?g0.apply(this,arguments):undefined;try{if(roll(P[Math.min(i,2)]))rashGive(S,i>=2?rashPick([.55,.4,.05]):1,"phấn hoa xuân")}catch(e){}return r}});return O}}catch(e){}})();
/* monthly: a spring breeze for everyone, and bad luck any time (two-way) */
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{if(S&&!S.dead){const spring=(S.month||0)>=1&&(S.month||0)<=3;
  for(const p of [S].concat(liveRivals(true))){if(p.rash)continue;if(spring&&roll(RASH.spring))rashGive(p,rashPick([.75,.22,.03]),"phấn hoa xuân");else if(roll(RASH.luck))rashGive(p,rashPick([.7,.25,.05]),"ăn phải món lạ")}}}catch(e){console.error(e)}return r}})();
/* son phấn: a tainted box (pha chì) always, an ordinary one sometimes, brings out a rash */
(function(){const u0=useItem;useItem=function(p,ix,tgt){const e=p&&p.inv&&p.inv[ix];const k=e&&e.k,t=e&&e.t;const r=u0.apply(this,arguments);
  try{if(k==="sonphan"&&r&&(t==="chi"||roll(RASH.cos))){const x=rashGive(p,t==="chi"?rashPick([.3,.45,.25]):1,"son phấn không hợp",t==="chi"&&e.by?byKey(e.by):null);return r+(x?" "+x:"")}}catch(x){}return r}})();
/* the hostile act: slip an irritating powder / strange incense into her cosmetics (band Hại nhỏ, motive-gated) */
function oRash(a){return odA(a,45+(a.tamco||0)/5+(a.mat||0)*3)}
A("rash","Bỏ phấn lạ",{c:{bac:-RASH.actBac,duc:RASH.actDuc},ok:(a,t)=>(a.bac||0)>=RASH.actBac&&!t.rash,o:a=>oRash(a),x:"nàng nổi mẩn mặt, Sắc giảm vài tuần",f:(a,t)=>{
 ap(a,{bac:-RASH.actBac});if(typeof ducAdd==="function")ducAdd(a,RASH.actDuc,"bỏ phấn lạ");else ap(a,{duc:RASH.actDuc});a.schemes=(a.schemes||0)+1;
 const c=caught(a,t,true,"trộn phấn lạ vào hộp phấn của "+NM(t));if(c)return c;
 if(!roll(oRash(a))){if(roll(40))evA(t,a,1);return `${NMc(a)} sai người trộn phấn lạ vào hộp phấn của ${NM(t)}, nhưng ${t===S?"ngươi":"nàng"} không dùng tới. `}
 const sev=rashPick(RASH.sevW);rashGive(t,sev,"phấn lạ",a);return `<span class="${t===S?"r":"g"}">${NMc(t)} thoa phải phấn lạ, mặt nổi mẩn (${RASH_N[sev]}): Sắc -${RASH.d[sev]} tới khi khỏi.</span> `}});
try{AOUT.rash=["nàng nổi mẩn mặt, Sắc giảm 5–16 trong 1–4 tuần","bị lộ: nàng nắm chứng cứ, oán ngươi"]}catch(e){}
try{LACK.rash=t=>S.bac<RASH.actBac?`cần Bạc ${RASH.actBac}`:t&&t.rash?"mặt nàng đang nổi mẩn":""}catch(e){}
try{ACTDOM.rash="Mưu kế";J78VERB.rash="trộn phấn lạ vào hộp phấn của {t}";HARMK["Bỏ phấn lạ"]="rash"}catch(e){}
try{if(!BANDS[1][2].includes("rash"))BANDS[1][2].push("rash");const g=RVGRP.find(x=>x[0]==="Hại nhỏ");if(g&&!g[1].includes("rash"))g[1].push("rash")}catch(e){}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandOf(danger(v,t));if(b>=1&&ACT.rash.ok(v,t)){let w=1.2*persW(v,"rash");if((t.sac||0)>(v.sac||0)+8)w*=1.5;if(w>0)O.push(["rash",w])}}catch(e){}return O}})();

/* ---------- picture: KIT_RASH, placed from the veil fit boxes (rash art: nose bridge at RB of a square image) ---------- */
window.KIT_RASH={ready:true,RB:.47,WX:1.08,src:function(sev){return `img/rash-${cl(sev|0,1,3)}.png`},
 on:function(p){try{return !!(p&&p.rash)&&(p===S||typeof knows!=="function"||!!knows(p))}catch(e){return false}},
 style:function(file){try{const n=String(file||"").split("/").pop();const r=KIT_VEIL.fit&&KIT_VEIL.fit[n];if(!r)return "";
  const W=r[2]*this.WX,H=W*(r[3]*480)/(r[2]*445),bandY=r[1]+KIT_VEIL.B0*r[3],L=r[0]+r[2]/2-W/2,T=bandY-this.RB*H;
  return `left:${L.toFixed(2)}%;top:${T.toFixed(2)}%;width:${W.toFixed(2)}%;height:${H.toFixed(2)}%;transform:rotate(${r[4]}deg);transform-origin:50% ${(this.RB*100).toFixed(1)}%`}catch(e){return ""}}};
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){let h=f0.apply(this,arguments);try{if(KIT_RASH.ready&&p&&file&&KIT_RASH.on(p)){const st=KIT_RASH.style(file);
  if(st)h=`<img class="krash" src="${KIT_RASH.src(p.rash.sev)}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`+h}}catch(e){}return h}})();
/* kitFxLayers returns "" (no wrapper) when a face has no scar/veil: jk2b's callers only add the layer box when it is non-empty, so this is enough */
window.rashGive=rashGive;window.RASH=RASH;
