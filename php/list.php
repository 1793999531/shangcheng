<?php 
    header("Access-Control-Allow-Origin: *"); 
    header("content-type: text/html;charset=utf-8");

    //连接数据库
    mysql_connect("localhost","root","admin");
    mysql_select_db("phpdb");
    $queryString = "select * from goods"; //一次发送16条数据
    //获取查询结果
    $result = mysql_query($queryString);
    $arr = Array();
    while($row = mysql_fetch_array($result)){
        Array_push($arr,$row);
    }
    echo json_encode(Array("error" => 0, "data" => $arr));

?>