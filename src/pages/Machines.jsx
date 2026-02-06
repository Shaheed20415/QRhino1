import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Typography,
  Tag,
  Space,
  Tooltip,
  message,
  Popconfirm,
  Progress,
  Dropdown,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import AddMachineDrawer from "../components/AddMachineDrawer";
import { getAll, remove, update } from "../api/crud";

const { Title } = Typography;

const Machines = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch machines from backend
  const fetchMachines = async () => {
    setLoading(true);
    try {
      const response = await getAll("machine/table-data");
      const list = response.data?.data?.lists || [];
      setMachines(list);
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to load machines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  // 2. Handle Machine Status Change
  const handleStatusChange = async (record, newStatus) => {
    try {
      await update("machine", record._id, { machineStatus: newStatus });
      message.success(`Machine status updated to ${newStatus}`);
      fetchMachines(); // Refresh table to show new status
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  // 3. Delete Machine Logic
  const handleDelete = async (id) => {
    try {
      await remove("machine", id);
      message.success("Machine removed successfully.");
      fetchMachines();
    } catch (error) {
      message.error("Delete failed.");
    }
  };

  const handleEdit = (record) => {
    setEditingMachine(record);
    setDrawerOpen(true);
  };

  const columns = [
    {
      title: "Display ID",
      dataIndex: "displayId",
      key: "displayId",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Machine Name",
      dataIndex: "machineName",
      key: "machineName",
    },
    {
      title: "Locality",
      dataIndex: "venueLocality",
      key: "venueLocality",
      render: (text) => text || "N/A",
    },
    {
      title: "Stock Level",
      key: "stock",
      render: (_, record) => {
        const percent = Math.round(
          (record.machineCurrentStock / record.machineTotalCapacity) * 100
        );
        let status = "normal";
        if (percent < 10) status = "exception";
        else if (percent < 30) status = "active";

        return (
          <Tooltip
            title={`${record.machineCurrentStock} / ${record.machineTotalCapacity} Cups`}
          >
            <Progress percent={percent} size="small" status={status} />
          </Tooltip>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "machineStatus",
      key: "machineStatus",
      render: (status, record) => {
        // Map backend enum to professional AntD tags
        let color = "blue";
        if (status === "Active") color = "green";
        if (status === "Inactive" || status === "Low Stock") color = "volcano";
        if (status === "Under Service") color = "orange";
        if (status === "Power Outage" || status === "Network Outage") color = "red";

        return (
          <Space>
            <Tag color={color}>{status?.toUpperCase()}</Tag>
            <Dropdown
              menu={{
                items: [
                  { key: "Active", label: "Set Active", onClick: () => handleStatusChange(record, "Active") },
                  { key: "Inactive", label: "Set Inactive", onClick: () => handleStatusChange(record, "Inactive") },
                  { key: "Under Service", label: "Maintenance Mode", onClick: () => handleStatusChange(record, "Under Service") },
                ],
              }}
              trigger={["click"]}
            >
              <Tooltip title="Remote Control Status">
                <Button
                  type="text"
                  size="small"
                  icon={<ThunderboltOutlined style={{ color: status === "Active" ? "#52c41a" : "#faad14" }} />}
                />
              </Tooltip>
            </Dropdown>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#1890ff" }} />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Machine"
            description="Warning: This will permanently remove this machine."
            onConfirm={() => handleDelete(record._id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Machine Inventory
        </Title>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchMachines}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingMachine(null);
              setDrawerOpen(true);
            }}
          >
            Add Machine
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={machines}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <AddMachineDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setEditingMachine(null);
        }}
        initialData={editingMachine}
        onSuccess={fetchMachines}
      />
    </>
  );
};

export default Machines;