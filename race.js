class De {
    constructor() {
    }

    lancer(nbDeLance) {
        if (nbDeLance === undefined)
            nbDeLance = 1;
        var results = [];
        for (var i = 0; i < nbDeLance; i++) {
            results[i] = 1 + Math.floor(Math.random() * 6);
        }
        if (results.length === 1)
            return results[0];
        return results;
    }
}

class Race {
    constructor() {
        this.tortue = "tortue";
        this.lievre = "lievre";
    }
    
    racing() {
        var scores = [0, 0]; // [0] : tortue ; [1] : lievre
        var de = new De();
        while (!scores.includes(6)) {
            if (de.lancer() === 6)
                scores[1] = 6;
            else
                scores[0]++;
        }
        return scores[0] === 6 ? this.tortue : this.lievre;
    }

    races(nbDeRace) {
        if (nbDeRace === undefined)
            nbDeRace = 1;
        var scores = [0, 0];  // [0] : tortue ; [1] : lievre
        var race = new Race();
        for (var i = 0; i < nbDeRace; i++) {
            if (race.racing() === "tortue")
                scores[0]++;
            else
                scores[1]++;
        }
        return [scores[0] * 100 / nbDeRace, scores[1] * 100 / nbDeRace];
    }
}

main();

function main() {
    var race = new Race();
    console.log("Number of race : 3");
    for (var i = 0; i < 3; i++)
        console.log("Winner of the race " + i + " : " + race.racing());

    var results = race.races(10000);
    console.log("\nNumber of race : 10000");
    console.log("Win du tortue : " + results[0] + "%");
    console.log("Win du lievre : " + results[1] + "%");
}