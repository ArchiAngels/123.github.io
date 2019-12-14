let key = 0;

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
        CreateApple();
    }
})
let sukinDelay = 4;
let bx = 0;
let by = 0;
let xx = 10;
let yy = 10;
let cnv = document.querySelector('.someCanv');
let ctx = cnv.getContext("2d");

let RedQuader = 0;
let BlackQuader = 0;

let cnvWidth = 60;
let cnvHeight= 80;
cnv.width = cnvWidth*0.01 * window.innerWidth;
cnv.height = cnvHeight*0.01 * window.innerHeight;
cnv.style.width = cnvWidth*0.01 * window.innerWidth + 'px';
cnv.style.height = cnvHeight*0.01 * window.innerHeight + 'px';

let rowsOfZmei = [];


let globCoorsX;
let globCoorsY;
let globCoorsApplX;
let globCoorsApplY;
let countEatedApple = 0;
let AreaEated = 50;

window.addEventListener('keydown', (e) => {
    if(event.keyCode === 37){
        setTimeout(sukaDelay(lifeIsOn(10,0)),sukinDelay);
    }
    if(event.keyCode === 38){
        setTimeout(sukaDelay(lifeIsOn(0,10)),sukinDelay);
    }
    if(event.keyCode === 39){
        setTimeout(sukaDelay(lifeIsOn(-10,0)),sukinDelay);
    }
    if(event.keyCode === 40){
        setTimeout(sukaDelay(lifeIsOn(0,-10)),sukinDelay);
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
            console.log("Est!!",countEatedApple);
        }
        ctx.rect(globCoorsX - x,globCoorsY - y,20,20);
        globCoorsX = globCoorsX - x;
        globCoorsY = globCoorsY -y;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(globCoorsApplX, globCoorsApplY, 20, 20);
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
    ctx.rect(coordinateOfSpawnX,
        coordinateOfSpawnY,
        20,20);
    ctx.stroke();
}

createZmei();

function CreateApple(){
    let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
    let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
    globCoorsApplX = coordinateOfSpawnX;
    globCoorsApplY = coordinateOfSpawnY;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(coordinateOfSpawnX, coordinateOfSpawnY, 20, 20);
    ctx.stroke();
}

function createSnake(){
    let coordinateOfSpawnX = parseInt((Math.random() * cnv.width).toFixed(2)) ;
    let coordinateOfSpawnY = parseInt((Math.random() * cnv.height).toFixed(2));
    ctx.beginPath();
    ctx.rect(coordinateOfSpawnX,
        coordinateOfSpawnY,
        20,20);
    ctx.stroke();
    if(coordinateOfSpawnX > cnv.width - 50 || coordinateOfSpawnX < 50 || coordinateOfSpawnY > cnv.height - 50 || coordinateOfSpawnY < 50 ){
        ctx.fillStyle = "red";
        ctx.fillRect(coordinateOfSpawnX, coordinateOfSpawnY, 20, 20);
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
    let ramn = Math.random();
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