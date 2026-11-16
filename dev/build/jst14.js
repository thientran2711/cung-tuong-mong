/* ================= jst14: KHUNG ĐỜI 14 CHƯƠNG (owner 16/11 08:30Z "Ok, chọn hướng tuyến truyện 14 chương đi"; plan dev/STORY_ROADS_PLAN.md, phase 1) =================
   A NEW life (a67init) gets one fixed frame of 14 chapters, in three parts:
     1–3   Phần đầu "Nhập cung học việc" (new-player chapters; phase 2 turns them into DO-the-feature quests). A chapter that closes only because
           its time ran out gives NO reward (owner 07:55Z: the reward comes only when she really did the task; no free tutorial rewards).
     4–11  Phần giữa "Truyện xuất thân": the j67 road of her origin. The first of the origin's four premises is rolled at đầu thai, avoiding the
           ones played lately (ctm-arcs history), and names the road (S.st.f14.road); the other premises follow as today (each chapter's
           outcome picks the next), then shared arcs and Gây dựng thế lực fill the part up to chapter 11. Thanh mai trúc mã chapters (j96 / jkc)
           are moved into this part and take the place of shared arcs, so the part stays 8 chapters.
     12–14 Phần cuối "Ngôi Trung cung": con đường của con / ngôi Đông cung (or a shared arc when she has no child), Tranh ngôi Trung cung,
           Mẫu nghi thiên hạ.
   A chapter whose content cannot run (no arc left, already Hoàng hậu, son already Thái tử …) is replaced by a shared arc, so the numbers stay
   1..14. Failing a chapter never closes the Hoàng hậu road (j67 rule, unchanged). Hồi still fire only from the "Mệnh truyện" card / the
   arc's own conditions (j67), never from a daily dice.
   SAVES: only a life started on this build has S.st.f14 (and S.st.v2 = 4). Every older save keeps its old frame: none of the code below runs
   for it (f14() is false). Off switch for tests: window.F14_ON = false before start. */
const F14={max:14,parts:[{a:1,b:3,t:"Nhập cung học việc"},{a:4,b:11,t:"Truyện xuất thân"},{a:12,b:14,t:"Ngôi Trung cung"}]};
window.F14_ON=window.F14_ON!==false;
function f14(){try{return !!(S&&S.st&&S.st.f14&&S.st.ch)}catch(e){return false}}
function f14Part(n){return F14.parts.find(p=>n>=p.a&&n<=p.b)||F14.parts[2]}
/* tutorial milestones (phase 1): every step is a real state check; a step marked "t" (third item) is only the time limit that lets the story go on */
Object.assign(MS67,{
 nhap14:{t:()=>S.origin.k==="cnv"?"Kẻ hầu mới vào cung":"Nhập cung, đứng vững",
  g:()=>S.origin.k==="cnv"?"Mới vào cung làm kẻ hầu: làm tròn phận sự, giữ lòng tin của chủ. Được phong Đáp ứng thì xong chương, có thưởng; qua tám tháng thì chương tự khép, không thưởng.":"Mới vào cung: giữ mình, được Hoàng thượng để mắt. Được tấn phong một bậc thì xong chương, có thưởng; qua sáu tháng thì chương tự khép, không thưởng.",
  steps:m=>S.origin.k==="cnv"?[["Được phong Đáp ứng",!!(S.srv&&S.srv.risen)],[`Hoặc qua tám tháng đầu (${Math.min(8,S.turn-m.t0)}/8), không thưởng`,S.turn-m.t0>=8,"t"]]
   :[[`Được tấn phong một bậc (nay ${RANKS[Math.min(S.rank,7)].n})`,S.rank>m.r0],[`Hoặc qua sáu tháng đầu (${Math.min(6,S.turn-m.t0)}/6), không thưởng`,S.turn-m.t0>=6,"t"]],
  any:1,fx:{danh:3},end:"Ngươi đã đứng được chân trong cung.",rw:["court",0]},
 sung14:{t:()=>"Lần đầu được sủng",g:()=>"Được Hoàng thượng để mắt: Sủng 25 hoặc một đêm thị tẩm thì xong chương, có thưởng. Quá mười tháng mà chưa được thì chương tự khép để truyện đi tiếp, không thưởng.",
  steps:m=>[[`Sủng ${S.sung}/25`,S.sung>=25],["Một đêm thị tẩm",(S.nights||0)>0],[`Hoặc qua mười tháng (${Math.min(10,S.turn-m.t0)}/10), không thưởng`,S.turn-m.t0>=10,"t"]],
  any:1,fx:{danh:2},end:"Hoàng thượng đã nhớ đến ngươi.",rw:["court",1]},
 tap14:{t:()=>"Học quy củ trong cung",g:()=>"Có người thân tình trong cung và một môn tài nghệ cho ra hồn thì xong chương, có thưởng. Qua tám tháng mà chưa xong thì chương tự khép, không thưởng.",
  steps:m=>{const fr=(()=>{try{return liveRivals(true).some(v=>(v.rel||0)>=30)}catch(e){return false}})(),ar=(()=>{try{return Object.values(S.arts||{}).some(l=>(l||0)>=2)}catch(e){return false}})();
   return [["Kết thân một người trong cung (thân tình 30)",fr],["Học một môn tài nghệ lên bậc 2",ar],[`Hoặc qua tám tháng (${Math.min(8,S.turn-m.t0)}/8), không thưởng`,S.turn-m.t0>=8,"t"]]},
  all2:1,fx:{danh:2},end:"Ngươi đã biết quy củ, có người quen, có nghề trong tay.",rw:["court",1]},
 len14:{t:()=>"Từ kẻ hầu thành tiểu chủ",g:()=>"Được Hoàng thượng để mắt mà phong Đáp ứng thì xong chương, có thưởng. Qua mười hai tháng mà chưa được thì chương tự khép, không thưởng.",
  steps:m=>[[S.srv&&S.srv.risen?"Được phong Đáp ứng":`Được phong Đáp ứng (Hoàng thượng để ý ${S.nt||0}/45)`,!!(S.srv&&S.srv.risen)],[`Hoặc qua mười hai tháng (${Math.min(12,S.turn-m.t0)}/12), không thưởng`,S.turn-m.t0>=12,"t"]],
  any:1,fx:{danh:4},end:"Ngươi đã thành tiểu chủ.",rw:["court",2]}});
/* "all2": every real step (not "t") must be done, or the time step */
(function(){const d0=msDone67;msDone67=function(m){const d=MS67[m.id];if(d&&d.all2){const st=d.steps(m),real=st.filter(x=>!x[2]);return real.every(x=>x[1])||st.some(x=>x[2]&&x[1])}return d0.apply(this,arguments)}})();
/* the frame of a new life */
function f14Plan(k){const T=["ms:nhap14","ms:sung14","ms:tap14"];
 const R=["o","o","o","o","fin"].concat(k==="cnv"?["ms:len14","s","s"]:["s","s","s"],["st:st_the"]);
 return T.concat(R,["end:12","ms:hau","ms:ke"])}
(function(){const i0=a67init;a67init=function(k){if(!window.F14_ON)return i0.apply(this,arguments);
 S.st={step:0,done:0,tag:"",v2:4,M:null,X:[],bm:-9,nx:999,noside:1,f14:{v:1,road:null}};
 const pool=arcIds67(k).filter(id=>arcOk67(ARC67[id]));const plan=f14Plan(k);
 S.st.ch={n:0,max:F14.max,na:pool.length,past:[],pool,k,plan,i:-1,usedS:[]};
 /* the road of this life: the first premise, rolled now (fewest recent plays first; j67 history), shown from the first chapter on */
 try{const r=hist67()[k]||[];const fresh=pool.filter(id=>!r.includes(id));const id=fresh.length?pk67(fresh):choose67(k,pool);if(id){S.st.f14.road=id;S.st.ch.pool=[id].concat(pool.filter(x=>x!==id))}}catch(e){console.error(e)}
 chAdvance67(null)}})();
/* keep the frame at 14: chapters other modules splice in (Thanh mai trúc mã) move out of Phần đầu, extra shared arcs drop */
function f14Norm(){if(!f14())return;const c=S.st.ch,P=c.plan;const isT=x=>/^ms:(nhap14|sung14|tap14)$/.test(x);
 let lastT=-1;P.forEach((x,i)=>{if(isT(x))lastT=i});
 /* the road itself opens Phần giữa: a spliced chapter goes right after the first origin chapter */
 for(let i=c.i+1;i<=lastT;i++){if(!isT(P[i])&&P[i]!=="fin"){const x=P.splice(i,1)[0];lastT--;const o=P.indexOf("o",Math.max(lastT+1,c.i+1));P.splice(o>=0?o+1:lastT+1,0,x);i--}}
 /* chapters already started are counted in c.n (the running one sits at c.i); every later entry but "fin" becomes one chapter */
 const cnt=()=>c.n+P.slice(c.i+1).filter(x=>x!=="fin").length;
 for(let g=0;g<8&&cnt()>F14.max;g++){let j=-1;for(let i=P.length-1;i>c.i;i--)if(P[i]==="s"){j=i;break}if(j<0)break;P.splice(j,1)}
 c.max=F14.max}
/* the 14-chapter advance: a chapter that cannot run is replaced by a shared arc so the numbers stay 1..14 */
function f14Shared(E){const c=S.st.ch;const ids=arcIds67("*").filter(id=>!c.usedS.includes(id)&&arcOk67(ARC67[id]));if(!ids.length)return false;const id=choose67("*",ids);const B=newThread67(id,"m");if(!B)return false;c.usedS.push(id);histAdd67("*",id);chStartArc67(B,E);return true}
(function(){const a0=chAdvance67;chAdvance67=function(E){if(!f14())return a0.apply(this,arguments);try{f14Norm()}catch(e){console.error(e)}const c=S.st.ch;S.st.M=null;
 while(++c.i<c.plan.length){if(c.n>=F14.max)break;const p=c.plan[c.i];
  if(p==="fin"){chFinale67();continue}
  if(p==="o"){const rd=S.st.f14.road;if(rd&&!S.st.f14.r0&&c.pool.includes(rd)){S.st.f14.r0=1;const B=newThread67(rd,"m");if(B){c.pool=c.pool.filter(x=>x!==rd);histAdd67(c.k,rd);chStartArc67(B,E);return}}
   const B=chNext67(E||{k:0});if(B){chStartArc67(B,E);return}if(f14Shared(E))return;continue}
  if(p==="s"){if(f14Shared(E))return;continue}
  if(p==="end:12"){for(const id of ["st_dong","st_con"]){if(ARC67[id]&&arcOk67(ARC67[id])){const B=newThread67(id,"m");if(B){chStartArc67(B,E);return}}}if(f14Shared(E))return;continue}
  if(p.startsWith("st:")){const id=p.slice(3);if(ARC67[id]&&arcOk67(ARC67[id])){const B=newThread67(id,"m");if(B){chStartArc67(B,E);return}}if(f14Shared(E))return;continue}
  if(p.startsWith("ms:")){const id=p.slice(3);if((id==="hau"&&S.rank>=7)||(id==="ke"&&S.heir&&!S.heir.v)){if(f14Shared(E))return;continue}msStart67(id);return}}
 /* the origin ending must still be told if the frame filled up before it */
 if(!c.done&&c.plan.slice(Math.max(0,c.i)).includes("fin"))try{chFinale67()}catch(e){console.error(e)}
 c.all=1;S.st.done=S.st.done||1;syncMain67()}})();
/* a tutorial chapter closed only by its time limit: the story goes on, no Danh, no reward (owner 07:55Z) */
(function(){const m0=msCheck67;msCheck67=function(){if(!f14())return m0.apply(this,arguments);const m=S.st.ms,c=S.st.ch;if(!m||!c||!msDone67(m))return;const d=MS67[m.id],st=d.steps(m);
 const real=st.filter(x=>!x[2]).some(x=>x[1]),late=st.some(x=>x[2]&&x[1]);if(real||!late)return m0.apply(this,arguments);
 c.past.push({ms:m.id,t:d.t(),tag:"Lỡ dịp",k:0,n:c.n,late:1});log(`<b>Chương ${c.n} «${d.t()}» tự khép.</b> Hết hạn mà việc chưa thành: không có phần thưởng.`);
 card67("result",`Chương ${c.n} khép lại`,[["Kết cục","Lỡ dịp"],["Sự việc","Hết hạn mà việc của chương chưa thành, truyện đi tiếp."],["Phần thưởng","không có: phần thưởng chỉ đến khi tự tay làm xong việc của chương","r"],["Về sau","Đường lên ngôi Hoàng hậu vẫn còn mở"]],pMe(),d.t());
 S.st.ms=null;chAdvance67(null);syncMain67()}})();
(function(){const s0=syncMain67;syncMain67=function(){try{if(f14())f14Norm()}catch(e){}return s0.apply(this,arguments)}})();
/* data for the chapter detail (jgoal) and the Mệnh truyện tab (jtabs): where she is in the 14 chapters */
function f14Info(){if(!f14())return null;const c=S.st.ch,n=Math.max(1,c.n||1),P=f14Part(n),pi=F14.parts.indexOf(P);
 const road=S.st.f14.road&&ARC67[S.st.f14.road]?ARC67[S.st.f14.road].t:"";
 const rows=F14.parts.map((p,i)=>{const st=c.all||i<pi?"đã qua":i===pi?`đang ở chương ${n}`:"chưa tới";return[`Phần ${["đầu","giữa","cuối"][i]}`,`Chương ${p.a}–${p.b} · ${p.t}${i===1&&road?` «${road}»`:""} · ${st}`,i===pi&&!c.all?"g":""]});
 return {n,max:F14.max,part:P.t,partNo:pi,left:c.all?0:F14.max-n,road,rows}}
window.f14Info=f14Info;
/* the servant road panel (panel67, j67): same words for the 14-chapter frame */
(function(){const p0=panel67;panel67=function(){let h=p0.apply(this,arguments);try{const F=f14Info();if(!F)return h;
 h=h.replace(/Chính tuyến của kiếp này khoảng \d+ chương[^<]*/,`Đời người kiếp này gồm ${F.max} chương: ba chương đầu học việc trong cung, tám chương truyện xuất thân, ba chương cuối tranh ngôi Trung cung. Các phụ tuyến là việc nhờ, sự kiện, mưu sự ở các mục khác.`)
  .replace(/Còn khoảng \d+ chương phía trước\./,F.left?`Còn ${F.left} chương phía trước.`:"");
 h+=rows67(F.rows)}catch(e){console.error(e)}return h}})();
/* OD:L1247 (owner 16/11 08:40Z): a person a road involves REALLY exists in the palace with the same name and identity, and a hostile role is
   REAL in the relationship system. In a 14-chapter life: (1) the person cast into an arc role ("v", "v2", castRv67 = a live consort) whose
   arc text sets her against the player gets real ill will both ways (relAdd -25: thiện cảm down, oán up, j9) once, when cast;
   (2) the family enemy of the td road (S.foe, j4) is that same live consort, marked hostile in both directions. */
const F14HOST=/hại|vu |vu cáo|cản đường|ghen|thù|rình|đầu độc|tranh|giành|hãm|bày mưu|tố|dèm|chèn ép|ức hiếp|phản/;
function f14Hostile(A,k){try{const a=ARC67[A.a];const txt=[a.g||""].concat(Object.values(a.B||{}).map(b=>b.t||"")).filter(t=>t.includes(`{${k}}`)).join(" ");
 return F14HOST.test(txt.toLowerCase())}catch(e){return false}}
/* hate for real: both sides' thiện cảm at most -15 (j9 relAdd also raises oán both ways) */
function f14Hate(v){if(!v)return;const m=Math.max(aff(S,v)||0,aff(v,S)||0);relAdd(S,v,-Math.max(25,15+m))}
/* a hostile role takes, when it can, someone who is not already her friend (thiện cảm under 20 both ways) */
(function(){const c0=castRv67;castRv67=function(A,k,f){if(!f14()||!A||!f14Hostile(A,k))return c0.apply(this,arguments);
 let r=c0.call(this,A,k,v=>(!f||f(v))&&(aff(S,v)||0)<20&&(aff(v,S)||0)<20);if(!r)r=c0.apply(this,arguments);
 try{if(r&&!(A.host14||{})[k]){const v=rv67(A,k);if(v){A.host14=A.host14||{};A.host14[k]=v.id;f14Hate(v)}}}catch(e){console.error(e)}return r}})();
(function(){const n0=newThread67;newThread67=function(id,kind){const A=n0.apply(this,arguments);try{if(A&&f14())for(const k of ["v","v2"]){if(A.act&&A.act[k]!=null&&!(A.host14||{})[k]){const v=rv67(A,k);if(v&&f14Hostile(A,k)){A.host14=A.host14||{};A.host14[k]=v.id;f14Hate(v)}}}}catch(e){console.error(e)}return A}})();
function f14Foe(){try{if(!f14()||!S.foe)return;const e=rivals.find(v=>v.name===S.foe&&v.alive);if(!e||S.st.f14.foe)return;e.enemy=true;f14Hate(e);S.st.f14.foe=e.id}catch(e){console.error(e)}}
(function(){const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);f14Foe();return r}})();
/* OD:L1253 (owner 16/11 07:00Z): the same identity + road + option must not always give the same result across lives. In a 14-chapter life
   the odds of every chancy story option (j67 oOf67, base below 100) move with THIS life's context, at most 15 either way:
   how the cast person feels about her (thiện cảm, oán), that person's nature, her own Tâm cơ and Đức, and how many consorts bear her a
   grudge (who is watching). Sure options stay sure (their cost and gain are shown in full). The result card words never change. */
const F14TR={"Hiểm độc":-5,"Tham vọng":-3,"Kiêu ngạo":-2,"Nhu mì":2,"Hiền lành":4,"Trung hậu":3};
function f14Ctx(A){if(!f14())return 0;let d=0;try{const v=rv67(A,"v")||rv67(A,"v2");if(v){d+=cl(Math.round((aff(v,S)||0)/6),-6,6)-cl(Math.round((oan(v,S)||0)/10),0,5);d+=F14TR[v.trait]||0}
 d+=Math.round(((S.tamco||0)-40)/15)+Math.round(((S.duc||0)-50)/20);
 const foes=liveRivals(true).filter(x=>(oan(x,S)||0)>=30).length;d-=Math.min(4,foes)}catch(e){}return cl(d,-15,15)}
(function(){const o0=oOf67;oOf67=function(A,o,b){const x=o0.apply(this,arguments);if(!f14()||o.o==null||x>=100)return x;return cl(Math.round(x+f14Ctx(A)),5,95)}})();
window.f14Ctx=f14Ctx;
/* OD:L1253 for endings no roll decides: an option whose ending is the same whether it succeeds or fails (sure, or o.e one key), or a chapter that ends on the tally
   of Lợi thế (scEnd67) after a sure or rolled-without-ending option. The ending still reads this life's context: f14Ctx + Lợi thế carried
   sets the chance that the ending moves one step (win→mid→lose worse, lose→mid→win better): against her = more likely worse, for her =
   more likely better, each between 5 and 40 in 100. Only where the arc has that ending; the chapter-end card tells what really happened. */
function f14Shift(A,k){try{const E=ARC67[A.a].E;const c=f14Ctx(A)+((A.sc||0)-1)*2;
 const dn={win:"mid",mid:"lose"},up={mid:"win",lose:"mid"};const pd=cl(20-c*2,5,40),pu=cl(12+c*2,5,40),x=rnd67()*100;
 if(x<pd&&dn[k]&&E[dn[k]])return dn[k];if(x>=100-pu&&up[k]&&E[up[k]])return up[k]}catch(e){}return k}
(function(){const r0=res67;res67=function(tk,bid,i,odds){const A=th67(tk);
 if(A&&f14()){let o=null;try{o=A.cur===bid?opts67(A,beatDef67(A,bid))[i]:null}catch(e){}const e=o&&o.e;A.s14=odds>=100||!e||typeof e==="string"||(Array.isArray(e)&&e[0]===e[1])?1:0}
 try{return r0.apply(this,arguments)}finally{if(A)A.s14=0}}})();
(function(){const e0=end67;end67=function(A,k,ign){if(f14()&&!ign&&A&&A.s14){A.s14=0;k=f14Shift(A,k)}return e0.call(this,A,k,ign)}})();
