const studentClient = require('../grpc/studentClient');
const courseClient = require('../grpc/courseClient');

exports.getStudentById = (req, res) => {
  studentClient.GetStudentById({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
};

exports.getCourseById = (req, res) => {
  courseClient.GetCourseById({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response);
  });
};
