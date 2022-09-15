const express = require("express");
const { newContact } = require("../controller/contactController");

const router = express.Router()



router.route("/contact").post(newContact)


module.exports = router