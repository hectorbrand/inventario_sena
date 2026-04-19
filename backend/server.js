const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json()); 
app.use(cors());         

// --- CONFIGURACIÓN DE TU BASE DE DATOS REAL ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',          
    password: '',          
    database: 'inventario' 
});

// Probar si la conexión a MySQL funciona
db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err.message);
    } else {
        console.log("✅ Conectado exitosamente a la base de datos MySQL.");
    }
});

// --- LÓGICA DE SEGURIDAD (VENTANA 1: LOGIN) ---
app.post('/login', (req, res) => {
    const { usuarioIngresado, claveIngresada } = req.body;
    
    const sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?";
    
    db.query(sql, [usuarioIngresado, claveIngresada], (err, result) => {
        if (err) {
            console.error("Error en la consulta de login:", err);
            return res.status(500).json({ Message: "Error interno del servidor" });
        }
        
        if (result.length > 0) {
            return res.json({ success: true, message: "Ingreso exitoso" });
        } else {
            return res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }
    });
});

// --- RUTA: OBTENER PRODUCTOS (VENTANA 2: DASHBOARD) ---
app.get('/productos', (req, res) => {
    const sql = "SELECT * FROM productos"; 
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error al obtener productos:", err);
            return res.status(500).json({ error: "Error al leer la tabla productos" });
        }
        return res.json(data);
    });
});

// --- NUEVA RUTA: GUARDAR UN PRODUCTO NUEVO EN MYSQL ---
app.post('/crear', (req, res) => {
    const sql = "INSERT INTO productos (nombre, cantidad, precio) VALUES (?)";
    // Preparamos los valores que vienen desde el frontend
    const values = [
        req.body.nombre,
        req.body.cantidad,
        req.body.precio
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("❌ Error al insertar producto:", err);
            return res.status(500).json(err);
        }
        return res.json({ success: true, message: "Producto guardado correctamente" });
    });
});

// El servidor corre en el puerto 8081
app.listen(8081, () => {
    console.log("🚀 Servidor del Backend corriendo en http://localhost:8081");
});