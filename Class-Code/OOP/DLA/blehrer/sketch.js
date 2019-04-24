// Ben Lehrer
// DLA
// April 24, 2019

/* A DLA program that divides into quads to run faster */

class Walker {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.r = 1;
        this.angle = random(0, 2 * PI);
        this.color = 0;
        this.attached = false;
    }
    move() { //move at angle at random speed relative to previous angle
        if (this.attached) return;
        this.speed = random(0, 3);
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        this.angle += random(-PI / 6, PI / 6);
    }
    collide(walker, quadNum) { //check collision with attached if walker within range
        if (walker.attached == false || this.attached) return false;
        if (dist(this.x, this.y, walker.x, walker.y) < this.r + walker.r) {
            this.attached = true;
            let hue = map(dist(this.x, this.y, width / 2, height / 2), 0, dist(width / 2, height / 2, 0, 0), 0, 360);
            this.color = [hue, 100, 100];
            let distance = dist(this.x, this.y, width / 2, height / 2);
            if (distance > farthestAttached[quadNum]) farthestAttached[quadNum] = distance;
            return true;
        }
        return false;
    }
    boundary() { // don't let walker leave screen
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

const walkers = 3000;

let farthestAttached = [0, 0, 0, 0];

function setup() {
    createCanvas(400, 400);

    noStroke();

    ellipseMode(RADIUS);

    colorMode(HSB);

    //  stop when fills canvas
    for (let i = 0; i < 4; ++i) {
        if (farthestAttached[i] > width / 2 || farthestAttached[i] > height / 2) noLoop();
    }

    // set initial attached walker in center
    attachedWalkers[0] = new Walker(width / 2, height / 2);
    attachedWalkers[0].attached = true;
    attachedWalkers[0].color = [360, 100, 100];

    while (freeWalkers.length < walkers) {
        freeWalkers.push(new Walker(random(0, width), random(0, height)));
    }
}

function draw() {
    background(0, 0, 86);

    //split free walkers into arrays for each quad
    let freeQuad = [];
    for (let reps = 0; reps < 1; ++reps) {
        for (let i = 0; i < 4; ++i) {
            freeQuad[i] = [];
        }
        for (let i = 0; i < walkers; ++i) {
            freeWalkers[i].move();
            freeWalkers[i].boundary();
            if (freeWalkers[i].x > width / 2 && freeWalkers[i].y < height / 2) {
                freeQuad[0].push(freeWalkers[i]);
                continue;
            }
            if (freeWalkers[i].x < width / 2 && freeWalkers[i].y < height / 2) {
                freeQuad[1].push(freeWalkers[i]);
                continue;
            }
            if (freeWalkers[i].x < width / 2 && freeWalkers[i].y > height / 2) {
                freeQuad[2].push(freeWalkers[i]);
                continue;
            }
            if (freeWalkers[i].x > width / 2 && freeWalkers[i].y > height / 2) {
                freeQuad[3].push(freeWalkers[i]);
            }
        }

        //split attached walkers into new array for each quad
        let attachedQuad = [];
        for (let i = 0; i < 4; ++i) {
            attachedQuad[i] = [];
        }
        for (let i = 0; i < attachedWalkers.length; ++i) {
            walkerR = attachedWalkers[i].r;
            if (attachedWalkers[i].x > -walkerR + width / 2 && attachedWalkers[i].y < walkerR + height / 2) {
                attachedQuad[0].push(attachedWalkers[i]);
            }
            if (attachedWalkers[i].x < walkerR + width / 2 && attachedWalkers[i].y < walkerR + height / 2) {
                attachedQuad[1].push(attachedWalkers[i]);
            }
            if (attachedWalkers[i].x < walkerR + width / 2 && attachedWalkers[i].y > -walkerR + height / 2) {
                attachedQuad[2].push(attachedWalkers[i]);
            }
            if (attachedWalkers[i].x > -walkerR + width / 2 && attachedWalkers[i].y > -walkerR + height / 2) {
                attachedQuad[3].push(attachedWalkers[i]);
            }
        }

        // if walkers are within range check if they collide with attached
        let newAttachedWalkers = [];
        for (let quadNum = 0; quadNum < 4; ++quadNum) {
            for (let i = 0; i < freeQuad[quadNum].length; ++i) {
                if (dist(freeQuad[quadNum][i].x, freeQuad[quadNum][i].y, width / 2, height / 2) - 10 > farthestAttached[quadNum]) continue;
                freeQuad[quadNum][i].show();
                for (let j = 0; j < attachedQuad[quadNum].length; ++j) {
                    if (freeQuad[quadNum][i].collide(attachedQuad[quadNum][j], quadNum)) {
                        newAttachedWalkers.push(freeQuad[quadNum][i]);
                        break;
                    }
                }
            }
        }

        //add the newly collided walkers to attached walkers
        for (let i = 0; i < newAttachedWalkers.length; ++i) {
            attachedWalkers.push(newAttachedWalkers[i]);
        }

        // save walkers that are still free and refill free walker array
        let index = 0;
        for (let quadNum = 0; quadNum < 4; ++quadNum) {
            for (let i = 0; i < freeQuad[quadNum].length; ++i) {
                freeWalkers[index] = !freeQuad[quadNum][i].attached ? freeQuad[quadNum][i] : new Walker(random(0, width), random(0, height));
                ++index;
            }
        }
    }

    // draw quad grid
    push();
    strokeWeight(1);
    stroke(0);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    pop();

    //show attached walkers
    for (let i = 0; i < attachedWalkers.length; ++i) {
        attachedWalkers[i].show();
    }

    //if free walkers are in range show them
    for (let quadNum = 0; quadNum < 4; ++quadNum) {
        for (let i = 0; i < freeQuad[quadNum].length; ++i) {
            if (dist(freeQuad[quadNum][i].x, freeQuad[quadNum][i].y, width / 2, height / 2) - 10 > farthestAttached[quadNum]) continue;
            freeQuad[quadNum][i].show();
        }
    }
}