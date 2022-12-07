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

