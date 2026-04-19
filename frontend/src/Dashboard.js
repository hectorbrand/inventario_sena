import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [productos, setProductos] = useState([]);
    // Estados para capturar lo que escribes en el formulario
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    // 1. Función para cargar los productos reales desde MySQL
    const cargarProductos = () => {
        axios.get('http://localhost:8081/productos')
            .then(res => setProductos(res.data))
            .catch(err => console.log("Error al cargar:", err));
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    // 2. FUNCIÓN NUEVA: Guarda el producto en la base de datos real
    const guardarProducto = (e) => {
        e.preventDefault();
        
        // Validación básica
        if (!nombre || !cantidad || !precio) {
            alert("Por favor completa todos los campos");
            return;
        }

        // Enviamos los datos al backend (server.js)
        axios.post('http://localhost:8081/crear', { 
            nombre: nombre, 
            cantidad: cantidad, 
            precio: precio 
        })
        .then(res => {
            if (res.data.success) {
                alert(`✅ ${nombre} guardado correctamente en MySQL`);
                cargarProductos(); // Esto hace que aparezca en la tabla de abajo al instante
                // Limpiamos los cuadros de texto
                setNombre('');
                setCantidad('');
                setPrecio('');
            }
        })
        .catch(err => {
            console.error("Error al guardar:", err);
            alert("❌ No se pudo guardar el producto. Revisa la terminal del backend.");
        });
    };

    return (
        <div style={styles.contenedor}>
            <header style={styles.header}>
                <h1 style={styles.titulo}>Sistema Control Job - Inventario</h1>
                <button style={styles.botonSalir} onClick={() => window.location.href = '/'}>Cerrar Sesión</button>
            </header>

            {/* SECCIÓN 1: REGISTRO DE PRODUCTOS */}
            <section style={styles.seccionFormulario}>
                <h2 style={styles.subtitulo}>Registro de productos</h2>
                <form style={styles.formulario} onSubmit={guardarProducto}>
                    <div style={styles.grupoInput}>
                        <label style={styles.etiqueta}>Nombre del producto</label>
                        <input 
                            type="text" 
                            style={styles.input} 
                            placeholder="Ej: Guantes" 
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div style={styles.grupoInput}>
                        <label style={styles.etiqueta}>Cantidad</label>
                        <input 
                            type="number" 
                            style={styles.input} 
                            placeholder="Ej: 100" 
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                        />
                    </div>
                    <div style={styles.grupoInput}>
                        <label style={styles.etiqueta}>Precio Unitario</label>
                        <input 
                            type="number" 
                            style={styles.input} 
                            placeholder="Ej: 500" 
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>
                    <button type="submit" style={styles.botonGuardar}>Guardar Producto</button>
                </form>
            </section>

            {/* SECCIÓN 2: TABLA DE INVENTARIO ACTUAL */}
            <section style={styles.seccionTabla}>
                <h2 style={styles.subtitulo}>Inventario Actual</h2>
                <table style={styles.tabla}>
                    <thead>
                        <tr style={styles.filaEncabezado}>
                            <th style={styles.celda}>ID</th>
                            <th style={styles.celda}>Producto</th>
                            <th style={styles.celda}>Cantidad</th>
                            <th style={styles.celda}>Precio</th>
                            <th style={styles.celda}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((p) => (
                            <tr key={p.id} style={styles.fila}>
                                <td style={styles.celda}>{p.id}</td>
                                <td style={styles.celda}>{p.nombre}</td>
                                <td style={styles.celda}>{p.cantidad}</td>
                                <td style={styles.celda}>${p.precio}</td>
                                <td style={styles.celda}>
                                    <button style={styles.botonEntregar}>Entregar</button>
                                    <button style={styles.botonEliminar}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

const styles = {
    contenedor: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#343a40', color: 'white', padding: '10px 20px', borderRadius: '8px', marginBottom: '20px' },
    titulo: { margin: 0, fontSize: '20px' },
    subtitulo: { borderBottom: '3px solid #007bff', paddingBottom: '5px', color: '#333', marginBottom: '15px' },
    seccionFormulario: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '30px', maxWidth: '500px' },
    formulario: { display: 'flex', flexDirection: 'column', gap: '15px' },
    grupoInput: { display: 'flex', flexDirection: 'column', gap: '5px' },
    etiqueta: { fontWeight: 'bold', fontSize: '14px', color: '#555' },
    input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', outline: 'none' },
    botonGuardar: { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
    seccionTabla: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    tabla: { width: '100%', borderCollapse: 'collapse' },
    filaEncabezado: { backgroundColor: '#007bff', color: 'white' },
    celda: { padding: '12px', border: '1px solid #ddd', textAlign: 'left' },
    botonEntregar: { backgroundColor: '#ffc107', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px', fontWeight: 'bold' },
    botonEliminar: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    botonSalir: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }
};

export default Dashboard;