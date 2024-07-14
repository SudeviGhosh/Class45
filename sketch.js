var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;

var obstacle1, obstacle2, obstacle1Group;
var Bottom1, Bottom2 ,Bottom2, obsBottomGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var gameOver, restart;

var score1 = 0;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obstacle1 = loadImage("assets/obsTop1.png")
obstacle2 = loadImage("assets/obsTop2.png")

Bottom1 = loadImage("assets/obsBottom1.png")
Bottom2 = loadImage("assets/obsBottom2.png")
Bottom3 = loadImage("assets/obsBottom3.png")

gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");
}


function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.15;

obstacle1Group=new Group()
obsBottomGroup=new Group()

gameOver = createSprite(200,100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5;

restart = createSprite(200,150);
restart.addImage(restartImg);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
  
  if(gameState ===PLAY){
    score1 = score1 + Math.round(getFrameRate()/60);
    //console.log (number)
    //score = Math.round((score + Math.round(number))/2);
    score = Math.round(score1/3)
    
    

    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 0.5;
    obsTop()
    obsBottom()

    if(obstacle1Group.isTouching(balloon) || obsBottomGroup.isTouching(balloon) || topGround.isTouching(balloon) || bottomGround.isTouching(balloon)){
      gameState = END;
    }
  }

  else if (gameState === END){
    gameOver.visible = true
    restart.visible = true;
    
    bg.velocityX = 0
    balloon.velocityY = 0 
    balloon.destroy()

    obstacle1Group.destroyEach()
    obsBottomGroup.destroyEach()

    if(mousePressedOver(restart)) {
      reset();
    }

  }


  drawSprites();

  fill("black")
  textSize(25)
  text("Score: "+ score, 250,50);

}

function obsTop() {

  if (frameCount % 60 === 0) {
    var obsTop1 = createSprite(600,120,40,10);
    obsTop1.y = Math.round(random(80,120));
    //obsTop1.addImage(obstacle1);
    
    obsTop1.velocityX = -3;
    
     //assign lifetime to the variable
     obsTop1.lifetime = 200;
    
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obsTop1.addImage(obstacle1);
               break;
       case 2: obsTop1.addImage(obstacle2);
               break;
       
       default: break;
     }

     obsTop1.scale = 0.1;
    //adjust the depth
    //obsTop1.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    obstacle1Group.add(obsTop1);
  }
}

function obsBottom() {

  if (frameCount % 60 === 0) {
    var obsBottom = createSprite(600,360,40,10);
    //obsBottom.y = Math.round(random(80,120));
    //obsTop1.addImage(obstacle1);
    
    obsBottom.velocityX = -5;
    
     //assign lifetime to the variable
     obsBottom.lifetime = 200;
    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obsBottom.addImage(Bottom1);
               break;
       case 2: obsBottom.addImage(Bottom2);
               break;
       case 3: obsBottom.addImage(Bottom3);
               break;

       default: break;
     }

     obsBottom.scale = 0.1;
    //adjust the depth
    //obsTop1.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    obsBottomGroup.add(obsBottom);
  }
}
function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstacle1Group.destroyEach();
    obsBottomGroup.destroyEach();
    balloon.visible = true;
    score = 0; 

    balloon = createSprite(100,200,20,50);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = 0.15;
  
  }
