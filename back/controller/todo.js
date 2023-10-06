const express = require("express");
const Todo=require('../model/todo.js');
const authenticateToken = require("./auth.js");

const router = express.Router();

// Create a new Todo
router.post("/todo", authenticateToken, async (req, res) => {
  try {
    const  {title}  = req.body;
    // console.log(req.body);

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      // description,
      createdBy: req.user.userId, // Assuming you store user ID in the token
    });

    await newTodo.save();

    res.status(201).json({ message: "Todo created successfully", todo: newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all Todos

router.get("/todo", authenticateToken, async (req, res) => {

  try {
    const todos = await Todo.find({ createdBy: req.user.userId });
     console.log(todos);
    res.status(200).json({ message: "Todos retrieved successfully", todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update a Todo
router.put("/todo/:id", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todoId = req.params.id;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        title,
        // description,
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a Todo
router.delete("/todo/:id", authenticateToken, async (req, res) => {
  try {
    const todoId = req.params.id;

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
