import React, { useState } from 'react';
import axios from 'axios';
// Importamos useNavigate para una navegación más fluida
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate(); // Creamos la función para saltar de página

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === "" || clave === "") {
      alert("Por favor, llena todos los campos");
      return;
    }

    axios.post('http://localhost:8081/login', { 
      usuarioIngresado: usuario, 
      claveIngresada: clave 
    })
    .then(res => {
      if (res.data.success) {
        alert("✅ ¡Ingreso exitoso! Bienvenido administrador.");
        // --- AQUÍ ESTÁ EL CAMBIO: Salto automático al Dashboard ---
        navigate('/dashboard'); 
      } else {
        alert("❌ Error: Usuario o contraseña incorrectos.");
      }
    })
    .catch(err => {
      console.log(err);
      alert("❌ No se pudo conectar con el servidor. ¿Encendiste el backend?");
    });
  };

  return (
    <div style={styles.contenedorPrincipal}>
      <div style={styles.cuadroLogin}>
        
        {/* Encabezado */}
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>Control Job</h1>
        </div>

        {/* Formulario */}
        <form style={styles.formulario} onSubmit={handleLogin}>
          <div style={styles.grupoCampo}>
            <label style={styles.etiqueta}>Usuario</label>
            <input 
              type="text" 
              style={styles.input} 
              placeholder="Ej: admin"
              onChange={e => setUsuario(e.target.value)} 
            />
          </div>

          <div style={styles.grupoCampo}>
            <label style={styles.etiqueta}>Contraseña</label>
            <input 
              type="password" 
              style={styles.input} 
              placeholder="Ej: 123"
              onChange={e => setClave(e.target.value)} 
            />
          </div>

          <button type="submit" style={styles.botonIngresar}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  contenedorPrincipal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  cuadroLogin: {
    backgroundColor: '#ffffff',
    width: '320px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  encabezado: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'center'
  },
  titulo: {
    margin: 0,
    fontSize: '22px',
    color: '#333',
    fontWeight: 'bold'
  },
  formulario: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  grupoCampo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  etiqueta: {
    fontSize: '15px',
    color: '#333'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none'
  },
  botonIngresar: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Login;