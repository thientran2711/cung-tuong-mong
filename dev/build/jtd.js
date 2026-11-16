/* ================= jtd · TỨ ĐỨC MINI-GAMES (owner 15/11, review/tuduc-mg, C41) =================
   "Mini game học tứ đức đâu? Không thấy."  Công / Dung / Ngôn / Hạnh study (j85 lessonVir) now plays one easy mini-game each, in the SHARED mini-game
   frame (j82 kg82Open / kitGameFrame, KIT §13): the same engine contract as j82 / j91 — eng(box, env) -> stop(), env.hud, env.end(raw 0..10), KG82.peek.
   Own file (after j91 + j85, before j83): nothing in j82 / j91 is edited, so review/mg-easy cannot conflict.
   | course            | game                | how (every rule is on screen before and during play)                                            |
   | Công · Nữ công    | Thêu theo nét       | match the sample thread colour, then drag the needle along the dotted pattern (glowing dot = next stitch) |
   | Dung · Dung nghi  | Đi đứng giữ bát     | hold LEFT / RIGHT half of the board to keep the bowl upright; each floor mark shows which way the next step leans it |
   | Ngôn · Lời nói    | Nói đúng lúc        | (mg-balance-2, no words) wait for the speaker (and an upset one to calm), then HOLD «Thưa» and let go in the voice band of that listener |
   | Hạnh · Đức hạnh   | Làm phúc            | share the portions among the waiting people (+ / −) so that everyone gets enough of what they need  |
   Level (S.vir[k] 0..5) only makes it EASIER (wider band, fewer wrong choices, no shortage), never harder; "Để trời định" = 5/10 as everywhere.
   Progress: raw → lesson points (self: 1 or 2; teacher: 2 or 3, the same 1..3 span as before); Công practice also lifts the quality of handmade goods (0..2, S.vpf).
   Boards: the existing painted study rooms (theu / mua / tho / ve -bg-hoc) + existing sprites; dedicated mg-td* paintings are listed in dev/PROGRESS_tuduc-mg.md. */
const TD_BG={td_cong:"theu-bg-hoc",td_dung:"mua-bg-hoc",td_ngon:"tho-bg-hoc",td_hanh:"ve-bg-hoc"};
const TD_OF={cong:"td_cong",dung:"td_dung",ngon:"td_ngon",hanh:"td_hanh"};
Object.assign(KG82_KIND,{
 td_cong:{e:"tdthread",n:"Công",t:"Thêu theo nét",how:"Chọn sợi chỉ đúng màu với chỉ mẫu. Rồi kéo kim theo nét chấm; chấm sáng là mũi kế tiếp. Ba mảnh thêu."},
 td_dung:{e:"tdwalk",n:"Dung",t:"Đi đứng giữ bát",how:"Bước đi làm bát trên đầu nghiêng. Giữ nửa trái hoặc nửa phải của khung để đỡ bát thẳng lại. Dấu trên sàn báo bước sau nghiêng về bên nào."},
 td_ngon:{e:"tdtalk",n:"Ngôn",t:"Nói đúng lúc, vừa tiếng",how:"Chờ người nói dứt lời; người đang giận, buồn hay lo thì chờ vòng xám nguôi. Vòng xanh sáng lên là tới lúc thưa: giữ nút Thưa cho tiếng nói dâng lên, buông tay khi vào dải xanh. Bề trên nhỏ nhẹ, kẻ dưới ôn tồn, ngang hàng vui vẻ. 5 lượt."},
 td_hanh:{e:"tdalms",n:"Hạnh",t:"Làm phúc",how:"Mỗi người chờ đều ghi cần mấy phần. Chạm + hoặc − để chia phần cho vừa đủ rồi chạm Phát xong trước khi hết giờ. 3 lượt."}});
Object.assign(KG82_SPR,{td_cong:["kim-needle","theu-cloud"],td_dung:["mua-mat","banh-pot"],td_ngon:[],td_hanh:[]});
(function(){const b0=kg82BgName;kg82BgName=function(kind){return TD_BG[kind]||b0.apply(this,arguments)}})();
const TD_RULES={
 cong:[["1","Xem chỉ mẫu ở trên, chạm sợi chỉ cùng màu."],["2","Đặt ngón tay lên chấm xanh, kéo kim men theo nét chấm tới cờ đỏ."],["3","Lệch khỏi nét thì mũi chỉ không bám; kéo lại gần nét là thêu tiếp được."]],
 dung:[["1","Bước chân nào cũng làm bát nghiêng một chút. Dấu trên sàn có mũi tên chỉ bên nghiêng."],["2","Giữ nửa trái hoặc nửa phải của khung để đỡ bát về phía ngược lại."],["3","Giữ mũi tên xanh ở vùng sáng giữa thanh là được điểm; bát đổ thì đứng lại một nhịp."]],
 ngon:[["1","Người nói xong và vòng xám đầy (người đang giận, buồn, lo cần nguôi) thì vòng xanh sáng: tới lúc thưa. Nói chen vào là cướp lời."],["2","Giữ nút Thưa: tiếng nói dâng lên trong thanh bên phải."],["3","Buông tay khi tiếng nói nằm trong dải xanh: bề trên nhỏ nhẹ, kẻ dưới ôn tồn, ngang hàng vui vẻ. Giữ quá lâu là lớn tiếng."]],
 hanh:[["1","Mỗi người chờ ghi rõ cần mấy phần. Họ không chờ lâu được: mỗi lượt có hạn giờ."],["2","Chạm + để thêm một phần cho người ấy, chạm − để bớt lại."],["3","Chia cho ai cũng đủ, đừng thừa cho người này mà thiếu người kia, rồi chạm Phát xong."]]};
const TD_GOAL={cong:"Đường kim đều và đúng màu chỉ",dung:"Bát giữ thẳng trọn buổi",ngon:"Nói đúng lúc, vừa tiếng người nghe",hanh:"Ai cũng được đủ phần cần"};
function tdEase(lv){return cl(Math.round(lv||0),0,5)}

/* ---------- 1. Công: Thêu theo nét ---------- */
const TD_THREAD=[["đỏ son","#c23b22"],["lam ngọc","#2f6aa5"],["vàng nghệ","#e0a526"],["lục","#2f8a5a"],["tím","#7a4a9a"]];
const TD_PATH=[t=>[.1+.8*t,.5+.2*Math.sin(Math.PI*4*t)],t=>{const a=Math.PI*(-.85+1.7*t);return[.5+.34*Math.sin(a)*1.0,.62-.34*Math.cos(a)]},t=>[.5+.27*Math.sin(Math.PI*2*t),.12+.76*t]];
function kgTdThread(box,env){const C=kg82Canvas(box,1,430),{g,W,H}=C;const lv=tdEase(env.lv),N=44,TOL=W*(.055+.006*lv)*mgTol(env),LIM=26000;
 const order=kg82Shuf([0,1,2]);let piece=0,pts=0,phase="pick",stop=false,raf=0,t0=0,i=0,down=false,px=0,py=0,off=0,lastT=0,tgt=0,choice=[],P=[],colOk=false;const pops=[];
 const pc=kg82Col("--good","#2d7a52"),rc=kg82Col("--red","#c23b22");
 function samples(k){return Array.from({length:N},(_,j)=>{const [x,y]=TD_PATH[order[k]](j/(N-1));return[x*W,(.1+.8*y)*H]})}
 function begin(){if(stop)return;if(piece>=3){stop=true;return setTimeout(()=>env.end((pts)),350)}P=samples(piece);i=0;off=0;down=false;colOk=false;phase="pick";
  const ids=kg82Shuf([0,1,2,3,4]).slice(0,lv>=3?2:3);tgt=ids[Math.floor(Math.random()*ids.length)];choice=kg82Shuf(ids)}
 function endPiece(){if(phase!=="stitch")return;phase="judge";const p=i/(N-1),q=p*(1-Math.min(.4,off*.25));const got=((colOk?.2:0)+.8*q)*10/3;pts+=got;
  kg82Pop(pops,W/2,H*.5,p>=.98?"Thêu đẹp lắm!":p>=.6?"Đường kim khá đều":"Còn dang dở",p>=.6?pc:rc);piece++;setTimeout(begin,1100)}
 const sw=()=>{const r=Math.min(W*.085,34),n=choice.length,gap=(W-n*2*r)/(n+1);return choice.map((id,k)=>({id,x:gap*(k+1)+r*(2*k+1),y:H*.72,r}))};
 function draw(now){kg82Bg(g,W,H,"td_cong",.1,.6);g.textAlign="center";g.textBaseline="alphabetic";
  if(phase==="pick"){g.fillStyle="#3a1a0c";g.font=`700 15px ${kg82Col("--body","sans-serif")}`;kg82Lbl(g,"Chỉ mẫu",W/2,H*.2);g.beginPath();g.arc(W/2,H*.34,Math.min(W*.1,40),0,Math.PI*2);g.fillStyle=TD_THREAD[tgt][1];g.fill();g.lineWidth=3;g.strokeStyle="#fff6dc";g.stroke();
   g.fillStyle="#3a1a0c";kg82Lbl(g,"Chạm sợi chỉ cùng màu",W/2,H*.56);sw().forEach(s=>{g.beginPath();g.arc(s.x,s.y,s.r,0,Math.PI*2);g.fillStyle=TD_THREAD[s.id][1];g.fill();g.lineWidth=3;g.strokeStyle="#fff6dc";g.stroke()})}
  else{const col=TD_THREAD[choice.length?tgt:0][1];g.save();g.lineCap="round";g.lineJoin="round";g.setLineDash([2,9]);g.lineWidth=4;g.strokeStyle="rgba(58,26,12,.75)";g.beginPath();P.forEach(([x,y],j)=>j?g.lineTo(x,y):g.moveTo(x,y));g.stroke();g.restore();
   if(i>0){g.save();g.lineCap="round";g.lineJoin="round";g.lineWidth=5.5;g.strokeStyle=useCol;g.beginPath();for(let j=0;j<=i;j++)j?g.lineTo(P[j][0],P[j][1]):g.moveTo(P[j][0],P[j][1]);g.stroke();g.restore()}
   const nx=P[Math.min(N-1,i+3)];if(phase==="stitch"){g.save();g.globalAlpha=.55+.4*Math.sin(now/180);g.fillStyle="#ffe08a";g.shadowColor="#ffe08a";g.shadowBlur=16;g.beginPath();g.arc(nx[0],nx[1],8,0,Math.PI*2);g.fill();g.restore()}
   g.fillStyle="#2d7a52";g.beginPath();g.arc(P[0][0],P[0][1],9,0,Math.PI*2);g.fill();g.fillStyle="#c23b22";g.beginPath();g.arc(P[N-1][0],P[N-1][1],9,0,Math.PI*2);g.fill();
   g.fillStyle="#3a1a0c";g.font=`700 12px ${kg82Col("--body","sans-serif")}`;kg82Lbl(g,"bắt đầu",P[0][0],P[0][1]+(P[0][1]<H*.5?24:-14),70);kg82Lbl(g,"hết nét",P[N-1][0],P[N-1][1]+(P[N-1][1]<H*.5?24:-14),70);
   if(down||i>0)kg82Spr(g,"kim-needle",down?px:P[i][0],down?py:P[i][1],W*.2,null,{ax:.08,ay:.92})}
  kg82DrawPops(g,pops,now)}
 let useCol="#c23b22";
 function frame(now){if(stop&&phase!=="judge")return;if(phase==="stitch"){const left=LIM-(now-t0);if(down){const dt=Math.min(.05,(now-lastT)/1000);let bd=1e9;for(let j=Math.max(0,i-2);j<N;j++){const d=Math.hypot(P[j][0]-px,P[j][1]-py);if(d<bd)bd=d}if(bd>TOL*1.6)off+=dt}lastT=now;if(i>=N-1||left<=0)endPiece()}
  env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(piece+1,3)}/3`,time:phase==="stitch"?`${Math.max(0,Math.ceil((LIM-(now-t0))/1000))} giây`:phase==="pick"?"chọn chỉ":"–"});draw(now);raf=requestAnimationFrame(frame)}
 function move(e){if(phase!=="stitch"||!down)return;[px,py]=C.at(e);for(let j=Math.min(N-1,i+4);j>i;j--){if(Math.hypot(P[j][0]-px,P[j][1]-py)<TOL*1.15){i=j;break}}}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();const [x,y]=C.at(e);if(phase==="pick"){const s=sw().find(s=>Math.hypot(s.x-x,s.y-y)<s.r*1.4);if(!s)return;colOk=s.id===tgt;useCol=TD_THREAD[s.id][1];kg82Pluck(colOk?3:0,colOk);kg82Pop(pops,W/2,H*.5,colOk?"Đúng màu!":"Lệch màu rồi",colOk?pc:rc);phase="stitch";t0=performance.now();lastT=t0;return}
  if(phase!=="stitch")return;px=x;py=y;if(Math.hypot(P[i][0]-x,P[i][1]-y)<TOL*2.2){down=true;try{C.cv.setPointerCapture(e.pointerId)}catch(_){}}});
 C.cv.addEventListener("pointermove",move);const up=()=>{down=false};C.cv.addEventListener("pointerup",up);C.cv.addEventListener("pointercancel",up);
 const act=document.createElement("div");act.className="kg82act";act.innerHTML=`<button class="${kg82Btn(true)}" id="tdthx">Xong mảnh này<small>nộp mảnh thêu đang làm</small></button>`;box.appendChild(act);act.querySelector("button").onclick=()=>{if(phase==="stitch")endPiece()};
 KG82.peek=()=>{if(phase==="pick"){const s=sw().find(s=>s.id===tgt);return s?C.client(s.x,s.y):null}if(phase!=="stitch")return null;return{drag:P.slice(Math.max(0,i)).filter((_,j,a)=>j%2===0||j===a.length-1).map(([x,y])=>{const c=C.client(x,y);return[c.x,c.y]})}};
 KG82.dbg=()=>({phase,i,down,off,TOL,p0:P[0],piece});
 begin();raf=requestAnimationFrame(frame);return()=>{stop=true;phase="";cancelAnimationFrame(raf)}}

/* ---------- 2. Dung: Đi đứng giữ bát ---------- */
function kgTdWalk(box,env){const C=kg82Canvas(box,1,430),{g,W,H}=C;const lv=tdEase(env.lv),BAND=mgLev(env,"td_dung","band"),KICK=mgLev(env,"td_dung","kick"),DUR=20,STEP=1.6,KN=12;/* mg-balance-2: safe band + step sway by ease (BAL.mgTier.lev.td_dung) */
 const kicks=Array.from({length:KN},(_,k)=>({t:2.4+k*STEP,d:k%3===2?(Math.random()<.5?-1:1):(k%2?-1:1)*(Math.random()<.35?-1:1),m:(.9+.4*Math.random())*KICK}));
 let x=0,v=0,t=0,inB=0,spill=0,stag=0,dir=0,pend=0,ki=0,stop=false,raf=0,last=performance.now();const ptr=new Map(),pops=[];
 const good=kg82Col("--good","#2d7a52"),red=kg82Col("--red","#c23b22");
 const FY=H*.8,TOPY=H*.3;
 function draw(now){kg82Bg(g,W,H,"td_dung",.06,.6);g.textAlign="center";g.textBaseline="alphabetic";
  /* the meter: safe band in the middle, needle = lean of the bowl */
  const mx=W*.12,mw=W*.76,my=H*.09;g.fillStyle="rgba(255,246,220,.85)";g.fillRect(mx,my-8,mw,16);g.fillStyle="rgba(76,160,110,.55)";g.fillRect(mx+mw/2*(1-BAND),my-8,mw*BAND,16);g.strokeStyle="#5a3a1a";g.lineWidth=2;g.strokeRect(mx,my-8,mw,16);
  g.fillStyle=Math.abs(x)<BAND?good:red;const nx=mx+mw/2+Math.max(-1,Math.min(1,x))*mw/2;g.beginPath();g.moveTo(nx,my+14);g.lineTo(nx-7,my+26);g.lineTo(nx+7,my+26);g.fill();
  g.fillStyle="#3a1a0c";g.font=`700 12px ${kg82Col("--body","sans-serif")}`;kg82Lbl(g,"nghiêng trái",mx+34,my+42,90);kg82Lbl(g,"nghiêng phải",mx+mw-34,my+42,90);
  /* floor marks come down toward the foot line; the arrow says which way that step leans the bowl */
  for(let k=ki-1;k<KN;k++){if(k<0)continue;const kk=kicks[k],dtm=kk.t-t;if(dtm<-.4||dtm>2.4)continue;const y=FY-(dtm/2.4)*(FY-TOPY),sc=.55+.45*(1-dtm/2.4);kg82Spr(g,"mua-mat",W/2,y,W*.24*sc,null,{alpha:.9});
   g.fillStyle="#fff3d6";g.font=`700 ${Math.round(16*sc+4)}px ${kg82Col("--body","sans-serif")}`;g.save();g.shadowColor="#5a1208";g.shadowBlur=6;g.fillText(kk.d<0?"◀ trái":"phải ▶",W/2,y+5);g.restore()}
  g.save();g.strokeStyle="rgba(143,95,12,.8)";g.lineWidth=3;g.beginPath();g.moveTo(W*.2,FY+8);g.lineTo(W*.8,FY+8);g.stroke();g.restore();
  /* the bowl, tipping about its foot */
  const ang=Math.max(-1.2,Math.min(1.2,x))*.45;g.save();g.translate(W/2,FY-6);g.rotate(ang);if(!kg82Spr(g,"banh-pot",0,0,W*.26,null,{ay:1})){g.fillStyle="#b07a3a";g.fillRect(-30,-40,60,40)}g.restore();
  if(stag>0){g.save();g.fillStyle="rgba(255,246,220,.7)";g.fillRect(0,0,W,H);g.restore()}
  /* touch halves */
  g.fillStyle="#3a1a0c";g.font=`700 13px ${kg82Col("--body","sans-serif")}`;g.textAlign="left";kg82Lbl(g,"◀ giữ nửa trái đỡ bát sang trái",10,H-12,W*.45);g.textAlign="right";kg82Lbl(g,"giữ nửa phải đỡ bát sang phải ▶",W-10,H-12,W*.45);g.textAlign="center";
  if(dir){g.save();g.fillStyle="rgba(255,224,138,.22)";g.fillRect(dir<0?0:W/2,H*.2,W/2,H*.7);g.restore()}
  kg82DrawPops(g,pops,now)}
 function step(dt){t+=dt;
  while(ki<KN&&t>=kicks[ki].t){v+=kicks[ki].d*kicks[ki].m*1.1;ki++}
  const eff=dir||pend;/* a tap shorter than one frame still counts for that frame */v+=(.55*x+eff*3.2)*dt;v*=Math.exp(-1.4*dt);x+=v*dt;
  if(Math.abs(x)>=1){spill++;x=0;v=0;stag=1;kg82Pluck(0,false);kg82Pop(pops,W/2,H*.5,"Bát nghiêng quá, đứng lại một nhịp",red)}
  if(stag>0)stag-=dt;else if(Math.abs(x)<BAND)inB+=dt}
 /* real-time clock: a slow frame (down to ~4 fps) is run as several small steps, so a laggy phone gets the same 20 s as everyone, never a clock that crawls past the shared 97 s guard */
 function frame(now){if(stop)return;const dl=Math.min(.6,Math.max(0,(now-last)/1000));last=now;const n=Math.max(1,Math.ceil(dl/.034));for(let q=0;q<n&&t<DUR+1;q++)step(dl/n);pend=0;
  env.hud({score:`${Math.min(10,Math.round(inB/DUR*10))}/10`,round:`Bước ${Math.min(ki+1,KN)}/${KN}`,time:`${Math.max(0,Math.ceil(DUR+1-t))} giây`});
  draw(now);if(t>=DUR+1){stop=true;return setTimeout(()=>env.end(Math.min(10,Math.round(inB/DUR*10))),300)}raf=requestAnimationFrame(frame)}
 const setDir=()=>{let d=0;ptr.forEach(s=>d+=s);dir=Math.max(-1,Math.min(1,d))};
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();const [px]=C.at(e);ptr.set(e.pointerId,px<W/2?-1:1);pend=px<W/2?-1:1;try{C.cv.setPointerCapture(e.pointerId)}catch(_){}setDir()});
 const up=e=>{ptr.delete(e.pointerId);setDir()};C.cv.addEventListener("pointerup",up);C.cv.addEventListener("pointercancel",up);
 KG82.dbg=()=>({x,v,t,dir,inB,spill,ki,stag,n:ptr.size});KG82.peek=()=>{/* a player reads the floor mark: lean against the coming step just before it lands */const kk=kicks[ki],pre=kk&&kk.t-t<.3&&kk.t-t>0?kk.d*kk.m*1.1*.6:0;const f=x+.4*(v+pre);if(Math.abs(f)<BAND*.15)return{hold:false};const want=-Math.sign(f);const c=C.client(want<0?W*.25:W*.75,H*.5);return{hold:true,x:c.x,y:c.y}};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf)}}

/* ---------- 3. Ngôn: Nói đúng lúc, vừa tiếng (mg-balance-2, owner 16/11 07:20Z "no word games": replaces the old Ứng đối reply-picking quiz) ----------
   Five turns. Someone speaks (bubble with moving dots, no sentence to read). Wait until the talk ends; an upset speaker needs a moment to calm
   (grey ring); when the ring turns GREEN it is her turn. She HOLDS «Thưa» to speak: her voice bar rises; she lets go inside the green band.
   The band sits by who listens: bề trên → nhỏ nhẹ (low), kẻ dưới → ôn tồn (middle), ngang hàng → vui vẻ (higher). Everything is shown on the board.
   Score per turn = BAL-free shape: 30 % timing (not cutting in, not too late) + 70 % voice (inside the band = full, fading outside).
   Ease levers (BAL.mgTier.lev.td_ngon via mgLev): band half-width, reply window ms, voice rise per second. */
const TD_SPK=[["Thái hậu","up"],["Hoàng thượng","up"],["Hoàng hậu","up"],["Lệ phi","peer"],["Hòa tần","peer"],["Cẩn quý nhân","peer"],["Dung thường tại","peer"],
 ["Tiểu cung nữ","down"],["Ma ma","down"],["Cung nhân","down"],["Tiểu thái giám","down"]];
const TD_CLS={up:"bề trên",peer:"ngang hàng",down:"kẻ dưới"};
/* voice band centre by listener (0 = khẽ, 1 = lớn) and its word; calm-down pause (s) by mood */
const TD_VOICE={up:[.3,"nhỏ nhẹ"],down:[.48,"ôn tồn"],peer:[.64,"vui vẻ"]};const TD_MOOD={vui:0,lo:.6,"buồn":.9,"giận":1.3};
function kgTdTalk(box,env){const C=kg82Canvas(box,.78,400),{g,W,H}=C;const BH=mgLev(env,"td_ngon","band"),WIN=mgLev(env,"td_ngon","win"),RATE=mgLev(env,"td_ngon","rate"),FADE=mgLev(env,"td_ngon","fade");
 const cls=kg82Shuf(["up","peer","down","up","peer"]),Q=cls.map(c=>{const L=TD_SPK.filter(s=>s[1]===c);const s=L[Math.floor(Math.random()*L.length)];const m=kg82Shuf(Object.keys(TD_MOOD))[0];return{who:s[0],c,m,talk:1200+Math.random()*1300}});
 const bt=k91Btns(box,[["tdsay","Thưa","giữ để nói, buông khi vào dải xanh"]]);const sb=bt.querySelector("#tdsay");
 let r=-1,pts=0,phase="",t0=0,lvl=0,held=false,cut=false,done=false,res=null;const pops=[];const good=K91C.good(),red=K91C.red(),gold=K91C.gold();
 const dm=k91DemoCard(box,"td_ngon-demo",{title:"Nói đúng lúc, vừa tiếng",lines:["Chờ người nói dứt lời; người đang giận, buồn hay lo cần một lúc nguôi (vòng xám).","Vòng sáng xanh là tới lúc thưa: giữ nút Thưa, tiếng nói dâng lên trong thanh.","Buông tay khi tiếng nói nằm trong dải xanh: bề trên thì nhỏ nhẹ, kẻ dưới thì ôn tồn, ngang hàng thì vui vẻ."],art:(g,W,H,now)=>{/* a small moving example: dots → green ring → the voice rises into the band */const y0=44,h=Math.min(H*.36,150),cx=W*.38,k=(now%4200)/4200;
  g.save();k91RR(g,cx-70,y0+h*.2,140,h*.5,14);g.fillStyle="#fffdf6";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
  if(k<.35){for(let i=0;i<3;i++){g.globalAlpha=.35+.65*Math.max(0,Math.sin(now/170-i*.9));g.fillStyle=K91C.ink;g.beginPath();g.arc(cx-20+i*20,y0+h*.45,5,0,Math.PI*2);g.fill()}g.globalAlpha=1}
  else{g.strokeStyle=K91C.good();g.lineWidth=5;g.beginPath();g.arc(cx+80,y0+h*.2,16,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-Math.min(1,(k-.35)/.65)));g.stroke()}
  const vx=W*.68,vw=24,lv=k<.45?0:Math.min(.4,(k-.45)*1.2);g.fillStyle="#fffdf6";g.fillRect(vx,y0,vw,h);g.strokeStyle=K91C.hair;g.strokeRect(vx,y0,vw,h);g.fillStyle="rgba(45,122,82,.42)";g.fillRect(vx,y0+h*(1-.38),vw,h*.16);
  g.fillStyle="#c23b22";g.fillRect(vx+3,y0+h*(1-lv),vw-6,h*lv);g.restore();return y0+h+22},done:()=>{bt.hidden=false;next()}});
 if(dm)bt.hidden=true;
 function next(){r++;if(r>=Q.length){done=true;return setTimeout(()=>env.end(pts),400)}const q=Q[r];lvl=0;held=false;cut=false;res=null;phase="talk";t0=performance.now();
}
 const band=()=>{const c=TD_VOICE[Q[r].c][0];return[c-BH,c+BH]};
 function judge(why){if(phase==="judge")return;const q=Q[r],[a,b]=band();let tm=why==="late"?0:cut?.4:1,vo=0;
  if(why==="say"){const d=lvl<a?a-lvl:lvl>b?lvl-b:0;vo=d<=0?1:Math.max(0,1-d/FADE)}else if(why==="loud")vo=0;
  const got=2*(.3*tm+.7*vo);pts+=got;phase="judge";held=false;sb.classList.remove("on");
  res=why==="late"?["Im lặng lâu quá",red]:why==="loud"?["Lớn tiếng quá",red]:vo>=1?[cut?"Vừa tiếng, nhưng đã cướp lời":"Vừa tiếng, đúng lúc",cut?gold:good]:vo>0?[lvl<a?"Hơi khẽ":"Hơi to",gold]:[lvl<a?"Khẽ quá, không nghe rõ":"To quá",red];
  kg82Pluck(vo>=1?3:0,vo>=1);kg82Pop(pops,W/2,H*.5,res[0],res[1]);setTimeout(next,1300)}
 const down=e=>{e.preventDefault();if(done||(dm&&dm.on))return;if(phase==="talk"||phase==="calm"){if(!cut){cut=true;kg82Pop(pops,W/2,H*.5,"Đừng cướp lời, chờ vòng xanh",red);kg82Pluck(0,false)}return}
  if(phase==="win"){phase="say";held=true;sb.classList.add("on")}};
 const up=()=>{if(phase==="say"&&held){held=false;judge("say")}};
 sb.addEventListener("pointerdown",down);["pointerup","pointercancel","pointerleave"].forEach(ev=>sb.addEventListener(ev,up));sb.addEventListener("contextmenu",e=>e.preventDefault());
 let last=performance.now();
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last)/1000;last=now;kg82Bg(g,W,H,"td_ngon",.1,.6);
  if(dm&&dm.on){dm.draw(g,W,H,now);return}
  if(r<0||r>=Q.length){kg82DrawPops(g,pops,now);return}const q=Q[r],k=now-t0,calm=TD_MOOD[q.m]*1000;
  if(phase==="talk"&&k>=q.talk){phase=calm?"calm":"win";t0=now}
  else if(phase==="calm"&&k>=calm){phase="win";t0=now}
  else if(phase==="win"&&k>=WIN)judge("late");
  if(phase==="say"){lvl+=RATE*dt;if(lvl>=1){lvl=1;judge("loud")}}
  /* who speaks (on the board, so a short landscape screen keeps it in view) */
  g.textAlign="left";g.textBaseline="top";g.font=k91F(700,W<420?13:15,1);g.fillStyle=K91C.ink;kg82Lbl(g,`${q.who} · ${TD_CLS[q.c]}`,12,10,W*.62);
  g.font=k91F(700,W<420?12:13,1);g.fillStyle=q.m==="vui"?good:q.m==="giận"?red:K91C.lab;kg82Lbl(g,`sắc mặt ${q.m} · cần giọng ${TD_VOICE[q.c][1]}`,12,32,W*.62);
  /* the speaker's bubble and the turn ring */
  const bx=W*.36,by=H*.46,bw=Math.min(W*.5,260),bh=H*.3;g.save();k91RR(g,bx-bw/2,by-bh/2,bw,bh,bh*.3);g.fillStyle="rgba(255,250,236,.95)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
  g.beginPath();g.moveTo(bx-bw*.18,by+bh/2-2);g.lineTo(bx-bw*.3,by+bh/2+18);g.lineTo(bx-bw*.02,by+bh/2-2);g.fill();g.restore();
  if(phase==="talk"){for(let i=0;i<3;i++){const a=.35+.65*Math.max(0,Math.sin(now/170-i*.9));g.globalAlpha=a;g.fillStyle=K91C.ink;g.beginPath();g.arc(bx-24+i*24,by,6,0,Math.PI*2);g.fill()}g.globalAlpha=1}
  const rg=Math.min(bw,bh)*.62,rx=bx+bw/2+rg*.2,ry=by-bh/2+4;
  const ring=(col,f)=>{g.save();g.lineWidth=7;g.strokeStyle="rgba(58,26,12,.15)";g.beginPath();g.arc(rx,ry,rg*.45,0,Math.PI*2);g.stroke();g.strokeStyle=col;g.beginPath();g.arc(rx,ry,rg*.45,-Math.PI/2,-Math.PI/2+Math.PI*2*f);g.stroke();g.restore()};
  if(phase==="calm")ring("#8a7350",Math.min(1,k/calm));if(phase==="win"){ring(good,1-Math.min(1,k/WIN));g.save();g.globalAlpha=.5+.5*Math.sin(now/120);g.fillStyle=good;g.beginPath();g.arc(rx,ry,rg*.2,0,Math.PI*2);g.fill();g.restore()}
  g.fillStyle=K91C.ink;g.font=k91F(700,W<420?12:13,1);g.textAlign="center";g.textBaseline="middle";
  kg82Lbl(g,phase==="talk"?"đang nói…":phase==="calm"?"chờ người ấy nguôi":phase==="win"?"tới lúc thưa":phase==="say"?"đang thưa":"",bx,by+bh/2+30,bw);
  /* her voice bar: green band by who listens */
  const vx=W*.8,vw=Math.max(26,W*.07),vy=H*.1,vh=H*.74,[a,b]=band();g.fillStyle="#fffdf6";g.fillRect(vx,vy,vw,vh);g.strokeStyle=K91C.hair;g.lineWidth=2;g.strokeRect(vx,vy,vw,vh);
  g.fillStyle="rgba(45,122,82,.42)";g.fillRect(vx,vy+vh*(1-b),vw,vh*(b-a));const ly=vy+vh*(1-lvl);const gr=g.createLinearGradient(0,vy+vh,0,vy);gr.addColorStop(0,"#e8c06a");gr.addColorStop(1,"#c23b22");g.fillStyle=gr;g.fillRect(vx+4,ly,vw-8,vy+vh-ly);
  g.fillStyle=lvl>=a&&lvl<=b?good:K91C.ink;g.beginPath();g.moveTo(vx-3,ly);g.lineTo(vx-13,ly-6);g.lineTo(vx-13,ly+6);g.fill();
  g.fillStyle=K91C.ink;g.font=k91F(700,11,1);kg82Lbl(g,"lớn",vx+vw/2,vy-9,70);kg82Lbl(g,"khẽ",vx+vw/2,vy+vh+10,70);g.textAlign="right";kg82Lbl(g,TD_VOICE[q.c][1],vx-16,vy+vh*(1-(a+b)/2),W*.3);
  kg82DrawPops(g,pops,now);
  env.hud({score:`${Math.round(pts)}/10`,round:`Lượt ${Math.min(r+1,5)}/5`,time:phase==="win"?`${Math.max(0,Math.ceil((WIN-k)/1000))} giây`:"–"})});
 /* oracle: hold from the green ring until the voice is a little under the band centre (it keeps rising for a human's reaction time) */
 KG82.peek=()=>{if(done)return null;if(dm&&dm.on)return{sel:"#k91demo"};if(r<0)return null;const p=C.client(0,0),rc=sb.getBoundingClientRect(),o={hsel:"#tdsay",x:rc.left+rc.width/2,y:rc.top+rc.height/2};
  if(phase==="win")return Object.assign(o,{hold:true});if(phase==="say"){const [a,b]=band();return Object.assign(o,{hold:lvl<(a+b)/2-RATE*.04})}return Object.assign(o,{hold:false})};
 if(!dm)next();return()=>{done=true;stop()}}

/* ---------- 4. Hạnh: Làm phúc ---------- */
const TD_ALMS=[
 {pool:5,list:[["Lão cung nhân","già yếu, lưng còng",2],["Tiểu cung nữ","mới vào cung",1],["Cung nhân ốm","vừa khỏi bệnh",2]]},
 {pool:8,list:[["Lão ma ma","đói lả",3],["Hai mẹ con nghèo","xin ăn ở cổng",2],["Tiểu thái giám","làm việc nặng",1],["Cung nhân góa","tuổi cao",2]]},
 {pool:7,list:[["Cung nữ giặt áo","tay nứt nẻ",2],["Lão thái giám","ốm yếu",3],["Tiểu cung nhân","còn nhỏ",2]]}];
function tdAlmsScore(need,give,pool){const n=need.length,r=need.map((d,i)=>Math.min(1,give[i]/d)),over=need.reduce((a,d,i)=>a+Math.max(0,give[i]-d),0),left=pool-give.reduce((a,b)=>a+b,0);
 return Math.max(0,.5*Math.min(...r)+.5*r.reduce((a,b)=>a+b,0)/n-.12*over-.1*Math.max(0,left))}
function tdAlmsBest(need,pool){let best=0;const give=need.map(()=>0);(function rec(i,left){if(i===need.length){best=Math.max(best,tdAlmsScore(need,give,pool));return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,pool);return best||1}
function kgTdAlms(box,env){const lv=tdEase(env.lv);const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);
 /* mg-balance-2: at low ease the portions run short in more rounds and each round has a time (the people cannot wait): BAL.mgTier.lev.td_hanh */
 const SH=Math.round(mgLev(env,"td_hanh","short")),LIM=Math.round(mgLev(env,"td_hanh","lim"));
 const rounds=TD_ALMS.map((q,k)=>({list:q.list,need:q.list.map(x=>x[2]),pool:q.pool-(k===2&&lv<3?1:0)-(k<2?Math.min(SH,k+1):0)}));let r=0,pts=0,stop=false,give=[],lock=false,t0=performance.now(),tm=0;
 function left(){return rounds[r].pool-give.reduce((a,b)=>a+b,0)}
 function render(){if(stop)return;const R=rounds[r];
  wrap.innerHTML=kg82Rows([["Còn lại",`<span class="ef t"><b>${left()}</b> phần để chia</span>`],["Việc cần",R.pool<R.need.reduce((a,b)=>a+b,0)?`Phần không đủ cho mọi người. Chia sao cho ai cũng có ít nhất một ít, người cần nhiều được nhiều hơn.`:`Phần vừa đủ. Cho mỗi người đúng số họ cần.`,"n"]])+
   R.list.map((x,i)=>`<div class="kg82ar"><button class="kgbtn" data-p="${i}" data-d="-1" aria-label="Bớt một phần cho ${x[0]}">−</button><span><b>${x[0]}</b> · ${x[1]}<br>cần ${x[2]} phần · nhận <b>${give[i]}</b></span><button class="kgbtn" data-p="${i}" data-d="1" aria-label="Thêm một phần cho ${x[0]}">+</button></div>`).join("")+
   `<div class="kg82act"><button class="${kg82Btn()}" id="tdadone">Phát xong</button></div>`;
  wrap.querySelectorAll("button[data-p]").forEach(b=>b.onclick=()=>{if(lock)return;const i=+b.dataset.p,d=+b.dataset.d;if(d>0&&left()<=0)return;if(d<0&&give[i]<=0)return;give[i]+=d;kg82Pluck(1,true);render()});
  wrap.querySelector("#tdadone").onclick=done;hud()}
 const hud=()=>env.hud({score:`${Math.round(pts)}/10`,round:`Lượt ${r+1}/3`,time:`${Math.max(0,Math.ceil((LIM-(performance.now()-t0))/1000))} giây`});
 tm=setInterval(()=>{if(stop||lock)return;hud();if(performance.now()-t0>=LIM)done()},250);
 function done(){if(lock||stop)return;lock=true;const R=rounds[r],s=tdAlmsScore(R.need,give,R.pool)/tdAlmsBest(R.need,R.pool),got=Math.min(1,s)*10/3;pts+=got;
  const ok=s>=.95;kg82Pluck(ok?3:0,ok);wrap.insertAdjacentHTML("beforeend",kg82Rows([[ok?"Chia khéo":s>=.6?"Khá ổn":"Còn lệch",ok?"Ai cũng được đủ phần cần.":"Có người thiếu hoặc có người thừa phần.",ok?"g":s>=.6?"n":"r"]]));
  r++;setTimeout(()=>{if(r>=3){stop=true;clearInterval(tm);env.end((pts))}else{give=rounds[r].need.map(()=>0);lock=false;t0=performance.now();render()}},1400)}
 give=rounds[0].need.map(()=>0);
 KG82.peek=()=>{if(lock||stop)return null;const R=rounds[r];let i=R.need.findIndex((d,k)=>give[k]<tdAlmsBestGive(R)[k]);/* think: the first share of a round is the decision (more people / short portions = longer to work out) */const th=give.every(x=>!x)?1000+500*R.need.length+(R.pool<R.need.reduce((a,b)=>a+b,0)?2500:0):0;
  if(i<0||left()<=0)return{sel:"#tdadone",thinkMs:th};return{sel:`#${box.id||"kg82box"} button[data-p="${i}"][data-d="1"]`,thinkMs:th}};
 render();return()=>{stop=true;clearInterval(tm)}}
function tdAlmsBestGive(R){let best=-1,bg=null;const give=R.need.map(()=>0);(function rec(i,left){if(i===R.need.length){const s=tdAlmsScore(R.need,give,R.pool);if(s>best){best=s;bg=give.slice()}return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,R.pool);return bg}
/* ---------- easy-rules layer (same pattern as review/mg-easy): Gợi ý button, quiet idle hint, first-time example card ---------- */
const TD_HINT={tdthread:"Viền vàng chỉ sợi chỉ đúng màu, hoặc chấm kế tiếp để kéo kim tới.",tdwalk:"Viền vàng ở nửa khung nên giữ lúc này.",tdtalk:"Viền vàng ở nút Thưa: giữ khi vòng xanh sáng, buông khi tiếng nói vào dải xanh.",tdalms:"Viền vàng ở nút cần chạm tiếp (hoặc nút Phát xong)."};
const TD_EX={cong:"Chỉ mẫu màu lục thì chạm sợi chỉ lục, rồi kéo kim từ chấm xanh men theo nét chấm.",dung:"Dấu sàn ghi “◀ trái” thì bát sắp nghiêng trái: giữ nửa phải để đỡ lại.",ngon:"Thái hậu vui (bề trên): chờ bà nói xong, vòng xanh sáng thì giữ Thưa, tiếng nói vừa tới dải xanh thấp (nhỏ nhẹ) thì buông.",hanh:"Người ghi cần 2 phần: chạm + hai lần cho người ấy, rồi làm vậy với mọi người, chạm Phát xong."};
function tdIdle(lv){lv=+lv||0;return lv<=1?6500:lv<=3?10500:0}
function tdSeen(k,set){try{if(KG82.noDemo||!S)return true;const m=S.mgSeen||(S.mgSeen={});if(set){m["td_"+k]=1;return true}return !!m["td_"+k]}catch(e){return true}}
function tdRing(pt,ms){const r=document.createElement("div");r.className="tdring ksel";r.style.cssText=`position:fixed;left:${pt.x-26}px;top:${pt.y-26}px;width:52px;height:52px;border-radius:50%;pointer-events:none;z-index:99999`;document.body.appendChild(r);setTimeout(()=>r.remove(),ms||2600);return r}
function tdWrap(eng,ek){return function(box,env){let hints=0,last=performance.now(),dead=false;const tipId="tdtip",IDLE=tdIdle(env.lv),end0=env.end;
 const act=document.createElement("div");act.className="kg82act";act.innerHTML=`<button class="${kg82Btn(true)}" id="tdhint">Gợi ý<small>chỉ chỗ đúng, bớt một ít phần</small></button>`;
 const tip=document.createElement("div");tip.id=tipId;const say=t=>{tip.innerHTML=t?kg82Rows([["Ma ma",t,"n"]]):""};say(IDLE?"Chưa rõ thì chạm Gợi ý, ma ma sẽ chỉ cho.":"");box.appendChild(act);box.appendChild(tip);
 const show=auto=>{if(dead||!KG82.peek)return;const p=KG82.peek();if(!p)return;hints+=auto?.3:.7;last=performance.now();let pt=p.x!=null?p:p.drag&&p.drag[0]?{x:p.drag[0][0],y:p.drag[0][1]}:null;
  if(p.sel){const e=document.querySelector(p.sel);if(e){e.classList.add("ksel");setTimeout(()=>e.classList.remove("ksel"),2600);pt=null}}
  say((auto?"Khẽ nhắc: ":"")+TD_HINT[ek]);if(pt)tdRing(pt);if(p.drag&&p.drag.length>1){const q=p.drag[Math.min(p.drag.length-1,3)];tdRing({x:q[0],y:q[1]})}};
 act.querySelector("button").onclick=()=>show(false);
 const act0=()=>{last=performance.now()};box.addEventListener("pointerdown",act0);box.addEventListener("pointermove",act0);
 const iv=IDLE?setInterval(()=>{if(dead)return;if(performance.now()-last>IDLE)show(true)},800):0;
 env.end=raw=>end0(Math.max(0,Math.round(raw-Math.min(2,hints))));
 const stop=eng(box,env);return()=>{dead=true;clearInterval(iv);document.querySelectorAll(".tdring").forEach(e=>e.remove());if(stop)stop()}}}
Object.assign(KG82_ENG,{tdthread:tdWrap(kgTdThread,"tdthread"),tdwalk:tdWrap(kgTdWalk,"tdwalk"),tdtalk:tdWrap(kgTdTalk,"tdtalk"),tdalms:tdWrap(kgTdAlms,"tdalms")});

/* ---------- layout only (colours and chrome come from the kit) ---------- */
(function(){const st=document.createElement("style");st.id="td-css";st.textContent=`
.kg82ar{display:flex;gap:8px;align-items:center;justify-content:space-between;margin:6px 0}.kg82ar>span{flex:1;text-align:center;font-size:.92rem}.kg82ar>button{flex:none;min-width:52px;min-height:48px}
.kg82opts button b{display:inline-block;margin-bottom:2px}.kg82opts button{height:auto;white-space:normal;line-height:1.35}
`;document.head.appendChild(st)})();

/* ---------- the study acts (j85 lessonVir): intro (rules) -> game -> result -> progress ---------- */
const TD_MODE={self:"Tự học",master:"Học với ma ma"};
function tdPoints(mode,raw){return mode==="self"?(raw>=9?2:1):(raw>=7?3:2)}
function tdQuality(p){try{const a=(p&&p.vpf&&p.vpf.cong)||[];return a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length/10*2):0}catch(e){return 0}}
(function(){const v0=virtueBonus;virtueBonus=function(p,k){const b=v0.apply(this,arguments);try{if(k==="cong"&&b&&b.q!=null&&p===S)b.q+=tdQuality(p)}catch(e){}return b};window.virtueBonus=virtueBonus})();
const TDS={busy:false};window.TDS=TDS;
function tdPlay(k,mode){if(!S||S.dead||Q.length||S.mg||TDS.busy)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(2)||S.suc<25)return}else if(!can(2)||S.bac<cost)return;
 const kind=TD_OF[k],K=KG82_KIND[kind];if(window.__bot||typeof kg82Open!=="function"){tdFinish(k,mode,5,true);return}
 TDS.busy=true;KG82.ctx="hoc";kg82Preload(kind);mgSet(kind,{occ:"hoc",lv:l});/* mg-balance: board ease from the tier (jmgt) */
 const d=kg82Open({art:`${V.n} · ${V.full}`,title:`${TD_MODE[mode]||"Học"} · ${K.t}`,how:K.how,round:K.e==="tdthread"?"Hồi":K.e==="tdwalk"?"Bước":K.e==="tdalms"?"Lượt":"Câu",roundV:"–",pic:kg82Pic(kind)});
 if(!d){TDS.busy=false;tdFinish(k,mode,5,true);return}const box=kg82Box();
 const cancel=()=>{kg82Close();TDS.busy=false};
 const result=(raw,skipped)=>{KG82.phase="result";const gain=tdPoints(mode,raw),q=k==="cong"?Math.round(raw/10*2):0;
  kg82ShowRes(kg82Rows([["Màn chơi",`${raw}/10 · ${kg82Word(raw)}${skipped?" (để trời định)":""}`,"t"],["Mục đích",TD_GOAL[k],"n"],["Tiến bộ",kg82Chip(`${V.n} tiến bộ`,gain,"g")]].concat(k==="cong"?[["Đồ thủ công",`phẩm +${q} (luyện tay ${raw>=5?"khéo":"còn vụng"})`,"n"]]:[]))+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">Đã hiểu</button></div>`,raw>=5);/* merge-train-4: result sound like j82 lessons (raw>=5 = win) */
  kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");KG82.last={raw,skipped,gain};
  $("kg82ok").onclick=()=>{kg82Close();TDS.busy=false;tdFinish(k,mode,raw,skipped)}};
 KG82.phase="intro";const first=!tdSeen(k),HOWL=["Chơi dễ: ở bậc thấp có Gợi ý và chỉ dẫn hiện sẵn; bậc càng cao càng rộng tay."];
 box.innerHTML=`<h4 class="kpst">Cách chơi${first?" · lần đầu":""}</h4>`+kg82Rows(first?TD_RULES[k].map(([n,t])=>[`Bước ${n}`,t,"t"]).concat([["Ví dụ",TD_EX[k],"n"]]):[["Luật",K.how,"t"]])+kg82Rows([["Gợi ý",HOWL[0],"n"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button><button class="${kg82Btn(true)}" id="kg82skip">Để trời định<small>tính 5/10</small></button><button class="${kg82Btn(true)}" id="tdcancel">Thôi, để lúc khác<small>không tốn gì</small></button></div>`;
 $("kg82go").onclick=()=>{tdSeen(k,1);kg82Play(kind,raw=>result(raw,false))};$("kg82skip").onclick=()=>result(5,true);$("tdcancel").onclick=cancel}
function tdFinish(k,mode,raw,skipped){if(!S||S.dead)return;vNorm(S);const l=S.vir[k],cost=virCost(l),V=VIR.find(x=>x.k===k);if(!V||l>=5)return;
 if(mode==="self"){if(!can(2)||S.suc<25)return}else if(!can(2)||S.bac<cost)return;
 const b=typeof rsnap==="function"?rsnap():null,g=tdPoints(mode,raw);
 if(mode==="self"){apply({suc:-15});spend(2);addVir(S,k,g);log(`Tự học ${V.n} (${kg82Word(raw)} ${raw}/10). Tiến bộ +${g}.`)}
 else{apply({suc:-10,bac:-cost});spend(2);addVir(S,k,g);log(`Học ${V.n} với ma ma giáo tập (${kg82Word(raw)} ${raw}/10). Tiến bộ +${g}.`)}
 if(k==="cong"){S.vpf=S.vpf||{};S.vpf.cong=(S.vpf.cong||[]).concat(raw).slice(-3)}
 save();render();try{if(b&&typeof resultShow==="function")resultShow(`${mode==="self"?"Tự học":"Học"} ${V.n}`,b,null)}catch(e){}}
window.lessonVir=tdPlay;window.tdPlay=tdPlay;
