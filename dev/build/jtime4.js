/* ================= jtime4: BỐN BUỔI MỖI TUẦN (sáng, trưa, chiều, tối), 4 khắc mỗi buổi = 16 khắc =================
   Loaded right after j1 (which declares BUOI with 3 entries and the "3 buổi a tuần" comment): the array is extended in place.
   S.buoi: 0 sáng, 1 trưa, 2 chiều, 3 tối. B4L = the last buổi (tối, "Qua đêm"), B4N = buổi per tuần.
   Older code that meant "tối" by buoi===2 now reads B4L; "chiều" (old 1) is 2; the new trưa is 1.
   Rules of time that are per DAY stay per day: the NPC scheming pass (rivalsBuoi) still runs twice a day (entering chiều and tối,
   not entering trưa), so a longer day gives her more khắc to spend but not more Sức and not more danger.
   Helpers used by the edited sites: b4EmpNoon (Hoàng thượng at trưa), b4NoonGarden (phi tần strolling at trưa), b4NpcActs, b4Light. */
const B4N=4,B4L=3;
BUOI.splice(1,0,"Buổi trưa");
/* Hoàng thượng: sáng thượng triều (thu), TRƯA ngự thiện / nghỉ trưa ở Dưỡng Tâm điện, có khi phê tấu tiếp hoặc dạo vườn khi trời mát; chiều phê tấu; tối ngự tẩm */
function b4EmpNoon(){const sea=SEASON[S.month-1];const cool=sea!=="Hạ";return pick(["dtd","dtd","dtd","thu",cool?"vuon":"dtd"])}
/* phi tần at trưa: dùng bữa và nghỉ ở cung mình (weight set at the call site), dạo vườn ít, nhiều hơn khi trời mát (không phải mùa hạ) */
function b4NoonGarden(){const sea=SEASON[S.month-1];return sea==="Hạ"?3:sea==="Đông"?14:10}
/* NPC scheming pass: twice a day as before (not on entering trưa) */
function b4NpcActs(){return (S.buoi||0)!==1}
/* light overlay: one colour per buổi, shifting a little with each khắc spent (t = used/4). Also window.B4LIGHT for the kit / scene layer. */
function b4Light(b,u){const t=Math.max(0,Math.min(4,u||0))/4,L=(a,z)=>+(a+(z-a)*t).toFixed(3),C=(x,y)=>Math.round(x+(y-x)*t);
 if(b===0)return `rgba(${C(160,200)},${C(195,215)},255,${L(.2,.1)})`;           /* sáng: bình minh xanh nhạt dần */
 if(b===1)return `rgba(255,${C(248,236)},${C(225,200)},${L(.05,.1)})`;          /* trưa: nắng gắt, gần như trắng */
 if(b===2)return `rgba(255,${C(210,125)},${C(120,50)},${L(.13,.25)})`;           /* chiều: vàng → hoàng hôn cam */
 return `rgba(${C(20,12)},${C(30,20)},${C(80,64)},${L(.42,.56)})`}             /* tối: đêm sâu dần */
window.B4LIGHT=b4Light;
