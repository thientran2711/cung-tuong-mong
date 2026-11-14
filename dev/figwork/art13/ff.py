import sys,json,os
sys.argv=[sys.argv[0],'x','x']+sys.argv[1:]
__file__=os.path.abspath('hdg.py'); exec(open('hdg.py').read().split("cmd,name=sys.argv")[0])
name,k=sys.argv[3],int(sys.argv[4]); M=json.load(open(f'g/{name}.json')); sp=M[k]['spec']
fr=flat(Image.open(bak(sp)).convert('RGBA')); fs=faces(fr,3.0)
for f in fs: print([round(v) for v in f[:4]],round(f[14],2),[round(v,1) for v in eyes(f)])
if len(sys.argv)>5:
    j=int(sys.argv[5]); M[k]['eyeF']=list(eyes(fs[j])); json.dump(M,open(f'g/{name}.json','w')); print('set',M[k]['eyeF'])
