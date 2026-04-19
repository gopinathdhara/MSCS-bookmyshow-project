import { useState } from "react";
import { useEffect } from "react";
import TheatreForm from "./TheatreForm";
import { Button, Table, Tag, message, Tooltip, Popconfirm, Space } from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  getAllTheatres,
  approveTheatre,
  rejectTheatre,
} from "../api/theatres.js";

function TheatersTable() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  const openRejectModal = (record) => {
    setSelectedTheatre(record);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const { TextArea } = Input;

  const fetchTheatres = async () => {
    try {
      setLoading(true);
      const res = await getAllTheatres();
      console.log(res);
      setTheatres(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheatres();
  }, []);

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      return message.error("Please enter rejection reason");
    }

    try {
      setRejectLoading(true);

      const res = await rejectTheatre({
        theatreId: selectedTheatre._id,
        rejectionReason: rejectionReason.trim(),
      });

      message.success(res.message);
      setRejectModalOpen(false);
      setSelectedTheatre(null);
      setRejectionReason("");
      fetchTheatres();
    } catch (err) {
      message.error(err.message);
    } finally {
      setRejectLoading(false);
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
      dataIndex: "status",
      render: (status) => {
        if (status === "approved") {
          return <span style={{ color: "green" }}>Approved</span>;
        }
        if (status === "rejected") {
          return <span style={{ color: "red" }}>Rejected</span>;
        }
        return <span style={{ color: "orange" }}>Pending</span>;
      },
    },
    {
      title: "Reason",
      dataIndex: "rejectionReason",
      ellipsis: true,
      render: (value) =>
        value ? (
          <Tooltip title={value}>
            <span style={{ color: "red" }}>
              {value.length > 20 ? value.slice(0, 20) + "..." : value}
            </span>
          </Tooltip>
        ) : (
          <span style={{ color: "#999" }}>No reason</span>
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          {record.status !== "approved" && (
            <Popconfirm
              title="Approve this theatre?"
              onConfirm={async () => {
                try {
                  const res = await approveTheatre({ theatreId: record._id });
                  message.success(res.message);
                  fetchTheatres();
                } catch (err) {
                  message.error(err.message);
                }
              }}
            >
              <Button type="primary">Approve</Button>
            </Popconfirm>
          )}

          {record.status !== "rejected" && (
            <Button danger onClick={() => openRejectModal(record)}>
              Reject
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className=" p-4">
      <h1 className="admin-movie-list"> Manage Theatres</h1>

      <Table
        dataSource={theatres}
        loading={loading}
        columns={tableColumns}
        bordered
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Reject Theatre"
        open={rejectModalOpen}
        onCancel={() => {
          setRejectModalOpen(false);
          setSelectedTheatre(null);
          setRejectionReason("");
        }}
        onOk={handleReject}
        confirmLoading={rejectLoading}
        okText="Submit Rejection"
      >
        <TextArea
          rows={4}
          placeholder="Enter rejection reason"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default TheatersTable;
