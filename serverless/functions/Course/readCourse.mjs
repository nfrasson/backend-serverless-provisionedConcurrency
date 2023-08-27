import { CourseModel } from "../../commons/database/index.mjs";
import { Logger, lambdaProcessor } from "../../commons/utils/index.mjs";

import Joi from "joi";

const requestShape = Joi.object({
  courseID: Joi.string().guid({ version: "uuidv4" }).required(),
});

const $logger = new Logger("function:Course:readCourse");

export const handler = lambdaProcessor(
  async (body) => {
    const course = await CourseModel.findOne({
      ...body,
    });

    return {
      statusCode: 200,
      body: course,
    };
  },
  $logger,
  requestShape
);
