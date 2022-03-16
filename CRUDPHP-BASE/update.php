<!DOCTYPE html>
<html>
<body>

<h1>UPDATE</h1>
<p>CRUD base, update recrod.</p>

<form action="/update.php" method="GET">
  
  


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

if($_GET['id'] && !$_GET['fnome']){
  // FASE 1
  $id = $_GET['id'];
  $sql = "SELECT * FROM persona WHERE id='$id'";
  $result = $conn->query($sql);

  if ($result->num_rows == 1) {
    // output data of each row --- $row["id"]
    $row = $result->fetch_assoc();
    echo "<input type='hidden' name='id' value='" . $row["id"] . "'>";
    echo "<label for='fnome'>Nome:</label><br>";
    echo "<input type='text' id='fnome' name='fnome' value='" . $row["nome"] .  "'><br>";
    echo "<label for='faltezza'>Altezza:</label><br>";
    echo "<input type='text' id='faltezza' name='faltezza' value='" . $row["altezza"]. "'><br><br>";
    echo "<input type='submit' value='AGGIORNA'>";
  }
 
}elseif($_GET['id'] && $_GET['fnome']) {
  // FASE 2
  $id = $_GET['id'];
  $nome = $_GET['fnome'];
  $altezza = $_GET['faltezza'];

  $sql = "UPDATE persona SET nome='$nome', altezza='$altezza' 
    WHERE id='$id' ";
  if ($conn->query($sql) === TRUE) {
    echo "Record aggiornato";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
}
$conn->close();
?> 

</form>  


</body>
</html> 


