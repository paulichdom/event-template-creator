import { StorageService } from "../services/storage.service";
import { SidePanelService } from "../services/side-panel.service";

export class BackgroundController {
  private storageService: StorageService;
  private sidePanelService: SidePanelService;

  constructor(storageService: StorageService, sidePanelService: SidePanelService) {
    this.storageService = storageService;
    this.sidePanelService = sidePanelService;

    this.init();
  }

  private async init() {
    this.sidePanelService.init();
  }
}
