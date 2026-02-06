import React, { useState } from "react";
import {
  Table,
  Typography,
  Space,
  Button,
  Tag,
  QRCode,
  Popconfirm,
  message
} from "antd";
import {
  DownloadOutlined,
  DeleteOutlined,
  EyeOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const MyQRCodes = () => {
  // 🔹 MOCK DATA (replace with API later)
  const [qrs, setQrs] = useState([
    {
      id: "1",
      title: "Website QR",
      type: "URL",
      value: "https://example.com",
      mode: "Static",
      createdAt: "2026-02-01"
    },
    {
      id: "2",
      title: "Contact QR",
      type: "Contact",
      value: "vCard",
      mode: "Dynamic",
      createdAt: "2026-02-02"
    }
  ]);

  const handleDelete = (id) => {
    setQrs((prev) => prev.filter((q) => q.id !== id));
    message.success("QR removed (UI only)");
  };

  const columns = [
    {
      title: "Preview",
      render: (_, record) => <QRCode value={record.value} size={70} />
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Mode",
      dataIndex: "mode",
      render: (mode) =>
        mode === "Dynamic" ? (
          <Tag color="green">Dynamic</Tag>
        ) : (
          <Tag>Static</Tag>
        )
    },
    {
      title: "Created",
      dataIndex: "createdAt"
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} />
          <Button icon={<DownloadOutlined />} />
          <Popconfirm
            title="Delete this QR?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <Title level={4}>My QR Codes</Title>
      <Text type="secondary">
        History of all generated and saved QR codes
      </Text>

      <Table
        style={{ marginTop: 24 }}
        columns={columns}
        dataSource={qrs}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        locale={{ emptyText: "No QR codes generated yet" }}
      />
    </>
  );
};

export default MyQRCodes;
