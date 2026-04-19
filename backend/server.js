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
    database: 'inventario' // ✅ CORREGIDO: Nombre de la base de datos
});

// Probar si la conexión a MySQL funciona
db.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión a MySQL:", err.message);
    } else {
        console.log("✅ Conectado exitosamente a la base de datos MySQL.");
    }
});

// --- LÓGICA DE SEGURIDAD (VENTANA 1) ---
app.post('/login', (req, res) => {
    const { usuarioIngresado, claveIngresada } = req.body;
    
    // ✅ CORREGIDO: Se cambió 'usuario' por 'usuarios' (en plural)
    const sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?";
    
    db.query(sql, [usuarioIngresado, claveIngresada], (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ Message: "Error interno del servidor" });
        }
        
        if (result.length > 0) {
            return res.json({ success: true, message: "Ingreso exitoso" });
        } else {
            return res.json({ success: false, message: "Usuario o contraseña incorrectos" });
        }
    });
});

app.listen(8081, () => {
    console.log("🚀 Servidor del Backend corriendo en http://localhost:8081");
});