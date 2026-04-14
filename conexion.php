<?php
// Archivo de configuración para la conexión a la base de datos
// Proyecto: Control Job

$host = "localhost";
$db = "inventario";
$user = "root";
$pass = ""; // En XAMPP por defecto es vacío

try {
    // Establecer la conexión usando la extensión PDO para mayor seguridad
    $conexion = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    // Configurar el modo de error para detectar fallos en las consultas
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Conexión exitosa"; // Descomentar solo para pruebas
} catch (PDOException $e) {
    // Si la conexión falla, mostrar el mensaje de error
    echo "Error de conexión: " . $e->getMessage();
}
?>