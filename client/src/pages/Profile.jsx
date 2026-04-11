import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/users.js";
import {
  Layout,
  Card,
  Typography,
  Row,
  Col,
  Avatar,
  Spin,
  Alert,
  Tag,
  Space,
  Button
} from "antd";
import { UserOutlined, MailOutlined, SafetyOutlined,LogoutOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data?.data?.userDetails);
      } catch (err) {
        setError("Failed to load profile");
      }
    };

    fetchMe();
  }, []);

  if (error) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ width: "100%", maxWidth: 500 }}
          />
        </Content>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout style={{ minHeight: "100vh", background: "#f5f7fa" }}>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout
      style={{
        minHeight: "100vh"
       
      }}
    >
      <Content style={{ padding: "40px 20px" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ textAlign: "right", marginBottom: 12 }}>
                <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                  Logout
                </Button>
              </div>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Avatar
                  size={72}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#1677ff", marginBottom: 12 }}
                />
                <Title level={3} style={{ margin: 0 }}>
                  Welcome
                </Title>
                <Text type="secondary">Profile information</Text>
              </div>

              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Text strong>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Name
                  </Text>
                  <br />
                  <Text>{user.name}</Text>
                </div>

                <div>
                  <Text strong>
                    <MailOutlined style={{ marginRight: 8 }} />
                    Email
                  </Text>
                  <br />
                  <Text>{user.email}</Text>
                </div>

                <div>
                  <Text strong>
                    <SafetyOutlined style={{ marginRight: 8 }} />
                    Role
                  </Text>
                  <br />
                  <Tag color={user.role === "admin" ? "red" : "blue"}>
                    {user.role}
                  </Tag>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
