const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Crear la app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Importar el modelo Plan
const Plan = require('./models/Plan');

// Rutas
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del Planificador de Viajes!');
});

// Ruta para obtener todos los planes
app.get('/api/plans', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los planes', error });
  }
});

// Ruta para crear un nuevo plan
app.post('/api/plans', async (req, res) => {
  const { planName, selectedCity, selectedFlight } = req.body;

  try {
    const newPlan = new Plan({ planName, selectedCity, selectedFlight });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el plan' });
  }
});

// Ruta para eliminar un plan por su ID
app.delete('/api/plans/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Plan.findByIdAndDelete(id);
    res.status(200).json({ message: 'Plan eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el plan' });
  }
});

// Iniciar el servidor en travel-planner y puerto 5000
const PORT = process.env.PORT || 5000;
const HOST = 'travel-planner'; // Host personalizado
app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});