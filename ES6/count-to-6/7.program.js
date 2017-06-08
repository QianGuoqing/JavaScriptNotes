module.exports = function average(...args) {
    let len = args.length;
    let sum = 0;
    args.forEach((item) => {
        sum += item;
    });
    return sum / len;
}