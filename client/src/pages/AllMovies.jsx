import { Card, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movies";
import { useNavigate } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message || "Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="all-movies-page">
      <div className="all-movies-header">
        <h1 style={{marginTop:"20px"}}>All Movies</h1>
        <Input
          placeholder="Search movies..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="large"
          className="movie-search-input"
        />
      </div>

      <Row gutter={[24, 24]}>
        {filteredMovies.map((movie) => (
          <Col xs={24} sm={12} md={8} lg={6} key={movie._id}>
            <Card
              hoverable
              cover={
                <img
                  alt={movie.title}
                  src={movie.posterUrl}
                  style={{ height: "360px", objectFit: "cover" }}
                />
              }
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
              <p>{movie.language}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllMovies;