import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePlan = ({ onPlanCreated, selectedCity }) => {
  const [planName, setPlanName] = useState("");
  const [selectedFlight, setSelectedFlight] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlan = { planName, selectedCity, selectedFlight };

    try {
      const response = await fetch("http://travel-planner:5000/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlan),
      });

      if (!response.ok) {
        throw new Error("Error al crear el plan");
      }

      const createdPlan = await response.json();
      onPlanCreated(createdPlan);

      setSuccessMessage("✅ Plan creado con éxito");
      setError(null);

      // Redirigir al inicio tras 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  // ✅ Mostrar solo el mensaje de éxito si el plan ya fue creado
  if (successMessage) {
    return (
      <div className="bg-green-100 text-green-700 border border-green-400 px-4 py-3 rounded w-full max-w-md">
        {successMessage}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg shadow-sm w-full max-w-md"
    >
      <h3 className="text-lg font-semibold text-gray-700">Crear un Nuevo Plan</h3>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="planName" className="block text-sm font-medium text-gray-700">
          Nombre del Plan
        </label>
        <input
          type="text"
          id="planName"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="selectedCity" className="block text-sm font-medium text-gray-700">
          Destino Seleccionado
        </label>
        <input
          type="text"
          id="selectedCity"
          value={selectedCity}
          readOnly
          className="mt-1 block w-full border-gray-300 bg-gray-100 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
        />
      </div>

      <div>
        <label htmlFor="selectedFlight" className="block text-sm font-medium text-gray-700">
          Vuelo Seleccionado
        </label>
        <input
          type="text"
          id="selectedFlight"
          value={selectedFlight}
          onChange={(e) => setSelectedFlight(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Crear Plan
      </button>
    </form>
  );
};

export default CreatePlan;
