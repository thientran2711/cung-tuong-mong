#!/usr/bin/env python3
# md -> HTML (pandoc) -> A5 PDF (Playwright chromium). Run from anywhere; needs pandoc + playwright.
import subprocess,sys,os,re
d=os.path.dirname(os.path.abspath(__file__))
md=os.path.join(d,'Bao-cao-loi-25-26-11.md'); pdf=os.path.join(d,'Bao-cao-loi-25-26-11.pdf')
body=subprocess.check_output(['pandoc','-f','markdown+pipe_tables','-t','html',md]).decode()
def badge(m):
    s=m.group(0); return s
css="""
@page{size:A5 portrait;margin:9mm 8mm}
body{font-family:'DejaVu Serif',serif;font-size:11pt;line-height:1.35;color:#2b2320}
h1{font-size:17pt;color:#7a2a1e;margin:0 0 4px}h2{font-size:13.5pt;color:#7a2a1e;border-bottom:1px solid #c9b79a;margin:14px 0 6px;padding-bottom:2px}
p{margin:5px 0}em{color:#6b5d50}
table{border-collapse:collapse;width:100%;margin:6px 0;table-layout:fixed}
th{background:#f0e1c4;border:1px solid #d9c8a6;padding:3px 4px;text-align:left;font-size:10.5pt}
td{border:1px solid #d9c8a6;padding:3px 4px;vertical-align:top;font-size:11pt;word-wrap:break-word;overflow-wrap:anywhere}
tr{page-break-inside:avoid}tbody tr:nth-child(even) td{background:#faf5ea}
th:nth-child(1){width:38%}th:nth-child(2){width:38%}th:nth-child(3){width:24%}
code{font-family:'DejaVu Sans Mono',monospace;font-size:9.5pt;background:#eee3cc;padding:0 2px}
hr{border:0;border-top:1px solid #c9b79a;margin:10px 0}
"""
html="<!doctype html><html lang='vi'><head><meta charset='utf-8'><style>"+css+"</style></head><body>"+body+"</body></html>"
h=os.path.join(d,'.report.html'); open(h,'w',encoding='utf-8').write(html)
js="const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://%s');await p.pdf({path:'%s',preferCSSPageSize:true,printBackground:true});await b.close()})()"%(h,pdf)
subprocess.check_call(['node','-e',js]); os.remove(h); print(pdf)
