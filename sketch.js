var car, carImg
var jungle, jungleImg
var invisibleGround

var tree1, tree1Img
var tree
var tree3, tree3Img
var rabbit, rabbitImg

var gameOver, gameOverImg
var reset, resetImg

var treeGroup, obstacleGroup
var score
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){

carImg = loadImage("jeep.png")
jungleImg = loadImage("jungle.png")

tree1Img = loadImage("tree1.png");
tree3Img = loadImage("tree3.png");
rabbitImg = loadImage("rabbit.png");

gameOverImg = loadImage("gameOver.png")
resetImg = loadImage("reset.png");
}

function setup() {
 createCanvas (windowWidth, windowHeight);

 car = createSprite(100,height-60,60,40);
car.addImage("car", carImg);
car.scale = 0.3

jungle = createSprite(width/2,height/2,width,height);
jungle.addImage("jungle",jungleImg);
jungle.scale = 4
jungle.x = width/2
jungle.velocityX = -2

invisibleGround = createSprite(width/2,height-10,width,125);  
invisibleGround.visible = false;


gameOver = createSprite(width/2, height/2 -50);
gameOver.addImage("gameOver", gameOverImg);
gameOver.scale = 0.05

reset = createSprite(width/2, height/2);
reset.addImage("reset", resetImg);
reset.scale = 0.05

score = 0;

treeGroup = new Group();
obstacleGroup = new Group();
}

function draw() {

    textSize(20);
    fill("white")
    text("Score: "+ score,30,50);

    
    
    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        if((touches.length > 0 || keyDown("SPACE")) && car.y  >= height-120) {
        car.velocityY = -10;
        touches = [];
    }
    
    jungle.depth = car.depth
    car.depth = car.depth + 1        
    car.velocityY = car.velocityY + 0.8

    if (jungle.x < 0){
        jungle.x = jungle.width;
      }      
car.collide(invisibleGround);
spawnTrees();
//if(obstaclesGroup.isTouching(car)){
  //  gameState = END;

    }
  if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    jungle.velocityX = 0;
    car.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    treeGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    treeGroup.setLifetimeEach(-1);
    if(touches.length>0 || keyDown("SPACE")) {      
        reset();
        touches = []
      }
}

    drawSprites();
}


function spawnTrees(){
    if (frameCount % 100 === 0) {
        tree = createSprite(width+20,height-50,20,70);
        tree.x = Math.round(random(100,220));
        tree.addImage(tree1Img,tree3Img);
        tree.scale = 0.05;
        tree.velocityX = -2
        
        tree.depth = car.depth;
        car.depth = car.depth+1;
        
        treeGroup.add(tree);
      }
      
}

//function spawnObstacles(){





//}

function restart(){
gameState = PLAY;
gameOver.visible = false;
restart.visible = false;

obstaclesGroup.destroyEach();
treeGroup.destroyEach();
score = 0}
