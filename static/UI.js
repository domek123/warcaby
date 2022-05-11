class Ui {
    constructor() {
    }
    ClearLoginPanel = (data) => {
        if (data.name === "exist") {
            document.getElementById("info").innerHTML = "dany użytkownik istnieje"
        } else if (data.name === "inGame") {
            document.getElementById("info").innerHTML = "Gra w toku"
        } else {
            document.getElementById("background").style.display = "none"
            document.getElementById("container").style.display = "none"
            document.getElementById("info").innerHTML = `<div style="color:lightgreen;">USER_ADDED
                </br>
                Witaj
                <span style="color:white;">${data.name}</span>,
                grasz ${data.position == 1 ? "białymi" : "czarnymi"}. Przeciwnik: <span style="color:white;">${data.enemy}</span></div>`
        }
    }

}


export default Ui