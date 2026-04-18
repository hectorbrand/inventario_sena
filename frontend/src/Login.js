import React from 'react';

function Login() {
  return (
    <div style={styles.contenedorPrincipal}>
      <div style={styles.cuadroLogin}>
        
        {/* Encabezado con fondo gris claro */}
        <div style={styles.encabezado}>
          <h1 style={styles.titulo}>Control Job</h1>
        </div>

        {/* Formulario con etiquetas y campos */}
        <form style={styles.formulario}>
          <div style={styles.grupoCampo}>
            <label style={styles.etiqueta}>Usuario</label>
            <input type="text" style={styles.input} />
          </div>

          <div style={styles.grupoCampo}>
            <label style={styles.etiqueta}>Contraseña</label>
            <input type="password" style={styles.input} />
          </div>

          <button type="button" style={styles.botonIngresar}>
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