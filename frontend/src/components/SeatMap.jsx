import { useState, useEffect } from "react";
import Seat from "./Seat";

function SeatMap({ show, onBack, onConfirm }) {
  // Initialize seats as an empty array
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/seats/?show_id=${show.id}`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error("Error fetching seats:", err));
  }, [show.id]);

  // ✅ Derive selectedSeats from seats directly
  const selectedSeats = seats.filter((seat) => seat.status === "selected");

  function handleSeatClick(clickedSeat) {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id !== clickedSeat.id) return seat; // not this seat, leave it alone

        // Toggle between selected and available
        if (seat.status === "selected") {
          return { ...seat, status: "available" };
        } else {
          return { ...seat, status: "selected" };
        }
      })
    );
  }

  // Group seats by row for rendering
  const rows = ["A", "B", "C", "D", "E", "F"];
  const totalPrice = selectedSeats.length * show.price;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Back button + show title */}
      <button
        onClick={onBack}
        className="text-purple-600 font-semibold mb-6 hover:underline"
      >
        ← Back to Shows
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{show.emoji} {show.title}</h2>
      <p className="text-gray-500 text-sm mb-8">📅 {show.date} &nbsp; 🕐 {show.time}</p>

      {/* Legend */}
      <div className="flex gap-6 mb-6 text-sm">
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-400 inline-block"/> Available</span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-400 opacity-60 inline-block"/> Taken</span>
        <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-yellow-400 inline-block"/> Selected</span>
      </div>

      {/* Screen indicator */}
      <div className="w-full h-3 bg-purple-300 rounded-full mb-8 text-center">
        <p className="text-xs text-purple-700 mt-4 font-medium tracking-widest">SCREEN</p>
      </div>

      {/* Seat grid */}
      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2">
            {/* Row label */}
            <span className="w-5 text-sm font-bold text-gray-400">{row}</span>
            {/* Seats in this row */}
            <div className="flex gap-2">
              {seats
                .filter((seat) => seat.row === row)
                .map((seat) => (
                  <Seat key={seat.id} seat={seat} onSeatClick={handleSeatClick} />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Summary bar at the bottom */}
      {selectedSeats.length > 0 && (
        <div className="mt-10 bg-purple-50 border border-purple-200 rounded-2xl p-5">
          <p className="text-gray-700 font-medium">
            Selected: {selectedSeats.map((s) => `${s.row}${s.number}`).join(", ")}
          </p>
          <p className="text-purple-700 font-bold text-lg mt-1">
            Total: ${totalPrice}
          </p>
          <button 
            onClick={()=>onConfirm(selectedSeats)}  
            className="mt-3 w-full bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default SeatMap;