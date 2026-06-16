function Seat({ seat, onSeatClick }) {

  // Each status gets a different color
  const styles = {
    available: "bg-green-400 hover:bg-green-500 cursor-pointer",
    taken: "bg-red-400 cursor-not-allowed opacity-60",
    selected: "bg-yellow-400 hover:bg-yellow-500 cursor-pointer",
  };

  function handleClick() {
    // Don't do anything if the seat is already taken
    if (seat.status === "taken") return;
    onSeatClick(seat);
  }

  return (
    <div
      onClick={handleClick}
      title={`${seat.row}${seat.number}`}
      className={`w-8 h-8 rounded-t-lg text-xs flex items-center justify-center font-bold text-white transition-all duration-150 ${styles[seat.status]}`}
    >
      {seat.number}
    </div>
  );
}

export default Seat;