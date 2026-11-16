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
 co:{e:"go",n:"Cờ",t:"Ăn quân",how:"Mỗi thế cờ có một nhóm quân trắng chỉ còn một khí. Chạm vào giao điểm đặt quân đen để ăn nhóm ấy."},
 dauho:{e:"aim",n:"Đầu hồ",t:"Ném tên vào bình",how:"Mũi tên đưa qua đưa lại trên miệng bình. Chạm khi mũi tên ở ngay giữa miệng bình. 6 lần ném."},
 ban:{e:"aim",n:"Bắn cung",t:"Bắn hồng tâm",how:"Ngắm đưa qua đưa lại trên bia. Chạm khi ngắm ở giữa hồng tâm. 6 phát tên."},
 tho:{e:"quiz",b:"doi",n:"Thơ",t:"Nối vần",how:"Chọn câu thơ đối chỉnh nhất với câu cho sẵn. 5 câu, mỗi câu 10 giây."},
 doi:{e:"quiz",b:"doi",n:"Câu đối",t:"Đối câu",how:"Chọn vế đối chỉnh nhất cho vế ra. 5 câu, mỗi câu 10 giây."},
 doden:{e:"quiz",b:"do",n:"Đố đèn",t:"Giải đố đèn",how:"Đọc câu đố treo trên đèn, chọn lời giải đúng. 5 câu, mỗi câu 10 giây."},
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
const KG82_DO=[{q:"Không sơn mà đỏ, không gõ mà kêu, không khều mà rụng.",a:"Mặt trời, sấm, mưa"},{q:"Vừa bằng hạt đỗ, ăn giỗ cả làng.",a:"Con ruồi"},
 {q:"Da cóc mà bọc bột lọc, bột lọc mà bọc hòn than.",a:"Quả nhãn"},{q:"Có cổ mà chẳng có đầu, hai tay dài thượt chẳng thấy bàn tay.",a:"Cái áo"},
 {q:"Thân em xưa ở bụi tre, mùa đông xếp lại, mùa hè mở ra.",a:"Cái quạt"},{q:"Trong trắng ngoài xanh, trồng đậu trồng hành, thả lợn vào trong.",a:"Bánh chưng"},
 {q:"Không chân mà đi muôn dặm, không miệng mà nói đủ lời.",a:"Lá thư"},{q:"Ai nhìn vào cũng thấy mình, mình cười nó cũng cười theo.",a:"Tấm gương"},
 {q:"Mình trắng mà thẳng, thức suốt canh khuya, càng sáng càng gầy, rơi lệ không thôi.",a:"Cây nến"},{q:"Mình tròn như trăng, đánh thì kêu vang, chùa nào cũng có.",a:"Cái chuông"}];
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
function kg82Frame(o){const hud=[["score","Phần","0/10"],["round","Hồi","–"],["time","Còn","–"]];
 if(kg82Kit())return kitGameFrame({art:o.art,title:o.title,how:o.how,hud,id:"kg82box"});
 return `<div class="kgame"><div class="kph"><b class="kpseal">TÀI NGHỆ</b><span class="kpht"><span class="kptitle">${o.art}: ${o.title}</span></span></div><div class="kghow"><span class="krl">Cách chơi</span><span>${o.how}</span></div>`+
  `<div class="kghud">${hud.map(([k,l,v])=>`<span class="kgc"><small>${l}</small><b data-kg="${k}">${v}</b></span>`).join("")}</div><div class="kgbox" id="kg82box"></div><div class="kgres" id="kg82box-res" hidden></div></div>`}
function kg82Set(k,v){if(typeof kitGameSet==="function")kitGameSet(k,v);else document.querySelectorAll(`[data-kg="${k}"]`).forEach(e=>e.innerHTML=v)}
function kg82Open(o){kg82Close(true);const ov=$("ov");if(!ov)return null;[...ov.children].forEach(c=>{if(c.id!=="kg82"){c.dataset.kg82h=c.hidden?"1":"0";c.hidden=true}});
 const d=document.createElement("div");d.id="kg82";d.className="mg kpanel kgame kg82";d.setAttribute("role","dialog");d.setAttribute("aria-modal","true");d.innerHTML=kg82Frame(o);ov.appendChild(d);ov.hidden=false;d.scrollTop=0;return d}
function kg82Close(silent){if(KG82.run&&KG82.run.stop){try{KG82.run.stop()}catch(e){}}KG82.run=null;KG82.peek=()=>null;KG82.phase="";
 const d=kg82El();if(!d)return;const ov=$("ov");d.remove();[...ov.children].forEach(c=>{if(c.dataset.kg82h!=null){c.hidden=c.dataset.kg82h==="1";delete c.dataset.kg82h}});
 if(typeof mgDone==="undefined"||mgDone)ov.hidden=true}
const kg82Box=()=>document.getElementById("kg82box");
function kg82ShowRes(html){const bx=kg82Box(),res=$("kg82box-res");if(res){bx.innerHTML="";bx.hidden=true;res.innerHTML=html;res.hidden=false}else bx.innerHTML=html}

/* ---------- canvas helper ---------- */
function kg82Canvas(box,hRatio,hMax){const W=Math.max(240,Math.floor(box.clientWidth||300));const H=Math.round(Math.min(W*hRatio,hMax||520,Math.max(260,(innerHeight||800)*.56)));
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
function kg82Pop(list,x,y,t,col){list.push({x,y,t,col,a:performance.now()})}
function kg82DrawPops(g,list,now){for(let i=list.length-1;i>=0;i--){const p=list[i],k=(now-p.a)/700;if(k>=1){list.splice(i,1);continue}
 g.save();g.globalAlpha=1-k;g.fillStyle=p.col;g.font=`700 ${15}px ${kg82Col("--display","serif")||"serif"}`;g.textAlign="center";g.fillText(p.t,p.x,p.y-k*26);g.restore()}}

/* =============== ENGINES: eng(box, env) -> stop(); env.end(raw0to10) once; env.hud({score,round,time}); KG82.peek for tests =============== */
/* 1. RHYTHM (đàn, hát): plum blossoms fall along four strings, tap the string at the vermilion line */
function kg82Rhythm(box,env){const C=kg82Canvas(box,1.05,480),{g,W,H}=C;const L=env.kind==="hat"?["Cung","Thương","Giốc","Chủy"]:["Cung","Thương","Giốc","Chủy"];
 const N=20,fall=2100,HIT=H*.8,lw=W/4;const notes=[];let t=1700,last=-1,rep=0;
 for(let i=0;i<N;i++){let l=Math.floor(Math.random()*4);if(l===last&&++rep>=2){l=(l+1+Math.floor(Math.random()*3))%4;rep=0}else if(l!==last)rep=0;last=l;notes.push({l,t,st:0});t+=880+Math.floor(Math.random()*260)}
 const end=notes[N-1].t+700;let credit=0,miss=0,stop=false,raf=0;const pops=[],flash=[0,0,0,0];const t0=performance.now();
 const pc=kg82Col("--peony","#e48aa4"),red=kg82Col("--red","#c23b22"),gold=kg82Col("--gold","#8f5f0c");
 const sc=()=>Math.round(10*Math.max(0,credit)/N);
 function draw(now){const tt=now-t0;kg82Silk(g,W,H,"#f6ead6","#ead6b4");
  for(let i=0;i<4;i++){const x=lw*(i+.5);if(flash[i]>now){g.fillStyle="#f0d07044";g.fillRect(lw*i,0,lw,H)}
   g.strokeStyle="#8f5f0c";g.lineWidth=1.2+i*.5;g.beginPath();g.moveTo(x,0);g.lineTo(x,H);g.stroke();
   g.fillStyle="#6e4d0e";g.beginPath();g.moveTo(x-9,HIT+16);g.lineTo(x+9,HIT+16);g.lineTo(x,HIT+4);g.closePath();g.fill()}
  g.fillStyle=red;g.fillRect(0,HIT-2,W,4);g.fillStyle="#f0d070";g.fillRect(0,HIT-3,W,1);
  for(const n of notes){if(n.st)continue;const y=(tt-(n.t-fall))/fall*HIT;if(y<-20||y>H+20)continue;kg82Blossom(g,lw*(n.l+.5),y,Math.min(18,lw*.22),pc,true)}
  g.fillStyle=gold;g.font=`600 ${Math.max(12,Math.min(16,lw*.15))}px ${kg82Col("--display","serif")}`;g.textAlign="center";L.forEach((n,i)=>g.fillText(n,lw*(i+.5),H-12));
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;
  for(const n of notes)if(!n.st&&tt-n.t>220){n.st=2;miss++;kg82Pop(pops,lw*(n.l+.5),HIT-24,"Trượt","#8a7350")}
  const done=notes.filter(n=>n.st).length;env.hud({score:`${sc()}/10`,round:`Nốt ${Math.min(N,done+1)}/${N}`,time:`${Math.max(0,Math.ceil((end-tt)/1000))} giây`});
  draw(now);if(tt>end){stop=true;return env.end(sc())}raf=requestAnimationFrame(frame)}
 function tap(l){if(stop)return;const tt=performance.now()-t0;let best=null,bd=1e9;for(const n of notes){if(n.st||n.l!==l)continue;const d=Math.abs(n.t-tt);if(d<bd){bd=d;best=n}}
  flash[l]=performance.now()+120;
  if(best&&bd<=220){best.st=1;const q=bd<=100?1:.6;credit+=q;kg82Pop(pops,lw*(l+.5),HIT-24,q===1?"Tuyệt!":"Được",q===1?kg82Col("--good","#2d7a52"):gold);kg82Pluck(l,true)}
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
 const px=i=>ox+m+(i%n)*s,py=i=>(H-S0)/2+m+Math.floor(i/n)*s;const R0=[1,2,2,3,3];let round=0,pts=0,P=null,phase="",t0=0,stop=false,raf=0,mark=null,fade=null;const pops=[];const LIM=9000;
 function next(){if(stop)return;if(round>=R0.length){stop=true;return setTimeout(()=>env.end(Math.round(pts)),300)}P=kg82GoGen(n,R0[round])||kg82GoGen(n,1);mark=null;fade=null;phase="play";t0=performance.now()}
 function stone(x,y,c,a){g.save();g.globalAlpha=a==null?1:a;const r=s*.44;const gr=g.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);
  if(c===1){gr.addColorStop(0,"#666");gr.addColorStop(1,"#111")}else{gr.addColorStop(0,"#fff");gr.addColorStop(1,"#cfc8bc")}g.fillStyle=gr;g.shadowColor="#0006";g.shadowBlur=3;g.shadowOffsetY=1.5;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill();g.restore()}
 function draw(now){kg82Silk(g,W,H,"#f6ead6","#ead6b4");const bx=ox+m-s*.55,by=(H-S0)/2+m-s*.55,bs=(n-1)*s+s*1.1;
  const wd=g.createLinearGradient(bx,by,bx+bs,by+bs);wd.addColorStop(0,"#e8c987");wd.addColorStop(1,"#d4a95f");g.fillStyle=wd;g.shadowColor="#6e4d0e66";g.shadowBlur=8;g.fillRect(bx,by,bs,bs);g.shadowBlur=0;
  g.strokeStyle="#8a5a1a22";for(let k=0;k<9;k++){g.beginPath();g.moveTo(bx,by+bs*k/9+Math.sin(k)*3);g.bezierCurveTo(bx+bs*.3,by+bs*k/9+6,bx+bs*.7,by+bs*k/9-6,bx+bs,by+bs*k/9);g.stroke()}
  g.strokeStyle="#4a3010";g.lineWidth=1;for(let k=0;k<n;k++){g.beginPath();g.moveTo(px(k),py(0));g.lineTo(px(k),py((n-1)*n));g.stroke();g.beginPath();g.moveTo(px(0),py(k*n));g.lineTo(px(n-1),py(k*n));g.stroke()}
  [[1,1],[1,5],[5,1],[5,5],[3,3]].forEach(([r,c])=>{g.fillStyle="#4a3010";g.beginPath();g.arc(px(r*n+c),py(r*n+c),2.5,0,Math.PI*2);g.fill()});
  if(P){P.B.forEach((v,i)=>{if(!v)return;let a=1;if(fade&&fade.s.includes(i))a=Math.max(0,1-(now-fade.a)/500);if(a>0)stone(px(i),py(i),v,a)});
   if(mark){if(mark.ok){stone(px(mark.i),py(mark.i),1)}else{if(!mark.miss){g.strokeStyle=kg82Col("--red","#c23b22");g.lineWidth=3;const x=px(mark.i),y=py(mark.i),d=s*.25;g.beginPath();g.moveTo(x-d,y-d);g.lineTo(x+d,y+d);g.moveTo(x+d,y-d);g.lineTo(x-d,y+d);g.stroke()}
     g.strokeStyle=kg82Col("--good","#2d7a52");g.beginPath();g.arc(px(P.L),py(P.L),s*.42+Math.sin(now/90)*2,0,Math.PI*2);g.stroke()}}}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop&&!fade)return;if(phase==="play"){const left=LIM-(now-t0);if(left<=0){phase="wait";kg82Pop(pops,px(P.L),py(P.L)-s*.6,"Hết giờ","#8a7350");mark={i:P.L,ok:false,miss:1};round++;setTimeout(next,900)}
   env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(round+1,5)}/5`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}else env.hud({score:`${Math.round(pts)}/10`,time:"–"});
  draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(phase!=="play"||stop)return;const [x,y]=C.at(e);let bi=-1,bd=1e9;for(let i=0;i<n*n;i++){const d=Math.hypot(px(i)-x,py(i)-y);if(d<bd){bd=d;bi=i}}
  if(bd>s*.6||P.B[bi])return;phase="wait";if(bi===P.L){pts+=2;mark={i:bi,ok:true};fade={s:P.cap,a:performance.now()};kg82Pop(pops,px(bi),py(bi)-s*.6,`Ăn ${P.cap.length} quân!`,kg82Col("--good","#2d7a52"));kg82Pluck(2,true)}
  else{mark={i:bi,ok:false};kg82Pop(pops,px(bi),py(bi)-s*.6,"Chưa ăn được",kg82Col("--red","#c23b22"));kg82Pluck(0,false)}round++;setTimeout(next,950)});
 KG82.peek=()=>phase==="play"&&P?C.client(px(P.L),py(P.L)):null;next();raf=requestAnimationFrame(frame);return()=>{stop=true;fade=null;cancelAnimationFrame(raf)}}

/* 3. QUIZ (thơ, câu đối, đố đèn, bếp núc, điều hương) */
function kg82Bank(b){const wc=s=>s.replace(/,/g,"").split(" ").length;
 if(b==="doi"){const D=typeof DOI!=="undefined"?DOI:[["Núi cao mây phủ","Sông rộng sóng xô"]];return kg82Shuf(D).slice(0,5).map(([x,y])=>{let w=D.filter(p=>p[1]!==y&&wc(p[1])===wc(y)).map(p=>p[1]);if(w.length<2)w=w.concat(D.filter(p=>p[1]!==y&&!w.includes(p[1])).map(p=>p[1]));return{l:"Vế ra",q:x,a:y,w:kg82Shuf(w).slice(0,2)}})}
 if(b==="do")return kg82Shuf(KG82_DO).slice(0,5).map(x=>({l:"Câu đố",q:x.q,a:x.a,w:kg82Shuf(KG82_DO.filter(y=>y!==x).map(y=>y.a)).slice(0,2)}));
 const B=b==="bep"?KG82_BEP:b==="y"&&typeof YQ!=="undefined"?YQ:KG82_HUONG;return kg82Shuf(B).slice(0,5).map(x=>({l:"Câu hỏi",q:x.q,a:x.a,w:kg82Shuf(x.w).slice(0,2)}))}
function kg82Quiz(box,env){const Qs=kg82Bank(KG82_KIND[env.kind].b);let r=0,pts=0,stop=false,tm=0,t0=0,lock=false,cur=null;const LIM=10000;
 const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);
 function show(){if(stop)return;if(r>=Qs.length){stop=true;return env.end(pts)}const q=Qs[r];cur=kg82Shuf([q.a].concat(q.w));lock=false;t0=performance.now();
  wrap.innerHTML=kg82Rows([[q.l,`<span class="ef t"><b>${q.q}</b></span>`]])+`<div class="kg82opts">${cur.map((o,i)=>`<button class="kgbtn" data-i="${i}">${o}</button>`).join("")}</div>`;
  wrap.querySelectorAll("button[data-i]").forEach(b=>b.onclick=()=>pickA(+b.dataset.i))}
 function pickA(i){if(lock||stop)return;lock=true;const q=Qs[r];const ok=i>=0&&cur[i]===q.a;if(ok)pts+=2;kg82Pluck(ok?3:0,ok);
  wrap.querySelectorAll("button[data-i]").forEach(b=>{const k=+b.dataset.i;b.disabled=true;if(cur[k]===q.a)b.innerHTML=kg82Chip(`✓ ${cur[k]}`,"g");else if(k===i)b.innerHTML=kg82Chip(`✗ ${cur[k]}`,"r")});
  if(i<0)wrap.insertAdjacentHTML("beforeend",kg82Rows([["Hết giờ",`Lời đúng: ${q.a}`,"r"]]));r++;setTimeout(show,1000)}
 tm=setInterval(()=>{if(stop)return;const left=LIM-(performance.now()-t0);env.hud({score:`${pts}/10`,round:`Câu ${Math.min(r+1,5)}/5`,time:`${Math.max(0,Math.ceil(left/1000))} giây`});if(left<=0&&!lock)pickA(-1)},150);
 KG82.peek=()=>{if(lock||stop||!cur)return null;const i=cur.indexOf(Qs[r].a);return{sel:`#${box.id||"kg82box"} button[data-i="${i}"]`}};
 show();return()=>{stop=true;clearInterval(tm)}}

/* 4. PATTERN (vẽ, cắm hoa, thêu, khéo tay): remember which cells were painted */
function kg82Pattern(box,env){const n=4,C=kg82Canvas(box,1,440),{g,W,H}=C;const S0=Math.min(W,H)-8,ox=(W-S0)/2,oy=(H-S0)/2,c=S0/n;const mot=KG82_KIND[env.kind].m;
 const R0=[3,4,4,5,6];let round=0,pts=0,pat=[],tapped=[],phase="",t0=0,stop=false,raf=0;const pops=[];const LIM=9000,SHOW=2300;
 const cx=i=>ox+(i%n+.5)*c,cy=i=>oy+(Math.floor(i/n)+.5)*c;
 function motif(i,a,ghost){g.save();g.globalAlpha=a;const x=cx(i),y=cy(i),r=c*.34;
  if(ghost){g.strokeStyle=kg82Col("--good","#2d7a52");g.setLineDash([5,4]);g.lineWidth=2;g.strokeRect(x-r,y-r,r*2,r*2);g.restore();return}
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
 function draw(now){const paper=mot==="silk"?["#f3e6cf","#e8d3ae"]:["#fbf5e8","#efe2c8"];kg82Silk(g,W,H,paper[0],paper[1]);
  for(let i=0;i<n*n;i++){const x=ox+(i%n)*c,y=oy+Math.floor(i/n)*c;g.fillStyle=mot==="silk"?"#fff8ea":"#fffdf6";g.fillRect(x+3,y+3,c-6,c-6);g.strokeStyle="#d2b071";g.lineWidth=1;g.strokeRect(x+3,y+3,c-6,c-6)}
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
 const R0=[3,3,4,4,5];let round=0,pts=0,seq=[],inp=0,phase="",t0=0,stop=false,raf=0,lit=-1,litUntil=0,lastTap=0;const pops=[];const SP=620,IDLE=6000;
 const pc=kg82Col("--peony","#e48aa4"),gold=kg82Col("--gold","#8f5f0c");
 function next(){if(stop)return;if(round>=R0.length){stop=true;return setTimeout(()=>env.end(Math.round(pts)),300)}seq=Array.from({length:R0[round]},()=>Math.floor(Math.random()*4));inp=0;phase="show";t0=performance.now()+500}
 function endRound(ok){phase="judge";const got=2*ok/seq.length;pts+=got;kg82Pop(pops,mx,my-8,ok===seq.length?"Đẹp lắm!":`Đúng ${ok}/${seq.length} bước`,ok===seq.length?kg82Col("--good","#2d7a52"):kg82Col("--red","#c23b22"));round++;setTimeout(next,1100)}
 function draw(now){kg82Silk(g,W,H,"#f6ead6","#ead6b4");g.save();g.strokeStyle="#d2b071";g.lineWidth=2;g.beginPath();g.arc(mx,my,D*1.45,0,Math.PI*2);g.stroke();g.restore();
  g.save();g.translate(mx,my);g.fillStyle="#c23b2233";for(let i=0;i<9;i++){g.beginPath();g.moveTo(0,0);g.arc(0,0,D*.55,Math.PI*(1.1+i*.09),Math.PI*(1.1+(i+.8)*.09));g.closePath();g.fill()}g.restore();
  let showI=-1;if(phase==="show"){const k=now-t0;if(k>=0){const i=Math.floor(k/SP);if(i>=seq.length){phase="play";lastTap=now}else if(k-i*SP<SP*.72)showI=seq[i]}}
  pos.forEach(([x,y],i)=>{const on=i===showI||(i===lit&&now<litUntil);g.save();if(on){g.shadowColor=pc;g.shadowBlur=24}const gr=g.createRadialGradient(x,y-pr*.3,pr*.2,x,y,pr);gr.addColorStop(0,on?"#fff3d6":"#fffaf0");gr.addColorStop(1,on?pc:"#ecd9b4");
   g.fillStyle=gr;g.beginPath();g.arc(x,y,pr,0,Math.PI*2);g.fill();g.shadowBlur=0;g.strokeStyle=on?"#8a2a1e":"#c9a46a";g.lineWidth=on?3:1.5;g.stroke();
   g.fillStyle="#2a1a12";g.textAlign="center";g.font=`700 ${pr*.62}px serif`;g.fillText(V[i][0],x,y+pr*.12);g.font=`600 ${Math.max(10,Math.min(14,pr*.24))}px ${kg82Col("--body","sans-serif")}`;g.fillStyle=gold;g.fillText(V[i][1],x,y+pr*.55);g.restore()});
  if(phase==="play"){g.fillStyle="#6b5643";g.font=`600 13px ${kg82Col("--body","sans-serif")}`;g.textAlign="center";g.fillText(`Bước ${inp+1}/${seq.length}`,mx,my+5)}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop&&phase!=="judge")return;if(phase==="play"&&now-lastTap>IDLE)endRound(inp);
  env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(round+1,5)}/5`,time:phase==="show"?"xem bước":phase==="play"?`${Math.max(0,Math.ceil((IDLE-(now-lastTap))/1000))} giây`:"–"});draw(now);raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(phase!=="play")return;const [x,y]=C.at(e);let bi=-1,bd=1e9;pos.forEach(([px,py],i)=>{const d=Math.hypot(px-x,py-y);if(d<bd){bd=d;bi=i}});if(bd>pr*1.5)return;
  lit=bi;litUntil=performance.now()+180;lastTap=performance.now();if(bi===seq[inp]){kg82Pluck(bi,true);inp++;if(inp>=seq.length)endRound(inp)}else{kg82Pluck(0,false);endRound(inp)}});
 KG82.peek=()=>phase==="play"?C.client(...pos[seq[inp]]):null;next();raf=requestAnimationFrame(frame);return()=>{stop=true;phase="";cancelAnimationFrame(raf)}}

/* 6. AIM (bắn cung, đầu hồ): the marker swings, tap when it is over the centre */
function kg82Aim(box,env){const C=kg82Canvas(box,.95,420),{g,W,H}=C;const pot=env.kind==="dauho";const N=6;let k=0,pts=0,stop=false,raf=0,t0=performance.now(),lock=false,shots=[];const pops=[];
 const cx=W/2,ty=H*.58,A=W*.38;const pos=now=>{const w=.0021+k*.00028;return cx+A*Math.sin((now-t0)*w)};let flyAt=0,flyX=0;
 function draw(now){kg82Silk(g,W,H,"#f6ead6","#ead6b4");
  const kz=Math.min(1.7,Math.min(W,H)/300);g.save();g.translate(cx,ty);g.scale(kz,kz);g.translate(-cx,-ty);
  if(pot){g.save();const gr=g.createLinearGradient(cx-60,0,cx+60,0);gr.addColorStop(0,"#6e4d0e");gr.addColorStop(.5,"#c9a03a");gr.addColorStop(1,"#6e4d0e");g.fillStyle=gr;
   g.beginPath();g.moveTo(cx-18,ty-50);g.lineTo(cx+18,ty-50);g.bezierCurveTo(cx+16,ty-20,cx+62,ty+10,cx+48,ty+70);g.lineTo(cx-48,ty+70);g.bezierCurveTo(cx-62,ty+10,cx-16,ty-20,cx-18,ty-50);g.fill();
   g.fillStyle="#2a1a12";g.beginPath();g.ellipse(cx,ty-50,18,5,0,0,Math.PI*2);g.fill();g.restore()}
  else{[[64,"#fffaf0"],[50,"#2a1a12"],[38,"#6a8aa0"],[26,"#c23b22"],[13,"#f0d070"]].forEach(([r,c])=>{g.fillStyle=c;g.beginPath();g.arc(cx,ty,r,0,Math.PI*2);g.fill()});g.strokeStyle="#6e4d0e";g.lineWidth=2;g.beginPath();g.arc(cx,ty,64,0,Math.PI*2);g.stroke()}
  g.restore();
  const my=pot?ty-50*kz:ty;shots.forEach(s=>{g.strokeStyle="#4a3010";g.lineWidth=2;g.beginPath();g.moveTo(s.x,my);g.lineTo(s.x-6,my-30);g.stroke();g.fillStyle="#c23b22";g.beginPath();g.moveTo(s.x-6,my-30);g.lineTo(s.x-12,my-38);g.lineTo(s.x-2,my-36);g.fill()});
  g.strokeStyle="#d2b071";g.lineWidth=2;g.beginPath();g.moveTo(cx-A,H*.16);g.lineTo(cx+A,H*.16);g.stroke();g.fillStyle=kg82Col("--good","#2d7a52");g.fillRect(cx-A*.08,H*.16-3,A*.16,6);
  const x=lock?flyX:pos(now);g.fillStyle="#8a2a1e";g.beginPath();g.moveTo(x,H*.16+4);g.lineTo(x-9,H*.16-12);g.lineTo(x+9,H*.16-12);g.closePath();g.fill();
  if(lock&&now<flyAt+350){const kk=(now-flyAt)/350;g.strokeStyle="#4a3010";g.lineWidth=2;const yy=H*.16+((pot?ty-50*kz:ty)-H*.16)*kk;g.beginPath();g.moveTo(flyX,yy-20);g.lineTo(flyX,yy);g.stroke()}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;env.hud({score:`${Math.round(10*pts/N)}/10`,round:`${pot?"Lần":"Phát"} ${Math.min(k+1,N)}/${N}`,time:`${N-k} ${pot?"tên":"phát"}`});draw(now);raf=requestAnimationFrame(frame)}
 function shoot(){if(lock||stop)return;const now=performance.now();const x=pos(now);const d=Math.abs(x-cx)/A;const q=d<.08?1:d<.2?.75:d<.35?.5:d<.55?.25:0;lock=true;flyAt=now;flyX=x;
  setTimeout(()=>{pts+=q;if(q>0)shots.push({x:cx+(x-cx)*(pot?.35:.55)});kg82Pop(pops,cx,ty-80,q===1?(pot?"Trúng giữa bình!":"Hồng tâm!"):q>=.5?"Trúng":q>0?"Sượt qua":"Trượt",q>=.5?kg82Col("--good","#2d7a52"):q>0?kg82Col("--gold","#8f5f0c"):kg82Col("--red","#c23b22"));kg82Pluck(k,q>0);
   k++;if(k>=N){stop=true;draw(performance.now());return setTimeout(()=>env.end(Math.round(10*pts/N)),600)}setTimeout(()=>{lock=false;t0=performance.now()-Math.random()*1500},450)},360)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();shoot()});const kd=e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();shoot()}};document.addEventListener("keydown",kd);
 KG82.peek=()=>{if(lock||stop)return null;const x=pos(performance.now());return Math.abs(x-cx)/A<.04?C.client(W/2,H*.8):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
const KG82_ENG={rhythm:kg82Rhythm,go:kg82Go,quiz:kg82Quiz,pattern:kg82Pattern,steps:kg82Steps,aim:kg82Aim};

/* ---------- running one game inside the frame ---------- */
function kg82Play(kind,onEnd){const box=kg82Box();if(!box)return;box.innerHTML="";box.hidden=false;const res=$("kg82box-res");if(res){res.hidden=true;res.innerHTML=""}KG82.phase="play";
 let done=false;const env={kind,lv:0,hud:o=>{for(const k in o)kg82Set(k,o[k])},end:raw=>{if(done)return;done=true;clearTimeout(guard);const st=KG82.run&&KG82.run.stop;KG82.peek=()=>null;if(st)try{st()}catch(e){}KG82.run=null;onEnd(cl(Math.round(raw),0,10))}};
 const guard=setTimeout(()=>env.end(0),95000);let stop=null;try{stop=KG82_ENG[KG82_KIND[kind].e](box,env)}catch(e){console.error(e);env.end(5);return}
 KG82.run={stop:()=>{clearTimeout(guard);if(stop)stop()}}}
function kg82Word(raw){return raw>=9?"Xuất sắc":raw>=7?"Giỏi":raw>=5?"Khá":raw>=3?"Tạm được":"Vụng"}
function kg82Norm(st){if(!st)return[];if(Array.isArray(st))return st.filter(x=>x&&x[1]);return Object.entries(st).filter(([k,v])=>v&&typeof v==="number").map(([k,v])=>[(typeof NAMES!=="undefined"&&NAMES[k])||k,v])}

/* =============== startContest =============== */
function startContest(o){o=o||{};if(typeof S==="undefined"||!S){if(o.onDone)o.onDone(null);return}
 const kind=kg82Kind(o.art,o.artName,false),K=KG82_KIND[kind];const luck=o.luck||30,prep=Math.round(o.prep||0);
 const me=kg82Parts(S,kind);const talent=o.talent!=null?Math.round(o.talent):me.total;const partsOk=me.total===talent;
 /* rivals: j71 rows, persons, or 3 present consorts */
 let R=o.rivals;if(!R){try{R=kg82Shuf(liveRivals(true).filter(v=>!v.confined)).slice(0,3)}catch(e){R=[]}}
 const rows=R.map(x=>{if(x&&x.score!=null){let p=null;try{p=rivals.find(v=>v.id===x.id)||null}catch(e){}const t=Math.round(x.talent!=null?x.talent:x.score),pr=Math.round(x.prep||0);const lk=x.luck!=null?Math.round(x.luck):x.score-t-pr;return{p,id:x.id,name:x.name||(p&&p.name)||"",face:x.face,t,pr,lk,score:Math.round(x.score)}}
  const t=kg82Parts(x,kind).total,lk=Math.round(Math.random()*luck);return{p:x,id:x.id,name:x.name,face:null,t,pr:0,lk,score:t+lk}});
 const title=o.title||"Hội thi";const artLabel=o.artName?o.artName[0].toUpperCase()+o.artName.slice(1):K.n;
 const d=kg82Open({art:artLabel,title:`${title} · ${K.t}`,how:K.how});if(!d){if(o.onDone)o.onDone(null);return}
 const box=kg82Box();const tRows=partsOk?me.parts.map(([l,v])=>[l,kg82Chip("cộng",v,"g")]):[["Tài nghệ",kg82Chip(`cộng${o.talentBy?` (${o.talentBy})`:""}`,talent,"g")]];
 const intro=()=>{KG82.phase="intro";box.innerHTML=`<h4 class="kpst">Phần của ngươi</h4>`+kg82Rows([["Màn thi",`tự chơi 0–10 phần, quy ra 0–${luck} (đối thủ: may rủi 0–${luck})`,"t"]].concat(tRows,prep?[["Chuẩn bị",kg82Chip("cộng",prep,"g")]]:[]))+
  (rows.length?`<h4 class="kpst">Đối thủ</h4>`+kg82Facts(rows.map(r=>({who:r.p||r.face,auto:false,text:`${kg82Name(r.p,r.name)}<small>tài nghệ ${r.t}${r.pr?` + chuẩn bị ${r.pr}`:""} + màn thi chưa rõ (0–${luck})</small>`}))):"")+
  `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu thi</button><button class="${kg82Btn(true)}" id="kg82skip">Để tài nghệ quyết định<small>màn thi tính 5/10 phần (+${Math.round(luck/2)}), bằng mức trung bình của đối thủ</small></button></div>`;
  $("kg82go").onclick=()=>kg82Play(kind,raw=>finish(raw,false));$("kg82skip").onclick=()=>finish(5,true)};
 const finish=(raw,skipped)=>{KG82.phase="result";const skill=Math.round(raw/10*luck),score=talent+prep+skill;
  const all=rows.map(r=>({who:r.p||r.face,p:r.p,id:r.id,name:r.name,score:r.score,sub:`tài nghệ ${r.t}${r.pr?` + chuẩn bị ${r.pr}`:""} + màn thi ${r.lk}`}));
  const place=1+rows.filter(r=>r.score>=score).length,of=rows.length+1;
  all.push({who:S,p:S,me:1,id:"me",name:S.name,score,sub:`màn thi ${raw}/10 (${skill}) + tài nghệ ${talent}${prep?` + chuẩn bị ${prep}`:""}`});
  const ord=all.filter(x=>!x.me).sort((a,b)=>b.score-a.score);ord.splice(place-1,0,all[all.length-1]);
  const st=o.stakes||null;let gains=[],losses=[];if(st){if(place===1)gains=kg82Norm(st.win);else if(place<=3)gains=kg82Norm(st.top3);if(place===of&&of>2)losses=kg82Norm(st.last);losses=losses.concat(kg82Norm(st.paid));
   const neg=gains.filter(x=>x[1]<0);gains=gains.filter(x=>x[1]>0);losses=losses.concat(neg);
   if(o.applyStakes){const ob={};const add=s=>{if(s&&!Array.isArray(s))for(const k in s)ob[k]=(ob[k]||0)+s[k]};if(place===1)add(st.win);else if(place<=3)add(st.top3);if(place===of&&of>2)add(st.last);try{apply(ob)}catch(e){}}}
  const pw=["Nhất","Nhì","Ba"][place-1]||`Hạng ${place}`;
  const sRows=[["Màn thi",skipped?`${raw}/10 (để tài nghệ quyết định) → ${kg82Plain(kg82Chip("cộng",skill,"g"))}`:`${raw}/10 · ${kg82Word(raw)} → cộng ${skill}`,"t"]].concat(tRows,prep?[["Chuẩn bị",kg82Chip("cộng",prep,"g")]]:[],[["Tổng",`<b>${score}</b> phần`,"t"]]);
  const stand=kg82Facts(ord.map((x,i)=>({who:x.who,auto:false,text:`<span class="kgrow"><span><b class="kgpl">${i+1}.</b> ${kg82Name(x.p,x.name)}</span><b>${x.score}</b></span><small>${x.sub}</small>`})));
  const tail=typeof kitGameResult==="function"?kitGameResult({place:pw,of,gains,losses,note:st&&st.note?st.note:(!st?"Thưởng phạt của hội thi ghi ở bảng kế tiếp.":"")}):
   kg82Rows([["Hạng",`${pw} / ${of}`,"t"],["Được",gains.map(x=>kg82Chip(x[0],x[1],"g"))],["Mất",losses.map(x=>kg82Chip(x[0],x[1],"r"))]]);
  const note=st&&st.note?st.note:(!st?"Thưởng phạt của hội thi ghi ở bảng kế tiếp.":"");
  const tParts=partsOk?me.parts:[[`Tài nghệ${o.talentBy?` (${o.talentBy})`:""}`,talent]];
  const kitRes=typeof kitGameResult==="function"?kitGameResult({parts:[["Màn thi",skipped?`Để tài nghệ quyết định, 5/10 → +${skill}`:`${kg82Word(raw)} ${raw}/10 → +${skill}`]].concat(tParts.map(([l,v])=>[l,`+${v}`]),prep?[["Chuẩn bị",`+${prep}`]]:[]),
   total:`${score} phần`,place:pw,of,rivals:ord.map(x=>({who:x.p||x.who,score:x.score,sub:x.sub})),gains,losses,note}):null;
  const html=(kitRes||`<h4 class="kpst">Phần của ngươi</h4>${kg82Rows(sRows)}<h4 class="kpst">Thứ bậc</h4>${stand}${tail}`)+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`;
  kg82ShowRes(html);kg82Set("score",`${raw}/10`);kg82Set("round",pw);kg82Set("time","đã hết");
  const out={score,raw,skill,talent,prep,skipped,place,of,standings:ord.map(x=>({id:x.id,name:x.name,score:x.score})),shown:true};KG82.last=out;
  const ok=$("kg82ok");ok.onclick=()=>{kg82Close();try{if(o.onDone)o.onDone(out)}catch(e){console.error(e)}};const dd=kg82El();if(dd)dd.scrollTop=0;try{ok.focus({preventScroll:true})}catch(e){}};
 intro()}

/* =============== playArt: the same mini-game for works / lessons, no rivals =============== */
function playArt(o){o=o||{};const kind=kg82Kind(o.art,o.artName,true),K=KG82_KIND[kind];
 const d=kg82Open({art:o.artName||K.n,title:o.title||K.t,how:K.how});if(!d){if(o.onDone)o.onDone(5);return}const box=kg82Box();
 const done=(raw,skipped)=>{KG82.phase="result";const html=kg82Rows([["Màn chơi",`${raw}/10 · ${kg82Word(raw)}${skipped?" (để trời định)":""}`,"t"]].concat(o.note?[["Ghi chú",o.note,"n"]]:[]))+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`;
  kg82ShowRes(html);kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");KG82.last={raw,skipped};
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
.kg82quiz .kb{font-size:1rem}.kg82 .kfact small{display:block}.kg82 .kgrow>b{flex:none;white-space:nowrap;padding-left:6px}
`;document.head.appendChild(st)})();

/* lesson games (Tài nghệ tab, openMG) for the j85 arts: Thêu = the stitch-pattern game, Nấu nướng = the cooking quiz; same engines, 1–3 lesson points */
const KG82_MGL={theu:["Thêu: nhớ mẫu thêu","theu"],nau:["Nấu nướng: chọn món","banh"]};
function kg82Lesson(k){const [t,kind]=KG82_MGL[k];return[t,KG82_KIND[kind].how,(b,lv,end)=>{b.innerHTML="";let stop=null;const env={kind,lv,hud:()=>{},end:raw=>{KG82.peek=()=>null;end(raw>=8?3:raw>=5?2:1)}};
 try{stop=KG82_ENG[KG82_KIND[kind].e](b,env)}catch(e){console.error(e);end(1)}return()=>{if(stop)stop()}}]}
(function(){if(typeof openMG!=="function"||typeof MG==="undefined")return;const o0=openMG;openMG=function(k){try{if(KG82_MGL[k])MG[k]=kg82Lesson(k)}catch(e){}return o0.apply(this,arguments)}})();
