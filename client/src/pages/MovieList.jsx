import { Table, Button } from "antd";
import { useState } from "react";
import { getAllMovies } from "../api/movies";
import { useEffect } from "react";
import MovieForm from "./MovieForm";
import { Link } from "react-router-dom";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await getAllMovies();
      setMovies(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const tableColumns = [
    {
      title: "Poster",
      dataIndex: "posterUrl",
      render: (text, record) => (
        <img src={record.posterUrl} alt="poster" width="70" />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, record) => `${record.duration} mins`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
    title: "Action",
    render: (_, record) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to={`/admin/edit-movie/${record._id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      </div>
    ),
  },
  ];

  return (
    <div className="movie-list-page">
      <Button onClick={() => setOpen(true)} type="primary" className="add-btn">
        Add Movie
      </Button>
      <br />
      <Table
        dataSource={movies}
        loading={loading}
        columns={tableColumns}
        rowKey="_id"
        className="movie-table"
      />
      <MovieForm open={open} setOpen={setOpen} onSuccess={fetchMovies} />
    </div>
  );
}

export default MovieList;
