import json,sys,collections
d=json.load(open(sys.argv[1]));ev=d['traceEvents'] if isinstance(d,dict) else d
cpu=collections.Counter();cnt=collections.Counter();
for e in ev:
    if e.get('ph')=='X' and 'tdur' in e:
        n=e['name']
        if n in('Paint','Layout','UpdateLayoutTree','PrePaint','Layerize','Commit','RasterTask','ImageDecodeTask','Decode Image','Draw LazyPixelRef','FunctionCall','EvaluateScript','UpdateLayer','CompositeLayers','DrawFrame','Animation','FireAnimationFrame','TimerFire'):
            cpu[n]+=e['tdur'];cnt[n]+=1
    if e.get('name') in ('DrawFrame','BeginMainThreadFrame') and e.get('ph') in('I','X','b'): cnt['_'+e['name']]+=1
print(' '.join(f"{k}={cpu[k]/1000:.0f}ms/{cnt[k]}" for k in sorted(cpu,key=lambda k:-cpu[k])), 'frames:',cnt['_DrawFrame'],cnt['_BeginMainThreadFrame'])
