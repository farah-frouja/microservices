const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./config/config');
const studentRoutes = require('./routes/studentRoutes');
const startGrpcServer = require('./grpc/grpcServer'); // ✔ bon import

const app = express();
app.use(bodyParser.json());

app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Student Service is running');
});

app.listen(config.restPort, () => {
  console.log(`🚀 Student REST API running on http://localhost:${config.restPort}`);
});

startGrpcServer(); // ✔ bien une fonction
