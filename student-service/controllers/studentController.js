let students = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' }
];

exports.getAllStudents = (req, res) => {
  res.json(students);
};

exports.getStudentById = (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) res.json(student);
  else res.status(404).json({ message: 'Student not found' });
};

exports.createStudent = (req, res) => {
  const { name, email } = req.body;
  const newStudent = {
    id: String(students.length + 1),
    name,
    email
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const student = students.find(s => s.id === req.params.id);
  if (student) {
    student.name = req.body.name;
    student.email = req.body.email;
    res.json(student);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

exports.deleteStudent = (req, res) => {
  const index = students.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    const deleted = students.splice(index, 1)[0];
    res.json(deleted);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};
