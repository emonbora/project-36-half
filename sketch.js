//Create variables here
var dog,happyDog,database,foodStock,foodS;
var feed, addFood, foodObj, fedTime, lastFed




function preload()
{
  //load images here
  dogImg = loadImage("Images/dogImg.png")
  dogImage1 = loadImage("Images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database();
  foodObj = new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImage1)
  dog.scale = 0.15
  foodStock=database.ref('food');
  foodStock.on("value",readStock)

  feed = createButton("Feed the Dog")
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  //add styles here
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });
  fill(255,255,254);
  textSize(13);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed===0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed : "+ lastFed + " Am", 350, 30)
  }
  foodObj.display()
}
function  readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
  
}

function feedDog(){
  dog.addImage(dogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({ 
    Food:foodS
  })
  
}


