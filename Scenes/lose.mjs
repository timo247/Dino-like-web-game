import Button from ".././Ui/Buttons/Button.mjs"
import k from "../main.mjs"
import Button2 from "../Ui/Buttons/Button2.mjs";

export default class LoseScene {
    constructor({ scoreCounter = NaN } = {}) {
        this.sceneName = "loseScene",
            this.sceneManager = NaN,
            this.scoreCounter = scoreCounter;
            this.addScene = this.addScene.bind(this)
    }

    addScoreCounter(scoreCounter) {
        this.scoreCounter = scoreCounter;
    }


    addSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }


    addScene() {
            add([
                sprite("wipper"),
                pos(width() / 2, height() / 2 - 80),
                scale(2),
                origin("center"),
                this.sceneName
            ]);

            let restartButton = new Button({ text: "Restart", buttonType: "restartButton", sceneTag: this.sceneName });
            restartButton.addButtonText();
            

            //let secondButton = new Button2
            //secondButton.create2Buttons();
            console.log(this.sceneManager);
            restartButton.addSceneManager(this.sceneManager)
            console.log(restartButton);

            restartButton.addButtonRec();
            // display score
            add([
                text(this.scoreCounter.score),
                pos(width() / 2, height() / 2 + 80),
                scale(2),
                origin("center"),
                this.sceneName
            ]);
            // go back to game with space is pressed

    }

    loadScene() {
        return k.scene(this.sceneName, this.addScene)
    }
}
