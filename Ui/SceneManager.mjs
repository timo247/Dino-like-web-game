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

    
    loadScene(sceneToLoad, lastScene){
        let sceneFound = this.getSceneByName(sceneToLoad)
        let sceneToRemove = this.getSceneByName(lastScene);
        console.log(sceneToRemove);
        sceneToRemove.desactivateScene();
       sceneFound.addScene(true)
    }

    
    
}