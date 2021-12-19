import ScoreCounter from "../score.mjs";
import k from "../main.mjs"



export default class mainGame {
    constructor({ sceneName = "gameScene", scoreCounter = NaN, player = NaN, jumpForce = 600} = {}) {
        this.scoreCounter = scoreCounter
        this.sceneName = sceneName
        this.player = player
        this.jumpForce = jumpForce
        this.sceneManager = NaN
        this.nTimesLoaded = 0
        this.obstacles = []
        this.addScene = this.addScene.bind(this)
    }




    randomObstacle() {
        let n = rand(1, 6);
        if (n > 1 && n < 2) {
            return sprite("tree1");
        } else if (n >= 2 && n <= 3) {
            //return rock2;
            return sprite("tree2");
        } else if (n >= 3 && n <= 4) {
            // return tree1;
            return sprite("tree3");
        } else if (n >= 4 && n <= 5) {
            return sprite("rock1");
        } else if (n >= 5 && n <= 6) {
            return sprite("rock2");
        }
    }

    spawnObstacle() {
            add([
                this.randomObstacle(),
                area(),
                outline(4),
                pos(width(), height() - 48),
                origin("botleft"),
                move(LEFT, 200),
                "obstacle", // add a tag here
                this.sceneName
            ]);
            wait(rand(0.5, 1.5), () => {
                this.spawnObstacle();
            });

    }

    addSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }


    addScene() {
            console.log(this)
            this.nTimesLoaded++;
            this.scoreCounter.resetScore();

                this.scoreCounter.addScoreLabel();
                this.scoreCounter.resetScore();
           
            
        let player = add([
            sprite("wipper"),  // renders as a sprite
            pos(120, 80),    // position in world
            area(),          // has a collider
            body(),
            this.sceneName          // responds to physics and gravity
        ]);
        console.log(player)

        let obstacle = add([
            sprite("ground"),
            pos(-10, height() - 48),
            outline(4),
            area(),
            solid(),
            color(127, 200, 255),
            this.sceneName
        ]);

        this.obstacles.push(obstacle)
        onUpdate(() => {
                this.scoreCounter.incrementScore();
            //console.log("newscore:", scoreCounter.score)
        });

        // jump when player presses "space" key
        onKeyPress("space", () => {
            if (player.isGrounded()) {
                player.jump(this.jumpForce);
            }
        });

        player.onCollide("obstacle", () => {
            addKaboom(player.pos);
            shake();
            this.scoreCounter.removeScoreLabel();
            //go("loseScene")
            this.sceneManager.switchScene("loseScene"); // go to "lose" scene here
        });
        this.spawnObstacle();


    }

    loadScene() {
        return k.scene(this.sceneName, this.addScene)
    }


}