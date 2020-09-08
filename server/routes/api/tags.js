const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Tag = require("../../models/Tag");

// @route    GET api/tags
// @desc     Get all tags
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const tags = await Tag.find();
    res.json(tags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// test purposes @todo remove below
// @route    POST api/tags
// @desc     Create a tag
// @access   Private
// router.post(
//   "/",
//   [auth, [check("name", "Tag Name is required").not().isEmpty()]],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const newTag = new Tag({
//         name: req.body.name,
//       });
//       const tag = await newTag.save();

//       res.json(tag);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

module.exports = router;
