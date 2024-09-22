exports.validateFile = (file_b64) => {
    if (!file_b64) return { file_valid: false, file_mime_type: null, file_size_kb: null };

    // Decode base64 and extract file details
    const buffer = Buffer.from(file_b64, 'base64');
    const file_size_kb = (buffer.length / 1024).toFixed(2);
    const file_mime_type = 'image/png'; // Placeholder, you can implement MIME detection

    return {
        file_valid: true,
        file_mime_type,
        file_size_kb
    };
};
