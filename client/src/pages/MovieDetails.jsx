import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import { getShowsByMovie } from "../api/shows";
import { getMovieDetails } from "../api/movies";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const getTodayYYYYMMDD = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState([]);
  const [date, setDate] = useState(getTodayYYYYMMDD());

  const fetchShows = async (selectedDate) => {
    try {
      const res = await getShowsByMovie(movieId, selectedDate);
      if (res.success) {
        setShows(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getSingleMovie = async (movieId) => {
    try {
      const res = await getMovieDetails(movieId);
      if (res.success) {
        setMovie(res.data);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // Auto fetch on first load
  useEffect(() => {
    fetchShows(date);
  }, [movieId]);

  // Refetch when date changes
  useEffect(() => {
    fetchShows(date);
  }, [date]);

  useEffect(() => {
    getSingleMovie(movieId);
  }, [movieId]);

  //[
  //   { theatreId: PVR, time: "10AM" },
  //   { theatreId: INOX, time: "11AM" },
  //   { theatreId: PVR, time: "2PM" }
  // ]

  // Group shows by theatre
  const groupedByTheatre = useMemo(() => {
    const map = {};
    for (const show of shows) {
      const theatreId = show.theatre?._id;
      if (!theatreId) continue;

      if (!map[theatreId]) {
        map[theatreId] = {
          theatre: show.theatre,
          shows: [],
        };
      }
      map[theatreId].shows.push(show);
    }

    return Object.values(map);
  }, [shows]);

  return (
    <div style={{ marginTop: "20px", marginLeft: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            color: "#111827",
            fontSize: "26px",
            fontWeight: "700",
            marginBottom: "5px",
            letterSpacing: "0.5px",
          }}
        >
          🎬 {movie.title}
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "14px",
            marginTop:"20px"
          }}
        >
          {movie.language} • {movie.genre} • {movie.duration} mins
        </p>
      </div>
      
      <h3 style={{ marginBottom: 12 }}>Select Date</h3>

      <div style={{ marginBottom: 24 }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            fontSize: 14,
          }}
        />
      </div>

      {groupedByTheatre.length === 0 ? (
        <p>No shows found for this movie on this date.</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }} className="show-card">
          {groupedByTheatre.map((group) => (
            <div
              key={group.theatre._id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 16 }} className="theatre-name">
                {group.theatre.name}
              </div>
              <div style={{ opacity: 0.85 }} className="theatre-address">{group.theatre.address}</div>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }} className="show-time-list"
              >
                {group.shows.map((show) => (
                  <Button
                    key={show._id}
                    onClick={() => navigate(`/book-show/${show._id}`)}
                  >
                    {show.time}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
