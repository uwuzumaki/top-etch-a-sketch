Etch A Sketch for The Odin Project.

Bugs:
Due to rounding errors that randomly appear, there are at times spaces between rows of squares. To combat this I've rounded the size of the squares up. However, when changing the size of the canvas via the slider, it causes noticable shifts in the size of the canvas. Attempts at solving this rounding error via calculating the dimensions of each cube, multiplying it by the number of sqaures each row, and seeing if this new value ends up under or 500px (the dimensions of the canvas). I then either keep or round up the result to minimize the number of square sizes that far exceed the dimensions of the canvas while eliminating the blank lines that appear. However the size of the canvas will fluctuate due to rounding.

Optimizations:
Redrawing the canvas without deleting all the squares and readding them in the dom.
