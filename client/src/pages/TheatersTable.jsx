import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm";
import { Button, Table, Tag, message, Tooltip } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllTheatres, approveTheatre } from "../api/theatres.js";

function TheatersTable() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const res = await getAllTheatres();
      setTheatres(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheatres();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await approveTheatre({ theatreId: id });

      if (res.success) {
        message.success(res.message);
        fetchTheatres();
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const tableColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address", ellipsis: true },
    {
      title: "Owner",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.owner?.name}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {record.owner?.email}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="yellow">Pending</Tag>
        ),
    },

    {
      title: "Action",
      render: (_, record) =>
        !record.isActive && (
          <Button
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record._id)}
          ></Button>
        ),
    },
  ];

  return (
    <div className=" p-4">
      <p>Theatre list</p>

      <Table dataSource={theatres} loading={loading} columns={tableColumns} />
    </div>
  );
}

export default TheatersTable;
