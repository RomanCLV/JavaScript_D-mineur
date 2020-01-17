function askName() {
    var name = window.prompt("Quel est ton nom : ");
    
    if (name !== "") {
        var btn = document.getElementById("btnBonjour");
        btn.style.visibility = "visible";
        btn.addEventListener('click', () => sayHello(name));
    }
    else {
        window.alert("Le nom '" + name + "' est invalide !");
    }
}

function sayHello(name) {
    window.alert("Bonjour " + name + " !");
} 