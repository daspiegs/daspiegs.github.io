"""
Created on Thu Dec 06 16:27:40 2018
@author: ragnar

EDITED FOR EDUCATIONAL PURPOSES SUNDAY, APRIL 17, 2022
"""

# create example image
#from flask import Flask, render_template, request
import numpy as np
import matplotlib.pylab as plt
import matplotlib.patches as pat
from matplotlib.collections import PatchCollection
from mpld3 import plugins, utils

#from io import BytesIO
#import base64


#nbands=int(input("enter number of bands--max 9 ")) 
#spacing=int(input("enter spacing--rows of dots between ")) 
#color_scheme_i=int(input("color scheme number ")) 

import cgi
import cgitb #found this but isn't used?

form = cgi.FieldStorage()
nbands=int(form.getvalue('number of bands')) 
spacing=int(form.getvalue('band spacing'))  
color_scheme_i=int(form.getvalue('color scheme #'))  
print((nbands, spacing, color_scheme_i))


cs1=['red','orange','yellow','lawngreen','cyan','dodgerblue','blue','blueviolet','magenta']
cs2=['springgreen','turquoise','teal','lawngreen','aqua','darkturquoise','deepskyblue','cornflowerblue','royalblue']
cs3=['black','dimgray','gray','slategray','silver','whitesmoke','snow','lightsteelblue','powderblue']

colorschemes=[cs1,cs2]
scheme_choice=colorschemes[color_scheme_i-1]

n=40
x,y=np.meshgrid(np.arange(n)+1,np.arange(n)+1)


f=plt.figure(figsize=(12,12))
plt.plot(x,y,'ko')
ax=plt.gca()
plt.axis('off')
ax.get_xaxis().set_visible(False)
ax.get_yaxis().set_visible(False)
plt.tight_layout()
plt.axis('equal')
plt.plot()
plt.xlim([0,n+1])
plt.ylim([0,n+1])

ax=plt.gca()
pats=[]

for i in range(nbands):
    color=scheme_choice[i]
    ax.add_patch(pat.Rectangle((0,n/2+nbands/2-i*spacing),n+1,1,facecolor=color)) 
    
f.savefig("init_image.png", dpi=160, facecolor='w',bbox_inches="tight", pad_inches=0)

html_str = mpld3.fig_to_html(f)
Html_file= open("makeimage.html","w")
Html_file.write(html_str)
Html_file.close()
