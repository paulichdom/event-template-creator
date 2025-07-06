import { useState } from "react";
import { Layout, Button, Typography, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TemplateModal } from "../TemplateModal/TemplateModal";
import { TemplateList } from "../TemplateList/TemplateList";
import { Template, TemplateFormValues } from "../../types/template";
import { TemplateFormContent } from "../TemplateFormContent/TemplateFormContent";
import { mockTemplates } from "../../data/mockTemplates";
import "./MainScreen.css";

const { Header, Content } = Layout;
const { Title } = Typography;

export const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = (template: Template | null = null) => {
    if (template) {
      console.log("Showing modal to edit:", template.templateName);
      form.setFieldsValue(template as TemplateFormValues); // Pre-fill form for editing, now template conforms to form values
    } else {
      console.log("Showing modal to create a new template.");
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log("Modal cancelled.");
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values: TemplateFormValues) => {
    console.log("Form submitted with values:", values);
    handleCancel(); // Close the modal after submission
  };

  const handleDelete = (id: string) => {
    console.log("Attempting to delete template with id:", id);
  };

  const handleUseTemplate = (template: Template) => {
    console.log("Attempting to use template:", template.templateName);
  };

  return (
    <Layout className="layout-container">
      <Header className="header">
        <Title level={4} style={{ color: "white", margin: 0 }}>
          Event Templates
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          New
        </Button>
      </Header>
      <Content className="content">
        <TemplateList
          mockTemplates={mockTemplates}
          handleDelete={handleDelete}
          handleUseTemplate={handleUseTemplate}
          showModal={showModal}
        />
      </Content>
      <TemplateModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        form={form}
      >
        <TemplateFormContent form={form} onFinish={handleFormSubmit} />
      </TemplateModal>
    </Layout>
  );
};
