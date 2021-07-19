class Grid {
    constructor(res) {
        this.rows = floor(height / res);
        this.cols = floor(width / res);
        this.res = res;
        this.personarray = new Array(this.rows);
        for(let i = 0; i < this.personarray.length; i++) {
            this.personarray[i] = new Array(this.cols);
            for(let j = 0; j < this.cols; j++) {
                this.personarray[i][j] = [];
                for(let k = 0; k < floor(random(1, 10)); k++) {
                    this.personarray[i][j].push(new Person());
                }
            }
        }
    }
    update() {
        let x = floor(random(this.rows));
        let y = floor(random(this.cols));
        let a = floor(random(this.personarray[x][y]));
        let tx = floor(random(this.rows));
        let ty = floor(random(this.cols));
        for(let i = 0; i < a; i++) {
            this.move(x, y, tx, ty, a);
        }
    }
    move(x, y, tx, ty, a) {
        let container = [];
        for(let i = a; i >= 0; i--) {
            container.push(this.personarray[x][y][i].copy());
            this.personarray.splice(i, 1);
        }
        for(let i = 0; i < container.length; i++) {
            this.personarray[tx][ty].push(container[i]);
        }
    }
    show() {
        stroke(255);
        noFill();
        for(let j = 0; j < this.rows; j++) {
            for(let i = 0; i < this.cols; i++) {
                rect(i * this.res, j * this.res, this.res, this.res);
            }
        }
    }
}