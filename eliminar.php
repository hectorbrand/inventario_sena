<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Descripción: Lógica para borrar registros mediante el ID.
// =============================================================================

require_once 'conexion.php';

// Validamos que el ID exista en la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    try {
        $sql = "DELETE FROM productos WHERE id = :id";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            header("Location: listar.php");
        }
    } catch (PDOException $e) {
        echo "Error al eliminar: " . $e->getMessage();
    }
}
?>