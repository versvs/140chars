// Listen to content.js events
browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.totalHiddenLongTweets || request.totalHiddenLongTweets === 0) {
      browser.browserAction.setBadgeText({'text': request.totalHiddenLongTweets.toString()});
      browser.browserAction.setTitle({'title': "140chars has silenced " + request.totalHiddenLongTweets.toString() + " tweets this session"});
    }
  }
);
