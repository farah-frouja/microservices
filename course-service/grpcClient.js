const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./grpc/course.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.CourseService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

client.GetCourseById({ id: '1' }, (err, response) => {
  if (err) {
    console.error('Erreur gRPC :', err);
  } else {
    console.log('Réponse gRPC :', response);
  }
});
