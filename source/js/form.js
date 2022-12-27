// InputMask
const form = document.getElementById('form');
const telNode = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telNode);


// Валидация
new window.JustValidate('.form', {
    rules: {
        surname: {
            required: true, 
            minLength: 3,
            maxLength: 15,  
        },
        phone: {
            required: true,
            function: () => {
                const phone = telNode.inputmask.unmaskedvalue();
                return Number(phone) && phone.length === 10;
            }
        },
        adress: {
            required: true,
        }
    },
    messages: {
        name: {
            required: 'Введите имя',
            minLength: 'Введите 3 и более символов',
            maxLength: 'Запрещено вводить более 15 символов',
        },
        surname: {
            required: 'Введите фамилию',
            minLength: 'Фамилия должна быть больше 3 букв',
            maxLength: 'Запрещено вводить более 15 символов',
        },
        phone: {
            required: 'Введите телефон',
            function: 'Здесь должно быть 10 символов, без +7'
        },
        email: {
            email: 'Введите корректный email',
            required: 'Введите email',
        }, 
        adress: 'Введите адрес',
    },
    submitHandler: function(thisForm) {

    }
})