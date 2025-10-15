// src/controllers/SectionController.js
const Section = require("../models/SectionModel");
const Lecture = require("../models/LectureModel");
const { successHandler, errorHandler } = require("../utils/ResponseHandle");
const { ERRORS } = require("../errors/index");

// Tạo mới Section
const createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return successHandler(res, section);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Lấy tất cả Section của 1 Course
const getSectionsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const sections = await Section.find({ course_id: courseId }).sort({
      title: 1,
    });
    return successHandler(res, sections);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Lấy chi tiết Section (kèm lecture)
const getSectionDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);
    if (!section) return errorHandler(res, ERRORS.NOT_FOUND);

    const lectures = await Lecture.find({ section_id: id }).sort({
      lecture_title: 1,
    });

    return successHandler(res, { section, lectures });
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Cập nhật Section
const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!section) return errorHandler(res, ERRORS.NOT_FOUND);
    return successHandler(res, section);
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Xoá Section (và các lecture của nó)
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);
    if (!section) return errorHandler(res, ERRORS.NOT_FOUND);

    await Lecture.deleteMany({ section_id: id });
    await Section.findByIdAndDelete(id);

    return successHandler(res, { message: "Deleted successfully" });
  } catch (error) {
    return errorHandler(res, ERRORS.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createSection,
  getSectionsByCourse,
  getSectionDetail,
  updateSection,
  deleteSection,
};
