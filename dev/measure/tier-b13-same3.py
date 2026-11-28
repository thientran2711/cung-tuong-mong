# batch-3 proof: key = road id + beat path (line numbers shift when a way is removed); prints sets whose options changed
import sys
def load(f):
    m={}
    for l in open(f,encoding='utf-8').read().split('\n')[1:]:
        c=l.split('\t')
        if len(c)>8:m[(c[1],c[2])]=(c[5],c[8])
    return m
B,A=load(sys.argv[1]),load(sys.argv[2])
ch=[k for k in B if k in A and B[k][1]!=A[k][1]]
print('sets',len(B),len(A),'missing',len([k for k in B if k not in A]),'extra',len([k for k in A if k not in B]),'changed',len(ch))
for k in sorted(ch):print(' ',k[0],k[1],B[k][0],'->',A[k][0])
