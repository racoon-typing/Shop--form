"use strict"

const makeTitle = require("gulp-cli/lib/shared/make-title");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault();

        console.log('Клик на кнопку');

        let error = formValidate(form);
    }

    function formValidate(from) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

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
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // Функция теста e-mail
    function emailTest(input) {
        return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(input.value);
    }
});