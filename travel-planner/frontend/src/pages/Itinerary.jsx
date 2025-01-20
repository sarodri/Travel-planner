import React, { useEffect, useState } from "react";

const Itinerary = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los planes desde el backend
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://travel-planner:5000/api/plans");
        if (!response.ok) {
          throw new Error("Error al obtener los planes");
        }
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando planes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Mis Planes</h1>

      {plans.length === 0 ? (
        <p className="text-gray-500">No tienes planes creados aún.</p>
      ) : (
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li
              key={plan._id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{plan.planName}</h3>
                <p className="text-sm text-gray-600">
                  <strong>Ciudad:</strong> {plan.selectedCity} |{" "}
                  <strong>Vuelo:</strong> {plan.selectedFlight}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Itinerary;
