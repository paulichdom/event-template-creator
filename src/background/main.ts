import { BackgroundController } from "./controllers/background.controller";
import { StorageService } from "./services/storage.service";
import { SidePanelService } from "./services/side-panel.service";
import { TemplateService } from "./services/template.service";
import { TEMPLATE_API_MESSAGES } from "../types/api";

const storageService = new StorageService();
const sidePanelService = new SidePanelService();
const templateService = new TemplateService(storageService);
new BackgroundController(storageService, sidePanelService);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, payload } = message;

  const handleMessage = async () => {
    switch (action) {
      case TEMPLATE_API_MESSAGES.GET_TEMPLATES:
        return await templateService.getTemplates();
      case TEMPLATE_API_MESSAGES.SAVE_TEMPLATE:
        return await templateService.saveTemplate(payload);
      case TEMPLATE_API_MESSAGES.UPDATE_TEMPLATE:
        return await templateService.updateTemplate(payload);
      case TEMPLATE_API_MESSAGES.DELETE_TEMPLATE:
        return await templateService.deleteTemplate(payload);
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  };

  handleMessage()
    .then((result) => sendResponse({ success: true, data: result }))
    .catch((error) => sendResponse({ success: false, error: error.message }));

  return true; // Indicates that the response will be sent asynchronously
});
