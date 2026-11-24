/* in-page scenarios (strings evaluated in the game frame; used by record.js, perf.js AND the hidden ?kperf=1 probe page). Each returns when done.
   P.seg(name) / P.end() mark perf segments. Sample deltas come from BAL.kitpage.demo (the kit sample page's own BAL block) — nothing typed here (law 4). */
window.SCEN={
 /* baseline: the home stage doing nothing (petals, idle figures) — the floor of this machine */
 async idle(){const P=window.__seg||{seg(){},end(){}};await MD3.wait(400);P.seg('idle-home');await MD3.wait(3000);P.end()},
 /* control: what LIVE does today — the event dialog opens (kmIn) with its option list, then the result card + kitStatFx labels (all cells at once) */
 async live(){const P=window.__seg||{seg(){},end(){}};await MD3.wait(400);const A=MD3.acts(5,null);const D=BAL.kitpage.demo;
  P.seg('live-dialog');pushModal({t:'Quý nhân mời thưởng trà',h:'<p>Hôm nay muốn cùng ta làm việc gì?</p>',opts:A.map(c=>({n:c.querySelector('.kan').textContent.trim(),x:(c.querySelector('.klead')||{}).textContent||'',fx:{}}))});showModal();await MD3.wait(1500);P.end();
  Q.length=0;document.getElementById('modal').hidden=true;P.seg('live-result');const b=rsnap();S.sung+=D.ask.sung;S.danh+=D.ask.danh;S.bac-=D.gift.bac;S.suc-=D.study.suc;resultShow('Dâng trà',b,true);try{render()}catch(e){}await MD3.wait(3000);P.end()},
 async m1Prep(o){o=o||{};window.__m1g=await M1.setup({n:o.n||5,plain:o.plain})},
 async m1(o){o=o||{};const P=window.__seg||{seg(){},end(){}};const g=window.__m1g||await M1.setup({n:o.n||5,plain:o.plain});window.__m1g=null;P.seg('m1-enter+deal');await M1.enter();P.end();await MD3.wait(900);
  P.seg('m1-lift');await M1.lift(1);await MD3.wait(1500);await M1.lift(Math.min(3,(o.n||5)-1));P.end();await MD3.wait(1700);
  P.seg('m1-choose');await M1.choose(Math.min(3,(o.n||5)-1));P.end();const D=BAL.kitpage.demo;
  P.seg('m4-fly');await M4.run({title:'Mời cùng việc',ok:true,mut:()=>{S.sung+=D.ask.sung;S.bac-=D.gift.bac;S.danh+=D.ask.danh}});P.end();await MD3.wait(1500);return g},
 async m2Prep(o){window.__m2g=await M2.setup({n:12,people:(o||{}).people})},
 async m2(o){const P=window.__seg||{seg(){},end(){}};const g=window.__m2g||await M2.setup({n:12});window.__m2g=null;P.seg('m2-enter');await M2.enter();P.end();await MD3.wait(600);
  P.seg('m2-tap');await M2.tapPerson(1);P.end();await MD3.wait(400);const b=M2.st.pk.children;
  P.seg('m2-lift');await M2.pickBtn(b[0],0);await MD3.wait(900);await M2.pickBtn(b[1],1);await MD3.wait(900);await M2.pickBtn(b[0],0);await MD3.wait(500);P.end();
  P.seg('m2-open');await M2.pickBtn(b[0],0);await MD3.wait(1500);P.end();
  P.seg('m2-swipe');await M2.fling(-0.011);await MD3.wait(400);await M2.fling(0.007);P.end();await MD3.wait(500);
  await M2.turnTo(5);await MD3.wait(500);await M2.turnBy(1);await MD3.wait(900);P.seg('m2-give');const nm=await M2.give();P.end();await MD3.wait(400);return nm},
 async m4(o){const P=window.__seg||{seg(){},end(){}};await MD3.wait(300);const D=BAL.kitpage.demo;P.seg('m4-fly');await M4.run({title:'Dâng trà hầu Thái hậu',ok:true,mut:()=>{S.sung+=D.ask.sung;S.danh+=D.ask.danh;S.bac-=D.gift.bac;S.suc-=D.study.suc},item:'ngocboi'});P.end();
  await MD3.wait(1600);P.seg('m4-fly-bai');await M4.run({title:'Dâng trà hầu Thái hậu',ok:false,mut:()=>{S.suc-=D.study.suc;S.danh-=D.ask.danh}});P.end();await MD3.wait(1500)}};
