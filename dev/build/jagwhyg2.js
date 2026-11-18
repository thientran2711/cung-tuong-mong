/* ================= jagwhyg2: NPC-PURPOSE G2 kinds (monthly no-actor chains) — registrations only, the ONE helper is jagwhy.js =================
   Owner (OD 18/11 ~04:08Z): every NPC deed has a goal that fits her life aim; no luck. Each kind: who(ctx) = the people who could act,
   why(p, ctx) = {s, t, r} from her real state (grudge, need, nết, ties) or null. Numbers: BAL.ag.why "// G2 kinds" block (jbal2).
   Report: dev/handover/reports/npc-purpose.md §G2 (handover branch). Loaded after jagwhy.js (assemble.py). */
/* ---- jlost: items that go missing ---- */
npwReg("loTake",{grp:"G2",who:c=>{const p=c.p;if(!p)return[];let R0=[];try{R0=liveRivals(true).filter(v=>v!==p&&bandOf(danger(v,p))>=2&&loMotive(v,p)&&(v.bac||0)>=LO.act.bac)}catch(e){}return R0.concat(loStaff(p))},
 why:(v,c)=>{const B=BAL.ag.why.loTake,p=c.p;if(loStaff(p).includes(v)){const g=netQ(v,"greed")*B.greed,t=netQ(v,"timid")*B.timid;if(g<=0&&t<=0)return null;
   return g>=t?{s:g,t:p,r:"tham của, lấy đồ trong rương chủ"}:{s:t,t:p,r:"vụng về, sơ ý làm thất lạc đồ của chủ"}}
  return {s:danger(v,p)*mindW(v,"scheme")*B.rivW,t:p,r:"oán "+npwNm(p)+", sai người lấy trộm đồ"}}});
npwReg("loTry",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:BAL.ag.why.loTry.want+loPrice(c.c.e||{})/BAL.ag.why.loTry.prDiv,r:"muốn tìm lại "+loNm(c.c.k)})});
npwReg("loClear",{grp:"G2",who:c=>c.p?[c.p]:[],why:(p,c)=>({s:BAL.ag.why.loTry.clear,r:"muốn rửa tiếng trước buổi xét"})});
npwReg("loWear",{grp:"G2",who:c=>c.p?[c.p]:[],why:(h,c)=>loHonest(h)?null:{s:BAL.ag.why.loTry.wear+(h.malice||0)/2,r:"thích "+loNm(c.c.k)+", đem ra đeo"}});
