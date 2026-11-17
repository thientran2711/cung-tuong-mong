/* ================= jnpcd: NPC DEATH → NEW FACES + PHẾ PHI HỌ LÝ (D4, orphan audit #18, review/npc-death) =================
   Owner 15/11 ~20:40Z (OD:L641–643):
     - Lãnh cung: when a real rival is sent to the cold palace, Phế phi họ Lý STAYS too (two people there). She only leaves when she dies.
     - ALL NPCs can die. After a death: maids and eunuchs are replaced right away by a NEW person (new face/picture — never reuse the dead
       person's picture); some posts have no replacement (e.g. Phế phi họ Lý in lãnh cung: empty until a real person arrives).
     - Phế phi họ Lý gets her own story line (a real side-story quest) → the 3-part Tâm nguyện line already lives in jreign (rgl_ly1–3).
   Built ON jmort (BAL.mort lifespans; its kill() calls npcRetire / npcRoleGone / npcFreshName / lyDie below).
   1. RETIRED FACES (whole family, LUẬT SỬA CẢ NHÓM): a person who leaves for good (death in jmort, a servant beaten to death, a maid who
      flees, any servant who vanishes from every palace) has their portrait (fc), full-body figure (fid) and name retired:
      S.fdead / S.fidDead / S.dnames (newest BAL.mort.dead.keep). drawF never hands a retired portrait to anyone (facesPresent counts them),
      figPick never hands a retired figure (they stay in figUsed), new maids / officials never take a dead person's name.
      A new person with no portrait left in the pool keeps an empty fc → the kit fallback (silhouette / initial), never the dead's picture.
      Children: a new child's figure variant avoids the variants of dead children of the same sex while another is free.
   2. ROLE QUESTS: when the person in a post (her cung nữ thân cận, Tổng quản, Thái y, Kính sự phòng) dies, that person's Việc nhờ and
      Tâm nguyện end with them (the new person does not inherit a stranger's wish).
   3. PHẾ PHI HỌ LÝ: one world person (S.lyF), created at the start / on load, ages each year, rolls a lifespan in jmort (floor
      BAL.mort.ly.floor years) and dies like everyone; Trường Môn viện shows her beside fallen rivals (lcPeople, jly) and nobody after her death.
   Co-op: S.lyF / S.fdead / S.fidDead / S.dnames are world keys (jcoopworld W_KEYS); her death rolls on the host only (jmort worldPeople). */
(function(){if(typeof BAL!=="object"||!BAL.mort)return;const M=BAL.mort;const KEEP=()=>(M.dead&&M.dead.keep)||400;
const push=(k,v)=>{if(!v||!S)return;const L=S[k]=S[k]||[];if(!L.includes(v)){L.push(v);if(L.length>KEEP())L.shift()}};
/* retire one person's face, figure and name */
window.npcRetire=function(p){try{if(!p||p===S)return;push("fdead",p.fc);push("fidDead",p.fid);push("dnames",p.name);
 if(p.fid&&typeof figUsed==="function"){const U=figUsed();if(!U.includes(p.fid))U.push(p.fid)}}catch(e){}};
/* a name from L that no living or dead holder carries (prefix = title before the name, for officials) */
window.npcFreshName=function(L,not,prefix){const D=new Set((S&&S.dnames)||[]);(not||[]).forEach(n=>D.add(n));const pre=prefix||"";
 const live=new Set();try{if(S.maid)live.add(S.maid.name);(typeof allServ==="function"?allServ():[]).forEach(s=>live.add(s.name));for(const k in (S.court||{}))live.add(S.court[k].name)}catch(e){}
 const ok=L.filter(n=>!D.has(n)&&!D.has(pre+n)&&!live.has(pre+n)&&!live.has(n));if(ok.length)return pick(ok);
 const ok2=L.filter(n=>!(not||[]).includes(n)&&!live.has(pre+n)&&!live.has(n));return pick(ok2.length?ok2:L)};
/* the person in a post died: their requests and life-goal line end with them */
window.npcRoleGone=function(k){try{if(!S||!k)return;if(S.rgL&&S.rgL[k])delete S.rgL[k];
 if(typeof q72!=="function")return;const q=q72();if(!q)return;const T=typeof T72I==="object"?T72I:{};
 for(const x of q.a.slice())if(x.rk===k||x.bk===k){try{q72End(x,"gone")}catch(e){const i=q.a.indexOf(x);if(i>=0)q.a.splice(i,1)}
  try{log(`Việc nhờ "${T[x.tid]?plain(T[x.tid].t).replace(/\{[AB]\}/g,"người ấy"):""}" dừng lại: người nhờ đã qua đời.`)}catch(e){}}
 q.ch=q.ch.filter(f=>f.rk!==k);if(q.d&&k in q.d)delete q.d[k]}catch(e){}};
/* retired portraits count as present: drawF (both passes) never draws them for anyone */
(function(){const f0=facesPresent;facesPresent=function(){const U=f0.apply(this,arguments);try{(S&&S.fdead||[]).forEach(f=>U.add(f));/* r1: men killed outside jmort (xử trảm, đày, j22/j24/j42/j96) and dead men in old saves keep their face */(S&&S.men||[]).forEach(m=>{if(m&&m.alive===false&&m.fc)U.add(m.fc)})}catch(e){}return U}})();
/* retired figures stay in figUsed even if a transfer frees them */
(function(){if(typeof figPick!=="function")return;const p0=figPick;figPick=function(who){try{if(S&&S.fidDead&&S.fidDead.length&&!(who&&who.fid)){const U=figUsed();for(const k of S.fidDead)if(!U.includes(k))U.push(k)}}catch(e){}return p0.apply(this,arguments)}})();
/* children: a new child's figure variant avoids dead same-sex children's variants while one is free */
(function(){if(typeof kidVar!=="function")return;const v0=kidVar;kidVar=function(k){const r=v0.apply(this,arguments);try{const all=allKids().map(([x])=>x).filter(x=>x!==k&&x.sex===k.sex&&x.fv);
 const live=new Set(all.filter(x=>x.alive).map(x=>x.fv)),dead=new Set(all.filter(x=>!x.alive).map(x=>x.fv));if(r&&dead.has(r)){const c=[1,2,3,4].filter(v=>!live.has(v)&&!dead.has(v));if(c.length)return pick(c)}}catch(e){}return r}})();
/* new maids never take a dead maid's name (every newMaid caller: jmort, j8 flight, j42 new life) */
(function(){if(typeof newMaid!=="function")return;const n0=newMaid;newMaid=function(name,loyal,age){try{if(S&&S.dnames&&S.dnames.includes(name))name=npcFreshName(MAIDS,[name])}catch(e){}return n0.call(this,name,loyal,age)}})();
/* WHOLE FAMILY: a servant / maid who vanishes from every palace during a turn AND whose name the turn's text links to a death
   (beaten to death in Thận Hình ti, poisoned, any path outside jmort) is retired too. One who only moved palace, went back to the
   Nội vụ phủ pool, was married off or fled stays a living person: not retired (her face can come back with her). */
const DEATH=/(qua đời|chết|mất vì|không qua khỏi|tự vẫn|tắt thở|lìa đời)/;
function servSnap(){const L=new Set();try{if(S.maid&&typeof S.maid==="object")L.add(S.maid);(typeof allServ==="function"?allServ():[]).forEach(s=>L.add(s));
 for(const p of rivals||[])for(const s of (p&&p.staff)||[])L.add(s)}catch(e){}return L}
function diedIn(txt,n){if(!n)return false;let i=txt.indexOf(n);while(i>=0){if(DEATH.test(txt.slice(i+n.length,i+n.length+60).split(/[.!]/)[0]))return true;i=txt.indexOf(n,i+1)}return false}
function sweep(before,txt){try{const now=servSnap();for(const s of before)if(!now.has(s)&&!s.coop&&diedIn(txt,s.name))npcRetire(s)}catch(e){}}
function watched(f0){return function(){if(!S||S.dead)return f0.apply(this,arguments);const b=servSnap();const L=[];const l0=log;
 log=function(t){try{L.push(String(t))}catch(e){}return l0.apply(this,arguments)};let r;try{r=f0.apply(this,arguments)}finally{log=l0}
 if(S&&!S.dead)sweep(b,(L.join(" ")+" "+(typeof r==="string"?r:"")).replace(/<[^>]+>/g,""));return r}}
window.__npcdWatch=watched;endTurn=watched(endTurn);
if(typeof monthTick==="function")window.monthTick=monthTick=watched(monthTick);
/* a person with no portrait left whose fallback picture is a retired face shows the kit silhouette (img/kit/unknown-f|m), never the dead's face */
(function(){const f0=fsrc;fsrc=function(fc,fb){const r=f0.apply(this,arguments);try{if(!fc&&fb&&S&&S.fdead&&S.fdead.length){const m=/^img\/(face-[^/]+)\.webp$/.exec(fb);
 if(m&&S.fdead.includes(m[1]))return (typeof KIT_DIR==="string"?KIT_DIR:"img/kit/")+(/maid|woman|mama|consort|th/.test(m[1])?"unknown-f":"unknown-m")+".webp"}}catch(e){}return r}})();
/* r1 (whole family, names): new consorts (freshName → namesInUse) also avoid the j59 personal names of Phế phi họ Lý and the court officers and the
   names of the dead, so no two people share a given name (j61 masks a stranger's given name inside the other's: "Lý Đáp ứng ???") */
(function(){if(typeof namesInUse!=="function")return;const n0=namesInUse;namesInUse=function(){const a=n0.apply(this,arguments);try{if(S){if(S.lcfPn)a.push(S.lcfPn);
 const C=S.court||{};for(const k in C)if(C[k]&&C[k].pn)a.push(C[k].pn);(S.dnames||[]).forEach(n=>{if(n&&String(n).split(" ").length>=3)a.push(n)})}}catch(e){}return a}})();
/* old saves (and any start where Lý was named before the rivals): if her given name is a living consort's, she gets a fresh j59 name */
window.lyNameFix=function(){try{if(!S||!S.lcfPn||typeof window.j59gen!=="function")return;const g=S.lcfPn.split(" ").slice(-2).join(" ");
 if((rivals||[]).some(v=>v&&v.name&&v.name!==S.lcfPn&&v.name.split(" ").length>=3&&v.name.endsWith(" "+g))){const o=S.lcfPn;delete S.lcfPn;S.lcfPn=window.j59gen(["Lý"],(window.J59N&&J59N.FAL)||[]);if(!S.lcfPn)S.lcfPn=o}}catch(e){}}
/* ---------- Phế phi họ Lý ---------- */
window.lyDie=function(p,why){if(!p||p.dead)return "";p.dead=1;p.dY=S.year;const L=S.rgL&&S.rgL.ly;const cleared=p.cleared||(L&&L.done);
 /* a cold-palace death (the jmort accident texts — Nam Uyển, yến tiệc — do not fit a prisoner) */
 const how=pick(["lâm bệnh, không thuốc thang,","nhiễm phong hàn giữa đêm đông,","trượt chân bên giếng cạn trong viện,"]);
 const t=`Phế phi ${S.lcfPn||"họ Lý"} ${how} qua đời ở Trường Môn viện, thọ ${p.age} tuổi.`+(cleared?" Án oan năm xưa đã được rửa, bà nhắm mắt thanh thản.":L&&L.st?" Tâm nguyện rửa oan của bà chưa thành.":" Không ai đến nhận thi hài.");
 try{if(L&&!L.done)delete S.rgL.ly}catch(e){}
 return `<span class="r">${t}</span> `};
/* she exists from the first day (so she ages and rolls a lifespan), on new games and old saves alike */
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&typeof lyFallen==="function")lyFallen();if(typeof j59CourtNames==="function")j59CourtNames();lyNameFix()}catch(e){}return r}})();
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(S&&typeof lyFallen==="function")lyFallen();lyNameFix()}catch(e){}return r}})();
(function(){const a0=ageYear;ageYear=function(){const r=a0.apply(this,arguments);try{const y=S&&S.lyF;if(y&&!y.dead&&!y.freed&&(!window.COOPW||!COOPW.on||COOPW.seat==="a"))y.age=(y.age||M.ly.age)+1}catch(e){}return r}})();
})();
