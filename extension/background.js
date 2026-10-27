chrome.action.onClicked.addListener(() => {
  const pageUrl = chrome.runtime.getURL("index.html");

  chrome.tabs.create({
    url: pageUrl,
  });
});
