const { UPPER_LETTERS, LOWER_LETTERS, LAST_LETTER_INDEX } = require('../constants/letters');

const getAtbashEncrypted = (string) => {
    const preparedString = string.trim();

    const resultLettersArray = [...preparedString].map(letter => {
        const lowerLetterIndex = LOWER_LETTERS.indexOf(letter);

        if (lowerLetterIndex >= 0) {
            return LOWER_LETTERS[LAST_LETTER_INDEX - lowerLetterIndex];
        }
        
        const upperLetterIndex = UPPER_LETTERS.indexOf(letter);

        if (upperLetterIndex >= 0) {
            return UPPER_LETTERS[LAST_LETTER_INDEX - upperLetterIndex];
        }

        return letter;
    });

    return resultLettersArray.join('');
}

module.exports = { getAtbashEncrypted };