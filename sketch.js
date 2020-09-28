
//background and its image
var bg, base;

//objects and their images
var gun, gunImg;
var bullet, bulletImage;
var wall, thickness, wallImage, red, green;

//to store speed and weight
var speed, weight;


function preload() {
  //To Load Images

  bulletImage = loadImage("bullet.png");
  wallImage = loadImage("wall.png");
  gunImg = loadImage("gun.png");
  red = loadImage("redWall.png");
  green = loadImage("greenWall.png");
  bg = loadImage("bg.png");
}


function setup() {
  //create canvas
  createCanvas(1536, 721);
  
  //assign value to speed and weight
  speed = random(-55, -130);
  weight = random(400, 1500);
  thickness = random(22, 83);

  //Create Objects

  //background
  base = createSprite(800, 350, 50, 50);
  base.addImage(bg);
  base.scale = (2.25);

  //wall
  wall = createSprite(80, 400, 20, 20);
  wall.addImage(wallImage);
  wall.rotation = (0);
  wall.scale = (0.8);
  wall.setCollider("rectangle", 0, 0, 100, 300);

  bullet = createSprite(1450, 400, 50, 50);
  bullet.addImage(bulletImage);
  bullet.scale = (0.25);
  bullet.rotation = (270);
  bullet.velocityX = speed;
  bullet.setCollider("rectangle", 0, 0, 200, 100);

  gun = createSprite(1350, 450, 50, 50);
  gun.addImage(gunImg);
  gun.scale = (0.14);

}


function draw() {
  //make the background white
  background("black");

  //make the depth of wall less than car
  wall.depth = bullet.depth;
  bullet.depth = bullet.depth + 1;
  
  gun.depth = bullet.depth;
  bullet.depth = bullet.depth + 1;

  //to calculate the damage of car
  detectDamage(bullet, wall);

  //to display created sprites
  drawSprites();
  
}


function detectDamage(object1, object2) {
  
  //declare the damage
  var damage = 0.5 * weight * speed * speed/(thickness * thickness * thickness);
 
  //when the car and wall collide, change the colour according to deformation
  if (object1.x-object2.x < (object2.width+object1.width)/2 - 220) {
    
    //stop the moving and collided object
    object1.velocityX = 0;

   if (damage < 10 ) {
    object2.addImage(green);
    object2.scale = (0.8);
    object1.x = 190;
  }

   if (damage > 10 ) {
    object2.addImage(red);
    object2.scale = (0.8);
    object1.x = 190;

  }

}


}