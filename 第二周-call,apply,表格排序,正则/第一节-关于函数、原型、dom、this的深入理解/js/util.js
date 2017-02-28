/**
 * Created by qianguoqing on 17/2/1.
 */
var utils = {
    // -> 实现将类数组转化为数组
    listToArray: function (likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    },

    // -> jsonParse: 把JSON格式的字符串转换为JSON格式的对象
    jsonParse: function (str) {
        var val = null;
        try {
            val = JSON.parse(str);
        } catch (e) {
            val = eval('(' + str + ')');
        }
        return val;
    }
};
