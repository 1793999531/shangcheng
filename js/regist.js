// 获取元素
var username = document.getElementById("username");
var password = document.getElementById("password");
var password1 = document.getElementById("password1");

var usernameTips = document.getElementById("usernameTips");
var passwordTips = document.getElementById("passwordTips");
var password1Tips = document.getElementById("password1Tips");

var submitBtn = document.getElementById("submitBtn");

// 定义两个锁
var username_lock = false;
var password_lock = false;

// 验证用户名 
username.onblur = function () {
    // 获取用户输入的名字
    var text = username.value;
    // 正则验证
    var reg = /^[^\d]\w{6,13}$/;
    // 验证
    var result = reg.test(text);
    usernameTips.innerHTML = result ? "" : "×";
    usernameTips.style.color = result ? "" : "red";
    // 判定是否正确 如果正确继续下一道验证 如果错误 停止执行
    if (!result) {
        username_lock = false;
        return;
    }

    // 发送ajax请求 检测这个用户名是否可以使用
    QF.get(xhr.baseUrl+'php/checkusername.php', { username: text }, function (data) {
        console.log(data)
        // 根据结果提示用户
        if (!data.error) {
            username_lock = true;
            usernameTips.innerHTML = "√";
            usernameTips.style.color = "green";
        } else {

            username_lock = false;
            usernameTips.innerHTML = "×";
            usernameTips.style.color = "red";
        }
    })

}


password.onfocus = function () {
    password1.value = "";
    password1Tips.innerHTML = "";
}
// 验证密码
password.onblur = function () {

    // 获取用户输入的密码
    var val = password.value;
    // 定义正则表达式 
    var reg = /^\w{8,16}$/;
    // 使用正则验证输入的值 如果符合提示用户输入正确 如果不符合提示用户输入错误
    passwordTips.innerHTML = reg.test(val) ? "√" : "×";
    passwordTips.style.color = reg.test(val) ? "green" : "red";

}

password1.onblur = function () {
    // 获取密码的第一次输入
    var val = password.value;
    // 获取密码的第二次输入
    var val1 = password1.value;

    // 定义正则表达式 
    var reg = /^\w{8,16}$/;

    if (!reg.test(val1)) {
        password_lock = false;
        password1Tips.innerHTML = "×";
        password1Tips.style.color = "red";
        return;
    }

    password1Tips.innerHTML = val === val1 ? "√" : "×";
    password1Tips.style.color = val === val1 ? "green" : "red";
    password_lock = val === val1;
}


submitBtn.onclick = function () {
    if (!(username_lock && password_lock)) {
        alert("请重新检查")
        return;
    }
    // 获取用户名 
    var user = username.value;
    // 获取密码
    var pass = password.value;
    // 发送ajax到注册接口
    // console.log(user)
    // console.log(pass)

    // 弹出一个面板 这个面板中就一个loading图
    QF.post(xhr.baseUrl+"php/regist.php", { username: user, password: pass }, function (data) {
        console.log(data)
        if (!data.error) {
            
            setTimeout(function () {
                location.href = "../index.html"
            }, 500)
        } else {
            alert(data.msg);
        }
    })
}


