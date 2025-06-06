"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
};
const _default = errorMiddleware;
export { _default as default };
