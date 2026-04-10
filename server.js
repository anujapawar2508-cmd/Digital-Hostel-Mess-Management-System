const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth',    require('./routes/auth'));
app.use('/api/student', require('./routes/student'));
app.use('/api/scan',    require('./routes/scan'));
app.use('/api/special', require('./routes/special'));
app.use('/api/menu',    require('./routes/menu'));
app.use('/api/vote',    require('./routes/vote'));

app.get('/', (req, res) => res.json({ message: '✅ MessMate Backend Running' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`));
  })
  .catch(err => console.error('❌ MongoDB Error:', err.message));