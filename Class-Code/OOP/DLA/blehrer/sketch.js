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
        this.color = 100;
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
            this.color = 0;
            return true;
        }
        return false;
    }
    show() {
        push();
        colorMode(HSB);
        fill(0, 100, this.color);
        ellipse(this.x, this.y, this.r);
        pop();
    }
}

let attachedWalkers = [];

let freeWalkers = [];

function setup() {
    createCanvas(400, 400);
}

function draw() {
    while (freeWalkers.length < 100) {
        freeWalkers.push(new Walker(random(0, width), random(0, height)));
    }
    background(220);
    let newAttachedWalkers = [];
    let stillFreeWalkers = [];
    for (let i = 0; i < freeWalkers.length; ++i) {
        freeWalkers[i].move;
        freeWalkers[i].show;
        for (let j = 0; j < attachedWalkers.length; ++j) {
            if (freeWalkers[i].collide(attachedWalkers[j])) {
                newAttachedWalkers.push(freeWalkers[i]);
                continue;
            }
            stillFreeWalkers.push(freeWalkers[i]);
        }
    }
    attachedWalkers.push(newAttachedWalkers);
    freeWalkers = stillFreeWalkers;
}