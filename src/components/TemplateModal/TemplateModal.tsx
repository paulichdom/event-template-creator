import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface TemplateModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  children: React.ReactNode;
  form: any;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isModalVisible,
  handleCancel,
  children,
  form,
}) => {
  return (
    <Dialog open={isModalVisible} onClose={handleCancel}>
      <DialogTitle>Create/Edit Template</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button variant="contained" onClick={() => form.submit()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
