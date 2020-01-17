wordToFind = "";
wordUser = "";
timeStart = 0;
displayTime = undefined;
started = false;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateWord(){
    var words = [
        "manger",
        "aimer",
        "bibliothèque",
        "patinoire",
        "coding",
        "factory",
        "programmation",
        "table",
        "langage",
        "animal",
        "amies",
        "arbres"
    ];

    wordToFind = words[randomInt(0, words.length)].toUpperCase();
    wordUser = wordToFind[0];
    for (var i = 1; i < wordToFind.length; i++) {
        wordUser += "_";
    }
}

function generateAlphabet(){
    $("#alphabet").empty();
    for (var i = 0; i < 26; i++){
        var btn = document.createElement('button');
        btn.textContent = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
        //btn.text(String.fromCharCode(65 + i));
        btn.addEventListener('click', touch);
        var td = document.createElement('td');
        td.appendChild(btn);
        document.getElementById('alphabet').appendChild(td);
    }
}

function indexOfAll(array, value) {
    var index = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            index.push(i);
        }
    }
    return index;
}

function touch() {
    var letter = this.textContent;
    this.disabled = true;
    var index = indexOfAll(wordToFind, letter);
    if (index.length > 0) {
        for (var i in index) {
            wordUser = setCharAt(wordUser, index[i], letter);
        }
        refresh();
    }
    else {
        var li =  document.createElement('li');
        li.textContent = "Erreur " + (document.getElementById("errorList").childElementCount + 1);
        document.getElementById("errorList").appendChild(li);
    }

    if(!wordUser.includes('_') || document.getElementById("errorList").childElementCount === 6) {
        endGame();
    }
}

function refresh() {
    document.getElementById('hiddenWord').textContent = wordUser.split('').join(' ');
}

function refreshTimer() {
    var time = new Date(Date.now() - timeStart);
    var h = time.getHours() - 1;
    var m = time.getMinutes();
    var s = time.getSeconds();
    document.getElementById('chronometre').textContent = (h + "").padStart(2, "0") + ":" + (m+ "").padStart(2, "0") + ":" + (s + "").padStart(2, "0");
}

function endGame() {
    if (!wordUser.includes('_')) {
        document.getElementById("resultWin").style.display = "block";
    }
    else {
        document.getElementById("resultLoose").style.display = "block";
    }
    wordUser = wordToFind;
    document.getElementById('btnStart').textContent = "Stop";
    var list = $('#alphabet').children();
    for (var i = 0; i < list.length; i++){
        var td = list[i];
        var btn = td.firstChild;
        btn.disabled = true;
    }
    $("#errorList").empty();
    refresh();
    clearInterval(displayTime);
    displayTime = undefined;
    document.getElementById('btnStart').textContent = "Nouvelle partie";
    started = false;
}

function setCharAt(str, index, char){
    var newStr = "";
    for (var c = 0; c < str.length; c++) {
        if (c === index) {
            newStr += char;
        }
        else {
            newStr += str[c];
        }
    }
    return newStr;
}

function createTitle() {
    var title = "Pendu";
    var a = 0;
    var b = 0;
    while ( a === b) {
        a = randomInt(0, title.length);
        b = randomInt(0, title.length);
    }
    title = setCharAt(title, a, '_');
    title = setCharAt(title, b, '_');
    document.getElementById('hiddenWord').textContent = title.split('').join(' ');
}

function start(){
    if(!started){
        started = true;
        generateWord();
        generateAlphabet();
        refresh();
        document.getElementById('btnStart').textContent = "Stop";
        document.getElementById('resultWin').style.display = 'none';
        document.getElementById('resultLoose').style.display = 'none';
        timeStart = Date.now();
        displayTime = setInterval(refreshTimer, 50);
    }
    else{
        endGame();
    }
}

function main() {
    document.getElementById('btnStart').addEventListener('click', start);
    createTitle();
}

main();
