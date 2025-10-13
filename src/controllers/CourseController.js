const Course = require("../models/CourseModel");
const { successHandler, errorHandler } = require("../utils/ResponseHandle");
const { ERRORS } = require("../errors/index");

const createCourse = async (req, res) => {
  try {
    const avatarPath = req.file
      ? `${process.env.PATH_UPLOAD_IMAGE}${req.file.filename}`
      : null;

    const newCourse = await Course.create({
      ...req.body,
      avatar: avatarPath,
    });

    return successHandler(res, newCourse);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const courses = await Course.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Course.countDocuments();

    return successHandler(res, {
      total,
      page: Number(page),
      limit: Number(limit),
      courses,
    });
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return errorHandler(res, ERRORS.COURSE_NOT_FOUND);
    return successHandler(res, course);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return errorHandler(res, ERRORS.COURSE_NOT_FOUND);

    const updates = { ...req.body };
    if (req.file)
      updates.avatar = `${process.env.PATH_UPLOAD_IMAGE}${req.file.filename}`;

    Object.assign(course, updates);
    await course.save();

    return successHandler(res, course);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return errorHandler(res, ERRORS.COURSE_NOT_FOUND);

    await Course.findByIdAndDelete(req.params.id);
    return successHandler(res, course);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourse,
  deleteCourse,
};
