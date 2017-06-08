let inputs = process.argv.slice(2);
let minNumber = Math.min(...inputs);

console.log(`The minimum of [${inputs}] is ${minNumber}`);