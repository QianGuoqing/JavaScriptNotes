{
    console.log('B', 0B11110111);
    console.log(0o767);
}

{
    console.log('15', Number.isFinite(15));
    console.log('NaN', Number.isFinite(NaN));
    console.log('1/0', Number.isFinite(1 / 0));
    console.log('NaN', Number.isNaN(NaN));
    console.log('0', Number.isNaN(0));
}

{
    console.log('25', Number.isInteger(25));
    console.log('25.0', Number.isInteger(25.0));
    console.log('25.1', Number.isInteger(25.1));
    console.log('25.1', Number.isInteger('25.1'));
    console.log('25', Number.isInteger('25'));
}

{
    console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    console.log(Number.isSafeInteger(10));
    console.log('a', Number.isSafeInteger('a'));
}

{
    console.log(Math.trunc(10.1));
    console.log(Math.trunc(10.9));
}

{
    console.log('-5', Math.sign(-5));
    console.log('0', Math.sign(0));
    console.log('5', Math.sign(5));
    console.log('foo', Math.sign('foo'));
}

{
    console.log(Math.cbrt(-1));
}