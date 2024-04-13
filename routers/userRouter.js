const express = require("express");
const router = express.Router();
const userCtrl = require("./../controllers/userCtrl");
const upload = require("./../middleware/multerConfig");

//post route
router.post("/", userCtrl.createUser);

//update route
router.patch("/:id", userCtrl.updateUser);

//show route
router.get("/:id", userCtrl.showUser);

//delete route
router.delete("/:id", userCtrl.deleteUser);

//upload profile picture
router.patch('/profilePhoto', upload.single('photo'), userCtrl.updateProfilePhoto);

module.exports = router;

/* 
//CRUD ROUTES
app.use("/api/login", authRouter);
app.use("/api/food", foodRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/user", userRouter);
*/
