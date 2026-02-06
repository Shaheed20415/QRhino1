import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { 
  DashboardOutlined, 
  ShopOutlined, 
  UserOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  GiftOutlined,
  ExperimentOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderBar from './HeaderBar';

const { Content, Sider } = Layout;

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },

    { key: '/QRGenerator', icon: <ShopOutlined />, label: 'QRGenerator' },
    {key: '/my-qrs',icon: <ShopOutlined />,label: 'MyQRCodes'},

    { key: '/users', icon: <UserOutlined />, label: 'Users' },
    //{ key: '/venues', icon: <EnvironmentOutlined />, label: 'Venues' },
    //{ key: '/subscriptions', icon: <CreditCardOutlined />, label: 'Subscriptions' },
    //{ key: '/promo-codes', icon: <GiftOutlined />, label: 'Promo Codes' },
    //{ key: '/ingredients', icon: <ExperimentOutlined />, label: 'Ingredients' },
    //{ key: '/agents', icon: <TeamOutlined />, label: 'Agents' },
    { key: '/transactions', icon: <ThunderboltOutlined />, label: 'Transactions' },
    { key: '/analytics', icon: <BarChartOutlined />, label: 'Analytics' },
    { key: '/reports', icon: <FileTextOutlined />, label: 'Reports' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  const [qrs, setQrs] = useState([]);

const addQR = (qr) => {
  setQrs((prev) => [...prev, qr]);
};


  return (
    <Layout style={{ minHeight: '100vh', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0" 
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1001,
        }}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
          QR Code
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]} 
          items={menuItems} 
          onClick={({ key }) => {
            navigate(key);
            if (window.innerWidth < 992) setCollapsed(true); // Close on mobile after click
          }} 
        />
      </Sider>
      <Layout style={{ 
        marginLeft: collapsed ? 0 : 220, 
        transition: 'margin-left 0.2s',
        minHeight: '100vh',
        width: '100%'
      }}>
        <HeaderBar onMenuClick={() => setCollapsed(!collapsed)} />
        
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: colorBgContainer, 
          borderRadius: borderRadiusLG,
          overflowX: 'auto'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;