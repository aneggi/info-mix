<!DOCTYPE html>
<html>
<body>

<h1>READ</h1>
<p>CRUD base, read recrods.</p>

<a href="create.php">Create record</a></br><br>

<table>
  <tr>
    <th>ID</th>
    <th>NOME</th>
    <th>ALTEZZA</th>
    <th> </th>
    <th> </th>
  </tr>
 

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
$sql = "SELECT * FROM persona";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row["id"]. "</td><td>" . $row["nome"]. "</td><td>" . $row["altezza"]. "</td>";
    echo "<td><a href='update.php?id="  . $row["id"]. "'>Edit</a></td>";
    echo "<td><a href='delete.php?id="  . $row["id"]. "'>Delete</a></td>";
    
    echo "</tr>";
  }
} else {
  echo "0 nessun valore trovato";
}



$conn->close();
?> 
</table>

</body>
</html> 


