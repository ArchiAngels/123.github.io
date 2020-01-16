let key = 0;
window.addEventListener('load', ()=>{
    document.querySelector('.CurrentSpeed').innerHTML = 'Current Speed: '+speedSnake.value;        
})
window.addEventListener('click', () => {
    // console.log(key);
    // console.log(RedQuader+BlackQuader,'Red:',RedQuader,'Black:',BlackQuader)
    key++;
    if(key > 1){
        key = 0;
    }
    else{
        // createElem();
        // createSnake();
        // CreateApple();
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
    // console.log(speedSnake.value);
})




btnBot.addEventListener('mousemove', () =>{
    let KeyYy;
    let KeyXxx;
    btnCount++;
    if(btnCount === 1){
        // console.log('Auto mode ON',btnCount,globCoorsX,globCoorsY,globCoorsApplX,globCoorsApplY);
        if(Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) > Math.max(globCoorsApplY - globCoorsY,globCoorsY - globCoorsApplY)){
                //   console.log('X>Y');
                KeyYy = 0;
                KeyXxx =1;
                
            }
        if( (Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) >= -20 && Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX) <= 20) && Math.max(globCoorsApplY - globCoorsY,globCoorsY -globCoorsApplY) > Math.max(globCoorsApplX - globCoorsX,globCoorsX - globCoorsApplX)){
                // console.log('Y>X');
                KeyXxx =0;
                KeyYy =1;
                
        }
        else{
            KeyYy = 0;
                KeyXxx =1;
        }
        // console.log(Math.max(globCoorsApplY,globCoorsY),Math.max(globCoorsApplX,globCoorsX),keyXx,keyYy);
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
                // if(globCoorsY > globCoorsApplY){
                //     botOn(0,speedSnake.value);
                //     courseOfSnake = 'Up';
                // }
            function botOn(x,y){
                // console.log(globCoorsX,globCoorsY);
                    ctx.clearRect(0, 0, cnv.width, cnv.height);
                    ctx.beginPath();
                    ctx.fillStyle = "green";
                    ctx.fillRect(globCoorsX - x,globCoorsY - y,sizeOfAll,sizeOfAll);
                    globCoorsX = globCoorsX -x;
                    globCoorsY = globCoorsY -y;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.fillStyle = "red";
                    ctx.fillRect(globCoorsApplX, globCoorsApplY, sizeOfAll, sizeOfAll);
                    ctx.stroke();
                    // UpdateSnakeChilds(countEatedApple);
                    // requestAnimationFrame(botOn);
                
                // setTimeout(sukaDelay(botOn(),sukinDelay));
            }
            if( (globCoorsX <= globCoorsApplX +AreaEated && globCoorsX >= globCoorsApplX -AreaEated) 
                && (globCoorsY <= globCoorsApplY+ AreaEated && globCoorsY >= globCoorsApplY -AreaEated)){
                countEatedApple++;
                CreateApple();
                console.log("Est!!",countEatedApple);
                // blackIsOff();    
            }
        }
    else{
        btnCount = 0;
        // console.log('Auto mode Off',btnCount);
    }

    // console.log(globCoorsX,globCoorsY,courseOfSnake);
    
})
let NewDirectX,NewDirectY;

function CreateChildSnake(direction){
    if(direction == 'Left'){
        // console.log(direction,'Right');
        createRelZmei(parseInt(-speedSnake.value),0);
    }
    if(direction == 'Down'){
        // console.log(direction,'Up');
        createRelZmei(0,parseInt(speedSnake.value));
    }
    if(direction == 'Up'){
        // console.log(direction,'Down');
        createRelZmei(0,-parseInt(speedSnake.value));
    }
    if(direction == 'Right'){
        // console.log(direction,'Left');
        createRelZmei(parseInt(speedSnake.value),0);
    }
}

let XxCoords = [];
let YyCoords = [];
let NumberOfPoints = 0;
function createRelZmei(x,y){
    AreaEated = parseInt(speedSnake.value)+10;
    console.log(AreaEated);
    // console.log(x,y);
    NewDirectX = x; 
    NewDirectY = y;
    NumberOfPoints = countEatedApple;
    // ctx.beginPath();
    // ctx.rect(globCoorsX - x,globCoorsY -y,sizeOfAll,sizeOfAll);
    XxCoords[NumberOfPoints] = globCoorsX - x;
    YyCoords[NumberOfPoints] = globCoorsY - y;
    // ctx.stroke();
    UpdtTwo();
}
function UpdtTwo(){
    // console.log('UPDT 2 is RUNNING');
    // console.log('Player coords:',globCoorsX,globCoorsY);
    // console.log('Points coords',XxCoords,YyCoords);
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
        // console.log(i,XxCoords[i],YyCoords[i],globCoorsX-XxCoords[i],globCoorsY-YyCoords[i]);
    }
    //     ctx.beginPath();
    //     ctx.rect(XxCoords,YyCoords,sizeOfAll,sizeOfAll);
    //     ctx.stroke();
    // }
}
function UpdateSnakeChilds(n){
    XxCoords[0] = globCoorsX;
    YyCoords[0] = globCoorsY;
    ctx.beginPath();
    for(i = 0; i < n-1; i++){
        // XxCoords[i] = XxCoords[i-1];
        // YyCoords[i] = YyCoords[i-1];
        ctx.moveTo(XxCoords[i+1], YyCoords[i+1]);
        ctx.lineTo(XxCoords[i+2], YyCoords[i+2]);
        ctx.font = "30px Arial";
        ctx.strokeText(i, XxCoords[i+2], YyCoords[i+2]);
        ctx.moveTo(XxCoords[n], YyCoords[n]);
        ctx.lineTo(XxCoords[0], YyCoords[0]);
        // ctx.rect(XxCoords[i],YyCoords[i],sizeOfAll,sizeOfAll);
        // console.log(i);
        // if(XxCoords[0] == XxCoords[i] && YyCoords[0] == YyCoords[i]){
        //     console.log('Dead');
        // }
    }
    ctx.stroke();
    // console.log(XxCoords,YyCoords);
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

// let tetr = document.querySelector('.titr');
// function blackIsOff(){
//     if(countEatedApple %5 == 0){
//         console.log('ooops');
//         tetr.classList.remove('hidden');
//         window.scrollBy(0,1);
//     }
// }
// tetr.addEventListener('click', () =>{
//     tetr.classList.add('hidden');
// })

window.addEventListener('keydown', (e) => {
    if(event.keyCode === 37){
        setTimeout(sukaDelay(lifeIsOn(speedSnake.value,0)),sukinDelay);
    }
    if(event.keyCode === 38){
        setTimeout(sukaDelay(lifeIsOn(0,speedSnake.value)),sukinDelay);
    }
    if(event.keyCode === 39){
        setTimeout(sukaDelay(lifeIsOn(-speedSnake.value,0)),sukinDelay);
    }
    if(event.keyCode === 40){
        setTimeout(sukaDelay(lifeIsOn(0,-speedSnake.value)),sukinDelay);
    }
    function lifeIsOn(x,y){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.beginPath();
        if(globCoorsX > cnv.width){
            globCoorsX = 0;
        }
        if(globCoorsY > cnv.height){
            globCoorsY = 0;
        }
        if(globCoorsX < 0){
            globCoorsX = cnv.width;
        }
        if(globCoorsY < 0){
            globCoorsY = cnv.height;
        }
        if( (globCoorsX < globCoorsApplX +AreaEated && globCoorsX > globCoorsApplX -AreaEated) 
            && (globCoorsY < globCoorsApplY+ AreaEated && globCoorsY > globCoorsApplY -AreaEated)){
            countEatedApple++;
            CreateApple();
            // console.log("Est!!",countEatedApple); 
            //blackIsOff();       
        }
        ctx.rect(globCoorsX - x,globCoorsY - y,sizeOfAll,sizeOfAll);
        globCoorsX = globCoorsX - x;
        globCoorsY = globCoorsY -y;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(globCoorsApplX, globCoorsApplY, sizeOfAll, sizeOfAll);
        ctx.stroke();
        // console.log(globCoorsX,':',globCoorsY,'\n',globCoorsApplX,':',globCoorsApplY,);
    }
})


function createZmei(){
    let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
    let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
    // console.log(coordinateOfSpawnX,coordinateOfSpawnY);
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

function CreateApple(n){
    // if(countEatedApple > 0){
    //     CreateChildSnake(courseOfSnake);
    // }
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
        // console.log('XXX',coordinateOfSpawnX);
        // key = 0;
        RedQuader++;
    }
    else{
        BlackQuader++;
    }
    // console.log(coordinateOfSpawnX,' : ',cnv.width,'\n',coordinateOfSpawnY,' : ',cnv.height);
    if( key === 1){
        setTimeout(sukaDelay(createSnake),sukinDelay);
    }
}

function createElem(){
    // let ramn = Math.random();
    // ctx.clearRect(0, 0, cnv.width, cnv.height);
    if(bx > cnvWidth*0.01 * window.innerWidth){
        bx = 0;
    }
    if(by > cnvHeight*0.01 * window.innerHeight){
        by = 0;
    }
    // console.log(ramn);
    // console.log('Created!','X:',bx,'Y:',by);
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