<!DOCTYPE html>
<html>
<body>

<h1>DELETE</h1>
<p>CRUD base, delete recrod.</p>

<form action="/delete.php" method="GET">
  
  


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

if($_GET['id'] && !$_GET['conferma']){
  // FASE 1
  $id = $_GET['id'];
  $sql = "SELECT * FROM persona WHERE id='$id'";
  $result = $conn->query($sql);

  if ($result->num_rows == 1) {
    // output data of each row --- $row["id"]
    $row = $result->fetch_assoc();
    echo "Id: " . $row["id"] . "<br>";
    echo "<input type='hidden' name='id' value='" . $row["id"] . "'>";
    echo "Nome:" . $row["nome"] .  "<br>";
    echo "Altezza:" . $row["altezza"]. "<br>";
    echo "Sei sicuro di eliminare questo record?<br>";
    echo "<input type='hidden' name='conferma' value='SI'>";
    echo "<input type='submit' value='SI'>";
  }
 
}elseif($_GET['id'] && $_GET['conferma']) {
  // FASE 2
  $id = $_GET['id'];
  $sql = "DELETE FROM persona  
    WHERE id='$id' ";
  if ($conn->query($sql) === TRUE) {
    echo "Record eliminato";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
}
$conn->close();
?> 

</form>  


</body>
</html> 


