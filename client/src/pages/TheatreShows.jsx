import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm.jsx";
import { updateShowStatus } from "../api/shows";
import {
  Button,
  Select,
  Table,
  Tag,
  Popconfirm,
  Tooltip,
  Flex,
  Typography,
  message,
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
  const today = new Date().toLocaleDateString("en-CA");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getShowsByTheatre(theatreId);

      if (res.success) {
        form.resetFields();
        setShows(res.data);
      }

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
    try {
      const res = await addShow({ ...values, theatre: theatreId });

      if (res.success) {
        message.success("Show added successfully");
        setOpen(false);
        fetchData();
      } else {
        message.error(res.message || "Something went wrong");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";

      message.error(errorMessage);
    }
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  };

  const handleUpdateShowStatus = async (showId, status) => {
    
    try {
      const res = await updateShowStatus(showId, status);
      console.log(res);
      if (res.success) {
        message.success(res.message || "Show status updated successfully");
        fetchData();
      } else {
        message.error(res.message || "Failed to update show status");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong");
    }
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
                <div
                  style={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom:"10px"
                  }}
                >
                  {show.movie?.title || "Movie"}

                  <Select
                    value={show.status}
                    style={{ width: 140 }}
                    onChange={(value) =>
                      handleUpdateShowStatus(show._id, value)
                    }
                    options={[
                      { value: "active", label: "Active" },
                      { value: "cancelled", label: "Cancelled" },
                      { value: "completed", label: "Completed" },
                    ]}
                  />
                </div>

                <div>Date: {show.date}</div>
                <div>Time: {formatTime(show.time)}</div>
                <div>Ticket Price: ₹{show.ticketPrice}</div>
                <div></div>
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
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please enter show date" }]}
          >
            <Input type="date" min={today} />
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
