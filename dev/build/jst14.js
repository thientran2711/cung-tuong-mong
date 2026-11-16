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
/* ONE CORE (owner OD:L1267): every number below is read from BAL.st14 (jbal.js) at run time, and every text prints that constant. */
const F14={get max(){return BAL.st14.max},get parts(){const P=BAL.st14.parts,T=["Nhập cung học việc","Truyện xuất thân","Ngôi Trung cung"];return P.map((x,i)=>({a:x[0],b:x[1],t:T[i]}))}};
window.F14_ON=window.F14_ON!==false;
function f14(){try{return !!(S&&S.st&&S.st.f14&&S.st.ch)}catch(e){return false}}
/* F14.parts builds a fresh list from BAL each time: compare parts by index, never by object */
function f14PartNo(n){const P=F14.parts;const i=P.findIndex(p=>n>=p.a&&n<=p.b);return i>=0?i:P.length-1}
function f14Part(n){return F14.parts[f14PartNo(n)]}
const f14Nv=n=>typeof kitNumVi==="function"?kitNumVi(n):String(n);
/* tutorial ids; the months of a tutorial chapter run only while she is IN the palace: on a home road («Ở nhà chờ tuyển tú», jkc) they wait,
   and palace entry (kcEnter) restarts the running tutorial chapter (fix r1 item 1: chapter 1 was closed as «Lỡ dịp» at the first palace month) */
const F14T=/^(nhap14|sung14|tap14)$/;
function f14Home(){try{return !!(S.kc&&!S.kc.inPal)}catch(e){return false}}
function f14El(m){return f14Home()?0:Math.max(0,S.turn-m.t0)}
function f14Srv(){return S.origin.k==="cnv"&&!(S.srv&&S.srv.risen)}
/* the time step of a tutorial chapter (third item "t" = only the limit that lets the story go on) */
function f14Late(m,L,w){const e=f14El(m);return[`Hoặc qua ${f14Nv(L)} tháng${w||""} (${Math.min(L,e)}/${L}), không thưởng`,e>=L,"t"]}
const F14G=()=>BAL.st14.goal,F14L=()=>BAL.st14.lim,F14D=()=>BAL.st14.danh,F14R=()=>BAL.st14.rw;
/* tutorial milestones (phase 1): every step is a real state check she can do from her real position (fix r1 item 2: the cung nữ road
   serves first, so its steps are servant steps until she is raised; «Từ kẻ hầu thành tiểu chủ» runs only if she is not raised yet) */
Object.assign(MS67,{
 nhap14:{t:()=>S.origin.k==="cnv"?"Kẻ hầu mới vào cung":"Nhập cung, đứng vững",lim:()=>S.origin.k==="cnv"?F14L().nhapCnv:F14L().nhap,wait:()=>f14Home(),
  g:()=>S.origin.k==="cnv"?`Mới vào cung làm kẻ hầu: làm tròn phận sự, giữ lòng tin của chủ. Chủ tin lên ${F14G().tin}, hoặc được thăng Đại cung nữ, thì xong chương, có thưởng; qua ${f14Nv(F14L().nhapCnv)} tháng thì chương tự khép, không thưởng.`
   :`Mới vào cung: giữ mình, được Hoàng thượng để mắt. Được tấn phong một bậc thì xong chương, có thưởng; qua ${f14Nv(F14L().nhap)} tháng thì chương tự khép, không thưởng.`,
  steps:m=>S.origin.k==="cnv"?[[`Chủ tin ${S.tin||0}/${F14G().tin}`,(S.tin||0)>=F14G().tin],["Được thăng Đại cung nữ",!!(S.srv&&S.srv.rk>=2)],["Được phong Đáp ứng",!!(S.srv&&S.srv.risen)],f14Late(m,F14L().nhapCnv," đầu")]
   :[[`Được tấn phong một bậc (nay ${RANKS[Math.min(S.rank,7)].n})`,S.rank>m.r0],f14Late(m,F14L().nhap," đầu")],
  any:1,get fx(){return{danh:F14D().nhap}},end:"Ngươi đã đứng được chân trong cung.",get rw(){return["court",F14R().nhap]}},
 sung14:{t:()=>f14Srv()?"Lọt vào mắt Hoàng thượng":"Lần đầu được sủng",lim:()=>F14L().sung,wait:()=>f14Home(),
  g:()=>f14Srv()?`Kẻ hầu cũng có ngày được Hoàng thượng để mắt: Hoàng thượng để ý lên ${F14G().nt}, hoặc được phong Đáp ứng, thì xong chương, có thưởng. Quá ${f14Nv(F14L().sung)} tháng mà chưa được thì chương tự khép để truyện đi tiếp, không thưởng.`
   :`Được Hoàng thượng để mắt: Sủng ${F14G().sung} hoặc một đêm thị tẩm thì xong chương, có thưởng. Quá ${f14Nv(F14L().sung)} tháng mà chưa được thì chương tự khép để truyện đi tiếp, không thưởng.`,
  steps:m=>f14Srv()?[[`Hoàng thượng để ý ${S.nt||0}/${F14G().nt}`,(S.nt||0)>=F14G().nt],["Được phong Đáp ứng",!!(S.srv&&S.srv.risen)],f14Late(m,F14L().sung)]
   :[[`Sủng ${S.sung}/${F14G().sung}`,S.sung>=F14G().sung],["Một đêm thị tẩm",(S.nights||0)>0],f14Late(m,F14L().sung)],
  any:1,get fx(){return{danh:F14D().sung}},end:"Hoàng thượng đã nhớ đến ngươi.",get rw(){return["court",F14R().sung]}},
 tap14:{t:()=>"Học quy củ trong cung",lim:()=>F14L().tap,wait:()=>f14Home(),
  g:()=>`Có người trong cung quý ngươi (thiện cảm ${F14G().rel}) và một môn tài nghệ lên bậc ${F14G().art} thì xong chương, có thưởng. Qua ${f14Nv(F14L().tap)} tháng mà chưa xong thì chương tự khép, không thưởng.`,
  steps:m=>{const G=F14G();const fr=(()=>{try{return liveRivals(true).some(v=>(aff(v,S)||0)>=G.rel)||(isSrv()&&srvColleagues().some(s=>(S.srv.af[s.sid]||0)>=G.rel))}catch(e){return false}})(),ar=(()=>{try{return Object.values(S.arts||{}).some(l=>(l||0)>=G.art)}catch(e){return false}})();
   return [[`Kết thân một người trong cung (thiện cảm ${G.rel})`,fr],[`Học một môn tài nghệ lên bậc ${G.art}`,ar],f14Late(m,F14L().tap)]},
  all2:1,get fx(){return{danh:F14D().tap}},end:"Ngươi đã biết quy củ, có người quen, có nghề trong tay.",get rw(){return["court",F14R().tap]}},
 /* no time limit (as j67 «len»): every later chapter is a consort's chapter that a servant cannot play, so they open only when she is raised;
    if she was raised before this chapter, a shared arc takes its place (chAdvance67 below) */
 len14:{t:()=>"Từ kẻ hầu thành tiểu chủ",
  g:()=>"Được Hoàng thượng để mắt mà phong Đáp ứng thì xong chương, có thưởng. Đến lúc ấy, các chương sau của đời người mới mở.",
  steps:m=>[[S.srv&&S.srv.risen?"Được phong Đáp ứng":`Được phong Đáp ứng (Hoàng thượng để ý ${S.nt||0}/${BAL.ntRise.at})`,!!(S.srv&&S.srv.risen)]],
  any:1,get fx(){return{danh:F14D().len}},end:"Ngươi đã thành tiểu chủ.",get rw(){return["court",F14R().len]}}});
/* "all2": every real step (not "t") must be done, or the time step */
(function(){const d0=msDone67;msDone67=function(m){const d=MS67[m.id];if(d&&d.all2){const st=d.steps(m),real=st.filter(x=>!x[2]);return real.every(x=>x[1])||st.some(x=>x[2]&&x[1])}return d0.apply(this,arguments)}})();
/* the frame of a new life */
/* Phần giữa holds as many chapters as BAL.st14.parts says: the origin's four premises, (cung nữ: «Từ kẻ hầu thành tiểu chủ»), shared arcs, Gây dựng thế lực */
function f14Plan(k){const T=["ms:nhap14","ms:sung14","ms:tap14"];const P=BAL.st14.parts,mid=P[1][1]-P[1][0]+1;
 const R=["o","o","o","o","fin"].concat(k==="cnv"?["ms:len14"]:[]);const nS=Math.max(0,mid-4-R.filter(x=>x.startsWith("ms:")).length-1);
 return T.concat(R,Array(nS).fill("s"),["st:st_the"],["end:12","ms:hau","ms:ke"])}
(function(){const i0=a67init;a67init=function(k){if(!window.F14_ON)return i0.apply(this,arguments);
 S.st={step:0,done:0,tag:"",v2:4,M:null,X:[],bm:-9,nx:999,noside:1,f14:{v:1,road:null}};
 const pool=arcIds67(k).filter(id=>arcOk67(ARC67[id]));const plan=f14Plan(k);
 S.st.ch={n:0,max:F14.max,na:pool.length,past:[],pool,k,plan,i:-1,usedS:[]};
 /* the road of this life: the first premise, rolled now (fewest recent plays first; j67 history), shown from the first chapter on */
 try{const r=hist67()[k]||[];const fresh=pool.filter(id=>!r.includes(id));const id=fresh.length?pk67(fresh):choose67(k,pool);if(id){S.st.f14.road=id;S.st.ch.pool=[id].concat(pool.filter(x=>x!==id))}}catch(e){console.error(e)}
 chAdvance67(null)}})();
/* keep the frame at 14: chapters other modules splice in (Thanh mai trúc mã) move out of Phần đầu, extra shared arcs drop */
function f14Norm(){if(!f14())return;const c=S.st.ch,P=c.plan;const isT=x=>/^ms:/.test(x)&&F14T.test(x.slice(3));
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
  if(p.startsWith("ms:")){const id=p.slice(3);if((id==="hau"&&S.rank>=7)||(id==="ke"&&S.heir&&!S.heir.v)||(id==="len14"&&S.srv&&S.srv.risen)){if(f14Shared(E))return;continue}msStart67(id);return}}
 /* the origin ending must still be told if the frame filled up before it */
 if(!c.done&&c.plan.slice(Math.max(0,c.i)).includes("fin"))try{chFinale67()}catch(e){console.error(e)}
 c.all=1;S.st.done=S.st.done||1;syncMain67()}})();
/* a tutorial chapter closed only by its time limit: the story goes on, no Danh, no reward (owner 07:55Z) */
(function(){const m0=msCheck67;msCheck67=function(){if(!f14())return m0.apply(this,arguments);const m=S.st.ms,c=S.st.ch;if(!m||!c)return;if(F14T.test(m.id)&&f14Home())return;if(!msDone67(m))return;const d=MS67[m.id],st=d.steps(m);
 const real=st.filter(x=>!x[2]).some(x=>x[1]),late=st.some(x=>x[2]&&x[1]);if(real||!late)return m0.apply(this,arguments);
 c.past.push({ms:m.id,t:d.t(),tag:"Lỡ dịp",k:0,n:c.n,late:1});log(`<b>Chương ${c.n} «${d.t()}» tự khép.</b> Hết hạn mà việc chưa thành: không có phần thưởng.`);
 card67("result",`Chương ${c.n} khép lại`,[["Kết cục","Lỡ dịp"],["Sự việc","Hết hạn mà việc của chương chưa thành, truyện đi tiếp."],["Phần thưởng","không có: phần thưởng chỉ đến khi tự tay làm xong việc của chương","r"],["Về sau","Đường lên ngôi Hoàng hậu vẫn còn mở"]],pMe(),d.t());
 S.st.ms=null;chAdvance67(null);syncMain67()}})();
/* palace entry from a home road (jkc kcEnter, also the co-op friend who waited at home): the running tutorial chapter starts now, from her real
   entry rank, with its full time (fix r1 item 1) */
(function(){if(typeof kcEnter!=="function")return;const k0=kcEnter;kcEnter=function(){const r=k0.apply(this,arguments);try{const m=f14()&&S.st.ms;if(m&&F14T.test(m.id)){m.t0=S.turn;m.r0=S.rank;m.home14=1}}catch(e){console.error(e)}return r}})();
(function(){const s0=syncMain67;syncMain67=function(){try{if(f14())f14Norm()}catch(e){}return s0.apply(this,arguments)}})();
/* data for the chapter detail (jgoal) and the Mệnh truyện tab (jtabs): where she is in the 14 chapters */
function f14Info(){if(!f14())return null;const c=S.st.ch,n=Math.max(1,c.n||1),pi=f14PartNo(n),P=F14.parts[pi];
 const road=S.st.f14.road&&ARC67[S.st.f14.road]?ARC67[S.st.f14.road].t:"";
 const rows=F14.parts.map((p,i)=>{const st=c.all||i<pi?"đã qua":i===pi?`đang ở chương ${n}`:"chưa tới";return[`Phần ${["đầu","giữa","cuối"][i]}`,`Chương ${p.a}–${p.b} · ${p.t}${i===1&&road?` «${road}»`:""} · ${st}`,i===pi&&!c.all?"g":""]});
 return {n,max:F14.max,part:P.t,partNo:pi,left:c.all?0:F14.max-n,road,rows}}
window.f14Info=f14Info;
/* the servant road panel (panel67, j67): same words for the 14-chapter frame */
(function(){const p0=panel67;panel67=function(){let h=p0.apply(this,arguments);try{const F=f14Info();if(!F)return h;
 const pn=F14.parts.map(p=>f14Nv(p.b-p.a+1));
 h=h.replace(/Chính tuyến của kiếp này khoảng \d+ chương[^<]*/,`Đời người kiếp này gồm ${F.max} chương: ${pn[0]} chương đầu học việc trong cung, ${pn[1]} chương truyện xuất thân, ${pn[2]} chương cuối tranh ngôi Trung cung. Các phụ tuyến là việc nhờ, sự kiện, mưu sự ở các mục khác.`)
  .replace(/Còn khoảng \d+ chương phía trước\./,F.left?`Còn ${F.left} chương phía trước.`:"");
 h+=rows67(F.rows)}catch(e){console.error(e)}return h}})();
/* OD:L1247 (owner 16/11 08:40Z): a person a road involves REALLY exists in the palace with the same name and identity, and a hostile role is
   REAL in the relationship system. In a 14-chapter life: (1) the live consort cast into an arc role ("v", "v2", castRv67) that the table below
   marks hostile gets real ill will both ways (relAdd: thiện cảm down, oán up, j9) once, when cast; (2) the family enemy of the td road (S.foe, j4)
   is that same live consort, marked hostile in both directions.
   F14ROLE (fix r1 item 3: was a keyword scan of the arc text, which hit the debtor of muoi_no and missed nothing-but-string beats): one entry per
   cast role of every arc, read role by role from the arc text; 1 = she stands against the player from the start (frames, slanders, mocks,
   spies on, blackmails her or her house), 0 = a rival, a suitor of an alliance, a debtor, a victim, a curious one: no hatred until play makes it.
   Every role an arc's text uses must be in this table (dev/test/story14-frame.js checks it), so a new arc is reviewed role by role. */
const F14ROLE={tt_co:{v:1},tt_oan:{v:1},tt_tranh:{v:0},tt_mat:{v:0},dtq_bien:{v:1},dtq_vu:{v:1},dtq_huynh:{v:1},
 muoi_tuoc:{v:1},muoi_lau:{v:1},muoi_doi:{v:0},muoi_no:{v:0},cn_chu:{v:1},cn_than:{v:1},ch_benh:{v:0},ch_ho:{v:0},ch_bi:{v:0},
 thd_tho:{v:1},thd_tro:{v:0},thd_hoc:{v:0},cnv_mat:{v:0},s_than:{v:1},s_thu:{v:1,v2:0},s_hoa:{v:1},s_dich:{v:1},s_ban:{v:1,v2:1},
 st_the:{v:0,v2:1},st_con:{v:1},st_dong:{v:1},tm96b:{v:1},tm96c:{v:1}};
window.F14ROLE=F14ROLE;
function f14Hostile(A,k){try{return !!(A&&F14ROLE[A.a]&&F14ROLE[A.a][k]===1)}catch(e){return false}}
/* hate for real: both sides' thiện cảm drop by at least hate.min (j9 relAdd also raises oán both ways) */
function f14Hate(v){if(!v)return;const H=BAL.st14.hate;const m=Math.max(aff(S,v)||0,aff(v,S)||0);relAdd(S,v,-Math.max(H.min,H.base+m))}
/* a hostile role takes, when it can, someone who is not already her friend (thiện cảm under hate.friend both ways) */
(function(){const c0=castRv67;castRv67=function(A,k,f){if(!f14()||!A||!f14Hostile(A,k))return c0.apply(this,arguments);const F=BAL.st14.hate.friend;
 let r=c0.call(this,A,k,v=>(!f||f(v))&&(aff(S,v)||0)<F&&(aff(v,S)||0)<F);if(!r)r=c0.apply(this,arguments);
 try{if(r&&!(A.host14||{})[k]){const v=rv67(A,k);if(v){A.host14=A.host14||{};A.host14[k]=v.id;f14Hate(v)}}}catch(e){console.error(e)}return r}})();
(function(){const n0=newThread67;newThread67=function(id,kind){const A=n0.apply(this,arguments);try{if(A&&f14())for(const k of ["v","v2"]){if(A.act&&A.act[k]!=null&&!(A.host14||{})[k]){const v=rv67(A,k);if(v&&f14Hostile(A,k)){A.host14=A.host14||{};A.host14[k]=v.id;f14Hate(v)}}}}catch(e){console.error(e)}return A}})();
function f14Foe(){try{if(!f14()||!S.foe)return;const e=rivals.find(v=>v.name===S.foe&&v.alive);if(!e||S.st.f14.foe)return;e.enemy=true;f14Hate(e);S.st.f14.foe=e.id}catch(e){console.error(e)}}
(function(){const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);f14Foe();return r}})();
/* OD:L1253 (owner 16/11 07:00Z): the same identity + road + option must not always give the same result across lives. In a 14-chapter life
   the odds of every chancy story option (j67 oOf67, base below 100) move with THIS life's context (BAL.st14.ctx, at most ±cap):
   how the cast person feels about her (thiện cảm, oán), that person's nature, her own Tâm cơ and Đức, and how many consorts bear her a
   grudge (who is watching). f14Parts lists the parts with the words the result card uses to say why an ending turned. */
function f14Parts(A){const P=[];if(!f14())return P;const C=BAL.st14.ctx;try{const v=rv67(A,"v")||rv67(A,"v2");
 if(v){const a=cl(Math.round((aff(v,S)||0)/C.aff),-C.affCap,C.affCap),o=cl(Math.round((oan(v,S)||0)/C.oan),0,C.oanCap),t=BAL.st14.tr[v.trait]||0;
  if(a)P.push([a,a>0?`${v.name} có thiện cảm với ta`:`${v.name} không ưa ta`]);if(o)P.push([-o,`${v.name} oán ta`]);if(t)P.push([t,`${v.name} tính ${String(v.trait).toLowerCase()}`])}
 const tm=Math.round(((S.tamco||0)-C.tam[0])/C.tam[1]),du=Math.round(((S.duc||0)-C.duc[0])/C.duc[1]);
 if(tm)P.push([tm,tm>0?"Tâm cơ của ta đủ sâu":"Tâm cơ của ta còn non"]);if(du)P.push([du,du>0?"Đức của ta được người kính":"Đức của ta còn mỏng"]);
 const foes=liveRivals(true).filter(x=>(oan(x,S)||0)>=C.foeOan).length;if(foes)P.push([-Math.min(C.foeCap,foes),`${f14Nv(foes)} người trong cung oán ta, đang dõi theo`])}catch(e){}return P}
function f14Ctx(A){if(!f14())return 0;const C=BAL.st14.ctx;return cl(f14Parts(A).reduce((s,x)=>s+x[0],0),-C.cap,C.cap)}
(function(){const o0=oOf67;oOf67=function(A,o,b){const x=o0.apply(this,arguments);if(!f14()||o.o==null||x>=100)return x;const O=BAL.st14.odds;return cl(Math.round(x+f14Ctx(A)),O[0],O[1])}})();
window.f14Ctx=f14Ctx;
/* OD:L1253 for endings no roll decides: an option whose ending is the same whether it succeeds or fails (sure, or o.e one key), or a chapter that
   ends on the tally of Lợi thế (scEnd67) after such an option. The ending still reads this life's context: c = f14Ctx + (Lợi thế − 1) × shift.sc
   sets the chance that the ending moves one step (win→mid→lose worse, lose→mid→win better): worse = base − c × slope, better = base + c × slope,
   each between min and max (BAL.st14.shift; the same base both ways, so a neutral life leans neither way). Only where the arc has that ending.
   The option preview prints how sure the ending is (f14Hold → the odds word, j67 PEND.j67) and the chapter-end card says why it turned. */
function f14Odds(A,k){const Z=BAL.st14.shift;const E=ARC67[A.a].E;const c=f14Ctx(A)+((A.sc||0)-1)*Z.sc;
 const dn={win:"mid",mid:"lose"},up={mid:"win",lose:"mid"};const pd=dn[k]&&E[dn[k]]?cl(Z.base-c*Z.slope,Z.min,Z.max):0,pu=up[k]&&E[up[k]]?cl(Z.base+c*Z.slope,Z.min,Z.max):0;
 return {pd,pu,dn:dn[k],up:up[k]}}
function f14Hold(A,k){try{if(!f14()||!A||!ARC67[A.a])return 100;const r=f14Odds(A,k);return 100-r.pd-r.pu}catch(e){return 100}}
window.f14Hold=f14Hold;
function f14Shift(A,k){try{const r=f14Odds(A,k),x=rnd67()*100;if(x<r.pd)return r.dn;if(x>=100-r.pu)return r.up}catch(e){}return k}
/* why it turned: the strongest part of the context on the side it turned to (or Lợi thế) */
function f14Why(A,worse){const P=f14Parts(A).filter(x=>worse?x[0]<0:x[0]>0).sort((a,b)=>Math.abs(b[0])-Math.abs(a[0]));const sc=A.sc||0;
 if(P.length)return P[0][1];if(worse&&sc<1)return"ta chưa gom được Lợi thế nào";if(!worse&&sc>1)return"Lợi thế ta gom được";return"lòng người khó đoán, việc đã định vẫn có thể đổi"}
(function(){const r0=res67;res67=function(tk,bid,i,odds){const A=th67(tk);
 if(A&&f14()){let o=null;try{o=A.cur===bid?opts67(A,beatDef67(A,bid))[i]:null}catch(e){}const e=o&&o.e;A.s14=odds>=100||!e||typeof e==="string"||(Array.isArray(e)&&e[0]===e[1])?1:0}
 try{return r0.apply(this,arguments)}finally{if(A)A.s14=0}}})();
(function(){const e0=end67;end67=function(A,k,ign){if(!(f14()&&!ign&&A&&A.s14))return e0.call(this,A,k,ign);A.s14=0;
 const E=ARC67[A.a].E,k0=E[k]?k:Object.keys(E)[0],k1=f14Shift(A,k0);if(k1===k0)return e0.call(this,A,k0,ign);
 const worse=({win:"mid",mid:"lose"})[k0]===k1;const why=f14Why(A,worse);
 const row=["Xoay chiều",`Tưởng đã định «${fill67(E[k0].tag,A)}», nay thành «${fill67(E[k1].tag,A)}»: ${why}.`,worse?"r":"g"];A.turn14=[k0,k1];
 const c0=card67;card67=function(kind,t,rows,...more){if(kind==="result"&&Array.isArray(rows)){rows=rows.slice();const j=rows.findIndex(x=>x&&x[0]==="Kết cục");rows.splice(j+1,0,row);card67=c0}return c0.call(this,kind,t,rows,...more)};
 try{return e0.call(this,A,k1,ign)}finally{card67=c0;try{log(`<span class="${worse?"r":"g"}">Kết cục xoay chiều: ${why}.</span>`)}catch(e){}}}})();
