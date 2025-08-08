import { FaAngleLeft } from "react-icons/fa6";
import { AppPath } from "../../lib/app.config";
import { useNavigate } from "react-router-dom";

const NavHeader: React.FC<{ label?: string }> = ({ label }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 border-gray-700 py-3 mb-6 flex items-center relative">
      <button
        className="text-white bg-gray-700 border border-gray-600 py-1 px-2 mx-2 rounded-sm"
        onClick={() => navigate(AppPath.WEEK)}
      >
        <FaAngleLeft className="inline mr-1" size={12} />
        Plan
      </button>

      {label && <h3 className="text-white">{label}</h3>}
    </header>
  );
};

export default NavHeader;
