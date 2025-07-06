import { Template, TemplateFormValues } from "../../types/template";
import { TemplateApi } from "../../types/api";
import { StorageService } from "./storage.service";
import { v4 as uuidv4 } from 'uuid';

export class TemplateService implements TemplateApi {
  private static readonly TEMPLATES_STORAGE_KEY = "templates";
  private storageService: StorageService;

  constructor(storageService: StorageService) {
    this.storageService = storageService;
  }

  async getTemplates(): Promise<Template[]> {
    const templates = await this.storageService.get<Template[]>(TemplateService.TEMPLATES_STORAGE_KEY);
    return templates || [];
  }

  async saveTemplate(templateFormValues: TemplateFormValues): Promise<Template> {
    const templates = await this.getTemplates();
    const newTemplate: Template = {
      id: uuidv4(),
      ...templateFormValues,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    templates.push(newTemplate);
    await this.storageService.set(TemplateService.TEMPLATES_STORAGE_KEY, templates);
    return newTemplate;
  }

  async updateTemplate(updatedTemplate: Template): Promise<Template> {
    let templates = await this.getTemplates();
    const index = templates.findIndex((t) => t.id === updatedTemplate.id);
    if (index > -1) {
      updatedTemplate.updatedAt = new Date().toISOString();
      templates[index] = updatedTemplate;
      await this.storageService.set(TemplateService.TEMPLATES_STORAGE_KEY, templates);
      return updatedTemplate;
    }
    throw new Error("Template not found");
  }

  async deleteTemplate(id: string): Promise<void> {
    let templates = await this.getTemplates();
    templates = templates.filter((t) => t.id !== id);
    await this.storageService.set(TemplateService.TEMPLATES_STORAGE_KEY, templates);
  }
} 