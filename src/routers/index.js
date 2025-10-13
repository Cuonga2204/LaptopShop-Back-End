// src/routers/index.js
const UserRouter = require("./UserRouter");
const CourseRouter = require("./CourseRouter");
const UserCourseRouter = require("./UserCourseRouter");
const express = require("express");
const path = require("path");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/course", CourseRouter);
  app.use("/api/user-course", UserCourseRouter);
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
};

module.exports = routes;
