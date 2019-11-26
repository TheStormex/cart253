"use strict";

// Project 3 Prototype
// by Che Tan
// A turn based RPG with cards and mini games

// which screen it is 0 = title, 1 = instructions, 2 = game, 3 = minigame, 4 = game over (win or lose);
let whichScreen = 0;

// sub screens for the game
// game: 0 = choose ability, 1 =  action text, 2 = aftermath text
let subScreen = 0;

// Whose turn it is, player (1) or enemy (-1)
let whoseTurn = 1;

// Win or lose -1 = lose, 1 = win
let victory = 0;

// Which ability is chosen by the turn character
let chosenAbility;

// Array of enemy bullets
let bullets = [];

// How many bullets the player ran into / targets the player clicked on - obstacles
let minigameHits = 0;

// Array of targets the player must hit in the mini game
let targets = [];

// Array of obstacles the player must not hit in the mini game
let obstacles = [];

// Array of abilities the player currently has in the inventory
let abilitiesHave = [];

// Array of abilities the player currently has in the deck
let abilitiesPlayerDeck = [];

// Array of abilities the player can get
let fireSpear;
let cleanse;
let paralyse;
let shield;
let curse;
let abilitiesPlayerAll = [];

let abilityX = 0;

// Array of abilities the enemy can get
let enemyAbilitiesHave = [];

// The player object
let player;
// The enemy object
let enemy;

// textTimer and textTimerAmount: how long the text stays on the screen
let textTimer = 0;
let textTimerAmount = 3000; // 3 seconds

// minigameTimer and minigameTimerAmount: how long the minigames last before changing to results
let minigameTimer = 0;
let minigameTimerAmount = 5000; // 5 seconds

// spawnTimer and spawnTimerAmount: how long until another minigame object is spawned
let spawnTimer = 0;
let spawnTimerAmount = 80; // 2/25 of a second

// setup()
//
// Sets up a canvas
function setup() {
  createCanvas(windowWidth-windowWidth/50, windowHeight-windowHeight/50);

  player = {
    name: "Player",
    health: 200,
    maxHealth: 200,
    incoming: 0,
    stun: false,
    x: width/2,
    y: height/2,
    size: width/20+height/20,
    speed: 10,
    vx: 0,
    vy: 0
  }
  enemy = {
    name: "Enemy",
    health: 500,
    maxHealth: 500,
    incoming: 0,
    stun: false
  }

  // Create the player's five abilities
  fireSpear = new Ability("Fire Spear", "Deal damage", player, enemy, "damage", 10, playerMinigame, color(255,0,0));
  cleanse = new Ability("Cleanse", "Heal self", player, player, "heal", 8, playerMinigame, color(0,255,255));
  paralyse = new Ability("Paralyse", "Stun", player, enemy, "stun", 10, playerMinigame, color(255,255,0));
  shield = new Ability("Shield", "Protect self", player, player, "% incoming", -5, playerMinigame, color(0,255,0));
  curse = new Ability("Curse", "Weaken enemy", player, enemy, "% incoming", 5, playerMinigame, color(255,0,255));
  abilitiesPlayerAll = [fireSpear, cleanse, paralyse, shield, curse];

  // Create the player's deck of abilities (20)
  for (var i = 0; i < 8; i++) {
    abilitiesPlayerDeck.push(fireSpear);
  }
  for (var i = 0; i < 3; i++) {
    abilitiesPlayerDeck.push(cleanse);
  }
  for (var i = 0; i < 3; i++) {
    abilitiesPlayerDeck.push(paralyse);
  }
  for (var i = 0; i < 3; i++) {
    abilitiesPlayerDeck.push(shield);
  }
  for (var i = 0; i < 3; i++) {
    abilitiesPlayerDeck.push(curse);
  }
  // Shuffle the player's deck
  abilitiesPlayerDeck = shuffle(abilitiesPlayerDeck);
  // The player draws the 5 card starting hand
  for (var i = 0; i < 5; i++) {
    abilitiesHave.push(abilitiesPlayerDeck[i]);
    abilitiesPlayerDeck.splice(abilitiesPlayerDeck[i], 1);
  }
  console.log(abilitiesHave);
  // create the list of enemy abilities
  let newEnemyAbility = new Ability("Neutron Beam", "weaken player by 10% per hit", enemy, player, "% incoming", 10, enemyBulletStormMinigame, color(0));
  enemyAbilitiesHave.push(newEnemyAbility);
  newEnemyAbility = new Ability("BulletStorm", "deal damage", enemy, player, "damage", 10, enemyBulletStormMinigame, color(0));
  enemyAbilitiesHave.push(newEnemyAbility);
  newEnemyAbility = new Ability("Static Bolt", "stun player if touch 3 times", enemy, player, "stun", 3, enemyBulletStormMinigame, color(0));
  enemyAbilitiesHave.push(newEnemyAbility);
}

// draw()
//
// Handles input, movement and displaying for the system's objects
function draw() {
  // Clear the background to grey
  background(50);
  switch (whichScreen) {
    case 0: // Title
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
      break;
    case 1: // Instructions
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
      text("Control your vessel to dodge the bullets", width/2, height/4+(height/18)*4);
      text("You will get another ability every turn", width/2, height/4+(height/18)*5);
      text("Blow up the robot with your magic! Good luck!", width/2, height/4+(height/18)*6);
      pop();
      break;
    case 2: // Game
      push()
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
          console.log("One " + i + abilitiesHave[i].name + " " + abilitiesHave[i].x);
        }
        for (var i = 0; i < abilitiesHave.length; i++) {
          console.log("Two " + i + abilitiesHave[i].name + " " + abilitiesHave[i].x);
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
            whichScreen = 3;
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
          whichScreen = 4;
        }
        if (enemy.health <= 0) {
          victory = 1;
          whichScreen = 4;
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
      break;
    case 3: // Mini game
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
        whichScreen = 2;
      }
      break;
    case 4: // Game over
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
      break;
    default:
  }
}

// mousePressed
//
// when the button is pressed
function mousePressed() {
  switch (whichScreen) {
    case 0:
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        // move to screen 1
        whichScreen = 1;
      }
      break;
    case 1:
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        // move to screen 2
        whichScreen = 2;
      }
      break;
    case 2:
      if (subScreen === 0) { // if we are choosing to click on an ability
        for (var i = 0; i < abilitiesHave.length; i++) {
          if (mouseX > abilitiesHave[i].x-abilitiesHave[i].sizeX/2 && mouseX < abilitiesHave[i].x+abilitiesHave[i].sizeX/2 && mouseY > abilitiesHave[i].y-abilitiesHave[i].sizeY/2 && mouseY < abilitiesHave[i].y+abilitiesHave[i].sizeY/2) {
            // choose this ability, add another card to hand and go to text
            chosenAbility = abilitiesHave[i];
            // console.log(abilitiesHave[0]);
            // console.log(abilitiesHave[1]);
            // console.log(abilitiesHave[2]);
            // console.log(abilitiesHave[3]);
            // console.log(abilitiesHave[4]);
            // console.log("NEW");
            abilitiesHave.splice(i, 1);
            abilitiesHave.push(abilitiesPlayerDeck[0]);
            abilitiesPlayerDeck.splice(0, 1);
            // console.log(abilitiesHave[0]);
            // console.log(abilitiesHave[1]);
            // console.log(abilitiesHave[2]);
            // console.log(abilitiesHave[3]);
            // console.log(abilitiesHave[4]);
            // console.log("DONE");
            textTimer = millis();
            subScreen = 1;
          }
        }
      }
      break;
    case 3:
      for (var i = 0; i < targets.length; i++) {
        targets[i].clicked();
      }
      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].clicked();
      }
      break;
    case 4:
      if (mouseX > width/2-width/10 && mouseX < width/2+width/10 && mouseY > height-height/4-height/10 && mouseY < height-height/4+height/10) {
        // move to screen 2
        whichScreen = 2;
      }
      break;
    default:

  }
}

// spawn()
//
// create objects in the mini games
function spawn() {
  if (millis() - spawnTimer > spawnTimerAmount) {
    if (whoseTurn === 1) {
      let whichObject = floor(random(0,2));
      if (whichObject === 0) {
        let newTarget = new Target(random(0, width), 0, random(width/30+height/30, width/16+height/16), random(-12, 12), random(8, 12), targets.length);
        targets.push(newTarget);
      } else if (whichObject === 1) {
        let newObstacle = new Obstacle(random(0, width), 0, random(width/30+height/30, width/16+width/16), random(-12, 12), random(8, 12), obstacles.length);
        obstacles.push(newObstacle);
      }
    }
    if (whoseTurn === -1) {
      let newBullet = new Bullet(random(0, width), 0, random(width/40+height/40, width/30+height/30), random(-12, 12), random(15, 18), bullets.length);
      bullets.push(newBullet);
    }
  spawnTimer = millis();
  }
}

// enemyChooseAbility()
//
// the enemy randomly chooses which ability to use
function enemyChooseAbility() {
  let enemyAbility = floor(random(0, 3));
  chosenAbility = enemyAbilitiesHave[enemyAbility];
}

// abilityHappens()
//
// The ability's effect take place
function abilityHappens() {
  let whichEffect;
  let abilityTargets;
  whichEffect = chosenAbility.effect;
  abilityTargets = chosenAbility.targets;
  chosenAbility.totalAmount = chosenAbility.amount*minigameHits;
  switch (whichEffect) {
    case "damage":
      chosenAbility.totalAmount = round(chosenAbility.totalAmount + chosenAbility.totalAmount*0.01*abilityTargets.incoming);
      abilityTargets.health -= chosenAbility.totalAmount;
      abilityTargets.incoming = 0; // set incoming back to 0
      abilityTargets.health = constrain(abilityTargets.health, 0, abilityTargets.maxHealth);
      break;
    case "heal":
      abilityTargets.health += chosenAbility.totalAmount;
      abilityTargets.health = constrain(abilityTargets.health, 0, abilityTargets.maxHealth);
      break;
    case "stun":
      if (minigameHits >= chosenAbility.amount) {
        abilityTargets.stun = true;
      }
      break;
    case "% incoming":
      abilityTargets.incoming += chosenAbility.totalAmount;
      break;
    default:
  }
}

// goToPlayerTurn()
//
// Go from the enemy's turn to the player's turn
function goToPlayerTurn() {
  textTimer = millis();
  chosenAbility = 0;
  whoseTurn = 1;
  subScreen = 0;
}

// goToEnemyTurn()
//
// Go from the player's turn to the enemy's turn
function goToEnemyTurn() {
  enemyChooseAbility();
  textTimer = millis();
  player.x = width/2;
  player.y = height/2;
  whoseTurn = -1;
  subScreen = 1;
}

// playerMinigame()
//
// the player's minigame
function playerMinigame() {
  spawn(); // spawn targets and obstacles (random size and speed) at random at 2 per second, flow accross screen
  for (var i = 0; i < targets.length; i++) {
    targets[i].index = targets.indexOf(targets[i]);
    targets[i].move();
    targets[i].display();
  }
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].index = obstacles.indexOf(obstacles[i]);
    obstacles[i].move();
    obstacles[i].display();
  }
}


// enemyBulletStormMinigame
//
// minigame for bulletStorm
function enemyBulletStormMinigame() {
  spawn(); // spawn bullets (random size and speed) that fly accross the screen 3 per second
  enemyMinigamePlayer();
  // move and display all bullets and check if they touch the player
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].index = bullets.indexOf(bullets[i]);
    bullets[i].move();
    bullets[i].display();
    bullets[i].touchPlayer();
  }
}

// enemyNeutronBeamMinigame()
//
// minigame for neutron beam
function enemyNeutronBeamMinigame() {
  spawn(); // spawn bullets (random size and speed) that fly accross the screen 3 per second
  enemyMinigamePlayer();
  // move and display all bullets and check if they touch the player
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].index = bullets.indexOf(bullets[i]);
    bullets[i].move();
    bullets[i].bounce();
    bullets[i].display();
    bullets[i].touchPlayer();
  }
}

// enemyMinigamePlayer()
//
// Moving and displaying the player in enemy minigames
function enemyMinigamePlayer() {
  // move and display the player
  player.vx = 0;
  player.vy = 0;
  if (keyIsDown(87)) {
    player.vy = -player.speed;
  }
  if (keyIsDown(65)) {
    player.vx = -player.speed;
  }
  if (keyIsDown(83)) {
    player.vy = player.speed;
  }
  if (keyIsDown(68)) {
    player.vx = player.speed;
  }
  player.x += player.vx;
  player.y += player.vy;
  // Make sure the player does not go outside the borders
  if (player.x-player.size/2 <= 0) {
    player.x = player.size/2;
  }
  if (player.x+player.size/2 > width) {
    player.x = width-player.size/2;
  }
  if (player.y-player.size/2 < 0) {
    player.y = player.size/2;
  }
  if (player.y+player.size/2 > height) {
    player.y = height-player.size/2;
  }
  // Draw the player
  push();
  fill(0,0,255);
  ellipseMode(CENTER);
  ellipse(player.x, player.y, player.size);
  pop();
}
