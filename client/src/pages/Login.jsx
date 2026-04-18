import React from "react";

import { Button, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import { message } from "antd";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values) => {
    try {
      const res = await loginUser(values);
      const token = res.data?.token;
      const role = res.data?.role;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      message.success("Login successful");
      setTimeout(() => {
      const from = location.state?.from?.pathname;

      if (from) {
        // if user came from protected route
        navigate(from, { replace: true });
      } else {
        // role-based redirect
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "partner") {
          navigate("/partner");
        } else {
          navigate("/");
        }
      }
    }, 1000);
    } catch (err) {
      message.error("Login failed");
      console.log("Error", err.message);
    }
  };

  return (
    <>
      <main className="App-header">
        <h1>Login to BookMyShow</h1>
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

            <Form.Item
              label="Password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "password is required" }]}
            >
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              ></Input>
            </Form.Item>

            <Form.Item className="d-block">
              <Button htmlType="submit" block type="primary">
                Login
              </Button>
            </Form.Item>
          </Form>

          <div>
            <p>
              New User?<Link to="/register"> Register Here</Link>
            </p>
             <p>
              Forgot Password? <Link to="/forget"> Click here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
