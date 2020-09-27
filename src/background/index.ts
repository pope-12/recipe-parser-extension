import Tab = chrome.tabs.Tab;

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "get-recipe.js"});
});

chrome.runtime.onMessage.addListener(listenForRecipe);
function listenForRecipe(recipe: any, sender: any, sendResponse: any){
  chrome.tabs.query({url: 'https://buenas.recipes/recipe/edit/new'}, (tabs => {
    if (tabs.length) {
      chrome.tabs.sendMessage(tabs[0].id, {...recipe});

      // Change active tab to the one we just sent the data to
      chrome.tabs.highlight({tabs: [tabs[0].index]}, () => {})
    } else {
      alert('Must have the website https://buenas.recipes open in another chrome tab');
    }
  }));
}



