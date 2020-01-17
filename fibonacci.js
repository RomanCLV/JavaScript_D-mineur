class Fibonacci {
    constructor(terme) {
        this.results = [];
        if(!Number.isInteger(terme)) {
            throw new Error("Value is not a positiv integer!");
        }
        if (terme < 0) {
            throw new Error("Value is not a positiv integer!");
        }
        this.generate(terme);
    }

    display() {
        if(this.results.length === 0) {
            console.log("Fibo is empty !");
            return;
        }
        for(var i in this.results) {
            console.log(i + " : " + this.results[i]);
        }
    }

    generate(terme) {
        if(terme === 0 || terme === 1)
            this.results[0] = terme;
        else {
            this.results = [0, 1];
            for(var i = 2; i <= terme; i++) {
                this.results[i] = this.results[i - 1] + this.results[i - 2];
            }
        }
    }
}

main();

function main() {
    var fibo = new Fibonacci(50);
    fibo.display();
}
