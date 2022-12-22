// DAData
let adressInput = document.querySelector('.form__input-address');
let valueAdress;

// Широта и долгота мест в списке
let arrGeo = [];

function mapAdress() {
    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "0c6c9bedcb4d254c0775dbb3bbdf6371d4efe598";
    var query = `${valueAdress}`;

    if (query == '') {
        return
    }

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query: query })
    }

    fetch(url, options)
        .then(response => response.json())
        .then(result => {
            arrGeo = [];

            // Список для вывода адресов
            const outputAdressList = document.querySelector('.form__contacts-sublist');
            const childrenOutputAdressList = document.querySelectorAll('.form__contacts-subitem');

            // Очищает список адресов
            for (let i = 0; i < childrenOutputAdressList.length; i++) {
                childrenOutputAdressList[i].remove();
            }

            // Если похожих адресов нет, скрывает попап
            let resultListLength = result.suggestions.length;
            if (resultListLength == 0) {
                outputAdressList.style.display = 'none';
                return
            }

            // Вставляет адреса в список
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < resultListLength; i++) {
                if (i < 4) {
                    outputAdressList.style.display = 'block';

                    const li = document.createElement('li');
                    li.classList.add('form__contacts-subitem');
                    li.id = `${i}`;
                    let resultListValue = result.suggestions[i].unrestricted_value;

                    // Вставляем координаты в массив
                    let resultListLon = result.suggestions[i].data.geo_lon;
                    let resultListLat = result.suggestions[i].data.geo_lat;
                    arrGeo.push(resultListLon);
                    arrGeo.push(resultListLat);

                    li.textContent = resultListValue;
                    fragment.appendChild(li);
                }
            }
            outputAdressList.appendChild(fragment);
        })
        .catch(error => console.log("error", error));
}

function updateValue(e) {
    valueAdress = e.target.value;
    mapAdress();
}

adressInput.addEventListener('input', updateValue);


// Вставляет адрес в инпут
const outputAdressItems = document.querySelector('.form__contacts-sublist');

function toggleDone(event) {
    const adressNode = document.querySelector('.form__input-address');
    const liValue = event.target.textContent;
    adressNode.value = liValue;
    outputAdressItems.style.display = 'none';

    // Получаем координаты места из списка 
    let liIdDown = event.target.id;
    let numLon = liIdDown * 2;
    let numLat = liIdDown * 2 + 1;
    console.log(liIdDown);
    console.log(arrGeo);
    let geoLon = arrGeo[numLon];
    let geoLat = arrGeo[numLat];
    console.log(geoLon);
    console.log(geoLat);
}

outputAdressItems.addEventListener('click', toggleDone)



// Яндекс.Карты
var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10
    });

    myGeoObject = new ymaps.GeoObject(
        {
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.76, 37.64]
            }
        },
        { // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#redIcon',
            // Метку можно перемещать.
            draggable: true
        },
    );

    myMap.geoObjects
        .add(myGeoObject)
}
