import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

import { Button, Form, Input } from "antd";
import { registerUser } from "../api/users";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser(values);
      message.success("Registration successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      message.error(err.response?.data?.message);
    }
  };

  return (
    <>
      <main className="App-header">
        <h1>Register on BookMyShow</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name" }]}
            >
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className="d-block"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                type="text"
                id="email"
                placeholder="Enter your email"
              ></Input>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              className="d-block"
              rules={[
                { required: true, message: "password is required" },
                { min: 6, message: "Password must be at least 6 chars" },
              ]}
            >
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </section>
        <div>
          <p>
            Already Registered?<Link to="/login"> Login Here</Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default Register;
