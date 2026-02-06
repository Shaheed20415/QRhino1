import React from "react";
import {
  Layout,
  Button,
  Space,
  Badge,
  Avatar,
  Dropdown,
  Typography,
  theme
} from "antd";
import {
  MenuOutlined,
  FullscreenOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const { Header } = Layout;
const { Text } = Typography;

const HeaderBar = ({ onMenuClick }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // back to QR homepage
  };

  const userMenuItems = [
    {
      key: "email",
      label: (
        <Text type="secondary" style={{ cursor: "default" }}>
          {user?.email}
        </Text>
      ),
      disabled: true
    },
    { type: "divider" },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    }
  ];

  return (
    <Header
      style={{
        padding: "0 24px",
        background: token.colorBgContainer,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {/* LEFT SIDE */}
      <Space>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          className="mobile-only"
        />
        <span style={{ fontWeight: 600, fontSize: 18 }}>QRhino</span>
      </Space>

      {/* RIGHT SIDE */}
      <Space size="large">
        <FullscreenOutlined style={{ fontSize: 18, cursor: "pointer" }} />

        <Badge count={5} size="small">
          <BellOutlined style={{ fontSize: 18, cursor: "pointer" }} />
        </Badge>

        <SettingOutlined style={{ fontSize: 18, cursor: "pointer" }} />

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Space style={{ cursor: "pointer", marginLeft: 8 }}>
            <Avatar
              src={user?.photoURL}
              icon={!user?.photoURL && <UserOutlined />}
            />
            <span style={{ fontWeight: 500 }}>
              {user?.displayName || user?.email}
            </span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default HeaderBar;



// import React from "react";
// import { Layout, Avatar, Dropdown, Space, Typography, Button } from "antd";
// import {
//   LogoutOutlined,
//   UserOutlined,
//   BellOutlined,
//   QuestionCircleOutlined
// } from "@ant-design/icons";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const { Header, Content } = Layout;
// const { Text } = Typography;

// const AdminLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const user = auth.currentUser;

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/"); // back to QR homepage
//   };

//   const menuItems = [
//     {
//       key: "email",
//       label: (
//         <Text type="secondary" style={{ cursor: "default" }}>
//           {user?.email}
//         </Text>
//       ),
//       disabled: true
//     },
//     {
//       type: "divider"
//     },
//     {
//       key: "logout",
//       icon: <LogoutOutlined />,
//       label: "Logout",
//       onClick: handleLogout
//     }
//   ];

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* HEADER */}
//       <Header
//         style={{
//           background: "#fff",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "0 24px",
//           borderBottom: "1px solid #f0f0f0"
//         }}
//       >
//         {/* LEFT */}
//         <Text strong style={{ fontSize: 18 }}>
//           QRhino
//         </Text>

        





//         {/* RIGHT */}
//         <Space size="large">
//           <Button type="default">Invite User</Button>

//           <BellOutlined style={{ fontSize: 18 }} />
//           <QuestionCircleOutlined style={{ fontSize: 18 }} />

//           <Dropdown menu={{ items: menuItems }} placement="bottomRight">
//             <Space style={{ cursor: "pointer" }}>
//               <Avatar
//                 src={user?.photoURL}
//                 icon={!user?.photoURL && <UserOutlined />}
//               />
//               <Text>
//                 {user?.displayName || user?.email}
//               </Text>
//             </Space>
//           </Dropdown>
//         </Space>
//       </Header>

//       {/* MAIN CONTENT */}
//       <Content style={{ padding: 24 }}>{children}</Content>
//     </Layout>
//   );
// };

// export default AdminLayout;



// import React from 'react';
// import { Layout, Button, Space, Badge, Avatar, Dropdown, theme } from 'antd';
// import { 
//   MenuOutlined, 
//   FullscreenOutlined, 
//   BellOutlined, 
//   SettingOutlined, 
//   UserOutlined,
//   LogoutOutlined
// } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

// const { Header } = Layout;

// const HeaderBar = ({ onMenuClick }) => {
//   const { token } = theme.useToken();
//   const navigate = useNavigate();

//   const userMenuItems = [
//     { key: 'profile', label: 'My Profile', icon: <UserOutlined /> },
//     { key: 'settings', label: 'Account Settings', icon: <SettingOutlined /> },
//     { type: 'divider' },
//     { 
//       key: 'logout', 
//       label: 'Logout', 
//       icon: <LogoutOutlined />, 
//       danger: true,
//       onClick: () => navigate('/login') 
//     },
//   ];

//   return (
//     <Header style={{ 
//       padding: '0 24px', 
//       background: token.colorBgContainer, 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'space-between',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//       boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
//     }}>
//       <Space>
//         <Button 
//           type="text" 
//           icon={<MenuOutlined />} 
//           onClick={onMenuClick} 
//           className="mobile-only" 
//         />
//         <span style={{ fontWeight: 600, fontSize: '18px' }}>QRhino</span>
//       </Space>

//       <Space size="large">
//         <FullscreenOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        
//         <Badge count={5} size="small">
//           <BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
//         </Badge>
        
//         <SettingOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
        
//         <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
//           <Space style={{ cursor: 'pointer', marginLeft: 8 }}>
//             <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
//             <span style={{ fontWeight: 500 }}>Anirudh Kumaran</span>
//           </Space>
//         </Dropdown>
//       </Space>
//     </Header>
//   );
// };

// export default HeaderBar;