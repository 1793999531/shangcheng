<?php
    // 1 接收前端发送的数据
    $username = $_GET["username"];
    // 2 连接数据库
    mysql_connect("localhost", "root", "admin");
    // 3 选择数据库
    mysql_select_db("phpdb");
    // 4 定义sql语句
    $sql = "SELECT * FROM user WHERE username='$username'";
    // 5执行
    $result = mysql_query($sql);
    // 因为根据主键查询 所以要有就有一条 要么就没有
    $row = mysql_fetch_array($result);
    if ($row) {
        echo json_encode(array('error' => 1, "msg" => "用户已存在"));
    } else {
        echo json_encode(array('error' => 0, "msg" => "恭喜可以使用"));
    }
?>