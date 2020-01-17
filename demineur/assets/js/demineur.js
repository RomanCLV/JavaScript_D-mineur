class Game {
    constructor(difficulty) {
        this.size = 0;
        this.numberBombes = 0;
        this.numberFlag = 0;
        this.caseDiscovered = 0;
        
    switch (difficulty) {
        case "easy":
            this.size = 9;
            this.numberBombes = 10;
            break;
        case "medium":
            this.size = 16;
            this.numberBombes = 40;
            break;
        case "hard":
            this.size = 22;
            this.numberBombes = 100;
            break;
        case "hardcore":
            this.size = 30;
            this.numberBombes = 250;                
            break;
        default:
            break;
    }
        this.lines = [];
        for (var i = 0; i < this.size; i++) {
            this.lines.push(new Array(this.size));
        }
    }

    create(){
        var coordonates = [];
        for (var row = 0; row < this.size; row++) {
            for (var column = 0; column < this.size; column++) {
                coordonates.push(row + ":" + column);
                this.lines[row][column] = new Case(row, column, 0);
            }
        }
        for (var i = 0; i < this.numberBombes; i++) {
            var index = this.randomInt(coordonates.length);
            var coordonate = coordonates[index];
            coordonates.splice(index, 1);
            // coordonate => String : "x:y"
            this.lines[coordonate.split(':')[0]][coordonate.split(':')[1]].value = 9;
        }
        for (let row = 0; row < this.size; row++)
        {
            for (let column = 0; column < this.size; column++)
            {
                if(this.lines[row][column].value === 9)
                {
                    this.incremente(row, column);
                }
            }
        }
    }

    incremente(row, column)
    {
        for (let i = -1; i < 2; i++)
        {
            for (let j = -1; j < 2; j++)
            {
                if(column + j === -1 || row + i === -1 || column + j === this.size || row + i === this.size)
                {
                    continue;
                }
                if(this.lines[row + i][column + j].value !== 9)
                {
                    this.lines[row + i][column + j].value++;
                }
            }
        }
    }

    isFinished(){
        var caseDiscovered = 0;
        for (var i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                caseDiscovered = !this.lines[i][j].hidden ? caseDiscovered + 1 : caseDiscovered; 
            }
        }
        return caseDiscovered === (this.size * this.size) - this.numberBombes;
    }

    seeMybiutifulLog()
    {
        console.log("New Game :");
        for (let i = 0; i < this.lines.length; i++)
        {
            var t = [];
            for (let j = 0; j < this.lines.length; j++)
            {
                t.push(this.lines[i][j].value);
            }
            console.log(t);
        }
    }

    randomInt(max) 
    {
        return Math.floor(Math.random() * max);
    }

}

class Case {
    constructor(row, column, value) {
        this.row = row;
        this.column = column;
        this.value = value;
        this.hidden = true;
        this.flagged = false;
    }
}

var setTime = null;
var timeStart = null;
var started = null;
var game = null;

var winSound = undefined;
var loseSound = undefined;

function affichage(time) {
    var time = new Date(Date.now() - timeStart);
    var h = time.getHours() - 1;
    var m = time.getMinutes();
    var s = time.getSeconds();
    document.getElementById('timer').textContent = h > 0 ? (h + "").padStart(2, "0") : "" + (m + "").padStart(2, "0") + ":" + (s + "").padStart(2, "0");
}

function Chrono() {
    affichage(new Date(Date.now() - timeStart));
}

function generateTable() {
    for (var row = 0; row < game.size; row++) {
        var tr = document.createElement('tr');
        for (var column = 0; column < game.size; column++) { 
            var td = document.createElement('td');
            var btn = document.createElement('button');
            btn.setAttribute('class', 'case');
            btn.setAttribute('id', 'caseNormal');
            btn.setAttribute('name', row + ":" + column);
            btn.addEventListener('click', btnDiscorvering);
            btn.addEventListener('contextmenu', btnFlagging);
            td.append(btn);
            tr.append(td);
        }
        document.getElementById('grille').append(tr);
    }
}

function btnDiscorvering() {
    var row = parseInt(this.name.split(':')[0]);
    var column = parseInt(this.name.split(':')[1]);
    var caseValue = game.lines[row][column].value;
    if (game.lines[row][column].flagged) {
        return;
    }

    if (caseValue !== 9) {
        if(caseValue !== 0) {
            revealACase(row, column);
        }
        else {
            reveal(row, column);
        }
    }
    else {
        endGame();
    }
    document.getElementById("flag").textContent = "Drapeau" + (game.numberFlag > 1 ? "x : " : " : ") + game.numberFlag;

    if(game.isFinished()){
        endGame();
    }
}

function reveal(row, column) {
    var casesToReveal = [];
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j === 0){
                revealACase(row, column);
            }
            else {
                if (row + i >= 0 && row + i < game.size && column + j >= 0 && column + j < game.size) {
                    if (game.lines[row + i][column + j].hidden && game.lines[row + i][column + j].value !== 9) {
                        if (game.lines[row + i][column + j].value !== 0) {
                            revealACase(row + i, column + j);
                        }
                        else{
                            casesToReveal.push([row + i, column + j]);
                        }
                    }
                }
            }
        }
    }
    for (var i = 0; i < casesToReveal.length; i++){
        reveal(casesToReveal[i][0], casesToReveal[i][1]);
    }
}

function revealACase(row, column) {
    game.lines[row][column].hidden = false;
    if (game.lines[row][column].flagged){
        game.lines[row][column].flagged = false;
        game.numberFlag--;
    }
    var btn = document.getElementsByClassName('case')[row * game.size + column];
    btn.disabled = true;
    btn.setAttribute('id', 'case' + game.lines[row][column].value);
    game.caseDiscovered++;
}

function btnFlagging() {
    var row = this.name.split(':')[0];
    var column = this.name.split(':')[1];
    
    if (game.lines[row][column].flagged){
        game.lines[row][column].flagged = false;
        this.setAttribute('id', 'caseNormal');
        game.numberFlag--;
    }
    else {
        game.lines[row][column].flagged = true;
        this.setAttribute('id', 'caseFlag');
        game.numberFlag++;
    }
    document.getElementById("flag").textContent = "Drapeau" + (game.numberFlag > 1 ? "x : " : " : ") + game.numberFlag;
}

function start() {
    if (!started) {
        reset();
        started = true;
        document.getElementById('btnStart').value = "Stop";

        var difficulty = document.getElementById('selectorLevel').value;

        document.getElementById("selectLevel").style.display = "none";
        document.getElementById('stats').style.display = 'flex';
        while (document.getElementById('grille').childElementCount > 0) {
            document.getElementById('grille').firstChild.remove();
        }
        
        game = new Game(difficulty);
        game.create();
        generateTable();
        document.getElementById('flag').textContent = "Drapeau : 0";
        document.getElementById('bombe').textContent = "Bombes : " + game.numberBombes;
        document.getElementById('size').textContent = "Taille : " + game.size;
        timeStart = Date.now();
        setTime=setInterval(Chrono, 50);
        //game.seeMybiutifulLog();
    }
    else {
        endGame();
    }
}

function endGame() {
    started = false;
    if(game.isFinished()){
        document.getElementById("resultWin").style.display = "block";
        winSound.play();
    }
    else{
        document.getElementById("resultLose").style.display = "block";
        loseSound.play();
    }
    document.getElementById("selectLevel").style.display = "flex";
    document.getElementById('btnStart').value = "Start";
    clearInterval(setTime);
    var btns = document.getElementsByClassName('case');
    for (var row = 0; row < game.size; row++) {
        for (var column = 0; column < game.size; column++) {
            var btn = btns[row * game.size + column];
            btn.disabled = true;
            if (game.lines[row][column].value === 9) {
                btn.setAttribute('id', 'case9');
            }
        }
    }
}

function reset(){
    document.getElementById("selectLevel").style.display = "flex";
    document.getElementById('stats').style.display = 'none';
    setTime = undefined;
    timeStart = 0;
    game = undefined;
    started = false;
    document.getElementById('resultWin').style.display = 'none';
    document.getElementById('resultLose').style.display = 'none';
    loseSound.pause();
    winSound.pause();

}

function main(){
    document.getElementById('btnStart').addEventListener('click', start);
    winSound = document.createElement("audio");
    winSound.src = "assets/sound/winSound.mp3";
    loseSound = document.createElement("audio");
    loseSound.src = "assets/sound/loseSound.mp3";
    reset();
}

main();