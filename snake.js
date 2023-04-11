const myCanvas= document.getElementById('myCanvas');
const context=myCanvas.getContext('2d');

const SIZE=20;
const head={
    x:0,
    y:0
};

let food=null;


let dx = 0;
let dy = 0;




setInterval(main,1000);



function main(){
    update();
    draw(); 
}


function update(){
    //actualiza cabeza de la serpiente
    head.x+=dx;
    head.y+=dy;
    //detecta si la serpiente ha consumido comida
    if(food && head.x===food.x && head.y===food.y){
        food=null;
    }
    //crea comida si no hay
    if(!food){       
        food = {x:getRandomX(),y:getRandomY()};
        console.log('Mover hacia arriba'+food.x + food.y);
    }
};

function draw(){
    context.fillStyle='black';
    context.fillRect(0,0,myCanvas.width,myCanvas.height);
    drawObjet(head,'lime');
    drawObjet(food,'red');
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

document.addEventListener('keydown',moverSnake);

function moverSnake(event){

switch(event.key){
    case'ArrowUp':
        console.log('Mover hacia arriba');
        dx=0;
        dy=-SIZE;
        break;
    case'ArrowDown':
        console.log('Mover hacia abajo');   
        dx=0;
        dy=+SIZE;
        break;
    case'ArrowRight':
        console.log('Mover hacia derecha');  
        dx=+SIZE;
        dy=0;

        break;  
    case'ArrowLeft':
        console.log('Mover hacia izquierda');   
        dx=-SIZE;
        dy=0;
        break; 

}

}