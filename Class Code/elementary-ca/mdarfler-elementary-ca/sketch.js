
//Your Name(s)
//Project Name
//Date

/* A brief description of what the program is */

let gen1 = Array(57).fill(0);

let gridsize;
function setup() {
    createCanvas(400, 400);
    gen1[round(gen1.length/2)]=1
    gridsize = width/gen1.length
    console.log(gridsize)
}

function draw() {
    background(255);

    for(let i = 0; i < gen1.length; i++){
        if(gen1[i] == 1){
            noStroke();
            fill(0);
            rect(i*gridsize,0,gridsize,gridsize)
        }
    }
}
