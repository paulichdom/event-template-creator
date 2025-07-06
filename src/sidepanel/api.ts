import { TemplateApi, TEMPLATE_API_MESSAGES } from "../types/api";
import { Template, TemplateFormValues } from "../types/template";

const sendMessage = async (action: string, payload?: any): Promise<any> => {
  const response = await chrome.runtime.sendMessage({ action, payload });
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.error);
  }
};

export const templateApi: TemplateApi = {
  getTemplates: (): Promise<Template[]> => {
    return sendMessage(TEMPLATE_API_MESSAGES.GET_TEMPLATES);
  },
  saveTemplate: (template: TemplateFormValues): Promise<Template> => {
    return sendMessage(TEMPLATE_API_MESSAGES.SAVE_TEMPLATE, template);
  },
  updateTemplate: (template: Template): Promise<Template> => {
    return sendMessage(TEMPLATE_API_MESSAGES.UPDATE_TEMPLATE, template);
  },
  deleteTemplate: (id: string): Promise<void> => {
    return sendMessage(TEMPLATE_API_MESSAGES.DELETE_TEMPLATE, id);
  },
}; 