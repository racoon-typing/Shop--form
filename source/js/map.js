// DAData

let adressInput = document.querySelector('.form__input-address');
adressInput.addEventListener('input', updateValue);
let valueAdress;

function updateValue(e) {
    valueAdress = e.target.value;
    mapAdress();
}

function mapAdress() {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "0c6c9bedcb4d254c0775dbb3bbdf6371d4efe598";
    var query = `${valueAdress}`;
    console.log(query);
    
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
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
}
