import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Autocomplete,
  Chip,
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
}

export const TemplateFormContent: React.FC<TemplateFormContentProps> = ({
  form,
  onFinish,
}) => {
  const [templateName, setTemplateName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [duration, setDuration] = useState<number | string>("");
  const [attendees, setAttendees] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

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
  }, [form, templateName, eventTitle, duration, attendees, location, description]);

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
        label="Template Name"
        name="templateName"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        fullWidth
        margin="normal"
        required
        placeholder="e.g., Weekly Team Sync"
      />
      <TextField
        label="Event Title"
        name="eventTitle"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
        placeholder="The title that appears on the calendar"
      />
      <TextField
        label="Duration"
        name="duration"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ min: 15, step: 15 }} // Apply min and step as input props
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
      <Autocomplete
        multiple
        id="attendees-autocomplete"
        options={[]} // No predefined options, allowing free text input
        freeSolo
        value={attendees}
        onChange={(event, newValue: string[]) => {
          setAttendees(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Attendees"
            placeholder="Enter emails and press Enter"
            margin="normal"
            fullWidth
          />
        )}
      />
      <TextField
        label="Location / Video Call"
        name="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        placeholder="e.g., Google Meet"
      />
      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        placeholder="Agenda, notes, links..."
      />
    </Box>
  );
}; 