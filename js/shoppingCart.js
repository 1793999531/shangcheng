;
(function() {
    var tbody = document.getElementById("tbody");
    var cart_info = JSON.parse(localStorage.getItem("cart_info")) || {};
    var allCheck = document.getElementById("allCheck");
    let priceLock = false; //总价是否变动过
    var total = 0;

    //计算总价
    function totalCount(){
            total=0;
            priceLock = false;
            for(var key in cart_info){
                total += parseInt(cart_info[key].goods_price)*parseInt(cart_info[key].cart_number);
            }
    }
    
    //+-委托给tbody点击事件
    tbody.onclick = function(e) {
        var product_id = e.target.getAttribute("data-id");
        var className = e.target.className;
        
        console.log(className, product_id);
        if (product_id && className === "plus") { //点击+
            priceLock = true;
            cart_info[product_id].cart_number++;
        } else if (product_id && className === "reduce" && cart_info[product_id].cart_number > 1) { //点击-
            priceLock = true;
            cart_info[product_id].cart_number--;
            
        } else if (className === "checkbox") { //选中单个商品
            if (!cart_info[product_id].check) {
                cart_info[product_id].check = "checked";
            } else {
                cart_info[product_id].check = "";
            }
            ac(true);
        }else if (className === "del"){ //点击x
            priceLock = true;
            delete cart_info[product_id];
        }
        
        changce();
    }
    //页面数据有变动
    function changce(){
        //把数据放进localStorage
        localStorage.setItem("cart_info",JSON.stringify(cart_info));
        //计算总价
        if(priceLock) totalCount();

        render();
    }
        //绑定全选按钮
    allCheck.onclick = function() {
            ac();
        }
        //渲染数据
    function render() {
        var str = "";
        for (var i in cart_info) {
            console.log(cart_info[i].check)
            str += `
            <tr class="text-center">
                <td><input type="checkbox" class="checkbox" data-id="${cart_info[i].goods_id}" ${cart_info[i].check}></td>
                <td>${cart_info[i].cat_three_id}</td>
                <td>${cart_info[i].goods_name}</td>
                <td>${cart_info[i].goods_price}</td>
                <td>${cart_info[i].cart_number}</td>
                <td>
                    <input type="button" value="+" data-id="${cart_info[i].goods_id}" class="plus">
                    <input type="button" value="-" data-id="${cart_info[i].goods_id}" class="reduce">
                    <input type="button" value="&times" data-id="${cart_info[i].goods_id}" class="del">
                </td>
            </tr>
            `
        }
        tbody.innerHTML = str;
        //渲染总价
        $('#total').text("总价："+ total + "￥"); 
    }
    
    //全选
    function ac(danxuan) {
        if (!danxuan) {
            var allCheck = false;
            var ac = "";
            for (var i in cart_info) {
                if (!cart_info[i].check) {
                    allCheck = true;
                }
            }
            ac = allCheck ? "checked" : "";
            console.log(ac)
            for (var i in cart_info) {
                cart_info[i].check = ac;
            }
        }

        render();

    }

    //删除选中的商品
    $('#selectDel').click(function(){
        for(var key in cart_info){
            if(cart_info[key].check){
                delete cart_info[key]
            }
        }
        priceLock = true;
        changce();
    });

    //初始化
    totalCount();
    render();

})()