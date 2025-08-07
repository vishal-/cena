import { FaAngleLeft } from "react-icons/fa6";

const NavHeader: React.FC<{ label?: string }> = ({ label }) => {
  return (
    <header className="bg-gray-800 border-gray-700 py-3 mb-6 flex justify-between items-center relative">
      <button className="text-white py-1 px-2 mx-2 rounded-sm">
        <FaAngleLeft className="inline mr-1" size={12} />
        Plan
      </button>

      {label && (
        <h3 className="absolute left-1/2 transform -translate-x-1/2 text-xl text-white">
          {label}
        </h3>
      )}
    </header>
  );
};

export default NavHeader;
