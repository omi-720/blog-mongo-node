// Centralized error handler
module.exports = (err, req, res, next) => {
console.error(err);


// Mongoose validation error
if (err.name === 'ValidationError') {
const messages = Object.values(err.errors).map((e) => e.message);
return res.status(400).json({ success: false, message: 'Validation Error', errors: messages });
}


// Mongoose bad ObjectId
if (err.name === 'CastError' && err.kind === 'ObjectId') {
return res.status(400).json({ success: false, message: 'Invalid ID format' });
}


// Duplicate key (if any unique is added later)
if (err.code && err.code === 11000) {
return res.status(400).json({ success: false, message: 'Duplicate field value', details: err.keyValue });
}


// Fallback
res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
};