class GameState extends State {
  constructor() {
    super();
  }

  draw() {
    // the dialogue box
    push();
    rectMode(CENTER);
    strokeWeight(20);
    rect(width/2, height-height/4, width, height/2);
    pop();
    //
    push();
    // the player avatar
    ellipseMode(CORNER);
    noStroke();
    fill(0,0,255);
    ellipse(width/50, height/2+height/30, width/30+height/30);
    // The player's name
    textAlign(CENTER,CENTER);
    fill(0);
    textSize(width/50+height/50);
    text(player.name,width/7.5,height/2+height/12);
    // the player's health bar
    rectMode(CORNER);
    strokeWeight(5);
    stroke(0);
    fill(255);
    rect(width/5, height/2+height/30, width-width/4, height/10);
    noStroke();
    fill(255,0,0);
    let lifeBarSizePlayer = map(player.health*100/player.maxHealth,0,100,0,width-width/4);
    rect(width/5, height/2+height/30, lifeBarSizePlayer, height/10);
    textAlign(CENTER,CENTER);
    textSize(width/30);
    fill(0);
    text(player.health + "/" + player.maxHealth, width/2, height/2+height/10);
    pop();
    // the enemy avatar
    push()
    ellipseMode(CENTER);
    noStroke();
    fill(255,255,0);
    ellipse(width/2, height/3, width/20+height/20);
    pop();
    // The enemy's name
    push();
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(width/30);
    text(enemy.name,width/2,height/10);
    pop();
    // the enemy's health bar
    push();
    rectMode(CORNER);
    strokeWeight(5);
    stroke(0);
    fill(255);
    rect(width/2-width/16, height/6, width/8, height/20);
    noStroke();
    fill(255,0,0);
    let lifeBarSizeEnemy = map(enemy.health*100/enemy.maxHealth,0,100, 0,width/8);
    rect(width/2-width/16, height/6, lifeBarSizeEnemy, height/20);
    textAlign(CENTER,CENTER);
    textSize(width/60);
    fill(0);
    text(enemy.health + "/" + enemy.maxHealth, width/2, height/6+height/30);
    pop();
    switch (subScreen) {
      case 0: // choose ability
      // each of the five abilities the player can use
      for (var i = 0; i < abilitiesHave.length; i++) {
        abilitiesHave[i].displayInventory(i);
      }
        break;
      case 1: // character used X on Y
      if (millis() - textTimer < textTimerAmount) {
        push();
        fill(0);
        textAlign(CENTER,CENTER);
        textSize(width/30+height/30);
        text(chosenAbility.user.name + " used " + chosenAbility.name + " on " + chosenAbility.targets.name + "!", width/2, height-height/4);
        pop();
      } else {
          minigameTimer = millis();
          whichScreen = minigameState;
      }
        break;
      case 2: // character received X
      if (millis() - textTimer < textTimerAmount) {
      push();
      fill(0);
      textAlign(CENTER,CENTER);
      textSize(width/40+height/40);
      text(chosenAbility.targets.name + " received " + chosenAbility.totalAmount + " " + chosenAbility.effect + " from " + chosenAbility.user.name + "'s " + chosenAbility.name + "!", width/2, height-height/4);
      pop();
    } else {
      // check if the player wins or loses
      if (player.health <= 0) {
        victory = -1;
        whichScreen = gameOverState;
      }
      if (enemy.health <= 0) {
        victory = 1;
        whichScreen = gameOverState;
      }
      if (whoseTurn === 1) { // if it is the player's turn
        if (!enemy.stun) { // if enemy is not stunned, go to enemy's turn
          goToEnemyTurn();
        }
        else if (enemy.stun) { // if enemy is stunned, go to player's turn
          enemy.stun = false;
          goToPlayerTurn();
        }
      }
      else if (whoseTurn === -1) { // if it is the enemy's turn
        if (!player.stun) { // if player is not stunned, go to player's turn
          goToPlayerTurn();
        }
        else if (player.stun) { // if player is stunned, go to enemy's turn
          player.stun = false;
          goToEnemyTurn();
        }
      }
    }
        break;
      default:
    }
  }

  mousePressed() {
    if (subScreen === 0) { // if we are choosing to click on an ability
      for (var i = 0; i < abilitiesHave.length; i++) {
        if (mouseX > abilitiesHave[i].x-abilitiesHave[i].sizeX/2 && mouseX < abilitiesHave[i].x+abilitiesHave[i].sizeX/2 && mouseY > abilitiesHave[i].y-abilitiesHave[i].sizeY/2 && mouseY < abilitiesHave[i].y+abilitiesHave[i].sizeY/2) {
          // choose this ability, add another card to hand and go to text
          chosenAbility = abilitiesHave[i];
          abilitiesHave.splice(i, 1);
          abilitiesHave.push(abilitiesPlayerDeck[0]);
          abilitiesPlayerDeck.splice(0, 1);
          textTimer = millis();
          subScreen = 1;
        }
      }
    }
  }
}
