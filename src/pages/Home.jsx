import React, { useState } from "react";
import {
  Layout,
  Typography,
  Button,
  Card,
  Row,
  Col,
  QRCode,
  Space
} from "antd";
import {
  GoogleOutlined,
  QrcodeOutlined,
  SafetyOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const QRHome = () => {
  const navigate = useNavigate();
  const [previewValue] = useState("https://yourwebsite.com");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User:",result)
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* NAVBAR */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          QRhino
        </Title>
        <Button
          type="primary"
          icon={<GoogleOutlined />}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
      </Header>

      {/* HERO */}
      <Content
        style={{
          padding: "60px 40px",
          background: "linear-gradient(135deg, #006d75, #08979c)"
        }}
      >
        <Row gutter={48} align="middle">
          {/* LEFT */}
          <Col xs={24} md={12}>
            <Title style={{ color: "#fff" }}>
              Create your free QR Codes
            </Title>
            <Paragraph style={{ color: "#e6fffb", fontSize: 16 }}>
              Static QR codes are free forever.  
              Sign in to manage, edit, and track your QR codes.
            </Paragraph>

            <Space size="large" style={{ marginTop: 24 }}>
              <Button
                size="large"
                type="primary"
                icon={<GoogleOutlined />}
                onClick={handleGoogleLogin}
              >
                Get Started Free
              </Button>
            </Space>
          </Col>

          {/* RIGHT */}
          <Col xs={24} md={12}>
            <Card style={{ textAlign: "center" }}>
              <QRCode value={previewValue} size={220} />
              <Text type="secondary" style={{ display: "block", marginTop: 12 }}>
                Live QR Preview
              </Text>
            </Card>
          </Col>
        </Row>

        {/* FEATURES */}
        <Row gutter={24} style={{ marginTop: 80 }}>
          <Col md={8}>
            <Card>
              <QrcodeOutlined style={{ fontSize: 32, color: "#13c2c2" }} />
              <Title level={5}>Unlimited QR Codes</Title>
              <Text>Create static QR codes without limits.</Text>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <BarChartOutlined style={{ fontSize: 32, color: "#13c2c2" }} />
              <Title level={5}>Analytics Ready</Title>
              <Text>Track scans, locations and devices.</Text>
            </Card>
          </Col>

          <Col md={8}>
            <Card>
              <SafetyOutlined style={{ fontSize: 32, color: "#13c2c2" }} />
              <Title level={5}>Secure & Reliable</Title>
              <Text>Google authentication with session persistence.</Text>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default QRHome;
