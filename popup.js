//let btn_imp = document.getElementById("btn_imp");
/*
btn_imp.addEventListener("click", async () => {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    let message = {name: "import"};
    
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
        reader.onload = function(e){
            console.log(e.target.result);
        }
    reader.readAsText(file);

    //chrome.tabs.sendMessage(tab[0].id, message, function(response) {
    //    
    //  });
});
*/
let btn_exp = document.getElementById("btn_exp");

btn_exp.addEventListener("click", async() => {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    let message = {name: "export"};
    
    chrome.tabs.sendMessage(tab[0].id, message, function(response) {
        //alert(JSON.stringify(response.message));
    //window.navigator.clipboard.writeText(JSON.stringify(response.message));

    let json =response.message
	let obj = {
		"filename": "localStorage.json",
		"url": 'data:application/json;charset=utf-8,' + encodeURIComponent(json),
		"conflictAction": "prompt",
		"saveAs": true
	};
    
    alert(json)

    chrome.downloads.download(obj);

    });
});

let file_imp = document.getElementById("file_imp");
file_imp.addEventListener('change', async function(e)
{
    let file_to_read = document.getElementById("file_imp").files[0];
    let txt="";
    
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    let reader = new FileReader();
    reader.readAsText(file_to_read);
    reader.onload = function() {
        //alert(reader.result);
        let message = {name: "import", value:reader.result};
        chrome.tabs.sendMessage(tab[0].id, message, function(response) {
            console.log("test")
        });  
      };
    
      reader.onerror = function() {
        alert(reader.error);
      };

   


});

