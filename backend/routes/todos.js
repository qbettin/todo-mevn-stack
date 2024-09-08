const express = require('express');
const Todo = require('../entity/todo');
const auth = require('../middleware/auth'); // Middleware for authentication
const router = express.Router();

// Get all to-dos for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new to-do
router.post('/', auth, async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = new Todo({
      user: req.user.id,
      task,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a to-do
router.put('/:id', auth, async (req, res) => {
  const { task, completed } = req.body;
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'To-do not found' });

    // Check if the logged-in user owns the to-do
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    todo.task = task;
    todo.completed = completed;
    if(completed){
      todo.completedAt = Date.now()
    } else{
      todo.completedAt = 0;
    }
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a to-do
router.delete('/:id', auth, async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'To-do not found' });

    // Check if the logged-in user owns the to-do
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await todo.deleteOne();
    res.json({ message: 'To-do removed' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
