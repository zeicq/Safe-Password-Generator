
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