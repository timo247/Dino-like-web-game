export default class SceneManager{
    constructor({scenes = []} = {}){
        this.scenes = scenes;
        this.sceneToLoad = NaN
    }

    getSceneByName(name){
        //console.log(this.scenes);
        let arraySceneToGet = this.scenes.filter(element => element.sceneName == name);
        let sceneToGet = arraySceneToGet[0];
        return(sceneToGet)
    }

    
    switchScene(sceneToSwitch){
        let sceneFound = this.getSceneByName(sceneToSwitch) 
        console.log(sceneFound)
        sceneFound.loadScene();      
        go(sceneFound.sceneName)
    }

    
    
}