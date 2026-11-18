import sys,re
src,dst=sys.argv[1],sys.argv[2]
h=open(src,encoding='utf8').read()
def rep(a,b,n=1):
    global h
    assert h.count(a)==n,(a[:60],h.count(a))
    h=h.replace(a,b)
CSS='''.cw{display:flex;flex-direction:column;min-width:0}
label.sai{display:flex;align-items:center;gap:6px;justify-content:center;font-size:12px;line-height:1.2;color:var(--muted);cursor:pointer;padding:6px 2px;min-height:32px;user-select:none}
label.sai input{width:18px;height:18px;margin:0;accent-color:#c0392b;flex:none;cursor:pointer}
label.sai:has(input:checked){color:#c0392b;font-weight:600}
#lb label.sai{font-size:13px;padding:4px 2px}
#saibar{position:fixed;left:max(12px,env(safe-area-inset-left,0px));bottom:calc(env(safe-area-inset-bottom,0px) + 14px);z-index:30;display:flex;align-items:center;gap:8px;background:color-mix(in srgb,var(--panel) 92%,transparent);border:1px solid var(--line);border-radius:999px;padding:6px 8px 6px 14px;font-size:14px;box-shadow:0 2px 10px rgba(0,0,0,.2)}
#saibar b{font-variant-numeric:tabular-nums;color:#c0392b}
#saibar button{font:inherit;font-size:13px;border:1px solid var(--line);background:var(--panel);color:var(--fg);border-radius:999px;padding:6px 12px;cursor:pointer}
#saibar button:focus-visible{outline:2px solid var(--accent)}
#saibar small{color:var(--muted);font-size:12px;max-width:34ch}
'''
rep('</style>\n<div class="wrap">',CSS+'</style>\n<div class="wrap">')
rep('return `<button class="card" type="button" data-id="${id}"','return `<div class="cw"><button class="card" type="button" data-id="${id}"')
rep("</span></button>`};\n  if(!id){","</span></button>${tick(a,id,e,0)}</div>`};\n  if(!id){")
rep("<span>${lbl(id)}${rk?' · '+OUT[outfit]:''}</span></div>`).join('');","<span>${lbl(id)}${rk?' · '+OUT[outfit]:''}</span>${tick(age,id,es[i],outfit)}</div>`).join('');")
rep('(b.height-34)','(b.height-70)')
JS=r'''
/* ---- "Sai phong cách" ticks (W83): saved in artifact db, collection "sai", doc id = picture file name ---- */
const SAI=new Set();let saiColl=null,saiMsgT=0;
const roleOf=id=>id[0]==='m'?'maid':'consort';
function fileOf(a,id,e,o){const r='fig-'+roleOf(id)+'-'+id+'-';
  if(e.k==='r')return r+'t'+e.t+'-'+a+'-'+(o===3?'quoctang':'v'+o);
  if(e.k==='y')return r+YK[e.i]+'-'+a;
  return r+sheet(a,id)[e.i][0]+'-'+a;}
function tick(a,id,e,o){if(!e)return '';if(e.k==='r'&&o===3&&!hasQ(a,id,e.t))return '';
  const f=fileOf(a,id,e,o),l=`${lbl(id)} · ${ALBL[a]} · ${e.n}${e.k==='r'?' · '+OUT[o]:''}`;
  return `<label class="sai"><input class="sai" type="checkbox" data-f="${f}" data-id="${id}" data-a="${a}" data-l="${l}"${SAI.has(f)?' checked':''}> ✗ Sai phong cách</label>`;}
function saiMsg(t){const m=document.getElementById('saiMsg');if(!m)return;m.textContent=t||'';clearTimeout(saiMsgT);if(t)saiMsgT=setTimeout(()=>{m.textContent=''},4000)}
function saiRefresh(){document.querySelectorAll('input.sai').forEach(i=>{i.checked=SAI.has(i.dataset.f)});const n=document.getElementById('saiN');if(n)n.textContent=SAI.size}
function saiLocal(){try{localStorage.setItem('sai83',JSON.stringify([...SAI]))}catch(e){}}
const saiBar=document.createElement('div');saiBar.id='saibar';saiBar.innerHTML='<span>Đã đánh dấu: <b id="saiN">0</b></span><button id="saiCopy" type="button">Chép danh sách</button><small id="saiMsg" role="status"></small>';document.body.appendChild(saiBar);
document.getElementById('saiCopy').onclick=async()=>{const t=[...SAI].sort().join('\n');if(!t){saiMsg('Chưa đánh dấu hình nào.');return}
  try{await navigator.clipboard.writeText(t);saiMsg('Đã chép '+SAI.size+' tên hình.')}catch(e){const x=document.createElement('textarea');x.value=t;x.style.cssText='position:fixed;opacity:0';document.body.appendChild(x);x.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}x.remove();saiMsg(ok?'Đã chép '+SAI.size+' tên hình.':'Không chép được — hãy thử lại.')}};
document.addEventListener('change',async ev=>{const i=ev.target;if(!(i instanceof HTMLInputElement)||!i.classList.contains('sai'))return;
  const f=i.dataset.f,on=i.checked;if(on)SAI.add(f);else SAI.delete(f);saiRefresh();
  if(!saiColl){saiLocal();saiMsg('Chưa nối được kho lưu — đã nhớ tạm trên máy này; bấm «Chép danh sách» để gửi.');return}
  try{if(on)await saiColl.doc(f).set({sai:true,file:f,person:i.dataset.id,age:i.dataset.a,label:i.dataset.l,ts:Date.now()});else await saiColl.doc(f).delete()}
  catch(e){if(on)SAI.delete(f);else SAI.add(f);saiRefresh();saiMsg('Không lưu được ('+((e&&e.code)||'lỗi')+'). Hãy thử lại.')}});
(async()=>{let db=null;try{db=await claude.use('db')}catch(e){}
  if(!db){try{(JSON.parse(localStorage.getItem('sai83')||'[]')).forEach(f=>SAI.add(f))}catch(e){}saiRefresh();saiMsg('Chưa nối được kho lưu — dùng «Chép danh sách».');return}
  saiColl=db.collection('sai');
  const to=setTimeout(()=>saiMsg('Tải dấu đã lưu hơi chậm…'),10000);
  try{saiColl.onSnapshot(s=>{clearTimeout(to);const want=new Set(s.docs.map(d=>d.id));SAI.clear();want.forEach(f=>SAI.add(f));saiRefresh()},e=>{clearTimeout(to);saiMsg('Không đọc được dấu đã lưu ('+((e&&e.code)||'lỗi')+').')})}catch(e){clearTimeout(to)}})();
'''
rep("addEventListener('hashchange',show); show();",JS+"addEventListener('hashchange',show); show();")
open(dst,'w',encoding='utf8').write(h)
