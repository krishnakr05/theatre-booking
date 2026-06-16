// A theatre with 6 rows (A-F) and 8 seats per row
const rows = ["A", "B", "C", "D", "E", "F"];

const takenSeats = ["A3", "A4", "B6", "C1", "C2", "D5", "E7", "F3", "F4", "F5"];

function generateSeats() {
  const seats = [];

  rows.forEach((row) => {
    for (let num = 1; num <= 8; num++) {
      const id = `${row}${num}`; 
      seats.push({
        id,
        row,
        number: num,
        status: takenSeats.includes(id) ? "taken" : "available",
      });
    }
  });

  return seats;
}

export default generateSeats;