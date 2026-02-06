import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Select, Space, message, InputNumber } from 'antd';
import { create, update, getAll } from "../api/crud";

const AddMachineDrawer = ({ open, onClose, initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);

  // Fetch real venues for the dropdown selection
  useEffect(() => {
    if (open) {
      const fetchVenues = async () => {
        try {
          // Use 'venue' singular as per your server configuration
          const response = await getAll('venue');
          setVenues(response.data?.data?.lists || []);
        } catch (err) {
          console.error("Failed to load venues", err);
        }
      };
      fetchVenues();
      
      // Populate form if editing, else reset
      initialData ? form.setFieldsValue(initialData) : form.resetFields();
    }
  }, [open, initialData, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (initialData) {
        // Update logic using 'machine' resource
        await update('machine', initialData._id, values);
        message.success('Machine updated successfully!');
      } else {
        // Create logic using 'machine' resource
        await create('machine', values);
        message.success('New machine added successfully!');
      }
      if (onSuccess) onSuccess(); // Refresh table data
      onClose();
    } catch (error) {
      console.error("API Error:", error);
      message.error(initialData ? 'Update failed' : 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={initialData ? "Edit Machine Settings" : "Add New Machine"}
      width={window.innerWidth > 768 ? 500 : '100%'}
      onClose={onClose}
      open={open}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={() => form.submit()}>
            {initialData ? "Update Changes" : "Save Machine"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Field: machineName matches backend String */}
        <Form.Item name="machineName" label="Machine Name" rules={[{ required: true }]}>
          <Input placeholder="e.g. Gym-Center-Main" />
        </Form.Item>

        {/* Field: machineLocation matches mongoose.Schema.Types.ObjectId */}
        <Form.Item name="machineLocation" label="Assign to Venue" rules={[{ required: true }]}>
          <Select placeholder="Select a location">
            {venues.map(venue => (
              <Select.Option key={venue._id} value={venue._id}>
                {venue.venueName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Field: machineTotalCapacity matches backend Number */}
        <Form.Item name="machineTotalCapacity" label="Total Cup Capacity" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        {/* Field: machineCurrentStock matches backend Number */}
        <Form.Item name="machineCurrentStock" label="Initial Stock Level" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        {/* Field: displayId matches backend String */}
        <Form.Item name="displayId" label="Machine Display ID" rules={[{ required: true }]}>
          <Input placeholder="e.g. MH-001" />
        </Form.Item>

        <Form.Item name="machineComments" label="Technical Notes">
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddMachineDrawer;