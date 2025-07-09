import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  Chip,
  Button,
} from "@mui/material";

interface TemplateFormValues {
  templateName: string;
  eventTitle: string;
  duration: number;
  attendees?: string[];
  location?: string;
  description?: string;
}

interface TemplateFormContentProps {
  form: any; // This will now be mocked to behave like Ant Design's FormInstance
  onFinish: (values: TemplateFormValues) => void;
  initialValues?: TemplateFormValues | null; // Add this prop
  onCancel: () => void; // Add onCancel prop
}

export const TemplateFormContent: React.FC<TemplateFormContentProps> = ({
  form,
  onFinish,
  initialValues,
  onCancel, // Destructure onCancel
}) => {
  const [templateName, setTemplateName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [duration, setDuration] = useState<number | string>("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Use useEffect to set initial values when the component mounts or initialValues change
  useEffect(() => {
    if (initialValues) {
      setTemplateName(initialValues.templateName || "");
      setEventTitle(initialValues.eventTitle || "");
      setDuration(initialValues.duration || "");
      setAttendees(initialValues.attendees || []);
      setLocation(initialValues.location || "");
      setDescription(initialValues.description || "");
    } else {
      // Reset fields if initialValues is null (for new template)
      setTemplateName("");
      setEventTitle("");
      setDuration("");
      setAttendees([]);
      setLocation("");
      setDescription("");
    }
  }, [initialValues]);

  const formRef = useRef<HTMLFormElement>(null);

  // Mock Ant Design's form.submit() and form.getFieldsValue()
  useEffect(() => {
    if (form) {
      form.submit = () => {
        if (formRef.current) {
          // Manually trigger the submit event on the native form element
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }
      };
      form.getFieldsValue = () => {
        return {
          templateName,
          eventTitle,
          duration: Number(duration),
          attendees,
          location,
          description,
        };
      };
    }
  }, [
    form,
    templateName,
    eventTitle,
    duration,
    attendees,
    location,
    description,
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFinish({
      templateName,
      eventTitle,
      duration: Number(duration),
      attendees,
      location,
      description,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} ref={formRef}>
      <TextField
        size="small"
        variant="filled"
        label="Template Name"
        name="templateName"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        fullWidth
        required
        placeholder="e.g., Weekly Team Sync"
      />
      <TextField
        size="small"
        variant="filled"
        label="Event Title"
        name="eventTitle"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        fullWidth
        margin="dense" // Make field smaller
        required
        placeholder="The title that appears on the calendar"
      />
      <TextField
        size="small"
        variant="filled"
        label="Duration"
        name="duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="dense" // Make field smaller
        inputProps={{ min: 15, step: 15 }} // Apply min and step as input props
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
      <Autocomplete
      
        multiple
        id="tags-filled"
        options={[]} // No predefined options, allowing free text input
        freeSolo
        value={attendees}
        onChange={(event, newValue: string[]) => {
          setAttendees(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label="Attendees"
            placeholder="Enter emails and press Enter"
            margin="dense" // Make field smaller
            fullWidth
          />
        )}
      />
      <TextField
        size="small"
        variant="filled"
        label="Location / Video Call"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="dense" // Make field smaller
        placeholder="e.g., Google Meet"
      />
      <TextField
        size="small"
        variant="filled"
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="dense" // Make field smaller
        multiline
        rows={4}
        placeholder="Agenda, notes, links..."
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="outlined" onClick={onCancel} sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};
