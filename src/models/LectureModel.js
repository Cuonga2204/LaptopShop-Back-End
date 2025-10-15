// src/models/LectureModel.js
const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
  {
    section_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    video: { type: String, required: false },
    lecture_title: { type: String, required: true },
    duration: { type: Number, default: 0 },
    lesson: [{ type: String }],
    transcript: { type: String, default: "" },
    captions_url: { type: String, default: "" },
  },
  { timestamps: true }
);

LectureSchema.set("toJSON", {
  virtual: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Lecture", LectureSchema);
