import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm";
import { Button, Table, Tag, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getMyTheatres } from "../api/theatres.js";
import { Link, useNavigate } from "react-router-dom";

function Partner() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const res = await getMyTheatres();
      setTheatres(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheatres();
  }, []);

  const tableColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address", ellipsis: true },
    { title: "City", dataIndex: "city" },
    { title: "Phone", dataIndex: "phone", width: 140 },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Status",
      render: (_, record) =>
        record.isApproved ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="yellow">Pending</Tag>
        ),
    },
    {
      title: "Add Shows",
      render: (_, record) =>
        record.isApproved && (
          <Button
            onClick={() => navigate(`/partner/theatres/${record._id}/shows`)}
          >
            + Shows
          </Button>
        ),
    },
  ];

  return (
    <div className=" p-4">
      <h1 className="thrlst"> Theatre Lists</h1>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="add-movie-btn"
      >
        Add Theatre
      </Button>
      <Table dataSource={theatres} loading={loading} columns={tableColumns} bordered
        pagination={{ pageSize: 5 }} />
      <TheatreForm open={open} setOpen={setOpen} onSuccess={fetchTheatres} />
    </div>
  );
}

export default Partner;
