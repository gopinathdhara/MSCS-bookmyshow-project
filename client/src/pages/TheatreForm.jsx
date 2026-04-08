import React, { useState } from "react";

import { Form, Input, Modal } from "antd";
import { addTheatre } from "../api/theatres.js";

const TheatreForm = ({ open, setOpen, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    await addTheatre(values);
    setOpen(false);
    onSuccess();
  };

  return (
    <>
      <Modal
        title={"Add Theatre"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Theatre Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Eg: PVR Phoenix" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={2} placeholder="Full address" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input placeholder="Eg: 9876543210" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Eg: manager@theatre.com" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default TheatreForm;
