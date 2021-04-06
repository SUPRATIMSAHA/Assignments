const canvas = document.getElementById('canvas')
const pen = canvas.getContext('2d')
pen.fillStyle = 'yellow';


const cs = 47
const H = 500
const W = 1200
let food = null
let score = 0

const snake = {
    init_len: 5,
    direction: 'right',
    cells: [],

    createSnake: function() {
        for (let i = 0; i < this.init_len; i++){
            this.cells.push({
                x: i,
                y: 0
            })
        }
    },

    drawSnake: function(){
        for (let cell of this.cells){
            pen.fillRect(cell.x * cs, cell.y * cs, cs-2, cs-2)
        }
    },

    updateSnake: function(){
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y

        if( headX === food.x && headY === food.y){
            food = getRandomFood();
            score ++;
        }
        else{
            this.cells.shift()
        }

        let nextX, nextY;

        if(this.direction == 'up'){
            nextX = headX
            nextY = headY - 1

            if(nextY * cs < 0){
                clearInterval(id)
                pen.fillStyle = 'lightgreen'
                pen.fillText('Game Over', 50, 100)
            }
        }
        else if(this.direction == 'down'){
            nextX = headX
            nextY = headY + 1

            if(nextY * cs > H){
                clearInterval(id)
                pen.fillStyle = 'lightgreen'
                pen.fillText('Game Over', 50, 100)
            }
        }
        else if(this.direction == 'left'){
            nextX = headX - 1
            nextY = headY

            if(nextX * cs < 0){
                clearInterval(id)
                pen.fillStyle = 'lightgreen'
                pen.fillText('Game Over', 50, 100)
            }
        }
        else{
            nextX = headX + 1
            nextY = headY

            if(nextX * cs > W){
                clearInterval(id)
                pen.fillStyle = 'lightgreen'
                pen.fillText('Game Over', 50, 100)
            }
        }

        for (let i = 0; i < this.cells.length-1; i++){
            var pos = this.cells[i]
            var d = Math.sqrt((headX - pos.x) * (headX - pos.x) + (headY - pos.y) * (headY - pos.y))
            if(d < 1){
                clearInterval(id)
                pen.fillStyle = 'lightgreen'
                pen.fillText('Game Over', 50, 100)
            }
        }

        this.cells.push({
            x: nextX,
            y: nextY
        })
    }
}

function init(){
    snake.createSnake();
    food = getRandomFood()
    pen.fillText(`Score ${score}`, 50, 50)

    function keypressed(e){
        if(e.key === "ArrowDown" && snake.direction !== "up"){
            snake.direction = 'down'
        }
        else if(e.key === "ArrowUp" && snake.direction !== "down"){
            snake.direction = 'up'
        }
        else if(e.key === "ArrowLeft" && snake.direction !== "right"){
            snake.direction = 'left'
        }
        else if(e.key === "ArrowRight" && snake.direction !== "left"){
            snake.direction = 'right'
        }
    }

    document.addEventListener('keydown', keypressed)
}

function draw(){
    pen.clearRect(0, 0, W, H);
    pen.font = '30px sans-serif';
    pen.fillText(`Score ${score}`, 50, 50)
    pen.fillStyle = 'blue'
    pen.fillRect(food.x * cs, food.y * cs, cs, cs)
    pen.fillStyle = 'yellow'
    snake.drawSnake();
}

function upadte(){
    snake.updateSnake()
}

function gameLoop(){
    draw()
    upadte()
}

function getRandomFood(){
    const foodX = Math.floor(Math.random() * (W - cs) / cs)
    const foodY = Math.floor(Math.random() * (H - cs) / cs)

    const food = {
        x: foodX,
        y: foodY
    }

    return food
}

init()

const id = setInterval(gameLoop, 250)
