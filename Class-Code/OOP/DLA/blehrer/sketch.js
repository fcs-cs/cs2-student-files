//Your Name(s)
//Project Name
//Date

/* A brief description of what the program is */

class Walker {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.r = 1;
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
            let hue = map(dist(this.x, this.y, width / 2, height / 2), 0, dist(width / 2, height / 2, 0, 0), 0, 360);
            this.color = [hue, 100, 100];
            let distance = dist(this.x, this.y, width / 2, height / 2);
            if(distance > farthestAttached) farthestAttached = distance;
            return true;
        }
        return false;
    }
    boundary() {
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > width) {
            this.x = width;
        }
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y > height) {
            this.y = height;
        }
    }
    show() {
        fill(this.color);
        ellipse(this.x, this.y, this.r);
    }
}

let attachedWalkers = [];

let freeWalkers = [];

const walkers = 2000;

let farthestAttached = 0;

function setup() {
    createCanvas(400, 400);

    noStroke();

    ellipseMode(RADIUS);

    colorMode(HSB);

    attachedWalkers[0] = new Walker(width / 2, height / 2);
    attachedWalkers[0].attached = true;
    attachedWalkers[0].color = [360, 100, 100];

    while (freeWalkers.length < walkers) {
        freeWalkers.push(new Walker(random(0, width), random(0, height)));
    }
}

function draw() {
    background(0, 0, 86);
    for (let i = 0; i < walkers; ++i) {
        freeWalkers[i].move();
        freeWalkers[i].boundary();
        if(dist(freeWalkers[i].x, freeWalkers[i].y, width / 2, height / 2) > farthestAttached + 10) continue;
        freeWalkers[i].show();
        for (let j = 0; j < attachedWalkers.length; ++j) {
            if (freeWalkers[i].collide(attachedWalkers[j])) {
                break;
            }
        }
    }
    let newAttachedWalkers = freeWalkers.filter((b) => b.attached);
    for (let i = 0; i < newAttachedWalkers.length; ++i) {
        attachedWalkers.push(newAttachedWalkers[i]);
        // for (let j = 0; j < attachedWalkers.length; ++j) {
        //     attachedWalkers[j].r += 0.5 / attachedWalkers.length;
        // }
    }
    for (let i = 0; i < attachedWalkers.length; ++i) {
        attachedWalkers[i].show();
    }
    let stillFreeWalkers = freeWalkers.filter((b) => !b.attached);
    for (let i = 0; i < walkers; ++i) {
        freeWalkers[i] = stillFreeWalkers[i] ? stillFreeWalkers[i] : new Walker(random(0, width), random(0, height));
    }
}