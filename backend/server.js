require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
