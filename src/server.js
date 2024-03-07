// src/server.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Package = require('./models/package');

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

mongoose.connect(
  'mongodb+srv://shoaibbadshah:shoaibbadshah@cluster0.6l6v8sp.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/packages', async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.json(savedPackage);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/packages/:packageId/withdraw', async (req, res) => {
  try {
    const { packageId } = req.params;
    const { withdrawalAmount } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      { $inc: { withdrawalAmount: withdrawalAmount } },
      { new: true }
    );

    res.json(updatedPackage);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
