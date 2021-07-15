<?php

require_once 'connect.php';
$errors = array();
$total_stock = 0;
$total_price = 0.0;

//======================================== ADD ==================================================

if(!empty($_POST["action"]) && $_POST["action"] == "addStock"){

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
    if (empty($_POST['price'])) 
    {
        $errors[] = "Price required.";
    }
    else
    {
        $price = htmlspecialchars(stripcslashes(trim($_POST['price'])));
    }

    if(!$errors){

        $sql = $conn->prepare("INSERT INTO stock(stockProductCode, stockQuantity, stockPrice) VALUES (?, ?, ?)");
        $sql->bind_param("sid", $code, $items, $price);
        if($sql->execute())
        {
            echo "ok";
        }
        else
        {
            echo "failed";
        }
        $sql->close();
        $conn->close(); 

    }
}

//======================================== Remove ==================================================

if(!empty($_POST["action"]) && $_POST["action"] == "removeStock"){

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

        $sql = $conn->prepare("SELECT customerProductCode FROM customers WHERE customerEmail=? AND customerProductCode=?");
        $sql->bind_param("ss", $email, $code);
        $sql->execute();
        $sql->bind_result($user);
        $sql->fetch();
        $sql->close();

        if($user != ""){

            echo "userFound";

        }else{

            $sql = $conn->prepare("SELECT SUM(stockQuantity) FROM stock WHERE stockProductCode=?");
            $sql->bind_param("s", $code);
            $sql->execute();
            $sql->bind_result($total_stock);
            $sql->fetch();
            $sql->close();

            if($total_stock >= $items){

                $sql = $conn->prepare("SELECT SUM(stockPrice) FROM stock WHERE stockProductCode=?");
                $sql->bind_param("s", $code);
                $sql->execute();
                $sql->bind_result($total_price);
                $sql->fetch();
        
                $item_price = $total_price / $total_stock;
                $price = round(($items * $item_price) * (-1), 2);
                $new_item = $items * (-1);
                $sql->close();

                $sql = $conn->prepare("INSERT INTO stock(stockProductCode, stockQuantity, stockPrice) VALUES (?, ?, ?)");
                $sql->bind_param("sid", $code, $new_item, $price);

                if($sql->execute()){

               
                //$conn->close();

                $sql = $conn->prepare("INSERT INTO customers(customerEmail, customerProductCode) VALUES (?, ?)");
                $sql->bind_param("ss", $email, $code);
                if($sql->execute()){

                    echo "added";
                }
                else
                {
                    //echo "failed";
                }
                $sql->close();
                $conn->close(); 

                }
                

            }else{

                echo "outOfStock"; 

            }
        }
    }
}

//======================================== STOCK LEVELS ==================================================

if(!empty($_POST["action"]) && $_POST["action"] == "stockLevels"){

   $data = array();
   $code = array();
   $quantity = array();

   $sql = "SELECT DISTINCT stockProductCode, SUM(stockQuantity) as quantity, SUM(stockPrice) as price FROM stock GROUP BY stockProductCode";

   $stmt = $conn->prepare($sql);

   if($stmt->execute()){

      $result = $stmt->get_result();

      if($row = $result->num_rows > 0){
     
        while ( $row = $result->fetch_assoc()) {
          
          echo "<ul style='list-style-type:none' >";
          echo "<li><b><span id='productCode'>".$row['stockProductCode']."</b></span><span id='productItems'><small>"
          .$row['quantity']."</small></span></li><span id='productPrice'><small>".$row['price']."</small></span>";
          echo "</ul>";
        
        }
        
       }else{

    echo "No records were found";
  }
     
  }else{

    echo "No records were found";
  }
  
$stmt->close();
$conn->close();

}

?>