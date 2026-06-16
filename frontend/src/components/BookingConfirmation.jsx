function BookingConfirmation({ show, selectedSeats, onReset }) {
  const totalPrice = selectedSeats.length * show.price;

  return (
    <div className="max-w-md mx-auto px-6 py-10 text-center">
      
      {/* Success icon */}
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
      <p className="text-gray-500 mb-8">Your seats have been reserved.</p>

      {/* Booking details card */}
      <div className="bg-white rounded-2xl shadow-md p-6 text-left space-y-4 border border-gray-100">
        
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Show</p>
          <p className="font-bold text-gray-800 text-lg">{show.emoji} {show.title}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Date & Time</p>
          <p className="text-gray-700">📅 {show.date} &nbsp; 🕐 {show.time}</p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">Seats</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {selectedSeats.map((seat) => (
              <span
                key={seat.id}
                className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {`${seat.row}${seat.number}`}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-xs text-gray-400 uppercase tracking-wide">Total Paid</p>
          <p className="text-2xl font-bold text-purple-700">${totalPrice}</p>
        </div>

      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        className="mt-8 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
      >
        🎭 Book Another Show
      </button>

    </div>
  );
}

export default BookingConfirmation;