import { Navigate, Outlet } from "react-router-dom";

export default function RotaPrivada() {
  const usuario = localStorage.getItem("rotta_usuario");

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
