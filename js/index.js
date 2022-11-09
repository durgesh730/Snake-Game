let Direction = {x: 0, y: 0};
const  foodSound = new Audio ('music/food.mp3');
const  gameOver = new Audio('music/gameover.mp3');
const  moveSound = new Audio('music/move.mp3');
let lastPaintTime = 0;
let score = 0;
let speed = 4;
let ArraySnake =[
    { x:8, y:16}
];
food = {x:6, y: 7};



// game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return; 
    }
    lastPaintTime = ctime;
    WholeGame();
}

function Collapse(snake){
    for (let i = 1; i < ArraySnake.length; i++) {
         if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
             return true;
         }
        }
         
         if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0)
         {
            return true;
         }

         return false;
}

function WholeGame(){
    // part 1 : updating
    if(Collapse(ArraySnake)){
        gameOver.play();
        Direction = {x: 0, y:0};
        alert ("Game Over. Press key to Play again!");
        ArraySnake = [{x:13, y:15}];
        score = 0;
    }

//if snake eated food
    if(ArraySnake[0].y === food.y && ArraySnake[0].x === food.x){
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Heigh Score:" + hiscoreval;
        }
        scoreBox.innerHTML = "Score:" + score;
       ArraySnake.unshift({x: ArraySnake[0].x + Direction.x, y: ArraySnake[0].y + Direction.y});
       let a= 2;
       let b = 16;
       food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a+ (b-a)* Math.random())}
    } 
    

   for(let i = ArraySnake.length - 2; i>=0; i--) 
   {
      ArraySnake[i+1] = {...ArraySnake[i]};
   } 

   ArraySnake[0].x += Direction.x;
   ArraySnake[0].y += Direction.y;


  // food and snake
    board.innerHTML = " ";
    ArraySnake.forEach((e, index)=> {
         snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;

          if(index === 0){
            snakeElement.classList.add('head');
          }
          else{
            snakeElement.classList.add('snake');
          }
         board.appendChild(snakeElement);
    });
     
    //display the food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}



let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Heigh Score:" + hiscore;
}


//main logic start here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    // start the game
   Direction = {x:0, y: 1} 
   switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp")
        Direction.x= 0;
        Direction.y = -1;
        break;

     case "ArrowDown":
       console.log("ArrowDown");
       Direction.x= 0;
       Direction.y = 1;
       break;    
    case "ArrowLeft":
        console.log("ArrowLeft")
        Direction.x= -1;
        Direction.y = 0;
        break;
    case "ArrowRight":
        console.log("ArrowRight")
        Direction.x= 1;
        Direction.y = 0;
         break;

    default:
        break;
   }

});
