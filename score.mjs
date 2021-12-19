export default class ScoreCounter {

    constructor({score = 0 } = {})
    {
        this.score = score;
        this.text = score;
        this.scoreLabel = NaN
    }

    incrementScore(){
        this.score++;
        this.text = this.score;
        this.scoreLabel.text = this.score;
    }


   addScoreLabel(){
    let label = add([
        text(this.score),
        pos(24, 24),
        "scoreLabel"
    ]);
    this.scoreLabel = label;
   }

   removeScoreLabel(){
       console.log("removeScore")
    every("scoreLabel", destroy)
   }
   
   
   resetScore(){
       this.score = 0;
   }
}