import React, { useState } from 'react';
import { Table, Button, Typography, Tag, Space, Input } from 'antd';
import { UserAddOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import AddUserDrawer from '../components/AddUserDrawer';

const { Title } = Typography;

const Users = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { title: 'Customer Name', dataIndex: 'name', key: 'name' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { 
      title: 'Subscription', 
      dataIndex: 'subscriptionStatus', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { 
      title: 'Wallet', 
      dataIndex: 'walletBalance', 
      key: 'wallet',
      render: (val) => `₹${val}` 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<EditOutlined />} 
          onClick={() => { setSelectedUser(record); setOpen(true); }} 
        />
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>User Management</Title>
        <Space>
          <Input prefix={<SearchOutlined />} placeholder="Search users..." />
          <Button type="primary" icon={<UserAddOutlined />} onClick={() => { setSelectedUser(null); setOpen(true); }}>
            Add User
          </Button>
        </Space>
      </div>

      <Table columns={columns} dataSource={[]} locale={{ emptyText: 'No users found.' }} />
      <AddUserDrawer open={open} onClose={() => setOpen(false)} initialData={selectedUser} />
    </div>
  );
};

export default Users;