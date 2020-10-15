function outLogin(){
    console.log('out')
    //删除cookie
    $.removeCookie('loginInfo', { path: '/shangcheng' }); 
    //清除用户购物车数据
    localStorage.removeItem('cart_info');
    setTimeout(()=>{
        location.href = "http://localhost/shangcheng/index.html";
    },500)
}
;(function(){
    //判断是否登录过或登录信息是否已过期
    $.cookie.json = true;
    let loginInfo = $.cookie('loginInfo');
    if(!loginInfo){
        alert("你还未登录");
        //重定向到登录页
        setTimeout(()=>{
            location.href = "http://localhost/shangcheng/index.html";
        },500)
    }
console.log('111',$('#userInfo'),loginInfo)
    //给当前网页设置右上角的用户信息
    if($('#userInfo')){
        let str = `欢迎你！<span >${loginInfo.username}</span>|<a href="javascript:outLogin()">退出登录</a>`
        $('#userInfo').html(str);
    } 

    
})()
