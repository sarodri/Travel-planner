import React, { useState } from "react";

const CreatePlan = ({ onPlanCreated }) => {
  const [planName, setPlanName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFlight, setSelectedFlight] = useState("");
  const [error, setError] = useState(null);

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
      onPlanCreated(createdPlan); // Notificar que un plan ha sido creado
      setPlanName("");
      setSelectedCity("");
      setSelectedFlight("");
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-700">Crear un Nuevo Plan</h3>
      {error && <p className="text-red-500">{error}</p>}
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
          Ciudad Seleccionada
        </label>
        <input
          type="text"
          id="selectedCity"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
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
