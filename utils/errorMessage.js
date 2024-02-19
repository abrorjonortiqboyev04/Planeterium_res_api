// Error Response
module.exports = (res, statusCode, error) => {
    return res.status(statusCode).json({
        success: false,
        error
    })
}