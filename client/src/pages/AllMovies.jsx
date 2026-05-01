import { Card, Col, Input, Row, message, Pagination } from "antd";
import { useEffect, useState } from "react";
import { getAllMovies } from "../api/movies";
import { useNavigate } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);

  // User typing value
  const [searchText, setSearchText] = useState("");

  // API search value after debounce delay
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const limit = 8;
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      // Use debouncedSearchText for API call
      const response = await getAllMovies(page, limit, debouncedSearchText);

      if (response.success) {
        setMovies(response.data);
        setTotalMovies(response.pagination.totalMovies);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message || "Failed to fetch movies");
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Fetch movies when page or debounced search changes
  useEffect(() => {
    fetchMovies();
  }, [page, debouncedSearchText]);

  return (
    <div className="all-movies-page">
      <div className="all-movies-header">
        <h1 style={{ marginTop: "20px" }}>All Movies</h1>

        <Input
          placeholder="Search movies..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="large"
          className="movie-search-input"
        />
      </div>

      <Row gutter={[24, 24]}>
        {movies.map((movie) => (
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

      {totalMovies > limit && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Pagination
            current={page}
            pageSize={limit}
            total={totalMovies}
            onChange={(pageNumber) => setPage(pageNumber)}
          />
        </div>
      )}
    </div>
  );
};

export default AllMovies;
