# place-colour: before/after (every place × buổi × weather class; mean of the states in the cell)

Measured by dev/test/place-colour.js + .py at 1180x820, reduced motion (CSS backdrop). L*/a*/b* = mean of the stage picture as seen
(people + text hidden); raw = the painting with every scene layer off. Before = origin/main 17e8fc038; after = review/place-colour.
On WebGL devices (Pixi backdrop) BEFORE showed the painting with NO filter at all (Pixi hid .scimg; .pxc filter none) — after, .pxc
carries the same --kscf (checked with Pixi on: home + rp3 × rain chiều / frost sáng / clear trưa).

| place | buổi | weather | n | before: filter + layers | L/a/b before | after: filter + layers | L/a/b after | raw L/a/b |
|---|---|---|---|---|---|---|---|---|
| home | sáng | dry | 10 | none | 59/+8.3/+7.6 | none | 59/+8.3/+7.6 | 58/+8.6/+7.0 |
| home | trưa | dry | 10 | none | 61/+10.3/+13.3 | none | 61/+10.3/+13.3 | 60/+10.7/+13.0 |
| home | chiều | dry | 10 | none | 52/+11.2/+16.2 | none | 52/+11.2/+16.2 | 50/+11.6/+16.1 |
| home | tối | dry | 10 | none | 44/+9.1/+2.5 | none | 44/+9.1/+2.5 | 43/+9.4/+1.7 |
| home | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+7.6/+7.5 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 63/+8.5/+7.9 | 57/+9.0/+5.9 |
| home | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 67/+9.3/+12.1 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 65/+10.4/+13.0 | 60/+11.2/+11.7 |
| home | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 59/+9.7/+14.7 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 57/+10.9/+15.9 | 50/+11.7/+14.9 |
| home | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 47/+7.4/+2.9 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 48/+8.1/+2.8 | 43/+8.7/+0.2 |
| home | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 58/+10.1/+4.0 | frost-vignette | 57/+10.8/+4.9 | 56/+11.2/+4.2 |
| home | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 61/+11.8/+9.1 | frost-vignette | 60/+12.6/+10.2 | 58/+13.1/+9.9 |
| home | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 53/+12.1/+12.8 | frost-vignette | 52/+13.0/+14.2 | 50/+13.5/+13.9 |
| home | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 47/+8.4/+0.4 | frost-vignette | 45/+9.0/+1.1 | 43/+9.3/+0.2 |
| vuon | sáng | dry | 10 | none | 68/+2.7/+10.3 | none | 68/+2.7/+10.3 | 68/+2.7/+10.0 |
| vuon | trưa | dry | 10 | none | 72/+3.7/+15.0 | none | 72/+3.7/+15.0 | 71/+3.7/+14.9 |
| vuon | chiều | dry | 10 | none | 61/+6.4/+19.6 | none | 61/+6.4/+19.6 | 59/+6.5/+19.6 |
| vuon | tối | dry | 10 | none | 43/+5.4/+2.7 | none | 43/+5.4/+2.7 | 41/+5.5/+1.8 |
| vuon | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 76/+2.7/+4.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 74/+3.0/+4.5 | 70/+3.1/+2.2 |
| vuon | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 78/+3.0/+8.8 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 77/+3.5/+9.4 | 73/+3.8/+7.6 |
| vuon | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 69/+5.4/+12.3 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 67/+6.0/+13.2 | 62/+6.4/+11.8 |
| vuon | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 49/+5.7/+0.2 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 49/+6.3/-0.2 | 44/+6.9/-3.0 |
| vuon | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 72/+5.0/-3.8 | frost-vignette | 72/+5.3/-3.4 | 71/+5.5/-4.5 |
| vuon | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 75/+5.5/+1.3 | frost-vignette | 75/+5.9/+1.9 | 75/+6.1/+1.1 |
| vuon | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 66/+7.3/+4.1 | frost-vignette | 65/+7.8/+5.0 | 64/+8.1/+4.2 |
| vuon | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 52/+9.2/-4.8 | frost-vignette | 50/+9.9/-4.3 | 49/+10.3/-5.6 |
| thu | sáng | dry | 10 | none | 60/+8.8/+8.9 | none | 60/+8.8/+8.9 | 60/+9.0/+8.3 |
| thu | trưa | dry | 10 | none | 64/+9.6/+13.7 | none | 64/+9.6/+13.7 | 63/+9.8/+13.4 |
| thu | chiều | dry | 10 | none | 54/+12.7/+19.7 | none | 54/+12.7/+19.7 | 53/+13.2/+19.7 |
| thu | tối | dry | 10 | none | 41/+11.4/+11.5 | none | 41/+11.4/+11.5 | 39/+11.7/+11.0 |
| thu | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 66/+8.3/+8.7 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 64/+9.2/+9.3 | 58/+10.0/+7.3 |
| thu | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 70/+8.9/+12.5 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 68/+9.9/+13.6 | 63/+10.7/+12.1 |
| thu | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 61/+11.7/+18.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 60/+13.1/+20.1 | 53/+14.3/+19.4 |
| thu | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 43/+10.1/+11.4 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 43/+11.1/+12.1 | 38/+11.8/+10.5 |
| thu | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 59/+10.1/+5.4 | frost-vignette | 58/+10.8/+6.4 | 57/+11.2/+5.6 |
| thu | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 65/+10.6/+9.3 | frost-vignette | 64/+11.4/+10.5 | 63/+11.7/+10.0 |
| thu | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 55/+13.7/+16.8 | frost-vignette | 54/+14.8/+18.3 | 52/+15.3/+18.2 |
| thu | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 42/+10.3/+8.9 | frost-vignette | 39/+11.1/+10.1 | 37/+11.4/+9.5 |
| dtd | sáng | dry | 10 | none | 65/+8.2/+20.1 | none | 65/+8.2/+20.1 | 64/+8.4/+19.8 |
| dtd | trưa | dry | 10 | none | 68/+8.8/+24.1 | none | 68/+8.8/+24.1 | 67/+9.1/+24.3 |
| dtd | chiều | dry | 10 | none | 58/+12.7/+28.3 | none | 58/+12.7/+28.3 | 57/+13.1/+28.6 |
| dtd | tối | dry | 10 | none | 45/+12.7/+18.5 | none | 45/+12.7/+18.5 | 43/+13.0/+17.9 |
| dtd | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 71/+7.4/+18.8 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 69/+8.3/+20.5 | 64/+8.9/+19.4 |
| dtd | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 74/+7.5/+22.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 73/+8.4/+24.2 | 68/+9.1/+23.7 |
| dtd | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+11.3/+26.3 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 63/+12.7/+28.8 | 57/+13.8/+28.9 |
| dtd | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 49/+11.2/+18.0 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 49/+12.3/+19.4 | 43/+13.1/+18.3 |
| dtd | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 65/+9.7/+17.2 | frost-vignette | 64/+10.4/+18.6 | 64/+10.8/+18.2 |
| dtd | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 70/+9.6/+20.9 | frost-vignette | 69/+10.3/+22.5 | 69/+10.7/+22.4 |
| dtd | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 59/+13.7/+26.2 | frost-vignette | 58/+14.8/+28.1 | 56/+15.3/+28.4 |
| dtd | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 48/+11.8/+17.1 | frost-vignette | 46/+12.8/+18.6 | 44/+13.2/+18.1 |
| tn | sáng | dry | 10 | none | 62/+7.6/+13.5 | none | 62/+7.6/+13.5 | 60/+7.9/+13.3 |
| tn | trưa | dry | 10 | none | 64/+9.2/+19.0 | none | 64/+9.2/+19.0 | 63/+9.5/+19.1 |
| tn | chiều | dry | 10 | none | 55/+11.1/+22.1 | none | 55/+11.1/+22.1 | 54/+11.5/+22.3 |
| tn | tối | dry | 10 | none | 44/+10.7/+11.8 | none | 44/+10.7/+11.8 | 41/+11.0/+11.2 |
| tn | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 67/+7.3/+12.7 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 66/+8.2/+13.7 | 60/+8.7/+12.4 |
| tn | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 70/+8.5/+17.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 69/+9.6/+19.0 | 63/+10.4/+18.3 |
| tn | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 62/+10.0/+20.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 60/+11.3/+22.1 | 53/+12.3/+21.7 |
| tn | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+9.7/+11.5 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+10.6/+12.2 | 41/+11.3/+10.6 |
| tn | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 61/+9.6/+10.1 | frost-vignette | 60/+10.4/+11.2 | 59/+10.7/+10.9 |
| tn | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 64/+11.1/+15.5 | frost-vignette | 64/+11.9/+16.9 | 63/+12.4/+16.9 |
| tn | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 55/+12.3/+19.0 | frost-vignette | 54/+13.3/+20.6 | 52/+13.8/+20.7 |
| tn | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 45/+10.5/+10.0 | frost-vignette | 43/+11.4/+11.3 | 41/+11.8/+10.7 |
| kn | sáng | dry | 10 | none | 64/+13.4/+22.2 | none | 64/+13.4/+22.2 | 63/+13.8/+22.2 |
| kn | trưa | dry | 10 | none | 67/+13.4/+25.8 | none | 67/+13.4/+25.8 | 66/+13.9/+26.0 |
| kn | chiều | dry | 10 | none | 58/+16.5/+28.5 | none | 58/+16.5/+28.5 | 57/+17.1/+28.9 |
| kn | tối | dry | 10 | none | 50/+15.1/+21.2 | none | 50/+15.1/+21.2 | 48/+15.5/+20.9 |
| kn | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 69/+11.7/+19.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 68/+13.0/+21.8 | 62/+14.1/+21.2 |
| kn | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 72/+11.5/+22.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 71/+12.9/+25.2 | 66/+14.1/+25.0 |
| kn | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+14.0/+26.0 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 63/+15.6/+28.5 | 57/+17.1/+28.7 |
| kn | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 52/+13.1/+19.2 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 53/+14.4/+20.8 | 48/+15.4/+19.9 |
| kn | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 63/+14.0/+18.9 | frost-vignette | 62/+15.0/+20.4 | 61/+15.5/+20.4 |
| kn | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 67/+13.9/+22.2 | frost-vignette | 66/+14.8/+23.9 | 66/+15.4/+24.1 |
| kn | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 59/+16.3/+26.4 | frost-vignette | 58/+17.5/+28.4 | 56/+18.2/+28.8 |
| kn | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 51/+14.1/+18.5 | frost-vignette | 50/+15.2/+20.2 | 47/+15.7/+19.8 |
| tyv | sáng | dry | 10 | none | 61/+11.3/+16.1 | none | 61/+11.3/+16.1 | 60/+11.7/+15.9 |
| tyv | trưa | dry | 10 | none | 66/+11.8/+21.1 | none | 66/+11.8/+21.1 | 65/+12.3/+21.1 |
| tyv | chiều | dry | 10 | none | 55/+15.5/+26.5 | none | 55/+15.5/+26.5 | 53/+16.1/+26.9 |
| tyv | tối | dry | 10 | none | 38/+15.1/+14.4 | none | 38/+15.1/+14.4 | 36/+15.7/+14.1 |
| tyv | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 68/+10.5/+16.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 66/+11.7/+17.7 | 60/+12.9/+16.7 |
| tyv | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 71/+10.8/+20.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 70/+12.1/+22.4 | 65/+13.2/+21.9 |
| tyv | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 62/+13.7/+25.1 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 61/+15.3/+27.6 | 54/+17.0/+27.7 |
| tyv | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 42/+13.3/+14.4 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 42/+14.7/+15.5 | 36/+15.9/+14.3 |
| tyv | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 62/+13.2/+15.4 | frost-vignette | 61/+14.1/+16.9 | 60/+14.7/+16.7 |
| tyv | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 66/+13.5/+20.2 | frost-vignette | 65/+14.4/+21.9 | 65/+15.1/+22.0 |
| tyv | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 56/+16.4/+25.6 | frost-vignette | 55/+17.6/+27.5 | 53/+18.4/+27.9 |
| tyv | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 42/+14.9/+14.4 | frost-vignette | 40/+16.0/+15.9 | 37/+16.7/+15.6 |
| ksp | sáng | dry | 10 | none | 54/+13.2/+12.4 | none | 54/+13.2/+12.4 | 53/+13.6/+11.9 |
| ksp | trưa | dry | 10 | none | 57/+14.2/+17.6 | none | 57/+14.2/+17.6 | 56/+14.7/+17.5 |
| ksp | chiều | dry | 10 | none | 50/+15.8/+21.9 | none | 48/+16.2/+22.2 | 47/+16.9/+22.3 |
| ksp | tối | dry | 10 | none | 37/+16.4/+13.8 | none | 37/+16.4/+13.8 | 34/+16.9/+13.1 |
| ksp | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 60/+12.2/+11.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 59/+13.6/+12.3 | 52/+14.6/+10.6 |
| ksp | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 64/+13.1/+16.1 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 63/+14.4/+17.6 | 57/+15.7/+16.5 |
| ksp | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 56/+14.9/+20.4 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 54/+16.6/+22.4 | 46/+18.2/+22.0 |
| ksp | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 38/+14.0/+12.4 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 38/+15.4/+13.3 | 32/+16.5/+11.6 |
| ksp | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 54/+14.6/+9.6 | frost-vignette | 53/+15.6/+10.9 | 51/+16.1/+10.3 |
| ksp | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 60/+15.5/+15.2 | frost-vignette | 59/+16.6/+16.7 | 58/+17.2/+16.4 |
| ksp | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 48/+18.2/+20.7 | frost-vignette | 47/+19.5/+22.5 | 45/+20.3/+22.6 |
| ksp | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 35/+15.2/+10.3 | frost-vignette | 33/+16.3/+11.8 | 30/+16.8/+11.0 |
| lc | sáng | dry | 10 | none | 54/+2.5/+2.9 | none | 54/+2.5/+2.9 | 53/+2.5/+2.1 |
| lc | trưa | dry | 10 | none | 62/+5.4/+9.6 | none | 62/+5.4/+9.6 | 60/+5.5/+9.1 |
| lc | chiều | dry | 10 | none | 47/+10.0/+17.2 | none | 47/+10.0/+17.2 | 45/+10.3/+17.0 |
| lc | tối | dry | 10 | none | 27/+1.7/-4.5 | none | 27/+1.7/-4.5 | 24/+1.6/-5.7 |
| lc | sáng | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 56/+2.2/-0.7 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 56/+2.2/-0.7 | 56/+2.3/-1.3 |
| lc | trưa | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 63/+3.8/+4.6 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 63/+3.8/+4.6 | 63/+4.0/+4.6 |
| lc | chiều | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 50/+7.8/+10.4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 50/+7.8/+10.4 | 49/+8.4/+10.8 |
| lc | tối | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(40, 50, 80, 0.063), rgba(40, 50, 80, 0.063)) | 27/+1.6/-7.7 | light (rgba(0, 0, 0, 0),), lg(rgba(40, 50, 80, 0.063), rgba(40, 50, 80, 0.063)) | 27/+1.6/-7.7 | 25/+1.3/-8.4 |
| lc | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 62/+3.6/-2.7 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 62/+3.6/-2.7 | 59/+4.0/-3.3 |
| lc | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 67/+4.4/-0.8 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 67/+4.4/-0.8 | 65/+4.9/-1.2 |
| lc | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 56/+8.0/+6.1 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 56/+8.0/+6.1 | 53/+8.8/+6.3 |
| lc | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 32/+2.7/-9.8 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 32/+2.7/-9.8 | 27/+3.0/-11.2 |
| rp3 | sáng | dry | 10 | saturate(1.07) brightness(1.02) | 71/+7.6/+10.0 | saturate(1.07) brightness(1.02) | 71/+7.6/+10.0 | 69/+7.3/+9.0 |
| rp3 | trưa | dry | 10 | saturate(1.07) brightness(1.02) | 74/+9.1/+17.0 | saturate(1.07) brightness(1.02) | 74/+9.1/+17.0 | 72/+8.7/+15.7 |
| rp3 | chiều | dry | 10 | saturate(1.07) brightness(1.02) | 63/+12.0/+21.8 | saturate(1.07) brightness(1.02) | 63/+12.0/+21.8 | 60/+11.4/+20.2 |
| rp3 | tối | dry | 10 | saturate(1.07) brightness(1.02) | 47/+10.4/+10.3 | saturate(1.07) brightness(1.02) | 47/+10.4/+10.3 | 44/+9.8/+8.9 |
| rp3 | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 72/+8.0/+8.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 71/+8.9/+8.7 | 66/+9.7/+7.1 |
| rp3 | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 76/+8.9/+13.6 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 74/+9.9/+14.7 | 70/+10.9/+13.6 |
| rp3 | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+11.2/+17.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 64/+12.5/+19.6 | 58/+13.7/+19.0 |
| rp3 | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+9.3/+8.6 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+10.2/+9.1 | 40/+10.9/+7.1 |
| rp3 | sáng | snow/frost | 2 | saturate(1.07) brightness(1.02) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba | 64/+14.0/+7.8 | saturate(1.07) brightness(1.02) + frost-vignette | 63/+14.9/+8.9 | 61/+14.4/+7.8 |
| rp3 | trưa | snow/frost | 2 | saturate(1.07) brightness(1.02) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba | 69/+14.7/+14.0 | saturate(1.07) brightness(1.02) + frost-vignette | 68/+15.7/+15.4 | 66/+15.2/+14.1 |
| rp3 | chiều | snow/frost | 2 | saturate(1.07) brightness(1.02) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba | 58/+18.1/+20.8 | saturate(1.07) brightness(1.02) + frost-vignette | 57/+19.3/+22.6 | 54/+18.6/+20.9 |
| rp3 | tối | snow/frost | 2 | saturate(1.07) brightness(1.02) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba | 41/+13.8/+8.3 | saturate(1.07) brightness(1.02) + frost-vignette | 39/+14.9/+9.6 | 36/+14.2/+8.1 |
| rp2 | sáng | dry | 10 | saturate(1.04) | 70/+7.2/+9.7 | saturate(1.04) | 70/+7.2/+9.7 | 69/+7.3/+9.0 |
| rp2 | trưa | dry | 10 | saturate(1.04) | 73/+8.7/+16.4 | saturate(1.04) | 73/+8.7/+16.4 | 72/+8.7/+15.7 |
| rp2 | chiều | dry | 10 | saturate(1.04) | 62/+11.3/+21.0 | saturate(1.04) | 62/+11.3/+21.0 | 60/+11.4/+20.2 |
| rp2 | tối | dry | 10 | saturate(1.04) | 46/+9.9/+10.0 | saturate(1.04) | 46/+9.9/+10.0 | 44/+9.8/+8.9 |
| rp2 | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 72/+8.0/+8.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 71/+8.9/+8.7 | 66/+9.7/+7.1 |
| rp2 | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 76/+8.9/+13.6 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 74/+9.9/+14.7 | 70/+10.9/+13.6 |
| rp2 | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+11.2/+17.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 64/+12.5/+19.6 | 58/+13.7/+19.0 |
| rp2 | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+9.3/+8.6 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+10.2/+9.1 | 40/+10.9/+7.1 |
| rp2 | sáng | snow/frost | 2 | saturate(1.04) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0 | 63/+13.3/+7.5 | saturate(1.04) + frost-vignette | 62/+14.2/+8.6 | 61/+14.4/+7.8 |
| rp2 | trưa | snow/frost | 2 | saturate(1.04) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0 | 68/+14.1/+13.4 | saturate(1.04) + frost-vignette | 67/+15.0/+14.8 | 66/+15.2/+14.1 |
| rp2 | chiều | snow/frost | 2 | saturate(1.04) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0 | 57/+17.2/+19.9 | saturate(1.04) + frost-vignette | 56/+18.4/+21.6 | 54/+18.6/+20.9 |
| rp2 | tối | snow/frost | 2 | saturate(1.04) + light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0 | 40/+13.1/+8.0 | saturate(1.04) + frost-vignette | 38/+14.1/+9.2 | 36/+14.2/+8.1 |
| rp0 | sáng | dry | 10 | none | 70/+7.0/+9.3 | none | 70/+7.0/+9.3 | 69/+7.3/+9.0 |
| rp0 | trưa | dry | 10 | none | 73/+8.4/+15.7 | none | 73/+8.4/+15.7 | 72/+8.7/+15.7 |
| rp0 | chiều | dry | 10 | none | 61/+11.0/+20.1 | none | 61/+11.0/+20.1 | 60/+11.4/+20.2 |
| rp0 | tối | dry | 10 | none | 46/+9.5/+9.6 | none | 46/+9.5/+9.6 | 44/+9.8/+8.9 |
| rp0 | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 72/+8.0/+8.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 71/+8.9/+8.7 | 66/+9.7/+7.1 |
| rp0 | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 76/+8.9/+13.6 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 74/+9.9/+14.7 | 70/+10.9/+13.6 |
| rp0 | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+11.2/+17.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 64/+12.5/+19.6 | 58/+13.7/+19.0 |
| rp0 | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+9.3/+8.6 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+10.2/+9.1 | 40/+10.9/+7.1 |
| rp0 | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 63/+12.9/+7.1 | frost-vignette | 62/+13.7/+8.2 | 61/+14.4/+7.8 |
| rp0 | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 68/+13.6/+12.8 | frost-vignette | 67/+14.4/+14.1 | 66/+15.2/+14.1 |
| rp0 | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 57/+16.6/+19.0 | frost-vignette | 56/+17.7/+20.8 | 54/+18.6/+20.9 |
| rp0 | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 40/+12.6/+7.6 | frost-vignette | 38/+13.6/+8.8 | 36/+14.2/+8.1 |
| rp1 | sáng | dry | 10 | none | 70/+7.0/+9.3 | none | 70/+7.0/+9.3 | 69/+7.3/+9.0 |
| rp1 | trưa | dry | 10 | none | 73/+8.4/+15.7 | none | 73/+8.4/+15.7 | 72/+8.7/+15.7 |
| rp1 | chiều | dry | 10 | none | 62/+11.1/+20.2 | none | 61/+11.0/+20.1 | 60/+11.4/+20.2 |
| rp1 | tối | dry | 10 | none | 46/+9.5/+9.6 | none | 46/+9.5/+9.6 | 44/+9.8/+8.9 |
| rp1 | sáng | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 72/+8.0/+8.2 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 71/+8.9/+8.7 | 66/+9.7/+7.1 |
| rp1 | trưa | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 76/+8.9/+13.6 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 74/+9.9/+14.7 | 71/+9.5/+13.2 |
| rp1 | chiều | wet | 4 | saturate(0.97) contrast(0.94) brightness(1.07) + light (rgba(255, 238, 210, 0.13), rgba(255, 22 | 65/+11.2/+17.9 | saturate(1.05) contrast(0.95) brightness(1.05) + light (rgba(255, 234, 198, 0.1), rgba(255, 222 | 64/+12.5/+19.6 | 58/+13.7/+19.0 |
| rp1 | tối | wet | 4 | saturate(0.95) contrast(0.95) brightness(1.01) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+9.3/+8.6 | saturate(1.02) contrast(0.96) brightness(1.02) + light (rgba(255, 214, 160, 0.04), rgba(255, 20 | 46/+10.2/+9.1 | 40/+10.9/+7.1 |
| rp1 | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 63/+12.9/+7.1 | frost-vignette | 62/+13.7/+8.2 | 61/+14.4/+7.8 |
| rp1 | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 68/+13.6/+12.8 | frost-vignette | 67/+14.4/+14.1 | 66/+15.2/+14.1 |
| rp1 | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 57/+16.6/+19.0 | frost-vignette | 56/+18.5/+21.7 | 54/+18.6/+20.9 |
| rp1 | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 40/+12.6/+7.6 | frost-vignette | 38/+13.6/+8.8 | 36/+14.2/+8.1 |
| tgk | sáng | dry | 10 | none | 54/+2.5/+2.9 | none | 54/+2.5/+2.9 | 53/+2.5/+2.1 |
| tgk | trưa | dry | 10 | none | 62/+5.4/+9.6 | none | 62/+5.4/+9.6 | 60/+5.5/+9.1 |
| tgk | chiều | dry | 10 | none | 47/+10.0/+17.2 | none | 47/+10.0/+17.2 | 45/+10.3/+17.0 |
| tgk | tối | dry | 10 | none | 27/+1.7/-4.5 | none | 27/+1.7/-4.5 | 24/+1.6/-5.7 |
| tgk | sáng | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 56/+2.2/-0.7 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 56/+2.2/-0.7 | 56/+2.3/-1.3 |
| tgk | trưa | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 63/+3.8/+4.6 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 63/+3.8/+4.6 | 63/+4.0/+4.6 |
| tgk | chiều | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 50/+7.8/+10.4 | light (rgba(0, 0, 0, 0),), lg(rgba(90, 100, 120, 0.043), rgba(90, 100, 120, 0.043)) | 50/+7.8/+10.4 | 49/+8.4/+10.8 |
| tgk | tối | wet | 4 | light (rgba(0, 0, 0, 0),), lg(rgba(40, 50, 80, 0.063), rgba(40, 50, 80, 0.063)) | 27/+1.6/-7.7 | light (rgba(0, 0, 0, 0),), lg(rgba(40, 50, 80, 0.063), rgba(40, 50, 80, 0.063)) | 27/+1.6/-7.7 | 25/+1.3/-8.4 |
| tgk | sáng | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 62/+3.6/-2.7 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 62/+3.6/-2.7 | 59/+4.0/-3.3 |
| tgk | trưa | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 67/+4.4/-0.8 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 67/+4.4/-0.8 | 65/+4.9/-1.2 |
| tgk | chiều | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 56/+8.0/+6.1 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 56/+8.0/+6.1 | 53/+8.8/+6.3 |
| tgk | tối | snow/frost | 2 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 32/+2.7/-9.8 | light (rgba(0, 0, 0, 0),), lg(rgba(200, 225, 255, 0.04), rgba(200, 225, 255, 0.04)) + frost-vig | 32/+2.7/-9.8 | 27/+3.0/-11.2 |
