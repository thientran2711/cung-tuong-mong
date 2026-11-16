#!/usr/bin/env python3
"""Scan the built index.html for DARK-themed dialog / pop-up panels (owner s8: one light paper panel for every pop-up, KIT §8).
Lists every CSS rule whose selector targets a dialog panel (.modal .dlg / .kpanel / .kph / .dlg) and whose background is dark
(first colour luminance < 0.25). usage: python3 dev/tools/dark_panels.py [index.html]  → table: selector | background colour."""
import re,sys
t=open(sys.argv[1] if len(sys.argv)>1 else 'index.html',encoding='utf-8').read()
css=''.join(re.findall(r'<style[^>]*>(.*?)</style>',t,re.S))+''.join(re.findall(r'textContent\s*=\s*`(.*?)`',t,re.S))
def lum(h):
  h=h.lstrip('#');h=h[:6] if len(h)>=6 else ''.join(c*2 for c in h[:3])
  r,g,b=(int(h[i:i+2],16)/255 for i in (0,2,4));return .2126*r+.7152*g+.0722*b
PANEL=re.compile(r'(\.dlg|\.kpanel|\.kph\b|#modal|\.modal)')
rows=[]
for sel,body in re.findall(r'([^{}@]+)\{([^{}]*)\}',css):
  sel=' '.join(sel.split())
  if not PANEL.search(sel) or 'kfxk' in sel:continue
  m=re.search(r'background(?:-color)?\s*:\s*([^;]*)',body)
  if not m:continue
  c=re.search(r'#[0-9a-fA-F]{3,8}\b',m.group(1))
  if not c:continue
  L=lum(c.group(0))
  if L<.25 and not re.search(r'(scrim|backdrop|::backdrop|\bov\b|kmov)',sel):rows.append((sel[:150],c.group(0),round(L,2)))
seen=set()
for r in rows:
  if r in seen:continue
  seen.add(r);print(' | '.join(map(str,r)))
print(len(seen),'dark panel rules')
