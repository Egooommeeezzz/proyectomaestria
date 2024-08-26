const express = require('express');
const connection = require('./db/connection');
const app = express();

app.use(express.json());

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tasks WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(results[0]);
  });
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  connection.query(query, [title, description], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, title, description, completed: false });
  });
});

// Actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
  connection.query(query, [title, description, completed, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated successfully' });
  });
});

// Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted successfully' });
  });
});


// Definir el puerto y ejecutar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});