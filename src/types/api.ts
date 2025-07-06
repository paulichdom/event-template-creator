import { Template, TemplateFormValues } from "./template";

export interface TemplateApi {
  getTemplates(): Promise<Template[]>;
  saveTemplate(template: TemplateFormValues): Promise<Template>;
  updateTemplate(template: Template): Promise<Template>;
  deleteTemplate(id: string): Promise<void>;
}

export const TEMPLATE_API_MESSAGES = {
  GET_TEMPLATES: "getTemplates",
  SAVE_TEMPLATE: "saveTemplate",
  UPDATE_TEMPLATE: "updateTemplate",
  DELETE_TEMPLATE: "deleteTemplate",
}; 