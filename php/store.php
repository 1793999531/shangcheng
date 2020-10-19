<?php 
    header("Access-Control-Allow-Origin: *"); 
    header("content-type: text/html;charset=utf-8");

    $username = $_GET["username"];
    $password = $_GET["password"];
    //连接数据库
    mysql_connect("localhost","root","root");
    mysql_select_db("phpdb");
    $queryString = "select * from user where username = '$username' and password = '$password'";
    //获取查询结果
    $result = mysql_query($queryString);
    $row = mysql_fetch_array($result);

    if($row){
        echo json_encode(array("error" => 0,"msg" => "登录成功","username" => $row["username"]));
    }else{
        echo json_encode(array("error" => 1,"msg" => "登录失败"));
    }
    mysql_close();
    
?>