import ScoreCounter from "../score.mjs";



export default class mainGame {
    constructor({ sceneName = "gameScene", scoreCounter = NaN, player = NaN, jumpForce = 600, isActivated = true } = {}) {
        this.scoreCounter = scoreCounter
        this.sceneName = sceneName
        this.player = player
        this.jumpForce = jumpForce
        this.sceneManager = NaN
        this.isActivated = isActivated
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
        if (this.isActivated) {
            add([
                this.randomObstacle(),
                area(),
                outline(4),
                pos(width(), height() - 48),
                origin("botleft"),
                move(LEFT, 200),
                "obstacle", // add a tag here
            ]);
            wait(rand(0.5, 1.5), () => {
                this.spawnObstacle();
            });
        }

    }

    loadSprites() {
        loadSprite("wipper", "sprites/wipper.png");
        loadSprite("ground", "sprites/ground.png");
        loadSound("laser", "sounds/laser.mp3");
        loadSprite("tree1", "sprites/tree1.png");
        loadSprite("tree2", "sprites/tree2.png");
        loadSprite("tree3", "sprites/tree3.png");
        loadSprite("rock1", "sprites/rock1.png");
        loadSprite("rock2", "sprites/rock2.png");
    }


    addSceneManager(sceneManager) {
        this.sceneManager = sceneManager;
    }

    activateScene() {
        this.isActivated = true;
    }

    desactivateScene() {
        this.isActivated = false;
        every(this.sceneName, destroy);
    }
    addScene() {
        if (this.isActivated) {

            this.loadSprites();
            this.scoreCounter.addScoreLabel();
            this.scoreCounter.resetScore();
        } else {
            this.scoreCounter.removeScoreLabel();
        }
        let player = add([
            sprite("wipper"),  // renders as a sprite
            pos(120, 80),    // position in world
            area(),          // has a collider
            body(),
            this.sceneName          // responds to physics and gravity
        ]);
        add([
            sprite("ground"),
            pos(-10, height() - 48),
            outline(4),
            area(),
            solid(),
            color(127, 200, 255),
            this.sceneName
        ]);
        onUpdate(() => {
            if (this.isActivated) {
                this.scoreCounter.incrementScore();
            } else {
                this.scoreCounter.removeScoreLabel();
            }
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
            this.sceneManager.loadScene("loseScene", this.sceneName); // go to "lose" scene here
        });
        this.spawnObstacle();

    }


}