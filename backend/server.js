require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
