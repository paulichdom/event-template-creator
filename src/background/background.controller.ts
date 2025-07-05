const ORIGIN = "https://calendar.google.com";

export class BackgroundController {
  constructor() {
    this.init();
  }

  init() {
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));

    chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
      if (!tab.url) return;
      const url = new URL(tab.url);
      // Enables the side panel on google.com
      if (url.origin === ORIGIN) {
        await chrome.sidePanel.setOptions({
          tabId,
          path: "src/sidepanel/index.html",
          enabled: true,
        });
      } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
          tabId,
          enabled: false,
        });
      }
    });
  }
}
