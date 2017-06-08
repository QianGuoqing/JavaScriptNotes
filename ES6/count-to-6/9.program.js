const fs = require('fs');
module.exports = function makeImportant(str, len = str.length) {
    if (typeof len === undefined) {
        return str + '!'.repeat(str.length);
    }
    return str + '!'.repeat(len);
}