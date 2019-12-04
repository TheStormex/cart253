class TitleState extends State {
  constructor() {
    super();
  }

  draw() {
    // Play button
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,0,255);
    rect(width/2, height-height/4, width/5, height/5);
    fill(0);
    textSize(width/20+height/20);
    textAlign(CENTER,CENTER);
    text("Play", width/2, height-height/4);
    pop();
    // Title text
    push();
    textSize(width/20 + height/20);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Wizard Vs. Killer Robot", width/2, height/5);
    pop();
  }

  mousePressed() {
    if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
      // move to screen 1
      whichScreen = instructionsState;
    }
  }
}
