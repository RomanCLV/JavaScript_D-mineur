class De {
    constructor() {
    }

    lancer(nbDeLance) {
        if (nbDeLance === undefined)
            nbDeLance = 1;
        var results = [];
        for (var i = 0; i < nbDeLance; i++){
            results[i] = 1 + Math.floor(Math.random() * 6);
        }
        if (results.length === 1)
            return results[0];
        return results;
    }

    allFaces(){
        var tours = 0;
        var values = [];
        while (values.length !== 6) {
            tours++;
            var value = this.lancer();
            if (!values.includes(value))
                values.push(value);
        }
        return tours;
    }

    averageAllFace(echantillonage){
        if (echantillonage === undefined){
            throw new Error("No value for param 'echantillonage' !")
        }
        var de = new De();
        var sum = 0;
        for (var i = 0; i < echantillonage; i++) {
            sum += de.allFaces();
        }
        return sum / echantillonage;
    }
}

main();

function main() {
    var de = new De();
    console.log("Lancer de Dé (1) : " + de.lancer() + "\n");
    console.log("Lancer de Dé (3) : " + de.lancer(3) + "\n");
    console.log("Toutes les faces en " + de.allFaces() + " tours\n");
    for(var i = 0; i < 3; i++)
        console.log("Moyenne de toutes les faces pour 10000 : " + de.averageAllFace(10000));
}
