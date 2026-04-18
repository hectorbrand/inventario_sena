<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Descripción: Conexión a la base de datos.
// =============================================================================

$host = "localhost";
$db = "inventario";
$user = "root";
$pass = ""; 

try {
    $conexion = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>