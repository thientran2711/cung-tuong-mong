/* ================= jpal: ai ở cung nào (lệ triều Thanh; sếp sửa 11/14) =================
   - Từ TẦN trở lên làm chủ vị một cung (palHeadOK: bậc >= 3, không phải Hoàng hậu).
   - Chủ vị có người ở thiên điện: Tần (3), Phi (4), Quý phi (5); mỗi cung tối đa 3 người.
   - Hoàng quý phi (6) có cung riêng, ở một mình. Hoàng hậu (7) ở một mình tại Càn Ninh (residents("kn") chỉ còn nàng).
   - Quý nhân, Thường tại, Đáp ứng ở thiên điện dưới một chủ vị; hết chỗ thì ở một mình một cung/điện phụ còn trống (PALN), nhường lại khi có chủ vị cần cung.
   - Tần mới phong mà chưa có cung trống: tạm ở thiên điện một chủ vị, có cung trống thì được dời sang, ghi một dòng. Người chơi: lên Tần là được ban cung (S.palCer, lễ dời cung của j27).
   - Bản đồ có 8 cung phía đông; thêm 5 cung phía tây (các khu viện mái xanh trên bản đồ, cạnh Ngọc Thanh các) cho đủ 6 Tần + 4 Phi + 2 Quý phi + 1 HQP.
   - Save cũ: palFix chạy khi nạp; ai đang ở dưới HH/HQP (hay sai chỗ) được dời, ghi "… dời sang …". */
[["Vĩnh Thọ cung",.303,.222],["Dực Khôn cung",.368,.222],["Trữ Tú cung",.303,.338],["Hàm Phúc cung",.368,.338],["Thái Cực điện",.368,.455]].forEach(([n,x,y],i)=>{
 if(MAPH.rivalSlots.some(s=>s.name===n))return;const s={slot:9+i,name:n,box:{x,y,w:.058,h:.105},anchor:{x:+(x+.029).toFixed(3),y:+(y+.04).toFixed(3)}};MAPH.rivalSlots.push(s);PALN.push(n)});
palHeadOK=function(p){return !!p&&(p===S?!S.out&&!S.dead:p.alive&&!p.out)&&!p.queen&&rkOf(p)>=3};
function palHostOK(p){return palHeadOK(p)&&rkOf(p)<=5&&p.pal!=null}
function palLive(p){return p===S?!!S&&!S.out&&!S.dead:!!p&&p.alive&&!p.out}
houseOf=function(p){if(!p)return null;const r=rkOf(p);if(p===S)return r>=3?key(S):(S.resHead!=null&&byKey(S.resHead)&&palHostOK(byKey(S.resHead))?S.resHead:key(S));
 if(r>=3&&(p.pal!=null||p.queen))return key(p);
 const h=p.resHead!=null&&byKey(p.resHead);if(h&&h!==p&&(h===S?palHostOK(S):palHostOK(h)))return p.resHead;return key(p)};
palFix=function(){if(!S||!rivals)return;rivals.forEach(ensureT2);const all=[S].concat(rivals);
 const was=[];for(const p of rivals){if(!palLive(p)||p.queen)continue;const h=p.resHead!=null&&byKey(p.resHead);if(h&&(h.queen||rkOf(h)>=6||(h!==S&&!palLive(h))))was.push([p,h.queen?"Càn Ninh cung":PALN[h.pal]||"cung cũ"])}
 if(S.pal!=null&&!palHeadOK(S)){log(`Ngươi dời khỏi ${PALN[S.pal]}.`);S.pal=null}
 for(const v of rivals)if(v.pal!=null&&!(palHeadOK(v)||(v.palLone&&palLive(v)&&rkOf(v)<3))){v.pal=null;v.palLone=0}
 for(const v of rivals)if(v.pal==null||rkOf(v)>=3)v.palLone=0;
 const occ={};const heads=all.filter(palHeadOK);
 for(const p of heads)if(p.pal!=null){if(occ[p.pal]!=null)p.pal=null;else occ[p.pal]=key(p)}
 for(const v of rivals)if(v.palLone&&v.pal!=null){if(occ[v.pal]!=null){v.pal=null;v.palLone=0}else occ[v.pal]=key(v)}
 const free=()=>PALN.findIndex((_,i)=>occ[i]==null);const moved=[];
 for(const p of heads.slice().sort((a,b)=>rkOf(b)-rkOf(a)))if(p.pal==null){let f=free();
  if(f<0){const lone=rivals.find(v=>v.palLone&&v.pal!=null);if(lone){f=lone.pal;lone.pal=null;lone.palLone=0;delete occ[f]}}
  if(f<0)continue;p.pal=f;occ[f]=key(p);if(p===S)S.palCer=1;else{if(p.palWait)moved.push(p);p.palWait=0;p.resHead=null}}
 const hs=all.filter(palHostOK);const cnt=h=>all.filter(y=>y!==h&&palLive(y)&&y.resHead===key(h)&&!(rkOf(y)>=3&&y.pal!=null)).length;
 for(const p of all){if(!palLive(p)||p.queen)continue;const r=rkOf(p);
  if(r>=3&&p.pal!=null){p.resHead=null;if(p!==S)p.palWait=0;continue}
  const h=p.resHead!=null&&byKey(p.resHead);const ok=h&&h!==p&&hs.includes(h);
  if(p===S){if(!ok)S.resHead=null;continue} /* she keeps Ngọc Thanh các until she has a palace of her own */
  if(r>=3)p.palWait=1;
  if(ok){if(p.palLone){delete occ[p.pal];p.pal=null;p.palLone=0}continue}
  p.resHead=null;if(p.palLone&&p.pal!=null)continue;
  const c=hs.filter(x=>x!==p&&x!==S&&cnt(x)<3);
  if(c.length)p.resHead=key(pick(c));else if(r<3){const f=free();if(f>=0){p.pal=f;p.palLone=1;occ[f]=key(p)}}}
 for(const v of rivals){if(!v.palLone||!palLive(v)||rkOf(v)>=3)continue;const c=hs.filter(x=>x!==v&&x!==S&&cnt(x)<3);if(c.length){delete occ[v.pal];v.pal=null;v.palLone=0;v.resHead=key(pick(c))}}
 for(const p of moved)try{log(`${RANKS[p.rank].n} ${p.name} có cung trống, được dời sang ${PALN[p.pal]}.`)}catch(e){}
 for(const [p,w] of was){if(!palLive(p))continue;try{log(`${p.name} dời khỏi ${w}, dời sang ${houseName(p)}.`)}catch(e){}}};
/* palaceOf without j27's "under the queen = Càn Ninh" exception */
palaceOf=function(p){if(p===S)return"home";if(p.queen)return"kn";const h=byKey(houseOf(p));return !h||h===S?"home":"r"+h.id};
/* the plan list: a Tần is a chủ vị too; a lone lower consort holds a side palace */
(function(){const p0=places;places=function(){const L=p0.apply(this,arguments);try{for(const x of L){if(x.sc!=="rv"||!x.v)continue;const hd=x.v,r=rkOf(hd);
  if(r>=3&&/^Ở thiên điện/.test(x.d||""))x.d=x.d.replace(/^Ở thiên điện/,`Chủ vị ${RANKS[hd.rank].n} ${hd.name}`);
  else if(hd.palLone&&/^Ở thiên điện/.test(x.d||""))x.d=x.d.replace(/^Ở thiên điện/,`${RANKS[hd.rank].n} ${hd.name} ở tạm (cung còn trống)`)}}catch(e){}return L}})();
(function(){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{palFix()}catch(e){console.error(e)}return r}})();
