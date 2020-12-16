var tabid;

var code = `var meta = document.querySelector("meta[name='description']");
  if (meta) meta = meta.getAttribute("content");
  ({title: document.title, description: meta || ""});
`;

// Send to the edit page capturing the visible part of the current tab + passing the current URL
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      var currentUrl = tabs[0].url;
      // Capture the visible part of the tab
      chrome.tabs.captureVisibleTab(
        chrome.windows.WINDOW_ID_CURRENT,
        { format: "png" },
        function (image) {
          // Scrap the page and look for more infos
          chrome.tabs.executeScript(
            {
              code: code,
            },
            function (results) {
              if (!results) {
                return;
              }
              var result = results[0];
              chrome.tabs.create({ url: "edit.html" }, function (t) {
                tabid = t.id;
                // Slight delay to allow tab time to add listener.
                setTimeout(function () {
                  chrome.tabs.sendMessage(tabid, {
                    image: image,
                    url: currentUrl,
                    title: result.title,
                    description: result.description,
                  });
                }, 1000);
              });
            }
          );
        }
      );
    }
  );
});

// Listen to other events. This code only captures the visible part of the edit page
chrome.extension.onMessage.addListener(function (e) {
  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      chrome.tabs.captureVisibleTab(
        chrome.windows.WINDOW_ID_CURRENT,
        { format: "png" },
        function (image) {
          chrome.tabs.sendMessage(tabid, {
            image: image,
          });
        }
      );
    }
  );
});
