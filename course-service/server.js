const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const startGrpcServer = require('./grpc/grpcServer');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

// ➕ Ajouter la route REST
const courseRoutes = require('./routes/course.routes');
app.use('/courses', courseRoutes);

// Démarrer le serveur REST
app.listen(PORT, () => {
  console.log(`✅ Course REST service running on port ${PORT}`);
});

// Démarrer le serveur gRPC
startGrpcServer();
