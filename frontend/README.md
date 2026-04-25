# Control Job - Sistema de Gestión de Inventario 🏗️

Este proyecto es una aplicación Full Stack diseñada para el control de inventario y registro de entregas de herramientas y materiales. Permite gestionar el stock en tiempo real y mantener un historial detallado de quién recibe cada producto.

## 🚀 Tecnologías Utilizadas

* **Frontend:** React.js, React Router, Axios. ⚛️
* **Backend:** Node.js, Express.js. 🟢
* **Base de Datos:** MySQL (XAMPP). 🗄️
* **Versionamiento:** Git / GitHub. 🐙

## 🛠️ Instalación y Uso

1. Clona el repositorio.
2. En la carpeta `backend`, ejecuta `npm install` y luego `node server.js`.
3. En la carpeta `frontend`, ejecuta `npm install` y luego `npm start`.
4. Asegúrate de tener XAMPP corriendo con el módulo de MySQL activo.

## 📖 Documentación de la API (Servicios Web)

A continuación se detallan los servicios desarrollados para el cumplimiento de la evidencia GA7-220501096-AA5-EV03:

| Servicio | Método | Ruta | Descripción | Datos Recibidos (JSON) |
| :--- | :--- | :--- | :--- | :--- |
| **Autenticación** | `POST` | `/login` | Valida credenciales de usuario. | `usuario`, `password` |
| **Listar Inventario** | `GET` | `/productos` | Obtiene todos los productos disponibles. | Ninguno |
| **Crear Producto** | `POST` | `/crear` | Registra un nuevo artículo en la base de datos. | `nombre`, `cantidad`, `precio` |
| **Registrar Entrega** | `PUT` | `/entregar/:id` | Resta stock y guarda registro en el historial. | `cantidadARestar`, `persona_recibe`, `area` |
| **Ver Historial** | `GET` | `/historial` | Obtiene el reporte de todas las entregas realizadas. | Ninguno |
| **Eliminar** | `DELETE`| `/eliminar/:id`| Elimina un producto del inventario. | ID por URL |

## 👤 Autor
Héctor - Aprendiz SENA