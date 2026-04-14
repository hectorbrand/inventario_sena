<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inventario Sena</title>
</head>
<body>

<h2>Registrar Nuevo Producto</h2>

<form action="guardar.php" method="POST">
    <label>Nombre del Producto:</label><br>
    <input type="text" name="nombre" required><br><br>
    
    <label>Cantidad:</label><br>
    <input type="number" name="cantidad" required><br><br>
    
    <label>Precio:</label><br>
    <input type="number" step="0.01" name="precio" required><br><br>
    
    <input type="submit" value="Guardar Producto">
</form>

<br>
<a href="listar.php">Ver lista de productos</a>

</body>
</html>