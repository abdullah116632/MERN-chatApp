const asyncErrorHandler = (callback) => {
    return (req, res, next) => {
        callback().catch((err) => next(err))
    }
}

export default asyncErrorHandler;