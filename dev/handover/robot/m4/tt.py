import sys,json,time,urllib.request,urllib.parse
def g(p,**k):
    return json.loads(urllib.request.urlopen('http://localhost:8200/'+p+('?'+urllib.parse.urlencode(k) if k else ''),timeout=120).read() or b'null')
if __name__=='__main__':
    for a in sys.argv[1:]:
        if a.startswith('+'): time.sleep(float(a[1:])); continue
        print('tap',a,g('tapt',t=a)); time.sleep(2.5)
    cs=g('c')
    for i,c in enumerate(cs): print(i,c['cls'][:16],c['id'],repr(c['txt'][:70]),c['cx'],c['cy'])
    print(g('shot',t='s'))
