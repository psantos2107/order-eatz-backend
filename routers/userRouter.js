const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const upload = require("../middleware/multerConfig");
const authenticate = require("../middleware/authenticate"); // The path to where you save this middleware file



router.patch("/profile/update", authenticate, userCtrl.updateUser);



// Update route to modify user details
router.patch("/:id", authenticate, userCtrl.updateUser);

// Get route to show user details
router.get("/:id", authenticate, userCtrl.getUser);

// Delete route to remove a user
router.delete("/:id", authenticate, userCtrl.deleteUser);

// Patch route to upload or update a profile picture
router.patch('/profilePhoto', authenticate, upload.single('photo'), userCtrl.updateProfilePhoto);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
