const {body} = document;



const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const width = 500;
const height = 700;


// paddle
const paddleWidth = 50;
const paddleHeight = 20;
let computerPaddleX = 225;
let playerPaddleX = 225;
let paddleDiference = 25
let paddleContact = false;

// ball
let ballX = width/2
let ballY = height/2;
let ballRadius = 5;

// Score
let scorePlayer = 0;
let scoreComputer = 0;
let winScore = 5 

// Speed
let speedY = -2;
let speedX = -2;
let computerspeed = 3;
let trajectoryX;

let mouseMovement = false;
let playerMovement = false;
function canvasRender() {
    context.fillStyle = "white"
    context.fillRect(0,0,width,height)

    context.fillStyle = "black";
    context.fillRect(computerPaddleX, 10,paddleWidth,paddleHeight);
    context.fillRect(playerPaddleX,height -30, paddleWidth,paddleHeight )

    // Dashed center
    context.beginPath();
    context.setLineDash([4])
    context.moveTo(0,350);
    context.lineTo(500,350)
    context.strokeStyle="grey"
    context.stroke();
    //Ball
    context.beginPath();
    context.arc(ballX, ballY, ballRadius , 2* Math.PI, false);
    context.fillStyle = "black"
    context.fill()
    // Score
    context.font="34px Courier New"
    context.fillText(scorePlayer, 20, canvas.height/2 + 50);
    context.fillText(scoreComputer, 20, canvas.height / 2 - 30)

}

function moveBall() {
    ballY += -speedY;
    if(playerMovement && paddleContact) {
        ballX += speedX;
    }
}

function resetBall() {
    ballX = width/2;
    ballY = height/2;
    speedY = -3;
}

function ballBoundaries() {
    if(ballX < 0 && speedX < 0) {
        speedX = -speedX;
    }
    if(ballX > width && speedX > 0) {
        speedX = -speedX
    }
    if(ballY > height -paddleDiference) {
        if(ballX > playerPaddleX && ballX < playerPaddleX + paddleWidth) {
            paddleContact = true;
            if(playerMovement){
                speedY -= 1;
            }
            speedY = - speedY
        trajectoryX = ballX - (playerPaddleX + paddleDiference);
        speedX = trajectoryX * 0.3;
        } else if(ballY > height) {
            resetBall();
            scoreComputer++;
        }
        if (scoreComputer== winScore){
            document.getElementById("result").style.display="block";
            document.getElementById("win").innerHTML="You Lose";
            moveBall()=false
        }     
 
    }

    if(ballY< paddleDiference) {
        if(ballX > computerPaddleX && ballX < computerPaddleX + paddleWidth) {
            if(playerMovement) {
                speedY +=1;
                
            }
            speedY = -speedY;
        }else if(ballY < 0) {
            resetBall();
            scorePlayer++;
        }
        if (scorePlayer== winScore){
            document.getElementById("result").style.display="block";
            document.getElementById("win").innerHTML="You Won";           
            moveBall()=false
        }    
        
    }   
     
}

function computerPaddle() {
    if(playerMovement){
        if(computerPaddleX + paddleDiference <ballX) {
            computerPaddleX += computerspeed;
        }else {
            computerPaddleX -= computerspeed;
        }
    }
}

function animate(){
    ballBoundaries();
    canvasRender();
    moveBall();
    computerPaddle();
    window.requestAnimationFrame(animate);
}

function createCanvas(){
    canvas.height = height;
    canvas.width = width;
    body.appendChild(canvas);
    canvasRender();
}
createCanvas();

function startGame(){
    animate();

    scorePlayer = 0;
    scoreComputer = 0;


    canvas.addEventListener('mousemove', (e) => {
        playerMovement = true;
        playerPaddleX = e.clientX -width - paddleDiference;

        if(playerPaddleX < paddleDiference) {
            playerPaddleX = 0;
        }
        if(playerPaddleX > width - paddleWidth) {
            playerPaddleX = width - paddleWidth;
        }
    })
}
// to start the game

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        startGame()}
    })

// reset game
btn.addEventListener("click",(e)=>{
location.reload()
})  
