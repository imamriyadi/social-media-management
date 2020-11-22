// Formatted to Indonesian (62)
const FormatNumberId = function (number) {
    // Menghilangkan karakter selain angka
    let formatted = number.replace(/\D/g, '');

    // Menghilangkan angka 0 di depan (prefix) Kemudian diganti dengan 62
    if (formatted.startsWith('0')) {
        formatted = '62' + formatted.substr(1);
    }

    if (!formatted.endsWith('@c.us')) {
        formatted += '@c.us';
    }

    return formatted;
}

module.exports = {
    FormatNumberId
}
