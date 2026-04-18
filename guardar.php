<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Descripción: Lógica para insertar productos.
// =============================================================================

require_once 'conexion.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $cantidad = $_POST['cantidad'];
    $precio = $_POST['precio'];

    try {
        $sql = "INSERT INTO productos (nombre, cantidad, precio) VALUES (:nom, :cant, :prec)";
        
        // Usamos $conexion porque así la llamamos en el paso anterior
        $stmt = $conexion->prepare($sql);
        
        $stmt->bindParam(':nom', $nombre);
        $stmt->bindParam(':cant', $cantidad);
        $stmt->bindParam(':prec', $precio);

        if ($stmt->execute()) {
            header("Location: listar.php");
            exit();
        }
    } catch (PDOException $e) {
        echo "Error al guardar: " . $e->getMessage();
    }
}
?>