var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 250);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.356;

  doorsGroup = new Group();

  climbersGroup = new Group();

  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }

  if (gameState === "play"){
    ghost.velocityY += 0.9187;

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    if(keyDown("right_arrow")&& ghost.x < 530){
      ghost.x += 4
    }

    if(keyDown("left_arrow")&& ghost.x > 90){
      ghost.x -= 4
    }

   
    drawSprites();
  }
  
  if (gameState === "end"){
    textSize(30);
    text("fim de jogo", 230, 250);
  }
  portas();
  
  
  
}


function portas() {


  if (frameCount % 210 === 0){

    door = createSprite(Math.round(random(80, 520)), -50);
    door.addImage("door", doorImg);
    door.velocityY = 4;
    door.lifetime = 170;

    climber = createSprite(door.x, door.y + 55);
    climber.addImage("climber", climberImg);
    climber.velocityY = 4;
    climber.scale = 0.7;
    climber.lifetime = 180;

    invisibleBlock = createSprite(climber.x, door.y + 60, 50, 5);
    invisibleBlock.velocityY = 4;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 180;

    doorsGroup.add(door);

    climbersGroup.add(climber);

    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth
    ghost.depth = climber.depth
    ghost.depth += 1

 
  }



}

