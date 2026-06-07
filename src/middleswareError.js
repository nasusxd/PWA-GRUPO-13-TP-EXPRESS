function middleswareError(err, req, res, next) {
    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor"
    });
}

export default middleswareError;