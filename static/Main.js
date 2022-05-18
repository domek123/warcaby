import Game from "./Game.js"
import Ui from "./UI.js"
import Net from "./Net.js"

let game;
let net;
let ui;
window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();

    net.setUi(ui)
    net.setGame(game)

    game.setNet(net)
}