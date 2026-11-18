import json,glob,sys
seeds=sys.argv[1].split(',') if len(sys.argv)>1 else None
for g in ['_t40no','_t40','_t43']:
    H=HM=M=L=0;E=[];K={}
    for f in sorted(glob.glob(f'out_{g}_*.json')):
        if seeds and f.split('_')[-1][:-5] not in seeds: continue
        d=json.loads(open(f).read());H+=d['harm'];HM+=d['harmMe'];M+=d['months'];L+=d['lives'];E+=d['errs']+d['pageErrors']
        for k,v in d['byK'].items():K[k]=K.get(k,0)+v
    print(g,'months',M,'lives',L,'harm/mo %.3f'%(H/M),'harmOnPlayer/mo %.3f'%(HM/M),'errs',len(E),E[:2])
    print('   ',dict(sorted(K.items(),key=lambda x:-x[1])))
