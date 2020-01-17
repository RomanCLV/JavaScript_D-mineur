timeStart = 0;
displayTimer = undefined;
timeIgnored = 0;
isStop = false;
timeStopStart = 0;
lastTimeLapsed = undefined;

function start() {
    document.getElementById("btnStart").disabled = true;
    document.getElementById("btnStop").disabled = false;
    document.getElementById("btnReset").disabled = false;
    document.getElementById("btnLaps").disabled = false;
    if(!isStop){
        timeStart = Date.now();
    }
    else {
        timeIgnored += Date.now() - timeStopStart;
    }
    displayTimer = setInterval(refresh, 20);
}

function refresh(){
    document.getElementById("chronometre").textContent = formatTime(Date.now() - timeStart - timeIgnored);
}

function formatTime(time) {
    var h = Math.floor(time / 3600000) % 24;
    var m = Math.floor(time / 60000) % 60;
    var s = Math.floor(time / 1000) % 60;
    var ms = time % 1000;

    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;
    if (ms < 10)
        ms = "00" + ms;
    else if (ms < 100)
        ms = "0" + ms;
    var chaine = m + ":" + s + "." + ms;
    if (h > 0) {
        if (h < 10)
            h = "0" + h;
        chaine = h + ":" + chaine;
    }
    return chaine;
}

function diff(time1, time2) {
    var tab1 = getTime(time1);
    var tab2 = getTime(time2);
    time1 = parseInt(3600000 * tab1[0]) + parseInt(60000 * tab1[1]) + parseInt(1000 * tab1[2]) + parseInt(tab1[3]);
    time2 = parseInt(3600000 * tab2[0]) + parseInt(60000 * tab2[1]) + parseInt(1000 * tab2[2]) + parseInt(tab2[3]);
    return formatTime(time1 - time2);
}

function getTime(time){
    var tab = time.split(':');
    tab[tab.length - 1] = tab[tab.length - 1].split('.')[0];
    tab.push(time.split('.')[1]);
    if (tab.length < 4)
        tab.unshift("00");
    return tab;
}

function stop() {
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnStop").disabled = true;

    if (displayTimer !== undefined) {
        clearInterval(displayTimer);
    }
    isStop = true;
    timeStopStart = Date.now();
}

function reset() {
    if (displayTimer !== undefined) {
        clearInterval(displayTimer);
    }

    timeStart = 0;
    displayTimer = undefined;
    timeIgnored = 0;
    isStop = false;
    timeStopStart = 0;
    lastTimeLapsed = undefined;
    document.getElementById("btnStart").disabled = false;
    document.getElementById("btnStop").disabled = true;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("btnLaps").disabled = true;
    document.getElementById("chronometre").textContent = "00:00.000";

    while (document.getElementById('lapsTimes').firstChild) {
        document.getElementById('lapsTimes').firstChild.remove();
      }
}

function laps() {
    var timeLaps = formatTime(Date.now() - timeStart - timeIgnored);
    console.log(timeLaps);
    var li = document.createElement('li');

    var interval = undefined;
    if (lastTimeLapsed === undefined)
        interval = timeLaps;
    else {
        interval = diff(timeLaps, lastTimeLapsed);
    }
    li.textContent = timeLaps + " (" + interval + ")";


    document.getElementById('lapsTimes').appendChild(li);
    lastTimeLapsed = timeLaps;
}

function main() {
    reset();
}

main();