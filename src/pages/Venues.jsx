import React, { useState, useEffect } from 'react';
import { Table, Button, Typography, Space, Popconfirm, message } from 'antd';
import { PlusOutlined, EnvironmentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddVenueDrawer from '../components/AddVenueDrawer';
import { getAll, remove } from "../api/crud";

const { Title } = Typography;

const Venues = () => {
  const [open, setOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  /**
   * Fetches venues using the 'venue' endpoint to match 
   * the backend app.use("/venue", ...) route.
   */
  const fetchVenues = async () => {
    setLoading(true);
    try {
      const response = await getAll('venue'); 
      
      /**
       * Backend structure: { status: "success", data: { lists: [...] } }
       * Extracting the list array to prevent the "rawData.some" error.
       */
      const venueList = response.data?.data?.lists || []; 
      setVenues(venueList);
    } catch (error) {
      console.error("Fetch Error:", error);
      message.error("Failed to fetch venues from the database.");
      setVenues([]); 
    } finally {
      setLoading(false);
    }
  };

  /**
   * Triggers initial data load on component mount.
   */
  useEffect(() => {
    fetchVenues();
  }, []);

  /**
   * Handles deletion using the MongoDB _id.
   */
  const handleDelete = async (id) => {
    try {
      await remove('venue', id); 
      message.success("Venue deleted successfully.");
      fetchVenues(); // Refresh the list
    } catch (error) {
      console.error("Delete Error:", error);
      message.error("Delete operation failed.");
    }
  };

  const columns = [
    { 
      title: 'Venue Name', 
      dataIndex: 'venueName', // Matches "venueName" in MongoDB
      key: 'venueName', 
      render: (text) => <b>{text}</b> 
    },
    { 
      title: 'Locality', 
      dataIndex: 'venueLocality', // Matches "venueLocality" in MongoDB
      key: 'venueLocality' 
    },
    { 
      title: 'City/District', 
      dataIndex: 'venueDistrict', // Matches "venueDistrict" in MongoDB
      key: 'venueDistrict' 
    },
    { 
      title: 'Maps', 
      key: 'map', 
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EnvironmentOutlined />} 
          href={record.venueCoordinates?.startsWith('http') ? record.venueCoordinates : `https://${record.venueCoordinates}`} 
          target="_blank"
        >
          View
        </Button>
      ) 
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: '#1890ff' }} />} 
            onClick={() => { setEditingVenue(record); setOpen(true); }} 
          />
          <Popconfirm
            title="Delete Venue"
            description="Are you sure you want to delete this venue?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0 }}>Venues & Locations</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => { setEditingVenue(null); setOpen(true); }}
        >
          Add Venue
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={venues} 
        loading={loading}
        rowKey="_id" // Uses MongoDB's unique ID as the key
        locale={{ emptyText: 'No venues found in database.' }} 
      />
      
      <AddVenueDrawer 
        open={open} 
        onClose={() => { setOpen(false); setEditingVenue(null); }} 
        initialData={editingVenue}
        onSuccess={fetchVenues} // Callback to refresh table after Add/Edit
      />
    </div>
  );
};

export default Venues;