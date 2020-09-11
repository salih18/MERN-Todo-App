const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Todo = require("../../models/Todo");
const User = require("../../models/User");
const Tag = require("../../models/Tag");

// @route    GET api/todos
// @desc     Get all todos
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user.id,
    }).sort({ date: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/todos
// @desc     Create a todo
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Todo is required").not().isEmpty(),
      check("tagId", "Tag is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const tag = await Tag.findById(req.body.tagId);

      let createdTag = {};
      if (tag._id.toString() === "5f5689a2d096a9b777ea4124") {
        const newTag = new Tag({
          name: req.body.tag,
        });
        createdTag = await newTag.save();
      }
      const newTodo = new Todo({
        name: user.name,
        tags:
          tag._id.toString() === "5f5689a2d096a9b777ea4124"
            ? [createdTag]
            : [tag],
        text: req.body.text,
        user: req.user.id,
      });

      const todo = await newTodo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    PUT api/todos/:id
// @desc     Update a todo
// @access   Private
router.put(
  "/:id",
  [
    auth,
    [
      check("text", "Todo is required").not().isEmpty(),
      check("tagId", "Tag is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const todo = await Todo.findById(req.params.id);
      const tag = await Tag.findById(req.body.tagId);

      let createdTag = {};
      if (tag._id.toString() === "5f5689a2d096a9b777ea4124") {
        const newTag = new Tag({
          name: req.body.tag,
        });
        createdTag = await newTag.save();
      }

      // Check for ObjectId format and todo
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
        return res.status(404).json({ msg: "Todo not found" });
      }

      // Check user if the todo belongs to authenticated user
      if (todo.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      // Update the todo
      if (todo) {
        todo.text = req.body.text;
        todo.tags =
          tag._id.toString() === "5f5689a2d096a9b777ea4124"
            ? [createdTag]
            : [tag];
      }

      await todo.save();

      res.json(todo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/todos/:id
// @desc     Get todo by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // Check for ObjectId format and todo besides if the todo belongs to authenticated user
    if (
      !req.params.id.match(/^[0-9a-fA-F]{24}$/) ||
      !todo ||
      todo.user.toString() !== req.user.id
    ) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/todos/:id
// @desc     Delete a todo
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await todo.remove();

    res.json({ msg: "Todo removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/todos/complete/:id
// @desc     Complete a todo
// @access   Private
router.put("/complete/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    // Check for ObjectId format and todo
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    // Check user if the todo belongs to authenticated user
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Check if the todo has already been completed
    if (todo) {
      todo.completed = !todo.completed;
    }

    await todo.save();

    res.json(todo.completed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
