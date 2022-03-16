<?php

$conn = new mysqli("localhost","root","password");
if ($conn->connect_error) {
	die("Conn failed:". $conn->connect_error);
	}
	else
	echo "Connection OK";


?>
