export default class SceneManager{
    constructor({} = {}){
        this.loadScene = this.loadScene.bind(this);

    }

    loadScene(scene){
        go(scene);
    }
    say(word){
        console.log(word);
    }
}