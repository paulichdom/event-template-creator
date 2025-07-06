export class SidePanelService {
  private ORIGIN = "https://calendar.google.com";

  constructor() {}

  init() {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
      if (!tab.url) return;
      const url = new URL(tab.url);
      if (url.origin === this.ORIGIN) {
        await chrome.sidePanel.setOptions({
          tabId,
          path: "src/sidepanel/index.html",
          enabled: true,
        });
      } else {
        await chrome.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
      }
    });
  }
}
