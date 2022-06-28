const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var dino;
var dino1, dino2, dino3, dino4;
var breakButton;
var backgroundImage;

var stones = [];

function preload() {
  dino1 = loadImage("./assets/dino2.png ");
  dino2 = loadImage("./assets/dino3.png");

  dino3 = loadImage("./assets/dino1.png");
  dino4 = loadImage("./assets/dino1.png");

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  dino = createSprite(width / 2, height - 110);
  dino.addAnimation("lefttoright", dino1, dino2, dino1);
  dino.addAnimation("righttoleft", dino3, dino4, dino3);
  dino.scale = 0.5;
  dino.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");

  //breakButton.mouseClicked(handleButtonPress);
  breakButton.mousePressed(handleButtonPress);
  //breakButton.mouse(handleButtonPress);
  //breakButton.mousePressed(ButtonPress);


}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var stone of stones) {
    stone.show();
  }

  if (dino.position.x >= width - 300) {
    dino.velocityX = -10;
    dino.changeAnimation("righttoleft");
  }

  if (dino.position.x <= 300) {
    dino.velocityX = 10;
    dino.changeAnimation("lefttoright");
  }

  drawSprites();
}

function handleButtonPress() {
  /* jointLink=dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); */

  /* jointLink.dettach();
  setTimeout(() => {
    break();
  }, 1500); */

   jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 5); 

  /* jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500); */
}
