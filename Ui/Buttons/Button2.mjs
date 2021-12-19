export default class Button2{
    constructor({buttonHeight = 13, buttonWidth = 70, text = "text", buttonType = NULL, sceneManager = NaN, sceneTag = "not defined"} = {}) {
        this.buttonHeight = buttonHeight;
        this.buttonWidth = buttonWidth;
        this.text = text;
        this.sceneManager = sceneManager;
        this.textComponent = NaN;
        this.buttonRect = NaN;
        this.buttonType = buttonType;
        this.sceneTag = sceneTag;
    } 

    addButton(txt, p, f) {
        const btn = add([
            text(txt),
            pos(p),
            area({ cursor: "pointer", }),
            scale(1),
            origin("center"),
        ])
    
        btn.onClick(f)
    
        btn.onUpdate(() => {
            if (btn.isHovering()) {
                const t = time() * 10
                btn.color = rgb(
                    wave(0, 255, t),
                    wave(0, 255, t + 2),
                    wave(0, 255, t + 4),
                )
                btn.scale = vec2(1.2)
            } else {
                btn.scale = vec2(1)
                btn.color = rgb()
            }
        })


    
    }

    create2Buttons(){
        this.addButton("Start", vec2(200, 100), () => debug.log("oh hi"))
        this.addButton("Quit", vec2(200, 200), () => debug.log("bye"))
        
        // reset cursor to default at frame start for easier cursor management
        onUpdate(() => cursor("default"))
    }
    
}
 