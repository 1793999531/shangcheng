;(function(){
    var detailID = location.href.split('?')[1].split('=')[1]; //获取url的detailID
    // console.log(detailID);
    //获取所有商品数据
    xhr.get(xhr.baseUrl+"php/list.php", (data) => {
            var productData = data.data;
            console.log(productData[detailID])
            // 根据detailID去商品数据拿详情页的html代码，并添加到body
            document.body.innerHTML = productData[detailID][6];
        })
})()