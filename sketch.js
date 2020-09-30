var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup, orangeGroup;
var score;
var orange, orange_image;
var ground, ground_image;
var ground2, gorund3, ground4;
var restart, restart_image;
var song;
var chances = 5;
var survivalTime = 20;
var score = 0;
var gameState = "start";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  orange_image = loadImage("orange.png");
  ground_image = loadImage("ground.PNG");
  restart_image = loadImage("Restart.PNG");
  song = loadSound("taki_taki.mp3");


}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(40, 345, 20, 20);
  monkey.addAnimation("r", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(115, 390, 20, 20);
  ground.addImage("q", ground_image);

  ground2 = createSprite(350, 390, 20, 20);
  ground2.addImage("e", ground_image);

  ground3 = createSprite(550, 390, 20, 20);
  ground3.addImage("w", ground_image);

  ground4 = createSprite(750, 390, 20, 20);
  ground4.addImage("y", ground_image);

  restart = createSprite(300, 200, 10, 10);
  restart.addImage("p", restart_image);
  restart.scale = 0.5;

  bananaGroup = new Group();
  orangeGroup = new Group();
  obstaclesGroup = new Group();

  song.play();

}


function draw() {

  background("lightblue");
  monkey.collide(ground);
  monkey.collide(ground2);
  monkey.collide(ground3);
  monkey.collide(ground4);

  if (gameState === "start") {

    fill("black");
    textSize(25);
    text("PRESS ENTER TO START THE GAME...", 90, 200);

    if (keyDown("ENTER")) {

      gameState = "play"

    }


    restart.visible = false;
    monkey.visible = false;
    ground.visible = false;
    ground2.visible = false;
    ground3.visible = false;
  }


  if (gameState === "play") {
    
    
    monkey.visible = true;
    ground.visible = true;
    ground2.visible = true;
    ground3.visible = true;
    restart.visible = false;
    

    if (keyDown("space") && monkey.isTouching(ground) || monkey.isTouching(ground2) || monkey.isTouching(ground3)) {
      monkey.velocityY = -15;
      survivalTime = survivalTime - 1;

    }
    monkey.velocityY = monkey.velocityY + 0.6;
    if (keyDown("up") && monkey.isTouching(ground) || monkey.isTouching(ground2) || monkey.isTouching(ground3)) {

      monkey.velocityY = -22;
      survivalTime = survivalTime - 3;

    }

    monkey.velocityY = monkey.velocityY + 0.4;

    ground.velocityX = -4;
    ground2.velocityX = -4;
    ground3.velocityX = -4;
    ground4.velocityX = -4;


    if (ground.x <= 0) {

      ground.x = 115;
      ground2.x = 350;
      ground3.x = 550;
      ground4.x = 750;
    }

    if (chances <= 0 || survivalTime <= 0) {
      gameState = "end";
    }

    spawnbananas();
    spawnoranges();
    spawnobstacles();
  }

  if (gameState === "end") {
    restart.visible = true;
    //monkey.visible = false;
    ground.velocityX = 0;
    ground4.velocityX = 0;
    ground2.velocityX = 0;
    ground3.velocityX = 0;
    bananaGroup.setVelocityEach(0);
    bananaGroup.destroyEach();
    orangeGroup.setVelocityEach(0);
    orangeGroup.destroyEach();
    obstaclesGroup.setVelocityEach(0);
    obstaclesGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);

    textSize(16);
    fill("Black");
    text("Survival time =  " + survivalTime, 220, 20);

    textSize(16);
    fill("Black");
    text("Chances = " + chances, 470, 20);

    textSize(16);
    fill("Black");
    text("Score = " + score, 30, 20);

    if (mousePressedOver(restart)) {
      restart();

    }
  }

  drawSprites();
}

function spawnbananas() {


  if (frameCount % 100 === 0) {
    banana = createSprite(550, 200, 20, 20);
    banana.addImage("l", bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(180, 250));
    banana.velocityX = -12;
    banana.lifetime = 50;
    bananaGroup.add(banana);


  }
  if (monkey.isTouching(bananaGroup)) {

    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2;
    score = score + 1;
  }
}

function spawnoranges() {
  if (frameCount % 200 === 0) {
    orange = createSprite(550, 200, 20, 20);
    orange.addImage("z", orange_image);
    orange.scale = 0.015;
    orange.y = Math.round(random(120, 150));
    orange.velocityX = -25;
    orange.lifetime = 50;
    orangeGroup.add(orange);
  }
  if (monkey.isTouching(orangeGroup)) {

    orangeGroup.destroyEach();
    survivalTime = survivalTime + 5;
    chances = chances + 1;
    score = score + 2;
  }
}

function spawnobstacles() {

  if (frameCount % 70 === 0) {
    obstacle = createSprite(590, 360, 20, 20);
    obstacle.addImage("h", obstacleImage);
    obstacle.scale = 0.1;
    //obstacle.y = Math.(random(375, 350));
    obstacle.velocityX = -10;
    obstacle.lifetime = 70;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0, 200);
    //obstacle.debug = true;
  }
  if (monkey.isTouching(obstaclesGroup)) {
    obstaclesGroup.destroyEach();
    chances = chances - 1;
    score = score - 1;
  }
}

function restart() {
  gameState = "play";
  score = 0;
  chances = 3;
  survivalTime = 20;
  monkey.visible = true;
  monkey.collide(ground);
  //gameOver.visible=false;
  restart.visible = false;



}