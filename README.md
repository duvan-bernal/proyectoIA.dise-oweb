# Servidor de Personas (API REST)

Servidor backend desarrollado con **Node.js** y **Express** para la gestión de personas (CRUD completo) con una interfaz web integrada.

---

## 🚀 Cómo iniciar el servidor

Abre tu terminal en la carpeta del proyecto y ejecuta:

```bash
npm start
```

O en modo desarrollo (se reinicia automáticamente con cada cambio):

```bash
npm run dev
```

El servidor iniciará en:
👉 **http://localhost:3000**

---

## 🌐 Interfaz Web Incluida

Si abres **`http://localhost:3000`** en tu navegador, tendrás una interfaz gráfica lista para:
- Ver la lista de personas registradas.
- Agregar nuevas personas.
- Modificar personas existentes.
- Eliminar personas.

---

## 📡 Endpoints de la API REST

| Método | Ruta | Descripción | Cuerpo (Body JSON) |
|---|---|---|---|
| **GET** | `/personas` | Obtiene el listado completo de personas | Ninguno |
| **GET** | `/personas/:id` | Obtiene una persona específica por su ID | Ninguno |
| **POST** | `/personas` | Agrega una nueva persona | `{"nombre": "...", "edad": 25, "correo": "..."}` |
| **PUT** | `/personas/:id` | Modifica los datos de una persona | `{"nombre": "...", "edad": 26, "correo": "..."}` |
| **DELETE** | `/personas/:id` | Elimina una persona por su ID | Ninguno |

---

## 💻 Ejemplos de uso con JavaScript (`fetch`)

### 1. Obtener todas las personas (GET)
```javascript
fetch('http://localhost:3000/personas')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 2. Crear una nueva persona (POST)
```javascript
fetch('http://localhost:3000/personas', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Laura Morales',
    edad: 27,
    correo: 'laura@example.com'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### 3. Actualizar una persona (PUT)
```javascript
fetch('http://localhost:3000/personas/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Ana Pérez Gómez',
    edad: 29
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### 4. Eliminar una persona (DELETE)
```javascript
fetch('http://localhost:3000/personas/1', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data));
```
