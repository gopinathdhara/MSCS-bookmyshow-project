import { Table, message, Tag } from "antd";
import { useEffect, useState } from "react";
import { getAllBookings } from "../api/booking";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();

      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: "600" }}>{record.user?.name || "N/A"}</div>
          <div style={{ fontSize: "12px", color: "#6b7280" }}>
            {record.user?.email || ""}
          </div>
        </div>
      ),
    },
    {
      title: "Movie",
      key: "movie",
      render: (_, record) => record.show?.movie?.title || "N/A",
    },
    {
      title: "Theatre",
      key: "theatre",
      render: (_, record) => record.show?.theatre?.name || "N/A",
    },
    {
      title: "Seats",
      key: "seats",
      render: (_, record) => record.seats?.join(", ") || "N/A",
    },
    {
      title: "Date",
      key: "date",
      render: (_, record) => record.show?.date || "N/A",
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => record.show?.time || "N/A",
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) =>
        `Rs.${record.seats.length * record.show.ticketPrice}`,
    },
    {
      title: "Booking ID",
      key: "transactionId",
      dataIndex: "transactionId",
      render: (text) => (
        <span style={{ fontSize: "12px", fontWeight: "600" }}>{text}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: () => <Tag color="green">BOOKED</Tag>,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="admin-movie-list">All Bookings</h1>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={bookings}
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AdminBookings;
