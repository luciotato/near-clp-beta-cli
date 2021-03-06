import * as child_process from "child_process";
let debug = 1;
export function setDebug(value) { debug = value; }
export function spawnNearCli(args) {
    //-----------------------------
    // near-cli uses NODE_ENV to define --networkId 
    //-----------------------------
    // get process.env, clone the actual env vars 
    var env = Object.create(process.env);
    const pos = args.indexOf("--networkId");
    if (pos >= 0) {
        const network = args[pos + 1];
        env.NODE_ENV = network;
        console.log(`NODE_ENV=${network}`);
    }
    //-----------------------------
    for (var i = 0; i < args.length; i++) {
        if (typeof args[i] != "string") { //JSON
            args[i] = JSON.stringify(args[i]);
            args[i] = args[i].replace(/"/g, '\\"'); //add escape before each quote
        }
    }
    if (debug) console.log(`near ${args.join(" ")}`);
    var execResult = child_process.spawnSync("near", args, { shell: true, env: env }); // shell:true => to be able to invoke near-cli on windows
    //console.log(execResult.stdout.toString())
    //console.log(execResult.stderr.toString())
    if (execResult.error) {
        console.log(execResult.error);
        process.exit(1);
    }
    let stdo = "";
    if (execResult.stdout) {
        //console.log("stdout:")
        //console.log("-*-")
        //fixes for  near-cli output
        stdo = execResult.stdout.toString()
        stdo = stdo.replace(/&#x2F;/g, "/")
        stdo = stdo.replace(/&#39;/g, "'")
        process.stdout.write(stdo);
        //console.log("-*-")
        //show large numbers converted to near
        //get all numbers where number.lenght>=20
        let numbersFound = stdo.match(/\d+/g);
        if (numbersFound) {
            let largeNumbers = numbersFound.filter((value) => value.length >= 12);
            if (largeNumbers.length) {
                //deduplicate
                let numbers = [...new Set(largeNumbers)];
                //show conversion to NEARs
                console.log("amounts denomination:");
                for (let num of numbers) {
                    if (num.length >= 20) {
                        let near = num;
                        if (near.length < 25) near = near.padStart(25, '0');
                        near = near.slice(0, near.length - 24) + "." + near.slice(near.length - 24);
                        //show reference line
                        console.log(num.padStart(36, ' ') + " Yoctos => " + near.padStart(38, ' '));
                    }
                }
            }
        }
    }
    if (execResult.stderr) {
        //console.log("stderr:")
        //console.log("-*-")
        process.stdout.write(execResult.stderr);
        //console.log("-*-")
    }
    if (execResult.status != 0) {
        process.exit(execResult.status);
    }
    return stdo;
}
//# sourceMappingURL=SpawnNearCli.js.map

export function lastNumber(stdo) {
    let items = stdo.split("\n")
    if (items.length < 2) return "";
    return items[items.length - 2].replace(/'/g, "")
}

export function thsep(stdonum) {
    if (stdonum && stdonum.length > 3) {
        for (let n = stdonum.length - 3; n >= 1; n -= 3) {
            stdonum = stdonum.slice(0, n) + "_" + stdonum.slice(n )
        }
    }
    return stdonum;
}