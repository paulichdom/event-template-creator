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
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Template } from "../../types/template";
import { Divider, Stack } from "@mui/material";
import {
  AccessTime,
  MeetingRoom,
  People,
  PinDrop,
  SubjectOutlined,
} from "@mui/icons-material";

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
    <Card variant="outlined" sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardHeader
        avatar={
          <Avatar aria-label="template-name">{item.templateName[0]}</Avatar>
        }
        title={item.templateName}
        subheader={item.eventTitle}
        action={
          <Tooltip title="Use Template">
            <IconButton
              aria-label="use template"
              onClick={() => handleUseTemplate(item)}
            >
              <OpenInNewRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardActions disableSpacing>
        <Tooltip title="Edit Template">
          <IconButton
            aria-label="edit template"
            onClick={() => showModal(item)}
          >
            <EditIcon fontSize="small" color="action" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Template">
          <IconButton
            aria-label="delete template"
            onClick={handleDeleteConfirmOpen}
          >
            <DeleteIcon fontSize="small" color="error" />
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
          {/* <Divider sx={{ mb: 3 }} /> */}
          <Stack
            sx={{
              flexDirection: "column",
              alignSelf: "center",
              gap: 4,
              maxWidth: 450,
            }}
          >
            <Stack direction="row" sx={{ gap: 2 }}>
              <SubjectOutlined fontSize="small" color="action" />
              <div>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  Description
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </div>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <AccessTime fontSize="small" color="action" />
              <div>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  Duration
                </Typography>
                <Typography variant="body2">{item.duration} minutes</Typography>
              </div>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <PinDrop fontSize="small" color="action" />
              <div>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  Location
                </Typography>
                <Typography variant="body2">
                  {item.location || "Not specified."}
                </Typography>
              </div>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <People fontSize="small" color="action" />
              <div>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  Attendees
                </Typography>
                <Typography variant="body2">
                  {item.attendees && item.attendees.length > 0
                    ? item.attendees.join(", ")
                    : "No attendees specified."}
                </Typography>
              </div>
            </Stack>
            <Stack direction="row" sx={{ gap: 2 }}>
              <MeetingRoom fontSize="small" color="action" />
              <div>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ fontWeight: "medium", color: "text.secondary" }}
                >
                  Meeting Room
                </Typography>
                <Typography variant="body2">Not specified</Typography>
              </div>
            </Stack>
          </Stack>
        </CardContent>
      </Collapse>
      <Dialog
        open={openDeleteConfirm}
        onClose={handleDeleteConfirmClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Delete this template?"}
        </DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete the template: {item.templateName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmClose}>No</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
