const myCanvas= document.getElementById('myCanvas');
const context=myCanvas.getContext('2d');

const SIZE=20;
const head={
    x:0,
    y:0
};
const body=[];

let food=null;

let dx = 0;
let dy = 0;




setInterval(main,500); //se llama 1 vez por segundo



function main(){
    update();
    draw(); 
}


function update(){


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
    //detecta si la serpiente ha consumido comida
    if(food && head.x===food.x && head.y===food.y){
        food=null;
        increaseSnakeSize(prevX,prevY);
    }
    //crea comida si no hay
    if(!food){       
        food = {x:getRandomX(),y:getRandomY()};      
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