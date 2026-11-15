/* SCAN 5 — every act card (Hành sự deck, all buổi, Sức 3 / 17 / 60, khắc 0 / 3 used): the Cần row may name each stat ONCE.
   A card that lists two Sức needs (or two khắc / Bạc needs) is a duplicate / conflict. */
(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms));const bad=[];let cards=0;const stat=[["Sức",/\bSức\b/i],["khắc",/khắc/i],["Bạc",/\bBạc\b|\bbạc\b/],["buổi",/^Buổi|buổi /i]];
 for(const suc of [3,17,60])for(const u of [0,3])for(const b of [0,1,2,3]){S.suc=suc;used=u;S.buoi=b;Q.length=0;document.getElementById('modal').hidden=true;tab="act";render();await wait(60);
  document.querySelectorAll('#panel .cards > button').forEach(x=>{cards++;const L=[...x.querySelectorAll('.kr-why .krv > *')].map(e=>e.textContent.replace(/^[✓✗]\s*/,'').trim()).filter(Boolean);
   for(const [n,re] of stat.slice(0,3)){const hit=L.filter(t=>re.test(t));if(hit.length>1)bad.push({suc,u,b,card:(x.querySelector('.kan')||x).textContent.trim().slice(0,40),stat:n,needs:hit})}})}
 const uniq={};for(const x of bad){const k=x.card+'|'+x.stat;if(!uniq[k])uniq[k]=x}
 return{cards,dupRows:bad.length,dupCards:Object.keys(uniq).length,list:Object.values(uniq).slice(0,30)}})()
