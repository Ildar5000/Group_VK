console.log("Hi from background Script file")

//обработка попура
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse)
    {
        
      if (sender=="export")
      {
        console.log('export');
        let locsett=getLocalsessionStorage()
        console.log('locsett');
        sendResponse({message: locsett});
      }
      else
      {
        console.log('export111');
        sendResponse("false");
      }
        return true;
    }
  );