import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getAllMovies, getFeaturedMovies } from "../api/movies";
import HomeBanner from "../components/HomeBanner";

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  // for Recently Viewed movie
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recentMovies")) || [];
    setRecentMovies(data);
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      if (res.success) setMovies(res.data || []);
      else message.error(res.message);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchFeatured = async () => {
    const res = await getFeaturedMovies();
    setFeaturedMovie(res.data || []);
  };

  useEffect(() => {
    fetchFeatured();
  }, []);

  // Recently viewed movies using Queue

  function addRecent(movie) {
    let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];

    // remove old movie and add new movie at end of queue
    recent = recent.filter((item) => item._id !== movie._id);

    recent.push(movie);

    if (recent.length > 4) {
      recent.shift(); // remove first movie
    }

    localStorage.setItem("recentMovies", JSON.stringify(recent));
  }

  return (
    <>
      <HomeBanner />
      <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <div style={{ padding: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>
            ⭐ Featured Movies
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              background: "#f9fafb",
              padding: "20px",
              borderRadius: "16px",
            }}
          >
            {featuredMovie.map((item) => (
              <div
                onClick={() => {
                  addRecent(item);
                  navigate(`/movie/${item._id}`);
                }}
                key={item._id}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  background: "#fff",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
                }}
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x600?text=No+Poster";
                  }}
                />

                <div style={{ padding: "10px" }}>
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      opacity: 0.8,
                      fontSize: 13,

                      fontWeight: "bold",
                    }}
                  >
                    {item.genre} • {item.language}
                  </p>
                  <div
                    style={{
                      opacity: 0.8,
                      fontSize: 13,
                      marginTop: 4,

                      fontWeight: "bold",
                    }}
                  >
                    ⏱ {item.duration} mins
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2>🎬 All Movie Shows</h2>
        {movies.length === 0 ? (
          <p>No movies available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
              margin: "15px",
            }}
          >
            {movies.map((movie) => (
              <div
                key={movie._id}
                onClick={() => {
                  addRecent(movie);
                  navigate(`/movie/${movie._id}`);
                }}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
                }}
              >
                <div
                  style={{
                    height: 180,
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
                  />
                </div>

                <div style={{ padding: 14 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      marginBottom: 6,
                      color: "#111827",
                    }}
                  >
                    {movie.title}
                  </div>

                  <div style={{ opacity: 0.8, fontSize: 13 }}>
                    {movie.genre} • {movie.language}
                  </div>

                  <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>
                    ⏱ {movie.duration} mins
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {recentMovies.length > 0 && (
          <div style={{ padding: "20px" }}>
            <h2 style={{ marginBottom: "20px", fontWeight: "700" }}>
              🕒 Recently Viewed
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {recentMovies.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/movie/${item._id}`)}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    background: "#fff",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  <img
                    src={item.posterUrl}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x600?text=No+Poster";
                    }}
                  />

                  <div style={{ padding: 14 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        marginBottom: 6,
                        color: "#111827",
                      }}
                    >
                      {item.title}
                    </div>

                    <div style={{ opacity: 0.8, fontSize: 13 }}>
                      {item.genre} • {item.language}
                    </div>

                    <div style={{ opacity: 0.8, fontSize: 13, marginTop: 4 }}>
                      ⏱ {item.duration} mins
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
