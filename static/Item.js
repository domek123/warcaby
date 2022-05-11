class Item extends THREE.Mesh {

    constructor(id) {
        super()
        this.geometry = new THREE.BoxGeometry(50, 20, 50);
        this.material = new THREE.MeshBasicMaterial({
            color: id == 1 ? 0xe3c099 : 0x654321,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1
        });
    }
}
export default Item
