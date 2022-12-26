"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault();

        // Возвращает результат: кол-во ошибок 
        let error = formValidate(form);

        let formData = new FormData(form);
        
        if (error === 0) {
            form.classList.add('form_sending')

            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('form_sending')
            } else {
                alert('Ошибка');
                form.classList.remove('form_sending')
            }            
        } 
    }

    // Валидация формы
    function formValidate(form) {
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