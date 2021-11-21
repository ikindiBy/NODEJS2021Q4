const { UPPER_LETTERS, LOWER_LETTERS, LAST_LETTER_INDEX } = require('./letters');

const getIndexDependingOnDecipher = (shift, isDecipherMode, index) => {
    if (isDecipherMode) {
        return index >= shift ? index - shift : LAST_LETTER_INDEX - (shift - index - 1);
    } else {
        return index <= LAST_LETTER_INDEX - shift ? index + shift : shift - (LAST_LETTER_INDEX - index) - 1;
    }
}

const getShiftedEncrypted = (string, shift, decipher = false) => {
    const preparedString = string.trim();

    const resultLettersArray = [...preparedString].map(letter => {
        const lowerLetterIndex = LOWER_LETTERS.indexOf(letter);

        if (lowerLetterIndex >= 0) {
            const newIndex = getIndexDependingOnDecipher(shift, decipher, lowerLetterIndex);

            return LOWER_LETTERS[newIndex];
        }
        
        const upperLetterIndex = UPPER_LETTERS.indexOf(letter);

        if (upperLetterIndex >= 0) {
            const newIndex = getIndexDependingOnDecipher(shift, decipher, upperLetterIndex);
            return UPPER_LETTERS[newIndex];
        }

        return letter;
    });

    return resultLettersArray.join('');
}

module.exports = { getShiftedEncrypted };