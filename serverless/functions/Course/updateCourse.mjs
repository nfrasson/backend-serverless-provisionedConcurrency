import crypto from "node:crypto";
import { CourseModel } from "../../commons/database/index.mjs";
import { Logger, lambdaProcessor } from "../../commons/utils/index.mjs";

import Joi from "joi";

const requestShape = Joi.object({
  courseTitle: Joi.string().required(),
  courseDescription: Joi.string().required(),
  courseID: Joi.string().guid({ version: "uuidv4" }).required(),
});

const $logger = new Logger("function:Course:createCourse");

export const handler = lambdaProcessor(
  async (body) => {
    const { courseID, ...courseBody } = body;

    const course = await CourseModel.findOneAndUpdate(
      {
        courseID,
      },
      courseBody.$logger,
      {
        new: true,
      }
    );

    return {
      statusCode: 200,
      body: course,
    };
  },
  $logger,
  requestShape
);
