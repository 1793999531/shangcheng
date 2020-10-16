(function () {
    var product_wrap = document.getElementById("product_wrap");
    var productData; //所有商品数据
    var pagination = document.getElementById("pagination"); //分页ele
    var curPage = 1; //当前页
    var allPage; //所有页数
    var showProNum = 16;

    function getProduct(showProNum, curPage) {
        xhr.get(xhr.baseUrl + "php/list.php?num=" + showProNum + "&page=" + (curPage - 1), (data) => { //一次获取16条数据
            productData = data.data;

            allPage = Math.ceil(data.length / showProNum);
            if (!data.error) {
                // console.log(productData);
                renderPage();
                renderPagination();
            }

        })
    }
    getProduct(showProNum, curPage); //初始化
    //绑定分页按钮点击事件
    pagination.onclick = function (e) {
        e.preventDefault();
        //获取点击标签的类名
        let className = e.target.className || "";
        // console.log(className);
        if (className == "leftBtn") {
            if (curPage != 1) curPage--
        } else if (className == "rightBtn") {
            if (curPage != allPage) curPage++
        } else {
            let num = parseInt(e.target.innerHTML);
            curPage = num;
            // e.target.style.backgroundColor = "red !important";
        }
        getProduct(showProNum, curPage);
        // renderPage();
        // renderPagination();
    }
    //委托点击事件
    product_wrap.onclick = function (e) {

        //点击a标签（加进购物车按钮）
        if (e.target.tagName === "A") {
            var cart_info = JSON.parse(localStorage.getItem("cart_info")) || {};
            var product_id = e.target.getAttribute("data-id");
            productData.forEach((value) => {
                if (value.goods_id == product_id) {
                    // console.log(cart_info);
                    if (!cart_info[product_id]) {
                        cart_info[product_id] = value;
                    }
                    cart_info[product_id].cart_number = parseInt(cart_info[product_id].cart_number) + 1;
                    localStorage.setItem("cart_info", JSON.stringify(cart_info))
                }
            })
        } else {
            var arr = $(e).parents().prevObject[0].path; //获取点击元素的祖先元素数组
            //没有点击a标签，进入详情页
            $.each(arr, function (index, value) {
                if ($(value).attr("detail-id")) {
                    location.href = "./detail.html?detailID=" + $(value).attr("detail-id"); //把商品id加进详情页的url
                }
            })
        }

    }

    //渲染页面
    function renderPage() {

        let str = '';
        for (let i = 0; i < showProNum; i++) {
            str +=
                `
            <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <ul class="list-group">

                </ul>
            </div>
            `;
        }
        //添加list-group
        product_wrap.innerHTML = str;
        let uls = document.querySelectorAll(".list-group");
        str = "";
        if (curPage === allPage) {
            for (let i = 0; i < productData.length % showProNum; i++) {
                str =
                    `
                    <li class="list-group-item" detail-id="${productData[i].goods_id}">
                        <div>
                            <p class="text-center">${productData[i].cat_three_id}</p>
                            <p class="picture"><img src="${productData[i].goods_small_logo}" /></p>
                            <p class="intro">${productData[i].goods_name}</p>
                            <p class="text-center">${productData[i].goods_price}
                            <a class="btn btn-default" href="./shoppingCart.html" role="button">购物车</a></p>
                        </div>
                    </li>
                `
                uls[i].innerHTML = str; //给list-group添加item
            }
        } else {
            for (let i = 0; i < showProNum; i++) {
                str =
                    `
                    <li class="list-group-item" detail-id="${productData[i].goods_id}">
                        <div>
                            <p class="text-center">${productData[i].cat_three_id}</p>
                            <p class="picture"><img src="${productData[i].goods_small_logo}" /></p>
                            <p class="intro">${productData[i].goods_name}</p>
                            <p class="text-center">${productData[i].goods_price}
                            <a class="btn btn-default addToCart" role="button" data-id="${productData[i].goods_id}">加进购物车</a></p>
                        </div>
                    </li>
                `
                uls[i].innerHTML = str; //给list-group添加item
            }
        }

    }
    // 渲染分页按钮
    function renderPagination() {
        let str = '';
        if (allPage >= 10) {
            if (curPage > 6) {
                pagination.innerHTML = '';
                if (curPage + 4 > allPage) {
                    for (let i = allPage - 10; i < allPage; i++) {
                        str += `<li><a href="#" data-bg="${i+1}">${i + 1}</a></li>`
                    }
                } else {
                    for (let i = curPage - 6; i < curPage + 4; i++) {
                        str += `<li><a href="#" data-bg="${i+1}">${i + 1}</a></li>`
                    }
                }
            } else {
                for (let i = 1; i <= 10; i++) {
                    str += `<li><a href="#" data-bg="${i}">${i}</a></li>`
                }
            }

        } else {
            for (let i = 1; i <= allPage; i++) {
                str += `<li><a href="#">${i}</a></li>`
            }
        }

        let html =
            `
            <li>
                <a href="#" aria-label="Previous" class="leftBtn">
                    <span aria-hidden="true" class="leftBtn">&laquo;</span>
                </a>
            </li>
            ` + str +
            `
            <li>
                <a href="#" aria-label="Next" class="rightBtn">
                    <span aria-hidden="true" class="rightBtn">&raquo;</span>
                </a>
            </li>
            <li><a href="#">${45}</a></li>
            `
        pagination.innerHTML = html;
        let arr = pagination.getElementsByTagName("a");
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].getAttribute("data-bg") == curPage) {
                arr[i].style.backgroundColor = "#ddd";
            }
        }
    }
})()