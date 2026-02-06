import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Tag, Space, Tooltip, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddMachineDrawer from './Components/AddMachineDrawer';

// ✅ API
import { getAll, remove } from "../../api/crud";

const { Title } = Typography;

const Machines = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH PROMO CODES
  const fetchPromoCodes = async () => {
    setLoading(true);
    try {
      const res = await getAll("promo");
      setPromoCodes(res?.data?.data?.lists || res?.data || []);
    } catch (err) {
      message.error("Failed to load promo codes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const handleEdit = (record) => {
    setEditingMachine(record);
    setDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove("promo", id);
      message.success("Promo code deleted");
      fetchPromoCodes();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: 'CODE NAME',
      dataIndex: 'codeValue',
      key: 'codeValue',
    },
    {
      title: 'DISCOUNT',
      render: (_, record) =>
        record.discountType === "percentage"
          ? `${record.discountValue}%`
          : `₹${record.discountValue}`,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'validUntil',
      render: (date) => date || "--",
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status?.toUpperCase() === "ACTIVE" ? "green" : "volcano"}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "#1890ff" }} />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Delete this promo code?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={4}>PromoCode Management</Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingMachine(null);
            setDrawerOpen(true);
          }}
        >
          Add Promo Code
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={promoCodes}
        loading={loading}
      />

      <AddMachineDrawer
        open={drawerOpen}
        initialData={editingMachine}
        onClose={() => {
          setDrawerOpen(false);
          setEditingMachine(null);
        }}
        onSuccess={fetchPromoCodes}   // 🔥 REFRESH AFTER SAVE
      />
    </>
  );
};

export default Machines;



// import React, { useState } from 'react';
// import { Table, Button, Typography, Tag, Space, Tooltip } from 'antd';
// import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import AddMachineDrawer from './Components/AddMachineDrawer';

// const { Title } = Typography;

// const Machines = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editingMachine, setEditingMachine] = useState(null);

//   // Mock data to test the Edit flow
//   const mockData = [
//     { 
//       id: 'SUMMER25', 
//       nickname: '25%', 
//       nick:'Aug 31, 2026',
//       venueId: 'v1', 
//       totalCapacity: 300, 
//       currentStock: 150, 
//       status: 'ACTIVE' 
//     }
//   ];

//   const handleEdit = (record) => {
//     setEditingMachine(record);
//     setDrawerOpen(true);
//   };

//   const columns = [
//     { title: 'CODE NAME', dataIndex: 'id', key: 'id' },
//     { title: 'DISCOUNT', dataIndex: 'nickname', key: 'nickname' },
//      { title: 'Expiry Date', dataIndex: 'nick', key: 'nick' },
//     { 
//       title: 'Status', 
//       dataIndex: 'status', 
//       key: 'status',
//       render: (status) => <Tag color={status === 'ACTIVE' ? 'green' : 'volcano'}>{status}</Tag>
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Tooltip title="Edit">
//             <Button 
//               type="text" 
//               icon={<EditOutlined style={{color: '#1890ff'}} />} 
//               onClick={() => handleEdit(record)} 
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Button 
//               type="text" 
//               danger 
//               icon={<DeleteOutlined />} 
//               onClick={() => console.log('Delete', record.id)} 
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
//         <Title level={4} style={{ margin: 0 }}>PromoCode Management</Title>
//         <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingMachine(null); setDrawerOpen(true); }}>
//           Add Promo Code
//         </Button>
//       </div>

//       <Table columns={columns} dataSource={mockData} rowKey="id" />
      
//       <AddMachineDrawer 
//         open={drawerOpen} 
//         onClose={() => { setDrawerOpen(false); setEditingMachine(null); }} 
//         initialData={editingMachine} // Pass the data to the drawer
//       />
//     </>
//   );
// };

// export default Machines;