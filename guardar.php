<?php
include("conexion.php");

$nombre = $_POST['nombre'];
$cantidad = $_POST['cantidad'];
$precio = $_POST['precio'];

$sql = "INSERT INTO productos (nombre, cantidad, precio) 
        VALUES ('$nombre', '$cantidad', '$precio')";

mysqli_query($conexion, $sql);

header("Location: listar.php");
?>