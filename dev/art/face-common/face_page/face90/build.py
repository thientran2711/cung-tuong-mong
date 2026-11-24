import json,sys
ids=json.load(open('/tmp/ids90.json'))
try: A=json.load(open('assets.json'))
except Exception: A={}
order=["Sắc sảo","Quyến rũ","Lạnh lùng","Kiêu kỳ","Đoan trang","Dịu dàng"]
data=[{"id":i,"g":g,"cut":c,"u":A.get(c,"")} for i,g,c in ids]
html=open('page.src.html').read().replace('/*DATA*/[]',json.dumps(data,ensure_ascii=False)).replace('/*ORDER*/[]',json.dumps(order,ensure_ascii=False))
open('out/face90.html','w').write(html)
print(len(data),sum(1 for d in data if d['u']))
