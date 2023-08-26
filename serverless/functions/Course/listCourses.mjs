import { CourseModel } from "../../commons/database/index.mjs";

export const handler = async (event) => {
  console.log("oie");
  try {
    const courses = await CourseModel.find({ deletedAt: null });

    return {
      statusCode: 200,
      body: JSON.stringify(courses),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
