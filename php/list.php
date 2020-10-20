<?php 
    header("Access-Control-Allow-Origin: *"); 
    header("content-type: text/html;charset=utf-8");

    //连接数据库
    mysql_connect("localhost","root","root");
    mysql_select_db("phpdb");
        
    @$num = $_GET["num"]; //@：如果获取不到Num不返回提示或错误信息
    @$page = $_GET["page"];
    $detaiID = $_GET["detailID"]; //获取详情页请求ID
    if($num && $page!=""){
        // $queryString = "select * from goods limit ".$page*$num.",".($page*$num+$num); //发送n~m之间的数据
        $queryString = "select * from goods limit ".$page*$num.",".$num; //去第$page*$num行开始拿$num个数据
        // echo $queryString;
        $lenString = "select count(*) from goods"; //表内的记录总数
    //     //获取查询结果
        $result = mysql_query($queryString);
        $arr = Array();
        while($row = mysql_fetch_array($result)){
            Array_push($arr,$row);
        }

        mysql_free_result($result); //清除结果集$result
        $lenResult = mysql_query($lenString);
        // 

        $len;
        
        while ($row = mysql_fetch_row($lenResult)) {
            $len = $row[0];
        }
        echo json_encode(Array("error" => 0, "data" => $arr, "length" => $len));

    }else if($detaiID!=""){
        $queryString = "select * from goods where goods_id = $detaiID";
        $result = mysql_query($queryString);
        while($row = mysql_fetch_row($result)){
            echo json_encode(array("error" => 0, "data" => $row));
        }
        
    }else{
        echo json_encode(Array("error" => 1, "data" => "错误"));
    }
    

?>