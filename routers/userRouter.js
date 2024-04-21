const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const upload = require("../middleware/multerConfig");
const authenticate = require("../middleware/authenticate");

// Routes for user profile management
router.patch("/:id", authenticate, userCtrl.updateUserProfile); // Update user profile details
router.get("/:id", authenticate, userCtrl.getUserProfile); // Fetch user details
router.delete("/:id", authenticate, userCtrl.deleteUser); // Delete a user
router.patch("/profilePhoto", authenticate, upload.single('photo'), userCtrl.updateProfilePhoto); // Update or upload a profile photo
router.patch("/profile/update", authenticate, userCtrl.updateUserProfile); // Dedicated route for profile updates
router.get("/profile", authenticate, userCtrl.getUserProfile); // Dedicated route for fetching user details

module.exports = router;


/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
