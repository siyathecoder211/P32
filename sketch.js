const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var a;
var circles=[];
var bgColour = 255;
//var bgDay = "#91d9ed", bgNight = "#382C2C";
var blockColour1 = "blue", blockColour2 = "teal", blockColour3 = "cyan", blockColour4 = "lightblue";
var slingColour = "cyan";
var score = 0;

// ground, hexagon, & sling varibles and ground x, y, w, & h
var ground, floor, hexagon;
var groundX = 800, groundY = 600;
var groundW = 270, groundH = 15;

// blocks variables and width & height of blocks
var block1, block2, block3, block4, block5, block6, block7, block8, block9, block0;
var blockW = 45, blockH = 60;

// helps calculate x and y
var f = blockW/2;
var g = groundY - (blockH/2 + groundH/2);

// x and y of blocks
var xPos1 = groundX-f*3, xPos2 = groundX-f*2, xPos3 = groundX-f, xPos4 = groundX, xPos5 = groundX+f, xPos6 = groundX+f*2, xPos7 = groundX+f*3;
var yRow1 = g-blockH*3, yRow2 = g-blockH*2, yRow3 = g-blockH, yRow4 = g;

function setup() {

  engine = Engine.create();
  world = engine.world;

  createCanvas(1200,800);
  stroke(255);
  
  //camera=new Camera(width/2,height/2,0.5);
  //camera.on();
  a=height;
  circles.push(width/2);


  hexagon = new Hexagon(300,300,75,75);
  ground = new Ground(groundX, groundY, groundW, groundH);
  floor = new Ground(600,800,1200,20);
  sling = new Sling(hexagon.body, {x:300, y:300});

  block1 = new Block(xPos4, yRow1, blockW, blockH);

  block2 = new Block(xPos3, yRow2, blockW, blockH);
  block3 = new Block(xPos5, yRow2, blockW, blockH);

  block4 = new Block(xPos2, yRow3, blockW, blockH);
  block5 = new Block(xPos4, yRow3, blockW, blockH);
  block6 = new Block(xPos6, yRow3, blockW, blockH);

  block7 = new Block(xPos1, yRow4, blockW, blockH);
  block8 = new Block(xPos3, yRow4, blockW, blockH);
  block9 = new Block(xPos5, yRow4, blockW, blockH);
  block0 = new Block(xPos7, yRow4, blockW, blockH);

  Engine.run(engine);
}

function draw() {
  //camera.zoom=camera.zoom+1;

  getTime();
  background(bgColour);  
  
  Engine.update(engine);
  
  a=a-1;
  //camera.zoom=camera.zoom+0.01;
  //camera.position={x:width/2,y:a};
 


  for (i=0;i<circles.length;i++)
  {
    noFill();
    noStroke();
	  circle(circles[i], height/2,20)
  }
  
  if(camera.position.x%width===0)
  {
	  circles.push(camera.position.x+width/2)
  }



  //camera(0, 0, 20 + sin(frameCount * 0.01) * 10, 0, 0, 0, 0, 1, 0);


  ground.display("orange");
  floor.display("orange");
  hexagon.display();
  sling.display(slingColour);

  block1.display(blockColour1);

  block2.display(blockColour2);
  block3.display(blockColour2);

  block4.display(blockColour3);
  block5.display(blockColour3);
  block6.display(blockColour3);

  block7.display(blockColour4);
  block8.display(blockColour4);
  block9.display(blockColour4);
  block0.display(blockColour4);

  block1.score();

  block2.score();
  block3.score();

  block4.score();
  block5.score();
  block6.score();
  
  block7.score();
  block8.score();
  block9.score();
  block0.score();

  //console.log(block1.body.position.y);

  if (frameCount%40 === 20) {

    blockColour1 = "brown";
    blockColour2 = "red";
    blockColour3 = "salmon";
    blockColour4 = "pink";

    slingColour = "salmon";
  }
  else if (frameCount%40 === 0) {

    blockColour1 = "blue";
    blockColour2 = "teal";
    blockColour3 = "cyan";
    blockColour4 = "lightblue";

    slingColour = "cyan";
  }

  drawSprites();

  textSize(20);
  fill("orange");
  stroke("black");
  text("SCORE: " + score, 800, 100);
}

function keyPressed ()
{
  if(keyCode === RIGHT_ARROW)
  {
    if(keyIsDown(RIGHT_ARROW))
    {
      camera.position.x=camera.position.x+10;
    }
  }
} 

function mouseDragged () {

  Matter.Body.setPosition(hexagon.body, {x:mouseX, y:mouseY});
}

function mouseReleased() {

  sling.fly();
}

function keyPressed() {

  if (keyCode === 32) {

    sling.attached();
  }
}


async function getTime() {

  var response = await fetch("http://worldtimeapi.org/api/timezone/America/Toronto");
  var responseJSON = await response.json();
  //console.log(responseJSON);

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);

  if (hour >= 06 && hour <= 18) {
    bgColour = "#91d9ed";

  }
  else {

    bgColour = "#382C2C";
  }
}
