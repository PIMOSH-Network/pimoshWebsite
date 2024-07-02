const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const { ensureAuthenticated } = require('../middlewares/auth');
const { validateTutor, validateResult, validateFiles } = require('../middlewares/validator');
const upload = require('../middlewares/fileUpload');

router.get('/', ensureAuthenticated, tutorController.getTutors);
router.get('/new', ensureAuthenticated, tutorController.new);
router.post('/', ensureAuthenticated,upload,validateTutor, validateResult,tutorController.create);

router.get('/edit/:id', ensureAuthenticated, tutorController.editTutor);
router.post('/edit/:id', ensureAuthenticated, upload, validateTutor, tutorController.updateTutor);
router.post('/delete/:id', ensureAuthenticated, tutorController.deleteTutor);

module.exports = router;
