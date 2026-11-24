/* ================= jpal: ai ở cung nào (lệ triều Thanh; sếp sửa 11/14) =================
   - Từ TẦN trở lên làm chủ vị một cung (palHeadOK: bậc >= 3, không phải Hoàng hậu).
   - Chủ vị có người ở chung: Tần (3), Phi (4), Quý phi (5); mỗi chủ vị nhận tối đa BAL.res (1 Đông phối điện + 1 Tây phối điện), người chơi cũng vậy.
   - Hoàng quý phi (6) có cung riêng, ở một mình. Hoàng hậu (7) ở một mình tại Càn Ninh (residents("kn") chỉ còn nàng).
   - Quý nhân, Thường tại, Đáp ứng ở thiên điện dưới một chủ vị; hết chỗ thì ở một mình một cung/điện phụ còn trống (PALN), nhường lại khi có chủ vị cần cung.
   - Tần mới phong mà chưa có cung trống: tạm ở thiên điện một chủ vị, có cung trống thì được dời sang, ghi một dòng. Người chơi: lên Tần là được ban cung (S.palCer, lễ dời cung của j27).
   - Bản đồ có 8 cung phía đông; thêm các cung phía tây của PAL_WEST (khu viện mái xanh cạnh Ngọc Thanh các). PALN = 8 + PAL_WEST = 10 cung
     (owner 18/11 ~19:45Z: bớt 13 → 10; MAIN ROOT-55 bỏ Trữ Tú, Hàm Phúc, Thái Cực điện). 10 ≥ ghế chủ vị của BAL.seat (Tần + Phi + Quý phi) + 1 HQP;
     các cung dư là chỗ ở tạm (palLone). Đổi số cung = sửa MỘT bảng PAL_WEST; không nơi nào gõ số cung.
   - Save có người ở cung đã bỏ (S.pal / v.pal >= PALN.length): palFix dời họ sang cung trống (hay thiên điện), mỗi người một dòng log.
   - Save cũ: palFix chạy khi nạp; ai đang ở dưới HH/HQP (hay sai chỗ) được dời, ghi "… dời sang …". */
/* THE west palace table (name, map x, y). Dropped 18/11: ["Trữ Tú cung",.303,.338],["Hàm Phúc cung",.368,.338],["Thái Cực điện",.368,.455]
   (their old slot indices were 10-12, i.e. the tail, so the 10 kept palaces keep their indices in every save). */
const PAL_WEST=[["Vĩnh Thọ cung",.303,.222],["Dực Khôn cung",.368,.222]];
const PAL_GONE=["Trữ Tú cung","Hàm Phúc cung","Thái Cực điện"]; /* names of the old tail slots, only for the save-migration log line */
PAL_WEST.forEach(([n,x,y],i)=>{
 if(MAPH.rivalSlots.some(s=>s.name===n))return;const s={slot:9+i,name:n,box:{x,y,w:.058,h:.105},anchor:{x:+(x+.029).toFixed(3),y:+(y+.04).toFixed(3)}};MAPH.rivalSlots.push(s);PALN.push(n)});
palHeadOK=function(p){return !!p&&(p===S?!S.out&&!S.dead:p.alive&&!p.out)&&!p.queen&&rkOf(p)>=3};
function palHostOK(p){return palHeadOK(p)&&rkOf(p)<=5&&p.pal!=null}
function palLive(p){return p===S?!!S&&!S.out&&!S.dead:!!p&&p.alive&&!p.out}
houseOf=function(p){if(!p)return null;const r=rkOf(p);if(p===S)return r>=3?key(S):(S.resHead!=null&&byKey(S.resHead)&&palHostOK(byKey(S.resHead))?S.resHead:key(S));
 if(r>=3&&(p.pal!=null||p.queen))return key(p);
 const h=p.resHead!=null&&byKey(p.resHead);if(h&&h!==p&&(h===S?palHostOK(S):palHostOK(h)))return p.resHead;return key(p)};
palFix=function(){if(!S||!rivals)return;rivals.forEach(ensureT2);const all=[S].concat(rivals);
 /* SAVE MIGRATION (13 → 10 palaces): anyone (player or NPC) whose pal points past the palace list is re-housed below like anyone without a
    palace; a chủ vị gets a free palace (no ban-cung ceremony, she did not rise), a lone lower consort a side hall or a free palace. One log line each. */
 const gone=[],goneN={};for(const p of all)if(p.pal!=null&&!(p.pal>=0&&p.pal<PALN.length)){const i=p.pal-PALN.length;const w=PAL_GONE[i]||"cung cũ";gone.push([p,w]);goneN[key(p)]=w;p.pal=null;p.palLone=0}
 /* their side-hall residents (the player below Tần too) move with the house: one log line each as well */
 const goneM=[];for(const y of all){if(!palLive(y)||y.queen||y.resHead==null||goneN[y.resHead]==null||goneN[key(y)]!=null||(rkOf(y)>=3&&y.pal!=null))continue;/* a gone head already has her own line (a stale resHead must not give her a second) */goneM.push([y,goneN[y.resHead]])}
 const S0pc=S.palCer;
 const was=[];for(const p of rivals){if(!palLive(p)||p.queen||p.coop)continue;const h=p.resHead!=null&&byKey(p.resHead);if(h&&(h.queen||rkOf(h)>=6||(h!==S&&!palLive(h))))was.push([p,h.queen?"Càn Ninh cung":goneN[key(h)]||PALN[h.pal]||"cung cũ"])}
 if(S.pal!=null&&!palHeadOK(S)){log(`Ngươi dời khỏi ${PALN[S.pal]}.`);S.pal=null}
 for(const v of rivals)if(v.pal!=null&&!(palHeadOK(v)||(v.palLone&&palLive(v)&&rkOf(v)<3))){v.pal=null;v.palLone=0}
 for(const v of rivals)if(v.pal==null||rkOf(v)>=3)v.palLone=0;
 const occ={};const heads=all.filter(palHeadOK);
 for(const p of heads)if(p.pal!=null){if(occ[p.pal]!=null)p.pal=null;else occ[p.pal]=key(p)}
 for(const v of rivals)if(v.palLone&&v.pal!=null){if(occ[v.pal]!=null){v.pal=null;v.palLone=0}else occ[v.pal]=key(v)}
 const free=()=>PALN.findIndex((_,i)=>occ[i]==null);const moved=[];
 for(const p of heads.slice().sort((a,b)=>rkOf(b)-rkOf(a)))if(p.pal==null){let f=typeof bcGrantIx==="function"?bcGrantIx(p,occ):-1;if(f<0)f=free();/* ban-cung: the decree follows the palace locks + her favour (jbancung), one rule for all */
  if(f<0){const lone=rivals.find(v=>v.palLone&&v.pal!=null);if(lone){f=lone.pal;lone.pal=null;lone.palLone=0;delete occ[f]}}
  if(f<0)continue;p.pal=f;occ[f]=key(p);if(p===S)S.palCer=1;else{if(p.palWait)moved.push(p);p.palWait=0;p.resHead=null}}
 /* SIDE HALLS (owner 17/11 04:08Z/04:20Z, BAL.res): each chủ vị (Tần/Phi/Quý phi, the player too) takes at most resCap() co-residents,
    BAL.res.side in each hall of BAL.res.halls (one room each). The player below Tần is housed exactly like an NPC (no more 'she keeps
    Ngọc Thanh các'); lower ranks go to the chủ vị with the FEWEST co-residents so no palace stands empty while another is full;
    Ngọc Thanh các (her) / a lone empty palace (an NPC, palLone) only when every chủ vị is full. */
 const cap=resCap(),HL=BAL.res.halls,sv=typeof isSrv==="function"&&(()=>{try{return isSrv()}catch(e){return false}})();
 const hs=all.filter(palHostOK);const S0=S.resHead||null;
 const mates=h=>all.filter(y=>y!==h&&palLive(y)&&!y.queen&&y.resHead===key(h)&&!(rkOf(y)>=3&&y.pal!=null)&&!(y===S&&sv));
 const cnt=h=>mates(h).length;
 const hallFix=h=>{const M=mates(h);const n={};for(const x of HL)n[x]=0;const keep=[],redo=[];
  for(const y of M){if(HL.includes(y.resHall)&&n[y.resHall]<BAL.res.side){n[y.resHall]++;keep.push(y)}else redo.push(y)}
  for(const y of redo){const f=HL.find(x=>n[x]<BAL.res.side);y.resHall=f||HL[HL.length-1];if(f)n[f]++}};
 /* co-op (robot-coop-fix-3): the friend's entry (coop) is a PLAYER — her own seat houses her and her house rides her pos relay (jcoopworld
    houseWire/houseIn): like S here, she is never evicted, re-housed, spread or logged by this seat (solo: no coop entry, nothing changes) */
 /* out of the palace (lãnh cung, dead): her side-hall room is given up, so a consort brought back later (đại xá, ân xá, petition) is housed
    fresh here and never walks back into a room someone else now holds (re-merge 18/11: jworld đại xá ran after the month's palFix) */
 for(const p of rivals)if(!palLive(p)&&!p.coop&&(p.resHead!=null||p.resHall!=null)){p.resHead=null;p.resHall=null}
 /* a house over the cap (old saves had 3, a promotion placed someone first): the newest NPC extras leave and are housed again below */
 for(const h of hs){const M=mates(h);if(M.length<=cap)continue;const N=M.filter(y=>y!==S&&!y.coop);for(const y of N.slice(-(M.length-cap))){y.resHead=null;y.resHall=null}}
 const pickHost=p=>{const c=hs.filter(x=>x!==p&&cnt(x)<cap);if(!c.length)return null;const m=Math.min(...c.map(cnt));return pick(c.filter(x=>cnt(x)===m))};
 for(const p of all){if(!palLive(p)||p.queen||p.coop)continue;const r=rkOf(p);
  if(r>=3&&p.pal!=null){p.resHead=null;p.resHall=null;if(p!==S)p.palWait=0;continue}
  if(p===S&&sv){S.resHead=null;continue}
  const h=p.resHead!=null&&byKey(p.resHead);const ok=h&&h!==p&&hs.includes(h);
  if(p===S){if(ok||r>=3){if(!ok)S.resHead=null;continue}S.resHead=null;const c=pickHost(S);if(c){S.resHead=key(c);S.resHall=null;hallFix(c)}continue}
  if(r>=3)p.palWait=1;
  if(ok){if(p.palLone){delete occ[p.pal];p.pal=null;p.palLone=0}continue}
  p.resHead=null;p.resHall=null;if(p.palLone&&p.pal!=null)continue;
  const c=pickHost(p);
  if(c){p.resHead=key(c);hallFix(c)}else if(r<3){const f=free();if(f>=0){p.pal=f;p.palLone=1;occ[f]=key(p)}}}
 for(const v of rivals){if(!v.palLone||!palLive(v)||rkOf(v)>=3||v.coop)continue;const c=pickHost(v);if(c){delete occ[v.pal];v.pal=null;v.palLone=0;v.resHead=key(c);hallFix(c)}}
 /* spread: a chủ vị with nobody while another is full → the newest NPC of the full house moves over (log line) */
 for(let g=0;g<12;g++){const E=hs.filter(x=>cnt(x)===0),F=hs.filter(x=>cnt(x)>=cap);if(!E.length||!F.length)break;const f=F[0],e=pick(E);
  const y=mates(f).filter(x=>x!==S&&!x.coop).pop();if(!y)break;y.resHead=key(e);y.resHall=null;hallFix(e);hallFix(f);try{log(`${RANKS[y.rank].n} ${y.name} dời sang ${houseName(y)}.`)}catch(x){}}
 for(const h of hs)hallFix(h);
 if(!sv&&palLive(S)&&rkOf(S)<3&&S.resHead!==S0){try{if(S.resHead)log(`Ngươi được xếp ở ${palName("home")}.`);else if(S0)log(`Ngươi dời về ${HOMEN}.`)}catch(x){}}
 for(const p of moved)try{log(`${RANKS[p.rank].n} ${p.name} có cung trống, được dời sang ${PALN[p.pal]}.`)}catch(e){}
 for(const [p,w] of was){if(!palLive(p))continue;try{log(`${p.name} dời khỏi ${w}, dời sang ${houseName(p)}.`)}catch(e){}}
 if(gone.some(g=>g[0]===S))S.palCer=S0pc;
 for(const [p,w] of gone.concat(goneM.filter(([y])=>!was.some(x=>x[0]===y)))){if(!palLive(p))continue;try{log(p===S?`${w} đóng cửa; ngươi dời sang ${houseName(S)}.`:`${w} đóng cửa; ${RANKS[p.rank].n} ${p.name} dời sang ${houseName(p)}.`)}catch(e){}}};
/* palaceOf: j27's "lower consort under the queen = Càn Ninh" exception can no longer fire (palFix never puts anyone under the queen),
   so the j9/j27 palaceOf is kept as it is. (An earlier override here answered "home" for anyone without a house, e.g. servants,
   and so seated them in HER palace: measured, it halved her climb; see BALANCE_REPORT.) */
/* the plan list: a Tần is a chủ vị too; a lone lower consort holds a side palace */
(function(){const p0=places;places=function(){const L=p0.apply(this,arguments);try{for(const x of L){if(x.sc!=="rv"||!x.v)continue;const hd=x.v,r=rkOf(hd);
  if(r>=3&&/^Ở thiên điện/.test(x.d||""))x.d=x.d.replace(/^Ở thiên điện/,`Chủ vị ${RANKS[hd.rank].n} ${hd.name}`);
  else if(hd.palLone&&/^Ở thiên điện/.test(x.d||""))x.d=x.d.replace(/^Ở thiên điện/,`${RANKS[hd.rank].n} ${hd.name} ở tạm (cung còn trống)`)}}catch(e){}return L}})();
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{palFix()}catch(e){console.error(e)}return r}})();
