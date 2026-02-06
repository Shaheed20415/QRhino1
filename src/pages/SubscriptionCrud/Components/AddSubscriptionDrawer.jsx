import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  Space,
  InputNumber,
  message
} from "antd";

import { create, update } from "../../../api/crud";

// 🔥 SAME userId used everywhere
const USER_ID = "65a123456789abcd12345677";

const AddSubscriptionDrawer = ({ open, onClose, initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialData, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        createdBy: USER_ID
      };

      if (initialData) {
        await update("subscription", initialData._id, payload);
        message.success("Subscription updated");
      } else {
        await create("subscription", payload);
        message.success("Subscription created");
      }

      onSuccess();
      onClose();
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={initialData ? "Edit Subscription" : "Add Subscription"}
      width={450}
      open={open}
      onClose={onClose}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={() => form.submit()}>
            {initialData ? "Update" : "Save"}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          name="planTitle"
          label="Plan Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Silver / Gold" />
        </Form.Item>

        <Form.Item name="planDescription" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="planType"
          label="Plan Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select plan type">
            <Select.Option value="monthly">Monthly</Select.Option>
            <Select.Option value="yearly">Yearly</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="actualPrice"
          label="Price"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="planStatus"
          label="Status"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddSubscriptionDrawer;


