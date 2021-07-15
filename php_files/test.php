<?php

require_once 'connect.php';
$errors =  array();
$total_stock = 0;
$total_price = 0.0;

//======================================== Remove ==================================================


    if (empty($_POST['code'])) 
    {
        $errors[] = "Code required.";
    }
    else
    {
        $code = htmlspecialchars(stripcslashes(trim($_POST['code'])));
    }
    if (empty($_POST['items'])) 
    {
        $errors[] = "Items required.";
    }
    else
    {
        $items = htmlspecialchars(stripcslashes(trim($_POST['items'])));
    }
    if (empty($_POST['email'])) 
    {
        $errors[] = "email required.";
    }
    else
    {
        $email = htmlspecialchars(stripcslashes(trim($_POST['email'])));
    }

    if(!$errors){

        $sql = $conn->prepare("SELECT SUM(stockQuantity) FROM stock WHERE stockProductCode=?");
        $sql->bind_param("s", $code);
        $sql->execute();
        $sql->bind_result($total_stock);
        $sql->fetch();

        if($total_stock >= $items){

        

        }else{

            echo "out";

        }

       /* 
        $sql = $conn->prepare("SELECT SUM(stockPrice) FROM WHERE stockProductCode=?");
        $sql->bind_param("s", $code, $items, $email);
        $sql->execute();
        $sql->bind_result($total_price);
        $sql->fetch();

        if($total_price > $items){

        }else{

        }


        $sql = $conn->prepare("INSERT INTO stock(stockProductCode, stockQuantity, stockPrice) VALUES (?, ?, ?)");
        $sql->bind_param("sis", $code, $items, $email);
        if($sql->execute())
        {
            echo "ok";
        }
        else
        {
            echo "failed";
        }
        $sql->close();
        $conn->close(); */

    }


?>