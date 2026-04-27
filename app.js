const express  = require('express');
const mongoose = require('mongoose');
const Student  = require('./models/Student');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Display all students + form
app.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('index', { students });
});

// Add a student
app.post('/add', async (req, res) => {
  await Student.create(req.body);
  res.redirect('/');
});

// Delete a student
app.post('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
