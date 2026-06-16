import { useState, useEffect } from "react";
import ShowList from "./components/ShowList";
import SeatMap from "./components/SeatMap";
import BookingConfirmation from "./components/BookingConfirmation";

function App() {
  const [currentStep, setCurrentStep] = useState("showList");
  const [selectedShow, setSelectedShow] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/shows/")
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch((err) => console.error("Error fetching shows:", err));
  }, []);

  function handleShowSelect(show) {
    setSelectedShow(show);
    setCurrentStep("seatMap");
  }

  function handleBack() {
    setCurrentStep("showList");
    setSelectedShow(null);
  }

  async function handleConfirm(selectedSeats) {
    const bookingData = {
      show: selectedShow.id,
      seats: selectedSeats.map(s => s.id),
      total_price: selectedSeats.length * selectedShow.price
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBookedSeats(selectedSeats);
        setCurrentStep("confirmation");
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred while creating the booking.");
    }
  }

  function handleReset() {
    setSelectedShow(null);
    setBookedSeats([]);
    setCurrentStep("showList");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-purple-700 text-white text-center py-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-wide">🎭 TheatreBook</h1>
        <p className="text-purple-200 text-sm mt-1">Your seats, your show</p>
      </header>

      {/* Show the right screen based on currentStep */}
      {currentStep === "showList" && (
        <ShowList shows={shows} onSelect={handleShowSelect} />
      )}

      {currentStep === "seatMap" && (
        <SeatMap show={selectedShow} onBack={handleBack} onConfirm={handleConfirm} />
      )}

      {currentStep === "confirmation" && (
        <BookingConfirmation show={selectedShow} selectedSeats={bookedSeats} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;