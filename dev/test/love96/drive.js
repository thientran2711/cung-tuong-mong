// in-page driver: window.__d96.run(ch, plan) ; plan: {beatId:[optionNameSubstring|index, ok(bool)]}, default: first option, success
window.__d96={
 clear(){for(let k=0;k<40&&Q.length;k++){const m=Q[0];if(m.pid==="j67")break;closeModal()}},
 run(ch,plan,setup){plan=plan||{};const out=[];if(!__tm96.jump(ch))return {err:"jump "+ch,plan:S.st.ch.plan};this.clear();if(setup)setup();
  for(let n=0;n<12;n++){const A=S.st.M;if(!A||A.a!==ch||A.done)break;A.due=S.turn;fireBeat67(A);this.clear();const m=Q[0];if(!m||m.pid!=="j67"){out.push("nomodal "+A.nb);break}
   const bid=A.cur;if(bid==="c6"){const t=T96(),m=man96(),w=watcher();window.__dbg96={h:t.h,tinh:m.tinh,w:w&&w.loyal,preg:S.preg,sus:t.sus,out:S.out,thuoc:A96has('thuoc'),rare:rare96()}}const p=plan[bid]||[0,true];let i=typeof p[0]==="number"?p[0]:m.opts.findIndex(o=>o.n.indexOf(p[0])>=0);if(i<0){out.push(`opt-missing ${bid}:${p[0]} have ${m.opts.map(o=>o.n).join("|")}`);i=0}
   if(S.bac<200)S.bac=400;const R=Math.random;Math.random=p[1]===false?()=>0.9999:()=>0.0001;try{chooseM(i)}finally{Math.random=R}
   out.push(`${bid}:${m.opts[i].n}${p[1]===false?"(hỏng)":""}`);if(S.dead){const P=S.st.ch.past.slice(-1)[0];return {beats:out,end:P&&P.tag,dead:true,fate:S.fate||"",modal:(Q[0]||{}).t||"",out:S.out}}this.clear()}
  const A=S.st.ch.past.filter(x=>x.a===ch).slice(-1)[0];const m=man96();return {beats:out,end:A?A.tag:null,endKey:(th67("m")||{}).end,dead:S.dead,fate:S.fate||"",man:m?{name:m.name,role:m.role,alive:m.alive,tinh:m.tinh,wed:m.wed||""}:null,t:JSON.parse(JSON.stringify(S.tm96))}}};
