import React from "react";
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Typography, 
  Table, 
  Tag, 
  Button,
  Progress 
} from "antd";
import {
  QrcodeOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  RiseOutlined,
  CrownOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard = () => {
  // 🔹 Mock data (replace with API later)
  const stats = {
    totalQrs: 28,
    dynamicQrs: 9,
    totalScans: 1246,
    activeQrs: 21
  };

  const recentQrs = [
    {
      key: "1",
      title: "Website QR",
      type: "URL",
      mode: "Static",
      scans: 120,
      status: "Active"
    },
    {
      key: "2",
      title: "Campaign QR",
      type: "Multi-URL",
      mode: "Dynamic",
      scans: 540,
      status: "Active"
    },
    {
      key: "3",
      title: "Flyer QR",
      type: "PDF",
      mode: "Static",
      scans: 32,
      status: "Paused"
    }
  ];

  const columns = [
    { title: "QR Name", dataIndex: "title" },
    { title: "Type", dataIndex: "type" },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (m) =>
        m === "Dynamic" ? <Tag color="green">Dynamic</Tag> : <Tag>Static</Tag>
    },
    {
      title: "Scans",
      dataIndex: "scans",
      render: (v) => <b>{v}</b>
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) =>
        s === "Active" ? (
          <Tag color="blue">Active</Tag>
        ) : (
          <Tag color="default">Paused</Tag>
        )
    }
  ];

  return (
    <div style={{ padding: 16 }}>
      <Title level={4}>Dashboard</Title>
      <Text type="secondary">
        Overview of your QR code performance
      </Text>

      {/* 🔹 KPI CARDS */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total QR Codes"
              value={stats.totalQrs}
              prefix={<QrcodeOutlined style={{ color: "#1677ff" }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Dynamic QR Codes"
              value={stats.dynamicQrs}
              prefix={<ThunderboltOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Total Scans"
              value={stats.totalScans}
              prefix={<EyeOutlined style={{ color: "#faad14" }} />}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic
              title="Active QR Codes"
              value={stats.activeQrs}
              prefix={<RiseOutlined style={{ color: "#722ed1" }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* 🔹 SCAN GROWTH */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Scan Performance">
            <Text>Total scans this month</Text>
            <Progress percent={72} status="active" />
            <Text type="secondary">
              You are performing better than 68% of users
            </Text>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            style={{ 
              background: "linear-gradient(135deg,#1677ff,#69b1ff)",
              color: "#fff"
            }}
          >
            <CrownOutlined style={{ fontSize: 28 }} />
            <Title level={4} style={{ color: "#fff" }}>
              Upgrade to Pro
            </Title>
            <Text style={{ color: "#e6f4ff" }}>
              Track scans, edit links & remove watermark
            </Text>
            <br />
            <Button 
              style={{ marginTop: 16 }} 
              type="primary"
            >
              Upgrade Now
            </Button>
          </Card>
        </Col>
      </Row>

      {/* 🔹 RECENT QR ACTIVITY */}
      <Card
        title="Recent QR Codes"
        style={{ marginTop: 24 }}
      >
        <Table
          columns={columns}
          dataSource={recentQrs}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Dashboard;



// import React from 'react';
// import { Row, Col, Card, Statistic, Typography } from 'antd';
// import { 
//   ShopOutlined, 
//   UserOutlined, 
//   ThunderboltOutlined, 
//   AlertOutlined 
// } from '@ant-design/icons';

// const { Title } = Typography;

// const Dashboard = () => {
//   return (
//     <div style={{ padding: '12px' }}>
//       <Title level={4} style={{ marginBottom: 24 }}>System Overview</Title>
      
//       <Row gutter={[16, 16]}>
//         <Col xs={24} sm={12} lg={6}>
//           <Card bordered={false} hoverable>
//             <Statistic
//               title="Total Machines"
//               value={12}
//               prefix={<ShopOutlined style={{ color: '#1890ff' }} />}
//             />
//           </Card>
//         </Col>
        
//         <Col xs={24} sm={12} lg={6}>
//           <Card bordered={false} hoverable>
//             <Statistic
//               title="Active Users"
//               value={456}
//               prefix={<UserOutlined style={{ color: '#52c41a' }} />}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card bordered={false} hoverable>
//             <Statistic
//               title="Total Shakes Dispensed"
//               value={1234}
//               prefix={<ThunderboltOutlined style={{ color: '#faad14' }} />}
//             />
//           </Card>
//         </Col>

//         <Col xs={24} sm={12} lg={6}>
//           <Card bordered={false} hoverable>
//             <Statistic
//               title="Attention Required"
//               value={2}
//               valueStyle={{ color: '#cf1322' }}
//               prefix={<AlertOutlined />}
//               suffix="Units"
//             />
//           </Card>
//         </Col>
//       </Row>

//       {/* Placeholder for future Analytics Charts */}
//       <Card title="Consumption Trends" style={{ marginTop: 24 }} bordered={false}>
//         <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', borderRadius: 8, border: '1px dashed #d9d9d9' }}>
//           Interactive Infographics Coming Soon
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Dashboard;