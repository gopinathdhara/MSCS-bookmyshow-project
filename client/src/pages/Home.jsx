import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getAllMovies } from "../api/movies";

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      if (res.success) setMovies(res.data);
      else message.error(res.message);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ marginTop: "20px",marginLeft:"20px" }}>
      <h2 style={{ marginBottom: 12 }}>Now Showing</h2>

      {movies.length === 0 ? (
        <p>No movies available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => navigate(`/movie/${movie._id}`)}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                background: "white",
              }}
            >
              <div
                style={{
                  height: 140,
                  background: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x600?text=No+Poster";
                  }}
                />{" "}
              </div>

              <div style={{ padding: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>
                  {movie.title}
                </div>

                <div style={{ opacity: 0.8, fontSize: 13 }}>
                  {movie.genre} • {movie.language}
                </div>

                <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>
                  {movie.duration} mins
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
