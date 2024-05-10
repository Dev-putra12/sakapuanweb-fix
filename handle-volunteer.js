function changeColor(select) {
    if (select.value === "empty") {
        select.style.color = 'gray';
    } else {
        select.style.color = 'black';
    }
}

// Initialize color on page load
window.onload = function() {
    var select = document.getElementById('nationality');
    changeColor(select);
};

$(document).ready(function () {
    const registerForm = $('#registerForm');
    const modalSuccess = $('#modalSuccess');
    const closeModal = $('#closeModal');

        // Fungsi untuk mengisi ulang form dengan data yang sudah tersimpan sebelumnya
        function refillFormWithData() {
            const savedFormData = sessionStorage.getItem('formData');
            if (savedFormData) {
                const formData = JSON.parse(savedFormData);
                for (const key in formData) {
                    const input = registerForm.find(`[name="${key}"]`);
                    if (input.is('select')) {
                        // Untuk <select>, pilih <option> yang sesuai
                        input.find(`option[value="${formData[key]}"]`).prop('selected', true);
                    } else {
                        // Untuk input lainnya, set value-nya
                        input.val(formData[key]);
                    }
                }
            }
        }
    
        // Memanggil fungsi untuk mengisi ulang form saat dokumen siap
        refillFormWithData();

    // Menggunaan session storage untuk menyimpan data register form
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
        console.log('Saved form data:', JSON.parse(savedFormData));
    } else {
        // Jika tidak ada data tersimpan, coba lihat apakah ada di sessionStorage sementara
        const temporaryFormData = sessionStorage.getItem('temporaryFormData');
        if (temporaryFormData) {
            console.log('Temporary form data:', JSON.parse(temporaryFormData));
        }
    }

    const registeredEmails = {};

    registerForm.on('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Form validation
        if (validateForm(registerForm)) {
            const email = registerForm.find('input[name="email"]').val().trim();

            if (registeredEmails[email]) {
                alert('Email has already been registered.');
                return;
            }

            const formData = getFormData(registerForm);
            saveFormData(formData);

            modalSuccess.css('display', 'block');

            registerForm[0].reset();

            registeredEmails[email] = true;

            // Menyimpan form data ke sessionStorage
            sessionStorage.setItem('formData', JSON.stringify(formData));
        }
    });

    closeModal.on('click', function () {
        modalSuccess.css('display', 'none');
    });

    // Event listener untuk menyimpan form data sebelum pengguna meninggalkan halaman
    $(window).on('beforeunload', function (event) {
        const formData = getFormData(registerForm);
        // Menyimpan form data ke sessionStorage sebagai temporaryFormData
        sessionStorage.setItem('temporaryFormData', JSON.stringify(formData));
    });

    function validateForm(form) {
        const firstName = form.find('input[name="firstname"]').val().trim();
        const lastName = form.find('input[name="lastname"]').val().trim();
        const nationality = form.find('select[name="nationality"]').val();
        const occupation = form.find('input[name="occupation"]').val().trim();
        const email = form.find('input[name="email"]').val().trim();
        const phone = form.find('input[name="phone"]').val().trim();

        if (firstName === '' || lastName === '' || nationality === 'empty' || occupation === '' || email === '' || phone === '') {
            alert('Please fill in all fields.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number (10-12 digits).');
            return false;
        }

        return true;
    }

    function getFormData(form) {
        // Mendapatkan data dari form
        const formData = form.serializeArray();
        const volunteerData = {};
        $.each(formData, function (_, field) {
            volunteerData[field.name] = field.value;
        });
        return volunteerData;
    }

    function saveFormData(data) {
        console.log('Data saved:', data);
    }
    
});
