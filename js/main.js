// set selesctor on canvas
const canvas = document.querySelector('canvas');

// could use a different one to go 3d
const ctx = canvas.getContext('2d')

// sets canvas to screen size so the balls dont go off screen
// may want to alter to have balls go from one side to the other?
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// function to genereate random whole number
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// genertea random RGB color by calling random number for each RGB value!!!
function randcolor() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}


class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;

    }

    // when i say ctx the browser knows im saying check dis canvas method
    draw() {

        // begion path means start draw
        ctx.beginPath();

        // what kinda fill? this.color kinda fill
        ctx.fillStyle = this.color

        // arc is a 360 arc to make circle
        // x and y is where the center is
        // 2*Math.PI to make circle
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }


    update() {
        // to sim movement you need to redraw the position at the rate of vel
        this.x += this.velX;
        this.y += this.velY;

        // lets bounce back from the wall left/right
        // x + size so the ball stops on the circumference not the center
        // width is max screen width
        // 0 is the oither side
        // if i want to have balls go through you may need to-
        // - change the position of ball on impact of wall-
        // so keep if statement the same and instead of vel change base x and y values
        if (this.x > width) {
            this.x = 0
            this.color = randcolor()
        }
        if (this.x < 0) {
            this.x = width
            this.color = randcolor()
        }

        if (this.y > height) {
            this.y = 0
            this.color = randcolor()
        }
        if (this.y < 0) {
            this.y = height
            this.color = randcolor()
        }
    }

}

const balls = []
// the while and size determines how many balls we got
// so long as array lwength is less than 10, make new balls
while (balls.length < 60) {
    const size = random(10, 30);
    const ball = new Ball(
        // 0+size and width-size so it doesnt generate partly off screen on either side of screen
        // x cord
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-10, 10),
        randcolor(),
        size,
    )

    balls.push(ball)
}


// loop through the functions to draw and animate
function loop() {
    // we fill backgound color transparency do the trails do not stay drawn
    ctx.fillStyle = ('rgba(0,0,0,0.01')
    // this fills the whole background
    ctx.fillRect(0, 0, width, height)


    for (const ball of balls) {
        ball.draw()
        ball.update()

    }
    requestAnimationFrame(loop)
}

loop();