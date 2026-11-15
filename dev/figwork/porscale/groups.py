"""porscale/groups.py: which GROUP a por-* portrait belongs to (owner 15/11 19:05Z: one face scale + head position per group)."""
import re
def group(name):
    n = name[4:] if name.startswith('por-') else name
    n = n[:-5] if n.endswith('.webp') else n
    p = n.split('-')[0]
    if p == 'kid': return 'children'  # sons + daughters share one list (Hoàng tự): one group, coordinator 15/11
    return {'consort': 'consorts', 'maid': 'maids', 'mama': 'mamas', 'eunuch': 'eunuchs', 'official': 'officials', 'physician': 'physicians',
            'man': 'men', 'emperor': 'emperor', 'player': 'player', 'thaihau': 'thaihau'}.get(p, 'other')
