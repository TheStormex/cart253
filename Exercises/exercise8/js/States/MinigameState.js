class MinigameState extends State {
  constructor() {
    super();
  }

  draw() {
    // create a white canvas for minigame
      push();
      rectMode(CENTER);
      strokeWeight(5);
      stroke(0);
      fill(255);
      rect(width/2,height/2,width,height);
      pop();
      if (millis() - minigameTimer < minigameTimerAmount) {
        chosenAbility.minigame();
      } else { // go to effect of ability
        // the ability's effect happen here before going to effect text
        obstacles = [];
        targets = [];
        bullets = [];
        textTimer = millis();
        abilityHappens();
        minigameHits = 0;
        subScreen = 2;
        whichScreen = gameState;
      }
  }

  mousePressed() {
    for (var i = 0; i < targets.length; i++) {
      targets[i].clicked();
    }
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].clicked();
    }
  }
}
