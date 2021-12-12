import Button from ".././Ui/Buttons/Button.mjs"

export default class LoseScene {
    constructor({ scoreCounter = NaN } = {}) {
        this.sceneName = "loseScene",
            this.sceneManager = NaN,
            this.scoreCounter = scoreCounter;
    }

    addScoreCounter(scoreCounter) {
        this.scoreCounter = scoreCounter;
    }


    addSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }

    addScene(activated) {
        if (activated) {
            //console.log(this)
            //console.log(this.sceneManager.scenes[0]);
            add([
                sprite("wipper"),
                pos(width() / 2, height() / 2 - 80),
                scale(2),
                origin("center"),
            ]);

            let restartButton = new Button({ text: "Restart", buttonType: "restartButton" });
            //console.log(restartButton);
            restartButton.addButtonText();
            restartButton.addButtonRec();
            //console.log(this.sceneManager);
            restartButton.addSceneManager(this.addSceneManager(this.sceneManager))
            restartButton.listen();

            // display score
            add([
                text(this.scoreCounter.score),
                pos(width() / 2, height() / 2 + 80),
                scale(2),
                origin("center"),
            ]);
            // go back to game with space is pressed
        } else {
            return;
        }
    }
}
