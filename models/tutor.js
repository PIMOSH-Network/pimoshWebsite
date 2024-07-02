// models/tutor.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    employer1: { type: String, required: true },
    employer2: { type: String, required: true },
    coverLetter: { type: String, required: true },
    selfie: { type: String, required: true },
    reference: { type: String, required: true },
    source: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tutor', tutorSchema);
