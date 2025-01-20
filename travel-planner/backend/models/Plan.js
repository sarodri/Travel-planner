const mongoose = require('mongoose');

// Definir el esquema del Plan
const planSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  selectedCity: { type: String, required: true },
  selectedFlight: { type: String, required: true },
});

// Crear y exportar el modelo
const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
