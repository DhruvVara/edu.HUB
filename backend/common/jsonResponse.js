exports.jsonResponse = (res, statusCode, status, message, data = []) => {
    if (!Array.isArray(data)) {
        data = [data];
    }
    return res.status(statusCode).json({ status, message, data });
}