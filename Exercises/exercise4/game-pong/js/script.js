"use strict";

// Pong
// by Pippin Barr (remixed by Che Tan)
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Game state: 0 = starting sreen, 1 = playing, 2 = game over.
let playing = 0;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// How many points to win
let winScore = 10;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

let ballColor = 1;

// When left paddle has 10 points, go to next row
let leftRowReturn = 0;
// When right paddle has 10 points, go to next row
let rightRowReturn = 0;
// The left paddle got the most recent point = -1, right: 1. For starting in the
// Recently gotten point's direction
let recentPoint = 1;

// Variable for the coin flip random
let fiftyFifty = 0;

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, score, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  score: 0,
  color: 1,
  winMessage: "Left Player Wins!"
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, score, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  score: 0,
  color: 50,
  winMessage: "Right Player Wins!"
}

// Enric's code
let btn10game = {
  x : 0,
  y: 0,
  w: 100,
  h: 100,
  checkBounds : function(clickX, clickY) {
    let horizontalCheck = clickX > x && clickX < x + w;
    let verticalCheck = clickY > y && clickY < y + h;
    return horizontalCheck && verticalCheck;
  }
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  resetGame();
  // Set color mode to allow cycling thorugh spectrum
  colorMode(HSB, 100);
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background slightly to allow tail effect
  background(bgColor, 5);

  if (playing === 1) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();
    playerWin(leftPaddle);
    playerWin(rightPaddle);

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);
    displayUI();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }
  if (playing === 0) {
    // Starting screen, display the message to start the game
    displayStartMessage();
  }

  if (playing === 2) {
    // Game over screen
    playerWin(leftPaddle);
    playerWin(rightPaddle);
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  // Prevent paddles from going out of the screen
  paddle.y += paddle.vy;
  if (paddle.y - paddle.h/2 - paddle.speed < 0) {
    paddle.y = paddle.h/2;
  }
  if (paddle.y + paddle.h/2 + paddle.speed > height) {
    paddle.y = height - paddle.h/2;
  }
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0) {
    rightPaddle.score++;
    recentPoint = 1;
    return true;

  }
  if (ball.x > width) {
    leftPaddle.score++;
    recentPoint = -1;
    return true;
  }
  else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2 + ball.vy ;
  let ballBottom = ball.y + ball.size / 2 + ball.vy;
  let ballLeft = ball.x - ball.size / 2 + ball.vx;
  let ballRight = ball.x + ball.size / 2 + ball.vx;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      paddle.color = random(1, 100);
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  push();
  fill(paddle.color, 100, 100);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
  pop();
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  push();
  if (ballColor < 100) {
    ballColor++;
  } else {
    ballColor = 1;
  }
  fill(ballColor, 100, 100);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}

// displayUI()
//
// Draws the score without numbers
function displayUI() {
  push();
  fill(0, 0, 100);
  for (var i = 0; i < leftPaddle.score; i++) {
    leftRowReturn = i;

    // Enric's code
    // let column = floor(leftRowReturn % 10);
    // let row = floor(i/10);
    // rect(width/3-width/30*(column-1), height/8+(height/15*row), width/50, height/20);
  if (leftRowReturn/10 >= 1) {
      leftRowReturn -= 10*(floor(i/10));
    }
    rect(width/3-width/30*(leftRowReturn-1), height/8+(height/15*floor(i/10)), width/50, height/20);
  }
  for (var i = 0; i < rightPaddle.score; i++) {
    rightRowReturn = i;
    if (rightRowReturn/10 >= 1) {
      rightRowReturn -= 10*(floor(i/10));
    }
    rect(width/(3/2)+width/30*(rightRowReturn-1), height/8+(height/15*floor(i/10)), width/50, height/20);
  }
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speed*recentPoint;
  fiftyFifty = random(0,1);
  if (fiftyFifty >= 0.5) {
    ball.vy = -1*random(ball.speed*0.5, ball.speed*1.5);
  } else if (fiftyFifty < 0.5) {
    ball.vy = random(ball.speed*0.5, ball.speed*1.5);
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK ON WINNING SCORE TO START", width / 2, height / 2 - height / 3);
  for (var i = 0; i < 3; i++) {
    fill(255);
    rect((width/2-width/4)+width/4*i, height/2+height/3, width/10, height/5);
    fill(0);
    text((i+1)*10, width/2-width/4+width/4*i, height/2+height/3);
  }
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  if (playing === 0) {
    // Enric's  code
    // if(btn10game.checkBounds(mouseX, mouseY)){
    //  winScore = 10;
    //  playing = 1;
    // }

    if (mouseX > width/2-width/4-width/20 && mouseX < width/2-width/4 + width/10 - width/20 && mouseY > height/2+height/3 - height/10 && mouseY < height/2+height/3 + height/5 - height/10) {
      winScore = 10;
      playing = 1;
    }
    if (mouseX > width/2-width/4-width/20+width/4 && mouseX < width/2-width/4 + width/10 - width/20 + width/4  && mouseY > height/2+height/3 - height/10 && mouseY < height/2+height/3 + height/5 - height/10) {
      winScore = 20;
      playing = 1;
    }
    if (mouseX > width/2-width/4-width/20+width/2 && mouseX < width/2-width/4 + width/10 - width/20 + width/2 && mouseY > height/2+height/3 - height/10 && mouseY < height/2+height/3 + height/5 - height/10) {
      winScore = 30;
      playing = 1;
    }
  }
   if (playing === 2) {
    resetGame();
    playing = 0;
  }
}

// playerWin
//
// Check if a player has won the game
function playerWin(paddle) {
  if (paddle.score >= winScore) {
    playing = 2;
    push();
    textAlign(CENTER, CENTER);
    textSize(32);
    text(paddle.winMessage, width / 2, height / 2 - height / 3);
    pop();
  }
}

// resetGame()
//
// Resets the Game
function resetGame() {
  fill(fgColor);
  setupPaddles();
  // The ball starts moving in a random direction
  fiftyFifty = random(0,1);
  if (fiftyFifty >= 0.5) {
    ball.vy = -1*random(ball.speed*0.5, ball.speed*1.5);
  } else if (fiftyFifty < 0.5) {
    ball.vy = random(ball.speed*0.5, ball.speed*1.5);
  }
  resetBall();
  leftPaddle.score = 0;
  leftPaddle.color = 1;
  rightPaddle.score = 0;
  rightPaddle.color = 50;
  // btn10game.x = width/4;
}
