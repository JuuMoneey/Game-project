const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const stage = []
const FPS = 30;


let shaggy = {
    x: 400,
    y: 525,
    w: 50,
    h: 75,
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
      if(isColliding(shaggy, this)){
        this.destroy();
        score++
        scoreElement.innerText = `Score: ${score}`;
      }
     }
    destroy() {
       stage.splice(stage.indexOf(this), 1);
    }
  }


window.addEventListener('keydown', (e) => {
    console.log(e.key)
    const pressedKey = e.key
    if(pressedKey === 'ArrowRight'){
        shaggy.right = true
    }
    if(pressedKey === 'ArrowLeft'){
        shaggy.left = true
    }
})


function isColliding(a, b){
      const a1 = a.x < b.x + b.w
      const a2 = a.w + a.x > b.x
      const b1 = a.y < b.y + b.h
      const b2 = a.h + a.y > b.y
   return a1 && a2 && b1 && b2 
}


window.addEventListener('keyup', (e) => {
    console.log(e.key)
    const pressedKey = e.key
    if(pressedKey === 'ArrowRight'){
        shaggy.right = false
    }
    if(pressedKey === 'ArrowLeft'){
        shaggy.left = false
    }
  })


  function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
  }
  
  function clearScreen() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

function draw() {
  clearScreen();
  if(Math.random() > .9) new Food;
  stage.forEach(obj => {
    drawRect(obj);
    obj.onEnterFrame();
  });
  drawRect(shaggy);
  shaggy.onEnterFrame();
}
draw()
setInterval(draw, 1000 / FPS)

//   randomize();

//   sandwich_number = irandom_range(1, 2);
//   global.menu_item = sandwich_number;
  
//   switch sandwich_number {
//       case 1: ds_stack_push(global.order, "Bread", "Peanut Butter", "Jelly", "Bread"); break;
//       case 2: ds_stack_push(global.order, "Bread", "Turkey", "Cheese", "Lettuce", "Tomato", "Mayo", "Bread"); break;
//   }

