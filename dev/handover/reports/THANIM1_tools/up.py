import urllib.request
U=["https://ak-data.magnific.com/app/api/mcp/uploads/proxy/e502141a-160d-4e0e-b900-c7c1929ad386.png?path=temp-files%2Fe502141a-160d-4e0e-b900-c7c1929ad386.png&mime=image%2Fpng&user_id=190474261&expires=1795315839&v=1&sig=hNe-lMDOELtWugj7M33vSaick7spVkWNIsi4M3MX0Kw",
"https://ak-data.magnific.com/app/api/mcp/uploads/proxy/b3a167af-ebd1-4887-9cd2-bddd4a04a6e2.png?path=temp-files%2Fb3a167af-ebd1-4887-9cd2-bddd4a04a6e2.png&mime=image%2Fpng&user_id=190474261&expires=1795315839&v=1&sig=a67ORUwLSBIrwjtUCq7MOiafin6_oMSo_HLUTnnVQFQ",
"https://ak-data.magnific.com/app/api/mcp/uploads/proxy/0bb75d6d-c885-4356-a574-722c3d8878cf.png?path=temp-files%2F0bb75d6d-c885-4356-a574-722c3d8878cf.png&mime=image%2Fpng&user_id=190474261&expires=1795315839&v=1&sig=_BYrf_pNoSXVYOFg9DH9fKHyCsEi7qpIX72l3pcy4hQ",
"https://ak-data.magnific.com/app/api/mcp/uploads/proxy/7ec8bdcd-85f5-4660-a1a1-99adbd326b20.png?path=temp-files%2F7ec8bdcd-85f5-4660-a1a1-99adbd326b20.png&mime=image%2Fpng&user_id=190474261&expires=1795315839&v=1&sig=BnjkkyUrM3XmeZY_P8-MPEaqy41eV2ws3LyJJZB8UO4",
"https://ak-data.magnific.com/app/api/mcp/uploads/proxy/9921eb1b-c706-461e-8bda-200eb6251613.png?path=temp-files%2F9921eb1b-c706-461e-8bda-200eb6251613.png&mime=image%2Fpng&user_id=190474261&expires=1795315839&v=1&sig=r-IQoX6QcuThoAY2tWiriDtbTlM1Nb4DvzHdYkzZI-w"]
F=['th-gian-A-M2294','th-hanghai-A-M2294','th-chuyentam-A-M2294','th-vui-A-M2301','th-buon-A-M2301']
for u,f in zip(U,F):
    r=urllib.request.Request(u,data=open(f+'-g.png','rb').read(),method='PUT',headers={'Content-Type':'image/png'})
    print(f,urllib.request.urlopen(r).status)
