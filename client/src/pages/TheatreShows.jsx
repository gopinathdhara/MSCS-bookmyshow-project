import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm.jsx";
import {
  Button,
  Select,
  Table,
  Tag,
  Popconfirm,
  Tooltip,
  Flex,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getShowsByTheatre, addShow } from "../api/shows.js";
import { Form, Input, Modal } from "antd";
import { getAllMovies } from "../api/movies.js";
import { useParams } from "react-router-dom";
const { Title, Text } = Typography;

function TheatreShows() {
  const { theatreId } = useParams();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getShowsByTheatre(theatreId);
      setShows(res.data);

      const moviesRes = await getAllMovies();

      if (moviesRes.success) setMovies(moviesRes.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    await addShow({ ...values, theatre: theatreId });
    setOpen(false);
    fetchData();
  };

const formatTime = (time) => {
  if (!time) return "";

  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return `${hour}:${minute} ${ampm}`;
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Theatre Shows
          </Title>
          <Text type="secondary">Manage all shows for this theatre</Text>
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setOpen(true)}
          style={{
            borderRadius: "10px",
            fontWeight: 500,
          }}
        >
          Add Show
        </Button>
      </div>

      <div style={{ marginTop: 16 }}>
        {shows.length === 0 ? (
          <h2 style={{ textAlign: "center", marginTop: "70px" }}>
            No shows added yet.
          </h2>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {shows.map((show) => (
              <div
                key={show._id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 600 }}>
                  {show.movie?.title || "Movie"}
                </div>
                <div>Date: {show.date}</div>
                <div>
                  Time: {formatTime(show.time)}
                </div>
                <div>Ticket Price: ₹{show.ticketPrice}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        title={"Add Show"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Movie"
            name="movie"
            rules={[{ required: true, message: "Please select a movie" }]}
          >
            <Select
              placeholder="Select a movie"
              options={movies.map((m) => ({
                label: m.title,
                value: m._id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Date (YYYY-MM-DD)"
            name="date"
            rules={[{ required: true, message: "Please enter show date" }]}
          >
            <Input type="date" placeholder="2026-02-24" />
          </Form.Item>

          <Form.Item
            label="Time (HH:mm)"
            name="time"
            rules={[{ required: true, message: "Please enter show time" }]}
          >
            <Input placeholder="18:30" />
          </Form.Item>

          <Form.Item
            label="Ticket Price"
            name="ticketPrice"
            rules={[{ required: true, message: "Please enter ticket price" }]}
          >
            <Input placeholder="250" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Show
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default TheatreShows;
