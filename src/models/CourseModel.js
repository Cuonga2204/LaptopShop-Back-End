const mongoose = require("mongoose");
const { COURSE_CATEGORIES } = require("../constants/course.constants");
const CourseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: Object.values(COURSE_CATEGORIES),
      required: true,
    },
    title: { type: String, required: true },
    avatar: { type: String },
    price_current: { type: Number, required: true },
    name_teacher: { type: String, required: true },
    rating_average: { type: Number, default: 0 },
    overview: { type: String },
    description: { type: String },
    student_count: { type: Number, default: 0 },
    total_sections: { type: Number, default: 0 },
    total_lectures: { type: Number, default: 0 },
    total_video_duration: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

CourseSchema.set("toJSON", {
  virtual: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
