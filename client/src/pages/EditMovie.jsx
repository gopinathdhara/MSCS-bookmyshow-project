import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { getMovieById, updateMovie } from "../api/movies";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // fetch movie data
  const fetchMovie = async () => {
    try {
      setLoading(true);
      const res = await getMovieById(id);

      form.setFieldsValue(res.data); // fill form

      setLoading(false);
    } catch (err) {
      setLoading(false);
      message.error("Failed to fetch movie");
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  // update movie
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await updateMovie(id, values);
      message.success("Movie updated successfully");
      navigate("/admin"); // go back
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #5b7cff, #7a52c7)",
        padding: "30px 20px 80px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2 className="edtmov">Edit Movie</h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Movie Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Duration">
            <Input />
          </Form.Item>

          <Form.Item name="genre" label="Genre">
            <Input />
          </Form.Item>

          <Form.Item name="language" label="Language">
            <Input />
          </Form.Item>

          <Form.Item name="posterUrl" label="Poster URL">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Update Movie
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditMovie;
