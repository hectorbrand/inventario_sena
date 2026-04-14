<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Descripción: Lógica para insertar productos en la base de datos.
// =============================================================================

require_once 'conexion.php'; // Reutilizamos la conexión PDO

// Verificamos que los datos lleguen por el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $cantidad = $_POST['cantidad'];
    $precio = $_POST['precio'];

    try {
        // Preparamos la consulta SQL con marcadores para evitar inyección SQL
        $sql = "INSERT INTO productos (nombre, cantidad, precio) VALUES (:nom, :cant, :prec)";
        $stmt = $conexion->prepare($sql);
        
        // Vinculamos los parámetros
        $stmt->bindParam(':nom', $nombre);
        $stmt->bindParam(':cant', $cantidad);
        $stmt->bindParam(':prec', $precio);

        // Ejecutamos la inserción
        if ($stmt->execute()) {
            // Si funciona, regresamos a la lista para ver el cambio
            header("Location: listar.php");
        }
    } catch (PDOException $e) {
        echo "Error al guardar el producto: " . $e->getMessage();
    }
}
?>