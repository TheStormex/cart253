class GameOverState extends State {
  constructor() {
    super();
  }

  draw() {
    push();
    textAlign(CENTER, CENTER);
    textSize(width/40+height/40);
    fill(255);
    // see who won then present either happy or sad ending
    if (victory === -1) {
      text("You lost!", width/2, height/5);
    }
    if (victory === 1) {
      text("You won!", width/2, height/5);
    }
    // play again button
    rectMode(CENTER);
    noStroke();
    fill(0,0,255);
    rect(width/2, height-height/4, width/5, height/5);
    fill(0);
    textSize(width/50+height/50);
    textAlign(CENTER,CENTER);
    text("Play Again", width/2, height-height/4);
    pop();
  }

  mousePressed() {
    if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
      // move to game state after resetting
      whichScreen = gameState;
    }
  }
}
