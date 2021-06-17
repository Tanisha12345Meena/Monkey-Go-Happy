var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup;
var score;
var ground;
var survivalTime=0;

function preload(){
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided=loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png"); 
}
function setup() {
createCanvas(400,400);
  //creating monkey
 monkey=createSprite(80,315,20,20) ;
monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided" , monkey_collided);
monkey.scale=0.09; 
//creating ground
ground=createSprite(600,350,900,10);
 ground.velocityX=-4;
  ground.x=ground.width/2; 
  score=0;
   //creating groups
  obstacleGroup=createGroup();
  bananaGroup = createGroup();
  score=0;
}
function draw() {
   background ("pink");
  //making Survival Time and Score
  fill("black");
   text("Score: "+score,300,50);
   fill("black");
  textSize(20);
  text("Survival Time: "+survivalTime,100,50);
  
  if(gameState === PLAY){
    
    // call the functions here
    spawnObstacles() ;
    spawnBanana();
     survivalTime = Math.ceil(frameCount/frameRate())
monkey.collide(ground);
  //making the monkey jump
  if(keyDown("space")&& monkey.y >= 200){
     monkey.velocityY = -12}
  //add gravity
  monkey.velocityY = monkey.velocityY+0.8;
  //making new ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
     if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
      score=score+1    
     }
  if(obstacleGroup.isTouching(monkey)){
   gameState = END; 
  }}
  if(gameState === END){
   monkey.changeAnimation("collided",monkey_collided);
    
    // set the velocity of each = 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }
  
drawSprites();  
}
// move the functions outside the function draw
// make the framecount as 200 for the obstacles
function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(500,310,20,20);
    obstacle.collide(ground);
    obstacle.scale = 0.2; 
    obstacle.lifetime = 170;
    obstacle.velocityX=-3;
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
     }}
  function spawnBanana(){
  if(frameCount % 160 === 0){
  banana=createSprite(400,80,40,10) ;
   banana.y=Math.round(random(100,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-3;
    banana.lifetime=170;
    bananaGroup.add(banana);
     }  } 