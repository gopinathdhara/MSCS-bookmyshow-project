import { Table, message, Tag,Input, Spin } from "antd";
import { useEffect, useState } from "react";
import { getPartnerBooking } from "../api/booking";

const PartnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

   // for search
  const [searchText, setSearchText] = useState("");
  // for search loading
  const [searchLoading, setSearchLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getPartnerBooking();

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

  // Filter booking records
  const filteredBookings = bookings.filter((booking) =>
    JSON.stringify(booking).toLowerCase().includes(searchText.toLowerCase()),
  );

  const totalRevenue = filteredBookings.reduce((acc, booking) => {
    const amount =
      (booking.seats?.length || 0) * (booking.show?.ticketPrice || 0);
    return acc + amount;
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="admin-movie-list"> My Theatre Bookings</h1>
      <div
        style={{
          background: "#f0f9ff",
          padding: "15px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontWeight: "600",
          fontSize: "18px",
          color: "#1d4ed8",
        }}
      >
        Total Revenue: ₹ {totalRevenue.toLocaleString()}
      </div>
      <Input
        placeholder="Search bookings..."
        size="large"
        allowClear
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setSearchLoading(true);

          setTimeout(() => {
            setSearchLoading(false);
          }, 300);
        }}
        style={{
          width: "380px",
          height: "50px",
          marginBottom: "28px",
          padding: "0 16px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #d9d9d9",
          backgroundColor: "#ffffff",
        }}
      />
      {searchLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredBookings}
          loading={loading}
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default PartnerBookings;
