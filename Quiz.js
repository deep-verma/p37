class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
   // question.hide();
    textSize(30);
    text("hello", 120, 100);
    Contestant.getContestentInfo();

    if(allContestants!== undefined){
      var display_position = 130;
      for(var plr in allContestants){
        if(plr==="contestant"+ contestant.index)
        fill("red");
        else
        fill("black");
      
      display_position+=20;
      textSize(15);
      text(allContestants[plr].name + ":" + allContestants[plr].distance,120,display_position); 

    }
  }

  if(keyIsDown(UP_ARROW) && contestant.index!==null){
    contestant.distance+=50;
    contestant.update();
  }
}


}
