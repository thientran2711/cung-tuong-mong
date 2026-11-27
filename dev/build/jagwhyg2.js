/* ================= jagwhyg2: NPC-PURPOSE G2 kinds (monthly no-actor chains) — registrations only, the ONE helper is jagwhy.js =================
   Owner (OD 18/11 ~04:08Z): every NPC deed has a goal that fits her life aim; no luck. Each kind: who(ctx) = the people who could act,
   why(p, ctx) = {s, t, r} from her real state (grudge, need, nết, ties) or null. Numbers: BAL.ag.why "// G2 kinds" block (jbal2).
   Report: dev/handover/reports/npc-purpose.md §G2 (handover branch). Loaded after jagwhy.js (assemble.py). */
/* ---- jlost: items that go missing ---- */
npwReg("loTake",{grp:"G2",pickAll:true,who:c=>{const p=c.p;if(!p)return[];let R0=[];try{R0=liveRivals(true).filter(v=>v!==p&&bandVT(v,p)>=BAL.ag.why.loTake.band&&loMotive(v,p)&&(v.bac||0)>=LO.act.bac)}catch(e){}return R0.concat(loStaff(p))},
 why:(v,c)=>{const B=BAL.ag.why.loTake,p=c.p;if(loStaff(p).includes(v)){const g=netQ(v,"greed")*B.greed,t=(v===p.maid?B.care:0)+Math.max(0,netQ(v,"timid"))*B.timid;if(g<=0&&t<=0)return null;
   return g>=t?{s:g,t:p,r:"tham của, lấy đồ trong rương chủ"}:{s:t,t:p,r:"cất nhầm chỗ",flag:"mis"}}/* the maid who keeps the chest may misplace a piece in her daily work (a slip of a real duty; a timid one more often) → cause "mis", mostly found again at home */
  return {s:danger(v,p)*mindW(v,"scheme")*B.rivW,t:p,r:"oán "+npwNm(p)+", sai người lấy trộm đồ"}}});
npwReg("loTry",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:BAL.ag.why.loTry.want+loPrice(c.c.e||{})/BAL.ag.why.loTry.prDiv,r:"muốn tìm lại "+loNm(c.c.k)})});
npwReg("loClear",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:BAL.ag.why.loTry.clear,r:"muốn rửa tiếng trước buổi xét"})});
npwReg("loWear",{grp:"G2",who:c=>c.p?[c.p]:[],why:(h,c)=>loHonest(h)?null:{s:BAL.ag.why.loTry.wear+(h.malice||0)/BAL.ag.why.div.wearMal,r:"thích "+loNm(c.c.k)+", đem ra đeo"}});
/* ---- jkc / jkc2: pre-palace home (done LAST, C-AG 18/11 answer b) ---- */
/* the week's household scene: each candidate = one motive already weighed by its person's state (kcWeek E list: [event, weight]) */
npwReg("kcWeek",{grp:"G2",who:c=>(c.E||[]).map(([e,w])=>({id:"kcev:"+e,e,w})),why:x=>({s:x.w*BAL.ag.why.kcWeek.mul,r:(KCE[x.e]&&KCE[x.e].t)||x.e})});
npwReg("kcMeet",{grp:"G2",who:c=>c.tm?[c.tm]:[],why:m=>{const h=(S.tm96&&S.tm96.h)||0;return h>=BAL.ag.why.kcTm.meet?{s:h,t:S,r:"nhớ ngươi, tìm đến chốn cũ"}:null}});
npwReg("kcVh",{grp:"G2",who:()=>S.emp?[S.emp]:[],why:e=>({s:(S.sac||0)-BAL.ag.why.kcTm.vhSac,t:S,r:"vi hành xem dân tình, để ý người con gái đẹp ở chùa"})});
npwReg("kcSuit",{grp:"G2",who:()=>KCSUIT.filter(kcSuitReach).map(x=>({id:"suit:"+x[1],x})),why:o=>({s:(S.kap||0)*BAL.ag.why.kcSuit.kapW,t:S,r:o.x[0]+" nghe tiếng ngươi, nhờ bà mối dạm hỏi"})});
