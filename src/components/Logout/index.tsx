
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
      className="text-creme hover:text-verde-claro transition-colors text-2sm font-medium cursor-pointer"
    >
      Sair
    </button>
  );
}
