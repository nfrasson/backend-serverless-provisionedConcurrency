import { returnHandler, mergeBody } from "./index.mjs";

export function lambdaProcessor(processFunction, $logger, requestShape = null) {
  return async (event) => {
    try {
      $logger.debug("EVENT", { event });

      let body = {};

      if (requestShape) {
        body = await requestShape.validateAsync(mergeBody(event));
        $logger.info("VALITED_BODY", { body });
      }

      const processResult = await processFunction(body);
      $logger.info("PROCESS_RESULT", { processResult });

      return returnHandler({ ...processResult, status: true });
    } catch (error) {
      $logger.error("EXECUTION_FAILED", error);
      return returnHandler({
        status: false,
        statusCode: 500,
        body: error.message,
      });
    }
  };
}
