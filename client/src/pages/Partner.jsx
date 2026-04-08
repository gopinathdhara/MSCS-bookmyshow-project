import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm";
import { Button, Table, Tag, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getMyTheatres } from "../api/theatres.js";

function Partner() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
    { title: "Phone", dataIndex: "phone", width: 140 },
    { title: "Email", dataIndex: "email", ellipsis: true },
    {
      title: "Status",
      render: (_, record) =>
        record.isActive ? (
          <Tag color="green">Approved</Tag>
        ) : (
          <Tag color="yellow">Pending</Tag>
        ),
    },
  ];

  return (
    <div className=" p-4">
      <p>Theatre list</p>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        type="primary"
      >
        Add Theatre
      </Button>
      <Table dataSource={theatres} loading={loading} columns={tableColumns} />
      <TheatreForm open={open} setOpen={setOpen} onSuccess={fetchTheatres} />
    </div>
  );
}

export default Partner;
