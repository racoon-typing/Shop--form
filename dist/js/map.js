// DAData
var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/address";
var token = "0c6c9bedcb4d254c0775dbb3bbdf6371d4efe598";
var query = "9120b43f-2fae-4838-a144-85e43c2bfb29";

var options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
}

fetch(url, options)
    .then(response => response.text())
    .then(result => {
        console.log(result);  
    })
    .catch(error => console.log("error", error));