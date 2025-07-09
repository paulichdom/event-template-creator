import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Template } from "../../types/template";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface TemplateCardProps {
  item: Template;
  handleUseTemplate: (template: Template) => void;
  showModal: (template: Template) => void;
  handleDelete: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  item,
  handleUseTemplate,
  showModal,
  handleDelete,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardHeader
        avatar={<Avatar aria-label="template-name">{item.templateName[0]}</Avatar>}
        title={item.templateName}
        subheader={item.eventTitle}
      />
      <CardActions disableSpacing>
        <Tooltip title="Use Template">
          <IconButton aria-label="use template" onClick={() => handleUseTemplate(item)}>
            <RocketLaunchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Template">
          <IconButton aria-label="edit template" onClick={() => showModal(item)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Template">
          <IconButton aria-label="delete template" onClick={handleDeleteConfirmOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{item.description || "No description provided."}</Typography>
          <Typography paragraph>Duration: {item.duration} minutes</Typography>
          <Typography paragraph>Location: {item.location || "Not specified."}</Typography>
          <Typography paragraph>
            Attendees: {item.attendees && item.attendees.length > 0 ? item.attendees.join(", ") : "No attendees specified."}
          </Typography>
        </CardContent>
      </Collapse>
      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteConfirmClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Delete this template?"}</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete the template: {item.templateName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>No</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
