const { validateFile } = require('../utils/fileValidator');


exports.handlePostRequest = (req, res) => {
    const { data, file_b64 } = req.body;
    console.log(req.body);
    const user_id = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highest_lowercase_alphabet = [lowercaseAlphabets.sort().pop()];

    // Validate file
    const { file_valid, file_mime_type, file_size_kb } = validateFile(file_b64);

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
};

exports.handleGetRequest = (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
};
