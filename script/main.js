let key = 0;
window.addEventListener('load', ()=>{
    document.querySelector('.CurrentSpeed').innerHTML = 'Current Speed: '+speedSnake.value;        
})
window.addEventListener('click', () => {
    key++;
    if(key > 1){
        key = 0;
    }
    else{
    }
})
let sukinDelay = 150;
let bx = 0;
let by = 0;
let xx = 10;
let yy = 10;
let speedSnake = document.querySelector('.speed_snake');
let cnv = document.querySelector('.someCanv');
let ctx = cnv.getContext("2d");
let courseOfSnake;
let sizeOfAll = 10;

let btnBot = document.querySelector('.checker');
let btnCount = 0;

speedSnake.addEventListener('change', ()=>{
    document.querySelector('.CurrentSpeed').innerHTML = 'Current Speed: '+speedSnake.value;
})




btnBot.addEventListener('mousemove', () =>{
    let KeyYy;
    let KeyXxx;
    btnCount++;
    if(btnCount === 1){
        if(Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) > Math.max(globCoorsApplY - globCoorsY,globCoorsY - globCoorsApplY)){
                KeyYy = 0;
                KeyXxx =1;
                
            }
        if( (Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) >= -20 && Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) <= 20) && Math.max(globCoorsApplY - globCoorsY,globCoorsY -globCoorsApplY) > Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX)){
                KeyXxx =0;
                KeyYy =1;
                
        }
        else{
            KeyYy = 0;
                KeyXxx =1;
        }
                    if(globCoorsX < globCoorsApplX && KeyXxx ==1 ){
                            botOn(-speedSnake.value,0);
                            courseOfSnake = 'Right';
                            CreateChildSnake(courseOfSnake);                
                    }
                    if(globCoorsX > globCoorsApplX && KeyXxx ==1){
                            botOn(speedSnake.value,0);
                            courseOfSnake = 'Left';     
                            CreateChildSnake(courseOfSnake);                   
                        }
                    if(globCoorsY > globCoorsApplY && KeyYy ==1){
                            botOn(0,speedSnake.value);
                            courseOfSnake = 'Up';
                            CreateChildSnake(courseOfSnake);                        
                        }
                    if(globCoorsY < globCoorsApplY && KeyYy ==1){
                            botOn(0,-speedSnake.value);
                            courseOfSnake = 'Down';
                            CreateChildSnake(courseOfSnake); 
                        }
                if( (globCoorsX <= globCoorsApplX +AreaEated && globCoorsX >= globCoorsApplX -AreaEated) 
                && (globCoorsY <= globCoorsApplY+ AreaEated && globCoorsY >= globCoorsApplY -AreaEated)){
                countEatedApple++;
                CreateApple();
                console.log("Est!!",countEatedApple);
            }
            
        }
    else{
        btnCount = 0;
    }

    
})
function botOn(n,b){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(globCoorsX - n,globCoorsY - b,sizeOfAll,sizeOfAll);
        globCoorsX = globCoorsX -n;
        globCoorsY = globCoorsY -b;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(globCoorsApplX, globCoorsApplY, sizeOfAll, sizeOfAll);
        ctx.stroke();
    
}

let NewDirectX,NewDirectY;

function CreateChildSnake(direction){
    if(direction == 'Left'){
        createRelZmei(parseInt(-speedSnake.value),0);
    }
    if(direction == 'Down'){
        createRelZmei(0,parseInt(speedSnake.value));
    }
    if(direction == 'Up'){
        createRelZmei(0,-parseInt(speedSnake.value));
    }
    if(direction == 'Right'){
        createRelZmei(parseInt(speedSnake.value),0);
    }
}

let XxCoords = [];
let YyCoords = [];
let NumberOfPoints = 0;
function createRelZmei(x,y){
    AreaEated = parseInt(speedSnake.value)+10;
    NewDirectX = x; 
    NewDirectY = y;
    NumberOfPoints = countEatedApple - 1;
    XxCoords[NumberOfPoints] = globCoorsX - x;
    YyCoords[NumberOfPoints] = globCoorsY - y;
    // console.log(XxCoords[NumberOfPoints], YyCoords[NumberOfPoints]);
    UpdtTwo();
}
function UpdtTwo(){
    console.log('Uped');
    for(i  = 0 ; i < countEatedApple; i++){
        ctx.font = "10px Arial";
        ctx.strokeText(i, XxCoords[i], YyCoords[i]);
        if(countEatedApple - i == 1){
            XxCoords[i] += NewDirectX;
            YyCoords[i] += NewDirectY;
            ctx.beginPath();
            ctx.rect(XxCoords[i],YyCoords[i],sizeOfAll,sizeOfAll);
            ctx.stroke();
        }
        else{
            XxCoords[i] = XxCoords[i+1];
            YyCoords[i] = YyCoords[i+1];
            ctx.beginPath();
            ctx.rect(XxCoords[i],YyCoords[i],sizeOfAll,sizeOfAll);
            ctx.stroke();
        }
    }
}
function UpdateSnakeChilds(n){
    XxCoords[0] = globCoorsX;
    YyCoords[0] = globCoorsY;
    ctx.beginPath();
    for(i = 0; i < n-1; i++){
        ctx.moveTo(XxCoords[i+1], YyCoords[i+1]);
        ctx.lineTo(XxCoords[i+2], YyCoords[i+2]);
        ctx.font = "30px Arial";
        ctx.strokeText(i, XxCoords[i+2], YyCoords[i+2]);
        ctx.moveTo(XxCoords[n], YyCoords[n]);
        ctx.lineTo(XxCoords[0], YyCoords[0]);
    }
    ctx.stroke();
}

let RedQuader = 0;
let BlackQuader = 0;

let cnvWidth = 60;
let cnvHeight= 80;
cnv.width = cnvWidth*0.01 * window.innerWidth;
cnv.height = cnvHeight*0.01 * window.innerHeight;
cnv.style.width = cnvWidth*0.01 * window.innerWidth + 'px';
cnv.style.height = cnvHeight*0.01 * window.innerHeight + 'px';


let globCoorsX;
let globCoorsY;
let globCoorsApplX;
let globCoorsApplY;
let countEatedApple = 0;
let AreaEated = speedSnake.value;
let tmpVariable = 0;


window.addEventListener('keydown', (e) => {
    if(event.keyCode === 37){
        botOn(speedSnake.value,0);
        courseOfSnake = 'Left';
        CreateChildSnake(courseOfSnake); 
    }
    if(event.keyCode === 38){
        botOn(0,speedSnake.value);
        courseOfSnake = 'Up';
        CreateChildSnake(courseOfSnake); 
    }
    if(event.keyCode === 39){
        botOn(-speedSnake.value,0);
        courseOfSnake = 'Right';
        CreateChildSnake(courseOfSnake); 
    }
    if(event.keyCode === 40){
        botOn(0,-speedSnake.value);
        courseOfSnake = 'Down';
        CreateChildSnake(courseOfSnake); 
    }
    tmpVariable++;
                if( (globCoorsX <= globCoorsApplX +AreaEated && globCoorsX >= globCoorsApplX -AreaEated) 
                    && (globCoorsY <= globCoorsApplY+ AreaEated && globCoorsY >= globCoorsApplY -AreaEated)){
                    countEatedApple++;
                    CreateApple();
                    console.log("Est!!",countEatedApple); 
                }
                    if(globCoorsX > cnv.width){
                        globCoorsX = 0;
                        // UpdtTwo();
                    }
                    if(globCoorsY > cnv.height){
                        globCoorsY = 0;
                        // UpdtTwo();
                    }
                    if(globCoorsX < 0){
                        globCoorsX = cnv.width;
                        // UpdtTwo();
                    }
                    if(globCoorsY < 0){
                        globCoorsY = cnv.height;
                        // UpdtTwo();
                    }
    tmpVariable--;
})


function createZmei(){
    let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
    let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
    globCoorsX = coordinateOfSpawnX;
    globCoorsY = coordinateOfSpawnY;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(coordinateOfSpawnX,
        coordinateOfSpawnY,
        sizeOfAll,sizeOfAll);
    ctx.stroke();
}

createZmei();
CreateApple();

function CreateApple(){
    document.querySelector('.Score_snake').innerHTML = 'Score: '+countEatedApple;
        let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
        let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
        globCoorsApplX = coordinateOfSpawnX;
        globCoorsApplY = coordinateOfSpawnY;
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(coordinateOfSpawnX, coordinateOfSpawnY, sizeOfAll, sizeOfAll);
        ctx.stroke();
}

function createSnake(){
    let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
    let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(coordinateOfSpawnX,
        coordinateOfSpawnY,
        sizeOfAll,sizeOfAll);
    ctx.stroke();
    if(coordinateOfSpawnX > cnv.width - 50 || coordinateOfSpawnX < 50 || coordinateOfSpawnY > cnv.height - 50 || coordinateOfSpawnY < 50 ){
        ctx.fillStyle = "red";
        ctx.fillRect(coordinateOfSpawnX, coordinateOfSpawnY, sizeOfAll, sizeOfAll);
        RedQuader++;
    }
    else{
        BlackQuader++;
    }
    if( key === 1){
        setTimeout(sukaDelay(createSnake),sukinDelay);
    }
}

function createElem(){
    if(bx > cnvWidth*0.01 * window.innerWidth){
        bx = 0;
    }
    if(by > cnvHeight*0.01 * window.innerHeight){
        by = 0;
    }
    ctx.beginPath();
    ctx.rect(bx,by,xx,yy);
    ctx.stroke();
    bx += 11;
    by += 1;
    if( key === 1){
        setTimeout(sukaDelay(createElem),sukinDelay);
    }
}
function sukaDelay(n){
    setTimeout(n,sukinDelay);
}