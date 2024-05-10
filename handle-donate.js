/*==============================================================*/
/* Script for handling the frontend of donate*/
/*===============================================================*/

$(document).ready(function () {
    const donateForm = $('#donateForm');
    const receiptModal = $('#modalSuccess');
    const closeBtn = $('#closeModal');
    const amountOtherRadio = $('#amountOther');
    const otherAmountInput = $('#otherAmountInput');
    const otherAmountTextInput = $('#otherAmount');
    const paymentOptions = $('input[name="payment"]');

    donateForm.on('submit', function (event) {
        event.preventDefault();

        if (validateForm()) {
            sendDataToServer();
            donateForm[0].reset();
            receiptModal.css('display', 'block');
            console.log('Data saved');
        }
    });

    // Function to validate the form
    function validateForm() {
        const email = $('#email').val();
        const phone = $('#phone').val();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // Phone number validation
        const phoneRegex = /^\d{10,12}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number (10-12 digits).');
            return false;
        }

        // Return true if the form is valid
        return true;
    }

    // Logic to show/hide the amount input field when "Other" option is selected
    amountOtherRadio.on('change', function () {
        if (amountOtherRadio.prop('checked')) {
            otherAmountInput.css('display', 'block');
            otherAmountTextInput.removeAttr('disabled').removeAttr('readonly').focus();
        } else {
            otherAmountInput.css('display', 'none');
            otherAmountTextInput.val('');
        }
    });

    // Logic to hide the amount input field when options other than "Other" are selected
    paymentOptions.on('change', function () {
        if (!amountOtherRadio.prop('checked')) {
            otherAmountInput.css('display', 'none');
            otherAmountTextInput.val('');
        }
    });

    // Close the modal when the close button is clicked
    closeBtn.on('click', function () {
        receiptModal.css('display', 'none');
    });

    // Close the modal when clicked outside of it
    $(window).on('click', function (event) {
        if (event.target === receiptModal[0]) {
            receiptModal.css('display', 'none');
        }
    });

    // Function to send form data to server
    function sendDataToServer() {
        const formData = {
            firstName: $('#fname').val(),
            lastName: $('#lname').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            wish: $('#wish').val(),
            paymentAmount: getPaymentAmount(),
            billing: generateBillingCode(),
            donors: generateDonorsID(),
            billing: generateBillingCode(),
            donors: generateDonorsID()
        };

        console.log(formData);

        // Save form data to text file
        saveDataToFile(formData);
    }

    // Function to get the donation amount
    function getPaymentAmount() {
        let amount = 0;
        paymentOptions.each(function () {
            if ($(this).prop('checked') && $(this).val() !== 'other') {
                amount = $(this).val();
            } else if ($(this).prop('checked') && $(this).val() === 'other') {
                amount = $('#otherAmount').val();
            }
        });
        return amount;
    }

    // Function to generate random billing code
    function generateBillingCode() {
        // Generate a random 6-digit billing code
        return Math.floor(100000 + Math.random() * 900000);
    }

    // Function to generate random donors ID
    function generateDonorsID() {
        // Generate a random 8-digit donors ID
        return Math.floor(10000000 + Math.random() * 90000000);
    }

    // Function to save form data to text file
    function saveDataToFile(formData) {
        // Construct text data
        const textData = `
                      DONOR INFORMATION
        ================================================
        Donors ID: ${formData.donors}
        Billing Code: ${formData.billing}
        Note:
        Payment Process
        ---------------
        1. Enter the Billing Code you received earlier.
        2. Complete the payment using the payment 
           method you previously selected.
        3. Donation Successful.
        ================================================
        Name : ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Wish : ${formData.wish}
        Payment Amount: ${formData.paymentAmount}
        ===============================================
        Note: After 24 hours, the billing code will expire
        `;

        // Create a Blob containing the text data
        const blob = new Blob([textData], { type: 'text/plain' });

        // Create a temporary anchor element
        const link = $('<a>').attr({
            href: URL.createObjectURL(blob),
            download: 'donation_info.txt'
        });

        // Trigger the download
        link[0].click();
    }
});
