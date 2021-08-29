const express = require("express");
const router  = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn, validateCampground, isAuthore} = require("../middleware");
const Campground = require("../models/campground");
const multer  = require('multer');
const {storage} = require("../cloudinary")
const upload = multer({ storage });


router.route("/")
.get(catchAsync(campgrounds.index))
.post(isLoggedIn, upload.array("image"), validateCampground, catchAsync( campgrounds.createCampground));
// .post( upload.array('image'), function (req, res) {
//  console.log(req.body,  req.files);
//  res.send("it worked")
// })



router.get("/new", isLoggedIn, campgrounds.renderNewForm);


router.route("/:id")
.get(catchAsync( campgrounds.showCampground))
.put(isLoggedIn, isAuthore, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn, isAuthore, catchAsync( campgrounds.deleteCampground));

router.get("/:id/edit",isLoggedIn, isAuthore, catchAsync(campgrounds.renderEditForm ));

module.exports = router;

