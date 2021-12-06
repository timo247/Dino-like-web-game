const JUMP_FORCE = 600;
// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
import ScoreCounter from "../score.mjs"
import Button from "./Ui/Button.mjs"


let restartHtml = document.querySelector('button');


// initialize kaboom context
kaboom({
    width: 320,
    height: 240,
    font: "sinko",
    canvas: document.querySelector("#mycanvas"),
    background: [0, 0, 255,],
})

let scoreCounter = new ScoreCounter;

loadSprite("wipper", "sprites/wipper.png");
loadSprite("ground", "sprites/ground.png");
loadSound("laser", "sounds/laser.mp3");
loadSprite("tree1", "sprites/tree1.png");
loadSprite("tree2", "sprites/tree2.png");
loadSprite("tree3", "sprites/tree3.png");
loadSprite("rock1", "sprites/rock1.png");
loadSprite("rock2", "sprites/rock2.png");




function randomObstacle() {
    let n = rand(1, 6);
    console.log(n);
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



function spawnObstacle() {
    add([
        randomObstacle(),
        area(),
        outline(4),
        pos(width(), height() - 48),
        origin("botleft"),
        move(LEFT, 200),
        "obstacle", // add a tag here
    ]);
    wait(rand(0.5, 1.5), () => {
        spawnObstacle();
    });
}




scene("game", () => {
    //restartHtml.classList.toggle('hidden');
    // add character to screen, from a list of components
    scoreCounter.addScoreLabel();
    scoreCounter.resetScore();
    let player = add([
        sprite("wipper"),  // renders as a sprite
        pos(120, 80),    // position in world
        area(),          // has a collider
        body(),          // responds to physics and gravity
    ]);

    add([
        sprite("ground"),
        pos(-10, height() - 48),
        outline(4),
        area(),
        solid(),
        color(127, 200, 255),
    ]);
    console.log(scoreCounter);
    onUpdate(() => {
        scoreCounter.incrementScore();
        //console.log("newscore:", scoreCounter.score)
    });



    // jump when player presses "space" key
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    });

    player.onCollide("obstacle", () => {
        addKaboom(player.pos);
        shake();
        go("lose"); // go to "lose" scene here
    });

    spawnObstacle();
})




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



/*
restartHtml.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("button clicked");
    go("game");
});

*/
go("game")