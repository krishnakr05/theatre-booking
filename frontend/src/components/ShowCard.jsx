function ShowCard({ show, onSelect }) {
  return (
    <div
      onClick={() => onSelect(show)}
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-gray-100"
    >

      <h2 className="text-lg font-bold text-gray-800 text-center mb-1 min-h-[56px] flex items-center justify-center">
        {show.title}
      </h2>

      <p className="text-sm text-center text-purple-500 font-medium mb-3">
        {show.genre}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>📅 {show.date}</p>
        <p>🕐 {show.time}</p>
        <p>🎟️ From ${show.price}</p>
      </div>

      <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors">
        Book Now
      </button>
    </div>
  );
}

export default ShowCard;