import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.api';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await loginUser(values.email, values.password);
      
      if (result.status === "success") {
        message.success(result.message || 'Login Successful!');
        // In a real app, you would save a token here: 
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('userFirstName', result.data.user.firstName);
        localStorage.setItem('userLastName', result.data.user.lastName);
        localStorage.setItem('userEmail', result.data.user.email);
        navigate('/dashboard'); 
      } else {
        message.error('Invalid credentials');
      }
    } catch (err) {
      message.error(err.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f2f5' }}>
      <Card style={{ width: 400, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={2} style={{ color: '#1890ff', margin: 0 }}>DEN Admin</Title>
          <Text type="secondary">Sign in with your admin credentials</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item 
            name="email" 
            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@test.com" size="large" />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="admin@123" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;