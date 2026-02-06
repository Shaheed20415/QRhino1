import React, { useEffect } from 'react';
import { Drawer, Form, Input, Button, Select, Space, message, InputNumber } from 'antd';


const AddUserDrawer = ({ open, onClose, initialData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      initialData ? form.setFieldsValue(initialData) : form.resetFields();
    }
  }, [open, initialData, form]);

  const onFinish = (values) => {
    console.log('User Payload:', values);
    message.success(`User ${initialData ? 'updated' : 'created'} successfully!`);
    onClose();
  };

  return (
    <Drawer
      title={initialData ? "Edit User Profile" : "Register New User"}
      width={window.innerWidth > 768 ? 450 : '100%'}
      onClose={onClose}
      open={open}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={() => form.submit()}>Save User</Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Full Name" >
          <Input placeholder="e.g. Rahul Sharma" />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number" >
          <Input addonBefore="+91" maxLength={10} />
        </Form.Item>

        <Form.Item name="role" label="User Role" initialValue="USER">
          <Select>
            <Select.Option value="USER">Customer (End User)</Select.Option>
            <Select.Option value="AGENT">Marketing Agent</Select.Option>
            <Select.Option value="ADMIN">Super Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="walletBalance" label="Initial Wallet Balance (₹)">
          <InputNumber style={{ width: '100%' }} min={0} defaultValue={0} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddUserDrawer;