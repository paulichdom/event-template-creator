import { Form, Input, InputNumber, Select } from "antd";

interface TemplateFormValues {
  templateName: string;
  eventTitle: string;
  duration: number;
  attendees?: string[];
  location?: string;
  description?: string;
}

interface TemplateFormContentProps {
  form: any; // TODO: Type this properly
  onFinish: (values: TemplateFormValues) => void;
}

export const TemplateFormContent: React.FC<TemplateFormContentProps> = ({
  form,
  onFinish,
}) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      name="template_form_ui"
    >
      <Form.Item
        label="Template Name"
        name="templateName"
        rules={[{ required: true }]}
      >
        <Input placeholder="e.g., Weekly Team Sync" />
      </Form.Item>
      <Form.Item
        label="Event Title"
        name="eventTitle"
        rules={[{ required: true }]}
      >
        <Input placeholder="The title that appears on the calendar" />
      </Form.Item>
      <Form.Item label="Duration">
        <InputNumber
          min={15}
          step={15}
          addonAfter="minutes"
          name="duration"
        />
      </Form.Item>
      <Form.Item label="Attendees" name="attendees">
        <Select
          mode="tags"
          placeholder="Enter emails and press Enter"
          tokenSeparators={[",", " "]}
        />
      </Form.Item>
      <Form.Item label="Location / Video Call" name="location">
        <Input placeholder="e.g., Google Meet" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} placeholder="Agenda, notes, links..." />
      </Form.Item>
    </Form>
  );
}; 