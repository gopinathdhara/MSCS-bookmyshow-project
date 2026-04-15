import React, { useState } from "react";

import { Form, Input, Modal, message, Switch } from "antd";
import { addMovie, updateMovie } from "../api/movies";
import { useEffect } from "react";

const MovieForm = ({
  open,
  setOpen,
  onSuccess,
  selectedMovie,
  setSelectedMovie,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log(values);

    if (selectedMovie) {
      let res = await updateMovie(selectedMovie._id, values);
      message.success(res.message || "Movie updated successfully");
    } else {
      let res = await addMovie(values);
      message.success(res.message || "Movie added successfully");
    }
    form.resetFields();
    setOpen(false);
    setSelectedMovie(null);
    onSuccess();
  };

  useEffect(() => {
    console.log(selectedMovie);
    if (selectedMovie) {
      form.setFieldsValue({
        title: selectedMovie.title,
        posterUrl: selectedMovie.posterUrl,
        description: selectedMovie.description,
        duration: selectedMovie.duration,
        genre: selectedMovie.genre,
        language: selectedMovie.language,
        releaseDate: selectedMovie.releaseDate
          ? selectedMovie.releaseDate.split("T")[0]
          : "",
        isFeatured: selectedMovie.isFeatured,
      });
    } else {
      form.resetFields();
    }
  }, [selectedMovie, form]);

  return (
    <>
      <Modal
        title={selectedMovie ? "Edit Movie" : "Add Movie"}
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
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            label="Duration (mins)"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input type="number" onWheel={(e) => e.target.blur()} />
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
  label="Featured Movie"
  name="isFeatured"
  valuePropName="checked"
  extra="Featured movies can be highlighted on the homepage."
>
  <Switch
    className="featured-switch"
    checkedChildren="★"
    unCheckedChildren="☆"
  />
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
