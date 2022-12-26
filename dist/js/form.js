"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {

        } else {
            
        }
    }

    // Валидация формы
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            console.log(input);

            formRemoveError(input);

            if (input.classList.contains('_e-mail')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if(input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }

        return error;
    }

    // Добавляет класс Ошибки
    function formAddError(input) {
        // input.parentElement.classList.add('form__input_error');
        input.classList.add('form__input_error');
    }

    // Убирает класс Ошибки
    function formRemoveError(input) {
        // input.parentElement.classList.remove('form__input_error');
        input.classList.remove('form__input_error');
    }

    // Функция теста e-mail
    function emailTest(input) {
        return !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
    }
});