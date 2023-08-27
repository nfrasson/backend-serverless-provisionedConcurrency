import crypto from "node:crypto";
import { CourseModel } from "../../commons/database/index.mjs";
import { Logger, lambdaProcessor } from "../../commons/utils/index.mjs";

import Joi from "joi";
// import { invalidateAPIGatewayCache } from "../../commons/utils/invalidateCache.mjs";

const requestShape = Joi.object({
  courseTitle: Joi.string().required(),
  courseDescription: Joi.string().required(),
});

const $logger = new Logger("function:Course:createCourse");

export const handler = lambdaProcessor(
  async (body) => {
    const course = await CourseModel.create({
      ...body,
      courseID: crypto.randomUUID(),
    });

    // await invalidateAPIGatewayCache();

    return {
      statusCode: 201,
      body: course,
    };
  },
  $logger,
  requestShape
);
