const courses = [
  { id: '1', title: 'Node.js', description: 'Learn backend with Node' },
  { id: '2', title: 'gRPC', description: 'Learn RPC communication' }
];

exports.getAllCourses = (req, res) => {
  res.json(courses);
};

exports.getCourseById = (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.createCourse = (req, res) => {
  const { id, title, description } = req.body;
  courses.push({ id, title, description });
  res.status(201).json({ id });
};

exports.updateCourse = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const course = courses.find(c => c.id === id);
  if (course) {
    course.title = title;
    course.description = description;
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};

exports.deleteCourse = (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    courses.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
};