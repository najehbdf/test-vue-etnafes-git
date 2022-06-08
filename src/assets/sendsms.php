<?php
/* header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: X-Requested-With,Origin,Content-Type,Cookie,Accept'); */
 $body=file_get_contents('php://input');
$form=json_decode($body) 
// echo "Hello";
?>