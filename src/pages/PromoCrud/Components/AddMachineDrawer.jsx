import React, { useEffect, useState } from 'react';
import {
  Drawer,
  Form,
  Input,
  Button,
  Select,
  Space,
  message,
  InputNumber,
  DatePicker,
  Switch,
} from 'antd';

// ✅ SAME API PATTERN AS AddVenueDrawer
import { create, update } from "../../../api/crud";
import dayjs from "dayjs";

const AddMachineDrawer = ({ open, onClose, initialData, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (initialData) {
        form.setFieldsValue({
          ...initialData,
          validFrom: initialData.validFrom
            ? dayjs(initialData.validFrom)
            : null,
          validUntil: initialData.validUntil
            ? dayjs(initialData.validUntil)
            : null,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, initialData, form]);

  // ✅ SAME LOGIC STYLE AS AddVenueDrawer
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        codeValue: values.nickname,
        displayName: values.displayName,
        codeDescription: values.comments,

        discountType: values.discountType,
        discountValue: values.discountValue,
        minimumOrderValue: values.minimumOrderValue,
        usageLimit: values.usageLimit,

        validFrom: values.validFrom
          ? values.validFrom.format("YYYY-MM-DD")
          : undefined,

        validUntil: values.validUntil
          ? values.validUntil.format("YYYY-MM-DD")
          : undefined,

        stackable: values.stackable || false,
        userSpecific: values.userSpecific || false,
        autoApply: values.autoApply || false,

         status: "Active",
      isDeleted: false,
      };

       // REMOVE undefined values (important)
    Object.keys(payload).forEach(
      key => payload[key] === undefined && delete payload[key]
    );

      // 🔥 CREATE or UPDATE (same as venue)
      if (initialData) {
        await update("promo", initialData._id, payload);
        message.success("Promo code updated successfully");
      } else {
        await create("promo", payload);
        message.success("Promo code added successfully");
      }

      if (onSuccess) onSuccess();
      onClose();
      form.resetFields();
    } catch (error) {
      console.error("Promo API Error:", error);
      message.error(initialData ? "Update failed" : "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={initialData ? "Edit Promo Code" : "Add New Promo Code"}
      width={window.innerWidth > 768 ? 450 : "100%"}
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
            {initialData ? "Update Promo" : "Save Promo"}
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Promo Code */}
        <Form.Item name="nickname" label="Code" rules={[{ required: true }]}>
          <Input placeholder="SUMMER25" />
        </Form.Item>

        <Form.Item name="displayName" label="Display Name">
          <Input placeholder="Summer Sale" />
        </Form.Item>

        <Form.Item name="comments" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Discount */}
        <Form.Item name="discountType" label="Discount Type" rules={[{ required: true }]}>
          <Select placeholder="Select discount type">
            <Select.Option value="percentage">Percentage Off</Select.Option>
            <Select.Option value="flat">Flat Amount</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="discountValue" label="Discount Value" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item name="minimumOrderValue" label="Minimum Order Value">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item name="usageLimit" label="Usage Limit">
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        {/* Dates */}
        <Form.Item name="validFrom" label="Valid From">
          <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
        </Form.Item>

        <Form.Item name="validUntil" label="Valid Until">
          <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
        </Form.Item>

        {/* Advanced Options */}
        <Form.Item name="stackable" label="Stackable Code" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="userSpecific" label="User-Specific Code" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item name="autoApply" label="Auto-Apply" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddMachineDrawer;
