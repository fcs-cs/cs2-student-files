//Your Name(s)
//Project Name
//Date

/* A brief description of what the program is */

ruleset = [0, 0, 0, 1, 1, 1, 1, 0];
let ca = [];
const gensize = 201;
let gridsize;

function setup() {
    createCanvas(400, 400);
    gridsize = width / gensize

    gen0 = Array(gensize).fill(0);
    gen0[floor(gensize/2)] = 1;
    ca.push(gen0);
    console.log(ca)

}

function draw() {
    display();
    generate();
    scroll();
}

function generate(){
    const thisgen = ca[ca.length-1]
    let nextgen = Array(gensize).fill(0);

    for(let i = 1; i < gensize - 1; i++){
        nextgen[i] = rules(thisgen[i-1],thisgen[i],thisgen[i+1])
    }

    ca.push(nextgen)
    //console.log(ca)
}

function display(){
    background(255);
    fill(0);
    noStroke();
    for(let i = 0; i  < ca.length; i++){
        for(let j = 0; j < ca[i].length; j++){
            if(ca[i][j] == 1) {
                rect(j * gridsize, i * gridsize, gridsize, gridsize)
            }
        }
    }
}

function scroll(){
    if(ca.length*gridsize > height){
        ca.shift();
    }
}
function rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) return ruleset[0];
    if (a == 1 && b == 1 && c === 0) return ruleset[1];
    if (a == 1 && b === 0 && c == 1) return ruleset[2];
    if (a == 1 && b === 0 && c === 0) return ruleset[3];
    if (a === 0 && b == 1 && c == 1) return ruleset[4];
    if (a === 0 && b == 1 && c === 0) return ruleset[5];
    if (a === 0 && b === 0 && c == 1) return ruleset[6];
    if (a === 0 && b === 0 && c === 0) return ruleset[7];
    return 0;
}
