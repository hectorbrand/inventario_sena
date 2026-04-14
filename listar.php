<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Descripción: Módulo para visualizar y gestionar los productos registrados.
// =============================================================================

require_once 'conexion.php';

// Consultamos todos los registros de la tabla productos
$query = $conexion->query("SELECT * FROM productos");
$productos = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inventario - Lista de Productos</title>
</head>
<body>
    <h2>Productos en Inventario</h2>
    
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($productos as $p): ?>
            <tr>
                <td><?php echo $p['id']; ?></td>
                <td><?php echo $p['nombre']; ?></td>
                <td><?php echo $p['cantidad']; ?></td>
                <td>$<?php echo number_format($p['precio'], 2); ?></td>
                <td>
                    <a href="eliminar.php?id=<?php echo $p['id']; ?>" onclick="return confirm('¿Seguro que quieres eliminarlo?')">Eliminar</a>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <br>
    <a href="index.php">➕ Registrar otro producto</a>
</body>
</html>