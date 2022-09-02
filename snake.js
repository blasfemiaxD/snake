class Snake{
    constructor(x, y, size){
        this.x = x
        this.y = y;
        this.size = size
        this.tail = [{x:this.x, y:this.y}]
        this.rotateX = 0
        this.rotateY = 1
    }


    move(){
        var newRect;
        if(this.rotateX == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateX == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        }else if(this.rotateY == 1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        }else if(this.rotateY == -1){
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y -this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
        
    }
}

class Apple{
    constructor(){
        var isTouching;
        while(true){
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for(var i =0; i < snake.tail.length; i++){
                if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
                    isTouching = true
                }
            }
            this.color = "red"
            this.size = snake.size
            if(!isTouching){
                break;
            }            
        }
    }
}

var canvas = document.getElementById("canvas");

var snake = new Snake(20,20,20);
var apple = new Apple();

var canvasContext = canvas.getContext("2d");
//canvasContext.fillStyle = 'green';
//canvasContext.fillRect(10, 10, 100, 100)
//nuevo comentario


window.onload = ()=>{
    gameLoop();
}

function gameLoop(){
    setInterval(show, 1000/30) // here 15 is our fps value
}

function show (){
    update();
    draw();
}

function update(){
    //canvasContext.clearReact(0,0, canvas.width, canvas.height);
    snake.move();
    eatApple();
    checkHitWall();
}

function checkHitWall(){
    var headTail = snake.tail[snake.tail.length - 1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    }else if(headTail.x == canvas.width){
        headTail.x = 0
    }else if(headTail.y == - snake.size){
        console.log("Snake va hacia arriba")
        headTail.y = canvas.height - snake.size
    }else if(headTail.y  == canvas.height){
        console.log("Snake va hacia abajo")
        console.log("Antes SheadTail.y: " + headTail.y)
        headTail.y = 0
        console.log("Despues SheadTail.y: " + headTail.y)
    }
}

function eatApple(){
    if(snake.tail[snake.tail.length -1].x == apple.x &&
        snake.tail[snake.tail.length -1].y == apple.y){
            snake.tail[snake.tail.length] = {x: apple.x, y: apple.y};
            apple = new Apple();
        }
}

function draw(){
    creatrRect(0,0,canvas.width, canvas.height, "black")
    creatrRect(0,0,canvas.width, canvas.height)
    for(var i=0; i < snake.tail.length; i++){
        creatrRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size -5, snake.size -5, "white")
    }

    canvasContext.font = "20px Arial"
    canvasContext.fillStyle = "#00FF42"
    canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
    creatrRect(apple.x, apple.y, apple.size, apple.size, apple.color )
}

function creatrRect(x,y,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height)
}

//mejor ya que keyCode fue deprecado
window.addEventListener("keydown", (event) =>{
    //const keyName = event.key;
    //alert('Keydown event\n\n' + 'key: '+ keyName)

    //const keyName = event.keyCode;
    //alert('Keydown event\n\n' + 'key: '+ keyName)

    setTimeout(()=>{
        //event.key == ArrowLeft
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        //event.key == ArrowUp
        }else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        //event.key == ArrowRight    
        }else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0;
        //evnet.key = ArrowDown
        }else if(event.keyCode == 40 && snake.rotateY != -1){ 
            snake.rotateX = 0
            snake.rotateY = 1;
        }
    }, 1);
});

