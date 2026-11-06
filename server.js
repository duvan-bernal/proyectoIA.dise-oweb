const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Servir la interfaz web desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Base de datos en memoria
let personas = [
    { id: 1, nombre: 'Ana Pérez', edad: 28, correo: 'ana@example.com' },
    { id: 2, nombre: 'Carlos Gómez', edad: 34, correo: 'carlos@example.com' }
];

// OBTENER todas las personas
app.get('/personas', (req, res) => {
    res.json(personas);
});

// OBTENER una persona por ID
app.get('/personas/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const persona = personas.find(p => p.id === id);

    if (!Number.isInteger(id) || !persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
    }

    res.json(persona);
});

// CREAR una nueva persona
app.post('/personas', (req, res) => {
    const { nombre, edad, correo } = req.body;
    const edadNumero = Number(edad);

    if (!nombre || edad === undefined || !correo || !Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
        return res.status(400).json({ error: 'Faltan datos requeridos (nombre, edad, correo)' });
    }

    const nuevaPersona = {
        id: personas.reduce((maxId, persona) => Math.max(maxId, persona.id), 0) + 1,
        nombre,
        edad: edadNumero,
        correo
    };

    personas.push(nuevaPersona);
    res.status(201).json({
        mensaje: 'Persona creada exitosamente',
        persona: nuevaPersona
    });
});

// ACTUALIZAR una persona por ID
app.put('/personas/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const persona = personas.find(p => p.id === id);

    if (!Number.isInteger(id) || !persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const { nombre, edad, correo } = req.body;
    const edadNumero = edad === undefined ? undefined : Number(edad);

    if (
        (nombre !== undefined && (typeof nombre !== 'string' || !nombre.trim())) ||
        (correo !== undefined && (typeof correo !== 'string' || !correo.trim())) ||
        (edad !== undefined && (!Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120))
    ) {
        return res.status(400).json({ error: 'Los datos de la persona no son válidos' });
    }

    if (nombre !== undefined) persona.nombre = nombre;
    if (edadNumero !== undefined) persona.edad = edadNumero;
    if (correo !== undefined) persona.correo = correo;

    res.json({
        mensaje: 'Persona actualizada exitosamente',
        persona
    });
});

// ELIMINAR una persona por ID
app.delete('/personas/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    const index = personas.findIndex(p => p.id === id);

    if (!Number.isInteger(id) || index === -1) {
        return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const personaEliminada = personas.splice(index, 1);
    res.json({
        mensaje: 'Persona eliminada exitosamente',
        persona: personaEliminada[0]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});