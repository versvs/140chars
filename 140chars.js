// toda la magia
function install140chars () {
  var totalHiddenLongTweets = 0;
  browser.storage.local.set("totalHiddenLongTweets", totalHiddenLongTweets);
  console.log("140chars has been installed!");
}

function hideLongTweets() {
    var i = 0;
    var tweets = document.getElementsByClassName("tweet-text");
    for ( i; i < tweets.length; i++ ) {
      if ( tweets[i].innerText.length > 140 ) {
        tweets[i].closest(".stream-item").remove();
        totalHiddenLongTweets++;
        browser.runtime.sendMessage({"totalHiddenLongTweets": totalHiddenLongTweets});
        console.log("a tweet too long for us has been silenced");
      }
    }
}

// initialize the extension on install
console.log("140chars now hiding long tweets... and counting!");
var totalHiddenLongTweets = 0;


// add content load listener
if (document.readyState == "complete") {
  console.log("DOMContentLoaded was already triggered");
  console.log("running a first clear of tweets, then");
  hideLongTweets();
} else {
  console.log("DOMContentLoaded listener added!");
  document.addEventListener("DOMContentLoaded", function(event) {
    hideLongTweets();
  });
}

// first initial clearing, without waiting for Mutations
hideLongTweets();

// on to the MutationObserver
var observer = new MutationObserver(function(mutations) {
    hideLongTweets();
    console.log(mutations);
});

var observerConfig = {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true
};

// ready to observe, Sir!
// `document` is set as target
observer.observe(document, observerConfig);
