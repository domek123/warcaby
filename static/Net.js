class Net {
    constructor() {
        this.ui = null
        this.game = null
        document.getElementById("login").addEventListener("click", this.SignIn)
        document.getElementById("reset").addEventListener("click", this.Reset)
    }
    SignIn = () => {
        const body = JSON.stringify({ login: document.getElementById("name").value })
        const headers = { "Content-Type": "application/json" }
        fetch("/addUser", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {
                if (data.position == 1) {
                    document.getElementById("form").style.display = "none"
                    document.getElementById("wait").style.display = "flex"
                    this.it = setInterval(() => {
                        fetch("/waiting", { method: "post" })
                            .then(res => res.json())
                            .then(dt => {
                                console.log(dt.enemy)
                                if (dt.id == 2) {
                                    clearInterval(this.it)
                                    const ob = { name: data.name, position: data.position, enemy: dt.enemy }
                                    this.ui.ClearLoginPanel(ob)
                                    this.game.setUser(1)

                                    this.genGame(ob)
                                    this.getPionki()
                                }
                            })
                    }, 5000)
                }
                else {
                    this.ui.ClearLoginPanel(data)
                    this.game.setUser(2)

                    this.genGame(data)
                    this.getPionki()
                }

            })
    }
    Reset = () => {
        fetch("/reset", { method: "post" })
    }
    setUi(ui) {
        this.ui = ui
    }
    setGame(game) {
        this.game = game
    }
    genGame = (data) => {
        if (data.name !== "exist" && data.name !== "inGame") {
            this.game.makePionki()
            this.game.setPos(data.position)
        }
    }
    getPionki() {
        console.log("start")
        setInterval(() => {
            fetch("/compareTable", { method: "post" })
                .then(resp => resp.json()
                    .then(data => {
                        if (data.msg == "ok") {
                            console.log(data)
                            this.game.setPionki(data.pionki)
                            this.game.setMove(data.move)
                        }

                    }))
        }, 1000)
    }
    Move(tab) {
        console.log("move")
        const body = JSON.stringify({ tab: tab })
        const headers = { "Content-Type": "application/json" }
        fetch("/updateTable", { method: "post", body, headers })
            .then(response => response.json())
            .then(data => {
                console.log(data.info)
            })
    }
}
export default Net