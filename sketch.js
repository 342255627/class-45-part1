var level = 0;
var level1btn = createSprite(30, 200);
var level2btn = createSprite(370, 200);
var PLAY = 1;
var END = 0;
var Start = -1;
var gameState = Start;
var ani = "block";
var gameOver = createSprite(2100, 300);
var restart = createSprite(2100, 340);

gameOver.scale = 0.5;

restart.scale = 0.5;

var trex = createSprite(200, 380, 20, 50);


var play1 = createSprite(170, 230);
var play2 = createSprite(170, 230);
play1.visible = false;
play2.visible = false;

play1.scale = 0.1;
play2.scale = 0.1;

//set collision radius for the trex
trex.setCollider("circle", 0, 0, 30);

//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
var ground = createSprite(200, 380, 400, 20);

ground.x = ground.width / 2;

//invisible Ground to support Trex
var invisibleGround = createSprite(200, 385, 400, 5);
invisibleGround.visible = false;

//create Obstacle and Cloud Groups
var ObstaclesGroup = createGroup();
var CloudsGroup = createGroup();
function preload() {




}

function setup() {
  play1.addImage("start2");
  play2.addImage("start2");
  level1btn.addImage("one");
  level2btn.addImage("two");
  restart.addImage("restart");
  trex.addImage("block");
  ground.addImage("ground2");
}
textSize(18);
textFont("Georgia");



var count = 0;

function draw() {

  console.log(World.frameRate);

  text("Score: " + count, 250, 100);
  if (mousePressedOver(level1btn)) {
    level = 1;
  }
  if (mousePressedOver(level2btn)) {
    level = 2;
  }
  if (level == 1) {
    background("red");
    text("level 1", 150, 200);
    textSize(30);
    play1.visible = true;
    play2.x = 550;
    play1.x = 170;
  }
  if (level == 0) {
    background("green");
    text("Choose a level", 150, 200);
    textSize(30);

  }

  if (level == 2) {
    background("yellow");
    text("level 2", 150, 200);
    textSize(30);
    play2.visible = true;
    play1.x = 500;
    play2.x = 170;
  }

  if (gameState === Start) {

    trex.visible = false;
    ground.visible = false;
  }
  if (mousePressedOver(play1)) {
    gameState = PLAY;
  }
  if (mousePressedOver(play2)) {
    gameState = PLAY;
  }
  if (gameState === PLAY) {
    ground.velocityX = -(6 + 3 * count / 100);
    count = count + Math.round(World.frameRate / 60);
    level1btn.x = 500;
    level2btn.x = 500;
    play1.x = 500;
    play2.x = 500;
    gameOver.x = 10000;
    restart.x = 10200;
    trex.visible = true;
    ground.visible = true;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && trex.y >= 359) {
      trex.velocityY = -12;
      if (ani == "block2") {
        trex.addImage("block");
        ani = "block";

      }
      else {

        trex.addImage("upsidedown");
        ani = "block2";
      }
    }
    trex.velocityY = trex.velocityY + 0.8;
    spawnClouds();
    spawnObstacles();
    if (ObstaclesGroup.isTouching(trex)) {
      
      gameState = END;
      
    }
  }

  else if (gameState === END) {
    play1.x = 500;
    play2.x = 500;
    gameOver.x = 200;
    restart.x = 200;
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);


    trex.setImage("dead");


    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      reset();
      gameOver.destroy();
      restart.destroy();

    }
  }
  trex.collide(invisibleGround);

  drawSprites();
}

function reset() {
  gameOver.x = 1200;
  restart.x = 1000;
  restart.visible = false;
  gameOver.visible = false;
  gameState = PLAY;
  count = 0;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();

  trex.setAnimation("block");
}

function spawnObstacles() {
  if (World.frameCount % 60 === 0) {
    var obstacle = createSprite(400, 365, 10, 40);
    obstacle.velocityX = - (6 + 3 * count / 100);

    //generate random obstacles
    var rand = randomNumber(1, 6);
    obstacle.setAnimation("spike" + rand);

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {

  if (World.frameCount % 80 === 0) {
    var cloud = createSprite(400, 320, 40, 10);
    cloud.y = randomNumber(280, 320);
    cloud.addAnimation("cloud");
    cloud.scale = 0.5;
    cloud.velocityX = -3;


    cloud.lifetime = 134;

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    CloudsGroup.add(cloud);
  }

}
