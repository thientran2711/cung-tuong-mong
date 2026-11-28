/* jagwhyg2b: NPC-PURPOSE G2 kinds, part b (registrations only; the ONE helper is jagwhy.js; numbers in jbal2 "// G2b" block) */
/* Owner (OD 18/11 ~04:08Z): every NPC deed has a goal that fits her life aim; no luck. who(ctx) = people who could act; why(p,ctx) = {s,t,r} from
   her real state or null. Files: j54 / jht (children's matches), j53 (tutors), j70 (plots, guards, scars), j10 / j25 (factions), j34 (queen seat).
   j55 court acts and memorials use npwPick over named clan heads (no kind needed). Numbers: BAL.ag.why "// G2b" block (jbal2). */
function g2bAmb(p){try{return traitsOf(p).some(t=>npwB().f7.ambT.includes(t))}catch(e){return false}}/* ambitious = the one ambT list (BAL.ag.why.f7.ambT) */
/* ---- j54 / jht: a mother's ambition for her child, the Emperor's and Thái hậu's duty ---- */
npwReg("h54Tut",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:nv(p,"h54P")*npwB().g2b.tut+Math.max(0,...H54A.map(([a])=>(c.k.hA||{})[a]||0))*npwB().g2b.tutGift,r:"mong con gái thành tài, mời thầy dạy nghệ"})});
npwReg("h54Teach",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:nv(p,"h54P")*npwB().g2b.teach+(c.k.fond||0)*npwB().g2b.teachFond,r:"thương con, tự tay dạy"})});
npwReg("h54Ban",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const B=npwB().g2b.ban,a=g2bAmb(p);
 return {s:B.base+Math.max(0,c.k.age-BAL.age.betroth)*B.age+(a?B.amb:0),r:a?"mong kết thông gia quyền quý cho con":"lo chuyện trăm năm cho con"}}});
npwReg("hEmpWed",{grp:"G2",who:c=>[S.emp].concat(c.son&&!S.thDead&&S.thO?[S.thO]:[]).filter(Boolean),why:(x,c)=>{const B=npwB().g2b.ew,k=c.k,p=c.p||{};const late=B.base+Math.max(0,k.age-B.age0)*B.age;
 if(x===S.emp)return {s:late+Math.max(0,p.sung||0)*B.sung,r:"lo phận làm cha, tự chỉ hôn"};
 return {s:late+(k.heir?B.heir:0)+Math.max(0,p.th||0)*B.th,r:"thương cháu, tự chọn vợ cho cháu"}}});
npwReg("pkTrac",{grp:"G2",who:c=>S.emp?[S.emp]:[],why:(x,c)=>({s:npwB().g2b.trac.base+Math.max(0,c.k.age-npwB().g2b.trac.age0)*npwB().g2b.trac.age,r:"lo nối dõi cho "+c.k.name})});
npwReg("h54Gift",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:npwB().g2b.gift.base+(c.k.fond||0)*npwB().g2b.gift.fond,r:"nhớ con gái, gửi quà sang phủ"})});
npwReg("h54Plead",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const B=npwB().g2b.plead;if(p.confined>0)return {s:B.conf,r:"bị cấm túc, nhờ con gái vào cung xin"};
 return {s:Math.max(0,B.sung0-(p.sung||0))*B.sungW+(g2bAmb(p)?B.amb:0),r:"mong lại được ân sủng, nhờ con gái nói giúp"}}});
npwReg("h54Sad",{grp:"G2",who:c=>c.k?[c.k]:[],why:(k,c)=>({s:Math.max(0,npwB().g2b.sad.joy0-(c.W.joy||0))*npwB().g2b.sad.w,r:"khổ vì nhà chồng"})});
npwReg("h54Hoa",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>g2bAmb(p)?{s:npwB().g2b.hoa.base+Math.max(0,npwB().g2b.hoa.fond0-(c.k.fond||0))*npwB().g2b.hoa.fond,r:"tham vọng, dâng con gái cầu thân lấy thưởng"}:null});
/* ---- j53: a mother asks the Emperor for a famed master ---- */
npwReg("ktFav",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const B=npwB().g2b.fav;if((p.sung||0)<B.sung0)return null;const s=B.base+((p.sung||0)-B.sung0)*B.w+(g2bAmb(p)?B.amb:0);return {s,r:"cậy được sủng, xin Hoàng thượng cử danh sư cho con"}}});
/* ---- j70: a plot only from a motive; the Emperor / Thái hậu guard from regard; a scarred face mended by care for beauty ---- */
npwReg("j70Plot",{grp:"G2",who:c=>c.p?[c.p]:[],why:(v,c)=>{const t=c.t,d=danger(v,t)*npwB().g2b.plot.d;
 const r=c.mo==="ghen"?"ghen vì "+npwNm(t)+" được sủng":c.mo==="nhuc"?"bị nhục, oán "+npwNm(t):c.mo==="ngoi"?"tranh ngôi cho con":"oán "+npwNm(t);return {s:d,t,r}}});
npwReg("j70Guard",{grp:"G2",who:c=>c.p?[c.p]:[],why:(x,c)=>{const B=npwB().g2b.guard;
 if(x===S.emp)return (S.sung||0)>=B.sung?{s:B.base+(S.sung-B.sung),r:"thương ngươi"}:null;
 return !S.thDead&&(S.th||0)>=netTh("th","than2")?{s:B.base+(S.th-netTh("th","than2")),r:"quý ngươi"}:null}});
npwReg("j70Face",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>{const B=npwB().g2b.face,sc=p.scar;if(!sc)return null;const v=(p.sac||0)*B.sac+sc.sev*B.sev;
 if(c.cure)return sc.sev>=B.cureSev&&(p.bac||0)>=B.cureBac?{s:v,r:"sợ mất nhan sắc, bỏ bạc mua thuốc quý"}:null;return {s:v,r:"lo giữ nhan sắc, mời thái y"}}});
/* ---- j10 / j25: a faction leader acts from the faction's grudge or its need for an ally ---- */
function g2bFacFoe(f,l){const M=facMembers(f);const B=npwB().g2b.joint;const E=consorts().filter(x=>!M.includes(x)&&M.reduce((s,m)=>s+oan(m,x),0)/M.length>=B.min).filter(x=>!sameHouse(l,x));
 const t=npwPick(E,x=>M.reduce((s,m)=>s+oan(m,x),0));return t?{t,g:M.reduce((s,m)=>s+oan(m,t),0)/M.length}:null}
npwReg("facJoint",{grp:"G2",who:c=>c.p&&c.p!==S?[c.p]:[],why:(l,c)=>{const e=g2bFacFoe(c.f,l);return e?{s:e.g*npwB().g2b.joint.w,t:e.t,r:"cả phe cùng oán "+npwNm(e.t)}:null}});
npwReg("facAsk",{grp:"G2",who:c=>c.p?[c.p]:(S.facs||[]).map(facLeader).filter(l=>l&&l!==S),why:(l,c)=>{const B=npwB().g2b.ask;const f=facOf(l);if(!f||l===S||facLeader(f)!==l)return null;
 const a=aff(l,S);if(a<(c.minAff||0))return null;const need=Math.max(0,B.size-facMembers(f).length)*B.need;
 let foe=0,fe=null;for(const e of consorts()){if(e===l||f.m.includes(key(e)))continue;const g=Math.min(oan(l,e),oan(S,e));if(g>foe){foe=g;fe=e}}foe*=B.foe;
 const r=foe>=need&&fe&&foe>0?"cùng oán "+npwNm(fe):need>0?"phe còn ít người, cần thêm thế":"quý ngươi";return {s:a*B.aff+need+foe,r}}});
npwReg("facDiv",{grp:"G2",who:c=>(S.facs||[]).filter(f=>f!==c.mine).map(facLeader).filter(l=>l&&l!==S),why:(l,c)=>{const h=Math.max(0,hostility(l,S))*npwB().g2b.div.w;return h>0?{s:h,t:S,r:"oán ngươi, muốn chia rẽ phe ngươi"}:null}});
/* ---- j34: the Emperor fills an empty Hoàng hậu seat when it has stood empty too long ---- */
npwReg("empQueen",{grp:"G2",who:c=>S.emp?[S.emp]:[],why:(x,c)=>{const B=npwB().g2b.queen;return {s:B.base+Math.max(0,S.turn-(S.vacSince||S.turn)-B.mo0)*B.mo,r:"hậu vị bỏ trống đã lâu"}}});
