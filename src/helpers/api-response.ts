const apiResponse = (statusCode, data, message = '', error = null, version = 1) => {
    return {
        statusCode,
        data,
        message,
        error,
        version
    }
};

export default apiResponse;
