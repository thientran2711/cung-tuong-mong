/* ================= jtd · TỨ ĐỨC MINI-GAMES (owner 15/11, review/tuduc-mg, C41) =================
   "Mini game học tứ đức đâu? Không thấy."  Công / Dung / Ngôn / Hạnh study (j85 lessonVir) now plays one easy mini-game each, in the SHARED mini-game
   frame (j82 kg82Open / kitGameFrame, KIT §13): the same engine contract as j82 / j91 — eng(box, env) -> stop(), env.hud, env.end(raw 0..10), KG82.peek.
   Own file (after j91 + j85, before j83): nothing in j82 / j91 is edited, so review/mg-easy cannot conflict.
   | course            | game                | how (every rule is on screen before and during play)                                            |
   | Công · Nữ công    | Thêu theo nét       | match the sample thread colour, then drag the needle along the dotted pattern (glowing dot = next stitch) |
   | Dung · Dung nghi  | Đi đứng giữ bát     | hold LEFT / RIGHT half of the board to keep the bowl upright; each floor mark shows which way the next step leans it |
   | Ngôn · Lời nói    | Ứng đối             | read who speaks + their face (mood) and pick the tone the rule line names; every reply shows its tone tag |
   | Hạnh · Đức hạnh   | Làm phúc            | share the portions among the waiting people (+ / −) so that everyone gets enough of what they need  |
   Level (S.vir[k] 0..5) only makes it EASIER (wider band, fewer wrong choices, no shortage), never harder; "Để trời định" = 5/10 as everywhere.
   Progress: raw → lesson points (self: 1 or 2; teacher: 2 or 3, the same 1..3 span as before); Công practice also lifts the quality of handmade goods (0..2, S.vpf).
   Boards: the existing painted study rooms (theu / mua / tho / ve -bg-hoc) + existing sprites; dedicated mg-td* paintings are listed in dev/PROGRESS_tuduc-mg.md. */
const TD_BG={td_cong:"theu-bg-hoc",td_dung:"mua-bg-hoc",td_ngon:"tho-bg-hoc",td_hanh:"ve-bg-hoc"};
const TD_OF={cong:"td_cong",dung:"td_dung",ngon:"td_ngon",hanh:"td_hanh"};
Object.assign(KG82_KIND,{
 td_cong:{e:"tdthread",n:"Công",t:"Thêu theo nét",how:"Chọn sợi chỉ đúng màu với chỉ mẫu. Rồi kéo kim theo nét chấm; chấm sáng là mũi kế tiếp. Ba mảnh thêu."},
 td_dung:{e:"tdwalk",n:"Dung",t:"Đi đứng giữ bát",how:"Bước đi làm bát trên đầu nghiêng. Giữ nửa trái hoặc nửa phải của khung để đỡ bát thẳng lại. Dấu trên sàn báo bước sau nghiêng về bên nào."},
 td_ngon:{e:"tdtalk",n:"Ngôn",t:"Ứng đối",how:"Xem người nói là ai và sắc mặt ra sao, rồi chọn lời có giọng mà phép ứng đối ghi sẵn. Mỗi lời đều có nhãn giọng. 5 câu."},
 td_hanh:{e:"tdalms",n:"Hạnh",t:"Làm phúc",how:"Mỗi người chờ đều ghi cần mấy phần. Chạm + hoặc − để chia phần cho vừa đủ rồi chạm Phát xong. 3 lượt."}});
Object.assign(KG82_SPR,{td_cong:["kim-needle","theu-cloud"],td_dung:["mua-mat","banh-pot"],td_ngon:[],td_hanh:[]});
(function(){const b0=kg82BgName;kg82BgName=function(kind){return TD_BG[kind]||b0.apply(this,arguments)}})();
const TD_RULES={
 cong:[["1","Xem chỉ mẫu ở trên, chạm sợi chỉ cùng màu."],["2","Đặt ngón tay lên chấm xanh, kéo kim men theo nét chấm tới cờ đỏ."],["3","Lệch khỏi nét thì mũi chỉ không bám; kéo lại gần nét là thêu tiếp được."]],
 dung:[["1","Bước chân nào cũng làm bát nghiêng một chút. Dấu trên sàn có mũi tên chỉ bên nghiêng."],["2","Giữ nửa trái hoặc nửa phải của khung để đỡ bát về phía ngược lại."],["3","Giữ mũi tên xanh ở vùng sáng giữa thanh là được điểm; bát đổ thì đứng lại một nhịp."]],
 ngon:[["1","Xem người nói là bề trên, ngang hàng hay kẻ dưới, và sắc mặt người ấy."],["2","Dòng Phép ứng đối ghi sẵn nên nói giọng nào."],["3","Chọn lời có nhãn giọng ấy. Giọng thẳng thắn dễ làm mất lòng, đừng chọn."]],
 hanh:[["1","Mỗi người chờ ghi rõ cần mấy phần."],["2","Chạm + để thêm một phần cho người ấy, chạm − để bớt lại."],["3","Chia cho ai cũng đủ, đừng thừa cho người này mà thiếu người kia, rồi chạm Phát xong."]]};
const TD_GOAL={cong:"Đường kim đều và đúng màu chỉ",dung:"Bát giữ thẳng trọn buổi",ngon:"Lời nói vừa lòng người nghe",hanh:"Ai cũng được đủ phần cần"};
function tdEase(lv){return cl(Math.round(lv||0),0,5)}

/* ---------- 1. Công: Thêu theo nét ---------- */
const TD_THREAD=[["đỏ son","#c23b22"],["lam ngọc","#2f6aa5"],["vàng nghệ","#e0a526"],["lục","#2f8a5a"],["tím","#7a4a9a"]];
const TD_PATH=[t=>[.1+.8*t,.5+.2*Math.sin(Math.PI*4*t)],t=>{const a=Math.PI*(-.85+1.7*t);return[.5+.34*Math.sin(a)*1.0,.62-.34*Math.cos(a)]},t=>[.5+.27*Math.sin(Math.PI*2*t),.12+.76*t]];
function kgTdThread(box,env){const C=kg82Canvas(box,1,430),{g,W,H}=C;const lv=tdEase(env.lv),N=44,TOL=W*(.055+.006*lv),LIM=26000;
 const order=kg82Shuf([0,1,2]);let piece=0,pts=0,phase="pick",stop=false,raf=0,t0=0,i=0,down=false,px=0,py=0,off=0,lastT=0,tgt=0,choice=[],P=[],colOk=false;const pops=[];
 const pc=kg82Col("--good","#2d7a52"),rc=kg82Col("--red","#c23b22");
 function samples(k){return Array.from({length:N},(_,j)=>{const [x,y]=TD_PATH[order[k]](j/(N-1));return[x*W,(.1+.8*y)*H]})}
 function begin(){if(stop)return;if(piece>=3){stop=true;return setTimeout(()=>env.end(Math.round(pts)),350)}P=samples(piece);i=0;off=0;down=false;colOk=false;phase="pick";
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
function kgTdWalk(box,env){const C=kg82Canvas(box,1,430),{g,W,H}=C;const lv=tdEase(env.lv),BAND=.45+.04*lv,DUR=20,STEP=1.6,KN=12;
 const kicks=Array.from({length:KN},(_,k)=>({t:2.4+k*STEP,d:k%3===2?(Math.random()<.5?-1:1):(k%2?-1:1)*(Math.random()<.35?-1:1),m:.9+.4*Math.random()}));
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
 KG82.dbg=()=>({x,v,t,dir,inB,spill,ki,stag,n:ptr.size});KG82.peek=()=>{const want=-Math.sign(x+.4*v)||1;const c=C.client(want<0?W*.25:W*.75,H*.5);return{hold:want,x:c.x,y:c.y}};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf)}}

/* ---------- 3. Ngôn: Ứng đối ---------- */
/* tones: kinh = cung kính · hoa = ôn hòa · than = thân mật · thang = thẳng thắn. Fit by the rule line: bề trên → kinh; ngang hàng → than if she is cheerful, else hoa; kẻ dưới → hoa. */
const TD_TONE={kinh:"cung kính",hoa:"ôn hòa",than:"thân mật",thang:"thẳng thắn"};
const TD_CLS={up:"bề trên",peer:"ngang hàng",down:"kẻ dưới"};
const TD_RULE={up:"Với bề trên: nói giọng cung kính.",peer_vui:"Với người ngang hàng đang vui: nói giọng thân mật.",peer_x:"Với người ngang hàng đang giận, buồn hay lo: nói giọng ôn hòa.",down:"Với kẻ dưới: nói giọng ôn hòa, không quát."};
const TD_SC=[
 {who:"Thái hậu",c:"up",m:"vui",q:"Hôm nay trời đẹp, ai gia muốn nghe con nói vài lời.",p:"Thái hậu vui, muốn nghe ngươi trò chuyện.",r:{kinh:"Bẩm Thái hậu, được hầu chuyện người là phúc của thần thiếp.",hoa:"Dạ, thần thiếp xin nói chuyện nhẹ nhàng cho người nghe.",than:"Thái hậu ơi, hôm nay con kể người nghe chuyện vui nhé!",thang:"Con chẳng có gì hay để nói đâu."}},
 {who:"Hoàng thượng",c:"up",m:"giận",q:"Trẫm nghe trong cung có người to tiếng. Ngươi có biết chuyện gì không?",p:"Hoàng thượng đang giận, hỏi ngươi có biết ai gây ồn không.",r:{kinh:"Muôn tâu Hoàng thượng, thần thiếp không dám giấu, xin bẩm rõ đầu đuôi.",hoa:"Thần thiếp nghĩ chuyện nhỏ, xin Hoàng thượng đừng quá bận lòng.",than:"Ôi, chuyện vặt thôi mà, Hoàng thượng đừng nhăn mặt nữa.",thang:"Thần thiếp không biết, đừng hỏi thần thiếp."}},
 {who:"Hoàng hậu",c:"up",m:"lo",q:"Mấy hôm nay bổn cung mất ngủ, trong lòng không yên.",p:"Hoàng hậu lo âu, kể mình mất ngủ.",r:{kinh:"Thần thiếp xin Hoàng hậu bảo trọng, có việc gì cứ sai bảo thần thiếp.",hoa:"Nương nương nghỉ ngơi cho khỏe, mọi chuyện rồi sẽ yên.",than:"Chị ơi, đừng nghĩ nhiều, đi dạo với em cho vui!",thang:"Ngủ không được thì tại người nghĩ nhiều thôi."}},
 {who:"Thái hậu",c:"up",m:"buồn",q:"Ngày xưa ai gia cũng từng ở tuổi con, giờ nhìn lại thấy vắng vẻ quá.",p:"Thái hậu buồn vì thấy vắng vẻ, nhớ chuyện cũ.",r:{kinh:"Thần thiếp xin được ở bên Thái hậu, hầu người những ngày này.",hoa:"Người đừng buồn, để con pha trà ngồi cùng người.",than:"Ôi người cứ nhớ chuyện cũ hoài, kể nghe con đi!",thang:"Người nhớ làm gì, chuyện xưa qua lâu rồi."}},
 {who:"Lệ phi",c:"peer",m:"vui",q:"Muội muội xem, hôm nay ta được ban đóa hoa này, đẹp chưa?",p:"Lệ phi vui khoe hoa được ban, hỏi có đẹp không.",r:{kinh:"Bẩm nương nương, hoa này thật xứng với người.",hoa:"Hoa đẹp, tỷ giữ cẩn thận nhé.",than:"Đẹp quá tỷ ơi, đeo lên là sáng cả phòng luôn!",thang:"Ta thấy cũng thường, hoa nào mà chẳng thế."}},
 {who:"Hòa tần",c:"peer",m:"giận",q:"Có kẻ nói sau lưng ta! Muội có nghe thấy gì không?",p:"Hòa tần giận vì có người nói xấu, hỏi ngươi có nghe không.",r:{kinh:"Bẩm nương nương, thần thiếp xin dốc lòng điều tra giúp người.",hoa:"Tỷ bình tĩnh, ngồi xuống uống chén trà rồi chúng ta nói.",than:"Hì, tỷ giận trông cũng xinh, đừng chấp mấy lời đó!",thang:"Ai bảo tỷ làm chuyện để người ta nói."}},
 {who:"Cẩn quý nhân",c:"peer",m:"buồn",q:"Hôm qua quê nhà gửi thư, phụ thân ốm nặng mà ta không về được.",p:"Cẩn quý nhân buồn vì cha ốm mà không về thăm được.",r:{kinh:"Bẩm quý nhân, xin người nén đau thương giữ gìn thân thể.",hoa:"Tỷ đừng quá lo, ta sẽ cùng tỷ gửi thuốc về nhà.",than:"Tỷ ơi cười lên nào, thế nào phụ thân cũng khỏe!",thang:"Không về được thì đành chịu thôi."}},
 {who:"Dung thường tại",c:"peer",m:"lo",q:"Sáng mai ta phải ra mắt trước Hoàng thượng, sợ mình nói sai quá.",p:"Dung thường tại lo vì mai ra mắt Hoàng thượng.",r:{kinh:"Xin thường tại yên tâm, Hoàng thượng nhân từ sẽ không trách.",hoa:"Tỷ cứ hít thở sâu, nói chậm một chút là ổn.",than:"Có gì đâu mà sợ, em kèm tỷ luyện nè!",thang:"Nói sai thì chịu thôi, ai cũng sai."}},
 {who:"Tiểu cung nữ",c:"down",m:"lo",q:"Bẩm nương nương, nô tỳ lỡ làm vỡ chén, sợ bị phạt.",p:"Cung nữ lo sợ vì làm vỡ chén.",r:{kinh:"Xin ngươi đừng quỳ, chuyện này ta cũng có phần.",hoa:"Chén vỡ không sao, ngươi dọn đi, ta không trách.",than:"Ôi chén thôi mà, đừng sợ, kể ta nghe sao vỡ nào!",thang:"Làm vỡ thì phải chịu phạt, ai bảo vụng."}},
 {who:"Ma ma",c:"down",m:"vui",q:"Bẩm, hôm nay bếp làm món bánh mới, nô tỳ mang tới cho nương nương nếm thử.",p:"Ma ma vui, mang bánh mới đến cho ngươi nếm.",r:{kinh:"Tạ ơn ma ma đã dốc lòng, ta xin nhận trong niềm biết ơn.",hoa:"Ma ma có lòng, để đó ta nếm thử nhé.",than:"Ôi thơm quá, ma ma chu đáo y như mọi khi!",thang:"Ta ăn bánh nhiều rồi, bánh này chưa chắc ngon."}},
 {who:"Cung nhân",c:"down",m:"buồn",q:"Nô tỳ nhớ nhà, đã ba năm chưa gặp mẹ.",p:"Cung nhân buồn vì nhớ mẹ đã ba năm.",r:{kinh:"Ta xin ghi nhận nỗi nhớ nhà của ngươi, lòng ta cũng cảm động.",hoa:"Ta hiểu, rồi sẽ có dịp, ngươi cố giữ sức khỏe nhé.",than:"Ta cũng nhớ nhà lắm, hai ta cùng nhớ nhé!",thang:"Vào cung rồi thì phải quên nhà đi."}},
 {who:"Tiểu thái giám",c:"down",m:"giận",q:"Nô tài bị người trong bếp mắng oan, nô tài tức lắm.",p:"Tiểu thái giám giận vì bị mắng oan.",r:{kinh:"Ta xin ghi lòng điều ngươi nói và sẽ xét cho công bằng.",hoa:"Ngươi bình tĩnh, kể ta nghe, ta xem xử thế nào.",than:"Ừ, ta cũng ghét kiểu mắng oan lắm, tức thật!",thang:"Ngươi chắc cũng có lỗi, ta chưa tin đâu."}}];
function tdBest(s){return s.c==="up"?"kinh":s.c==="peer"?(s.m==="vui"?"than":"hoa"):"hoa"}
function tdFit(s,tone){const b=tdBest(s);if(tone===b)return 2;if(tone==="thang")return 0;if(b==="kinh")return tone==="hoa"?1:0;if(b==="than")return tone==="hoa"?1:0;return s.c==="down"&&s.m==="vui"&&tone==="than"?1:(s.c==="peer"&&tone==="kinh")?1:0}
function tdRuleOf(s){return s.c==="up"?TD_RULE.up:s.c==="peer"?(s.m==="vui"?TD_RULE.peer_vui:TD_RULE.peer_x):TD_RULE.down}
function kgTdTalk(box,env){const lv=tdEase(env.lv),NOPT=lv>=3?2:3,LIM=(12+lv)*1000;
 const pool=kg82Shuf(TD_SC),Qs=[];["up","peer","down","up","peer"].forEach(c=>{const k=pool.findIndex(s=>s.c===c);Qs.push(pool.splice(k,1)[0])});
 const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);let r=0,pts=0,stop=false,tm=0,t0=0,lock=false,cur=[];
 function show(){if(stop)return;if(r>=Qs.length){stop=true;return env.end(pts)}const s=Qs[r],b=tdBest(s);
  const wrong=kg82Shuf(Object.keys(TD_TONE).filter(t=>t!==b)).sort((a,c)=>(a==="thang")-(c==="thang"));cur=kg82Shuf([b].concat(wrong.slice(0,NOPT-1)));lock=false;t0=performance.now();
  wrap.innerHTML=kg82Rows([["Người nói",`<span class="ef t"><b>${s.who}</b> (${TD_CLS[s.c]})</span> · sắc mặt <span class="ef ${s.m==="vui"?"g":s.m==="giận"?"r":"n"}"><b>${s.m}</b></span>`],["Lời người ấy",`<span class="ef t"><b>“${s.q}”</b></span>`],["Hiểu là",s.p,"n"],["Phép ứng đối",`<b>${tdRuleOf(s)}</b>`,"t"]])+
   `<div class="kg82opts">${cur.map((t,i)=>`<button class="kgbtn" data-i="${i}"><b>giọng ${TD_TONE[t]}</b><br>${s.r[t]}</button>`).join("")}</div>`;
  wrap.querySelectorAll("button[data-i]").forEach(bt=>bt.onclick=()=>pickA(+bt.dataset.i))}
 function pickA(i){if(lock||stop)return;lock=true;const s=Qs[r],b=tdBest(s),got=i>=0?tdFit(s,cur[i]):0;pts+=got;kg82Pluck(got?3:0,!!got);
  wrap.querySelectorAll("button[data-i]").forEach(bt=>{const k=+bt.dataset.i;bt.disabled=true;if(cur[k]===b)bt.insertAdjacentHTML("afterbegin",kg82Chip("✓ hợp nhất","ok")+" ");else if(k===i)bt.insertAdjacentHTML("afterbegin",kg82Chip(got?"tạm được":"lỡ lời","no")+" ")});
  wrap.insertAdjacentHTML("beforeend",kg82Rows([[i<0?"Hết giờ":got===2?"Hợp ý":got?"Tạm được":"Lỡ lời",`Nên nói giọng ${TD_TONE[b]}: ${tdRuleOf(s).replace(/^Với /,"với ").replace(/:.*$/,"")}.`,got===2?"g":got?"n":"r"]]));r++;setTimeout(show,1500)}
 tm=setInterval(()=>{if(stop)return;const left=LIM-(performance.now()-t0);env.hud({score:`${pts}/10`,round:`Câu ${Math.min(r+1,5)}/5`,time:`${Math.max(0,Math.ceil(left/1000))} giây`});if(left<=0&&!lock)pickA(-1)},150);
 KG82.peek=()=>{if(lock||stop||!cur.length)return null;const i=cur.indexOf(tdBest(Qs[r]));return{sel:`#${box.id||"kg82box"} button[data-i="${i}"]`}};
 show();return()=>{stop=true;clearInterval(tm)}}

/* ---------- 4. Hạnh: Làm phúc ---------- */
const TD_ALMS=[
 {pool:5,list:[["Lão cung nhân","già yếu, lưng còng",2],["Tiểu cung nữ","mới vào cung",1],["Cung nhân ốm","vừa khỏi bệnh",2]]},
 {pool:8,list:[["Lão ma ma","đói lả",3],["Hai mẹ con nghèo","xin ăn ở cổng",2],["Tiểu thái giám","làm việc nặng",1],["Cung nhân góa","tuổi cao",2]]},
 {pool:7,list:[["Cung nữ giặt áo","tay nứt nẻ",2],["Lão thái giám","ốm yếu",3],["Tiểu cung nhân","còn nhỏ",2]]}];
function tdAlmsScore(need,give,pool){const n=need.length,r=need.map((d,i)=>Math.min(1,give[i]/d)),over=need.reduce((a,d,i)=>a+Math.max(0,give[i]-d),0),left=pool-give.reduce((a,b)=>a+b,0);
 return Math.max(0,.5*Math.min(...r)+.5*r.reduce((a,b)=>a+b,0)/n-.12*over-.1*Math.max(0,left))}
function tdAlmsBest(need,pool){let best=0;const give=need.map(()=>0);(function rec(i,left){if(i===need.length){best=Math.max(best,tdAlmsScore(need,give,pool));return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,pool);return best||1}
function kgTdAlms(box,env){const lv=tdEase(env.lv);const wrap=document.createElement("div");wrap.className="kg82quiz";box.appendChild(wrap);
 const rounds=TD_ALMS.map((q,k)=>({list:q.list,need:q.list.map(x=>x[2]),pool:k===2&&lv<3?q.pool-1:q.pool}));let r=0,pts=0,stop=false,give=[],lock=false;
 function left(){return rounds[r].pool-give.reduce((a,b)=>a+b,0)}
 function render(){if(stop)return;const R=rounds[r];
  wrap.innerHTML=kg82Rows([["Còn lại",`<span class="ef t"><b>${left()}</b> phần để chia</span>`],["Việc cần",R.pool<R.need.reduce((a,b)=>a+b,0)?`Phần không đủ cho mọi người. Chia sao cho ai cũng có ít nhất một ít, người cần nhiều được nhiều hơn.`:`Phần vừa đủ. Cho mỗi người đúng số họ cần.`,"n"]])+
   R.list.map((x,i)=>`<div class="kg82ar"><button class="kgbtn" data-p="${i}" data-d="-1" aria-label="Bớt một phần cho ${x[0]}">−</button><span><b>${x[0]}</b> · ${x[1]}<br>cần ${x[2]} phần · nhận <b>${give[i]}</b></span><button class="kgbtn" data-p="${i}" data-d="1" aria-label="Thêm một phần cho ${x[0]}">+</button></div>`).join("")+
   `<div class="kg82act"><button class="${kg82Btn()}" id="tdadone">Phát xong</button></div>`;
  wrap.querySelectorAll("button[data-p]").forEach(b=>b.onclick=()=>{if(lock)return;const i=+b.dataset.p,d=+b.dataset.d;if(d>0&&left()<=0)return;if(d<0&&give[i]<=0)return;give[i]+=d;kg82Pluck(1,true);render()});
  wrap.querySelector("#tdadone").onclick=done;env.hud({score:`${Math.round(pts)}/10`,round:`Lượt ${r+1}/3`,time:"không hạn giờ"})}
 function done(){if(lock||stop)return;lock=true;const R=rounds[r],s=tdAlmsScore(R.need,give,R.pool)/tdAlmsBest(R.need,R.pool),got=Math.min(1,s)*10/3;pts+=got;
  const ok=s>=.95;kg82Pluck(ok?3:0,ok);wrap.insertAdjacentHTML("beforeend",kg82Rows([[ok?"Chia khéo":s>=.6?"Khá ổn":"Còn lệch",ok?"Ai cũng được đủ phần cần.":"Có người thiếu hoặc có người thừa phần.",ok?"g":s>=.6?"n":"r"]]));
  r++;setTimeout(()=>{if(r>=3){stop=true;env.end(Math.round(pts))}else{give=rounds[r].need.map(()=>0);lock=false;render()}},1400)}
 give=rounds[0].need.map(()=>0);
 KG82.peek=()=>{if(lock||stop)return null;const R=rounds[r];let i=R.need.findIndex((d,k)=>give[k]<tdAlmsBestGive(R)[k]);if(i<0||left()<=0)return{sel:"#tdadone"};return{sel:`#${box.id||"kg82box"} button[data-p="${i}"][data-d="1"]`}};
 render();return()=>{stop=true}}
function tdAlmsBestGive(R){let best=-1,bg=null;const give=R.need.map(()=>0);(function rec(i,left){if(i===R.need.length){const s=tdAlmsScore(R.need,give,R.pool);if(s>best){best=s;bg=give.slice()}return}for(let a=0;a<=left;a++){give[i]=a;rec(i+1,left-a)}give[i]=0})(0,R.pool);return bg}
/* ---------- easy-rules layer (same pattern as review/mg-easy): Gợi ý button, quiet idle hint, first-time example card ---------- */
const TD_HINT={tdthread:"Viền vàng chỉ sợi chỉ đúng màu, hoặc chấm kế tiếp để kéo kim tới.",tdwalk:"Viền vàng ở nửa khung nên giữ lúc này.",tdtalk:"Viền vàng ở lời có giọng hợp với phép ứng đối.",tdalms:"Viền vàng ở nút cần chạm tiếp (hoặc nút Phát xong)."};
const TD_EX={cong:"Chỉ mẫu màu lục thì chạm sợi chỉ lục, rồi kéo kim từ chấm xanh men theo nét chấm.",dung:"Dấu sàn ghi “◀ trái” thì bát sắp nghiêng trái: giữ nửa phải để đỡ lại.",ngon:"Thái hậu vui, phép ghi “bề trên: cung kính” thì chọn lời mang nhãn cung kính.",hanh:"Người ghi cần 2 phần: chạm + hai lần cho người ấy, rồi làm vậy với mọi người, chạm Phát xong."};
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
 TDS.busy=true;KG82.ctx="hoc";kg82Preload(kind);KG82.lv=l;
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
