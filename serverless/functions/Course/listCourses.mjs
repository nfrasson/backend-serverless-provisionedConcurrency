import { CourseModel } from "../../commons/database/index.mjs";
import { Logger, lambdaProcessor } from "../../commons/utils/index.mjs";

const $logger = new Logger("function:Course:listCourses");

export const handler = lambdaProcessor(async () => {
  const courses = await CourseModel.find({ deletedAt: null });

  return {
    statusCode: 200,
    body: courses,
  };
}, $logger);
