import React, { useState } from "react";
import CreatePlan from "../utils/CreatePlan";

const Destinations = () => {
  const [plans, setPlans] = useState([]);

  const handlePlanCreated = (newPlan) => {
    setPlans([...plans, newPlan]); // Actualizar la lista de planes
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Explora Destinos</h1>
      
      {/* Crear un nuevo plan */}
      <CreatePlan onPlanCreated={handlePlanCreated} />
      
    </div>
  );
};

export default Destinations;

