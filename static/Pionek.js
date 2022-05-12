class Pionek extends THREE.Mesh {

    constructor(id) {
        super()
        this.material = new THREE.MeshBasicMaterial({
            color: id == 2 ? 0xFF0000 : 0xFFFFFF,
            side: THREE.DoubleSide,
            map: id==2? new THREE.TextureLoader().load('./texture/sl.png') : new THREE.TextureLoader().load('./texture/sl2.png'),
            transparent: true,
            opacity: 1
        });
        this.geometry = new THREE.CylinderGeometry(25, 25, 5, 32);
    }
    Selected = () => {
        this.material.color.setHex(0xFFFF00)
    }
    changeColorWhite = () => {
        this.material.color.setHex(0xFFFFFF)
    }
    changeColorRed = () => {
        this.material.color.setHex(0xFF0000)
    }
}
export default Pionek
