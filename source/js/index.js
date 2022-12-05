let buttonNav = document.querySelector('.main-header__button-nav');
let navNode = document.querySelector('.main-header__nav');
let menuItemNode = document.querySelectorAll('.main-header__item-text');

if (buttonNav) {
    buttonNav.addEventListener('click', function () {
        navNode.classList.toggle('main-header__nav--close');
        navNode.classList.toggle('main-header__nav--open');

        if (navNode.classList.contains('main-header__nav--open')) {
            buttonNav.classList.remove('main-header__button-nav');
            buttonNav.classList.add('main-header__button-nav--cross');
            buttonNav.style.zIndex = "2";
        } else {
            buttonNav.classList.add('main-header__button-nav');
            buttonNav.classList.remove('main-header__button-nav--cross');
        }
    });
}

if (menuItemNode) {
    for (let i = 0; i < menuItemNode.length; i++) {
        menuItemNode[i].addEventListener('click', function () {
            navNode.classList.remove('main-header__nav--open');
            navNode.classList.add('main-header__nav--close');
            buttonNav.classList.remove('main-header__button-nav--cross');
            buttonNav.classList.add('main-header__button-nav');
        })
    }
}


// Инициализируем слайдер 
new Swiper('.image-slider', {
    // Стрелки
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
    },
    // Навигация
    // Булеты, текущее положение
    pagination: {
        el: '.swiper-pagination',
        // Буллеты
        clickable: true,
        // Динамические булеты
        dynamicBullets: true,
    },
    // Отступ между слайдами
    spaceBetween: 30,
});


// Игра
let triangleWrapperNode = document.querySelector('.technology__preview');

triangleWrapperNode.addEventListener('click', () => {
    console.log('Клик');
    triangleWrapperNode.classList.remove('technology__preview--close');
});



// Треугольник
let triangleNode = document.querySelector('.technology__preview-figure');
// console.log(triangleNode);

triangleNode.addEventListener('click', () => {
    let axisX = Math.floor(((Math.random() < 0.5) ? -1 : 1) * Math.random() * 120);
    let axisY = Math.floor(((Math.random() < 0.5) ? -1 : 1)*Math.random() * 90);
    let rotateFigure = Math.floor(((Math.random() < 0.5) ? -1 : 1)*Math.random() * 180);

    triangleNode.style.transform = `translate(${axisX}%, ${axisY}%) rotate(${rotateFigure}deg)`;

    console.log(axisX);
    console.log(axisY);
    console.log(rotateFigure);
});