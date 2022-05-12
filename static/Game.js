import Pionek from "./Pionek.js"
import Item from "./Item.js"
class Game {

    constructor() {
        this.user = null
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 300, 400)
        this.camera.lookAt(this.scene.position)
        const axes = new THREE.AxesHelper(1000)
        this.scene.add(axes)
        this.szachownica = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
        ];
        this.pionki = [
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],

        ];
        this.selectedObj = null
        this.selObjX = null
        this.selObjZ = null
        this.redChequer = []
        this.whiteChequer = []
        this.whiteItems = []
        this.blackItems = []
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2()

        this.makeBoard()
        this.moveChequer()
        this.render()

    }
    makeBoard = () => {

        for (let i = 0; i < this.szachownica.length; i++) {
            for (let j = 0; j < this.szachownica[i].length; j++) {
                this.szachownica[i][j] == 0 ? this.cube = new Item(1) : this.cube = new Item(2)
                this.szachownica[i][j] == 0 ? this.whiteItems.push(this.cube) : this.blackItems.push(this.cube)
                this.cube.position.set(-175 + j * 50, 0, -175 + i * 50)
                this.scene.add(this.cube);
            }
        }
    }
    makePionki = () => {
        for (let i = 0; i < this.pionki.length; i++) {
            for (let j = 0; j < this.pionki[i].length; j++) {
                if (this.pionki[i][j] == 2) {
                    this.pionek = new Pionek(2)
                    this.redChequer.push(this.pionek)
                }
                else if (this.pionki[i][j] == 1) {
                    this.pionek = new Pionek(1)
                    this.whiteChequer.push(this.pionek)
                }
                else {
                    continue;
                }
                this.pionek.position.set(-175 + j * 50, 20, -175 + i * 50)
                this.scene.add(this.pionek);
            }
        }


    }
    moveChequer() {
        window.addEventListener("mousedown", (e) => {
            this.mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouseVector, this.camera);
            this.intersects = this.raycaster.intersectObjects(this.scene.children);
            if (this.intersects.length > 0) {
                if (this.intersects[0].object.geometry.type == "CylinderGeometry") {
                    if (this.intersects[0].object != this.selectedObj) {
                        if (this.user == 1 && this.whiteChequer.includes(this.intersects[0].object)) {
                            this.selectChequer(this.whiteChequer)
                        }
                        else if (this.user == 2 && this.redChequer.includes(this.intersects[0].object)) {
                            this.selectChequer(this.redChequer)
                        }
                    }
                }
                else if (this.intersects[0].object.geometry.type == "BoxGeometry" && this.selectedObj != null) {
                    const x = (this.intersects[0].object.position.x + 175) / 50
                    const z = (this.intersects[0].object.position.z + 175) / 50
                    if (this.pionki[z][x] == 0) {
                        if (this.blackItems.includes(this.intersects[0].object)) {
                            // this.pionki[this.selObjZ][this.selObjX] = 0
                            // this.pionki[z][x] = this.user == 1 ? 1 : 2
                            console.log(this.pionki)
                            this.movingAnimation(this.intersects[0].object.position.x, this.intersects[0].object.position.z)
                            this.user == 1 ? this.selectedObj.changeColorWhite() : this.selectedObj.changeColorRed()
                            this.selectedObj = null
                        }
                    }

                }
            }
        });
    }
    selectChequer(tab) {
        this.selectedObj = this.intersects[0].object
        this.selObjX = (this.selectedObj.position.x + 175) / 50
        this.selObjZ = (this.selectedObj.position.z + 175) / 50
        tab.forEach(pionek => {
            this.user == 1 ? pionek.changeColorWhite() : pionek.changeColorRed()
        })
        this.selectedObj.Selected()

    }
    movingAnimation(x, z) {
        new TWEEN.Tween(this.selectedObj.position)
            .to({ x, z }, 500)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }
    setPionki(tab, user) {
        this.pionki = tab
        this.user = user
        this.whiteChequer = []
        this.redChequer = []
        this.makePionki()
    }


    render = () => {
        requestAnimationFrame(this.render);
        TWEEN.update()
        this.renderer.render(this.scene, this.camera);
    }
    setPos(pos) {
        if (pos == 2) {
            this.camera.position.set(0, 300, -400)
            this.camera.lookAt(this.scene.position)
        }
    }
    setUser(user) {
        this.user = user
    }
    getPionki() {
        return this.pionki
    }
}
export default Game