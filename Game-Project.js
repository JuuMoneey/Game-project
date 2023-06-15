const canvas = document.querySelector('canvas');
// canvas = a reference to the HTML canvas element
const ctx = canvas.getContext("2d");
// ctx = the canvas 2D rendering context
let score = 0;
// score = the current score of the player
const scoreElement = document.querySelector('#score')
// scoreElement = a reference to an HTML element where the score will be displayed
const stage = []
// stage = an array that will hold all game objects (enemies, food, etc.)
const FPS = 30;
// FPS = the desired frames per second of the game loop
const gameOverLay = document.querySelector('.game-over');
// gameOverLay = a reference to an HTML element for displaying a game over message
let lives = 3;
// lives = the number of lives the player starts with.
const shaggyImg = document.createElement('img');
shaggyImg.src = './Sponge.png'
const enemyImg = document.createElement('img');
enemyImg.src = './JellyFish.png'
const foodImg = document.createElement('img');
foodImg.src = './KrabbyPatty.jpg'



let shaggy = {
    x: 400,
    y: 450,
    // character coordinates on canvas
    w: 100,
    h: 150,
    // height and width of char
    img: shaggyImg,
    // spongebob img
    speed: 10,
    // the speed hes going
    onEnterFrame() {
      // This code is checking if a character named "Shaggy" is moving 
      // to the right or left, and then changing his position on the screen. 
      if(shaggy.right) {
        shaggy.x += shaggy.speed
        // If he's moving to the right, his position increases, and if he's moving 
      }
      if(shaggy.left){
        shaggy.x -= shaggy.speed
        // to the left, his position decreases. 
      }
    }
    // This happens repeatedly as long as the game is running.
  }




  function randomInteger(min, max) { 
    // This function generates a random number between 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    // a minimum and maximum value that we choose.
  }




class Food {
  // Create a class called "Food" which will have a constructor function. 
  constructor() {
    // In the constructor, we'll set some properties for the food object 
    this.x = randomInteger(13, 887)
    this.y = Math.random() * 150;
    this.w = 50;
    this.h = 50;
    this.img = foodImg;
    // like its x and y position, width and height, and an image. 
    stage.push(this);
    // We'll also add the food object to the "stage" array. 
  }
  onEnterFrame(){
    // The "onEnterFrame" function will continuously run 
    this.y += 3;
    if(isStacking(stack, this)){
      // we'll check if the food object is touching the "stack" object. 
      this.destroy();
      // If it is, we'll remove the food object from the stage, 
      this.addToStack();
      // add to the stack, 
      score++
      scoreElement.innerText = `Score: ${score}`;
      // update the score, and update the score element on the screen. 
    }
  }
  addToStack(){
    // The "addToStack" function will add the food object to the stack object, and 
    stack.h += 50
    //// stack.y -= 25
  }
  destroy() {
    stage.splice(stage.indexOf(this), 1);
    // the "destroy" function will remove the food object from the stage array.
   }
  }
  



  class Enemy {
    // Create a class called "Enemy" which will have a constructor function. 
    constructor() {
      // In the constructor, we'll set some properties for the enemy object, 
      this.x = randomInteger(13, 887)
      this.y = Math.random() * 150;
      this.w = 45;
      this.h = 45;
      this.img = enemyImg;
      // like its x and y position, width and height, and an image.
      stage.push(this);
      // We'll also add the enemy object to the "stage" array. 
      }
      onEnterFrame(){
        // The "onEnterFrame" function will check if the enemy object is touching the "shaggy" object. 
        this.y += 5;
       
        if(isStacking(shaggy, this)){
          //// stack.y = 550
          //// stack.h = 25
          this.destroy()
          // If it is, we'll remove the enemy object from the stage, and reset the score to 0. 
        }
       }
       destroy() {
        stage.splice(stage.indexOf(this), 1);
        score = 0;
        // The "destroy" function will remove the enemy object from the stage array and reset the score to 0
     }
    }


  let stack = {
      x: 500,
      // X-coordinate of the stack's position
      y: 445,
      // Y-coordinate of the stack's position
      h: 50,
      // Height of the stack
      w: 50,
      // Width of the stack
      speed: 10,
      // Speed at which the stack moves
      onEnterFrame() {
        // Method that runs on each frame of the game loop
      if(stack.right) {
        // If stack.right is true, 
        stack.x += stack.speed
        // the stack's x property is increased by the speed value, moving the stack to the right.
      }
      if(stack.left){
        // If stack.left is true
        stack.x -= stack.speed
        // the stack's x property is decreased by the speed value, moving the stack to the left.
      }
    }
  }
  
  
  
  // Create an event listener that listens for the "keydown" event on the window object. 
  window.addEventListener('keydown', (e) => {
    // When a key is pressed, 
    console.log(e.key) 
  const pressedKey = e.key
  // it will set a variable called "pressedKey" to equal the key that was pressed. 
  if(pressedKey === 'ArrowRight'){
    // If the pressed key is the right arrow key, 
    shaggy.right = true
    stack.right = true
    // set the "right" property of the shaggy and stack objects to true. 
  }
  if(pressedKey === 'ArrowLeft'){
    // If the pressed key is the left arrow key, 
        shaggy.left = true
        stack.left = true
        // set the "left" property of the shaggy and stack objects to true.
      }
})

// Create an event listener that listens for the "keyup" event on the window object.
window.addEventListener('keyup', (e) => {
  // When a key is let go,
  console.log(e.key)
  const pressedKey = e.key
  // it will set a variable called "pressedKey" to equal the key that was pressed.
    if(pressedKey === 'ArrowRight'){
       // If the pressed key is the right arrow key, 
      shaggy.right = false
      stack.right = false
      // set the "right" property of the shaggy and stack objects to false.
    }
    if(pressedKey === 'ArrowLeft'){
      // If the pressed key is the left arrow key, 
      shaggy.left = false
        stack.left = false
   // set the "left" property of the shaggy and stack objects to false.
      }
    })

    
    function drawImage(obj){
      // This code defines a function called drawImage that takes an object obj as a parameter. 
      ctx.drawImage(obj.img, obj.x, obj.y, obj.w, obj.h);
      // It then calls the drawImage method of the canvas context (ctx) to draw the image of the 
      // object on the canvas at the object's x and y position, with a width and height.
}


//a character
//b boxes/food
function isColliding(a, b){
  // Create a function called "isColliding" which takes in two objects "a" and "b" as arguments. 
  const a1 = a.x < b.x + b.w
  const a2 = a.w + a.x > b.x
  const b1 = a.y < b.y + b.h
  const b2 = a.h + a.y > b.y
  // The function will check if there is any overlap between the two objects by creating four 
  // boolean variables "a1", "a2", "b1", and "b2" that check if the edges of the objects intersect. 
  return a1 && a2 && b1 && b2 
  // Finally, the function will return "true" if there is a collision, and "false" otherwise.
  }
  
  
  function isStacking(a, b) {
    // Create a function called "isStacking" that takes in two objects "a" and "b" as arguments. 
    const a1 = a.x < b.x + b.w;
    const a2 = a.w + a.x > b.x;
    const b1 = a.y < b.y + b.h;
    const b2 = a.h + a.y > b.y;
    // The function will check if object "b" is on top of object "a" by creating four boolean 
    // variables "a1", "a2", "b1", and "b2" that check if the edges of the objects intersect. 
    if (a1 && a2 && b1 && b2) {
      // If there is a collision, 
      b.y = a.y + a.h;
      // the function will set the y-position of "b" to be directly on top of "a" 
      return true;
      // and return "true". 
    } else {
      // Otherwise, the function will return "false".
      return false;
  }
}

const drawStack = () => { 
  // Create a function named drawStack that does the following:
  let stackHeight = stack.y
  // Initialize a variable named stackHeight to the y-coordinate of the stack.
  for (let i = 0; i < score; i++) { 
    // Loop score number of times, and in each iteration, 
    ctx.drawImage(foodImg, stack.x, stackHeight, 50, 50); 
    // draw the food image on the canvas at the x and y coordinates of the stack and with a width and height of 50 pixels.
    stackHeight -= 50 
    // Subtract 50 from stackHeight in each iteration to stack the food images on top of each other.
  } 
};



  function trackScore(){
    ctx.fillRect(score)
  }
  
  function drawLives() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
  }
  
  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  
  function draw() {
    // Create a function called "draw" which will clear the screen, 
    clearScreen();
    // ctx.drawImage(backgroundImage, 0, 0);
    if(Math.random() > .95) new Food;
    // check if it's time to create a new food object
    stage.forEach(obj => {
      drawImage(obj);
      obj.onEnterFrame();
      // then iterate over all the objects in the "stage" array to draw and update them. 
    });
    if(Math.random() > .95) new Enemy;
    // check if it's time to create a new enemy object 
    stage.forEach(obj => {
      drawImage(obj);
      obj.onEnterFrame();
      // then iterate over all the objects in the "stage" array to draw and update them. 
    });
  drawImage(shaggy);
  // It will also draw the shaggy character,
  drawStack();
  // the stack, 
  drawLives();
  // and the player's lives. 
  shaggy.onEnterFrame();
     stack.onEnterFrame();
     if(score > 4) {
       // If the player's score is greater than 4, 
       clearInterval(gameLoop);
       // the function will stop the game loop, 
       setTimeout(() => gameLoop = setInterval(draw, 1000 / FPS), 1000);
       score = 0;
       // wait 1 second, and then start the game loop again.
      }
    }
    

function endGame() {
  if(score === 15){
    clearInterval(gameloop);
  }
  // when the game is over, call the endGame function to clear the interval
}

function startGame(){
  draw();
  let gameloop = setInterval(draw, 3500 / FPS)
  return gameloop;
// return the game loop interval ID so it can be cleared later
}
startGame()
endGame();


// Finished ThankYou








// function startGame() {
//   // start the game
//   draw();
//   gameloop = setInterval(draw, 3500 / FPS);
//   return gameloop;
//   // return the game loop interval ID so it can be cleared later
// }


// let gameLoopIntervalId = startGame();
// if(!lives) {
//   alert("GAME OVER");
//   document.location.reload();
// }


// const backgroundImage = document.createElement('img')
// backgroundImage.src = './KrustyKrab.PNG'
// backgroundImage.width = canvas.width
// backgroundImage.height = canvas.height
