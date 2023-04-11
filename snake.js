const myCanvas= document.getElementById('myCanvas');
const context=myCanvas.getContext('2d');
const scoreText= document.getElementById('score');
var score=0;
const SIZE=20;
const head={
    x:0,
    y:0
};
const body=[];

let food=null;

let dx = 0;
let dy = 0;

let lastAxis;



setInterval(main,100); //se llama 1 vez por segundo



function main(){
    update();
    draw(); 
}


function update(){
    const collisionDetected = checkSnakeColision();
    if(collisionDetected){
        scoreText.innerHTML="Score: 0 ";
        gameOver();
        return
    }

    let prevX,prevY;
    //salvar la posicion del ultimo posicion de la serpietne
    if(body.length>=1){
     prevX = body[body.length-1].x;
     prevY = body[body.length-1].y;
    }else{
    prevX=head.x;
    prevY=head.y;
    }
    //cuerpo sigue a la cabeza
    for (let i=body.length-1; i>=1 ;--i){
        body[i].x = body[i-1].x
        body[i].y = body[i-1].y
      

    }
    if(body.length>=1){
    body[0].x=head.x;
    body[0].y=head.y;}
    //actualiza cabeza de la serpiente
    head.x+=dx;
    head.y+=dy;
    if(dx!==0){
        lastAxis= 'X';
    }else if(dy!==0){
        lastAxis='Y'
    }
    //detecta si la serpiente ha consumido comida
    if(food && head.x===food.x && head.y===food.y){
        food=null;
        increaseSnakeSize(prevX,prevY);
    }
    //crea comida si no hay
    if(!food){       
        food = randomFoodPosition();   
        score+=20;
        scoreText.innerHTML=` Score:  <Strong>${score -20} </Strong>`;
        console.log(score);      
    }
};

function draw(){
    context.fillStyle='black'; //Bkgrd 
    context.fillRect(0,0,myCanvas.width,myCanvas.height);
    
    drawObjet(head,'lime');//draw cabeza
    body.forEach(elem =>drawObjet(elem,'lime'));
    drawObjet(food,'red');//draw comida
}

function getRandomX(){
    return 20 * (parseInt(Math.random() *20));
}
function getRandomY(){
    return 20 * (parseInt(Math.random() *23));
}

function drawObjet(obj,color){
    context.fillStyle=color;
    context.fillRect(obj.x,obj.y,SIZE,SIZE);
}


function increaseSnakeSize(prevX,prevy){
 body.push({
    x:prevX , y:prevy }
    );
}

function checkSnakeColision(){
    for (let i=0; i<body.length ;++i){
        if(head.x ==body[i].x && head.y ==body[i].y){
           return true;
        }

    }
    //verificar que la serpiente no se salga
    const topCollision= (head.y < 0);
    const bottomCollision=(head.y > 440);
    const leftCollision= (head.x < 0);
    const rightCollision=(head.x > 460);
    if(topCollision || bottomCollision ||leftCollision || rightCollision ){
        return true;
    }
    return false;
}
function gameOver(){
    alert('Has perdido');
    head.x=0;
    head.y=0;
    dy=0;
    dx=0;
    body.length=0;
    score=0;
}

document.addEventListener('keydown',moverSnake);


function checkFoodCollision(position){
    //comparar las coordenadas del alimento generado con el cuerpo de la serpiente
    for (let i=0; i<body.length ;++i){
        if(position.x == body[i].x && position.y == body[i].y){
           return true;     
        }
    }
    // compara las coordenadas del alimento generado con las cabeza de la serpiente
    if(position.x == head.x && position.y == head.y){
        return true;
     }
     return false;
}

function randomFoodPosition(){
    let position;  
    do { 
      position= {x:getRandomX(),y:getRandomY()};
     }while(checkFoodCollision(position));  
        return position;
  }

function moverSnake(event){
  
switch(event.key){
    case'ArrowUp':
       
        if(lastAxis!=='Y'){    
        console.log('Mover hacia arriba');   
        dx=0;
        dy=-SIZE;
    }
        break;
    case'ArrowDown':          
        if(lastAxis!=='Y'){  
        console.log('Mover hacia abajo');   
        dx=0;
        dy=+SIZE;
    }
        break;
    case'ArrowRight':
    if(lastAxis!=='X'){  
        console.log('Mover hacia derecha');  
        dx=+SIZE;
        dy=0;
    }
        break;  
    case'ArrowLeft':
    if(lastAxis!=='X'){  
        console.log('Mover hacia izquierda');   
        dx=-SIZE;
        dy=0;
    }    
        break; 

}

}