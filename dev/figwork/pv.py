import json,sys
J=json.load(open('jobs.json'))
for k in sys.argv[1:]:
    p=J[k]['prompt']
    print(k,J[k].get('style'),J[k].get('ref'),'|',p.split('Her own features: ')[1].split('. Left')[0] if 'Her own features' in p else p.split('His face: ')[1].split('. Left')[0] if 'His face' in p else '','|',p.split('Outfit for all four: ')[1].split(' Eyes soft')[0] if 'Outfit for all four' in p else p.split('All four: ')[1].split(' Eyes soft')[0])
