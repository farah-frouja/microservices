const express = require('express');
const router = express.Router();

let courses = [
  { id: '1', title: 'Node.js', description: 'Learn backend with Node' },
  { id: '2', title: 'gRPC', description: 'Learn RPC communication' }
];

// GET all
router.get('/', (req, res) => {
  res.json(courses);
});

// GET by id
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (course) res.json(course);
  else res.status(404).json({ message: 'Course not found' });
});

// POST create
router.post('/', (req, res) => {
  const { title, description } = req.body;
  const newCourse = {
    id: String(courses.length + 1),
    title,
    description
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// PUT update
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (course) {
    course.title = req.body.title;
    course.description = req.body.description;
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = courses.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    const deleted = courses.splice(index, 1)[0];
    res.json(deleted);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

module.exports = router;
