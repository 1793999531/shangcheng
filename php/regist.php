<?php
    header("content-type: text/html;charset=utf-8");
    // 1 接收前端传递过来的数据 
    $username = $_POST["username"];
    $password = $_POST["password"];


    // 2 连接数据库
    mysql_connect("localhost", "root", "root");

    // 3 选择数据库
    mysql_select_db("phpdb");

    // 4 定义sql语句
    $sql = "INSERT INTO user VALUES('$username', '$password')";


    // 5 执行sql语句
    $result = mysql_query($sql);

    // 6 获取执行结果 
    if ($result) {
        echo json_encode(array("error" => 0, "msg" => "注册成功"));
    } else {
        echo json_encode(array("error" => 1, "msg" => "注册失败"));
    }
 
?>