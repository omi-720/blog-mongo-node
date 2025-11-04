require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');


const app = express();


// config
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
console.error('MONGO_URI missing in .env');
process.exit(1);
}


// connect DB
connectDB(MONGO_URI);


// middlewares
app.use(express.json());
app.use(logger);


// routes
app.use('/api', blogRoutes);


// 404
app.use((req, res, next) => res.status(404).json({ success: false, message: 'Route not found' }));


// error handler (must be last)
app.use(errorHandler);


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});