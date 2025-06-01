const db = require('../config/db');

// Get all students
const getAllStudents = (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(results);
  });
};

// Add a student
const addStudent = (req, res) => {
  const { name, age, course, regid } = req.body;

  if (!name || !age || !course || !regid) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.query(
    'INSERT INTO students (name, age, course, regid) VALUES (?, ?, ?, ?)',
    [name, age, course, regid],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to add student' });
      }
      res.status(201).json({ message: 'Student added', studentId: result.insertId });
    }
  );
};

// Update a student
const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age, course, regid } = req.body;

  db.query(
    'UPDATE students SET name = ?, age = ?, course = ?, regid = ? WHERE id = ?',
    [name, age, course, regid, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update student' });
      }
      res.json({ message: 'Student updated' });
    }
  );
};

// Delete a student
const deleteStudent = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM students WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete student' });
    }
    res.json({ message: 'Student deleted' });
  });
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
