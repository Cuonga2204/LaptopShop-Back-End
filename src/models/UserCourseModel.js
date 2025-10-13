const mongoose = require("mongoose");
const { USER_COURSE_STATUS } = require("../constants/userCourse.constants");

const userCourseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(USER_COURSE_STATUS),
      default: USER_COURSE_STATUS.IN_PROGRESS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userCourseSchema.index({ user_id: 1, course_id: 1 }, { unique: true });

const UserCourse = mongoose.model("UserCourse", userCourseSchema);
module.exports = UserCourse;
