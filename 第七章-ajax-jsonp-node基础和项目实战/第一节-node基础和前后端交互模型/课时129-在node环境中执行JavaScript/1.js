/**
 * Created by qianguoqing on 17/3/19.
 */

function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        var cur = Number(arguments[i]);
        if (!isNaN(cur)) {
            total += cur;
        }
    }
    return total;
}

var total = sum(1, 2, 3, 4);
console.log(total);c
