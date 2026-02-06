import React, { useState } from "react";
import {
  Layout,
  Card,
  Tabs,
  Input,
  Typography,
  Row,
  Col,
  QRCode,
  Switch,
  Button,
  Space,
  Divider,
  Tooltip,
  Drawer,
  Form,
  message
} from "antd";
import {
  LinkOutlined,
  FilePdfOutlined,
  BranchesOutlined,
  ContactsOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  DownloadOutlined,
  SaveOutlined,
  CopyOutlined,
  BgColorsOutlined,
  PictureOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const QRGenerator = ({ addQR }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState("https://example.com");
  const [isDynamic, setIsDynamic] = useState(false);
  const [trackScans, setTrackScans] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [form] = Form.useForm();

  const tabs = [
    { key: "url", label: "URL", icon: <LinkOutlined /> },
    { key: "pdf", label: "PDF", icon: <FilePdfOutlined /> },
    { key: "multi", label: "Multi-URL", icon: <BranchesOutlined /> },
    { key: "contact", label: "Contact", icon: <ContactsOutlined /> },
    { key: "text", label: "Plain Text", icon: <FileTextOutlined /> },
    { key: "app", label: "App", icon: <AppstoreOutlined /> },
    { key: "sms", label: "SMS", icon: <MessageOutlined /> },
    { key: "email", label: "Email", icon: <MailOutlined /> },
    { key: "phone", label: "Phone", icon: <PhoneOutlined /> }
  ];

  // 🔹 Save from drawer
  const handleSaveQR = () => {
    const data = form.getFieldsValue();

    const newQR = {
      id: Date.now().toString(),
      title: data.title,
      type: "URL",
      value,
      mode: isDynamic ? "Dynamic" : "Static",
      createdAt: new Date().toISOString().split("T")[0]
    };

    addQR(newQR);
    message.success("QR saved successfully");
    setDrawerOpen(false);
    navigate("/my-qrcodes");
  };

  // 🔹 Download QR
  const downloadQR = () => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Content style={{ padding: 32 }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <Title level={2}>Create your free QR Code</Title>
        <Text type="secondary">
          Static QR codes are free forever. Upgrade for tracking and editing.
        </Text>
      </div>

      <Card
        style={{ borderRadius: 16, background: "#ebdba4" }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={32}>
          {/* LEFT */}
          <Col xs={24} md={14}>
            <Tabs
              defaultActiveKey="url"
              items={tabs.map((t) => ({
                key: t.key,
                label: (
                  <Space>
                    {t.icon}
                    {t.label}
                  </Space>
                ),
                children: (
                  <>
                    <Title level={5}>Redirect to an existing web URL</Title>
                    <Input
                      size="large"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    <Text type="secondary">
                      Try something like https://example.com/
                    </Text>
                  </>
                )
              }))}
            />

            <Divider />

            <Space size="large">
              <Space>
                <Switch checked={trackScans} onChange={setTrackScans} />
                <Text>Track your scans ✨</Text>
              </Space>
            </Space>

            <Divider />

            <Space>
              <Button icon={<BgColorsOutlined />}>Design & Color</Button>
              <Button icon={<PictureOutlined />}>Add Logo</Button>
              <Button>Frames & CTA</Button>
            </Space>
          </Col>

          {/* RIGHT */}
          <Col xs={24} md={10}>
            <Card>
              <QRCode value={value} size={220} />
              <Text type="secondary">
                {isDynamic ? "Dynamic QR" : "Static QR (Free)"}
              </Text>
            </Card>

            <Space style={{ marginTop: 16 }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => setDrawerOpen(true)}
              >
                Save
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={downloadQR}
              />
            </Space>

            <Divider />

            <Space>
              <Text>Static</Text>
              <Switch checked={isDynamic} onChange={setIsDynamic} />
              <Text>Dynamic</Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 🔹 SAVE DRAWER */}
      <Drawer
        title="Save QR Code"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={360}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="QR Title"
            name="title"
            rules={[{ required: true, message: "Enter QR name" }]}
          >
            <Input placeholder="YouTube QR" />
          </Form.Item>

          <Form.Item label="Mode">
            <Text>{isDynamic ? "Dynamic" : "Static"}</Text>
          </Form.Item>

          <Button
            type="primary"
            block
            onClick={handleSaveQR}
          >
            Save QR
          </Button>
        </Form>
      </Drawer>
    </Content>
  );
};

export default QRGenerator;



// import React, { useState } from "react";
// import {
//   Layout,
//   Card,
//   Tabs,
//   Input,
//   Typography,
//   Row,
//   Col,
//   QRCode,
//   Switch,
//   Button,
//   Space,
//   Divider,
//   Tooltip
// } from "antd";
// import {
//   LinkOutlined,
//   FilePdfOutlined,
//   BranchesOutlined,
//   ContactsOutlined,
//   FileTextOutlined,
//   AppstoreOutlined,
//   MessageOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   DownloadOutlined,
//   SaveOutlined,
//   CopyOutlined,
//   BgColorsOutlined,
//   PictureOutlined
// } from "@ant-design/icons";

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const QRGenerator = () => {
//   const [value, setValue] = useState("https://example.com");
//   const [isDynamic, setIsDynamic] = useState(false);
//   const [trackScans, setTrackScans] = useState(false);
//   const [removeWatermark, setRemoveWatermark] = useState(false);

//   const tabs = [
//     { key: "url", label: "URL", icon: <LinkOutlined /> },
//     { key: "pdf", label: "PDF", icon: <FilePdfOutlined /> },
//     { key: "multi", label: "Multi-URL", icon: <BranchesOutlined /> },
//     { key: "contact", label: "Contact", icon: <ContactsOutlined /> },
//     { key: "text", label: "Plain Text", icon: <FileTextOutlined /> },
//     { key: "app", label: "App", icon: <AppstoreOutlined /> },
//     { key: "sms", label: "SMS", icon: <MessageOutlined /> },
//     { key: "email", label: "Email", icon: <MailOutlined /> },
//     { key: "phone", label: "Phone", icon: <PhoneOutlined /> }
//   ];

//   return (
//     <Content style={{ padding: 32 }}>
//       {/* PAGE HEADER */}
//       <div style={{ textAlign: "center", marginBottom: 32 }}>
//         <Title level={2}>Create your free QR Code</Title>
//         <Text type="secondary">
//           Static QR codes are free forever. Upgrade for tracking and editing.
//         </Text>
//       </div>

//       {/* MAIN CARD */}
//       <Card
//         style={{
//           borderRadius: 16,
//           background: "#ebdba4",
//           color: "#fff"
//         }}
//         bodyStyle={{ padding: 24 }}
//       >
//         <Row gutter={32}>
//           {/* LEFT CONFIG */}
//           <Col xs={24} md={14}>
//             <Tabs
//               defaultActiveKey="url"
//               tabPosition="top"
//               items={tabs.map((t) => ({
//                 key: t.key,
//                 label: (
//                   <Space>
//                     {t.icon}
//                     {t.label}
//                   </Space>
//                 ),
//                 children: (
//                   <>
//                     <Title level={5} style={{ color: "#fff" }}>
//                       Redirect to an existing web URL
//                     </Title>
//                     <Input
//                       size="large"
//                       placeholder="Enter URL"
//                       value={value}
//                       onChange={(e) => setValue(e.target.value)}
//                     />
//                     <Text type="secondary">
//                       Try something like https://example.com/
//                     </Text>
//                   </>
//                 )
//               }))}
//             />

//             <Divider style={{ borderColor: "#333" }} />

//             {/* OPTIONS */}
//             <Space size="large">
//               <Space>
//                 <Switch checked={trackScans} onChange={setTrackScans} />
//                 <Text style={{ color: "#fff" }}>Track your scans ✨</Text>
//               </Space>

//               <Space>
//                 <Switch
//                   checked={removeWatermark}
//                   onChange={setRemoveWatermark}
//                 />
//                 <Text style={{ color: "#fff" }}>
//                   Remove watermark ✨
//                 </Text>
//               </Space>
//             </Space>

//             <Divider style={{ borderColor: "#10c91a" }} />

//             {/* DESIGN OPTIONS (UI ONLY) */}
//             <Space size="middle">
//               <Button icon={<BgColorsOutlined />}>Design & Color</Button>
//               <Button icon={<PictureOutlined />}>Add Logo</Button>
//               <Button>Frames & CTA</Button>
//             </Space>
//           </Col>

//           {/* RIGHT PREVIEW */}
//           <Col xs={24} md={10}>
//             <div style={{ textAlign: "center" }}>
//               <Text style={{ color: "#fff" }}>
//                 To enable tracking,{" "}
//                 <u style={{ cursor: "pointer" }}>
//                   create a Dynamic QR Code
//                 </u>
//               </Text>

//               <Card
//                 style={{
//                   marginTop: 16,
//                   borderRadius: 12,
//                   background: "#fff"
//                 }}
//               >
//                 <QRCode value={value} size={220} />
//                 <Text type="secondary" style={{ display: "block" }}>
//                   {isDynamic ? "Dynamic QR" : "Static QR (Free)"}
//                 </Text>
//               </Card>

//               {/* ACTIONS */}
//               <Space style={{ marginTop: 16 }}>
//                 <Button
//                   type="primary"
//                   size="large"
//                   icon={<SaveOutlined />}
//                 >
//                   Save
//                 </Button>
//                 <Tooltip title="Download PNG">
//                   <Button icon={<DownloadOutlined />} />
//                 </Tooltip>
//                 <Tooltip title="Copy QR">
//                   <Button icon={<CopyOutlined />} />
//                 </Tooltip>
//               </Space>

//               <Divider />

//               <Space>
//                 <Text style={{ color: "#fff" }}>Static</Text>
//                 <Switch checked={isDynamic} onChange={setIsDynamic} />
//                 <Text style={{ color: "#fff" }}>Dynamic</Text>
//               </Space>
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     </Content>
//   );
// };

// export default QRGenerator;
