let inputs = process.argv.slice(2);

if (inputs.length === 0) {
    console.log('');
    return;
}

let result = inputs.map(str => str.substr(0, 1)).reduce((prev, next) => prev + next);
console.log(`[${inputs}] becomes "${result}"`);