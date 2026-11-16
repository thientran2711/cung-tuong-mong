/* ================= j82 HỘI THI TÀI NGHỆ: real mini-games (owner 11/14) =================
   "Ta tự chơi, được 5 điểm, nhưng tài nghệ trong game cao nên được cộng thêm."
   API (window):
     startContest({art, artName, title, rivals, prep, talent, talentBy, luck, stakes, applyStakes, onDone(result)})
       art     : contest kind (j71 SC7 keys: dan hat co dauho tho doi doden ve hoa theu kim mua ban banh huong) or a plain art (cam ky thi hoa vu y)
       rivals  : j71 rows [{id,name,face,score,talent,prep,luck}] (score already = talent + prep + skill roll), or person objects (scored here
                 with the same formula), or omitted (3 present consorts).
       prep    : her preparation points; talent: her talent points (computed here when omitted); luck: the skill range (default 30)
       stakes  : {win, top3, last, paid, note}, each {sung:8,danh:3} or [["Sủng",8]]; shown as Được / Mất on the result; applied only if applyStakes
       result  : {score, raw, skill, talent, prep, skipped, place, of, standings:[{id,name,score}], shown:true}
     playArt({art, title, onDone(raw0to10)})   lightweight mode (works / lessons): the same mini-game, no rivals, no stakes.
   Scoring, one formula for everyone:  total = talent points (same per-art formula as j71) + preparation + skill,
     skill = her mini-game score 0–10 scaled to 0..luck (rivals: a fair random roll 0..luck; "Để tài nghệ quyết định" = 5/10, the rivals' average).
   UI: the kit's mini-game frame (j79 kitGameFrame / kitGameSet / kitGameResult / kitRows / kitFacts / kitChip / .kbtn) inside the #ov overlay;
   the game itself draws only inside .kgbox (canvas art + kit buttons). */
const KG82_KIND={
 dan:{e:"rhythm",n:"Đàn",t:"Tấu khúc",how:"Hoa mai rơi theo bốn dây Cung, Thương, Giốc, Chủy. Chạm vào dây khi hoa chạm vạch son."},
 hat:{e:"rhythm",n:"Hát",t:"Hát theo phách",how:"Phách rơi theo bốn cung giọng. Chạm vào cột khi phách chạm vạch son."},
 co:{e:"go",n:"Cờ",t:"Ăn quân",how:"Mỗi thế cờ có một nhóm quân trắng chỉ còn một chỗ trống bên cạnh (một khí). Chạm vào chỗ trống ấy, đặt quân đen để ăn nhóm. Bậc thấp có vòng vàng khoanh nhóm quân trắng; chưa thấy chỗ thì chạm Gợi ý."},
 dauho:{e:"aim",n:"Đầu hồ",t:"Ném tên vào bình",how:"Mũi tên đưa qua đưa lại trên miệng bình. Chạm khi mũi tên ở ngay giữa miệng bình. 6 lần ném."},
 ban:{e:"aim",n:"Bắn cung",t:"Bắn hồng tâm",how:"Ngắm đưa qua đưa lại trên bia. Chạm khi ngắm ở giữa hồng tâm. 6 phát tên."},
 tho:{e:"quiz",b:"doi",n:"Thơ",t:"Nối vần",how:"Chọn câu thơ đối chỉnh nhất với câu cho sẵn. 5 câu, mỗi câu 10 giây."},
 doi:{e:"quiz",b:"doi",n:"Câu đối",t:"Đối câu",how:"Chọn vế đối chỉnh nhất cho vế ra. 5 câu, mỗi câu 10 giây."},
 doden:{e:"lamp",n:"Thắp đèn",t:"Thắp đèn theo mẫu",how:"Ba hồi, hồi nào cũng làm theo cái đang hiện sẵn: chạm mọi chiếc đèn giống đèn mẫu; chạm để thắp đèn cho giống hình mẫu; chạm đèn theo thứ tự dải mẫu. Chạm nhầm thì chọn lại. Có nút Gợi ý."},
 ve:{e:"pattern",m:"ink",n:"Vẽ",t:"Nhớ nét bút",how:"Nét mực hiện trên ô giấy rồi tan. Chạm lại đúng những ô có nét mực. 5 hồi."},
 hoa:{e:"pattern",m:"flower",n:"Cắm hoa",t:"Nhớ thế hoa",how:"Hoa hiện trên các ô bình rồi khuất. Chạm lại đúng những ô có hoa. 5 hồi."},
 theu:{e:"pattern",m:"silk",n:"Thêu",t:"Nhớ mẫu thêu",how:"Mũi thêu hiện trên khung rồi khuất. Chạm lại đúng những ô có mũi thêu. 5 hồi."},
 kim:{e:"pattern",m:"silk",n:"Khéo tay",t:"Nhớ mẫu kết",how:"Nút kết hiện trên khung rồi khuất. Chạm lại đúng những ô có nút kết. 5 hồi."},
 mua:{e:"steps",n:"Múa",t:"Theo bước múa",how:"Xem các bước sáng lên theo thứ tự rồi chạm lại đúng thứ tự. 5 hồi, hồi sau dài hơn."},
 banh:{e:"quiz",b:"bep",n:"Bếp núc",t:"Chọn món",how:"Chọn món hay vị đúng cho từng việc. 5 câu, mỗi câu 10 giây."},
 huong:{e:"quiz",b:"huong",n:"Điều hương",t:"Chọn hương",how:"Chọn vị hương đúng cho từng việc. 5 câu, mỗi câu 10 giây."}};
const KG82_PLAIN={cam:"dan",ky:"co",thi:"tho",hoa:"ve",vu:"mua",y:"huong",nau:"banh"};
/* talent formula per kind: the same coefficients as j71 SC7 (so the parts add up to the j71 talent number) */
const KG82_F={doden:[["tai",.55],["tamco",.3],["thi",4]],tho:[["tai",.5],["thi",8]],doi:[["tai",.55],["thi",6],["hoa",2]],dan:[["tai",.3],["cam",9]],
 mua:[["sac",.4],["vu",9]],hat:[["sac",.25],["tai",.2],["cam",5],["vu",2]],theu:[["tai",.3],["hoa",7],["help",1]],kim:[["tamco",.3],["tai",.2],["hoa",5],["help",.5]],
 hoa:[["sac",.2],["tai",.2],["hoa",6],["help",.5]],ve:[["tai",.3],["hoa",9]],co:[["tamco",.4],["tai",.2],["ky",9]],banh:[["help",1.5],["y",5],["tai",.2]],
 ban:[["suc",.4],["vu",4]],dauho:[["tamco",.3],["suc",.2],["ky",3]],huong:[["tai",.2],["y",8],["help",.5]]};
/* j85 arts (theu, nau): when the game has them (artLv), the kinds that fit weigh them; j71 SC7 should use the same coefficients */
const KG82_F85={theu:[["tai",.3],["theu",7],["hoa",2],["help",1]],kim:[["tamco",.3],["tai",.2],["theu",4],["hoa",2],["help",.5]],banh:[["help",1.5],["nau",6],["y",2],["tai",.2]]};
function kg82Has85(k){try{return typeof artLv==="function"&&typeof S!=="undefined"&&S&&S.arts&&k in S.arts}catch(e){return false}}
function kg82FormulaOf(kind){const f=KG82_F85[kind];if(f&&f.every(([s])=>!/^(theu|nau)$/.test(s)||kg82Has85(s)))return f;return KG82_F[kind]||[]}
const KG82_STAT={tai:"Tài",tamco:"Tâm cơ",sac:"Sắc",suc:"Sức"};
const KG82_HUONG=[{q:"Muốn hương thanh, an thần cho giấc ngủ, chọn vị nào?",a:"Trầm hương",w:["Xạ hương","Long não","Hùng hoàng"]},
 {q:"Người đang mang thai phải tránh xa thứ hương nào?",a:"Xạ hương",w:["Hoa nhài","Trầm hương","Đàn hương"]},
 {q:"Hương nào dùng ướp trà, thơm dịu và ngọt?",a:"Hoa nhài",w:["Long não","Ngải cứu","Hùng hoàng"]},
 {q:"Đốt lên để đuổi muỗi và côn trùng mùa hè?",a:"Ngải cứu",w:["Hoa hồng","Mộc lan","Quế hoa"]},
 {q:"Hương gỗ ấm, dùng trong chùa và lễ cúng?",a:"Đàn hương",w:["Bạc hà","Hoa sen","Vỏ quýt"]},
 {q:"Ngày hè oi bức, muốn mát đầu tỉnh táo?",a:"Bạc hà",w:["Xạ hương","Đàn hương","Trầm hương"]},
 {q:"Hoa nào thơm ngọt mùa thu, dùng làm nhân bánh?",a:"Quế hoa",w:["Ngải cứu","Long não","Hùng hoàng"]},
 {q:"Ướp áo xiêm cho thơm lâu và tránh mọt?",a:"Long não",w:["Hoa nhài","Bạc hà","Quế hoa"]}];
const KG82_BEP=[{q:"Mùa hè oi bức, nấu món gì giải nhiệt?",a:"Chè đậu xanh",w:["Gà tần sâm","Lẩu dê","Rượu gừng"]},
 {q:"Bồi bổ cho người mới sinh nở?",a:"Gà ác tần thuốc bắc",w:["Chè đậu xanh","Canh khổ qua","Gỏi cá"]},
 {q:"Tết Trung thu dâng bánh gì?",a:"Bánh nướng nhân sen",w:["Bánh chưng","Bánh trôi","Bánh tro"]},
 {q:"Tết Đoan ngọ làm bánh gì?",a:"Bánh tro",w:["Bánh dẻo","Bánh chưng","Bánh trôi"]},
 {q:"Tết Hàn thực mùng ba tháng ba làm bánh gì?",a:"Bánh trôi",w:["Bánh nướng","Bánh tro","Bánh chưng"]},
 {q:"Chưng yến sào thêm gì cho thanh ngọt?",a:"Đường phèn",w:["Nước mắm","Ớt","Giấm"]},
 {q:"Người bị cảm lạnh, nấu bát canh với gì?",a:"Gừng và hành",w:["Khổ qua","Rau má","Đậu xanh"]},
 {q:"Món canh nào Hoàng thượng thường dùng cho mát gan?",a:"Canh hạt sen",w:["Canh ớt","Canh dê","Canh rượu"]}];

/* ---------- small helpers ---------- */
const kg82El=()=>document.getElementById("kg82");
const kg82Kit=()=>typeof kitGameFrame==="function";
const kg82Btn=(alt)=>kg82Kit()?`kbtn${alt?" alt":""}`:"btn";
const kg82Shuf=a=>{const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b};
function kg82Col(v,d){try{const c=getComputedStyle(document.documentElement).getPropertyValue(v).trim();return c||d}catch(e){return d}}
function kg82Rows(rows){if(typeof kitRows==="function")return kitRows(rows);
 return `<span class="kb">${rows.filter(r=>r&&r[1]!=null&&r[1]!=="").map(([l,v,c])=>`<span class="kr"><span class="krl">${l}</span><span class="krv">${[].concat(v).map(x=>/^\s*</.test(x)?x:`<span class="ef ${c||"n"}">${x}</span>`).join(" · ")}</span></span>`).join("")}</span>`}
function kg82Chip(label,n,c){if(typeof kitChip==="function")return kitChip(label,n,c);return `<span class="ef ${c||(n>0?"g":"r")}">${label} ${typeof n==="number"?(n>0?"+":"−")+Math.abs(n):""}</span>`}
function kg82Facts(F){if(typeof kitFacts==="function")return kitFacts(F,{group:false});
 return `<div class="kfacts">${F.map(f=>`<div class="kfact">${kg82Face(f.who)}<span class="kft">${f.text}</span></div>`).join("")}</div>`}
function kg82Face(p){try{if(!p)return"";if(typeof kitFaceH==="function")return kitFaceH(p,"sm");if(p.src!==undefined||p.ini!==undefined)return mdH(p,"sm");if(p===S&&typeof pMe==="function")return mdH(pMe(),"sm");return mdH(pv(p),"sm")}catch(e){return""}}
function kg82Name(p,fallback){try{if(p&&typeof kitName==="function")return kitName(p,{cap:true});if(p===S)return"<b>Ngươi</b>";if(p&&p.name)return `<b>${RANKS[p.queen?7:cl(p.rank||0,0,7)].n} ${p.name}</b>`}catch(e){}return `<b>${fallback||""}</b>`}
function kg82Plain(h){return String(h||"").replace(/<[^>]+>/g,"")}
function kg82Art(k){try{const a=ARTS.find(x=>x.k===k);if(a)return a.n}catch(e){}return {theu:"Thêu",nau:"Nấu nướng"}[k]||k}
function kg82Lv(p,k){try{if(typeof artLv==="function"){const v=artLv(p,k);if(typeof v==="number")return v}}catch(e){}return (p.arts&&p.arts[k])||0}
function kg82Aw(p,k){if(/^(theu|nau)$/.test(k))return kg82Lv(p,k);try{if(typeof artW2==="function")return artW2(p,k)}catch(e){}return kg82Lv(p,k)}
function kg82Help(p){const m=p.maid?(p.maid.loyal||0)/10:0;const s=(p.staff||[]).filter(x=>(x.loyal||0)>=60).length*2;return Math.min(12,m+s)}
/* difficulty / fair NPC roll (j91): lv = the person's best art level in the kind's formula (0–5); a higher level makes the game easier
   (wider timing windows, longer looks); NPCs (person rivals) roll the mini-game by the SAME level: raw ≈ 4 + 0.4·lv ± 4 */
function kg82LvFor(p,kind){let m=0;try{kg82FormulaOf(kind).forEach(([s])=>{if(s!=="help"&&!KG82_STAT[s])m=Math.max(m,kg82Lv(p,s)||0)})}catch(e){}return cl(Math.round(m),0,5)}
function kg82NpcMean(lv){return 4+.4*lv}
function kg82NpcRaw(p,kind){const r=(Math.random()+Math.random()+Math.random())/3;return cl(Math.round(kg82NpcMean(kg82LvFor(p,kind))+(r-.5)*8),0,10)}
window.kg82NpcRaw=kg82NpcRaw;window.kg82LvFor=kg82LvFor;
/* mg-easy (owner 15/11): the games that look like "knowledge" (thơ, câu đối, vấn đáp của khảo hạch, cờ) must be winnable by matching what is SHOWN, never by knowing old verse.
   Difficulty follows the player's own level: tier 0 (lv 0–1) Dễ = fewest blanks/pairs, the aid drawn on the board, wrong tries bounce back, most time;
   tier 1 (lv 2–3) Vừa; tier 2 (lv 4+) Khó = more to fill, aids only on the Gợi ý button. Every tier keeps the Gợi ý button (costs a little, never blocks). */
const KG82_KNOW={tho:1,doi:1,co:1,le:1,tc:1,xa:1,thq:1};
function kg82Know(kind){return !!KG82_KNOW[kind]}
function kg82Tier(e){/* mg-balance 16/11: env.lv is the board EASE from mgTier (jmgt), higher = easier; aid tier 0 Dễ · 1 Vừa · 2 Khó (BAL.mgTier.aid) */const A=BAL.mgTier.aid;e=+e||0;return e>=A[0]?0:e>=A[1]?1:2}
/* "first time" flag per game kind: the 1-screen demo shows once (S.mgSeen, old saves start empty) */
function kg82Seen(kind,set){try{if(KG82.noDemo)return true;if(typeof S==="undefined"||!S)return true;const m=S.mgSeen||(S.mgSeen={});if(set){m[kind]=1;return true}return !!m[kind]}catch(e){return true}}
function kg82DiffWord(lv,kind){return mgDiffTxt(KG82.tier||mgTier(kind,{lv}),kind)}
function kg82StatV(p,s){if(s==="sac"){try{return effSac(p)}catch(e){return p.sac||0}}return p[s]||0}
/* the talent parts of a person for a kind: [[label, points]] (rounded so they add up to the rounded total) */
function kg82Parts(p,kind){const F=kg82FormulaOf(kind);const raw=[];F.forEach(([s,c])=>{if(s==="help"){raw.push([`Người hầu đắc lực`,kg82Help(p)*c]);return}
  if(KG82_STAT[s]){const v=Math.round(kg82StatV(p,s));raw.push([`${KG82_STAT[s]} ${v}`,kg82StatV(p,s)*c]);return}
  const l=kg82Lv(p,s),w=kg82Aw(p,s);raw.push([`${kg82Art(s)} bậc ${l}`,l*c]);
  /* the Emperor's taste doubles the effective level (same rule as artW2 / j71): shown as its own line */
  if(w!==l)raw.push([`${kg82Art(s)}: Hoàng thượng ${s==="vu"?"mê sắc":"trọng tài"} ×2`,(w-l)*c])});
 const tot=Math.round(raw.reduce((a,x)=>a+x[1],0));const P=raw.map(([l,v])=>[l,Math.round(v)]);let d=tot-P.reduce((a,x)=>a+x[1],0);
 if(d&&P.length){let bi=0;P.forEach((x,i)=>{if(x[1]>P[bi][1])bi=i});P[bi][1]+=d}return{parts:P.filter(x=>x[1]),total:tot}}
function kg82Kind(art,artName,plain){let k=String(art||"");if(plain&&KG82_PLAIN[k])k=KG82_PLAIN[k];else if(!KG82_KIND[k]&&KG82_PLAIN[k])k=KG82_PLAIN[k];
 if(k==="hoa"&&artName&&!/cắm/i.test(artName)&&/họa|vẽ/i.test(artName))k="ve";return KG82_KIND[k]?k:"dan"}
function kg82Pluck(i,ok){try{if(typeof auOk!=="function"||!auOk())return;const C=window.__bellCtx||(window.__bellCtx=new (window.AudioContext||window.webkitAudioContext)());const t=C.currentTime;
 const f=ok?[392,440,523,587,659][i%5]:196;const o=C.createOscillator(),v=C.createGain();o.type=ok?"triangle":"sine";o.frequency.value=f;const g=(typeof OPT!=="undefined"&&OPT.sfx!=null?OPT.sfx:.6)*(ok?.18:.08);
 v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g,t+.01);v.gain.exponentialRampToValueAtTime(.0001,t+(ok?.9:.25));o.connect(v).connect(C.destination);o.start(t);o.stop(t+1)}catch(e){}}

/* ---------- the overlay host (the kit frame inside #ov) ---------- */
const KG82={run:null,peek:()=>null,phase:"",kinds:KG82_KIND};
window.KG82=KG82;
/* the progress cell's label follows the game type (review/small-bugs-2): exams count "Môn", contest results "Hạng", the engines their own
   word ("Hồi 2/5" -> Hồi · 2/5, "Câu 1/5" -> Câu · 1/5). o.round = a fixed word for the whole frame (exam: "Môn"; engine updates then keep it). */
const KG82_RW=/^(Hồi|Câu|Môn|Vòng|Lượt|Bước)\s+(.+)$/,KG82_PLACE=/^(Nhất|Nhì|Ba|Hạng\s*\d+)$/;
/* the painted illustration of what is contested (picture LEFT of every game frame, owner 15/11): the kind's own board painting */
/* kinds with no board painting yet (duho, den, may): no picture column at all (KIT REQUEST) */
function kg82Pic(kind){return ["duho","den","may"].includes(kind)?"":`img/kit/mg-${kg82BgName(kind)}.webp`}
function kg82Frame(o){KG82.rlock=o.round||"";const hud=[["score","Phần","0/10"],["round",o.round||"Hồi",o.roundV||"–"],["time","Còn","–"]];
 if(kg82Kit())return kitGameFrame({art:o.art,title:o.title,how:o.how,hud,id:"kg82box",pic:o.pic});
 return `<div class="kgame"><div class="kph"><b class="kpseal">TÀI NGHỆ</b><span class="kpht"><span class="kptitle">${o.art}: ${o.title}</span></span></div><div class="kghow"><span class="krl">Cách chơi</span><span>${o.how}</span></div>`+
  `<div class="kghud">${hud.map(([k,l,v])=>`<span class="kgc"><small>${l}</small><b data-kg="${k}">${v}</b></span>`).join("")}</div><div class="kgbox" id="kg82box"></div><div class="kgres" id="kg82box-res" hidden></div></div>`}
/* a HUD count "a/b" (Phần 7/10, Hồi 2/3) never shows above its ceiling; KG82.over counts any engine that tried (tests fail on it) */
function kg82Cap(v){if(typeof v!=="string")return v;return v.replace(/(\d+)\/(\d+)/,(m,a,b)=>{if(+a>+b){KG82.over=(KG82.over||0)+1;return b+"/"+b}return m})}
function kg82Set(k,v){if(k==="round"&&typeof v==="string"){let lab=null;const m=KG82_RW.exec(v.trim());
  if(m){if(KG82.rlock&&m[1]!==KG82.rlock)return;lab=m[1];v=m[2]}else if(KG82_PLACE.test(v.trim())){lab="Hạng"}else if(KG82.rlock)lab=KG82.rlock;
  if(lab)document.querySelectorAll('[data-kg="round"]').forEach(e=>{const l=e.previousElementSibling;if(l&&l.tagName==="SMALL"&&l.textContent!==lab)l.textContent=lab})}
 kg82Set0(k,v)}
function kg82Set0(k,v){if(typeof kitGameSet==="function")kitGameSet(k,v);else document.querySelectorAll(`[data-kg="${k}"]`).forEach(e=>e.innerHTML=v)}
function kg82Open(o){kg82Close(true);const ov=$("ov");if(!ov)return null;[...ov.children].forEach(c=>{if(c.id!=="kg82"){c.dataset.kg82h=c.hidden?"1":"0";c.hidden=true}});
 const d=document.createElement("div");d.id="kg82";d.className="mg kpanel kgame kg82 kg-idle";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.innerHTML=kg82Frame(o);ov.appendChild(d);ov.hidden=false;d.scrollTop=0;return d}
function kg82Close(silent){if(KG82.run&&KG82.run.stop){try{KG82.run.stop()}catch(e){}}KG82.run=null;KG82.peek=()=>null;KG82.phase="";
 const d=kg82El();if(!d)return;const ov=$("ov");d.remove();[...ov.children].forEach(c=>{if(c.dataset.kg82h!=null){c.hidden=c.dataset.kg82h==="1";delete c.dataset.kg82h}});
 if(typeof mgDone==="undefined"||mgDone)ov.hidden=true}
const kg82Box=()=>document.getElementById("kg82box");
function kg82ShowRes(html){{const d=kg82El();if(d){d.classList.remove("kg-run");d.classList.add("kg-idle")}}const bx=kg82Box(),res=$("kg82box-res");if(res){bx.innerHTML="";bx.hidden=true;res.innerHTML=html;res.hidden=false}else bx.innerHTML=html}

/* ---------- canvas helper ---------- */
function kg82Canvas(box,hRatio,hMax,hMin){const W=Math.max(240,Math.floor(box.clientWidth||300));const H=Math.round(Math.min(W*hRatio,hMax||520,Math.max(hMin||260,(innerHeight||800)*.56)));
 const cv=document.createElement("canvas");const r=Math.min(3,window.devicePixelRatio||1);cv.width=W*r;cv.height=H*r;cv.style.width=W+"px";cv.style.height=H+"px";cv.className="kg82cv";
 const g=cv.getContext("2d");g.setTransform(r,0,0,r,0,0);box.appendChild(cv);
 const at=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*W/b.width,(e.clientY-b.top)*H/b.height]};
 const client=(x,y)=>{const b=cv.getBoundingClientRect();return{x:b.left+x*b.width/W,y:b.top+y*b.height/H}};
 return{cv,g,W,H,at,client}}
const KG82_SILK={};
function kg82Silk(g,W,H,a,b){const key=[W,H,a,b].join("|");let c=KG82_SILK[key];
 if(!c){c=document.createElement("canvas");const r=Math.min(3,window.devicePixelRatio||1);c.width=W*r;c.height=H*r;const x=c.getContext("2d");x.setTransform(r,0,0,r,0,0);kg82Silk0(x,W,H,a,b);KG82_SILK[key]=c}
 g.drawImage(c,0,0,W,H)}
function kg82Silk0(g,W,H,a,b){const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,a);gr.addColorStop(1,b);g.fillStyle=gr;g.fillRect(0,0,W,H);
 g.save();g.globalAlpha=.06;g.strokeStyle="#8f5f0c";g.lineWidth=1;for(let y=8;y<H;y+=14){g.beginPath();for(let x=0;x<=W;x+=12)g.lineTo(x,y+Math.sin((x+y)/30)*2);g.stroke()}g.restore()}
function kg82Blossom(g,x,y,r,col,glow){g.save();g.translate(x,y);if(glow){g.shadowColor=col;g.shadowBlur=r*.9}g.fillStyle=col;
 for(let i=0;i<5;i++){g.rotate(Math.PI*2/5);g.beginPath();g.ellipse(0,-r*.55,r*.42,r*.55,0,0,Math.PI*2);g.fill()}g.shadowBlur=0;g.fillStyle="#f0d070";g.beginPath();g.arc(0,0,r*.25,0,Math.PI*2);g.fill();g.restore()}
/* ---------- painted art (gpt-2-6, img/kit/mg-*.webp; KIT.md §13): board backgrounds + transparent sprites ----------
   the canvas only draws small live marks (aim trail, beat line, melody ribbon, ink strokes, threads, gauges) and places these pictures */
const KG82_IMG={};
function kg82Img(n){let i=KG82_IMG[n];if(!i){i=new Image();i.decoding="async";i.src=`img/kit/mg-${n}.webp`;KG82_IMG[n]=i}return i}
function kg82Ok(n){const i=kg82Img(n);return i.complete&&i.naturalWidth>0}
/* contest board vs lesson room: KG82.ctx "thi" (startContest) | "hoc" (lessons, practice, works) */
const KG82_HOC=["dan","co","tho","ve","mua","huong","theu","banh"];
function kg82BgName(kind){return KG82.ctx==="hoc"&&KG82_HOC.includes(kind)?`${kind}-bg-hoc`:`${kind}-bg`}
/* cover-fit the board painting; ay = vertical anchor (1 = keep the bottom, where the play surface is); veil = soft wash for legibility */
const KG82_BGC={};
function kg82Bg(g,W,H,kind,veil,ay){const n=kg82BgName(kind),im=kg82Img(n);
 if(!kg82Ok(n)){kg82Silk(g,W,H,"#f6ead6","#ead6b4");return}
 /* scaled once per board size into an offscreen canvas (cheap per-frame blit) */
 const key=[n,W,H,veil||0,ay].join("|");let c=KG82_BGC[key];
 if(!c){c=document.createElement("canvas");const r=Math.min(3,window.devicePixelRatio||1);c.width=Math.round(W*r);c.height=Math.round(H*r);const x=c.getContext("2d");x.setTransform(r,0,0,r,0,0);
  const iw=im.naturalWidth,ih=im.naturalHeight,k=Math.max(W/iw,H/ih),dw=iw*k,dh=ih*k;x.imageSmoothingQuality="high";x.drawImage(im,(W-dw)/2,(H-dh)*(ay==null?.8:ay),dw,dh);
  if(veil){x.fillStyle=`rgba(255,250,238,${veil})`;x.fillRect(0,0,W,H)}KG82_BGC[key]=c}
 g.drawImage(c,0,0,W,H)}
/* a sprite centred at (x,y); w = drawn width (h from the picture's aspect unless given); o = {rot, alpha, glow, ax, ay (anchor 0..1)} */
function kg82Spr(g,n,x,y,w,h,o){const im=kg82Img(n);if(!(im.complete&&im.naturalWidth))return false;o=o||{};const r=im.naturalHeight/im.naturalWidth;if(w==null)w=h/r;if(h==null)h=w*r;
 g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);if(o.alpha!=null)g.globalAlpha*=o.alpha;if(o.glow){g.shadowColor=o.glow;g.shadowBlur=o.blur||18}
 g.drawImage(im,-w*(o.ax==null?.5:o.ax),-h*(o.ay==null?.5:o.ay),w,h);g.restore();return true}
function kg82SprR(n){const im=kg82Img(n);return im.naturalWidth?im.naturalHeight/im.naturalWidth:1}
/* label on a painting: light halo (or dark halo on night boards) so text always reads */
function kg82Lbl(g,t,x,y,maxW,dark){g.save();g.lineJoin="round";g.lineWidth=3.5;g.strokeStyle=dark?"rgba(20,16,30,.85)":"rgba(255,250,238,.92)";
 const f=g.font,m=f.match(/(\d+(?:\.\d+)?)px/);let px=m?+m[1]:14;if(maxW)while(px>9&&g.measureText(t).width>maxW){px-=1;g.font=f.replace(/\d+(?:\.\d+)?px/,px+"px")}
 g.strokeText(t,x,y);g.fillText(t,x,y);g.restore()}
/* the pictures each kind needs (preloaded before the game starts) */
const KG82_SPR={dan:["dan-blossom","dan-bridge"],hat:["hat-lotus"],co:["co-board","co-black","co-white"],dauho:["dauho-pot","dauho-arrow"],ban:["ban-target","ban-arrow"],
 tho:["tho-slip"],doi:["doi-slip"],doden:["doden-lantern"],ve:["ve-brush","ve-inkstone"],
 hoa:["hoa-vase"].concat(...["peony","orchid","chrys","plum","peach"].map(f=>["l","m","s"].map(s=>`hoa-${f}-${s}`))),
 theu:["theu-peony","theu-butterfly","theu-crane","theu-cloud"],kim:["kim-knot","kim-needle","kim-spool"],mua:["mua-mat","mua-fan"],
 banh:["banh-stove","banh-pot","banh-flame","tho-slip"].concat("nuoc sen nhan duong ga thuoc tao kytu gao dung yen xuong cusen hanh ot giam mam ruou muoi".split(" ").map(x=>"banh-"+x)),
 huong:["huong-censer"].concat("tram nhai que hong bacha dan moclan".split(" ").map(x=>"huong-"+x))};
function kg82Preload(kind){const L=[kg82BgName(kind)].concat(KG82_SPR[kind]||[]);return Promise.race([Promise.all(L.map(n=>{const i=kg82Img(n);return i.complete?Promise.resolve():new Promise(r=>{i.addEventListener("load",r,{once:true});i.addEventListener("error",r,{once:true})})})),new Promise(r=>setTimeout(r,2500))])}
window.kg82Img=kg82Img;window.kg82Bg=kg82Bg;window.kg82Spr=kg82Spr;
/* a new pop replaces any live pop it would land on (two pops never stack: "Trượt" + "Tuyệt!" on one string) */
function kg82Pop(list,x,y,t,col){const now=performance.now(),w=String(t).length*9;for(let i=list.length-1;i>=0;i--){const q=list[i];const dy=Math.abs((q.y-(now-q.a)/700*26)-y);if(Math.abs(q.x-x)<(w+String(q.t).length*9)/2+6&&dy<30)list.splice(i,1)}list.push({x,y,t,col,a:now})}
function kg82DrawPops(g,list,now){for(let i=list.length-1;i>=0;i--){const p=list[i],k=(now-p.a)/700;if(k>=1){list.splice(i,1);continue}
 KG82.inPop=1;g.save();g.globalAlpha=1-k;g.fillStyle=p.col;g.font=`700 ${16}px ${kg82Col("--display","serif")||"serif"}`;g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,p.t,p.x,p.y-k*26);g.restore();KG82.inPop=0}}

/* =============== ENGINES: eng(box, env) -> stop(); env.end(raw0to10) once; env.hud({score,round,time}); KG82.peek for tests =============== */
/* 1. RHYTHM (đàn, hát): plum blossoms fall along four strings, tap the string at the vermilion line */
function kg82Rhythm(box,env){const C=kg82Canvas(box,1.05,480),{g,W,H}=C;const L=env.kind==="hat"?["Cung","Thương","Giốc","Chủy"]:["Cung","Thương","Giốc","Chủy"];
 const N=20,fall=2100+(env.lv||0)*80,HIT=H*.8,lw=W/4,WIN=220+(env.lv||0)*14;const notes=[];let t=1700,last=-1,rep=0;
 for(let i=0;i<N;i++){let l=Math.floor(Math.random()*4);if(l===last&&++rep>=2){l=(l+1+Math.floor(Math.random()*3))%4;rep=0}else if(l!==last)rep=0;last=l;notes.push({l,t,st:0});t+=880+Math.floor(Math.random()*260)}
 const end=notes[N-1].t+700;let credit=0,miss=0,stop=false,raf=0;const pops=[],flash=[0,0,0,0];const t0=performance.now();
 const pc=kg82Col("--peony","#e48aa4"),red=kg82Col("--red","#c23b22"),gold=kg82Col("--gold","#8f5f0c");
 const sc=()=>Math.round(10*Math.max(0,credit)/N);
 function draw(now){const tt=now-t0;kg82Bg(g,W,H,env.kind,.08,1);const bw=Math.min(46,lw*.42);
  for(let i=0;i<4;i++){const x=lw*(i+.5);if(flash[i]>now){g.fillStyle="#fff3c855";g.fillRect(lw*i,0,lw,H)}
   /* the silk string (live mark) and its painted bridge */
   g.strokeStyle="#5a3a0c";g.lineWidth=2.6+i*.5;g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();g.strokeStyle="#f3dfa8";g.lineWidth=1.4+i*.5;g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();
   kg82Spr(g,"dan-bridge",x,HIT+4,bw,null,{ay:0})}
  g.fillStyle=red;g.fillRect(0,HIT-2,W,4);g.fillStyle="#f0d070";g.fillRect(0,HIT-3,W,1);
  const br=Math.min(22,lw*.27);for(const n of notes){if(n.st)continue;const y=(tt-(n.t-fall))/fall*HIT;if(y<-20||y>H+20)continue;if(!kg82Spr(g,"dan-blossom",lw*(n.l+.5),y,br*2,null,{rot:(y/90)%6.28}))kg82Blossom(g,lw*(n.l+.5),y,br*.8,pc,true)}
  g.fillStyle="#5a3a0c";g.font=`700 ${Math.max(12,Math.min(16,lw*.15))}px ${kg82Col("--display","serif")}`;g.textAlign="center";L.forEach((n,i)=>kg82Lbl(g,n,lw*(i+.5),H-10));
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;
  for(const n of notes)if(!n.st&&tt-n.t>WIN){n.st=2;miss++;kg82Pop(pops,lw*(n.l+.5),HIT-24,"Trượt","#8a7350")}
  const done=notes.filter(n=>n.st).length;env.hud({score:`${sc()}/10`,round:`Hồi ${Math.min(N,done+1)}/${N}`,time:`${Math.max(0,Math.ceil((end-tt)/1000))} giây`});
  draw(now);if(tt>end){stop=true;return env.end(sc())}raf=requestAnimationFrame(frame)}
 function tap(l){if(stop)return;const tt=performance.now()-t0;let best=null,bd=1e9;for(const n of notes){if(n.st||n.l!==l)continue;const d=Math.abs(n.t-tt);if(d<bd){bd=d;best=n}}
  flash[l]=performance.now()+120;
  if(best&&bd<=WIN){best.st=1;const q=bd<=100?1:.6;credit+=q;kg82Pop(pops,lw*(l+.5),HIT-24,q===1?"Tuyệt!":"Được",q===1?kg82Col("--good","#2d7a52"):gold);kg82Pluck(l,true)}
  else{credit-=.3;kg82Pop(pops,lw*(l+.5),HIT-24,"Lệch",red);kg82Pluck(l,false)}}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();const [x]=C.at(e);tap(cl(Math.floor(x/lw),0,3))});
 const keys={d:0,f:1,j:2,k:3,"1":0,"2":1,"3":2,"4":3};const kd=e=>{if(e.key in keys){e.preventDefault();tap(keys[e.key])}};document.addEventListener("keydown",kd);
 KG82.peek=()=>{const tt=performance.now()-t0;const n=notes.find(n=>!n.st&&Math.abs(n.t-tt)<90);return n?C.client(lw*(n.l+.5),HIT):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}

/* 2. GO (cờ): find the move that captures the white group in atari */
function kg82GoGen(n,sz){const idx=(r,c)=>r*n+c,nb=i=>{const r=Math.floor(i/n),c=i%n,o=[];if(r>0)o.push(i-n);if(r<n-1)o.push(i+n);if(c>0)o.push(i-1);if(c<n-1)o.push(i+1);return o};
 const groups=B=>{const seen=new Set(),G=[];for(let i=0;i<B.length;i++){if(!B[i]||seen.has(i))continue;const st=[i],gp=[],lib=new Set();seen.add(i);
  while(st.length){const j=st.pop();gp.push(j);for(const k of nb(j)){if(!B[k])lib.add(k);else if(B[k]===B[i]&&!seen.has(k)){seen.add(k);st.push(k)}}}G.push({c:B[i],s:gp,lib})}return G};
 for(let a=0;a<400;a++){const B=Array(n*n).fill(0);let s=idx(1+Math.floor(Math.random()*(n-2)),1+Math.floor(Math.random()*(n-2)));const W=[s];B[s]=2;
  while(W.length<sz){const c=nb(W[Math.floor(Math.random()*W.length)]).filter(k=>!B[k]);if(!c.length)break;const k=c[Math.floor(Math.random()*c.length)];B[k]=2;W.push(k)}
  if(W.length<sz)continue;const lib=[...new Set(W.flatMap(nb).filter(k=>!B[k]))];if(lib.length<2)continue;const L=lib[Math.floor(Math.random()*lib.length)];lib.forEach(k=>{if(k!==L)B[k]=1});
  const extra=3+Math.floor(Math.random()*4);for(let e=0,t=0;e<extra&&t<60;t++){const k=Math.floor(Math.random()*n*n);if(B[k]||k===L||nb(k).includes(L))continue;B[k]=e%2?1:2;e++}
  const G=groups(B);if(G.some(x=>x.lib.size===0))continue;
  const caps=new Set();for(let i=0;i<B.length;i++){if(B[i])continue;for(const x of G)if(x.c===2&&x.lib.size===1&&x.lib.has(i))caps.add(i)}
  if(caps.size!==1||!caps.has(L))continue;
  /* the black stones that surround must not be capturable by a white move either (keeps the puzzle clean) */
  if(G.some(x=>x.c===1&&x.lib.size===1))continue;
  const tgt=G.find(x=>x.c===2&&x.lib.has(L)&&x.lib.size===1);return{B,L,cap:tgt.s}}
 return null}
function kg82Go(box,env){const n=7,C=kg82Canvas(box,1,460),{g,W,H}=C;const S0=Math.min(W,H),ox=(W-S0)/2,s=S0/(n+.4),m=s*.7;
 const px=i=>ox+m+(i%n)*s,py=i=>(H-S0)/2+m+Math.floor(i/n)*s;const R0=[1,2,2,3,3];let round=0,pts=0,P=null,phase="",t0=0,stop=false,raf=0,mark=null,fade=null;const pops=[];
 /* mg-easy: tier 0/1 draw a gold ring round the white group in danger (it has ONE empty neighbour left); a quiet glow shows that last empty spot when she stalls or presses Gợi ý (a little score) */
 const tier=kg82Tier(env.lv),LIM=[22000,15000,10000][tier],IDLE=[6000,10000,0][tier];let hintAt=0,hinted=false,tAct=0;
 const hb=document.createElement("div");hb.className="kg82act";hb.innerHTML=`<button class="kgbtn" id="kg82gohint">Gợi ý<small>chỉ chỗ ăn, bớt một ít phần</small></button>`;box.appendChild(hb);
 const doHint=()=>{if(phase!=="play"||stop||!P)return;if(!hinted){hinted=true;kg82Pop(pops,px(P.L),py(P.L)-s*.6,"Quân trắng chỉ còn một khí ở đây",kg82Col("--gold","#8f5f0c"))}hintAt=performance.now()};hb.querySelector("button").onclick=doHint;
 function next(){if(stop)return;if(round>=R0.length){stop=true;return setTimeout(()=>env.end(Math.round(pts)),300)}P=kg82GoGen(n,R0[round])||kg82GoGen(n,1);mark=null;fade=null;phase="play";t0=tAct=performance.now();hintAt=0;hinted=false}
 function stone(x,y,c,a){if(kg82Spr(g,c===1?"co-black":"co-white",x,y,s*.92,s*.92,{alpha:a==null?1:a}))return;g.save();g.globalAlpha=a==null?1:a;const r=s*.44;const gr=g.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);
  if(c===1){gr.addColorStop(0,"#666");gr.addColorStop(1,"#111")}else{gr.addColorStop(0,"#fff");gr.addColorStop(1,"#cfc8bc")}g.fillStyle=gr;g.shadowColor="#0006";g.shadowBlur=3;g.shadowOffsetY=1.5;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.restore()}
 function draw(now){kg82Bg(g,W,H,"co",0,1);const bx=ox+m-s*.55,by=(H-S0)/2+m-s*.55,bs=(n-1)*s+s*1.1;
  /* the painted board (its carved rim sits outside the 7×7 lines) */
  if(!kg82Spr(g,"co-board",bx+bs/2,by+bs/2,bs*1.16,bs*1.16)){g.fillStyle="#e2bf7c";g.fillRect(bx,by,bs,bs)}
  g.strokeStyle="#4a3010";g.lineWidth=1;for(let k=0;k<n;k++){g.beginPath();g.moveTo(px(k),py(0));g.lineTo(px(k),py((n-1)*n));g.stroke();g.beginPath();g.moveTo(px(0),py(k*n));g.lineTo(px(n-1),py(k*n));g.stroke()}
  [[1,1],[1,5],[5,1],[5,5],[3,3]].forEach(([r,c])=>{g.fillStyle="#4a3010";g.beginPath();g.arc(px(r*n+c),py(r*n+c),2.5,0,Math.PI*2);g.fill()});
  if(P){P.B.forEach((v,i)=>{if(!v)return;let a=1;if(fade&&fade.s.includes(i))a=Math.max(0,1-(now-fade.a)/500);if(a>0)stone(px(i),py(i),v,a)});
   if(phase==="play"&&tier<2){g.save();g.strokeStyle="#e0a526";g.lineWidth=2.5;g.setLineDash([4,4]);g.globalAlpha=.8;P.cap.forEach(i=>{g.beginPath();g.arc(px(i),py(i),s*.5,0,Math.PI*2);g.stroke()});g.restore()}
   if(phase==="play"&&hintAt){g.save();g.strokeStyle=kg82Col("--good","#2d7a52");g.lineWidth=3;g.globalAlpha=.55+.45*Math.sin(now/160);g.beginPath();g.arc(px(P.L),py(P.L),s*.4+Math.sin(now/160)*2,0,Math.PI*2);g.stroke();g.restore()}
   if(mark){if(mark.ok){stone(px(mark.i),py(mark.i),1)}else{if(!mark.miss){g.strokeStyle=kg82Col("--red","#c23b22");g.lineWidth=3;const x=px(mark.i),y=py(mark.i),d=s*.25;g.beginPath();g.moveTo(x-d,y-d);g.lineTo(x+d,y+d);g.moveTo(x+d,y-d);g.lineTo(x-d,y+d);g.stroke()}
     g.strokeStyle=kg82Col("--good","#2d7a52");g.beginPath();g.arc(px(P.L),py(P.L),s*.42+Math.sin(now/90)*2,0,Math.PI*2);g.stroke()}}}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop&&!fade)return;if(phase==="play"){const left=LIM-(now-t0);if(IDLE&&!hintAt&&now-tAct>IDLE)doHint();if(left<=0){phase="wait";kg82Pop(pops,px(P.L),py(P.L)-s*.6,"Hết giờ","#8a7350");mark={i:P.L,ok:false,miss:1};round++;setTimeout(next,900)}
   env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(round+1,5)}/5`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}else env.hud({score:`${Math.round(pts)}/10`,time:"–"});
  draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(phase!=="play"||stop)return;tAct=performance.now();const [x,y]=C.at(e);let bi=-1,bd=1e9;for(let i=0;i<n*n;i++){const d=Math.hypot(px(i)-x,py(i)-y);if(d<bd){bd=d;bi=i}}
  if(bd>s*.6||P.B[bi])return;phase="wait";if(bi===P.L){pts+=hinted?1.4:2;mark={i:bi,ok:true};fade={s:P.cap,a:performance.now()};kg82Pop(pops,px(bi),py(bi)-s*.6,`Ăn ${P.cap.length} quân!`,kg82Col("--good","#2d7a52"));kg82Pluck(2,true)}
  else{mark={i:bi,ok:false};kg82Pop(pops,px(bi),py(bi)-s*.6,"Chưa ăn được",kg82Col("--red","#c23b22"));kg82Pluck(0,false)}round++;setTimeout(next,950)});
 KG82.peek=()=>phase==="play"&&P?C.client(px(P.L),py(P.L)):null;next();raf=requestAnimationFrame(frame);return()=>{stop=true;fade=null;cancelAnimationFrame(raf)}}

/* 3. QUIZ (bếp núc, điều hương) */
function kg82Bank(b){const wc=s=>s.replace(/,/g,"").split(" ").length;
 if(b==="doi"){const D=typeof DOI!=="undefined"?DOI:[["Núi cao mây phủ","Sông rộng sóng xô"]];return kg82Shuf(D).slice(0,5).map(([x,y])=>{let w=D.filter(p=>p[1]!==y&&wc(p[1])===wc(y)).map(p=>p[1]);if(w.length<2)w=w.concat(D.filter(p=>p[1]!==y&&!w.includes(p[1])).map(p=>p[1]));return{l:"Vế ra",q:x,a:y,w:kg82Shuf(w).slice(0,3)}})}
 const B=b==="bep"?KG82_BEP:b==="y"&&typeof YQ!=="undefined"?YQ:KG82_HUONG;return kg82Shuf(B).slice(0,5).map(x=>({l:"Câu hỏi",q:x.q,a:x.a,w:kg82Shuf(x.w).slice(0,3)}))}
function kg82Quiz(box,env){const Qs=kg82Bank(KG82_KIND[env.kind].b);let r=0,pts=0,stop=false,tm=0,t0=0,lock=false,cur=null,cost=0,gone=[],tAct=0,auto=false;
 /* mg-easy: tier by the player's level: fewer wrong choices, more time, the Gợi ý button (drops one wrong answer; a little score) and, at tier 0/1, a quiet auto-hint when she stalls */
 const tier=kg82Tier(env.lv),NW=[1,2,3][tier],LIM=[20000,15000,10000][tier],IDLE=[8000,13000,0][tier],HC=.6,AC=.3;
 const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);
 function wrongs(){return cur.map((o,i)=>i).filter(i=>cur[i]!==Qs[r].a&&!gone.includes(i))}
 function show(){if(stop)return;if(r>=Qs.length){stop=true;return env.end(pts)}const q=Qs[r];cur=kg82Shuf([q.a].concat(kg82Shuf(q.w).slice(0,NW)));lock=false;gone=[];cost=0;auto=false;t0=tAct=performance.now();
  wrap.innerHTML=kg82Rows([[q.l,`<span class="ef t"><b>${q.q}</b></span>`]])+`<div class="kg82opts">${cur.map((o,i)=>`<button class="kgbtn" data-i="${i}">${o}</button>`).join("")}</div>`+
   `<div class="kg82act"><button class="kgbtn" data-hint="1" id="kg82hint">Gợi ý<small>bỏ một lời sai, bớt một ít phần</small></button></div><div class="kpnote" id="kg82tip" style="visibility:hidden">&nbsp;</div>`;
  wrap.querySelectorAll("button[data-i]").forEach(b=>b.onclick=()=>pickA(+b.dataset.i));wrap.querySelector("#kg82hint").onclick=()=>hint(false);tip(IDLE?"Chưa rõ thì chạm Gợi ý, ma ma sẽ chỉ cho một lời không hợp.":"")}
 function tip(t){const e=wrap.querySelector("#kg82tip");if(e){e.textContent=t||"\u00a0";e.style.visibility=t?"":"hidden"}}
 function hint(isAuto){if(lock||stop)return;const w=wrongs();if(!w.length){tip("Chỉ còn lời đúng, cứ chọn.");return}const i=w[Math.floor(Math.random()*w.length)];gone.push(i);cost+=isAuto?AC:HC;tAct=performance.now();
  const b=wrap.querySelector(`button[data-i="${i}"]`);if(b){b.disabled=true;b.innerHTML=kg82Chip(`✗ ${cur[i]}`,"r")}
  tip(isAuto?"Ma ma khẽ nhắc: lời này chưa hợp.":"Lời này chưa hợp, bỏ đi."+(wrongs().length?"":" Còn một lời, chọn nó."));if(!wrongs().length){const h=wrap.querySelector("#kg82hint");if(h)h.disabled=true}}
 function pickA(i){if(lock||stop)return;lock=true;const q=Qs[r];const ok=i>=0&&cur[i]===q.a;if(ok)pts+=Math.max(.4,2-cost);kg82Pluck(ok?3:0,ok);
  wrap.querySelectorAll("button[data-i]").forEach(b=>{const k=+b.dataset.i;b.disabled=true;if(cur[k]===q.a)b.innerHTML=kg82Chip(`✓ ${cur[k]}`,"g");else if(k===i)b.innerHTML=kg82Chip(`✗ ${cur[k]}`,"r")});
  const h=wrap.querySelector("#kg82hint");if(h)h.disabled=true;
  if(i<0)wrap.insertAdjacentHTML("beforeend",kg82Rows([["Hết giờ",`Lời đúng: ${q.a}`,"r"]]));r++;setTimeout(show,1000)}
 tm=setInterval(()=>{if(stop)return;const now=performance.now(),left=LIM-(now-t0);env.hud({score:`${Math.round(pts)}/10`,round:`Câu ${Math.min(r+1,5)}/5`,time:`${Math.max(0,Math.ceil(left/1000))} giây`});if(left<=0&&!lock)pickA(-1);
  else if(IDLE&&!lock&&now-tAct>IDLE&&wrongs().length>1)hint(true)},150);
 KG82.peek=()=>{if(lock||stop||!cur)return null;const i=cur.indexOf(Qs[r].a);return{sel:`#${box.id||"kg82box"} button[data-i="${i}"]`}};
 show();return()=>{stop=true;clearInterval(tm)}}

/* 4. PATTERN (vẽ, cắm hoa, thêu, khéo tay): remember which cells were painted */
function kg82Pattern(box,env){const n=4,C=kg82Canvas(box,1,440),{g,W,H}=C;const S0=Math.min(W,H)-8,ox=(W-S0)/2,oy=(H-S0)/2,c=S0/n;const mot=KG82_KIND[env.kind].m;
 const R0=[3,4,4,5,6];let round=0,pts=0,pat=[],tapped=[],phase="",t0=0,stop=false,raf=0;const pops=[];const LIM=9000,SHOW=2300+(env.lv||0)*160;
 const cx=i=>ox+(i%n+.5)*c,cy=i=>oy+(Math.floor(i/n)+.5)*c;
 function motif(i,a,ghost){g.save();g.globalAlpha=a;const x=cx(i),y=cy(i),r=c*.34;
  if(ghost){g.strokeStyle=kg82Col("--good","#2d7a52");g.setLineDash([5,4]);g.lineWidth=2;g.strokeRect(x-r,y-r,r*2,r*2);g.restore();return}
  if(kg82Spr(g,["theu-peony","theu-butterfly","theu-crane","theu-cloud"][i%4],x,y,r*2.3,r*2.3)){g.restore();return}
  if(mot==="ink"){/* three bamboo leaves in one brush stroke each, tapered, ink wash */
   g.lineCap="round";g.strokeStyle="#3a2a1e";g.lineWidth=Math.max(1.5,r*.06);g.beginPath();g.moveTo(x-r*.9,y+r*.95);g.quadraticCurveTo(x-r*.2,y+r*.1,x+r*.05,y-r*.2);g.stroke();
   [[-.15,1.0,.0],[.55,.9,-.9],[-.85,.85,-2.0]].forEach(([ang,len,rot],j)=>{g.save();g.translate(x+r*.05,y-r*.2);g.rotate(ang+rot*.35);const L=r*1.05*len,w=r*.24;
    const gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,"#1e140e");gr.addColorStop(1,"#5a4636");g.fillStyle=gr;g.globalAlpha=a*(j===2?.7:1);
    g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(L*.45,-w,L,0);g.quadraticCurveTo(L*.45,w*.55,0,0);g.fill();g.restore()});
   g.globalAlpha=a;g.fillStyle="#c23b22";g.fillRect(x+r*.62,y+r*.55,r*.26,r*.26)}
  else if(mot==="flower"){kg82Blossom(g,x,y,r*.95,kg82Col("--peony","#e48aa4"),false);g.strokeStyle="#5fa58c";g.lineWidth=3;g.beginPath();g.moveTo(x,y+r*.5);g.quadraticCurveTo(x+r*.4,y+r,x+r*.1,y+r*1.2);g.stroke()}
  else{g.strokeStyle="#c23b22";g.lineWidth=r*.16;g.lineCap="round";for(const d of[-.5,0,.5]){g.beginPath();g.moveTo(x-r*.7+d*r,y-r*.7);g.lineTo(x+r*.7+d*r,y+r*.7);g.stroke()}g.strokeStyle="#c9a03a";for(const d of[-.5,0,.5]){g.beginPath();g.moveTo(x+r*.7+d*r,y-r*.7);g.lineTo(x-r*.7+d*r,y+r*.7);g.stroke()}}
  g.restore()}
 function next(){if(stop)return;if(round>=R0.length){stop=true;return setTimeout(()=>env.end(Math.round(pts)),300)}pat=kg82Shuf([...Array(n*n).keys()]).slice(0,R0[round]);tapped=[];phase="show";t0=performance.now()}
 function judge(){phase="judge";const ok=tapped.filter(i=>pat.includes(i)).length;const got=2*ok/pat.length;pts+=got;
  kg82Pop(pops,W/2,oy+18,ok===pat.length?"Đúng cả!":`Đúng ${ok}/${pat.length}`,ok===pat.length?kg82Col("--good","#2d7a52"):kg82Col("--gold","#8f5f0c"));round++;setTimeout(next,1100)}
 function draw(now){kg82Bg(g,W,H,env.kind,0,1);
  /* stitch guide on the painted silk: hairline cells only */
  g.save();g.strokeStyle="#b8935588";g.lineWidth=1;g.setLineDash([3,4]);for(let i=0;i<n*n;i++){const x=ox+(i%n)*c,y=oy+Math.floor(i/n)*c;g.fillStyle=KG82.ctx==="hoc"?"rgba(255,250,236,.5)":"rgba(255,252,240,.3)";g.fillRect(x+3,y+3,c-6,c-6);g.strokeRect(x+3,y+3,c-6,c-6)}g.restore();
  if(phase==="show"){const k=(now-t0)/SHOW;const a=k<.1?k*10:k>.85?Math.max(0,(1-k)/.15):1;pat.forEach(i=>motif(i,a))}
  else{tapped.forEach(i=>motif(i,pat.includes(i)||phase==="play"?1:.35));if(phase==="judge")pat.filter(i=>!tapped.includes(i)).forEach(i=>motif(i,1,true));
   if(phase==="judge")tapped.filter(i=>!pat.includes(i)).forEach(i=>{g.strokeStyle=kg82Col("--red","#c23b22");g.lineWidth=3;const x=cx(i),y=cy(i),d=c*.18;g.beginPath();g.moveTo(x-d,y-d);g.lineTo(x+d,y+d);g.moveTo(x+d,y-d);g.lineTo(x-d,y+d);g.stroke()})}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop&&phase!=="judge")return;let left=0;if(phase==="show"&&now-t0>SHOW){phase="play";t0=now}
  if(phase==="play"){left=LIM-(now-t0);if(left<=0)judge()}
  env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(round+1,5)}/5`,time:phase==="show"?"nhìn kỹ":phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"});draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(phase!=="play")return;const [x,y]=C.at(e);const cc=Math.floor((x-ox)/c),rr=Math.floor((y-oy)/c);if(cc<0||rr<0||cc>=n||rr>=n)return;const i=rr*n+cc;if(tapped.includes(i))return;
  tapped.push(i);kg82Pluck(tapped.length,pat.includes(i));if(tapped.length>=pat.length)judge()});
 KG82.peek=()=>{if(phase!=="play")return null;const i=pat.find(k=>!tapped.includes(k));return i==null?null:C.client(cx(i),cy(i))};
 next();raf=requestAnimationFrame(frame);return()=>{stop=true;phase="";cancelAnimationFrame(raf)}}

/* 5. STEPS (múa): watch the steps light up, then repeat them */
function kg82Steps(box,env){const C=kg82Canvas(box,1,440),{g,W,H}=C;const V=[["↑","Giơ tay áo"],["←","Xoay trái"],["→","Xoay phải"],["↓","Cúi mình"]];
 const mx=W/2,my=H/2,D=Math.min(W,H)*.31,pr=Math.min(W,H)*.15;const pos=[[mx,my-D],[mx-D,my],[mx+D,my],[mx,my+D]];
 const R0=[3,3,4,4,5];let round=0,pts=0,seq=[],inp=0,phase="",t0=0,stop=false,raf=0,lit=-1,litUntil=0,lastTap=0;const pops=[];const SP=620+(env.lv||0)*30,IDLE=6000;
 const pc=kg82Col("--peony","#e48aa4"),gold=kg82Col("--gold","#8f5f0c");
 function next(){if(stop)return;if(round>=R0.length){stop=true;return setTimeout(()=>env.end(Math.round(pts)),300)}seq=Array.from({length:R0[round]},()=>Math.floor(Math.random()*4));inp=0;phase="show";t0=performance.now()+500}
 function endRound(ok){phase="judge";const got=2*ok/seq.length;pts+=got;kg82Pop(pops,mx,my-8,ok===seq.length?"Đẹp lắm!":`Đúng ${ok}/${seq.length} bước`,ok===seq.length?kg82Col("--good","#2d7a52"):kg82Col("--red","#c23b22"));round++;setTimeout(next,1100)}
 function draw(now){kg82Bg(g,W,H,"mua",0,.55);kg82Spr(g,"mua-fan",mx,my-D*.06,D*.5,null,{alpha:.95});
  let showI=-1;if(phase==="show"){const k=now-t0;if(k>=0){const i=Math.floor(k/SP);if(i>=seq.length){phase="play";lastTap=now}else if(k-i*SP<SP*.72)showI=seq[i]}}
  pos.forEach(([x,y],i)=>{const on=i===showI||(i===lit&&now<litUntil);g.save();
   /* the painted dance cushion; lit = golden glow and a small lift */
   if(!kg82Spr(g,"mua-mat",x,y-(on?3:0),pr*2.05*(on?1.08:1),null,{glow:on?"#ffe08a":null,blur:30})){g.fillStyle=on?pc:"#ecd9b4";g.beginPath();g.arc(x,y,pr,0,Math.PI*2);g.fill()}
   g.fillStyle=on?"#fff6dc":"#fff3e0";g.textAlign="center";g.textBaseline="alphabetic";g.font=`700 ${pr*.62}px serif`;g.save();g.shadowColor="#5a1208";g.shadowBlur=6;g.fillText(V[i][0],x,y+pr*.12);g.restore();
   g.font=`700 ${Math.max(11,Math.min(14,pr*.24))}px ${kg82Col("--body","sans-serif")}`;g.fillStyle="#fff3d6";kg82Lbl(g,V[i][1],x,y+pr*.6,pr*1.6,true);g.restore()});
  if(phase==="play"){g.fillStyle="#3a1a0c";g.font=`700 13px ${kg82Col("--body","sans-serif")}`;g.textAlign="center";kg82Lbl(g,`bước ${inp+1} trên ${seq.length}`,mx,my+D*.36)}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop&&phase!=="judge")return;if(phase==="play"&&now-lastTap>IDLE)endRound(inp);
  env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(round+1,5)}/5`,time:phase==="show"?"xem bước":phase==="play"?`${Math.max(0,Math.ceil((IDLE-(now-lastTap))/1000))} giây`:"–"});draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(phase!=="play")return;const [x,y]=C.at(e);let bi=-1,bd=1e9;pos.forEach(([px,py],i)=>{const d=Math.hypot(px-x,py-y);if(d<bd){bd=d;bi=i}});if(bd>pr*1.5)return;
  lit=bi;litUntil=performance.now()+180;lastTap=performance.now();if(bi===seq[inp]){kg82Pluck(bi,true);inp++;if(inp>=seq.length)endRound(inp)}else{kg82Pluck(0,false);endRound(inp)}});
 KG82.peek=()=>phase==="play"?C.client(...pos[seq[inp]]):null;next();raf=requestAnimationFrame(frame);return()=>{stop=true;phase="";cancelAnimationFrame(raf)}}

/* 6. AIM (bắn cung, đầu hồ): the marker swings, tap when it is over the centre */
function kg82Aim(box,env){const C=kg82Canvas(box,.95,420),{g,W,H}=C;const pot=env.kind==="dauho";const N=6;let k=0,pts=0,stop=false,raf=0,t0=performance.now(),lock=false,shots=[];const pops=[];
 const cx=W/2,ty=H*.58,A=W*.38;const pos=now=>{const w=.0021+k*.00028;return cx+A*Math.sin((now-t0)*w)};let flyAt=0,flyX=0;
 function draw(now){kg82Bg(g,W,H,env.kind,0,.6);
  const kz=Math.min(1.7,Math.min(W,H)/300);
  /* painted target / pot (target face = 128 units across, ~84 % of the picture's width) */
  const art=pot?kg82Spr(g,"dauho-pot",cx,ty-50*kz,36*kz/.42,null,{ay:0}):kg82Spr(g,"ban-target",cx,ty,128*kz,null,{ay:.42});
  g.save();g.translate(cx,ty);g.scale(kz,kz);g.translate(-cx,-ty);
  if(art){}else if(pot){g.save();const gr=g.createLinearGradient(cx-60,0,cx+60,0);gr.addColorStop(0,"#6e4d0e");gr.addColorStop(.5,"#c9a03a");gr.addColorStop(1,"#6e4d0e");g.fillStyle=gr;
   g.beginPath();g.moveTo(cx-18,ty-50);g.lineTo(cx+18,ty-50);g.bezierCurveTo(cx+16,ty-20,cx+62,ty+10,cx+48,ty+70);g.lineTo(cx-48,ty+70);g.bezierCurveTo(cx-62,ty+10,cx-16,ty-20,cx-18,ty-50);g.fill();
   g.fillStyle="#2a1a12";g.beginPath();g.ellipse(cx,ty-50,18,5,0,0,Math.PI*2);g.fill();g.restore()}
  else{[[64,"#fffaf0"],[50,"#2a1a12"],[38,"#6a8aa0"],[26,"#c23b22"],[13,"#f0d070"]].forEach(([r,c])=>{g.fillStyle=c;g.beginPath();g.arc(cx,ty,r,0,Math.PI*2);g.fill()});g.strokeStyle="#6e4d0e";g.lineWidth=2;g.beginPath();g.arc(cx,ty,64,0,Math.PI*2);g.stroke()}
  g.restore();
  const my=pot?ty-50*kz:ty;const an=pot?"dauho-arrow":"ban-arrow";shots.forEach(s=>{if(!kg82Spr(g,an,s.x,my,44*kz,null,{rot:-Math.PI/2+.25,ax:1,ay:.5})){g.strokeStyle="#4a3010";g.lineWidth=2;g.beginPath();g.moveTo(s.x,my);g.lineTo(s.x-6,my-30);g.stroke()}});
  g.strokeStyle="#d2b071";g.lineWidth=2;g.beginPath();g.moveTo(cx-A,H*.16);g.lineTo(cx+A,H*.16);g.stroke();g.fillStyle=kg82Col("--good","#2d7a52");g.fillRect(cx-A*.08,H*.16-3,A*.16,6);
  const x=lock?flyX:pos(now);g.fillStyle="#8a2a1e";g.beginPath();g.moveTo(x,H*.16+4);g.lineTo(x-9,H*.16-12);g.lineTo(x+9,H*.16-12);g.closePath();g.fill();
  if(lock&&now<flyAt+350){const kk=(now-flyAt)/350;const yy=H*.16+((pot?ty-50*kz:ty)-H*.16)*kk;if(!kg82Spr(g,an,flyX,yy,46*kz,null,{rot:Math.PI/2,ax:1,ay:.5})){g.strokeStyle="#4a3010";g.lineWidth=2;g.beginPath();g.moveTo(flyX,yy-20);g.lineTo(flyX,yy);g.stroke()}}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;env.hud({score:`${Math.round(10*pts/N)}/10`,round:`Hồi ${Math.min(k+1,N)}/${N}`,time:`${N-k} ${pot?"tên":"phát"}`});draw(now);raf=requestAnimationFrame(frame)}
 function shoot(){if(lock||stop)return;const now=performance.now();const x=pos(now);const d=Math.abs(x-cx)/A/(1+(env.lv||0)*.06);const q=d<.08?1:d<.2?.75:d<.35?.5:d<.55?.25:0;lock=true;flyAt=now;flyX=x;
  setTimeout(()=>{pts+=q;if(q>0)shots.push({x:cx+(x-cx)*(pot?.35:.55)});kg82Pop(pops,cx,ty-80,q===1?(pot?"Trúng giữa bình!":"Hồng tâm!"):q>=.5?"Trúng":q>0?"Sượt qua":"Trượt",q>=.5?kg82Col("--good","#2d7a52"):q>0?kg82Col("--gold","#8f5f0c"):kg82Col("--red","#c23b22"));kg82Pluck(k,q>0);
   k++;if(k>=N){stop=true;draw(performance.now());return setTimeout(()=>env.end(Math.round(10*pts/N)),600)}setTimeout(()=>{lock=false;t0=performance.now()-Math.random()*1500},450)},360)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();shoot()});const kd=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();shoot()}};document.addEventListener("keydown",kd);
 KG82.peek=()=>{if(lock||stop)return null;const x=pos(performance.now());return Math.abs(x-cx)/A<.04?C.client(W/2,H*.8):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
const KG82_ENG={rhythm:kg82Rhythm,go:kg82Go,quiz:kg82Quiz,pattern:kg82Pattern,steps:kg82Steps,aim:kg82Aim};

/* ---------- running one game inside the frame ---------- */
function kg82Play(kind,onEnd){const box=kg82Box();if(!box)return;box.classList.remove("kgintro");box.innerHTML="";box.hidden=false;const res=$("kg82box-res");if(res){res.hidden=true;res.innerHTML=""}KG82.phase="play";{const d=kg82El();if(d){d.classList.add("kg-run");d.classList.remove("kg-idle")}}
 let done=false,dead=false,stop=null;const env={kind,lv:KG82.lv||0,hud:o=>{for(const k in o)kg82Set(k,kg82Cap(o[k]))},end:raw=>{if(done)return;done=true;clearTimeout(guard);const st=KG82.run&&KG82.run.stop;KG82.peek=()=>null;if(st)try{st()}catch(e){}KG82.run=null;onEnd(cl(Math.round(raw),0,10))}};
 const guard=setTimeout(()=>env.end(0),97500);KG82.run={stop:()=>{dead=true;clearTimeout(guard);if(stop)stop()}};
 /* the board paintings load first (≤2.5 s), then the game starts */
 kg82Preload(kind).then(()=>{if(dead||done)return;try{stop=KG82_ENG[KG82_KIND[kind].e](box,env)}catch(e){console.error(e);env.end(5)}})}
function kg82Word(raw){return mgWord(raw)}/* thresholds in BAL.mgTier.word (jmgt) */
function kg82Norm(st){if(!st)return[];if(Array.isArray(st))return st.filter(x=>x&&x[1]);return Object.entries(st).filter(([k,v])=>v&&typeof v==="number").map(([k,v])=>[(typeof NAMES!=="undefined"&&NAMES[k])||k,v])}

/* =============== startContest =============== */
function startContest(o){o=o||{};if(typeof S==="undefined"||!S){if(o.onDone)o.onDone(null);return}
 const kind=kg82Kind(o.art,o.artName,false),K=KG82_KIND[kind];KG82.ctx="thi";kg82Preload(kind);const luck=o.luck||30,prep=Math.round(o.prep||0);mgSet(kind,{occ:o.occ||"hoi",big:!!o.big});/* mg-balance: board ease from the tier (jmgt) */
 const me=kg82Parts(S,kind);const talent=o.talent!=null?Math.round(o.talent):me.total;const partsOk=me.total===talent;
 /* rivals: j71 rows, persons, or 3 present consorts */
 let R=o.rivals;if(!R){try{R=kg82Shuf(liveRivals(true).filter(v=>!v.confined)).slice(0,3)}catch(e){R=[]}}
 const rows=R.map(x=>{if(x&&x.score!=null){let p=null;try{p=rivals.find(v=>v.id===x.id)||null}catch(e){}const t=Math.round(x.talent!=null?x.talent:x.score),pr=Math.round(x.prep||0);const lk=x.luck!=null?Math.round(x.luck):x.score-t-pr;return{p,id:x.id,name:x.name||(p&&p.name)||"",face:x.face,t,pr,lk,score:Math.round(x.score)}}
  const t=kg82Parts(x,kind).total,lk=Math.round(kg82NpcRaw(x,kind)/10*luck);return{p:x,id:x.id,name:x.name,face:null,t,pr:0,lk,score:t+lk}});
 const title=o.title||"Hội thi";const artLabel=o.artName?o.artName[0].toUpperCase()+o.artName.slice(1):K.n;
 const d=kg82Open({art:artLabel,title:`${title} · ${K.t}`,how:K.how,pic:kg82Pic(kind)});if(!d){if(o.onDone)o.onDone(null);return}
 const box=kg82Box();const tRows=partsOk?me.parts.map(([l,v])=>[l,kg82Chip("cộng",v,"g")]):[["Tài nghệ",kg82Chip(`cộng${o.talentBy?` (${o.talentBy})`:""}`,talent,"g")]];
 const SK=R.some(x=>x&&x.score!=null)?5:Math.round(kg82NpcMean(KG82.tier.lv));
 const intro=()=>{KG82.phase="intro";box.classList.add("kgintro");box.innerHTML=`<h4 class="kpst">Phần của ngươi</h4>`+kg82Rows([["Màn thi",`tự chơi 0–10 phần, quy ra 0–${luck} (đối thủ thi theo tài nghệ cùng luật)`,"t"],["Độ khó",mgDiffTxt(KG82.tier,kind),"n"]].concat(tRows,prep?[["Chuẩn bị",kg82Chip("cộng",prep,"g")]]:[]))+
  (rows.length?`<h4 class="kpst">Đối thủ</h4><div class="kgrv">`+kg82Facts(rows.map(r=>({who:r.p||r.face,auto:false,text:`${kg82Name(r.p,r.name)}<small>tài nghệ ${r.t}${r.pr?` + chuẩn bị ${r.pr}`:""} + màn thi chưa rõ (0–${luck})</small>`})))+`</div>`:"")+
  `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu thi</button><button class="${kg82Btn(true)}" id="kg82skip">Để tài nghệ quyết định<small>màn thi tính ${SK}/10 phần (+${Math.round(SK/10*luck)}), như người cùng bậc tài nghệ</small></button></div>`;
  $("kg82go").onclick=()=>kg82Play(kind,raw=>finish(raw,false));$("kg82skip").onclick=()=>finish(SK,true)};
 const finish=(raw,skipped)=>{KG82.phase="result";const skill=Math.round(raw/10*luck),score=talent+prep+skill;
  const all=rows.map(r=>({who:r.p||r.face,p:r.p,id:r.id,name:r.name,score:r.score,sub:`tài nghệ ${r.t}${r.pr?` + chuẩn bị ${r.pr}`:""} + màn thi ${r.lk}`}));
  const place=1+rows.filter(r=>r.score>=score).length,of=rows.length+1;
  all.push({who:S,p:S,me:1,id:"me",name:S.name,score,sub:`màn thi ${raw}/10 (${skill}) + tài nghệ ${talent}${prep?` + chuẩn bị ${prep}`:""}`});
  const ord=all.filter(x=>!x.me).sort((a,b)=>b.score-a.score);ord.splice(place-1,0,all[all.length-1]);
  /* real prizes by place (jcui, BAL.cp): themed item + bạc + chest + title + Emperor's gift; NPC winners are paid the same */
  let cup=null;try{if(typeof cuAward==="function")cup=cuAward(o,ord,place,of,kind)}catch(e){console.error(e)}
  const st=o.stakes||null;let gains=[],losses=[];if(st){if(place===1)gains=kg82Norm(st.win);else if(place<=3)gains=kg82Norm(st.top3);if(place===of&&of>2)losses=kg82Norm(st.last);losses=losses.concat(kg82Norm(st.paid));
   const neg=gains.filter(x=>x[1]<0);gains=gains.filter(x=>x[1]>0);losses=losses.concat(neg);
   if(o.applyStakes){const ob={};const add=s=>{if(s&&!Array.isArray(s))for(const k in s)ob[k]=(ob[k]||0)+s[k]};if(place===1)add(st.win);else if(place<=3)add(st.top3);if(place===of&&of>2)add(st.last);try{apply(ob)}catch(e){}}}
  if(cup&&cup.mine&&cup.mine.bac)gains.push(["Bạc",cup.mine.bac]);
  const pw=["Nhất","Nhì","Ba"][place-1]||`Hạng ${place}`;
  const sRows=[["Màn thi",skipped?`${raw}/10 (để tài nghệ quyết định) → ${kg82Plain(kg82Chip("cộng",skill,"g"))}`:`${raw}/10 · ${kg82Word(raw)} → cộng ${skill}`,"t"]].concat(tRows,prep?[["Chuẩn bị",kg82Chip("cộng",prep,"g")]]:[],[["Tổng",`<b>${score}</b> phần`,"t"]]);
  const stand=kg82Facts(ord.map((x,i)=>({who:x.who,auto:false,text:`<span class="kgrow"><span><b class="kgpl">${i+1}.</b> ${kg82Name(x.p,x.name)}</span><b>${x.score}</b></span><small>${x.sub}</small>`})));
  const tail=typeof kitGameResult==="function"?kitGameResult({place:pw,of,gains,losses,note:st&&st.note?st.note:(!st?"Thưởng phạt của hội thi ghi ở bảng kế tiếp.":"")}):
   kg82Rows([["Hạng",`${pw} / ${of}`,"t"],["Được",gains.map(x=>kg82Chip(x[0],x[1],"g"))],["Mất",losses.map(x=>kg82Chip(x[0],x[1],"r"))]]);
  const note=st&&st.note?st.note:(!st?"Thưởng phạt của hội thi ghi ở bảng kế tiếp.":"");
  const tParts=partsOk?me.parts:[[`Tài nghệ${o.talentBy?` (${o.talentBy})`:""}`,talent]];
  const kitRes=typeof kitGameResult==="function"?kitGameResult({parts:[["Màn thi",skipped?`Để tài nghệ quyết định, ${raw}/10 → +${skill}`:`${kg82Word(raw)} ${raw}/10 → +${skill}`]].concat(tParts.map(([l,v])=>[l,`+${v}`]),prep?[["Chuẩn bị",`+${prep}`]]:[]),
   total:`${score} phần`,place:pw,of,rivals:ord.map(x=>({who:x.p||x.who,score:x.score,sub:x.sub})),gains,losses,note,extra:cup&&cup.html}):null;
  const html=(kitRes||`<h4 class="kpst">Phần của ngươi</h4>${kg82Rows(sRows)}<h4 class="kpst">Bảng định thứ</h4>${stand}${tail}`)+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`;
  kg82ShowRes(html,place<=3);kg82Set("score",`${raw}/10`);kg82Set("round",pw);kg82Set("time","đã hết");
  const out={score,raw,skill,talent,prep,skipped,place,of,standings:ord.map(x=>({id:x.id,name:x.name,score:x.score})),shown:true};KG82.last=out;
  const ok=$("kg82ok");ok.onclick=()=>{kg82Close();try{if(o.onDone)o.onDone(out)}catch(e){console.error(e)}};const dd=kg82El();if(dd)dd.scrollTop=0;try{ok.focus({preventScroll:true})}catch(e){}};
 /* owner 15/11: everyone who competes with her becomes KNOWN at the contest (face + name, "đã gặp") */
 try{if(typeof cuMeet==="function")cuMeet(rows.map(r=>r.p))}catch(e){console.error(e)}
 intro()}

/* =============== playArt: the same mini-game for works / lessons, no rivals =============== */
function playArt(o){o=o||{};const kind=kg82Kind(o.art,o.artName,true),K=KG82_KIND[kind];KG82.ctx="hoc";kg82Preload(kind);try{mgSet(kind,{occ:o.occ||"hoc"})}catch(e){KG82.lv=0}
 const d=kg82Open({art:o.artName||K.n,title:o.title||K.t,how:K.how,pic:kg82Pic(kind)});if(!d){if(o.onDone)o.onDone(5);return}const box=kg82Box();
 const done=(raw,skipped)=>{KG82.phase="result";const html=kg82Rows([["Màn chơi",`${raw}/10 · ${kg82Word(raw)}${skipped?" (để trời định)":""}`,"t"]].concat(o.note?[["Ghi chú",o.note,"n"]]:[]))+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`;
  kg82ShowRes(html,raw>=5);kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");KG82.last={raw,skipped};
  $("kg82ok").onclick=()=>{kg82Close();try{if(o.onDone)o.onDone(raw,{skipped})}catch(e){console.error(e)}}};
 KG82.phase="intro";box.innerHTML=`<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button><button class="${kg82Btn(true)}" id="kg82skip">Để trời định<small>tính 5/10</small></button></div>`;
 $("kg82go").onclick=()=>kg82Play(kind,raw=>done(raw,false));$("kg82skip").onclick=()=>done(5,true)}
window.startContest=startContest;window.playArt=playArt;

/* layout only (colours and chrome come from the kit) */
(function(){const st=document.createElement("style");st.id="kg82-css";st.textContent=`
#ov .mg.kg82{width:100%;max-width:560px}
.kg82cv{display:block;margin:0 auto;touch-action:none;user-select:none;-webkit-user-select:none;border-radius:var(--k-rad,8px);max-width:100%}
.kg82act{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:12px 0 4px}.kg82act button{flex:1 1 200px;display:flex;flex-direction:column;align-items:center;justify-content:center}
.kg82act button small{display:block;font-weight:400;font-family:var(--body);font-size:.72rem;opacity:.9}
.kg82opts{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px}.kg82opts button{min-height:48px;text-align:center;justify-content:center}
.kg82quiz .kb{font-size:1rem}.kg82quiz .kpnote{min-height:1.3em;margin-top:8px}.kg82 .kfact small{display:block}.kg82 .kgrow>b{flex:none;white-space:nowrap;padding-left:6px}
`;document.head.appendChild(st)})();

/* lesson games (Tài nghệ tab, openMG) for the j85 arts: Thêu = the stitch-pattern game, Nấu nướng = the cooking quiz; same engines, 1–3 lesson points */
const KG82_MGL={theu:["Thêu: nhớ mẫu thêu","theu"],nau:["Nấu nướng: chọn món","banh"]};
function kg82Lesson(k){const [t,kind]=KG82_MGL[k];return[t,KG82_KIND[kind].how,(b,lv,end)=>{b.innerHTML="";let stop=null,dead=false;KG82.ctx="hoc";const T=mgSet(kind,{occ:"hoc",lv}),L=BAL.mgTier.lesson;const env={kind,lv:T.ease,hud:()=>{},end:raw=>{KG82.peek=()=>null;end(raw>=L[1]?3:raw>=L[0]?2:1)}};
 kg82Preload(kind).then(()=>{if(dead)return;try{stop=KG82_ENG[KG82_KIND[kind].e](b,env)}catch(e){console.error(e);end(1)}});return()=>{dead=true;if(stop)stop()}}]}
(function(){if(typeof openMG!=="function"||typeof MG==="undefined")return;const o0=openMG;openMG=function(k){try{if(KG82_MGL[k])MG[k]=kg82Lesson(k)}catch(e){}return o0.apply(this,arguments)}})();
