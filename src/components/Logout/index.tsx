
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("rotta_usuario");
    navigate("/", { replace: true });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="text-red-600 text-2sm font-medium cursor-pointer"
    >
      Sair
    </button>
  );
}
