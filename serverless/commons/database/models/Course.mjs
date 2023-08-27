import { Schema } from "mongoose";
import databaseConnection from "../connect.mjs";

const CourseSchema = new Schema(
  {
    courseID: { type: String, unique: true, index: true },
    courseTitle: String,
    courseDescription: String,
    courseDeletedAt: Date,
  },
  {
    collection: "course",
    minimize: false,
    strict: true,
    useNestedStrict: true,
    timestamps: {
      createdAt: "courseCreatedAt",
      updatedAt: "courseUpdatedAt",
    },
  }
);

const CourseModel = await databaseConnection({
  name: "Course",
  schema: CourseSchema,
});

export default CourseModel;
