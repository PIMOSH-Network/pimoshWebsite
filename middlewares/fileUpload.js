// middlewares/multerConfig.js

const multer = require('multer');
const path = require('path');

// Set storage engine for images
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/images')); // Directory to save the uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, 'image-' + Date.now() + path.extname(file.originalname));
    }
});

// Set storage engine for documents
const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/documents')); // Directory to save the uploaded documents
    },
    filename: function (req, file, cb) {
        cb(null, 'document-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb, filetypes) {
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and documents only!');
    }
}

// Middleware to handle multiple file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'selfie') {
                cb(null, path.join(__dirname, '../public/uploads/images'));
            } else if (file.fieldname === 'coverLetter' || file.fieldname === 'resume') {
                cb(null, path.join(__dirname, '../public/uploads/documents'));
            }
        },
        filename: (req, file, cb) => {
            if (file.fieldname === 'selfie') {
                cb(null, 'image-' + Date.now() + path.extname(file.originalname));
            } else if (file.fieldname === 'coverLetter' || file.fieldname === 'resume') {
                cb(null, 'document-' + Date.now() + path.extname(file.originalname));
            }
        }
    }),
    limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB file size limit
    fileFilter: function (req, file, cb) {
        if (file.fieldname === 'selfie') {
            checkFileType(file, cb, /jpeg|jpg|png/);
        } else if (file.fieldname === 'coverLetter' || file.fieldname === 'resume') {
            checkFileType(file, cb, /pdf|doc|docx/);
        }
    }
}).fields([
    { name: 'selfie', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
]);

module.exports = upload;
