const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
   res.json({msg: 'App is working'})
});
// router.post("/", (req, res) => {});
// router.get("/:id", (req, res) => {});
// router.put("/:id", (req, res) => {});
// router.delete("/:id", (req, res) => {});

module.exports = router;