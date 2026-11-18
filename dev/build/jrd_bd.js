/* ================= jrd_bd: Bắc Địch's OWN four roads (owner OD 18/11 ~22:05Z, GRAND_ENDINGS D2 = (a); ROAD_MAP §4.5b) =================
   bd stays a COUNTRY BRANCH of hòa thân (ORIGIN_BR.bd, KC2LAND.bd, STORY/QUEST67.bd unchanged; land tokens {land} {pv} {mh} {quan} {pa} {pb}
   of jrd_nc NCL.bd). New bd lives roll one of bd_san · bd_soi (this file) · bd_tuyet · bd_hen (jrd_bd2.js): .4 premise arc + .5–.11 + j97 rare
   at .4 + RD97L rare at .11. Numbers: jbalbd.js (ONE CORE). Helpers RDW / rdRel / rdOan / RD_FL from jroad.js / jrd_tt.js (same script).
   LEGACY (law 6c): the old premises bd_hoa / bd_ngua / bd_tuc / bd_hoang (jorigins.js) and their alias chapters (the loop below, moved verbatim
   from jrd_nc.js) stay registered so a saved life on one of them plays on to its .11; they are no longer dealt to NEW lives (BD_OLD filter). */
const BD_OLD=["bd_hoa","bd_ngua","bd_tuc","bd_hoang"];
/* a new life's premise pool (j67 arcIds67 → jst14 roll, j67 phase-1 frame): old bd premises out; saves keep the ids already written in their plan */
(function(){const a0=arcIds67;arcIds67=function(o){const r=a0.apply(this,arguments);if(o!=="bd")return r;const n=r.filter(id=>!BD_OLD.includes(id));return n.length?n:r}/* until a new road exists the old ones stay dealt (no empty pool) */})();
/* ---------- BDP: the steppe people of bd's roads (law 6b, ROAD_MAP §5.4) — one living state per life, kept in the road flag book ----------
   where: "tn" thảo nguyên · "ai" biên ải · "kinh" kinh thành · "nguc" ngục; alive 1/0; met 1 once she has dealt with them. Chapters move them. */
const BDP={lie:{n:"Hô Diên Liệt",r:"thúc phụ",w:"tn"},olac:{n:"Ô Lặc",r:"em trai",w:"tn"},thatmoc:{n:"Thát Mộc",r:"vệ sĩ sứ đoàn",w:"tn"},
 bado:{n:"Ba Đồ",r:"phu ngựa Thượng tứ viện",w:"kinh"},tuyetcau:{n:"Tuyết Câu",r:"ngựa của ngươi",w:"kinh"},
 asnc:{n:"A Sử Na Cát",r:"trưởng lão bộ lạc biên",w:"ai"},phong:{n:"Thác Bạt Phong",r:"người đã đính ước",w:"tn"}};
const bdP=(id,k,v)=>{const key="bd.p."+id+"."+k;if(v!=null)RD_FL(key,v);const x=RD_FL(key);
 if(x)return x;if(k==="alive")return 1;if(k==="w")return BDP[id].w;return 0};
const bdAlive=id=>bdP(id,"alive")!==-1;/* dead = -1 (0 is the book's "unset") */
const bdKill=id=>{bdP(id,"alive",-1);return ""};
const bdMove=(id,w)=>{bdP(id,"w",w);return ""};
const bdMeet=id=>{bdP(id,"met",1);return ""};
/* the .4 rare rows of the bd premises (j97 R97L shape; j97 appends them; numbers BAL.arc.rare.<road>) */
const BD97=[];
RDQ.bdOlac=()=>bdAlive("olac");RDQ.bdLie=()=>bdAlive("lie");

/* ---------- LEGACY: old bd premises play the nc chapters (moved from jrd_nc.js, unchanged) ---------- */
/* Bắc Địch branch: the same chapters under the bd premise ids (road key = the premise rolled for this life).
   Runs at load, before jbal2.js: it walks the registered chapters (ROAD14), not BAL.road. */
(function(){const P={bd_hoa:"nc_su",bd_ngua:"nc_gian",bd_tuc:"nc_tuc",bd_hoang:"nc_vuong"};
 for(const b in P){const r=P[b];for(const n in ROAD14[r]||{}){const id=ROAD14[r][n];
  const {o,road,rn,...d}=ARC67[id];d.rth=d.rth||RTHEME67[id];rdDef(b,+n,d)}
  for(const x of RD97L.filter(x=>x.a===r+"_11"))RD97L.push(Object.assign({},x,{a:b+"_11"}))}})();
