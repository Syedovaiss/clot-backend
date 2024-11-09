
module.exports = {
    isNotEmpty: (text) => {
        if (text == '' || text == null || text == undefined) {
            return false
        } else {
            return true
        }
    },
    isEmpty: (text) => {
        if (text == '' || text == null || text == undefined) {
            return true
        } else {
            return false
        }
    },
    isNull: (data) => {
        return data == null
    },
    toPriceString: (price) => {
        return `PKR ${price}`
    },
    getCardType: (cardNumber) => {
        cardNumber = cardNumber.replace(/\D/g, '');
        if (!/^\d{13,19}$/.test(cardNumber)) {
            return 'Invalid card number';
        }
        const firstDigit = cardNumber[0];
        const firstTwoDigits = cardNumber.substring(0, 2);
        const firstFourDigits = cardNumber.substring(0, 4);
        if (firstDigit === '4') {
            return 'Visa';
        } else if (firstDigit === '5') {
            return 'MasterCard';
        } else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
            return 'American Express';
        } else if (firstDigit === '6') {
            return 'Discover';
        } else if (firstFourDigits >= '3528' && firstFourDigits <= '3589') {
            return 'JCB';
        } else {
            return 'Unknown card type';
        }
    },
    maskCardNumber: (cardNumber) => {
        const cardNumberStr = cardNumber.toString();
        const lastFour = cardNumberStr.slice(-4);
        const maskedCardNumber = '**** **** **** ' + lastFour;
        return maskedCardNumber;
    },
    toPrice: (priceString) => {
        return parseInt(priceString.replace('PKR', '').trim(), 10);
    }
}