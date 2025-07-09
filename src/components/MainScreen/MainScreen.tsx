import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TemplateModal } from "../TemplateModal/TemplateModal";
import { TemplateList } from "../TemplateList/TemplateList";
import { Template, TemplateFormValues } from "../../types/template";
import { TemplateFormContent } from "../TemplateFormContent/TemplateFormContent";
import { mockTemplates } from "../../data/mockTemplates";
import "./MainScreen.css";

export const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<TemplateFormValues | null>(null);

  const formRef = useRef<{ setFieldsValue: (values: TemplateFormValues) => void; resetFields: () => void; submit: () => void }>({
    setFieldsValue: (values: TemplateFormValues) => {
      setCurrentTemplate(values);
    },
    resetFields: () => {
      setCurrentTemplate(null);
    },
    submit: () => {
      // This will be called from TemplateModal, and handleFormSubmit will be triggered by the native form submit event in TemplateFormContent
    },
  });

  const showModal = (template: Template | null = null) => {
    if (template) {
      console.log("Showing modal to edit:", template.templateName);
      formRef.current.setFieldsValue(template as TemplateFormValues); // Pre-fill form for editing
    } else {
      console.log("Showing modal to create a new template.");
      formRef.current.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log("Modal cancelled.");
    setIsModalVisible(false);
    formRef.current.resetFields();
  };

  const handleFormSubmit = (values: TemplateFormValues) => {
    console.log("Form submitted with values:", values);
    // In a real application, you would save/update the template here
    handleCancel(); // Close the modal after submission
  };

  const handleDelete = (id: string) => {
    console.log("Attempting to delete template with id:", id);
    // In a real application, you would delete the template here
  };

  const handleUseTemplate = (template: Template) => {
    console.log("Attempting to use template:", template.templateName);
    // In a real application, you would use the template here
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="header">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Templates
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => showModal()}
          >
            New
          </Button>
        </Toolbar>
      </AppBar>
      <Container className="content" sx={{ mt: 4 }}>
        <TemplateList
          mockTemplates={mockTemplates}
          handleDelete={handleDelete}
          handleUseTemplate={handleUseTemplate}
          showModal={showModal}
        />
      </Container>
      <TemplateModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        form={formRef.current}
      >
        <TemplateFormContent form={formRef.current} onFinish={handleFormSubmit} />
      </TemplateModal>
    </Box>
  );
};
