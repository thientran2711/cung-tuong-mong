/* ================= jlooks: NEW LOOKS — makeup smudge, outfit stains, ink smear, chickenpox + smallpox marks, LAYER LAW, live emotion faces =================
   Owner OD tail '(17/11 ~16:20Z real' item (g) (override of the freeze), design: dev/handover/reports/looks-2.md (handover branch). Numbers: BAL.looks.
   ONE rule for everyone (OD:L1154): every state sits on the person object and shows through the shared face-fx registry (jface KIT_FACEFX), so her,
   consorts, servants, court, Thái hậu, Hoàng thượng and children follow the same code. Hoàng thượng / Thái hậu are never the TARGET of the two harm acts.
   States (old saves: none):
     smudge  "Phấn son lem nhem"  — rain without cover (umbrella / áo tơi / a maid holding the umbrella / kiệu = only a chance), "Hắt nước trà", crying.
                                    Women only (men wear no makeup). Her: only when today's toilette has makeup.
     ink     "Mặt dính mực"       — the act "Tẩm mực khăn mặt".
       smudge + ink live in the day's toilette record when there is one (p.toilette.lk), else in p.lk for this tuần: redoing the makeup (a new record)
       or the next tuần washes them off.
     stain   "Áo ướt" / "Áo loang vết trà" (p.stain) — rain / tea; wet dries after BAL.looks.stain.dryBuoi buổi; changing the outfit or the next tuần clears both.
     thủy đậu (ILL.thuydau, j13 pipeline, spring, contagious, never deadly) + đậu mùa (existing) → face marks (entry "pox").
   Pictures: Foreman C (Magnific gpt-2-6; OD:L1196 no code-drawn effects). A slot draws NOTHING until its file is listed in LOOKS_ART.
   LAYER LAW (owner: marks sit ON TOP of the makeup, never erase it): the last kitFxLayers wrap hoists every makeup tag (img.kmkl) to the bottom of
   the face box; marks keep their registry z (ill 10 < doc 12 < rash 20 < pox 22 < smudge 24 < ink 26 < slap 30) < scar < veil. ================= */
Object.assign(BAL,{looks:{
 smu:{rain:[0,100,100,100],gear:[0,35,50,70],help:[0,30,45,60],kieu:5,snow:[0,15,25,40],cry:70,sac:[0,3,6]},
 stain:{rain:[0,60,85,100],gear:[0,20,35,50],kieu:0,dryBuoi:2,sac:{uot:2,tra:4}},
 tea:{o:55,duc:-3,sevW:[.6,.4],ev:-4,w:1},
 ink:{o:45,duc:-4,sac:5,ev:-6,w:.8,see:40},
 pox:{thuydau:{sea:["Xuân"],cont:1,die:0},sac:{thuydau:[0,3,5,8],daumua:[0,6,10,14]},spread:35,spreadWk:3},
 emoFace:{v:40}}});
/* files Foreman C has delivered AND the owner approved: flip one line per file (never a code drawing in their place) */
window.LOOKS_ART={};
function lkArt(f){return !!(window.LOOKS_ART&&LOOKS_ART[f])}
function lkB(){return BAL.looks}
function lkAbsBuoi(){try{return wk()*((typeof BUOI!=="undefined"&&BUOI.length)||3)+((S&&S.buoi)|0)}catch(e){return 0}}
function lkLive(p){try{return !!p&&KIT_FACEFX.live(p)}catch(e){return false}}
function lkKind(p){return KIT_FACEFX.kind(p)}
function lkFemale(p){try{if(p===S)return true;return personRoleRank(p).sex==="f"}catch(e){return false}}
function lkProtected(p){const k=lkKind(p);return k==="emp"||k==="thaihau"}
/* wearing makeup now: her = today's toilette has makeup; co-op friend = her record; every other woman = painted made-up */
function lkMadeUp(p){if(!lkFemale(p))return false;try{if(p===S||p.coop){const t=p===S?toilToday(S):toilFriendRec(p);return !!(t&&t.makeup)}}catch(e){return false}return true}
/* where smudge / ink live: today's toilette record when there is one, else p.lk for this tuần */
function lkRec(p){const t=p&&p.toilette;return t&&typeof t==="object"&&t.wk===wk()?t:null}
function lkGet(p){if(!p)return null;const t=lkRec(p);if(t)return t.lk||null;const L=p.lk;return L&&L.w===wk()?L:null}
function lkPut(p,k,v){const t=lkRec(p);if(t){t.lk=t.lk||{};t.lk[k]=v;return}if(!p.lk||p.lk.w!==wk())p.lk={w:wk()};p.lk[k]=v}
function lkSmuOf(p){const L=lkGet(p);return L&&L.smu&&lkMadeUp(p)?L.smu:null}
function lkInkOf(p){const L=lkGet(p);return L&&L.ink?L.ink:null}
function lkStainOf(p){const z=p&&p.stain;if(!z||z.w!==wk())return null;if(z.k==="uot"&&lkAbsBuoi()-(z.at|0)>=lkB().stain.dryBuoi)return null;return z}
function lkWho(p){return p===S?"Ngươi":fxName(p)}
/* ---------- give ---------- */
function lkSmudge(p,sev,why,by){if(!lkLive(p)||!lkMadeUp(p))return"";sev=cl(sev|0||1,1,2);const o=lkSmuOf(p);if(o&&o.sev>=sev)return"";
 lkPut(p,"smu",{sev,why:why||"",by:fxKey(by),at:lkAbsBuoi()});
 const t=why==="khoc"?`${lkWho(p)} khóc, nước mắt làm phấn son lem nhem.`:why==="tra"?`Nước trà hắt lên mặt, phấn son của ${p===S?"ngươi":fxName(p)} lem nhem.`:`Mưa ướt mặt, phấn son của ${p===S?"ngươi":fxName(p)} lem nhem.`;
 return t+(p===S||["consort","player"].includes(lkKind(p))?` Sắc −${lkB().smu.sac[sev]} cho tới khi điểm trang lại. `:" ")}
function lkStain(p,k,by){if(!lkLive(p))return"";const o=lkStainOf(p);if(o&&o.k==="tra")return"";p.stain={k,w:wk(),at:lkAbsBuoi(),by:fxKey(by)};
 return k==="tra"?`Áo ${p===S?"ngươi":"của "+fxName(p)} loang vết trà, phải thay y phục mới hết. `:`Áo ${p===S?"ngươi":"của "+fxName(p)} ướt sũng, ${lkB().stain.dryBuoi} buổi mới khô. `}
function lkInk(p,by){if(!lkLive(p))return"";lkPut(p,"ink",{by:fxKey(by),at:lkAbsBuoi()});return `Mặt ${p===S?"ngươi":fxName(p)} dính vệt mực đen, phải rửa mặt điểm trang lại mới sạch. `}
function lkCry(p){if(!lkLive(p))return"";p.lkCry={at:lkAbsBuoi()};return roll(lkB().smu.cry)?lkSmudge(p,1,"khoc"):""}
/* ---------- 1. weather: the one per-person outdoor roll (jweather wxHit, her and every NPC) ---------- */
function lkCover(p,R){try{if(R&&R.kieu)return"kieu";if(wxHasGear(p,"cold"))return"gear";if(wxHelper(p))return"help"}catch(e){}return""}
function lkWx(p,R){if(!p||!R||!R.sev||!lkLive(p))return"";const B=lkB(),sev=cl(R.sev|0,1,3),cov=lkCover(p,R),snow=typeof wxKind==="function"&&wxKind()==="băng tuyết";let r="";
 const cs=cov==="kieu"?B.smu.kieu:snow?(cov?B.smu.kieu:B.smu.snow[sev]):cov==="gear"?B.smu.gear[sev]:cov==="help"?B.smu.help[sev]:B.smu.rain[sev];
 if(lkMadeUp(p)&&roll(cs))r+=lkSmudge(p,sev>=2?2:1,"mua");
 const ct=cov==="kieu"?B.stain.kieu:cov?B.stain.gear[sev]:B.stain.rain[sev];
 if(roll(ct))r+=lkStain(p,"uot");return r}
(function(){if(typeof wxHit!=="function")return;const h0=wxHit;wxHit=function(p,R){let r=h0.apply(this,arguments);try{const x=lkWx(p,R);if(x)r=(r||"")+x}catch(e){console.error("looks wx",e)}return r}})();
/* ---------- 2. crying smudges the makeup: NPC / forced crying (jemoact eaDo khoc / tui / okhoc "khóc") and her own "Khóc thầm" (ventMe) ---------- */
(function(){if(typeof eaDo!=="function")return;const d0=eaDo;eaDo=function(p,r){const out=d0.apply(this,arguments);try{if(p&&r&&/khóc/i.test(String(r.n||""))){const x=lkCry(p);if(x&&(p===S||fxSeen(p)))log(x)}}catch(e){}return out}})();
(function(){if(typeof ventMe!=="function")return;const v0=ventMe;ventMe=function(n,why){const out=v0.apply(this,arguments);try{if(/khóc/i.test(String(why||""))){const x=lkCry(S);if(x)log(x)}}catch(e){}return out}})();
/* ---------- 3. the outfit changes: stains go ---------- */
(function(){for(const fn of ["wdWearEntry","wdApply"]){if(typeof window[fn]!=="function")continue;const f0=window[fn];
 window[fn]=function(p){const r=f0.apply(this,arguments);try{if(p&&p.stain)p.stain=null}catch(e){}return r};
 try{if(fn==="wdWearEntry")wdWearEntry=window[fn];else wdApply=window[fn]}catch(e){}}})();
/* ---------- 4. harm acts (band Hại nhỏ, motive-gated like "Bỏ phấn lạ"; same odds and evidence trail both ways) ---------- */
function lkCanHarm(t){return !!t&&lkLive(t)&&!lkProtected(t)}
function oTea(a){return odA(a,lkB().tea.o+(a.tamco||0)/5)}
function oInk(a){return odA(a,lkB().ink.o+(a.tamco||0)/5+(a.mat||0)*3)}
A("tea","Hắt nước trà",{c:{duc:lkB().tea.duc},ok:(a,t)=>lkCanHarm(t)&&!lkStainOf(t),o:a=>oTea(a),x:"áo nàng loang vết trà, phấn son lem nhem; Sắc giảm tới khi thay áo, điểm trang lại",f:(a,t)=>{
 const B=lkB().tea;if(typeof ducAdd==="function")ducAdd(a,B.duc,"hắt nước trà");else ap(a,{duc:B.duc});a.schemes=(a.schemes||0)+1;
 if(!roll(oTea(a))){evA(t,a,B.ev);return `${NMc(a)} định hắt nước trà vào ${NM(t)}, nhưng ${t===S?"ngươi":"nàng"} tránh kịp. `}
 evA(t,a,B.ev);const sev=roll(B.sevW[0]*100)?1:2;const s=lkSmudge(t,sev,"tra",a)+lkStain(t,"tra",a);
 return `<span class="${t===S?"r":"g"}">${NMc(a)} hắt nước trà vào ${NM(t)} giữa chốn đông người.</span> ${s}`}});
A("ink","Tẩm mực khăn mặt",{c:{duc:lkB().ink.duc},ok:(a,t)=>lkCanHarm(t)&&!lkInkOf(t),o:a=>oInk(a),x:"mặt nàng dính vệt mực, Sắc giảm tới khi rửa mặt điểm trang lại",f:(a,t)=>{
 const B=lkB().ink;if(typeof ducAdd==="function")ducAdd(a,B.duc,"tẩm mực khăn mặt");else ap(a,{duc:B.duc});a.schemes=(a.schemes||0)+1;
 const c=caught(a,t,true,"tẩm mực vào khăn lau mặt của "+NM(t));if(c)return c;
 if(!roll(oInk(a))){if(roll(B.see))evA(t,a,B.ev);return `${NMc(a)} sai người tẩm mực vào khăn mặt của ${NM(t)}, nhưng cung nữ đã thay khăn khác. `}
 return `<span class="${t===S?"r":"g"}">${NMc(t)} lau mặt bằng khăn tẩm mực.</span> ${lkInk(t,a)}`}});
try{AOUT.tea=[`áo nàng loang vết trà, phấn son lem nhem: Sắc giảm tới khi thay áo, điểm trang lại`,"nàng biết là ngươi, oán ngươi"];AOUT.ink=[`mặt nàng dính mực: Sắc −${lkB().ink.sac} tới khi rửa mặt`,"bị lộ: nàng nắm chứng cứ, oán ngươi"]}catch(e){}
try{LACK.tea=t=>t&&lkStainOf(t)?"áo nàng đang lấm":"";LACK.ink=t=>t&&lkInkOf(t)?"mặt nàng đang dính mực":""}catch(e){}
try{ACTDOM.tea="Mưu kế";ACTDOM.ink="Mưu kế";J78VERB.tea="hắt nước trà vào {t}";J78VERB.ink="tẩm mực vào khăn mặt của {t}";HARMK["Hắt nước trà"]="tea";HARMK["Tẩm mực khăn mặt"]="ink"}catch(e){}
try{for(const k of ["tea","ink"]){if(!BANDS[1][2].includes(k))BANDS[1][2].push(k);const g=RVGRP.find(x=>x[0]==="Hại nhỏ");if(g&&!g[1].includes(k))g[1].push(k)}}catch(e){}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{const b=bandOf(danger(v,t));
 if(b>=1)for(const k of ["tea","ink"])if(ACT[k].ok(v,t)){const w=lkB()[k].w*persW(v,k);if(w>0)O.push([k,w])}}catch(e){}return O}})();
/* ---------- 5. thủy đậu: one more illness in the j13 rulebook (spring, contagious, never deadly); servants of a sick house catch it like đậu mùa ---------- */
try{const X=lkB().pox.thuydau;if(typeof ILL==="object"&&!ILL.thuydau)ILL.thuydau={n:"Thủy đậu",sea:X.sea,cont:X.cont,die:X.die}}catch(e){}
(function(){if(typeof catchIll!=="function")return;const c0=catchIll;catchIll=function(p,k){const r=c0.apply(this,arguments);
 try{const B=lkB().pox;if(k==="thuydau"&&p&&p.ill&&p.ill.k==="thuydau"&&Array.isArray(p.staff))for(const s of p.staff)if(!s.ill&&roll(B.spread))s.ill={k:"thuydau",st:1,known:true,until:wk()+B.spreadWk}}catch(e){}return r}})();
/* ---------- 6. the face-fx entries (picture slots wait for Foreman C; chips + Sắc work now) ---------- */
function lkFaceImg(cls,f,st){return st&&lkArt(f)?`<img class="${cls}" src="img/${f}" alt="" aria-hidden="true" style="${kitFxVars(st)}" onerror="this.remove()">`:""}
function lkSquare(file){try{return KIT_RASH.style(file)}catch(e){return""}}
KIT_FACEFX.add({id:"pox",z:22,ready:true,
 state:p=>{const i=fxIll(p);return i&&(i.k==="thuydau"||i.k==="daumua")?{k:i.k,st:cl(i.st|0,1,3)}:null},
 seen:(p,st)=>p===S||fxIllSeen(p)&&fxSeen(p),
 sac:(p,st)=>(lkB().pox.sac[st.k]||[])[st.st]||0,
 chip:()=>null,                                                       /* the illness chip already names it */
 html:(p,file,st)=>lkFaceImg("kpox",`fx-pox-${st.k}-${st.st}.png`,lkSquare(file))});
KIT_FACEFX.add({id:"smu",z:24,ready:true,
 state:p=>lkSmuOf(p),seen:p=>fxSeen(p),sac:(p,z)=>lkB().smu.sac[z.sev]||0,chip:()=>["Phấn son lem nhem","hot"],
 html:(p,file,z)=>lkFaceImg("ksmu",`fx-smudge-${z.sev}.png`,lkSquare(file))});
KIT_FACEFX.add({id:"ink",z:26,ready:true,
 state:p=>lkInkOf(p),seen:p=>fxSeen(p),sac:()=>lkB().ink.sac,chip:()=>["Mặt dính mực","hot"],
 html:(p,file)=>lkFaceImg("kink","fx-ink.png",KIT_FACEFX.cheekBox(file,{dx:.04,dy:.17,sw:.9,sh:.9}))});
KIT_FACEFX.add({id:"stain",z:80,ready:true,                          /* on the robe: needs a body-fit box (KIT REQUEST) → chip + Sắc only for now */
 state:p=>lkStainOf(p),seen:p=>fxSeen(p),sac:(p,z)=>lkB().stain.sac[z.k]||0,chip:(p,z)=>[z.k==="tra"?"Áo loang vết trà":"Áo ướt sũng","hot"],html:()=>""});
KIT_FACEFX.deny.tea={emp:1,thaihau:1};KIT_FACEFX.deny.ink={emp:1,thaihau:1};
/* ---------- 7. LIVE EMOTION FACES: painted whole-portrait variants (Foreman C), swapped in only when the file is in LOOKS_ART ---------- */
const LK_EMO={vui:"vui",buon:"buon",dau:"buon",lo:"buon",so:"buon",gian:"gian",ghen:"hon"};
function looksEmoFace(p){try{if(!p||!lkLive(p))return null;if(p.lkCry&&p.lkCry.at===lkAbsBuoi())return"khoc";const e=typeof emoGet==="function"?emoGet(p):null;
 return e&&e.v>=lkB().emoFace.v&&LK_EMO[e.k]||null}catch(e){return null}}
function lkBaseFile(f){return String(f||"").replace(/~(vui|buon|gian|hon|khoc)(\.[a-z]+)$/,"$2")}
(function(){if(typeof kitFace!=="function")return;const k0=kitFace;kitFace=function(p){const f=k0.apply(this,arguments);try{const key=looksEmoFace(p);if(!key||!f||!f.src)return f;
 const src=String(f.src).replace(/(por-[^/?~]+)(\.webp)/,`$1~${key}$2`);if(src===f.src||!lkArt(kitFile(src)))return f;const g=Object.assign({},f,{src});if(f.__kp)g.__kp=f.__kp;return g}catch(e){return f}}})();
/* ---------- LAYER LAW: one last wrap — fit files by the base picture, every makeup tag to the bottom of the face box ---------- */
(function(){if(typeof kitFxLayers!=="function")return;const f0=kitFxLayers;kitFxLayers=function(p,file){const h=f0.call(this,p,lkBaseFile(file));
 if(!h||h.indexOf("kmkl")<0)return h;const M=[];const rest=h.replace(/<img class="kmkl[^>]*>/g,m=>{M.push(m);return""});return M.join("")+rest}})();
window.lkSmudge=lkSmudge;window.lkStain=lkStain;window.lkInk=lkInk;window.lkCry=lkCry;window.lkSmuOf=lkSmuOf;window.lkInkOf=lkInkOf;window.lkStainOf=lkStainOf;window.looksEmoFace=looksEmoFace;
