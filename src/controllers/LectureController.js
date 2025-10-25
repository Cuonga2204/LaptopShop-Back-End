const Lecture = require("../models/LectureModel");
const { successHandler, errorHandler } = require("../utils/ResponseHandle");
const { ERRORS } = require("../errors");

const createLecture = async (req, res) => {
  try {
    const videoPath = req.file
      ? `${process.env.PATH_UPLOAD_VIDEO}${req.file.filename}`
      : null;

    const newLecture = await Lecture.create({
      ...req.body,
      video: videoPath,
    });

    return successHandler(res, newLecture);
  } catch (err) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, err.message);
  }
};
const getLectureDetail = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) return errorHandler(res, ERRORS.LECTURE_NOT_FOUND);

    return successHandler(res, lecture);
  } catch (err) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, err.message);
  }
};

const getLecturesBySection = async (req, res) => {
  try {
    const lectures = await Lecture.find({ section_id: req.params.sectionId });
    return successHandler(res, lectures);
  } catch (err) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, err.message);
  }
};

const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) return errorHandler(res, ERRORS.LECTURE_NOT_FOUND);

    if (req.file) {
      lecture.video = `${process.env.PATH_UPLOAD_VIDEO}${req.file.filename}`;
    }

    Object.assign(lecture, req.body);
    await lecture.save();

    return successHandler(res, lecture);
  } catch (err) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, err.message);
  }
};

const deleteLecture = async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    return successHandler(res, { message: "Lecture deleted" });
  } catch (err) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, err.message);
  }
};

module.exports = {
  createLecture,
  getLectureDetail,
  getLecturesBySection,
  updateLecture,
  deleteLecture,
};
