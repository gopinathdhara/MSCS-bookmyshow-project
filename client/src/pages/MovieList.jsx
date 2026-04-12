import { useState } from "react";
import { deleteMovie, getAllMovies } from "../api/movies";
import { useEffect } from "react";
import MovieForm from "./MovieForm";
import { Button, Table, message, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleDeleteRecord = async (movie) => {
    try {
      setLoading(true);
      const res = await deleteMovie(movie._id);
      message.success("Deleted the movie");
      setLoading(false);
      fetchMovies();
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
      title: "Featured",
      dataIndex: "isFeatured",
      render: (isFeatured) => (isFeatured ? "⭐ Featured" : "—"),
    },

    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedMovie(record);
                setOpen(true);
              }}
            ></Button>
          </Tooltip>
          &nbsp;&nbsp;
          <Popconfirm
            title="Delete the movie?"
            description="Are you sure to delete this movie?"
            onConfirm={() => handleDeleteRecord(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} className="delete-btn" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mt-6">
      <h1 className="admin-movie-list">Admin - Movie List</h1>
      <Button
        onClick={() => {
          setOpen(true);
          setSelectedMovie(null);
        }}
        className="add-movie-btn"
      >
        Add Movie
      </Button>
      <Table dataSource={movies} loading={loading} columns={tableColumns} />
      <MovieForm
        open={open}
        setOpen={setOpen}
        onSuccess={fetchMovies}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
    </div>
  );
}

export default MovieList;
