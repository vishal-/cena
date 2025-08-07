import { formatDate, getWeekEnd } from "../../utils/date.utils";

interface HeaderProps {
  currentWeekStart: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const Header = ({ currentWeekStart, onPrevWeek, onNextWeek }: HeaderProps) => {
  const weekEnd = getWeekEnd(currentWeekStart);

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-2 flex justify-between items-center">
      <button
        onClick={onPrevWeek}
        className="bg-slate-500 hover:bg-gray-500 text-white py-1 px-2 mx-2 rounded-sm"
      >
        prev
      </button>

      <div className="text-center text-white mb-2">
        <strong className="text-white font-semibold">
          {formatDate(currentWeekStart)} - {formatDate(weekEnd)}
        </strong>
        <sub className="block mt-2">({currentWeekStart.getFullYear()})</sub>
      </div>

      <button
        onClick={onNextWeek}
        className="bg-slate-500 hover:bg-gray-500 text-white py-1 px-2 mx-2 rounded-sm"
      >
        next
      </button>
    </header>
  );
};

export default Header;
