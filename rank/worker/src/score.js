/* ================= CÔNG DANH — the ONE rule table of the leaderboard (dev/LEADERBOARD.md) =================
   Used by BOTH the game (dev/build/assemble.py concatenates this file, a plain script) and the Worker ctm-rank
   (rank/worker/src/index.js imports it). No import/export: it only sets globalThis.CTM_RANK.
   The Worker never trusts a score sent by the game: it re-checks the life summary (check) and re-computes the score (score).
   Changing a number here = bump RULES.ver; the Worker re-scores every stored life from its summary on the next start. */
var CTM_RANK=(function(){
const RULES={
 ver:1,
 /* phẩm cao nhất (highest standing reached in this life) */
 consortN:["Đáp ứng","Thường tại","Quý nhân","Tần","Phi","Quý phi","Hoàng quý phi","Hoàng hậu"],
 consort:[100,200,350,550,800,1100,1500,2200],
 servantN:["Cung nữ thô sử","Cung nữ","Đại cung nữ","Chưởng sự cô cô","Nữ quan"],
 servant:[20,40,70,110,160],
 /* kết cục (the headline of the end card) → bonus; any ending not listed (deaths, lãnh cung, bị đuổi…) = 0 */
 end:{"Nữ đế":4000,"Hoàng thái hậu":2500,"Mẫu hậu Hoàng thái hậu":1800,"Thái phi":400,
  "Được Vương gia che chở":600,"Thành thân":250,"Được ban hôn":250,"Vào vương phủ":250,"Xuất giá":200,
  "Xuất cung":150,"Ma ma":150,"Xuất gia":150},
 rare:600,            // kết cục hiếm (Cơ duyên hiếm) found in this life
 year:40,yearCap:40,  // each full year lived in the palace (at most 40)
 son:120,dau:80,kidCap:12,   // each prince / princess born (at most 12 children)
 tz:500,tzCap:3,      // each of her sons made Thái tử (at most 3)
 danh:3,duc:3,        // Danh and Đức at the end, each counted 0..100
 tg:100,tgCap:5,      // each Tranh ghế won (at most 5)
 partial:.5,          // kiếp dở dang (under 1 year AND below Quý nhân / Chưởng sự cô cô): everything ×0.5
  max:15000,           // a summary scoring above this is refused
 origins:{tt:"Con gái Tể tướng",dtq:"Con gái Đại tướng quân",muoi:"Con gái nhà buôn muối",cn:"Cung nữ được sủng hạnh",
  nc:"Công chúa nước Nam Chiếu hòa thân",td:"Con gái tội thần",thd:"Con gái thầy đồ nghèo",ch:"Cháu gái Thái hậu",cnv:"Cung nữ tuyển vào cung"}
};
const I=(v,d)=>{v=Number(v);return isFinite(v)?Math.round(v):(d===undefined?NaN:d)};
const C=(v,a,b)=>Math.max(a,Math.min(b,v));
function txt(s,n){return String(s==null?"":s).replace(/[\u0000-\u001f<>]/g,"").replace(/\s+/g," ").trim().slice(0,n||60)}
/* the highest standing as a name (consort rank wins over a servant title once she has risen) */
function phamName(L){const mr=I(L.mr,-1),sr=I(L.sr,-1);if(mr>=0)return RULES.consortN[C(mr,0,7)];if(L.mama)return"Ma ma";if(sr>=0)return RULES.servantN[C(sr,0,4)];return"Cung nữ"}
function partial(L){return I(L.y,0)<1&&I(L.mr,-1)<2&&I(L.sr,-1)<3}
/* sanity of a summary: null = fine, else a short reason (the Worker refuses the life) */
function check(L){if(!L||typeof L!=="object")return"no life";
 const mr=I(L.mr),sr=I(L.sr),y=I(L.y),age=I(L.age),a0=I(L.age0),so=I(L.sons),da=I(L.daus),tz=I(L.tz,0),tg=I(L.tg,0);
 if(!(mr>=-1&&mr<=7))return"mr";if(!(sr>=-1&&sr<=4))return"sr";if(mr<0&&sr<0&&!L.mama)return"no standing";
 if(!(y>=0&&y<=60))return"years";if(!(age>=12&&age<=100))return"age";if(!(a0>=12&&a0<=40))return"age0";
 if(age<a0||age-a0>y+1||age-a0<y-1)return"age vs years";
 if(!(so>=0&&so<=20&&da>=0&&da<=20))return"kids";if(so+da>Math.floor(y*1.5)+2)return"kids vs years";
 if(!(tz>=0&&tz<=so))return"tz";if(!(tg>=0&&tg<=20))return"tg";
 for(const k of ["danh","duc"]){const v=I(L[k]);if(!(v>=-500&&v<=1000))return k}
 const e=txt(L.endk,40);if(!e)return"ending";
 if((e==="Hoàng thái hậu")&&(so<1||mr<0))return"ending needs a son";
 if((e==="Mẫu hậu Hoàng thái hậu"||e==="Nữ đế")&&mr<7)return"ending needs Hoàng hậu";
 if(e==="Thái phi"&&mr<0)return"ending needs a consort";
 if(L.trail!=null){if(!Array.isArray(L.trail)||L.trail.length>80)return"trail";let ky=0,nk=0;
  for(const t of L.trail){if(!Array.isArray(t)||t.length<3)return"trail item";const ty=I(t[0]);if(!(ty>=0&&ty<=y+1)||ty<ky)return"trail order";ky=ty;
   if(t[2]==="r"&&!(I(t[3])<=mr))return"trail rank";if(t[2]==="k")nk++}
  if(nk>so+da)return"trail kids"}
 return null}
/* the score and its parts (labels are shown in "Cách tính" on the board) */
function score(L){const R=RULES,mr=I(L.mr,-1),sr=I(L.sr,-1),e=txt(L.endk,40);
 const pham=Math.max(mr>=0?R.consort[C(mr,0,7)]:0,sr>=0?R.servant[C(sr,0,4)]:0,L.mama?R.servant[3]:0);
 const kids=Math.min(R.kidCap,I(L.sons,0)+I(L.daus,0)),sons=Math.min(I(L.sons,0),kids);
 const parts=[["Phẩm cao nhất",pham],["Kết cục",R.end[e]||0],["Năm trong cung",Math.min(R.yearCap,C(I(L.y,0),0,99))*R.year],
  ["Con cái",sons*R.son+(kids-sons)*R.dau],["Thái tử",Math.min(R.tzCap,C(I(L.tz,0),0,9))*R.tz],
  ["Danh, Đức",C(I(L.danh,0),0,100)*R.danh+C(I(L.duc,0),0,100)*R.duc],["Tranh ghế",Math.min(R.tgCap,C(I(L.tg,0),0,99))*R.tg],
  ["Cơ duyên hiếm",L.rare?R.rare:0]];
 let s=parts.reduce((a,p)=>a+p[1],0);const dd=partial(L);if(dd)s=Math.floor(s*R.partial);
 return{score:s,parts:parts.filter(p=>p[1]),partial:dd}}
return{RULES,check,score,phamName,partial,txt}})();
if(typeof globalThis!=="undefined")globalThis.CTM_RANK=CTM_RANK;
