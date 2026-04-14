<?php
include("conexion.php");
$resultado = mysqli_query($conexion, "SELECT * FROM productos");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Listado</title>
</head>
<body>

<h2>Productos Registrados</h2>

<table border="1">
<tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Acción</th>
</tr>

<?php while($fila = mysqli_fetch_assoc($resultado)) { ?>
<tr>
    <td><?php echo $fila['id']; ?></td>
    <td><?php echo $fila['nombre']; ?></td>
    <td><?php echo $fila['cantidad']; ?></td>
    <td><?php echo $fila['precio']; ?></td>
    <td>
        <a href="eliminar.php?id=<?php echo $fila['id']; ?>">Eliminar</a>
    </td>
</tr>
<?php } ?>

</table>

<br>
<a href="index.php">Volver</a>

</body>
</html>