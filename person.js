class Person {
    constructor(isSick = false) {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.isDead = false;
        this.isSick = isSick;
        this.immune = false;
        this.sickTime = 60;
    }
    update() {
        if(!this.isDead) {
            this.pos.add(this.vel);

            if(this.sickTime <= 0) {
                this.isSick = false;
                this.sickTime = 0;
                this.getWell();
            }
            if(this.isSick) {
                this.sickTime -= 0.02; // TODO: Improve
                if(!this.isDead && floor(random(10000)) == 1)
                    this.die();
            }
        }
    }
    emitInfection(people) {
        if((this.isSick || this.immune) && !this.isDead) {
            for(let i = 0; i < people.length; i++) {
                let other = people[i];
                let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                if(d < infectionRadius) {
                    if(this.isSick) {
                        let r = floor(random(100));
                        if(r == 1)
                            other.getSick();
                    }
                    else if(this.immune) {
                        if(other.isSick)
                            other.sickTime -= 0.1;
                        else {
                            let r = floor(random(100));
                            if(r == 1)
                                other.getWell();
                        }
                    }
                }
            }
        }
    }
    edge() {
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;
    }
    die() {
        this.immune = false;
        this.isSick = false;
        this.isDead = true;
    }
    show() {
        if(!this.isDead) {
            stroke(255);
            noFill();
            strokeWeight(4);
            point(this.pos.x, this.pos.y);
    
            if(this.isSick) {
                stroke(255, 0, 0);
                strokeWeight(1);
                circle(this.pos.x, this.pos.y, infectionRadius * 2);
            }
            if(this.immune) {
                stroke(0, 255, 0);
                strokeWeight(1);
                circle(this.pos.x, this.pos.y, infectionRadius * 2);
            }
        } else {
            stroke(100);
            noFill();
            strokeWeight(4);
            point(this.pos.x, this.pos.y);
        }
    }
    getSick() {
        if(!this.immune && !this.isDead) {
            if(!this.isSick) {
                this.isSick = true;
                this.sickTime = 60;
            } else {
                this.sickTime += 0.1;
            }
        }
    }
    getWell() {
        if(!this.isDead) {
            this.isSick = false;
            this.immune = true;
        }
    }
    copy() {
        return new Person(this.isSick);
    }
}