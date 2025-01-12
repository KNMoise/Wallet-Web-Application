const router = require("express").Router();

router.get("/", async (req, res) => {
  res.send("Hello from transactions route");
});


module.exports = router;
