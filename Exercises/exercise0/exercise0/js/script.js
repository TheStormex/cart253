

function setup() {

  // Canvas with blue background

  createCanvas(500,500);
  background(143, 216, 255);

  // No borders
  noStroke();
  // Skin color of yellow
  fill(255, 238, 130);
  // To center
  ellipseMode(CENTER);
  // Shirt
  // Shirt Colour
  noStroke();
  fill(255,200,0);
  ellipse(250,600,300,600);
  // Shirt Lines
  stroke(255, 149, 0);
  strokeWeight(20);
  line(135,430,365,430);
  line(125,470,375,470);
  // Torso Skin
  noStroke();
  fill(255, 238, 130);
  ellipse(250,350,100,120);
  // Hat colour
  fill(255, 132, 0);
  // Hat Main
  ellipse(250,190,180,150);
  // Ears
  // Skin Colour of yellow
  fill(255, 238, 130);
  ellipse(150,240,35,50);
  ellipse(350,240,35,50);
  // Inner ears colour
  fill(255, 180, 0);
  ellipse(150,240,10,15);
  ellipse(350,240,10,15);
  // Whole Head
  fill(255, 238, 130);
  ellipse(250,250,200,200);
  // Hat
  noStroke();
  // Hat Top
  fill(255,100,0);
  ellipse(250,115,10,10);
  // Hat Sun block part
  fill(255, 132, 0);
  ellipse(200,180,180,45);
  // Fill rest of Hat
  rect(217,172,120,30);
  rect(210,150,105,35);

  // Mouth
  fill(250, 137, 137);
  ellipse(250,270,120,110);
  fill(255,0,0,150);
  ellipse(250,320,40,10);

  // Cover up rest of mouth circle
  fill(255, 238, 130);
  ellipse(250,260,180,100);

  // Eyes

  // White Sclera
  fill(255);
  ellipse(200,225,50,30);
  ellipse(300,225,50,30);

  // Brown Iris
  fill(105, 54, 0);
  ellipse(200,225,25,25);
  ellipse(300,225,25,25);

  // Black Pupils
  fill(0);
  ellipse(200,225,15,15);
  ellipse(300,225,15,15);

  // Nose

  // Nose colour
  fill(255, 220, 90);
  // Main nose part
  ellipse(250,250,30,70);
  // Left and Right Round part
  ellipse(245,275,50,30);
  ellipse(255,275,50,30);
  // Nostrils
  fill(70, 30, 0);
  ellipse(240,285,10,10);
  ellipse(260,285,10,10);

}
