//Your Name(s)
//Project Name
//Date

/* A brief description of what the program is */

class Walker {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.r = 2;
        this.angle = random(0, 2 * PI);
        this.color = 0;
        this.attached = false;
    }
    move() {
        if (this.attached) return;
        this.speed = random(0, 3);
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        this.angle += random(-PI / 6, PI / 6);
    }
    collide(walker) {
        if (walker.attached == false || this.attached) return false;
        if (dist(this.x, this.y, walker.x, walker.y) < this.r + walker.r) {
            this.attached = true;
            this.color = [255, 0, 0];
            return true;
        }
        return false;
    }
    show() {
        fill(this.color);
        ellipse(this.x, this.y, this.r);
    }
}

let attachedWalkers = [];

let freeWalkers = [];

const walkers = 100;

function setup() {
    createCanvas(400, 400);

    frameRate(10);

    noStroke();

    attachedWalkers[0] = new Walker(width / 2, height / 2);
    attachedWalkers[0].attached = true;
    attachedWalkers[0].color = [255, 0, 0];

    while (freeWalkers.length < walkers) {
        freeWalkers.push(new Walker(random(0, width), random(0, height)));
    }
}

function draw() {
    background(220);
    let newAttachedWalkers = [];
    let stillFreeWalkers = [];
    for (let i = 0; i < walkers; ++i) {
        freeWalkers[i].move();
        freeWalkers[i].show();
        for (let j = 0; j < attachedWalkers.length; ++j) {
            if (freeWalkers[i].collide(attachedWalkers[j])) {
                newAttachedWalkers.push(freeWalkers[i]);
                continue;
            }
            stillFreeWalkers.push(freeWalkers[i]);
        }
    }
    for(let i = 0; i < attachedWalkers.length; ++i){
        attachedWalkers[i].show();
    }
    attachedWalkers.push(newAttachedWalkers);
    for(let i = 0; i < walkers; ++i){
        freeWalkers[i] = stillFreeWalkers[i] ? stillFreeWalkers[i] : new Walker(random(0, width), random(0, height));
    }
    //noLoop();
}