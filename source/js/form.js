// InputMask
const form = document.getElementById('form');
const telNode = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telNode);

// Валидация
new window.JustValidate('.form', {
    rules: {
        // name: {

        // },
        // email: {

        // },
        tel: {
            required: true,
            function: () => {
                const phone = telNode.inputmask.unmaskedvalue();
                return Number(phone) && phone.length === 10;
            }
        }
    },
    submitHandler: function(thisForm) {

    }
})