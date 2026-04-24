const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());         

// --- CONFIGURACIÓN DE LA BASE DE DATOS ---
// Se establece la conexión con los parámetros de tu servidor local XAMPP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: '',          
    database: 'inventario' 
});

// Verificación de conexión a MySQL
db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err.message);
    } else {
        console.log("✅ Conectado exitosamente a la base de datos MySQL.");
    }
});

// ============================================================
// EVIDENCIA GA7-220501096-AA5-EV01: SERVICIOS WEB
// ============================================================

// --- SERVICIO 1: REGISTRO DE USUARIOS ---
// Este servicio recibe los datos de un nuevo usuario y los guarda en la BD
app.post('/registro', (req, res) => {
    const { nuevoUsuario, nuevaClave, rol } = req.body;
    const sql = "INSERT INTO usuarios (nombre_usuario, password, rol) VALUES (?, ?, ?)";
    
    db.query(sql, [nuevoUsuario, nuevaClave, rol], (err, result) => {
        if (err) {
            console.error("Error al registrar:", err);
            return res.status(500).json({ success: false, message: "Error al registrar usuario" });
        }
        res.json({ success: true, message: "Usuario registrado con éxito" });
    });
});

// --- SERVICIO 2: INICIO DE SESIÓN (LOGIN) ---
// Recibe usuario y contraseña. Si coinciden, devuelve "Autenticación satisfactoria"
app.post('/login', (req, res) => {
    const { usuarioIngresado, claveIngresada } = req.body;
    
    // Consulta para validar si existen las credenciales en la tabla usuarios
    const sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?";
    
    db.query(sql, [usuarioIngresado, claveIngresada], (err, result) => {
        if (err) {
            console.error("Error en el login:", err);
            return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
        
        if (result.length > 0) {
            // RESPUESTA REQUERIDA POR EL SENA
            return res.json({ success: true, message: "Autenticación satisfactoria" });
        } else {
            // RESPUESTA DE ERROR REQUERIDA POR EL SENA
            return res.json({ success: false, message: "Error en la autenticación" });
        }
    });
});

// ============================================================
// SERVICIOS DE GESTIÓN DE INVENTARIO (PRODUCTOS)
// ============================================================

// --- OBTENER TODOS LOS PRODUCTOS ---
app.get('/productos', (req, res) => {
    const sql = "SELECT * FROM productos"; 
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer productos" });
        }
        return res.json(data);
    });
});

// --- CREAR PRODUCTO ---
app.post('/crear', (req, res) => {
    const sql = "INSERT INTO productos (nombre, cantidad, precio) VALUES (?)";
    const values = [req.body.nombre, req.body.cantidad, req.body.precio];

    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ success: true, message: "Producto guardado" });
    });
});

// --- ACTUALIZAR STOCK (ENTREGAR) ---
app.put('/entregar/:id', (req, res) => {
    const id = req.params.id;
    const cantidadARestar = req.body.cantidadARestar;
    const sql = "UPDATE productos SET cantidad = cantidad - ? WHERE id = ? AND cantidad >= ?";
    
    db.query(sql, [cantidadARestar, id, cantidadARestar], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) {
            return res.json({ success: false, message: "Saldo insuficiente" });
        }
        return res.json({ success: true, message: "Cantidad actualizada" });
    });
});

// --- ELIMINAR PRODUCTO ---
app.delete('/eliminar/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM productos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json({ success: true, message: "Producto eliminado" });
    });
});

// --- ARRANQUE DEL SERVIDOR ---
app.listen(8081, () => {
    console.log("🚀 Servidor del Backend corriendo en http://localhost:8081");
});