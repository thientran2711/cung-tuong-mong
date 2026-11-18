import sys,re
c=sys.argv[1]
def g(f):return open(f'{c}_{f}.txt').read()
t=g('t8_v0')
def seg(t,a,b):
    i=t.find(a);j=t.find(b,i);return t[i:j]
print('FACE:',seg(t,'Her face:',' From the identity'))
print('POSE:',seg(t,'Pose:',' Her hands interact'))
print('HANDS:',seg(t,'Her hands and body:',' Every hairpin'))
for f in ['t8_v0','t8_v1','t8_v2','t7_v0','t7_v1','t7_v2']:
    t=g(f)
    print('\n##',f)
    i=t.find('robe of ');print('OUTFIT-COLOUR:',t[i:i+90].split(',')[0])
    print('COLOUR:',seg(t,'COLOUR RULE:','. The phoenix is' if f.startswith('t8') else '. All flowers'))
t=g('t7_v0');print('T7 POSE:',seg(t,'Pose:',' Her hands interact'));print('\nT7 HANDS:',seg(t,'Her hands and body:',' Every hairpin'))
