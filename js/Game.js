class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    man1 = createSprite(100,200);
   
    man2 = createSprite(300,200);
   
    man3 = createSprite(500,200);
   
    man4 = createSprite(700,200);
   
    cars = [man1, man2, man3, man4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getcarsatend();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
    //  image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
     
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank += 1
      Player.updatecarsatend(player.rank);
    }

    if(obstaclesGroup.isTouching(cars)){
     collision()
      }
  
    drawSprites();
    spawnObstacles();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
function spawnObstacles(){
  if(World.frameCount % 20 ===0){
    obstacles= createSprite(100,200,20,20)
    //var rando = Math.random(displayWidth,displayWidth-20)
    obstacles.x = Math.round(random(400,1100))
    obstacles.velocityY = 7
    obstacles.lifetime =1000
    obstaclesGroup.add(obstacles)
  }  
  }
  function collision(){
    if(index === player.index){
      cars[index-1].velocityY = 0
        }
      }