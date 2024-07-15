////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}
////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0, restitution: 0.95});
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for (var i = 0; i < birds.length; i++){
    fill("red");
    drawVertices(birds[i].vertices);

    if (isOffScreen(birds[i])){   //remove objects that are off-screen
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //your code here
  for (var i = 0; i < 6; i++){
    for (var j = 0; j < 3; j++){
      box = Bodies.rectangle(900 - j * 80, 540 - i * 80, 80, 80);
      boxes.push(box);
      colors.push(color(0, random(255), 0));
    }
  }
    
  for (var i = 0; i < boxes.length; i++){
    World.add(engine.world, [boxes[i]]);
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i = 0; i < boxes.length; i++){
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
      
    if (isOffScreen(boxes[i])){   //remove objects that are off-screen
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      colors.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  //your code here
  slingshotBird = Bodies.circle(210, 200, 20, {friction: 0, restitution: 0.95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
    
  slingshotConstraint = Constraint.create({
    pointA: {x: 210, y: 170},
    bodyB: slingshotBird,
    pointB: {x: 0, y: 0},
    stiffness: 0.01,
    damping: 0.0001
  });
    
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill("orange");
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
