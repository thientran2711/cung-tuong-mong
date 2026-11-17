/* ================= RELATION WEB, PALACE MAP, PRESENCE, TALK ================= */
/* two bars between every pair: Thiện cảm (aff, -100..100, directional) and Oán (0..100, directional) */
function aff(x,y){if(x===y)return 0;if(x===S)return S.rl[y.id]||0;if(y===S)return x.rel;return x.rl[y.id]||0}
function affAdd(x,y,n){if(x===S){S.rl[y.id]=cl((S.rl[y.id]||0)+n,-100,100);return}if(y===S){x.rel=cl(x.rel+n,-100,100);return}x.rl[y.id]=cl((x.rl[y.id]||0)+n,-100,100)}
function oan(x,y){if(!x||!y||x===y)return 0;if(x===S)return S.ro[y.id]||0;if(y===S)return x.oan||0;return x.ro[y.id]||0}
function oanAdd(x,y,n){if(!x||!y||x===y)return;const c=v=>cl(Math.round(v),0,100);if(x===S){S.ro[y.id]=c((S.ro[y.id]||0)+n);return}if(y===S){x.oan=c((x.oan||0)+n);return}x.ro[y.id]=c((x.ro[y.id]||0)+n)}
function rel(x,y){return aff(x,y)}
/* a deed between a and t: both affections move; a harm leaves the victim with Oán (and a little on the doer) */
function relAdd(x,y,n){if(!x||!y||x===y)return;affAdd(x,y,n);affAdd(y,x,n);const k=BAL.relOan;if(n<0){oanAdd(y,x,-n*k.hurt);oanAdd(x,y,-n*k.doer)}else{oanAdd(y,x,-n*k.mend)}}
function hostility(v,t){return oan(v,t)+Math.max(0,-aff(v,t))/2+(t===S?v.ghen/2:Math.max(0,(t.sung-v.sung)/3))+(rkOf(t)>=rkOf(v)?8:0)}

/* houses: Phi and above head a palace; lower consorts live under a head. Same house: cannot harm or win over each other */
function houseOf(p){return rkOf(p)>=PAL_HEAD?key(p):(p.resHead!=null&&byKey(p.resHead)&&(byKey(p.resHead)===S?S.rank>=PAL_HEAD:byKey(p.resHead).alive&&!byKey(p.resHead).out&&rkOf(byKey(p.resHead))>=PAL_HEAD)?p.resHead:key(p))}
function sameHouse(a,b){return a!==b&&houseOf(a)===houseOf(b)}
function assignHouses(){const heads=consorts().filter(p=>rkOf(p)>=PAL_HEAD);for(const p of consorts()){if(rkOf(p)>=PAL_HEAD){p.resHead=null;continue}if(houseOf(p)!==key(p))continue;p.resHead=heads.length&&roll(70)?key(pick(heads.filter(h=>h!==p))||p):null}}

/* where everyone is this tuần: by role, trait, season and time of month */
function palaceOf(p){if(p===S)return"home";if(p.queen)return"kn";const h=byKey(houseOf(p));return h===S?"home":"r"+h.id}
function placeWhere(){const W={},sea=SEASON[S.month-1],spring=sea==="Xuân"||sea==="Thu";
 const b=S.buoi||0;const e=b===1?b4EmpNoon():b===B4L?pick(["dtd","dtd","dtd",has("datinh")?"vuon":"dtd"]):has("chamchinh")?pick(["thu","thu","thu",spring?"vuon":"thu"]):b===0?pick(["thu","thu","dtd"]):pick([spring?"vuon":"dtd","thu","vuon"]);W.emp=wet()&&e==="vuon"?"thu":e;W.th=S.thDead?null:"tn";
 for(const v of rivals){if(!v.alive){continue}if(v.out){W[v.id]="lc";continue}if(v.confined){W[v.id]=palaceOf(v);continue}
  const L=[[palaceOf(v),b===B4L?80:b===1?60:35],["vuon",(b===2?(spring?40:20):b===1?b4NoonGarden():b===0?8:3)*(wet()?.25:1)],["tn",S.thDead?0:10],["tyv",v.preg||v.suc<50?15:3]];
  if(qOn()&&!v.queen)L.push(["kn",b===0?55:5]);if(v.queen)L[0][1]+=30;
  const w=L.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}W[v.id]=L[i][0]}
 S.where=W;npcEncounters()}
function whereOf(p){if(p===S)return S.place||"home";return (S.where||{})[p.id]||palaceOf(p)}
function together(a,b){return whereOf(a)===whereOf(b)}
function placeName(k){return placeOf(k).n}
function countAt(k){const W=S.where||{};let n=0;for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k)n++;if(W.emp===k&&["vuon","thu","dtd"].includes(k))n++;if(k==="tn"&&!S.thDead)n++;if(k==="home")n+=1+S.kids.filter(x=>x.alive).length;if(k==="tyv"||k==="ksp")n++;if(k==="lc")n+=Math.max(1,Math.min(3,rivals.filter(v=>v.alive&&v.out).length));return n}
/* NPCs who share a place meet: small talk or friction, by the same bars */
function npcEncounters(){const by={};for(const v of liveRivals(true)){const k=S.where[v.id];(by[k]=by[k]||[]).push(v)}
 for(const k in by){const L=by[k];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j];if(!roll(30))continue;
  if(oan(a,b)+oan(b,a)>40||a.ghen+b.ghen>110){oanAdd(a,b,BAL.eff.j9.npcEncounters);oanAdd(b,a,BAL.eff.j9.npcEncounters_2);affAdd(a,b,BAL.eff.j9.npcEncounters_3);affAdd(b,a,BAL.eff.j9.npcEncounters_4)}else{affAdd(a,b,BAL.eff.j9.npcEncounters_5);affAdd(b,a,BAL.eff.j9.npcEncounters_6)}}}}

/* sending someone instead of going: same act, lower odds, the servant may be caught and confess */
let ACTX={a:null,pen:0};
function runAct(a,t,k,extra){const A2=ACT[k];if(!A2)return"";const sent=!together(a,t)&&!["accuse","vp","xx","gift","steal","road","takeaway"].includes(k);const where=together(a,t)?placeName(whereOf(a)):"";
 if(sameHouse(a,t)&&k!=="accuse")return a===S?"Người cùng cung, ngươi không thể ra tay hay lấy lòng. ":"";
 const sv=sent?bestSent(a):null;ACTX={a,t,pen:sent?sentPen(sv)-(sv?srk(sv)*3:0):0,dom:ACTDOM[k]};let r="";try{r=A2.f(a,t,extra)}finally{ACTX={a:null,pen:0}}
 const harm=!["ally","gift","spy"].includes(k);
 if(sent&&sv&&!/bị lộ|bị bắt|phát giác|chặn kịp|từ chối/.test(r))servMerit(sv,2);if(sent&&harm&&roll(confessRisk(sv))){const n=evA(t,a,1);r+=`${sv?sv.name:"Kẻ"} được ${NM(a)} sai đi bị bắt, khai ra chủ${n?`: ${NM(t)} nắm thêm 1 chứng cứ`:""}. `+servCaught(a,sv)}
 if(sent&&sv)r=r.replace(/\(sai người đi\)/,"");
 return r?(r.trim()+(sent?` (sai ${sv?sv.name:"người"} đi)`:where?` (tại ${where})`:"")+" "):""}
function odA(a,b){return cl(Math.round(b+(a.suc<30?-15:0)-(ACTX.a===a?ACTX.pen:0)+(ACTX.a===a?lotB(a,ACTX.dom):0)+(ACTX.a===a&&ACTX.t&&typeof spyKnowB==="function"?spyKnowB(a,ACTX.t):0)),5,95)}

/* the talk system: topics, by traits and bars; the same chat repeated in a month gives less */
function chatF(v){S.chat=S.chat||{};const n=S.chat[v.id]||0;return 1/(1+n)}
function chatMark(v){S.chat[v.id]=(S.chat[v.id]||0)+1}
function topicOpts(v){const f=chatF(v),g=n=>Math.max(1,Math.round(n*f)),third=liveRivals(true).filter(x=>x!==v).sort((a,b)=>aff(v,a)-aff(v,b))[0];const A=[];
 const same=sameHouse(S,v);
 A.push({n:"Hỏi han sức khỏe",o:100,x:`nàng quý ngươi +${g(4)}`,run:()=>{affAdd(v,S,g(4));chatMark(v);return `${v.name} cảm động. Nàng quý ngươi +${g(4)}.`}});
 const praise=v.trait==="Kiêu ngạo"||v.trait==="Tham vọng"?8:4;A.push({n:"Khen tài nghệ nàng",o:od(60+S.tai/5),x:`nàng quý ngươi +${g(praise)}`,run:()=>{chatMark(v);if(roll(od(60+S.tai/5))){affAdd(v,S,g(praise));return `${v.name} tươi cười. Nàng quý ngươi +${g(praise)}.`}affAdd(v,S,BAL.eff.j9.run);return `${v.name} cho là ngươi giả lả. Nàng quý ngươi ${balSg(BAL.eff.j9.run)}.`}});
 if(third)A.push({n:`Bàn tán về ${third.name}`,o:100,x:aff(v,third)<0?`nàng ghét người này, hợp chuyện: nàng quý ngươi +${g(8)}`:`kèm: nàng quý ngươi ${balSg(BAL.eff.j9.run_3)} · nàng có thể mách lại`,run:()=>{chatMark(v);if(aff(v,third)<0){affAdd(v,S,g(8));oanAdd(v,third,BAL.eff.j9.run_2);return `Hai người to nhỏ chuyện ${third.name}. Nàng quý ngươi +${g(8)}.`}affAdd(v,S,BAL.eff.j9.run_3);if(roll(50)){oanAdd(third,S,BAL.eff.j9.run_4);return `${v.name} đem lời ngươi kể lại với ${third.name}. ${third.name} oán ngươi ${balSg(BAL.eff.j9.run_4)}.`}return `${v.name} lảng sang chuyện khác. Nàng quý ngươi ${balSg(BAL.eff.j9.run_3)}.`}});
 A.push({n:"Chia sẻ bí mật",o:100,x:`nàng quý ngươi +${g(10)}${v.malice>50?" · nàng có thể nắm thóp ngươi":""}`,run:()=>{chatMark(v);affAdd(v,S,g(10));if(v.malice>50&&roll(50)){evA(v,S,1);return `${v.name} lắng nghe chăm chú, ghi nhớ từng lời. Nàng quý ngươi +${g(10)}.`}return `${v.name} cũng kể chuyện riêng. Nàng quý ngươi +${g(10)}.`}});
 A.push({n:"Nhờ giúp đỡ",o:100,x:aff(v,S)>=30?"nàng thân với ngươi":"nàng chưa đủ quý ngươi (cần 30): nàng quý ngươi -3",run:()=>{chatMark(v);if(aff(v,S)>=30){if(roll(50)&&v.bac>=30){ap(v,{bac:-30});apply({bac:30});return `${v.name} cho ngươi mượn 30 lượng.`}const x=evGuilty(S,liveRivals(true).filter(y=>y!==v));if(x&&evA(S,x,1))return `${v.name} kể cho ngươi một chuyện về ${x.name}: chứng cứ +1.`;}affAdd(v,S,BAL.eff.j9.run_5);return `${v.name} khéo từ chối. Nàng quý ngươi ${balSg(BAL.eff.j9.run_5)}.`}});
 const foe=liveRivals(true).filter(x=>x!==v&&oan(x,v)>=30)[0];
 A.push({n:"Cảnh báo nàng",o:100,x:foe?`có kẻ đang oán nàng: nàng quý ngươi +${g(10)}`:`không có căn cứ: nàng quý ngươi ${balSg(BAL.eff.j9.run_7)}`,run:()=>{chatMark(v);if(foe){affAdd(v,S,g(10));oanAdd(v,foe,BAL.eff.j9.run_6);return `Ngươi nhắc ${v.name} coi chừng ${foe.name}. Nàng quý ngươi +${g(10)}.`}affAdd(v,S,BAL.eff.j9.run_7);return `${v.name} nghi ngươi gây chia rẽ. Nàng quý ngươi ${balSg(BAL.eff.j9.run_7)}.`}});
 if(oan(v,S)>0){A.push({n:"Tạ lỗi",o:100,c:{danh:-1},x:`oán ${balSg(BAL.eff.j9.run_8)}`,run:()=>{oanAdd(v,S,BAL.eff.j9.run_8);chatMark(v);return `Ngươi hạ mình tạ lỗi. ${v.name} oán ${balSg(BAL.eff.j9.run_8)}.`}});
  A.push({n:"Nhún nhường",o:100,c:{danh:-2},x:`oán ${balSg(BAL.eff.j9.run_9)} · nàng quý ngươi ${balSg(BAL.eff.j9.run_10)}`,run:()=>{oanAdd(v,S,BAL.eff.j9.run_9);affAdd(v,S,BAL.eff.j9.run_10);chatMark(v);return `Ngươi nhún nhường trước ${v.name}. Oán ${balSg(BAL.eff.j9.run_9)}, nàng quý ngươi ${balSg(BAL.eff.j9.run_10)}.`}})}
 A.push({n:"Giúp đỡ nàng",c:{bac:-20},o:100,x:`nàng quý ngươi ${balSg(BAL.eff.j9.run_11)} · oán ${balSg(BAL.eff.j9.run_12)}`,run:()=>{relAdd(S,v,BAL.eff.j9.run_11);oanAdd(v,S,BAL.eff.j9.run_12);chatMark(v);return `Ngươi giúp ${v.name} việc khó. Nàng quý ngươi ${balSg(BAL.eff.j9.run_11)}.`}});
 if(same)return A.filter(a=>["Hỏi han sức khỏe","Bàn tán về "+(third?third.name:""),"Tạ lỗi","Nhún nhường"].includes(a.n)).concat([{n:"Cùng cung",o:100,lock:true,t:"không thể lấy lòng hay ra tay",x:""}]);
 return A}
/* harms that need the place: food served, the lotus pond, her palace while she is away, overhearing */
const FOOD=["kn","tn","home","dtd"];
function placeHarms(v,k){const H=[];if(sameHouse(S,v))return H;
 const act=(key2,n,x)=>{const a=ACT[key2];if(a&&a.ok(S,v))H.push({n,o:a.o?a.o(S,v):100,act:1,x:[a.x||"",fmt(a.c)].filter(Boolean).join(" · "),run:()=>runAct(S,v,key2)})};
 act("spy","Dò la");act("rumor","Tung tin đồn");
 if(FOOD.includes(k)||k[0]==="r"){act("poison","Bỏ độc vào trà nàng");act("musk","Bỏ xạ hương vào thuốc nàng")}
 if(k==="vuon"){H.push({n:"Đẩy nàng xuống hồ sen",o:odA(S,40+S.tamco/4),act:1,x:"Đức -12 · lộ: bị phạt",run:()=>pushPond(S,v)});act("pond","Đẩy con nàng xuống hồ")}
 H.push({n:"Ngáng chân nàng",o:odA(S,50+S.tamco/5),act:1,x:v.preg&&!v.hidden?"nàng đang có thai":"nàng bẽ mặt",run:()=>trip(S,v)});
 act("frame","Vu oan");act("vp","Tố vượt phẩm");act("xx","Tố xa xỉ");
 return H}
function pushPond(a,t){ap(a,{duc:-12});a.schemes=(a.schemes||0)+1;const c=caught(a,t,false,"đẩy "+NM(t)+" xuống hồ sen");if(c)return c;
 if(roll(odA(a,40+a.tamco/4))){ap(t,{suc:-25});if(t.preg&&!t.fake&&roll(60)){t.preg=0;t.hidden=false}relAdd(a,t,BAL.eff.j9.pushPond);return (t===S?"<span class=\"r\">Ngươi bị đẩy xuống hồ sen</span>":`${t.name} trượt chân rơi xuống hồ sen`)+`, ướt sũng, nhiễm lạnh. Sức ${balSg(BAL.eff.j9.pushPond_2)}${t.preg===0?"":""}. `+dieIf(t,"nhiễm lạnh mà mất")}
 ap(a,{danh:-8});relAdd(a,t,BAL.eff.j9.pushPond_2);punish(a,"xô ngã phi tần",2);return `<span class="r">${NMc(a)} xô ${NM(t)} bị người thấy.</span> `}
function trip(a,t){ap(a,{duc:-4});if(roll(odA(a,50+a.tamco/5))){ap(t,{danh:-3});let r=`${NMc(t)} vấp ngã giữa chốn đông người. Danh -3. `;if(t.preg&&!t.fake&&roll(25)){t.preg=0;t.hidden=false;ap(t,{suc:-15});r+=`<span class="r">${NMc(t)} động thai.</span> `}relAdd(a,t,BAL.eff.j9.trip);return r}
 relAdd(a,t,BAL.eff.j9.trip_2);evA(t,a,1);return `${NMc(t)} thấy rõ ${NM(a)} ngáng chân. `}
function overhear(k){const here=liveRivals(true).filter(v=>whereOf(v)===k);if(here.length<2)return"";const v=pick(here);if(roll(od(40+S.mat*6))){return evA(S,v,1)?`Ngươi nghe lén ${v.name} nói chuyện: chứng cứ +1.`:`Ngươi nghe lén ${v.name} nói chuyện: không có gì sai trái, chỉ biết ${harmTxt(v)}.`}return "Không nghe được gì."}

/* the palace map */
const MAPL=[["thu","dtd","tn"],["kn","vuon","ksp"],["tyv","lc","home"]];
function mapHTMLgrid(){const W=S.where||{};const dis=k=>!walkOk(travel(S.place,k))||S.confined||S.dead||S.place===k;
 const tile=(k,n,sc,sub)=>`<button class="mtile" data-go="${k}" ${k==="home"?(S.place==="home"?"disabled":""):(dis(k)?"disabled":"")} style="${(SCIMG[sc]||k==="home")?`background-image:url(img/${k==="home"&&sc!=="maid"?"tam-cung-dem":SCIMG[sc]}.webp)`:""}"><span class="mband">${k!=="home"&&S.place!==k&&!walkOk(travel(S.place,k))?`<span class="mchip">${used>=BAL.time.khac?"hết khắc":`đi ${travel(S.place,k)} khắc`}</span>`:""}<b>${n}</b><span>${countAt(k)?silChip(countAt(k)):"vắng"} · ${k==="home"?"không tốn khắc":travel(S.place,k)+" khắc"}</span>${sub&&k!=="home"?`<small>${sub}</small>`:""}</span></button>`;
 let h=`<div class="ph"><span>Đi gần ${BAL.walk.near} khắc, xa ${walkFarK()} khắc · còn <b>${BAL.time.khac-used}</b> ${pips(BAL.time.khac-used)}. Đi được khi đường đi không quá số khắc còn; đến nơi hết khắc thì chỉ kịp xem ai ở đó.</span>${S.confined?`<span class="r">Cấm túc ${S.confined} tháng</span>`:""}</div><div class="pmap">`;
 for(const row of MAPL)for(const k of row){if(k==="kn"&&!qOn()){h+=`<div class="mtile off"><b>Càn Ninh cung</b><span>bỏ trống</span></div>`;continue}const P=placeOf(k);h+=tile(k,k==="home"?"Tẩm cung":P.n,P.sc,k==="home"?"không tốn việc":"")}
 h+=`</div><div class="pmap two">`+liveRivals(false).filter(v=>palaceOf(v)!=="home").map(v=>{const k="r"+v.id;return tile(k,typeof palName==="function"?palName(k):"Cung phi tần","rv","")}).filter((x,i,a)=>a.indexOf(x)===i).join("")+`</div>`;
 return h}
/* the 'Quan hệ' tab: the selected person's ties to everyone */
let relSel="me";

/* moving costs time: near 1 khắc, far 2 */
function mapPos(k){for(let r=0;r<MAPL.length;r++){const c=MAPL[r].indexOf(k);if(c>=0)return[r,c]}if(k[0]==="r"){const i=liveRivals(false).findIndex(v=>"r"+v.id===k);return[3+Math.floor(Math.max(0,i)/3),Math.max(0,i)%3]}return[2,2]}
/* the walk rule (owner 11/15 01:35Z): she may go anywhere whose WALK fits in the khắc left (arriving with 0 is fine: she sees who is
   there, next buổi she starts there). Never "hết khắc" unless 0 are left; otherwise the reason is the walk cost. */
function walkOk(tc){return !!S&&!S.dead&&used+tc<=BAL.time.khac}
function walkWhy(tc){const left=Math.max(0,BAL.time.khac-used);return left<=0?"hết khắc":`đi ${tc} khắc, còn ${left}`}
/* walk spill (owner 11/15 09:05Z): a walk longer than the khắc left is not a dead end. She pays what is left now, the buổi turns
   (normal end-of-buổi processing: NPCs move, news), the rest of the walk is paid from the new buổi's khắc and she arrives there in
   the new buổi, seeing who is there then (1 khắc left in the morning, 3-khắc walk → 1 now + 2 in the afternoon, arrives with 2 left).
   Not across the night: from buổi tối the existing night rule stands (wait until morning). The place must be open in the new buổi.
   While the walk is under way, travel(from,k) in the new buổi returns the part still to walk. NPCs do not pay walk costs (placeWhere). */
function walkSpill(k,o){if(!S||S.dead||S.out||S.confined||S.mg||!k||k==="home"||k===S.place)return null; /* co-op too (time-spill sweep 16/11): her buổi ends with `bend`, the walk finishes when the room turns (walkSpillTick waits for it) */
 const b=S.buoi||0;if(b>=BUOI.length-1)return null;const tc=travel(S.place,k),left=Math.max(0,BAL.time.khac-used),pre=(o&&o.pre)||0;if(pre+tc<=left)return null;
 let a={ok:true};if(!(o&&o.pass)&&typeof accessOf==="function"){try{S.buoi=b+1;a=accessOf(S,k)||{ok:true}}catch(e){}finally{S.buoi=b}}
 const now=Math.max(0,left-pre);return{k,tc,now,rest:tc-now,b:b+1,ok:!!a.ok,why:a.why||""}}
/* o.pass: she was let in this buổi (asked / sneaked / led in): the pass holds when she arrives next buổi. o.pre: khắc already spent here first */
function walkSpillGo(k,o){const P=walkSpill(k,o);if(!P||!P.ok||Q.length)return;window.__walkSpill={k,from:S.place,rest:P.rest,b:P.b,tries:0,pass:!!(o&&o.pass),wk:wkKey()};
 spend(P.now);nextBuoi();walkSpillTick()}
/* ONE "go there" rule for every button that walks her to a place (map, list, person cards, generic data-go) — owner-bug 16/11 18:30Z
   "chỗ nào cũng khóa hết" (review/dudo-lock): a walk longer than the khắc left is never a lock while walk spill can take her there.
   walkBlock(k,tc) = the reason a go-button is disabled ("" = may go now, or arrives next buổi); walkLate(k,tc) = true when she arrives
   next buổi; walkGo(k) = go now, or spill into the next buổi. */
function walkBlock(k,tc){if(tc==null)tc=travel(S.place,k);if(walkOk(tc))return"";const P=walkSpill(k);return P&&P.ok?"":walkWhy(tc)}
function walkLate(k,tc){if(tc==null)tc=travel(S.place,k);if(walkOk(tc))return false;const P=walkSpill(k);return !!(P&&P.ok)}
function walkGo(k){if(!S||S.dead||Q.length)return;if(k==="home"||k===S.place||S.confined||S.out){goTo(k);return}const tc=travel(S.place,k);if(walkOk(tc)){goTo(k);return}if(walkLate(k,tc))walkSpillGo(k)}
function walkSpillTick(){const W=window.__walkSpill;if(!W)return;if(!S||S.dead){window.__walkSpill=null;return}
 const md=document.getElementById("modal");if(Q.length||(md&&!md.hidden)||S.mg){setTimeout(walkSpillTick,300);return}
 const b=S.buoi||0;
 const coop=!!(window.COOPW&&COOPW.on);if(coop&&W.wk&&W.wk!==wkKey()){window.__walkSpill=null;return}
 if(b===W.b-1&&S.place===W.from&&(W.tries<3||coop)){W.tries++;if(W.tries<=3)nextBuoi();setTimeout(walkSpillTick,coop?600:300);return} /* the buổi did not turn yet (an event card came first; co-op: the friend has not ended the buổi yet) */
 if(b!==W.b||S.place!==W.from){window.__walkSpill=null;return}
 if(W.pass&&typeof accGrant==="function")accGrant(S,W.k);
 goTo(W.k);if(S.place===W.k)window.__walkSpill=null;
 /* review/dudo-lock: the place shut while she walked (the rule read the new buổi before NPCs moved, e.g. a maid's mistress left): never a
    silent stop at home — the place card says why, the walk spent is not refunded (she did walk) */
 else if(!Q.length){window.__walkSpill=null;try{if(typeof j77Card==="function")j77Card(W.k)}catch(e){}}}
/* khắc of a far walk right now (one-core: texts print this, BAL.walk) */
function walkFarK(){return BAL.walk.far}
function travel(a,b){if(a===b)return 0;{const W=window.__walkSpill;if(W&&S&&(S.buoi||0)===W.b&&a===W.from&&b===W.k)return W.rest}const [r1,c1]=mapPos(a||"home"),[r2,c2]=mapPos(b);const far=Math.abs(r1-r2)+Math.abs(c1-c2)>1;return far?BAL.walk.far:BAL.walk.near}
function nextBuoi(){if(!S||S.dead||Q.length||S.mg)return;if((S.buoi||0)>=B4L){S.buoi=0;endTurn();return}
 S.buoi=(S.buoi||0)+1;used=0;const ev=b4NpcActs()?rivalsBuoi():"";if(S.dead){render();return}placeWhere();popIdx=null;popMsg="";
 if(S.out)coldVisit();else if(S.place!=="home"){const k=S.place;S.place="home";const u=used;goTo(k);used=u}else S.visit={k:"home",people:homePeople(),talked:false,tk:{}};
 if(ev)Q.push({t:"Tin trong cung buổi này",kind:"news",h:`<p class="past">${when()} · ${BUOI[S.buoi]}</p><p>${ev}</p>`});curtain();render()}
A("pushp","Đẩy xuống hồ sen",{c:{duc:-12},ok:(a,t)=>whereOf(a)==="vuon"&&together(a,t),o:a=>odA(a,40+a.tamco/4),f:(a,t)=>pushPond(a,t)});
A("trip","Ngáng chân",{c:{duc:-4},ok:(a,t)=>together(a,t),o:a=>odA(a,50+a.tamco/5),f:(a,t)=>trip(a,t)});
