import React, { useState } from "react";

import { Form, Input, Modal, message } from "antd";
import { addMovie } from "../api/movies";

const MovieForm = ({ open, setOpen, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    await addMovie(values);
    message.success("Movie added successfully");
    form.resetFields();
    setOpen(false);
    onSuccess();
  };

  return (
    <>
      <Modal
        title="Add Movie"
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Movie Name"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Poster URL"
            name="posterUrl"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Duration (mins)"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Genre" name="genre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Release Date"
            name="releaseDate"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default MovieForm;
