import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button, Space, message, Row, Col } from 'antd';
import { create, update } from "../api/crud";

const AddVenueDrawer = ({ open, onClose, initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // If editing, populate the form with existing MongoDB data
      // If adding, reset the form fields to empty
      initialData ? form.setFieldsValue(initialData) : form.resetFields();
    }
  }, [open, initialData, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (initialData) {
        // UPDATE: Use 'venue' (singular) to avoid 404 errors
        // Use initialData._id to target the specific MongoDB document
        await update('venue', initialData._id, values);
        message.success('Venue updated successfully');
      } else {
        // CREATE: Use 'venue' (singular) to match backend route
        await create('venue', values);
        message.success('New venue added successfully');
      }
      
      // Refresh the table in the parent component
      if (onSuccess) onSuccess(); 
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
      title={initialData ? "Edit Venue" : "Add New Venue"}
      width={window.innerWidth > 768 ? 520 : '100%'}
      onClose={onClose}
      open={open}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="primary" 
            loading={loading} 
            onClick={() => form.submit()}
          >
            {initialData ? "Update Venue" : "Save Venue"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Field names match your MongoDB schema exactly */}
        <Form.Item name="venueName" label="Venue Name" rules={[{ required: true }]}>
          <Input placeholder="e.g. Gold's Gym" />
        </Form.Item>

        <Form.Item name="venueAddress" label="Full Address" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="venueLocality" label="Locality" rules={[{ required: true }]}>
              <Input placeholder="e.g. BTM Layout" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="venueDistrict" label="District" rules={[{ required: true }]}>
              <Input placeholder="e.g. Bangalore" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="venueState" label="State" rules={[{ required: true }]}>
              <Input placeholder="e.g. Karnataka" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="venueZipcode" label="Zipcode" rules={[{ required: true, len: 6 }]}>
              <Input maxLength={6} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="venueCountry" label="Country" initialValue="India">
          <Input disabled />
        </Form.Item>

        <Form.Item name="venueCoordinates" label="Google Maps URL" rules={[{ required: true }]}>
          <Input placeholder="google.com" />
        </Form.Item>

        <Form.Item name="venueComments" label="Internal Comments">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddVenueDrawer;