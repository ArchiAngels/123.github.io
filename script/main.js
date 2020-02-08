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
                if( (globCoorsX <= globCoorsApplX +AreaEated && globCoorsX >= globCoorsApplX -AreaEated) 
                    && (globCoorsY <= globCoorsApplY+ AreaEated && globCoorsY >= globCoorsApplY -AreaEated)){
                    countEatedApple++;
                    CreateApple();
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

let jopaDrun = 0;
let hhjopa;
cnv.addEventListener('click', ()=>{
    jopaDrun++;
    if(jopaDrun == 1){
        hhjopa = setInterval(poshelNahui,30);
    }
    if(jopaDrun == 2){
        jopaDrun = 0;
        clearInterval(hhjopa);
    }
    VerificationLocaation(globCoorsX,globCoorsY,globCoorsApplX,globCoorsApplY);
})

let jopall;
function VerificationLocaation(ax,ay,x,y){
    let y1,y2,x1;
    let y1h,y2h,x2;

    if(ax > cnv.width && jopall != 1){
        // console.log('1');
        globCoorsX = 0;
        ax = globCoorsY;
        jopall = 1;
        setTimeout(KakRZeAaaaa,600);
    }
    if(ay > cnv.height && jopall != 1){
        // console.log('2');
        globCoorsY = 0;
        ay = globCoorsY;
        jopall = 1;
        setTimeout(KakRZeAaaaa,600);
    }
    if(ax < 0 && jopall != 1){
        // console.log('3');
        globCoorsX = cnv.width;
        ax = globCoorsY;
        jopall = 1;
        setTimeout(KakRZeAaaaa,600);
    }
    if(ay < 0 && jopall != 1){
        // console.log('4');
        globCoorsY = cnv.height;
        ay = globCoorsY;
        jopall = 1;
        setTimeout(KakRZeAaaaa,600);
    }


    let bb,nn;
    if(Math.max(x - ax,ax - x) > Math.max(y - ay,ay - y)){
        bb = 0;
        nn = 1;
    }
    if( (Math.max(x - ax,ax - x) >= -20 && Math.max(x - ax,ax - x) <= 20) && Math.max(y - ay,ay -y) > Math.max(x - ax,ax - x)){
        nn = 0;
        bb = 1;
    }
    else{
        bb = 0;
        nn = 1;
    }

    if( ax >= x){
        // console.log('AG1');
        y2 = ax;
        y1 = x;
        x1 = (Math.max(y1-y2,y2-y1));
    }
    if( x > ax){
        // console.log('EB2');
        y1 = ax;
        y2 = x;
        x1 = (Math.max(y1-y2,y2-y1));
    }

    // console.log(Math.max(y1-y2,y2-y1));
    // console.log('y1: ',y1,'y2: ',y2,'CNV_WIDTH: ',cnv.width,'x1: ',x1,'y1+y2: ',y1+(cnv.width -y2), 'x1 > y1+y2: ',x1 > y1+(cnv.width -y2),'x1 < y1+y2: ',x1 < y1+(cnv.width -y2));


    if( x1 <= y1 + ( cnv.width - y2) ){
        if( ax <= x && nn == 1 ){
            // console.log('Go in Right');
            botOn(-speedSnake.value,0);
            courseOfSnake = 'Right';
            CreateChildSnake(courseOfSnake); 
        }
        if( ax >= x && nn == 1 ){
            // console.log('Go in Left');
            botOn(speedSnake.value,0);
            courseOfSnake = 'Left';
            CreateChildSnake(courseOfSnake); 
        }
    }
    else{
        if( ax <= x && nn == 1 ){
            // console.log('Go out Left');
            botOn(speedSnake.value,0);
            courseOfSnake = 'Left';
            CreateChildSnake(courseOfSnake); 
        }
        if( ax >= x && nn == 1 ){
            // console.log('Go out Right');
            botOn(-speedSnake.value,0);
            courseOfSnake = 'Right';
            CreateChildSnake(courseOfSnake); 
        }
    }

    if( ay >= y ){
        // console.log('HH1');
        y2h = ay;
        y1h = y;
        x2 = (Math.max(y1h-y2h,y2h-y1h));
    }
    if(y > ay){
        // console.log('HH2');
        y1h = ay;
        y2h = y;
        x2 = (Math.max(y1h-y2h,y2h-y1h));
    }
    // console.log('y1: ',y1,'y2: ',y2,'CNV_WIDTH: ',cnv.width,'x1: ',x1,'y1+y2: ',y1+(cnv.width -y2), 'x1 > y1+y2: ',x1 > y1+(cnv.width -y2),'x1 < y1+y2: ',x1 < y1+(cnv.width -y2));
    // console.log('x2: ',x2,'y1h: ',y1h,'y2h: ',y2h,'cnvHeight:',cnv.height,'y1h+y2h:',y1h + ( cnv.height - y2h),'x2 > y1h+y2h:',x2>y1h + ( cnv.height - y2h),'x2 < y1h+y2h:',x2<y1h + ( cnv.height - y2h));
    if( x2 <= y1h + ( cnv.height - y2h) ){
        // console.log('UP_IF: ',ay > y,'DoWN_IF: ',ay < y ,'Y: ',y,'AY: ',ay);
        if( ay < y && bb == 1){
            // console.log('Go in Down');
            botOn(0,-speedSnake.value);
            courseOfSnake = 'Down';
            CreateChildSnake(courseOfSnake); 
        }
        if( ay > y && bb == 1){
            // console.log('Go in Up');
            botOn(0,speedSnake.value);
            courseOfSnake = 'Up';
            CreateChildSnake(courseOfSnake); 
        }
    }
    else{
        // console.log('UP_ELSE: ',ay < y ,'DoWN_ELSE: ',ay > y );
        if( ay < y && bb == 1){
            // console.log('Go out Up');
            botOn(0,speedSnake.value);
            courseOfSnake = 'Up';
            CreateChildSnake(courseOfSnake); 
        }
        if( ay > y  && bb == 1){
            // console.log('Go out Down');
            botOn(0,-speedSnake.value);
            courseOfSnake = 'Down';
            CreateChildSnake(courseOfSnake); 
        }
    }

    
    // if(  ax <= x && nn == 1 ){
    //     botOn(-speedSnake.value,0);
    //     courseOfSnake = 'Right';
    //     CreateChildSnake(courseOfSnake);  
    //     if(((ax >= x && nn == 1) &&  x1 >= y1+(cnv.width -y2)) && keyy == 1){
    //         botOn(-speedSnake.value,0);
    //         keyy = 0;
    //     }
        
    // }
    // if( ax > x && nn == 1){
    //     botOn(speedSnake.value,0);
    //     courseOfSnake = 'Left';
    //     CreateChildSnake(courseOfSnake);             
    //     if(((ax < x && nn == 1) && x1 > y1+(cnv.width -y2)) && keyy == 1){
    //         botOn(speedSnake.value,0);
    //         keyy = 0;
    //     }
    // }
    // if(ay > y && bb == 1 ){
    //     botOn(0,speedSnake.value);
    //     courseOfSnake = 'Up';
    //     // console.log('up',ax,ay);
    //     CreateChildSnake(courseOfSnake);                        
    // }
    // if(ay < y && bb == 1 ){
    //     botOn(0,-speedSnake.value);
    //     courseOfSnake = 'Down';
    //     // console.log('down',ax,ay);
    //     CreateChildSnake(courseOfSnake); 
    // }
    if( (ax <= x +AreaEated && ax >= x -AreaEated) 
            && (ay <= y+ AreaEated && ay >= y -AreaEated)){
            countEatedApple++;
            CreateApple();
    }
}
function KakRZeAaaaa(){
    // console.log('Gates is Open',jopall == 0);
    jopall = 0;
    // console.log('Gates is Open',jopall == 0);
}
function poshelNahui(){
    VerificationLocaation(globCoorsX,globCoorsY,globCoorsApplX,globCoorsApplY);
}

