const express = require('express');
const mainController = require("../app/controllers/main")
const router =  express.Router();

router.get('/',      mainController.index)
router.get("/sobre", mainController.sobre)
router.get("/ui", mainController.ui)


module.exports = router;