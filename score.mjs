export default class ScoreCounter {

    constructor({score = 0 } = {})
    {
        this.score = score;
        this.text = score;
    }

    incrementScore(){
        this.score++;
        this.text = this.score;
        this.showScoreLabel();
    }

   showScoreLabel(){
    add([
        text(this.score),
        pos(24, 24)
    ])
   }
   
   resetScore(){
       this.score = 0;
   }
}