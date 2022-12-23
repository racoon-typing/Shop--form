// DAData
let adressInput = document.querySelector('.form__input-address');
let valueAdress;

// Широта и долгота мест в списке
let arrGeo = [];

// Функция получения подходящих адресов (запрос на сервер)
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

// Функция подбора адреса
function updateValue(e) {
    valueAdress = e.target.value;
    mapAdress();
}

// Слушатель на ввод букв для обновления списка адресов
adressInput.addEventListener('input', updateValue);


// Яндекс.Карты
let geoLon = 30.428661;
let geoLat = 60.033113;

var myMap;

// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [geoLat, geoLon], // Москва
        zoom: 12
    });

    myGeoObject = new ymaps.GeoObject(
        {
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [geoLat, geoLon]
            }
        },
        { // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#redIcon',
            // Метку можно перемещать.
            draggable: true
        },
    );

    // Стиль метки
    // // Установка для карты ее центра и масштаба
    // map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);

    // // Создает стиль
    // var s = new YMaps.Style();

    // // Создает стиль значка метки
    // s.iconStyle = new YMaps.IconStyle();
    
    // // Настройки значка
    // s.iconStyle.href = "@img/icon/map-marker.svg";
    // s.iconStyle.size = new YMaps.Point(18, 29);
    // s.iconStyle.offset = new YMaps.Point(-9, -29);


    // // Создание метки и добавление ее на карту
    // var placemark = new YMaps.Placemark(map.getCenter(), {style: s});
    // map.addOverlay(placemark);

    myMap.geoObjects
        .add(myGeoObject)
}


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
    geoLon = arrGeo[numLon];
    geoLat = arrGeo[numLat];

    // Удаляет дефолтную карту
    myMap.destroy();

    // Создает карту по заданному адресу
    ymaps.ready(init);

    function init() {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [geoLat, geoLon], // Москва
            zoom: 10
        });

        myGeoObject = new ymaps.GeoObject(
            {
                // Описание геометрии.
                geometry: {
                    type: "Point",
                    coordinates: [geoLat, geoLon]
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
}

outputAdressItems.addEventListener('click', toggleDone)


