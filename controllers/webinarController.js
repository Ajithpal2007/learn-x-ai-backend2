import asyncHandler from 'express-async-handler';
import Webinar from '../models/webinarModel.js';

// @desc    Get all webinars
// @route   GET /api/webinars
// @access  Private
const getWebinars = asyncHandler(async (req, res) => {
  const webinars = await Webinar.find({});
  res.status(200).json(webinars);
});

// --- ADD THESE NEW ADMIN FUNCTIONS ---

// @desc    Create a new webinar
// @route   POST /api/webinars
// @access  Private/Admin
const createWebinar = asyncHandler(async (req, res) => {
    const { title, speaker, image, status, recordingUrl } = req.body;
    const webinar = new Webinar({ title, speaker, image, status, recordingUrl });
    const createdWebinar = await webinar.save();
    res.status(201).json(createdWebinar);
});

// @desc    Update a webinar
// @route   PUT /api/webinars/:id
// @access  Private/Admin
const updateWebinar = asyncHandler(async (req, res) => {
    const { title, speaker, image, status, recordingUrl } = req.body;
    const webinar = await Webinar.findById(req.params.id);

    if (webinar) {
        webinar.title = title || webinar.title;
        webinar.speaker = speaker || webinar.speaker;
        webinar.image = image || webinar.image;
        webinar.status = status || webinar.status;
        webinar.recordingUrl = recordingUrl || webinar.recordingUrl;

        const updatedWebinar = await webinar.save();
        res.json(updatedWebinar);
    } else {
        res.status(404);
        throw new Error('Webinar not found');
    }
});

// @desc    Delete a webinar
// @route   DELETE /api/webinars/:id
// @access  Private/Admin
const deleteWebinar = asyncHandler(async (req, res) => {
    const webinar = await Webinar.findByIdAndDelete(req.params.id);
    if (webinar) {
        res.json({ message: 'Webinar removed' });
    } else {
        res.status(404);
        throw new Error('Webinar not found');
    }
});

// --- EXPORT THE NEW FUNCTIONS ---
export {
    getWebinars,
    createWebinar,
    updateWebinar,
    deleteWebinar
}