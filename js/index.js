;(function() {
    
        
    //获取元素
    var usernameInp = document.getElementById("username");
    var passwordInp = document.getElementById("password");
    var remenberInp = document.getElementById("remenber");
    var loginBtn = document.getElementById("loginBtn")
    var username_lock = false;
    // var password_lock = false;
    var yanzhengkuang = document.getElementById('yanzhengkuang')
        //获取localStorage中的所有用户
        var users = localStorage.getItem("users");
        //判断是否有用户记住密码过
        if (users) {
                users = JSON.parse(users);
            } else {
                users = {};
            }
            if (localStorage.getItem("remenber") == "true") {
                var curUser = localStorage.getItem("curUser");
                remenberInp.checked = true;
                //给用户名和密码元素设置记住的密码和用户名
                usernameInp.value = curUser;
                passwordInp.value = users[curUser];
            }
    //绑定登录按钮事件
    loginBtn.onclick = function(e) {
            e.preventDefault();
            yanzhengkuang.style.display = "block";

        }
        //图片验证函数
    function yanzheng(data) {
        if (data) {

            var usernameVal = usernameInp.value;
            var passwordVal = passwordInp.value;
            yanzhengkuang.style.display = "none";
            users[usernameVal] = passwordVal;
            url = xhr.baseUrl+"php/store.php?username=" + usernameVal + "&password=" + passwordVal;
            console.log(url)
            xhr.get(url, function(data) {
                // console.log(data);
                //登录成功
                if (!data.error) {
                    if (!remenberInp.checked) {
                        localStorage.removeItem("remenber");
                        localStorage.removeItem("curUser");
                        delete users[usernameVal];
                    } else {
                        //记录当前用户
                        localStorage.setItem("curUser", usernameVal)
                    }
                    //更新用户
                    localStorage.setItem("users", JSON.stringify(users));
                    //记录记住密码按钮的选择状态
                    localStorage.setItem("remenber", remenberInp.checked);
                    alert("登录成功");
                    //设置cookie,7天后过期
                    let cookieObj = {
                        login: true,
                        username: usernameVal,
                    }
                    $.cookie.json = true;
                    $.cookie("loginInfo",cookieObj,{expires: 7});
                    //1秒后跳转
                    setTimeout(() => {
                        location.href = "./html/list.html"
                    }, 1000);
                } else {
                    document.getElementById("tishi").style.display = "inline-block";
                }
            })
        }
    }

    //绑定usernameInp失焦事件
    usernameInp.onblur = function() {
            var reg = /^[^\d]\w{6,12}/;
            if (reg.test(usernameInp.value)) {
                username_lock = true;
            } else {
                username_lock = false;
            }
            //如果localstorage中有则直接嵌入密码
            for (var key in users) {
                if (usernameInp.value === key) {
                    passwordInp.value = users[key];
                }
            }

        }
        //绑定passwordInp失焦事件
    passwordInp.onblur = function() {
            var reg = /^[^\d]\w{6,12}/;
            if (reg.test(passwordInp.value)) {
                password_lock = true;
            } else {
                password_lock = false;
            }
        }
        //初始化
    new picVerification(yanzhengkuang, yanzheng);
})()