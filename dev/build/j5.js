
/* mini-games for art lessons */
const DOI=[["Hoa nở đầu xuân, hương ngập viện","Trăng soi cuối hạ, bóng tràn sân"],["Núi cao mây phủ","Sông rộng sóng xô"],["Gió đưa cành trúc la đà","Mưa rắc nhành mai lác đác"],
 ["Một nét bút son, lòng tựa ngọc","Ba chung rượu cúc, dạ như vàng"],["Đèn khuya soi án sách","Trống sớm giục lều binh"],["Chim kêu bến cũ","Cá lội dòng xưa"],
 ["Lá thu rơi rụng đầy thềm ngọc","Tuyết đông phủ kín khắp lầu son"],["Ngựa hí ngoài thành, cờ phấp phới","Quân reo trên ải, trống dồn dồn"],["Trà thơm mời khách quý","Rượu nhạt tiễn người xa"],
 ["Phượng múa sân rồng","Hạc bay cửa Phật"],["Lòng son chẳng đổi theo năm tháng","Dạ sắt không mòn với nắng mưa"],["Đàn gảy khúc nam phong","Thơ ngâm bài bắc nhạn"],
 ["Sen hồ tây ngát","Cúc giậu đông vàng"],["Cung sâu khóa kín xuân xanh","Lầu vắng giam chìm tuổi ngọc"],["Giọt mưa đêm gõ ngói","Tiếng nhạn sớm qua trời"]];
const YQ=[{q:"Cảm phong hàn, sợ lạnh, không ra mồ hôi. Dùng vị nào?",a:"Ma hoàng",w:["Thạch cao","Hoàng liên","Toan táo nhân"]},
 {q:"Mất ngủ, hồi hộp, tâm thần bất an. Dùng vị nào?",a:"Toan táo nhân",w:["Ma hoàng","Đại hoàng","Bán hạ"]},
 {q:"Thai động không yên, bụng đau âm ỉ. Vị nào an thai?",a:"Ngải cứu",w:["Xạ hương","Hồng hoa","Đào nhân"]},
 {q:"Sốt cao, khát nước, mồ hôi nhiều. Dùng vị nào?",a:"Thạch cao",w:["Nhân sâm","Ma hoàng","Quế chi"]},
 {q:"Khí hư, mệt mỏi, ăn ít. Dùng vị nào?",a:"Nhân sâm",w:["Đại hoàng","Thạch cao","Hoàng liên"]},
 {q:"Ho nhiều đờm, ngực đầy tức. Dùng vị nào?",a:"Bán hạ",w:["Toan táo nhân","Nhân sâm","Ngải cứu"]},
 {q:"Pha hương xông cho người có thai: an thần mà vô hại?",a:"Trầm hương",w:["Xạ hương","Long não","Hồng hoa"]},
 {q:"Ba bát canh dâng lên. Bát nào có độc?",a:"Canh gà: thìa bạc nhúng vào ngả đen",w:["Cháo yến: thìa bạc vẫn sáng","Chè sen: thơm mát, trong veo","Canh cá: mèo ăn ngon lành"]},
 {q:"Ba chén trà. Chén nào có độc?",a:"Chén có mùi hạnh nhân đắng",w:["Chén thơm mùi hoa nhài","Chén chát nhẹ vị trà mạn","Chén ngọt hậu vị cam thảo"]},
 {q:"Ba thang thuốc an thai. Thang nào bị bỏ xạ hương?",a:"Thang hắc nồng, mùi hương ngai ngái",w:["Thang đắng nhẹ mùi ngải cứu","Thang ngọt vị táo đỏ","Thang thơm mùi trần bì"]},
 {q:"Ba đĩa bánh. Đĩa nào bị hạ độc?",a:"Bánh hoa quế: mèo ngửi rồi bỏ đi",w:["Bánh đậu xanh: mèo ăn sạch","Bánh hạt sen: nếm thử không sao","Bánh táo: thái giám nếm vẫn khỏe"]},
 {q:"Hoàng tử lên đậu, sốt cao, nổi mụn khắp người. Phải làm gì?",a:"Kiêng gió, giữ ấm, cách ly",w:["Tắm nước lạnh cho hạ sốt","Cho ra vườn hóng gió","Cho chơi cùng các hoàng tử khác"]}];
const HOA=[["Mai",""],["Lan",""],["Cúc",""],["Trúc",""],["Núi",""],["Sông",""],["Hạc",""],["Thuyền",""]];
const VU=[["↑","Giơ tay áo"],["←","Xoay trái"],["→","Xoay phải"],["↓","Cúi mình"]];
const shuf=a=>a.slice().sort(()=>Math.random()-.5);
let mgStop=null,mgDone=true;
const MG={
 cam:["Cầm: tấu khúc",`Nốt rơi xuống bốn dây Cung, Thương, Giốc, Chủy. Chạm đúng dây khi nốt chạm vạch đỏ${typeof matchMedia==="function"&&matchMedia("(pointer:coarse)").matches?"":" (phím D F J K)"}.`,gCam],
 ky:["Kỳ: đấu cờ","Bàn 7×7. Ngươi cầm quân đen đi trước; năm quân liền một hàng là thắng.",gKy],
 thi:["Thi: đối câu","Chọn vế đối chỉnh nhất cho vế ra. 5 câu.",(b,l,e)=>quiz(b,shuf(DOI).slice(0,5).map(([x,y])=>{const wc=s=>s.replace(/,/g,"").split(" ").length;let w=DOI.filter(p=>p[1]!==y&&wc(p[1])===wc(y)).map(p=>p[1]);if(w.length<3)w=w.concat(DOI.filter(p=>p[1]!==y&&!w.includes(p[1])).map(p=>p[1]));return{q:`Vế ra: <b>${x}</b>`,a:y,w:shuf(w)}}),l,e)],
 hoa:["Họa: nhớ nét bút","Lật hai ô một lượt, tìm đủ các cặp giống nhau trong số lượt cho phép.",gHoa],
 vu:["Vũ: theo bước múa","Xem các bước sáng lên rồi múa lại đúng thứ tự. 5 lượt, mỗi lượt dài thêm một bước.",gVu],
 y:["Y thuật & điều hương","Chọn vị thuốc đúng, hoặc tìm thứ có độc. 5 câu.",(b,l,e)=>quiz(b,shuf(YQ).slice(0,5).map(x=>({q:x.q,a:x.a,w:shuf(x.w)})),l,e)]};
function openMG(k,lv,cb){const [t,h,fn]=MG[k];$("mgt").textContent=t;$("mgh").textContent=h;$("ov").hidden=false;mgDone=false;
 const sk=$("mgskip");sk.hidden=false;sk.innerHTML=`Để trời định<small>${word(od(35))} · thành: tiến bộ một phần</small>`;
 const fin=(pts,skip)=>{if(mgDone)return;mgDone=true;if(mgStop)mgStop();mgStop=null;sk.hidden=true;const g=pts*(S.master?2:1);
  $("mgb").innerHTML=`<p class="mgres">${skip?(pts?"May mắn":"Không vào"):["","Tạm được","Khá","Xuất sắc"][pts]}</p><p style="text-align:center">Tiến bộ +${g}${S.master&&pts?" (danh sư dạy, gấp đôi)":""}</p><div style="display:flex;justify-content:center"><button class="main" id="mgok">Xong</button></div>`;
  $("mgok").onclick=()=>{$("ov").hidden=true;$("mgb").innerHTML="";cb(g)};/* the used result button is removed: no stale "Xong" with an old callback stays in #ov */$("mgok").focus()};
 sk.onclick=()=>fin(roll(od(35))?1:0,true);
 mgStop=fn($("mgb"),lv,p=>fin(p,false))}
function quiz(b,Qs,lv,end){let r=0,sc=0,stop=false;const nO=lv>=3?4:3;
 function show(){if(stop)return;if(r>=Qs.length)return end(sc>=5?3:sc>=3?2:1);const q=Qs[r];const opts=shuf(q.w.slice(0,nO-1).concat([q.a]));
  b.innerHTML=`<p class="mgsc">Câu ${r+1}/${Qs.length} · đúng ${sc}</p><p class="mgq">${q.q}</p><div class="mgopts">${opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join("")}</div>`;
  const bs=[...b.querySelectorAll(".mgopts button")];
  bs.forEach(btn=>btn.onclick=()=>{const ok=opts[+btn.dataset.i]===q.a;if(ok)sc++;btn.classList.add(ok?"ok":"miss");bs.find(e=>opts[+e.dataset.i]===q.a).classList.add("ok");bs.forEach(e=>e.disabled=true);r++;setTimeout(show,900)});
  bs[0].focus()}
 show();return()=>{stop=true}}
function gCam(b,lv,end){const L=["Cung","Thương","Giốc","Chủy"],N=16,fall=Math.max(1100,2200-lv*220),gap=Math.max(450,800-lv*60);
 b.innerHTML=`<div class="lanes" id="lanes">${L.map((n,i)=>`<div class="lane" data-l="${i}"></div>`).join("")}<div class="hitline" id="hitl"></div></div><div class="lbtns">${L.map((n,i)=>`<button data-l="${i}">${n}</button>`).join("")}</div><p class="mgsc" id="mgsc">Trúng 0/${N}</p>`;
 const H=$("lanes").clientHeight,HIT=Math.round(H*.83);$("hitl").style.top=HIT+"px";
 const notes=[];for(let i=0;i<N;i++)notes.push({l:R(4),t:1200+i*gap,el:null,gone:false});
 const lanes=b.querySelectorAll(".lane");const t0=performance.now();let hits=0,raf=0,done=false;
 function frame(now){if(done)return;const t=now-t0;
  for(const n of notes){if(n.gone)continue;const y=(t-(n.t-fall))/fall*HIT;
   if(!n.el&&y>-20){n.el=document.createElement("i");lanes[n.l].appendChild(n.el)}
   if(n.el){n.el.style.transform=`translateY(${y}px)`;if(y>H+10){n.el.remove();n.el=null;n.gone=true}}}
  if(t>notes[N-1].t+fall*0.3+500){done=true;return end(hits>=13?3:hits>=8?2:1)}
  raf=requestAnimationFrame(frame)}
 raf=requestAnimationFrame(frame);
 function tap(l){if(done)return;const t=performance.now()-t0;const n=notes.find(x=>!x.gone&&x.l===l&&Math.abs(x.t-t)<180);
  const btn=b.querySelector(`.lbtns button[data-l="${l}"]`);
  if(n){n.gone=true;hits++;if(n.el){n.el.remove();n.el=null}btn.classList.add("ok")}else btn.classList.add("miss");
  setTimeout(()=>btn.classList.remove("ok","miss"),150);$("mgsc").textContent=`Trúng ${hits}/${N}`}
 b.querySelectorAll("[data-l]").forEach(e=>{e.onpointerdown=ev=>{ev.preventDefault();tap(+e.dataset.l)};e.onclick=ev=>{if(ev.detail===0)tap(+e.dataset.l)}});
 const keys={d:0,f:1,j:2,k:3,"1":0,"2":1,"3":2,"4":3};const kd=e=>{if(e.key in keys){e.preventDefault();tap(keys[e.key])}};document.addEventListener("keydown",kd);
 return()=>{done=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
function gKy(b,lv,end){const n=7,B=Array(n*n).fill(0);let over=false,maxRun=0;
 b.innerHTML=`<div class="goban">${B.map((_,i)=>`<button data-i="${i}" aria-label="Hàng ${Math.floor(i/n)+1}, cột ${i%n+1}"></button>`).join("")}</div><p class="mgsc" id="mgsc">Đến lượt ngươi.</p>`;
 const cells=b.querySelectorAll(".goban button"),D=[[0,1],[1,0],[1,1],[1,-1]],W=[0,1,8,60,600,9000];
 const run=(i,p)=>{const r=Math.floor(i/n),c=i%n;let best=0;for(const[dr,dc]of D){let k=1;for(const s of[1,-1]){let rr=r+dr*s,cc=c+dc*s;while(rr>=0&&rr<n&&cc>=0&&cc<n&&B[rr*n+cc]===p){k++;rr+=dr*s;cc+=dc*s}}best=Math.max(best,k)}return best};
 const val=i=>{B[i]=2;const a=run(i,2);B[i]=1;const d=run(i,1);B[i]=0;const r=Math.floor(i/n),c=i%n;return W[Math.min(a,5)]*1.1+W[Math.min(d,5)]+(6-Math.abs(r-3)-Math.abs(c-3))};
 const ai=()=>{let best=-1,bi=-1;const noise=(5-lv)*35+10;for(let i=0;i<B.length;i++)if(!B[i]){const s=val(i)+Math.random()*noise;if(s>best){best=s;bi=i}}return bi};
 const put=(i,p)=>{B[i]=p;cells[i].textContent=p===1?"●":"○";cells[i].classList.add(p===1?"bk":"wh");cells[i].disabled=true;return run(i,p)};
 cells.forEach(c=>c.onclick=()=>{if(over)return;const i=+c.dataset.i;if(B[i])return;const r=put(i,1);maxRun=Math.max(maxRun,r);
  if(r>=5){over=true;$("mgsc").textContent="Ngươi thắng!";return setTimeout(()=>end(3),600)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";return setTimeout(()=>end(2),600)}
  if(put(ai(),2)>=5){over=true;$("mgsc").textContent="Quân trắng thắng.";return setTimeout(()=>end(maxRun>=4?2:1),800)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";setTimeout(()=>end(2),600)}});
 cells[24].focus();return()=>{over=true}}
function gHoa(b,lv,end){const P=lv>=3?8:6,limit=P+5+(lv>=3?2:0);const tiles=shuf(HOA.slice(0,P).flatMap(x=>[x,x]));let open=[],found=0,moves=0,lock=false,stop=false;
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="memo">${tiles.map((t,i)=>`<button data-i="${i}" aria-label="Ô ${i+1}">❖</button>`).join("")}</div>`;
 const bs=[...b.querySelectorAll(".memo button")];const upd=()=>$("mgsc").textContent=`Cặp ${found}/${P} · lượt ${moves}/${limit}`;upd();
 bs.forEach(btn=>btn.onclick=()=>{if(lock||stop)return;const i=+btn.dataset.i;if(open.includes(i)||btn.classList.contains("ok"))return;
  btn.innerHTML=`${tiles[i][0]}<small>${tiles[i][1]}</small>`;open.push(i);
  if(open.length===2){moves++;const [a,c]=open;open=[];
   if(tiles[a][1]===tiles[c][1]){bs[a].classList.add("ok");bs[c].classList.add("ok");bs[a].disabled=bs[c].disabled=true;found++;upd();if(found===P){stop=true;return setTimeout(()=>end(moves<=P+3?3:2),600)}}
   else{lock=true;setTimeout(()=>{bs[a].textContent="❖";bs[c].textContent="❖";lock=false},700)}
   upd();if(moves>=limit&&found<P){stop=true;setTimeout(()=>end(1),800)}}});
 bs[0].focus();return()=>{stop=true}}
function gVu(b,lv,end){let len=3,round=0,seq=[],inp=0,showing=true,stop=false;const sp=Math.max(320,650-lv*60);
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="simon">${VU.map((v,i)=>`<button data-i="${i}">${v[0]}<small>${v[1]}</small></button>`).join("")}</div>`;
 const bs=b.querySelectorAll(".simon button");
 function next(){if(stop)return;if(round>=5){stop=true;return end(3)}seq=Array.from({length:len},()=>R(4));inp=0;showing=true;$("mgsc").textContent=`Lượt ${round+1}/5: xem kỹ ${len} bước`;
  seq.forEach((s,k)=>setTimeout(()=>{if(stop)return;bs[s].classList.add("lit");setTimeout(()=>bs[s].classList.remove("lit"),sp*.6)},500+k*sp));
  setTimeout(()=>{if(stop)return;showing=false;$("mgsc").textContent=`Lượt ${round+1}/5: múa lại ${len} bước`},500+len*sp)}
 bs.forEach(bt=>bt.onclick=()=>{if(showing||stop)return;const i=+bt.dataset.i;bt.classList.add("lit");setTimeout(()=>bt.classList.remove("lit"),150);
  if(i!==seq[inp]){stop=true;$("mgsc").textContent="Sai bước.";return setTimeout(()=>end(round>=3?2:1),700)}
  inp++;if(inp===seq.length){round++;len++;setTimeout(next,600)}});
 next();return()=>{stop=true}}
