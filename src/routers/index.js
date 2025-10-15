const UserRouter = require("./UserRouter");
const CourseRouter = require("./CourseRouter");
const UserCourseRouter = require("./UserCourseRouter");
const SectionRouter = require("./SectionRouter");
const LectureRouter = require("./LectureRouter");
const express = require("express");
const path = require("path");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/course", CourseRouter);
  app.use("/api/user-course", UserCourseRouter);
  app.use("/api/section", SectionRouter);
  app.use("/api/lecture", LectureRouter);
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use(
    "/uploads/videos",
    express.static(path.join(__dirname, "../uploads/videos"))
  );
};

module.exports = routes;
