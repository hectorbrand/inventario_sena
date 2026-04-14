<?php
// =============================================================================
// Evidencia: GA7-220501096-AA3-EV01
// Proyecto: Control Job - Sistema de Inventario
// Descripción: Interfaz principal para el registro de productos.
// =============================================================================
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inventario Sena - Registro</title>
    </head>
<body>

    <header>
        <h1>SISTEMA CONTROL JOB</h1>
        <p>Gestión de Inventario - SENA</p>
    </header>

    <hr>

    <section>
        <h2>Registrar Nuevo Producto</h2>
        
        <form action="guardar.php" method="POST">
            <div>
                <label for="nombre">Nombre del Producto:</label><br>
                <input type="text" id="nombre" name="nombre" placeholder="Ej: Martillo" required>
            </div>
            <br>
            
            <div>
                <label for="cantidad">Cantidad en Stock:</label><br>
                <input type="number" id="cantidad" name="cantidad" placeholder="0" required>
            </div>
            <br>
            
            <div>
                <label for="precio">Precio Unitario:</label><br>
                <input type="number" id="precio" step="0.01" name="precio" placeholder="0.00" required>
            </div>
            <br>
            
            <button type="submit">Guardar Producto en Inventario</button>
        </form>
    </section>

    <br>
    <nav>
        <a href="listar.php">📦 Ver lista de productos registrados</a>
    </nav>

    <footer>
        <br><br>
        <small>© 2026 - Control Job - Evidencia de Codificación</small>
    </footer>

</body>
</html>