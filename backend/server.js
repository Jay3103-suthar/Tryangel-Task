const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/tryangle');

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, UPLOAD_DIR)));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/policies', require('./routes/policies'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));