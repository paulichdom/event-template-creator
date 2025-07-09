import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  List,
  Avatar,
  styled,
  Stack,
  Fab,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { TemplateModal } from "../TemplateModal/TemplateModal";
import { TemplateList } from "../TemplateList/TemplateList";
import { Template, TemplateFormValues } from "../../types/template";
import { TemplateFormContent } from "../TemplateFormContent/TemplateFormContent";
import { mockTemplates } from "../../data/mockTemplates";
import { TemplateCard } from "../TemplateCard/TemplateCard";

export const MainScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTemplate, setCurrentTemplate] =
    useState<TemplateFormValues | null>(null);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const formRef = useRef<{
    setFieldsValue: (values: TemplateFormValues) => void;
    resetFields: () => void;
    submit: () => void;
  }>({
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

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
      <Container sx={{ mt: 4 }}>
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
        <TemplateFormContent
          form={formRef.current}
          onFinish={handleFormSubmit}
        />
      </TemplateModal>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="primary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
