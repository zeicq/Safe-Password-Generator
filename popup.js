
document.getElementById('generateButton').addEventListener('click', function () {
    const passwordLength = parseInt(document.getElementById('range').value, 10);
    let charset = '';


    if (passwordLength < 4) {
        showErrorModal('Password must be greater than 3');
        return;
    }
    if (passwordLength > 31) {
        showErrorModal('Password can not be greater than 32');
        return;
    }
    if (document.getElementById('includeNumbers').checked) {
        charset += '0123456789';
    }
    if (document.getElementById('includeLowercase').checked) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (document.getElementById('includeUppercase').checked) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (document.getElementById('includeSpecialChars').checked) {
        charset += '!@#$%^&*()_+';
    }
    if (document.getElementById('includeSpaces').checked) {
        charset += ' ';
    }
    if (charset === '') {
        showErrorModal('Select at least 1 password building option!');
        return;
    }

    const password = generatePassword(passwordLength, charset);
    document.getElementById('passwordOutput').value = password;

});


function generatePassword(length, charset) {
    let password = '';
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
        let randomIndex = values[i] % charset.length;
        password += charset[randomIndex];
    }

    return password;
}

const copyButton = document.getElementById('copyButton');
const textCopy = document.querySelector(".copyText");

copyButton.addEventListener('click', function () {
    let input = document.getElementById('passwordOutput');

    navigator.clipboard.writeText(input.value).then(function () {
        textCopy.classList.add("active");
        window.getSelection().removeAllRanges();
        setTimeout(function () {
            textCopy.classList.remove("active");
        }, 2500);
    }).catch(function (err) {
        console.error('Something was wrong ', err);
    });
});

function showErrorModal(message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = message;

    errorModal.style.display = 'block';

    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function () {
        errorModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === errorModal) {
            errorModal.style.display = 'none';
        }
    };
}


const range = document.getElementById("range");

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

range.addEventListener("input", (e) => {
    const value = +e.target.value;
    const label = e.target.nextElementSibling;
    const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
    const labelWidth = getComputedStyle(label).getPropertyValue("width");

    const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
    const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
    const max = +e.target.max;
    const min = +e.target.min;
    const left = value * (numWidth / max) - numLabelWidth + scale(value, min, max, 10, -10);
    label.style.left = `${left}px`;
    label.innerHTML = value;
});
