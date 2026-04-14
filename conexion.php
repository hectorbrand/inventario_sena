<?php
$conexion = mysqli_connect("localhost", "root", "", "inventario", 3306);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>