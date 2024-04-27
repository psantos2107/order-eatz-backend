const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const userId = req.user ? req.user.userId : 'default';  // Ensure there's a fallback if userId isn't available
    const destPath = path.join(__dirname, '../public/uploads', userId);

    // Create the directory if it doesn't exist
    fs.mkdirSync(destPath, { recursive: true });
    callback(null, destPath);
  },
  filename: function(req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
