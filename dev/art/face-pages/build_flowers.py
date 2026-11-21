#!/usr/bin/env python3
import json,os
D=os.path.dirname(os.path.abspath(__file__))
J=json.load(open(D+"/../face-common/flower_colours_L2013.json",encoding="utf-8"))
data={k:v for k,v in J.items() if not k.startswith("_")}
html='''<title>Bảng màu hoa</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
:root{--bg:#f6f3f4;--panel:#fff;--fg:#2a2226;--muted:#7b6e74;--line:#e3dadd;--accent:#9b2f4c}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#1c1719;--panel:#262023;--fg:#efe6e9;--muted:#a8999f;--line:#3a3135;--accent:#e08aa3;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#1c1719;--panel:#262023;--fg:#efe6e9;--muted:#a8999f;--line:#3a3135;--accent:#e08aa3;color-scheme:dark}
body{background:var(--bg);color:var(--fg);font-family:"Be Vietnam Pro","Segoe UI",system-ui,sans-serif;margin:0;padding:16px max(16px,env(safe-area-inset-right)) 40px max(16px,env(safe-area-inset-left))}
h1{font-family:"Noto Serif",Georgia,serif;font-size:1.5rem;margin:0 0 4px}.sub{color:var(--muted);line-height:1.5;margin:0 0 10px;max-width:72ch}
.bar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}
.b{font:inherit;border:1px solid var(--line);background:var(--panel);color:var(--fg);border-radius:999px;padding:6px 12px;cursor:pointer}.b[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}
.p{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px;margin:0 0 10px}
.pid{font-weight:700;margin:0 0 6px}.pid span{color:var(--accent);font-weight:400;font-size:.85rem;margin-left:6px}
.ss{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.s{border:1px solid var(--line);border-radius:8px;padding:8px;font-size:.78rem}
.sn{font-weight:600;margin:0 0 4px}.t{float:right;color:var(--muted)}
.row{display:flex;gap:6px;align-items:center;margin:3px 0}
.sw{width:26px;height:26px;border-radius:6px;border:1px solid rgba(128,128,128,.4);flex:none}.fl{border-radius:50%}
.ramp{display:flex;gap:3px;margin-top:4px}.ramp i{width:16px;height:16px;border-radius:50%;border:1px solid rgba(128,128,128,.4)}
.lab{color:var(--muted);line-height:1.25}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&family=Noto+Serif:wght@600&display=swap">
<h1>Bảng màu hoa theo bộ đồ</h1>
<p class="sub">Mỗi ô mùa: <b>ô vuông</b> = màu áo (chính, phụ); <b>tròn</b> = màu hoa thêu rồi hoa cài tóc; dãy chấm nhỏ = hoa cài tóc từ cấp 1 đến cấp 6 (nhạt → đậm dần). Bộ đồ dịu thì hoa dịu, không bao giờ chói; hoa không trùng màu áo chính, không vàng, không xanh lá; vẫn giữ chỉ vàng. Đây là BẢN NHÁP chờ chủ nhân duyệt.</p>
<div class="bar" id="g"></div><div class="bar" id="t"></div><div id="o"></div>
<script>
const D=%%DATA%%;const SN={xuan:"Xuân",ha:"Hạ",thu:"Thu",dong:"Đông"};const TN={soft:"dịu",medium:"vừa",vivid:"tươi"};
let g="ALL",t="ALL";const $=s=>document.querySelector(s);
const G=[...new Set(Object.values(D).map(x=>x.group))];
function btns(el,list,cur,set,lab){el.textContent="";for(const v of list){const b=document.createElement("button");b.className="b";b.setAttribute("aria-pressed",String(v===cur));b.textContent=lab(v);b.onclick=()=>{set(v);draw()};el.append(b)}}
function sw(hex,round){const d=document.createElement("div");d.className="sw"+(round?" fl":"");d.style.background=hex;d.title=hex;return d}
function row(...c){const r=document.createElement("div");r.className="row";r.append(...c);return r}
function lab(t){const d=document.createElement("div");d.className="lab";d.textContent=t;return d}
function draw(){
 btns($("#g"),["ALL",...G],g,v=>g=v,v=>v==="ALL"?"Tất cả nhóm":v);
 btns($("#t"),["ALL","soft","medium","vivid"],t,v=>t=v,v=>v==="ALL"?"Mọi độ rực":"Độ rực: "+TN[v]);
 const o=$("#o");o.textContent="";
 for(const [id,x] of Object.entries(D)){
  if(g!=="ALL"&&x.group!==g)continue;
  const ss=["xuan","ha","thu","dong"].filter(s=>t==="ALL"||x[s].tone===t);if(!ss.length)continue;
  const p=document.createElement("div");p.className="p";
  const h=document.createElement("div");h.className="pid";h.textContent=id;const sp=document.createElement("span");sp.textContent=x.group;h.append(sp);p.append(h);
  const w=document.createElement("div");w.className="ss";
  for(const s of ss){const e=x[s];const c=document.createElement("div");c.className="s";
   const n=document.createElement("div");n.className="sn";n.textContent=SN[s];const tt=document.createElement("span");tt.className="t";tt.textContent=TN[e.tone];n.append(tt);c.append(n);
   c.append(row(sw(e.main_hex),sw(e.sec_hex),lab("áo: "+e.main_vi+" + "+e.sec_vi)));
   c.append(row(sw(e.embroidery_hex,1),lab("hoa thêu: "+e.embroidery_vi)));
   c.append(row(sw(e.hair_hex,1),lab("hoa tóc: "+e.hair_vi)));
   const r=document.createElement("div");r.className="ramp";for(const k of ["t1","t2","t3","t4","t5","t6"]){const i=document.createElement("i");i.style.background=e.hair_by_tier[k];i.title=k;r.append(i)}c.append(r);w.append(c)}
  p.append(w);o.append(p)}
 if(!o.children.length)o.textContent="Không có bộ đồ nào khớp bộ lọc.";
}
draw();
</script>'''.replace("%%DATA%%",json.dumps(data,ensure_ascii=False,separators=(",",":")))
open(D+"/flower_swatches.html","w",encoding="utf-8").write(html);print(len(html)//1024,"KB",len(data))
