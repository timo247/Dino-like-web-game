const JUMP_FORCE = 600;
// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import ScoreCounter from "../score.mjs"
import Button from "./Ui/Buttons/Button.mjs"
import mainGame from "./Scenes/mainGame.mjs";
import LoseScene from "./Scenes/lose.mjs";
import SceneManager from "./Ui/SceneManager.mjs";


let restartHtml = document.querySelector('button');




// initialize kaboom context
kaboom({
    width: 320,
    height: 240,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [0, 0, 255,],
})

loadSprite("wipper", "sprites/wipper.png");
loadSprite("ground", "sprites/ground.png");
loadSound("laser", "sounds/laser.mp3");
loadSprite("tree1", "sprites/tree1.png");
loadSprite("tree2", "sprites/tree2.png");
loadSprite("tree3", "sprites/tree3.png");
loadSprite("rock1", "sprites/rock1.png");
loadSprite("rock2", "sprites/rock2.png");

let scoreCounter = new ScoreCounter;
//console.log(scoreCounter);

let gameScene = new mainGame({scoreCounter: scoreCounter});
let loseScene = new LoseScene({scoreCounter: scoreCounter});

let scenes = [gameScene, loseScene];
let sceneManager = new SceneManager({scenes:scenes});

scenes.forEach(scene => {
    scene.addSceneManager(sceneManager);
});

sceneManager.scenes[0].addScene(true);














scene("lose", (score) => {
  //  restartHtml.classList.toggle('hidden');

    add([
        sprite("wipper"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ]);

    let restartButton = new Button({text:"Restart", buttonType:"restartButton"});
    console.log(restartButton);
    restartButton.addButtonText();
    restartButton.addButtonRec();
    restartButton.listen();
    
    // display score
    add([
        text(scoreCounter.score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        origin("center"),
    ]);
});
//go("game")