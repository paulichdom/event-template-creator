export interface TemplateFormValues {
  templateName: string;
  eventTitle: string;
  duration: number;
  attendees?: string[];
  location?: string;
  description?: string;
}

export interface Template extends TemplateFormValues {
  id: string;
}
