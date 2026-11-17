/* ================= j67 TUYẾN TRUYỆN NHIỀU NHÁNH (owner 11/14) =================
   Mỗi kiếp: 1 tuyến chính theo xuất thân (>=4 tiền đề mỗi xuất thân) + 1–2 tuyến chung rút về sau.
   Một tuyến = 3–6 hồi: mở đầu → 1–3 rắc rối (rút ngẫu nhiên, lọc theo cờ) → (bước ngoặt) → cao trào → kết (>=3 kết cục).
   Lựa chọn nào cũng có lợi và cái giá/rủi ro thật, cơ may bằng chữ; "Lợi thế" (manh mối, đồng minh gom được) cộng vào cơ may ở cao trào.
   Kết thua là mất thật (mất chỗ dựa, giáng một bậc, kẻ thù lên) nhưng không bao giờ ép chết, lãnh cung hay mưu phản: đường Hoàng hậu / Hoàng thái hậu luôn còn.
   Kiếp cũ đang dở tuyến truyện cũ (S.st không có v2) chạy tiếp như trước. Lịch sử 10 tuyến gần nhất mỗi xuất thân: localStorage "ctm-arcs".
   Móc cho mô-đun khác: storyBusy() = true nếu tháng này tuyến truyện đã ra một hồi hoặc đang chờ ngươi chọn.
   Hồi được ra khi tháng có j68 questBusy() đang bận thì lùi sang tháng sau. */
const ARC67={},GB67={};
function rnd67(){try{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296}catch(e){return Math.random()}}
function rI67(n){return Math.floor(rnd67()*n)}
function pk67(a){return a[rI67(a.length)]}
function sh67(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=rI67(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
function v267(){return !!(S&&S.st&&S.st.v2)}
function th67(i){return v267()?(i==="m"?S.st.M:(S.st.X||[])[i]):null}
function thAll67(){return v267()?[S.st.M].concat(S.st.X||[]).filter(Boolean):[]}
function thKey67(t){return t===S.st.M?"m":(S.st.X||[]).indexOf(t)}
/* story position (owner 15/11 20:30Z): every story progress label shows the CHAPTER and the ACT, "Chương 2 · Hồi 3/4" (lab67).
   Main line: chapter = A.chap; an old save without it takes the chapter count S.st.ch.n, else Chương 1. Hồi = the act she is on
   (A.i+1 of A.seq.length; a closed chapter = n/n). A phụ tuyến arc (old saves, S.st.X) is one chapter: act only. The old story
   from before chapters (no S.st.v2): Chương 1 · Hồi step+1/n. A milestone chapter (S.st.ms, a checklist) has no acts: Chương only. */
function pos67(A){const st=S&&S.st;if(!st)return null;
 if(!v267()){const s=STORY[S.origin&&S.origin.k],n=(s&&s.n)||0;return{c:1,i:n?Math.min((st.step||0)+(st.done?0:1),n):0,n}}
 if(A===undefined){if(st.ms&&st.ch)return{c:st.ch.n||1,i:0,n:0};A=st.M}
 if(!A)return st.ch&&st.ch.n?{c:st.ch.n,i:0,n:0}:null;
 const n=A.seq?A.seq.length:0,i=A.done?n:Math.min((A.i||0)+1,n),side=A!==st.M&&(st.X||[]).includes(A);
 return{c:side?0:(A.chap||(st.ch&&st.ch.n)||1),i,n,side}}
function lab67(A){const p=pos67(A);if(!p)return"";return [p.c?`Chương ${p.c}`:"",p.n?`Hồi ${p.i}/${p.n}`:""].filter(Boolean).join(" · ")}
function storyBusy(){try{return v267()&&(S.st.bm===S.turn||Q.some(m=>m.pid==="j67"))}catch(e){return false}}
window.storyBusy=storyBusy;
/* ---------- history (per origin and shared "*") ---------- */
function hist67(){try{return JSON.parse(localStorage.getItem("ctm-arcs")||"{}")||{}}catch(e){return {}}}
function histAdd67(k,id){try{const h=hist67();h[k]=[id].concat((h[k]||[]).filter(x=>x!==id)).slice(0,10);localStorage.setItem("ctm-arcs",JSON.stringify(h))}catch(e){}}
function choose67(k,ids){const r=hist67()[k]||[];const w=ids.map(id=>{const i=r.indexOf(id);return i<0?12:i});const tot=w.reduce((a,b)=>a+b,0);
 if(!tot)return ids.slice().sort((a,b)=>r.indexOf(b)-r.indexOf(a))[0];let x=rnd67()*tot;for(let i=0;i<ids.length;i++){x-=w[i];if(x<0)return ids[i]}return ids[ids.length-1]}
/* ---------- actors ---------- */
function rvOk67(v){return !!(v&&v.alive&&!v.out)}
function rv67(A,k){const v=A.act&&A.act[k]!=null?RV(A.act[k]):null;return rvOk67(v)?v:null}
function castRv67(A,k,f){const used=Object.values(A.act||{});const L=liveRivals(false).filter(v=>!used.includes(v.id)&&(!f||f(v)));if(!L.length)return false;A.act[k]=pk67(L).id;return true}
function son67(){return mySons().slice().sort((a,b)=>(b.fond||0)-(a.fond||0))[0]||null}
function dau67(){return myDaus()[0]||null}
function man67(A){try{menInit()}catch(e){}const L=(S.men||[]).filter(m=>m.alive&&(m.age||0)>=18);let m=L.find(x=>x.id===A.act.m);if(!m&&L.length){m=pk67(L);A.act.m=m.id}return m||null}
function dad67(){try{const c=S.origin.k==="tt"?"Tể tướng":S.origin.k==="dtq"?"Đại tướng quân":null;return c?tdHead(c):null}catch(e){return null}}
function eun67(){return S.court&&S.court.tq?S.court.tq.name:"Tổng quản thái giám"}
function srvMis67(){try{return typeof srvM==="function"?srvM():null}catch(e){return null}}
function nm67(A,k){const v=rv67(A,k);return v?v.name:"một phi tần"}
const TOK67={
 v:A=>nm67(A,"v"),v2:A=>nm67(A,"v2"),hh:()=>qOn()?rivals[0].name:"Hoàng hậu",me:()=>S.name,maid:()=>S.maid?S.maid.name:"cung nữ thân tín",
 dad:A=>{const d=dad67();return d?d.name:"phụ thân"},dadr:()=>({tt:"Tể tướng",dtq:"Đại tướng quân",muoi:"phụ thân",thd:"phụ thân"})[S.origin.k]||"phụ thân",
 man:A=>{const m=man67(A);return m?m.name:"một người đàn ông lạ"},manr:A=>{const m=man67(A);return m?m.rw:"người lạ"},
 eun:()=>eun67(),k:()=>{const s=son67();return s?s.name:"hoàng tử"},d:()=>{const d=dau67();return d?d.name:"công chúa"},
 mis:()=>{const m=srvMis67();return m?m.name:"chủ nhân"},foe:()=>S.foe||"kẻ thù",foed:()=>S.foeDad||"kẻ thù của cha",
 sj:A=>A.sj||"chuyện này",/* {N}/{Nc} = what a servant calls her (was {xung}) — the one address core (jvoice) */N:()=>kSay({srv:"f"},S,"{goi}"),Nc:()=>kSay({srv:"f"},S,"{Goi}"),n1:A=>A.n1||"",n2:A=>A.n2||"",emp:()=>"Hoàng thượng"};
/* a goal / step text that names the arc's people tells HER who they are (D47: the Mục tiêu row showed "Quý nhân ???" for the very woman the chapter says she found out): name + face known (j61 stage 2), nothing logged */
function arcReveal67(t,A){try{if(typeof k61Know!=="function"||!A||typeof t!=="string")return;const L=[];for(const k of ["v","v2"])if(t.includes("{"+k+"}")){const v=rv67(A,k);if(v)L.push(v)}if(t.includes("{foe}")){const v=foe67();if(v)L.push(v)}if(L.length)k61Know(L,"",true,2)}catch(e){}}
/* palace voice: {goi}/{Goi} = how the beat's speaker w calls her, {xung}/{Xung} = the speaker's self word (jvoice kAddr, one core) */
function sp67(w,A){try{if(w==="emp"||w==="th"||w==="hh")return w;if(w==="v"||w==="v2"){const v=rv67(A,w);if(v)return v}if(w==="eun")return{srv:"m"};if(w==="doc")return{role:"x",rw:"quan"}}catch(e){}return{srv:"f"}}
function fill67(s,A,w){if(typeof s==="string")arcReveal67(s,A);return String(typeof s==="function"?s(A):s||"").replace(/\{([Gg]oi|[Xx]ung)\}/g,(m,k)=>{const a=kAddr(sp67(w,A),S);const x=k.toLowerCase()==="goi"?a.goi:a.xung;return k[0]===k[0].toUpperCase()?x.charAt(0).toUpperCase()+x.slice(1):x}).replace(/\{(\w+)\}/g,(m,k)=>TOK67[k]?TOK67[k](A):m)}
function who67(w,A){try{switch(w){
 case"v":case"v2":{const v=rv67(A,w);return v?pv(v):null}
 case"th":return S.thDead?null:pTH();case"emp":return pEmp();case"hh":return qOn()?pv(rivals[0]):null;case"maid":return S.maid?pMaid():null;case"me":return pMe();
 case"dad":{const d=dad67();return d?pMin(d):null}case"man":{const m=man67(A);return m?pMan(m):null}
 case"eun":return pEunCourt("tq");case"doc":return pDoc();case"kid":{const s=son67();return s?kidFace(s):null}case"dau":{const d=dau67();return d?kidFace(d):null}
 case"mis":{const m=srvMis67();return m?pv(m):null}case"foe":{const e=rivals.find(x=>x.enemy&&x.alive);return e?pv(e):null}}}catch(e){}return null}
/* ---------- thread lifecycle ---------- */
function arcIds67(o){return Object.keys(ARC67).filter(id=>ARC67[id].o===o)}
function arcOk67(a){try{return !a.ok||a.ok()}catch(e){return false}}
function newThread67(id,kind){const a=ARC67[id];const A={a:id,kind,act:{},f:{},sc:0,used:[],hist:[],cur:null,nb:null,done:0,tag:"",end:"",i:0};
 if(a.cast&&a.cast(A)===false)return null;A.sj=fill67(a.sj||"",A);
 const comps=(a.p[1]||[]).length,nc=Math.max(1,Math.min(comps,1+rI67(3)));A.seq=["s"].concat(Array(nc).fill("c"),a.p[2]&&a.p[2].length&&rnd67()<.65?["t"]:[],["x"]);
 return A}
function startArc67(k){const ids=arcIds67(k).filter(id=>arcOk67(ARC67[id]));if(!ids.length)return null;
 for(let n=0;n<6;n++){const id=choose67(k,ids);const A=newThread67(id,k==="*"?"s":"m");if(A){histAdd67(k,id);return A}}return null}
function a67init(k){S.st={step:0,done:0,tag:"",v2:1,M:null,X:[],bm:-9,nx:8+rI67(6)};
 const A=startArc67(k);if(!A)return;A.chap=2;
 const pool=arcIds67(k).filter(id=>id!==A.a&&arcOk67(ARC67[id]));const na=Math.min(3,1+pool.length);
 S.st.ch={n:1,max:na+3,na,past:[],pool,k,next:A};S.st.ms={id:"nhap",r0:S.rank,t0:S.turn};syncMain67()}
/* milestone chapters: Chương 1 (vào cung, đứng vững) and the last two (ngôi Trung cung, kế vị): goals are the game's own goals */
const MS67={
 nhap:{t:()=>S.origin.k==="cnv"?"Kẻ hầu mới vào cung":"Nhập cung, đứng vững",g:()=>S.origin.k==="cnv"?"Mới vào cung làm kẻ hầu: làm tròn phận sự, giữ lòng tin của chủ. Xong chương khi qua tám tháng đầu, hoặc được phong Đáp ứng.":"Mới vào cung: giữ mình, được Hoàng thượng để mắt. Xong chương khi được tấn phong một bậc, hoặc qua sáu tháng đầu.",
  steps:m=>S.origin.k==="cnv"?[[`Qua tám tháng đầu (${Math.min(8,S.turn-m.t0)}/8)`,S.turn-m.t0>=8],["Được phong Đáp ứng",!!(S.srv&&S.srv.risen)]]:[[`Được tấn phong một bậc (nay ${RANKS[Math.min(S.rank,7)].n})`,S.rank>m.r0],[`Qua sáu tháng đầu (${Math.min(6,S.turn-m.t0)}/6)`,S.turn-m.t0>=6]],any:1,fx:{danh:3},end:"Ngươi đã đứng được chân trong cung."},
 hau:{t:()=>"Tranh ngôi Trung cung",g:()=>"Leo lên ngôi Hoàng hậu. Từng bậc phải đủ Sủng và Danh; khi ngôi Trung cung trống, Hoàng thượng chọn trong người có hoàng tử, được Thái hậu ủng hộ và đủ Đức.",
  steps:()=>[3,4,5,6,7].map(r=>[`Lên ${RANKS[r].n}`,S.rank>=r]),fx:{th:5,danh:5},end:"Ngươi đã ngồi trên ngôi Trung cung."},
 ke:{t:()=>"Mẫu nghi thiên hạ",g:()=>"Đưa con mình lên ngôi Đông cung; khi con lên ngôi, ngươi thành Hoàng thái hậu.",
  steps:()=>[["Có hoàng tử",mySons().length>0],["Con ngươi được lập Thái tử",!!(S.heir&&!S.heir.v)]],fx:{danh:5},end:"Con ngươi đã là Thái tử. Ngày ngươi thành Hoàng thái hậu chỉ còn chờ trời định."}};
function msDone67(m){const d=MS67[m.id],st=d.steps(m);return d.any?st.some(x=>x[1]):st.every(x=>x[1])}
function msStart67(id){const c=S.st.ch;c.n++;S.st.ms={id,r0:S.rank,t0:S.turn};const d=MS67[id];
 log(`<b>Chương ${c.n}: ${d.t()}.</b> ${d.g()}`);card67("info",`Chương ${c.n}: ${d.t()}`,[["Mục tiêu",d.g()],["Các bước",steps67(d.steps(S.st.ms))]],pMe(),Q0n67());syncMain67()}
function msCheck67(){const m=S.st.ms,c=S.st.ch;if(!m||!c||!msDone67(m))return;const d=MS67[m.id];ap67(d.fx);
 c.past.push({ms:m.id,t:d.t(),tag:"Xong",k:1,n:c.n});log(`<b class="g">Chương ${c.n} «${d.t()}» xong.</b> ${d.end} ${fmt(d.fx)}`);
 card67("result",`Chương ${c.n} khép lại`,[["Kết cục","Xong","g"],["Sự việc",d.end],["Thay đổi",fmt(d.fx)]],pMe(),d.t());S.st.ms=null;
 if(m.id==="nhap"&&c.next){const B=c.next;c.next=null;c.n++;B.chap=c.n;B.due=S.turn+1+rI67(3);pickNext67(B);S.st.M=B;const ab=ARC67[B.a];
  log(`<b>Chương ${c.n}: ${ab.t}.</b> ${fill67(ab.g,B)}`);card67("info",`Chương ${c.n}: ${ab.t}`,[["Mục tiêu",fill67(ab.g,B)],["Số hồi",`${B.seq.length} hồi, mỗi hồi một lựa chọn`],["Kế tiếp",hint67(B)]],who67(ab.w,B),Q0n67())}
 else if(m.id==="hau")msStart67("ke");else if(m.id==="ke"){c.all=1}
 syncMain67()}
function syncMain67(){const c=S.st.ch;if(!c)return;S.st.step=c.past.length}
/* chapters: the main quest (chính tuyến) of a life = 3 chapters, each one of the origin's arcs; how a chapter ends picks the next one */
function chNext67(E){const c=S.st.ch,r=hist67()[c.k]||[];const pool=c.pool.filter(id=>arcOk67(ARC67[id])).sort((a,b)=>{const ia=r.indexOf(a),ib=r.indexOf(b);return (ib<0?99:ib)-(ia<0?99:ia)||(a<b?-1:1)});
 if(!pool.length)return null;const i0=(E.k>0?0:E.k<0?2:1)%pool.length;for(let t=0;t<pool.length;t++){const id=pool[(i0+t)%pool.length];const B=newThread67(id,"m");if(B){c.pool=c.pool.filter(x=>x!==id);histAdd67(c.k,id);return B}}return null}
function Q0n67(){return `Mệnh truyện: ${(QUEST67[S.origin.k]||QUEST67.tt).t}`}
function chEnd67(A,E){const c=S.st.ch;if(!c)return;c.past.push({a:A.a,tag:A.tag,k:E.k,n:c.n});
 const arcs=c.past.filter(x=>x.a).length;const last=arcs>=c.na;const B=last?null:chNext67(E);
 if(B){c.n++;B.chap=c.n;B.sc=E.k>0?1:0;B.due=S.turn+3+rI67(3);pickNext67(B);S.st.M=B;const ab=ARC67[B.a];
  log(`<b>Chương ${c.n}: ${ab.t}.</b> ${fill67(ab.g,B)}${B.sc?" Mang theo Lợi thế +1 từ chương trước.":""}`);
  card67("info",`Chương ${c.n}: ${ab.t}`,[["Mục tiêu",fill67(ab.g,B)],["Số hồi",`${B.seq.length} hồi, mỗi hồi một lựa chọn`],["Mang theo",B.sc?"Lợi thế +1 (chương trước thắng)":"chưa có Lợi thế"],["Kế tiếp",hint67(B)]],who67(ab.w,B),Q0n67());
  syncMain67();return}
 const sum=c.past.reduce((x,y)=>x+y.k,0),Q0=QUEST67[c.k]||QUEST67.tt;const e=sum>=1?0:sum>=-1?1:2;const P=Q0.e[e];
 c.done=1;c.fin=P[0];S.st.M=null;S.st.done=e<2?1:-1;S.st.tag=P[0];ap67(P[1]);if(e===0&&!S.dead)try{bestow(S,"story")}catch(x){}
 log(`<b class="${e===0?"g":e===2?"r":""}">Mệnh truyện «${Q0.t}» trọn vẹn: ${P[0]}.</b> ${P[2]} ${fmt(P[1])}`);
 card67("result",`Mệnh truyện trọn vẹn: ${Q0.t}`,[["Kết cục",P[0],e===0?"g":e===2?"r":""],["Các chương",c.past.filter(x=>x.a).map(x=>`Chương ${x.n}: ${ARC67[x.a].t} · <span class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</span>`).join("<br>")],["Sự việc",P[2]],["Thay đổi",fmt(P[1])],["Về sau","Đường lên ngôi Hoàng hậu, Hoàng thái hậu vẫn mở"]],pMe());
 if(S.rank<7)msStart67("hau");else msStart67("ke");
 syncMain67()}
/* the beat for slot A.i, chosen now so the hint can say truthfully what is coming */
function beatDef67(A,id){const a=ARC67[A.a];return id&&id.startsWith("G.")?GB67[id.slice(2)]:a.B[id]}
function beatOk67(A,id){const b=beatDef67(A,id);if(!b)return false;try{if(b.if&&!b.if(A))return false;if(b.need)for(const k of b.need){if(k==="hh"&&!qOn())return false;if(k==="th"&&S.thDead)return false;if(k==="srv"&&!(typeof isSrv==="function"&&isSrv()))return false;if(k==="nsrv"&&typeof isSrv==="function"&&isSrv())return false;if(k==="kid"&&!son67())return false;if(k==="dau"&&!dau67())return false;if((k==="v"||k==="v2")&&!rv67(A,k)&&!castRv67(A,k,b.vf))return false;if(k==="man"&&!man67(A))return false;if(k==="mis"&&!srvMis67())return false}}catch(e){return false}return true}
function pickNext67(A){const a=ARC67[A.a];
 while(A.i<A.seq.length){const slot={s:0,c:1,t:2,x:3}[A.seq[A.i]];
  if(A.force&&beatOk67(A,A.force)){A.nb=A.force;A.force=null;return A.nb}A.force=null;
  const C=(a.p[slot]||[]).filter(id=>!A.used.includes(id)&&beatOk67(A,id));
  if(C.length){A.nb=pk67(C);return A.nb}
  if(slot===3){A.nb=null;return null}
  A.seq.splice(A.i,1)}
 A.nb=null;return null}
/* odds of an option: base (number or fn) + Lợi thế at the climax */
function oOf67(A,o,b){if(o.o==null)return 100;let x=typeof o.o==="function"?o.o(A):o.o;if(o.e||b.x)x+=(A.sc||0)*7;return od(x)}
function oNeed67(o){const n=o.need||[];const srv=typeof isSrv==="function"&&isSrv();if(n.includes("nsrv")&&srv)return false;if(n.includes("srv")&&!srv)return false;if(n.includes("th")&&S.thDead)return false;if(n.includes("kid")&&!son67())return false;if(n.includes("hh")&&!qOn())return false;return true}
function opts67(A,b){return (typeof b.o==="function"?b.o(A):b.o).filter(o=>{try{return oNeed67(o)&&(!o.if||o.if(A))}catch(e){return false}})}
function fireBeat67(A){const b=beatDef67(A,A.nb);if(!b||!beatOk67(A,A.nb)){if(A.nb)A.used.push(A.nb);if(!pickNext67(A))end67(A,scEnd67(A));syncMain67();return""}
 const O=opts67(A,b);const pp={t:thKey67(A),a:A.a,b:A.nb,o:O.map(o=>oOf67(A,o,b))};A.cur=A.nb;S.st.bm=S.turn;
 return pushDil(mkP("j67",pp),"Mệnh truyện")}
function ap67(o){if(!o)return;apply(o);if(S.tin!=null)S.tin=cl(S.tin,0,100);if(S.nt!=null)S.nt=cl(S.nt,0,100)}
function txt67(o){return Object.assign({},o||{})}
PEND.j67=p=>{if(!v267())return null;const A=th67(p.t);if(!A||A.a!==p.a||A.cur!==p.b||A.done)return null;const a=ARC67[A.a],b=beatDef67(A,p.b);if(!b)return null;
 const O=opts67(A,b);const step=A.i+1,n=A.seq.length;
 return {who:who67(b.w,A),t:`<b>${a.t}</b> <span class="past">· hồi ${step}/${n}</span><br>${fill67(b.t,A,b.w)}`,o:O.map((o,i)=>{const od0=p.o[i]==null?100:p.o[i],sure=od0>=100;
  const cm=t=>String(t).replace(/, /g," – "),G=t=>t?`<span class="g">${cm(t)}</span>`:"",Rd=t=>t?`<span class="r">${cm(t)}</span>`:"";const gain=[fmt(o.w||{}),G(fill67(o.wx||"",A)),o.sc>0?`Lợi thế +${o.sc}`:""].filter(Boolean).join(" · ");
  const end=o.e?(Array.isArray(o.e)?o.e:[o.e,o.e]):null;/* an ending no roll decides (sure option, or the same ending either way) can still turn in a 14-chapter life (jst14 f14Hold, OD:L1253).
     VANPHONG: the act ladder (Liều…Nắm chắc) is ONLY the act's own success odds (a sure act carries no word); the chance that the ending turns is a side
     chance → the chance scale Rất thấp…Rất cao (chanceLvl, j1), labelled with the result card's row name «Xoay chiều»; kept in brackets INSIDE the ending phrase so the kit hint
     of the story dialog (kitHint/kitOptModel, jk2b: splits on " · ") shows it with the ending (review/story14-p1-r3) */
  const sh=sure||(end&&end[0]===end[1]);const eT=k=>{const E=a.E[k];if(!E)return"";const w=sh&&typeof f14Hold==="function"?f14Hold(A,k):100;return (E.k<0?Rd:G)(`kết: ${fill67(E.tag,A)}${w<100?` (có thể xoay chiều: ${chanceLvl(100-w)})`:""}`)};
  const x=sure?[gain||(end?eT(end[0]):""),o.lx?"kèm: "+Rd(fill67(o.lx,A)):""].filter(Boolean).join(" · ")
   :`${word(od0)} · thành: ${[gain,end?eT(end[0]):""].filter(Boolean).join(" · ")||"qua được"} · hỏng: ${[fmt(o.l||{}),Rd(fill67(o.lx||"",A)),end&&end[1]!==end[0]?eT(end[1]):"",o.sf<0?`Lợi thế ${o.sf}`:""].filter(Boolean).join(" · ")||"không mất gì thêm"}`;
  const fx=txt67(o.c);
  const cost=fmt(o.c||{});const line=sure?[cost?"tốn: "+cost:"",x?(/^kèm:/.test(x)?x:"thành: "+x):""].filter(Boolean).join(" · "):x.replace(/^([^·]+) · /,(m,w)=>`${w} · ${cost?"tốn: "+cost+" · ":""}`);
  return {n:fill67(o.n,A),fx,x,j67:line,go:()=>res67(p.t,p.b,i,od0)}})}};
(function(){const d0=dilLine;dilLine=function(c){if(c&&c.j67)return kitParse(c.j67);return d0.apply(this,arguments)}})();
function res67(tk,bid,i,odds){const A=th67(tk);if(!A||A.cur!==bid)return;const a=ARC67[A.a],b=beatDef67(A,bid);const o=opts67(A,b)[i];if(!o)return;
 const sure=odds>=100,ok=sure||roll(odds);if(!sure){ap67(ok?o.w:o.l);if(ok&&o.sc)A.sc+=o.sc;if(!ok&&o.sf)A.sc=Math.max(0,A.sc+o.sf)}else{ap67(o.w);if(o.sc)A.sc+=o.sc}
 if(ok&&o.f)A.f[o.f]=1;if(!ok&&o.ff)A.f[o.ff]=1;let extra="";try{if(o.go)extra=o.go(A,ok)||""}catch(e){console.error(e)}
 const said=fill67(ok?(o.rt||""):(o.rf||""),A,b&&b.w);/* rt/rf take the beat speaker's address tokens too (reviewer r1: Hoàng thượng nàng / ái phi) */
 log(`<b>${lab67(A)} · ${a.t}</b>: ${sure?"":ok?'<span class="g">Thành.</span> ':'<span class="r">Hỏng.</span> '}${said}${" "+fmt(sure?o.w:ok?o.w:o.l)}${extra?" "+extra:""}`);
 A.hist.push(`${fill67(b.l||b.h||"",A)}: ${fill67(o.n,A)}${sure?"":ok?" (thành)":" (hỏng)"}`);A.used.push(bid);A.cur=null;A.i++;
 const end=o.e?(Array.isArray(o.e)?(ok?o.e[0]:o.e[1]):o.e):null;
 if(end){end67(A,end);return}
 A.force=ok?o.to||null:o.tf||null;A.due=S.turn+2+rI67(3);if(!pickNext67(A)){end67(A,scEnd67(A))}syncMain67()}
function scEnd67(A){const a=ARC67[A.a];return A.sc>=3&&a.E.win?"win":A.sc>=1&&a.E.mid?"mid":Object.keys(a.E).find(k=>a.E[k].k<0)||Object.keys(a.E)[0]}
function end67(A,k){const a=ARC67[A.a],E=a.E[k]||a.E[Object.keys(a.E)[0]];A.done=E.k>0?1:E.k<0?-1:2;A.tag=fill67(E.tag,A);A.end=k;A.cur=null;A.nb=null;
 ap67(E.fx);let extra="";try{if(E.go)extra=E.go(A)||""}catch(e){console.error(e)}
 const cls=E.k>0?"g":E.k<0?"r":"";const body=fill67(E.t,A);
 log(`<b class="${cls}">${A===S.st.M?`Chương ${A.chap||1}`:"Phụ tuyến"} «${a.t}» khép lại: ${A.tag}.</b> ${body} ${fmt(E.fx)}${extra?" "+extra:""}`);
 const isM=A===S.st.M;
 card67("result",isM?`Chương ${A.chap||1} khép lại`:"Phụ tuyến khép lại",[["Kết cục",A.tag,cls],["Sự việc",body],["Thay đổi",fmt(E.fx)],["Hệ quả",extra],["Về sau","Đường lên ngôi Hoàng hậu vẫn còn mở"]],who67(E.w||a.w,A),a.t);
 if(isM){if(E.k>0&&!S.dead)try{bestow(S,"story")}catch(e){}chEnd67(A,E)}
 if(A.kind==="s")S.st.nx=S.turn+6+rI67(8)}
/* cards and rows through the shared kit (j79 kitPanel / kitRows) when present; plain kit rows otherwise */
function rows67(R){R=R.filter(r=>r&&r[1]);if(typeof kitRows==="function")return kitRows(R.map(r=>[r[0],r[1],r[2]||""]));return `<div class="pcb rows">${R.map(r=>`<div class="pcrow"><span>${r[0]}</span><span class="${r[2]||""}">${r[1]}</span></div>`).join("")}</div>`}
/* the steps of a chapter = kit §46 kitChecks (✓/✗ chip + text), never typed ✓/✗ lines (tut-followups, LUẬT KIT TRƯỚC; same part and order as the
   chapter detail jgoal and the quest lists jtq14). Returns the kitChecks html; in a card67 the row becomes its own kit section */
function steps67(st){return typeof kitChecks==="function"?kitChecks((st||[]).map(x=>[!!x[1],x[0]])):(st||[]).map(x=>(x[1]?"✓ ":"✗ ")+x[0]).join("<br>")}
const isChk67=v=>typeof v==="string"&&v.startsWith('<div class="kchecks">');
function card67(kind,title,R,who,sub){if(quiet||window.__bot)return;R=R.filter(r=>r&&r[1]);
 if(typeof kitPanel==="function"){const sec=[];R.forEach(r=>{if(isChk67(r[1]))sec.push({h:r[0],html:r[1]});else{let L=sec[sec.length-1];if(!L||!L.rows){L={h:"",rows:[]};sec.push(L)}L.rows.push([r[0],r[1],r[2]||""])}});
  kitPanel({kind,title,sub:sub||"",sections:sec,subject:who||null,btn:"Đã hiểu"});return}
 pushModal({t:title,btn:"Đã hiểu",who,h:(sub?`<p><b>${sub}</b></p>`:"")+rows67(R)})}
/* month: at most one beat a month across all threads; shared arcs open later in the life */
function a67Month(){if(!v267()||S.dead)return"";const st=S.st;try{msCheck67()}catch(e){console.error(e)}
 try{if(typeof questBusy==="function"&&questBusy())return""}catch(e){}
 if(Q.some(m=>m.pid==="j67"))return"";
 const X=st.X||(st.X=[]);const live=X.filter(t=>!t.done);
 if(!live.length&&X.length<2&&S.turn>=st.nx&&(X.length===0||rnd67()<.6)&&(!st.M||st.M.done||st.M.i>=2||S.turn>=14)){
  const A=startArc67("*");if(A){A.due=S.turn+1+rI67(3);pickNext67(A);X.push(A)}else st.nx=S.turn+6}
 const L=thAll67().filter(t=>!t.done&&!t.cur&&t.nb&&S.turn>=t.due).sort((a,b)=>a.due-b.due);
 if(L.length)return fireBeat67(L[0])||"";
 return""}
/* ---------- STORY wrappers: old saves keep the old storyline ---------- */
function hint67(A){if(!A)return"";if(A.done)return A.tag;const b=A.cur?beatDef67(A,A.cur):beatDef67(A,A.nb);if(!b)return"";
 if(A.cur)return `Đang chờ ngươi quyết: ${fill67(b.h||"",A)}`;const dm=Math.max(0,A.due-S.turn);
 return `Sắp tới: ${fill67(b.h||"",A)}${dm?` (khoảng ${dm} tháng nữa)`:" (tháng này hoặc tháng sau)"}`}
/* wrap67(k) = story67Wrap(k) (both names kept, batch-0232: road-b2 calls wrap67 from jroad.js at load end, tut-followups calls story67Wrap from jorigins) */
/* wrap one origin's v1 story slot into the chapter frame; idempotent. Every STORY entry is wrapped, also one a module after j67 adds
   (jorigins bd): regEach (jreg) runs the wrap again at the script end and at every life start (review/story-frame, story bot fault 1;
   before, bd had no frame in 28/28 lives and jorigins had to call the wrap by hand). late = the entry came after j67 loaded (old saves of
   such an origin may hold a life with no frame: f67Mig below starts it on load). */
function story67Wrap(k,late){const old=STORY[k];if(!old||old.__old)return;const W={};if(late)W.__late=1;
 const d=(n,f)=>Object.defineProperty(W,n,{get:f,enumerable:true,configurable:true});
 d("t",()=>v267()&&S.st.ch?(QUEST67[k]||QUEST67.tt).t:old.t);
 d("goal",()=>{if(!v267()||!S.st.ch)return old.goal;const m=S.st.ms,M=S.st.M,c=S.st.ch;if(m){const d0=MS67[m.id];return `Chương ${c.n}: ${d0.t()}. ${d0.g()}`}return M?`Chương ${M.chap||1}: ${ARC67[M.a].t}. ${fill67(ARC67[M.a].g,M)}`:obj67()});
 d("n",()=>v267()&&S.st.ch?S.st.ch.max:old.n);
 d("calc",()=>v267()?(()=>S.st.ch?S.st.ch.past.length:0):old.calc);
 d("hint",()=>v267()?(()=>obj67()):old.hint);
 d("month",()=>v267()?a67Month:old.month);
 d("acts",()=>v267()?(()=>[]):old.acts);
 W.init=function(){try{regSweep()}catch(e){}if(k==="td"&&old.init)old.init();a67init(k)};
 W.__old=old;STORY[k]=W;try{story67Acts(k)}catch(e){}}
regEach(STORY,(k,v,late)=>story67Wrap(k,late),"STORY wrap");
function wrap67(k){return story67Wrap(k)}
(function(){const s0=storyMonth;storyMonth=function(){if(v267())return a67Month()||"";return s0.apply(this,arguments)}})();
if(typeof srvMonth==="function")(function(){const m0=srvMonth;srvMonth=function(){const r=m0.apply(this,arguments)||"";if(S&&!S.dead&&v267())return r+(a67Month()||"");return r}})();
/* Sổ luân hồi: every story ending of the life */
function tags67(){return thAll67().filter(t=>t.done).map(t=>`${ARC67[t.a].t}: ${t.tag}`).join("; ")}
if(typeof lifeSave==="function")(function(){const l0=lifeSave;lifeSave=function(fate){try{const t=tags67();if(t)fate=`${fate} · Truyện: ${t}`}catch(e){}return l0.call(this,fate)}})();
/* ---------- the Tuyến truyện panel ---------- */
function msName67(x){return x.a?ARC67[x.a].t:x.t}
function obj67(){const c=S.st&&S.st.ch,A=S.st&&S.st.M,m=S.st&&S.st.ms;if(!c)return"";
 if(m){const d=MS67[m.id];const nx=d.steps(m).find(x=>!x[1]);return `Chương ${c.n}/${c.max} «${d.t()}»: ${nx?nx[0]:"sắp xong"}`}
 if(c.all)return `Mệnh truyện trọn vẹn: ${c.fin||""}`;if(!A)return"";return `${lab67(A)} «${ARC67[A.a].t}»: ${hint67(A)}`}
function thRows67(A,row){const a=ARC67[A.a];const n=A.seq.length,i=A.done?n:A.i;
 return rows67([["Mục tiêu",fill67(a.g,A)],["Tiến độ",`Đã qua ${i}/${n} hồi · còn ${n-i}`],["Lợi thế",`${A.sc} · mỗi phần thêm cơ may ở hồi cao trào`],["Đã qua",A.hist.join("<br>")],A.done?["Kết cục",A.tag,A.done===1?"g":A.done===-1?"r":""]:["Kế tiếp",hint67(A)]])}
function panel67(){const row=(a,b)=>`<div class="pcrow"><span>${a}</span><span>${b}</span></div>`;const c=S.st.ch,M=S.st.M,Q0=QUEST67[S.origin.k]||QUEST67.tt;
 let h=`<div class="story"><h3>Mệnh truyện: ${Q0.t}</h3><p class="past" style="margin:0">Chính tuyến của kiếp này gồm ${c?c.max:6} chương: vào cung, ${c?c.na:3} chương của xuất thân (cách chương trước kết thúc quyết định chương sau), rồi ngôi Trung cung và kế vị. Kết cục nào cũng không chặn đường lên ngôi Hoàng hậu.</p></div>`;
 if(c&&c.past.length)h+=`<h3>Các chương đã qua</h3>`+rows67(c.past.map(x=>[`Chương ${x.n}`,`${msName67(x)} · <b class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</b>`]));
 if(c&&c.done)h+=rows67([["Kết cục xuất thân",c.fin,S.st.done===1?"g":"r"]]);
 const m=S.st.ms;if(m&&c){const d=MS67[m.id],st=d.steps(m);h+=`<h3>Chương ${c.n}/${c.max}: ${d.t()}</h3>`+rows67([["Mục tiêu",d.g()],["Các bước",steps67(st)],["Tiến độ",`Xong ${st.filter(x=>x[1]).length}/${st.length} bước`]])}
 else if(c&&c.all)h+=rows67([["Chính tuyến","Đã đi hết các chương","g"]]);
 else if(M)h+=`<h3>${lab67(M)}: ${ARC67[M.a].t}</h3>`+thRows67(M,row);
 const X=S.st.X||[];if(X.length)h+=`<h3>Phụ tuyến</h3>`+X.map(A=>`<h3>${ARC67[A.a].t} · ${lab67(A)}</h3>`+thRows67(A,row)).join("");
 else h+=`<p class="past">Phụ tuyến (người thân thất lạc, mật thư, hỏa hoạn, sứ thần...) có thể mở về sau.</p>`;
 return h}
(function(){const p0=renderPanel0;renderPanel0=function(){const r=p0.apply(this,arguments);try{if(tab==="story"&&v267()&&!(typeof isSrv==="function"&&isSrv())){const el=$("panel"),s=el.querySelector(".story");if(s&&!el.querySelector(".st67")){s.outerHTML=`<div class="st67">${panel67()}</div>`;kitFix(el)}}}catch(e){console.error(e)}return r}})();
if(typeof srvRoadHTML==="function")(function(){const r0=srvRoadHTML;srvRoadHTML=function(){const h=r0.apply(this,arguments);try{if(v267())return h+`<div class="st67">${panel67()}</div>`}catch(e){}return h}})();
/* ---------- shared outcome helpers (only existing systems) ---------- */
function e67heir(n){const s=son67();if(s){s.fond=cl((s.fond||0)+n,0,100);return `Hoàng thượng thương ${s.name} hơn (+${n}).`}apply({danh:3});return "Chưa có hoàng tử: Danh +3."}
function e67drop(v,why){if(!rvOk67(v)||v.queen||v.rank<=0)return"";v.rank=seatDown(v,v.rank-1);return `${v.name} ${why}, bị giáng xuống ${RANKS[v.rank].n}.`}
function e67ally(v,n){if(!rvOk67(v))return"";relAdd(S,v,n||30);return `${v.name} thành người một phe với ngươi (thiện cảm +${n||30}).`}
function e67foe(v,n){if(!rvOk67(v))return"";n=Math.round((n||15)/2);oanAdd(v,S,n);return `${v.name} oán ngươi thêm.`}
function e67pun(v,n){if(!rvOk67(v))return"";v.sung=Math.max(0,(v.sung||0)-n);return `${v.name}: Sủng -${n}.`}
function e67demote(){apply({sung:-4});return "Hoàng thượng lạnh nhạt thêm: Sủng -4."}
function e67bien(n){try{const T=trS();T.bien=cl(T.bien+n,0,100);return `Biên cương ${n>0?"+":""}${n}.`}catch(e){return""}}
function e67kho(n){try{const T=trS();T.kho=cl(T.kho+n,0,100);return `Kho lúa ${n>0?"+":""}${n}.`}catch(e){return""}}
function e67dad(n){try{const d=dad67();if(!d)return"";d.pow=cl((d.pow||50)+n,0,100);return `Thế lực nhà ${d.name} ${n>0?"+":""}${n}.`}catch(e){return""}}
/* ================= GENERIC COMPLICATIONS: any arc may list "G.<id>" in its complication pool; {sj} = the arc's subject ================= */
Object.assign(GB67,{
rumor:{h:"Lời đồn về {sj}",w:"maid",t:"{maid} hớt hải báo: khắp lục cung đang xì xào về {sj}, mỗi người thêm một câu.",o:[
 {n:"Bỏ bạc dập lời đồn",c:{bac:-40},wx:"lời đồn lắng xuống",sc:1,lx:"kẻ tung tin vẫn chưa lộ mặt",rt:"Bạc đến đâu, miệng khép đến đó."},
 {n:"Lần ra kẻ tung tin",c:{suc:-5},o:()=>35+S.mat*6+S.tamco/4,w:{mat:1},wx:"biết ai đứng sau",sc:1,l:{danh:-4},lx:"lời đồn to thêm",rt:"Ngươi lần ra đầu mối lời đồn.",rf:"Dò không ra, lời đồn lại thêm mắm muối."},
 {n:"Mặc kệ, giữ mình",c:{danh:-3},w:{duc:2},wx:"không ai bắt được lỗi ngươi",rt:"Ngươi im lặng, lời đồn tự nhạt dần."}]},
hh:{h:"Hoàng hậu hỏi đến {sj}",w:"hh",need:["hh"],t:"Hoàng hậu {hh} cho gọi ngươi đến Càn Ninh cung, chậm rãi hỏi về {sj}.",o:[
 {n:"Thành thật trình bày",c:{danh:-2},w:{hh:8},wx:"Hoàng hậu bớt nghi",lx:"Hoàng hậu biết thêm chuyện của ngươi",rt:"Hoàng hậu gật đầu, không làm khó ngươi."},
 {n:"Xin Hoàng hậu đứng ra che chở",c:{bac:-30},o:()=>40+S.hh/3,w:{hh:10},sc:1,wx:"có thêm chỗ dựa",l:{hh:-8},rt:"Hoàng hậu hứa sẽ nói giúp một câu.",rf:"Hoàng hậu lạnh nhạt: “Chuyện của muội, muội tự lo.”"},
 {n:"Khéo léo lảng sang chuyện khác",c:{suc:-3},o:()=>40+S.tamco/3,wx:"giữ kín chuyện của mình",sc:1,l:{hh:-10},rt:"Hoàng hậu không moi được gì.",rf:"Hoàng hậu nhận ra ngươi giấu giếm."}]},
th:{h:"Thái hậu để ý đến {sj}",w:"th",need:["th"],t:"Thái hậu gõ nhẹ chuỗi hạt: “Ai gia nghe nói về {sj}. {Goi} định thế nào?”",o:[
 {n:"Xin Thái hậu chỉ bảo",c:{danh:-2},w:{th:8},wx:"Thái hậu thấy ngươi biết điều",rt:"Thái hậu chỉ cho ngươi vài đường."},
 {n:"Thưa rằng đã có tính toán",c:{suc:-3},o:()=>40+S.tai/4+S.th/5,w:{th:4},sc:1,wx:"Thái hậu nể ngươi",l:{th:-8},rt:"Thái hậu khẽ cười: “Được, để ai gia xem.”",rf:"Thái hậu chau mày: “Tự cao.”"},
 {n:"Dâng lễ, khéo xin bà đừng nhúng tay",c:{bac:-40},w:{th:9},wx:"tự mình xoay xở",lx:"Thái hậu sẽ không đỡ ngươi chuyện này",rt:"Thái hậu nhận lễ, để ngươi tự lo."}]},
emp:{h:"Hoàng thượng hỏi thẳng về {sj}",w:"emp",t:"Đêm ấy Hoàng thượng đặt chén trà xuống: “Trẫm nghe về {sj}. {Goi} nói thật cho trẫm.”",o:[
 {n:"Nói thật hết",c:{sung:-3},w:{duc:3},sc:1,wx:"Hoàng thượng tin ngươi hơn",rt:"Hoàng thượng im lặng hồi lâu rồi nắm tay ngươi."},
 {n:"Nói nửa thật nửa che",c:{},o:()=>45+S.tamco/3+S.sung/6,w:{sung:4},wx:"qua được đêm nay",l:{sung:-6},lx:"ngài nghi ngươi",rt:"Hoàng thượng gật gù, không hỏi thêm.",rf:"Hoàng thượng nhíu mày: nàng có điều giấu trẫm."},
 {n:"Xin ngài đừng hỏi, để thiếp tự lo",c:{sung:-2},w:{tamco:2},wx:"giữ được thế chủ động",lx:"ngài phật ý đôi chút",rt:"Hoàng thượng thở dài, chiều theo ngươi."}]},
spy:{h:"Một kẻ gạ bán tin về {sj}",w:"eun",t:"Một thái giám Nội vụ phủ lén gặp ngươi sau giả sơn: hắn có tin về {sj}, giá không rẻ.",o:[
 {n:"Mua tin",c:{bac:-50},sc:1,wx:"có thêm manh mối thật",lx:"hắn cũng có thể bán tin của ngươi",rt:"Tin hắn bán là thật."},
 {n:"Ép hắn khai không công",c:{suc:-3},o:()=>30+S.tamco/3+S.mat*5,w:{mat:1},sc:1,wx:"có tin mà không tốn bạc",l:{danh:-3},lx:"hắn đi rêu rao",rt:"Hắn sợ, khai hết.",rf:"Hắn chuồn mất, còn đi kể khắp nơi."},
 {n:"Đuổi đi, tố với Tổng quản",c:{},w:{duc:3},wx:"Tổng quản ghi nhận",lx:"mất một nguồn tin",rt:"Tên thái giám bị phạt quỳ."}]},
ill:{h:"Lo nghĩ về {sj} làm ngươi sinh bệnh",w:"doc",t:"Lo nghĩ chuyện {sj}, ngươi trằn trọc nhiều đêm. Thái y bắt mạch, khuyên tĩnh dưỡng.",o:[
 {n:"Nghe lời, tĩnh dưỡng",c:{sung:-3},w:{suc:12},wx:"khỏe lại",lx:"việc phải gác lại ít lâu",rt:"Ngươi nghỉ ngơi, sắc mặt hồng hào trở lại."},
 {n:"Gắng gượng lo tiếp",c:{suc:-10},sc:1,wx:"không bỏ lỡ thời cơ",rt:"Ngươi cố sức, việc vẫn chạy."},
 {n:"Mời thái y giỏi, uống thuốc quý",c:{bac:-45},w:{suc:16},wx:"vừa khỏe vừa không lỡ việc",rt:"Thuốc quý hiệu nghiệm."}]},
rival:{h:"Một phi tần muốn lợi dụng {sj}",w:"v2",need:["v2"],t:"{v2} biết chuyện {sj}, cười nhạt trước mặt mọi người, như muốn nhân dịp này dẫm ngươi xuống.",o:[
 {n:"Nhịn, không để bị khích",c:{danh:-2},w:{duc:3},wx:"không cho nàng cớ",rt:"Ngươi chỉ mỉm cười cho qua."},
 {n:"Đáp trả sắc sảo",c:{},o:()=>40+S.tai/4+S.danh/5,w:{danh:4},wx:"nàng bẽ mặt",l:{danh:-4},lx:"{v2} oán ngươi",go:(A,ok)=>{const v=rv67(A,"v2");if(v)oanAdd(v,S,ok?10:6)},rt:"Cả phòng bật cười, {v2} đỏ mặt.",rf:"Lời ngươi vụng, {v2} càng đắc ý."},
 {n:"Kéo {v2} về phe mình",c:{bac:-40},o:()=>35+S.tamco/4+S.danh/5,sc:1,wx:"thêm người một phe",l:{},lx:"mất bạc vô ích",go:(A,ok)=>{const v=rv67(A,"v2");if(v&&ok)relAdd(S,v,20)},rt:"{v2} nhận quà, đổi giọng ngay.",rf:"{v2} nhận quà rồi vẫn nói xấu ngươi."}]},
gift:{h:"Có người mang quà đến nhờ vả về {sj}",w:"maid",t:"Một nhà quan sai người mang hộp ngọc đến, xin ngươi nói giúp một câu liên quan đến {sj}.",o:[
 {n:"Nhận quà, hứa giúp",c:{duc:-3},w:{bac:60},wx:"có thêm bạc",lx:"mang tiếng nhận hối lộ nếu lộ",rt:"Hộp ngọc vào kho riêng của ngươi."},
 {n:"Từ chối, trả lại quà",c:{bac:0,danh:0,suc:-2},w:{danh:3,duc:3},wx:"tiếng thanh liêm",lx:"nhà ấy phật ý",rt:"Lời từ chối lan ra, người khen ngươi thanh liêm."},
 {n:"Nhận quà, đổi lấy tin tức",c:{suc:-3},o:()=>40+S.tamco/3,w:{bac:30},sc:1,wx:"thêm manh mối",l:{danh:-4},rt:"Người kia kể hết những gì hắn biết.",rf:"Chuyện nhận quà bị kẻ khác bắt gặp."}]},
night:{h:"Hoàng thượng thấy ngươi có tâm sự",w:"emp",need:["nsrv"],t:"Hoàng thượng thấy ngươi ngồi lặng bên song cửa: “{Goi} đang nghĩ gì?”",o:[
 {n:"Kể ngài nghe về {sj}",c:{sung:-2},o:()=>45+S.sung/4,sc:1,w:{sung:3},wx:"ngài hứa để ý",l:{sung:-4},lx:"ngài thấy phiền",rt:"Hoàng thượng nghe chăm chú.",rf:"Hoàng thượng phẩy tay: “Chuyện hậu cung, {goi} tự lo.”"},
 {n:"Gượng cười, hầu ngài vui",c:{suc:-5},w:{sung:5},wx:"ngài vui",lx:"việc vẫn để đó",rt:"Đêm ấy Hoàng thượng rất vui."},
 {n:"Xin ngài một ân điển nhỏ",c:{sung:-4},w:{danh:3},sc:1,wx:"có thánh ý đứng sau",rt:"Hoàng thượng gật đầu ban ân."}]},
srv:{h:"Đồng liêu dò hỏi về {sj}",w:"maid",need:["srv"],t:"Mấy cung nữ cùng phòng vây lấy ngươi, tò mò hỏi về {sj}.",o:[
 {n:"Kể vài câu cho thân",c:{},o:()=>45+S.tamco/4,w:{danh:2},wx:"thêm người quen",sc:1,l:{tin:-5},lx:"chuyện đến tai chủ",rt:"Họ quý ngươi hơn.",rf:"Lời ngươi lọt đến tai chủ nhân."},
 {n:"Lắc đầu không nói",c:{danh:-1},w:{tin:3},wx:"chủ thấy ngươi kín miệng",rt:"Ngươi giữ kín, chủ nhân hài lòng."},
 {n:"Biếu bánh trái để họ thôi tò mò",c:{bac:-5},w:{danh:2},wx:"yên chuyện",rt:"Bánh trái làm mọi người quên chuyện."}]}
});
/* ================= TỂ TƯỚNG ================= */
ARC67.tt_co={o:"tt",t:"Quân cờ trong tay cha",w:"dad",sj:"thư từ giữa ngươi và phủ Tể tướng",g:"Cha ngươi, Tể tướng, coi ngươi là quân cờ cài bên long sàng. Mỗi bức thư nhà là một mệnh lệnh. Đi theo ván cờ của ông, hay tự cầm lấy quân cờ của mình.",
 p:[["s1","s2"],["c1","c2","c3","G.rumor","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Thư nhà của cha",w:"dad",t:"Thư của {dad}: “Thị lang Lại bộ còn trống. Con tìm lúc Hoàng thượng vui mà nhắc tên môn sinh của cha.”",o:[
  {n:"Làm theo lời cha",c:{sung:-3,hh:-5},wx:"cha tin ngươi",sc:1,f:"obey",lx:"Hoàng hậu thấy nhà ngươi vươn tay",rt:"Môn sinh của cha được bổ nhiệm."},
  {n:"Viện cớ thoái thác",c:{},w:{duc:3},wx:"giữ mình sạch",lx:"cha phật ý",f:"cold",rt:"Ngươi hồi thư khéo léo chối từ."},
  {n:"Nhắc tên người khác có tài hơn",c:{suc:-3},o:()=>40+S.tai/3,w:{danh:4},sc:1,f:"own",wx:"Hoàng thượng thấy ngươi biết người",l:{sung:-4},lx:"cha nổi giận",rt:"Người ngươi tiến cử được khen.",rf:"Hoàng thượng chê ngươi xen chuyện triều chính."}]},
 s2:{h:"Cha cài người vào cung ngươi",w:"dad",t:"Phủ Tể tướng gửi vào một cung nữ mới, nói là để hầu ngươi. Ai cũng hiểu: nàng là tai mắt của cha.",o:[
  {n:"Nhận, để cha yên tâm",c:{mat:-1},w:{bac:40},wx:"cha gửi kèm bạc",f:"obey",lx:"mọi việc của ngươi đến tai cha",rt:"Cung nữ mới ở lại, phủ Tể tướng gửi thêm bạc."},
  {n:"Nhận, rồi mua chuộc nàng",c:{bac:-40},o:()=>45+S.tamco/3,sc:1,f:"own",wx:"tai mắt của cha thành tai mắt của ngươi",l:{danh:-3},lx:"cha biết ngươi giở trò",rt:"Nàng thề trung với ngươi.",rf:"Nàng báo hết với cha."},
  {n:"Gửi trả về phủ",c:{},w:{duc:2,tamco:2},wx:"cung ngươi kín kẽ",f:"cold",lx:"cha giận",rt:"Cung nữ bị gửi trả về phủ."}]},
 c1:{h:"Cha muốn ngươi hạ một nhà đối đầu",w:"dad",need:["v"],t:"Cha viết: nhà của {v} cản đường ông ở triều. Ông muốn ngươi tìm lỗi của {v} trong cung.",o:[
  {n:"Tìm lỗi của {v}",c:{suc:-5},o:()=>40+S.mat*5+S.tamco/4,sc:1,f:"obey",wx:"cha hài lòng",l:{danh:-4},lx:"{v} biết ngươi rình nàng",go:(A,ok)=>{const v=rv67(A,"v");if(v){if(ok)return evA(S,v,1)?`Nắm được một lỗi thật của ${v.name}: chứng cứ +1.`:`${v.name} không có lỗi gì; ngươi chỉ biết ${harmTxt(v)}.`;else oanAdd(v,S,12)}},rt:"Ngươi cho người rình {v}.",rf:"{v} bắt gặp người của ngươi rình rập."},
  {n:"Báo cho {v} đề phòng",c:{},w:{duc:4},wx:"{v} mang ơn ngươi",lx:"cha mà biết sẽ giận",f:"own",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,20)},rt:"{v} lặng người, rồi khẽ cảm ơn."},
  {n:"Làm ngơ",c:{},w:{duc:1},wx:"không dính vào",lx:"cha thấy ngươi vô dụng",f:"cold",rt:"Ngươi để thư cha trong hộp, không hồi âm."}]},
 c2:{h:"Hoàng hậu hặc phủ Tể tướng",w:"hh",need:["hh"],t:"Họ ngoại của Hoàng hậu {hh} dâng sớ hặc cha ngươi kết bè. Cha nhắn: lo lót cho ông.",o:[
  {n:"Bỏ bạc lo lót",c:{bac:-60,hh:-8},sc:1,f:"obey",wx:"cha thoát nạn, nợ ngươi một lần",rt:"Sớ hặc bị gác lại."},
  {n:"Tự đến xin Hoàng hậu nương tay",c:{suc:-3},o:()=>35+S.hh/3+S.danh/6,w:{hh:8},sc:1,f:"own",wx:"Hoàng hậu nể ngươi",l:{hh:-6},rt:"Hoàng hậu cho người rút sớ.",rf:"Hoàng hậu cười lạnh, sớ vẫn dâng lên."},
  {n:"Đứng ngoài, giữ mình",c:{},w:{danh:2},wx:"không bị kéo vào",lx:"cha bị phạt bổng, hận ngươi",f:"cold",rt:"Cha bị phạt bổng ba tháng."}]},
 c3:{h:"Cha muốn đọc trộm tấu chương",w:"dad",need:["nsrv"],t:"Cha muốn biết Hoàng thượng phê gì về việc biên ải. Ông xin ngươi liếc qua tấu chương ở ngự thư phòng.",o:[
  {n:"Liếc trộm cho cha",c:{duc:-4},o:()=>45+S.tamco/3,sc:1,f:"obey",wx:"cha nắm thế ở triều",l:{sung:-8},lx:"bị Hoàng thượng bắt gặp",rt:"Ngươi nhớ được mấy dòng châu phê.",rf:"Hoàng thượng thấy ngươi đứng quá gần án thư."},
  {n:"Thưa thật với cha: không thể",c:{},w:{duc:3},wx:"giữ được lòng tin của Hoàng thượng",lx:"cha lạnh nhạt",f:"cold",rt:"Cha không hồi âm suốt một tháng."},
  {n:"Đưa tin giả cho cha thử lòng ông",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"own",wx:"biết cha định làm gì",l:{danh:-3},lx:"cha biết bị lừa",rt:"Cha vội vàng dâng sớ theo tin giả. Ngươi biết ông đang toan tính gì.",rf:"Cha nhận ra tin giả."}]},
 t1:{h:"Cha tính đường lui",w:"dad",t:"Tin từ phủ: cha đang lo đưa một em họ của ngươi vào kỳ tuyển tú tới, phòng khi ngươi không còn dùng được.",o:[
  {n:"Viết thư nhắc cha công lao của ngươi",c:{suc:-2},o:A=>40+(A.f.obey?20:0),sc:1,wx:"cha đổi ý",l:{danh:-2},lx:"cha vẫn đưa em họ vào",rt:"Cha gác lại việc em họ.",rf:"Cha vẫn cho em họ học lễ nghi."},
  {n:"Tự đứng vững, không cần cha",c:{bac:-30},w:{tamco:3},sc:1,f:"own",wx:"tự gây thế lực",rt:"Ngươi dùng bạc riêng nuôi tai mắt của mình."},
  {n:"Để mặc",c:{},w:{duc:2},wx:"không tốn gì",lx:"thêm một đối thủ trong nhà",rt:"Ngươi không đáp."}]},
 x1:{h:"Ván cờ lớn của cha",w:"dad",t:"Cha muốn ngươi khuyên Hoàng thượng giao Lại bộ cho ông nắm trọn. Được thì nhà ngươi nghiêng triều, mà mất thì cả nhà mất.",o:[
  {n:"Đặt điều kiện: cha theo ngươi, không phải ngươi theo cha",c:{suc:-5},o:A=>35+(A.f.own?15:0)+S.tamco/5,e:["win","lose"],rt:"Cha im lặng rất lâu rồi đồng ý.",rf:"Cha nổi giận, coi ngươi là con bất hiếu."},
  {n:"Khuyên Hoàng thượng như lời cha",c:{hh:-6},o:A=>40+(A.f.obey?15:0)+S.sung/6,e:["win","mid"],rt:"Hoàng thượng nghe theo.",rf:"Hoàng thượng chỉ cười, không đáp."},
  {n:"Từ chối, cắt đứt dây cờ",c:{bac:-40},w:{duc:5},e:"mid",lx:"mất chỗ dựa ở triều",rt:"Ngươi gửi trả thư cha, không mở."}]}},
 E:{win:{k:1,tag:"Tự cầm quân cờ",w:"dad",t:"Phủ Tể tướng giờ nghe theo ngươi. Cha dâng sớ nào cũng hỏi ý ngươi trước; bạc và người của nhà đứng sau lưng ngươi.",fx:{danh:8,bac:80,mat:1},go:()=>e67dad(10)},
  mid:{k:0,tag:"Cha con xa cách",t:"Ngươi giữ được mình, nhưng phủ Tể tướng không còn coi ngươi là chỗ trông cậy. Từ nay ngươi tự đi đường mình.",fx:{duc:4,tamco:2}},
  lose:{k:-1,tag:"Bị cha bỏ rơi",t:"Cha quay sang đặt cược vào em họ ngươi. Bạc nhà thôi gửi vào cung, người trong triều thôi nói giúp ngươi.",fx:{danh:-8,bac:-40},go:()=>e67dad(-8)}}};
ARC67.tt_oan={o:"tt",t:"Phủ Tể tướng mắc oan",w:"dad",sj:"vụ án tham ô của phủ Tể tướng",g:"Một bản sổ sách giả buộc tội cha ngươi tham ô ngân khố. Ông bị cấm túc chờ tra. Cứu cha, hay cứu lấy mình.",
 cast(A){castRv67(A,"v",v=>v.rank>=1);return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Tin dữ từ triều",w:"dad",t:"Hộ bộ trình lên sổ sách: phủ Tể tướng rút ba vạn lượng ngân khố. Cha ngươi bị cấm túc trong phủ chờ tra.",o:[
  {n:"Quỳ xin Hoàng thượng minh xét",c:{sung:-4},o:()=>40+S.sung/4,sc:1,wx:"ngài hứa xét kỹ",l:{sung:-4},lx:"ngài cho là ngươi xen vào",rt:"Hoàng thượng đỡ ngươi dậy, hứa xét kỹ.",rf:"Hoàng thượng lạnh lùng bảo ngươi lui."},
  {n:"Lặng lẽ cho người dò sổ sách",c:{bac:-40},sc:1,wx:"có người trong Hộ bộ",rt:"Một thư lại Hộ bộ nhận bạc của ngươi."},
  {n:"Giữ khoảng cách với phủ",c:{danh:-4},w:{duc:2},wx:"không bị liên lụy",lx:"cha cô độc",f:"far",rt:"Ngươi đóng cửa cung, không gặp ai."}]},
 s2:{h:"Thư cầu cứu của mẹ",w:"maid",t:"Mẹ ngươi lén gửi thư: “Cha con bị oan. Người hặc ông là nhà của {v}.”",need:["v"],o:[
  {n:"Đến gặp thẳng {v}",c:{suc:-3},o:()=>35+S.tamco/4+S.danh/6,sc:1,wx:"đọc được sắc mặt nàng",l:{danh:-3},lx:"{v} cảnh giác",rt:"{v} lỡ lời, để lộ nhà nàng đứng sau.",rf:"{v} kín như bưng, còn đi kể ngươi đến uy hiếp."},
  {n:"Gửi bạc cho mẹ lo liệu",c:{bac:-50},w:{duc:3},sc:1,wx:"mẹ thuê được thầy kiện",rt:"Mẹ ngươi mời được một thầy kiện giỏi."},
  {n:"Đốt thư, tránh liên lụy",c:{duc:-3},w:{tamco:2},wx:"không ai bắt được gì nơi ngươi",lx:"nhà ngươi càng đơn độc",f:"far",rt:"Thư thành tro."}]},
 c1:{h:"Một thư lại muốn làm chứng",w:"maid",t:"Một thư lại Hộ bộ nói hắn biết sổ bị sửa, nhưng sợ chết. Hắn xin bạc để đưa vợ con về quê trước.",o:[
  {n:"Cho bạc, giữ hắn làm chứng",c:{bac:-60},sc:1,f:"wit",wx:"có nhân chứng",lx:"hắn có thể bỏ trốn",rt:"Thư lại nhận bạc, hứa ra làm chứng."},
  {n:"Ép hắn viết lời khai ngay",c:{suc:-3},o:()=>40+S.tamco/3,sc:1,wx:"có lời khai trên giấy",l:{danh:-3},lx:"hắn sợ quá trốn mất",rt:"Hắn run tay viết lời khai.",rf:"Đêm đó hắn trốn khỏi kinh thành."},
  {n:"Không tin hắn",c:{},w:{tamco:1},wx:"không mắc bẫy",lx:"lỡ một nhân chứng",rt:"Ngươi cho hắn về."}]},
 c2:{h:"Nét chữ trong sổ",w:"maid",need:["nsrv"],t:"Ngươi xin được bản chép sổ sách. Nét chữ ở mấy trang cuối lạ hẳn những trang đầu.",o:[
  {n:"Tự đối chiếu nét chữ",c:{suc:-6},o:()=>30+S.tai/2+S.arts.thi*5,sc:2,wx:"chứng minh sổ bị sửa",l:{suc:-4},rt:"Nét chữ mấy trang cuối là của quản gia nhà {v}.",rf:"Ngươi đọc mỏi mắt mà không chắc được gì."},
  {n:"Nhờ Hàn lâm viện giám định",c:{bac:-40},o:()=>55,sc:1,wx:"lời giám định của Hàn lâm",l:{},lx:"tin lọt ra ngoài",rt:"Hàn lâm viện xác nhận có hai nét chữ.",rf:"Hàn lâm viện ngại dính vào, trả lại bản chép."},
  {n:"Giữ bản chép, chờ thời",c:{},w:{tamco:2},wx:"không lộ bài",lx:"cha chờ thêm",rt:"Ngươi cất bản chép thật kỹ."}]},
 c3:{h:"{v} giễu cợt",w:"v",need:["v"],t:"{v} ngồi giữa các phi tần, giọng ngọt như mật: “Tham ô ba vạn lượng, chẳng trách {goi} ăn mặc lộng lẫy thế.”",o:[
  {n:"Bình thản đáp lễ",c:{danh:-2},w:{duc:3},wx:"các phi tần nể ngươi",rt:"Ngươi chỉ cười: “Trời có mắt.”"},
  {n:"Vặn lại chuyện nhà nàng",c:{},o:()=>40+S.tai/4,w:{danh:4},sc:1,wx:"{v} lỡ lời trước mặt mọi người",l:{danh:-4},go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},lx:"{v} oán ngươi",rt:"{v} buột miệng nhắc đến quản gia nhà mình.",rf:"{v} gạt đi, cả phòng cười ngươi."},
  {n:"Bỏ về, đóng cửa cung",c:{danh:-3},w:{suc:5},wx:"tránh được lời qua tiếng lại",rt:"Ngươi về cung nghỉ."}]},
 t1:{h:"Kẻ thật sự đứng sau",w:"v",need:["v"],t:"Manh mối dẫn về quản gia nhà {v}. Nhưng nếu lật án, cả nhà nàng sẽ sụp đổ, và {v} sẽ là kẻ thù của ngươi suốt đời.",o:[
  {n:"Gom đủ chứng cứ, quyết lật",c:{suc:-4},sc:1,f:"hard",wx:"vào cao trào với đủ chứng cứ",lx:"{v} biết ngươi nhắm vào nhà nàng",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},rt:"Ngươi gom hết manh mối vào một tráp."},
  {n:"Gặp riêng {v}, đề nghị dàn xếp",c:{},o:()=>40+S.tamco/4,f:"deal",wx:"nhà nàng rút đơn, không ai mất mặt",l:{danh:-3},lx:"{v} từ chối, còn đề phòng",rt:"{v} cắn môi, đồng ý nói chuyện với cha nàng.",rf:"{v} cười khẩy, không nhận."}]},
 x1:{h:"Ngày tra án",w:"emp",t:"Hình bộ mở phiên tra án phủ Tể tướng. Đây là lúc lên tiếng.",o:[
  {n:"Dâng chứng cứ trước triều",c:{suc:-5},o:A=>30+(A.f.wit?12:0)+S.danh/6,e:["win","lose"],rt:"Chứng cứ trình lên, quản gia nhà {v} nhận tội.",rf:"Chứng cứ bị bác vì thiếu người làm chứng."},
  {n:"Theo lời dàn xếp, xin Hoàng thượng khoan hồng",if:A=>A.f.deal,c:{bac:-40},o:60,e:["mid","lose"],rt:"Đơn hặc được rút, cha ngươi được tha.",rf:"Nhà {v} trở mặt phút chót."},
  {n:"Xin cho cha cáo lão về quê",c:{danh:-4},w:{duc:3},e:"mid",lx:"phủ Tể tướng mất quyền (thế lực nhà -10)",rt:"Hoàng thượng chuẩn cho cha ngươi cáo lão."}]}},
 E:{win:{k:1,tag:"Rửa oan cho cha",w:"emp",t:"Cha ngươi được phục chức, Hoàng thượng ban khen ngươi hiếu thảo mà biết lẽ phải. Nhà {v} mất mặt cả triều.",fx:{danh:10,sung:4,th:4},go:A=>{const v=rv67(A,"v");return [e67dad(8),v?e67drop(v,"bị liên lụy vì nhà ngoại vu cáo"):""].join(" ")}},
  mid:{k:0,tag:"Cha thoát tội, nhà mất quyền",t:"Cha ngươi giữ được mạng và danh, nhưng rời triều. Từ nay ngươi không còn ai nói giúp trong triều, bù lại không ai còn nhắm vào ngươi vì cha.",fx:{duc:3,hh:5},go:()=>e67dad(-10)},
  lose:{k:-1,tag:"Cha bị giáng chức",t:"Cha ngươi bị giáng làm tri phủ xa xôi. Trong cung, người ta bắt đầu coi thường ngươi.",fx:{danh:-10,sung:-5},go:A=>[e67dad(-15),e67foe(rv67(A,"v"),10)].join(" ")}}};
ARC67.tt_tranh={o:"tt",t:"Phủ Tể tướng chia đôi",w:"dad",sj:"chuyện huynh trưởng ngả về phe khác",g:"Huynh trưởng của ngươi muốn phủ Tể tướng đứng sau một phi tần khác và con của nàng; cha thì muốn đứng sau ngươi. Nhà chia hai phe, mà người phân xử lại là ngươi.",
 cast(A){castRv67(A,"v",v=>v.rank>=2);return true},
 p:[["s1","s2"],["c1","c2","c3","G.rival","G.gift"],["t1"],["x1"]],
 B:{
 s1:{h:"Huynh trưởng gặp riêng {v}",w:"v",need:["v"],t:"Tai mắt báo: huynh trưởng ngươi lấy cớ đưa lễ vào cung, gặp riêng {v} ở Ngự hoa viên, bàn chuyện về sau.",o:[
  {n:"Viết thư hỏi thẳng huynh trưởng",c:{suc:-2},o:()=>45+S.danh/5,sc:1,wx:"huynh nói thật lòng",l:{danh:-2},lx:"huynh giận vì bị theo dõi",rt:"Huynh hồi thư: huynh chỉ lo nhà mình đặt cược sai.",rf:"Huynh trách ngươi cài người theo dõi."},
  {n:"Báo cho cha",c:{},w:{bac:30},wx:"cha đứng về phía ngươi",lx:"huynh trưởng thù ngươi",f:"dad",rt:"Cha nổi giận với huynh trưởng."},
  {n:"Lặng lẽ kết thân với {v}",c:{bac:-40},o:()=>40+S.tamco/4,sc:1,f:"v",wx:"biết nàng hứa gì với huynh",l:{},lx:"{v} đề phòng ngươi",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,15)},rt:"{v} cười nói thân mật, buột miệng kể chuyện huynh.",rf:"{v} khách sáo, chẳng nói gì."}]},
 s2:{h:"Gia yến chia phe",w:"dad",t:"Mừng thọ cha, gia yến chia làm hai bàn: một bàn theo huynh trưởng, một bàn theo cha. Cả nhà chờ xem ngươi gửi lễ cho ai trước.",o:[
  {n:"Gửi lễ cho cha trước",c:{bac:-30},w:{danh:2},f:"dad",wx:"cha yên lòng",lx:"huynh trưởng bẽ mặt",rt:"Cha nâng chén lễ vật của ngươi lên trước mặt cả họ."},
  {n:"Gửi hai phần lễ ngang nhau",c:{bac:-50},sc:1,w:{duc:3},wx:"cả hai phe nể ngươi",rt:"Cả nhà khen ngươi biết cư xử."},
  {n:"Gửi lễ cho huynh trưởng",c:{bac:-30},o:45,sc:1,f:"bro",wx:"huynh chịu ngồi nói chuyện",l:{danh:-3},lx:"cha phật lòng",rt:"Huynh trưởng xúc động, viết thư cảm tạ.",rf:"Cha giận, huynh cũng chẳng tin ngươi."}]},
 c1:{h:"Huynh trưởng đòi chia gia sản",w:"dad",t:"Huynh trưởng đòi chia một nửa ruộng đất của phủ để tự lập môn hộ, kéo theo nửa số môn sinh.",o:[
  {n:"Khuyên cha chia cho êm",c:{bac:-20},w:{duc:3},sc:1,wx:"nhà tránh được đổ vỡ",lx:"thế lực của phủ yếu đi (thế lực nhà -4)",go:()=>e67dad(-4),rt:"Cha nghe ngươi, chia ruộng cho huynh."},
  {n:"Khuyên cha giữ chặt",c:{},o:()=>45+S.tamco/4,w:{bac:40},wx:"phủ giữ nguyên thế lực",l:{danh:-3},lx:"huynh trưởng ly gián",f:"dad",rt:"Huynh trưởng đành lùi bước.",rf:"Huynh trưởng bỏ đi, kéo theo nhiều môn sinh."},
  {n:"Đứng ngoài",c:{danh:-2},w:{suc:3},wx:"không ai trách được ngươi",rt:"Ngươi im lặng."}]},
 c2:{h:"Con của {v} được đem ra làm cớ",w:"v",need:["v"],t:"Huynh trưởng muốn phủ dâng sớ khen hoàng tự của {v} thông minh, mở đường cho nàng. Cha hỏi ngươi nên ngăn hay không.",o:[
  {n:"Ngăn sớ ấy lại",c:{suc:-3},o:()=>45+S.danh/5,w:{danh:3},f:"dad",wx:"phủ không đứng sau {v}",l:{},lx:"{v} oán ngươi",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"Sớ khen bị gác.",rf:"Sớ vẫn được dâng lên."},
  {n:"Để sớ đi, đổi lấy ơn của {v}",c:{danh:-2},sc:1,f:"v",wx:"{v} mang ơn ngươi",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,15)},rt:"{v} gửi lễ tạ ơn."},
  {n:"Đề nghị phủ khen cả con ngươi",need:["kid"],if:()=>!!son67(),c:{bac:-30},w:{},wx:"{k} được Hoàng thượng để ý",go:()=>e67heir(6),rt:"Sớ khen cả hai hoàng tự."}]},
 c3:{h:"Môn sinh của cha lung lay",w:"dad",t:"Nửa số môn sinh của cha đang do dự, chờ xem phe nào thắng.",o:[
  {n:"Gửi quà giữ chân họ",c:{bac:-50},sc:1,wx:"môn sinh ở lại",rt:"Môn sinh nhận quà, ở lại với cha."},
  {n:"Xin Hoàng thượng thăng cho một người",need:["nsrv"],c:{sung:-4},o:()=>40+S.sung/4,sc:1,wx:"cả đám thấy ngươi có tiếng nói",l:{sung:-3},rt:"Một môn sinh được thăng, cả đám quay về.",rf:"Hoàng thượng không chuẩn."},
  {n:"Mặc họ đi",c:{},w:{duc:2},wx:"không tốn bạc",lx:"phủ yếu đi (thế lực nhà -4)",go:()=>e67dad(-4),rt:"Vài môn sinh bỏ sang phe huynh trưởng."}]},
 t1:{h:"Huynh trưởng sa cơ",w:"dad",t:"Huynh trưởng bị Ngự sử hặc vì một món nợ cờ bạc. Đây là lúc giúp, hoặc buông.",o:[
  {n:"Âm thầm trả nợ cho huynh",c:{bac:-60},sc:1,f:"bro",wx:"huynh mang ơn ngươi",rt:"Huynh trưởng biết ai đã cứu mình."},
  {n:"Để huynh chịu phạt",c:{duc:-2},w:{tamco:2},f:"dad",wx:"phe huynh tan rã",lx:"huynh hận ngươi",rt:"Huynh trưởng bị phạt bổng một năm."}]},
 x1:{h:"Ngày cả họ quyết phe",w:"dad",t:"Cha gọi cả họ về từ đường. Phủ Tể tướng sẽ đứng sau ai, hôm nay phải định.",o:[
  {n:"Đứng ra hòa giải cha và huynh",c:{suc:-5},o:A=>35+(A.f.bro?15:0)+S.tai/6,e:["win","mid"],rt:"Cha và huynh trưởng cùng nâng chén.",rf:"Hai bên vẫn không nhường nhau."},
  {n:"Ép huynh trưởng phải theo cha",c:{},o:A=>45+(A.f.dad?15:0),e:["win","lose"],rt:"Huynh trưởng cúi đầu.",rf:"Huynh trưởng tách hẳn ra, đem nửa phủ theo {v}."},
  {n:"Thôi, để họ tự quyết",c:{danh:-3},w:{duc:3},e:"mid",lx:"phủ chia đôi (thế lực nhà -6)",rt:"Ngươi không về từ đường."}]}},
 E:{win:{k:1,tag:"Cả họ một lòng",t:"Phủ Tể tướng hợp lại, một lòng đứng sau ngươi. Môn sinh trong triều lên tiếng mỗi khi tên ngươi được nhắc.",fx:{danh:8,bac:60},go:()=>[e67dad(8),e67heir(5)].join(" ")},
  mid:{k:0,tag:"Nhà chia hai, ngươi đứng giữa",t:"Phủ chia làm hai, mỗi phe giữ một nửa. Không ai hết lòng với ngươi, cũng không ai chống ngươi.",fx:{duc:3},go:()=>e67dad(-6)},
  lose:{k:-1,tag:"Huynh trưởng theo phe đối thủ",t:"Huynh trưởng đem nửa phủ đứng sau {v}. Tên ngươi bị nhắc đến như kẻ chia rẽ gia đình.",fx:{danh:-8,bac:-30},go:A=>{const v=rv67(A,"v");return [e67dad(-10),v?`${v.name} có thêm chỗ dựa trong triều.`:""].join(" ")}}}};
ARC67.tt_mat={o:"tt",t:"Mật ước với Hoàng hậu",w:"hh",sj:"mật ước giữa cha và Hoàng hậu",ok:()=>qOn(),g:"Ngươi tình cờ biết: cha đã ngầm kết minh với Hoàng hậu. Cái giá của mật ước ấy có thể chính là ngươi. Tìm ra cha hứa gì, rồi quyết dùng hay phá nó.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Hộp thư bị đánh tráo",w:"maid",t:"{maid} nhặt được trong lễ vật của phủ Tể tướng một mảnh thư mang dấu ấn Càn Ninh cung. Nét chữ là của cha.",o:[
  {n:"Đọc kỹ, chép lại",c:{suc:-3},sc:1,wx:"nắm được một phần mật ước",lx:"ngươi đã biết, không thể giả như chưa biết",rt:"Thư nói đến ‘việc trong cung, xin nương nương yên tâm’."},
  {n:"Gửi trả nguyên vẹn",c:{},w:{duc:3},wx:"không ai biết ngươi đã đọc",lx:"mất manh mối",rt:"Thư được gói lại như cũ."},
  {n:"Dò hỏi người đưa lễ",c:{bac:-30},o:()=>45+S.mat*5,sc:1,wx:"biết ai mang thư",l:{},lx:"người đưa lễ báo lại cha",rt:"Người đưa lễ khai: thư đi lại đã ba tháng.",rf:"Người đưa lễ chối, rồi báo với cha."}]},
 s2:{h:"Hoàng hậu bỗng tốt với ngươi",w:"hh",t:"Hoàng hậu {hh} bỗng ban cho ngươi một đôi vòng ngọc, còn mời ngươi ngồi gần trong yến. Cả cung lạ lùng.",o:[
  {n:"Đáp lễ, tỏ ra thân thiết",gi:["vongngoc","hh"],c:{bac:-30},w:{hh:10},wx:"Hoàng hậu thân hơn",lx:"phi tần khác cho là ngươi theo phe Hoàng hậu",rt:"Hoàng hậu cười hài lòng."},
  {n:"Nhận lễ, lựa lời dò ý",gi:["vongngoc","hh"],c:{suc:-3},o:()=>40+S.tamco/3,sc:1,wx:"biết Hoàng hậu muốn gì",l:{hh:-5},rt:"Hoàng hậu lỡ lời: ‘Cha muội là người biết điều.’",rf:"Hoàng hậu cảnh giác."},
  {n:"Khéo từ chối lễ",c:{hh:-5},w:{duc:2,tamco:2},wx:"không mắc nợ ai",rt:"Ngươi xin không dám nhận."}]},
 c1:{h:"Cha hứa gì với Hoàng hậu",w:"dad",t:"Cha gặp ngươi trong ngày thăm thân. Ông nói vòng vo, nhưng ngươi đoán: ông hứa giữ ngươi không tranh ngôi Trung cung, đổi lấy ghế Lại bộ.",o:[
  {n:"Hỏi thẳng cha",c:{suc:-2},o:()=>40+S.danh/5,sc:1,wx:"cha nói thật",l:{danh:-3},lx:"cha giận ngươi hỗn",rt:"Cha thú nhận, mặt đầy áy náy.",rf:"Cha quát ngươi im."},
  {n:"Giả như không biết",c:{},w:{tamco:3},wx:"cha không đề phòng",lx:"không biết hết điều khoản",rt:"Cha yên tâm ra về."},
  {n:"Nói với cha: ngươi muốn chính ghế ấy",c:{},o:45,f:"dad",wx:"cha nghĩ lại",l:{bac:-30},lx:"cha cắt bạc",rt:"Cha nhìn ngươi rất lâu: ‘Con lớn thật rồi.’",rf:"Cha giận dữ cắt bạc tiêu vặt."}]},
 c2:{h:"Hoàng hậu thử lòng",w:"hh",t:"Hoàng hậu {hh} sai ngươi chép kinh cầu tự cho nàng, ngụ ý ngươi là người của nàng.",o:[
  {n:"Chép kinh tận tâm",c:{suc:-6},w:{hh:8,duc:2},sc:1,f:"hh",wx:"Hoàng hậu tin ngươi",rt:"Hoàng hậu cầm kinh, khẽ gật đầu."},
  {n:"Chép qua loa",c:{hh:-6},w:{suc:3},wx:"đỡ mệt",lx:"Hoàng hậu nghi",rt:"Hoàng hậu nhìn nét chữ, không nói gì."},
  {n:"Nhân dịp vào Càn Ninh cung dò xét",c:{suc:-4},o:()=>35+S.mat*6+S.tamco/4,sc:1,wx:"thêm chứng cứ về mật ước",l:{hh:-8},lx:"bị bắt gặp",rt:"Ngươi thấy thư của cha trong ngăn kéo.",rf:"Cung nữ của Hoàng hậu bắt gặp ngươi."}]},
 c3:{h:"Phi tần khác ngửi thấy mùi",w:"v",need:["v"],t:"{v} chặn ngươi ở hành lang: “{Xung} nghe nói {goi} và Hoàng hậu thân lắm. Có chuyện gì {xung} nên biết chăng?”",o:[
  {n:"Lấp liếm",c:{},o:()=>45+S.tamco/4,w:{tamco:1},wx:"giữ kín",l:{danh:-3},lx:"tin đồn lan",rt:"{v} bỏ đi, không nghi.",rf:"{v} đi rêu rao ngươi theo phe Hoàng hậu."},
  {n:"Kéo {v} làm đồng minh phòng khi trở mặt",c:{bac:-40},sc:1,wx:"có thêm đường lui",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,15)},rt:"{v} nhận lời, cười tươi."},
  {n:"Cảnh cáo {v} đừng xen vào",c:{},w:{tamco:2},wx:"{v} lùi lại",lx:"{v} oán ngươi",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"{v} tái mặt lui đi."}]},
 t1:{h:"Mật ước rạn nứt",w:"hh",t:"Ghế Lại bộ đã về tay người khác. Cha thấy bị Hoàng hậu lừa, nhắn vào cung: ‘Tùy con quyết.’",o:[
  {n:"Âm thầm giữ chứng cứ mật ước",c:{suc:-3},sc:1,f:"ev",wx:"có trong tay thư từ",lx:"nếu lộ, cha cũng liên lụy",rt:"Ngươi cất mấy bức thư vào hộp gấm."},
  {n:"Gặp Hoàng hậu nói chuyện",c:{},o:()=>40+S.hh/4,f:"hh",wx:"Hoàng hậu muốn giữ mật ước",l:{hh:-6},rt:"Hoàng hậu hứa bù cho cha ghế khác.",rf:"Hoàng hậu phủi tay."}]},
 x1:{h:"Dùng hay phá mật ước",w:"hh",t:"Mật ước giờ nằm trong tay ngươi. Một lời của ngươi có thể khiến Hoàng hậu nợ ngươi, hoặc khiến Hoàng thượng nghi nàng kết bè với ngoại thần.",o:[
  {n:"Giữ mật ước, đòi Hoàng hậu che chở ngươi",c:{suc:-3},o:A=>40+(A.f.hh?20:0)+S.hh/5,e:["win","mid"],rt:"Hoàng hậu cắn răng nhận lời.",rf:"Hoàng hậu không chịu ràng buộc."},
  {n:"Trình thư lên Hoàng thượng",c:{hh:-15},o:A=>30+(A.f.ev?20:0)+S.sung/6,e:["win2","lose"],rt:"Hoàng thượng nổi giận với họ ngoại của Hoàng hậu.",rf:"Hoàng thượng cho là ngươi vu cáo, cả cha cũng bị trách."},
  {n:"Đốt hết, đứng ngoài",c:{},w:{duc:4},e:"mid",lx:"bỏ lỡ thời cơ (thế lực nhà -8)",rt:"Lửa liếm sạch mấy bức thư."}]}},
 E:{win:{k:1,tag:"Hoàng hậu nợ ngươi",w:"hh",t:"Hoàng hậu {hh} buộc phải che chở ngươi. Nàng không còn cản bước ngươi, còn nói tốt cho ngươi trước Thái hậu.",fx:{hh:25,th:5,danh:4}},
  win2:{k:1,tag:"Lật mật ước, Trung cung lung lay",w:"emp",t:"Hoàng thượng trách Hoàng hậu kết bè với ngoại thần, tước quyền quản lục cung của nàng một thời gian. Ngươi được ngài tin là người trung thực.",fx:{sung:6,danh:8,hh:-20},go:()=>{const q=rivals[0];if(q&&q.queen){evStory(q,2,"kết bè với ngoại thần");return `Chứng cứ về Hoàng hậu ${q.name} +2.`}return""}},
  mid:{k:0,tag:"Mật ước chìm xuống",t:"Không ai nhắc lại mật ước. Cha giữ được mình, Hoàng hậu thôi để ý ngươi.",fx:{duc:3,hh:5}},
  lose:{k:-1,tag:"Bị coi là vu cáo",w:"emp",t:"Hoàng thượng cho rằng ngươi vu cáo Trung cung. Cha bị trách, ngươi bị lạnh nhạt.",fx:{sung:-8,danh:-6,hh:-10},go:()=>e67dad(-8)}}};
/* ================= ĐẠI TƯỚNG QUÂN ================= */
ARC67.dtq_bien={o:"dtq",t:"Khói lửa Nhạn Môn",w:"emp",sj:"trận chiến ở Nhạn Môn quan",g:"Giặc phương Bắc tràn qua Nhạn Môn quan. Cha ngươi cầm quân, mà lương thảo, viện binh, lòng vua đều ở trong cung. Thắng bại ngoài ải là vinh nhục của ngươi.",
 p:[["s1","s2"],["c1","c2","c3","G.night","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Quân báo khẩn",w:"emp",t:"Quân báo tám trăm dặm: giặc vây Nhạn Môn. Hoàng thượng mất ngủ, cả cung nín thở. Cha ngươi xin thêm lương thảo.",o:[
  {n:"Bán trang sức góp quân lương",c:{bac:-60},w:{danh:5},sc:1,wx:"lính biên ải biết ơn",rt:"Tin con gái Đại tướng quân bán trang sức lan khắp kinh thành."},
  {n:"Khuyên Hoàng thượng thúc Hộ bộ",need:["nsrv"],c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"lương thảo đi sớm",l:{sung:-3},lx:"ngài cho là ngươi xen chính sự",rt:"Hộ bộ phải xuất kho ngay trong đêm.",rf:"Hoàng thượng gạt đi."},
  {n:"Cầu an cho cha ở Phụng Tiên điện",c:{suc:-4},w:{duc:3,th:3},wx:"Thái hậu khen hiếu thảo",lx:"lương thảo vẫn chậm",rt:"Thái hậu thấy ngươi quỳ suốt đêm."}]},
 s2:{h:"Thư riêng của cha",w:"maid",t:"Một thân binh đưa thư riêng của cha: quân thiếu áo rét, ngựa chết vì tuyết, mà Binh bộ cứ ỉm đi.",o:[
  {n:"Trình thư lên Hoàng thượng",need:["nsrv"],c:{},o:()=>45+S.sung/5,sc:1,wx:"ngài biết sự thật",l:{sung:-4},lx:"Binh bộ thù cha",rt:"Hoàng thượng nổi giận với Binh bộ.",rf:"Hoàng thượng nghi cha ngươi kêu khổ để đòi quyền."},
  {n:"Tự may áo rét gửi ra",c:{bac:-50,suc:-4},w:{danh:4},sc:1,wx:"quân sĩ ấm lòng",rt:"Ba trăm tấm áo bông lên đường."},
  {n:"Giữ thư, chờ thời",c:{},w:{tamco:2},wx:"không gây thù",lx:"quân ngoài ải chịu rét",rt:"Ngươi cất thư."}]},
 c1:{h:"Binh bộ giữ lương",w:"emp",t:"Lương thảo đến chậm: Binh bộ thượng thư giữ lại một nửa, nói đường tuyết khó đi.",o:[
  {n:"Tìm chứng cứ Binh bộ ăn bớt",c:{bac:-30,suc:-3},o:()=>35+S.mat*6,sc:2,wx:"vạch được kẻ ăn bớt",l:{},lx:"Binh bộ biết ngươi dò",rt:"Sổ xuất kho lệch hẳn sổ nhận ở biên.",rf:"Không moi được gì."},
  {n:"Nhờ Thái hậu nói giúp",need:["th"],c:{bac:-30},o:()=>40+S.th/3,sc:1,wx:"Thái hậu ép Binh bộ",l:{th:-5},rt:"Thái hậu nói một câu, lương đi ngay.",rf:"Thái hậu không muốn xen việc binh."},
  {n:"Im lặng",c:{},w:{duc:1},wx:"không đụng chạm",lx:"cha thiếu lương (Biên cương -3)",go:()=>e67bien(-3),rt:"Lương vẫn chậm."}]},
 c2:{h:"Một phi tần nói cha ngươi giữ binh",w:"v",need:["v"],t:"{v} buông lời trong yến: “Đại tướng quân thắng mãi không về, e là thích làm vua một cõi.”",o:[
  {n:"Đáp: cha ta đổ máu cho xã tắc",c:{},o:()=>45+S.danh/5,w:{danh:4},wx:"cả yến im phăng phắc",l:{danh:-3},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"Hoàng thượng gật đầu khen ngươi.",rf:"Lời ngươi gắt quá, Hoàng thượng chau mày."},
  {n:"Cười cho qua, ghi nhớ",c:{danh:-2},w:{tamco:2},wx:"không để bị khích",rt:"Ngươi nâng chén, như không nghe."},
  {n:"Nhờ người dò nhà {v} vì sao nói vậy",c:{bac:-30},sc:1,wx:"biết nhà nàng có giao tình với Binh bộ",rt:"Cha {v} là thông gia của Binh bộ thượng thư."}]},
 c3:{h:"Thư của một phó tướng",w:"maid",t:"Một phó tướng của cha bí mật gửi thư: ông muốn mở cửa ải cho địch đổi lấy vàng, và hỏi ngươi có muốn cùng làm giàu.",o:[
  {n:"Báo ngay cho cha",c:{suc:-2},sc:2,wx:"cha diệt nội gián",lx:"phó tướng có đồng đảng trong kinh",rt:"Cha chém phó tướng trước quân."},
  {n:"Giữ thư làm chứng, báo Binh bộ",c:{},o:45,sc:1,wx:"có chứng cứ trong tay",l:{danh:-3},lx:"Binh bộ ỉm đi",rt:"Thư được lưu ở Binh bộ.",rf:"Binh bộ bảo thư giả."},
  {n:"Đốt thư, coi như không thấy",c:{duc:-2},w:{tamco:1},wx:"không dính vào",lx:"nội gián còn đó (Biên cương -4)",go:()=>e67bien(-4),rt:"Thư thành tro."}]},
 t1:{h:"Tin cha bị thương",w:"emp",t:"Tin về: cha trúng tên, quân tâm lung lay. Hoàng thượng định cử một tướng trẻ ra thay.",o:[
  {n:"Xin ngài cho cha giữ quân",c:{sung:-4},o:()=>40+S.sung/4,sc:1,wx:"cha giữ được ấn",l:{sung:-3},rt:"Hoàng thượng chuẩn.",rf:"Hoàng thượng vẫn cử tướng trẻ."},
  {n:"Gửi Thái y giỏi nhất ra biên",c:{bac:-60},sc:1,wx:"cha mau lành",rt:"Thái y đi trong đêm."}]},
 x1:{h:"Trận quyết chiến",w:"emp",t:"Quân báo: cha ngươi định mở trận quyết chiến trước mùa tuyết. Hoàng thượng hỏi ngươi: nên đánh hay nên giữ?",o:[
  {n:"Tâu: nên đánh",c:{suc:-3},o:A=>35+S.danh/8,e:["win","lose"],rt:"Đại quân phá giặc ở Nhạn Môn.",rf:"Trận đánh thất bại, quân lui về sau ải."},
  {n:"Tâu: nên giữ ải chờ xuân",c:{},w:{duc:2},e:"mid",lx:"chiến công nhỏ",rt:"Quân giữ ải qua mùa đông."},
  {n:"Tâu: nên cầu hòa có điều kiện",c:{sung:-2},o:()=>45+S.tai/5,e:["mid","lose"],rt:"Giặc nhận hòa, trả lại hai châu.",rf:"Giặc lật lọng, đánh úp."}]}},
 E:{win:{k:1,tag:"Cha thắng trận Nhạn Môn",w:"emp",t:"Khải hoàn. Hoàng thượng ban cho cha ngươi tước Quốc công, nhắc đến ngươi là ‘con gái nhà trung liệt’.",fx:{danh:10,sung:6,th:4},go:()=>[e67bien(12),e67dad(8)].join(" ")},
  mid:{k:0,tag:"Biên cương tạm yên",t:"Không thắng lớn, không thua đau. Biên ải yên một mùa, nhà ngươi giữ được vị thế.",fx:{danh:3},go:()=>e67bien(4)},
  lose:{k:-1,tag:"Cha bại trận",w:"emp",t:"Cha ngươi bại trận, bị triệu về kinh chịu tội. Trong cung, người ta tránh mặt ngươi.",fx:{danh:-8,sung:-6},go:()=>[e67bien(-10),e67dad(-10)].join(" ")}}};
ARC67.dtq_vu={o:"dtq",t:"Bức thư mưu phản",w:"emp",sj:"lời tố cha ngươi mưu phản",g:"Một bức thư giả nét chữ cha ngươi, hẹn với giặc chia đôi giang sơn, được trình lên ngự án. Tìm ra kẻ làm giả trước khi cha bị triệu về chịu tội.",
 cast(A){castRv67(A,"v",v=>v.rank>=1);return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Bức thư trên ngự án",w:"emp",t:"Hoàng thượng ném bức thư xuống trước mặt ngươi: “Nét chữ của cha nàng. Nàng giải thích đi.”",o:[
  {n:"Xin xem kỹ nét chữ",c:{suc:-3},o:()=>40+S.tai/3,sc:1,wx:"thấy chỗ giả",l:{sung:-4},rt:"Chữ ‘quốc’ viết thiếu nét, cha ngươi chưa bao giờ viết vậy.",rf:"Ngươi không nhìn ra gì, Hoàng thượng càng nghi."},
  {n:"Quỳ thề lấy mạng bảo đảm",c:{suc:-5},w:{sung:2,duc:3},wx:"ngài cho thêm thời gian",lx:"nếu sai, ngươi liên lụy",rt:"Hoàng thượng cho ba tháng tra xét."},
  {n:"Lặng im, xin ngài xét",c:{sung:-2},w:{tamco:2},wx:"không lỡ lời",rt:"Hoàng thượng phẩy tay cho lui."}]},
 s2:{h:"Kẻ mang thư bị bắt",w:"maid",t:"Tên lính mang thư bị giam ở Hình bộ. Nghe nói hắn sắp ‘chết bệnh’.",o:[
  {n:"Cho người giữ mạng hắn",c:{bac:-50},sc:1,f:"wit",wx:"giữ được nhân chứng",rt:"Hắn sống sót qua đêm."},
  {n:"Đến Hình bộ hỏi cung",need:["nsrv"],c:{suc:-4},o:()=>35+S.tamco/3,sc:1,wx:"hắn khai ai sai",l:{danh:-3},lx:"bị chê xen việc ngoài",rt:"Hắn khai một cái tên: người nhà của {v}.",rf:"Hắn sợ quá không dám khai."},
  {n:"Mặc kệ",c:{},w:{tamco:1},wx:"không dính vào",lx:"mất nhân chứng",rt:"Ba hôm sau hắn chết trong ngục."}]},
 c1:{h:"Ấn tín bị làm giả",w:"maid",t:"Dấu ấn trên thư giống hệt ấn của cha. Ngoài cha, chỉ thợ khắc ấn ở Công bộ từng giữ khuôn.",o:[
  {n:"Tìm thợ khắc ấn",c:{bac:-40,suc:-3},o:()=>40+S.mat*5,sc:2,wx:"có lời khai thợ khắc",l:{},lx:"thợ khắc đã trốn",rt:"Thợ khắc khai bị ép khắc lại khuôn.",rf:"Thợ khắc đã bỏ trốn."},
  {n:"Xin Hoàng thượng so ấn",need:["nsrv"],c:{sung:-3},o:50,sc:1,wx:"thấy ấn khác viền",l:{sung:-3},rt:"Viền ấn giả dày hơn một ly.",rf:"Hai ấn giống nhau quá, không phân được."}]},
 c2:{h:"{v} nhanh nhảu",w:"v",need:["v"],t:"{v} tình nguyện chép lại thư để ‘giúp Hoàng thượng đối chiếu’. Ngươi thấy mắt nàng sáng lạ.",o:[
  {n:"Xin chính ngươi chép thay",c:{suc:-3},o:()=>45+S.tai/4,sc:1,wx:"chặn tay nàng",l:{},lx:"{v} để ý ngươi",rt:"{v} hơi tái mặt.",rf:"Hoàng thượng vẫn giao cho {v}."},
  {n:"Để nàng chép, theo dõi bản chép",c:{bac:-20},sc:1,wx:"bắt được bản chép sửa chữ",rt:"Bản chép của {v} cố ý viết giống nét cha ngươi."},
  {n:"Không để ý",c:{},w:{suc:2},wx:"đỡ phiền",lx:"lỡ một manh mối",rt:"Ngươi không bận lòng."}]},
 c3:{h:"Quân của cha xôn xao",w:"maid",t:"Tin cha bị nghi lan ra biên ải. Tướng sĩ đòi dâng vạn danh thư bảo lãnh, có kẻ còn đòi kéo quân về kinh.",o:[
  {n:"Viết thư can cha giữ quân yên",c:{suc:-2},sc:1,w:{duc:3},wx:"Hoàng thượng thấy nhà ngươi trung",rt:"Quân sĩ yên lặng giữ ải."},
  {n:"Để vạn danh thư dâng lên",c:{},o:50,w:{danh:4},wx:"thanh thế của cha",l:{sung:-6},lx:"Hoàng thượng thấy cha được lòng quân quá",rt:"Vạn danh thư làm Hoàng thượng cảm động.",rf:"Hoàng thượng càng sợ binh quyền của cha."}]},
 t1:{h:"Kẻ chủ mưu lộ diện",w:"v",need:["v"],t:"Mọi manh mối dẫn về nhà {v}: cha nàng muốn thay cha ngươi cầm quân.",o:[
  {n:"Gom hết chứng cứ",c:{suc:-3},sc:1,f:"ev",wx:"vào phiên xử với chứng cứ đầy đủ",lx:"{v} biết",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},rt:"Ngươi xếp chứng cứ vào một tráp."},
  {n:"Đe {v}: rút đơn hay mất hết",c:{},o:()=>35+S.tamco/3,f:"deal",wx:"nhà nàng tự rút",l:{danh:-3},lx:"{v} cắn ngược",rt:"{v} run giọng xin ngươi tha.",rf:"{v} cười nhạt, không sợ."}]},
 x1:{h:"Phiên xử",w:"emp",t:"Hạn tra xét đã hết. Hoàng thượng triệu ngươi và các đại thần vào Cần Chính điện.",o:[
  {n:"Trình chứng cứ, vạch kẻ làm giả",c:{suc:-4},o:A=>30+(A.f.wit?12:0)+(A.f.ev?8:0),e:["win","lose"],rt:"Kẻ làm giả thư cúi đầu nhận tội.",rf:"Chứng cứ không đủ, cha bị tạm tước ấn."},
  {n:"Nhận dàn xếp: nhà {v} rút đơn",if:A=>A.f.deal,c:{},o:65,e:["mid","lose"],rt:"Đơn tố được rút, không ai bị trị tội.",rf:"Nhà {v} trở mặt phút chót."},
  {n:"Xin cha tự giao binh phù để tỏ lòng",c:{danh:-4},w:{duc:4},e:"mid",lx:"cha mất binh quyền (thế lực nhà -10)",rt:"Cha giao binh phù, Hoàng thượng yên lòng."}]}},
 E:{win:{k:1,tag:"Rửa oan cho cha",w:"emp",t:"Thư giả bị vạch trần. Cha ngươi được ban ngự tửu, ngươi được khen là con hiếu. Kẻ chủ mưu mất chức.",fx:{danh:10,sung:5},go:A=>{const v=rv67(A,"v");return [e67dad(8),v?e67drop(v,"liên lụy vì cha làm giả thư"):""].join(" ")}},
  mid:{k:0,tag:"Cha giữ mạng, mất binh quyền",t:"Cha ngươi về kinh làm nhàn quan. Nhà ngươi không còn binh quyền, nhưng Hoàng thượng thôi nghi kỵ.",fx:{duc:3,sung:2},go:()=>e67dad(-10)},
  lose:{k:-1,tag:"Cha bị tước ấn",w:"emp",t:"Cha ngươi bị tước ấn, giam lỏng trong phủ chờ xét. Ngươi bị lạnh nhạt, nhưng chưa ai dám động đến ngươi.",fx:{danh:-10,sung:-6},go:()=>e67dad(-15)}}};
ARC67.dtq_binh={o:"dtq",t:"Binh phù và long ngai",w:"emp",sj:"chuyện binh quyền của cha",g:"Hoàng thượng muốn thu binh quyền của cha ngươi mà không mang tiếng bạc đãi công thần. Cha thì không muốn buông. Ngươi đứng giữa vua và cha.",
 p:[["s1","s2"],["c1","c2","c3","G.emp","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Một câu hỏi nửa đùa",w:"emp",t:"Hoàng thượng nghịch tóc ngươi, hỏi như đùa: “Cha nàng giữ ba mươi vạn quân, có mỏi tay không?”",o:[
  {n:"Đáp: cha chỉ giữ hộ bệ hạ",c:{},o:()=>45+S.tamco/4,w:{sung:4},sc:1,wx:"ngài yên lòng",l:{sung:-4},lx:"ngài thấy ngươi trơn tru",rt:"Hoàng thượng bật cười.",rf:"Hoàng thượng không cười."},
  {n:"Thưa thật: cha già rồi, cũng muốn nghỉ",c:{danh:-2},w:{sung:3},f:"king",wx:"ngài thấy ngươi đứng về phía ngài",lx:"cha mà biết sẽ trách",rt:"Hoàng thượng nhìn ngươi khác hẳn."},
  {n:"Lảng sang chuyện khác",c:{},w:{suc:2},wx:"không hứa gì",lx:"ngài vẫn nghi",rt:"Ngươi rót trà, nói chuyện hoa lan."}]},
 s2:{h:"Thư cha dặn",w:"maid",t:"Thư cha: “Có kẻ khuyên Hoàng thượng thu binh. Con dò xem ai, và đừng để ngài đổi tướng.”",o:[
  {n:"Dò xem ai khuyên ngài",c:{bac:-30},o:()=>40+S.mat*6,sc:1,wx:"biết ai đứng sau",l:{},lx:"lộ việc dò la",rt:"Là Hàn lâm học sĩ, ông sợ tướng mạnh hơn vua.",rf:"Không dò được."},
  {n:"Hồi thư khuyên cha tự lui",c:{},w:{duc:3},f:"king",wx:"mở đường lui êm",lx:"cha giận",rt:"Cha không hồi âm."},
  {n:"Hứa với cha sẽ giữ",c:{},w:{bac:40},f:"dad",wx:"cha gửi bạc vào cung",lx:"Hoàng thượng mà biết sẽ nghi",rt:"Cha gửi kèm bạc."}]},
 c1:{h:"Một tướng trẻ được trọng dụng",w:"emp",t:"Hoàng thượng thăng một tướng trẻ họ Lục làm phó soái, ai cũng biết là để thay cha.",o:[
  {n:"Kết giao với nhà tướng trẻ",c:{bac:-40},sc:1,wx:"đường lui cho nhà ngươi",rt:"Mẹ tướng trẻ cảm tạ ngươi."},
  {n:"Tìm lỗi của tướng trẻ",c:{suc:-3},o:()=>35+S.mat*5,f:"dad",wx:"cha giữ được chỗ",l:{sung:-4},lx:"Hoàng thượng thấy ngươi chống ý ngài",rt:"Tướng trẻ bị phát hiện từng thua trận giấu báo.",rf:"Hoàng thượng biết ngươi bới lông tìm vết."},
  {n:"Chúc mừng tướng trẻ trước mặt vua",c:{danh:-2},w:{sung:3},f:"king",wx:"ngài thấy ngươi rộng lượng",rt:"Hoàng thượng khẽ gật."}]},
 c2:{h:"Đại thần đòi thu binh",w:"emp",t:"Triều đình dâng liên danh sớ: tướng giữ binh quá mười năm, nên đổi.",o:[
  {n:"Nhờ Thái hậu nói đỡ",need:["th"],c:{bac:-30},o:()=>40+S.th/3,f:"dad",wx:"sớ bị gác",l:{th:-5},rt:"Thái hậu bảo: công thần không nên phụ.",rf:"Thái hậu đứng ngoài."},
  {n:"Đề nghị một lối giữa: chia quân",c:{suc:-3},o:()=>40+S.tai/4,sc:2,wx:"cả vua lẫn cha giữ thể diện",l:{},lx:"không bên nào ưng",rt:"Hoàng thượng khen kế hay.",rf:"Kế bị chê là lơ lửng."}]},
 c3:{h:"Cha muốn về kinh dự yến",w:"dad",t:"Cha xin về kinh dự Vạn thọ tiết, kèm ba nghìn thân binh. Trong triều xôn xao.",o:[
  {n:"Khuyên cha về một mình",c:{},sc:1,w:{duc:3},f:"king",wx:"Hoàng thượng yên lòng",lx:"cha thấy ngươi nghe lời vua hơn",rt:"Cha về kinh chỉ với mười người."},
  {n:"Để cha mang thân binh",c:{},o:40,w:{danh:3},f:"dad",wx:"thanh thế nhà ngươi",l:{sung:-8},lx:"Hoàng thượng sợ",rt:"Thân binh đóng ngoài thành, không ai dám nói gì.",rf:"Hoàng thượng cho cấm quân canh suốt đêm."}]},
 t1:{h:"Đêm Vạn thọ",w:"emp",t:"Trong yến Vạn thọ, Hoàng thượng nâng chén mời cha ngươi, ánh mắt như dò hỏi.",o:[
  {n:"Đỡ lời cha, nói cha muốn về vườn",c:{},o:A=>45+(A.f.king?15:0),sc:1,wx:"mở đường cho cha",l:{danh:-3},rt:"Cha ngươi lặng người rồi nâng chén.",rf:"Cha trừng mắt nhìn ngươi."},
  {n:"Im lặng, để cha tự đáp",c:{},w:{tamco:2},wx:"không gánh trách nhiệm",lx:"cha đáp vụng",rt:"Cha chỉ nói ‘thần già rồi’."}]},
 x1:{h:"Binh phù",w:"emp",t:"Hoàng thượng triệu ngươi: “Trẫm muốn cha {goi} giao binh phù. {Goi} giúp trẫm, hay giúp cha?”",o:[
  {n:"Thuyết phục cha giao binh phù, đổi lấy tước vị",c:{suc:-4},o:A=>40+(A.f.king?15:0)+S.danh/8,e:["win","mid"],rt:"Cha giao binh phù, được phong Quốc công.",rf:"Cha giao binh phù nhưng lòng không vui."},
  {n:"Xin ngài để cha giữ binh",c:{sung:-3},o:A=>30+(A.f.dad?15:0)+S.sung/6,e:["win2","lose"],rt:"Hoàng thượng ngẫm nghĩ, cho cha giữ quân thêm.",rf:"Hoàng thượng nổi giận, tước binh quyền của cha."},
  {n:"Thưa: việc nước, thiếp không dám bàn",c:{sung:-2},w:{duc:3},e:"mid",lx:"cả hai bên thất vọng",rt:"Hoàng thượng thở dài."}]}},
 E:{win:{k:1,tag:"Binh phù đổi tước Quốc công",w:"emp",t:"Cha ngươi giao binh phù, được phong Quốc công, ăn lộc vạn hộ. Hoàng thượng coi ngươi là người hiểu lòng ngài nhất.",fx:{sung:8,danh:8,th:4}},
  win2:{k:1,tag:"Cha giữ binh, vua vẫn tin",t:"Cha ngươi giữ ba mươi vạn quân, Hoàng thượng vẫn tin. Thế nhà ngươi vững như núi.",fx:{danh:8,bac:60},go:()=>e67dad(10)},
  mid:{k:0,tag:"Cha về vườn",t:"Cha ngươi giao binh phù về quê. Nhà ngươi không còn binh quyền, nhưng cũng không còn bị nghi.",fx:{duc:3,sung:2},go:()=>e67dad(-8)},
  lose:{k:-1,tag:"Bị tước binh quyền",w:"emp",t:"Cha ngươi bị tước binh quyền trong cơn giận của Hoàng thượng. Ngươi bị lạnh nhạt một thời gian.",fx:{sung:-8,danh:-6},go:()=>e67dad(-12)}}};
ARC67.dtq_huynh={o:"dtq",t:"Người anh nơi đất giặc",w:"maid",sj:"chuyện huynh trưởng bị bắt",g:"Huynh trưởng của ngươi, một tướng trẻ, bị giặc bắt trong một trận phục kích. Giặc đòi chuộc, triều đình đòi giữ thể diện. Cứu anh mà không làm nhục nước.",
 p:[["s1","s2"],["c1","c2","c3","G.night","G.gift"],["t1"],["x1"]],
 B:{
 s1:{h:"Tin dữ ngoài ải",w:"maid",t:"Thư cha run nét: huynh trưởng ngươi bị giặc bắt sống ở Hắc Thủy. Giặc đòi ba vạn lượng và hai châu.",o:[
  {n:"Quỳ xin Hoàng thượng cứu huynh",need:["nsrv"],c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"ngài hứa tìm cách",l:{sung:-3},lx:"ngài bực vì chuyện nhà xen việc nước",rt:"Hoàng thượng an ủi ngươi.",rf:"Hoàng thượng nói: không chuộc tù binh."},
  {n:"Tự gom bạc chuộc",c:{bac:-60},sc:1,wx:"có bạc chuộc riêng",lx:"triều đình có thể cấm",rt:"Ngươi gom được một phần tiền chuộc."},
  {n:"Viết thư an ủi cha",c:{suc:-2},w:{duc:3},wx:"cha bình tâm",lx:"huynh vẫn trong tay giặc",rt:"Cha hồi thư: sẽ tự lo."}]},
 s2:{h:"Sứ giặc vào kinh",w:"emp",t:"Sứ giặc vào kinh, mang theo cây trâm huynh ngươi khắc tên ngươi làm tin.",o:[
  {n:"Xin gặp riêng sứ giặc",need:["nsrv"],c:{suc:-3},o:()=>35+S.tamco/3,sc:1,wx:"biết huynh còn khỏe",l:{danh:-4},lx:"bị đồn tư thông với giặc",rt:"Sứ giặc nói huynh ngươi được đối đãi tử tế.",rf:"Có người thấy ngươi gặp sứ giặc."},
  {n:"Nhờ Lễ bộ dò ý sứ",c:{bac:-30},sc:1,wx:"biết giặc thật ra cần gì",rt:"Giặc cần muối và trà hơn đất."},
  {n:"Tránh mặt sứ giặc",c:{},w:{duc:2},wx:"giữ tiếng",lx:"mất dịp dò tin",rt:"Ngươi đóng cửa cung."}]},
 c1:{h:"Triều đình bàn chuyện chuộc",w:"emp",t:"Triều đình chia hai: kẻ đòi chuộc, kẻ đòi đánh. Cha phe đánh lại là thông gia của {v}.",need:["v"],o:[
  {n:"Vận động phe chuộc",c:{bac:-40},sc:1,wx:"thêm người nói giúp",lx:"phe đánh thù",rt:"Mấy đại thần đổi ý."},
  {n:"Xin {v} khuyên cha nàng",c:{},o:()=>35+S.danh/5,sc:1,wx:"phe đánh yếu đi",l:{danh:-2},lx:"{v} khinh ngươi",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,10)},rt:"{v} gật đầu.",rf:"{v} bảo đó là việc nước."}]},
 c2:{h:"Kế đổi tù binh",w:"maid",t:"Một hoàng thân của giặc đang bị giam ở Hình bộ. Đổi người lấy người, có thể được.",o:[
  {n:"Dâng kế đổi tù binh",need:["nsrv"],c:{},o:()=>40+S.tai/4,sc:2,wx:"triều đình có lối ra đẹp",l:{sung:-3},rt:"Hoàng thượng khen kế hay.",rf:"Hoàng thượng chê đàn bà bàn việc binh."},
  {n:"Nhờ cha dâng kế",c:{bac:-20},sc:1,wx:"kế đến tai vua mà ngươi không lộ",rt:"Kế được bàn ở triều."}]},
 c3:{h:"Tin đồn huynh hàng giặc",w:"v",need:["v"],t:"{v} thì thầm khắp nơi: huynh ngươi đã hàng giặc, đang uống rượu cùng chúa giặc.",o:[
  {n:"Lấy thư của huynh bác lời đồn",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:3},wx:"lời đồn tắt",l:{danh:-3},rt:"Thư huynh viết bằng máu, ai cũng lặng.",rf:"Không ai tin thư."},
  {n:"Mặc kệ",c:{danh:-3},w:{duc:2},wx:"không vướng vào",rt:"Lời đồn rồi cũng nhạt."}]},
 t1:{h:"Huynh trốn thoát?",w:"maid",t:"Mật báo: có một đường mòn để cứu huynh ra trong đêm, nhưng phải mua chuộc lính gác giặc.",o:[
  {n:"Bỏ bạc mua đường cứu",c:{bac:-60},o:45,sc:2,f:"esc",wx:"huynh có thể về sớm",l:{},lx:"mất bạc nếu hỏng",rt:"Lính gác nhận bạc.",rf:"Lính gác nuốt bạc rồi trở mặt."},
  {n:"Chờ triều đình",c:{},w:{duc:2},wx:"không mạo hiểm",lx:"huynh chờ thêm",rt:"Ngươi chờ."}]},
 x1:{h:"Ngày quyết định",w:"emp",t:"Hoàng thượng phải quyết: chuộc, đổi, hay đánh.",o:[
  {n:"Khuyên đổi tù binh",c:{suc:-3},o:A=>40+S.tai/6,e:["win","mid"],rt:"Huynh ngươi trở về trong tiếng trống.",rf:"Giặc đòi thêm, chuyện kéo dài."},
  {n:"Khuyên đánh úp cứu người",c:{},o:A=>30+(A.f.esc?20:0),e:["win2","lose"],rt:"Kỵ binh đột kích, cứu huynh ra.",rf:"Trận đánh úp thất bại, huynh bị đưa đi xa hơn."},
  {n:"Lặng im, để triều đình quyết",c:{danh:-2},w:{duc:3},e:"mid",lx:"phó mặc số phận huynh",rt:"Ngươi chỉ cầu nguyện."}]}},
 E:{win:{k:1,tag:"Đón huynh về",w:"emp",t:"Huynh ngươi về kinh, không mất một tấc đất. Hoàng thượng khen ngươi trí tuệ; nhà ngươi được lòng cả triều.",fx:{danh:8,sung:5,th:4}},
  win2:{k:1,tag:"Huynh lập công trở về",t:"Huynh ngươi được cứu, còn dẫn đường cho kỵ binh phá trại giặc. Nhà ngươi thêm một tướng tài.",fx:{danh:10,sung:3},go:()=>[e67bien(8),e67dad(5)].join(" ")},
  mid:{k:0,tag:"Huynh về muộn",t:"Sau hai năm thương lượng, huynh ngươi được thả, gầy rộc. Nhà ngươi trả giá đắt nhưng giữ được người.",fx:{bac:-40,duc:3}},
  lose:{k:-1,tag:"Huynh bị đày lên bắc",t:"Huynh ngươi bị giặc giải lên tận bắc mạc. Nhà ngươi mất một tướng, cha ngươi già đi trông thấy.",fx:{danh:-6,sung:-4},go:()=>[e67bien(-5),e67dad(-8)].join(" ")}}};
/* ================= NHÀ BUÔN MUỐI ================= */
ARC67.muoi_tuoc={o:"muoi",t:"Mua tước cho cha",w:"th",sj:"chuyện xin tước cho nhà buôn muối",g:"Nhà buôn muối giàu mà bị khinh. Cha muốn một tước vị để con cháu ngẩng đầu. Bạc thì có, thứ thiếu là người chịu nói giúp.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.gift"],["t1"],["x1"]],
 B:{
 s1:{h:"Cha gửi bạc vào cung",w:"maid",t:"Cha gửi vào ba trăm lượng kèm lời nhắn: “Con lo cho cha một chữ tước. Bạc không thiếu.”",o:[
  {n:"Dâng bạc vào quốc khố cứu tế",c:{bac:-80},w:{danh:5,th:3},sc:1,wx:"tiếng thơm cho nhà",rt:"Hộ bộ ghi tên nhà ngươi vào sổ nghĩa quyên."},
  {n:"Giữ bạc, nuôi người trong cung",c:{duc:-2},w:{bac:60,mat:1},wx:"có thêm bạc và tai mắt",lx:"cha thấy ngươi giữ cho mình",rt:"Bạc vào kho riêng của ngươi."},
  {n:"Viết thư khuyên cha chờ",c:{},w:{duc:2},wx:"không vội mất bạc",lx:"cha sốt ruột",rt:"Cha hồi thư, giọng không vui."}]},
 s2:{h:"Lời chê mùi muối",w:"v",need:["v"],t:"{v} che mũi khi ngươi đi qua: “Mùi muối mặn quá, ai mở cửa sổ giùm.” Cả phòng cười.",o:[
  {n:"Tặng {v} hũ muối hoa thượng hạng",c:{bac:-20},o:()=>45+S.tamco/4,w:{danh:3},wx:"biến lời chê thành câu chuyện hay",l:{danh:-3},rt:"Thái hậu nghe chuyện, bật cười khen ngươi khéo.",rf:"{v} hất hũ muối, ngươi bẽ mặt."},
  {n:"Lặng im",c:{danh:-2},w:{duc:3},wx:"không ai bắt được lỗi",rt:"Ngươi im lặng."},
  {n:"Đáp thẳng",c:{},o:40,w:{danh:3},wx:"{v} cụt hứng",l:{danh:-4},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"Không ai cười nữa.",rf:"Lời ngươi thô, cả phòng cười to hơn."}]},
 c1:{h:"Thái hậu sửa chùa",w:"th",need:["th"],t:"Thái hậu muốn trùng tu chùa Hộ Quốc, Hộ bộ than thiếu bạc.",o:[
  {n:"Xin nhà ngươi gánh hết",c:{bac:-100},w:{th:12},sc:2,wx:"Thái hậu nhớ ơn",rt:"Thái hậu gọi ngươi là ‘đứa có lòng’."},
  {n:"Góp một phần",c:{bac:-40},w:{th:5},sc:1,wx:"Thái hậu ghi nhận",rt:"Tên ngươi được khắc ở bia chùa."},
  {n:"Không góp",c:{th:-3},w:{bac:0,suc:2},wx:"giữ bạc",rt:"Thái hậu không nói gì."}]},
 c2:{h:"Quan Lễ bộ đòi lễ",w:"maid",t:"Một quan Lễ bộ hứa ‘lo’ chuyện phong tước, xin trước năm trăm lượng.",o:[
  {n:"Đưa bạc",c:{bac:-60},o:40,sc:2,wx:"có người trong Lễ bộ",l:{},lx:"bị lừa",rt:"Quan Lễ bộ dâng sớ nhắc tên cha.",rf:"Quan Lễ bộ ôm bạc rồi cáo bệnh."},
  {n:"Từ chối, tố hắn",c:{},o:50,w:{danh:4,duc:2},wx:"tiếng ngay thẳng",l:{},lx:"Lễ bộ ghét ngươi",sf:-1,rt:"Hắn bị phạt bổng.",rf:"Lễ bộ bao che, còn làm khó việc của cha."}]},
 c3:{h:"Muối lậu của nhà khác",w:"maid",t:"Một nhà buôn muối khác bị bắt buôn lậu, có kẻ muốn kéo tên nhà ngươi vào.",o:[
  {n:"Đưa sổ sách sạch của nhà ra",c:{bac:-20},sc:1,wx:"nhà ngươi trong sạch",rt:"Hộ bộ xác nhận nhà ngươi nộp thuế đủ."},
  {n:"Mặc kệ",c:{danh:-4},w:{suc:2},wx:"không tốn công",rt:"Lời đồn bám theo tên nhà ngươi một thời gian."}]},
 t1:{h:"Một tước hư hay một tước thật",w:"th",t:"Có lời nhắn từ Đức Thọ cung: Thái hậu có thể xin cho cha ngươi tước ‘Nghĩa thương’, một hư hàm. Muốn tước thật thì phải chờ, và phải hơn thế.",o:[
  {n:"Nhận hư hàm, đỡ phiền",c:{},w:{danh:4},f:"small",wx:"có ngay một danh hiệu",lx:"tước nhỏ",rt:"Cha ngươi mừng rơi nước mắt."},
  {n:"Xin chờ tước thật",c:{bac:-30},sc:1,wx:"nhắm cao hơn",lx:"có thể trắng tay",rt:"Thái hậu khẽ cười: ‘Tham vọng không nhỏ.’"}]},
 x1:{h:"Thánh chỉ phong tước",w:"emp",t:"Triều nghị chuyện phong tước cho nhà ngươi. Có kẻ phản đối: ‘Con buôn sao đứng hàng sĩ phu?’",o:[
  {n:"Xin Thái hậu nói giúp",need:["th"],c:{suc:-3},o:A=>30+S.th/3+S.danh/6,e:["win","mid"],rt:"Thái hậu một lời, triều đình im bặt.",rf:"Thái hậu nói giúp, nhưng chỉ được hư hàm."},
  {n:"Dâng thêm một vạn thạch thóc cứu đói",c:{bac:-120},o:A=>45+S.danh/6,e:["win","lose"],rt:"Thóc đến các châu đói, triều đình hết lời chê.",rf:"Thóc bị ăn bớt dọc đường, tiếng không đến tai vua."},
  {n:"Nhận tước hư như đã có",if:A=>A.f.small,c:{},w:{duc:2},e:"mid",lx:"không có tước thật",rt:"Ngươi không đòi thêm."}]}},
 E:{win:{k:1,tag:"Nhà được phong tước",w:"emp",t:"Cha ngươi được phong tước Tử. Nhà buôn muối thành nhà có tước, không ai còn dám chê ngươi mùi muối.",fx:{danh:12,th:5}},
  mid:{k:0,tag:"Được một hư hàm",t:"Cha ngươi có một hư hàm, treo biển trước cửa. Không nhiều, nhưng đủ để ngươi bớt bị chê.",fx:{danh:4}},
  lose:{k:-1,tag:"Mất bạc, mất mặt",t:"Bạc tiêu như nước mà tước không thấy. Các phi tần lấy chuyện này làm trò cười.",fx:{danh:-8,bac:-30}}}};
ARC67.muoi_lau={o:"muoi",t:"Thuyền muối đêm",w:"maid",sj:"vụ thuyền muối lậu của nhà",g:"Thuyền muối của nhà ngươi bị bắt ở bến Giang Khẩu, trong khoang có muối lậu. Cha nói bị hãm hại, quan nói bắt quả tang. Sự thật ở đâu, ngươi phải tự tìm.",
 cast(A){castRv67(A,"v");return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Thuyền bị bắt",w:"maid",t:"Tin nhà: ba thuyền muối bị bắt, quản sự bị giam. Cha khóc: ‘Có kẻ giấu muối lậu vào khoang.’",o:[
  {n:"Tin cha, gửi bạc lo kiện",c:{bac:-50},sc:1,wx:"nhà có thầy kiện",rt:"Thầy kiện xin được xem khoang thuyền."},
  {n:"Dò xem cha có thật bị oan",c:{bac:-30},o:()=>40+S.mat*6,f:"truth",wx:"biết sự thật",l:{},lx:"không dò được",rt:"Muối lậu là của một quản sự tham, cha không biết.",rf:"Không ai chịu nói."},
  {n:"Giữ khoảng cách",c:{danh:-3},w:{duc:2},wx:"không bị liên lụy",lx:"nhà ngươi cô độc",rt:"Ngươi không hồi thư."}]},
 s2:{h:"Hộ bộ nhắm vào nhà ngươi",w:"emp",t:"Hộ bộ dâng sớ: nhà buôn muối của phi tần trong cung coi thường phép nước, xin nghiêm trị.",o:[
  {n:"Tâu xin minh xét",need:["nsrv"],c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"ngài cho tra kỹ",l:{sung:-3},rt:"Hoàng thượng hạ chỉ tra kỹ.",rf:"Hoàng thượng bảo ngươi đừng xen vào."},
  {n:"Chủ động xin phạt nhà mình",c:{bac:-60},w:{duc:4,danh:3},wx:"tiếng công minh",lx:"nhà mất một khoản",rt:"Cả triều bất ngờ, khen ngươi biết phép."}]},
 c1:{h:"Quản sự gian",w:"maid",t:"Một quản sự cũ của nhà ngươi khai: muối lậu do người của {v} thuê hắn giấu.",need:["v"],o:[
  {n:"Giữ hắn làm chứng",c:{bac:-40},sc:2,f:"wit",wx:"có nhân chứng",lx:"hắn có thể đổi lời",rt:"Hắn được giấu ở một quán trọ."},
  {n:"Bắt hắn viết lời khai rồi thả",c:{},o:45,sc:1,wx:"có lời khai",l:{},lx:"hắn trốn",rt:"Lời khai có dấu tay.",rf:"Hắn trốn trước khi điểm chỉ."}]},
 c2:{h:"Thuyền muối thứ tư",w:"maid",t:"Còn một thuyền chưa bị khám. Nếu khám ra cũng có muối lậu, nhà ngươi khó cãi.",o:[
  {n:"Cho người kiểm khoang trước",c:{bac:-30},o:55,sc:1,wx:"bắt được kẻ giấu muối tại trận",l:{danh:-3},lx:"bị nghi phi tang",rt:"Người của ngươi bắt được kẻ lén khiêng muối lậu xuống.",rf:"Người của ngươi bị quan bến bắt gặp."},
  {n:"Để quan khám",c:{},w:{duc:2},wx:"không ai nói ngươi phi tang",lx:"phó mặc may rủi",rt:"Thuyền thứ tư sạch."}]},
 c3:{h:"{v} ra vẻ thương cảm",w:"v",need:["v"],t:"{v} đến thăm, giọng thương cảm: ‘{Goi} có cần {xung} nói giúp với Hộ bộ không?’",o:[
  {n:"Cảm ơn, nhận lời",c:{},o:40,sc:1,wx:"nàng có thể thật lòng",l:{danh:-3},lx:"rơi vào bẫy",rt:"{v} giữ lời, nói giúp thật.",rf:"{v} quay đi kể ngươi đã nhận tội."},
  {n:"Khéo từ chối, để ý nàng",lx:"{v} biết ngươi đề phòng nàng",c:{},w:{tamco:3},sc:1,wx:"nhận ra nàng dò ý",rt:"{v} cụt hứng ra về."}]},
 t1:{h:"Đường dây lộ ra",w:"maid",t:"Đường dây muối lậu thật dẫn đến một quan Hộ bộ. Lật hắn ra thì cha sạch, nhưng Hộ bộ sẽ là kẻ thù lâu dài.",o:[
  {n:"Lật đến cùng",c:{suc:-3},sc:1,f:"hard",wx:"vào phiên xử với đủ chứng cứ",lx:"Hộ bộ ghét nhà ngươi",rt:"Ngươi chép lại đường dây."},
  {n:"Đổi im lặng lấy việc thả thuyền",c:{},o:55,f:"deal",wx:"nhà thoát nạn êm",l:{bac:-30},rt:"Quan Hộ bộ đồng ý thả thuyền.",rf:"Hắn nuốt lời, ngươi mất bạc."}]},
 x1:{h:"Xử án muối lậu",w:"emp",t:"Án muối lậu đem ra xử. Cha ngươi quỳ ở Hình bộ, đầu bạc trắng.",o:[
  {n:"Đưa nhân chứng, vạch kẻ hãm hại",c:{suc:-4},o:A=>30+(A.f.wit?15:0)+(A.f.truth?8:0),e:["win","lose"],rt:"Kẻ hãm hại cúi đầu nhận tội.",rf:"Nhân chứng đổi lời, án nghiêng về nhà ngươi."},
  {n:"Nộp phạt thay cha, xin tha",c:{bac:-100},w:{duc:3},e:"mid",lx:"nhà mất của",rt:"Cha được tha, nhà mất một nửa gia sản."},
  {n:"Theo dàn xếp đã có",if:A=>A.f.deal,c:{},o:65,e:["mid","lose"],rt:"Án được xử nhẹ.",rf:"Bên kia trở mặt."}]}},
 E:{win:{k:1,tag:"Nhà sạch án muối",w:"emp",t:"Nhà ngươi được minh oan, còn được giao làm đầu mối muối quan. Bạc vào như nước.",fx:{danh:8,bac:120},go:A=>{const v=rv67(A,"v");return v&&A.f.wit?e67drop(v,"liên lụy vì người nhà buôn lậu"):""}},
  mid:{k:0,tag:"Mất của, giữ người",t:"Cha giữ được mạng, nhà mất một nửa gia sản. Bạc trong cung của ngươi ít đi, nhưng tiếng thì giữ được.",fx:{duc:3}},
  lose:{k:-1,tag:"Nhà mang tiếng buôn lậu",t:"Nhà ngươi bị phạt nặng, tiếng buôn lậu theo ngươi vào tận cung.",fx:{danh:-10,bac:-60}}}};
ARC67.muoi_doi={o:"muoi",t:"Năm đói ở Giang Nam",w:"emp",sj:"chuyện kho thóc của nhà",g:"Giang Nam mất mùa, giá gạo lên gấp ba. Kho nhà ngươi đầy thóc. Cha muốn bán giá cao; dân thì đang chết đói, và cả triều đang nhìn.",
 p:[["s1","s2"],["c1","c2","c3","G.rumor","G.night"],["t1"],["x1"]],
 B:{
 s1:{h:"Thư cha về kho thóc",w:"maid",t:"Thư cha: “Gạo lên giá, nhà ta trúng lớn. Con đừng lo, bạc sẽ gửi vào cung gấp đôi.”",o:[
  {n:"Khuyên cha mở kho bán giá cũ",c:{bac:-40},w:{danh:4,duc:3},sc:1,f:"good",wx:"dân Giang Nam biết ơn",lx:"cha mất lãi",rt:"Cha càu nhàu, nhưng mở kho."},
  {n:"Nhận bạc gấp đôi",c:{danh:-3,duc:-3},w:{bac:120},wx:"bạc đầy kho",lx:"tiếng đầu cơ",f:"greed",rt:"Bạc vào kho riêng."},
  {n:"Im lặng chờ xem",c:{},w:{tamco:2},wx:"chưa đặt cược",lx:"giá vẫn lên",rt:"Ngươi chưa hồi thư."}]},
 s2:{h:"Dân đói kéo về kinh",w:"emp",t:"Dân đói kéo về ngoài cửa thành. Hoàng thượng mất ngủ, Hộ bộ than kho trống.",o:[
  {n:"Lập lều cháo bằng bạc riêng",c:{bac:-60,suc:-3},w:{danh:6},sc:1,f:"good",wx:"tiếng nhân từ (Kho lúa +3)",go:()=>e67kho(3),rt:"Lều cháo mang tên ngươi."},
  {n:"Khuyên Hoàng thượng giảm thuế Giang Nam",need:["nsrv"],c:{sung:-3},o:()=>40+S.tai/4,sc:1,wx:"ngài nghe ngươi",l:{sung:-3},rt:"Hoàng thượng hạ chỉ giảm thuế.",rf:"Hoàng thượng nói kho trống, không giảm được."},
  {n:"Đóng cửa cung, cầu kinh",c:{danh:-2},w:{duc:3},wx:"không tốn bạc",rt:"Ngươi chép kinh cầu mưa thuận."}]},
 c1:{h:"Triều đình đòi trưng thu thóc",w:"emp",t:"Có đại thần dâng sớ: trưng thu thóc của các nhà buôn để cứu đói. Nhà ngươi đứng đầu danh sách.",o:[
  {n:"Tự nguyện dâng thóc",c:{bac:-80},w:{danh:8,th:4},sc:2,f:"good",wx:"cả triều khen (Kho lúa +6)",go:()=>e67kho(6),rt:"Nhà ngươi dâng một vạn thạch."},
  {n:"Lo lót để gạch tên",c:{bac:-50,duc:-3},o:50,w:{bac:60},wx:"giữ được kho",l:{danh:-6},lx:"bị lộ lo lót",f:"greed",rt:"Tên nhà ngươi bị gạch.",rf:"Việc lo lót bị Ngự sử hặc."}]},
 c2:{h:"Đầu cơ của nhà khác",w:"maid",t:"Nhà ngoại của {v} gom gạo đầu cơ, giá càng lên.",need:["v"],o:[
  {n:"Tố với Hộ bộ",c:{},o:()=>40+S.mat*5,sc:1,wx:"nhà {v} bị phạt",l:{},lx:"{v} biết ngươi tố",go:(A,ok)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,ok?12:6)},rt:"Kho nhà {v} bị niêm phong.",rf:"Hộ bộ không xử."},
  {n:"Bảo cha bán rẻ, kéo giá xuống",c:{bac:-50},w:{danh:4},sc:1,f:"good",wx:"giá gạo hạ (Kho lúa +4)",go:()=>e67kho(4),rt:"Giá gạo tụt một nửa trong mười ngày."}]},
 c3:{h:"Dịch bệnh sau đói",w:"doc",t:"Đói xong thì dịch. Ngoài thành người chết nằm la liệt.",o:[
  {n:"Gửi thuốc men ra lều",c:{bac:-50},w:{danh:5,duc:3},sc:1,wx:"cứu được nhiều người",rt:"Thái y viện khen thuốc nhà ngươi gửi."},
  {n:"Tự ra lều phát thuốc",c:{suc:-12},o:60,w:{danh:8},sc:1,wx:"dân gọi ngươi là Bồ Tát sống",l:{suc:-10},lx:"nhiễm bệnh",rt:"Ngươi về cung bình an.",rf:"Ngươi sốt mấy ngày."}]},
 t1:{h:"Cha không chịu nghe",w:"maid",t:"Cha giận: ‘Con gái mà phá việc nhà!’ Ông dọa cắt bạc vào cung.",o:[
  {n:"Viết thư thuyết phục bằng chuyện tước vị",c:{suc:-2},o:A=>45+(A.f.good?15:0),sc:1,wx:"cha hiểu lợi lâu dài",l:{bac:-30},rt:"Cha nghĩ lại.",rf:"Cha cắt bạc thật."},
  {n:"Nghe cha",c:{duc:-3},w:{bac:60},f:"greed",wx:"cha vui, bạc nhiều",rt:"Cha hài lòng."}]},
 x1:{h:"Hoàng thượng xét công tội",w:"emp",t:"Mất mùa qua đi. Hoàng thượng xét công tội các nhà buôn trong năm đói.",o:[
  {n:"Tâu rõ những gì nhà đã làm",c:{suc:-2},o:A=>35+(A.f.good?25:0)-(A.f.greed?15:0)+S.danh/8,e:["win","lose"],rt:"Hoàng thượng ban biển ‘Nghĩa thương’.",rf:"Ngự sử nhắc chuyện đầu cơ, nhà ngươi bị phạt."},
  {n:"Lặng im, không kể công",c:{},w:{duc:3},e:"mid",lx:"công không ai biết",rt:"Ngươi im lặng."},
  {n:"Dâng nốt kho thóc cuối",c:{bac:-100},o:60,e:["win","mid"],rt:"Cả triều khen nhà ngươi.",rf:"Thóc dâng muộn, người ta chỉ nhớ lúc đầu cơ."}]}},
 E:{win:{k:1,tag:"Biển vàng ‘Nghĩa thương’",w:"emp",t:"Hoàng thượng ban biển vàng cho nhà ngươi. Thái hậu khen ngươi có lòng với dân. Tiếng thơm đi khắp Giang Nam.",fx:{danh:12,th:6,sung:3},go:()=>e67kho(5)},
  mid:{k:0,tag:"Qua năm đói",t:"Năm đói qua đi. Nhà ngươi không được khen, cũng không bị trách.",fx:{duc:2}},
  lose:{k:-1,tag:"Mang tiếng đầu cơ",t:"Nhà ngươi bị phạt vì đầu cơ trong năm đói. Thái hậu lạnh nhạt, các phi tần gọi ngươi là ‘nương nương gạo’.",fx:{danh:-10,th:-8}}}};
ARC67.muoi_no={o:"muoi",t:"Món nợ trong cung",w:"v",sj:"món nợ của {v}",g:"Ngươi phát hiện {v} lén vay bạc của hiệu buôn nhà ngươi để lo lót, và không trả nổi. Món nợ là xích sắt hay là sợi chỉ đỏ, tùy ngươi.",
 cast(A){return castRv67(A,"v",v=>v.rank>=1)},
 p:[["s1","s2"],["c1","c2","c3","G.hh","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Sổ nợ của hiệu buôn",w:"maid",t:"Sổ nợ cha gửi vào: {v} vay năm trăm lượng, đã quá hạn nửa năm.",need:["v"],o:[
  {n:"Nhắc khéo {v} trả nợ",c:{},o:()=>45+S.tamco/4,w:{bac:50},wx:"thu được một phần",l:{},lx:"{v} xấu hổ hóa giận",go:(A,ok)=>{const v=rv67(A,"v");if(v&&!ok)oanAdd(v,S,8)},rt:"{v} cắn môi trả một phần.",rf:"{v} đỏ mặt, chối không vay."},
  {n:"Xóa nợ, kết ơn",c:{bac:-40},w:{duc:3},sc:1,f:"kind",wx:"{v} mang ơn",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,20)},rt:"{v} lặng người, rồi cúi đầu cảm tạ."},
  {n:"Giữ sổ, chưa nói",c:{},w:{tamco:3},sc:1,f:"hold",wx:"nắm thóp nàng",lx:"cha giục",rt:"Ngươi cất sổ vào tráp."}]},
 s2:{h:"{v} vay thêm",w:"v",need:["v"],t:"{v} lén sai người đến hỏi: có thể vay thêm hai trăm lượng không? Nàng sắp dự Tranh ghế.",o:[
  {n:"Cho vay, kèm điều kiện",c:{bac:-40},sc:1,f:"hold",wx:"nàng phải nghe ngươi một việc",lx:"có thể mất trắng",rt:"{v} điểm chỉ vào giấy nợ."},
  {n:"Cho vay không điều kiện",c:{bac:-40},w:{duc:2},f:"kind",wx:"{v} cảm động",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,12)},rt:"{v} nhận bạc, mắt rưng rưng."},
  {n:"Từ chối",c:{},w:{bac:0,tamco:2},wx:"giữ bạc",lx:"{v} tìm chủ nợ khác",rt:"{v} ra về tay không."}]},
 c1:{h:"Có người đòi mua sổ nợ",w:"hh",t:"Có người của Càn Ninh cung hỏi mua lại sổ nợ của {v}, giá gấp đôi.",need:["v"],o:[
  {n:"Bán",c:{duc:-4},w:{bac:100},wx:"lãi gấp đôi",lx:"{v} rơi vào tay kẻ khác, biết là ngươi bán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,15)},f:"sold",rt:"Sổ nợ đổi chủ."},
  {n:"Không bán, báo cho {v}",c:{},w:{duc:3},sc:1,f:"kind",wx:"{v} biết ai bảo vệ nàng",lx:"người kia phật ý",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,10)},rt:"{v} tái mặt rồi siết tay ngươi."}]},
 c2:{h:"Nợ lộ ra",w:"v",need:["v"],t:"Có kẻ đồn {v} vay nợ con buôn để lo lót. Nàng bị Hoàng hậu hỏi tội.",o:[
  {n:"Đứng ra nói đó là quà biếu",c:{danh:-3},o:50,sc:1,f:"kind",wx:"cứu {v}",l:{danh:-3},lx:"bị nghi đồng lõa",rt:"Chuyện được bỏ qua.",rf:"Không ai tin, ngươi cũng bị trách."},
  {n:"Đứng ngoài",c:{},w:{tamco:2},wx:"không liên lụy",lx:"{v} một mình chịu",go:A=>e67pun(rv67(A,"v"),3),rt:"{v} bị phạt chép kinh."}]},
 c3:{h:"{v} đề nghị trả nợ bằng tin",w:"v",need:["v"],t:"{v} nói không có bạc, nhưng biết một chuyện về phi tần khác có thể giúp ngươi.",o:[
  {n:"Nhận tin thay bạc",c:{bac:-20},sc:1,wx:"có tin thật",w:{mat:1},rt:"Tin {v} đưa là thật."},
  {n:"Không cần, cứ giữ nợ",lx:"{v} sợ hãi, oán ngầm",c:{},w:{tamco:2},f:"hold",wx:"vẫn nắm thóp nàng",rt:"{v} lo lắng ra về."}]},
 t1:{h:"Nợ đến hạn cuối",w:"v",need:["v"],t:"Cha giục: nợ phải đòi. {v} quỳ xin thêm hạn.",o:[
  {n:"Cho thêm hạn",c:{bac:-20},w:{duc:3},f:"kind",wx:"{v} nhớ ơn",rt:"{v} khóc cảm tạ."},
  {n:"Đòi bằng được",c:{},o:50,w:{bac:80},f:"hold",wx:"thu nợ",l:{},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},rt:"{v} bán trang sức trả nợ.",rf:"{v} không có, còn hận ngươi."}]},
 x1:{h:"Món nợ ngã ngũ",w:"v",t:"Tranh ghế sắp mở. {v} có thể đứng về phía ngươi, hoặc chống ngươi. Món nợ là thứ cuối cùng quyết định.",need:["v"],o:[
  {n:"Đốt sổ nợ trước mặt nàng",c:{bac:-60},o:A=>40+(A.f.kind?25:0),e:["win","mid"],rt:"{v} quỳ xuống thề đứng về phía ngươi.",rf:"{v} cảm ơn, nhưng vẫn giữ khoảng cách."},
  {n:"Dùng sổ nợ ép nàng theo ngươi",c:{duc:-3},o:A=>40+(A.f.hold?20:0)+S.tamco/6,e:["win2","lose"],rt:"{v} cắn răng nghe lời.",rf:"{v} liều tố ngươi cho vay nặng lãi."},
  {n:"Trả sổ cho cha, rút tay",c:{},w:{suc:3},e:"mid",lx:"mất một con bài",rt:"Ngươi không dính vào nữa."}]}},
 E:{win:{k:1,tag:"Món nợ thành tình chị em",w:"v",t:"{v} thành người của ngươi, bỏ phiếu cho ngươi ở Tranh ghế, mách tin cho ngươi khi cần.",fx:{danh:4,mat:1},go:A=>e67ally(rv67(A,"v"),35)},
  win2:{k:1,tag:"Nắm thóp {v}",t:"{v} buộc phải nghe ngươi. Nàng không dám chống ngươi, nhưng trong lòng không phục.",fx:{tamco:3,mat:1},go:A=>e67ally(rv67(A,"v"),15)},
  mid:{k:0,tag:"Nợ xong, người xa",t:"Món nợ khép lại. Không ai nợ ai, cũng chẳng ai thân ai.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị tố cho vay nặng lãi",t:"{v} tố ngươi cho vay nặng lãi trong cung. Ngươi bị phạt bổng, mang tiếng con buôn.",fx:{danh:-8,bac:-50},go:A=>e67foe(rv67(A,"v"),15)}}};
/* ================= CUNG NỮ ĐƯỢC SỦNG HẠNH ================= */
ARC67.cn_chu={o:"cn",t:"Chủ cũ",w:"v",sj:"chuyện ngươi từng hầu {v}",g:"{v} là chủ cũ của ngươi thuở còn bưng trà. Nàng không chịu nổi việc kẻ hầu cũ nay ngồi ngang hàng. Nhẫn, trả, hay vượt hẳn lên.",
 cast(A){if(!castRv67(A,"v",v=>v.rank>=1))return false;const v=rv67(A,"v");v.oldmis=true;v.rel=Math.min(v.rel||0,-20);return true},
 p:[["s1","s2"],["c1","c2","c3","G.rumor","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Chén trà trước mặt mọi người",w:"v",need:["v"],t:"{v} bắt ngươi quỳ dâng trà trước mặt các phi tần: “Tay nghề cũ chắc chưa quên chứ?”",o:[
  {n:"Quỳ dâng trà, mỉm cười",c:{danh:-3},w:{duc:4},sc:1,f:"kind",wx:"người khác thấy ngươi độ lượng",rt:"Có người thì thầm khen ngươi biết nhẫn."},
  {n:"Đứng dậy đáp sắc sảo",c:{},o:()=>40+S.tai/4,w:{danh:4},f:"hard",wx:"{v} bẽ mặt",l:{danh:-4},lx:"{v} thù sâu hơn",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},rt:"Cả phòng im phăng phắc.",rf:"Lời ngươi lạc giọng, người ta cười."},
  {n:"Viện cớ có chỉ triệu, lui ra",c:{suc:-2},o:()=>45+S.tamco/4,w:{tamco:2},wx:"tránh được nhục",l:{danh:-2},rt:"Ngươi lui ra êm thấm.",rf:"Ai cũng biết ngươi bịa cớ."}]},
 s2:{h:"Kẻ hầu cũ biết chuyện",w:"maid",t:"Một cung nữ cùng hầu {v} với ngươi năm xưa nay vẫn ở đó. Nàng lén gửi lời: chủ cũ đang tìm chuyện xưa của ngươi.",o:[
  {n:"Gửi bạc kết thân",c:{bac:-30},sc:1,w:{mat:1},wx:"có tai mắt trong cung {v}",rt:"Cung nữ ấy thành tai mắt của ngươi."},
  {n:"Xin nàng sang hầu ngươi",c:{bac:-40},o:45,sc:1,wx:"rút người khỏi tay {v}",l:{},lx:"{v} biết ngươi rút người",go:(A,ok)=>{const v=rv67(A,"v");if(v&&!ok)oanAdd(v,S,6)},rt:"Nội vụ phủ chuẩn cho nàng sang.",rf:"{v} giữ người lại, còn đánh nàng."},
  {n:"Không dính vào",c:{},w:{duc:2},wx:"không gây chuyện",lx:"mất tai mắt",rt:"Ngươi không đáp."}]},
 c1:{h:"Chuyện xưa bị khơi lại",w:"v",need:["v"],t:"{v} kể với Hoàng hậu: thuở xưa ngươi từng làm vỡ chén ngọc ngự ban, nàng phải chịu tội thay.",o:[
  {n:"Thừa nhận, xin lỗi công khai",c:{danh:-3},w:{duc:4},sc:1,f:"kind",wx:"lời đồn hết đất sống",rt:"Hoàng hậu gật đầu, bỏ qua."},
  {n:"Bác lời, đưa người làm chứng",c:{suc:-2},o:()=>40+S.mat*5,w:{danh:4},sc:1,f:"hard",wx:"lời {v} thành vu khống",l:{danh:-4},rt:"Người làm chứng nói: chính {v} làm vỡ.",rf:"Không ai dám làm chứng."}]},
 c2:{h:"{v} gặp nạn",w:"v",need:["v"],t:"{v} bị một phi tần khác vu ăn cắp trâm. Nàng nhìn ngươi, không nói gì.",o:[
  {n:"Đứng ra nói giúp chủ cũ",c:{danh:-2},o:50,sc:2,f:"kind",wx:"{v} nợ ngươi",l:{danh:-3},lx:"bị kéo vào",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,25)},rt:"Trâm được tìm thấy ở chỗ khác, {v} được minh oan.",rf:"Lời ngươi không đủ, cả hai bị trách."},
  {n:"Đứng ngoài nhìn",c:{duc:-2},w:{tamco:2},f:"hard",wx:"{v} yếu đi",go:A=>e67pun(rv67(A,"v"),5),rt:"{v} bị phạt."}]},
 c3:{h:"Hoàng thượng hỏi về chủ cũ",w:"emp",need:["nsrv"],t:"Hoàng thượng hỏi: “Nghe nói {goi} từng hầu {v}. Nàng ấy đối với {goi} thế nào?”",o:[
  {n:"Nói tốt về {v}",c:{},w:{duc:3,sung:2},f:"kind",wx:"ngài khen ngươi trung hậu",lx:"{v} chẳng biết ơn",rt:"Hoàng thượng gật đầu khen."},
  {n:"Kể thật những gì đã chịu",c:{},o:45,w:{sung:3},f:"hard",wx:"ngài thương ngươi",l:{sung:-3},lx:"ngài cho là ngươi để bụng",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)v.sung=Math.max(0,(v.sung||0)-5)},rt:"Hoàng thượng nhíu mày về phía {v}.",rf:"Hoàng thượng bảo: chuyện cũ bỏ đi."}]},
 t1:{h:"Ngươi sắp vượt {v}",w:"v",need:["v"],t:"Tin đồn: ngươi sắp được thăng ngang hoặc hơn {v}. Nàng mất ăn mất ngủ.",o:[
  {n:"Gửi lời làm hòa",c:{bac:-30},o:A=>40+(A.f.kind?20:0),sc:1,f:"kind",wx:"{v} mềm lòng",l:{},lx:"{v} khinh ngươi",rt:"{v} nhận lễ, trả lại một chiếc khăn thêu.",rf:"{v} ném lễ ra sân."},
  {n:"Chuẩn bị đối phó",c:{suc:-3},sc:1,f:"hard",w:{tamco:2},wx:"sẵn sàng",rt:"Ngươi dặn người canh cửa cung."}]},
 x1:{h:"Ngày ngồi ngang hàng",w:"v",need:["v"],t:"Trong yến Trung thu, ngươi được xếp ngồi ngang {v}. Cả cung chờ xem.",o:[
  {n:"Nâng chén mời chủ cũ trước",c:{},o:A=>40+(A.f.kind?25:0),e:["win","mid"],rt:"{v} run tay nâng chén, rồi bật khóc.",rf:"{v} uống cạn, không nói một lời."},
  {n:"Lấy lại thể diện năm xưa",c:{suc:-2},o:A=>35+(A.f.hard?20:0)+S.danh/6,e:["win2","lose"],rt:"Ngươi khiến {v} phải đứng dậy dâng trà cho ngươi.",rf:"Ngươi quá tay, Thái hậu trách ngươi hẹp lượng."},
  {n:"Coi như không có gì",c:{},w:{duc:2},e:"mid",lx:"oán cũ còn đó",rt:"Ngươi nói chuyện với người khác."}]}},
 E:{win:{k:1,tag:"Chủ cũ thành tri kỷ",t:"{v} buông bỏ khúc mắc. Nàng thành người đỡ lời ngươi, cả cung kính phục lòng độ lượng của ngươi.",fx:{danh:6,duc:4},go:A=>e67ally(rv67(A,"v"),40)},
  win2:{k:1,tag:"Vượt hẳn chủ cũ",t:"Không ai còn nhớ ngươi từng là kẻ hầu của {v}. Chính nàng phải cúi chào ngươi trước.",fx:{danh:8,sung:3},go:A=>{const v=rv67(A,"v");if(v)v.sung=Math.max(0,(v.sung||0)-6);return v?`${v.name} mất mặt, Hoàng thượng ít ghé nàng hơn.`:""}},
  mid:{k:0,tag:"Nước sông không phạm nước giếng",t:"Ngươi và {v} giữ lễ với nhau, không hơn.",fx:{duc:2}},
  lose:{k:-1,tag:"Mang tiếng hẹp lượng",t:"Người ta nói ngươi lên cao rồi quay lại trả thù chủ cũ. Thái hậu lạnh nhạt, {v} hận ngươi đến xương.",fx:{danh:-6,th:-8},go:A=>e67foe(rv67(A,"v"),20)}}};
ARC67.cn_tinh={o:"cn",t:"Mối tình thuở hầu trà",w:"maid",sj:"mối tình cũ của ngươi",g:"Thuở còn hầu trà, ngươi từng hẹn ước với một thị vệ. Nay hắn gác cửa cung ngươi, và vài bức thư cũ vẫn còn đâu đó. Chôn quá khứ cho sạch, trước khi kẻ khác đào nó lên.",
 cast(A){A.n1="thị vệ "+pick(SURN)+" "+pick(MALEN);return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.ill"],["t1"],["x1"]],
 B:{
 s1:{h:"Người cũ gác cửa",w:"maid",t:"{maid} tái mặt: {n1}, người năm xưa hẹn ước với ngươi, vừa được đổi về gác cửa cung ngươi.",o:[
  {n:"Xin Nội vụ phủ đổi hắn đi",c:{bac:-40},o:55,sc:1,wx:"tránh được gặp gỡ",l:{},lx:"Nội vụ phủ tò mò vì sao",rt:"Hắn bị đổi sang Tây Hoa môn.",rf:"Nội vụ phủ hỏi lý do, ngươi phải lấp liếm."},
  {n:"Gặp hắn một lần, nói rõ",c:{duc:-2},o:()=>45+S.tamco/4,sc:1,f:"talk",wx:"hắn hứa quên chuyện cũ",l:{danh:-4},lx:"có người thấy",rt:"Hắn cúi đầu: ‘Thần hiểu.’",rf:"Một tiểu thái giám thấy hai người nói chuyện."},
  {n:"Lờ đi",c:{},w:{suc:2},wx:"không gây chú ý",lx:"hắn vẫn ở đó",rt:"Ngươi coi như không quen."}]},
 s2:{h:"Bức thư cũ",w:"maid",t:"{maid} nhớ ra: năm xưa ngươi gửi {n1} ba bức thư. Hắn còn giữ hay không, không ai biết.",o:[
  {n:"Nhờ người hỏi lấy lại thư",c:{bac:-30},o:50,sc:1,f:"letters",wx:"lấy lại được thư",l:{},lx:"người trung gian biết chuyện",rt:"Hai bức thư được trả lại.",rf:"Người trung gian ôm bạc mà không lấy được gì."},
  {n:"Tin rằng hắn đã đốt",c:{},w:{suc:2},wx:"đỡ lo",lx:"thư có thể còn",rt:"Ngươi cố quên."}]},
 c1:{h:"Một thái giám đánh hơi",w:"eun",t:"Một thái giám của phi tần khác cứ lảng vảng quanh cửa cung ngươi, hỏi han về {n1}.",o:[
  {n:"Đút bạc bịt miệng",c:{bac:-50},sc:1,wx:"tạm yên",lx:"hắn có thể đòi thêm",rt:"Hắn nhận bạc, cười hì hì."},
  {n:"Tố hắn lười việc với Tổng quản",c:{},o:()=>40+S.mat*5,sc:1,wx:"hắn bị đổi đi xa",l:{danh:-3},lx:"hắn bêu chuyện",rt:"Hắn bị đày đi quét Lãnh cung.",rf:"Hắn thoát tội, còn đi kể lể."},
  {n:"Cho {n1} xin ra biên ải",c:{bac:-20},w:{duc:4},f:"away",wx:"dứt hẳn mối dây",lx:"hắn đau lòng",rt:"{n1} lên đường ra biên ải."}]},
 c2:{h:"{n1} gặp nạn",w:"maid",t:"{n1} bị vu ăn trộm đồ ngự dụng, sắp bị đánh trượng. Hắn không khai gì về ngươi.",o:[
  {n:"Âm thầm cứu hắn",c:{bac:-40},o:55,w:{duc:3},sc:1,wx:"hắn mang ơn, càng kín miệng",l:{danh:-3},lx:"có người nghi ngươi bênh hắn",rt:"Đồ ngự dụng được tìm thấy, hắn được tha.",rf:"Hắn được tha, nhưng có kẻ để ý ngươi."},
  {n:"Đứng ngoài",c:{duc:-3},w:{tamco:2},wx:"không ai nối ngươi với hắn",lx:"hắn có thể khai khi bị đánh",rt:"Hắn chịu hai mươi trượng, không hé răng."}]},
 c3:{h:"Hoàng thượng thấy ánh mắt",w:"emp",need:["nsrv"],t:"Hoàng thượng đi qua cửa cung, thấy {n1} nhìn theo ngươi lâu hơn mức một thị vệ nên nhìn.",o:[
  {n:"Cười nói tự nhiên với ngài",c:{},o:()=>50+S.tamco/4,w:{sung:3},wx:"ngài không để ý",l:{sung:-6},lx:"ngài sinh nghi",rt:"Hoàng thượng không nghĩ gì.",rf:"Hoàng thượng hỏi tên thị vệ ấy."},
  {n:"Xin ngài đổi thị vệ gác cửa",c:{sung:-2},w:{duc:2},f:"away",wx:"dứt nguồn nghi",rt:"Hoàng thượng chuẩn."}]},
 t1:{h:"Thư cũ lộ ra",w:"maid",t:"Tin xấu: một bức thư cũ của ngươi đang nằm trong tay người của một phi tần khác.",o:[
  {n:"Tìm cách đánh tráo thư",c:{bac:-40},o:()=>35+S.mat*6+S.tamco/4,sc:2,f:"letters",wx:"lấy lại thư",l:{danh:-4},lx:"lộ việc đánh tráo",rt:"Thư thật đã về tay ngươi.",rf:"Người của ngươi bị bắt quả tang."},
  {n:"Chuẩn bị lời giải thích",c:{suc:-3},w:{tamco:3},sc:1,wx:"sẵn lời đỡ đòn",rt:"Ngươi thuộc lòng từng câu."}]},
 x1:{h:"Ngày quá khứ gõ cửa",w:"emp",t:"Bức thư cũ được trình lên Hoàng thượng. Ngài nhìn ngươi, chờ.",o:[
  {n:"Nhận thật: chuyện trước khi được sủng hạnh",c:{sung:-4},o:A=>40+(A.f.away?20:0)+S.duc/8,e:["win","mid"],rt:"Hoàng thượng im lặng rồi nói: ‘Trẫm tin nàng.’",rf:"Hoàng thượng tha cho ngươi, nhưng lạnh nhạt một thời gian."},
  {n:"Chối, nói thư bị làm giả",c:{},o:A=>35+(A.f.letters?25:0)+S.tamco/6,e:["win2","lose"],rt:"Thư bị chứng minh là chép lại, kẻ trình thư bị phạt.",rf:"Hoàng thượng nhận ra nét chữ của ngươi."}]}},
 E:{win:{k:1,tag:"Hoàng thượng tin ngươi",w:"emp",t:"Hoàng thượng coi trọng lòng thật của ngươi. Chuyện cũ khép lại, ngài càng tin ngươi hơn.",fx:{sung:6,duc:4}},
  win2:{k:1,tag:"Lật ngược kẻ trình thư",t:"Kẻ trình thư bị phạt vì vu khống. Không ai dám nhắc chuyện cũ của ngươi nữa.",fx:{danh:6,tamco:3}},
  mid:{k:0,tag:"Chuyện cũ chôn vùi",t:"Chuyện cũ không ai nhắc, nhưng Hoàng thượng thỉnh thoảng nhìn ngươi lâu hơn trước.",fx:{sung:-3,duc:2}},
  lose:{k:-1,tag:"Lộ chuyện cũ",w:"emp",t:"Hoàng thượng giận vì ngươi nói dối, lạnh nhạt hẳn với ngươi.",fx:{sung:-10,danh:-6},go:()=>{apply({sung:-3});return "Hoàng thượng không ghé một thời gian: Sủng -3."}}}};
ARC67.cn_ban={o:"cn",t:"Tri kỷ ở Tân Giả khố",w:"maid",sj:"chuyện người tri kỷ cũ ở Tân Giả khố",g:"Tố Nga, tri kỷ cùng phòng thuở ngươi còn là cung nữ, bị đày xuống Tân Giả khố vì một tội nàng không làm. Nàng biết một bí mật của Càn Ninh cung. Cứu nàng là ơn, mà cũng là rủi ro.",
 p:[["s1","s2"],["c1","c2","c3","G.hh","G.spy"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời nhắn từ Tân Giả khố",w:"maid",t:"Một mảnh khăn lọt đến tay ngươi, chữ viết bằng than: “Muội Tố Nga đây. Muội bị oan. Cứu muội.”",o:[
  {n:"Lén gửi thuốc và bạc",c:{bac:-30},w:{duc:3},sc:1,wx:"Tố Nga sống qua mùa rét",rt:"Tố Nga nhận được thuốc."},
  {n:"Đến Tân Giả khố gặp nàng",c:{suc:-4},o:()=>45+S.tamco/4,sc:1,f:"met",wx:"biết nàng bị oan vì sao",l:{danh:-3},lx:"bị chê hạ mình",rt:"Tố Nga kể: nàng thấy người của Hoàng hậu đổ thuốc vào giếng.",rf:"Người ta đồn ngươi lui tới chỗ tội nô."},
  {n:"Đốt khăn",c:{duc:-3},w:{tamco:2},wx:"không dính vào",lx:"bỏ tri kỷ",rt:"Mảnh khăn cháy trong lò."}]},
 s2:{h:"Kẻ đã đày Tố Nga",w:"eun",t:"Ngươi dò ra: chưởng sự Tân Giả khố nhận lệnh cứ giữ Tố Nga ở đó, đánh mỗi ngày.",o:[
  {n:"Biếu chưởng sự để nàng được nhẹ việc",c:{bac:-40},sc:1,wx:"Tố Nga thôi bị đánh",rt:"Tố Nga được đổi sang việc khâu vá."},
  {n:"Tố chưởng sự với Tổng quản",c:{},o:()=>40+S.mat*5,sc:1,wx:"chưởng sự bị phạt",l:{},lx:"kẻ đứng sau biết ngươi để ý",rt:"Chưởng sự bị cách chức.",rf:"Tổng quản gạt đi."}]},
 c1:{h:"Bí mật của Tố Nga",w:"maid",t:"Tố Nga nhắn: nàng biết người bỏ thuốc vào giếng là ai. Nói ra thì nàng chết, nếu không có ai che chở.",o:[
  {n:"Hứa che chở, xin nàng kể",c:{},o:50,sc:2,f:"secret",wx:"nắm một bí mật lớn",l:{},lx:"Tố Nga sợ, chưa dám nói",rt:"Tố Nga kể hết.",rf:"Tố Nga run rẩy, xin để lần sau."},
  {n:"Bảo nàng giữ kín để giữ mạng",c:{},w:{duc:3},wx:"Tố Nga an toàn",lx:"bí mật vẫn chôn",rt:"Tố Nga gật đầu."}]},
 c2:{h:"Tố Nga ốm nặng",w:"doc",t:"Mùa rét, Tố Nga ho ra máu. Không có thầy thuốc, nàng không qua nổi tháng.",o:[
  {n:"Lén mời thái y",c:{bac:-40},o:55,sc:1,wx:"cứu được nàng",l:{danh:-3},lx:"thái y báo lên",rt:"Tố Nga qua cơn nguy.",rf:"Tố Nga khỏi, nhưng chuyện ngươi mời thái y cho tội nô bị đồn."},
  {n:"Tự bốc thuốc gửi xuống",if:()=>S.arts.y>=2,c:{suc:-4},w:{duc:3},sc:1,wx:"nàng khỏi bệnh",rt:"Thuốc của ngươi hiệu nghiệm."},
  {n:"Gửi bạc, phó mặc",c:{bac:-20},w:{duc:1},wx:"tròn chút tình",lx:"nàng có thể không qua",rt:"Tố Nga gượng qua mùa rét."}]},
 c3:{h:"Có người hỏi về Tố Nga",w:"hh",need:["hh"],t:"Người của Càn Ninh cung hỏi ngươi: “{Nc} có quen Tố Nga ở Tân Giả khố?”",o:[
  {n:"Chối",c:{},o:()=>45+S.tamco/4,w:{tamco:2},wx:"che được",l:{hh:-6},lx:"Hoàng hậu nghi",rt:"Họ tin.",rf:"Họ không tin."},
  {n:"Nhận là bạn cũ, chỉ thương tình",c:{hh:-3},w:{duc:3},wx:"thật thà",lx:"Hoàng hậu để ý cả hai",rt:"Họ ghi lại rồi đi."}]},
 t1:{h:"Đưa Tố Nga ra khỏi Tân Giả khố",w:"maid",t:"Có dịp: Nội vụ phủ đang chọn người khâu vá cho cung ngươi.",o:[
  {n:"Xin Tố Nga về hầu",c:{bac:-40},o:55,sc:1,f:"saved",wx:"Tố Nga về bên ngươi",l:{},lx:"bị từ chối",rt:"Tố Nga về cung ngươi, quỳ khóc.",rf:"Nội vụ phủ không cho."},
  {n:"Chờ thời cơ khác",c:{},w:{tamco:2},wx:"không lộ",lx:"nàng chịu khổ thêm",rt:"Ngươi chờ."}]},
 x1:{h:"Sự thật về cái giếng",w:"maid",t:"Bí mật Tố Nga giữ là chìa khóa: người của Càn Ninh cung từng bỏ thuốc tuyệt tự vào giếng một cung. Dùng hay chôn?",o:[
  {n:"Đưa Tố Nga ra làm chứng trước Thái hậu",c:{suc:-4},o:A=>30+(A.f.secret?20:0)+(A.f.saved?10:0),e:["win","lose"],rt:"Thái hậu nổi giận, cho tra đến cùng.",rf:"Lời một tội nô không ai tin, ngươi bị trách."},
  {n:"Giữ bí mật, dùng Tố Nga làm tai mắt",c:{},o:A=>50+(A.f.saved?20:0),e:["win2","mid"],rt:"Tố Nga thành tai mắt tin cẩn nhất của ngươi.",rf:"Tố Nga sợ hãi xin rời cung."},
  {n:"Xin cho Tố Nga xuất cung về quê",c:{bac:-40},w:{duc:4},e:"mid",lx:"mất một nhân chứng",rt:"Tố Nga ra cung, lạy ngươi ba lạy."}]}},
 E:{win:{k:1,tag:"Vạch tội ác cái giếng",w:"th",t:"Thái hậu tra ra kẻ bỏ thuốc. Ngươi được khen là người có nghĩa, Thái hậu tin ngươi hơn hẳn.",fx:{th:15,danh:8,hh:-10},go:()=>{const q=rivals[0];if(qOn()){evStory(q,1,"dính líu vụ bỏ thuốc ở giếng");return `Chứng cứ về Hoàng hậu ${q.name} +1.`}return""}},
  win2:{k:1,tag:"Tai mắt trong bóng tối",t:"Tố Nga hầu bên ngươi, biết hết đường đi lối lại của Càn Ninh cung. Ngươi nghe được những gì người khác không nghe.",fx:{mat:2,tamco:3}},
  mid:{k:0,tag:"Tình bạn giữ trọn",t:"Tố Nga thoát khổ. Bí mật ngủ yên, ngươi giữ được lòng mình.",fx:{duc:4}},
  lose:{k:-1,tag:"Bị cho là vu cáo",t:"Lời tố của Tố Nga bị bác. Ngươi mang tiếng vu cáo, Hoàng hậu càng ghét ngươi.",fx:{danh:-8,hh:-15}}}};
ARC67.cn_than={o:"cn",t:"Thân thế thật",w:"maid",sj:"thân thế của ngươi",g:"Một lão ma ma sắp mất nói với ngươi: ngươi không phải con nhà thường dân. Ngươi là con của một quan bị giáng chức năm xưa. Thật hay giả, ngươi phải tự tìm.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.gift"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời trăng trối",w:"maid",t:"Lão ma ma nắm tay ngươi: “Con là con gái Thị lang họ Thẩm. Năm ấy ta bế con ra khỏi phủ. Miếng ngọc trên cổ con là chứng.”",o:[
  {n:"Lo hậu sự cho ma ma",c:{bac:-30},w:{duc:4},sc:1,wx:"được người trong cung nể",rt:"Ma ma nhắm mắt yên lòng."},
  {n:"Hỏi thêm chi tiết",c:{suc:-2},o:50,sc:1,f:"clue",wx:"biết thêm chuyện năm xưa",l:{},lx:"ma ma lịm đi trước khi nói hết",rt:"Ma ma nói thêm tên quản gia cũ.",rf:"Ma ma không nói được nữa."}]},
 s2:{h:"Miếng ngọc",w:"maid",t:"Miếng ngọc cũ ngươi đeo từ bé có khắc một chữ ‘Thẩm’ rất nhỏ.",o:[
  {n:"Đem ngọc nhờ thợ cung xem",c:{bac:-20},o:55,sc:1,f:"jade",wx:"biết ngọc từ phủ quan",l:{},lx:"thợ đi kể",rt:"Thợ nói: ngọc này của phủ quan, không phải dân thường.",rf:"Thợ đem chuyện đi kể."},
  {n:"Cất kỹ, chưa cho ai biết",c:{},w:{tamco:2},wx:"giữ kín",lx:"chưa biết thêm",rt:"Ngọc nằm sâu trong tráp."}]},
 c1:{h:"Hồ sơ án cũ",w:"maid",t:"Án của Thị lang họ Thẩm còn lưu ở Hình bộ. Xem được thì biết ông vì sao bị giáng.",o:[
  {n:"Nhờ người chép hồ sơ",c:{bac:-40},o:50,sc:1,f:"case",wx:"biết ông bị oan",l:{},lx:"lộ việc dò án",rt:"Hồ sơ cho thấy ông bị oan vì can gián tiên đế.",rf:"Người chép bị bắt gặp."},
  {n:"Xin Hoàng thượng cho xem",need:["nsrv"],c:{sung:-3},o:()=>40+S.sung/4,sc:1,f:"case",wx:"có thánh ý",l:{sung:-3},rt:"Hoàng thượng tò mò, cho người lấy hồ sơ.",rf:"Hoàng thượng hỏi sao ngươi quan tâm."}]},
 c2:{h:"Một người nhận là thân thích",w:"maid",t:"Một phụ nhân xin vào cung, nhận là di mẫu của ngươi. Bà biết nhiều chuyện, cũng đòi nhiều thứ.",o:[
  {n:"Tiếp bà, cho bạc",c:{bac:-40},o:50,sc:1,wx:"có thêm chứng nhân",l:{},lx:"bà là kẻ lừa",rt:"Bà kể đúng vết bớt trên vai ngươi.",rf:"Bà chỉ đoán mò để xin bạc."},
  {n:"Từ chối gặp",c:{},w:{tamco:2},wx:"không mắc lừa",lx:"có thể bỏ lỡ người thân",rt:"Bà bị đuổi về."}]},
 c3:{h:"Kẻ thù của họ Thẩm",w:"v",need:["v"],t:"Ngươi biết ra: người hặc Thị lang họ Thẩm năm xưa chính là ông nội của {v}.",o:[
  {n:"Giữ kín, theo dõi {v}",lx:"không biết {v} đã biết chưa",c:{},w:{tamco:3},sc:1,wx:"biết ai cần đề phòng",rt:"Ngươi để ý từng bước của {v}."},
  {n:"Thử dò ý {v}",c:{suc:-2},o:45,sc:1,wx:"biết nàng có biết chuyện",l:{},lx:"{v} cảnh giác",go:(A,ok)=>{const v=rv67(A,"v");if(v&&!ok)oanAdd(v,S,6)},rt:"{v} không biết gì, chỉ ngạc nhiên.",rf:"{v} sinh nghi."}]},
 t1:{h:"Nhận tổ hay không",w:"th",t:"Đủ chứng cứ để xin nhận lại họ Thẩm. Nhưng nhận thì cũng là nhắc lại một án tiên đế đã xử.",o:[
  {n:"Quyết nhận",c:{},sc:1,f:"claim",wx:"vào cao trào",lx:"đụng đến án tiên đế",rt:"Ngươi viết tờ trình."},
  {n:"Chỉ xin minh oan, không xin nhận họ",lx:"không lấy lại được họ",c:{},w:{duc:3},f:"soft",wx:"nhẹ nhàng hơn",rt:"Ngươi sửa lại tờ trình."}]},
 x1:{h:"Ngày trình thân thế",w:"emp",t:"Ngươi quỳ trước Hoàng thượng và Thái hậu, dâng miếng ngọc và hồ sơ.",o:[
  {n:"Xin nhận lại họ Thẩm và minh oan cho cha",c:{suc:-4},o:A=>30+(A.f.case?15:0)+(A.f.jade?10:0)+(A.f.clue?5:0),e:["win","lose"],rt:"Hoàng thượng chuẩn: Thị lang họ Thẩm được truy phục, ngươi là con nhà quan.",rf:"Hoàng thượng cho là chứng cứ mỏng, trách ngươi bày chuyện."},
  {n:"Chỉ xin minh oan, giữ thân phận cũ",c:{},o:A=>55+(A.f.case?15:0),e:["mid","lose"],rt:"Thị lang họ Thẩm được rửa oan.",rf:"Án cũ không lật được."},
  {n:"Thôi, giữ kín mãi",c:{},w:{duc:2},e:"mid",lx:"mãi là con nhà thường dân",rt:"Ngươi cất miếng ngọc."}]}},
 E:{win:{k:1,tag:"Con gái họ Thẩm",w:"th",t:"Ngươi được nhận lại họ Thẩm, xuất thân con nhà quan. Không ai còn dám gọi ngươi là kẻ hầu; Thái hậu nhìn ngươi khác hẳn.",fx:{danh:12,th:8}},
  mid:{k:0,tag:"Cha được minh oan",t:"Cha ruột được rửa oan, nhưng ngươi vẫn giữ thân phận cũ. Lòng nhẹ đi nhiều.",fx:{duc:4,danh:3}},
  lose:{k:-1,tag:"Bị coi là mạo nhận",t:"Hoàng thượng cho là ngươi mạo nhận dòng dõi. Các phi tần cười cợt sau lưng.",fx:{danh:-8,sung:-4}}}};
/* ================= CÔNG CHÚA NAM CHIẾU ================= */
ARC67.nc_gian={o:"nc",t:"Mật lệnh cố quốc",w:"emp",sj:"mật lệnh từ Nam Chiếu",g:"Phụ vương gửi mật lệnh: dò bố phòng biên ải Đại Hy. Trung với cố quốc, trung với phu quân, hay chơi cả hai ván mà không để ván nào đổ.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.night"],["t1"],["x1"]],
 B:{
 s1:{h:"Mật sứ trong đêm",w:"maid",t:"Một nữ nhạc công Nam Chiếu dúi vào tay ngươi thư của phụ vương: “Con là mắt của cố quốc.”",o:[
  {n:"Nhận lệnh, hứa sẽ gửi tin",c:{duc:-3},w:{bac:40},f:"home",wx:"cố quốc gửi vàng",lx:"lộ thì bị nghi gián điệp",rt:"Nữ nhạc công cúi đầu lui ra."},
  {n:"Dâng thư lên Hoàng thượng",c:{},o:()=>50+S.sung/5,w:{sung:4,th:6},f:"court",wx:"triều đình tin ngươi",l:{th:-4},lx:"ngài vẫn nghi ngươi nhận thư",rt:"Hoàng thượng nắm tay ngươi thật lâu.",rf:"Hoàng thượng nhận thư, nhưng sai người theo dõi ngươi."},
  {n:"Đốt thư, im lặng",c:{},w:{tamco:2},wx:"chưa phải chọn",lx:"cố quốc sẽ gửi tiếp",rt:"Thư thành tro."}]},
 s2:{h:"Người hầu cố quốc",w:"maid",t:"Một cung nữ Nam Chiếu theo ngươi sang hòa thân hóa ra là người của phụ vương, chép lại mọi việc ngươi làm.",o:[
  {n:"Đổi nàng về phe mình",c:{bac:-40},o:()=>45+S.tamco/4,sc:1,wx:"tin gửi về là tin ngươi chọn",l:{},lx:"nàng báo về",rt:"Nàng khóc, thề theo ngươi.",rf:"Nàng gửi thư tố ngươi về Nam Chiếu."},
  {n:"Xin Nội vụ phủ đổi nàng đi",c:{},w:{duc:2},f:"court",wx:"bên mình sạch",lx:"cố quốc biết ngươi cự lệnh",rt:"Nàng bị đổi sang Tân Giả khố."}]},
 c1:{h:"Bản đồ bố phòng",w:"emp",need:["nsrv"],t:"Trong ngự thư phòng, bản đồ bố phòng Nhạn Môn trải trên án. Hoàng thượng vừa ra ngoài.",o:[
  {n:"Ghi nhớ một phần",c:{duc:-4},o:()=>45+S.tamco/3,sc:1,f:"home",wx:"có tin cho cố quốc",l:{sung:-8},lx:"bị bắt gặp đứng trước bản đồ",rt:"Ngươi nhớ được vị trí ba doanh trại.",rf:"Hoàng thượng quay lại, thấy ngươi."},
  {n:"Đứng xa, không nhìn",c:{},w:{duc:3},f:"court",wx:"trong sạch",lx:"cố quốc không có tin",rt:"Ngươi ra hành lang chờ."},
  {n:"Ghi nhớ, rồi sửa sai đi khi gửi",c:{suc:-3},o:()=>40+S.tamco/3,sc:1,f:"double",wx:"cố quốc tin ngươi mà không hại Đại Hy",l:{},lx:"cố quốc phát hiện tin sai",rt:"Ngươi soạn một bản tin nửa thật nửa giả.",rf:"Tin sai bị phát hiện."}]},
 c2:{h:"Cấm quân để ý",w:"eun",t:"Tổng quản {eun} nhắc khéo: ‘Cấm quân đang để ý thư đi từ cung {N}.’",o:[
  {n:"Ngừng gửi thư",c:{},w:{duc:2},f:"court",wx:"an toàn",lx:"cố quốc thúc giục",rt:"Ngươi thôi gửi thư."},
  {n:"Biếu Tổng quản, hỏi kẻ nào mách",c:{bac:-50},sc:1,wx:"biết ai đang theo dõi",rt:"Là người của {hh}."}]},
 c3:{h:"Sứ thần cố quốc dò hỏi",w:"emp",t:"Sứ thần Nam Chiếu vào triều, nhìn ngươi đầy ý tứ trong yến.",o:[
  {n:"Gửi một tin nhỏ vô hại",c:{},o:55,sc:1,f:"double",wx:"cố quốc yên lòng",l:{danh:-4},lx:"có người thấy",rt:"Sứ thần gật đầu hài lòng.",rf:"Một thị vệ thấy ngươi trao khăn."},
  {n:"Lạnh lùng với sứ thần",c:{},w:{th:4},f:"court",wx:"Thái hậu thấy ngươi đã là người Đại Hy",lx:"cố quốc giận",rt:"Thái hậu khẽ gật đầu."}]},
 t1:{h:"Phụ vương đòi một tin lớn",w:"maid",t:"Thư mới của phụ vương: ‘Mùa thu này cố quốc sẽ đánh. Con phải cho biết ngày Đại Hy đổi quân.’",o:[
  {n:"Báo cho Hoàng thượng chuẩn bị",c:{},o:()=>50+S.sung/5,sc:2,f:"court",wx:"Đại Hy có phòng bị",l:{sung:-4},lx:"ngài hỏi sao ngươi biết",rt:"Hoàng thượng lặng lẽ tăng quân biên ải.",rf:"Hoàng thượng nghi ngươi đã gửi tin từ lâu."},
  {n:"Gửi tin giả để cứu cả hai",c:{suc:-3},o:()=>40+S.tamco/3,sc:1,f:"double",wx:"chiến tranh có thể tránh",l:{},lx:"tin giả bị lộ",rt:"Nam Chiếu nghe tin giả, hoãn binh.",rf:"Nam Chiếu biết bị lừa."}]},
 x1:{h:"Mùa thu binh lửa",w:"emp",t:"Biên ải nổ ra giao tranh. Cả triều nhìn về phía ngươi.",o:[
  {n:"Đứng hẳn về Đại Hy, xin làm sứ giảng hòa",c:{suc:-4},o:A=>35+(A.f.court?20:0)+S.danh/8,e:["win","mid"],rt:"Thư ngươi viết cho phụ vương khiến hai nước ngừng binh.",rf:"Hai nước vẫn đánh, nhưng ai cũng thấy ngươi trung với Đại Hy."},
  {n:"Lặng lẽ giúp cố quốc",c:{duc:-4},o:A=>30+(A.f.home?20:0)+S.tamco/6,e:["win2","lose"],rt:"Nam Chiếu giữ được biên giới, phụ vương gửi vàng tạ ơn, không ai tra ra ngươi.",rf:"Thư của ngươi bị chặn. Triều đình nghi ngươi hai lòng."},
  {n:"Đóng cửa cung, không làm gì",c:{danh:-3},w:{duc:2},e:"mid",lx:"cả hai bên nghi ngươi",rt:"Ngươi ở yên trong cung."}]}},
 E:{win:{k:1,tag:"Sứ giả hòa bình",w:"emp",t:"Hai nước giảng hòa nhờ ngươi. Hoàng thượng ban cho ngươi tước hiệu riêng, Thái hậu thôi coi ngươi là người ngoài.",fx:{danh:10,th:15,sung:5},go:()=>e67bien(6)},
  win2:{k:1,tag:"Công thần của cố quốc",t:"Nam Chiếu vững vàng, phụ vương gửi vàng bạc. Trong cung không ai tra ra điều gì.",fx:{bac:150,tamco:3}},
  mid:{k:0,tag:"Đứng giữa hai nước",t:"Chiến sự rồi cũng qua. Ngươi không được ai tin hẳn, cũng không bị ai trách.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị nghi hai lòng",w:"emp",t:"Triều đình nghi ngươi làm tai mắt cho Nam Chiếu. Không có chứng cứ để trị tội, nhưng Hoàng thượng lạnh nhạt hẳn.",fx:{sung:-10,danh:-8,th:-10},go:()=>e67demote()}}};
ARC67.nc_su={o:"nc",t:"Sứ đoàn cố quốc",w:"emp",sj:"sứ đoàn Nam Chiếu",g:"Hoàng huynh của ngươi dẫn sứ đoàn Nam Chiếu sang triều cống. Mỗi bữa yến là một ván cờ: nếu sứ đoàn thất lễ, ngươi mất mặt; nếu thuận buồm, ngươi là chiếc cầu giữa hai nước.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"Hoàng huynh vào kinh",w:"emp",t:"Hoàng huynh mang theo voi trắng và ngọc bích. Hoàng thượng cho ngươi ngồi cạnh trong yến đón sứ.",o:[
  {n:"Dạy hoàng huynh lễ nghi Đại Hy",c:{suc:-4},sc:1,w:{th:3},wx:"sứ đoàn ít thất lễ",rt:"Hoàng huynh cúi lạy đúng phép, Lễ bộ hài lòng."},
  {n:"Để sứ đoàn giữ lễ cố quốc",c:{},o:50,w:{danh:4},wx:"triều đình thấy phong tục lạ mà hay",l:{th:-6},lx:"bị chê man di",rt:"Điệu múa voi khiến cả yến trầm trồ.",rf:"Thái hậu chê sứ đoàn vô lễ."}]},
 s2:{h:"Lễ vật bị đánh tráo",w:"maid",t:"Đêm trước buổi dâng lễ, một hòm ngọc bích bị phát hiện là đá giả.",o:[
  {n:"Âm thầm thay bằng ngọc của ngươi",c:{bac:-80},sc:1,wx:"lễ dâng trọn vẹn",rt:"Sáng ra hòm ngọc sáng lóa."},
  {n:"Tra xem ai đánh tráo",c:{suc:-3},o:()=>40+S.mat*6,sc:2,f:"thief",wx:"bắt được kẻ gian",l:{},lx:"không kịp giờ dâng lễ",rt:"Kẻ đánh tráo là một thông dịch người Đại Hy.",rf:"Không tra ra, lễ dâng thiếu."}]},
 c1:{h:"Hoàng huynh đòi giảm cống",w:"emp",t:"Hoàng huynh nói riêng với ngươi: Nam Chiếu mất mùa, xin Đại Hy giảm cống ba năm.",o:[
  {n:"Nói giúp với Hoàng thượng",need:["nsrv"],c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"cố quốc nhẹ gánh",l:{sung:-3},lx:"ngài cho là ngươi bênh cố quốc",rt:"Hoàng thượng chuẩn giảm một năm.",rf:"Hoàng thượng không vui."},
  {n:"Khuyên huynh đổi cống lấy mở chợ biên",c:{suc:-2},o:()=>40+S.tai/4,sc:2,wx:"cả hai nước có lợi",l:{},lx:"huynh không nghe",rt:"Lễ bộ khen kế hay.",rf:"Hoàng huynh lắc đầu."}]},
 c2:{h:"Sứ đoàn gây gổ",w:"maid",t:"Một võ sĩ trong sứ đoàn đánh bị thương lính Đại Hy trong quán rượu.",o:[
  {n:"Xin xử theo luật Đại Hy",c:{},w:{th:5,danh:3},wx:"triều đình thấy ngươi công minh",lx:"hoàng huynh giận",rt:"Võ sĩ bị đánh trượng."},
  {n:"Bồi thường riêng cho êm",c:{bac:-50},sc:1,wx:"không ai mất mặt",rt:"Người lính nhận bạc, chuyện êm."}]},
 c3:{h:"Thái hậu thử ngươi",w:"th",need:["th"],t:"Thái hậu hỏi ngươi trước mặt sứ đoàn: “Ngươi là người nước nào?”",o:[
  {n:"Thưa: con dâu Đại Hy",c:{},w:{th:8},wx:"Thái hậu hài lòng",lx:"hoàng huynh tủi lòng",rt:"Thái hậu gật đầu."},
  {n:"Thưa: con của hai nước",c:{},o:()=>40+S.tai/4,w:{th:5,danh:3},sc:1,wx:"cả hai bên nể",l:{th:-5},rt:"Thái hậu khen câu đáp khéo.",rf:"Thái hậu cho là ngươi chưa dứt cố quốc."}]},
 t1:{h:"Hoàng huynh nhờ một việc riêng",w:"maid",t:"Hoàng huynh xin ngươi tác thành cho hắn với một công chúa Đại Hy, kết thân hai nhà.",o:[
  {n:"Đứng ra mai mối",c:{suc:-3},o:50,sc:2,wx:"hai nước thêm thân",l:{th:-4},rt:"Thái hậu có vẻ ưng.",rf:"Thái hậu gạt đi."},
  {n:"Khuyên huynh thôi",c:{},w:{duc:2},wx:"tránh rắc rối",lx:"huynh buồn",rt:"Hoàng huynh im lặng."}]},
 x1:{h:"Yến tiễn sứ",w:"emp",t:"Yến tiễn sứ đoàn. Hoàng thượng định viết quốc thư trả lời Nam Chiếu, hỏi ý ngươi.",o:[
  {n:"Đề nghị minh ước hữu hảo mười năm",c:{suc:-3},o:A=>40+S.tai/6,e:["win","mid"],rt:"Minh ước được ký, hai nước mở chợ biên.",rf:"Quốc thư chỉ có lời khách sáo."},
  {n:"Đề nghị Đại Hy nhận thêm cống phẩm",c:{},o:55,e:["win2","lose"],rt:"Hoàng thượng hài lòng, Nam Chiếu nhận lời.",rf:"Hoàng huynh giận dữ bỏ về, quan hệ xấu đi."},
  {n:"Không dám bàn",c:{},w:{duc:2},e:"mid",lx:"bỏ lỡ cơ duyên",rt:"Ngươi chỉ rót rượu."}]}},
 E:{win:{k:1,tag:"Chiếc cầu hai nước",w:"emp",t:"Minh ước ra đời nhờ ngươi. Chợ biên tấp nập, Hoàng thượng và Thái hậu đều nể ngươi.",fx:{danh:10,th:10,sung:4},go:()=>e67bien(5)},
  win2:{k:1,tag:"Được lòng Hoàng thượng",t:"Hoàng thượng thấy ngươi đặt Đại Hy lên trước. Ngài tin ngươi hơn.",fx:{sung:8,th:6}},
  mid:{k:0,tag:"Sứ đoàn về yên",t:"Sứ đoàn về nước, không có gì lớn lao.",fx:{duc:2}},
  lose:{k:-1,tag:"Hai nước lạnh nhạt",t:"Sứ đoàn bỏ về trong giận dữ. Ngươi bị coi là nguyên nhân.",fx:{danh:-6,sung:-6},go:()=>e67bien(-5)}}};
ARC67.nc_tuc={o:"nc",t:"Người ngoại tộc",w:"th",sj:"phong tục Nam Chiếu của ngươi",g:"Thái hậu không ưa người ngoại tộc. Áo váy, món ăn, điệu múa của ngươi đều bị soi. Giữ lấy mình mà vẫn được Đức Thọ cung chấp nhận.",
 p:[["s1","s2"],["c1","c2","c3","G.rumor","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời chê áo váy",w:"th",need:["th"],t:"Thái hậu nhìn bộ váy thêu chim công của ngươi: “Trong cung Đại Hy không mặc thế.”",o:[
  {n:"Đổi sang y phục Đại Hy",c:{danh:-2},w:{th:6},f:"bend",wx:"Thái hậu hài lòng",lx:"mất nét riêng",rt:"Thái hậu khẽ gật."},
  {n:"Giải thích ý nghĩa chim công",c:{},o:()=>40+S.tai/4,w:{th:4,danh:3},sc:1,f:"keep",wx:"Thái hậu thấy lạ mà hay",l:{th:-6},rt:"Thái hậu nghe đến ‘chim công báo điềm lành’, bà mỉm cười.",rf:"Thái hậu phẩy tay."}]},
 s2:{h:"Món ăn quê nhà",w:"maid",t:"Ngươi nấu món cá nướng lá chuối quê nhà. Mùi thơm lan ra cả hậu cung, người khen kẻ chê.",o:[
  {n:"Dâng một phần lên Thái hậu",c:{bac:-10},o:50,w:{th:6},sc:1,f:"keep",wx:"Thái hậu nếm thử",l:{th:-4},rt:"Thái hậu ăn hết.",rf:"Thái hậu chê tanh."},
  {n:"Thôi nấu, cho đỡ điều tiếng",c:{},w:{duc:2},f:"bend",wx:"yên chuyện",lx:"nhớ nhà",rt:"Bếp nhỏ tắt lửa."}]},
 c1:{h:"Thái hậu đau lưng",w:"th",need:["th"],t:"Thái hậu đau lưng, thái y bó tay. Ngươi biết một bài thuốc đắp của Nam Chiếu.",o:[
  {n:"Xin dâng thuốc quê nhà",c:{suc:-3},o:()=>45+S.arts.y*6,w:{th:12},sc:2,f:"keep",wx:"Thái hậu đỡ đau",l:{th:-8},lx:"thuốc không hợp",rt:"Thái hậu ngủ được một giấc ngon.",rf:"Thuốc làm Thái hậu nổi mẩn."},
  {n:"Không dám, sợ mang họa",c:{},w:{tamco:2},wx:"không rủi ro",lx:"bỏ lỡ cơ duyên",rt:"Ngươi im lặng."}]},
 c2:{h:"Lễ hội té nước",w:"maid",t:"Tết Nam Chiếu đến. Ngươi muốn làm lễ té nước nhỏ trong cung.",o:[
  {n:"Mời các phi tần cùng chơi",c:{bac:-30},o:50,w:{danh:5},sc:1,f:"keep",wx:"thêm người quen",l:{th:-6},lx:"Thái hậu chê ồn",rt:"Cả hậu cung cười vui.",rf:"Thái hậu sai người dẹp."},
  {n:"Lặng lẽ thắp hương một mình",c:{suc:-2},w:{duc:3},f:"bend",wx:"tròn lễ mà không ồn",rt:"Ngươi thắp hương hướng về phương Nam."}]},
 c3:{h:"Học chữ Hán",w:"th",t:"Có người chê ngươi viết chữ Hán như gà bới.",o:[
  {n:"Ngày đêm luyện chữ",c:{suc:-6},w:{tai:4,th:3},f:"bend",wx:"chữ đẹp lên",rt:"Ba tháng sau chữ ngươi đã ngay ngắn."},
  {n:"Viết thơ bằng chữ Nam Chiếu tặng Hoàng thượng",need:["nsrv"],c:{},o:50,w:{sung:5},sc:1,f:"keep",wx:"ngài thấy mới lạ",l:{danh:-3},rt:"Hoàng thượng đòi ngươi đọc cho ngài nghe.",rf:"Có người nói ngươi viết bùa chú."}]},
 t1:{h:"Thái hậu mời ngươi chép kinh",w:"th",need:["th"],t:"Thái hậu bỗng gọi ngươi chép kinh cùng bà, ngồi cả buổi.",o:[
  {n:"Kể chuyện Phật giáo Nam Chiếu",c:{},o:A=>45+(A.f.keep?10:0),sc:1,wx:"Thái hậu tò mò",l:{th:-4},rt:"Thái hậu nghe say mê.",rf:"Thái hậu bảo ngươi im lặng mà chép."},
  {n:"Chép kinh cẩn thận, không nói",c:{suc:-4},w:{th:6},f:"bend",wx:"Thái hậu khen nết na",rt:"Thái hậu gật đầu."}]},
 x1:{h:"Đại thọ Thái hậu",w:"th",t:"Đại thọ Thái hậu. Mỗi phi tần dâng một lễ. Lễ của ngươi sẽ nói ngươi là ai.",o:[
  {n:"Dâng điệu múa chim công cầu thọ",c:{suc:-5},o:A=>35+(A.f.keep?20:0)+S.arts.vu*6,e:["win","lose"],rt:"Thái hậu đứng dậy vỗ tay, gọi ngươi là ‘con chim công của ai gia’.",rf:"Thái hậu cau mày, cả yến im bặt."},
  {n:"Dâng bộ kinh chép tay",c:{suc:-4},o:A=>50+(A.f.bend?20:0),e:["win2","mid"],rt:"Thái hậu khen ngươi nay đã là con dâu Đại Hy.",rf:"Thái hậu nhận kinh, không nói gì."},
  {n:"Dâng lễ vật quý, đứng sau",c:{bac:-60},w:{th:3},e:"mid",lx:"không ai nhớ lễ của ngươi",rt:"Lễ vật đặt lẫn trong trăm lễ."}]}},
 E:{win:{k:1,tag:"Chim công của Thái hậu",w:"th",t:"Thái hậu thương ngươi như con. Giữ được mình mà vẫn được chấp nhận, ngươi là người ngoại tộc đầu tiên làm được thế.",fx:{th:20,danh:6}},
  win2:{k:1,tag:"Con dâu Đại Hy",w:"th",t:"Thái hậu coi ngươi là người nhà. Ngươi đã thành người Đại Hy, dù trong lòng còn nhớ quê.",fx:{th:15,duc:3}},
  mid:{k:0,tag:"Được dung, chưa được thương",t:"Thái hậu thôi chê ngươi, nhưng cũng chưa thương.",fx:{th:4}},
  lose:{k:-1,tag:"Mãi là người ngoài",t:"Thái hậu chán ghét ngươi hơn. Trong cung, người ta gọi ngươi là ‘con man nữ’.",fx:{th:-15,danh:-6}}}};
ARC67.nc_vuong={o:"nc",t:"Ngai vàng cố quốc",w:"emp",sj:"cuộc tranh ngôi ở Nam Chiếu",g:"Phụ vương băng hà. Hoàng huynh và hoàng thúc tranh ngôi, cả hai đều xin Đại Hy ủng hộ, và đều nhắm đến ngươi. Chọn phe nào, Đại Hy sẽ theo.",
 p:[["s1","s2"],["c1","c2","c3","G.night","G.spy"],["t1"],["x1"]],
 B:{
 s1:{h:"Tin phụ vương băng hà",w:"maid",t:"Thư báo tang từ Nam Chiếu. Ngươi khóc suốt đêm.",o:[
  {n:"Xin Hoàng thượng cho để tang",need:["nsrv"],c:{sung:-2},w:{duc:4},sc:1,wx:"ngài thương ngươi",rt:"Hoàng thượng cho ngươi để tang ba tháng."},
  {n:"Nén lòng, vẫn hầu ngài",c:{suc:-5},w:{sung:3},wx:"không lơ là",lx:"bị chê bạc tình",rt:"Ngươi gượng cười."}]},
 s2:{h:"Hai phong thư",w:"maid",t:"Cùng một tuần, hai phong thư: hoàng huynh hứa phong ngươi làm Trưởng công chúa; hoàng thúc hứa dâng Đại Hy ba châu.",o:[
  {n:"Đọc kỹ, dò xem ai được lòng dân",c:{bac:-30},o:()=>40+S.mat*6,sc:1,f:"know",wx:"biết phe nào mạnh",l:{},lx:"dò không ra",rt:"Hoàng huynh được lòng dân, hoàng thúc nắm quân.",rf:"Tin về rối rắm."},
  {n:"Trình cả hai thư lên Hoàng thượng",c:{},w:{th:5,sung:2},f:"court",wx:"ngài tin ngươi",lx:"ngươi mất quyền chọn",rt:"Hoàng thượng khen ngươi thẳng thắn."}]},
 c1:{h:"Hoàng thúc gửi lễ",w:"maid",t:"Sứ của hoàng thúc mang ba rương vàng vào cung ngươi.",o:[
  {n:"Nhận vàng",c:{duc:-3},w:{bac:120},f:"uncle",wx:"giàu lên",lx:"bị coi là đã chọn phe",rt:"Ba rương vàng vào kho."},
  {n:"Trả lại",c:{},w:{duc:3},f:"bro",wx:"giữ tay sạch",lx:"hoàng thúc giận",rt:"Sứ của hoàng thúc mặt sa sầm."}]},
 c2:{h:"Triều đình chia phe",w:"emp",t:"Triều thần Đại Hy chia phe: Binh bộ muốn theo hoàng thúc lấy ba châu, Lễ bộ muốn theo hoàng huynh cho chính danh.",o:[
  {n:"Vận động Lễ bộ",c:{bac:-40},sc:1,f:"bro",wx:"phe hoàng huynh mạnh lên",rt:"Lễ bộ dâng sớ ủng hộ hoàng huynh."},
  {n:"Vận động Binh bộ",c:{bac:-40},sc:1,f:"uncle",wx:"phe hoàng thúc mạnh lên",rt:"Binh bộ đòi xuất quân giúp hoàng thúc."}]},
 c3:{h:"Hoàng huynh gặp nguy",w:"maid",t:"Tin về: hoàng huynh bị vây ở kinh đô Nam Chiếu, xin ngươi cầu viện.",o:[
  {n:"Quỳ xin Hoàng thượng cứu",need:["nsrv"],c:{sung:-4},o:()=>40+S.sung/4,sc:1,f:"bro",wx:"Đại Hy có thể xuất quân",l:{sung:-4},rt:"Hoàng thượng hứa cân nhắc.",rf:"Hoàng thượng bảo việc nước người, không xen."},
  {n:"Gửi bạc riêng giúp huynh",c:{bac:-60},sc:1,f:"bro",wx:"huynh cầm cự thêm",rt:"Bạc đến kịp."}]},
 t1:{h:"Ai đáng làm vua",w:"emp",t:"Hoàng thượng hỏi riêng: “{Goi} nói thật đi: huynh {goi} hay thúc {goi}, ai sẽ thắng?”",o:[
  {n:"Nói thật những gì đã dò được",if:A=>A.f.know,c:{},sc:2,w:{sung:3},wx:"ngài quyết đúng hơn",lx:"không còn đường lui",rt:"Hoàng thượng gật gù."},
  {n:"Nói theo lòng mình",c:{},o:50,sc:1,wx:"ngài nghe ngươi",l:{sung:-3},rt:"Hoàng thượng tin ngươi.",rf:"Hoàng thượng nghi ngươi thiên vị."}]},
 x1:{h:"Đại Hy chọn phe",w:"emp",t:"Hoàng thượng phải ra quyết định cuối cùng, và ngài muốn nghe ngươi.",o:[
  {n:"Khuyên ủng hộ hoàng huynh",c:{suc:-3},o:A=>35+(A.f.bro?15:0)+(A.f.know?10:0),e:["win","lose"],rt:"Hoàng huynh lên ngôi, gửi quốc thư tôn Đại Hy làm thượng quốc.",rf:"Hoàng huynh thua trận, Đại Hy mất mặt."},
  {n:"Khuyên ủng hộ hoàng thúc",c:{duc:-2},o:A=>40+(A.f.uncle?15:0)+(A.f.know?10:0),e:["win2","lose"],rt:"Hoàng thúc lên ngôi, dâng ba châu cho Đại Hy.",rf:"Hoàng thúc thua, Nam Chiếu thù Đại Hy."},
  {n:"Khuyên đứng ngoài",c:{},w:{duc:3},e:"mid",lx:"mất ảnh hưởng ở cố quốc",rt:"Đại Hy đứng ngoài."}]}},
 E:{win:{k:1,tag:"Hoàng huynh lên ngôi",w:"emp",t:"Hoàng huynh lên ngôi Nam Chiếu, tôn ngươi làm Trưởng công chúa. Đại Hy có một đồng minh trung thành, Hoàng thượng nể ngươi.",fx:{danh:10,sung:5,bac:80},go:()=>e67bien(6)},
  win2:{k:1,tag:"Ba châu về Đại Hy",w:"emp",t:"Hoàng thúc lên ngôi, dâng ba châu. Hoàng thượng mừng rỡ, ban thưởng cho ngươi.",fx:{sung:8,danh:6},go:()=>e67bien(8)},
  mid:{k:0,tag:"Cố quốc xa dần",t:"Nam Chiếu tự lo chuyện nhà. Ngươi thành người Đại Hy hơn bao giờ hết.",fx:{th:5,duc:2}},
  lose:{k:-1,tag:"Đặt cược sai phe",t:"Phe ngươi khuyên đã thua. Đại Hy mất mặt, Hoàng thượng trách ngươi.",fx:{sung:-8,danh:-8},go:()=>e67bien(-6)}}};
/* ================= CON GÁI TỘI THẦN ================= */
function foe67(){return rivals.find(x=>x.enemy&&x.alive&&!x.out)||null}
ARC67.td_an={o:"td",t:"Lật lại án cũ",w:"foe",sj:"án mưu phản của nhà ngươi",g:"Cả nhà ngươi bị vu mưu phản. Kẻ dâng sớ là {foed}; con gái hắn, {foe}, đang ở trong cung. Gom chứng cứ, giữ nhân chứng, chờ đúng lúc mà dâng sớ.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.ill"],["t1"],["x1"]],
 B:{
 s1:{h:"Kho hồ sơ Hình bộ",w:"maid",t:"Một thư lại già ở Hình bộ, từng nhận ơn cha ngươi, nhắn rằng hồ sơ án cũ còn nằm trong kho.",o:[
  {n:"Bỏ bạc nhờ ông chép lại",c:{bac:-40},o:55,sc:1,wx:"có bản chép hồ sơ",l:{},lx:"ông sợ, bỏ dở",rt:"Bản chép hồ sơ về tay ngươi.",rf:"Thư lại sợ hãi, xin thôi."},
  {n:"Đợi thời, chưa động",c:{},w:{tamco:2},wx:"không lộ mình",lx:"hồ sơ có thể bị hủy",rt:"Ngươi dặn ông giữ kín."}]},
 s2:{h:"{foe} để ý ngươi",w:"foe",t:"{foe} nhìn ngươi rất lâu trong buổi thỉnh an: “Muội trông quen lắm. Muội quê ở đâu?”",o:[
  {n:"Bịa một quê quán",c:{},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"nàng không nghi",l:{},lx:"nàng sinh nghi",rt:"{foe} gật gù cho qua.",rf:"{foe} nhíu mày, ghi nhớ."},
  {n:"Mỉm cười không đáp",c:{danh:-1},w:{duc:2},wx:"không nói dối",lx:"nàng tò mò hơn",rt:"Ngươi đổi chủ đề."}]},
 c1:{h:"Nhân chứng bị truy sát",w:"maid",t:"Lão thái giám họ Vương, người duy nhất còn sống biết sự thật, đang bị người của {foed} lùng.",o:[
  {n:"Giấu ông ở Tân Giả khố",c:{bac:-40},sc:1,f:"wit",wx:"giữ được nhân chứng",lx:"giấu người là tội",rt:"Lão Vương được giấu an toàn."},
  {n:"Đưa ông ra khỏi kinh",c:{bac:-60},o:60,sc:1,f:"wit",wx:"nhân chứng an toàn mà xa",l:{},lx:"bị chặn đường",rt:"Lão Vương về một ngôi chùa ở Giang Nam.",rf:"Người của {foed} chặn đường, lão Vương chạy thoát nhưng mất tích."},
  {n:"Mặc kệ",c:{},w:{tamco:1},wx:"không dính vào",lx:"mất nhân chứng",rt:"Ít hôm sau, xác lão Vương nổi trên sông."}]},
 c2:{h:"Thư tay của {foed}",w:"maid",t:"Có tin: {foed} từng viết thư sai người làm giả ấn của cha ngươi. Thư nằm trong phủ hắn.",o:[
  {n:"Mua chuộc gia nhân phủ hắn",c:{bac:-50},o:()=>35+S.mat*6,sc:2,wx:"có thư tay",l:{},lx:"gia nhân báo chủ",rt:"Bức thư về tay ngươi.",rf:"Gia nhân báo lại, {foed} đề phòng."},
  {n:"Nhờ người trong cung {foe} lục tìm",c:{bac:-30},o:()=>30+S.tamco/3,sc:1,wx:"có manh mối",l:{},lx:"{foe} biết",go:(A,ok)=>{const v=foe67();if(v&&!ok)oanAdd(v,S,10)},rt:"Một mảnh thư nháp lọt ra.",rf:"{foe} bắt được người của ngươi."}]},
 c3:{h:"Phải lên cao mới dâng được sớ",w:"emp",t:"Thư lại nhắc: phi tần bậc thấp dâng sớ lật án tiên đế thì không ai đọc. Phải được Hoàng thượng tin.",o:[
  {n:"Dồn sức lấy lòng Hoàng thượng",need:["nsrv"],c:{suc:-6},w:{sung:6},sc:1,wx:"gần ngài hơn",rt:"Hoàng thượng ghé cung ngươi nhiều hơn."},
  {n:"Lấy lòng Thái hậu",need:["th"],c:{bac:-40},w:{th:8},sc:1,wx:"có người nói giúp",rt:"Thái hậu khen ngươi hiếu thuận."}]},
 t1:{h:"{foed} ra tay trước",w:"foe",t:"{foed} đánh hơi thấy, sai người đốt kho hồ sơ Hình bộ trong đêm.",o:[
  {n:"Cho người cứu hồ sơ",c:{bac:-40},o:()=>45+S.mat*5,sc:2,wx:"giữ được hồ sơ, bắt được kẻ phóng hỏa",l:{},lx:"cháy sạch",rt:"Kẻ phóng hỏa bị bắt, khai là gia nhân của {foed}.",rf:"Kho cháy sạch, một chứng cứ mất."},
  {n:"Đã chép sẵn, mặc kệ",c:{},w:{tamco:2},wx:"không lộ mặt",lx:"mất bản gốc",rt:"Ngươi chỉ còn bản chép."}]},
 x1:{h:"Dâng sớ lật án",w:"emp",t:"Đủ hay chưa, đây là lúc. Hoàng thượng đang vui, Thái hậu đang ở bên.",o:[
  {n:"Dâng sớ, đưa nhân chứng ra",c:{suc:-5},o:A=>25+(A.f.wit?15:0)+S.danh/6+S.sung/8,e:["win","lose"],rt:"Án cũ được lật. Cả nhà ngươi được truy phong, {foed} bị xử.",rf:"Hoàng thượng nổi giận vì ngươi lật án tiên đế."},
  {n:"Chỉ xin truy phong cho cha, không đòi trị tội ai",c:{},o:A=>50+(A.f.wit?10:0),e:["mid","lose"],rt:"Cha ngươi được truy phục danh dự.",rf:"Hoàng thượng không muốn nhắc chuyện cũ."},
  {n:"Gác lại, sống tiếp",c:{},w:{duc:4},e:"mid",lx:"mối thù chưa trả",rt:"Ngươi cất tờ sớ."}]}},
 E:{win:{k:1,tag:"Đã báo thù",w:"emp",t:"Án cũ được lật. Nhà ngươi được rửa oan, {foed} bị xử trảm, {foe} bị đày vào lãnh cung. Hoàng thượng thương ngươi chịu khổ.",fx:{danh:15,sung:5},go:()=>{S.avenged=true;const e=foe67();if(e){e.out=true;return `${e.name} bị phế vào lãnh cung.`}return""}},
  mid:{k:0,tag:"Cha được truy phong",t:"Cha ngươi được truy phục danh dự, nhưng kẻ thù vẫn ung dung. Ngươi nhẹ lòng được một nửa.",fx:{danh:5,duc:3}},
  lose:{k:-1,tag:"Lật án bất thành",t:"Hoàng thượng thu hủy chứng cứ, cấm nhắc chuyện cũ. {foe} cười trên nỗi đau của ngươi.",fx:{sung:-8,danh:-6},go:()=>{apply({sung:-3});return "Hoàng thượng không ghé một thời gian: Sủng -3."}}}};
ARC67.td_ke={o:"td",t:"Kẻ đứng sau màn",w:"maid",sj:"kẻ thật sự hại nhà ngươi",g:"Càng lần theo án cũ, ngươi càng thấy {foed} chỉ là con dao. Bàn tay cầm dao ở cao hơn. Tìm ra hắn, rồi chọn: trả thù kẻ nào, và trả bằng cách nào.",
 cast(A){A.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]);return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Một chi tiết không khớp",w:"maid",t:"Đọc lại án cũ, ngươi thấy: {foed} khi ấy chỉ là quan nhỏ, không thể tự mình giả được ấn Binh bộ.",o:[
  {n:"Lần theo người giả ấn",c:{bac:-40},o:50,sc:1,wx:"có thêm manh mối",l:{},lx:"đường dây đứt",rt:"Thợ giả ấn khai nhận việc từ một gia nhân của {n1}.",rf:"Thợ giả ấn đã chết từ lâu."},
  {n:"Hỏi thẳng {foe}, xem nàng biết gì",c:{},o:()=>40+S.tamco/4,sc:1,f:"foeTalk",wx:"biết cha nàng cũng bị ép",l:{},lx:"{foe} cảnh giác",rt:"{foe} buột miệng: cha nàng từng sợ {n1}.",rf:"{foe} bỏ đi, ánh mắt đầy nghi ngờ."}]},
 s2:{h:"Người gửi tiền cho ngươi",w:"maid",t:"Ngươi chợt nhớ: năm ấy có người lén gửi bạc nuôi ngươi ở lại. Người ấy là ai?",o:[
  {n:"Tìm lại người đưa bạc",c:{bac:-30},o:50,sc:1,f:"ally",wx:"có người cùng chí",l:{},lx:"không tìm được",rt:"Người đưa bạc là môn sinh cũ của cha, nay làm Ngự sử.",rf:"Dấu vết đã mất."},
  {n:"Thôi, không đào sâu",c:{},w:{duc:2},wx:"bớt nguy",lx:"mất một đồng minh tiềm năng",rt:"Ngươi không tìm."}]},
 c1:{h:"Ngự sử giúp sức",w:"maid",t:"Ngự sử, môn sinh cũ của cha, xin gặp ngươi: ông có sổ sách chi tiêu bất minh của {n1}.",o:[
  {n:"Nhận sổ, giữ kỹ",c:{},sc:2,f:"ledger",wx:"có chứng cứ lớn",lx:"giữ sổ là giữ lửa",rt:"Sổ sách về tay ngươi."},
  {n:"Bảo ông tự dâng lên",c:{},o:45,sc:1,wx:"ngươi không lộ mặt",l:{},lx:"ông bị giáng",rt:"Ngự sử dâng sớ, triều đình xôn xao.",rf:"Ngự sử bị giáng ra ngoài."}]},
 c2:{h:"{n1} cảnh cáo",w:"maid",t:"Một hộp quà từ phủ {n1} gửi vào cung ngươi: trong là một chiếc trâm gãy đôi.",o:[
  {n:"Tăng người canh cung",c:{bac:-40},w:{tamco:2},sc:1,wx:"an toàn hơn",rt:"Cung ngươi canh nghiêm."},
  {n:"Trình hộp quà lên Thái hậu",need:["th"],c:{},o:50,w:{th:5},sc:1,wx:"Thái hậu biết có kẻ uy hiếp ngươi",l:{},lx:"Thái hậu ngại phiền",rt:"Thái hậu nheo mắt, ghi nhớ tên {n1}.",rf:"Thái hậu bảo ngươi đừng làm to chuyện."}]},
 c3:{h:"{foe} cũng là con cờ",w:"foe",t:"{foe} tìm gặp ngươi: cha nàng muốn khai ra {n1} nhưng sợ cả nhà bị diệt.",o:[
  {n:"Hứa che chở nhà nàng nếu khai",c:{},o:A=>40+(A.f.foeTalk?20:0),sc:2,f:"turn",wx:"{foed} có thể quay sang làm chứng",l:{},lx:"bị lừa",rt:"{foe} gật đầu, mắt đỏ hoe.",rf:"Đó là cái bẫy, {foe} báo lại cho cha."},
  {n:"Từ chối: ngươi không tha nhà nàng",c:{},w:{tamco:2},wx:"giữ trọn mối thù",lx:"mất một nhân chứng",rt:"{foe} ra về."}]},
 t1:{h:"Hai kẻ thù, một sớ tấu",w:"emp",t:"Ngươi chỉ có thể dâng một tờ sớ. Nhắm vào {foed}, kẻ ra tay, hay {n1}, kẻ chủ mưu?",o:[
  {n:"Nhắm vào {n1}",c:{},sc:1,f:"big",wx:"trừ tận gốc",lx:"đối thủ mạnh hơn nhiều",rt:"Ngươi soạn sớ nhắm vào {n1}."},
  {n:"Nhắm vào {foed}",c:{},w:{tamco:1},f:"small",wx:"dễ thắng hơn",lx:"kẻ chủ mưu thoát",rt:"Ngươi soạn sớ nhắm vào {foed}."}]},
 x1:{h:"Đêm dâng sớ",w:"emp",t:"Ngươi quỳ trước ngự án, tờ sớ trong tay.",o:[
  {n:"Vạch tội {n1}",c:{suc:-5},o:A=>25+(A.f.ledger?15:0)+(A.f.turn?15:0),e:["win","lose"],rt:"{n1} bị cách chức tra xét, cả án cũ lật lại.",rf:"{n1} quyền thế quá lớn, sớ bị bác."},
  {n:"Vạch tội {foed}",c:{suc:-3},o:A=>45+(A.f.ledger?10:0),e:["mid","lose"],rt:"{foed} bị cách chức, nhà ngươi được truy phong.",rf:"{foed} chối được, sớ bị gác."},
  {n:"Cất sớ, để Ngự sử lo",c:{},w:{duc:3},e:"mid",lx:"không tự tay trả thù",rt:"Ngươi giao hết cho Ngự sử."}]}},
 E:{win:{k:1,tag:"Trừ tận gốc",w:"emp",t:"Kẻ chủ mưu thật sự sụp đổ, án cũ được lật hoàn toàn. Cả triều nể ngươi, Hoàng thượng thấy ngươi giúp ngài trừ một quyền thần.",fx:{danh:15,sung:6},go:()=>{S.avenged=true;return ""}},
  mid:{k:0,tag:"Báo thù một nửa",t:"Một kẻ thù đã ngã, kẻ kia còn đó. Nhà ngươi được truy phong, nhưng ngươi biết mối thù chưa hết.",fx:{danh:6}},
  lose:{k:-1,tag:"Sớ bị bác",t:"Sớ bị bác, ngươi bị Hoàng thượng trách là gây sóng gió. Kẻ thù cười khẩy.",fx:{sung:-8,danh:-8}}}};
ARC67.td_song={o:"td",t:"Người em còn sống",w:"maid",sj:"chuyện em trai ngươi còn sống",g:"Ngươi tưởng cả nhà đã chết. Một chiếc vòng bạc gửi vào cung cho ngươi biết: em trai út còn sống, đang làm lính phu ở biên ải dưới tên giả. Cứu em mà không để ai biết em là con tội thần.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Chiếc vòng bạc",w:"maid",t:"Một lái buôn đưa vào chiếc vòng bạc mẹ ngươi đeo cho em út năm nào, kèm lời: ‘Lính phu Nhạn Môn, tên Tiểu Thạch.’",o:[
  {n:"Gửi bạc ra biên lo cho em",c:{bac:-50},sc:1,wx:"em bớt khổ",lx:"tiền đi dễ bị dò",rt:"Em nhận được bạc, gửi lại một nét chữ nguệch ngoạc."},
  {n:"Tra xem lái buôn là ai",c:{bac:-20},o:50,sc:1,f:"safe",wx:"biết tin này không phải bẫy",l:{},lx:"lái buôn biến mất",rt:"Lái buôn là người quen cũ của cha, đáng tin.",rf:"Lái buôn đã đi mất."}]},
 s2:{h:"Kẻ dò la",w:"foe",t:"{foe} bỗng hỏi ngươi có người thân nào ở biên ải không.",o:[
  {n:"Chối thẳng",c:{},o:()=>45+S.tamco/4,w:{tamco:2},wx:"nàng không nghi",l:{},lx:"nàng càng nghi",rt:"{foe} bỏ qua.",rf:"{foe} cho người đi dò."},
  {n:"Nói có một người họ xa",c:{danh:-1},w:{duc:2},sc:1,wx:"lời dối nhỏ dễ giữ",rt:"{foe} không hỏi thêm."}]},
 c1:{h:"Em bị bắt lính đánh trận",w:"maid",t:"Tin về: đội lính phu của em sắp bị đưa lên tuyến đầu.",o:[
  {n:"Nhờ người xin cho em làm hỏa đầu quân",c:{bac:-50},o:60,sc:1,f:"safe",wx:"em tránh tuyến đầu",l:{},lx:"không kịp",rt:"Em được đổi sang nấu bếp.",rf:"Lệnh đã ban, em lên tuyến đầu."},
  {n:"Tin vào số mệnh",c:{},w:{suc:2},wx:"không lộ",lx:"em gặp nguy",rt:"Ngươi thắp hương cầu an."}]},
 c2:{h:"Em lập công",w:"maid",t:"Trong một trận, em ngươi cõng một phó tướng bị thương thoát vòng vây. Phó tướng muốn tiến cử em.",o:[
  {n:"Để em nhận công",c:{},o:50,sc:2,wx:"em có đường thăng tiến",l:{},lx:"tên giả có thể bị tra",rt:"Em được thăng làm thập trưởng.",rf:"Khi ghi công, có người tra quê quán của em."},
  {n:"Dặn em từ chối",c:{},w:{tamco:2},f:"safe",wx:"giữ kín thân phận",lx:"mất công",rt:"Em từ chối, phó tướng càng quý."}]},
 c3:{h:"Hoàng thượng hỏi chuyện biên ải",w:"emp",need:["nsrv"],t:"Hoàng thượng nhắc đến một tên lính trẻ cứu phó tướng ở Nhạn Môn. Mắt ngươi rưng rưng.",o:[
  {n:"Khen chàng lính trẻ ấy",c:{},o:50,sc:1,wx:"ngài nhớ tên em",l:{sung:-3},lx:"ngài thấy ngươi lạ",rt:"Hoàng thượng gật đầu: ‘Trẫm sẽ thưởng.’",rf:"Hoàng thượng hỏi sao ngươi xúc động."},
  {n:"Lặng im",lx:"bỏ lỡ dịp để ngài nhớ tên em",c:{},w:{tamco:2},wx:"không lộ",rt:"Ngươi rót trà, giấu mắt đi."}]},
 t1:{h:"Thân phận em bị tra",w:"maid",t:"Có kẻ nhận ra Tiểu Thạch giống hệt con trai út của tội thần năm xưa.",o:[
  {n:"Cho em trốn đi xa",c:{bac:-60},o:60,f:"run",wx:"em an toàn",l:{},lx:"bị bắt khi trốn",rt:"Em biến mất vào núi.",rf:"Em bị bắt giữa đường."},
  {n:"Chuẩn bị xin ân xá",c:{suc:-3},sc:1,f:"plea",wx:"vào cao trào",lx:"phải nhận thân phận",rt:"Ngươi soạn tờ xin ân xá."}]},
 x1:{h:"Số phận người em",w:"emp",t:"Tin đến tai Hoàng thượng: con trai tội thần đang trong quân ngũ, lại vừa lập công.",o:[
  {n:"Quỳ nhận em, xin ân xá vì công trận",c:{suc:-4},o:A=>35+(A.f.plea?15:0)+S.sung/6,e:["win","lose"],rt:"Hoàng thượng xá tội cho em, cho giữ công trận.",rf:"Hoàng thượng giận vì ngươi giấu giếm."},
  {n:"Phủ nhận, để em tự lo",c:{duc:-3},o:A=>45+(A.f.run?15:0)+(A.f.safe?10:0),e:["mid","lose"],rt:"Không ai chứng minh được gì, em lặng lẽ sống.",rf:"Em bị bắt, ngươi bị nghi."},
  {n:"Xin cho em vào chùa tu",c:{bac:-40},w:{duc:3},e:"mid",lx:"em mất công danh",rt:"Em xuống tóc ở chùa Hộ Quốc."}]}},
 E:{win:{k:1,tag:"Em được ân xá",w:"emp",t:"Em ngươi được ân xá, giữ công trận, sau này là tướng. Hoàng thượng cảm động vì tình chị em, thương ngươi hơn.",fx:{sung:6,danh:8,duc:3}},
  mid:{k:0,tag:"Em sống lặng lẽ",t:"Em ngươi giữ được mạng, sống lặng lẽ. Ngươi không thể nhận em, nhưng biết em còn đó.",fx:{duc:3}},
  lose:{k:-1,tag:"Em bị lưu đày",t:"Em ngươi bị lưu đày ra hải đảo. Hoàng thượng lạnh nhạt vì ngươi giấu giếm.",fx:{sung:-8,danh:-5}}}};
ARC67.td_tha={o:"td",t:"Thù hay tha",w:"foe",sj:"mối thù với nhà {foe}",g:"{foe} là con gái kẻ hại nhà ngươi. Nhưng nàng chẳng làm gì ngươi, và nay chính nàng đang gặp nạn. Trả thù cha qua con, hay cởi nút thắt này theo cách khác.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"{foe} ngã bệnh",w:"foe",t:"{foe} sốt cao, thái y bó tay. Ngươi biết một bài thuốc cha ngươi để lại.",o:[
  {n:"Lén gửi bài thuốc",c:{suc:-2},o:55,w:{duc:4},sc:1,f:"mercy",wx:"{foe} khỏi bệnh",l:{},lx:"thuốc không hợp",rt:"{foe} hạ sốt, không biết ai cứu.",rf:"Thuốc không đủ, {foe} vẫn ốm."},
  {n:"Để mặc trời định",c:{duc:-3},w:{tamco:2},f:"hate",wx:"không giúp kẻ thù",rt:"Ngươi không làm gì."}]},
 s2:{h:"Nỗi đau của {foe}",w:"foe",t:"Ngươi tình cờ nghe {foe} khóc ở Phụng Tiên điện: cha nàng ép nàng vào cung để làm con tin cho quyền thế của ông.",o:[
  {n:"Bước ra an ủi",c:{},o:45,w:{duc:3},sc:1,f:"mercy",wx:"{foe} mở lòng",l:{},lx:"{foe} giận vì bị nghe lén",rt:"{foe} ngẩng lên, ngỡ ngàng rồi òa khóc.",rf:"{foe} quắc mắt bỏ đi."},
  {n:"Lặng lẽ ghi nhớ",lx:"mất dịp làm lành",c:{},w:{tamco:3},f:"hate",wx:"biết chỗ yếu của nàng",rt:"Ngươi rời đi không tiếng động."}]},
 c1:{h:"Cơ hội hại {foe}",w:"maid",t:"{maid} thì thầm: có thể bỏ xạ hương vào hương liệu của {foe}, không ai biết.",o:[
  {n:"Ngăn {maid} lại",c:{},w:{duc:5},f:"mercy",wx:"giữ tay sạch",lx:"bỏ lỡ dịp báo thù",rt:"Ngươi giật gói xạ hương ném vào lò."},
  {n:"Chỉ phao tin xấu về {foe}",c:{duc:-3},o:50,f:"hate",w:{tamco:2},wx:"{foe} mất mặt",l:{danh:-3},lx:"bị lần ra",go:(A,ok)=>{const v=foe67();if(v&&ok)v.sung=Math.max(0,(v.sung||0)-5)},rt:"{foe} bị Hoàng thượng lạnh nhạt.",rf:"Lời đồn lần ra ngươi."}]},
 c2:{h:"{foed} gửi thư cho con gái",w:"maid",t:"Một bức thư của {foed} gửi {foe} lọt vào tay ngươi. Trong thư có những điều có thể làm chứng.",o:[
  {n:"Giữ thư làm chứng",c:{},sc:2,f:"hate",wx:"có chứng cứ",lx:"{foe} mất thư, sẽ lo",rt:"Bức thư nằm trong tráp của ngươi."},
  {n:"Trả thư cho {foe}",c:{},w:{duc:4},sc:1,f:"mercy",wx:"{foe} nợ ngươi",lx:"mất chứng cứ",rt:"{foe} cầm thư, nhìn ngươi rất lâu."}]},
 c3:{h:"{foe} có thai",w:"foe",t:"{foe} có thai. Nếu sinh hoàng tử, nhà {foed} sẽ càng vững.",o:[
  {n:"Gửi lễ mừng",c:{bac:-30},w:{duc:3},f:"mercy",wx:"giữ lễ",lx:"nhà kẻ thù mạnh lên",rt:"{foe} nhận lễ, có chút bối rối."},
  {n:"Lạnh nhạt",c:{},w:{tamco:1},f:"hate",wx:"không giúp kẻ thù",lx:"mang tiếng hẹp hòi",rt:"Ngươi không đến chúc mừng."}]},
 t1:{h:"{foe} biết ngươi là ai",w:"foe",t:"{foe} đến cung ngươi một mình: “Ta biết ngươi là con gái nhà ấy. Ta không biết phải nói gì.”",o:[
  {n:"Nói hết nỗi đau",c:{},o:A=>40+(A.f.mercy?25:0),sc:2,f:"mercy",wx:"{foe} đứng về phía ngươi",l:{},lx:"{foe} sợ, báo cha",rt:"{foe} quỳ xuống thay cha xin lỗi.",rf:"{foe} hoảng hốt, chạy đi báo cha."},
  {n:"Cảnh cáo nàng",c:{},w:{tamco:3},f:"hate",wx:"{foe} sợ ngươi",lx:"{foe} cũng phòng ngươi",rt:"{foe} tái mặt lui ra."}]},
 x1:{h:"Lựa chọn cuối",w:"foe",t:"Ngươi có đủ để hạ cả cha lẫn con. Hoặc có thể dùng chính {foe} để bắt cha nàng nhận tội.",o:[
  {n:"Thuyết phục {foe} khuyên cha tự thú",c:{},o:A=>35+(A.f.mercy?25:0),e:["win","mid"],rt:"{foed} dâng sớ tự thú, nhà ngươi được rửa oan; {foe} được giữ lại.",rf:"{foe} không khuyên nổi cha."},
  {n:"Tố cả cha lẫn con",c:{duc:-4},o:A=>35+(A.f.hate?20:0)+S.danh/8,e:["win2","lose"],rt:"{foed} bị xử, {foe} bị phế.",rf:"Chứng cứ không đủ, ngươi mang tiếng thù dai."},
  {n:"Buông bỏ",c:{},w:{duc:6},e:"mid",lx:"thù không trả",rt:"Ngươi đốt hết thư từ."}]}},
 E:{win:{k:1,tag:"Cởi nút thắt",w:"foe",t:"Kẻ thù tự thú, nhà ngươi được rửa oan; {foe} thành người chị em hiếm hoi trong cung. Cả cung nể ngươi độ lượng.",fx:{danh:12,duc:6,th:5},go:()=>{S.avenged=true;const e=foe67();if(e){e.enemy=false;return e67ally(e,40)}return""}},
  win2:{k:1,tag:"Thù trả đủ",t:"Cả cha lẫn con đều ngã. Mối thù đã trả, nhưng cũng có người nói ngươi lạnh lùng.",fx:{danh:8,tamco:3},go:()=>{S.avenged=true;const e=foe67();if(e){e.out=true;return `${e.name} bị phế vào lãnh cung.`}return""}},
  mid:{k:0,tag:"Buông bỏ thù xưa",t:"Ngươi chọn buông bỏ. Lòng nhẹ đi, nhưng nhà ngươi vẫn mang tiếng tội thần.",fx:{duc:5}},
  lose:{k:-1,tag:"Mang tiếng thù dai",t:"Ngươi tố mà không thành, cả cung cho rằng ngươi thù dai, Hoàng thượng lạnh nhạt.",fx:{sung:-8,danh:-8},go:()=>e67foe(foe67(),15)}}};
/* ================= CHÁU GÁI THÁI HẬU ================= */
ARC67.ch_co={o:"ch",t:"Quân cờ của cô mẫu",w:"th",sj:"những việc Thái hậu giao",g:"Thái hậu đưa ngươi vào cung để đối trọng với Hoàng hậu. Mệnh lệnh của bà ngày một nặng. Làm con cờ ngoan, hay thành người đánh cờ cùng bà.",
 p:[["s1","s2"],["c1","c2","c3","G.hh","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Việc đầu tiên",w:"th",t:"Thái hậu gọi ngươi vào Đức Thọ cung: “Dò xem Càn Ninh cung dạo này qua lại với ai.”",o:[
  {n:"Vâng mệnh",c:{suc:-3},o:()=>45+S.mat*5,w:{th:8},sc:1,f:"obey",wx:"cô mẫu hài lòng",l:{hh:-8},lx:"Hoàng hậu biết bị dò",rt:"Ngươi biết Hoàng hậu hay mời nhà ngoại vào cung.",rf:"Người của Hoàng hậu bắt gặp ngươi."},
  {n:"Thưa khéo: con còn non, sợ hỏng việc",c:{th:-6},w:{duc:3},f:"own",wx:"không dính vào",rt:"Thái hậu nhìn ngươi lạnh lùng."}]},
 s2:{h:"Cô mẫu chọn người hầu cho ngươi",w:"th",t:"Thái hậu ban cho ngươi một ma ma, nói là để dạy lễ. Ai cũng biết bà ta báo hết về Đức Thọ cung.",o:[
  {n:"Kính trọng ma ma",c:{},w:{th:5},f:"obey",wx:"cô mẫu yên tâm",lx:"mọi việc đến tai bà",rt:"Ma ma khen ngươi với Thái hậu."},
  {n:"Lấy lòng ma ma, kéo về phe mình",c:{bac:-40},o:45,sc:1,f:"own",wx:"tin gửi về là tin ngươi chọn",l:{th:-5},rt:"Ma ma thành người của ngươi.",rf:"Ma ma báo với Thái hậu."}]},
 c1:{h:"Gói thuốc",w:"th",t:"Thái hậu dúi vào tay ngươi một gói thuốc: “Hoàng hậu đang uống thuốc cầu tự. Thêm cái này vào, nàng sẽ hiếm muộn thêm vài năm.”",need:["hh"],o:[
  {n:"Từ chối thẳng",c:{th:-12},w:{duc:6},f:"own",wx:"tay sạch",rt:"Thái hậu đập bàn, nhưng không ép."},
  {n:"Nhận thuốc rồi lén đổ đi",c:{},o:()=>50+S.tamco/4,w:{th:5,duc:3},sc:1,wx:"cô mẫu tưởng ngươi đã làm",l:{th:-10},lx:"Thái hậu biết ngươi lừa",rt:"Không ai biết.",rf:"Thái hậu biết gói thuốc nằm dưới gốc mai."}]},
 c2:{h:"Cô mẫu muốn ngươi có con",w:"th",t:"Thái hậu sốt ruột: ngươi phải sinh hoàng tử. Bà sai thái y bắt mạch, ban thuốc bổ.",o:[
  {n:"Uống thuốc của cô mẫu",c:{suc:-3},w:{th:5},wx:"cô mẫu vui",lx:"thuốc mạnh, mệt người",rt:"Thái hậu gật đầu."},
  {n:"Khéo xin tự lo",c:{},o:50,w:{tamco:2},sc:1,f:"own",wx:"tự chủ",l:{th:-5},rt:"Thái hậu chiều ngươi.",rf:"Thái hậu phật lòng."}]},
 c3:{h:"Hoàng hậu cầu hòa",w:"hh",need:["hh"],t:"Hoàng hậu {hh} mời riêng ngươi: “Thái hậu già rồi. Sau này {goi} dựa vào ai?”",o:[
  {n:"Ngầm bắt tay Hoàng hậu",c:{th:-5},o:45,w:{hh:15},sc:1,f:"own",wx:"có đường lui",l:{hh:-6},lx:"Thái hậu biết",rt:"Hoàng hậu cười, rót trà mời ngươi.",rf:"Thái hậu biết chuyện, giận lắm."},
  {n:"Báo lại với Thái hậu",c:{hh:-10},w:{th:8},f:"obey",wx:"cô mẫu tin ngươi hơn",rt:"Thái hậu cười nhạt về phía Càn Ninh cung."}]},
 t1:{h:"Cô mẫu hỏi lòng ngươi",w:"th",t:"Thái hậu cầm tay ngươi: “Ai gia không sống mãi. Ngươi là cháu ai gia, hay là người của chính ngươi?”",o:[
  {n:"Thưa: cháu của cô mẫu",c:{},w:{th:6},f:"obey",wx:"bà yên lòng",lx:"ràng buộc thêm",rt:"Thái hậu gật đầu."},
  {n:"Thưa: con muốn tự đứng được để báo đáp cô mẫu",c:{},o:45,sc:2,f:"own",wx:"bà nể ngươi",l:{th:-6},rt:"Thái hậu cười lần đầu tiên: ‘Giống ai gia hồi trẻ.’",rf:"Thái hậu cho là ngươi lớn gan."}]},
 x1:{h:"Ván cờ cuối của cô mẫu",w:"th",t:"Thái hậu muốn ngươi dâng sớ hặc họ ngoại Hoàng hậu trong buổi yến lớn.",o:[
  {n:"Đánh cờ theo cách của mình: gom chứng cứ rồi mới dâng",c:{suc:-4},o:A=>35+(A.f.own?20:0)+S.tamco/6,e:["win","mid"],rt:"Chứng cứ vững, họ ngoại Hoàng hậu bị phạt, Thái hậu khen ngươi cao tay.",rf:"Chứng cứ chưa đủ, ngươi xin hoãn."},
  {n:"Làm đúng như cô mẫu dặn",c:{hh:-12},o:A=>40+(A.f.obey?20:0),e:["win2","lose"],rt:"Sớ hặc thành công, Thái hậu ban thưởng.",rf:"Sớ hặc thất bại, Thái hậu phủi tay."},
  {n:"Từ chối, đứng ngoài",c:{th:-10},w:{duc:4},e:"mid",lx:"cô mẫu thất vọng",rt:"Ngươi cáo bệnh không dự yến."}]}},
 E:{win:{k:1,tag:"Người đánh cờ cùng Thái hậu",w:"th",t:"Thái hậu coi ngươi là người kế thừa thế lực của bà. Bà dạy ngươi những ván cờ của cả đời mình.",fx:{th:15,danh:8,tamco:3}},
  win2:{k:1,tag:"Quân cờ đắc lực",w:"th",t:"Thái hậu hài lòng, che chở ngươi hết mức. Nhưng Hoàng hậu hận ngươi.",fx:{th:12,hh:-10,danh:4}},
  mid:{k:0,tag:"Cô cháu giữ lễ",t:"Thái hậu vẫn thương, nhưng không còn giao việc lớn. Ngươi tự đi đường mình.",fx:{duc:3}},
  lose:{k:-1,tag:"Bị cô mẫu phủi tay",w:"th",t:"Thái hậu phủi tay, nói ngươi vô dụng. Hoàng hậu biết ngươi mất chỗ dựa.",fx:{th:-15,hh:-10,danh:-5}}}};
ARC67.ch_benh={o:"ch",t:"Thái hậu lâm bệnh",w:"th",sj:"bệnh tình của Thái hậu",g:"Thái hậu ngã bệnh. Cả hậu cung rục rịch: ai cũng muốn biết Đức Thọ cung còn đứng được bao lâu. Ngươi là cháu bà, chỗ dựa của ngươi đang lung lay.",
 ok:()=>!S.thDead,
 p:[["s1","s2"],["c1","c2","c3","G.hh","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Đức Thọ cung đóng cửa",w:"doc",t:"Thái hậu ho ra máu, Đức Thọ cung đóng cửa không tiếp ai. Thái y nói bệnh nặng.",o:[
  {n:"Xin vào hầu thuốc",c:{suc:-6},w:{th:8,duc:3},sc:1,wx:"ở bên bà",lx:"mệt mỏi",rt:"Thái hậu nắm tay ngươi không buông."},
  {n:"Tìm thái y giỏi bên ngoài",c:{bac:-60},o:50,sc:2,f:"cure",wx:"có thầy thuốc tốt",l:{},lx:"thầy thuốc bị Thái y viện gạt",rt:"Lương y họ Tôn được vào bắt mạch.",rf:"Thái y viện không cho người ngoài vào."}]},
 s2:{h:"Hoàng hậu nắm quyền",w:"hh",need:["hh"],t:"Nhân Thái hậu bệnh, Hoàng hậu {hh} thu hết việc lục cung, kể cả việc chia bạc cho cung ngươi.",o:[
  {n:"Nhịn",c:{bac:-30},w:{duc:3},wx:"không gây chuyện",rt:"Bạc cung ngươi bị cắt bớt."},
  {n:"Xin Hoàng thượng phân xử",c:{},o:45,w:{sung:3},sc:1,wx:"ngài đứng ra",l:{hh:-8},rt:"Hoàng thượng trả lại phần bạc của ngươi.",rf:"Hoàng thượng bảo việc hậu cung để Hoàng hậu lo."}]},
 c1:{h:"Thuốc của Thái y viện",w:"doc",t:"Ngươi để ý: bệnh Thái hậu cứ uống thuốc của Thái y viện là nặng thêm.",o:[
  {n:"Lén đổi thuốc, nhờ lương y xem",c:{bac:-30},o:()=>45+S.arts.y*5,sc:2,f:"poison",wx:"biết thuốc có vấn đề",l:{},lx:"bị bắt gặp đổi thuốc",rt:"Trong thuốc có một vị gây hại cho người già.",rf:"Cung nữ của Đức Thọ cung bắt gặp ngươi."},
  {n:"Tự tay sắc thuốc",c:{suc:-6},w:{th:5},sc:1,wx:"bà an toàn hơn",rt:"Thái hậu chỉ uống thuốc ngươi sắc."}]},
 c2:{h:"Các phi tần xoay chiều",w:"v",need:["v"],t:"{v}, trước nay nịnh Thái hậu, giờ ngày nào cũng sang Càn Ninh cung.",o:[
  {n:"Ghi nhớ, không nói",lx:"Thái hậu không biết ai hai lòng",c:{},w:{tamco:2},sc:1,wx:"biết ai là người hai lòng",rt:"Ngươi ghi tên {v} vào lòng."},
  {n:"Kể với Thái hậu",c:{},o:50,w:{th:4},wx:"bà biết ai trung ai không",l:{},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"Thái hậu cười nhạt.",rf:"Thái hậu mệt, không muốn nghe."}]},
 c3:{h:"Chùa Hộ Quốc cầu an",w:"th",t:"Thái hậu muốn có người thay bà lên chùa Hộ Quốc cầu an bảy ngày.",o:[
  {n:"Xin đi",c:{suc:-8},w:{th:8,duc:4},wx:"bà cảm động",lx:"vắng cung bảy ngày",rt:"Ngươi quỳ bảy ngày trước điện Phật."},
  {n:"Đề nghị {hh} đi cùng",need:["hh"],c:{},o:45,w:{hh:8,th:3},sc:1,wx:"hòa hoãn với Hoàng hậu",l:{th:-4},rt:"Hoàng hậu không từ chối được, hai người cùng đi.",rf:"Hoàng hậu cáo bệnh, Thái hậu phật lòng."}]},
 t1:{h:"Đêm nguy kịch",w:"doc",t:"Một đêm Thái hậu lịm đi. Thái y lắc đầu.",o:[
  {n:"Mời lương y vào châm cứu",if:A=>A.f.cure,c:{},o:60,sc:2,wx:"cứu được bà",l:{th:-5},lx:"lương y bị trách",rt:"Thái hậu tỉnh lại lúc gà gáy.",rf:"Lương y bị Thái y viện đuổi ra."},
  {n:"Quỳ ngoài điện suốt đêm",c:{suc:-8},w:{th:5,duc:3},sc:1,wx:"ai cũng thấy lòng hiếu của ngươi",rt:"Ngươi quỳ đến sáng."}]},
 x1:{h:"Thái hậu tỉnh dậy",w:"th",t:"Thái hậu qua được cơn nguy. Bà hỏi ngươi: “Lúc ai gia nằm, những ai trung, những ai không?”",o:[
  {n:"Tâu rõ chuyện thuốc và kẻ hai lòng",c:{},o:A=>35+(A.f.poison?25:0)+S.th/6,e:["win","lose"],rt:"Thái hậu nổi giận, cho tra Thái y viện, ghi ơn ngươi.",rf:"Thái hậu cho là ngươi nói quá, còn trách ngươi gây chia rẽ."},
  {n:"Chỉ nói: con đã ở bên cô mẫu",c:{},w:{th:6},e:"mid",lx:"kẻ hại bà còn đó",rt:"Thái hậu xoa đầu ngươi."},
  {n:"Xin bà nghỉ ngơi, đừng lo việc cung",c:{},o:55,e:["win2","mid"],rt:"Thái hậu giao một phần việc lục cung cho ngươi.",rf:"Thái hậu không muốn buông quyền."}]}},
 E:{win:{k:1,tag:"Cứu cô mẫu, vạch kẻ gian",w:"th",t:"Thái hậu khỏe lại, Thái y viện bị tra, kẻ hai lòng bị bà ghi nhớ. Bà thương ngươi hơn hết thảy.",fx:{th:20,danh:6}},
  win2:{k:1,tag:"Được giao việc lục cung",t:"Thái hậu giao cho ngươi phụ việc lục cung. Ngươi có tiếng nói trong hậu cung.",fx:{th:10,danh:8}},
  mid:{k:0,tag:"Bà khỏe lại",t:"Thái hậu khỏe lại. Mọi chuyện như cũ.",fx:{th:4}},
  lose:{k:-1,tag:"Bị trách gây chia rẽ",t:"Thái hậu trách ngươi gieo nghi kỵ lúc bà bệnh. Bà lạnh nhạt, Hoàng hậu đắc ý.",fx:{th:-12,danh:-5}}}};
ARC67.ch_ho={o:"ch",t:"Hai người cháu",w:"v",sj:"cuộc tranh sủng giữa ngươi và {v}",g:"{v} cũng là người họ ngoại của Thái hậu, vào cung trước ngươi. Đức Thọ cung chỉ có một chiếc ghế bên cạnh Thái hậu. Tranh, nhường, hay cùng ngồi.",
 cast(A){return castRv67(A,"v",v=>v.rank>=1)},
 p:[["s1","s2"],["c1","c2","c3","G.rival","G.gift"],["t1"],["x1"]],
 B:{
 s1:{h:"Hai chén trà",w:"th",t:"Thái hậu sai cả ngươi và {v} pha trà. Bà nếm cả hai, không nói gì.",need:["v"],o:[
  {n:"Pha theo khẩu vị bà thích",c:{suc:-2},o:()=>45+S.tai/4,w:{th:6},sc:1,wx:"bà chọn chén của ngươi",l:{},lx:"{v} thắng",rt:"Thái hậu uống cạn chén của ngươi.",rf:"Thái hậu khen trà của {v}."},
  {n:"Nhường {v} dâng trước",c:{},w:{duc:3},f:"kind",wx:"Thái hậu thấy ngươi biết nhường",lx:"{v} được tiếng",rt:"Thái hậu liếc ngươi, khẽ gật."}]},
 s2:{h:"Nhà ngoại muốn chọn một người",w:"maid",t:"Họ ngoại Thái hậu gửi thư: họ sẽ dồn sức cho một người cháu. Ngươi hoặc {v}.",need:["v"],o:[
  {n:"Gửi lễ cho các trưởng bối",c:{bac:-60},sc:1,wx:"họ nghiêng về ngươi",rt:"Các trưởng bối khen ngươi biết điều."},
  {n:"Đề nghị họ ủng hộ cả hai",c:{},o:45,w:{duc:3},f:"kind",wx:"không ai bị bỏ",l:{},lx:"họ chê ngươi yếu",rt:"Các trưởng bối gật gù.",rf:"Họ cho là ngươi không đủ quyết."}]},
 c1:{h:"{v} gài bẫy",w:"v",need:["v"],t:"{v} mượn danh ngươi gửi một món quà kém sang lên Thái hậu.",o:[
  {n:"Gặp Thái hậu giải thích",c:{},o:50,w:{th:4},sc:1,wx:"bà biết sự thật",l:{th:-5},rt:"Thái hậu nheo mắt nhìn về phía {v}.",rf:"Thái hậu không muốn nghe hai đứa cãi nhau."},
  {n:"Dâng một món quà khác thật quý",c:{bac:-50},w:{th:6},wx:"lấp chuyện cũ",lx:"tốn bạc",rt:"Thái hậu nhận quà, quên chuyện trước."}]},
 c2:{h:"{v} gặp họa",w:"v",need:["v"],t:"{v} bị Hoàng hậu bắt lỗi, có thể bị giáng. Thái hậu hỏi ý ngươi.",o:[
  {n:"Xin bà cứu {v}",c:{},w:{duc:4},sc:1,f:"kind",wx:"{v} nợ ngươi",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,20)},lx:"đối thủ được cứu",rt:"Thái hậu cứu {v}, nàng nhìn ngươi ngỡ ngàng."},
  {n:"Thưa: để nàng tự chịu",c:{},o:50,w:{tamco:3},f:"hard",wx:"bớt một đối thủ",l:{th:-6},lx:"bà chê ngươi bạc",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)v.sung=Math.max(0,(v.sung||0)-6)},rt:"{v} bị phạt, Hoàng thượng ít ghé nàng hơn.",rf:"Thái hậu chê ngươi lạnh lùng với người nhà."}]},
 c3:{h:"Thái hậu muốn tác hợp con cháu",w:"th",t:"Thái hậu muốn một trong hai đứa nhận nuôi một công chúa mất mẹ.",o:[
  {n:"Xin nhận nuôi",c:{suc:-4},w:{th:8,duc:3},sc:1,wx:"bà thấy ngươi có lòng",lx:"bận thêm",rt:"Công chúa nhỏ về cung ngươi."},
  {n:"Nhường {v}",c:{},w:{duc:2},f:"kind",wx:"giữ hòa khí",lx:"{v} được bà khen",rt:"{v} nhận nuôi công chúa."}]},
 t1:{h:"{v} tìm gặp ngươi",w:"v",need:["v"],t:"{v} bất ngờ đến: “Tranh nữa thì cả hai cùng chết. Hay ta bắt tay?”",o:[
  {n:"Bắt tay",c:{},o:A=>40+(A.f.kind?25:0),sc:2,f:"pact",wx:"hai người cháu một lòng",l:{},lx:"bị lừa",rt:"Hai người nắm tay nhau trước điện Phật.",rf:"{v} chỉ thử lòng ngươi."},
  {n:"Từ chối",lx:"{v} còn là đối thủ",c:{},w:{tamco:2},f:"hard",wx:"không bị ràng buộc",rt:"{v} ra về, mặt lạnh."}]},
 x1:{h:"Thái hậu chọn người",w:"th",t:"Thái hậu triệu cả hai: “Ai gia sẽ nói với Hoàng thượng về một người. Các ngươi tự nói đi.”",o:[
  {n:"Tiến cử cả hai cùng nhau",c:{},o:A=>35+(A.f.pact?30:0),e:["win","mid"],rt:"Thái hậu bật cười: ‘Hai con cháu ai gia biết thương nhau.’",rf:"Thái hậu lắc đầu: phải chọn một."},
  {n:"Tự tiến cử mình",c:{},o:A=>35+(A.f.hard?15:0)+S.th/5,e:["win2","lose"],rt:"Thái hậu chọn ngươi.",rf:"Thái hậu chọn {v}."},
  {n:"Nhường {v}",c:{},w:{duc:5},e:"mid",lx:"mất dịp",rt:"Ngươi lùi lại một bước."}]}},
 E:{win:{k:1,tag:"Hai người cháu một lòng",w:"th",t:"Thái hậu mừng vì con cháu hòa thuận, dồn sức cho cả hai. {v} thành đồng minh vững nhất của ngươi.",fx:{th:12,danh:5},go:A=>e67ally(rv67(A,"v"),35)},
  win2:{k:1,tag:"Người cháu được chọn",w:"th",t:"Thái hậu chọn ngươi. Họ ngoại dồn sức cho ngươi; {v} đứng ngoài, ấm ức.",fx:{th:15,danh:6},go:A=>e67foe(rv67(A,"v"),12)},
  mid:{k:0,tag:"Mỗi người một đường",t:"Thái hậu không chọn ai. Hai người cháu giữ lễ, mỗi người một đường.",fx:{duc:2}},
  lose:{k:-1,tag:"{v} được chọn",t:"Thái hậu chọn {v}. Họ ngoại dồn sức cho nàng, ngươi phải tự lo.",fx:{th:-10,danh:-4},go:A=>{const v=rv67(A,"v");if(v)v.sung=cl((v.sung||0)+6,0,100);return v?`${v.name} được Thái hậu đỡ lời, được sủng hơn.`:""}}}};
ARC67.ch_bi={o:"ch",t:"Bí mật năm xưa",w:"th",sj:"bí mật năm xưa của Thái hậu",g:"Một lá thư cũ cho thấy năm xưa Thái hậu từng hại một phi tần để giữ ngôi. Người cầm thư đang tìm cách dùng nó. Bảo vệ bà, hay biến nó thành sức mạnh của mình.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Lá thư trong hộp gấm",w:"maid",t:"Dọn kho Đức Thọ cung, {maid} thấy một lá thư cũ: lời trăng trối của một phi tần tiên đế, tố Thái hậu hạ độc.",o:[
  {n:"Giữ kỹ, không cho ai biết",c:{},w:{tamco:3},sc:1,f:"hold",wx:"nắm một bí mật",lx:"giữ là giữ lửa",rt:"Thư nằm trong hộp của ngươi."},
  {n:"Đốt ngay",c:{},w:{duc:3},f:"burn",wx:"bà an toàn",lx:"có thể còn bản sao",rt:"Thư cháy trong lò."}]},
 s2:{h:"Có người biết chuyện",w:"eun",t:"Tổng quản {eun} thở dài: ‘Năm xưa, còn một lão cung nữ biết chuyện, nay ở Thọ Khang cung.’",o:[
  {n:"Tìm gặp lão cung nữ",c:{bac:-30},o:50,sc:1,f:"wit",wx:"biết sự thật",l:{},lx:"lão sợ",rt:"Lão cung nữ kể: Thái hậu bị ép, phi tần kia hại bà trước.",rf:"Lão cung nữ không chịu nói."},
  {n:"Biếu Tổng quản để ông giữ kín",c:{bac:-40},sc:1,wx:"bớt một người hở miệng",rt:"Tổng quản gật đầu."}]},
 c1:{h:"Một phi tần dò hỏi",w:"v",need:["v"],t:"{v} hỏi ngươi về một phi tần tiên đế đã mất. Nàng có vẻ biết điều gì đó.",o:[
  {n:"Dò ngược lại",c:{},o:()=>40+S.tamco/4,sc:1,wx:"biết {v} có bản sao thư",l:{},lx:"{v} đề phòng",rt:"{v} lỡ lời: nàng có bản sao thư.",rf:"{v} kín miệng."},
  {n:"Cảnh cáo nàng",c:{},w:{tamco:2},wx:"{v} lùi lại",lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"{v} tái mặt."}]},
 c2:{h:"Thái hậu linh cảm",w:"th",t:"Thái hậu nhìn ngươi lâu: “Có chuyện gì ngươi giấu ai gia?”",o:[
  {n:"Thưa thật với bà",c:{},o:50,w:{th:10},sc:1,f:"tell",wx:"bà tin ngươi tuyệt đối",l:{th:-8},lx:"bà giận vì ngươi biết",rt:"Thái hậu im lặng hồi lâu: ‘Ngươi là đứa duy nhất dám nói.’",rf:"Thái hậu đập vỡ chén trà."},
  {n:"Chối",c:{},w:{tamco:2},wx:"bà không biết",lx:"giấu bà là có tội",rt:"Thái hậu không hỏi nữa."}]},
 c3:{h:"Bản sao thư đến tay Hoàng hậu",w:"hh",need:["hh"],t:"Tin đáng sợ: Hoàng hậu {hh} cũng có một bản sao.",o:[
  {n:"Tìm cách lấy lại",c:{bac:-50},o:()=>35+S.mat*6,sc:2,wx:"bản sao về tay ngươi",l:{hh:-8},lx:"bị bắt gặp",rt:"Bản sao được đánh tráo.",rf:"Người của ngươi bị bắt."},
  {n:"Báo Thái hậu đề phòng",c:{},w:{th:5},wx:"bà chuẩn bị",lx:"Hoàng hậu vẫn giữ",rt:"Thái hậu cười lạnh."}]},
 t1:{h:"Sự thật năm xưa",w:"th",t:"Ngươi đã biết: chính phi tần kia hại Thái hậu trước, bà chỉ tự vệ. Nhưng không ai còn sống để làm chứng ngoài lão cung nữ.",o:[
  {n:"Đưa lão cung nữ về bên mình",c:{bac:-30},sc:1,f:"wit",wx:"có nhân chứng",rt:"Lão cung nữ về hầu ngươi."},
  {n:"Chỉ giữ thư",lx:"không có nhân chứng sống",c:{},w:{tamco:2},f:"hold",wx:"có con bài",rt:"Ngươi chờ."}]},
 x1:{h:"Bí mật bị đem ra",w:"emp",t:"Có kẻ trình bản sao thư lên Hoàng thượng. Ngài triệu ngươi, cháu của Thái hậu.",o:[
  {n:"Đưa nhân chứng nói rõ sự thật",c:{suc:-4},o:A=>30+(A.f.wit?25:0)+(A.f.tell?10:0),e:["win","lose"],rt:"Sự thật sáng tỏ: Thái hậu bị hại trước. Kẻ trình thư bị phạt.",rf:"Không ai tin lời lão cung nữ. Thái hậu bị Hoàng thượng xa lánh, ngươi liên lụy."},
  {n:"Nhận là thư giả, xin tra nét chữ",c:{},o:A=>45+(A.f.burn?10:0),e:["mid","lose"],rt:"Thư bị coi là giả, chuyện chìm xuống.",rf:"Nét chữ là thật."},
  {n:"Dùng bản gốc mặc cả với Thái hậu",if:A=>A.f.hold,c:{duc:-4},o:55,e:["win2","lose"],rt:"Thái hậu dẹp chuyện, và từ nay phải nghe ngươi một phần.",rf:"Thái hậu giận dữ cắt đứt với ngươi."}]}},
 E:{win:{k:1,tag:"Minh oan cho cô mẫu",w:"th",t:"Thái hậu được minh oan, nhìn ngươi như con ruột. Bà dồn hết thế lực cho ngươi.",fx:{th:20,danh:8}},
  win2:{k:1,tag:"Nắm thóp Đức Thọ cung",w:"th",t:"Thái hậu phải nể ngươi. Bà không thương ngươi hơn, nhưng không dám bỏ ngươi.",fx:{th:8,tamco:4,danh:4}},
  mid:{k:0,tag:"Bí mật chìm xuống",t:"Chuyện cũ chìm xuống đáy giếng. Không ai được, không ai mất.",fx:{duc:2}},
  lose:{k:-1,tag:"Liên lụy chuyện cũ",t:"Hoàng thượng xa lánh Thái hậu, kéo theo cả ngươi. Đức Thọ cung không còn đủ sức che chở.",fx:{th:-10,sung:-6,danh:-6}}}};
/* ================= CON GÁI THẦY ĐỒ ================= */
ARC67.thd_tho={o:"thd",t:"Danh hiệu Tài nữ",w:"emp",sj:"thơ của ngươi",g:"Thơ ngươi có thể làm rạng danh người cha nghèo. Hàn lâm viện sắp mở kỳ thi Tài nữ trong cung, và có kẻ đang chờ vu ngươi đạo thơ.",
 cast(A){A.n1="Hàn lâm "+pick(SURN)+" "+pick(MALEN);castRv67(A,"v");return true},
 p:[["s1","s2"],["c1","c2","c3","G.rival","G.night"],["t1"],["x1"]],
 B:{
 s1:{h:"Bài thơ lọt ra ngoài",w:"maid",t:"Một bài thơ ngươi viết trên quạt lọt ra ngoài cung. {n1}, học trò cũ của cha, đem bình khắp kinh thành.",o:[
  {n:"Viết thư cảm tạ {n1}",c:{suc:-2},w:{danh:4},sc:1,f:"ally",wx:"có người trong Hàn lâm",lx:"bị đồn tư thông thư từ",rt:"{n1} hồi âm, hứa giúp."},
  {n:"Xin Hoàng thượng thứ lỗi vì thơ lọt ra",need:["nsrv"],c:{},o:50,w:{sung:4},sc:1,wx:"ngài đòi đọc thơ ngươi",l:{sung:-2},rt:"Hoàng thượng đọc xong, cười lớn.",rf:"Hoàng thượng chẳng để tâm."}]},
 s2:{h:"Luyện thơ",w:"maid",t:"Kỳ thi Tài nữ còn vài tháng. Ngươi cần luyện thêm.",o:[
  {n:"Thức đêm luyện thơ",c:{suc:-8},w:{tai:4},sc:1,wx:"thơ sắc hơn",rt:"Giấy viết chất cao bằng gối."},
  {n:"Mời thầy Hàn lâm dạy",c:{bac:-50},w:{tai:6},sc:1,wx:"học được luật thơ cung đình",rt:"Thầy khen ngươi có cốt cách."}]},
 c1:{h:"{v} tố ngươi đạo thơ",w:"v",need:["v"],t:"{v} tố trước mặt mọi người: bài thơ trên quạt là của một thi nhân đời trước.",o:[
  {n:"Ứng tác ngay một bài khác",c:{suc:-3},o:()=>30+S.tai/2+S.arts.thi*6,w:{danh:5},sc:1,wx:"rửa tiếng oan",l:{danh:-8},lx:"bị tin là đạo thơ",rt:"Bài thơ mới khiến cả phòng lặng người.",rf:"Ngươi run tay, thơ vụng, ai cũng tin lời {v}."},
  {n:"Nhờ {n1} minh oan",c:{bac:-30},o:A=>45+(A.f.ally?20:0),w:{danh:3},sc:1,wx:"Hàn lâm làm chứng",l:{danh:-6},rt:"{n1} đem bản nháp có ngày tháng ra làm chứng.",rf:"{n1} không dám dính vào."}]},
 c2:{h:"Đề thi bị lộ",w:"maid",t:"Có kẻ gạ bán đề thi Tài nữ.",o:[
  {n:"Từ chối, báo Hàn lâm viện",c:{},w:{duc:4,danh:3},sc:1,f:"clean",wx:"tiếng thanh bạch",lx:"kẻ khác có thể mua",rt:"Hàn lâm viện đổi đề."},
  {n:"Mua đề",c:{bac:-50,duc:-4},o:50,sc:2,f:"cheat",wx:"biết trước đề",l:{danh:-8},lx:"lộ thì ô danh",rt:"Đề là thật.",rf:"Đề giả, còn bị đồn ngươi mua đề."}]},
 c3:{h:"Hoàng thượng thử tài",w:"emp",need:["nsrv"],t:"Hoàng thượng ra một vế đối: ‘Nguyệt chiếu song tiền, song chiếu nguyệt.’",o:[
  {n:"Đối ngay",c:{},o:()=>35+S.tai/2,w:{sung:6,danh:3},sc:1,wx:"ngài thán phục",l:{sung:-2},rt:"Ngươi đối: ‘Hoa khai lâu ngoại, lâu khai hoa.’ Hoàng thượng vỗ án.",rf:"Ngươi đối chậm, ngài cười trêu."},
  {n:"Xin ngài cho một đêm nghĩ",c:{},w:{tai:2},wx:"đối chỉnh hơn",lx:"mất cái duyên nhanh trí",rt:"Sáng hôm sau ngươi dâng vế đối."}]},
 t1:{h:"Đêm trước kỳ thi",w:"maid",t:"Đêm trước kỳ thi, có người lén để vào phòng ngươi một tập thơ cổ chép tay, như để gài tội.",o:[
  {n:"Đem nộp Hàn lâm viện ngay",c:{},o:55,sc:2,wx:"lật được bẫy",l:{danh:-3},rt:"Hàn lâm viện tra ra người gài.",rf:"Không tra ra ai."},
  {n:"Đốt đi",c:{},w:{tamco:2},wx:"bẫy vô dụng",lx:"kẻ gài còn đó",rt:"Tập thơ cháy thành tro."}]},
 x1:{h:"Kỳ thi Tài nữ",w:"emp",t:"Kỳ thi Tài nữ ở Hàn lâm viện. Đề: ‘Vịnh tuyết’.",o:[
  {n:"Viết thơ chân thật về tuyết quê nghèo",c:{suc:-5},o:A=>30+S.tai/3+S.arts.thi*5+(A.f.clean?5:0),e:["win","mid"],rt:"Bài thơ đứng đầu, Hoàng thượng phong ngươi Tài nữ.",rf:"Bài thơ hay, nhưng giám khảo chuộng lời hoa mỹ."},
  {n:"Viết thơ hoa mỹ theo lối cung đình",c:{suc:-5},o:A=>35+S.tai/4+(A.f.cheat?15:0),e:["win2","lose"],rt:"Thơ đúng ý giám khảo, đứng nhì.",rf:"Thơ bị chê sáo rỗng, {v} cười to nhất."},
  {n:"Cáo bệnh không thi",c:{danh:-3},w:{suc:5},e:"mid",lx:"bỏ lỡ dịp",rt:"Ngươi nằm nhà."}]}},
 E:{win:{k:1,tag:"Tài nữ số một",w:"emp",t:"Ngươi được phong Tài nữ. Thơ ngươi được khắc vào bia Hàn lâm, sách của cha được in kèm. Hoàng thượng thường gọi ngươi đến đối thơ.",fx:{danh:12,sung:6},go:()=>{S.arts.thi=Math.min(5,(S.arts.thi||0)+1);return "Thi +1 bậc."}},
  win2:{k:1,gi:["nghien","emp"],tag:"Đứng nhì kỳ thi",t:"Ngươi đứng nhì, được ban bút nghiên. Không rực rỡ, nhưng đủ để cả cung biết tên.",fx:{danh:7,sung:3}},
  mid:{k:0,tag:"Lỡ hẹn với danh hiệu",t:"Không đứng đầu, nhưng ai đọc thơ ngươi cũng nhớ.",fx:{danh:2,tai:2}},
  lose:{k:-1,tag:"Mang tiếng sáo rỗng",t:"Thơ ngươi bị chê, {v} được dịp chế giễu. Danh tài nữ trôi xa.",fx:{danh:-8}}}};
ARC67.thd_sach={o:"thd",t:"Bản thảo của cha",w:"maid",sj:"bản thảo của cha",g:"Cha viết một bộ sách bàn chính sự, chỉ thẳng tệ tham nhũng của một nhà quyền thế. In ra thì danh cha vang dội, mà kẻ bị chỉ mặt sẽ không ngồi yên.",
 cast(A){A.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Công bộ thượng thư"]);return true},
 p:[["s1","s2"],["c1","c2","c3","G.gift","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Rương sách cũ",w:"maid",t:"Mẹ gửi vào rương sách của cha. Trong có bộ ‘Trị quốc sách’, chương cuối chỉ đích danh {n1} tham ô đê điều.",o:[
  {n:"Đọc kỹ, chép thêm bản",c:{suc:-4},w:{tai:3},sc:1,wx:"hiểu sâu sách cha",lx:"giữ sách là giữ lửa",rt:"Ngươi chép xong một bản."},
  {n:"Cất kỹ, chưa đọc",c:{},w:{tamco:2},wx:"chưa vướng",lx:"chưa biết hết",rt:"Rương sách nằm dưới gầm giường."}]},
 s2:{h:"{n1} nghe phong thanh",w:"maid",t:"Phủ {n1} gửi quà: ‘Nghe nói cha {N} viết được sách quý, xin được mua lại.’",o:[
  {n:"Từ chối",c:{},w:{duc:4},f:"firm",wx:"giữ sách",lx:"{n1} để ý",rt:"Quà bị trả lại."},
  {n:"Nhận quà, nói sách đã mất",c:{duc:-3},o:50,w:{bac:60},wx:"bạc và yên thân",l:{},lx:"họ không tin",rt:"Phủ {n1} yên tâm.",rf:"Họ biết ngươi nói dối."}]},
 c1:{h:"Hàn lâm viện muốn xem sách",w:"maid",t:"Một học sĩ Hàn lâm muốn xem sách cha để bàn chuyện in.",o:[
  {n:"Cho xem",c:{},o:55,sc:2,f:"ally",wx:"có người khen sách",l:{},lx:"tin lọt đến {n1}",rt:"Học sĩ đọc xong, rưng rưng: ‘Sách này cứu được dân.’",rf:"Học sĩ khen, nhưng tin lọt ra ngoài."},
  {n:"Chỉ cho xem chương đầu",lx:"sách chưa ai đọc trọn",c:{},w:{tamco:2},sc:1,wx:"vừa có tiếng vừa an toàn",rt:"Học sĩ khen chương đầu."}]},
 c2:{h:"Lũ lụt ở Hoài Bắc",w:"emp",t:"Đê Hoài Bắc vỡ, đúng như sách cha cảnh báo. Hoàng thượng giận dữ tìm người chịu tội.",o:[
  {n:"Dâng chương sách về đê điều",need:["nsrv"],c:{},o:50,sc:2,wx:"Hoàng thượng thấy cha đúng",l:{sung:-4},lx:"bị cho là xen chính sự",rt:"Hoàng thượng đọc, im lặng rất lâu.",rf:"Hoàng thượng phẩy tay: đàn bà đừng bàn đê điều."},
  {n:"Góp bạc cứu lụt",c:{bac:-50},w:{danh:5},go:()=>e67kho(2),wx:"tiếng thơm (Kho lúa +2)",rt:"Tên ngươi có trong sổ nghĩa quyên."}]},
 c3:{h:"Người lạ lục phòng",w:"maid",t:"{maid} báo: có kẻ lạ lục phòng ngươi khi ngươi vắng.",o:[
  {n:"Giấu sách ở Phụng Tiên điện",c:{suc:-2},sc:1,wx:"sách an toàn",rt:"Sách nằm sau bài vị."},
  {n:"Để sách giả làm mồi",c:{bac:-20},o:50,sc:1,wx:"bắt được kẻ lục phòng",l:{},lx:"không ai mắc",rt:"Kẻ lục phòng là gia nhân phủ {n1}.",rf:"Không ai đến nữa."}]},
 t1:{h:"{n1} đề nghị",w:"maid",t:"{n1} nhắn: nếu ngươi đốt sách, nhà ông sẽ lo cho mẹ ngươi đến cuối đời.",o:[
  {n:"Từ chối",c:{},w:{duc:3},f:"firm",sc:1,wx:"giữ khí tiết cha",lx:"thành kẻ thù của {n1}",rt:"Ngươi trả lời: ‘Sách không bán.’"},
  {n:"Nhận",c:{duc:-5},w:{bac:80},f:"deal",wx:"mẹ được an nhàn",lx:"phụ lòng cha",rt:"Bạc gửi về quê."}]},
 x1:{h:"Sách ra đời hay không",w:"emp",t:"Đến lúc quyết số phận ‘Trị quốc sách’.",o:[
  {n:"Dâng trọn bộ lên Hoàng thượng",c:{suc:-4},o:A=>30+(A.f.ally?15:0)+(A.f.firm?10:0)+S.danh/8,e:["win","lose"],rt:"Hoàng thượng cho khắc in, {n1} bị tra.",rf:"{n1} ra tay trước, sách bị cấm, ngươi bị trách."},
  {n:"Chỉ in phần không nhắc tên ai",c:{},o:60,e:["mid","lose"],rt:"Sách in ra, danh cha vang khắp sĩ lâm.",rf:"{n1} vẫn chặn, sách không in được."},
  {n:"Đốt theo lời {n1}",if:A=>A.f.deal,c:{duc:-3},w:{bac:40},e:"mid",lx:"sách cha mất",rt:"Lửa liếm sạch tâm huyết của cha."}]}},
 E:{win:{k:1,tag:"Sách cha được khắc in",w:"emp",t:"‘Trị quốc sách’ được khắc in, {n1} bị cách chức. Danh cha ngươi vang khắp thiên hạ; Hoàng thượng nhìn ngươi như một người có học thức thật sự.",fx:{danh:15,sung:4,duc:4}},
  mid:{k:0,tag:"Sách cha còn một nửa",t:"Sách cha còn lại một nửa trên đời. Ngươi giữ được mình.",fx:{danh:4}},
  lose:{k:-1,tag:"Sách bị cấm",t:"Sách bị cấm, ngươi bị Hoàng thượng trách là để sách phỉ báng triều thần lọt vào cung.",fx:{danh:-8,sung:-6}}}};
ARC67.thd_tro={o:"thd",t:"Học trò của cha",w:"maid",sj:"chuyện khoa thi và học trò của cha",g:"Một học trò nghèo của cha thi Hội đỗ đầu, rồi bị đánh trượt vì có kẻ mua đề. Hắn xin ngươi giúp. Chuyện khoa cử là việc lớn, chạm vào là chạm đến cả triều.",
 cast(A){A.n1=pick(SURN)+" "+pick(MALEN);return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Lá thư của học trò",w:"maid",t:"Thư của {n1}: ‘Con đỗ đầu mà bị đánh trượt. Bài của con bị đổi tên.’",o:[
  {n:"Gửi bạc giúp hắn ở lại kinh",c:{bac:-30},w:{duc:3},sc:1,wx:"hắn chờ được",rt:"{n1} thuê được chỗ trọ."},
  {n:"Dò xem lời hắn có thật",c:{bac:-30},o:50,sc:1,f:"true",wx:"biết hắn bị oan thật",l:{},lx:"không dò được",rt:"Bài thi của hắn bị chép tên con một nhà quan.",rf:"Không ai chịu nói."}]},
 s2:{h:"Sĩ tử náo động",w:"emp",t:"Sĩ tử khắp kinh thành dán bảng kêu oan trước Quốc Tử Giám.",o:[
  {n:"Khuyên Hoàng thượng phúc khảo",need:["nsrv"],c:{},o:45,sc:1,wx:"có dịp lật lại",l:{sung:-3},rt:"Hoàng thượng cho phúc khảo.",rf:"Hoàng thượng bảo việc khoa cử không phải chuyện hậu cung."},
  {n:"Im lặng",c:{},w:{tamco:2},wx:"không đụng chạm",lx:"sĩ tử thất vọng",rt:"Ngươi im lặng."}]},
 c1:{h:"Nhà quan mua đề",w:"v",need:["v"],t:"Nhà quan mua đề lại là nhà ngoại của {v}.",o:[
  {n:"Đối chất với {v}",c:{},o:40,sc:1,wx:"{v} lộ sơ hở",l:{},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,10)},rt:"{v} tái mặt.",rf:"{v} chối phăng."},
  {n:"Giữ kín, gom chứng cứ",c:{bac:-30},sc:1,wx:"chứng cứ chắc hơn",rt:"Ngươi có bản chép bài thi gốc."}]},
 c2:{h:"Bài thi gốc",w:"maid",t:"Bài thi gốc của {n1} còn trong kho Lễ bộ.",o:[
  {n:"Mua chuộc người giữ kho",c:{bac:-50},o:50,sc:2,f:"paper",wx:"có bài thi gốc",l:{},lx:"bị lộ",rt:"Bài thi gốc về tay ngươi.",rf:"Người giữ kho báo lên trên."},
  {n:"Nhờ học sĩ Hàn lâm",c:{},o:45,sc:1,wx:"có người làm chứng",l:{},lx:"họ ngại",rt:"Học sĩ nhận ra văn phong của {n1}.",rf:"Học sĩ không dám."}]},
 c3:{h:"{n1} bị dọa",w:"maid",t:"{n1} bị người lạ đánh trọng thương, dọa phải rời kinh.",o:[
  {n:"Mời thầy thuốc, giấu hắn",c:{bac:-40},w:{duc:3},sc:1,f:"safe",wx:"giữ được nhân chứng",rt:"{n1} được giấu ở một ngôi chùa."},
  {n:"Khuyên hắn về quê",c:{},w:{tamco:2},wx:"bớt rủi ro",lx:"mất nhân chứng",rt:"{n1} rời kinh."}]},
 t1:{h:"Phúc khảo",w:"emp",t:"Hoàng thượng cho phúc khảo ngay tại điện, chính ngài ra đề.",o:[
  {n:"Gửi lời động viên {n1}",c:{},o:A=>45+(A.f.safe?20:0),sc:2,wx:"hắn làm bài xuất sắc",l:{},lx:"hắn run tay",rt:"Bài của {n1} được Hoàng thượng khen.",rf:"{n1} quá run, làm bài bình thường."},
  {n:"Không xen vào",lx:"{n1} một mình đối mặt",c:{},w:{duc:2},wx:"sạch sẽ",rt:"Ngươi chờ kết quả."}]},
 x1:{h:"Định đoạt khoa án",w:"emp",t:"Hoàng thượng hỏi ngươi: nên xử khoa án này thế nào?",o:[
  {n:"Tâu: xử nghiêm kẻ mua đề, trả công bằng cho sĩ tử",c:{suc:-3},o:A=>30+(A.f.paper?20:0)+(A.f.true?10:0),e:["win","lose"],rt:"Kẻ mua đề bị trị tội, {n1} được ghi tên bảng vàng.",rf:"Chứng cứ không đủ, ngươi bị trách xen việc triều."},
  {n:"Tâu: chỉ cần trả lại tên cho người bị oan",c:{},o:A=>55+(A.f.paper?10:0),e:["mid","lose"],rt:"{n1} được ghi tên, không ai bị xử.",rf:"Án bị gác lại."},
  {n:"Thưa: việc triều, thiếp không dám bàn",c:{},w:{duc:3},e:"mid",lx:"học trò cha chịu thiệt",rt:"Ngươi im lặng."}]}},
 E:{win:{k:1,tag:"Trả công bằng cho sĩ tử",w:"emp",t:"Khoa án được xử công minh. Sĩ tử khắp nơi truyền tụng tên ngươi; {n1} làm quan, nhớ ơn cha con ngươi.",fx:{danh:12,sung:4,duc:4}},
  mid:{k:0,tag:"Học trò được ghi tên",t:"{n1} được ghi tên bảng vàng. Kẻ mua đề vẫn ung dung, nhưng học trò của cha đã có đường.",fx:{danh:4,duc:2}},
  lose:{k:-1,tag:"Bị trách xen việc triều",t:"Hoàng thượng trách ngươi xen chuyện khoa cử. Nhà quan mua đề thù ngươi.",fx:{sung:-6,danh:-6},go:A=>e67foe(rv67(A,"v"),12)}}};
ARC67.thd_hoc={o:"thd",t:"Thầy giáo trong cung",w:"emp",sj:"việc ngươi dạy chữ cho hoàng tự",g:"Hoàng thượng thấy ngươi giỏi chữ, giao ngươi dạy chữ cho các hoàng tự và công chúa nhỏ. Dạy tốt thì cả cung nể; dạy hỏng thì mẹ của chúng không tha.",
 cast(A){castRv67(A,"v",v=>(v.kids||[]).some(k=>k.alive));return true},
 p:[["s1","s2"],["c1","c2","c3","G.rival","G.th"],["t1"],["x1"]],
 B:{
 s1:{h:"Buổi học đầu",w:"emp",t:"Hoàng thượng giao ngươi dạy chữ mỗi sáng ở Thượng thư phòng. Bọn trẻ nghịch ngợm, chẳng đứa nào chịu ngồi yên.",o:[
  {n:"Dạy nghiêm, phạt đứng",c:{},o:45,w:{danh:3},f:"strict",wx:"trẻ nề nếp",l:{},lx:"mẹ chúng phật lòng",rt:"Bọn trẻ ngồi ngay ngắn.",rf:"Một hoàng tử khóc mách mẹ."},
  {n:"Dạy bằng chuyện kể",c:{suc:-3},w:{duc:3},sc:1,f:"gentle",wx:"trẻ thích học",rt:"Bọn trẻ đòi nghe thêm."}]},
 s2:{h:"Đứa trẻ chậm hiểu",w:"emp",t:"Một hoàng tự nhỏ học mãi không nhớ chữ, bị anh em chế giễu.",o:[
  {n:"Kèm riêng",c:{suc:-5},w:{duc:4},sc:1,wx:"đứa trẻ tiến bộ",rt:"Ba tháng sau nó viết được tên mình."},
  {n:"Báo với mẹ nó",c:{},w:{tamco:2},wx:"không gánh trách",lx:"đứa trẻ tủi thân",rt:"Mẹ nó cảm ơn lấy lệ."}]},
 c1:{h:"{v} không bằng lòng",w:"v",need:["v"],t:"{v} cho là ngươi thiên vị, không chăm con nàng.",o:[
  {n:"Mời {v} đến dự giờ",c:{},o:50,sc:1,wx:"{v} thấy ngươi công bằng",l:{},lx:"{v} càng bới lỗi",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,15)},rt:"{v} xem xong, gật đầu.",rf:"{v} bới lỗi từng chữ."},
  {n:"Kèm thêm cho con nàng",c:{suc:-4},w:{duc:2},sc:1,wx:"{v} nguôi",rt:"Con {v} tiến bộ, nàng gửi lễ cảm ơn."}]},
 c2:{h:"Hoàng thượng xét bài",w:"emp",t:"Hoàng thượng bất ngờ đến Thượng thư phòng, gọi bọn trẻ đọc bài.",o:[
  {n:"Để đứa giỏi nhất đọc",c:{},o:60,w:{sung:4},wx:"ngài hài lòng",l:{sung:-3},rt:"Hoàng thượng khen.",rf:"Đứa trẻ quên bài."},
  {n:"Để đứa chậm nhất đọc",c:{},o:A=>40+(A.f.gentle?20:0),w:{sung:6,duc:3},sc:1,wx:"ngài thấy công dạy",l:{sung:-4},rt:"Đứa chậm nhất đọc trôi chảy, Hoàng thượng kinh ngạc.",rf:"Đứa trẻ ấp úng, ngài nhíu mày."}]},
 c3:{h:"Con ngươi cùng học",need:["kid"],w:"kid",t:"{k} cũng ngồi trong lớp. Các mẹ khác nhìn xem ngươi có thiên vị không.",o:[
  {n:"Đối xử như mọi đứa",c:{},w:{duc:4},sc:1,wx:"được tiếng công bằng",lx:"con ít được kèm",rt:"Không ai trách được ngươi."},
  {n:"Kèm thêm cho con mình",c:{danh:-3},w:{},wx:"con giỏi hơn",go:()=>e67heir(6),rt:"{k} giỏi lên trông thấy."}]},
 t1:{h:"Một đứa trẻ bị ốm sau giờ học",w:"doc",t:"Một công chúa nhỏ ngất sau buổi học. Mẹ nàng đổ lỗi cho ngươi bắt học quá sức.",o:[
  {n:"Nhận lỗi, xin chăm sóc",c:{suc:-5},w:{duc:4},sc:1,wx:"mẹ nàng nguôi giận",rt:"Công chúa khỏi bệnh, ôm ngươi không rời."},
  {n:"Mời thái y chứng minh không phải do học",c:{bac:-30},o:55,w:{tamco:2},sc:1,wx:"rửa tiếng",l:{danh:-4},rt:"Thái y nói công chúa bị cảm lạnh từ trước.",rf:"Thái y nói mập mờ."}]},
 x1:{h:"Ngày khảo hạch",w:"emp",t:"Cuối năm, Hoàng thượng khảo hạch các hoàng tự trước triều thần.",o:[
  {n:"Chuẩn bị cho chúng hiểu bài, không học vẹt",c:{suc:-5},o:A=>35+(A.f.gentle?15:0)+S.tai/5,e:["win","mid"],rt:"Bọn trẻ đối đáp lưu loát, triều thần khen thầy giỏi.",rf:"Bọn trẻ hiểu bài nhưng nói vụng."},
  {n:"Cho học thuộc lòng thật kỹ",c:{suc:-5},o:A=>45+(A.f.strict?15:0),e:["win2","lose"],rt:"Bọn trẻ đọc không sai một chữ.",rf:"Một đứa quên bài, cả lớp rối loạn."},
  {n:"Xin thôi dạy trước ngày khảo",c:{danh:-3},w:{suc:5},e:"mid",lx:"công dạy bỏ dở",rt:"Ngươi xin thôi."}]}},
 E:{win:{k:1,tag:"Thầy giỏi của Thượng thư phòng",w:"emp",t:"Hoàng thượng khen ngươi dạy dỗ có phương pháp. Các hoàng tự kính ngươi, các mẹ nợ ngươi.",fx:{danh:10,sung:5,duc:4},go:()=>e67heir(8)},
  win2:{k:1,tag:"Lớp học nề nếp",t:"Bọn trẻ thuộc bài làu làu. Hoàng thượng hài lòng.",fx:{danh:6,sung:3},go:()=>e67heir(4)},
  mid:{k:0,tag:"Công dạy lặng lẽ",t:"Không ai khen to, nhưng bọn trẻ nhớ ngươi.",fx:{duc:3}},
  lose:{k:-1,tag:"Khảo hạch thất bại",t:"Khảo hạch hỏng, các mẹ đổ lỗi cho ngươi. Hoàng thượng thôi giao việc dạy.",fx:{danh:-6,sung:-4}}}};
/* ================= CUNG NỮ TUYỂN VÀO CUNG (đang là kẻ hầu: Chủ tin, Hoàng thượng để ý) ================= */
/* owner 16/11 06:20Z (review/promo-skip): an arc ending that SAYS she is raised a bậc gives the servant rank at once, no Nội vụ phủ exam
   (cap srvMax, the mistress's palace; at the cap it falls back to Công lao) */
function e67srvUp(n){try{if(S.srv&&!S.srv.risen&&typeof isSrv==="function"&&isSrv()){const mx=typeof srvMax==="function"?srvMax():2;
  if((S.srv.rk||0)<mx){S.srv.rk=(S.srv.rk||0)+1;S.srv.mp=0;S.srv.ex={};try{if(typeof exSrvDrop==="function")exSrvDrop()}catch(e){}
   log(`<b class="g">Được thăng ${SRK.maid[S.srv.rk]}</b> (không qua khảo hạch).`);return `Được thăng ${SRK.maid[S.srv.rk]}, không qua khảo hạch.`}}}catch(e){console.error(e)}return e67merit(n)}
function e67merit(n){try{if(S.srv&&!S.srv.risen&&typeof srvMerit==="function"){srvMerit(n);return `Công lao +${n}.`}}catch(e){}return""}
ARC67.cnv_chu={o:"cnv",t:"Bí mật của chủ nhân",w:"mis",sj:"bí mật của {mis}",g:"Đêm trực, ngươi thấy {mis} lén đốt một bức thư và giấu một gói thuốc. Biết bí mật của chủ là cầm dao hai lưỡi: giữ thì được tin, lộ thì mất mạng nghề.",
 p:[["s1","s2"],["c1","c2","c3","G.srv","G.spy"],["t1"],["x1"]],
 B:{
 s1:{h:"Đêm trực",w:"mis",t:"Nửa đêm, ngươi thấy {mis} đốt thư bên lò sưởi, tay run run. Nàng ngẩng lên, bắt gặp ánh mắt ngươi.",o:[
  {n:"Quỳ xuống: nô tỳ không thấy gì",c:{},w:{tin:8},f:"loyal",wx:"chủ tin ngươi",lx:"bị ràng buộc vào bí mật",rt:"{mis} nhìn ngươi rất lâu rồi gật đầu."},
  {n:"Hỏi chủ có cần giúp",c:{},o:45,w:{tin:12},sc:1,f:"loyal",wx:"thành người tâm phúc",l:{tin:-8},lx:"chủ nghi ngươi tò mò",rt:"{mis} thở dài, nhờ ngươi đổ tro ra giếng sau.",rf:"{mis} quát ngươi lui ra."}]},
 s2:{h:"Gói thuốc lạ",w:"maid",t:"Dọn phòng, ngươi thấy gói thuốc chủ giấu dưới gối. Mùi thuốc là xạ hương.",o:[
  {n:"Để nguyên chỗ cũ",c:{},w:{tamco:2},wx:"không đụng vào",lx:"không biết chủ định làm gì",rt:"Ngươi xếp gối lại như cũ."},
  {n:"Lén lấy một ít đem hỏi",c:{bac:-5},o:50,sc:1,f:"know",wx:"biết thuốc dùng làm gì",l:{tin:-6},lx:"chủ thấy gói thuốc vơi",rt:"Thuốc dùng để làm sảy thai.",rf:"Chủ phát hiện thuốc vơi, nghi ngươi."}]},
 c1:{h:"Người khác dò hỏi",w:"maid",t:"Cung nữ của cung khác gạ ngươi: ‘Kể chuyện chủ ngươi đi, chủ ta trả hậu.’",o:[
  {n:"Từ chối, báo chủ",gi:["tramngoc","story"],c:{},w:{tin:8},f:"loyal",wx:"chủ tin hơn",lx:"cung kia thù",rt:"{mis} thưởng ngươi một chiếc trâm."},
  {n:"Bán một tin vặt",c:{duc:-3},o:55,w:{bac:15},f:"sell",wx:"có bạc",l:{tin:-12},lx:"chủ biết",rt:"Bạc vào túi.",rf:"Chủ biết ngươi bán tin."}]},
 c2:{h:"Chủ sai việc nguy",w:"mis",t:"{mis} dúi gói thuốc vào tay ngươi: ‘Đem bỏ vào hương liệu của cung kia.’",o:[
  {n:"Vâng lời",c:{duc:-6},o:()=>45+S.tamco/4,w:{tin:15},sc:1,f:"loyal",wx:"chủ coi ngươi là tâm phúc",l:{tin:-5,danh:-5},lx:"bị bắt quả tang",rt:"Việc trót lọt.",rf:"Người cung kia bắt được ngươi, ngươi chối được nhưng bị đánh."},
  {n:"Lén đổ thuốc đi, giả như đã làm",c:{},o:50,w:{duc:4},sc:1,f:"clean",wx:"tay sạch mà chủ vẫn tin",l:{tin:-10},lx:"chủ biết ngươi lừa",rt:"Không ai biết.",rf:"Chủ biết ngươi không làm."},
  {n:"Quỳ xin chủ đừng làm",c:{},o:40,w:{duc:5},f:"clean",wx:"chủ nghĩ lại",l:{tin:-10},rt:"{mis} lặng người, cất gói thuốc.",rf:"{mis} tát ngươi, sai người khác."}]},
 c3:{h:"Hoàng thượng hỏi chuyện",w:"emp",t:"Hoàng thượng ghé cung, thấy ngươi pha trà, buột miệng hỏi: ‘Chủ ngươi dạo này có khỏe không?’",o:[
  {n:"Thưa khéo cho chủ",lx:"ngài chưa nhớ tên ngươi",c:{},w:{tin:5,nt:5},wx:"cả chủ và ngài để ý",rt:"Hoàng thượng gật đầu, nhìn ngươi lâu một chút."},
  {n:"Nói thật chủ hay mất ngủ, lo âu",c:{},o:50,w:{nt:10},sc:1,wx:"ngài nhớ mặt ngươi",l:{tin:-8},lx:"chủ giận vì nói nhiều",rt:"Hoàng thượng quan tâm, hỏi tên ngươi.",rf:"Chủ biết ngươi nhiều lời."}]},
 t1:{h:"Bí mật sắp lộ",w:"mis",t:"Cung kia đã nghi. Người của Nội vụ phủ đến tra hỏi kẻ hầu cung ngươi.",o:[
  {n:"Một mình nhận hết để che chủ",c:{suc:-8},o:45,w:{tin:20},sc:2,f:"loyal",wx:"chủ mang ơn suốt đời",l:{tin:5,danh:-6},lx:"bị phạt",rt:"Nội vụ phủ không tra ra gì, chủ khóc cảm ơn.",rf:"Ngươi bị phạt quỳ ba ngày, chủ vẫn cảm ơn."},
  {n:"Khai thật với Nội vụ phủ",c:{tin:-20},w:{duc:5,danh:4},f:"clean",wx:"giữ mình sạch",lx:"chủ hận ngươi",rt:"Nội vụ phủ ghi lời ngươi."}]},
 x1:{h:"Số phận của bí mật",w:"mis",t:"Mọi chuyện đi đến hồi kết. Bí mật của {mis} nằm trong tay ngươi.",o:[
  {n:"Giữ trọn bí mật cho chủ",c:{},o:A=>45+(A.f.loyal?20:0),e:["win","mid"],rt:"{mis} thề sẽ nâng đỡ ngươi.",rf:"Bí mật giữ được, nhưng chủ vẫn dè chừng."},
  {n:"Trình lên Hoàng hậu",c:{duc:-2},o:A=>35+(A.f.know?20:0)+(A.f.clean?10:0),e:["win2","lose"],rt:"Hoàng hậu khen ngươi trung thực, đưa ngươi về hầu Càn Ninh cung.",rf:"Không đủ chứng cứ, ngươi bị chủ trả về Nội vụ phủ."},
  {n:"Xin chuyển sang hầu cung khác",c:{bac:-10},w:{duc:3},e:"mid",lx:"bỏ lại tất cả",rt:"Nội vụ phủ chuyển ngươi đi."}]}},
 E:{win:{k:1,tag:"Tâm phúc của chủ",w:"mis",t:"{mis} coi ngươi là người tin cẩn nhất, tiến cử ngươi với Hoàng thượng mỗi khi có dịp.",fx:{tin:20,nt:10,danh:3},go:()=>e67merit(6)},
  win2:{k:1,tag:"Được Hoàng hậu trọng dụng",t:"Hoàng hậu khen ngươi trung thực, ban thưởng và để mắt đến ngươi.",fx:{danh:8,nt:8,hh:10},go:()=>e67merit(5)},
  mid:{k:0,tag:"Rời xa bí mật",t:"Ngươi rời xa chuyện ấy, giữ được mình. Mọi thứ bắt đầu lại.",fx:{duc:3}},
  lose:{k:-1,tag:"Bị trả về Nội vụ phủ",t:"Ngươi bị chủ ghét, trả về Nội vụ phủ chờ phân việc khác. Vất vả hơn, nhưng đường vẫn còn.",fx:{tin:-20,danh:-4}}}};
ARC67.cnv_ban={o:"cnv",t:"Chị em đồng hương",w:"maid",sj:"chuyện Xuân Đào bị vu",g:"Xuân Đào, cô gái cùng quê vào cung một đợt với ngươi, bị vu ăn cắp vòng ngọc của chủ. Cứu tri kỷ là đắc tội người khác; bỏ bạn thì lương tâm cắn rứt.",
 p:[["s1","s2"],["c1","c2","c3","G.srv","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Xuân Đào bị bắt",w:"maid",t:"Xuân Đào bị trói ở sân sau, khóc gọi tên ngươi: ‘Muội không lấy! Tỷ cứu muội!’",o:[
  {n:"Đến xin cho nàng",c:{tin:-5},o:45,w:{duc:4},sc:1,wx:"nàng được hoãn đánh",l:{danh:-2},lx:"bị coi là đồng bọn",rt:"Chưởng sự cho hoãn đánh ba ngày.",rf:"Chưởng sự đuổi ngươi ra."},
  {n:"Lặng lẽ dò xem ai lấy vòng",c:{bac:-5},o:50,sc:1,f:"clue",wx:"có manh mối",l:{},lx:"không ra",rt:"Có người thấy một cung nữ khác lảng vảng gần hộp trang sức.",rf:"Không ai nói gì."}]},
 s2:{h:"Kẻ thật sự lấy vòng",w:"maid",t:"Manh mối dẫn đến Thu Cúc, cung nữ thân cận của chủ, người vẫn ghen Xuân Đào được chủ thương.",o:[
  {n:"Rình bắt Thu Cúc",c:{suc:-5},o:45,sc:2,f:"catch",wx:"bắt được tang vật",l:{},lx:"Thu Cúc biết bị rình",rt:"Ngươi thấy Thu Cúc giấu vòng trong bao gạo.",rf:"Thu Cúc cảnh giác."},
  {n:"Nói thẳng với Thu Cúc",c:{},o:40,sc:1,wx:"Thu Cúc sợ, có thể trả vòng",l:{},lx:"Thu Cúc thù",rt:"Thu Cúc tái mặt, hứa ‘tìm lại’ vòng.",rf:"Thu Cúc đi mách chủ ngươi vu nàng."}]},
 c1:{h:"Xuân Đào ốm trong ngục",w:"doc",t:"Bị nhốt trong phòng tối, Xuân Đào sốt cao.",o:[
  {n:"Lén mang thuốc",c:{bac:-5,suc:-3},w:{duc:3},sc:1,wx:"nàng qua cơn",rt:"Xuân Đào hạ sốt."},
  {n:"Không dám",c:{},w:{tin:2},wx:"không bị phát hiện",lx:"nàng yếu đi",rt:"Ngươi nằm trằn trọc."}]},
 c2:{h:"Chủ hỏi ngươi",w:"mis",t:"{mis} hỏi ngươi: ‘Ngươi thân với con bé đó. Nó có tính ăn cắp không?’",o:[
  {n:"Bênh bạn",c:{},o:45,w:{duc:3},sc:1,wx:"chủ nghĩ lại",l:{tin:-6},rt:"Chủ ngẫm nghĩ.",rf:"Chủ bảo ngươi bênh đồng bọn."},
  {n:"Thưa không rõ",c:{duc:-2},w:{tin:4},wx:"giữ được lòng chủ",lx:"tri kỷ cô độc",rt:"Chủ gật đầu."}]},
 c3:{h:"Thu Cúc ra tay trước",w:"maid",t:"Thu Cúc đặt một chiếc khăn của ngươi cạnh hộp trang sức, như muốn kéo ngươi vào.",o:[
  {n:"Lấy lại khăn trước khi ai thấy",c:{},o:55,w:{tamco:2},sc:1,wx:"thoát bẫy",l:{tin:-8},lx:"bị nghi",rt:"Ngươi lấy lại khăn kịp.",rf:"Chưởng sự thấy khăn của ngươi."},
  {n:"Báo trước với chưởng sự",lx:"Thu Cúc biết ngươi đề phòng",c:{},w:{tin:3},sc:1,wx:"chưởng sự biết có kẻ gài",rt:"Chưởng sự nhíu mày về phía Thu Cúc."}]},
 t1:{h:"Ngày xử",w:"mis",t:"Mai Xuân Đào bị xử. Nếu thua, nàng bị đánh ba mươi trượng và đày Tân Giả khố.",o:[
  {n:"Tìm người làm chứng",c:{bac:-10},o:50,sc:1,f:"wit",wx:"có người làm chứng",l:{},lx:"không ai dám",rt:"Một tiểu thái giám nhận sẽ nói.",rf:"Không ai dám làm chứng."},
  {n:"Chuẩn bị lời bênh",c:{suc:-3},w:{tamco:2},sc:1,wx:"lời lẽ chặt",rt:"Ngươi thức đêm soạn lời."}]},
 x1:{h:"Phiên xử ở sân sau",w:"mis",t:"Cả cung đứng xem. Xuân Đào quỳ giữa sân.",o:[
  {n:"Đứng ra tố Thu Cúc",c:{},o:A=>30+(A.f.catch?25:0)+(A.f.wit?15:0)+(A.f.clue?5:0),e:["win","lose"],rt:"Vòng ngọc tìm thấy trong đồ của Thu Cúc. Xuân Đào được tha.",rf:"Không đủ chứng cứ, ngươi bị phạt vì vu cáo."},
  {n:"Xin chủ nhẹ tay với Xuân Đào",c:{tin:-5},o:55,e:["mid","lose"],rt:"Chủ giảm phạt, Xuân Đào chỉ bị đổi đi.",rf:"Chủ không nghe."},
  {n:"Im lặng",c:{duc:-4},w:{tin:3},e:"mid",lx:"mất một tri kỷ",rt:"Ngươi cúi đầu."}]}},
 E:{win:{k:1,tag:"Cứu được tri kỷ",t:"Xuân Đào được minh oan, chủ khen ngươi tinh ý, còn giao thêm việc. Cả đám cung nữ nể ngươi.",fx:{tin:12,danh:6},go:()=>e67merit(6)},
  mid:{k:0,tag:"Bạn đi xa",t:"Xuân Đào bị đổi đi cung khác. Hai chị em thỉnh thoảng gửi nhau chiếc bánh.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị phạt vì vu cáo",t:"Ngươi bị phạt quỳ, Chủ tin giảm. Thu Cúc đắc ý.",fx:{tin:-15,danh:-4,suc:-8}}}};
ARC67.cnv_mat={o:"cnv",t:"Ánh mắt nơi hành lang",w:"emp",sj:"chuyện Hoàng thượng để ý ngươi",g:"Một chiều mưa, Hoàng thượng dừng lại dưới mái hiên nơi ngươi đứng hầu. Từ hôm ấy, ánh mắt ngài cứ tìm ngươi. Chủ nhân đã bắt đầu để ý.",
 p:[["s1","s2"],["c1","c2","c3","G.srv","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Chiếc ô dưới mưa",w:"emp",t:"Hoàng thượng trú mưa dưới hiên. Ngươi là người duy nhất mang ô.",o:[
  {n:"Dâng ô, cúi đầu",c:{},w:{nt:8,duc:2},wx:"ngài nhớ cử chỉ của ngươi",lx:"chủ có thể biết",rt:"Hoàng thượng hỏi: ‘Ngươi tên gì?’"},
  {n:"Dâng ô, nhìn ngài một khoảnh khắc",c:{},o:50,w:{nt:14},sc:1,f:"bold",wx:"ngài nhớ mặt",l:{tin:-6},lx:"bị cho là lẳng lơ",rt:"Ngài mỉm cười.",rf:"Một thái giám mách chủ ngươi."}]},
 s2:{h:"Chủ nghe phong thanh",w:"mis",t:"{mis} hỏi lạnh: ‘Nghe nói hôm qua ngươi dâng ô cho Hoàng thượng?’",o:[
  {n:"Thưa: nô tỳ chỉ làm phận sự, công là của chủ",c:{},o:()=>50+S.tamco/4,w:{tin:5},f:"humble",wx:"chủ nguôi",l:{tin:-8},rt:"Chủ gật đầu, không nói thêm.",rf:"Chủ không tin."},
  {n:"Xin chủ tiến cử",c:{},o:35,w:{nt:8,tin:5},sc:1,f:"bold",wx:"chủ đưa ngươi lên",l:{tin:-15},lx:"chủ ghen",rt:"Chủ cười: ‘Có chí đấy.’",rf:"Chủ đập vỡ chén trà."}]},
 c1:{h:"Ngài lại ghé",w:"emp",t:"Hoàng thượng ghé cung chủ ngươi thường hơn, nhưng mắt ngài cứ nhìn về phía ngươi.",o:[
  {n:"Tránh mặt",c:{nt:-3},w:{tin:6},f:"humble",wx:"chủ yên lòng",rt:"Ngươi xin trực bếp."},
  {n:"Pha trà ngài thích",c:{bac:-5},o:55,w:{nt:10},sc:1,wx:"ngài chú ý hơn",l:{tin:-6},rt:"Ngài khen trà ngon.",rf:"Chủ nhận ra."}]},
 c2:{h:"Một phi tần khác muốn mua ngươi",w:"v",need:["v"],t:"{v} hỏi xin ngươi về hầu nàng, hứa cho ngươi gần Hoàng thượng hơn.",o:[
  {n:"Từ chối, ở với chủ",lx:"{v} phật ý",c:{},w:{tin:8},f:"humble",wx:"chủ cảm động",rt:"Chủ kể chuyện với cả cung."},
  {n:"Ngầm nhận lời",c:{duc:-2},o:45,w:{nt:6},sc:1,wx:"có đường khác",l:{tin:-12},lx:"chủ biết",rt:"{v} hứa sẽ xin người.",rf:"Chủ biết, nổi giận."}]},
 c3:{h:"Bài hát nơi hậu viện",w:"maid",t:"Ngươi hát khẽ bài dân ca quê nhà khi giặt áo. Có người đứng nghe sau cửa.",o:[
  {n:"Hát tiếp",c:{},o:50,w:{nt:10,danh:2},sc:1,wx:"người nghe là Hoàng thượng",l:{tin:-4},lx:"chủ cho là ngươi lười",rt:"Hoàng thượng đứng nghe hết bài.",rf:"Người nghe là chưởng sự, mắng ngươi lười."},
  {n:"Im lặng làm việc",c:{},w:{tin:3},wx:"chăm chỉ",lx:"lỡ dịp",rt:"Ngươi giặt tiếp."}]},
 t1:{h:"Chủ ra tay",w:"mis",t:"{mis} định gả ngươi cho một thái giám già để dứt mối lo.",o:[
  {n:"Quỳ xin chủ tha",c:{suc:-4},o:A=>45+(A.f.humble?20:0),w:{tin:5},sc:1,wx:"chủ mủi lòng",l:{tin:-5},rt:"Chủ mủi lòng, bỏ ý.",rf:"Chủ không đổi ý."},
  {n:"Nhờ người báo cho Hoàng thượng",c:{bac:-10},o:A=>40+(A.f.bold?20:0),w:{nt:10},sc:1,wx:"ngài can thiệp",l:{tin:-10},rt:"Hoàng thượng hỏi đến, chủ đành thôi.",rf:"Tin không đến tai ngài."}]},
 x1:{h:"Đêm Trung thu",w:"emp",t:"Đêm Trung thu, Hoàng thượng ngự cung chủ ngươi. Ngài gọi ngươi đến rót rượu.",o:[
  {n:"Rót rượu, đối đáp khéo",c:{},o:A=>35+S.nt/3+(A.f.bold?10:0),e:["win","lose"],rt:"Hoàng thượng hỏi chủ xin ngươi.",rf:"Ngài vui, nhưng chưa nói gì."},
  {n:"Rót rượu rồi lui, nhường chủ",c:{},o:A=>50+(A.f.humble?20:0),e:["win2","mid"],rt:"Chủ cảm động, tự tay tiến cử ngươi.",rf:"Chủ vui, nhưng chưa nghĩ đến ngươi."},
  {n:"Cáo ốm không ra",c:{nt:-5},w:{tin:5},e:"mid",lx:"lỡ dịp",rt:"Ngươi ở trong phòng."}]}},
 E:{win:{k:1,tag:"Được Hoàng thượng xin về",w:"emp",t:"Hoàng thượng nhớ tên ngươi, hỏi chủ xin người. Con đường lên phi tần đã mở.",fx:{nt:25,danh:4}},
  win2:{k:1,tag:"Chủ tiến cử",w:"mis",t:"Chủ thương ngươi, tự tay tiến cử. Hoàng thượng để ý ngươi, chủ cũng không ghen.",fx:{nt:15,tin:15},go:()=>e67merit(5)},
  mid:{k:0,tag:"Chưa đến lúc",t:"Hoàng thượng vẫn nhớ ngươi, nhưng chưa phải lúc.",fx:{nt:4}},
  lose:{k:-1,tag:"Chủ ghen",t:"Chủ ghen, đày ngươi làm việc nặng. Hoàng thượng ít thấy ngươi hơn.",fx:{tin:-15,nt:-5}}}};
ARC67.cnv_ma={o:"cnv",t:"Ma ma dạy việc",w:"maid",sj:"chuyện Lưu ma ma",g:"Lưu ma ma nghiêm khắc nhất Nội vụ phủ chọn ngươi để dạy việc. Bà nói: ‘Qua được ta, ngươi sẽ thành chưởng sự. Không qua, ngươi về giặt áo.’",
 p:[["s1","s2"],["c1","c2","c3","G.srv","G.spy"],["t1"],["x1"]],
 B:{
 s1:{h:"Bài học đầu",w:"maid",t:"Lưu ma ma bắt ngươi bưng khay trà đầy, đi qua sân sỏi không sóng một giọt.",o:[
  {n:"Tập đến khi được",c:{suc:-8},w:{tin:3},sc:1,f:"hard",wx:"ma ma ghi nhận",rt:"Đến ngày thứ năm, khay trà không sóng."},
  {n:"Lén đổ bớt trà cho nhẹ",c:{},o:45,w:{tamco:2},wx:"qua nhanh",l:{danh:-3},lx:"ma ma phát hiện",f:"trick",rt:"Ma ma không để ý.",rf:"Ma ma phạt ngươi đứng ngoài sân."}]},
 s2:{h:"Sổ sách Nội vụ phủ",w:"maid",t:"Ma ma giao ngươi chép sổ sách hàng xuất nhập. Có mấy dòng không khớp.",o:[
  {n:"Báo ma ma",c:{},o:55,sc:1,f:"honest",wx:"ma ma thấy ngươi tinh",l:{},lx:"ma ma liên quan",rt:"Ma ma gật đầu, ghi nhớ.",rf:"Ma ma bảo ngươi đừng xen vào."},
  {n:"Chép đúng như sổ cũ",c:{},w:{tamco:2},wx:"không gây chuyện",lx:"che sai sót",rt:"Ngươi chép xong."}]},
 c1:{h:"Ma ma ốm",w:"doc",t:"Lưu ma ma ốm liệt giường, không ai chăm.",o:[
  {n:"Chăm bà",c:{suc:-6},w:{duc:4},sc:2,wx:"bà coi ngươi như con",rt:"Ma ma nắm tay ngươi."},
  {n:"Gửi thuốc rồi về làm việc",c:{bac:-5},w:{tin:3},sc:1,wx:"không lỡ việc",rt:"Ma ma nhận thuốc."}]},
 c2:{h:"Đồng liêu ghen",w:"maid",t:"Mấy cung nữ khác ghen vì ma ma chọn ngươi, vu ngươi làm vỡ bình.",o:[
  {n:"Tự đi nhận lỗi để êm",c:{bac:-10},w:{duc:3},wx:"êm chuyện",lx:"chịu oan",rt:"Ma ma nhìn ngươi lạ lùng."},
  {n:"Tìm người làm chứng",c:{},o:50,sc:1,wx:"rửa oan",l:{danh:-3},rt:"Có người thấy kẻ khác làm vỡ.",rf:"Không ai làm chứng."}]},
 c3:{h:"Ma ma thử lòng",w:"maid",t:"Ma ma để lại một túi bạc trên bàn rồi đi ra ngoài.",o:[
  {n:"Không động đến",c:{},w:{duc:3},sc:1,f:"honest",wx:"qua được thử thách",lx:"không được gì ngay",rt:"Ma ma quay lại, đếm bạc, gật đầu."},
  {n:"Cất giùm vào tủ",c:{},o:50,sc:1,w:{tamco:2},wx:"ma ma thấy ngươi chu đáo",l:{},lx:"bà nghi",rt:"Ma ma khen chu đáo.",rf:"Ma ma nghi ngươi định lấy."}]},
 t1:{h:"Ma ma có bí mật",w:"maid",t:"Ngươi biết: ma ma từng che giấu cho một chưởng sự ăn bớt. Giờ người đó đang bị tra.",o:[
  {n:"Giữ kín cho ma ma",c:{},w:{tin:2},sc:1,f:"loyal",wx:"bà mang ơn",lx:"che giấu sai trái",rt:"Ma ma biết ngươi biết, và biết ngươi im lặng."},
  {n:"Khuyên ma ma tự nhận",c:{},o:45,w:{duc:4},sc:1,f:"honest",wx:"bà nhẹ tội",l:{},lx:"bà giận",rt:"Ma ma nhận lỗi, chỉ bị phạt bổng.",rf:"Ma ma giận, đuổi ngươi ra."}]},
 x1:{h:"Ngày khảo việc",w:"maid",t:"Nội vụ phủ khảo việc các cung nữ. Lưu ma ma là người chấm.",o:[
  {n:"Làm hết sức, không cầu cạnh",c:{suc:-6},o:A=>40+(A.f.hard?15:0)+(A.f.honest?10:0),e:["win","mid"],rt:"Ma ma chấm ngươi đứng đầu.",rf:"Ngươi làm tốt, nhưng chưa đứng đầu."},
  {n:"Nhờ ma ma nâng đỡ",c:{bac:-10},o:A=>45+(A.f.loyal?20:0),e:["win2","lose"],rt:"Ma ma nâng ngươi lên.",rf:"Ma ma ghét kẻ cầu cạnh, đánh trượt ngươi."},
  {n:"Xin hoãn khảo",c:{},w:{suc:4},e:"mid",lx:"chờ thêm một năm",rt:"Ngươi xin hoãn."}]}},
 E:{win:{k:1,tag:"Học trò giỏi của Lưu ma ma",t:"Ngươi đứng đầu kỳ khảo, được ma ma tiến cử lên một bậc. Cả Nội vụ phủ biết tên ngươi.",fx:{danh:6,tin:10},go:()=>e67srvUp(10)},
  win2:{k:1,tag:"Được ma ma nâng đỡ",t:"Ma ma nâng ngươi lên một bậc. Ngươi có một chỗ dựa trong Nội vụ phủ.",fx:{tin:8,danh:3},go:()=>e67srvUp(6)},
  mid:{k:0,tag:"Chờ dịp khác",t:"Ngươi chưa được thăng, nhưng tay nghề đã khác hẳn.",fx:{suc:3,duc:2}},
  lose:{k:-1,tag:"Bị ma ma đánh trượt",t:"Ma ma đánh trượt ngươi. Ngươi phải làm lại từ đầu.",fx:{danh:-4,tin:-8}}}};
/* ================= SHARED ARCS (any origin, drawn later in the life) ================= */
const nsrv67=()=>!(typeof isSrv==="function"&&isSrv());
ARC67.s_than={o:"*",ok:nsrv67,t:"Người thân thất lạc",w:"eun",sj:"chuyện người tự nhận là thân thích",g:"Một tiểu thái giám mới vào cung lén tìm ngươi, nói hắn là em họ thất lạc từ nạn lụt năm xưa. Thật hay giả, ơn hay họa, chưa ai biết.",
 cast(A){A.n1="Tiểu "+pick(["Lục","An","Phúc","Thuận","Hỉ"])+" Tử";return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Một tiểu thái giám tìm ngươi",w:"eun",t:"{n1} quỳ trước ngươi, nước mắt lưng tròng, đọc đúng tên làng quê mẹ ngươi.",o:[
  {n:"Cho hắn bạc, hẹn gặp lại",c:{bac:-20},w:{duc:2},sc:1,wx:"giữ hắn bên mình để xem",lx:"có thể bị lừa",rt:"{n1} lạy tạ."},
  {n:"Hỏi những chuyện chỉ người nhà biết",c:{},o:50,sc:1,f:"true",wx:"biết hắn có thật là người nhà",l:{},lx:"hắn lúng túng",rt:"Hắn kể đúng cả vết sẹo trên tay mẹ ngươi.",rf:"Hắn ấp úng vài chỗ."}]},
 s2:{h:"Ai đưa hắn vào cung",w:"maid",t:"{maid} dò được: {n1} được đưa vào cung qua tay một thái giám của {v}.",need:["v"],o:[
  {n:"Đề phòng, theo dõi",c:{bac:-20},sc:1,f:"wary",wx:"biết hắn làm gì",rt:"Người của ngươi bám theo {n1}."},
  {n:"Cho là trùng hợp",c:{},w:{duc:2},wx:"không nghi oan người thân",lx:"có thể là cài người",rt:"Ngươi bỏ qua."}]},
 c1:{h:"Hắn xin việc ở cung ngươi",w:"eun",t:"{n1} xin được về hầu cung ngươi.",o:[
  {n:"Nhận",c:{bac:-20},o:A=>50+(A.f.true?20:0)-(A.f.wary?0:5),sc:1,f:"took",wx:"có người thân bên cạnh",l:{danh:-3},lx:"hắn là tai mắt người khác",rt:"{n1} chăm chỉ, trung thành.",rf:"Ngươi bắt gặp hắn lục thư từ."},
  {n:"Từ chối, giới thiệu nơi khác",c:{},w:{tamco:2},wx:"giữ khoảng cách",lx:"hắn buồn",rt:"{n1} về hầu Ngự thiện phòng."}]},
 c2:{h:"{v} nhắc khéo",w:"v",need:["v"],t:"{v} cười: ‘Nghe nói {goi} có người thân trong đám thái giám. Thật thú vị.’",o:[
  {n:"Thản nhiên nhận",c:{danh:-2},w:{duc:3},wx:"không ai bắt bẻ được",rt:"{v} cụt hứng."},
  {n:"Phản đòn: hỏi ai đưa hắn vào",c:{},o:45,sc:1,wx:"{v} lộ mình",l:{danh:-3},rt:"{v} khựng lại.",rf:"{v} cười khẩy."}]},
 c3:{h:"Hắn gặp nạn",w:"eun",t:"{n1} bị vu ăn cắp ở Ngự thiện phòng.",o:[
  {n:"Đứng ra bảo lãnh",c:{bac:-30},o:50,w:{duc:3},sc:1,wx:"hắn mang ơn",l:{danh:-3},rt:"Hắn được tha.",rf:"Hắn được tha, nhưng tên ngươi bị nhắc."},
  {n:"Để Tổng quản xử",c:{},w:{tamco:2},wx:"không liên lụy",lx:"hắn chịu đòn",rt:"{n1} bị đánh mười trượng."}]},
 t1:{h:"Sự thật lộ ra",w:"eun",t:"Một đêm {n1} quỳ xuống: hắn đúng là em họ ngươi, nhưng bị {v} ép dò tin về ngươi.",o:[
  {n:"Tha thứ, cho hắn làm tai mắt hai mang",c:{},o:50,sc:2,f:"double",wx:"tin giả đến tay {v}",l:{},lx:"hắn không giữ nổi",rt:"{n1} thề trung với ngươi.",rf:"Hắn sợ hãi bỏ trốn."},
  {n:"Đuổi hắn đi",c:{},w:{tamco:2},wx:"dứt mối nguy",lx:"mất người thân",rt:"{n1} khóc rời đi."}]},
 x1:{h:"Ván cờ người thân",w:"eun",t:"{v} chuẩn bị dùng tin {n1} gửi để tố ngươi.",o:[
  {n:"Để {v} tố bằng tin giả rồi lật lại",c:{suc:-3},o:A=>35+(A.f.double?25:0),e:["win","lose"],rt:"{v} tố bằng tin giả, bị Hoàng hậu trách vu cáo.",rf:"Tin giả bị lộ, ngươi bị nghi giở trò."},
  {n:"Chặn trước: xin Tổng quản đưa hắn đi xa",c:{bac:-40},w:{duc:3},e:"mid",lx:"mất người thân",rt:"{n1} được đổi ra hành cung."},
  {n:"Nhận hắn công khai, xin Hoàng thượng thương",c:{},o:A=>45+(A.f.true?15:0),e:["win2","mid"],rt:"Hoàng thượng cảm động, cho {n1} làm thái giám hầu cận.",rf:"Hoàng thượng không để tâm."}]}},
 E:{win:{k:1,tag:"Lật bẫy người thân",t:"{v} tự sa vào bẫy của mình. Ngươi có thêm một người thân trung thành và một tai mắt.",fx:{danh:6,mat:2},go:A=>{const v=rv67(A,"v");return v?`${v.name} bị Hoàng hậu phạt chép kinh. `+e67pun(v,4):""}},
  win2:{k:1,tag:"Đoàn tụ người thân",t:"Hoàng thượng thương ngươi có người thân, cho {n1} hầu cận. Ngươi có thêm một người trung thành.",fx:{sung:4,mat:1,duc:3}},
  mid:{k:0,tag:"Người thân đi xa",t:"{n1} đi xa. Ngươi giữ được mình, lòng hơi trống.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị người thân liên lụy",t:"Chuyện {n1} thành cớ để người ta nói ngươi cài tai mắt.",fx:{danh:-6,sung:-4}}}};
ARC67.s_thu={o:"*",ok:nsrv67,t:"Bức mật thư",w:"maid",sj:"bức mật thư nhặt được",g:"Ngươi nhặt được một bức thư rơi trong Ngự hoa viên, không đề tên người gửi. Trong thư là một kế hoạch hãm hại một phi tần. Ai viết, ai bị hại, và ngươi sẽ làm gì?",
 cast(A){if(!castRv67(A,"v"))return false;castRv67(A,"v2");return true},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Bức thư trong vườn",w:"maid",t:"Thư viết: ‘Đêm rằm, đổi thuốc an thần của {v2}.’ Không ký tên.",o:[
  {n:"Giữ thư, dò nét chữ",c:{suc:-3},o:()=>40+S.tai/4,sc:1,f:"hand",wx:"đoán được ai viết",l:{},lx:"không nhận ra",rt:"Nét chữ giống của cung nữ thân cận {v}.",rf:"Nét chữ lạ hoắc."},
  {n:"Báo ngay cho {v2}",c:{},w:{duc:3},sc:1,f:"warn",wx:"{v2} đề phòng",lx:"kẻ viết thư biết bị lộ",go:(A)=>{const v=rv67(A,"v2");if(v)relAdd(S,v,10)},rt:"{v2} tái mặt cảm ơn."}]},
 s2:{h:"Ai đánh rơi thư",w:"maid",t:"{maid} thấy một cung nữ của {v} hớt hải tìm gì đó ở vườn.",o:[
  {n:"Theo dõi cung nữ ấy",c:{bac:-20},sc:1,wx:"chắc chắn hơn",rt:"Cung nữ ấy về thẳng cung {v}."},
  {n:"Giả vờ không biết",lx:"chưa chắc ai viết thư",c:{},w:{tamco:2},wx:"không lộ",rt:"Ngươi đi qua."}]},
 c1:{h:"Đêm rằm sắp đến",w:"v2",t:"Còn ba ngày đến rằm.",o:[
  {n:"Cho người canh thuốc của {v2}",c:{bac:-30},o:55,sc:2,f:"catch",wx:"bắt quả tang",l:{},lx:"không bắt được",rt:"Người của ngươi bắt được kẻ đổi thuốc.",rf:"Kẻ đổi thuốc không đến."},
  {n:"Mặc kệ, đây không phải chuyện của ngươi",c:{duc:-3},w:{tamco:2},wx:"không dính vào",lx:"{v2} gặp nạn",rt:"Đêm rằm, {v2} ngủ li bì ba ngày."}]},
 c2:{h:"{v} dò hỏi",w:"v",need:["v"],t:"{v} hỏi ngươi có nhặt được gì ở vườn không.",o:[
  {n:"Chối",c:{},o:()=>45+S.tamco/4,w:{tamco:2},wx:"giữ được con bài",l:{},lx:"{v} nghi",rt:"{v} tin.",rf:"{v} nhìn ngươi đầy nghi ngờ."},
  {n:"Ngầm cho nàng biết ngươi đã biết",c:{},w:{tamco:3},sc:1,f:"leverage",wx:"{v} sợ ngươi",lx:"{v} thù",rt:"{v} tái mặt."}]},
 c3:{h:"Thư thứ hai",w:"maid",t:"Một bức thư thứ hai xuất hiện, lần này nhắc cả tên ngươi.",o:[
  {n:"Đề phòng, đổi người hầu",c:{bac:-30},w:{tamco:2},sc:1,wx:"an toàn",rt:"Cung ngươi canh nghiêm."},
  {n:"Đưa cả hai thư cho Tổng quản",c:{},o:50,sc:1,wx:"có người biết chuyện",l:{},lx:"Tổng quản ỉm đi",rt:"Tổng quản ghi nhận.",rf:"Tổng quản không muốn dính vào."}]},
 t1:{h:"Bằng chứng gom đủ",w:"maid",t:"Ngươi có trong tay đủ để tố {v}. Hoặc để giữ làm con bài.",o:[
  {n:"Chuẩn bị tố",c:{},sc:1,f:"accuse",wx:"vào cao trào",lx:"{v} thù",rt:"Ngươi soạn lời tố."},
  {n:"Giữ làm con bài",lx:"kẻ ác chưa bị trị",c:{},w:{tamco:2},f:"leverage",wx:"{v} nợ ngươi",rt:"Ngươi cất thư."}]},
 x1:{h:"Quyết định về bức thư",w:"maid",t:"Bức thư nằm trên bàn ngươi.",o:[
  {n:"Tố {v} với Hoàng hậu",c:{suc:-3},o:A=>30+(A.f.catch?25:0)+(A.f.hand?10:0),e:["win","lose"],rt:"{v} bị phạt, {v2} mang ơn ngươi.",rf:"Không đủ chứng cứ, ngươi bị cho là vu cáo."},
  {n:"Ép {v} thôi ý định, giữ bí mật",c:{},o:A=>45+(A.f.leverage?20:0),e:["win2","mid"],rt:"{v} cắn răng thôi, từ nay phải nể ngươi.",rf:"{v} thôi ý định nhưng không sợ ngươi."},
  {n:"Đốt thư",c:{},w:{duc:3},e:"mid",lx:"bỏ qua kẻ ác",rt:"Thư cháy."}]}},
 E:{win:{k:1,tag:"Vạch mặt kẻ viết thư",t:"{v} bị phạt. {v2} thành đồng minh của ngươi.",fx:{danh:7},go:A=>[e67ally(rv67(A,"v2"),25),e67foe(rv67(A,"v"),12),e67pun(rv67(A,"v"),4)].join(" ")},
  win2:{k:1,tag:"Nắm thóp {v}",t:"{v} không dám đụng đến ngươi. Ngươi có một con bài trong tay.",fx:{tamco:3,mat:1},go:A=>e67ally(rv67(A,"v"),12)},
  mid:{k:0,tag:"Thư chìm vào quên lãng",t:"Chuyện bức thư qua đi.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị cho là vu cáo",t:"Lời tố không thành. {v} và cả Hoàng hậu đều để ý ngươi.",fx:{danh:-6,hh:-6},go:A=>e67foe(rv67(A,"v"),15)}}};
ARC67.s_hoa={o:"*",ok:nsrv67,t:"Đêm cháy Tây cung",w:"maid",sj:"vụ hỏa hoạn ở Tây cung",g:"Tây cung bốc cháy giữa đêm. Lửa cháy gần cung ngươi. Người ta nói do đèn đổ, nhưng có kẻ thấy bóng người chạy ra trước khi lửa bùng.",
 cast(A){castRv67(A,"v");return true},
 p:[["s1","s2"],["c1","c2","c3","G.rumor","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Lửa giữa đêm",w:"maid",t:"Lửa bùng ở Tây cung, gió thổi về phía cung ngươi. Trong Tây cung còn mấy cung nữ kẹt lại.",o:[
  {n:"Dẫn người của mình đi cứu",c:{suc:-10},o:60,w:{danh:6,duc:3},sc:1,wx:"cứu được người",l:{suc:-8},lx:"bị thương",rt:"Ngươi kéo được hai cung nữ ra.",rf:"Khói làm ngươi ngất, may được kéo ra."},
  {n:"Lo dập lửa giữ cung mình",c:{suc:-5},w:{bac:20},wx:"cung ngươi không mất gì",lx:"người ta chê ích kỷ",rt:"Cung ngươi an toàn."}]},
 s2:{h:"Bóng người trong lửa",w:"maid",t:"Một cung nữ được cứu thì thào: ‘Nô tỳ thấy một thái giám tưới dầu.’",o:[
  {n:"Giấu nàng, hỏi kỹ",c:{bac:-20},sc:1,f:"wit",wx:"có nhân chứng",lx:"giấu người là phiền",rt:"Nàng tả được mặt tên thái giám."},
  {n:"Đưa nàng lên Tổng quản",c:{},o:50,w:{duc:2},sc:1,wx:"việc vào đúng chỗ",l:{},lx:"nàng bị bịt miệng",rt:"Tổng quản cho tra.",rf:"Hôm sau nàng nói không thấy gì."}]},
 c1:{h:"Người ta đổ cho ngươi",w:"v",need:["v"],t:"{v} nói ngươi đã ở gần Tây cung đêm ấy.",o:[
  {n:"Đưa người làm chứng ngươi ở đâu",c:{},o:55,w:{danh:3},sc:1,wx:"rửa nghi",l:{danh:-5},rt:"Mọi người im lặng.",rf:"Người làm chứng của ngươi bị chê là người nhà."},
  {n:"Im lặng",c:{danh:-4},w:{duc:2},wx:"không gây thêm",rt:"Lời đồn bám theo ngươi."}]},
 c2:{h:"Tên thái giám tưới dầu",w:"eun",t:"Ngươi tìm thấy tên thái giám khớp lời tả. Hắn hầu ở cung {v}.",need:["v"],o:[
  {n:"Bắt hắn khai",c:{suc:-3},o:()=>40+S.tamco/4,sc:2,f:"conf",wx:"có lời khai",l:{},lx:"hắn tự vẫn",rt:"Hắn khai được sai đốt để hủy chứng cứ một việc cũ.",rf:"Hắn treo cổ trước khi khai."},
  {n:"Báo Tổng quản",lx:"hắn có thể được che chở",c:{},w:{duc:2},sc:1,wx:"Tổng quản để ý hắn",rt:"Hắn bị canh giữ."}]},
 c3:{h:"Tây cung xây lại",w:"emp",t:"Hoàng thượng muốn xây lại Tây cung, cần bạc.",o:[
  {n:"Góp bạc",c:{bac:-50},w:{sung:3,danh:4},wx:"ngài khen",rt:"Hoàng thượng khen ngươi."},
  {n:"Đề nghị dùng bạc của kẻ phóng hỏa",c:{},o:45,sc:1,wx:"ngài chú ý vụ án",l:{sung:-2},rt:"Hoàng thượng gật gù.",rf:"Hoàng thượng chưa muốn nhắc."}]},
 t1:{h:"Vì sao lửa cháy",w:"maid",t:"Ngươi hiểu ra: Tây cung giữ sổ sách cũ, có ghi chuyện ai đó muốn giấu.",o:[
  {n:"Tìm phần sổ sót lại",c:{suc:-4},o:45,sc:2,f:"book",wx:"có chứng cứ gốc",l:{},lx:"cháy hết",rt:"Ngươi thấy một trang sổ cháy dở nhắc tên {v}.",rf:"Sổ đã thành tro."},
  {n:"Thôi, chuyện cũ đã cháy",lx:"mất dấu kẻ chủ mưu",c:{},w:{tamco:2},wx:"bớt nguy",rt:"Ngươi dừng tay."}]},
 x1:{h:"Kết vụ cháy",w:"emp",t:"Hoàng thượng triệu những người liên quan đến vụ cháy.",o:[
  {n:"Trình nhân chứng và lời khai",c:{suc:-3},o:A=>30+(A.f.wit?15:0)+(A.f.conf?15:0)+(A.f.book?10:0),e:["win","lose"],rt:"Kẻ chủ mưu lộ diện, ngươi được khen cứu người và tra án.",rf:"Không đủ chứng cứ, ngươi bị coi là gây chuyện."},
  {n:"Chỉ kể việc cứu người",c:{},w:{duc:3},e:"mid",lx:"kẻ phóng hỏa thoát",rt:"Ngươi kể lại đêm cháy."}]}},
 E:{win:{k:1,tag:"Vạch kẻ phóng hỏa",w:"emp",t:"Kẻ phóng hỏa bị trừng trị. Hoàng thượng khen ngươi dũng cảm và sáng suốt.",fx:{danh:10,sung:5},go:A=>{const v=rv67(A,"v");return v&&A.f.conf?e67drop(v,"dính vào vụ cháy Tây cung"):""}},
  mid:{k:0,tag:"Đêm cháy qua đi",t:"Tây cung được xây lại. Người ta nhớ ngươi đã cứu người.",fx:{danh:3}},
  lose:{k:-1,tag:"Mang tiếng gây chuyện",t:"Ngươi bị cho là lợi dụng vụ cháy để hại người.",fx:{danh:-6,sung:-4}}}};
ARC67.s_su={o:"*",ok:nsrv67,t:"Sứ thần phương Tây",w:"emp",sj:"sứ đoàn phương Tây",g:"Sứ đoàn từ một nước xa phía Tây đến triều, mang theo đồng hồ, kính và những câu hỏi lạ. Hoàng thượng cần một người tiếp sứ khéo léo trong yến. Ngài chọn ngươi.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"Yến tiếp sứ",w:"emp",t:"Sứ thần tóc vàng cúi chào theo lối lạ. Cả yến lúng túng.",o:[
  {n:"Đáp lễ theo lối của họ",c:{},o:45,w:{danh:4},sc:1,wx:"sứ thần có thiện cảm với ta",l:{th:-5},lx:"Thái hậu chê lạ",rt:"Sứ thần cười rạng rỡ.",rf:"Thái hậu chau mày."},
  {n:"Giữ lễ Đại Hy",c:{},w:{th:4},wx:"Thái hậu hài lòng",lx:"sứ thần ngượng",rt:"Lễ nghi đúng phép."}]},
 s2:{h:"Món quà kỳ lạ",w:"emp",t:"Sứ thần tặng ngươi một chiếc gương soi rõ từng sợi tóc.",o:[
  {n:"Dâng lên Thái hậu",c:{},w:{th:6},wx:"Thái hậu thích",lx:"không giữ được quà",rt:"Thái hậu soi mãi không chán."},
  {n:"Giữ làm của riêng",gi:["guong","emp"],c:{danh:-2},w:{},wx:"Gương Tây dương vào rương (dùng: Sắc +3)",rt:"Ngươi cất gương vào rương."}]},
 c1:{h:"Thông dịch bịa lời",w:"maid",t:"Ngươi nhận ra người thông dịch dịch sai, như cố gây hiểu lầm.",o:[
  {n:"Vạch ngay giữa yến",c:{},o:45,sc:2,f:"truth",wx:"cứu buổi yến",l:{danh:-3},lx:"bị cho là xen vào",rt:"Thông dịch tái mặt, bị thay.",rf:"Không ai tin ngươi hiểu tiếng Tây."},
  {n:"Lặng lẽ báo Lễ bộ",lx:"buổi yến vẫn có hiểu lầm",c:{},w:{duc:2},sc:1,wx:"Lễ bộ đề phòng",rt:"Lễ bộ cho người theo dõi thông dịch."}]},
 c2:{h:"Sứ thần xin truyền đạo",w:"emp",t:"Sứ thần xin được truyền đạo trong kinh. Triều đình phản đối.",o:[
  {n:"Khuyên Hoàng thượng đổi lấy y thuật và lịch pháp",c:{},o:45,sc:2,wx:"Đại Hy có lợi",l:{sung:-3},rt:"Hoàng thượng khen kế.",rf:"Hoàng thượng chê ngươi xen việc."},
  {n:"Đứng về phía triều thần",c:{},w:{th:4},wx:"Thái hậu khen",lx:"sứ thần thất vọng",rt:"Sứ thần cúi đầu."}]},
 c3:{h:"Đồng hồ hỏng",w:"emp",t:"Chiếc đồng hồ cống phẩm ngừng chạy. Có kẻ đồn là điềm xấu.",o:[
  {n:"Mời sứ thần sửa",c:{bac:-20},o:60,w:{sung:3},sc:1,wx:"đồng hồ chạy lại",l:{},lx:"không sửa được",rt:"Đồng hồ kêu tích tắc, ngài vui.",rf:"Đồng hồ vẫn đứng."},
  {n:"Bảo đó là trời bảo ngài nghỉ ngơi",c:{},o:55,w:{sung:4},wx:"ngài bật cười",l:{},lx:"ngài không cười",rt:"Hoàng thượng cười lớn.",rf:"Hoàng thượng không cười."}]},
 t1:{h:"Sứ thần sắp về",w:"emp",t:"Sứ thần muốn ký một bản giao hảo, nhưng cần người trong cung bảo đảm.",o:[
  {n:"Đứng ra bảo đảm",c:{},o:50,sc:2,wx:"bản giao hảo có cơ thành",l:{danh:-3},rt:"Sứ thần cảm tạ.",rf:"Triều thần chê ngươi đứng ra quá vội."},
  {n:"Đứng ngoài",lx:"bản giao hảo khó thành",c:{},w:{duc:2},wx:"không gánh",rt:"Ngươi im lặng."}]},
 x1:{h:"Yến tiễn sứ",w:"emp",t:"Yến tiễn sứ. Hoàng thượng hỏi ngươi nên đáp lễ thế nào.",o:[
  {n:"Đáp lễ bằng tơ lụa và thơ",c:{bac:-30},o:A=>40+(A.f.truth?20:0)+S.tai/6,e:["win","mid"],rt:"Sứ thần mang thơ của ngươi về nước, tên ngươi đi xa vạn dặm.",rf:"Sứ thần nhận lễ, lịch sự mà xa cách."},
  {n:"Đáp lễ bằng vàng thật nhiều",c:{},o:50,e:["win2","lose"],rt:"Sứ thần kính phục sự giàu có của Đại Hy.",rf:"Triều thần chê hoang phí, ngươi bị trách."},
  {n:"Để Lễ bộ lo",c:{},w:{duc:2},e:"mid",lx:"không ai nhớ đến ngươi",rt:"Ngươi im lặng."}]}},
 E:{win:{k:1,tag:"Tên vang vạn dặm",w:"emp",t:"Sứ thần mang thơ ngươi về nước. Hoàng thượng tự hào vì có một phi tần tài trí.",fx:{danh:10,sung:5}},
  win2:{k:1,tag:"Sứ thần kính phục",t:"Hoàng thượng hài lòng vì sứ thần kính phục Đại Hy.",fx:{sung:6,danh:4}},
  mid:{k:0,tag:"Sứ đoàn đi qua",t:"Sứ đoàn về nước, chuyện cũng qua.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị chê hoang phí",t:"Triều thần chê ngươi hoang phí của công.",fx:{danh:-6,sung:-4}}}};
ARC67.s_dich={o:"*",ok:nsrv67,t:"Mùa dịch đậu mùa",w:"doc",sj:"dịch đậu mùa trong cung",g:"Dịch đậu mùa lan vào cung. Thái y viện đóng cửa các cung có người bệnh. Người ta sợ hãi, và nỗi sợ là đất cho kẻ ác gieo mầm.",
 p:[["s1","s2"],["c1","c2","c3","G.ill","G.rumor"],["t1"],["x1"]],
 B:{
 s1:{h:"Dịch vào cung",w:"doc",t:"Một tiểu thái giám chết vì đậu mùa. Thái y viện ra lệnh đóng cửa ba cung.",o:[
  {n:"Đóng cửa cung mình, xông ngải",c:{bac:-30},w:{suc:5},sc:1,wx:"cung ngươi an toàn",lx:"bị chê sợ chết",rt:"Cung ngươi khói ngải mịt mù."},
  {n:"Đến Thái y viện xin giúp",c:{suc:-6},o:55,w:{danh:5,duc:3},sc:1,wx:"được Thái y viện nể",l:{suc:-10},lx:"nhiễm bệnh nhẹ",rt:"Thái y viện giao ngươi chép đơn thuốc.",rf:"Ngươi sốt mấy ngày."}]},
 s2:{h:"Đơn thuốc cổ",w:"doc",t:"Ngươi nhớ một phương chủng đậu cổ: lấy vảy bệnh nhẹ cấy cho người lành.",o:[
  {n:"Dâng phương lên Thái y viện",c:{},o:45,sc:2,f:"cure",wx:"có cách phòng bệnh",l:{danh:-3},lx:"bị chê làm liều",rt:"Thái y viện thử, thấy hiệu nghiệm.",rf:"Thái y viện chê là tà thuật."},
  {n:"Thử cho người trong cung mình",c:{suc:-3},o:55,w:{mat:1},sc:1,f:"cure",wx:"người của ngươi được bảo vệ",l:{},lx:"có người ốm",rt:"Người trong cung ngươi không ai mắc bệnh.",rf:"Một cung nữ sốt cao, may qua khỏi."}]},
 c1:{h:"Hoàng tự lâm bệnh",w:"doc",t:"Một hoàng tự nhỏ mắc bệnh, mẹ nó khóc ngất.",o:[
  {n:"Gửi thuốc và người chăm",c:{bac:-40},o:55,w:{duc:4},sc:1,wx:"đứa trẻ có thể qua",l:{},lx:"không cứu được",rt:"Đứa trẻ qua khỏi.",rf:"Đứa trẻ vẫn yếu."},
  {n:"Tránh xa",c:{},w:{suc:3},wx:"an toàn",lx:"bị chê lạnh lùng",rt:"Ngươi không đến."}]},
 c2:{h:"Tin đồn ngươi mang bệnh",w:"v",need:["v"],t:"{v} đồn ngươi mang bệnh vào cung.",o:[
  {n:"Mời Thái y khám công khai",c:{bac:-20},w:{danh:3},sc:1,wx:"rửa tiếng",rt:"Thái y xác nhận ngươi khỏe."},
  {n:"Phản đòn",c:{},o:45,w:{danh:3},wx:"{v} bẽ mặt",l:{danh:-3},go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"{v} câm lặng.",rf:"Lời ngươi lạc giọng."}]},
 c3:{h:"Hoàng thượng sốt",need:["nsrv"],w:"emp",t:"Hoàng thượng sốt nhẹ, cả cung hoảng loạn.",o:[
  {n:"Xin vào hầu",c:{suc:-8},o:60,w:{sung:8},sc:1,wx:"ngài nhớ ơn",l:{suc:-8},lx:"bị lây",rt:"Ngài khỏi, nắm tay ngươi cảm động.",rf:"Ngài khỏi, ngươi mệt lả."},
  {n:"Chép kinh cầu an",c:{suc:-3},w:{th:4,duc:2},wx:"Thái hậu khen",rt:"Thái hậu cảm động."}]},
 t1:{h:"Dịch lên đỉnh",w:"doc",t:"Dịch lên đỉnh. Thái y viện cần người đứng ra điều phối.",o:[
  {n:"Đứng ra điều phối",c:{suc:-8},o:A=>45+(A.f.cure?20:0),sc:2,wx:"cứu nhiều người",l:{suc:-6},rt:"Dịch dần lui.",rf:"Việc rối, ngươi kiệt sức."},
  {n:"Góp bạc mua thuốc",c:{bac:-50},sc:1,wx:"có thuốc",rt:"Thuốc về đủ."}]},
 x1:{h:"Dịch qua",w:"emp",t:"Dịch qua. Hoàng thượng xét công những người đã giúp.",o:[
  {n:"Tâu rõ phương chủng đậu",c:{},o:A=>35+(A.f.cure?30:0),e:["win","lose"],rt:"Hoàng thượng ban chỉ chủng đậu cho cả kinh thành, khen ngươi cứu người.",rf:"Thái y viện nhận công, còn bảo phương của ngươi nguy hiểm."},
  {n:"Không kể công",c:{},w:{duc:4},e:"mid",lx:"công không ai biết",rt:"Ngươi im lặng."}]}},
 E:{win:{k:1,tag:"Người cứu cả kinh thành",w:"emp",t:"Phương chủng đậu cứu vạn người. Hoàng thượng và Thái hậu đều ghi công ngươi.",fx:{danh:12,sung:5,th:6}},
  mid:{k:0,tag:"Qua mùa dịch",t:"Mùa dịch qua. Ngươi còn sống, người của ngươi bình an.",fx:{duc:3}},
  lose:{k:-1,tag:"Công bị cướp",t:"Thái y viện cướp công, còn bảo ngươi làm liều.",fx:{danh:-5,suc:-5}}}};
ARC67.s_tinh={o:"*",ok:()=>nsrv67()&&(function(){try{menInit()}catch(e){}return (S.men||[]).some(m=>m.alive&&(m.age||0)>=18)})(),t:"Cám dỗ",w:"man",sj:"ánh mắt của {man}",g:"{man}, một {manr} trong cung, nhìn ngươi bằng ánh mắt không nên có. Trái tim cô đơn của ngươi rung lên. Cám dỗ có vị ngọt, và cái giá thật.",
 cast(A){return !!man67(A)},
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.ill"],["t1"],["x1"]],
 B:{
 s1:{h:"Ánh mắt ở Ngự hoa viên",w:"man",need:["man"],t:"{man} nhặt chiếc khăn ngươi đánh rơi, ngón tay chạm khẽ tay ngươi.",o:[
  {n:"Cảm ơn rồi đi ngay",c:{},w:{duc:3},f:"clean",wx:"giữ mình",lx:"tim vẫn đập",rt:"Ngươi quay đi, không ngoái lại."},
  {n:"Đứng lại trò chuyện",c:{duc:-2},w:{suc:4},sc:1,f:"close",wx:"vơi nỗi cô đơn",lx:"có thể có người thấy",rt:"Hai người nói chuyện về hoa mai."}]},
 s2:{h:"Bài thơ không tên",w:"maid",t:"{maid} đưa ngươi một bài thơ không ký tên, nét chữ của {man}.",o:[
  {n:"Đốt",c:{},w:{duc:3},f:"clean",wx:"an toàn",lx:"lòng tiếc",rt:"Thơ cháy, ngươi nhìn tro rất lâu."},
  {n:"Giữ lại",c:{duc:-2},w:{suc:3},f:"close",wx:"lòng ấm áp",lx:"vật chứng nguy hiểm",rt:"Ngươi giấu thơ dưới đáy rương."}]},
 c1:{h:"Hẹn gặp",w:"man",need:["man"],t:"{man} hẹn gặp ngươi sau giả sơn, chỉ để nói một lời.",o:[
  {n:"Từ chối",lx:"{man} buồn bã, chưa dứt",c:{},w:{duc:4},f:"clean",wx:"giữ mình",rt:"Ngươi không đến."},
  {n:"Đến, chỉ để nói lời từ biệt",c:{},o:()=>55+S.tamco/4,w:{duc:2},sc:1,f:"close",wx:"dứt khoát mà không phụ",l:{danh:-5},lx:"có người thấy",rt:"Hai người nói lời từ biệt, không ai thấy.",rf:"Một cung nữ của phi tần khác thấy bóng hai người."}]},
 c2:{h:"Hoàng thượng lạnh nhạt",need:["nsrv"],w:"emp",t:"Hoàng thượng mải mê người mới, cả tháng không ghé. {man} lại xuất hiện.",o:[
  {n:"Dồn sức giành lại Hoàng thượng",c:{suc:-6},w:{sung:5},f:"clean",wx:"ngài nhớ ngươi",rt:"Hoàng thượng ghé lại."},
  {n:"Tìm an ủi bên {man}",c:{duc:-5},o:55,w:{suc:6},sc:1,f:"close",wx:"lòng được an ủi",l:{danh:-6},lx:"lời đồn bắt đầu",rt:"Một chiều yên bình.",rf:"Lời đồn bắt đầu lan."}]},
 c3:{h:"Có kẻ biết",w:"eun",t:"Một thái giám nháy mắt với ngươi: ‘{Nc} có tâm sự với {man}?’",o:[
  {n:"Đút bạc bịt miệng",c:{bac:-50},sc:1,wx:"tạm yên",lx:"hắn có thể đòi thêm",rt:"Hắn cười, cất bạc."},
  {n:"Quát hắn, dọa tố",c:{},o:45,w:{tamco:2},wx:"hắn sợ",l:{danh:-5},lx:"hắn đi rêu rao",rt:"Hắn cúi đầu chạy.",rf:"Hắn đi kể khắp nơi."}]},
 t1:{h:"{man} muốn đưa ngươi trốn",w:"man",need:["man"],t:"{man} nói có cách đưa ngươi ra khỏi cung, sống cuộc đời khác.",o:[
  {n:"Từ chối, chọn con đường trong cung",c:{},w:{duc:5},sc:1,f:"clean",wx:"giữ được tất cả",lx:"lòng đau",rt:"Ngươi gỡ tay hắn ra."},
  {n:"Xin hắn rời cung, để ngươi yên",c:{bac:-40},o:60,sc:1,wx:"dứt mối dây",l:{danh:-4},lx:"hắn không chịu đi",rt:"{man} xin ra ngoài kinh.",rf:"{man} không nỡ đi."}]},
 x1:{h:"Hồi kết của cám dỗ",w:"emp",t:"Lời đồn đến tai Hoàng thượng. Ngài hỏi thẳng: “{Goi} và {man} là thế nào?”",o:[
  {n:"Thưa thật: có rung động, nhưng chưa từng vượt lễ",c:{sung:-4},o:A=>40+(A.f.clean?25:0),e:["win","lose"],rt:"Hoàng thượng im lặng rồi ôm ngươi: ‘Lỗi của trẫm đã bỏ nàng cô đơn.’",rf:"Hoàng thượng giận, lạnh nhạt hẳn với ngươi."},
  {n:"Chối hoàn toàn",c:{},o:A=>45+(A.f.clean?20:0)-(A.f.close?10:0)+S.tamco/8,e:["mid","lose"],rt:"Không ai chứng minh được gì.",rf:"Có người làm chứng thấy hai người."}]}},
 E:{win:{k:1,tag:"Vượt qua cám dỗ",w:"emp",t:"Hoàng thượng cảm động vì sự thật của ngươi, thương ngươi hơn. {man} rời cung, ngươi nhẹ lòng.",fx:{sung:8,duc:5}},
  mid:{k:0,tag:"Chuyện cũ chôn kín",t:"Lời đồn tắt dần. Không ai biết, nhưng ngươi thì nhớ.",fx:{tamco:2}},
  lose:{k:-1,tag:"Mất lòng tin của Hoàng thượng",w:"emp",t:"Hoàng thượng không trị tội vì không có chứng cứ, nhưng ngài lạnh nhạt hẳn. Ngươi mất một mùa ân sủng.",fx:{sung:-12,danh:-6}}}};
ARC67.s_thay={o:"*",ok:nsrv67,t:"Lão thái giám",w:"eun",sj:"lời dạy của lão thái giám",g:"Tổng quản {eun} đã hầu ba đời vua. Ông bỗng để mắt đến ngươi, như muốn truyền lại những gì ông biết. Nhưng lão hồ ly trong cung chẳng bao giờ cho không ai thứ gì.",
 p:[["s1","s2"],["c1","c2","c3","G.spy","G.emp"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời khuyên đầu tiên",w:"eun",t:"{eun} khẽ nói khi ngươi đi qua: ‘{Nc} đừng đi lối Tây hành lang hôm nay.’",o:[
  {n:"Nghe lời, đi lối khác",c:{suc:-2},w:{tamco:2},sc:1,f:"trust",wx:"tránh được một rắc rối",rt:"Hôm ấy ở Tây hành lang có hai phi tần cãi nhau, ai đi qua cũng bị kéo vào."},
  {n:"Hỏi vì sao",c:{},o:45,sc:1,wx:"ông nói rõ hơn",l:{},lx:"ông ngậm miệng",rt:"Ông nói: có người đang chờ ngươi ở đó để gây sự.",rf:"Ông chỉ cười."}]},
 s2:{h:"Ông muốn gì",w:"eun",t:"{eun} xin ngươi một việc nhỏ: nói giúp cháu ông vào Ngự thiện phòng.",o:[
  {n:"Giúp",c:{bac:-20},sc:1,f:"trust",wx:"ông nợ ngươi",lx:"dính vào chuyện của ông",rt:"Cháu ông được nhận."},
  {n:"Từ chối khéo",c:{},w:{tamco:2},wx:"không nợ ai",lx:"ông nhạt đi",rt:"Ông gật đầu, không nói gì."}]},
 c1:{h:"Bài học về chữ nhẫn",w:"eun",t:"{eun} kể chuyện một phi tần đời trước vì nóng nảy mà mất tất cả.",o:[
  {n:"Ghi lòng tạc dạ",c:{suc:-2},w:{tamco:3,duc:2},sc:1,wx:"khôn ngoan hơn",rt:"Ngươi thấy mình bình tĩnh hơn."},
  {n:"Hỏi phi tần ấy là ai",c:{},o:50,w:{mat:1},sc:1,wx:"biết một bí mật cũ",l:{},lx:"ông không nói",rt:"Ông kể, và ngươi hiểu vì sao Thái hậu ghét một nhà kia.",rf:"Ông lảng đi."}]},
 c2:{h:"Ông bị nghi",w:"eun",t:"{eun} bị một phi tần tố ăn bớt bạc Nội vụ phủ.",o:[
  {n:"Đứng ra nói giúp",c:{},o:50,sc:2,f:"trust",wx:"ông mang ơn",l:{danh:-3},lx:"bị coi là bè cánh",rt:"Ông được minh oan.",rf:"Ông thoát, nhưng ngươi bị chê."},
  {n:"Đứng ngoài",c:{},w:{tamco:2},wx:"không liên lụy",lx:"ông nhớ",rt:"Ông tự gỡ được."}]},
 c3:{h:"Ông thử ngươi",w:"eun",t:"{eun} đưa ngươi một tin về Hoàng hậu và xem ngươi làm gì với nó.",o:[
  {n:"Giữ kín",c:{},w:{tamco:2},sc:1,f:"trust",wx:"ông thấy ngươi biết giữ miệng",lx:"không dùng được tin",rt:"Ông khẽ gật."},
  {n:"Dùng ngay",c:{},o:45,w:{danh:3},wx:"được lợi trước mắt",l:{danh:-3},lx:"ông thấy ngươi nông nổi",rt:"Tin có ích.",rf:"Tin là giả, ông chỉ thử ngươi."}]},
 t1:{h:"Ông già yếu",w:"eun",t:"{eun} ốm, xin về hưu. Ông muốn để lại cho ngươi một cuốn sổ ghi chép ba đời vua.",o:[
  {n:"Đến thăm, nhận sổ",c:{bac:-20},o:A=>45+(A.f.trust?25:0),sc:2,f:"book",wx:"có cuốn sổ quý",l:{},lx:"ông đổi ý",rt:"Ông trao sổ, dặn chỉ dùng khi cần.",rf:"Ông bảo chưa phải lúc."},
  {n:"Gửi quà tiễn",c:{bac:-30},w:{duc:3},wx:"giữ tình",rt:"Ông cảm động."}]},
 x1:{h:"Di sản của lão thái giám",w:"eun",t:"{eun} sắp rời cung. Ông hỏi ngươi muốn gì.",o:[
  {n:"Xin ông tiến cử người kế nhiệm thân với ngươi",c:{},o:A=>40+(A.f.trust?20:0),e:["win","mid"],rt:"Người kế nhiệm là học trò ông, thân với ngươi.",rf:"Người kế nhiệm là người lạ."},
  {n:"Xin ông chỉ một bí mật lớn",c:{},o:A=>35+(A.f.book?25:0),e:["win2","lose"],rt:"Ông chỉ cho ngươi một bí mật đủ để nắm thóp một phi tần.",rf:"Ông giận vì ngươi tham, ra đi không lời từ biệt."},
  {n:"Chỉ xin ông giữ sức khỏe",c:{},w:{duc:3},e:"mid",lx:"không được gì thêm",rt:"Ông cười hiền."}]}},
 E:{win:{k:1,tag:"Có người trong Nội vụ phủ",w:"eun",t:"Tổng quản mới là người của ngươi. Mọi tin trong cung đến tai ngươi trước.",fx:{mat:2,danh:4}},
  win2:{k:1,tag:"Bí mật của ba đời vua",t:"Ngươi nắm được một bí mật quý. Không ai biết ngươi có nó.",fx:{mat:1,tamco:4},go:()=>{const L=liveRivals(false).filter(v=>v.rank>S.rank);const v=evGuilty(S,L);const n=v?evA(S,v,2):0;if(n)return `Chứng cứ về ${v.name} +${n}.`;return""}},
  mid:{k:0,tag:"Tiễn lão thái giám",t:"Lão thái giám về quê. Ngươi nhớ những lời ông dạy.",fx:{tamco:2,duc:2}},
  lose:{k:-1,tag:"Mất lòng lão thái giám",t:"Ông ra đi giận dỗi, đám thái giám cũ coi ngươi là kẻ tham.",fx:{mat:-1,danh:-4}}}};
ARC67.s_ban={o:"*",ok:nsrv67,t:"Kẻ thù hóa tri kỷ",w:"v",sj:"mối thù với {v}",g:"{v} vẫn là cái gai trong mắt ngươi. Nhưng khi cả hai cùng bị một kẻ mạnh hơn nhắm vào, có lẽ kẻ thù của kẻ thù là tri kỷ.",
 cast(A){if(!castRv67(A,"v"))return false;castRv67(A,"v2",v=>v.rank>=S.rank);return true},
 p:[["s1","s2"],["c1","c2","c3","G.hh","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"Cùng bị vu",w:"v",need:["v"],t:"Ngươi và {v} cùng bị tố dùng bùa chú. Cả hai bị gọi đến Càn Ninh cung.",o:[
  {n:"Đỡ lời cho cả {v}",c:{},o:45,w:{duc:3},sc:1,f:"help",wx:"{v} ngạc nhiên",l:{danh:-3},lx:"bị coi là cùng phe",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,15)},rt:"Hai người được tha.",rf:"Cả hai bị phạt chép kinh."},
  {n:"Chỉ lo cho mình",c:{},w:{tamco:2},wx:"an toàn",lx:"{v} một mình chịu",rt:"Ngươi được tha, {v} bị phạt."}]},
 s2:{h:"Kẻ đứng sau",w:"v2",need:["v2"],t:"Ngươi dò ra: người tố là {v2}, muốn diệt cả hai cho rảnh tay.",o:[
  {n:"Báo cho {v}",c:{},w:{duc:2},sc:1,f:"help",wx:"{v} biết ai là kẻ thù thật",go:(A)=>{const v=rv67(A,"v");if(v)relAdd(S,v,10)},lx:"lộ việc ngươi dò la",rt:"{v} lặng người."},
  {n:"Giữ kín",lx:"{v} vẫn coi ngươi là thù",c:{},w:{tamco:2},wx:"có con bài riêng",rt:"Ngươi giữ cho mình."}]},
 c1:{h:"{v} tìm gặp",w:"v",need:["v"],t:"{v} đến cung ngươi, lần đầu không mang theo vẻ khinh khỉnh.",o:[
  {n:"Mời trà, nói chuyện thật lòng",c:{},o:A=>40+(A.f.help?20:0),sc:2,f:"pact",wx:"hai người hiểu nhau",l:{},lx:"{v} vẫn nghi",rt:"Hai người nói đến khuya.",rf:"{v} vẫn dè chừng."},
  {n:"Tiếp khách sáo",lx:"{v} nguội lòng",c:{},w:{tamco:1},wx:"giữ khoảng cách",rt:"{v} về."}]},
 c2:{h:"{v2} lại ra tay",w:"v2",need:["v2"],t:"{v2} gài người vào cung {v}.",o:[
  {n:"Giúp {v} bắt kẻ gài",c:{bac:-30},o:50,sc:2,f:"help",wx:"{v} mang ơn",l:{},lx:"không bắt được",rt:"Kẻ gài bị bắt.",rf:"Kẻ gài chạy thoát."},
  {n:"Mặc kệ",c:{},w:{tamco:2},wx:"{v} yếu đi",lx:"{v2} mạnh lên",rt:"{v} bị hại một lần."}]},
 c3:{h:"Hai người cùng yến",w:"v",need:["v"],t:"Trong yến, {v} bị làm khó. Mọi người nhìn ngươi.",o:[
  {n:"Đỡ lời",c:{},o:50,w:{danh:3},sc:1,f:"help",wx:"{v} cảm kích",l:{danh:-2},rt:"{v} nhìn ngươi cảm kích.",rf:"Lời ngươi không đỡ nổi."},
  {n:"Im lặng",lx:"{v} thất vọng",c:{},w:{duc:1},wx:"không dính",rt:"{v} tự chịu."}]},
 t1:{h:"Liên minh hay không",w:"v",need:["v"],t:"{v} đề nghị: cùng nhau đối phó {v2}.",o:[
  {n:"Bắt tay",c:{},sc:1,f:"pact",wx:"có đồng minh",lx:"có thể bị phản",rt:"Hai người thề trước điện Phật."},
  {n:"Từ chối",lx:"một mình chống {v2}",c:{},w:{tamco:2},wx:"tự do",rt:"{v} ra về."}]},
 x1:{h:"Đối mặt {v2}",w:"v2",t:"{v2} chuẩn bị đòn cuối nhắm vào cả hai.",o:[
  {n:"Cùng {v} lật ngược đòn",c:{suc:-3},o:A=>30+(A.f.pact?25:0)+(A.f.help?10:0),e:["win","lose"],rt:"Đòn của {v2} bị lật ngược, nàng bị Hoàng hậu phạt.",rf:"Liên minh lỏng lẻo, cả hai bị phạt."},
  {n:"Một mình đề phòng",c:{bac:-30},w:{tamco:2},e:"mid",lx:"{v} chịu đòn",rt:"Ngươi giữ được mình."},
  {n:"Phản {v}, bắt tay {v2}",c:{duc:-5},o:45,e:["win2","lose"],rt:"{v2} giữ lời, {v} ngã.",rf:"{v2} lừa cả ngươi."}]}},
 E:{win:{k:1,tag:"Kẻ thù thành tri kỷ",t:"{v} thành tri kỷ. Hai người cùng đứng, không ai dám động đến.",fx:{danh:6,duc:3},go:A=>[e67ally(rv67(A,"v"),40),e67foe(rv67(A,"v2"),10),e67pun(rv67(A,"v2"),4)].join(" ")},
  win2:{k:1,tag:"Đổi phe đúng lúc",t:"Ngươi đứng về phe thắng. Nhưng {v} sẽ không bao giờ quên.",fx:{tamco:3,danh:3},go:A=>[e67ally(rv67(A,"v2"),20),e67foe(rv67(A,"v"),20)].join(" ")},
  mid:{k:0,tag:"Ai lo phận nấy",t:"Mỗi người tự lo. Không thêm tri kỷ, không thêm thù.",fx:{duc:1}},
  lose:{k:-1,tag:"Liên minh đổ vỡ",t:"Liên minh đổ vỡ, cả hai cùng bị phạt. {v2} đắc ý.",fx:{danh:-6,sung:-4},go:A=>e67foe(rv67(A,"v2"),12)}}};
/* balance (measured): story choices must not wear her health down; Sức costs/losses of story options are halved.
   jreg: every hand-typed arc, also those of modules after j67 (jorigins bd_*, jst14 st_*, j96…). Road chapters (o:"rd", jroad rdDef) are
   NOT halved: their numbers are read from BAL.road (jbalroad, one core) and already set at their final value. */
(function(){const H=new WeakSet();/* each option / ending object is halved once, even when two arcs share it */
 const h=o=>{if(!o||H.has(o))return;H.add(o);for(const k of ["c","l"])if(o[k]){if(o[k].suc<0)o[k].suc=Math.min(-1,Math.round(o[k].suc/2));if(o[k].hh<0)o[k].hh=Math.min(-1,Math.round(o[k].hh/2))}};
 const walk=b=>{if(b&&Array.isArray(b.o))b.o.forEach(h)};Object.values(GB67).forEach(walk);
 regEach(ARC67,(id,a)=>{if(!a||a.o==="rd"||H.has(a))return;H.add(a);Object.values(a.E||{}).forEach(E=>{if(!E||H.has(E))return;H.add(E);if(E.fx&&E.fx.hh<0)E.fx.hh=Math.round(E.fx.hh/2)});Object.values(a.B||{}).forEach(walk)},"ARC67 halve")})();

/* one-line objective of the main quest on the Hành sự tab */
(function(){const p0=renderPanel0;renderPanel0=function(){const r=p0.apply(this,arguments);try{if(tab==="act"&&v267()&&S.st.ch&&!window.kitStageRail){/* owner 16/11: the goal lives in the stage rail icon (§77), no strip here */const el=$("panel");if(el&&!el.querySelector(".obj67")){const o=obj67();/* KIT §72 (owner 16/11 "Không bấm xem được"): the line is the kit goal strip, tap → chapter detail (jgoal) */const g=typeof kitGoalStrip==="function"?kitGoalStrip():"";if(g)el.insertAdjacentHTML("afterbegin",`<div class="obj67">${g}</div>`);else if(o)el.insertAdjacentHTML("afterbegin",`<div class="srvhead obj67"><span><b>Mệnh truyện</b> · ${o}</span></div>`)}}}catch(e){console.error(e)}return r}})();
const QUEST67={
 tt:{t:"Ván cờ phủ Tể tướng",e:[["Phủ Tể tướng đứng sau ngôi Trung cung",{danh:10,th:6,bac:80},"Qua ba chương, nhà Tể tướng thành chỗ dựa vững nhất của ngươi trong triều."],["Giữ được nhà, giữ được mình",{danh:4},"Ngươi đi qua sóng gió của phủ Tể tướng, không mất mà cũng không được bao nhiêu."],["Một mình giữa triều đình",{tamco:3},"Phủ Tể tướng không còn đỡ được ngươi; từ nay ngươi tự đi đường mình."]]},
 dtq:{t:"Vinh nhục nhà tướng",e:[["Nhà tướng môn vững như núi",{danh:10,sung:6,th:4},"Binh quyền, chiến công và lòng vua đều đứng về phía nhà ngươi."],["Nhà tướng còn đứng",{danh:4},"Nhà ngươi qua được bão tố, vinh có, nhục có."],["Tướng môn sa sút",{tamco:3},"Nhà tướng sa sút, ngươi phải tự gây dựng chỗ đứng."]]},
 muoi:{t:"Từ muối lên tước",e:[["Nhà buôn muối thành danh gia",{danh:12,th:5},"Không ai còn chê ngươi mùi muối; bạc của nhà đã thành danh vọng."],["Giàu mà chưa sang",{danh:4,bac:60},"Nhà vẫn giàu, tiếng tăm khá lên đôi chút."],["Bạc tiêu như nước",{tamco:3},"Bạc mất nhiều mà danh không đến; ngươi học được giá của lòng người."]]},
 cn:{t:"Rửa sạch thân phận",e:[["Không ai còn nhớ ngươi từng là nô tỳ",{danh:12,th:5},"Thân phận cũ đã được rửa sạch; cả cung kính nể."],["Quá khứ thôi đeo bám",{danh:4},"Chuyện cũ lặng xuống, ngươi sống được với nó."],["Thân phận cũ còn đó",{tamco:3},"Người ta vẫn gọi ngươi là kẻ hầu cũ sau lưng."]]},
 nc:{t:"Công chúa hai nước",e:[["Chiếc cầu giữa hai nước",{danh:10,th:10},"Đại Hy và cố quốc đều coi ngươi là người của mình."],["Người ngoại tộc được dung",{th:4},"Ngươi đứng được ở Đại Hy, dù chưa ai coi ngươi là người nhà."],["Mãi là người ngoài",{tamco:3},"Hai nước đều dè chừng ngươi; ngươi chỉ còn dựa vào chính mình."]]},
 td:{t:"Báo thù cho nhà",e:[["Rửa sạch oan khuất",{danh:14,sung:4},"Nhà ngươi được rửa oan; vong linh cha mẹ có thể yên nghỉ."],["Thù trả một nửa",{danh:5},"Oan khuất vơi đi, mối thù chưa hết."],["Mối thù còn đó",{tamco:4},"Kẻ thù vẫn ung dung; ngươi phải đợi một ngày khác."]]},
 ch:{t:"Cháu gái Đức Thọ cung",e:[["Người kế thừa Đức Thọ cung",{th:15,danh:6},"Thái hậu coi ngươi là người kế thừa thế lực của bà."],["Cô cháu giữ lễ",{th:5},"Thái hậu vẫn thương, nhưng ngươi phải tự đi đường mình."],["Mất chỗ dựa Đức Thọ cung",{tamco:3},"Đức Thọ cung không còn che chở ngươi như trước."]]},
 thd:{t:"Danh tiếng nhà nho",e:[["Văn danh rạng rỡ",{danh:12,sung:4},"Chữ nghĩa nhà nghèo đã làm rạng danh cha ngươi khắp thiên hạ."],["Nho phong còn giữ",{danh:4,duc:3},"Ngươi giữ được khí tiết nhà nho, danh tiếng vừa phải."],["Văn chương lận đận",{tamco:3},"Chữ nghĩa chưa mở được đường; ngươi phải tìm lối khác."]]},
 cnv:{t:"Từ cung nữ đi lên",e:[["Kẻ hầu được trời thương",{nt:15,danh:6},"Từ thân cung nữ, ngươi đã có người nâng đỡ và ánh mắt của Hoàng thượng."],["Chân cứng đá mềm",{danh:4},"Ngươi vững vàng hơn sau từng việc, chờ dịp đi lên."],["Phận hầu long đong",{tamco:3},"Đường đi lên còn xa, nhưng chưa khép."]]}};
/* ================= STAGE ARCS (mid-life chapters, any origin): thế lực trong cung · con cái · ngôi Đông cung ================= */
ARC67.st_the={o:"st",ok:nsrv67,t:"Gây dựng thế lực",w:"v",sj:"phe cánh của ngươi trong hậu cung",g:"Đứng được rồi thì phải có người của mình: đồng minh trong lục cung, tai mắt khắp nơi, một nhà quyền thần trong triều chịu nói giúp. Không có phe cánh, đến lúc tranh ghế sẽ chẳng ai đứng cạnh ngươi.",
 cast(A){castRv67(A,"v");castRv67(A,"v2",v=>v.rank>=S.rank);return true},
 p:[["s1","s2"],["c1","c2","c3","G.gift","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời mời của {v}",w:"v",need:["v"],t:"{v} mời ngươi uống trà, nói bóng gió: ‘Trong cung một mình thì lạnh lắm, tỷ muội nên có nhau.’",o:[
  {n:"Nhận lời kết nghĩa",c:{bac:-30},o:55,sc:1,f:"ally",wx:"có một đồng minh",l:{},lx:"nàng chỉ thăm dò",go:(A,ok)=>{const v=rv67(A,"v");if(v&&ok)relAdd(S,v,20)},rt:"Hai người thề làm chị em.",rf:"{v} chỉ muốn dò ý ngươi."},
  {n:"Khéo giữ khoảng cách",c:{},w:{tamco:2},wx:"không bị ràng buộc",lx:"lỡ một đồng minh",rt:"Ngươi chỉ nói chuyện hoa cỏ."}]},
 s2:{h:"Cài tai mắt",w:"maid",t:"{maid} gợi ý: mấy cung nữ ở Nội vụ phủ có thể làm tai mắt nếu được chăm lo.",o:[
  {n:"Chăm lo cho họ",c:{bac:-40},w:{mat:1},sc:1,wx:"có tai mắt",rt:"Tin tức bắt đầu chảy về cung ngươi."},
  {n:"Không cần",c:{},w:{duc:2},wx:"đỡ tốn",lx:"mù tin tức",rt:"Ngươi không dính vào."}]},
 c1:{h:"Một nhà quyền thần dò ý",w:"maid",t:"Một nhà quyền thần trong triều gửi lời: họ muốn đặt cược vào một phi tần có tương lai.",o:[
  {n:"Đáp lễ, hứa nâng đỡ người của họ",c:{bac:-40},o:55,sc:1,f:"court",wx:"có tiếng nói trong triều",l:{},lx:"họ chọn người khác",rt:"Nhà ấy dâng sớ khen ngươi hiền đức.",rf:"Nhà ấy chọn đặt cược vào người khác."},
  {n:"Giữ tay sạch, không dính triều chính",c:{},w:{duc:3},wx:"không ai nói ngươi kết bè",lx:"không có người nói giúp",rt:"Ngươi khéo từ chối."}]},
 c2:{h:"{v2} chia rẽ",w:"v2",need:["v2"],t:"{v2} gieo lời ly gián giữa ngươi và những người thân cận.",o:[
  {n:"Gặp từng người giải thích",c:{suc:-4},o:55,sc:1,wx:"giữ được phe cánh",l:{},lx:"có người bỏ đi",rt:"Không ai rời ngươi.",rf:"Một người dao động, rời xa ngươi."},
  {n:"Phản đòn, vạch lời ly gián",c:{},o:45,w:{danh:3},wx:"{v2} bẽ mặt",l:{danh:-3},lx:"{v2} oán",go:(A)=>{const v=rv67(A,"v2");if(v)oanAdd(v,S,6)},rt:"Lời ly gián bị lật.",rf:"Không ai tin ngươi."}]},
 c3:{h:"Ân thưởng chia đều",w:"maid",t:"Ngươi được ban thưởng một rương lụa. Chia cho người dưới hay giữ lại?",o:[
  {n:"Chia cho kẻ hầu và đồng minh",c:{bac:-20},w:{danh:3,mat:1},sc:1,wx:"lòng người theo ngươi",rt:"Ai cũng khen ngươi rộng rãi."},
  {n:"Giữ lại",gi:[["luahang","luahang"],"emp"],c:{danh:-2},w:{},wx:"2 súc lụa Hàng Châu vào rương",rt:"Rương lụa vào kho."}]},
 t1:{h:"Phe cánh bị thử thách",w:"hh",t:"Có kẻ tố một người thân cận của ngươi ăn cắp. Cả cung chờ xem ngươi có bảo vệ người của mình không.",o:[
  {n:"Đứng ra bảo vệ",c:{},o:55,sc:2,f:"loyal",wx:"ai cũng thấy theo ngươi là được che chở",l:{danh:-4},lx:"bị nghi bao che",rt:"Người của ngươi được minh oan.",rf:"Người của ngươi bị phạt, ngươi cũng mang tiếng."},
  {n:"Để luật xử",c:{},w:{duc:3},wx:"tiếng công minh",lx:"người dưới thấy lạnh lòng",rt:"Ngươi không can thiệp."}]},
 x1:{h:"Ngày phe cánh lên tiếng",w:"emp",t:"Ghế trên ngươi trống một chỗ. Phe cánh của ngươi có lên tiếng không, đây là lúc biết.",o:[
  {n:"Huy động cả phe cánh",c:{bac:-40},o:A=>35+(A.f.ally?10:0)+(A.f.court?10:0)+(A.f.loyal?10:0),e:["win","lose"],rt:"Cả hậu cung lẫn triều đình đều nói tốt cho ngươi.",rf:"Phe cánh lỏng lẻo, chẳng mấy ai lên tiếng."},
  {n:"Chỉ nhờ người thân nhất",c:{},o:55,e:["mid","lose"],rt:"Vài lời nói giúp đúng lúc.",rf:"Người thân nhất cũng im lặng."},
  {n:"Không cần ai, tự lo",c:{},w:{tamco:2},e:"mid",lx:"đi một mình",rt:"Ngươi tự đi đường mình."}]}},
 E:{win:{k:1,tag:"Phe cánh vững vàng",t:"Ngươi có đồng minh trong lục cung, tai mắt khắp nơi và tiếng nói trong triều.",fx:{danh:8,mat:2,th:4},go:A=>e67ally(rv67(A,"v"),25)},
  mid:{k:0,tag:"Có vài người thân",t:"Ngươi có vài người thân tín, chưa thành phe cánh.",fx:{mat:1}},
  lose:{k:-1,tag:"Lẻ loi giữa lục cung",t:"Phe cánh tan rã; ai cũng biết ngươi không có người đứng sau.",fx:{danh:-5,mat:-1}}}};
ARC67.st_con={o:"st",ok:()=>nsrv67()&&S.kids.some(k=>k.alive),t:"Con đường của con",w:"kid",sj:"tương lai của con ngươi",g:"Con ngươi lớn lên giữa những ánh mắt dò xét. Thầy dạy, sức khỏe, lòng thương của Hoàng thượng và cả mưu toan của người khác đều nhắm vào nó.",
 p:[["s1","s2"],["c1","c2","c3","G.emp","G.rival"],["t1"],["x1"]],
 B:{
 s1:{h:"Chọn thầy cho con",w:"emp",t:"Thượng thư phòng hỏi ngươi muốn chọn thầy nào cho con: một lão Hàn lâm nghiêm khắc hay một tiến sĩ trẻ được Hoàng thượng chuộng.",o:[
  {n:"Lão Hàn lâm nghiêm khắc",c:{bac:-30},w:{},wx:"con học chắc",sc:1,f:"strict",go:()=>{const k=S.kids.find(x=>x.alive);if(k){k.tal=cl((k.tal||0)+5,0,100);return `Tài ${k.name} +5.`}return""},lx:"con khổ hơn",rt:"Con ngươi học ngày đêm."},
  {n:"Tiến sĩ trẻ được ngài chuộng",c:{bac:-30},o:55,sc:1,f:"fav",wx:"Hoàng thượng để ý con",l:{},lx:"thầy chỉ giỏi nói",go:(A,ok)=>ok?e67heir(5):"",rt:"Hoàng thượng hay ghé xem con học.",rf:"Thầy trẻ ham chơi, con chẳng tiến."}]},
 s2:{h:"Con ốm",w:"doc",t:"Con ngươi sốt cao giữa đêm, thái y trực lại là người của phi tần khác.",o:[
  {n:"Tự thức canh, mời thái y khác",c:{bac:-30,suc:-6},o:65,sc:1,wx:"con qua khỏi nhanh",l:{},lx:"bệnh kéo dài",go:(A,ok)=>{const k=S.kids.find(x=>x.alive);if(k&&ok){k.hp=Math.min(100,(k.hp||80)+15);return `Sức khỏe ${k.name} +15.`}return""},rt:"Con hạ sốt lúc gà gáy.",rf:"Con khỏi, nhưng yếu đi."},
  {n:"Để thái y trực lo",c:{},w:{suc:3},wx:"đỡ mệt",lx:"không yên tâm",rt:"Con khỏi sau vài ngày."}]},
 c1:{h:"Có kẻ nhắm vào con",w:"v",need:["v"],t:"Tai mắt báo: người của {v} hay lảng vảng quanh chỗ con ngươi chơi.",o:[
  {n:"Tăng người canh",c:{bac:-30},w:{mat:1},sc:1,wx:"con an toàn hơn",rt:"Con ngươi được canh cẩn mật."},
  {n:"Gặp {v} cảnh cáo",c:{},o:50,w:{tamco:2},wx:"{v} chùn tay",l:{},lx:"{v} oán",go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,6)},rt:"{v} tái mặt.",rf:"{v} cười lạnh."}]},
 c2:{h:"Hoàng thượng thử tài con",w:"emp",t:"Hoàng thượng gọi các hoàng tự đến đối đáp.",o:[
  {n:"Đêm trước kèm con ôn bài",c:{suc:-5},o:A=>45+(A.f.strict?20:0),sc:1,wx:"con được khen",l:{},lx:"con run sợ",go:(A,ok)=>ok?e67heir(6):"",rt:"Con ngươi đối đáp trôi chảy.",rf:"Con ngươi ấp úng."},
  {n:"Để con tự nhiên",c:{},w:{duc:2},wx:"con không áp lực",lx:"có thể thua anh em",rt:"Con ngươi đáp được vài câu."}]},
 c3:{h:"Con muốn chơi với con của đối thủ",w:"kid",t:"Con ngươi thân với con của một phi tần đối đầu.",o:[
  {n:"Để chúng chơi, mở lối làm hòa",c:{},o:50,sc:1,wx:"hai nhà bớt căng",l:{},lx:"bị lợi dụng",rt:"Mẹ đứa kia gửi lời cảm ơn.",rf:"Đứa kia mách lẻo chuyện trong cung ngươi."},
  {n:"Cấm",c:{},w:{tamco:2},wx:"an toàn",lx:"con buồn",rt:"Con ngươi buồn mấy ngày."}]},
 t1:{h:"Một lời đồn về con",w:"maid",t:"Có lời đồn con ngươi không giống Hoàng thượng.",o:[
  {n:"Xin Hoàng thượng làm lễ nhỏ chứng minh",c:{},o:60,sc:2,wx:"dập tắt lời đồn",l:{sung:-4},lx:"ngài phật ý vì bị nghi",rt:"Lời đồn tắt ngấm.",rf:"Ngài bực vì chuyện bị nhắc."},
  {n:"Tìm kẻ tung tin",c:{bac:-30},o:()=>40+S.mat*6,sc:1,wx:"bắt được kẻ đặt điều",l:{},lx:"không tìm ra",rt:"Kẻ tung tin bị phạt.",rf:"Không tìm ra ai."}]},
 x1:{h:"Ngày con được định vị",w:"emp",t:"Hoàng thượng định phong hiệu và chỗ học cho các hoàng tự, công chúa. Mẹ nào cũng đến xin.",o:[
  {n:"Xin cho con học ở Thượng thư phòng cùng Thái tử",c:{suc:-3},o:A=>35+(A.f.strict?10:0)+(A.f.fav?10:0)+S.sung/6,e:["win","lose"],rt:"Hoàng thượng chuẩn, con ngươi ngồi cạnh Đông cung.",rf:"Hoàng thượng cho là ngươi tham."},
  {n:"Chỉ xin ngài thương con",c:{},o:60,e:["mid","lose"],rt:"Hoàng thượng xoa đầu con ngươi.",rf:"Ngài bận việc, không để ý."},
  {n:"Không xin gì",c:{},w:{duc:3},e:"mid",lx:"con không được nâng",rt:"Ngươi lặng lẽ đứng sau."}]}},
 E:{win:{k:1,tag:"Con được trọng",w:"emp",t:"Con ngươi được Hoàng thượng thương và tin, ai cũng biết đứa trẻ này có tương lai.",fx:{danh:6,sung:4},go:()=>e67heir(12)},
  mid:{k:0,tag:"Con bình an",t:"Con ngươi lớn lên bình an, chưa nổi bật.",fx:{duc:2},go:()=>e67heir(3)},
  lose:{k:-1,tag:"Con bị lấn át",t:"Con ngươi bị con nhà khác lấn át; Hoàng thượng ít để ý.",fx:{danh:-4},go:()=>e67heir(-6)}}};
ARC67.st_dong={o:"st",ok:()=>nsrv67()&&mySons().length>0,t:"Ngôi Đông cung",w:"emp",sj:"ngôi Thái tử",g:"Triều đình bắt đầu bàn chuyện lập Thái tử. Mỗi bà mẹ có hoàng tử đều là một phe; mỗi nhà quyền thần đều đặt cược. Một bước sai, con ngươi mất cả đời.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Sớ xin lập Thái tử",w:"emp",t:"Một đại thần dâng sớ xin sớm lập Thái tử. Hoàng thượng hỏi ý ngươi.",o:[
  {n:"Thưa: chọn người hiền, không chọn người lớn",c:{},o:50,sc:1,wx:"mở đường cho con",l:{sung:-3},lx:"ngài thấy ngươi có ý riêng",rt:"Hoàng thượng gật gù.",rf:"Hoàng thượng nhìn ngươi lâu."},
  {n:"Thưa: việc này bệ hạ tự định",c:{},w:{duc:3,sung:2},wx:"ngài thấy ngươi không tham",lx:"không đẩy được con",rt:"Hoàng thượng hài lòng."}]},
 s2:{h:"Nhà quyền thần đặt cược",w:"maid",t:"Một nhà quyền thần ngỏ ý đứng sau con ngươi, đổi lại con ngươi sau này cưới con gái họ.",o:[
  {n:"Nhận lời",c:{duc:-2},w:{},wx:"có thế lực ở triều",sc:2,f:"pact",lx:"ràng buộc con sau này",rt:"Nhà ấy dâng sớ khen hoàng tử."},
  {n:"Từ chối",c:{},w:{duc:3},wx:"con không bị ràng buộc",lx:"mất một thế lực",rt:"Nhà ấy quay sang phe khác."}]},
 c1:{h:"Mẹ hoàng tử khác ra tay",w:"v",need:["v"],vf:v=>(v.kids||[]).some(k=>k.alive&&k.sex==="m"),t:"{v}, mẹ một hoàng tử khác, tung tin con ngươi ốm yếu, không gánh nổi giang sơn.",o:[
  {n:"Cho con cưỡi ngựa bắn cung trước mặt vua",c:{suc:-4},o:55,sc:1,wx:"lời đồn vỡ",l:{},lx:"con ngã ngựa",go:(A,ok)=>ok?e67heir(5):"",rt:"Con ngươi bắn trúng hồng tâm.",rf:"Con ngươi trượt ngựa, may không sao."},
  {n:"Lật lại chuyện con nàng",c:{},o:45,w:{tamco:2},wx:"{v} bẽ mặt",l:{danh:-3},go:(A)=>{const v=rv67(A,"v");if(v)oanAdd(v,S,8)},rt:"{v} câm lặng.",rf:"Ngươi bị chê hẹp hòi."}]},
 c2:{h:"Thái hậu nói một câu",w:"th",need:["th"],t:"Thái hậu sắp nói với Hoàng thượng về chuyện Đông cung.",o:[
  {n:"Đưa con đến hầu Thái hậu mỗi ngày",c:{suc:-5},w:{th:8},sc:1,wx:"Thái hậu thương cháu",rt:"Thái hậu khen con ngươi hiếu thuận."},
  {n:"Dâng lễ lên Đức Thọ cung",c:{bac:-50},w:{th:10},sc:1,wx:"Thái hậu nhớ đến ngươi",rt:"Thái hậu nhận lễ."}]},
 c3:{h:"Khảo hạch các hoàng tử",w:"emp",t:"Hoàng thượng khảo hạch văn võ các hoàng tử.",o:[
  {n:"Mời thầy giỏi kèm riêng",c:{bac:-50},o:55,sc:2,wx:"con đứng đầu",l:{},lx:"con chỉ đứng giữa",go:(A,ok)=>ok?e67heir(6):"",rt:"Con ngươi đứng đầu kỳ khảo.",rf:"Con ngươi chỉ đứng giữa."},
  {n:"Tự dạy con",c:{suc:-6},w:{duc:2},sc:1,wx:"con hiểu lòng mẹ",rt:"Con ngươi làm bài vững vàng."}]},
 t1:{h:"Một âm mưu nhắm vào con",w:"maid",t:"Tai mắt báo: có kẻ định bỏ thuốc vào bữa ăn của con ngươi.",o:[
  {n:"Đổi người nấu, giăng bẫy bắt",c:{bac:-30},o:()=>45+S.mat*5,sc:2,wx:"bắt được kẻ ra tay",l:{},lx:"chỉ phòng được",rt:"Kẻ bỏ thuốc bị bắt quả tang.",rf:"Kẻ ra tay chạy thoát, con vẫn an toàn."},
  {n:"Tự nấu cho con",c:{suc:-6},w:{duc:2},wx:"con an toàn",lx:"kẻ chủ mưu còn đó",rt:"Con ngươi chỉ ăn đồ mẹ nấu."}]},
 x1:{h:"Ngày lập Thái tử",w:"emp",t:"Hoàng thượng triệu các đại thần bàn lập Thái tử.",o:[
  {n:"Để phe cánh và Thái hậu cùng lên tiếng",c:{suc:-3},o:A=>30+(A.f.pact?15:0)+S.th/8+S.sung/8,e:["win","lose"],rt:"Phần đông triều thần đứng về phía con ngươi.",rf:"Phe khác mạnh hơn, con ngươi không được chọn."},
  {n:"Lặng lẽ để ngài tự chọn",c:{},w:{duc:3},e:"mid",lx:"phó mặc",rt:"Ngươi không nói gì."}]}},
 E:{win:{k:1,tag:"Con được triều đình ủng hộ",w:"emp",t:"Triều thần nghiêng về con ngươi; Hoàng thượng thương con hơn hẳn. Ngôi Đông cung đã gần trong tầm tay.",fx:{danh:8,th:5},go:()=>e67heir(15)},
  mid:{k:0,tag:"Đông cung chưa định",t:"Chuyện lập Thái tử gác lại. Con ngươi vẫn còn cơ duyên.",fx:{duc:2}},
  lose:{k:-1,tag:"Phe khác thắng thế",t:"Triều thần nghiêng về hoàng tử khác. Con ngươi phải chờ một cơ duyên khác.",fx:{danh:-4},go:()=>e67heir(-8)}}};
/* ================= j67 v3: MỆNH TRUYỆN SUỐT ĐỜI (owner 11/14) =================
   A life's main quest is ~13 chapters: 1 Nhập cung → 4 origin chapters (all four arcs; each chapter's outcome picks the next) →
   origin ending → 3 shared-arc chapters → Gây dựng thế lực → Con đường của con (if she has a child) → Ngôi Đông cung (if she has a son)
   → Tranh ngôi Trung cung → Mẫu nghi thiên hạ. Arc chapters move only when she plays the "Mệnh truyện" card on Hành sự (one beat at a
   time); each has a deadline (shown on the objective line, warned a month ahead). Past the deadline the chapter closes at its losing
   ending, Lợi thế is lost, Danh -3 and the origin ending gets worse; never a game over. Every closed chapter gives a reward item
   (thường / quý / hiếm / trân phẩm) by outcome and length, themed to the story, put in the Rương. */
Object.assign(IT,{
 vangbac:{n:"Rương vàng bạc châu báu",kd:"Lễ vật",d:"Mở rương: Bạc +120",pr:0,use:{bac:120},tg:[]},
 bienvang:{n:"Biển vàng tạ ơn",kd:"Kỷ vật",d:"Treo trước cửa cung: Danh +8",pr:0,use:{danh:8},tg:[]},
 bienngu:{n:"Biển ngự bút «Trung hiếu lưỡng toàn»",kd:"Kỷ vật",d:"Treo trước cửa cung: Danh +12, Đức +3",pr:0,use:{danh:12,duc:3},tg:[]},
 ngocdungcao:{n:"Ngọc dung cao",kd:"Thuốc",d:"Thoa mặt: Sắc +8 (thuốc quý chữa hủy dung)",pr:0,use:{sac:8},tg:[]}});
const RTIER67=["thường","quý","hiếm","trân phẩm"];
const RPOOL67={family:["thunha","vangbac","bienvang","bienngu"],court:["luahang","vongngoc","gamto","boodieu"],med:["thuocanthai","nhansam","giaidoc","ngocdungcao"],emp:["huongtram","nghien","tranhco","ngocboi"],scholar:["huongtram","nghien","dancoc","tranhco"]};
const RTHEME67={tt_co:"court",tt_oan:"family",tt_tranh:"family",tt_mat:"court",dtq_bien:"emp",dtq_vu:"family",dtq_binh:"emp",dtq_huynh:"family",muoi_tuoc:"family",muoi_lau:"family",muoi_doi:"emp",muoi_no:"court",
 cn_chu:"court",cn_tinh:"emp",cn_ban:"med",cn_than:"family",nc_gian:"emp",nc_su:"emp",nc_tuc:"court",nc_vuong:"emp",td_an:"family",td_ke:"family",td_song:"family",td_tha:"court",
 ch_co:"court",ch_benh:"med",ch_ho:"court",ch_bi:"court",thd_tho:"scholar",thd_sach:"scholar",thd_tro:"scholar",thd_hoc:"scholar",cnv_chu:"court",cnv_ban:"court",cnv_mat:"emp",cnv_ma:"court",
 s_than:"family",s_thu:"court",s_hoa:"emp",s_su:"emp",s_dich:"med",s_tinh:"med",s_thay:"court",s_ban:"court",st_the:"court",st_con:"med",st_dong:"emp"};
function reward67(theme,tier){if(tier<0)return null;const k=(RPOOL67[theme]||RPOOL67.court)[Math.min(3,tier)];if(!IT[k])return null;S.inv=S.inv||[];S.inv.push({k,from:"story"});
 return {k,row:["Phần thưởng",`${itm(k).n} · <b>${RTIER67[Math.min(3,tier)]}</b> · ${itm(k).d} (đã vào Rương)`,"g"]}}
function rTier67(A,E,ign){if(ign)return -1;const long=A&&A.seq&&A.seq.length>=5?1:0;return E.k>0?1+long+(A.sc>=3?1:0):E.k===0?0:-1}
/* chapter end (replaces the earlier one: reward instead of a random gift; ignored chapters say so) */
function end67(A,k,ign){const a=ARC67[A.a],E=a.E[k]||a.E[Object.keys(a.E)[0]];A.done=E.k>0?1:E.k<0?-1:2;A.tag=fill67(E.tag,A)+(ign?" (bỏ dở)":"");A.end=k;A.cur=null;A.nb=null;
 ap67(E.fx);let extra="";try{if(E.go)extra=E.go(A)||""}catch(e){console.error(e)}
 if(ign){A.sc=0;ap67({danh:-3});extra=(extra?extra+" ":"")+"Bỏ mặc quá hạn: mất Lợi thế, Danh -3."}
 const cls=E.k>0?"g":E.k<0?"r":"";const body=fill67(E.t,A);const isM=A===S.st.M;
 const R=isM&&!S.dead?reward67(RTHEME67[A.a]||"court",rTier67(A,E,ign)):null;
 log(`<b class="${cls}">${isM?`Chương ${A.chap||1}`:"Phụ tuyến"} «${a.t}» khép lại: ${A.tag}.</b> ${body} ${fmt(E.fx)}${extra?" "+extra:""}${R?` Phần thưởng: ${itm(R.k).n}.`:""}`);
 card67("result",isM?`Chương ${A.chap||1} khép lại`:"Phụ tuyến khép lại",[["Kết cục",A.tag,cls],["Sự việc",body],["Thay đổi",fmt(E.fx)],["Hệ quả",extra],R&&R.row,["Về sau","Đường lên ngôi Hoàng hậu vẫn còn mở"]],who67(E.w||a.w,A),a.t);
 if(isM)chEnd67(A,E,ign);if(A.kind==="s")S.st.nx=S.turn+6+rI67(8)}
Object.assign(MS67,{
 len:{t:()=>"Từ kẻ hầu thành tiểu chủ",g:()=>"Được Hoàng thượng để mắt mà phong Đáp ứng. Đến lúc ấy, những chương giữa đời mới mở.",steps:()=>[[S.srv&&S.srv.risen?"Được phong Đáp ứng":`Được phong Đáp ứng (Hoàng thượng để ý ${S.nt||0}/${BAL.ntRise.at})`,!!(S.srv&&S.srv.risen)]],/* ONE CORE (OD:L1267, review/story14-p1-r3): the same deed as jst14 len14 → the same BAL.st14 numbers */get fx(){return{danh:BAL.st14.danh.len}},end:"Ngươi đã thành tiểu chủ.",get rw(){return["court",BAL.st14.rw.len]}},
 sung:{t:()=>"Lần đầu được sủng",g:()=>`Được Hoàng thượng để mắt: Sủng ${BAL.st14.goal.sung} hoặc một đêm thị tẩm. Quá ${kitNumVi(BAL.st14.lim.sung)} tháng mà chưa được thì chương vẫn khép để truyện đi tiếp.`,steps:m=>{const G=BAL.st14.goal.sung,L=BAL.st14.lim.sung;return [[`Sủng ${S.sung}/${G}`,S.sung>=G],["Một đêm thị tẩm",(S.nights||0)>0],[`Hoặc qua ${kitNumVi(L)} tháng (${Math.min(L,S.turn-m.t0)}/${L})`,S.turn-m.t0>=L]]},any:1,get fx(){return{danh:BAL.st14.danh.sung}},end:"Hoàng thượng đã nhớ đến ngươi.",get rw(){return["court",BAL.st14.rw.sung]}}});
MS67.nhap.rw=["court",0];MS67.hau.rw=["court",3];MS67.ke.rw=["emp",3];
function a67init(k){S.st={step:0,done:0,tag:"",v2:3,M:null,X:[],bm:-9,nx:999,noside:1};
 const pool=arcIds67(k).filter(id=>arcOk67(ARC67[id]));
 const plan=["ms:nhap",k==="cnv"?null:"ms:sung"].filter(Boolean).concat(pool.map(()=>"o"),["fin",k==="cnv"?"ms:len":null,"s","s","s","st:st_the","st:st_con","st:st_dong","ms:hau","ms:ke"]);
 plan.splice(0,plan.length,...plan.filter(Boolean));S.st.ch={n:0,max:plan.filter(x=>x!=="fin").length,na:pool.length,past:[],pool,k,plan,i:-1,usedS:[]};chAdvance67(null)}
function chStartArc67(B,E){const c=S.st.ch;c.n++;B.chap=c.n;B.sc=E&&E.k>0?1:0;B.due=S.turn+(c.n<=3?1:3+rI67(3));B.dl=B.due+B.seq.length*4+3;pickNext67(B);S.st.M=B;S.st.ms=null;const ab=ARC67[B.a];
 log(`<b>Chương ${c.n}: ${ab.t}.</b> ${fill67(ab.g,B)} Hạn: ${B.dl-S.turn} tháng.`);
 card67("info",`Chương ${c.n}: ${ab.t}`,[["Mục tiêu",fill67(ab.g,B)],["Số hồi",`${B.seq.length} hồi, mỗi hồi một lựa chọn`],["Cách đi",isSrv67()?"Các hồi tự đến khi tới lúc.":"Mở từng hồi bằng thẻ «Mệnh truyện» ở mục Hành sự."],["Hạn",`${B.dl-S.turn} tháng; quá hạn chương tự khép ở kết cục xấu`],["Mang theo",B.sc?"Lợi thế +1 (chương trước thắng)":""],["Phần thưởng","thắng: đồ quý theo truyện; vừa: đồ thường; thua: không"]],who67(ab.w,B),Q0n67())}
function isSrv67(){return typeof isSrv==="function"&&isSrv()}
function chAdvance67(E){const c=S.st.ch;S.st.M=null;
 while(++c.i<c.plan.length){const p=c.plan[c.i];
  if(p==="o"){const B=chNext67(E||{k:0});if(B){chStartArc67(B,E);return}continue}
  if(p==="fin"){chFinale67();continue}
  if(p==="s"){const ids=arcIds67("*").filter(id=>!c.usedS.includes(id)&&arcOk67(ARC67[id]));if(!ids.length)continue;const id=choose67("*",ids);const B=newThread67(id,"m");if(!B)continue;c.usedS.push(id);histAdd67("*",id);chStartArc67(B,E);return}
  if(p.startsWith("st:")){const id=p.slice(3);if(!ARC67[id]||!arcOk67(ARC67[id]))continue;const B=newThread67(id,"m");if(!B)continue;chStartArc67(B,E);return}
  if(p.startsWith("ms:")){const id=p.slice(3);if(id==="hau"&&S.rank>=7)continue;if(id==="ke"&&S.heir&&!S.heir.v)continue;msStart67(id);return}}
 c.all=1;S.st.done=S.st.done||1;syncMain67()}
function chFinale67(){const c=S.st.ch;const L=c.past.filter(x=>x.a&&ARC67[x.a]&&ARC67[x.a].o===c.k);const sum=L.reduce((x,y)=>x+y.k,0),Q0=QUEST67[c.k]||QUEST67.tt;
 const e=sum>=2?0:sum>=-1?1:2;const P=Q0.e[e];c.done=1;c.fin=P[0];S.st.tag=P[0];ap67(P[1]);const R=reward67("family",e===0?3:e===1?1:-1);
 log(`<b class="${e===0?"g":e===2?"r":""}">Kết cục xuất thân «${Q0.t}»: ${P[0]}.</b> ${P[2]} ${fmt(P[1])}`);
 card67("result",`Kết cục xuất thân: ${Q0.t}`,[["Kết cục",P[0],e===0?"g":e===2?"r":""],["Các chương",L.map(x=>`Chương ${x.n}: ${ARC67[x.a].t} · <span class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</span>`).join("<br>")],["Sự việc",P[2]],["Thay đổi",fmt(P[1])],R&&R.row,["Về sau","Mệnh truyện còn tiếp: những chương giữa đời, con cái, ngôi Trung cung"]],pMe())}
function chEnd67(A,E,ign){const c=S.st.ch;if(!c)return;c.past.push({a:A.a,tag:A.tag,k:ign?-1:E.k,n:c.n,ign:!!ign});chAdvance67(E);syncMain67()}
/* the HẠN row of a milestone chapter (card, panel, Mệnh truyện tab, chapter detail): a milestone with a time limit (d.lim(), months from m.t0,
   e.g. the 14-chapter tutorial, jst14) shows the months left and what happens then; d.wait(m) = the months do not run yet (home road).
   form 0 short, 1 the chapter-open card, 2 the chapter detail risks. Returns a rows67 row [label, text, cls]. */
function msHan67(m,form){const d=m&&MS67[m.id];const L=d&&d.lim?d.lim():0;
 if(!L)return["Hạn",form===1?"không có hạn: chương xong khi đạt mục tiêu":form===2?"không có hạn: đi chậm cũng không mất gì":"không có hạn"];
 if(d.wait&&d.wait(m))return["Hạn",`${L} tháng, tính từ ngày nhập cung; hết hạn thì chương tự khép, không thưởng`];
 const left=Math.max(0,m.t0+L-S.turn);return["Hạn",`còn ${left} tháng, rồi chương tự khép, không thưởng`,left<=1?"r":""]}
function msStart67(id){const c=S.st.ch;c.n++;S.st.ms={id,r0:S.rank,t0:S.turn};S.st.M=null;const d=MS67[id];
 log(`<b>Chương ${c.n}: ${d.t()}.</b> ${d.g()}`);card67("info",`Chương ${c.n}: ${d.t()}`,[["Mục tiêu",d.g()],["Các bước",steps67(d.steps(S.st.ms))],msHan67(S.st.ms,1)],pMe(),Q0n67());syncMain67()}
function msCheck67(){const m=S.st.ms,c=S.st.ch;if(!m||!c||!msDone67(m))return;const d=MS67[m.id];ap67(d.fx);const R=d.rw?reward67(d.rw[0],d.rw[1]):null;
 c.past.push({ms:m.id,t:d.t(),tag:"Xong",k:1,n:c.n});log(`<b class="g">Chương ${c.n} «${d.t()}» xong.</b> ${d.end} ${fmt(d.fx)}${R?` Phần thưởng: ${itm(R.k).n}.`:""}`);
 card67("result",`Chương ${c.n} khép lại`,[["Kết cục","Xong","g"],["Sự việc",d.end],["Thay đổi",fmt(d.fx)],R&&R.row],pMe(),d.t());S.st.ms=null;chAdvance67(null);syncMain67()}
/* the "Mệnh truyện" card: the only way an arc chapter moves on (not while she is a servant: then beats come on their own) */
function storyActs67(){if(!v267()||S.dead||S.out)return[];const A=S.st.M;if(!A||A.done||A.cur||!A.nb||S.turn<A.due||isSrv67()||Q.some(m=>m.pid==="j67"))return[];const b=beatDef67(A,A.nb);if(!b)return[];
 return [{n:`Mệnh truyện: ${fill67(b.h||"",A)}`,t:`${lab67(A)} «${ARC67[A.a].t}» · còn ${Math.max(0,A.dl-S.turn)} tháng tới hạn.`,c:{suc:-5},o:100,w:{},x:"mở hồi kế tiếp của chương, giữ Lợi thế, gần phần thưởng",dom:"Giao thiệp",j67:1,go:()=>{fireBeat67(A);try{showModal()}catch(e){}}}]}
function story67Acts(k){Object.defineProperty(STORY[k],"acts",{get:()=>v267()?storyActs67:(STORY[k].__old||{}).acts,configurable:true,enumerable:true})}
/* jreg: every STORY entry (story67Wrap also sets it; idempotent) */
regEach(STORY,k=>{if(STORY[k]&&STORY[k].__old)story67Acts(k)},"STORY acts");
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(v267()&&S.st.done&&deck)deck.push(...storyActs67())}catch(e){}return r}})();
function a67Month(){if(!v267()||S.dead)return"";const st=S.st;try{msCheck67()}catch(e){console.error(e)}
 const A=st.M;if(A&&!A.done&&A.dl!=null&&!A.cur){
  if(S.turn>=A.dl){const lo=Object.keys(ARC67[A.a].E).find(x=>ARC67[A.a].E[x].k<0);end67(A,lo,1);return""}
  if(A.dl-S.turn===1&&!A.warn){A.warn=1;log(`<span class="r">Chương ${A.chap} «${ARC67[A.a].t}» còn một tháng tới hạn.</span> Bỏ mặc thì chương tự khép ở kết cục xấu.`);card67("info",`Chương ${A.chap} sắp hết hạn`,[["Chương",ARC67[A.a].t],["Còn","một tháng (ba tuần)","r"],["Việc cần làm",isSrv67()?"chờ hồi kế tiếp":"chơi thẻ «Mệnh truyện» ở mục Hành sự"],["Nếu bỏ mặc","chương khép ở kết cục xấu, mất Lợi thế, Danh -3, kết cục xuất thân xấu đi","r"]],who67(ARC67[A.a].w,A))}}
 try{if(typeof questBusy==="function"&&questBusy())return""}catch(e){}
 if(Q.some(m=>m.pid==="j67"))return"";
 if(A&&!A.done&&!A.cur&&A.nb&&S.turn>=A.due&&isSrv67())return fireBeat67(A)||"";
 return""}
/* after a beat she must wait a little before the next card shows */
(function(){const r0=res67;res67=function(tk,bid,i,odds){const A=th67(tk);const r=r0.apply(this,arguments);try{if(A&&A===S.st.M&&!A.done)A.due=S.turn+2+rI67(2)}catch(e){}return r}})();
function hint67(A){if(!A)return"";if(A.done)return A.tag;const b=A.cur?beatDef67(A,A.cur):beatDef67(A,A.nb);if(!b)return"";
 if(A.cur)return `Đang chờ ngươi quyết: ${fill67(b.h||"",A)}`;const dm=Math.max(0,A.due-S.turn);
 if(A.dl!=null&&!isSrv67())return dm?`Hồi kế tiếp «${fill67(b.h||"",A)}» mở được sau ${dm} tháng`:`Chơi thẻ «Mệnh truyện: ${fill67(b.h||"",A)}» ở mục Hành sự`;
 return `Sắp tới: ${fill67(b.h||"",A)}${dm?` (khoảng ${dm} tháng nữa)`:" (tháng này hoặc tháng sau)"}`}
function obj67(){const c=S.st&&S.st.ch,A=S.st&&S.st.M,m=S.st&&S.st.ms;if(!c)return"";
 if(m){const d=MS67[m.id];const nx=d.steps(m).find(x=>!x[1]);return `Chương ${c.n} «${d.t()}»: ${nx?nx[0]:"sắp xong"}`}
 if(c.all)return "Đã đi hết các chương của mệnh truyện";if(!A)return"";
 return `${lab67(A)} «${ARC67[A.a].t}» · hạn còn ${Math.max(0,A.dl-S.turn)} tháng · ${hint67(A)}`}
function panel67(){const c=S.st.ch,M=S.st.M,m=S.st.ms,Q0=QUEST67[S.origin.k]||QUEST67.tt;
 let h=`<div class="story"><h3>Mệnh truyện: ${Q0.t}</h3><p class="past" style="margin:0">Chính tuyến của kiếp này khoảng ${c?c.max:13} chương, từ ngày nhập cung đến ngày con ngươi lên ngôi Đông cung. Các phụ tuyến là việc nhờ, sự kiện, mưu sự ở các mục khác.</p></div>`
  +rows67([["Luật chương","Mỗi chương truyện có hạn. Mở từng hồi bằng thẻ «Mệnh truyện» ở mục Hành sự (Sức -5, 2 khắc). Theo đuổi thì giữ Lợi thế, có cơ thắng và phần thưởng."],["Nếu bỏ mặc","Quá hạn, chương tự khép ở kết cục xấu: mất Lợi thế, chịu thiệt của kết cục thua, Danh -3, kết cục xuất thân xấu đi. Không chết, đường lên ngôi Hoàng hậu vẫn mở.","r"],["Phần thưởng","thắng: đồ quý, hiếm hay trân phẩm theo truyện; vừa: đồ thường; thua: không"]]);
 /* KIT §51.1: past chapters + Kết cục xuất thân = one block, one kit table (one label column) */
 {const fin=c&&c.done?["Kết cục xuất thân",c.fin,S.st.tag&&c.fin?"g":""]:null;
  if(c&&c.past.length)h+=`<h3>Các chương đã qua</h3>`+rows67(c.past.map(x=>[`Chương ${x.n}`,`${msName67(x)} · <b class="${x.k>0?"g":x.k<0?"r":""}">${x.tag}</b>`]).concat([fin]));
  else if(fin)h+=rows67([fin])}
 if(m&&c){const d=MS67[m.id],st=d.steps(m);h+=`<h3>Chương ${c.n}: ${d.t()}</h3>`+rows67([["Mục tiêu",d.g()],["Các bước",steps67(st)],["Tiến độ",`Xong ${st.filter(x=>x[1]).length}/${st.length} bước`],msHan67(m)])}
 else if(M){const a=ARC67[M.a],n=M.seq.length,i=M.done?n:M.i;h+=`<h3>${lab67(M)}: ${a.t}</h3>`+rows67([["Mục tiêu",fill67(a.g,M)],["Tiến độ",`Đã qua ${i}/${n} hồi · còn ${n-i}`],["Hạn",`còn ${Math.max(0,M.dl-S.turn)} tháng`,M.dl-S.turn<=1?"r":""],["Lợi thế",`${M.sc} · mỗi phần thêm cơ may ở hồi cao trào`],["Đã qua",M.hist.join("<br>")],["Kế tiếp",hint67(M)]])}
 else if(c&&c.all)h+=rows67([["Chính tuyến","Đã đi hết các chương","g"]]);
 const nx=c?c.plan.slice(c.i+1).filter(x=>x!=="fin").length:0;if(nx)h+=`<p class="past">Còn khoảng ${nx} chương phía trước.</p>`;
 return h}
