/**
 * class的继承等相关知识
 */

// extends, static, super

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width = 600;
const h = canvas.height = 400;

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = `rgb(${~~Ball.rpFn(55, 255)},${~~Ball.rpFn(55, 255)},${~~Ball.rpFn(55, 255)})`;
        return this;
    }

    static rpFn(arr) { // Ball.rpFn([1, 10]);
        let max = Math.max(...arr),
            min = Math.min(...arr);
        return Math.random() * (max - min) + min;
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        return this;
    }
}

// const ball = new Ball(100, 100, 30).render(ctx);

class SuperBall extends Ball {
    constructor(x, y, r) {
        super(x, y, r);
        this.vy = SuperBall.rpFn([2, 4]);
        this.g = SuperBall.rpFn([0.2, 0.4]);
        return this;
    }

    move(ctx) {
        this.y += this.vy;
        this.vy += this.g;

        let current = this.vy * -0.75;

        if (this.y + this.r >= ctx.canvas.height) {
            this.y = ctx.canvas.height - this.r;

            if (Math.abs(current - this.a) < 0.01) {
                return false;
            }

            this.vy *= -0.75;
        }
    }
}