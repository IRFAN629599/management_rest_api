const express = require('express');
const cors = require('cors');

const siswaRoutes = require('./routes/siswaRoutes');

const app = express();

// WAJIB sebelum routes
app.use(cors());
app.use(express.json());

app.use('/api/siswa', siswaRoutes);

module.exports = app;
