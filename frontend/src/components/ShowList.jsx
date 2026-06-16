import { useState, useEffect } from "react";
import ShowCard from "./ShowCard";

function ShowList({ onSelect }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/shows/")
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading shows...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <p className="text-center text-gray-500 mb-8">Select a show to book your seats</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default ShowList;