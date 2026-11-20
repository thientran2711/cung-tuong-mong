#!/usr/bin/env python3
"""«ghen» seal for MALE groups (rule A25, owner 20/11 verbatim: "Hoàng thượng ghen tại sao lại cầm cái khăn? Đàn ông con trai mà cầm khăn.").
The th_prompts 'ghen' prompt stays for everyone EXCEPT males. Male variant = same tuple shape, same disc colour (yellow-green), same A face
sentence (it never had the cloth) and same end face; ONLY the hands change: arms crossed tight over the chest, one shoulder turned away,
sulky sideways glare — nothing held in the hands. Written in the Thái hậu's words (she/her, plum sleeves) so the builders' person swap runs
unchanged (sg4_set.py ht/htg/tg/tv, grp_set_prompts.py bt). Importing this module adds T.S['ghen-m']."""
import th_prompts as T
_g = T.S["ghen"]
T.S["ghen-m"] = (_g[0], _g[1], _g[2],
   "both arms crossed tight over her chest, one shoulder turned away in a sulk, wide royal yellow sleeves with plum cuffs visible; narrowed side-glance (both eyes looking the same way), puffed cheek, a sour pout; one tiny dark-green swirl",
   "turns jealous: she leans forward and comes out of the round frame toward the viewer, her head and shoulders push past the gold rim, her arms come out and cross tight over her chest, she turns one shoulder away in a sulk and glares sideways with a puffed cheek, a tiny dark-green swirl appears",
   "keeps sulking jealously in a loop: her arms stay crossed tight over her chest, she huffs, turns her shoulder away and back, glares sideways and puffs her cheek, the tiny dark-green swirl turns",
   "gives one last jealous glare, the swirl fades away, she uncrosses her arms, lowers her hands", _g[7])
