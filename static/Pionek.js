class Pionek extends THREE.Mesh {

    constructor(id) {
        super()
        this.material = new THREE.MeshBasicMaterial({
            color: id == 2 ? 0xFF0000 : 0xFFFFFF,
            side: THREE.DoubleSide,
            wireframe: false,
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
