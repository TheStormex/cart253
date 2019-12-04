class InstructionsState extends State {
  constructor() {
    super();
  }

  draw() {
    // Fight! button
    push();
    rectMode(CENTER);
    noStroke();
    fill(0,0,255);
    rect(width/2, height-height/4, width/5, height/5);
    fill(0);
    textSize(width/30+height/30);
    textAlign(CENTER,CENTER);
    text("Fight!", width/2, height-height/4);
    pop();
    // Instruction text
    push();
    textSize(width/20);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Instructions", width/2, height/8);
    pop();
    // The instructions
    push();
    fill(255);
    rectMode(CENTER);
    rect(width/2,height/4+height/6,width-width/10,height/2-height/20);
    fill(0);
    textSize(width/40+height/60);
    textAlign(CENTER,CENTER);
    text("You are a powerful wizard who can cast spells", width/2, height/4);
    text("A killer robot stands in your way with giant guns", width/2, height/4+height/18);
    text("Choose an ability in your inventory to use it", width/2, height/4+(height/18)*2);
    text("Click on green circles and avoid red ones", width/2, height/4+(height/18)*3);
    text("Control your vessel to dodge the bullets and collect the leaves", width/2, height/4+(height/18)*4);
    text("You will get another ability every turn", width/2, height/4+(height/18)*5);
    text("Blow up the robot with your magic! Good luck!", width/2, height/4+(height/18)*6);
    pop();
  }

  mousePressed() {
    if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
      // move to game
      whichScreen = gameState;
    }
  }
}
