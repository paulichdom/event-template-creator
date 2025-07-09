import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button as MuiButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { RocketLaunch, Edit, Delete } from "@mui/icons-material";
import { Template } from "../../types/template";

interface TemplateListItemProps {
  item: Template;
  handleUseTemplate: (template: Template) => void;
  showModal: (template: Template) => void;
  handleDelete: (id: string) => void;
}

export const TemplateListItem: React.FC<TemplateListItemProps> = ({
  item,
  handleUseTemplate,
  showModal,
  handleDelete,
}) => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleDeleteConfirmOpen = () => {
    setOpenDeleteConfirm(true);
  };

  const handleDeleteConfirmClose = () => {
    setOpenDeleteConfirm(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(item.id);
    handleDeleteConfirmClose();
  };

  return (
    <ListItem>
      <ListItemText primary={item.templateName} />
      <ListItemSecondaryAction>
        <Tooltip title="Use Template">
          <IconButton edge="end" aria-label="use template" onClick={() => handleUseTemplate(item)}>
            <RocketLaunch />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Template">
          <IconButton edge="end" aria-label="edit template" onClick={() => showModal(item)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Template">
          <IconButton edge="end" aria-label="delete template" onClick={handleDeleteConfirmOpen}>
            <Delete />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteConfirmClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Delete this template?"}</DialogTitle>
        <DialogContent id="delete-dialog-description">
          Are you sure you want to delete the template: {item.templateName}?
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleDeleteConfirmClose}>No</MuiButton>
          <MuiButton onClick={handleConfirmDelete} color="error" variant="contained">
            Yes
          </MuiButton>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
}; 