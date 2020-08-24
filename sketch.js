var bgImg,database,dog,dogHappy,foodST,foodStock,food;

function preload(){
    bgImg=loadImage("bg1.jpg");
    happyDogImg=loadImage("happydog.png")
    dogImg=loadImage("Dog.png");
}



function setup(){
   //  database=firebase.databse();
    database = firebase.database();
    createCanvas(3000,1800)

    dog=createSprite(2100,1350);
    dog.scale=0.8;
    dog.addImage(dogImg)
    foodStock=database.ref('food');
    foodStock.on("value",readStock,showError)
}

function draw(){
    background(bgImg);
    drawSprites();
    textSize(60);
    textFont("Arial Black");
    fill(46, 139, 87);
     text("PRESS UP ARROW TO FEED MILK TO DOG",1000,150);
    fill("red");
    text("FOOD REMAINING:"+foodST,1400,950);
   
    if(foodST!=undefined){
    if(keyWentDown(UP_ARROW)){
        writeStock(foodST);
        dog.addImage(happyDogImg);

        }
    }
}

function readStock(data){
    foodST=data.val();
}

function writeStock(x){

    if(x<=0){
        x=0
    }else{
        x=x-1;
    }
    database.ref('/').update({
    food:x
})
}
function showError(){
    console.log("Error in writing the database")
}