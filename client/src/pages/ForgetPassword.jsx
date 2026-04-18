import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPassword } from "../api/users";
import { message } from "antd";

function Forget() {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await ForgetPassword(value);
      message.success("OTP sent successfully");
      navigate(`/reset/${encodeURIComponent(value.email)}`);
    } catch (error) {
      console.log("error");
      message.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <header className="App-header">
        <main className="App-header">
          <h1>Forgot password?</h1>
          <section className="mw-500 text-center px-3">
            <Form layout="vertical" onFinish={onFinish}>
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

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  SEND OTP
                </Button>
              </Form.Item>
            </Form>
          </section>
        </main>
      </header>
    </>
  );
}
export default Forget;
