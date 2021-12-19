//gérer les clicks du bouton
import SceneManager from ".././SceneManager.mjs"

export default class Button {
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

    addSceneManager(sceneManager){
        this.sceneManager = sceneManager
    }

    addButtonText (){
        this.textComponent = add([
            text(this.text, {
                size: this.buttonHeight, // 48 pixels tall
                width: this.buttonWidth, // it'll wrap to next line when width exceeds this value
                font: "apl386", // there're 4 built-in fonts: "apl386", "apl386o", "sink", and "sinko"
            }),
            pos(width() / 2 - (this.buttonWidth / 2), height()/2 - (this.buttonHeight / 2)),
            color(0, 0, 0),
            z(4)
        ])
    }

    addButtonRec(){
        this.buttonRect = add([
            pos(0.9* this.textComponent.pos.x, this.textComponent.pos.y - 0.16 * this.textComponent.height),
            rect(this.textComponent.width *1.1, this.textComponent.height + 0.6 * this.textComponent.height),
            outline(4),
            area( {cursor: "pointer"}),
            z(3),
            "button",
            this.buttonType
        ])

        this.buttonRect.onUpdate(() => {
            if (this.buttonRect.isHovering()) {
                const t = time() * 10
                this.buttonRect.color = rgb(
                    wave(0, 255, t),
                    wave(0, 255, t + 2),
                    wave(0, 255, t + 4),
                )
                this.buttonRect.scale = vec2(1.2)
                this.buttonRect.onClick(() => go("gameScene"))
            } else {
                this.buttonRect.scale = vec2(1)
                this.buttonRect.color = rgb()
            }
        })

        


    }
}