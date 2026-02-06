import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Typography,
  Tag,
  Space,
  Tooltip,
  message,
  Popconfirm
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddSubscriptionDrawer from "./Components/AddSubscriptionDrawer";

//import { getSubscriptionsByUser, remove } from "../../api/crud";
import { getAll, remove } from "../../api/crud";
const { Title } = Typography;

// 🔥 SAME ID USED IN POSTMAN (createdBy)
const USER_ID = "65a123456789abcd12345677";

const SubscriptionCrud = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const res = await getAll("subscription");
      setSubscriptions(res.data.data || []);
    } catch (err) {
      message.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleEdit = (record) => {
    setEditingSubscription(record);
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove("subscription", id);
      message.success("Subscription deleted");
      fetchSubscriptions();
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    { title: "PLAN", dataIndex: "planTitle" },
    { title: "TYPE", dataIndex: "planType", render: v => <Tag>{v}</Tag> },
    { title: "PRICE", dataIndex: "actualPrice", render: v => `₹${v}` },
    {
      title: "STATUS",
      dataIndex: "planStatus",
      render: s => (
        <Tag color={s === "active" ? "green" : "volcano"}>
          {s?.toUpperCase()}
        </Tag>
      )
    },
    {
      title: "ACTION",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Popconfirm title="Delete subscription?" onConfirm={() => handleDelete(record._id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <Title level={4}>Subscription Management</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>
          Add Subscription
        </Button>
      </div>

      <Table rowKey="_id" columns={columns} dataSource={subscriptions} loading={loading} />

      <AddSubscriptionDrawer
        open={drawerOpen}
        initialData={editingSubscription}
        onClose={() => {
          setDrawerOpen(false);
          setEditingSubscription(null);
        }}
        onSuccess={fetchSubscriptions}
      />
    </>
  );
};

export default SubscriptionCrud;


