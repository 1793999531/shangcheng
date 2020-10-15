var xhr = {
    get: function(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // console.log(xhr.responseText);

                var data = JSON.parse(xhr.responseText);
                // console.log(data)
                if (callback) {
                    callback(data);
                }
            }
        }
        xhr.open("get", url, true);
        xhr.send();
    },
    post: function(method, url, dataObj, callback) {
        // php post只能接收 key = value形式的数据，不能接收json格式的数据
        var str = "";
        for (let key in dataObj) {
            str += key + "=" + dataObj[key] + "&";
        }
        var dataStr = str.slice(0, -1);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // console.log(xhr.responseText);

                var data = JSON.parse(xhr.responseText);
                if (callback) {
                    callback(data);
                }
            }
        }
        xhr.open(method, url, true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(dataStr);
    }


}