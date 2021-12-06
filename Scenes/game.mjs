export default class gameScene {
    constructor({}){
        this.scene = NaN;
    }

    addScene(){
        let scene = scene("game", () => {
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
    }    
}
