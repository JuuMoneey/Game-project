const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
let score = 0;
const scoreElement = document.querySelector('#score')
const stage = []
const FPS = 30;


let shaggy = {
    x: 400,
    y: 525,
    // character coordinates on canvas
    w: 50,
    h: 75,
    // height and width of char
    color: 'brown',
    speed: 10,
    onEnterFrame() {
      if(shaggy.right) {
        shaggy.x += shaggy.speed
      }
      if(shaggy.left){
        shaggy.x -= shaggy.speed
      }
    }
  }


function randomInteger(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}



class Food {
  constructor() {
      this.color = 'yellow';
      this.x = randomInteger(13, 887)
      this.y = Math.random() * 150;
      this.w = 25;
      this.h = 25;
      stage.push(this);
    }
    onEnterFrame(){
       this.y += 3;
      if(isStacking(stack, this)){
        this.destroy();
        this.addToStack();
          score++
          scoreElement.innerText = `Score: ${score}`;
       }
     }
     addToStack(){
      stack.y -= 25
      stack.h += 25
     }
     destroy() {
      stage.splice(stage.indexOf(this), 1);
   }
  }


  class Enemy {
    constructor() {
        this.color = 'red';
        this.x = randomInteger(13, 887)
        this.y = Math.random() * 150;
        this.w = 20;
        this.h = 20;
        stage.push(this);
      }
      onEnterFrame(){
         this.y += 5;
       
        if(isStacking(shaggy, this)){
          this.destroy()
          stack.y = 550
          stack.h = 25
        }
       }
       destroy() {
        stage.splice(stage.indexOf(this), 1);
     }
    }
 


  let stack = {
      x: 450,
      y: 550,
      h: 25,
      w: 25,
      color: 'blue',
      speed: 10,
    onEnterFrame() {
      if(stack.right) {
        stack.x += stack.speed
      }
      if(stack.left){
        stack.x -= stack.speed
      }
    }
  }



// in event listner is where were going to move the stack
window.addEventListener('keydown', (e) => {
    console.log(e.key)
    const pressedKey = e.key
    if(pressedKey === 'ArrowRight'){
        shaggy.right = true
        stack.right = true
    }
    if(pressedKey === 'ArrowLeft'){
        shaggy.left = true
        stack.left = true
      }
})



//a character
//b boxes/food
function isColliding(a, b){
      const a1 = a.x < b.x + b.w
      const a2 = a.w + a.x > b.x
      const b1 = a.y < b.y + b.h
      const b2 = a.h + a.y > b.y
   return a1 && a2 && b1 && b2 
}

function isStacking(a, b) {
  const a1 = a.x < b.x + b.w;
  const a2 = a.w + a.x > b.x;
  const b1 = a.y < b.y + b.h;
  const b2 = a.h + a.y > b.y;

  if (a1 && a2 && b1 && b2) {
    b.y = a.y + a.h;
    return true;
  } else {
    return false;
  }
}



window.addEventListener('keyup', (e) => {
    console.log(e.key)
    const pressedKey = e.key
    if(pressedKey === 'ArrowRight'){
        shaggy.right = false
        stack.right = false
    }
    if(pressedKey === 'ArrowLeft'){
        shaggy.left = false
        stack.left = false
    }
  })


  function trackScore(){
    ctx.fillRect(score)
  }
  
  function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  }
  
  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
    


function draw() {
  clearScreen();
  if(Math.random() > .95) new Food;
  stage.forEach(obj => {
    drawRect(obj);
    obj.onEnterFrame();
  });
  if(Math.random() > .95) new Enemy;
  stage.forEach(obj => {
    drawRect(obj);
    obj.onEnterFrame();
  });
  drawRect(shaggy);
  drawRect(stack)
  shaggy.onEnterFrame();
  stack.onEnterFrame();
  // console.log(stage)
  if(score > 4) {
    clearInterval(gameLoop);
    setTimeout(() => gameLoop = setInterval(draw, 1000 / FPS), 1000);
    score = 0;
  }
}

function startGame(){
  draw();
  let gameloop = setInterval(draw, 3500 / FPS)
}
startGame()












// Define the two rectangles
// const rect1 = {
//   x: 100,
//   y: 100,
//   w: 50,
//   h: 50
// }

// const rect2 = {
//   x: 100, // Same x-coordinate as rect1
//   y: 150, // Shifted down by the height of rect1 to stack them vertically
//   w: 50,
//   h: 50
// }

// // Check if the two rectangles are colliding
// if (isColliding(rect1, rect2)) {
//   // If they are colliding, adjust the position of rect2
//   rect2.y = rect1.y + rect1.h // Place rect2 on top of rect1
// }

// Draw the two rectangles on the canvas
// ctx.fillStyle = 'red'
// ctx.fillRect(rect1.x, rect1.y, rect1.w, rect1.h)
// ctx.fillRect(rect2.x, rect2.y, rect2.w, rect2.h)



//   randomize();

//   sandwich_number = irandom_range(1, 2);
//   global.menu_item = sandwich_number;
  
//   switch sandwich_number {
//       case 1: ds_stack_push(global.order, "Bread", "Peanut Butter", "Jelly", "Bread"); break;
//       case 2: ds_stack_push(global.order, "Bread", "Turkey", "Cheese", "Lettuce", "Tomato", "Mayo", "Bread"); break;
//   }

// const boxes = [  {x: 100, y: 100, w: 50, h: 50},  {x: 150, y: 150, w: 50, h: 50},  {x: 200, y: 200, w: 50, h: 50},];

// for (let i = 0; i < boxes.length; i++) {
//   const a = boxes[i];

//   for (let j = i + 1; j < boxes.length; j++) {
//     const b = boxes[j];

//     if (isColliding(a, b)) {
//       // Adjust the y-coordinate of box a so that it sits on top of box b
//       a.y = b.y + b.h;
//     }
//   }
// }
