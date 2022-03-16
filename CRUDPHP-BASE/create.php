<!DOCTYPE html>
<html>
<body>

<h1>CREATE</h1>
<p>CRUD base, create recrod.</p>

<form action="/create.php" method="GET">
  <label for="fnome">Nome:</label><br>
  <input type="text" id="fnome" name="fnome" value=""><br>
  <label for="faltezza">Altezza:</label><br>
  <input type="text" id="faltezza" name="faltezza" value=""><br><br>
  <input type="submit" value="INVIA">
</form>  


<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "crudbase";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if($_GET['fnome']) {
  $nome = $_GET['fnome'];
  $altezza = $_GET['faltezza'];

  $sql = "INSERT INTO persona (nome, altezza)
    VALUES ('$nome', '$altezza')";
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}



$conn->close();
?> 


</body>
</html> 


