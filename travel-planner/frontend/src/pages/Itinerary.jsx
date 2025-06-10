import React, { useEffect, useState } from "react";
import useToggleMenu from "../hooks/useToggleMenu";
import { NavLink } from "react-router-dom";
import '../index.css'

const Itinerary = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedPlanId, setDeletedPlanId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { isOpen, toggleMenu } = useToggleMenu();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://travel-planner:5000/api/plans");
        if (!response.ok) throw new Error("Error al obtener los planes");

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

  const handleDelete = async (planId) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este plan?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://travel-planner:5000/api/plans/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("No se pudo eliminar el plan");

      setPlans((prev) => prev.filter((plan) => plan._id !== planId));
      setDeletedPlanId(planId);
      setSuccessMessage("Plan eliminado con éxito");

      setTimeout(() => {
        setDeletedPlanId(null);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setError("Error al eliminar el plan");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Cargando planes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <span><NavLink to="/" onClick={toggleMenu}>Inicio</NavLink></span>
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis Planes</h1>

        {successMessage && (
          <div className="flex items-center gap-2 bg-green-200 border border-green-400 text-green-700 px-4 py-2 rounded-md shadow">
            <span className="text-xl">✅</span>
            <p className="text-sm font-semibold">{successMessage}</p>
          </div>
        )}

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

                <div className="flex items-center gap-2">
                  {deletedPlanId === plan._id ? (
                    <span className="text-green-500 text-xl">✅</span>
                  ) : (
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Eliminar plan"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Itinerary;